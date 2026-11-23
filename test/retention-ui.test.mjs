// Retention UI: spaced-repetition queue in the Gym + My Scripts view.
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
global.__CL_LOCAL = true; // browser-only mode, exactly like the live site
const errors = [];
console.error = (...a) => { errors.push(a.join(' ').slice(0, 200)); };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const txt = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim() : '(none)');
const click = (el) => el && el.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
const nav = (re) => [...document.querySelectorAll('.nav-item')].find((n) => re.test(txt(n)));
const problems = [];
const check = (ok, msg) => { if (!ok) problems.push(msg); };
const iso = (n = 0) => { const d = new Date(); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };

// seed a queue: two playbooks overdue, one future
localStorage.setItem('charisma-lab.srs.v1', JSON.stringify({
  'gym-party': { step: 1, reps: 2, lapses: 0, last: iso(-7), due: iso(-7) },
  'gym-first-date': { step: 0, reps: 1, lapses: 1, last: iso(-4), due: iso(-4) },
  'gym-cafe': { step: 1, reps: 2, lapses: 0, last: iso(), due: iso(9) },
}));
localStorage.setItem('cl.view', 'dashboard');

await import('./app.mjs');
await wait(1500);

// ── My Scripts appears in the nav ──
check(!!nav(/My Scripts/), 'My Scripts missing from the nav');

// ── the due banner and Due-today filter ──
click(nav(/Conversation Gym/));
await wait(900);
let body = txt(document.querySelector('.content'));
console.log('GYM TOP:', body.slice(0, 150));
check(/2 due for review/.test(body), 'due-for-review banner missing or wrong count');
check(/in rotation/.test(body), 'rotation counter missing');

const dueChip = [...document.querySelectorAll('.chip.clickable')].find((c) => /^Due today/.test(txt(c)));
check(!!dueChip, 'Due today filter chip missing');
click(dueChip);
await wait(500);
const dueCards = document.querySelectorAll('.card .btn.primary').length;
console.log('due cards:', dueCards);
check(dueCards === 2, `due filter should show 2 cards, saw ${dueCards}`);
body = txt(document.querySelector('.content'));
check(/oldest first/.test(body), 'due queue copy missing');

// ── a rep reschedules the item ──
click([...document.querySelectorAll('.btn.primary')].find((b) => /^Open/.test(txt(b))));
await wait(500);
body = txt(document.querySelector('.content'));
check(/due now|review in/.test(body), 'scheduled chip missing on the playbook');
check(!!document.querySelector('.ra-line') || document.querySelectorAll('.script-line').length > 0, 'no readable script lines');
click([...document.querySelectorAll('button')].find((b) => /Log this rep/.test(txt(b))));
await wait(900);
const srsNow = JSON.parse(localStorage.getItem('charisma-lab.srs.v1'));
const resched = Object.values(srsNow).filter((r) => r.due > iso(0)).length;
console.log('rescheduled entries:', resched, '/', Object.keys(srsNow).length);
check(resched >= 2, 'logging a rep did not push the item forward');
check(/stumbled/.test(txt(document.querySelector('.content'))), 'the stumble path is missing');

// ── rehearsal panel exists and offers listen + record ──
check(/Rehearse it out loud/.test(txt(document.querySelector('.content'))), 'rehearse panel missing');
check(/Hear it/.test(txt(document.querySelector('.content'))), 'read-aloud button missing');

// ── My Scripts: write, save, rehearse, delete ──
click(nav(/My Scripts/));
await wait(700);
body = txt(document.querySelector('.content'));
console.log('SCRIPTS:', body.slice(0, 120));
check(/My scripts/.test(body), 'My Scripts view did not render');
check(/Nothing saved yet/.test(body), 'empty state missing');

const ta = document.querySelector('textarea');
const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
setter.call(ta, 'I have to head off in a minute, but I am glad we got into this properly.');
ta.dispatchEvent(new window.Event('input', { bubbles: true }));
await wait(200);
click([...document.querySelectorAll('button')].find((b) => /^Save/.test(txt(b))));
await wait(600);
const saved = JSON.parse(localStorage.getItem('charisma-lab.scripts.v1') || '[]');
console.log('saved scripts:', saved.length, '|', saved[0]?.text?.slice(0, 40));
check(saved.length === 1, 'script was not saved to storage');
body = txt(document.querySelector('.content'));
check(/Rehearse/.test(body), 'saved script has no rehearse action');
check(/I said it out loud/.test(body), 'rep-count button missing');

// back to the list, then delete
click([...document.querySelectorAll('button')].find((b) => /My scripts/.test(txt(b))));
await wait(500);
check(JSON.parse(localStorage.getItem('charisma-lab.scripts.v1') || '[]').length === 1, 'script list lost the line');
click([...document.querySelectorAll('.card .btn.primary')].find((b) => /Rehearse/.test(txt(b))));
await wait(400);
click([...document.querySelectorAll('button')].find((b) => /Delete/.test(txt(b))));
await wait(400);
check(JSON.parse(localStorage.getItem('charisma-lab.scripts.v1') || '[]').length === 0, 'delete did not persist');

// ── read-aloud is global: library and academy lines are tappable ──
click(nav(/Resource Library/));
await wait(900);
click(document.querySelector('.lib-head'));
await wait(900);
const raLines = document.querySelectorAll('.ra-line').length;
console.log('read-aloud lines in a chapter:', raLines);
check(raLines > 0, 'no read-aloud lines marked anywhere');

console.log('ERRORS:', errors.length ? errors.slice(0, 3) : 'none');
check(errors.length === 0, `console errors: ${errors.slice(0, 2).join(' | ')}`);

if (problems.length) {
  console.log(`\n✗ ${problems.length} problem(s)`);
  problems.forEach((p) => console.log('   ·', p));
  process.exitCode = 1;
} else {
  console.log('\n✓ spaced repetition, rehearse panel and My Scripts all work');
}
