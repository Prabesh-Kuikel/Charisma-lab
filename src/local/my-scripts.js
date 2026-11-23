// ─────────────────────────────────────────────────────────────
//  My Scripts — the lines you actually use
//  Save your own version of any playbook line, tag it to a
//  situation, and rehearse it with read-aloud.
//  Browser-only, static-safe.
// ─────────────────────────────────────────────────────────────

const KEY = 'charisma-lab.scripts.v1';

export const SCRIPT_TAGS = ['Small talk', 'Dating', 'Work', 'Difficult', 'Business', 'Family', 'Strangers'];

const blank = () => ({ id: `s-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, text: '', tag: 'Small talk', source: '', uses: 0, createdAt: new Date().toISOString() });

export function allScripts() {
  try {
    const list = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function save(list) {
  try { localStorage.setItem(KEY, JSON.stringify(list.slice(0, 300))); } catch { /* quota */ }
  return list;
}

export function addScript({ text, tag = 'Small talk', source = '' }) {
  const clean = String(text || '').trim();
  if (!clean) throw new Error('Write the line first.');
  const list = allScripts();
  const item = { ...blank(), text: clean, tag, source };
  save([item, ...list]);
  return item;
}

export function updateScript(id, patch) {
  return save(allScripts().map((s) => (s.id === id ? { ...s, ...patch } : s)));
}

export function removeScript(id) {
  return save(allScripts().filter((s) => s.id !== id));
}

export function markUsed(id) {
  return save(allScripts().map((s) => (s.id === id ? { ...s, uses: (s.uses || 0) + 1, lastUsed: new Date().toISOString().slice(0, 10) } : s)));
}

export const scriptsByTag = (tag) => allScripts().filter((s) => s.tag === tag);

/** The one to rehearse: least-used line in the chosen tag. */
export function nextToRehearse(tag = '') {
  const pool = tag ? scriptsByTag(tag) : allScripts();
  if (!pool.length) return null;
  return [...pool].sort((a, b) => (a.uses || 0) - (b.uses || 0))[0];
}
