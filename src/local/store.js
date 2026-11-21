// ─────────────────────────────────────────────────────────────
//  Browser-only persistence (static build)
//  Mirrors the SQLite schema from server/db.js in localStorage.
//  Same shapes, same stats maths, no server required.
// ─────────────────────────────────────────────────────────────

const KEY = 'charisma-lab.state.v1';

const today = () => new Date().toISOString().slice(0, 10);

const blank = () => ({
  seq: 1,
  user: { id: 1, name: 'Speaker', xp: 0, goal: 'Presence', created_at: new Date().toISOString() },
  activity: [],   // { day, kind, xp }
  progress: [],   // { track, day, status, score, notes, completed_at }
  sessions: [],   // { id, kind, ref, score, payload, created_at }
  coach: [],      // { role, text, at }
});

let state = null;

function load() {
  if (state) return state;
  try {
    const raw = localStorage.getItem(KEY);
    state = raw ? { ...blank(), ...JSON.parse(raw) } : blank();
  } catch {
    state = blank();
  }
  return state;
}

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* quota: keep going in memory */ }
}

export function snapshot() { return load(); }

export function getUser() { return { ...load().user }; }

export function patchUser(patch = {}) {
  const s = load();
  if (typeof patch.name === 'string' && patch.name.trim()) s.user.name = patch.name.trim().slice(0, 40);
  if (typeof patch.goal === 'string') s.user.goal = patch.goal.slice(0, 60);
  save();
  return getUser();
}

export function addXp(kind, xp = 0) {
  const s = load();
  const day = today();
  const existing = s.activity.find((a) => a.day === day && a.kind === kind);
  if (existing) existing.xp += xp; else s.activity.push({ day, kind, xp });
  s.user.xp = (s.user.xp || 0) + xp;
  save();
}

export function completeDay({ track, day, score = null, notes = '' }) {
  const s = load();
  const d = Number(day);
  const existing = s.progress.find((p) => p.track === track && p.day === d);
  if (existing) {
    existing.score = score; existing.notes = notes;
    save();
    return { ok: true, xpGained: 0, alreadyDone: true, stats: stats() };
  }
  s.progress.push({ track, day: d, status: 'done', score, notes, completed_at: new Date().toISOString() });
  save();
  return { ok: true, xpGained: 0, alreadyDone: false, stats: stats() };
}

export function uncompleteDay({ track, day }) {
  const s = load();
  s.progress = s.progress.filter((p) => !(p.track === track && p.day === Number(day)));
  save();
  return { ok: true, stats: stats() };
}

export function saveSession(kind, ref, score, payload = {}) {
  const s = load();
  const id = s.seq++;
  s.sessions.push({
    id, kind, ref: ref ?? null, score: score ?? null,
    payload: JSON.stringify(payload), created_at: new Date().toISOString(),
  });
  if (s.sessions.length > 400) s.sessions = s.sessions.slice(-400);
  save();
  return id;
}

export function getSession(id) {
  return load().sessions.find((x) => x.id === Number(id)) || null;
}

export function updateSession(id, score, payload) {
  const s = load();
  const row = s.sessions.find((x) => x.id === Number(id));
  if (row) { row.score = score ?? null; row.payload = JSON.stringify(payload || {}); save(); }
  return row || null;
}

export function recentSessions(limit = 12) {
  return [...load().sessions].reverse().slice(0, limit);
}

export function pushCoach(role, text) {
  const s = load();
  s.coach.push({ role, text, at: new Date().toISOString() });
  if (s.coach.length > 200) s.coach = s.coach.slice(-200);
  save();
}

export function coachHistory() { return load().coach.slice(-40); }

export function clearCoach() {
  const s = load();
  s.coach = [];
  save();
}

function activityDays() {
  return [...new Set(load().activity.map((a) => a.day))].sort();
}

function streakOf(days) {
  if (!days.length) return { current: 0, longest: 0 };
  const set = new Set(days);
  let longest = 1, run = 1;
  for (let i = 1; i < days.length; i++) {
    const prev = new Date(days[i - 1] + 'T00:00:00Z');
    prev.setUTCDate(prev.getUTCDate() + 1);
    run = prev.toISOString().slice(0, 10) === days[i] ? run + 1 : 1;
    longest = Math.max(longest, run);
  }
  let current = 0;
  const cursor = new Date(today() + 'T00:00:00Z');
  if (!set.has(today())) cursor.setUTCDate(cursor.getUTCDate() - 1);
  while (set.has(cursor.toISOString().slice(0, 10))) {
    current += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return { current, longest: Math.max(longest, current) };
}

export function stats() {
  const s = load();
  const days = activityDays();
  const streak = streakOf(days);
  const byKindMap = {};
  for (const row of s.sessions) {
    const k = row.kind;
    byKindMap[k] = byKindMap[k] || { kind: k, n: 0, sum: 0, best: 0 };
    byKindMap[k].n += 1;
    if (typeof row.score === 'number') {
      byKindMap[k].sum += row.score;
      byKindMap[k].best = Math.max(byKindMap[k].best, row.score);
    }
  }
  const byKind = Object.values(byKindMap).map((b) => ({ kind: b.kind, n: b.n, avg: b.n ? b.sum / b.n : null }));
  const best = Object.values(byKindMap).map((b) => ({ kind: b.kind, best: b.best }));
  const xp = s.user.xp || 0;
  return {
    user: { ...s.user },
    streak,
    level: Math.floor(xp / 500) + 1,
    xpToNext: 500 - (xp % 500),
    levelProgress: (xp % 500) / 500,
    days: [...days].reverse(),
    byKind, best,
    progress: s.progress.map((p) => ({ ...p })),
    totalSessions: s.sessions.length,
    storage: 'browser',
  };
}

export function reset() {
  state = blank();
  save();
  return { ok: true, stats: stats() };
}
