// Spaced repetition + personal scripts + read-aloud
import assert from 'node:assert/strict';

// ── minimal localStorage for node ──
const mem = new Map();
globalThis.localStorage = {
  getItem: (k) => (mem.has(k) ? mem.get(k) : null),
  setItem: (k, v) => mem.set(k, String(v)),
  removeItem: (k) => mem.delete(k),
  clear: () => mem.clear(),
};
globalThis.window = globalThis;
globalThis.document = { addEventListener() {}, removeEventListener() {}, body: { querySelectorAll: () => [] }, querySelectorAll: () => [] };
globalThis.MutationObserver = class { observe() {} disconnect() {} };

const srs = await import('../src/local/srs.js');
const scripts = await import('../src/local/my-scripts.js');
const ra = await import('../src/local/read-aloud.js');

const iso = (d) => d.toISOString().slice(0, 10);
const today = iso(new Date());
const plus = (n) => { const d = new Date(); d.setUTCDate(d.getUTCDate() + n); return iso(d); };

let pass = 0;
const ok = (name, cond) => { assert.equal(!!cond, true, name); pass++; };

// ── 1. first rep schedules 3 days out ──
const r1 = srs.recordRep('gym-party', 'clean');
ok('first rep due in 3 days', r1.due === plus(3));
ok('step 0 after first clean rep', r1.step === 0);
ok('rep counted', r1.reps === 1);

// ── 2. progression 3 → 7 → 21 → 60 ──
srs.recordRep('gym-party', 'clean');
ok('second rep → 7 days', srs.allSrs(['gym-party'])[0].due === plus(7));
srs.recordRep('gym-party', 'clean');
ok('third rep → 21 days', srs.allSrs(['gym-party'])[0].due === plus(21));
srs.recordRep('gym-party', 'clean');
ok('fourth rep → 60 days', srs.allSrs(['gym-party'])[0].due === plus(60));
const r5 = srs.recordRep('gym-party', 'clean');
ok('interval caps at 60', r5.due === plus(60) && r5.step === srs.INTERVALS.length - 1);

// ── 3. a stumble resets to 3 days and records a lapse ──
const r6 = srs.recordRep('gym-party', 'stumble');
ok('stumble → back in 3 days', r6.due === plus(3));
ok('lapse recorded', r6.lapses === 1);
ok('reps still counted', r6.reps === 6);

// ── 4. due queue only shows today-or-overdue, most overdue first ──
mem.set('charisma-lab.srs.v1', JSON.stringify({
  a: { step: 1, reps: 2, lapses: 0, last: plus(-9), due: plus(-9) },
  b: { step: 1, reps: 1, lapses: 0, last: plus(-2), due: plus(-2) },
  c: { step: 1, reps: 1, lapses: 0, last: today, due: plus(5) },
}));
const due = srs.dueItems(['a', 'b', 'c', 'never-tracked']);
ok('due hides future + untracked', due.length === 2);
ok('most overdue first', due[0].id === 'a' && due[1].id === 'b');
ok('overdue days computed', due[0].overdue === 9);
ok('allSrs includes future with dueIn', srs.allSrs(['a', 'b', 'c']).find((x) => x.id === 'c').dueIn === 5);
ok('weakSpots picks lapsed+due only', srs.weakSpots(['a', 'b', 'c']).length === 0);
// a stumble reschedules *ahead*, so it is not due immediately...
ok('stumble is not due today', srs.dueItems(['b', 'z']).map(x => x.id).join() === 'b');
// ...but a lapsed item that comes back around is the highest-value review
mem.set('charisma-lab.srs.v1', JSON.stringify({
  a: { step: 0, reps: 3, lapses: 0, last: today, due: plus(-1) },
  b: { step: 0, reps: 3, lapses: 2, last: today, due: plus(-1) },
}));
ok('weakSpots surfaces a lapsed item', srs.weakSpots(['a', 'b']).map((x) => x.id).join() === 'b');
ok('streakFromSrs counts tracked + lapses', (() => { const s = srs.streakFromSrs(['a', 'b', 'zz']); return s.tracked === 2 && s.lapses === 2; })());

// ── 5. personal scripts ──
mem.delete('charisma-lab.scripts.v1');
assert.throws(() => scripts.addScript({ text: '   ' }), /Write the line first/);
const s1 = scripts.addScript({ text: '  I should head off — good to properly get into this.  ', tag: 'Work' });
ok('script trimmed', s1.text === 'I should head off — good to properly get into this.');
ok('script saved', scripts.allScripts().length === 1);
const s2 = scripts.addScript({ text: 'So what made you start that?', tag: 'Small talk' });
ok('newest first', scripts.allScripts()[0].id === s2.id);
ok('tag filter', scripts.scriptsByTag('Work').length === 1);
scripts.markUsed(s1.id);
ok('use counted', scripts.allScripts().find((s) => s.id === s1.id).uses === 1);
ok('nextToRehearse picks the least-used', scripts.nextToRehearse('Small talk')?.id === s2.id);
scripts.updateScript(s2.id, { text: 'What got you into that?' });
ok('update persisted', scripts.allScripts().find((s) => s.id === s2.id).text === 'What got you into that?');
scripts.removeScript(s1.id);
ok('delete works', scripts.allScripts().length === 1);
mem.set('charisma-lab.scripts.v1', 'not json');
ok('corrupt store falls back to empty', scripts.allScripts().length === 0);

// ── 6. read-aloud attaches without throwing and is idempotent ──
const fakeEls = [];
const fakeEl = () => {
  const el = {
    dataset: {}, classList: { add() {} }, attrs: {},
    setAttribute(k, v) { this.attrs[k] = v; }, remove() {},
    querySelectorAll: () => [], cloneNode: () => ({ querySelectorAll: () => [], remove() {}, get textContent() { return 'Hello there'; } }),
  };
  fakeEls.push(el);
  return el;
};
globalThis.document.body.querySelectorAll = () => [fakeEl(), fakeEl()];
globalThis.document.querySelectorAll = globalThis.document.body.querySelectorAll;
const detach = ra.attachReadAloud(globalThis.document.body);
ok('attach returns a cleanup fn', typeof detach === 'function');
detach();

console.log(`\n✓ retention: ${pass} checks pass (SRS 3/7/21/60, due queue, scripts CRUD, read-aloud)`);
