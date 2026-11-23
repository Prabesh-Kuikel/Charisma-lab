// Pure logic: search ranking, insights maths, backup merge rules.
import assert from 'node:assert/strict';

const mem = new Map();
globalThis.localStorage = {
  getItem: (k) => (mem.has(k) ? mem.get(k) : null),
  setItem: (k, v) => mem.set(k, String(v)),
  removeItem: (k) => mem.delete(k),
  key: (i) => [...mem.keys()][i] ?? null,
  get length() { return mem.size; },
  clear: () => mem.clear(),
};
globalThis.window = globalThis;
globalThis.document = { body: {}, createElement: () => ({ click() {}, remove() {}, set href(v) {}, set download(v) {} }), addEventListener() {}, removeEventListener() {} };
globalThis.URL = { createObjectURL: () => 'blob:x', revokeObjectURL() {} };
globalThis.Blob = class { constructor(parts) { this.parts = parts; } };

const { buildIndex, search, suggestions } = await import('../src/local/search.js');
const ins = await import('../src/local/insights.js');
const backup = await import('../src/local/backup.js');

let pass = 0;
const ok = (name, cond) => { assert.equal(!!cond, true, name); pass++; };

// ── search: ranking, recall, and the every-token rule ──
const content = {
  library: [
    { id: 'lib-a', title: 'The Number and the Silence', short: 'Say the price once.', body: 'price silence negotiation', category: 'Money', tags: ['price'], use: 'quoting' },
    { id: 'lib-b', title: 'The Callback Economy', short: 'Return the joke.', body: 'humour callback memory', category: 'Humour', tags: ['humour'], use: 'parties' },
    { id: 'lib-c', title: 'The Warm Exit', short: 'Leave well.', body: 'exit grace', category: 'Small Talk', tags: [], use: 'events' },
  ],
  academy: [{ id: 'm1', name: 'Humour As A Discipline', tagline: 'Funny is mechanical.', thesis: 'target timing', principles: [], mechanics: [], scripts: [], drills: [] }],
  gym: [{ id: 'g1', title: 'Saying your price without flinching', goal: 'hold the number', situation: 'A client asks what you charge', steps: [], lines: [], avoid: [], drill: [] }],
  tracks: [], skills: [], frameworks: [], games: [], daily: { drills: [] },
};
const index = buildIndex(content);
ok('index builds every record', index.length === 5);
ok('query under 2 chars returns nothing', search(index, 'p').length === 0);
const priceHits = search(index, 'price');
ok('price finds both the chapter and the playbook', priceHits.length === 2);
ok('title hits outrank body hits', priceHits[0].title.includes('price') || priceHits[0].title.includes('Price'));
ok('every token must match', search(index, 'price zebra').length === 0);
ok('case insensitive', search(index, 'CALLBACK').length === 1);
ok('stems plurals', search(index, 'callbacks').length === 1);
ok('stop words ignored', search(index, 'the price').length === 2);
ok('limit is respected', search(index, 'price', 1).length === 1);
ok('suggestions fall back to the index head', suggestions(index, 3).length === 3);
ok('results carry a route', priceHits.every((h) => !!h.route && !!h.kind));

// ── insights: trend, deltas, coverage, neglect ──
const day = (n) => new Date(Date.now() - n * 86400000).toISOString();
const sessions = [
  { kind: 'wit', score: 40, created_at: day(20) }, { kind: 'wit', score: 45, created_at: day(18) },
  { kind: 'wit', score: 70, created_at: day(4) }, { kind: 'wit', score: 75, created_at: day(2) },
  { kind: 'impromptu', score: 60, created_at: day(30) },
];
const trend = ins.scoreTrend(sessions);
ok('trend has one point per scored session', trend.length === 5);
// the series runs oldest → newest, so the last point is the most recent average
ok('the series is chronological', new Date(trend[0].at) < new Date(trend[trend.length - 1].at));
// window=5 over five sessions ends at the mean of all five
ok('the final point is the whole-window mean', Math.round(trend[trend.length - 1].avg) === 58);
ok('the window is exactly what it says', Math.abs(ins.scoreTrend(sessions, null, 2).slice(-1)[0].avg - 72.5) < 0.01);
ok('a shorter window reacts faster',
  ins.scoreTrend(sessions, null, 2).slice(-1)[0].avg > ins.scoreTrend(sessions, null, 5).slice(-1)[0].avg);
ok('a kind filter narrows the series', ins.scoreTrend(sessions, 'wit').length === 4);
const imps = ins.improvements(sessions);
const wit = imps.find((i) => i.kind === 'wit');
ok('improvement detected for wit', wit && wit.delta > 10);
ok('kinds with too few sessions are skipped', !imps.find((i) => i.kind === 'impromptu'));

const cov = ins.coverage(
  { gym: [{ id: 'a' }, { id: 'b' }], library: [{ id: 'lib-a' }], academy: [{ id: 'm1' }], tracks: [{ dayCount: 30 }] },
  sessions, { a: { step: 0 } }, [{ id: 's1' }], new Set(['2026-01-01']),
);
ok('coverage covers every surface', cov.length === 5);
ok('gym coverage counts the SRS store', cov.find((c) => c.key === 'gym').done === 1);
ok('library coverage counts lib- refs only', cov.find((c) => c.key === 'library').done === 0);
ok('course coverage counts distinct days', cov.find((c) => c.key === 'courses').done === 1);

