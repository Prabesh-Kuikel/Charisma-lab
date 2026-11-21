// ─────────────────────────────────────────────────────────────
//  Local API — the whole backend, in the browser.
//  Same function names and payloads as src/api.js, so every view
//  works unchanged. Content and engines are imported directly.
// ─────────────────────────────────────────────────────────────

import { MENTORS } from '../../server/content/mentors.js';
import { TRACKS, TRACK_MAP } from '../../server/content/courses.js';
import { IMPROMPTU_PROMPTS, TWISTERS, PANGERAMS } from '../../server/content/lab.js';
import { WIT_SCENARIOS, WIT_META } from '../../server/content/wit.js';
import { ARENA_SCENARIOS } from '../../server/content/arena.js';
import { BODY_CARDS, BODY_CLUSTERS } from '../../server/content/body.js';
import { LIBRARY } from '../../server/content/library.js';
import { FAST_LESSONS } from '../../server/content/lessons-fast.js';
import { ARCHIVE_LESSONS as DEEP_1 } from '../../server/content/lessons-deep.js';
import { BATCH2 as DEEP_2 } from '../../server/content/lessons-deep-2.js';
import { BATCH3 as DEEP_3 } from '../../server/content/lessons-deep-3.js';
import { LIBRARY_DEEP, LIBRARY_COURSE_LINKS } from '../../server/content/library-deep.js';
import { LIBRARY_DEEP_2 } from '../../server/content/library-deep-2.js';
import { LIBRARY_DEEP_3 } from '../../server/content/library-deep-3.js';
import { GAMES } from '../../server/content/games.js';
import { ACADEMY } from '../../server/content/academy.js';
import { EXTRA_BODY_CARDS, BODY_CLUSTER_NOTES } from '../../server/content/body-extra.js';
import { FRAMEWORKS, FRAMEWORK_CATEGORIES } from '../../server/content/frameworks.js';
import { EXTRA_PROMPTS, EXTRA_TWISTERS, EXTRA_PANGERAMS } from '../../server/content/lab-extra.js';
import { SKILL_TRACKS } from '../../server/content/skills.js';
import {
  CREATOR_PILLARS, CREATOR_FORMATS, HOOK_PATTERNS, PLATFORM_NOTES,
  CREATOR_SKILLS, FOUR_WEEK_PLAN, CREATOR_CHECKLIST, IDEA_TOPICS, IDEA_ANGLES,
} from '../../server/content/creator.js';
import { WEEKLY_THEMES, DAILY_DRILLS, planForDate } from '../../server/content/daily.js';
import { analyzeSpeech, scoreWit, scorePronunciation, arenaReply, arenaSummary } from '../../server/analysis.js';
import { COACH_MODES, coachRespond, coachStarters } from '../../server/coach.js';
import * as store from './store.js';

// ── build the same indexes the server builds ─────────────────
const LESSONS = {
  fast: Object.fromEntries(FAST_LESSONS.map((l) => [l.day, l])),
  deep: Object.fromEntries([...DEEP_1, ...DEEP_2, ...DEEP_3].map((l) => [l.day, l])),
};
const CHAPTERS = { ...LIBRARY_DEEP, ...LIBRARY_DEEP_2, ...LIBRARY_DEEP_3 };

const withLessons = (track) => ({
  ...track,
  days: track.days.map((d) => {
    const lesson = LESSONS[track.id]?.[d.day] || null;
    return { ...d, lesson, libraryRefs: lesson?.libraryRefs || d.libraryRefs || [] };
  }),
});

const TRACKDAYS = TRACKS.map(withLessons);

const TAUGHT_IN = {};
for (const t of TRACKDAYS) {
  for (const d of t.days) {
    for (const ref of d.libraryRefs || []) {
      (TAUGHT_IN[ref] = TAUGHT_IN[ref] || []).push({ track: t.id, trackName: t.name, day: d.day, title: d.title });
    }
  }
}

const libraryItem = (i) => ({
  ...i,
  hasChapter: !!CHAPTERS[i.id],
  chapter: CHAPTERS[i.id] || null,
  courseLinks: (TAUGHT_IN[i.id] || LIBRARY_COURSE_LINKS[i.id] || [])
    .map((l) => (l.trackName ? l : { ...l, trackName: TRACK_MAP[l.track]?.name }))
    .slice(0, 6),
});

const LIBRARY_FULL = LIBRARY.map(libraryItem);

