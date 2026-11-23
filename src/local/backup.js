// ─────────────────────────────────────────────────────────────
//  Backup & restore
//  Everything the app knows about you lives in localStorage. That
//  means one "clear site data" wipes months of work, and a new
//  laptop starts at zero. Export a single JSON file; import it on
//  the next machine.
// ─────────────────────────────────────────────────────────────

const PREFIX = 'charisma-lab.';
const ALSO = ['cl.view', 'cl.boot'];

export const SCHEMA = 1;

/** Every key this app owns (not the AI key — that stays on the device). */
export function appKeys() {
  const out = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k) continue;
      if ((k.startsWith(PREFIX) && k !== 'charisma-lab.ai.v1') || ALSO.includes(k)) out.push(k);
    }
  } catch { /* storage blocked */ }
  return out.sort();
}

export function snapshotData() {
  const data = {};
  for (const k of appKeys()) {
    try {
      const raw = localStorage.getItem(k);
      if (raw != null) data[k] = raw;
    } catch { /* skip */ }
  }
  return {
    app: 'charisma-lab',
    schema: SCHEMA,
    exportedAt: new Date().toISOString(),
    counts: summarise(data),
    data,
  };
}

function summarise(data) {
  const n = (k) => { try { return JSON.parse(data[k] || 'null'); } catch { return null; } };
  const state = n(`${PREFIX}state.v1`);
  const srs = n(`${PREFIX}srs.v1`) || {};
  const scripts = n(`${PREFIX}scripts.v1`) || [];
  return {
    xp: state?.user?.xp ?? 0,
    activityDays: Array.isArray(state?.activity) ? new Set(state.activity.map((a) => a.day)).size : 0,
    courseDays: Array.isArray(state?.progress) ? state.progress.length : 0,
    sessions: Array.isArray(state?.sessions) ? state.sessions.length : 0,
    playbooksInRotation: Object.keys(srs).length,
    myScripts: Array.isArray(scripts) ? scripts.length : 0,
  };
}

export const exportJSON = () => JSON.stringify(snapshotData(), null, 2);

const EXTRA_KEYS = [
  'charisma-lab.srs.v1', 'charisma-lab.scripts.v1', 'charisma-lab.progress.v1',
  'charisma-lab.daily.v1', 'charisma-lab.games.v1', 'charisma-lab.notes.v1',
];

/**
 * Validate and load a backup. Throws a human error if the file is not ours.
 * mode 'merge' keeps the newer XP/streak and unions the repeated stores;
 * 'replace' overwrites everything.
 */
export function importJSON(text, mode = 'merge') {
  let doc;
  try { doc = JSON.parse(text); } catch { throw new Error('That file is not valid JSON.'); }
  if (!doc || doc.app !== 'charisma-lab' || !doc.data || typeof doc.data !== 'object') {
    throw new Error('That is not a Charisma Lab backup file.');
  }
  if (Number(doc.schema || 0) > SCHEMA) {
    throw new Error('That backup was made by a newer version of the app.');
  }

  const incoming = Object.entries(doc.data).filter(([k]) => typeof k === 'string');
  if (!incoming.length) throw new Error('The backup contains no data.');

  let written = 0;
  const merged = mode === 'merge';

  for (const [k, raw] of incoming) {
    if (typeof raw !== 'string') continue;
    if (!(k.startsWith(PREFIX) || ALSO.includes(k))) continue; // never import foreign keys
    const next = merged ? mergeValue(k, raw) : raw;
    try { localStorage.setItem(k, next); written++; } catch { /* quota */ }
  }
  return { written, counts: doc.counts || {}, exportedAt: doc.exportedAt };
}

function mergeValue(key, raw) {
  const cur = localStorage.getItem(key);
  if (!cur) return raw;
  if (EXTRA_KEYS.includes(key)) {
    try {
      const a = JSON.parse(cur);
      const b = JSON.parse(raw);
      if (Array.isArray(a) && Array.isArray(b)) {
        const seen = new Set(a.map((x) => x.id ?? JSON.stringify(x)));
        return JSON.stringify([...a, ...b.filter((x) => !seen.has(x.id ?? JSON.stringify(x)))]);
      }
      if (a && b && typeof a === 'object' && typeof b === 'object') return JSON.stringify({ ...a, ...b });
    } catch { /* fall through */ }
  }
  // XP / streak state: keep whichever holds more progress
  try {
    const a = JSON.parse(cur);
    const b = JSON.parse(raw);
    const xpA = a?.user?.xp || 0;
    const xpB = b?.user?.xp || 0;
    if (Array.isArray(a?.progress) && Array.isArray(b?.progress)) {
      const merged = { ...a, ...b };
      merged.user = { ...a.user, ...b.user, xp: Math.max(xpA, xpB) };
      const seen = new Set(a.progress.map((p) => `${p.track}:${p.day}`));
      merged.progress = [...a.progress, ...b.progress.filter((p) => !seen.has(`${p.track}:${p.day}`))];
      const aseen = new Set((a.activity || []).map((x) => `${x.day}:${x.kind}`));
      merged.activity = [...(a.activity || []), ...(b.activity || []).filter((x) => !aseen.has(`${x.day}:${x.kind}`))];
      const sseen = new Set((a.sessions || []).map((x) => x.id));
      merged.sessions = [...(a.sessions || []), ...(b.sessions || []).filter((x) => !sseen.has(x.id))];
      return JSON.stringify(merged);
    }
  } catch { /* fall through */ }
  return raw;
}

/** Trigger a download in the browser. No server involved. */
export function downloadBackup(filename) {
  const name = filename || `charisma-lab-backup-${new Date().toISOString().slice(0, 10)}.json`;
  const blob = new Blob([exportJSON()], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  return name;
}

export function clearAll() {
  for (const k of appKeys()) {
    try { localStorage.removeItem(k); } catch { /* skip */ }
  }
}
