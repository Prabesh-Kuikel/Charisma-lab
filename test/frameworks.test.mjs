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
localStorage.setItem('cl.view', 'dashboard');
await import('./app.mjs');
await wait(1500);

click(nav('Frameworks')); await wait(800);
const body = txt(document.querySelector('.content'));
console.log('FRAMEWORKS:', body.slice(0, 120));
console.log('count chip:', (body.match(/\d+ frameworks/) || ['none'])[0]);
// open a different one
const heads = [...document.querySelectorAll('.lib-head')];
console.log('cards rendered:', heads.length);
click(heads[3]); await wait(500);
const open = txt(document.querySelectorAll('.lib-item')[3]);
console.log('OPENED:', open.slice(0, 90));
console.log('has steps/pitfalls/drill:', /The structure/.test(open), /Where it goes wrong/.test(open), /Practise it/.test(open));
// search
const input = document.querySelector('.input');
const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
setter.call(input, 'objection');
input.dispatchEvent(new window.Event('input', { bubbles: true }));
await wait(500);
console.log('SEARCH objection →', document.querySelectorAll('.lib-item').length, 'cards:', txt(document.querySelector('.lib-item')).slice(0, 80));

// games count + a new game
click(nav('Games')); await wait(700);
console.log('GAME TABS:', document.querySelectorAll('.card .chip').length);
const tabs = [...document.querySelectorAll('.chip')];
const spine = tabs.find((t) => txt(t) === 'Story Spine Sprint');
click(spine); await wait(400);
console.log('SPINE PROMPT:', txt(document.querySelector('.content')).slice(40, 150));
console.log('ERRORS:', errors.length ? errors.slice(0, 3) : 'none');
process.exit(0);
