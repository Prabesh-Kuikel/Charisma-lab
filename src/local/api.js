// ─────────────────────────────────────────────────────────────
//  Local API — the whole backend, in the browser.
//  Same function names and payloads as src/api.js, so every view
//  works unchanged. Content and engines are imported directly.
// ─────────────────────────────────────────────────────────────

import { GLOSSARY, GLOSSARY_CATEGORIES } from '../../server/content/glossary.js';
import { MENTORS } from '../../server/content/mentors.js';
import { TRACKS, TRACK_MAP } from '../../server/content/courses.js';
import { IMPROMPTU_PROMPTS, TWISTERS, PANGERAMS } from '../../server/content/lab.js';
import { WIT_SCENARIOS, WIT_META } from '../../server/content/wit.js';
import { WIT_EXTRA_5 } from '../../server/content/wit-extra-5.js';
import { WIT_EXTRA_10 } from '../../server/content/wit-extra-10.js';
import { ARENA_SCENARIOS } from '../../server/content/arena.js';
import { ARENA_EXTRA } from '../../server/content/arena-extra.js';
import { ARENA_EXTRA_10 } from '../../server/content/arena-extra-10.js';
import { BODY_CARDS, BODY_CLUSTERS } from '../../server/content/body.js';
import { LIBRARY } from '../../server/content/library.js';
import { WRITTEN_ENTRIES, WRITTEN_GYM, WRITTEN_CATEGORY } from '../../server/content/written.js';
import { loadLessons } from './lessons.js';
import { LIBRARY_COURSE_LINKS } from '../../server/content/library-links.js';
import { CHAPTER_IDS } from '../../server/content/chapter-ids.js';
import { loadChapters } from './chapters.js';
import { touchDay } from './store.js';
import { GAMES } from '../../server/content/games.js';
import { ACADEMY } from '../../server/content/academy.js';
import { ACADEMY_EXTRA } from '../../server/content/academy-extra.js';
import { LIBRARY_EXTRA } from '../../server/content/library-extra.js';
import { GYM_SCENARIOS, GYM_CATEGORIES } from '../../server/content/gym.js';
import { GYM_EXTRA, GYM_EXTRA_CATEGORIES } from '../../server/content/gym-extra.js';
import { GYM_EXTRA_5 } from '../../server/content/gym-extra-5.js';
import { GYM_OUTCOMES } from '../../server/content/gym-outcomes.js';
import { PSY_ENTRIES, PSY_ALL, PSY_CATEGORIES, PSY_MANIFESTO } from '../../server/content/psychology.js';
import { LIBRARY_EXTRA_3 } from '../../server/content/library-extra-3.js';
import { LIBRARY_EXTRA_5 } from '../../server/content/library-extra-5.js';
import { ACADEMY_EXTRA_3 } from '../../server/content/academy-extra-3.js';
import { ACADEMY_EXTRA_4 } from '../../server/content/academy-extra-4.js';
import { ACADEMY_EXTRA_5 } from '../../server/content/academy-extra-5.js';
import { EXTRA_FRAMEWORKS, EXTRA_FRAMEWORK_CATEGORIES, EXTRA_WIT, EXTRA_BODY_V4, EXTRA_DAILY } from '../../server/content/content-v4.js';
import { EXTRA_FRAMEWORKS_5, EXTRA_DAILY_5, EXTRA_DAILY_10, EXTRA_DAILY_10B } from '../../server/content/content-5.js';
import { EXTRA_BODY_CARDS, BODY_CLUSTER_NOTES } from '../../server/content/body-extra.js';
import { FRAMEWORKS, FRAMEWORK_CATEGORIES } from '../../server/content/frameworks.js';
import { STORIES, STORY_TYPES, STORY_RULES, STORY_NOTES } from '../../server/content/stories.js';
import { ACADEMY_LEVELS, ACADEMY_PACING, ACADEMY_START } from '../../server/content/academy-pacing.js';
import { EXTRA_PROMPTS, EXTRA_TWISTERS, EXTRA_PANGERAMS } from '../../server/content/lab-extra.js';
import { EXTRA_PROMPTS_5 } from '../../server/content/lab-extra-5.js';
import { SKILL_TRACKS } from '../../server/content/skills.js';
import { SKILL_TRACKS_EXTRA } from '../../server/content/skills-extra.js';
import {
  CREATOR_PILLARS, CREATOR_FORMATS, HOOK_PATTERNS, PLATFORM_NOTES,
  CREATOR_SKILLS, FOUR_WEEK_PLAN, CREATOR_CHECKLIST, IDEA_TOPICS, IDEA_ANGLES,
} from '../../server/content/creator.js';
import { WEEKLY_THEMES, DAILY_DRILLS, planForDate } from '../../server/content/daily.js';
import { analyzeSpeech, scoreWit, scorePronunciation, arenaReply, arenaSummary } from '../../server/analysis.js';

