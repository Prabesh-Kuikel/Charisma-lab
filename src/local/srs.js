// ─────────────────────────────────────────────────────────────
//  Spaced repetition for conversation skills
//  A playbook or drill is scheduled at 3, 7, 21 and 60 days.
//  A "stumble" resets to 3; a clean rep promotes one step.
//  Pure functions + localStorage so it works in the static build.
// ─────────────────────────────────────────────────────────────

const KEY = 'charisma-lab.srs.v1';
export const INTERVALS = [3, 7, 21, 60];

const todayISO = () => new Date().toISOString().slice(0, 10);
const addDays = (iso, days) => {
  const d = new Date(iso + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};
const daysBetween = (a, b) => Math.round((new Date(b + 'T00:00:00Z') - new Date(a + 'T00:00:00Z')) / 86400000);

export function loadSrs() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '{}');
    return raw && typeof raw === 'object' ? raw : {};
  } catch {
    return {};
  }
}

function saveSrs(all) {
  try { localStorage.setItem(KEY, JSON.stringify(all)); } catch { /* quota */ }
}

/**
 * Record one rep of an item.
 * @param {string} id      playbook or drill id
 * @param {'clean'|'stumble'} result
 */
export function recordRep(id, result = 'clean') {
  const all = loadSrs();
  const cur = all[id] || { step: -1, reps: 0, lapses: 0 };
  const step = result === 'stumble' ? 0 : Math.min(cur.step + 1, INTERVALS.length - 1);
  const next = {
    step,
    reps: (cur.reps || 0) + 1,
    lapses: (cur.lapses || 0) + (result === 'stumble' ? 1 : 0),
    last: todayISO(),
    due: addDays(todayISO(), INTERVALS[step]),
  };
  all[id] = next;
  saveSrs(all);
  return next;
}

/** Items due today (or overdue), most overdue first. */
export function dueItems(ids) {
  const all = loadSrs();
  const today = todayISO();
  const list = [];
  for (const id of ids) {
    const rec = all[id];
    if (!rec) continue;
    if (rec.due <= today) list.push({ id, ...rec, overdue: daysBetween(rec.due, today) });
  }
  return list.sort((a, b) => b.overdue - a.overdue);
}

/** Everything tracked, with its due date, for the review screen. */
export function allSrs(ids) {
  const all = loadSrs();
  const today = todayISO();
  return ids
    .filter((id) => all[id])
    .map((id) => {
      const rec = all[id];
      return { id, ...rec, dueIn: daysBetween(today, rec.due), isDue: rec.due <= today };
    })
    .sort((a, b) => a.dueIn - b.dueIn);
}

/** Anything that has lapsed and is due — the highest-value review. */
export function weakSpots(ids, limit = 5) {
  return dueItems(ids)
    .filter((x) => x.lapses > 0)
    .slice(0, limit);
}

export const streakFromSrs = (ids) => {
  const all = loadSrs();
  const reps = ids.filter((id) => all[id]).length;
  const lapses = ids.reduce((n, id) => n + (all[id]?.lapses || 0), 0);
  return { tracked: reps, lapses };
};
