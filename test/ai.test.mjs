// AI client contract: rate limits must be loud, not silent.
// Server mode → localhost fetch is stubbed; no real network, no API key.
import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost:3000/' });
const { window } = dom;
Object.assign(global, { window, document: window.document, localStorage: window.localStorage });
Object.defineProperty(global, 'navigator', { value: window.navigator, configurable: true });
global.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);

let mode = 'ok';
let hits = 0;
const realFetch = global.fetch;
global.fetch = async (url, opts = {}) => {
  if (String(url).startsWith('/api/ai/chat') || String(url).includes('/api/ai/chat')) {
    hits++;
    if (mode === 'limit') {
      return { ok: false, status: 402, json: async () => ({ ok: false, error: 'FREE_LIMIT: 1 reply every 20 seconds per IP', fallback: 'rules' }) };
    }
    if (mode === 'down') return { ok: false, status: 502, json: async () => ({ ok: false, error: 'upstream exploded' }) };
    return { ok: true, status: 200, json: async () => ({ ok: true, text: 'AI reply', provider: 'pollinations', model: 'gpt-oss-20b', ms: 12 }) };
  }
  return realFetch(url, opts);
};

const ai = await import('../src/local/ai-client.js');
const problems = [];
const check = (ok, msg) => { if (!ok) problems.push(msg); };

// 1 ── config round-trips through localStorage
localStorage.setItem('charisma-lab.ai.v1', JSON.stringify({ provider: 'ollama', model: 'llama3.2' }));
const cfg = ai.getAIConfig();
check(cfg.provider === 'ollama' && cfg.model === 'llama3.2', 'config did not persist provider/model');
check(cfg.enabled === true, 'config should default enabled=true');
console.log('config:', cfg.provider, cfg.model, '| enabled:', ai.aiEnabled());

// 2 ── a keyless provider is usable with no key; a keyed one is not
ai.setAIConfig({ provider: 'pollinations', key: '', enabled: true });
check(ai.aiEnabled() === true, 'pollinations is keyless and should be enabled without a key');
ai.setAIConfig({ provider: 'compatible', key: '' });
check(ai.aiEnabled() === false, 'compatible provider must require a key');
ai.setAIConfig({ provider: 'compatible', key: 'sk-test' });
check(ai.aiEnabled() === true, 'compatible provider with a key should be enabled');

// 3 ── happy path returns the server payload
ai.setAIConfig({ provider: 'pollinations', key: '', enabled: true });
mode = 'ok';
const r1 = await ai.askAI({ messages: [{ role: 'user', content: 'hello' }], mode: 'general' });
check(r1.text === 'AI reply' && r1.provider === 'pollinations', `happy path returned ${JSON.stringify(r1).slice(0, 60)}`);
console.log('happy path:', r1.text, '|', r1.model, '|', r1.ms, 'ms');

// 4 ── requests are serialised (two parallel calls must not interleave)
hits = 0;
await Promise.all([
  ai.askAI({ messages: [{ role: 'user', content: 'a' }] }),
  ai.askAI({ messages: [{ role: 'user', content: 'b' }] }),
  ai.askAI({ messages: [{ role: 'user', content: 'c' }] }),
]);
check(hits === 3, `expected 3 serialised calls, saw ${hits}`);
console.log('serialised calls:', hits);

// 5 ── a 402 becomes a RateLimit with retryAfter and starts a cooldown
mode = 'limit';
let err = null;
try { await ai.askAI({ messages: [{ role: 'user', content: 'x' }] }); } catch (e) { err = e; }
check(!!err, 'rate-limited call should throw');
check(err?.name === 'RateLimit', `expected RateLimit, got ${err?.name}`);
check(err?.retryAfter === 20, `expected retryAfter 20 from the message, got ${err?.retryAfter}`);
const left = ai.cooldownLeft();
check(left > 0 && left <= 20, `cooldown should be counting down, got ${left}`);
console.log('RateLimit:', err?.message, '| retryAfter:', err?.retryAfter, '| counting down:', left + 's');

// 6 ── while the cooldown runs, further calls fail fast without hitting the network
hits = 0;
let err2 = null;
try { await ai.askAI({ messages: [{ role: 'user', content: 'y' }] }); } catch (e) { err2 = e; }
check(err2?.name === 'RateLimit', 'call during cooldown should throw RateLimit');
check(hits === 0, `call during cooldown should not touch the network, hits=${hits}`);
console.log('during cooldown →', err2?.message, '| network hits:', hits);

// 7 ── a non-limit failure throws a plain Error so the caller falls back to rules
//      (advance past the cooldown by rewriting the clock)
const realNow = Date.now;
Date.now = () => realNow() + 60_000;
mode = 'down';
let err3 = null;
try { await ai.askAI({ messages: [{ role: 'user', content: 'z' }] }); } catch (e) { err3 = e; }
Date.now = realNow;
check(!!err3 && err3.name !== 'RateLimit', `502 should be a plain error, got ${err3?.name}`);
check(/upstream|AI error/i.test(err3?.message || ''), `502 message should surface, got ${err3?.message}`);
console.log('502 →', err3?.name + ':', err3?.message);

// 8 ── the system prompt actually differs per mode (the coach is not one blob)
const { coachSystemPrompt, arenaSystemPrompt, PROVIDERS } = await import('../server/ai.js');
const a = coachSystemPrompt('humour');
const b = coachSystemPrompt('flirting');
check(a !== b && a.length > 100 && b.length > 100, 'coachSystemPrompt(mode) should vary by mode');
check(/consent/i.test(b) || /consent/i.test(coachSystemPrompt('flirting')), 'flirting prompt must mention consent');
check(arenaSystemPrompt({ name: 'Dana', role: 'manager' }).includes('Dana'), 'arenaSystemPrompt should name the persona');
check(PROVIDERS.some((p) => p.keyless && p.id === 'pollinations'), 'pollinations must exist as the keyless default');
check(PROVIDERS.some((p) => p.id === 'ollama'), 'ollama must exist as the offline path');
console.log('providers:', PROVIDERS.map((p) => `${p.id}${p.keyless ? '(keyless)' : '(key)'}`).join(' '));

console.log(problems.length ? `\n✗ ${problems.length} problem(s)` : '\n✓ AI client contract holds');
for (const p of problems) console.log('   ·', p);
process.exit(problems.length ? 1 : 0);
