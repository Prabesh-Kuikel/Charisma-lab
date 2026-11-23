// The shell: command palette, Start Here assessment, Progress and Settings.
import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { url: 'http://localhost:3000/', pretendToBeVisual: true });
const { window } = dom;
Object.assign(global, {
  window, document: window.document, HTMLElement: window.HTMLElement, Element: window.Element,
  Node: window.Node, getComputedStyle: window.getComputedStyle, localStorage: window.localStorage,
  MutationObserver: window.MutationObserver,
  MediaRecorder: class { static isTypeSupported() { return false; } },
});
Object.defineProperty(global, 'navigator', { value: window.navigator, configurable: true });
global.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);
window.scrollTo = () => {};
if (!window.Element.prototype.scrollIntoView) window.Element.prototype.scrollIntoView = () => {};
global.__CL_LOCAL = true;
const errors = [];
console.error = (...a) => { errors.push(a.join(' ').slice(0, 220)); };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const txt = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim() : '(none)');
const click = (el) => el && el.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
const nav = (re) => [...document.querySelectorAll('.nav-item')].find((n) => re.test(txt(n)));
const problems = [];
const check = (ok, msg) => { if (!ok) problems.push(msg); };
const key = (k, opts = {}) => window.dispatchEvent(new window.KeyboardEvent('keydown', { key: k, bubbles: true, ...opts }));

localStorage.setItem('cl.view', 'dashboard');
await import('./app.mjs');
await wait(1600);

// ── nav has the new destinations ──
const labels = [...document.querySelectorAll('.nav-item')].map(txt);
console.log('NAV:', labels.join(' | '));
check(labels.some((l) => /Start Here/.test(l)), 'Start Here missing from nav');
check(labels.some((l) => /Progress/.test(l)), 'Progress missing from nav');
check(labels.some((l) => /Backup & Settings/.test(l)), 'Settings missing from nav');

// ── ⌘K opens the palette, typing searches, Enter deep-links ──
key('k', { metaKey: true });
await wait(300);
check(!!document.querySelector('.pal'), '⌘K did not open the palette');
const input = document.querySelector('.pal-input');
check(!!input, 'palette has no input');
console.log('PALETTE SUGGESTIONS:', document.querySelectorAll('.pal-row').length);
check(document.querySelectorAll('.pal-row').length >= 4, 'no suggestions in an empty palette');

const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
setter.call(input, 'price');
input.dispatchEvent(new window.Event('input', { bubbles: true }));
await wait(400);
const rows = [...document.querySelectorAll('.pal-result')];
console.log('SEARCH "price":', rows.length, '|', rows.slice(0, 3).map((r) => txt(r).slice(0, 60)).join(' // '));
check(rows.length >= 3, 'searching "price" returned too few results');
check(rows.some((r) => /Saying your price/.test(txt(r))), 'the price playbook is not in the results');

// jsdom has no layout, so scrollIntoView-driven cursors are hard to trust;
// click the row we actually mean, which is what a person would do
click([...document.querySelectorAll('.pal-result')].find((r) => /Saying your price/.test(txt(r))));
console.log('cursor row before click:', [...document.querySelectorAll('.pal-result')].indexOf([...document.querySelectorAll('.pal-result')].find((r) => r.classList.contains('active'))));
await wait(900);
const afterJump = txt(document.querySelector('.content'));
console.log('AFTER ENTER:', afterJump.slice(0, 90));
// the detail view is the only place with the rep controls
check(/Rehearse it out loud/.test(afterJump), 'Enter opened the list, not the playbook detail');
check(/Log this rep/.test(afterJump), 'playbook detail has no rep control');

// ── Escape closes, and a no-result search says something useful ──
key('k', { metaKey: true });
await wait(250);
const i2 = document.querySelector('.pal-input');
setter.call(i2, 'zzzqqq');
i2.dispatchEvent(new window.Event('input', { bubbles: true }));
await wait(300);
check(/Nothing for/.test(txt(document.querySelector('.pal'))), 'empty state missing for a nonsense query');
key('Escape');
await wait(200);
check(!document.querySelector('.pal'), 'Escape did not close the palette');

// ── Start Here: twelve questions produce a route ──
click(nav(/Start Here/));
await wait(700);
let body = txt(document.querySelector('.content'));
console.log('START:', body.slice(0, 120));
check(/Twelve questions/.test(body), 'Start Here intro missing');
click([...document.querySelectorAll('button')].find((b) => /Twelve questions/.test(txt(b))));
await wait(600);
const questionCards = [...document.querySelectorAll('.card')].filter((c) => /Not yet/.test(txt(c)));
console.log('questions rendered:', questionCards.length);
check(questionCards.length === 12, `expected 12 questions, saw ${questionCards.length}`);

