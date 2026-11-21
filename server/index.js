import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MENTORS } from './content/mentors.js';
import { TRACKS, TRACK_MAP } from './content/courses.js';
import { IMPROMPTU_PROMPTS, TWISTERS, PANGERAMS } from './content/lab.js';
import { WIT_SCENARIOS, WIT_META } from './content/wit.js';
import { ARENA_SCENARIOS } from './content/arena.js';
import { BODY_CARDS, BODY_CLUSTERS } from './content/body.js';
import { LIBRARY } from './content/library.js';
import { FAST_LESSONS } from './content/lessons-fast.js';
import { ARCHIVE_LESSONS as DEEP_1 } from './content/lessons-deep.js';
import { BATCH2 as DEEP_2 } from './content/lessons-deep-2.js';
import { BATCH3 as DEEP_3 } from './content/lessons-deep-3.js';
import { LIBRARY_DEEP, LIBRARY_COURSE_LINKS } from './content/library-deep.js';
import { LIBRARY_DEEP_2 } from './content/library-deep-2.js';
import { LIBRARY_DEEP_3 } from './content/library-deep-3.js';
import { GAMES } from './content/games.js';
import { ACADEMY } from './content/academy.js';
import { EXTRA_BODY_CARDS, BODY_CLUSTER_NOTES } from './content/body-extra.js';
import { FRAMEWORKS, FRAMEWORK_CATEGORIES } from './content/frameworks.js';
import { EXTRA_PROMPTS, EXTRA_TWISTERS, EXTRA_PANGERAMS } from './content/lab-extra.js';
import { SKILL_TRACKS } from './content/skills.js';
import {
  CREATOR_PILLARS, CREATOR_FORMATS, HOOK_PATTERNS, PLATFORM_NOTES,
  CREATOR_SKILLS, FOUR_WEEK_PLAN, CREATOR_CHECKLIST, IDEA_TOPICS, IDEA_ANGLES,
} from './content/creator.js';
import { WEEKLY_THEMES, DAILY_DRILLS } from './content/daily.js';
import { COACH_MODES, coachRespond } from './coach.js';
import { aiChat, aiStatus, PROVIDERS, coachSystemPrompt, arenaSystemPrompt, arenaJudgePrompt } from './ai.js';
import { analyzeSpeech, scoreWit, scorePronunciation, arenaReply, arenaSummary } from './analysis.js';
import {
  ensureUser, logActivity, statsFor, saveSession, getSession, updateSession,
  recentSessions, db,
} from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

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

const CHAPTERS = { ...LIBRARY_DEEP, ...LIBRARY_DEEP_2, ...LIBRARY_DEEP_3 };

const LIBRARY_FULL = LIBRARY.map(libraryItem);

