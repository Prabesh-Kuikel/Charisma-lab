import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { url: 'http://localhost:3000/', pretendToBeVisual: true });
const { window } = dom;
Object.assign(global, { window, document: window.document, HTMLElement: window.HTMLElement, Element: window.Element, Node: window.Node, getComputedStyle: window.getComputedStyle, localStorage: window.localStorage, MediaRecorder: class { static isTypeSupported(){return false;} } });
global.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);
window.scrollTo = () => {};
if (!window.Element.prototype.scrollIntoView) window.Element.prototype.scrollIntoView = () => {};
Object.defineProperty(global, 'navigator', { value: window.navigator, configurable: true });
global.__CL_LOCAL = true; // browser-only mode: no API server needed
const errors = []; const oe = console.error; console.error = (...a) => { errors.push(a.join(' ').slice(0, 200)); oe(...a); };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const txt = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim() : '(none)');
const click = (el) => el && el.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
const nav = (l) => [...document.querySelectorAll('.nav-item')].find((n) => txt(n).includes(l));

localStorage.clear();
localStorage.setItem('cl.view', 'daily');
await import('./app.mjs');
await wait(1600);

const logBtn = [...document.querySelectorAll('button')].find((b) => txt(b).includes('Log this rep'));
click(logBtn); await wait(900);

const raw = JSON.parse(localStorage.getItem('charisma-lab.practice.v1') || '{}');
const today = new Date().toISOString().slice(0, 10);
console.log('DRILL PERSISTED:', JSON.stringify(raw.daily?.[today] || []));
console.log('BUTTON NOW SAYS:', txt([...document.querySelectorAll('button')].find((b) => txt(b).includes('Logged'))) || '(not found)');

// simulate a reload: the module graph is cached, but the UI state is rebuilt from storage
const { getDaily } = await import('../src/local/progress-log.js');
console.log('READS BACK AFTER RELOAD:', getDaily().length, 'drill(s)');

// skills persistence
click(nav('Skill')); await wait(700);
const chev = document.querySelector('.card .btn.ghost.sm');
click(chev); await wait(400);
const markBtn = [...document.querySelectorAll('button')].find((b) => txt(b).includes('Mark done'));
click(markBtn); await wait(700);
const raw2 = JSON.parse(localStorage.getItem('charisma-lab.practice.v1') || '{}');
console.log('SKILL PERSISTED:', Object.keys(raw2.skills || {}).join(',') || 'none');

// games persistence
click(nav('Games')); await wait(700);
const ta = document.querySelector('textarea');
const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
setter.call(ta, 'Yes, and we should bring the goat — because a boat without a goat is just a wet meeting.');
ta.dispatchEvent(new window.Event('input', { bubbles: true }));
await wait(150);
click([...document.querySelectorAll('button')].find((b) => txt(b).includes('Score the rep'))); await wait(900);
const raw3 = JSON.parse(localStorage.getItem('charisma-lab.practice.v1') || '{}');
console.log('GAME REP PERSISTED:', (raw3.games || []).length, 'entries, best', Math.max(0, ...(raw3.games || []).map((g) => g.score)));

console.log('ERRORS:', errors.length ? errors.slice(0, 3) : 'none');
process.exit(0);
