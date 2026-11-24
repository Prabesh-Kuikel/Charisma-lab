// ─────────────────────────────────────────────────────────────
//  Reps — one honest log of practice
//  Before this, five different views each invented their own XP
//  number and none of them recorded what you actually did, so
//  "did I practise yesterday?" had no single answer. Every rep now
//  goes through here: what it was, how long, what it scored, and
//  whether you said you would repeat it.
//
//  XP is derived from the rep rather than hardcoded at each call
//  site, so the reward matches the effort: a 90-second impromptu
//  pays more than tapping "mark done", and a scored rep pays for
//  the score.
// ─────────────────────────────────────────────────────────────

const KEY = 'charisma-lab.reps.v1';
const MAX = 2000;

export const KINDS = {
  impromptu: { label: 'Impromptu', icon: 'mic', xp: 12 },
  pronunciation: { label: 'Pronunciation', icon: 'wave', xp: 10 },
  wit: { label: 'Wit', icon: 'spark', xp: 10 },
  arena: { label: 'Arena', icon: 'chat', xp: 14 },
  gym: { label: 'Playbook', icon: 'target', xp: 10 },
  academy: { label: 'Academy drill', icon: 'book', xp: 8 },
  game: { label: 'Game', icon: 'bolt', xp: 8 },
  course: { label: 'Course day', icon: 'book', xp: 15 },
  daily: { label: 'Daily drill', icon: 'spark', xp: 6 },
  skill: { label: 'Skill exercise', icon: 'target', xp: 8 },
  scripts: { label: 'Script rehearsal', icon: 'pen', xp: 6 },
  reading: { label: 'Chapter read', icon: 'library', xp: 4 },
  psychology: { label: 'Psychology study', icon: 'brain', xp: 7 },
  story: { label: 'Story rehearsal', icon: 'book', xp: 8 },
  body: { label: 'Cue spotting', icon: 'eye', xp: 6 },
  coach: { label: 'Coach session', icon: 'chat', xp: 5 },
};