const neg = ins.neglected(sessions);
ok('neglect is sorted oldest first', neg[0].days >= neg[neg.length - 1].days);
ok('neglect names the skill', !!neg[0].name);

// recommendation priority: review > stall > cold > new > script > keep
const rec1 = ins.recommend({ srsDue: [1, 2], improvements: [], neglected: [], coverage: [] });
ok('a due review wins', rec1.kind === 'review');
const rec2 = ins.recommend({ srsDue: [], improvements: [{ kind: 'wit', name: 'Wit', delta: -12, from: 70, to: 58 }], neglected: [], coverage: [] });
ok('a falling skill beats a cold one', rec2.kind === 'stall');
const rec3 = ins.recommend({ srsDue: [], improvements: [], neglected: [{ kind: 'wit', name: 'Wit', days: 30 }], coverage: [] });
ok('a cold skill beats an unexplored one', rec3.kind === 'cold');
const rec4 = ins.recommend({ srsDue: [], improvements: [], neglected: [], coverage: [{ key: 'library', label: 'Chapters read', done: 1, total: 83, pct: 1 }] });
ok('an untouched area is suggested next', rec4.kind === 'new');
const rec5 = ins.recommend({ srsDue: [], improvements: [], neglected: [], coverage: [], hasScripts: false });
ok('writing a script is the last-resort nudge', rec5.kind === 'script');
const rec6 = ins.recommend({ srsDue: [], improvements: [], neglected: [], coverage: [], hasScripts: true });
ok('everything fine falls back to a rep', rec6.kind === 'keep');

ok('sparkline is a valid path', ins.sparkPath([1, 5, 3], 100, 30).startsWith('M'));
ok('sparkline handles one point', ins.sparkPath([7]).length > 0);
ok('sparkline handles none', ins.sparkPath([]) === '');

// ── backup: keys, summary, merge, replace, rejections ──
mem.clear();
localStorage.setItem('charisma-lab.state.v1', JSON.stringify({ user: { xp: 100, name: 'A' }, activity: [{ day: '2026-01-01', kind: 'wit', xp: 5 }], progress: [{ track: 'fast', day: 1 }], sessions: [{ id: 'x1', kind: 'wit', score: 50 }] }));
localStorage.setItem('charisma-lab.scripts.v1', JSON.stringify([{ id: 's1', text: 'hi' }]));
localStorage.setItem('charisma-lab.ai.v1', JSON.stringify({ provider: 'compatible', key: 'SECRET' }));
localStorage.setItem('someone-else.key', 'nope');

const snapshot = backup.snapshotData();
ok('snapshot is labelled', snapshot.app === 'charisma-lab' && snapshot.schema === 1);
ok('snapshot excludes the AI key', !Object.keys(snapshot.data).includes('charisma-lab.ai.v1'));
ok('snapshot excludes foreign keys', !Object.keys(snapshot.data).includes('someone-else.key'));
ok('snapshot summarises XP', snapshot.counts.xp === 100);
ok('snapshot summarises days', snapshot.counts.activityDays === 1);
ok('export is parseable JSON', typeof JSON.parse(backup.exportJSON()) === 'object');

// merge keeps the higher XP and unions progress
const incoming = JSON.stringify({
  app: 'charisma-lab', schema: 1, data: {
    'charisma-lab.state.v1': JSON.stringify({ user: { xp: 40, name: 'B' }, activity: [{ day: '2026-01-02', kind: 'wit', xp: 5 }], progress: [{ track: 'fast', day: 2 }], sessions: [{ id: 'x2', kind: 'wit', score: 60 }] }),
    'charisma-lab.scripts.v1': JSON.stringify([{ id: 's2', text: 'yo' }]),
  },
});
const merged = backup.importJSON(incoming, 'merge');
ok('merge reports what it wrote', merged.written === 2);
const st = JSON.parse(localStorage.getItem('charisma-lab.state.v1'));
ok('merge keeps the higher XP', st.user.xp === 100);
ok('merge unions course days', st.progress.length === 2);
ok('merge unions activity', st.activity.length === 2);
ok('merge unions sessions', st.sessions.length === 2);
ok('merge unions scripts with no duplicates', JSON.parse(localStorage.getItem('charisma-lab.scripts.v1')).length === 2);

// replace overwrites
backup.importJSON(incoming, 'replace');
const rep = JSON.parse(localStorage.getItem('charisma-lab.state.v1'));
ok('replace takes the file verbatim', rep.user.xp === 40 && rep.user.name === 'B');
ok('replace drops the other side’s days', rep.progress.length === 1);

const rejects = (text) => { try { backup.importJSON(text); return ''; } catch (e) { return e.message; } };
ok('rejects non-JSON', /not valid JSON/.test(rejects('nope{')));
ok('rejects a foreign file', /not a Charisma Lab backup/.test(rejects('{"app":"other","data":{}}')));
ok('rejects a future schema', /newer version/.test(rejects('{"app":"charisma-lab","schema":99,"data":{"a":"b"}}')));

console.log(`\n✓ insights: ${pass} checks pass (search ranking, trend maths, coverage, recommendation order, backup merge/replace)`);
