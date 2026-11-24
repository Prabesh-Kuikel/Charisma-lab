import express from 'express';
import { GLOSSARY, GLOSSARY_CATEGORIES } from './content/glossary.js';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MENTORS } from './content/mentors.js';
import { TRACKS, TRACK_MAP } from './content/courses.js';
import { IMPROMPTU_PROMPTS, TWISTERS, PANGERAMS } from './content/lab.js';
import { WIT_SCENARIOS, WIT_META } from './content/wit.js';
import { WIT_EXTRA_5 } from './content/wit-extra-5.js';
import { WIT_EXTRA_10 } from './content/wit-extra-10.js';
import { ARENA_SCENARIOS } from './content/arena.js';
import { ARENA_EXTRA } from './content/arena-extra.js';
import { ARENA_EXTRA_10 } from './content/arena-extra-10.js';
import { BODY_CARDS, BODY_CLUSTERS } from './content/body.js';
import { LIBRARY } from './content/library.js';
import { FAST_LESSONS } from './content/lessons-fast.js';
import { ARCHIVE_LESSONS as DEEP_1 } from './content/lessons-deep.js';
import { BATCH2 as DEEP_2 } from './content/lessons-deep-2.js';
import { BATCH3 as DEEP_3 } from './content/lessons-deep-3.js';
import { LIBRARY_DEEP } from './content/library-deep.js';
import { LIBRARY_COURSE_LINKS } from './content/library-links.js';
import { LIBRARY_DEEP_2 } from './content/library-deep-2.js';
import { LIBRARY_DEEP_3 } from './content/library-deep-3.js';
import { GAMES } from './content/games.js';
import { ACADEMY } from './content/academy.js';
import { ACADEMY_EXTRA } from './content/academy-extra.js';
import { LIBRARY_EXTRA } from './content/library-extra.js';
import { LIBRARY_EXTRA_DEEP } from './content/library-extra-deep.js';
import { GYM_SCENARIOS, GYM_CATEGORIES } from './content/gym.js';
import { GYM_EXTRA, GYM_EXTRA_CATEGORIES } from './content/gym-extra.js';
import { GYM_EXTRA_5 } from './content/gym-extra-5.js';
import { GYM_OUTCOMES } from './content/gym-outcomes.js';
import { PSY_ENTRIES, PSY_ALL, PSY_CATEGORIES, PSY_MANIFESTO } from './content/psychology.js';
import { LIBRARY_EXTRA_3 } from './content/library-extra-3.js';
import { LIBRARY_EXTRA_5 } from './content/library-extra-5.js';
import { LIBRARY_EXTRA_5_DEEP } from './content/library-extra-5-deep.js';
import { LIBRARY_EXTRA_3_DEEP } from './content/library-extra-3-deep.js';
import { ACADEMY_EXTRA_3 } from './content/academy-extra-3.js';
import { EXTRA_FRAMEWORKS, EXTRA_FRAMEWORK_CATEGORIES, EXTRA_WIT, EXTRA_BODY_V4, EXTRA_DAILY } from './content/content-v4.js';
import { EXTRA_FRAMEWORKS_5, EXTRA_DAILY_5, EXTRA_DAILY_10, EXTRA_DAILY_10B } from './content/content-5.js';
import { EXTRA_BODY_CARDS, BODY_CLUSTER_NOTES } from './content/body-extra.js';
import { FRAMEWORKS, FRAMEWORK_CATEGORIES } from './content/frameworks.js';
import { STORIES, STORY_TYPES, STORY_RULES, STORY_NOTES } from './content/stories.js';
import { WRITTEN_ENTRIES, WRITTEN_GYM, WRITTEN_CATEGORY } from './content/written.js';
import { WRITTEN_DEEP } from './content/written-deep.js';
import { ACADEMY_EXTRA_4 } from './content/academy-extra-4.js';
import { ACADEMY_EXTRA_5 } from './content/academy-extra-5.js';
import { ACADEMY_LEVELS, ACADEMY_PACING, ACADEMY_START } from './content/academy-pacing.js';
import { EXTRA_PROMPTS, EXTRA_TWISTERS, EXTRA_PANGERAMS } from './content/lab-extra.js';
import { EXTRA_PROMPTS_5 } from './content/lab-extra-5.js';
import { SKILL_TRACKS } from './content/skills.js';
import { SKILL_TRACKS_EXTRA } from './content/skills-extra.js';
import {
  CREATOR_PILLARS, CREATOR_FORMATS, HOOK_PATTERNS, PLATFORM_NOTES,
  CREATOR_SKILLS, FOUR_WEEK_PLAN, CREATOR_CHECKLIST, IDEA_TOPICS, IDEA_ANGLES,
} from './content/creator.js';
import { WEEKLY_THEMES, DAILY_DRILLS } from './content/daily.js';
import { coachRespond } from './coach.js';
import { COACH_MODES as COACH_MODE_META } from './coach.js';
import { rateLimit, concurrency, gzipJSON } from './guard.js';
import { aiChat, aiStatus, PROVIDERS, coachSystemPrompt, isCoachMode, COACH_MODES, arenaSystemPrompt, arenaJudgePrompt } from './ai.js';
import { analyzeSpeech, scoreWit, scorePronunciation, arenaReply, arenaSummary } from './analysis.js';
import {
  ensureUser, logActivity, statsFor, saveSession, getSession, updateSession,
  recentSessions, db,
} from './db.js';

