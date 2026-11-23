// ─────────────────────────────────────────────────────────────
//  Global search index
//  One flat index over every piece of teaching in the app:
//  library entries + chapters, academy modules, gym playbooks,
//  course lessons, skill exercises, daily drills, frameworks and
//  games. Pure functions, no React, so it is testable in node.
// ─────────────────────────────────────────────────────────────

const STOP = new Set(['the', 'a', 'an', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'with', 'how', 'what', 'why', 'do', 'i', 'my', 'is', 'it']);

const stem = (w) => String(w || '').toLowerCase().replace(/[^a-z0-9']/g, '').replace(/(ies|es|s)$/, '');
const tokensOf = (s) => String(s || '').split(/\s+/).map(stem).filter((t) => t && t.length > 1 && !STOP.has(t));

const clip = (s, n = 120) => {
  const t = String(s || '').replace(/\s+/g, ' ').trim();
  return t.length > n ? t.slice(0, n - 1).trimEnd() + '…' : t;
};

/**
 * Build the index once from the content payload plus the lazily-loaded
 * course lessons. Each record is small: id, route, type, title, blurb, haystack.
 */
export function buildIndex(content, lessons = { fast: {}, deep: {} }) {
  const out = [];
  const push = (rec) => { if (rec && rec.title) out.push(rec); };

  for (const l of content.library || []) {
    const ch = l.chapter;
    const chapterText = ch
      ? [ch.thesis, ...(ch.deep || []), ...(ch.script || []).map((s) => s.line), ...(ch.failureModes || []), ...(ch.drill || [])].join(' ')
      : '';
    push({
      id: `lib:${l.id}`, kind: 'library', type: 'Chapter', route: 'library', payload: { openId: l.id },
      title: l.title, blurb: l.short || l.body,
      tags: l.tags || [], category: l.category,
      body: `${l.body} ${chapterText} ${l.use || ''}`,
    });
  }

  for (const m of content.academy || []) {
    push({
      id: `acad:${m.id}`, kind: 'academy', type: 'Academy module', route: 'academy', payload: { moduleId: m.id },
      title: m.name, blurb: m.tagline || m.thesis, tags: [], category: m.tone,
      body: [m.thesis, ...(m.principles || []).map((p) => `${p.title} ${p.body}`),
        ...(m.mechanics || []).map((x) => `${x.name} ${x.why} ${(x.steps || []).join(' ')}`),
        ...(m.scripts || []).map((s) => `${s.them} ${s.you}`), ...(m.drills || []).map((d) => `${d.title} ${d.do}`)].join(' '),
    });
  }

  for (const g of content.gym || []) {
    push({
      id: `gym:${g.id}`, kind: 'gym', type: 'Playbook', route: 'gym', payload: { openId: g.id },
      title: g.title, blurb: g.goal || g.situation, tags: [], category: g.category,
      body: [g.situation, g.goal, ...(g.steps || []), ...(g.lines || []).map((l) => `${l.label} ${l.text}`), ...(g.avoid || []), ...(g.drill || [])].join(' '),
    });
  }

  for (const track of content.tracks || []) {
    for (const lesson of Object.values(lessons[track.id] || {})) {
      push({
        id: `lesson:${track.id}:${lesson.day}`, kind: 'lesson', type: `Course · ${track.name}`, route: 'courses',
        payload: { track: track.id, day: lesson.day },
        title: lesson.headline || `Day ${lesson.day}`, blurb: lesson.why || '',
        tags: [], category: track.name,
        body: [lesson.why, ...(lesson.body || []), lesson.example?.text, lesson.mistake, ...(lesson.drillBrief || []), ...(lesson.keyPoints || [])].join(' '),
      });
    }
  }

  for (const t of content.skills || []) {
    push({
      id: `skill:${t.id}`, kind: 'skill', type: 'Skill track', route: 'skills', payload: { trackId: t.id },
      title: t.name, blurb: t.subtitle || t.description, tags: [], category: t.name,
      body: [(t.principles || []).map((p) => (p.title ? `${p.title} ${p.body}` : p)).join(' '),
        ...(t.scripts || []).map((s) => (typeof s === 'string' ? s : `${s.setup || ''} ${s.line || ''} ${s.why || ''}`)),
        ...(t.exercises || []).map((e) => `${e.title || ''} ${e.do || ''}`)].join(' '),
    });
  }

  for (const d of content.daily?.drills || []) {
    push({
      id: `drill:${d.id}`, kind: 'drill', type: 'Daily drill', route: 'daily', payload: null,
      title: d.title || d.name, blurb: d.do || d.brief, tags: [], category: d.skill || '',
      body: [d.do, d.why, d.success].filter(Boolean).join(' '),
    });
  }

  for (const f of content.frameworks || []) {
    push({
      id: `fw:${f.id}`, kind: 'framework', type: 'Framework', route: 'frameworks', payload: { openId: f.id },
      title: f.name, blurb: f.oneLiner || f.summary || '', tags: [], category: f.category,
      body: [(f.steps || []).join(' '), ...(f.pitfalls || []), f.drill, f.oneLiner].filter(Boolean).join(' '),
    });
  }

  for (const g of content.games || []) {
    push({
      id: `game:${g.id}`, kind: 'game', type: 'Game', route: 'games', payload: { gameId: g.id },
      title: g.name, blurb: g.blurb || g.description || '', tags: [], category: g.category || '',
      body: [g.how, g.rubric && JSON.stringify(g.rubric)].filter(Boolean).join(' '),
    });
  }

  // pre-tokenise once; searching then touches no strings until it reports
  return out.map((r) => ({
    ...r,
    hay: tokensOf(`${r.title} ${r.blurb} ${r.category || ''} ${(r.tags || []).join(' ')} ${r.body}`),
    blurb: clip(r.blurb, 130),
  }));
}

const KIND_WEIGHT = { library: 3, gym: 3, academy: 2, lesson: 2, framework: 1, skill: 1, drill: 1, game: 1 };

/** Score one record against the query tokens. Title hits are worth far more. */
function score(rec, qTokens, raw) {
  const title = rec.title.toLowerCase();
  const titleTokens = new Set(tokensOf(rec.title));
  let s = 0;
  for (const t of qTokens) {
    const inTitle = titleTokens.has(t) || title.includes(t);
    const inBody = rec.hay.includes(t);
    if (!inTitle && !inBody) return 0; // every token must appear somewhere
    s += inTitle ? 12 : 4;
  }
  if (title === raw) s += 30;
  else if (title.startsWith(raw)) s += 16;
  if (rec.blurb.toLowerCase().includes(raw)) s += 5;
  s += KIND_WEIGHT[rec.kind] || 0;
  return s;
}

/**
 * Search the index. Returns records with a score, best first.
 * Every token must match somewhere — "price objection" does not return
 * nine hundred things.
 */
export function search(index, query, limit = 24) {
  const raw = String(query || '').toLowerCase().trim();
  if (raw.length < 2) return [];
  const qTokens = tokensOf(raw);
  if (!qTokens.length) return [];
  const hits = [];
  for (const rec of index) {
    const s = score(rec, qTokens, raw);
    if (s > 0) hits.push({ ...rec, score: s });
  }
  return hits.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title)).slice(0, limit);
}

/** Suggestions for an empty palette: the things worth opening cold. */
export function suggestions(index, n = 6) {
  const pick = ['gym:gym-party', 'lib:lib-st1', 'acad:family-systems', 'lib:lib-mny3', 'acad:humour-craft', 'lib:lib-dc3'];
  const found = pick.map((id) => index.find((r) => r.id === id)).filter(Boolean);
  return found.length ? found.slice(0, n) : index.slice(0, n);
}

export const KIND_LABEL = {
  library: 'Library', gym: 'Playbook', academy: 'Academy', lesson: 'Course',
  framework: 'Framework', skill: 'Skill track', drill: 'Drill', game: 'Game',
};
