// Tests for the round-5 additions: the rep log, notes/verdicts, and the
// Today recommendation. Pure node modules with a fake localStorage, so they
// run without a server or a DOM.
import { readFileSync } from 'node:fs';

let fails = 0;
const ok = (cond, label) => { if (!cond) { fails += 1; console.log('FAIL:', label); } };

// ── fake localStorage ──
const store = new Map();
globalThis.localStorage = {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, String(v)),
  removeItem: (k) => store.delete(k),
  clear: () => store.clear(),
  key: (i) => [...store.keys()][i] ?? null,
  get length() { return store.size; },
};

const reps = await import('../src/local/reps.js');
const notes = await import('../src/local/notes.js');

// ── rep XP maths: effort and quality must both move the number ──
const tap = reps.xpFor({ kind: 'daily', seconds: 0 });
const short = reps.xpFor({ kind: 'impromptu', seconds: 90, score: 60 });
const long = reps.xpFor({ kind: 'impromptu', seconds: 150, score: 90 });
const repeat = reps.xpFor({ kind: 'impromptu', seconds: 90, score: 60, repeat: true });
console.log(`xp: tap ${tap} · short ${short} · long ${long} · repeat ${repeat}`);
ok(tap >= 2 && tap <= 6, `a zero-effort tap should pay little, got ${tap}`);
ok(long > short, 'a longer, higher-scoring rep must pay more than a short one');
ok(repeat === short + 3, '"I will do it again" adds a flat 3 XP');
ok(reps.xpFor({ kind: 'arena', seconds: 600, score: 100 }) <= 30, 'no rep can pay more than ~30 XP (no farming)');
ok(reps.xpFor({ kind: 'nonsense-kind', seconds: 10 }) >= 2, 'an unknown kind still logs instead of throwing');

// ── logging, undo, aggregation ──
localStorage.clear();
const a = reps.logRep({ kind: 'impromptu', ref: 'p1', label: 'Boredom is a luxury good', seconds: 120, score: 74 });
const b = reps.logRep({ kind: 'gym', ref: 'gym-pro-salary', label: 'Asking for a raise', seconds: 300 });
ok(reps.allReps().length === 2, 'two reps stored');
ok(a.xp > 0 && a.day === new Date().toISOString().slice(0, 10), 'rep carries xp and a day key');
ok(reps.repsToday().length === 2, 'both count as today');
ok(reps.lastRep().id === b.id, 'lastRep returns the most recent');

const kindRows = reps.byKind();
ok(kindRows.length === 2, 'two kinds in the breakdown');
ok(kindRows.find((k) => k.kind === 'gym').minutes === 5, 'minutes are rounded from seconds');

reps.removeRep(a.id);
ok(reps.allReps().length === 1, 'undo removes exactly one rep');
ok(reps.allReps()[0].id === b.id, 'undo removed the right one');

// ── streaks ──
localStorage.clear();
const day = (n) => { const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString().slice(0, 10); };
const raw = (n, kind = 'daily') => ({ id: `x${n}`, kind, ref: '', label: '', at: new Date().toISOString(), day: day(n), seconds: 60, score: null, xp: 5 });
localStorage.setItem('charisma-lab.reps.v1', JSON.stringify([raw(0), raw(1), raw(2)]));
ok(reps.streak().current === 3, `three consecutive days is a 3-day streak, got ${reps.streak().current}`);
localStorage.setItem('charisma-lab.reps.v1', JSON.stringify([raw(0), raw(2), raw(3)]));
ok(reps.streak().current === 1, 'a gap resets the current streak to 1 (today only)');
ok(reps.streak().best === 2, `best streak still remembers the earlier run, got ${reps.streak().best}`);
localStorage.setItem('charisma-lab.reps.v1', JSON.stringify([raw(1)]));
ok(reps.streak().current === 1, 'yesterday still counts — a streak should not die at midnight');
localStorage.clear();
ok(reps.streak().current === 0, 'no reps means no streak');
ok(reps.summary().total === 0, 'empty summary is safe');

// ── the coach-style "gone quiet" suggestion ──
localStorage.clear();
const old = new Date(Date.now() - 21 * 86400000).toISOString();
localStorage.setItem('charisma-lab.reps.v1', JSON.stringify([{ ...raw(21), at: old, kind: 'wit' }, raw(0, 'gym')]));
const sug = reps.nextRepSuggestion();
ok(sug && sug.kind === 'wit' && sug.days >= 20, `the coldest kind is suggested, got ${JSON.stringify(sug)}`);
localStorage.clear();
localStorage.setItem('charisma-lab.reps.v1', JSON.stringify([raw(0, 'wit')]));
ok(reps.nextRepSuggestion() === null, 'nothing suggested when everything is recent');

// ── one practise action must count once, in both logs ──
localStorage.clear();
const { stats: storeStats } = await import('../src/local/store.js');
const { setActivityMirror } = reps;
const { touchDay } = await import('../src/local/store.js');
setActivityMirror(touchDay);
ok(storeStats().streak.current === 0, 'no activity before any rep');
const mirrored = reps.logRep({ kind: 'gym', ref: 'g', label: 'Playbook', seconds: 240 });
ok(storeStats().streak.current === 1, 'a rep also lights the day in the activity log');
reps.removeRep(mirrored.id);
ok(storeStats().streak.current === 0, 'undoing the only rep of the day takes the day back out');
reps.logRep({ kind: 'gym', seconds: 200 });
const second = reps.logRep({ kind: 'wit', seconds: 25 });
reps.removeRep(second.id);
ok(storeStats().streak.current === 1, 'undoing one of two reps keeps the day');
setActivityMirror(null);