const ARENA_ALL = [...ARENA_SCENARIOS, ...ARENA_EXTRA, ...ARENA_EXTRA_10];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// do not advertise the framework in every response
app.disable('x-powered-by');

// ── Input validation ───────────────────────────────────────
// Express's JSON parser accepts any JSON value, so a caller could send
// {"transcript": {"$ne": null}} or a 200k-element array and the analysers would
// iterate over it. Every text field is now type-checked and length-capped at
// the edge, once, rather than trusted by each handler.
const str = (v, max = 4000) => (typeof v === 'string' ? v.slice(0, max) : '');
// Only a real number or a numeric string counts: Number([1]) is 1 and
// Number({}) is NaN, so casting anything else would let `"choice": [1]` —
// or `{"$gt": ""}` — score as the answer it happens to coerce to.
const num = (v, min, max, dflt = 0) => {
  const looksNumeric = typeof v === 'number' || (typeof v === 'string' && v.trim() !== '' && Number.isFinite(Number(v)));
  if (!looksNumeric) return dflt;
  const n = Number(v);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : dflt;
};
const plainObject = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? v : {});

// ── Security headers ───────────────────────────────────────
// A single-user local app still renders untrusted text (AI replies, pasted drafts),
// so lock the document down: no inline script, no external script/frame origins.
// Kept compatible with the Vite build (which emits external hashed assets only).
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  // microphone is allowed for this origin only: the Impromptu/Rehearsal recorders
  // need it when the app is served from this server, but no iframe should get it
  res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), payment=(), microphone=(self)');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  // HSTS only makes sense over TLS; setting it on plain http is ignored at best
  if (req.secure || req.get('x-forwarded-proto') === 'https') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  // nothing here is worth caching in a proxy, and cached API JSON leaks between users
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      // the static bundle has one inline style block and inline style attributes
      "style-src 'self' 'unsafe-inline'",
      // No inline script, no eval: the bundle is external and inert.
      "script-src 'self'",
      // img/media: blob for the recorder's local playback, data for the icon
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      // the AI coach may call a provider directly (CORS-open, keyless)
      "connect-src 'self' https://text.pollinations.ai https://openrouter.ai http://127.0.0.1:11434 http://localhost:11434",
      "media-src 'self' blob:",
      "object-src 'none'",
      "manifest-src 'self'",
      "worker-src 'self' blob:",
      // belt and braces: none of these are used, so deny them explicitly
      "frame-src 'none'",
      "child-src 'self' blob:",
      "script-src-attr 'none'",
      "style-src-attr 'unsafe-inline'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join('; '),
  );
  next();
});

