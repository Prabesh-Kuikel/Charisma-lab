// ── Which backend? ───────────────────────────────────────────
// VITE_LOCAL=1 → everything in the browser (static hosting, GitHub Pages).
// Served from a *.github.io host → same, automatically.
// Otherwise → talk to the Express API on the same origin.
const ENV = (typeof import.meta !== 'undefined' && import.meta.env) || {};
const onPages = typeof location !== 'undefined' && /\.github\.io$/.test(location.hostname);
const forced = typeof globalThis !== 'undefined' && globalThis.__CL_LOCAL === true;
export const IS_LOCAL = String(ENV.VITE_LOCAL) === '1' || onPages || forced;

// VITE_API_URL lets the UI run on a different host from the API
// (e.g. GitHub Pages UI + Render/tunnel API). Empty = same origin.
const BASE = IS_LOCAL ? '' : (ENV.VITE_API_URL || '').replace(/\/$/, '') + '/api';

async function req(path, opts = {}) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  if (!res.ok) {
    let msg = res.statusText;
    try { msg = (await res.json()).error || msg; } catch { /* keep statusText */ }
    throw new Error(msg);
  }
  return res.json();
}

const remoteApi = {
  content: () => req('/content'),
  bootstrap: () => req('/bootstrap'),
  track: (id) => req(`/track/${id}`),
  completeDay: (body) => req('/progress/complete', { method: 'POST', body }),
  uncompleteDay: (body) => req('/progress/uncomplete', { method: 'POST', body }),
  analyzeSpeech: (body) => req('/analyze/speech', { method: 'POST', body }),
  analyzeWit: (body) => req('/analyze/wit', { method: 'POST', body }),
  analyzePronunciation: (body) => req('/analyze/pronunciation', { method: 'POST', body }),
  answerBody: (body) => req('/body/answer', { method: 'POST', body }),
  arenaStart: (body) => req('/arena/start', { method: 'POST', body }),
  arenaMessage: (body) => req('/arena/message', { method: 'POST', body }),
  arenaEnd: (body) => req('/arena/end', { method: 'POST', body }),
  library: (q, category) => req(`/library?q=${encodeURIComponent(q || '')}&category=${encodeURIComponent(category || '')}`),
  sessions: () => req('/sessions'),
  updateUser: (body) => req('/user', { method: 'PATCH', body }),
  reset: () => req('/reset', { method: 'POST', body: {} }),

  // The coach engine is pure and ships in the bundle, so it runs on the
  // client in both modes; only the XP log goes to the server.
  coach: async (body) => (await loadLocal()).coach(body),
  coachHistory: async () => (await loadLocal()).coachHistory(),
  coachReset: async () => (await loadLocal()).coachReset(),
  // no server route: the starter list is pure data, so it ships in the bundle
  coachStarters: async (mode) => (await loadLocal()).coachStarters(mode),
  logXp: async ({ kind, xp = 0, rep = null }) => {
    const local = await loadLocal();
    const base = await local.logXp({ kind, xp, rep });
    try {
      const remote = await req('/activity', { method: 'POST', body: { kind, xp } });
      return { ...remote, localOnly: false };
    } catch { return { ...base, localOnly: true }; }
  },
};

let localPromise = null;
const loadLocal = () => (localPromise ||= import('./local/api.js').then((m) => m.api));

// Every method returns a promise, so the local module can be code-split
// and only fetched when it is actually used.
//
// The remote surface is a *subset* of the local one: lazily-loaded chapter
// prose, notes and the rep log only exist in the browser. Falling back
// instead of throwing is what keeps one call site (`api.chapter`) working in
// both modes — before this, every long-form chapter 500'd in server mode and
// the UI quietly reported "the chapter is still being written".
const call = async (name, args) => {
  const impl = IS_LOCAL ? await loadLocal() : remoteApi;
  if (typeof impl[name] === 'function') return impl[name](...args);
  const local = await loadLocal();
  if (typeof local[name] === 'function') return local[name](...args);
  throw new Error(`api.${String(name)} does not exist in either mode`);
};

export const api = new Proxy({}, { get: (_t, name) => (...args) => call(name, args) });

export const fmtTime = (s) => {
  const m = Math.floor(Math.abs(s) / 60);
  const sec = Math.abs(s) % 60;
  return `${s < 0 ? '-' : ''}${m}:${String(sec).padStart(2, '0')}`;
};