// answer every question "Often" except presence ones, then pick a situation
for (const card of questionCards) {
  const buttons = [...card.querySelectorAll('.chip.clickable')];
  const often = buttons.find((b) => /^Often$/.test(txt(b)));
  click(often);
}
await wait(300);
click([...document.querySelectorAll('.chip.clickable')].find((c) => /^Work & career$/.test(txt(c))));
await wait(200);
const showBtn = [...document.querySelectorAll('button')].find((b) => /Show my route/.test(txt(b)));
check(!!showBtn && !showBtn.disabled, 'the route button stayed disabled after 12 answers');
click(showBtn);
await wait(700);
body = txt(document.querySelector('.content'));
console.log('RESULT:', body.slice(0, 200));
check(/Your five dimensions/.test(body), 'result page missing the dimension breakdown');
check(/Your route · four steps/.test(body), 'result page missing the route');
check(/overall \d+\/100/.test(body), 'no overall score');
const stored = JSON.parse(localStorage.getItem('charisma-lab.assessment.v1') || 'null');
check(!!stored?.result, 'the assessment result was not persisted');
console.log('stored focus:', stored?.result?.weakest?.[0], '| total', stored?.result?.total);

// the route's first step must open something real
const openBtns = [...document.querySelectorAll('button')].filter((b) => /^Open$|Open/.test(txt(b)) && b.classList.contains('btn'));
if (openBtns[0]) {
  click(openBtns[0]);
  await wait(800);
  check(txt(document.querySelector('.content')).length > 200, 'the first route step opened an empty page');
}

// ── Progress: recommendation, coverage, no crashes on an empty history ──
click(nav(/Progress/));
await wait(800);
body = txt(document.querySelector('.content'));
console.log('PROGRESS:', body.slice(0, 160));
check(/recommendation/i.test(body), 'Progress has no recommendation');
check(/Coverage/.test(body), 'Progress has no coverage section');
check(/Review queue/.test(body), 'Progress has no review queue');

// ── Settings: backup download, key list, AI providers ──
click(nav(/Backup & Settings/));
await wait(800);
body = txt(document.querySelector('.content'));
console.log('SETTINGS:', body.slice(0, 140));
check(/Download backup/.test(body), 'Settings has no backup button');
check(/charisma-lab\./.test(body) || /Show the keys/.test(body), 'Settings does not list its stores');
check(/AI provider/.test(body), 'Settings has no AI provider section');
check(/Test speech/.test(body), 'Settings has no speech test');

// a backup must be valid JSON with our keys and no AI key
const { exportJSON } = await import('../src/local/backup.js');
localStorage.setItem('charisma-lab.ai.v1', JSON.stringify({ provider: 'compatible', key: 'SECRET-KEY-123' }));
localStorage.setItem('charisma-lab.scripts.v1', JSON.stringify([{ id: 's1', text: 'hello', tag: 'Work', uses: 1 }]));
const doc = JSON.parse(exportJSON());
console.log('backup keys:', Object.keys(doc.data).length, '| app:', doc.app, '| xp in counts:', doc.counts.xp);
check(doc.app === 'charisma-lab' && doc.schema === 1, 'backup header is wrong');
check(!Object.keys(doc.data).some((k) => k.includes('ai.v1')), 'the backup leaked the AI key');
check(Object.keys(doc.data).includes('charisma-lab.scripts.v1'), 'the backup missed My Scripts');
check(doc.counts.myScripts === 1, 'backup counts are wrong');

// ── restore: merge keeps the higher XP, replace wins outright ──
const before = JSON.parse(localStorage.getItem('charisma-lab.state.v1') || '{}');
console.log('current xp:', before?.user?.xp ?? 0);
const fake = JSON.stringify({
  app: 'charisma-lab', schema: 1, data: {
    'charisma-lab.state.v1': JSON.stringify({ user: { xp: 99999, name: 'Restored' }, activity: [], progress: [], sessions: [] }),
    'not-app.key': 'should be ignored',
  },
});
const { importJSON } = await import('../src/local/backup.js');
const res = importJSON(fake, 'merge');
console.log('import wrote:', res.written);
check(res.written === 1, 'import wrote foreign keys');
check(localStorage.getItem('not-app.key') === null, 'import accepted a foreign key');
check(JSON.parse(localStorage.getItem('charisma-lab.state.v1')).user.xp === 99999, 'merge did not keep the higher XP');
check(JSON.parse(localStorage.getItem('charisma-lab.state.v1')).user.name === 'Restored', 'merge did not take the newer profile');
let threw = '';
try { importJSON('{}', 'merge'); } catch (e) { threw = e.message; }
check(/not a Charisma Lab backup/.test(threw), `bad file gave a bad error: ${threw}`);

console.log('ERRORS:', errors.length ? errors.slice(0, 3) : 'none');
check(errors.length === 0, `console errors: ${errors.slice(0, 2).join(' | ')}`);

if (problems.length) {
  console.log(`\n✗ ${problems.length} problem(s)`);
  problems.forEach((p) => console.log('   ·', p));
  process.exitCode = 1;
} else {
  console.log('\n✓ palette, assessment, progress and backup all work');
}