// ── Content ────────────────────────────────────────────────
app.get('/api/content', (_req, res) => {
  res.json({
    mentors: MENTORS,
    tracks: TRACKS.map((t) => ({
      id: t.id, name: t.name, subtitle: t.subtitle, description: t.description,
      blocks: t.blocks || null, dayCount: t.days.length,
      lessonsWritten: (LESSONS[t.id] ? Object.keys(LESSONS[t.id]).length : 0),
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
  });
});

app.get('/api/track/:id', (req, res) => {
  const track = TRACK_MAP[req.params.id];
  if (!track) return res.status(404).json({ error: 'Track not found' });
  res.json(withLessons(track));
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
  const { name, goal } = req.body || {};
  if (typeof name === 'string' && name.trim()) {
    db.prepare('UPDATE users SET name = ? WHERE id = ?').run(name.trim().slice(0, 40), uid);
  }
  if (typeof goal === 'string') db.prepare('UPDATE users SET goal = ? WHERE id = ?').run(goal.slice(0, 60), uid);
  res.json(db.prepare('SELECT id, name, xp, goal FROM users WHERE id = ?').get(uid));
});

// ── Course progress ────────────────────────────────────────
app.post('/api/progress/complete', (req, res) => {
  const { track, day, score = null, notes = '' } = req.body || {};
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
  const { track, day } = req.body || {};
  db.prepare('DELETE FROM progress WHERE user_id = ? AND track = ? AND day = ?').run(uid, track, Number(day));
  res.json({ ok: true, stats: statsFor(uid) });
});

// ── Speech analysis (Impromptu Lab) ────────────────────────
app.post('/api/analyze/speech', (req, res) => {
  const { transcript = '', mode = 'impromptu', metrics = {}, promptText = '', ref = null } = req.body || {};
  const result = analyzeSpeech({ transcript, mode, metrics, promptText });
  const id = saveSession(uid, mode, ref, result.overall, { transcript, metrics, promptText, result });
  logActivity(uid, mode, Math.max(10, Math.round(result.overall * 0.6)));
  res.json({ ...result, sessionId: id, stats: statsFor(uid) });
});

// ── Wit simulator ──────────────────────────────────────────
app.post('/api/analyze/wit', (req, res) => {
  const { scenarioId, response = '' } = req.body || {};
  const scenario = WIT_SCENARIOS.find((s) => s.id === scenarioId);
  if (!scenario) return res.status(404).json({ error: 'Scenario not found' });
  const result = scoreWit({ scenario, response });
  const id = saveSession(uid, 'wit', scenario.id, result.overall, { response, result });
  logActivity(uid, 'wit', Math.max(10, Math.round(result.overall * 0.5)));
  res.json({ ...result, sessionId: id, stats: statsFor(uid) });
});

// ── Pronunciation lab ──────────────────────────────────────
app.post('/api/analyze/pronunciation', (req, res) => {
  const { target = '', heard = '', durationSec = 0, attempt = 1 } = req.body || {};
  const result = scorePronunciation({ target, heard, durationSec, attempts: attempt });
  const id = saveSession(uid, 'pronunciation', target.slice(0, 40), result.accuracy, { target, heard, durationSec, result });
  if (result.accuracy > 0) logActivity(uid, 'pronunciation', Math.max(6, Math.round(result.accuracy * 0.3)));
  res.json({ ...result, sessionId: id, stats: statsFor(uid) });
});

// ── Body language ──────────────────────────────────────────
app.post('/api/body/answer', (req, res) => {
  const { cardId, choice } = req.body || {};
  const card = [...BODY_CARDS, ...EXTRA_BODY_CARDS].find((c) => c.id === cardId);
  if (!card) return res.status(404).json({ error: 'Card not found' });
  const correct = Number(choice) === card.answer;
  saveSession(uid, 'body', cardId, correct ? 100 : 0, { choice, correct });
  if (correct) logActivity(uid, 'body', 12);
  res.json({ correct, answer: card.answer, explain: card.explain, cue: card.cue, stats: statsFor(uid) });
});

// ── Conversation Arena ─────────────────────────────────────
app.post('/api/arena/start', (req, res) => {
  const { scenarioId } = req.body || {};
  const scenario = ARENA_SCENARIOS.find((s) => s.id === scenarioId);
  if (!scenario) return res.status(404).json({ error: 'Scenario not found' });
  const history = [{ role: 'persona', text: scenario.opener, kind: 'opener' }];
  const payload = { scenarioId, history, turn: 0, trust: 50 };
  const id = saveSession(uid, 'arena', scenarioId, null, payload);
  logActivity(uid, 'arena', 5);
  res.json({ sessionId: id, scenario: { ...scenario, facts: undefined, probes: undefined, reactions: undefined }, history, trust: 50 });
});

app.post('/api/arena/message', (req, res) => {
  const { sessionId, message = '' } = req.body || {};
  const row = getSession(uid, sessionId);
  if (!row) return res.status(404).json({ error: 'Session not found' });
  const payload = JSON.parse(row.payload);
  const scenario = ARENA_SCENARIOS.find((s) => s.id === payload.scenarioId);
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
  const { sessionId } = req.body || {};
  const row = getSession(uid, sessionId);
  if (!row) return res.status(404).json({ error: 'Session not found' });
  const payload = JSON.parse(row.payload);
  const scenario = ARENA_SCENARIOS.find((s) => s.id === payload.scenarioId);
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

app.get('/api/library/categories', (_req, res) => {
  res.json([...new Set(LIBRARY.map((i) => i.category))]);
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
  res.json({ providers: PROVIDERS, ...AI_ENV, key: undefined, hasKey: !!AI_ENV.key });
});

app.post('/api/ai/chat', async (req, res) => {
  const { messages = [], mode = 'general', system = '', temperature, maxTokens } = req.body || {};
  const cleaned = (Array.isArray(messages) ? messages : [])
    .filter((m) => m && typeof m.content === 'string')
    .slice(-12)
    .map((m) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content.slice(0, 4000) }));

  if (!cleaned.length) return res.status(400).json({ error: 'messages required' });

  const config = {
    provider: req.body.provider || AI_ENV.provider,
    model: req.body.model || AI_ENV.model,
    key: AI_ENV.key,
    baseUrl: req.body.baseUrl || AI_ENV.baseUrl,
    temperature,
  };

  try {
    const out = await aiChat({
      messages: cleaned,
      config,
      system: system ? String(system).slice(0, 4000) : coachSystemPrompt(mode),
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
  const { kind = 'drill', xp = 0 } = req.body || {};
  if (typeof kind !== 'string' || !kind.trim()) return res.status(400).json({ error: 'kind required' });
  const amount = Math.max(0, Math.min(200, Math.round(Number(xp) || 0)));
  logActivity(uid, kind.trim().slice(0, 40), amount);
  res.json({ ok: true, xpGained: amount, stats: statsFor(uid) });
});

app.get('/api/health', (_req, res) => res.json({ ok: true, ai: 'heuristic-local' }));

// ── Static frontend ────────────────────────────────────────
const distDir = path.join(__dirname, '..', 'dist');
app.use(express.static(distDir));
app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'), (err) => {
    if (err) res.status(404).send('Frontend not built. Run: npm run build');
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Charisma Lab API + UI on http://0.0.0.0:${PORT}`);
});
