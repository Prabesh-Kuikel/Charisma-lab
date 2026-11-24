// ─────────────────────────────────────────────────────────────
//  Content parity
//  The same content is composed twice: once in server/index.js (for
//  the Express API) and once in src/local/api.js (for the static
//  build). Nothing enforced that the two lists stayed in step, and
//  the failure is invisible: a wing imported in one place and not
//  the other simply vanishes from that build. That is exactly how
//  the API went from 31 to 51 playbooks while the server crashed on
//  a missing import, and how 10 new playbooks would have been lost
//  from the static site had the same mistake repeated.
//
//  This test reads both composition sites and asserts every content
//  module is used by both, and that the served counts match the sum
//  of the source arrays.
// ─────────────────────────────────────────────────────────────
import { readFileSync, readdirSync } from 'node:fs';

let fails = 0;
const ok = (cond, label) => { if (!cond) { fails += 1; console.log('FAIL:', label); } };

const ROOT = new URL('../', import.meta.url);
const serverSrc = readFileSync(new URL('server/index.js', ROOT), 'utf8');
const localSrc = readFileSync(new URL('src/local/api.js', ROOT), 'utf8');

// every content module that exports a data array
const files = readdirSync(new URL('server/content', ROOT)).filter((f) => f.endsWith('.js'));
const dataFiles = [];
for (const f of files) {
  const src = readFileSync(new URL(`server/content/${f}`, ROOT), 'utf8');
  const hasArray = /export\s+const\s+[A-Z0-9_]+\s*=\s*\[/.test(src);
  if (hasArray) dataFiles.push(f);
}

console.log(`${dataFiles.length} content modules export arrays`);

const importedBy = (src, file) => new RegExp(`from '\\.+/${file.replace('.', '\\.')}'`).test(src)
  || new RegExp(`from '\\./content/${file.replace('.', '\\.')}'`).test(src)
  || new RegExp(`from '\\.\\./\\.\\./server/content/${file.replace('.', '\\.')}'`).test(src);

// Deliberately single-build: the lesson prose is loaded lazily by the static
// build through src/local/lessons.js, and the assessment + chapter id index are
// consumed through other modules. They still need to be reachable somewhere.
const LAZY = {
  'lessons-fast.js': 'src/local/lessons.js',
  'lessons-deep.js': 'src/local/lessons.js',
  'lessons-deep-2.js': 'src/local/lessons.js',
  'lessons-deep-3.js': 'src/local/lessons.js',
  'assessment.js': 'src/views/Start.jsx',
  'chapter-ids.js': 'src/local/api.js',
};
const missing = [];
for (const f of dataFiles) {
  if (LAZY[f]) {
    const consumer = readFileSync(new URL(LAZY[f], ROOT), 'utf8');
    const base = f.replace('.js', '');
    ok(consumer.includes(base), `${f} is lazy-loaded by ${LAZY[f]}`);
    continue;
  }
  const inServer = serverSrc.includes(f);
  const inLocal = localSrc.includes(f);
  if (!inServer || !inLocal) missing.push(`${f} → ${inServer ? '' : 'server '}${inLocal ? '' : 'static build'}`.trim());
}
if (missing.length) {
  console.log('\nContent modules not wired into both builds:');
  for (const m of missing) console.log('  ✗', m);
}
ok(missing.length === 0, `every content module reaches both builds (${missing.length} missing)`);

// ── served counts must equal the sum of the source arrays ──
const mods = {
  gym: ['gym.js:GYM_SCENARIOS', 'gym-extra.js:GYM_EXTRA', 'gym-extra-5.js:GYM_EXTRA_5', 'written.js:WRITTEN_GYM'],
  wit: ['wit.js:WIT_SCENARIOS', 'content-v4.js:EXTRA_WIT', 'wit-extra-5.js:WIT_EXTRA_5', 'wit-extra-10.js:WIT_EXTRA_10'],
  library: ['library.js:LIBRARY', 'library-extra.js:LIBRARY_EXTRA', 'library-extra-3.js:LIBRARY_EXTRA_3', 'library-extra-5.js:LIBRARY_EXTRA_5', 'written.js:WRITTEN_ENTRIES'],
  frameworks: ['frameworks.js:FRAMEWORKS', 'content-v4.js:EXTRA_FRAMEWORKS', 'content-5.js:EXTRA_FRAMEWORKS_5'],
  prompts: ['lab.js:IMPROMPTU_PROMPTS', 'lab-extra.js:EXTRA_PROMPTS', 'lab-extra-5.js:EXTRA_PROMPTS_5'],
  drills: ['daily.js:DAILY_DRILLS', 'content-v4.js:EXTRA_DAILY', 'content-5.js:EXTRA_DAILY_5', 'content-5.js:EXTRA_DAILY_10', 'content-5.js:EXTRA_DAILY_10B'],
  arena: ['arena.js:ARENA_SCENARIOS', 'arena-extra.js:ARENA_EXTRA', 'arena-extra-10.js:ARENA_EXTRA_10'],
  psychology: ['psychology.js:PSY_ALL'],
  stories: ['stories.js:STORIES'],
};

const expected = {};
for (const [wing, parts] of Object.entries(mods)) {
  let n = 0;
  for (const part of parts) {
    const [file, name] = part.split(':');
    const m = await import(new URL(`server/content/${file}`, ROOT));
    const arr = m[name];
    ok(Array.isArray(arr), `${wing}: ${file} exports ${name}`);
    if (Array.isArray(arr)) n += arr.length;
  }
  expected[wing] = n;
}
console.log('expected counts:', JSON.stringify(expected));

// The local composition is the one we can import without a server.
globalThis.localStorage = globalThis.localStorage || {
  getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {}, key: () => null, length: 0,
};
const { api } = await import('../src/local/api.js');
const served = await api.content();
const actual = {
  gym: (served.gym || []).length,
  wit: (served.wit || []).length,
  library: (served.library || []).length,
  frameworks: (served.frameworks || []).length,
  prompts: (served.prompts || []).length,
  psychology: (served.psychology || []).length,
  stories: (served.stories || []).length,
  arena: (served.arena || []).length,
  drills: ((served.daily || {}).drills || []).length,
};
console.log('served counts:  ', JSON.stringify(actual));
for (const wing of Object.keys(expected)) {
  ok(actual[wing] === expected[wing], `${wing}: served ${actual[wing]} of ${expected[wing]}`);
}

// ── every id must be unique inside its wing, or a deep link opens the wrong thing ──
for (const wing of Object.keys(actual)) {
  const list = wing === 'drills' ? (served.daily.drills || []) : served[wing] || [];
  const ids = list.map((x) => x.id);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  ok(dupes.length === 0, `${wing}: duplicate ids ${dupes.slice(0, 5).join(', ')}`);
}

// ── no wing may be empty, and no record may be missing the fields its view reads ──
const required = {
  gym: ['id', 'category', 'title', 'situation', 'goal', 'steps', 'lines', 'avoid'],
  wit: ['id', 'category', 'title', 'theySay', 'modelLines'],
  library: ['id', 'category', 'title', 'short', 'body', 'tags'],
  frameworks: ['id', 'name', 'category', 'oneLiner', 'steps'],
  prompts: ['id', 'text', 'category', 'speak'],
  psychology: ['id', 'title', 'category', 'evidence', 'strength', 'practise'],
  stories: ['id', 'title', 'type', 'oneLiner', 'opening', 'beats', 'turn', 'detail', 'why', 'whenNot', 'practise'],
  // probes/facts are the reply script and are stripped from /api/content
  arena: ['id', 'name', 'scene', 'brief', 'goal', 'opener', 'reads', 'exits'],
  // reactions is a nested object; asserted separately below
};
for (const [wing, fields] of Object.entries(required)) {
  const list = served[wing] || [];
  const bad = list.filter((x) => fields.some((f) => x[f] == null || (Array.isArray(x[f]) && x[f].length === 0)
    || (typeof x[f] === 'object' && !Array.isArray(x[f]) && Object.keys(x[f]).length === 0)));
  ok(bad.length === 0, `${wing}: every record has ${fields.join('/')} (${bad.length} incomplete: ${bad.slice(0, 3).map((b) => b.id).join(', ')})`);
}

// The Arena reply engine needs a reaction for each trust tier, or a conversation
// stalls at the moment trust changes — the one moment it must not stall. Those
// fields are stripped from /api/content on purpose (they are the reply script),
// so they are asserted against the source arrays instead.
const arenaFull = [
  ...(await import('../server/content/arena.js')).ARENA_SCENARIOS,
  ...(await import('../server/content/arena-extra.js')).ARENA_EXTRA,
  ...(await import('../server/content/arena-extra-10.js')).ARENA_EXTRA_10,
];
const arenaBad = arenaFull.filter((a) => !a.reactions
  || !['cold', 'neutral', 'warm'].every((tier) => (a.reactions[tier] || []).length >= 2));
ok(arenaBad.length === 0, `arena personas missing a cold/neutral/warm reaction: ${arenaBad.map((a) => a.id).join(', ') || 'none'}`);
// the reply script must never be served to the client: facts/probes/reactions are
// the answer key for a live roleplay, not content
ok(!JSON.stringify(served.arena).includes('"reactions"'), 'the arena reply script is being shipped to the browser');
// every scene should have enough personas to be worth choosing between
const sceneCounts = {};
for (const a of served.arena || []) sceneCounts[a.scene] = (sceneCounts[a.scene] || 0) + 1;
const thinScenes = Object.entries(sceneCounts).filter(([, n]) => n < 3);
console.log('arena scenes:', JSON.stringify(sceneCounts));
ok(thinScenes.length === 0, `arena scenes with fewer than 3 personas: ${thinScenes.map(([s, n]) => `${s}=${n}`).join(', ') || 'none'}`);

// ── ids referenced across wings must resolve ──
const gymIds = new Set((served.gym || []).map((g) => g.id));
const libIds = new Set((served.library || []).map((l) => l.id));
const fwIds = new Set((served.frameworks || []).map((f) => f.id));
let dangling = 0;
for (const g of served.gym || []) {
  for (const r of g.reads || []) {
    const id = typeof r === 'string' ? r : r?.id;
    if (id && !libIds.has(id)) { dangling += 1; console.log(`  ✗ gym ${g.id} reads missing chapter ${id}`); }
  }
}
// stories point at psychology entries, frameworks and each other
const psyIds = new Set((served.psychology || []).map((p) => p.id));
const storyIds = new Set((served.stories || []).map((s) => s.id));
for (const st of served.stories || []) {
  for (const p of st.pairs || []) {
    const id = typeof p === 'string' ? p : p?.id;
    if (id && !storyIds.has(id) && !psyIds.has(id) && !fwIds.has(id)) { dangling += 1; console.log(`  ✗ story ${st.id} pairs with unknown ${id}`); }
  }
}
for (const f of served.frameworks || []) {
  for (const p of f.pairs || []) {
    // framework pairs are namespaced: cf-<id> points at another framework,
    // lib-<id> at a chapter. Strip the prefix before resolving.
    const raw = typeof p === 'string' ? p : p?.id;
    const id = raw?.startsWith('cf-') ? raw.slice(3) : raw;
    if (id && !fwIds.has(id) && !gymIds.has(id) && !libIds.has(id)) { dangling += 1; console.log(`  ✗ framework ${f.id} pairs with unknown ${raw}`); }
  }
}
ok(dangling === 0, `no dangling cross-references (${dangling})`);

console.log(fails ? `\n✗ ${fails} failing` : '\n✓ content parity: both builds serve every wing, counts match, ids unique');
process.exit(fails ? 1 : 0);
