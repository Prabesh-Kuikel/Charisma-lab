// ─────────────────────────────────────────────────────────────
//  Repetition audit
//  Volume is cheap; the failure mode of a 600-record content set
//  is that the tenth batch quietly restates the first. This walks
//  every wing and reports (a) near-identical titles and (b) near-
//  identical opening sentences, using token-set Jaccard rather
//  than string equality so rewording does not hide a duplicate.
//
//  npm run audit:reps   → report (never fails the build)
//  --strict             → exit 1 if any pair scores above 0.82
// ─────────────────────────────────────────────────────────────
import { GYM_SCENARIOS } from '../server/content/gym.js';
import { GYM_EXTRA } from '../server/content/gym-extra.js';
import { GYM_EXTRA_5 } from '../server/content/gym-extra-5.js';
import { WIT_SCENARIOS } from '../server/content/wit.js';
import { EXTRA_WIT } from '../server/content/content-v4.js';
import { WIT_EXTRA_5 } from '../server/content/wit-extra-5.js';
import { WIT_EXTRA_10 } from '../server/content/wit-extra-10.js';
import { IMPROMPTU_PROMPTS } from '../server/content/lab.js';
import { EXTRA_PROMPTS } from '../server/content/lab-extra.js';
import { EXTRA_PROMPTS_5 } from '../server/content/lab-extra-5.js';
import { LIBRARY } from '../server/content/library.js';
import { LIBRARY_EXTRA } from '../server/content/library-extra.js';
import { LIBRARY_EXTRA_3 } from '../server/content/library-extra-3.js';
import { LIBRARY_EXTRA_5 } from '../server/content/library-extra-5.js';
import { FRAMEWORKS } from '../server/content/frameworks.js';
import { EXTRA_FRAMEWORKS } from '../server/content/content-v4.js';
import { EXTRA_FRAMEWORKS_5 } from '../server/content/content-5.js';
import { EXTRA_DAILY } from '../server/content/content-v4.js';
import { EXTRA_DAILY_5, EXTRA_DAILY_10, EXTRA_DAILY_10B } from '../server/content/content-5.js';
import { SKILL_TRACKS } from '../server/content/skills.js';
import { PSY_ENTRIES, PSY_ALL } from '../server/content/psychology.js';
import { STORIES } from '../server/content/stories.js';

const STOP = new Set('a an the and or but of to in on for with at by is are was were be been it its this that these those you your i my me we our they their he she his her not no so if then than as from about into over under more most very just do does did doing have has had will would can could should your yours'.split(' '));
const toks = (s) => new Set(String(s || '').toLowerCase().replace(/[^a-z0-9\s’']/g, ' ').split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w)));
const jac = (a, b) => {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const t of a) if (b.has(t)) inter += 1;
  return inter / (a.size + b.size - inter);
};
const firstSentence = (s) => String(s || '').split(/(?<=[.!?])\s/)[0] || '';

const groups = {
  playbooks: [...GYM_SCENARIOS, ...GYM_EXTRA, ...GYM_EXTRA_5].map((g) => ({ id: g.id, title: g.title, text: `${g.situation} ${g.goal}` })),
  wit: [...WIT_SCENARIOS, ...EXTRA_WIT, ...WIT_EXTRA_5, ...WIT_EXTRA_10].map((w) => ({ id: w.id, title: w.title, text: `${w.setup} ${w.context}` })),
  prompts: [...IMPROMPTU_PROMPTS, ...EXTRA_PROMPTS, ...EXTRA_PROMPTS_5].map((p) => ({ id: p.id, title: p.text, text: p.text })),
  library: [...LIBRARY, ...LIBRARY_EXTRA, ...LIBRARY_EXTRA_3, ...LIBRARY_EXTRA_5].map((l) => ({ id: l.id, title: l.title, text: `${l.short} ${l.body}` })),
  frameworks: [...FRAMEWORKS, ...EXTRA_FRAMEWORKS, ...EXTRA_FRAMEWORKS_5].map((f) => ({ id: f.id, title: f.name, text: `${f.oneLiner || ''} ${(f.steps || []).join(' ')}` })),
  drills: [...EXTRA_DAILY, ...EXTRA_DAILY_5, ...EXTRA_DAILY_10, ...EXTRA_DAILY_10B].map((d) => ({ id: d.id, title: d.title, text: d.do })),
  psychology: PSY_ALL.map((e) => ({ id: e.id, title: e.title, text: `${e.oneLiner} ${(e.effect || []).join(' ')}` })),
  stories: STORIES.map((s) => ({ id: s.id, title: s.title, text: `${s.oneLiner} ${s.opening} ${s.beats.join(' ')}` })),
  skills: SKILL_TRACKS.flatMap((t) => (t.exercises || []).map((e) => ({ id: `${t.id}:${e.id}`, title: e.title, text: `${e.success || ''} ${(e.steps || []).join(' ')}` }))),
};

const TITLE_LIMIT = Number(process.env.TITLE_LIMIT || 0.62);
const TEXT_LIMIT = Number(process.env.TEXT_LIMIT || 0.7);
const strict = process.argv.includes('--strict');
let duplicates = 0;
let worstTitle = [];
let worstText = [];
let total = 0;

for (const [wing, rows] of Object.entries(groups)) {
  total += rows.length;
  // titles must be globally unique inside a wing, modulo case/punctuation
  const seen = new Map();
  for (const r of rows) {
    const key = String(r.title || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
    if (seen.has(key)) { duplicates += 1; console.log(`  ✗ duplicate title in ${wing}: “${r.title}” (${seen.get(key)} & ${r.id})`); }
    else seen.set(key, r.id);
  }
  const tk = rows.map((r) => toks(r.title));
  const xk = rows.map((r) => toks(firstSentence(r.text)));
  for (let i = 0; i < rows.length; i++) {
    for (let j = i + 1; j < rows.length; j++) {
      const t = jac(tk[i], tk[j]);
      if (t >= TITLE_LIMIT) worstTitle.push({ wing, score: t, a: rows[i], b: rows[j] });
      const x = jac(xk[i], xk[j]);
      if (x >= TEXT_LIMIT) worstText.push({ wing, score: x, a: rows[i], b: rows[j] });
    }
  }
  console.log(`${wing.padEnd(11)} ${String(rows.length).padStart(4)} records`);
}
worstTitle.sort((a, b) => b.score - a.score);
worstText.sort((a, b) => b.score - a.score);

const show = (label, list) => {
  console.log(`\n${label}: ${list.length} pair${list.length === 1 ? '' : 's'}`);
  for (const p of list.slice(0, 12)) {
    console.log(`  ${p.score.toFixed(2)} [${p.wing}] “${String(p.a.title).slice(0, 52)}” ↔ “${String(p.b.title).slice(0, 52)}”`);
  }
};
show(`Near-identical titles (Jaccard ≥ ${TITLE_LIMIT})`, worstTitle);
show(`Near-identical openings (Jaccard ≥ ${TEXT_LIMIT})`, worstText);
console.log(`\n${total} records checked across ${Object.keys(groups).length} wings.`);

if (duplicates) {
  console.log(`\n✗ ${duplicates} duplicate title${duplicates === 1 ? '' : 's'} — every playbook, scenario, prompt and chapter needs its own name`);
  process.exitCode = 1;
}
if (strict && (worstTitle.length || worstText.length)) {
  console.log('\n✗ repetition audit is strict and found collisions');
  process.exit(1);
}
