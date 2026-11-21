// Endpoint audit: every route, status + shape. Run: node scripts/audit-api.mjs
const B = process.env.BASE || 'http://127.0.0.1:3000/api';
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

const content = await call('GET', '/content');
check('GET /content', content.status === 200 && !!content.json.tracks, `${content.json?.library?.length} entries`);
check('content has new modules',
  !!(content.json.games?.length && content.json.skills?.length && content.json.creator && content.json.daily),
  `games ${content.json.games?.length}, skills ${content.json.skills?.length}, drills ${content.json.daily?.drills?.length}`);

check('GET /content — academy modules',
  (content.json.academy?.length || 0) === 6 && content.json.academy.every((m) => m.drills?.length >= 4 && m.reads?.length >= 4),
  `${content.json.academy?.length} modules, ${(content.json.academy || []).reduce((n, m) => n + m.drills.length, 0)} drills`);

check('GET /content — body deck is 40 cards with notes',
  (content.json.body?.length || 0) === 40 && Object.keys(content.json.bodyNotes || {}).length >= 8,
  `${content.json.body?.length} cards, ${Object.keys(content.json.bodyNotes || {}).length} cluster notes`);

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

console.log(fail.length ? `\n✗ ${fail.length} failing` : '\n✓ every endpoint healthy');
process.exit(fail.length ? 1 : 0);
