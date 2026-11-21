import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
  url: 'http://localhost:3000/', pretendToBeVisual: true,
});
const { window } = dom;
global.window = window; global.document = window.document;
Object.defineProperty(global, 'navigator', { value: window.navigator, configurable: true });
global.HTMLElement = window.HTMLElement; global.Element = window.Element; global.Node = window.Node;
global.getComputedStyle = window.getComputedStyle;
global.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);
global.localStorage = window.localStorage;
global.MediaRecorder = class { static isTypeSupported() { return false; } };
window.scrollTo = () => {};

const realFetch = global.fetch;
global.fetch = (url, opts) => realFetch(url.startsWith('http') ? url : 'http://127.0.0.1:3000' + url, opts);

const errors = [];
const origErr = console.error;
console.error = (...a) => { errors.push(a.join(' ').slice(0, 400)); origErr(...a); };
window.addEventListener('error', (e) => errors.push('window error: ' + e.message));

localStorage.setItem('cl.view', 'dashboard');
await import('./app.mjs');

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const txt = (el) => el.textContent.replace(/\s+/g, ' ').trim();
await wait(1500);

const navBtns = () => [...document.querySelectorAll('.nav-item')];
console.log('NAV COUNT', navBtns().length);
console.log('DASH:', txt(document.querySelector('.content')).slice(0, 400));

for (const b of navBtns()) {
  b.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  await wait(900);
  const c = document.querySelector('.content');
  console.log('\n### ' + txt(b).slice(0, 24) + '\n' + txt(c).slice(0, 420));
}

// interact: course day click, library search, wit scoring, body answer
const clickText = async (sel, re, waitMs = 700) => {
  const el = [...document.querySelectorAll(sel)].find((e) => re.test(txt(e)));
  if (!el) return false;
  el.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  await wait(waitMs);
  return true;
};

// library search
const btn = navBtns().find((b) => /Resource Library/.test(txt(b)));
btn.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
await wait(600);
const input = document.querySelector('.input');
input.value = 'silence';
input.dispatchEvent(new window.Event('input', { bubbles: true }));
await wait(900);
console.log('\nLIB SEARCH:', txt(document.querySelector('.content')).slice(0, 300));

console.log('\n=== ERRORS ===');
console.log(errors.length ? errors.slice(0, 10).join('\n---\n') : 'none');
process.exit(0);