const CONTENT = {
  mentors: MENTORS,
  tracks: TRACKS.map((t) => ({
    id: t.id, name: t.name, subtitle: t.subtitle, description: t.description,
    blocks: t.blocks || null, dayCount: t.days.length,
    lessonsWritten: LESSONS[t.id] ? Object.keys(LESSONS[t.id]).length : 0,
  })),
  prompts: [...IMPROMPTU_PROMPTS, ...EXTRA_PROMPTS],
  twisters: [...TWISTERS, ...EXTRA_TWISTERS],
  pangerams: [...PANGERAMS, ...EXTRA_PANGERAMS],
  wit: WIT_SCENARIOS,
  witMeta: WIT_META,
  arena: ARENA_SCENARIOS.map(({ facts, probes, reactions, ...rest }) => rest),
  body: [...BODY_CARDS, ...EXTRA_BODY_CARDS],
  bodyClusters: BODY_CLUSTERS,
  bodyNotes: BODY_CLUSTER_NOTES,
  library: LIBRARY_FULL,
  chaptersWritten: Object.keys(CHAPTERS).length,
  games: GAMES,
  academy: ACADEMY,
  frameworks: FRAMEWORKS,
  frameworkCategories: FRAMEWORK_CATEGORIES,
  skills: SKILL_TRACKS,
  creator: {
    pillars: CREATOR_PILLARS, formats: CREATOR_FORMATS, hooks: HOOK_PATTERNS,
    platforms: PLATFORM_NOTES, ladder: CREATOR_SKILLS, plan: FOUR_WEEK_PLAN,
    checklist: CREATOR_CHECKLIST, topics: IDEA_TOPICS, angles: IDEA_ANGLES,
  },
  daily: { themes: WEEKLY_THEMES, drills: DAILY_DRILLS },
  coachModes: COACH_MODES,
  local: true,
};

const xpFor = (track, day) => {
  const t = TRACK_MAP[track];
  const d = t?.days.find((x) => x.day === Number(day));
  return d?.xp || 25;
};

