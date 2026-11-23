// ─────────────────────────────────────────────────────────────
//  Insights
//  The app already stores every session, rep and score. This turns
//  that into the four honest questions: am I improving, where am I
//  stalling, what have I never touched, and what should I do today.
// ─────────────────────────────────────────────────────────────

const DAY = 86400000;
const iso = (d) => d.toISOString().slice(0, 10);

export const KIND_NAME = {
  impromptu: 'Impromptu', wit: 'Wit & banter', arena: 'Arena', pronunciation: 'Pronunciation',
  gym: 'Playbook reps', course: 'Course days', coach: 'Coach', daily: 'Daily drills',
  academy: 'Academy drills', game: 'Games', skill: 'Skill reps',
};

/** Rolling average of scored sessions, oldest → newest. */
export function scoreTrend(sessions = [], kind = null, window = 5) {
  const scored = sessions
    .filter((s) => typeof s.score === 'number' && (!kind || s.kind === kind))
    .sort((a, b) => String(a.created_at).localeCompare(String(b.created_at)));
  const out = [];
  for (let i = 0; i < scored.length; i++) {
    const slice = scored.slice(Math.max(0, i - window + 1), i + 1);
    out.push({ at: scored[i].created_at, score: scored[i].score, avg: slice.reduce((n, x) => n + x.score, 0) / slice.length });
  }
  return out;
}

/** First half vs second half of the last N scored sessions, per kind. */
export function improvements(sessions = [], min = 4) {
  const byKind = {};
  for (const s of sessions) {
    if (typeof s.score !== 'number') continue;
    (byKind[s.kind] = byKind[s.kind] || []).push(s);
  }
  const out = [];
  for (const [kind, list] of Object.entries(byKind)) {
    if (list.length < min) continue;
    const sorted = [...list].sort((a, b) => String(a.created_at).localeCompare(String(b.created_at)));
    const half = Math.floor(sorted.length / 2);
    const first = sorted.slice(0, half);
    const last = sorted.slice(-half);
    const avg = (a) => a.reduce((n, x) => n + x.score, 0) / a.length;
    const a = avg(first);
    const b = avg(last);
    out.push({ kind, name: KIND_NAME[kind] || kind, from: Math.round(a), to: Math.round(b), delta: Math.round(b - a), n: sorted.length });
  }
  return out.sort((x, y) => y.delta - x.delta);
}

/** What has been opened at all vs what exists — the honest coverage number. */
export function coverage(content, sessions = [], srs = {}, scripts = [], days = new Set()) {
  const touched = {
    gym: new Set(Object.keys(srs)),
    library: new Set(),
    academy: new Set(),
  };
  for (const s of sessions) {
    const ref = String(s.ref || '');
    if (ref.startsWith('lib-')) touched.library.add(ref);
    if (ref.startsWith('acad-') || ref.startsWith('academy-')) touched.academy.add(ref.replace(/^academy?-/, ''));
  }
  const total = {
    gym: (content.gym || []).length,
    library: (content.library || []).length,
    academy: (content.academy || []).length,
    courses: (content.tracks || []).reduce((n, t) => n + t.dayCount, 0),
    scripts: Infinity,
  };
  const done = {
    gym: touched.gym.size,
    library: touched.library.size,
    academy: touched.academy.size,
    courses: days.size,
    scripts: scripts.length,
  };
  return Object.keys(total).map((k) => ({
    key: k,
    label: k === 'gym' ? 'Playbooks rehearsed' : k === 'library' ? 'Chapters read' : k === 'academy' ? 'Academy modules used' : k === 'courses' ? 'Course days done' : 'My own scripts',
    done: done[k],
    total: total[k],
    pct: total[k] === Infinity ? null : Math.min(100, Math.round((done[k] / Math.max(1, total[k])) * 100)),
  }));
}

/** Days since each store last changed — the "you have stopped doing X" list. */
export function neglected(sessions = [], today = new Date()) {
  const last = {};
  for (const s of sessions) {
    const d = String(s.created_at || '').slice(0, 10);
    if (!d) continue;
    if (!last[s.kind] || d > last[s.kind]) last[s.kind] = d;
  }
  return Object.entries(last)
    .map(([kind, d]) => ({ kind, name: KIND_NAME[kind] || kind, days: Math.round((today - new Date(d + 'T00:00:00Z')) / DAY) }))
    .sort((a, b) => b.days - a.days);
}

/**
 * One recommendation for today, in priority order:
 * a due review beats a lapsed skill beats a stalled score beats a new area.
 */
export function recommend({ srsDue = [], improvements: imps = [], neglected: neg = [], coverage: cov = [], hasScripts = false }) {
  if (srsDue.length) {
    return { kind: 'review', title: `Clear ${srsDue.length} due review${srsDue.length === 1 ? '' : 's'}`, body: 'Skills fade on a schedule. These are already past their date — one rep each is the highest-value ten minutes you have.', cta: 'Start review', view: 'gym' };
  }
  const falling = imps.filter((i) => i.delta <= -5).sort((a, b) => a.delta - b.delta)[0];
  if (falling) {
    return { kind: 'stall', title: `${falling.name} has slipped ${Math.abs(falling.delta)} points`, body: `Your recent average is ${falling.to}, down from ${falling.from}. Go back to the drill rather than pushing harder: the last three sessions are the ones to re-read.`, cta: 'Open the drill', view: falling.kind === 'pronunciation' ? 'pronunciation' : falling.kind === 'wit' ? 'wit' : falling.kind === 'arena' ? 'arena' : 'impromptu' };
  }
  const cold = neg.find((n) => n.days >= 14 && n.kind !== 'coach');
  if (cold) {
    return { kind: 'cold', title: `${cold.name} untouched for ${cold.days} days`, body: 'Nothing is ruined by a gap, but this is the one part of your practice that has gone quiet. Ten minutes resets it.', cta: 'Restart', view: cold.kind === 'gym' ? 'gym' : cold.kind === 'impromptu' ? 'impromptu' : cold.kind === 'wit' ? 'wit' : cold.kind === 'arena' ? 'arena' : 'daily' };
  }
  const thinnest = [...cov].filter((c) => c.pct != null && c.pct < 15).sort((a, b) => a.pct - b.pct)[0];
  if (thinnest) {
    return { kind: 'new', title: `You have barely touched ${thinnest.label.toLowerCase()}`, body: `${thinnest.done} of ${thinnest.total}. Broad skill comes from breadth first — pick any one and open it cold.`, cta: 'Explore', view: thinnest.key === 'library' ? 'library' : thinnest.key === 'academy' ? 'academy' : thinnest.key === 'courses' ? 'courses' : 'gym' };
  }
  if (!hasScripts) {
    return { kind: 'script', title: 'Write one line in your own words', body: 'A line you wrote is worth ten you read. Save one sentence you would actually say, then record yourself saying it.', cta: 'Write a script', view: 'scripts' };
  }
  return { kind: 'keep', title: 'Keep the streak honest', body: 'Nothing is slipping and nothing is overdue. One impromptu rep to stay sharp — 90 seconds, any prompt.', cta: 'Impromptu sprint', view: 'impromptu' };
}

/** Simple hex sparkline points for a series of numbers. */
export function sparkPath(values, w = 120, h = 32) {
  if (!values.length) return '';
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return values.map((v, i) => {
    const x = (i / Math.max(1, values.length - 1)) * w;
    const y = h - ((v - min) / span) * (h - 4) - 2;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
}

export { iso };