const uid = () => `r-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

const read = () => {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
};

// The rep log and the older activity log were two systems counting the same
// thing. A rep now also stamps the activity log, so the flame in the topbar
// and the streak on Today can never disagree — and undoing a rep takes the
// day back out if that rep was the only thing on it.
let mirror = null; // injected to avoid a hard import cycle with store.js
export const setActivityMirror = (fn) => { mirror = fn; };
const bump = (day, delta) => { try { mirror?.(day, delta); } catch { /* never break a rep */ } };

const write = (list) => {
  try { localStorage.setItem(KEY, JSON.stringify(list.slice(-MAX))); } catch { /* quota */ }
  return list;
};

export const allReps = read;

/**
 * XP for one rep. Effort (seconds), quality (score 0-100) and the base
 * weight for the kind. A six-second tap is worth 3 XP; a two-minute,
 * 80-scoring speech is worth ~20. Nobody can farm this by clicking.
 */
export function xpFor({ kind = 'daily', seconds = 0, score = null, repeat = false }) {
  const base = (KINDS[kind] || { xp: 6 }).xp;
  const effort = Math.min(1.5, 0.4 + (Number(seconds) || 0) / 120); // 0.4 → 1.5
  const quality = typeof score === 'number' ? 0.6 + Math.max(0, Math.min(100, score)) / 125 : 1;
  const bonus = repeat ? 3 : 0; // "I will do this again" is the behaviour that matters
  return Math.max(2, Math.round(base * effort * quality + bonus));
}

/** Record a rep. Returns the stored entry, including the XP it earned. */
export function logRep({ kind, ref = '', label = '', seconds = 0, score = null, repeat = false, meta = null }) {
  if (!KINDS[kind]) kind = 'daily';
  const entry = {
    id: uid(), kind, ref, label: String(label || '').slice(0, 140),
    at: new Date().toISOString(),
    day: new Date().toISOString().slice(0, 10),
    seconds: Math.max(0, Math.round(Number(seconds) || 0)),
    score: typeof score === 'number' ? Math.round(score) : null,
    repeat: !!repeat,
    xp: xpFor({ kind, seconds, score, repeat }),
    meta,
  };
  write([...read(), entry]);
  bump(entry.day, 1);
  return entry;
}

export const removeRep = (id) => {
  const all = read();
  const gone = all.find((r) => r.id === id);
  write(all.filter((r) => r.id !== id));
  if (gone) bump(gone.day, -1);
  return read();
};

/** The last rep, for "undo" on a toast. */
export const lastRep = () => {
  const list = read();
  return list.length ? list[list.length - 1] : null;
};

export const repsOn = (day) => read().filter((r) => r.day === day);

export const repsToday = () => repsOn(new Date().toISOString().slice(0, 10));

/** Per-kind totals: reps, minutes, average score. */
export function byKind() {
  const map = {};
  for (const r of read()) {
    const row = (map[r.kind] = map[r.kind] || { kind: r.kind, n: 0, seconds: 0, scoreSum: 0, scoreN: 0, xp: 0 });
    row.n += 1;
    row.seconds += r.seconds || 0;
    row.xp += r.xp || 0;
    if (typeof r.score === 'number') { row.scoreSum += r.score; row.scoreN += 1; }
  }
  return Object.values(map)
    .map((r) => ({
      kind: r.kind, label: (KINDS[r.kind] || {}).label || r.kind,
      n: r.n, minutes: Math.round(r.seconds / 60), xp: r.xp,
      avg: r.scoreN ? Math.round(r.scoreSum / r.scoreN) : null,
    }))
    .sort((a, b) => b.n - a.n);
}

/** Consecutive days with at least one rep, ending today or yesterday. */
export function streak() {
  const days = new Set(read().map((r) => r.day));
  if (!days.size) return { current: 0, best: 0, lastDay: null };
  const today = new Date();
  const iso = (d) => d.toISOString().slice(0, 10);
  const shift = (n) => { const d = new Date(today); d.setDate(d.getDate() - n); return iso(d); };

  let current = 0;
  let start = 0;
  if (!days.has(shift(0))) {
    if (!days.has(shift(1))) return { current: 0, best: bestRun(days), lastDay: [...days].sort().pop() };
    start = 1;
  } else {
    start = 0;
  }
  for (let i = start; i < 400; i++) {
    if (days.has(shift(i))) current += 1;
    else break;
  }
  return { current, best: Math.max(current, bestRun(days)), lastDay: [...days].sort().pop() };
}

function bestRun(days) {
  const sorted = [...days].sort();
  let best = 0;
  let run = 0;
  let prev = null;
  for (const d of sorted) {
    if (prev) {
      const gap = Math.round((new Date(d + 'T00:00:00Z') - new Date(prev + 'T00:00:00Z')) / 86400000);
      run = gap === 1 ? run + 1 : 1;
    } else run = 1;
    best = Math.max(best, run);
    prev = d;
  }
  return best;
}

/** Minutes practised per day for the last n days, oldest first. */
export function minutesByDay(n = 14) {
  const out = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const reps = repsOn(key);
    out.push({
      day: key,
      reps: reps.length,
      minutes: Math.round(reps.reduce((s, r) => s + (r.seconds || 0), 0) / 60),
      xp: reps.reduce((s, r) => s + (r.xp || 0), 0),
    });
  }
  return out;
}

/** The best thing to do next, based on what has gone quiet. */
export function nextRepSuggestion() {
  const kinds = Object.keys(KINDS);
  const last = {};
  for (const r of read()) last[r.kind] = r.at;
  const today = Date.now();
  const cold = kinds
    .filter((k) => last[k])
    .map((k) => ({ kind: k, days: Math.floor((today - new Date(last[k]).getTime()) / 86400000) }))
    .sort((a, b) => b.days - a.days)[0];
  if (!cold || cold.days < 7) return null;
  return { ...cold, label: (KINDS[cold.kind] || {}).label || cold.kind };
}

/** Export for the progress page: everything in one call. */
export function summary() {
  const reps = read();
  return {
    total: reps.length,
    xp: reps.reduce((s, r) => s + (r.xp || 0), 0),
    minutes: Math.round(reps.reduce((s, r) => s + (r.seconds || 0), 0) / 60),
    today: repsToday().length,
    streak: streak(),
    kinds: byKind(),
    days: minutesByDay(14),
    suggestion: nextRepSuggestion(),
    // what to write under the streak: silence is the honest answer on day one
    headline: reps.length === 0
      ? 'No reps yet'
      : repsToday().length === 0
        ? 'Nothing yet today'
        : `${repsToday().length} rep${repsToday().length === 1 ? '' : 's'} today`,
  };
}
