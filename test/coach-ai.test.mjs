// Coach with AI on: the model's answer must reach the bubble, not just its metadata.
// Fully offline — /api/ai/chat is stubbed, so this runs in a second and costs no quota.
import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { url: 'http://localhost:3000/', pretendToBeVisual: true });
const { window } = dom;
global.window = window; global.document = window.document;
Object.defineProperty(global, 'navigator', { value: window.navigator, configurable: true });
Object.assign(global, { HTMLElement: window.HTMLElement, Element: window.Element, Node: window.Node, getComputedStyle: window.getComputedStyle, localStorage: window.localStorage, MediaRecorder: class { static isTypeSupported() { return false; } } });
global.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);
window.scrollTo = () => {};
if (!window.Element.prototype.scrollIntoView) window.Element.prototype.scrollIntoView = () => {};
if (!window.Element.prototype.scrollTo) window.Element.prototype.scrollTo = () => {};
const AI_ANSWER = 'Name the miss out loud, then hand the conversation back to her.';
let chatBody = null;
global.fetch = async (u, o) => {
  const url = String(u);
  if (url.includes('/api/ai/chat') || /pollinations|openai|11434/.test(url)) {
    chatBody = JSON.parse(o.body);
    // OpenAI-compatible shape, which is what the browser-only build calls
    return { ok: true, status: 200, json: async () => ({
      ok: true, model: 'gpt-oss-20b',
      choices: [{ message: { role: 'assistant', content: AI_ANSWER } }],
      text: AI_ANSWER, provider: 'pollinations', ms: 42,
    }) };
  }
  return { ok: true, status: 200, json: async () => ({ user: { id: 1, name: 'Speaker', xp: 0, goal: 'Presence' }, streak: 0, activity: [], recent: [], progress: [], sessions: [], storage: 'browser' }) };
};
const errors = []; console.error = (...a) => { errors.push(a.join(' ').slice(0, 200)); };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const txt = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim() : '(none)');
const click = (el) => el && el.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
const problems = [];
const check = (ok, msg) => { if (!ok) problems.push(msg); };

localStorage.setItem('cl.view', 'coach');
localStorage.setItem('charisma-lab.ai.v1', JSON.stringify({ enabled: true, provider: 'pollinations', key: '', model: '', baseUrl: '' }));
global.__CL_LOCAL = true; // browser-only mode: no API server needed
await import('./app.mjs');
await wait(1500);

const ta = document.querySelector('textarea');
const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
setter.call(ta, 'A joke landed badly and she went quiet.');
ta.dispatchEvent(new window.Event('input', { bubbles: true }));
await wait(150);
const send = [...document.querySelectorAll('button')].find((b) => /^Send$/i.test(txt(b)));
check(!!send, 'no Send button');
click(send);
await wait(1500);

const bubble = [...document.querySelectorAll('.bubble')].map(txt).find((b) => /^Coach/.test(b));
console.log('AI BUBBLE:', (bubble || '(none)').slice(0, 160));
check(!!bubble, 'no coach bubble rendered');
check((bubble || '').includes(AI_ANSWER), 'the model answer did not render in the bubble (metadata only)');
check(/engine: pollinations/.test(txt(document.querySelector('.content'))), 'engine chip should name the AI provider');
check(!!chatBody, 'no request reached /api/ai/chat');
// server mode sends { system, messages }; browser mode folds it into messages
const sentMsgs = chatBody?.messages || [];
const sysPrompt = chatBody?.system || sentMsgs.find((m) => m.role === 'system')?.content || '';
const contents = sentMsgs.filter((m) => m.role !== 'system').map((m) => m.content);
check(contents.length === 1, `the current turn was sent ${contents.length} time(s) — expected 1`);
check(sysPrompt.length > 100, 'no system prompt was sent');
check(errors.length === 0, `console errors: ${errors.slice(0, 2).join(' | ')}`);

// ── Arena AI persona: the model writes the partner's line, the engine still scores ──
localStorage.setItem('cl.view', 'arena');
localStorage.removeItem('charisma-lab.ai.v1');
// the app is a singleton once imported — drive it through the nav instead of reloading the module
const navBtn = [...document.querySelectorAll('.nav-item')].find((b) => /Conversation Arena/.test(txt(b)));
check(!!navBtn, 'Arena nav item missing');
if (navBtn) {
  click(navBtn);
  await wait(900);
  const enter = [...document.querySelectorAll('button')].find((b) => /Enter the conversation/.test(txt(b)));
  check(!!enter, 'no scenario start button');
  click(enter);
  await wait(1400);
  const chips = [...document.querySelectorAll('.chip.clickable')].map(txt);
  console.log('ARENA CHIPS:', chips.join(' · ').slice(0, 120));
  check(chips.some((c) => /AI persona|scripted/.test(c)), 'the AI persona toggle is not in the Arena');
  const aiChip = [...document.querySelectorAll('.chip.clickable')].find((c) => /AI persona|scripted/.test(txt(c)));
  if (aiChip && /scripted/.test(txt(aiChip))) { click(aiChip); await wait(200); }
  const box = [...document.querySelectorAll('textarea')].pop();
  const tset = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
  tset.call(box, 'That sounds like a rough week. What would make Monday easier?');
  box.dispatchEvent(new window.Event('input', { bubbles: true }));
  await wait(150);
  const sendBtn = [...document.querySelectorAll('button')].find((b) => /^Send$/.test(txt(b)));
  click(sendBtn);
  await wait(2500);
  const body = txt(document.querySelector('.content'));
  console.log('ARENA AFTER SEND:', body.slice(-220));
  check(body.includes(AI_ANSWER), 'the AI persona reply did not render in the Arena');
  check(/\d+ turns/.test(body), 'turn counter missing after a send');
}

console.log(problems.length ? `\n✗ ${problems.length} problem(s)` : '\n✓ coach AI path renders the answer, sends the turn once, and the Arena persona speaks');
for (const p of problems) console.log('   ·', p);
process.exit(problems.length ? 1 : 0);
