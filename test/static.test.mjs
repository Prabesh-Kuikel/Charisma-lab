import { JSDOM } from 'jsdom';
// LOCAL MODE: no backend at all — every fetch is a hard failure.
const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { url: 'http://localhost/', pretendToBeVisual: true });
const { window } = dom;
Object.defineProperty(global, 'navigator', { value: window.navigator, configurable: true });
Object.assign(global, { window, document: window.document, HTMLElement: window.HTMLElement, Element: window.Element, Node: window.Node, getComputedStyle: window.getComputedStyle, localStorage: window.localStorage, MediaRecorder: class { static isTypeSupported(){return false;} } });
global.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);
window.scrollTo = () => {};
if (!window.Element.prototype.scrollIntoView) window.Element.prototype.scrollIntoView = () => {};
global.__CL_LOCAL = true;
let fetchCalls = 0;
global.fetch = () => { fetchCalls += 1; return Promise.reject(new Error('no network in static mode')); };
const errors = []; const oe = console.error; console.error = (...a) => { errors.push(a.join(' ').slice(0, 200)); oe(...a); };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const txt = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim() : '(none)');
const click = (el) => el && el.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
const nav = (label) => [...document.querySelectorAll('.nav-item')].find((n) => txt(n).includes(label));
localStorage.setItem('cl.view', 'dashboard');
await import('./app.mjs');
await wait(1800);

console.log('DASHBOARD:', txt(document.querySelector('.content')).slice(0, 110));
for (const label of ['Daily', 'Courses', 'Skill', 'Games', 'Coach', 'Creator', 'Resource']) {
  click(nav(label)); await wait(650);
  const body = txt(document.querySelector('.content'));
  console.log(`${label.padEnd(10)} ${body.length > 60 ? 'OK' : 'EMPTY'}  ${body.slice(0, 70)}`);
}
// complete a course day with no streak, in static mode
click(nav('Courses')); await wait(900);
const deepTab = [...document.querySelectorAll('.tab')].find((t) => txt(t).includes('90-Day'));
if (deepTab) { click(deepTab); await wait(1700); }
const cells = document.querySelectorAll('.day-cell');
console.log('90-DAY CELLS:', cells.length, '(no streak, no prior progress)');
if (cells[62]) { click(cells[62]); await wait(600); console.log('DAY 63 OPENED:', txt(document.querySelector('.lesson')).slice(0, 90)); }
// library chapter in static mode
click(nav('Resource')); await wait(700);
const head = document.querySelector('.lib-head');
if (head) { click(head); await wait(500); console.log('CHAPTER:', txt(document.querySelector('.lib-body')).slice(0, 90)); }
console.log('fetch attempts:', fetchCalls);
console.log('ERRORS:', errors.length ? errors.slice(0, 4) : 'none');
process.exit(0);
