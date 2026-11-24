// New sections: 16 academy modules, 31 gym playbooks, and the second + third library wings.
import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { url: 'http://localhost:3000/', pretendToBeVisual: true });
const { window } = dom;
Object.assign(global, { window, document: window.document, HTMLElement: window.HTMLElement, Element: window.Element, Node: window.Node, getComputedStyle: window.getComputedStyle, localStorage: window.localStorage, MediaRecorder: class { static isTypeSupported() { return false; } } });
Object.defineProperty(global, 'navigator', { value: window.navigator, configurable: true });
global.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);
window.scrollTo = () => {};
if (!window.Element.prototype.scrollIntoView) window.Element.prototype.scrollIntoView = () => {};
if (!window.Element.prototype.scrollTo) window.Element.prototype.scrollTo = () => {};
global.__CL_LOCAL = true; // browser-only mode: no API needed, same as the live site
const errors = []; console.error = (...a) => { errors.push(a.join(' ').slice(0, 200)); };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const txt = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim() : '(none)');
const click = (el) => el && el.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
const nav = (re) => [...document.querySelectorAll('.nav-item')].find((n) => re.test(txt(n)));
const problems = [];
const check = (ok, msg) => { if (!ok) problems.push(msg); };

localStorage.setItem('cl.view', 'dashboard');
await import('./app.mjs');
await wait(1600);

// ── Conversation Gym ──
check(!!nav(/Conversation Gym/), 'Conversation Gym missing from the nav');
click(nav(/Conversation Gym/));
await wait(900);
let body = txt(document.querySelector('.content'));
console.log('GYM:', body.slice(0, 140));
const cards = document.querySelectorAll('.card .btn.primary').length;
console.log('playbook buttons:', cards);
check(cards >= 31, `expected 31 playbook cards, saw ${cards}`);
check(/Starting|Everyday|Dating|Family|Money|Care/.test(body), 'gym category chips missing');

const chips = [...document.querySelectorAll('.chip.clickable')].map(txt);
check(chips.some((c) => /^Dating/.test(c)), 'no Dating filter chip');
click([...document.querySelectorAll('.chip.clickable')].find((c) => /^Dating/.test(txt(c))));
await wait(400);
const datingCards = document.querySelectorAll('.card .btn.primary').length;
console.log('Dating playbooks:', datingCards);
check(datingCards === 2, `Dating filter should show 2, saw ${datingCards}`);

click([...document.querySelectorAll('.btn.primary')].find((b) => /^Open/.test(txt(b))));
await wait(500);
body = txt(document.querySelector('.content'));
console.log('PLAYBOOK:', body.slice(0, 160));
check(/Step by step|Your goal/.test(body), 'playbook detail missing steps/goal');
check(/Say this/.test(body), 'playbook detail missing the lines');
check(/Where it goes wrong/.test(body), 'playbook detail missing the failure modes');
check(/Your rep/.test(body), 'playbook detail missing the drill');
check(document.querySelectorAll('.script-line').length >= 3, 'fewer than 3 script lines rendered');

// log the rep → XP must move
const readXp = () => { try { return JSON.parse(localStorage.getItem('charisma-lab.state.v1') || '{}').user?.xp ?? 0; } catch { return 0; } };
const xpBefore = readXp();
click([...document.querySelectorAll('button')].find((b) => /Log this rep/.test(txt(b))));
await wait(1200);
const xpAfter = readXp();
console.log('gym XP:', xpBefore, '→', xpAfter);
check(xpAfter > xpBefore, `gym rep did not award XP (${xpBefore} → ${xpAfter})`);

// ── Academy second wing ──
click(nav(/^.*Academy/));
await wait(800);
// level filters ("3 · Hard and specific 5") sit in the same row as modules, so
// match modules by their duration label — same rule as test/academy.test.mjs
const modChips = [...document.querySelectorAll('.card .chip.clickable')].filter((c) => !/principles|mechanics|scripts|drills|cautions/i.test(txt(c)) && /\d+m$/.test(txt(c)));
console.log('ACADEMY MODULES:', modChips.length, modChips.map(txt).slice(-4).join(' · '));
check(modChips.length >= 18, `expected at least 18 modules, saw ${modChips.length}`);
for (const name of ['Small Talk Mastery', 'Talking to Women', 'Difficult Conversations', 'Emotional Depth', 'Professional Communication', 'Business & Sales Talk', 'Storytelling & Wit', 'Confidence From Zero', 'Family & The Rooms You Cannot Leave', 'Humour As A Discipline', 'Speaking to a Room']) {
  const chip = modChips.find((c) => txt(c) === name);
  check(!!chip, `module chip missing: ${name}`);
  if (!chip) continue;
  click(chip);
  await wait(180);
  for (const tab of ['Principles', 'Mechanics', 'Scripts', 'Drills', 'Cautions']) {
    const t = [...document.querySelectorAll('.chip.clickable')].find((c) => new RegExp('^' + tab + '$', 'i').test(txt(c)));
    check(!!t, `${name}: tab ${tab} missing`);
    if (!t) continue;
    click(t);
    await wait(100);
    check(txt(document.querySelector('.content')).length > 400, `${name} › ${tab} rendered nothing`);
  }
  console.log(`  ${name.padEnd(26)} all 5 tabs ok`);
}

// ── Library second wing ──
click(nav(/Resource Library/));
await wait(900);
body = txt(document.querySelector('.content'));
console.log('LIBRARY:', body.slice(0, 120));
check(/83|82|81/.test(body), 'library count should now include all three wings');
const search = document.querySelector('.input');
const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
setter.call(search, 'small talk');
search.dispatchEvent(new window.Event('input', { bubbles: true }));
await wait(600);
console.log('search "small talk" →', document.querySelectorAll('.lib-item').length, 'items');
check(document.querySelectorAll('.lib-item').length > 0, 'no library results for "small talk"');

console.log('ERRORS:', errors.length ? errors.slice(0, 3) : 'none');
check(errors.length === 0, `console errors: ${errors.slice(0, 2).join(' | ')}`);
console.log(problems.length ? `\n✗ ${problems.length} problem(s)` : '\n✓ gym, 16 academy modules and all three library wings render');
for (const p of problems) console.log('   ·', p);
process.exit(problems.length ? 1 : 0);
