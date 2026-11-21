import { JSDOM } from 'jsdom';

// no fetch shim: this simulates the static build with NO backend at all
const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>',
  { url: 'http://localhost/', pretendToBeVisual: true });
const { window } = dom;
Object.defineProperty(global, 'navigator', { value: window.navigator, configurable: true });
Object.assign(global, {
  window, document: window.document,
  HTMLElement: window.HTMLElement, Element: window.Element, Node: window.Node,
  getComputedStyle: window.getComputedStyle, localStorage: window.localStorage,
  MediaRecorder: class { static isTypeSupported() { return false; } },
});
global.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);
window.scrollTo = () => {};
if (!window.Element.prototype.scrollIntoView) window.Element.prototype.scrollIntoView = () => {};
global.fetch = () => Promise.reject(new Error('NO NETWORK IN LOCAL MODE'));

const errors = [];
const oe = console.error;
console.error = (...a) => { errors.push(a.join(' ').slice(0, 220)); oe(...a); };

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const txt = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim() : '(none)');
const click = (el) => el && el.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));

// force local mode: the bundle checks VITE_LOCAL at build time; this test
// imports the source-level local api directly to prove it is self-sufficient.
const { api } = await import('../src/local/api.js');

const content = await api.content();
console.log('CONTENT keys:', Object.keys(content).join(','));
console.log('games:', content.games.length, '| skill tracks:', content.skills.length,
  '| daily drills:', content.daily.drills.length, '| chapters:', content.chaptersWritten);

const boot = await api.bootstrap();
console.log('BOOTSTRAP (empty):', 'xp', boot.user.xp, '| streak', boot.streak.current, '| storage', boot.storage);

const t = await api.track('deep');
const day90 = t.days[89];
console.log('TRACK deep days:', t.days.length, '| day 90 lesson:', !!day90.lesson, '| refs:', day90.libraryRefs.join(','));

// gating check: complete day 90 first, with no streak and no earlier days
const done = await api.completeDay({ track: 'deep', day: 90, notes: 'jumped ahead' });
console.log('DAY 90 WITHOUT STREAK: ok=', done.ok, '| xpGained', done.xpGained, '| progress rows', done.stats.progress.length);
const straight = await api.completeDay({ track: 'fast', day: 1 });
console.log('DAY 1 TOO:', straight.ok, '| total progress', straight.stats.progress.length);

const lib = await api.library('hostage', '');
console.log('LIBRARY search in local mode:', lib.total, lib.items.map((i) => i.title).join(','));

const wit = await api.analyzeWit({ scenarioId: content.wit[0].id, response: 'That is a fair point, and I will admit I have never tested it that way.' });
console.log('WIT scored locally:', wit.overall);

const arena = await api.arenaStart({ scenarioId: content.arena[0].id });
const turn = await api.arenaMessage({ sessionId: arena.sessionId, message: 'What would a good outcome look like for you?' });
const sum = await api.arenaEnd({ sessionId: arena.sessionId });
console.log('ARENA local:', 'reply?', !!turn.reply, '| overall', sum.overall);

const coach = await api.coach({ message: 'I have a salary negotiation on Friday and I always fill the silence with concessions.', mode: 'negotiation' });
console.log('COACH:', coach.kind, '| intent', coach.intent, '| drill:', coach.drills[0]?.title);
const draft = await api.coach({ message: 'I think that we should maybe probably consider the possibility of kind of changing the plan because it is sort of not working and I think people are basically a little bit frustrated with the whole thing and we should probably maybe do something about it soon.' });
console.log('COACH draft diagnosis:', draft.kind, '| issues:', (draft.reply.match(/\d\.\s/g) || []).length);

const after = await api.bootstrap();
console.log('AFTER ALL REPS: xp', after.user.xp, '| sessions', after.totalSessions, '| streak', after.streak.current);

const res = await api.reset();
console.log('RESET: xp', res.stats.user.xp, '| progress', res.stats.progress.length);

console.log('ERRORS:', errors.length ? errors.slice(0, 3) : 'none');
process.exit(0);
