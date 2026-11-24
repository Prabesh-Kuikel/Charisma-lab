// ─────────────────────────────────────────────────────────────
//  Notes & highlights — make the library writable
//  91 chapters of prose with nowhere to write in the margin is a
//  document, not a practice tool. This stores three kinds of thing:
//    • a note on any library chapter (and anything else in the app)
//    • a highlight: a quoted line plus your one-sentence reaction
//    • a verdict on a chapter: did this change anything you do?
//  Browser-only, static-safe, included in backup/restore.
// ─────────────────────────────────────────────────────────────

const KEY = 'charisma-lab.notes.v1';
const VERDICT_KEY = 'charisma-lab.verdicts.v1';

const uid = (p = 'n') => `${p}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
const read = (key, fallback) => {
  try {
    const v = JSON.parse(localStorage.getItem(key) || 'null');
    return v ?? fallback;
  } catch {
    return fallback;
  }
};
const write = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* quota */ }
  return value;
};

/** All notes, newest first. Shape: {id, ref, refType, quote, text, at, pinned} */
export function allNotes() {
  const list = read(KEY, []);
  return Array.isArray(list) ? list : [];
}

export function notesFor(ref) {
  return allNotes().filter((n) => n.ref === ref);
}

export function hasNotes(ref) {
  return allNotes().some((n) => n.ref === ref);
}

export function addNote({ ref, refType = 'library', quote = '', text = '', title = '' }) {
  const body = String(text || '').trim();
  if (!body) throw new Error('Write something first.');
  const note = {
    id: uid(), ref, refType, title,
    quote: String(quote || '').trim().slice(0, 400),
    text: body.slice(0, 2000),
    at: new Date().toISOString(),
    pinned: false,
  };
  write(KEY, [note, ...allNotes()].slice(0, 500));
  return note;
}

export function updateNote(id, patch) {
  return write(KEY, allNotes().map((n) => (n.id === id ? { ...n, ...patch, at: n.at } : n)));
}

export function removeNote(id) {
  return write(KEY, allNotes().filter((n) => n.id !== id));
}

export function togglePin(id) {
  return write(KEY, allNotes().map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
}

/** Everything, pinned first, then newest. */
export function notesOrdered(filter = '') {
  const list = allNotes().filter((n) => !filter || n.refType === filter);
  return [...list].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || b.at.localeCompare(a.at));
}

export const NOTE_TYPES = ['library', 'gym', 'academy', 'arena', 'course', 'other'];

// ── verdicts: "did this change anything?" ───────────────────
// Three answers, and the third is the one that matters. Anything
// you meant to use and did not is a signal, not a failure.
export const VERDICTS = {
  used: { label: 'I used it', tone: 'mint', xp: 15 },
  will: { label: 'I will use it', tone: 'violet', xp: 5 },
  no: { label: 'Not for me', tone: 'rose', xp: 0 },
};

export function allVerdicts() {
  const v = read(VERDICT_KEY, {});
  return v && typeof v === 'object' ? v : {};
}

export function setVerdict(ref, verdict, title = '') {
  const map = allVerdicts();
  if (!VERDICTS[verdict]) throw new Error('Unknown verdict');
  map[ref] = { verdict, title, at: new Date().toISOString() };
  write(VERDICT_KEY, map);
  return map;
}

export const verdictFor = (ref) => allVerdicts()[ref] || null;

/** Counts for the progress page: how much of what you read you actually used. */
export function verdictStats() {
  const map = Object.values(allVerdicts());
  const used = map.filter((v) => v.verdict === 'used').length;
  const will = map.filter((v) => v.verdict === 'will').length;
  const no = map.filter((v) => v.verdict === 'no').length;
  return { used, will, no, total: map.length, ratio: map.length ? Math.round((used / map.length) * 100) : 0 };
}

/** Things you said you would use and have not marked used yet — the honest backlog. */
export function pendingVerdicts(limit = 6) {
  return Object.entries(allVerdicts())
    .filter(([, v]) => v.verdict === 'will')
    .sort((a, b) => a[1].at.localeCompare(b[1].at))
    .slice(0, limit)
    .map(([ref, v]) => ({ ref, ...v }));
}
