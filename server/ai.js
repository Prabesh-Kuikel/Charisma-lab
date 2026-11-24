// ─────────────────────────────────────────────────────────────
//  Charisma Lab · Conversational AI
//
//  Three providers, all OpenAI-compatible in shape:
//    1. pollinations  free, public, NO API KEY  (default)
//    2. ollama        local open-source model, no key, runs on your machine
//    3. compatible    any OpenAI-compatible endpoint + your own key
//                     (OpenRouter free models, Groq, Together, LM Studio, vLLM)
//
//  If all of them fail, callers fall back to the deterministic rules
//  coach in coach.js — the app never breaks because a model is down.
//
//  Pure fetch, no Node APIs: usable from the server and the browser.
// ─────────────────────────────────────────────────────────────

export const PROVIDERS = [
  {
    id: 'pollinations',
    name: 'Pollinations (free, no key)',
    baseUrl: 'https://text.pollinations.ai/openai',
    model: 'openai',
    keyless: true,
    note: 'Public open endpoint. Fast, free, rate-limited — good for everyday coaching.',
  },
  {
    id: 'ollama',
    name: 'Ollama (local, private)',
    baseUrl: 'http://127.0.0.1:11434/v1/chat/completions',
    model: 'llama3.2',
    keyless: true,
    note: 'Runs on your own machine. Nothing leaves your device. Install from ollama.com, then "ollama run llama3.2".',
  },
  {
    id: 'compatible',
    name: 'Custom / your own key',
    baseUrl: 'https://openrouter.ai/api/v1/chat/completions',
    model: 'meta-llama/llama-3.3-70b-instruct:free',
    keyless: false,
    note: 'Any OpenAI-compatible API: OpenRouter, Groq, Together, LM Studio, vLLM. Free tiers exist on several.',
  },
];

export const DEFAULT_AI_CONFIG = {
  enabled: true,
  provider: 'pollinations',
  model: '',
  key: '',
  baseUrl: '',
  temperature: 0.7,
  timeoutMs: 45000,
};

export const providerById = (id) => PROVIDERS.find((p) => p.id === id) || PROVIDERS[0];

export function resolveConfig(cfg = {}) {
  const merged = { ...DEFAULT_AI_CONFIG, ...cfg };
  const p = providerById(merged.provider);
  return {
    ...merged,
    provider: p.id,
    baseUrl: (merged.baseUrl || p.baseUrl).trim(),
    model: (merged.model || p.model).trim(),
    needsKey: !p.keyless,
  };
}

// ── system prompts per coach mode ───────────────────────────
const COACH_STYLE = `You are Coach, an elite communication trainer inside a practice app.
Rules:
- Be specific and behavioural. Never generic advice like "be confident".
- Use British English. No emojis. No asterisks or markdown bold — plain prose and short lines.
- Maximum 150 words. Structure: one-line diagnosis, then 2-3 numbered actions, then one question.
- If the user pastes a draft, name the weakest sentence and rewrite it.
- Never invent statistics. If you do not know, say so.`;

const MODE_FOCUS = {
  general: 'Broad communication skill: clarity, presence, warmth, structure.',
  sales: 'Sales: discovery, objections, pricing, closing. Diagnose before prescribing.',
  persuasion: 'Persuasion: framing, trade-offs, conceding first, evidence order.',
  flirting: 'Flirting and attraction: warmth plus specificity, no pressure, easy exits, consent and respect always. Never coach manipulation, negging, or persistence after a no.',
  negotiation: 'Negotiation: BATNA, anchoring, silence, conditional trades.',
  creator: 'Content creation: hooks, structure, editing, publishing cadence.',
  humour: 'Humour: setup and punchline order, deadpan delivery, self-deprecation, callbacks. Teach editing, not joke theft. Keep it kind — no humour at the expense of people in the room.',
  conflict: 'Difficult conversations: de-escalation, acknowledgement, boundaries, repair.',
  psychology: 'Human psychology applied socially: attention, reciprocity, cognitive biases, status. Always pair an insight with its ethical use and its defensive counter.',
  storytelling: 'Tellable stories: find the turn, choose the one detail that proves it, cut the setup, land the last line and stop. Coach the beats out loud, never write the story for them.',
};

