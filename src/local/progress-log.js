// ─────────────────────────────────────────────────────────────
//  Per-day practice log, persisted in localStorage.
//  Used by Daily Dojo, Skill Tracks and Games so a tick survives
//  a reload. Works in both server and static mode — this is UI
//  state, not XP; XP is still recorded through api.logXp.
// ─────────────────────────────────────────────────────────────

const KEY = 'charisma-lab.practice.v1';

const read = () => {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
};
const write = (v) => {
  try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* quota */ }
};
const today = () => new Date().toISOString().slice(0, 10);

// { daily: { '2026-10-30': [drillId] }, skills: { 'track:ex': iso }, games: [{...}] }
const blank = () => ({ daily: {}, skills: {}, games: [] });

export function getDaily(date = today()) {
  return read().daily?.[date] || [];
}

export function markDaily(id, date = today()) {
  const s = { ...blank(), ...read() };
  s.daily = s.daily || {};
  const list = new Set(s.daily[date] || []);
  list.add(id);
  s.daily[date] = [...list];
  write(s);
  return s.daily[date];
}

export function getSkills() {
  return read().skills || {};
}

export function markSkill(key) {
  const s = { ...blank(), ...read() };
  s.skills = { ...(s.skills || {}), [key]: new Date().toISOString() };
  write(s);
  return s.skills;
}

export function getGames() {
  return read().games || [];
}

export function logGame(entry) {
  const s = { ...blank(), ...read() };
  s.games = [entry, ...(s.games || [])].slice(0, 30);
  write(s);
  return s.games;
}

export function streakOfPractice() {
  const s = read();
  const dates = Object.keys(s.daily || {}).sort();
  if (!dates.length) return 0;
  let run = 0;
  const cursor = new Date(today() + 'T00:00:00Z');
  const set = new Set(dates);
  if (!set.has(today())) cursor.setUTCDate(cursor.getUTCDate() - 1);
  while (set.has(cursor.toISOString().slice(0, 10))) {
    run += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return run;
}

export function resetPractice() {
  write(blank());
}
