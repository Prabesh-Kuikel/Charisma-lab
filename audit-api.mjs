// Endpoint audit: every route, status + shape.
//
// Run: node scripts/audit-api.mjs
//
// This used to assume a server was already listening on :3000 and died with
// `ECONNREFUSED` if one was not — which is exactly what happens on a fresh CI
// runner, so `npm run audit:api` could never pass there. It now starts the
// server itself on an unused port, waits for /api/health, and shuts it down
// again. Set BASE to point at an already-running instance instead.
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function freePort() {
  return new Promise((resolve, reject) => {
    const s = createServer();
    s.on('error', reject);
    s.listen(0, '127.0.0.1', () => {
      const { port } = s.address();
      s.close(() => resolve(port));
    });
  });
}

let child = null;
let B = process.env.BASE;

if (!B) {
  const port = await freePort();
  child = spawn(process.execPath, ['server/index.js'], {
    env: { ...process.env, PORT: String(port), HOST: '127.0.0.1' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let log = '';
  child.stdout.on('data', (d) => { log += d; });
  child.stderr.on('data', (d) => { log += d; });
  child.on('exit', (code) => {
    if (code && code !== 0) console.error(`server exited early (${code}):\n${log}`);
  });
  B = `http://127.0.0.1:${port}/api`;

  // wait for health, up to ~30s
  let up = false;
  for (let i = 0; i < 120; i++) {
    try {
      const res = await fetch(`${B}/health`);
      if (res.ok) { up = true; break; }
    } catch { /* not yet */ }
    await sleep(250);
  }
  if (!up) {
    console.error(`✗ the server never came up on ${B}\n${log}`);
    child.kill();
    process.exit(1);
  }
}

const call = async (method, path, body) => {
  const res = await fetch(B + path, {
    method,
    headers: { 'content-type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  let json = null;
  try { json = await res.json(); } catch { /* non-json */ }
  return { status: res.status, json };
};
const fail = [];
const check = (name, cond, extra = '') => {
  console.log(`${cond ? '✓' : '✗'} ${name}${extra ? ' — ' + extra : ''}`);
  if (!cond) fail.push(name);
};

try {
const content = await call('GET', '/content');
check('GET /content', content.status === 200 && !!content.json.tracks, `${content.json?.library?.length} entries`);
check('content has new modules',
  !!(content.json.games?.length && content.json.skills?.length && content.json.creator && content.json.daily),
  `games ${content.json.games?.length}, skills ${content.json.skills?.length}, drills ${content.json.daily?.drills?.length}`);

check('GET /content — academy modules',
  (content.json.academy?.length || 0) >= 17 && content.json.academy.every((m) => m.drills?.length >= 4 && m.reads?.length >= 4),
  `${content.json.academy?.length} modules, ${(content.json.academy || []).reduce((n, m) => n + m.drills.length, 0)} drills`);

check('GET /content — conversation gym',
  (content.json.gym?.length || 0) >= 31 && content.json.gym.every((g) => g.steps?.length >= 4 && g.lines?.length >= 3),
  `${content.json.gym?.length} playbooks, ${(content.json.gymCategories || []).length} categories`);

check('GET /content — library, all three wings',
  (content.json.library?.length || 0) >= 83 && content.json.library.filter((l) => l.hasChapter).length >= 83,
  `${content.json.library?.length} entries, ${content.json.library?.filter((l) => l.hasChapter).length} with chapters`);

check('GET /content — body deck is 48 cards across 6 clusters',
  (content.json.body?.length || 0) === 48 && Object.keys(content.json.bodyNotes || {}).length >= 6,
  `${content.json.body?.length} cards, ${Object.keys(content.json.bodyNotes || {}).length} cluster notes`);

// ── round 5: both arena wings and all eight skill tracks must be served ──
// round 10 grew the arena from 13 to 26 personas; the floor is a floor, not a
// frozen count, or every content round re-breaks this line
check('GET /content — arena has both wings and 6 scenes',
  (content.json.arena?.length || 0) >= 26 && new Set((content.json.arena || []).map((a) => a.scene)).size >= 6,
  `${content.json.arena?.length} personas, ${new Set((content.json.arena || []).map((a) => a.scene)).size} scenes`);

check('GET /content — skill tracks are 8 with cross-links',
  (content.json.skills?.length || 0) === 8 &&
  content.json.skills.every((t) => (t.exercises || []).length >= 3 && (t.reads || []).length >= 2 && (t.arena || []).length >= 1),
  `${content.json.skills?.length} tracks, ${(content.json.skills || []).reduce((n, t) => n + t.exercises.length, 0)} exercises`);

check('GET /content — every arena persona ships read-next chapters',
  content.json.arena.every((a) => (a.reads || []).length >= 2),
  `${content.json.arena.filter((a) => (a.reads || []).length >= 2).length}/${content.json.arena.length} personas linked`);

// the payload must not leak the persona scripts — the solver lives in the browser anyway,
// but the served brief should never contain the fact/probe ladder
check('GET /content — arena briefs do not ship facts or probes',
  content.json.arena.every((a) => a.facts === undefined && a.probes === undefined && a.reactions === undefined),
  'fact/probe ladders stripped');

const aiStatus = await call('GET', '/ai/status');
check('GET /ai/status', aiStatus.status === 200 && Array.isArray(aiStatus.json.providers) && aiStatus.json.providers.length >= 2,
  `provider ${aiStatus.json.provider}, providers ${(aiStatus.json.providers || []).map((p) => p.id).join('/')}`);

const boot = await call('GET', '/bootstrap');
check('GET /bootstrap', boot.status === 200 && !!boot.json.user, `xp ${boot.json?.user?.xp}`);

const t = await call('GET', '/track/deep');
check('GET /track/deep', t.status === 200 && t.json.days.length === 90 && t.json.days.every((d) => !!d.lesson));

const lib = await call('GET', '/library/lib-w5');
check('GET /library/:id', lib.status === 200 && !!lib.json.chapter, lib.json?.title);

const search = await call('GET', '/library?q=verse');
check('GET /library?q=', search.status === 200 && search.json.total > 0, `${search.json?.total} hits`);

// /api/library/categories used to sit below /api/library/:id, so Express
// matched "categories" as an id and answered 404 "Entry not found". Route order
// is now a checked property, not a thing to remember.
const cats = await call('GET', '/library/categories');
check('GET /library/categories', cats.status === 200 && Array.isArray(cats.json) && cats.json.length >= 5,
  `${Array.isArray(cats.json) ? cats.json.length : 0} categories`);

// a transcript past the declared cap must be refused, not silently truncated
// and scored as if it were the whole answer
const oversize = await call('POST', '/analyze/speech', { transcript: 'word '.repeat(3000) });
check('POST /analyze/speech rejects >12k transcript', oversize.status === 413, `status ${oversize.status}`);

const act = await call('POST', '/activity', { kind: 'audit', xp: 5 });
check('POST /activity', act.status === 200 && act.json.ok, `xpGained ${act.json?.xpGained}`);

const comp = await call('POST', '/progress/complete', { track: 'fast', day: 2 });
check('POST /progress/complete', comp.status === 200 && comp.json.ok);
const un = await call('POST', '/progress/uncomplete', { track: 'fast', day: 2 });
check('POST /progress/uncomplete', un.status === 200);

const speech = await call('POST', '/analyze/speech', { transcript: 'First, the point is that structure beats energy. For example, last week I rehearsed and my pace was too fast, so I paused.', metrics: { wpm: 130, pauses: 4 }, mode: 'impromptu' });
check('POST /analyze/speech', speech.status === 200 && typeof speech.json.overall === 'number', `overall ${speech.json?.overall}`);

const wit = await call('POST', '/analyze/wit', { scenarioId: content.json.wit[0].id, response: 'That is fair, and I will take that as a compliment.' });
check('POST /analyze/wit', wit.status === 200 && typeof wit.json.overall === 'number', `overall ${wit.json?.overall}`);

const pron = await call('POST', '/analyze/pronunciation', { target: 'red leather yellow leather', heard: 'red leather yellow leather', durationSec: 4 });
check('POST /analyze/pronunciation', pron.status === 200 && typeof pron.json.accuracy === 'number', `accuracy ${pron.json?.accuracy}`);

const body = await call('POST', '/body/answer', { cardId: content.json.body[0].id, choice: 0 });
check('POST /body/answer', body.status === 200 && typeof body.json.correct === 'boolean');

const ar = await call('POST', '/arena/start', { scenarioId: content.json.arena[0].id });
const msg = await call('POST', '/arena/message', { sessionId: ar.json.sessionId, message: 'What would a good outcome look like for you?' });
const end = await call('POST', '/arena/end', { sessionId: ar.json.sessionId });
check('POST /arena/*', ar.status === 200 && !!msg.json.reply && end.status === 200, `overall ${end.json?.overall}`);

const user = await call('PATCH', '/user', { name: 'Audit', goal: 'Presence' });
check('PATCH /user', user.status === 200 && user.json.name === 'Audit');

const sess = await call('GET', '/sessions');
check('GET /sessions', sess.status === 200 && Array.isArray(sess.json));

const health = await call('GET', '/health');
check('GET /health', health.status === 200 && health.json.ok);

// negative cases
const bad1 = await call('POST', '/progress/complete', { track: 'nope', day: 1 });
check('rejects unknown track', bad1.status === 400);
const bad2 = await call('POST', '/arena/message', { sessionId: 999999, message: 'x' });
check('rejects unknown session', bad2.status === 404);

} finally {
  if (child) child.kill();
}

console.log(fail.length ? `\n✗ ${fail.length} failing` : '\n✓ every endpoint healthy');
process.exit(fail.length ? 1 : 0);
