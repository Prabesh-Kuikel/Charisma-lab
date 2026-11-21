import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { url: 'http://localhost:3000/', pretendToBeVisual: true });
const { window } = dom;
Object.assign(global, { window, document: window.document, HTMLElement: window.HTMLElement, Element: window.Element, Node: window.Node, getComputedStyle: window.getComputedStyle, localStorage: window.localStorage, MediaRecorder: class { static isTypeSupported(){return false;} } });
global.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);
window.scrollTo = () => {};
if (!window.Element.prototype.scrollIntoView) window.Element.prototype.scrollIntoView = () => {};
Object.defineProperty(global, 'navigator', { value: window.navigator, configurable: true });
const rf = global.fetch; global.fetch = (u,o) => rf(u.startsWith('http')?u:'http://127.0.0.1:3000'+u, o);
const errors=[]; const oe=console.error; console.error=(...a)=>{errors.push(a.join(' ').slice(0,300)); oe(...a);};
const wait=(ms)=>new Promise(r=>setTimeout(r,ms));
const txt=(el)=>el.textContent.replace(/\s+/g,' ').trim();
localStorage.setItem('cl.view','courses');
await import('./app.mjs');
await wait(1400);
// open a day with a lesson
const cell = [...document.querySelectorAll('.day-cell')][10];
cell.dispatchEvent(new window.MouseEvent('click',{bubbles:true}));
await wait(500);
const lesson = document.querySelector('.lesson');
console.log('COURSE LESSON:', lesson ? txt(lesson).slice(0,420) : 'MISSING');
console.log('REFS:', [...document.querySelectorAll('.lesson-ref')].map(e=>txt(e)).join(' | '));
// click a ref -> library deep link
const ref = document.querySelector('.lesson-ref');
if (ref) { ref.dispatchEvent(new window.MouseEvent('click',{bubbles:true})); await wait(900);
  console.log('LIBRARY VIA REF:', txt(document.querySelector('.content')).slice(0,200)); }
console.log('ERRORS:', errors.length?errors:'none');
process.exit(0);