// ── CORS: same-origin only unless you opt in ────────────────
// This used to be app.use(cors()) — i.e. `Access-Control-Allow-Origin: *` — which
// let ANY web page the user visited drive this API from their browser: read
// /api/sessions, PATCH /api/user, POST /api/reset. The loopback bind is no
// protection against that, because the request comes from the user's own machine.
//
// If you host the UI somewhere else (e.g. the GitHub Pages build talking to a
// deployed API), list that origin explicitly:
//   ALLOWED_ORIGINS=https://prabesh-kuikel.github.io
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((o) => o.trim().replace(/\/$/, ''))
  .filter(Boolean);

app.use(cors({
  origin(origin, cb) {
    // same-origin requests and curl carry no Origin header — always fine
    if (!origin) return cb(null, true);
    const bare = origin.replace(/\/$/, '');
    const self = `http://${process.env.HOST || '127.0.0.1'}:${process.env.PORT || 3000}`;
    if (bare === self || bare === `http://localhost:${process.env.PORT || 3000}`) return cb(null, true);
    if (ALLOWED_ORIGINS.includes(bare)) return cb(null, true);
    return cb(null, false);
  },
  credentials: false,
  methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  maxAge: 600,
}));
// cap request bodies: every endpoint here takes a few KB, never megabytes
// strict:true (the default) means a bare `[1,2,3]`, `"text"`, `null` or `42` body is
// rejected with a 400 by the parser itself instead of reaching a route handler.
app.use(express.json({ limit: '256kb', strict: true }));

// A JSON body that is not an object is never legitimate here. express.json's
// `strict` mode still lets arrays through, so refuse them outright — a 400 with a
// reason is better than silently analysing an array of undefineds.
app.use('/api', (req, res, next) => {
  const b = req.body;
  if (b !== undefined && b !== null && (typeof b !== 'object' || Array.isArray(b))) {
    return res.status(400).json({ error: 'request body must be a JSON object' });
  }
  next();
});


const user = ensureUser();
const uid = user.id;

// ── Lesson + chapter wiring ────────────────────────────────
const LESSONS = {
  fast: Object.fromEntries(FAST_LESSONS.map((l) => [l.day, l])),
  deep: Object.fromEntries([...DEEP_1, ...DEEP_2, ...DEEP_3].map((l) => [l.day, l])),
};

const withLessons = (track) => ({
  ...track,
  days: track.days.map((d) => {
    const lesson = LESSONS[track.id]?.[d.day] || null;
    return {
      ...d,
      lesson,
      libraryRefs: (lesson?.libraryRefs || d.libraryRefs || []),
    };
  }),
});

const TRACKDAYS = TRACKS.map((t) => withLessons(t));

