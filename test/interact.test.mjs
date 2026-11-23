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
const type = (el, value) => {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
  setter.call(el, value);
  el.dispatchEvent(new window.Event('input', { bubbles: true }));
};
const nav = (label) => [...document.querySelectorAll('.nav-item')].find((n) => txt(n).includes(label));
localStorage.setItem('cl.view', 'dashboard');
await import('./app.mjs');
await wait(1400);

// ── GAMES: answer a rep and score it ──
click(nav('Games')); await wait(700);
const ta = document.querySelector('textarea');
type(ta, 'Yes, and we should bring the goat — because a boat without a goat is just a wet meeting.');
await wait(150);
const scoreBtn = [...document.querySelectorAll('button')].find((b) => txt(b).includes('Score the rep'));
click(scoreBtn); await wait(900);
const gameBody = txt(document.querySelector('.content'));
const sm = gameBody.match(/(\d{1,3})\/100/); console.log('GAME SCORE:', sm ? sm[1] : 'none');
console.log('GAME CHECKS:', (gameBody.match(/Accepted the offer|Added something new|No blocking|Raised the stakes/g) || []).join(', ') || 'none');

// ── COACH: send a message, get drills ──
click(nav('Coach')); await wait(700);
const cta = document.querySelector('textarea');
type(cta, 'I freeze when a client pushes back on price.');
await wait(150);
click([...document.querySelectorAll('button')].find((b) => txt(b) === 'Send')); await wait(1100);
const coachBody = txt(document.querySelector('.content'));
console.log('COACH REPLIED:', /objection is a request for proof/.test(coachBody) ? 'yes' : coachBody.slice(-200));
console.log('COACH DRILL:', (coachBody.match(/Drill · [A-Za-z ]+/) || ['none'])[0]);

// ── DAILY: log a rep ──
click(nav('Daily')); await wait(700);
const logBtn = [...document.querySelectorAll('button')].find((b) => txt(b).includes('Log this rep'));
click(logBtn); await wait(900);
console.log('DAILY LOGGED:', txt(document.querySelector('.content')).includes('Logged') ? 'yes' : 'check');

// ── CREATOR: idea engine tab ──
click(nav('Creator')); await wait(600);
click([...document.querySelectorAll('.chip')].find((c) => txt(c) === 'Idea engine')); await wait(400);
const ideas = txt(document.querySelector('.content'));
console.log('IDEA ENGINE:', /(my job|mistake I made)/.test(ideas) ? 'rendering' : 'empty');

// ── SKILLS: open an exercise ──
click(nav('Skill')); await wait(700);
const chev = document.querySelector('.card .btn.ghost.sm');
click(chev); await wait(400);
console.log('SKILL EXERCISE OPEN:', txt(document.querySelector('.content')).includes('Do this') ? 'yes' : 'no');

console.log('ERRORS:', errors.length ? errors.slice(0, 4) : 'none');
process.exit(0);
