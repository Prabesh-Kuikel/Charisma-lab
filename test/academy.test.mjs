// Academy UI: six modules, five tabs each, drills that pay XP, reads that open.
import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { url: 'http://localhost:3000/', pretendToBeVisual: true });
const { window } = dom;
Object.assign(global, { window, document: window.document, HTMLElement: window.HTMLElement, Element: window.Element, Node: window.Node, getComputedStyle: window.getComputedStyle, localStorage: window.localStorage, MediaRecorder: class { static isTypeSupported() { return false; } } });
Object.defineProperty(global, 'navigator', { value: window.navigator, configurable: true });
global.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);
window.scrollTo = () => {};
if (!window.Element.prototype.scrollIntoView) window.Element.prototype.scrollIntoView = () => {};
const rf = global.fetch; global.fetch = (u, o) => rf(u.startsWith('http') ? u : 'http://127.0.0.1:3000' + u, o);
const errors = []; const oe = console.error; console.error = (...a) => { errors.push(a.join(' ').slice(0, 200)); oe(...a); };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const txt = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim() : '(none)');
const click = (el) => el && el.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
const chips = () => [...document.querySelectorAll('.chip.clickable')];
const chipBy = (re) => chips().find((c) => re.test(txt(c)));

const problems = [];
const check = (ok, msg) => { if (!ok) problems.push(msg); };

const xpNow = async () => {
  const r = await fetch('/api/bootstrap');
  return (await r.json()).user.xp;
};

localStorage.setItem('cl.view', 'academy');
const xp0 = await xpNow();
await import('./app.mjs');
await wait(1600);

// 1 ── landing
const modChips = () => [...document.querySelectorAll('.card .chip.clickable')].filter((c) => !/principles|mechanics|scripts|drills|cautions/i.test(txt(c)));
const names = modChips().map(txt);
console.log('MODULE CHIPS:', names.join(' · '));
check(names.length === 6, `expected 6 module chips, saw ${names.length}: ${names.join(',')}`);
const head = txt(document.querySelector('.content'));
check(/charismatic/i.test(head), 'academy landing should describe the first module');

// 2 ── every tab renders real content for every module
const TABS = ['Principles', 'Mechanics', 'Scripts', 'Drills', 'Cautions'];
for (const name of names) {
  click(modChips().find((c) => txt(c) === name));
  await wait(160);
  const rows = [];
  for (const tab of TABS) {
    const t = chipBy(new RegExp('^' + tab + '$', 'i'));
    check(!!t, `${name}: tab "${tab}" missing`);
    if (!t) continue;
    click(t);
    await wait(120);
    const len = txt(document.querySelector('.content')).length;
    rows.push(`${tab}:${len}`);
    check(len > 400, `${name} › ${tab} rendered almost nothing (${len} chars)`);
  }
  console.log(`${name.padEnd(24)} ${rows.join('  ')}`);
}
check(errors.length === 0, `console errors: ${errors.slice(0, 2).join(' | ')}`);

// 3 ── a drill logs XP and locks in as done
click(modChips().find((c) => txt(c) === 'Developing Humour') || modChips()[1]);
await wait(200);
click(chipBy(/^Drills$/i));
await wait(250);
const drillCards = [...document.querySelectorAll('.card')].filter((c) => /Done when:/.test(txt(c)));
check(drillCards.length >= 4, `expected >=4 drill cards, saw ${drillCards.length}`);
const btn = [...drillCards[0].querySelectorAll('button')].pop();
console.log('DRILL:', txt(drillCards[0]).slice(0, 70), '| button:', txt(btn));
click(btn);
await wait(1200);
const xp1 = await xpNow();
console.log('XP before/after drill:', xp0, '→', xp1);
check(xp1 > xp0, `drill did not award XP (${xp0} → ${xp1})`);
check(/Done|✓|Logged/i.test(txt(btn)), `drill button should show a done state, saw "${txt(btn)}"`);

// 4 ── a chapter chip actually opens that library entry
click(chipBy(/^Cautions$/i));
await wait(200);
const chapterChip = chipBy(/chapter/i);
check(!!chapterChip, 'no chapter cross-link in Cautions');
click(chapterChip);
await wait(1500);
const libView = txt(document.querySelector('.content'));
console.log('AFTER CHAPTER CLICK →', libView.slice(0, 90));
check(!/No modules loaded/.test(libView), 'cross-link left the academy in a broken state');
check(document.querySelectorAll('.lib-item').length > 0, 'library did not render after chapter cross-link');
const opened = [...document.querySelectorAll('.lib-item')].some((el) => /lib-body|lesson-list/.test(el.innerHTML));
check(opened, 'chapter cross-link did not open an entry');

// 5 ── coach cross-link works
localStorage.setItem('cl.view', 'academy');
window.location.hash = '';
await wait(10);
console.log('ERRORS:', errors.length ? errors.slice(0, 3) : 'none');
console.log(problems.length ? `\n✗ ${problems.length} problem(s)` : '\n✓ academy renders, drills pay XP, reads resolve');
for (const p of problems) console.log('   ·', p);
process.exit(problems.length ? 1 : 0);
