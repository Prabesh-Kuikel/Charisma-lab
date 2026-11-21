// ─────────────────────────────────────────────────────────────
//  AI client
//  • Server mode  → POST /api/ai/chat (key stays on the server)
//  • Static mode  → call the provider directly (CORS is open)
//  Serialises requests and honours the free tier's cooldown, so a
//  402/429 produces a visible countdown instead of a silent failure.
// ─────────────────────────────────────────────────────────────

import { aiChat, resolveConfig, PROVIDERS } from '../../server/ai.js';
import { coachSystemPrompt } from '../../server/ai.js';
import { IS_LOCAL } from '../api.js';

const KEY = 'charisma-lab.ai.v1';

export const AI_PROVIDERS = PROVIDERS;

const DEFAULTS = {
  enabled: true,
  provider: 'pollinations',
  model: '',
  key: '',
  baseUrl: '',
  temperature: 0.7,
};

export function getAIConfig() {
  try {
    return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) || '{}') };
  } catch {
    return { ...DEFAULTS };
  }
}

export function setAIConfig(patch) {
  const next = { ...getAIConfig(), ...patch };
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* quota */ }
  return next;
}

export const aiEnabled = () => {
  const cfg = getAIConfig();
  const p = PROVIDERS.find((x) => x.id === cfg.provider);
  return cfg.enabled !== false && (!p?.keyless ? !!cfg.key : true);
};

// ── cooldown bookkeeping (free tiers are rate limited) ──────
let cooldownUntil = 0;
export const cooldownLeft = () => Math.max(0, Math.ceil((cooldownUntil - Date.now()) / 1000));
const startCooldown = (secs) => { cooldownUntil = Date.now() + secs * 1000; };

class RateLimit extends Error {
  constructor(message, retryAfter) {
    super(message);
    this.name = 'RateLimit';
    this.retryAfter = retryAfter || 45;
  }
}

const parseRetry = (msg = '') => {
  const m = msg.match(/(\d+)\s*(s|sec|second)/i);
  return m ? Number(m[1]) : 45;
};

// only one in-flight request at a time
let chain = Promise.resolve();
const serialise = (fn) => {
  const run = chain.then(fn, fn);
  chain = run.catch(() => {});
  return run;
};

/**
 * Ask the model something. Throws RateLimit with .retryAfter when throttled.
 * @returns {Promise<{text:string, provider:string, model:string, ms:number}>}
 */
export function askAI({ messages = [], mode = 'general', system = '', temperature, maxTokens = 500 } = {}) {
  return serialise(async () => {
    const left = cooldownLeft();
    if (left > 0) throw new RateLimit(`Free tier: wait ${left}s`, left);

    const cfg = getAIConfig();
    const sys = system || coachSystemPrompt(mode);

    try {
      if (IS_LOCAL) {
        // Static build: straight to the provider; it sends CORS *.
        return await aiChat({ messages, system: sys, config: cfg, temperature, maxTokens });
      }
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          messages, system: sys, mode, temperature, maxTokens,
          provider: cfg.provider, model: cfg.model, baseUrl: cfg.baseUrl,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = json.error || `AI error ${res.status}`;
        if (/45|429|402|limit/i.test(msg)) throw new RateLimit(msg, parseRetry(msg));
        throw new Error(msg);
      }
      return json;
    } catch (e) {
      if (e instanceof RateLimit) { startCooldown(e.retryAfter); throw e; }
      // one silent retry, then give up so the caller can fall back to rules
      throw e;
    }
  });
}

export const aiClientConfig = (cfg = getAIConfig()) => resolveConfig(cfg);