import { COACH_MODES, coachRespond, coachStarters } from '../../server/coach.js';
import * as store from './store.js';
import { logRep, setActivityMirror } from './reps.js';

// Both arena wings, one list — the client must see exactly what the server serves.
const ARENA_ALL = [...ARENA_SCENARIOS, ...ARENA_EXTRA, ...ARENA_EXTRA_10];

// ── build the same indexes the server builds ─────────────────
// Lessons are a separate chunk (315 KB of prose) and load on first use.
let LESSONS = { fast: {}, deep: {} };
export const lessonsReady = () => loadLessons().then((l) => { LESSONS = l; return l; });
// Which entries HAVE a chapter is a tiny manifest; the prose is lazy.
const CHAPTERS = new Set(CHAPTER_IDS);
setActivityMirror(touchDay);

const HAS = (id) => CHAPTERS.has(id);

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
  hasChapter: HAS(i.id),
  chapter: null, // filled in on demand by api.chapter(id)
  courseLinks: (TAUGHT_IN[i.id] || LIBRARY_COURSE_LINKS[i.id] || [])
    .map((l) => (l.trackName ? l : { ...l, trackName: TRACK_MAP[l.track]?.name }))
    .slice(0, 6),
});

// same merge as the server, so both builds serve the identical playbook text
const withOutcome = (g) => (GYM_OUTCOMES[g.id] && g.lines.length < 5
  ? { ...g, lines: [...g.lines, GYM_OUTCOMES[g.id]] }
  : g);
const ALL_GYM = [...GYM_SCENARIOS, ...GYM_EXTRA, ...GYM_EXTRA_5, ...WRITTEN_GYM].map(withOutcome);
const LIBRARY_FULL = [...LIBRARY, ...LIBRARY_EXTRA, ...LIBRARY_EXTRA_3, ...LIBRARY_EXTRA_5, ...WRITTEN_ENTRIES].map(libraryItem);