export const api = {
  content: async () => CONTENT,
  bootstrap: async () => ({ ...store.stats(), recent: store.recentSessions(12) }),
  track: async (id) => {
    const t = TRACK_MAP[id];
    if (!t) throw new Error('Track not found');
    return withLessons(t);
  },
  library: async (q = '', category = '') => {
    const query = String(q).toLowerCase().trim();
    let items = LIBRARY_FULL;
    if (category && category !== 'All') items = items.filter((i) => i.category === category);
    if (query) {
      const stem = (w) => w.replace(/(ies|es|s)$/i, '');
      const tokens = query.split(/\s+/).filter(Boolean).map(stem);
      items = items.filter((i) => {
        const chapterText = i.chapter
          ? [i.chapter.thesis, ...i.chapter.deep, ...(i.chapter.script || []).map((l) => l.line), ...(i.chapter.failureModes || []), ...(i.chapter.drill || [])].join(' ')
          : '';
        const hay = stem(`${i.title} ${i.short} ${i.body} ${i.source} ${i.tags.join(' ')} ${i.use} ${i.category} ${chapterText}`.toLowerCase());
        return tokens.every((t) => hay.includes(t));
      });
    }
    return { items, total: items.length };
  },

  // Progress. Deliberately ungated: any day, any order, no streak needed.
  completeDay: async (body) => {
    const res = store.completeDay(body);
    const xp = res.alreadyDone ? 0 : xpFor(body.track, body.day);
    if (xp) { store.addXp(`course-${body.track}`, xp); store.saveSession('course', `${body.track}:${body.day}`, body.score ?? null, { notes: body.notes || '' }); }
    return { ...res, xpGained: xp, stats: store.stats() };
  },
  uncompleteDay: async (body) => store.uncompleteDay(body),

  analyzeSpeech: async ({ transcript = '', mode = 'impromptu', metrics = {}, promptText = '', ref = null }) => {
    const result = analyzeSpeech({ transcript, mode, metrics, promptText });
    store.saveSession(mode, ref, result.overall, { transcript, metrics, promptText, result });
    store.addXp(mode, Math.max(10, Math.round(result.overall * 0.6)));
    return { ...result, sessionId: null, stats: store.stats() };
  },

  analyzeWit: async ({ scenarioId, response = '' }) => {
    const scenario = WIT_SCENARIOS.find((s) => s.id === scenarioId);
    if (!scenario) throw new Error('Scenario not found');
    const result = scoreWit({ scenario, response });
    store.saveSession('wit', scenario.id, result.overall, { response, result });
    store.addXp('wit', Math.max(10, Math.round(result.overall * 0.5)));
    return { ...result, sessionId: null, stats: store.stats() };
  },

  analyzePronunciation: async ({ target = '', heard = '', durationSec = 0, attempt = 1 }) => {
    const result = scorePronunciation({ target, heard, durationSec, attempts: attempt });
    store.saveSession('pronunciation', target.slice(0, 40), result.accuracy, { target, heard, durationSec, result });
    if (result.accuracy > 0) store.addXp('pronunciation', Math.max(6, Math.round(result.accuracy * 0.3)));
    return { ...result, sessionId: null, stats: store.stats() };
  },

  answerBody: async ({ cardId, choice }) => {
    const card = [...BODY_CARDS, ...EXTRA_BODY_CARDS].find((c) => c.id === cardId);
    if (!card) throw new Error('Card not found');
    const correct = Number(choice) === card.answer;
    store.saveSession('body', cardId, correct ? 100 : 0, { choice, correct });
    if (correct) store.addXp('body', 12);
    return { correct, answer: card.answer, explain: card.explain, cue: card.cue, stats: store.stats() };
  },

  arenaStart: async ({ scenarioId }) => {
    const scenario = ARENA_SCENARIOS.find((s) => s.id === scenarioId);
    if (!scenario) throw new Error('Scenario not found');
    const history = [{ role: 'persona', text: scenario.opener, kind: 'opener' }];
    const payload = { scenarioId, history, turn: 0, trust: 50 };
    const id = store.saveSession('arena', scenarioId, null, payload);
    store.addXp('arena', 5);
    return { sessionId: id, scenario: { ...scenario, facts: undefined, probes: undefined, reactions: undefined }, history, trust: 50 };
  },

  arenaMessage: async ({ sessionId, message = '' }) => {
    const row = store.getSession(sessionId);
    if (!row) throw new Error('Session not found');
    const payload = JSON.parse(row.payload);
    const scenario = ARENA_SCENARIOS.find((s) => s.id === payload.scenarioId);
    if (!scenario) throw new Error('Scenario not found');
    payload.history.push({ role: 'user', text: message, at: new Date().toISOString() });
    const reply = arenaReply({ scenario, history: payload.history, message, turn: payload.turn });
    payload.history.push({ role: 'persona', text: reply.reply, kind: reply.kind, reaction: reply.reaction, trust: reply.trustBefore });
    payload.turn += 1;
    payload.trust = reply.trustBefore;
    store.updateSession(sessionId, reply.trustBefore, payload);
    store.addXp('arena', 3);
    return { ...reply, sessionId, turn: payload.turn };
  },

  arenaEnd: async ({ sessionId }) => {
    const row = store.getSession(sessionId);
    if (!row) throw new Error('Session not found');
    const payload = JSON.parse(row.payload);
    const scenario = ARENA_SCENARIOS.find((s) => s.id === payload.scenarioId);
    const summary = arenaSummary({ scenario, history: payload.history });
    const score = Math.round(summary.overall * 0.6 + (payload.trust || 50) * 0.4);
    store.updateSession(sessionId, score, payload);
    store.addXp('arena', Math.max(10, Math.round(score * 0.4)));
    return { ...summary, trust: payload.trust, score, stats: store.stats() };
  },

  // New surfaces
  coach: async ({ message = '', mode = 'general' }) => {
    const history = store.coachHistory();
    const res = coachRespond({ message, history, mode });
    store.pushCoach('user', message);
    store.pushCoach('coach', res.reply);
    store.addXp('coach', 8);
    return res;
  },
  coachHistory: async () => store.coachHistory(),
  coachReset: async () => { store.clearCoach(); return { ok: true }; },
  coachStarters: async (mode) => coachStarters(mode),

  logXp: async ({ kind, xp = 0 }) => { store.addXp(kind, xp); return { ok: true, stats: store.stats() }; },

  sessions: async () => store.recentSessions(50).map(({ id, kind, ref, score, created_at }) => ({ id, kind, ref, score, created_at })),
  updateUser: async (body) => store.patchUser(body),
  reset: async () => store.reset(),
};

export const fmtTime = (s) => {
  const m = Math.floor(Math.abs(s) / 60);
  const sec = Math.abs(s) % 60;
  return `${s < 0 ? '-' : ''}${m}:${String(sec).padStart(2, '0')}`;
};

export { planForDate };
