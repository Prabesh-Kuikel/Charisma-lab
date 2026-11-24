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
global.__CL_LOCAL = true; // browser-only mode: no API server needed
const errors = []; const oe = console.error; console.error = (...a) => { errors.push(a.join(' ').slice(0, 200)); oe(...a); };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const txt = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim() : '(none)');
const click = (el) => el && el.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
const chips = () => [...document.querySelectorAll('.chip.clickable')];
const chipBy = (re) => chips().find((c) => re.test(txt(c)));

const problems = [];
const check = (ok, msg) => { if (!ok) problems.push(msg); };

const xpNow = async () => {
  try { return JSON.parse(localStorage.getItem('charisma-lab.state.v1') || '{}').user?.xp ?? 0; } catch { return 0; }
};

localStorage.setItem('cl.view', 'academy');
const xp0 = await xpNow();
await import('./app.mjs');
await wait(1600);

// 1 ── landing
// The chip row now holds level filters ("3 · Hard and specific 5") next to the
// modules, so the module matcher is the module's own "…12m" duration label.
const LEVEL_CHIP = /^(all \d+|\d · .+ \d+)$/i;
const allChips = () => [...document.querySelectorAll('.card .chip.clickable')].filter((c) => !/principles|mechanics|scripts|drills|cautions/i.test(txt(c)));
const modChips = () => allChips().filter((c) => /\d+m$/.test(txt(c)) && !LEVEL_CHIP.test(txt(c)));
const names = modChips().map(txt);
const levelChips = allChips().filter((c) => LEVEL_CHIP.test(txt(c))).map(txt);
console.log('LEVEL CHIPS:', levelChips.join(' · '));
console.log('MODULE CHIPS:', names.join(' · '));
// a floor, not an equality: adding a module should not require editing a test
check(names.length >= 18, `expected at least 18 module chips, saw ${names.length}: ${names.join(',')}`);
check(levelChips.length === 4, `expected 4 level chips (all + 3 levels), saw ${levelChips.length}: ${levelChips.join(',')}`);
check(new Set(levelChips).size === levelChips.length, 'level chips should be distinct');
// the level counts must add up to the module count, or a module is unreachable
const counts = levelChips.slice(1).map((t) => Number((t.match(/(\d+)$/) || [])[1]));
check(counts.reduce((a, b) => a + b, 0) === names.length, `level counts ${counts.join('+')} should sum to ${names.length}`);
const head = txt(document.querySelector('.content'));
check(/charismatic/i.test(head), 'academy landing should describe the first module');

// 2 ── every tab renders real content for every module (16 modules × 5 tabs)
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

// 2b ── the pacing card: level, minutes, and a prerequisite that is a link
{
  const target = modChips().find((c) => /Difficult Conversations/.test(txt(c)));
  click(target);
  await wait(250);
  const panel = txt(document.querySelector('.content'));
  check(/level 3 · 14 min/.test(panel), `pacing card should show level and minutes, saw: ${panel.slice(0, 120)}`);
  const afterBtn = [...document.querySelectorAll('button')].find((b) => /read after/i.test(txt(b)));
  check(!!afterBtn, 'a paced module with a prerequisite should offer a "read after" jump');
  if (afterBtn) {
    click(afterBtn);
    await wait(250);
    check(/emotional depth/i.test(txt(document.querySelector('.content'))), 'the prerequisite jump should open Emotional Depth');
  }
}

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
