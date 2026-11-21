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
await wait(1300);
// switch to 90-day track
const tab = [...document.querySelectorAll('.tab')].find(t=>/90-Day/.test(txt(t)));
tab.dispatchEvent(new window.MouseEvent('click',{bubbles:true}));
await wait(2000);
const cells = [...document.querySelectorAll('.day-cell')];
console.log('deep cells:', cells.length, '| blocks:', document.querySelectorAll('.block-head').length);
if (!cells.length) { const c=document.querySelector('.content'); console.log('CELLS 0. ERRORS:', errors.slice(0,3)); console.log('BODY:', c?txt(c).slice(0,300):'(content gone - app crashed)'); process.exit(0); }
cells[86].dispatchEvent(new window.MouseEvent('click',{bubbles:true}));
await wait(500);
const lesson = document.querySelector('.lesson');
console.log('LESSON:', lesson ? txt(lesson).slice(0,300) : 'MISSING');
// drill tab
const drillTab = [...document.querySelectorAll('.tab')].find(t=>txt(t)==='Drill');
drillTab.dispatchEvent(new window.MouseEvent('click',{bubbles:true}));
await wait(300);
console.log('DRILL TAB:', txt(document.querySelector('.stack')).slice(0,160));
console.log('ERRORS:', errors.length?errors:'none');
process.exit(0);