// ── notes ──
localStorage.clear();
ok(notes.allNotes().length === 0, 'notes start empty');
let threw = false;
try { notes.addNote({ ref: 'lib-x', text: '   ' }); } catch { threw = true; }
ok(threw, 'an empty note is rejected');
const n1 = notes.addNote({ ref: 'lib-cr2', refType: 'library', title: 'Name It, Then Change One Thing', quote: 'The stop is the part nobody does.', text: 'I always add a second apology.' });
ok(notes.notesFor('lib-cr2').length === 1, 'note is filed against its chapter');
ok(notes.hasNotes('lib-cr2'), 'hasNotes finds it');
ok(n1.quote.startsWith('The stop'), 'the highlight is kept with the note');
const n2 = notes.addNote({ ref: 'today', refType: 'other', text: 'Asked a fork question at lunch and it worked.' });
notes.togglePin(n1.id);
const ordered = notes.notesOrdered();
ok(ordered[0].id === n1.id, 'pinned notes sort first regardless of age');
ok(notes.notesOrdered('library').length === 1, 'filter by type');
notes.updateNote(n2.id, { text: 'edited' });
ok(notes.allNotes().find((n) => n.id === n2.id).text === 'edited', 'edit persists');
notes.removeNote(n2.id);
ok(notes.allNotes().length === 1, 'delete persists');

// ── verdicts ──
ok(notes.VERDICTS.used.xp > notes.VERDICTS.will.xp, '"I used it" is worth more than "I will use it"');
notes.setVerdict('lib-cr2', 'will', 'Name It');
notes.setVerdict('lib-cr7', 'used', 'The Honest No');
notes.setVerdict('lib-g1', 'no', 'Law 1');
let bad = false;
try { notes.setVerdict('lib-cr2', 'maybe'); } catch { bad = true; }
ok(bad, 'an unknown verdict is rejected');
const vs = notes.verdictStats();
ok(vs.used === 1 && vs.will === 1 && vs.no === 1 && vs.total === 3, `verdict counts, got ${JSON.stringify(vs)}`);
ok(vs.ratio === 33, `ratio is used/total rounded, got ${vs.ratio}`);
const pending = notes.pendingVerdicts();
ok(pending.length === 1 && pending[0].ref === 'lib-cr2', 'the backlog is only "will use" items');
notes.setVerdict('lib-cr2', 'used', 'Name It');
ok(notes.pendingVerdicts().length === 0, 'marking used clears the backlog');

// ── backup must carry both new stores ──
const backupSrc = readFileSync(new URL('../src/local/backup.js', import.meta.url), 'utf8');
ok(/charisma-lab\.notes\.v1/.test(backupSrc) && /charisma-lab\.verdicts\.v1/.test(backupSrc),
  'backup lists the notes and verdicts keys');