// the only modes the server will accept: an unknown string used to fall back
// silently, which meant a caller could pass arbitrary text as a "mode"
export const COACH_MODES = Object.keys(MODE_FOCUS);
export const isCoachMode = (m) => COACH_MODES.includes(m);

export function coachSystemPrompt(mode = 'general', extra = '') {
  const key = isCoachMode(mode) ? mode : 'general';
  return `${COACH_STYLE}\n\nCurrent focus: ${MODE_FOCUS[key]}${extra ? `\n\n${extra}` : ''}`;
}

export function arenaSystemPrompt(scenario = {}) {
  const facts = (scenario.facts || []).map((f) => `- ${f}`).join('\n');
  return `You are role-playing a person in a conversation-training app.
Character: ${scenario.persona || scenario.name || 'a person'}
Situation: ${scenario.brief || scenario.setting || 'a conversation'}
${facts ? `Facts you hold (reveal only if asked well):\n${facts}` : ''}

Rules:
- Stay in character. Never mention being an AI, never coach the user.
- Reply in 1-3 sentences of natural speech. British English. No emojis, no markdown.
- Warm initially, but guard your real objection. Reward good questions with information; go flat and short if the user pushes, pitches too early, or ignores what you said.
- If the user says something excellent, soften visibly and say a little more than you meant to.`;
}

export function arenaJudgePrompt(scenario = {}) {
  return `You are assessing a practice conversation as a communication coach.
Scenario: ${scenario.brief || scenario.setting || 'a conversation'}.
Score the user on curiosity, specificity, warmth, momentum (0-100 each) and give an overall 0-100.
Return STRICT JSON only, no prose:
{"curiosity":0,"specificity":0,"warmth":0,"momentum":0,"overall":0,"strength":"one sentence","fix":"one sentence","drill":"one sentence"}`;
}

// ── transport ───────────────────────────────────────────────
async function postJSON(url, body, { key, timeoutMs = 45000, headers = {} } = {}) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(key ? { authorization: `Bearer ${key}` } : {}),
        ...headers,
      },
      body: JSON.stringify(body),
      signal: ctl.signal,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`AI endpoint ${res.status}${text ? `: ${text.slice(0, 120)}` : ''}`);
    }
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

const extract = (json) =>
  json?.choices?.[0]?.message?.content
  || json?.message?.content
  || json?.response
  || '';

/**
 * Send a chat completion. Always resolves or throws — never hangs.
 * @returns {Promise<{text:string, provider:string, model:string, ms:number}>}
 */
export async function aiChat({ messages = [], config = {}, system = '', temperature, maxTokens = 500 } = {}) {
  const cfg = resolveConfig(config);
  if (!cfg.enabled) throw new Error('AI disabled in settings');
  if (cfg.needsKey && !cfg.key) throw new Error('This provider needs an API key');

  const payload = {
    model: cfg.model,
    messages: system ? [{ role: 'system', content: system }, ...messages] : messages,
    temperature: temperature ?? cfg.temperature,
    max_tokens: maxTokens,
    stream: false,
  };

  const started = Date.now();
  const json = await postJSON(cfg.baseUrl, payload, { key: cfg.key, timeoutMs: cfg.timeoutMs });
  const text = String(extract(json) || '').trim();
  if (!text) throw new Error('AI returned an empty response');

  return {
    text,
    provider: cfg.provider,
    model: json.model || cfg.model,
    ms: Date.now() - started,
  };
}

export async function aiStatus(config = {}) {
  const cfg = resolveConfig(config);
  return {
    enabled: cfg.enabled,
    provider: cfg.provider,
    model: cfg.model,
    needsKey: cfg.needsKey,
    hasKey: !!cfg.key,
    ready: cfg.enabled && (!cfg.needsKey || !!cfg.key),
  };
}