const CONTENT = {
  mentors: MENTORS,
  tracks: TRACKS.map((t) => ({
    id: t.id, name: t.name, subtitle: t.subtitle, description: t.description,
    blocks: t.blocks || null, dayCount: t.days.length,
    lessonsWritten: LESSONS[t.id] ? Object.keys(LESSONS[t.id]).length : 0,
  })),
  prompts: [...IMPROMPTU_PROMPTS, ...EXTRA_PROMPTS, ...EXTRA_PROMPTS_5],
  twisters: [...TWISTERS, ...EXTRA_TWISTERS],
  pangerams: [...PANGERAMS, ...EXTRA_PANGERAMS],
  wit: [...WIT_SCENARIOS, ...EXTRA_WIT, ...WIT_EXTRA_5, ...WIT_EXTRA_10],
  witMeta: WIT_META,
  arena: ARENA_ALL.map(({ facts, probes, reactions, ...rest }) => rest),
  body: [...BODY_CARDS, ...EXTRA_BODY_CARDS, ...EXTRA_BODY_V4],
  psychology: PSY_ALL,
  stories: STORIES,
  storyTypes: STORY_TYPES,
  storyRules: STORY_RULES,
  storyNotes: STORY_NOTES,
  psyCategories: PSY_CATEGORIES,
  psyManifesto: PSY_MANIFESTO,
  bodyClusters: BODY_CLUSTERS,
  bodyNotes: BODY_CLUSTER_NOTES,
  library: LIBRARY_FULL,
  chaptersWritten: CHAPTER_IDS.length,
  games: GAMES,
  academy: [...ACADEMY, ...ACADEMY_EXTRA, ...ACADEMY_EXTRA_3, ...ACADEMY_EXTRA_4, ...ACADEMY_EXTRA_5],
  academyLevels: ACADEMY_LEVELS,
  academyPacing: ACADEMY_PACING,
  academyStart: ACADEMY_START,
  gym: ALL_GYM,
  gymCategories: [...GYM_CATEGORIES, ...GYM_EXTRA_CATEGORIES, WRITTEN_CATEGORY.name],
  frameworks: [...FRAMEWORKS, ...EXTRA_FRAMEWORKS, ...EXTRA_FRAMEWORKS_5],
  frameworkCategories: [...FRAMEWORK_CATEGORIES, ...EXTRA_FRAMEWORK_CATEGORIES],
  skills: [...SKILL_TRACKS, ...SKILL_TRACKS_EXTRA],
  creator: {
    pillars: CREATOR_PILLARS, formats: CREATOR_FORMATS, hooks: HOOK_PATTERNS,
    platforms: PLATFORM_NOTES, ladder: CREATOR_SKILLS, plan: FOUR_WEEK_PLAN,
    checklist: CREATOR_CHECKLIST, topics: IDEA_TOPICS, angles: IDEA_ANGLES,
  },
  daily: { themes: WEEKLY_THEMES, drills: [...DAILY_DRILLS, ...EXTRA_DAILY, ...EXTRA_DAILY_5, ...EXTRA_DAILY_10, ...EXTRA_DAILY_10B] },
  glossary: GLOSSARY,
  glossaryCategories: GLOSSARY_CATEGORIES,
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
  chapter: async (id) => {
    const all = await loadChapters();
    return all[id] || null;
  },
  track: async (id) => {
    const t = TRACK_MAP[id];
    if (!t) throw new Error('Track not found');
    if (!Object.keys(LESSONS[id] || {}).length) await lessonsReady();
    return withLessons(t);
  },
  library: async (q = '', category = '') => {
    const query = String(q).toLowerCase().trim();
    let items = LIBRARY_FULL;
    if (category && category !== 'All') items = items.filter((i) => i.category === category);
    if (query) {
      const stem = (w) => w.replace(/(ies|es|s)$/i, '');
      const tokens = query.split(/\s+/).filter(Boolean).map(stem);
      // the prose is not loaded yet on a cold open, so fetch it before
      // searching chapter text — otherwise the search silently forgets
      // that "hostage" is in the Yes, And chapter
      let chapters = null;
      try { chapters = await loadChapters(); } catch { /* title/body search only */ }
      const scored = [];
      items = items.filter((i) => {
        const ch = chapters?.[i.id];
        const chapterText = ch
          ? [ch.thesis, ...(ch.deep || []), ...(ch.script || []).map((l) => l.line), ...(ch.failureModes || []), ...(ch.drill || [])].join(' ')
          : '';
        // search the raw text as well as the stemmed version: "boundary" must
        // still find "Boundaries", but stemming "warm" must not become "warm"
        // only matching a stemmed "warmth" inside a different word
        const raw = `${i.title} ${i.short} ${i.body} ${i.source} ${i.tags.join(' ')} ${i.use} ${i.category} ${chapterText}`.toLowerCase();
        const hay = stem(raw);
        if (!tokens.every((t) => hay.includes(t) || raw.includes(t))) return false;
        // rank: a title hit beats a tag hit beats a body hit — an unordered
        // filter put "The Warm Exit" above "The Warm Line" for "warm line"
        const title = `${i.title} ${i.short}`.toLowerCase();
        const tags = i.tags.join(' ').toLowerCase();
        let score = 0;
        for (const t of tokens) {
          if (title.includes(t)) score += 20;
          else if (tags.includes(t)) score += 8;
          else score += 1;
        }
        if (title.trim().includes(query)) score += 15;
        scored.push([score, i]);
        return true;
      });
      items = scored.sort((a, b) => b[0] - a[0]).map((x) => x[1]);
    }
    return { items, total: items.length };
  },

  // Progress. Deliberately ungated: any day, any order, no streak needed.
  completeDay: async (body) => {
    const res = store.completeDay(body);
    const xp = res.alreadyDone ? 0 : xpFor(body.track, body.day);
    if (xp) {
      store.addXp(`course-${body.track}`, xp);
      store.saveSession('course', `${body.track}:${body.day}`, body.score ?? null, { notes: body.notes || '' });
      logRep({ kind: 'course', ref: `${body.track}:${body.day}`, label: `${body.track} day ${body.day}`, seconds: 900, score: body.score ?? null });
    }
    return { ...res, xpGained: xp, stats: store.stats() };
  },
  uncompleteDay: async (body) => store.uncompleteDay(body),

  analyzeSpeech: async ({ transcript = '', mode = 'impromptu', metrics = {}, promptText = '', ref = null }) => {
    const result = analyzeSpeech({ transcript, mode, metrics, promptText });
    store.saveSession(mode, ref, result.overall, { transcript, metrics, promptText, result });
    store.addXp(mode, Math.max(10, Math.round(result.overall * 0.6)));
    logRep({ kind: 'impromptu', ref: body.promptId || '', label: body.text?.slice(0, 80) || 'Impromptu rep', seconds: body.seconds || 0, score: result.overall });
    return { ...result, sessionId: null, stats: store.stats() };
  },

  analyzeWit: async ({ scenarioId, response = '' }) => {
    const scenario = WIT_SCENARIOS.find((s) => s.id === scenarioId);
    if (!scenario) throw new Error('Scenario not found');
    const result = scoreWit({ scenario, response });
    store.saveSession('wit', scenario.id, result.overall, { response, result });
    store.addXp('wit', Math.max(10, Math.round(result.overall * 0.5)));
    logRep({ kind: 'wit', ref: scenario.id, label: `Wit · ${scenario.title || scenario.category}`, seconds: 25, score: result.overall });
    return { ...result, sessionId: null, stats: store.stats() };
  },

  analyzePronunciation: async ({ target = '', heard = '', durationSec = 0, attempt = 1 }) => {
    const result = scorePronunciation({ target, heard, durationSec, attempts: attempt });
    store.saveSession('pronunciation', target.slice(0, 40), result.accuracy, { target, heard, durationSec, result });
    if (result.accuracy > 0) store.addXp('pronunciation', Math.max(6, Math.round(result.accuracy * 0.3)));
    if (result.accuracy > 0) logRep({ kind: 'pronunciation', ref: target.slice(0, 40), label: target.slice(0, 60), seconds: durationSec || 10, score: result.accuracy });
    return { ...result, sessionId: null, stats: store.stats() };
  },

  answerBody: async ({ cardId, choice }) => {
    const card = [...BODY_CARDS, ...EXTRA_BODY_CARDS].find((c) => c.id === cardId);
    if (!card) throw new Error('Card not found');
    const correct = Number(choice) === card.answer;
    store.saveSession('body', cardId, correct ? 100 : 0, { choice, correct });
    if (correct) store.addXp('body', 12);
    logRep({ kind: 'body', ref: cardId, label: card.cue || 'Cue spotting', seconds: 15, score: correct ? 100 : 0 });
    return { correct, answer: card.answer, explain: card.explain, cue: card.cue, stats: store.stats() };
  },

  arenaStart: async ({ scenarioId }) => {
    const scenario = ARENA_ALL.find((s) => s.id === scenarioId);
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
    const scenario = ARENA_ALL.find((s) => s.id === payload.scenarioId);
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
    const scenario = ARENA_ALL.find((s) => s.id === payload.scenarioId);
    const summary = arenaSummary({ scenario, history: payload.history });
    const score = Math.round(summary.overall * 0.6 + (payload.trust || 50) * 0.4);
    store.updateSession(sessionId, score, payload);
    store.addXp('arena', Math.max(10, Math.round(score * 0.4)));
    const userTurns = (payload.history || []).filter((h) => h.role === 'user').length;
    logRep({ kind: 'arena', ref: payload.scenarioId, label: `Arena · ${scenario?.name || 'persona'}`, seconds: userTurns * 25, score });
    return { ...summary, trust: payload.trust, score, stats: store.stats() };
  },

  // New surfaces
  coach: async ({ message = '', mode = 'general' }) => {
    const history = store.coachHistory();
    const res = coachRespond({ message, history, mode });
    store.pushCoach('user', message);
    store.pushCoach('coach', res.reply);
    store.addXp('coach', 8);
    logRep({ kind: 'coach', ref: res.intent || 'coach', label: message.slice(0, 80), seconds: 120 });
    return res;
  },
  coachHistory: async () => store.coachHistory(),
  coachReset: async () => { store.clearCoach(); return { ok: true }; },
  coachStarters: async (mode) => coachStarters(mode),

  logXp: async ({ kind, xp = 0, rep = null }) => {
    store.addXp(kind, xp);
    // callers that know what they did send a rep descriptor; the XP then comes
    // from the rep itself so the reward matches the effort
    const entry = rep ? logRep({ ...rep, kind: rep.kind || String(kind).split('-')[0] }) : null;
    return { ok: true, rep: entry, stats: store.stats() };
  },

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