ok(/charisma-lab\.reps\.v1/.test(backupSrc), 'backup lists the rep log');
ok(!/charisma-lab\.ai\.v1'\]/.test(backupSrc.replace(/\s+/g, '')), 'the AI key is never exported');

// ── every view that logs practice must go through the rep log ──
const apiSrc = readFileSync(new URL('../src/local/api.js', import.meta.url), 'utf8');
const logged = ['impromptu', 'wit', 'pronunciation', 'body', 'arena', 'course', 'coach'];
for (const kind of logged) {
  ok(new RegExp(`logRep\\(\\{ kind: '${kind}'`).test(apiSrc), `${kind} reps reach the practice log`);
}

// ── the Today decision list must always produce an action ──
const todaySrc = readFileSync(new URL('../src/views/Today.jsx', import.meta.url), 'utf8');
ok(/if \(due\.length\)/.test(todaySrc) && /reps\.suggestion/.test(todaySrc) && /!reps\.total/.test(todaySrc),
  'Today prioritises: due reviews → cold skill → first rep → daily drill');
ok(/removeRep/.test(todaySrc), 'the log can be undone in the UI');
ok(/addNote/.test(todaySrc), 'quick capture writes into notes');

// ── the api proxy must not lose methods in server mode ──
// api.chapter only exists in the browser (lazy chapter prose); in server mode
// the proxy has to fall back to the local impl, or every long-form chapter
// renders "still being written" with no error anywhere.
const proxySrc = readFileSync(new URL('../src/api.js', import.meta.url), 'utf8');
ok(/typeof impl\[name\] === 'function'/.test(proxySrc) && /typeof local\[name\] === 'function'/.test(proxySrc),
  'the api proxy falls back to the local impl for browser-only methods');

// ── every api.* call a view makes must exist in the local surface ──
const { readdirSync } = await import('node:fs');
const localApi = (await import('../src/local/api.js')).api;
const localKeys = new Set(Object.keys(localApi));
const called = new Set();
for (const f of readdirSync(new URL('../src/views', import.meta.url))) {
  const src = readFileSync(new URL(`../src/views/${f}`, import.meta.url), 'utf8');
  for (const m of src.matchAll(/api\.(\w+)\(/g)) called.add(m[1]);
}
const missing = [...called].filter((k) => !localKeys.has(k));
ok(missing.length === 0, `every api method used by a view exists locally (missing: ${missing.join(', ') || 'none'})`);

// ── notes and reps survive the backup round-trip ──
localStorage.clear();
notes.addNote({ ref: 'lib-cr3', refType: 'library', title: 'The Warm Line', text: 'kept' });
reps.logRep({ kind: 'daily', ref: 'd1', label: 'Ten-Second Silence', seconds: 240 });
const backup = await import('../src/local/backup.js');
const text = backup.exportJSON();
ok(/charisma-lab\.notes\.v1/.test(text) && /charisma-lab\.reps\.v1/.test(text),
  'an exported backup contains the notes and the practice log');

// ── the impromptu difficulty filter must reach every prompt ──
const prompts = (await import('../server/content/lab.js')).IMPROMPTU_PROMPTS
  .concat((await import('../server/content/lab-extra.js')).EXTRA_PROMPTS)
  .concat((await import('../server/content/lab-extra-5.js')).EXTRA_PROMPTS_5);
const tiers = { 'Warm-up': (d) => d <= 2, Working: (d) => d === 3, Hard: (d) => d >= 4 };
const covered = new Set();
for (const [, test] of Object.entries(tiers)) for (const p of prompts) if (test(p.difficulty || 3)) covered.add(p.id);
ok(covered.size === prompts.length, `every prompt falls in exactly one tier (${covered.size}/${prompts.length})`);
for (const [name, test] of Object.entries(tiers)) {
  const n = prompts.filter((p) => test(p.difficulty || 3)).length;
  ok(n >= 4, `the ${name} tier has enough prompts to roll (${n})`);
  if (n < 8) console.log(`note: ${name} is a thin tier (${n} prompts)`);
}

// ── the psychology wing: every entry has to be honest by construction ──
const { PSY_ENTRIES, PSY_ALL, PSY_CATEGORIES, PSY_MANIFESTO } = await import('../server/content/psychology.js');
ok(PSY_ALL.length >= 25, `the psychology section is substantive (${PSY_ALL.length} entries)`);
ok(PSY_MANIFESTO?.rules?.length >= 3, 'the section states its editorial rules up front');
for (const e of PSY_ALL) {
  const missing = ['title', 'oneLiner', 'field', 'evidence', 'strength', 'mechanism', 'limit', 'practise']
    .filter((k) => !e[k]);
  ok(missing.length === 0, `${e.id}: has ${missing.join(', ') || 'all fields'}`);
  ok((e.effect || []).length >= 1 && (e.use || []).length >= 1 && (e.defence || []).length >= 1,
    `${e.id}: effect, use and defence are all present — a psychology entry without the defence is a manipulation manual`);
  ok((e.keywords || []).length >= 3, `${e.id}: is findable by the words people actually type`);
}
// no mechanism may claim a strength it does not declare
const strengths = new Set(PSY_ALL.map((e) => e.strength));
ok([...strengths].every((s) => typeof s === 'string' && s.length > 3), 'every entry declares an evidence strength');
// honest labelling: the famous failures must be marked weak, not buried
const powerPose = PSY_ALL.find((e) => /power posing/i.test(e.title));
const ego = PSY_ALL.find((e) => /willpower/i.test(e.title));
ok(powerPose && /weak/i.test(powerPose.strength), 'power posing is labelled weak, not sold');
ok(ego && /weak/i.test(ego.strength), 'ego depletion is labelled weak, not sold');
// every family has content and every entry belongs to a declared family
const catIds = new Set(PSY_CATEGORIES.map((c) => c.id));
ok(PSY_ALL.every((e) => catIds.has(e.category)), 'every entry belongs to a declared family');
ok(PSY_CATEGORIES.every((c) => PSY_ALL.some((e) => e.category === c.id)), 'no empty family');
// cross-references resolve inside the wing
const psyIds = new Set(PSY_ALL.map((e) => e.id));
const badPairs = PSY_ALL.flatMap((e) => (e.pairs || []).filter((p) => !psyIds.has(p)).map((p) => `${e.id}→${p}`));
ok(badPairs.length === 0, `psychology read-next links resolve (${badPairs.join(', ') || 'all good'})`);

// ── the wing must be reachable: nav, palette, search and the router ──
const appSrc = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
ok(/key: 'psychology'/.test(appSrc), 'psychology is in the sidebar');
ok(/case 'psychology': return <Psychology/.test(appSrc), 'psychology is in the router');
ok(/h: 'psychology'/.test(appSrc), 'psychology has a keyboard shortcut');
const palSrc = readFileSync(new URL('../src/components/CommandPalette.jsx', import.meta.url), 'utf8');
ok(/\['psychology'/.test(palSrc), 'psychology is in the command palette');
const searchSrc = readFileSync(new URL('../src/local/search.js', import.meta.url), 'utf8');
ok(/content\.psychology/.test(searchSrc), 'psychology entries are in the search index');


// ── the stories wing: a story has to be tellable, not merely readable ──
const { STORIES, STORY_TYPES, STORY_RULES, STORY_NOTES } = await import('../server/content/stories.js');
ok(STORIES.length >= 20, `the stories wing is substantive (${STORIES.length} stories)`);
ok(STORY_TYPES.length >= 5 && STORY_RULES.length >= 3, 'stories declares its shapes and its rules');
for (const st of STORIES) {
  const missing = ['title', 'oneLiner', 'opening', 'detail', 'turn', 'why', 'whenNot', 'teller', 'type']
    .filter((k) => !st[k]);
  ok(missing.length === 0, `story ${st.id}: has ${missing.join(', ') || 'all fields'}`);
  ok((st.beats || []).length >= 4, `story ${st.id}: has beats to rehearse (${(st.beats || []).length})`);
  ok((st.practise || []).length >= 3, `story ${st.id}: says how to rehearse it`);
  ok((st.keywords || []).length >= 3, `story ${st.id}: is findable by the situation people are in`);
  ok(st.seconds >= 30 && st.seconds <= 120, `story ${st.id}: is a length that survives a meeting (${st.seconds}s)`);
  // the honesty test: every story has to say when it does NOT belong in the room
  ok(/\b(not|never|save it|only|avoid)\b/i.test(st.whenNot), `story ${st.id}: warns about the room it does not belong in`);
}
const typeIds = new Set(STORY_TYPES.map((t) => t.id));
ok(STORIES.every((st) => typeIds.has(st.type)), 'every story has a declared shape');
ok(STORY_TYPES.every((t) => STORIES.some((st) => st.type === t.id)), 'no empty story shape');
ok(STORY_NOTES?.rule && STORY_NOTES?.timing && STORY_NOTES?.memory, 'stories keeps its three working rules');
const storyIds = new Set(STORIES.map((st) => st.id));
ok(storyIds.size === STORIES.length, 'story ids are unique');
// cross-references may point at psychology or frameworks, and must resolve there
const { FRAMEWORKS: FW_BASE } = await import('../server/content/frameworks.js');
const { EXTRA_FRAMEWORKS: FW_V4 } = await import('../server/content/content-v4.js');
const { EXTRA_FRAMEWORKS_5: FW_V5 } = await import('../server/content/content-5.js');
const fwIdsAll = new Set([...FW_BASE, ...FW_V4, ...FW_V5].map((f) => f.id));
const badStoryPairs = STORIES.flatMap((st) => (st.pairs || [])
  .filter((p) => !storyIds.has(p) && !psyIds.has(p) && !fwIdsAll.has(p))
  .map((p) => `${st.id}→${p}`));
ok(badStoryPairs.length === 0, `story read-next links resolve across wings (${badStoryPairs.join(', ') || 'all good'})`);
// the wing must be reachable everywhere the psychology wing is
ok(/key: 'stories'/.test(appSrc), 'stories is in the sidebar');
ok(/case 'stories': return <Stories/.test(appSrc), 'stories is in the router');
ok(/j: 'stories'/.test(appSrc), 'stories has a keyboard shortcut');
ok(/\['stories'/.test(palSrc), 'stories is in the command palette');
ok(/content\.stories/.test(searchSrc), 'stories are in the search index');
const storyViewSrc = readFileSync(new URL('../src/views/Stories.jsx', import.meta.url), 'utf8');
ok(/logRep\(\{ kind: 'story'/.test(storyViewSrc), 'opening a story logs a rep rather than just scrolling past');
ok(/whenNot/.test(storyViewSrc) && /cut the setup|Do not tell this one/i.test(storyViewSrc),
  'the view shows the one thing every storytelling guide hides: when not to tell it');

// ── every wing that offers "take it to the coach" must land on the right focus ──
// The mode was in the payload and the Coach view threw it away, so all three
// hand-offs (psychology, stories, anywhere else) arrived on General.
const coachSrc = readFileSync(new URL('../src/views/Coach.jsx', import.meta.url), 'utf8');
ok(/boot\?\.mode/.test(coachSrc), 'the Coach view reads the mode out of a deep link');
ok(/function Coach\(\{[^}]*boot/.test(coachSrc), 'the Coach view is given the deep-link payload at all');
const { MODE_FOCUS_STORY } = { MODE_FOCUS_STORY: null };
const aiSrc = readFileSync(new URL('../server/ai.js', import.meta.url), 'utf8');
const engineMods = [...(aiSrc.match(/const MODE_FOCUS = \{([\s\S]*?)\n\};/) || [, ''])[1].matchAll(/^\s{2}(\w+):/gm)].map((m) => m[1]);
const coachJs = readFileSync(new URL('../server/coach.js', import.meta.url), 'utf8');
const uiMods = [...(coachJs.match(/const MODES = \[([\s\S]*?)\n\];/) || [, ''])[1].matchAll(/id: '([\w-]+)'/g)].map((m) => m[1]);
ok(engineMods.includes('storytelling'), 'the engine has a storytelling focus');
ok(uiMods.includes('storytelling'), 'the UI offers the storytelling focus');
ok(uiMods.every((m) => engineMods.includes(m)), 'the UI never offers a focus the engine does not know');
ok(/storytelling:\s*\[/.test(coachJs), 'storytelling has starter questions of its own');


// ── the numbers in CONTENT-FACTS.md must match the content that is served ──
// Twenty-eight rounds of hand-edited release notes produced a README that
// claimed 83 chapters when there were 91. The facts file is generated, and this
// check fails the build the moment it goes stale rather than waiting for a
// reader to notice.
const { FACTS } = await import('../scripts/facts.mjs').catch(async () => {
  const mod = await import('../scripts/facts.mjs');
  return mod;
});
const factsFile = readFileSync(new URL('../CONTENT-FACTS.md', import.meta.url), 'utf8');
const stale = [];
for (const [k, v] of Object.entries(FACTS)) {
  const row = factsFile.split('\n').find((l) => l.startsWith(`| ${k} |`));
  if (!row) { stale.push(`${k} (missing)`); continue; }
  const shown = row.split('|')[2].trim();
  if (shown !== String(v)) stale.push(`${k}: doc ${shown} vs actual ${v}`);
}
ok(stale.length === 0, `CONTENT-FACTS.md is stale (${stale.join('; ') || 'up to date'}) — run: npm run facts -- --write`);
ok(FACTS['Psychology mechanisms'] >= 25 && FACTS['Stories'] >= 20, 'the breadth wings are still substantial');
ok(FACTS['Library chapters written'] === FACTS['Library entries'],
  `every library entry has a chapter (${FACTS['Library chapters written']} of ${FACTS['Library entries']})`);


// ── round 10 · app quality that a user feels ─────────────────
// (1) offline: the app stores everything locally but used to need the network
// to *open*. A service worker fixes that, and its absence was invisible until
// someone opened the app on a train.
const { existsSync, readFileSync: rf } = await import('node:fs');
const swPath = new URL('../public/sw.js', import.meta.url);
ok(existsSync(swPath), 'public/sw.js exists');
const swSrc = rf(swPath, 'utf8');
ok(/BUILD_ID/.test(swSrc), 'the service worker cache is versioned per build');
ok(/addEventListener\('install'/.test(swSrc) && /addEventListener\('fetch'/.test(swSrc), 'the worker handles install and fetch');
ok(/req\.mode === 'navigate'/.test(swSrc), 'navigations fall back to a cached shell');
ok(/url\.origin !== self\.location\.origin\) return/.test(swSrc), 'cross-origin (AI provider) requests are never cached');
const mainSrc = rf(new URL('../src/main.jsx', import.meta.url), 'utf8');
ok(/serviceWorker\.register\('\.\/sw\.js'/.test(mainSrc), 'the app registers the worker with a relative scope (Pages subpath safe)');
ok(/catch \{ \/\* no offline support/.test(mainSrc), 'a failed registration cannot break the app');
const pkg = JSON.parse(rf(new URL('../package.json', import.meta.url), 'utf8'));
for (const script of ['build', 'build:static', 'build:pages']) {
  ok(/build-sw\.mjs/.test(pkg.scripts[script] || ''), `${script} stamps the service worker`);
}

// (2) dialogs must trap focus and give it back
ok(existsSync(new URL('../src/hooks-focus.js', import.meta.url)), 'a shared focus-trap hook exists');
const focusSrc = rf(new URL('../src/hooks-focus.js', import.meta.url), 'utf8');
ok(/e\.key !== 'Tab'/.test(focusSrc), 'the trap handles Tab');
ok(/restoreRef/.test(focusSrc), 'the trap remembers the opener and restores focus');
ok(/useFocusTrap/.test(rf(new URL('../src/components/CommandPalette.jsx', import.meta.url), 'utf8')), 'the command palette traps focus');
ok(/useFocusTrap/.test(appSrc), 'the shortcuts sheet traps focus');

// (3) filter chips announce their state, not just paint it
const viewFiles = (await import('node:fs')).readdirSync(new URL('../src/views', import.meta.url))
  .filter((f) => f.endsWith('.jsx'));
let activeChips = 0;
let unannounced = [];
for (const f of viewFiles) {
  const src = rf(new URL(`../src/views/${f}`, import.meta.url), 'utf8');
  for (const line of src.split('\n')) {
    if (/chip clickable \$\{[^}]*'active'/.test(line)) {
      activeChips += 1;
      if (!/aria-pressed/.test(line)) unannounced.push(`${f}: ${line.trim().slice(0, 60)}`);
    }
  }
}
console.log(`filter chips with a selected state: ${activeChips}, unannounced: ${unannounced.length}`);
ok(unannounced.length === 0, `filter chips missing aria-pressed: ${unannounced.join(' | ') || 'none'}`);

// (4) the search index is built on demand, not at boot
ok(/if \(!paletteOpen \|\| index \|\| !content\) return/.test(appSrc),
  'the search index waits for the palette instead of building at boot');
ok(/setTimeout\(\(\) => \{[\s\S]{0,200}buildIndex/.test(appSrc), 'the index build yields a frame so the palette paints first');

// (5) the server refuses to expose an unauthenticated database to the network
const serverSrc = rf(new URL('../server/index.js', import.meta.url), 'utf8');
ok(/ALLOW_PUBLIC_BIND/.test(serverSrc), 'binding to a non-loopback address requires an explicit opt-in');
ok(/Refusing to bind/.test(serverSrc), 'the server refuses rather than warns');
const guardBlock = serverSrc.slice(serverSrc.indexOf('if (!isLoopback && !ALLOW_PUBLIC)'));
ok(/process\.exit\(1\)/.test(guardBlock.slice(0, 900)), 'refusal actually stops the process');
ok(/if \(!isLoopback && !ALLOW_PUBLIC\)/.test(serverSrc), 'the bind guard covers every non-loopback host');


// ── written & async: the app taught speech and nothing else ──
// 91 playbooks covered rooms, faces and timing, and not one covered the medium
// most people spend their day in. This is the regression test for that gap.
const { WRITTEN_ENTRIES, WRITTEN_GYM, WRITTEN_CATEGORY } = await import('../server/content/written.js');
const { WRITTEN_DEEP } = await import('../server/content/written-deep.js');
const { LIBRARY: LIB_BASE } = await import('../server/content/library.js');
const { LIBRARY_EXTRA: LIB_X } = await import('../server/content/library-extra.js');
const { LIBRARY_EXTRA_3: LIB_X3 } = await import('../server/content/library-extra-3.js');
const { LIBRARY_EXTRA_5: LIB_X5 } = await import('../server/content/library-extra-5.js');
const knownLib = new Set([...LIB_BASE, ...LIB_X, ...LIB_X3, ...LIB_X5, ...WRITTEN_ENTRIES].map((l) => l.id));
ok(WRITTEN_ENTRIES.length >= 6, `written entries: ${WRITTEN_ENTRIES.length}`);
ok(WRITTEN_ENTRIES.every((e) => e.id && e.title && e.short && e.body && e.use && e.tags.length >= 3), 'every written entry is complete');
ok(WRITTEN_ENTRIES.every((e) => e.category === WRITTEN_CATEGORY.name), 'written entries all use the Written & Async category');
ok(Object.keys(WRITTEN_DEEP).length === WRITTEN_ENTRIES.length, 'every written entry has a chapter');
ok(WRITTEN_ENTRIES.every((e) => {
  const c = WRITTEN_DEEP[e.id];
  return c && c.thesis && c.deep.length >= 3 && c.script.length >= 2 && c.failureModes.length >= 3 && c.drill && c.related;
}), 'written chapters carry thesis, depth, script, failure modes, drill and related');
// the renderer does chapter.drill.map(...) and reads {who, line} from script:
// a string drill and a {label, line} script both crash or render blank at runtime
// while every content test passes, which is exactly what happened first time
ok(Object.values(WRITTEN_DEEP).every((c) => Array.isArray(c.drill) && c.drill.every((d) => typeof d === 'string')), 'written chapters use an array of drill strings, as the renderer expects');
ok(Object.values(WRITTEN_DEEP).every((c) => c.script.every((l) => l.who && l.line)), 'written chapter scripts use {who, line}, as the renderer expects');
ok(Object.values(WRITTEN_DEEP).every((c) => c.related.every((id) => typeof id === 'string' && !id.includes(' '))), 'written chapters link to entry ids, not prose');
// and every chapter's related ids must resolve, in every wing
const deepMods = ['../server/content/library-deep.js', '../server/content/library-deep-2.js', '../server/content/library-deep-3.js', '../server/content/library-extra-deep.js', '../server/content/library-extra-3-deep.js', '../server/content/library-extra-5-deep.js'];
let allChapters = { ...WRITTEN_DEEP };
for (const m of deepMods) {
  const mod = await import(m);
  for (const k of Object.keys(mod)) if (mod[k] && typeof mod[k] === 'object') allChapters = { ...allChapters, ...mod[k] };
}
const badRelated = Object.entries(allChapters).flatMap(([id, c]) => (c.related || []).filter((r) => !knownLib.has(r)).map((r) => `${id}→${r}`));
ok(badRelated.length === 0, `chapter "read next" links point at missing entries: ${badRelated.slice(0, 5).join(', ') || 'none'}`);
ok(/Read next/.test(rf(new URL('../src/views/Library.jsx', import.meta.url), 'utf8')), 'the library renders chapter cross-links');
ok(WRITTEN_GYM.length >= 6, `written gym playbooks: ${WRITTEN_GYM.length}`);
ok(WRITTEN_GYM.every((g) => g.lines.length >= 5 && g.steps.length >= 3 && g.avoid.length >= 3 && g.drill && g.reads.length), 'written playbooks meet the gym contract');
// the honest labelling rule: every story and every playbook says when NOT to use it
ok(WRITTEN_GYM.every((g) => g.avoid.length >= 3), 'every written playbook names what to avoid');
// both builds must serve the wing, or the static site silently loses it
for (const src of ['../src/local/api.js', '../server/index.js']) {
  const j = rf(new URL(src, import.meta.url), 'utf8');
  ok(/WRITTEN_ENTRIES/.test(j) && /WRITTEN_GYM/.test(j), `${src} includes the written wing`);
}
// every cross-link from the new wing must resolve to something real
const badLinks = [...WRITTEN_ENTRIES.flatMap((e) => e.reads || []), ...WRITTEN_GYM.flatMap((g) => g.reads || [])]
  .filter((id) => !knownLib.has(id));
ok(badLinks.length === 0, `written wing cross-links point at missing entries: ${[...new Set(badLinks)].join(', ') || 'none'}`);

// ── the glossary: terms the app uses constantly and never defined ──
// "frame" appears 112 times across the content, "anchor" 43 — and until this
// round not one of them was defined in a single place.
const { GLOSSARY, GLOSSARY_CATEGORIES } = await import('../server/content/glossary.js');
ok(GLOSSARY.length >= 40, `glossary terms: ${GLOSSARY.length}`);
ok(new Set(GLOSSARY.map((t) => t.id)).size === GLOSSARY.length, 'glossary ids are unique');
ok(new Set(GLOSSARY.map((t) => t.term)).size === GLOSSARY.length, 'glossary terms are unique — no duplicate definitions');
ok(GLOSSARY.every((t) => ['behavioural', 'field', 'folk'].includes(t.source)), 'every term declares where it comes from');
ok(GLOSSARY.every((t) => GLOSSARY_CATEGORIES.some((c) => c.id === t.category)), 'every term has a real category');
ok(GLOSSARY.every((t) => t.plain.length > 60 && t.say.length > 20 && t.honest.length > 60 && t.trap.length > 60),
  'every term carries a definition, a spoken example, its provenance and its misuse');
// the honesty rule: evidence claims must not exceed what is known
const behavioural = GLOSSARY.filter((t) => t.source === 'behavioural');
ok(behavioural.length >= 15, `only ${behavioural.length} terms are evidence-backed`);
// the point is not vocabulary, it is that the claim names where the support
// comes from — a study, a field, a framework, or an explicit "studied in X"
ok(behavioural.every((t) => /study|studies|replicat|research|evidence|model|literature|well documented|well supported|genuinely studied|robust|linguistics|science|tradition|framework|practice/i.test(t.honest)),
  `evidence-backed terms say what the evidence is: ${behavioural.filter((t) => !/study|studies|replicat|research|evidence|model|literature|well documented|well supported|genuinely studied|robust|linguistics|science|tradition|framework|practice/i.test(t.honest)).map((t) => t.id).join(', ')}`);
const folk = GLOSSARY.filter((t) => t.source === 'folk');
ok(folk.every((t) => /folk|not a finding|not supported|folklore|fiction/i.test(t.honest + t.trap)),
  'folk terms admit they are folk');
// the vocabulary the app actually uses must be in here
for (const term of ['frame', 'reframe', 'anchor', 'mirroring', 'callback', 'label', 'BATNA', 'scarcity', 'objection', 'rapport', 'status']) {
  ok(GLOSSARY.some((t) => t.term.toLowerCase().includes(term.toLowerCase())), `the glossary is missing "${term}", which the rest of the app uses`);
}
// and the glossary must be served by both builds
for (const src of ['../src/local/api.js', '../server/index.js']) {
  ok(/glossary:\s*GLOSSARY/.test(rf(new URL(src, import.meta.url), 'utf8')), `${src} serves the glossary`);
}

// ── awarding XP must refresh the stats the shell renders ──
// The sidebar counter reads `stats`, fetched once at boot. A view that awards XP
// without calling refresh() confirms the rep and leaves the counter on its old
// number until a reload. Found in a real browser: 0 XP on screen, 15 XP stored,
// until refresh. Views that never award XP are not in this list.
{
  const fs = await import('node:fs');
  const dir = new URL('../src/views/', import.meta.url);
  const offenders = [];
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.jsx'))) {
    const src = fs.readFileSync(new URL(file, dir), 'utf8');
    if (!/api\.logXp\(/.test(src)) continue;
    if (!/refresh\?\.\(\)/.test(src)) offenders.push(file);
  }
  ok(offenders.length === 0, `these views award XP but never refresh the shell stats: ${offenders.join(', ')}`);
}

// ── academy pacing: sixteen modules must have an order to read them in ──
// They were built to an identical spec, which made them consistent and
// unsequenceable: a beginner could open the family module in week one.
const { ACADEMY_PACING, ACADEMY_LEVELS, academyPath: academyPathFn, ACADEMY_START } = await import('../server/content/academy-pacing.js');
const { ACADEMY: AC } = await import('../server/content/academy.js');
const { ACADEMY_EXTRA: AC2 } = await import('../server/content/academy-extra.js');
const { ACADEMY_EXTRA_3: AC3 } = await import('../server/content/academy-extra-3.js');
const { ACADEMY_EXTRA_4: AC4 } = await import('../server/content/academy-extra-4.js');
const { ACADEMY_EXTRA_5: AC5 } = await import('../server/content/academy-extra-5.js');
const allAcademy = [...AC, ...AC2, ...AC3, ...AC4, ...AC5];

// pitching must be taught as its own module, not just implied
const pitchModule = allAcademy.find((m) => m.id === 'pitching');
ok(!!pitchModule, 'there is a dedicated pitching module');
if (pitchModule) {
  ok(pitchModule.principles.length >= 5 && pitchModule.mechanics.length >= 3 && pitchModule.scripts.length >= 4,
    'the pitching module is a real module, not a stub');
  ok(pitchModule.scripts.some((s) => /budget|expensive/i.test(s.them)), 'the pitching module handles the price objection');
  ok(pitchModule.cautions.some((c) => /never invent|fabricat/i.test(c)), 'the pitching module forbids fabricated proof');
}
ok(Object.keys(ACADEMY_PACING).length === allAcademy.length,
  `every academy module is paced (${Object.keys(ACADEMY_PACING).length} of ${allAcademy.length})`);
const acIds = new Set(allAcademy.map((m) => m.id));
ok(allAcademy.every((m) => ACADEMY_PACING[m.id]), `unpaced modules: ${allAcademy.filter((m) => !ACADEMY_PACING[m.id]).map((m) => m.id).join(', ') || 'none'}`);
ok(Object.values(ACADEMY_PACING).every((p) => p.after == null || acIds.has(p.after)), 'academy pacing depends on a module that does not exist');
ok(Object.values(ACADEMY_PACING).every((p) => ACADEMY_LEVELS.some((l) => l.id === p.level)), 'academy pacing uses an undeclared level');
ok(Object.values(ACADEMY_PACING).every((p) => p.minutes >= 5 && p.minutes <= 30), 'every paced module states a believable session length');
ok(Object.values(ACADEMY_PACING).every((p) => typeof p.why === 'string' && p.why.length > 40), 'every paced module says why it sits where it does');
ok(academyPathFn(allAcademy).reduce((n, g) => n + g.modules.length, 0) === allAcademy.length, 'the path places every module');
ok(academyPathFn(allAcademy).length === 3, 'the path has three levels');
// the beginner entry point must exist and must not require anything first
ok(acIds.has(ACADEMY_START), 'the recommended starting module exists');
ok(ACADEMY_PACING[ACADEMY_START]?.after == null, 'the recommended starting module requires nothing first');
ok(ACADEMY_PACING[ACADEMY_START]?.level === 1, 'the recommended starting module is a foundation');
// the hardest material must not be level 1
for (const id of ['family-systems', 'difficult-conversations', 'talking-to-women']) {
  if (ACADEMY_PACING[id]) ok(ACADEMY_PACING[id].level === 3, `${id} is level 3, not a first-week read`);
}
const academyViewSrc = readFileSync(new URL('../src/views/Academy.jsx', import.meta.url), 'utf8');
ok(/academyPath/.test(academyViewSrc), 'the academy view renders the paced path');
// regression: the first cut attached pacing only to the grouped chip list, so
// the detail panel read `mod.pacing` off the raw module and the whole pacing
// card silently never rendered — the audit and these tests both passed.
const academyViewBody = academyViewSrc.slice(academyViewSrc.indexOf('export default'));
ok(/ACADEMY_PACING\[m\.id\]/.test(academyViewBody), 'the academy view attaches pacing to the module the detail panel renders');
for (const src of ['../server/index.js', '../src/local/api.js']) {
  const j = rf(new URL(src, import.meta.url), 'utf8');
  ok(/academyLevels:\s*ACADEMY_LEVELS/.test(j) && /academyPacing:\s*ACADEMY_PACING/.test(j), `${src} serves the pacing layer`);
  ok(/academyStart:\s*ACADEMY_START/.test(j), `${src} serves the recommended start`);
}

// stale copy is a lie in the same way a wrong number is: this line shipped for a
// full round after the service worker existed
const settingsSrc = rf(new URL('../src/views/Settings.jsx', import.meta.url), 'utf8');
ok(!/no service worker yet/i.test(settingsSrc), 'the settings page no longer claims there is no service worker');
ok(/There is a service worker/i.test(settingsSrc), 'the settings page describes the offline install it actually has');

// the service worker stamp used to include Date.now(), so identical inputs
// produced a different sw.js every build — which makes any rebuild-and-diff CI
// gate permanently red, and makes the browser re-download a shell that did not
// change. It must be a function of the build output only.
const swScript = rf(new URL('../scripts/build-sw.mjs', import.meta.url), 'utf8');
const swCode = swScript.replace(/^\s*\/\/.*$/gm, ''); // comments may name the thing that was removed
ok(!/Date\.now\(\)/.test(swCode), 'the service worker build id is deterministic (no Date.now in the stamp)');
ok(/readdirSync\(assets\)/.test(swScript), 'the service worker build id is derived from the built asset filenames');

// ── dependency hygiene: no known advisories, and the dev server is not exposed ──
const pkgJson = JSON.parse(rf(new URL('../package.json', import.meta.url), 'utf8'));
const viteRange = (pkgJson.devDependencies || {}).vite || '';
const viteMajor = Number((viteRange.match(/(\d+)/) || [])[1] || 0);
ok(viteMajor >= 8, `vite is on a version with no open advisories (found ${viteRange || 'none'})`);
const viteCfg = rf(new URL('../vite.config.js', import.meta.url), 'utf8');
ok(/host: '127\.0\.0\.1'/.test(viteCfg), 'the dev server binds to loopback only');
ok(/allowedHosts: \['localhost', '127\.0\.0\.1'\]/.test(viteCfg), 'the dev server rejects foreign Host headers (DNS rebinding)');
// esbuild used to arrive transitively with vite 6; the vite 8 upgrade silently
// removed it and `npm run bundle:test` became "esbuild: not found"
ok(!!(pkgJson.devDependencies || {}).esbuild, 'esbuild is a declared dev dependency, not a transitive accident');
const bundleScript = (pkgJson.scripts || {})['bundle:test'] || '';
ok(/esbuild/.test(bundleScript), 'bundle:test still drives esbuild');
ok(/ci|audit/.test(JSON.stringify(pkgJson.scripts)), 'there is a script a CI job could call to run the audit gates');

console.log(fails ? `\n✗ ${fails} failing` : '\n✓ reps, notes, verdicts and the api surface all behave');
process.exit(fails ? 1 : 0);