// library id → course modules that reference it (built from each day's libraryRefs)
const TAUGHT_IN = {};
for (const t of TRACKDAYS) {
  for (const d of t.days) {
    for (const ref of d.libraryRefs || []) {
      (TAUGHT_IN[ref] = TAUGHT_IN[ref] || []).push({
        track: t.id, trackName: t.name, day: d.day, title: d.title,
      });
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

const CHAPTERS = { ...LIBRARY_DEEP, ...LIBRARY_DEEP_2, ...LIBRARY_DEEP_3, ...LIBRARY_EXTRA_DEEP, ...LIBRARY_EXTRA_3_DEEP, ...LIBRARY_EXTRA_5_DEEP, ...WRITTEN_DEEP };
// the base shelf plus the second wing, in one list the UI already knows how to render
const ALL_LIBRARY = [...LIBRARY, ...LIBRARY_EXTRA, ...LIBRARY_EXTRA_3, ...LIBRARY_EXTRA_5];
const ALL_ACADEMY = [...ACADEMY, ...ACADEMY_EXTRA, ...ACADEMY_EXTRA_3, ...ACADEMY_EXTRA_4, ...ACADEMY_EXTRA_5];

// the nineteen original playbooks stopped at four scripts with no way to tell
// a good attempt from a bad one; gym-outcomes.js adds the missing fifth
const withOutcome = (g) => (GYM_OUTCOMES[g.id] && g.lines.length < 5
  ? { ...g, lines: [...g.lines, GYM_OUTCOMES[g.id]] }
  : g);
const GYM_ALL = [...GYM_SCENARIOS, ...GYM_EXTRA, ...GYM_EXTRA_5, ...WRITTEN_GYM].map(withOutcome);
const LIBRARY_FULL = [...ALL_LIBRARY, ...WRITTEN_ENTRIES].map(libraryItem);

// ── Rate limiting ─────────────────────────────────────────────
// Nothing guarded these before: a loop could hammer /api/ai/chat (up to 45 s of
// upstream work per call) or /api/analyze/* and burn the free AI quota or pin
// the process. Three buckets: page traffic, scoring writes, and the AI relay.
const pageLimit = rateLimit({ capacity: 120, perMinute: 120, key: 'page' });
const writeLimit = rateLimit({ capacity: 40, perMinute: 40, key: 'write' });
const aiLimit = rateLimit({ capacity: 8, perMinute: 8, key: 'ai' });
const aiSlot = concurrency({ max: 4, name: 'AI' });

app.use('/api', pageLimit);
for (const route of ['/api/analyze', '/api/activity', '/api/progress', '/api/arena', '/api/body', '/api/reset', '/api/ai/chat']) {
  app.use(route, writeLimit);
}

// ── Content ────────────────────────────────────────────────
const CONTENT_PAYLOAD = () => ({
    mentors: MENTORS,
    tracks: TRACKS.map((t) => ({
      id: t.id, name: t.name, subtitle: t.subtitle, description: t.description,
      blocks: t.blocks || null, dayCount: t.days.length,
      lessonsWritten: (LESSONS[t.id] ? Object.keys(LESSONS[t.id]).length : 0),
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
    chaptersWritten: Object.keys(CHAPTERS).length,
    games: GAMES,
    academy: ALL_ACADEMY,
    academyLevels: ACADEMY_LEVELS,
    academyPacing: ACADEMY_PACING,
    academyStart: ACADEMY_START,
    gym: GYM_ALL,
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
  coachModes: COACH_MODE_META,
});

// ~640 KB of JSON → ~150 KB on the wire, compressed once at boot.
app.get('/api/content', gzipJSON('content', CONTENT_PAYLOAD));

app.get('/api/track/:id', (req, res) => {
  const track = TRACK_MAP[req.params.id];
  if (!track) return res.status(404).json({ error: 'Track not found' });
  res.json(withLessons(track));
});

// NOTE: this must stay below /api/library/categories, or Express matches
// "categories" as an :id and the route 404s with "Entry not found".
app.get('/api/library/categories', (_req, res) => {
  res.json([...new Set(LIBRARY.map((i) => i.category))]);
});

app.get('/api/library/:id', (req, res) => {
  const item = LIBRARY_FULL.find((i) => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Entry not found' });
  res.json(item);
});

app.get('/api/bootstrap', (_req, res) => {
  const stats = statsFor(uid);
  res.json({ ...stats, recent: recentSessions(uid, 12) });
});

app.get('/api/user', (_req, res) => {
  res.json(db.prepare('SELECT id, name, xp, goal FROM users WHERE id = ?').get(uid));
});

app.patch('/api/user', (req, res) => {
  const { name, goal } = plainObject(req.body);
  if (typeof name === 'string' && name.trim()) {
    db.prepare('UPDATE users SET name = ? WHERE id = ?').run(name.trim().slice(0, 40), uid);
  }
  if (typeof goal === 'string') db.prepare('UPDATE users SET goal = ? WHERE id = ?').run(goal.slice(0, 60), uid);
  res.json(db.prepare('SELECT id, name, xp, goal FROM users WHERE id = ?').get(uid));
});

// ── Course progress ────────────────────────────────────────
app.post('/api/progress/complete', (req, res) => {
  const body = plainObject(req.body);
  const track = str(body.track, 20);
  const day = num(body.day, 1, 400, 0);
  const score = body.score == null ? null : num(body.score, 0, 100, null);
  const notes = str(body.notes, 2000);
  const t = TRACK_MAP[track];
  if (!t) return res.status(400).json({ error: 'Unknown track' });
  const d = t.days.find((x) => x.day === Number(day));
  if (!d) return res.status(400).json({ error: 'Unknown day' });

  const existing = db.prepare('SELECT * FROM progress WHERE user_id = ? AND track = ? AND day = ?').get(uid, track, d.day);
  if (existing) {
    db.prepare('UPDATE progress SET score = ?, notes = ?, completed_at = datetime(\'now\') WHERE id = ?')
      .run(score, notes, existing.id);
    return res.json({ ok: true, xpGained: 0, alreadyDone: true, stats: statsFor(uid) });
  }
  db.prepare('INSERT INTO progress (user_id, track, day, status, score, notes) VALUES (?,?,?,?,?,?)')
    .run(uid, track, d.day, 'done', score, notes);
  logActivity(uid, `course-${track}`, d.xp);
  saveSession(uid, 'course', `${track}:${d.day}`, score, { notes });
  res.json({ ok: true, xpGained: d.xp, stats: statsFor(uid) });
});

app.post('/api/progress/uncomplete', (req, res) => {
  const body = plainObject(req.body);
  const track = str(body.track, 20);
  const day = num(body.day, 1, 400, 0);
  db.prepare('DELETE FROM progress WHERE user_id = ? AND track = ? AND day = ?').run(uid, track, Number(day));
  res.json({ ok: true, stats: statsFor(uid) });
});

// ── Speech analysis (Impromptu Lab) ────────────────────────
app.post('/api/analyze/speech', (req, res) => {
  const body = plainObject(req.body);
  // The cap used to be silent: a 15 000-character transcript was truncated to
  // 12 000 and scored as if it were the whole speech, so the score described a
  // different answer than the one submitted. Reject it instead.
  if (typeof body.transcript === 'string' && body.transcript.length > 12000) {
    return res.status(413).json({ error: 'Transcript too long — the limit is 12 000 characters.' });
  }
  const transcript = str(body.transcript, 12000);
  const mode = str(body.mode, 40) || 'impromptu';
  const metrics = plainObject(body.metrics);
  const promptText = str(body.promptText, 2000);
  const ref = body.ref == null ? null : str(body.ref, 80);
  const result = analyzeSpeech({ transcript, mode, metrics, promptText });
  const id = saveSession(uid, mode, ref, result.overall, { transcript, metrics, promptText, result });
  logActivity(uid, mode, Math.max(10, Math.round(result.overall * 0.6)));
  res.json({ ...result, sessionId: id, stats: statsFor(uid) });
});

// ── Wit simulator ──────────────────────────────────────────
app.post('/api/analyze/wit', (req, res) => {
  const body = plainObject(req.body);
  const scenarioId = str(body.scenarioId, 80);
  const response = str(body.response, 4000);
  const scenario = WIT_SCENARIOS.find((s) => s.id === scenarioId);
  if (!scenario) return res.status(404).json({ error: 'Scenario not found' });
  const result = scoreWit({ scenario, response });
  const id = saveSession(uid, 'wit', scenario.id, result.overall, { response, result });
  logActivity(uid, 'wit', Math.max(10, Math.round(result.overall * 0.5)));
  res.json({ ...result, sessionId: id, stats: statsFor(uid) });
});

// ── Pronunciation lab ──────────────────────────────────────
app.post('/api/analyze/pronunciation', (req, res) => {
  const body = plainObject(req.body);
  const target = str(body.target, 600);
  const heard = str(body.heard, 600);
  const durationSec = num(body.durationSec, 0, 600, 0);
  const attempt = num(body.attempt, 1, 50, 1);
  const result = scorePronunciation({ target, heard, durationSec, attempts: attempt });
  const id = saveSession(uid, 'pronunciation', target.slice(0, 40), result.accuracy, { target, heard, durationSec, result });
  if (result.accuracy > 0) logActivity(uid, 'pronunciation', Math.max(6, Math.round(result.accuracy * 0.3)));
  res.json({ ...result, sessionId: id, stats: statsFor(uid) });
});

// ── Body language ──────────────────────────────────────────
app.post('/api/body/answer', (req, res) => {
  const body = plainObject(req.body);
  const cardId = str(body.cardId, 80);
  const choice = num(body.choice, 0, 10, -1);
  const card = [...BODY_CARDS, ...EXTRA_BODY_CARDS].find((c) => c.id === cardId);
  if (!card) return res.status(404).json({ error: 'Card not found' });
  const correct = Number(choice) === card.answer;
  saveSession(uid, 'body', cardId, correct ? 100 : 0, { choice, correct });
  if (correct) logActivity(uid, 'body', 12);
  res.json({ correct, answer: card.answer, explain: card.explain, cue: card.cue, stats: statsFor(uid) });
});

// ── Conversation Arena ─────────────────────────────────────
app.post('/api/arena/start', (req, res) => {
  const scenarioId = str(plainObject(req.body).scenarioId, 80);
  const scenario = ARENA_ALL.find((s) => s.id === scenarioId);
  if (!scenario) return res.status(404).json({ error: 'Scenario not found' });
  const history = [{ role: 'persona', text: scenario.opener, kind: 'opener' }];
  const payload = { scenarioId, history, turn: 0, trust: 50 };
  const id = saveSession(uid, 'arena', scenarioId, null, payload);
  logActivity(uid, 'arena', 5);
  res.json({ sessionId: id, scenario: { ...scenario, facts: undefined, probes: undefined, reactions: undefined }, history, trust: 50 });
});

app.post('/api/arena/message', (req, res) => {
  const body = plainObject(req.body);
  const sessionId = num(body.sessionId, 1, Number.MAX_SAFE_INTEGER, 0);
  const message = str(body.message, 2000);
  const row = getSession(uid, sessionId);
  if (!row) return res.status(404).json({ error: 'Session not found' });
  let payload;
  try { payload = JSON.parse(row.payload); } catch { return res.status(500).json({ error: 'Session is corrupt' }); }
  const scenario = ARENA_ALL.find((s) => s.id === payload.scenarioId);
  if (!scenario) return res.status(404).json({ error: 'Scenario not found' });

  payload.history.push({ role: 'user', text: message, at: new Date().toISOString() });
  const reply = arenaReply({ scenario, history: payload.history, message, turn: payload.turn });
  payload.history.push({ role: 'persona', text: reply.reply, kind: reply.kind, reaction: reply.reaction, trust: reply.trustBefore });
  payload.turn += 1;
  payload.trust = reply.trustBefore;
  updateSession(sessionId, reply.trustBefore, payload);
  logActivity(uid, 'arena', 3);
  res.json({ ...reply, sessionId, turn: payload.turn });
});

app.post('/api/arena/end', (req, res) => {
  const sessionId = num(plainObject(req.body).sessionId, 1, Number.MAX_SAFE_INTEGER, 0);
  const row = getSession(uid, sessionId);
  if (!row) return res.status(404).json({ error: 'Session not found' });
  let payload;
  try { payload = JSON.parse(row.payload); } catch { return res.status(500).json({ error: 'Session is corrupt' }); }
  const scenario = ARENA_ALL.find((s) => s.id === payload.scenarioId);
  const summary = arenaSummary({ scenario, history: payload.history });
  payload.summary = summary;
  const score = Math.round((summary.overall * 0.6) + ((payload.trust || 50) * 0.4));
  updateSession(sessionId, score, payload);
  logActivity(uid, 'arena', Math.max(10, Math.round(score * 0.4)));
  res.json({ ...summary, trust: payload.trust, score, stats: statsFor(uid) });
});

// ── Library search ─────────────────────────────────────────
app.get('/api/library', (req, res) => {
  const q = (req.query.q || '').toString().toLowerCase().trim();
  const cat = (req.query.category || '').toString();
  let items = LIBRARY_FULL;
  if (cat && cat !== 'All') items = items.filter((i) => i.category === cat);
  if (q) {
    // token AND matching, with naive stemming so "callbacks" finds "callback"
    const stem = (w) => w.replace(/(ies|es|s)$/i, '');
    const tokens = q.split(/\s+/).filter(Boolean).map(stem);
    items = items.filter((i) => {
      const chapterText = i.chapter ? [i.chapter.thesis, ...i.chapter.deep, ...(i.chapter.script || []).map((l) => l.line), ...(i.chapter.failureModes || []), ...(i.chapter.drill || [])].join(' ') : '';
      const hay = stem((i.title + ' ' + i.short + ' ' + i.body + ' ' + i.source + ' ' + i.tags.join(' ') + ' ' + i.use + ' ' + i.category + ' ' + chapterText).toLowerCase());
      return tokens.every((t) => hay.includes(t));
    });
  }
  res.json({ items, total: items.length });
});

// ── Sessions / stats ───────────────────────────────────────
app.get('/api/sessions', (_req, res) => {
  const rows = db.prepare('SELECT id, kind, ref, score, created_at FROM sessions WHERE user_id = ? ORDER BY id DESC LIMIT 50').all(uid);
  res.json(rows);
});

app.post('/api/reset', (_req, res) => {
  db.prepare('DELETE FROM sessions WHERE user_id = ?').run(uid);
  db.prepare('DELETE FROM progress WHERE user_id = ?').run(uid);
  db.prepare('DELETE FROM activity WHERE user_id = ?').run(uid);
  db.prepare('UPDATE users SET xp = 0 WHERE id = ?').run(uid);
  res.json({ ok: true, stats: statsFor(uid) });
});

// ── Conversational AI ─────────────────────────────────────
// The key, when one is needed, lives only here — never in the client.
const AI_ENV = {
  provider: process.env.AI_PROVIDER || 'pollinations',
  model: process.env.AI_MODEL || '',
  key: process.env.AI_API_KEY || process.env.OPENAI_API_KEY || '',
  baseUrl: process.env.AI_BASE_URL || '',
  enabled: process.env.AI_ENABLED !== '0',
};

app.get('/api/ai/status', (_req, res) => {
  // never echo the upstream URL or the key — only what the UI needs to render
  const { provider, model, enabled, baseUrl } = AI_ENV;
  res.json({
    providers: PROVIDERS,
    provider,
    model,
    enabled,
    hasKey: !!AI_ENV.key,
    customEndpoint: !!baseUrl,
  });
});

app.post('/api/ai/chat', aiLimit, aiSlot, async (req, res) => {
  const payload = plainObject(req.body);
  const messages = Array.isArray(payload.messages) ? payload.messages : [];
  const mode = str(payload.mode, 40) || 'general';
  const temperature = payload.temperature == null ? undefined : num(payload.temperature, 0, 2, 0.7);
  const maxTokens = payload.maxTokens == null ? undefined : num(payload.maxTokens, 16, 1200, 500);

  // SECURITY: mode was interpolated into the system prompt with no allowlist,
  // so a caller could slip instructions through the field that looks like an
  // enum. It is now a closed set, and the client may not override the system
  // prompt at all — it can only pick a mode.
  if (!isCoachMode(mode)) return res.status(400).json({ error: `unknown mode; expected one of ${COACH_MODES.join(', ')}` });
  const cleaned = (Array.isArray(messages) ? messages : [])
    .filter((m) => m && typeof m.content === 'string')
    .slice(-12)
    .map((m) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content.slice(0, 4000) }));

  if (!cleaned.length) return res.status(400).json({ error: 'messages required' });

  // SECURITY: baseUrl is NOT taken from the request body.
  // It used to be, which turned this endpoint into a server-side request forger:
  // POST {baseUrl:"http://127.0.0.1:3100/api/user"} made the server call its own
  // internal routes and relay the body back. The upstream URL may only come from
  // the environment, and only for the bring-your-own-endpoint provider.
  const provider = String(req.body.provider || AI_ENV.provider || '').slice(0, 40);
  const config = {
    provider,
    model: String(req.body.model || AI_ENV.model || '').slice(0, 80),
    key: AI_ENV.key,
    baseUrl: provider === 'compatible' ? AI_ENV.baseUrl : '',
    temperature,
  };

  try {
    const out = await aiChat({
      messages: cleaned,
      config,
      // a custom system prompt is a privilege, not a parameter: only honoured
      // from the server's own environment, never from the request body
      system: coachSystemPrompt(mode),
      temperature,
      maxTokens,
    });
    res.json({ ok: true, ...out });
  } catch (e) {
    res.status(502).json({ ok: false, error: e.message, fallback: 'rules' });
  }
});

// ── Generic XP logging (games, drills, coach) ──────────────
app.post('/api/activity', (req, res) => {
  const body = plainObject(req.body);
  const kind = str(body.kind, 40) || 'drill';
  const xp = num(body.xp, 0, 500, 0);
  if (typeof kind !== 'string' || !kind.trim()) return res.status(400).json({ error: 'kind required' });
  const amount = Math.max(0, Math.min(200, Math.round(Number(xp) || 0)));
  logActivity(uid, kind.trim().slice(0, 40), amount);
  res.json({ ok: true, xpGained: amount, stats: statsFor(uid) });
});

app.get('/api/health', (_req, res) => res.json({ ok: true, ai: 'heuristic-local' }));

// Unknown API routes must be a JSON 404 — never the SPA shell, which would
// return HTML to a fetch() caller and hide typos.
app.use('/api', (_req, res) => res.status(404).json({ ok: false, error: 'Unknown API route' }));

// ── Static frontend ────────────────────────────────────────
const distDir = path.join(__dirname, '..', 'dist');
app.use(express.static(distDir));
app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'), (err) => {
    if (err) res.status(404).send('Frontend not built. Run: npm run build');
  });
});

// ── Bind address ───────────────────────────────────────────
// Loopback by default, so the app is not exposed to the local network. Setting
// HOST=0.0.0.0 used to be enough on its own to put a single-user database with
// no authentication on every interface — including café and hotel Wi-Fi. It now
// takes a second, explicit opt-in, and the startup banner says so out loud.
const HOST = process.env.HOST || '127.0.0.1';
const LOOPBACK = new Set(['127.0.0.1', 'localhost', '::1']);
const isLoopback = LOOPBACK.has(HOST) || HOST.startsWith('127.');
const ALLOW_PUBLIC = process.env.ALLOW_PUBLIC_BIND === '1';

if (!isLoopback && !ALLOW_PUBLIC) {
  console.error(
    `\n✗ Refusing to bind to ${HOST}.\n` +
    '  This app has no login and stores your whole practice history in one SQLite\n' +
    '  file: on a shared network, anyone who can reach the port can read and erase\n' +
    '  it. It is meant for this machine only.\n\n' +
    '  If you genuinely want other devices to reach it, set both:\n' +
    '    HOST=0.0.0.0 ALLOW_PUBLIC_BIND=1 npm start\n',
  );
  process.exit(1);
}

app.listen(PORT, HOST, () => {
  console.log(`Charisma Lab API + UI on http://${isLoopback ? '127.0.0.1' : HOST}:${PORT}`);
  if (!isLoopback) {
    console.warn(`⚠ Listening on ${HOST} with no authentication. Anyone who can reach port ${PORT} can read and erase this database.`);
  }
});
