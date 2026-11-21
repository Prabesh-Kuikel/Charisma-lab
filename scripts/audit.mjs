// ─────────────────────────────────────────────────────────────
//  Charisma Lab · content + wiring audit
//  Run: npm run audit
//  Checks every cross-reference in the app and reports totals.
// ─────────────────────────────────────────────────────────────
const { LIBRARY } = await import('../server/content/library.js');
const { LIBRARY_DEEP } = await import('../server/content/library-deep.js');
const { LIBRARY_DEEP_2 } = await import('../server/content/library-deep-2.js');
const { LIBRARY_DEEP_3 } = await import('../server/content/library-deep-3.js');
const { FAST_LESSONS } = await import('../server/content/lessons-fast.js');
const { ARCHIVE_LESSONS } = await import('../server/content/lessons-deep.js');
const { BATCH2 } = await import('../server/content/lessons-deep-2.js');
const { BATCH3 } = await import('../server/content/lessons-deep-3.js');
const { TRACKS } = await import('../server/content/courses.js');
const lab = await import('../server/content/lab.js');
const extra = await import('../server/content/lab-extra.js');
const { FRAMEWORKS, FRAMEWORK_CATEGORIES } = await import('../server/content/frameworks.js');
const IMPROMPTU_PROMPTS = [...lab.IMPROMPTU_PROMPTS, ...extra.EXTRA_PROMPTS];
const TWISTERS = [...lab.TWISTERS, ...extra.EXTRA_TWISTERS];
const PANGERAMS = [...lab.PANGERAMS, ...extra.EXTRA_PANGERAMS];
const { WIT_SCENARIOS } = await import('../server/content/wit.js');
const { ARENA_SCENARIOS } = await import('../server/content/arena.js');
const { BODY_CARDS } = await import('../server/content/body.js');
const { EXTRA_BODY_CARDS, BODY_CLUSTER_NOTES } = await import('../server/content/body-extra.js');
const { ACADEMY } = await import('../server/content/academy.js');
const { GAMES } = await import('../server/content/games.js');
const { SKILL_TRACKS } = await import('../server/content/skills.js');
const { DAILY_DRILLS } = await import('../server/content/daily.js');

const problems = [];
const note = (ok, msg) => { if (!ok) problems.push(msg); };

const CHAPTERS = { ...LIBRARY_DEEP, ...LIBRARY_DEEP_2, ...LIBRARY_DEEP_3 };
const LESSONS = [...FAST_LESSONS, ...ARCHIVE_LESSONS, ...BATCH2, ...BATCH3];
const libIds = new Set(LIBRARY.map((l) => l.id));
const ALL_BODY = [...BODY_CARDS, ...EXTRA_BODY_CARDS];
const BODY_KEYS = ['id', 'cluster', 'difficulty', 'scene', 'question', 'options', 'answer', 'cue', 'explain'];

// ── totals ──
const wc = (s) => String(s || '').split(/\s+/).filter(Boolean).length;
const lessonWords = LESSONS.reduce((n, l) => n + wc(l.headline) + wc(l.why) + l.body.join(' ').split(/\s+/).length + wc(l.example?.text) + wc(l.mistake) + l.drillBrief.join(' ').split(/\s+/).length + l.keyPoints.join(' ').split(/\s+/).length, 0);
const chapterWords = Object.values(CHAPTERS).reduce((n, c) => n + wc(c.thesis) + c.deep.join(' ').split(/\s+/).length + (c.script || []).reduce((m, s) => m + wc(s.line), 0) + c.failureModes.join(' ').split(/\s+/).length + c.drill.join(' ').split(/\s+/).length, 0);

console.log('\nCONTENT');
const rows = [
  ['Course lessons', LESSONS.length, `${lessonWords} words`],
  ['Library entries', LIBRARY.length, `${Object.keys(CHAPTERS).length} chapters, ${chapterWords} words`],
  ['Impromptu prompts', IMPROMPTU_PROMPTS.length, `${new Set(IMPROMPTU_PROMPTS.map((p) => p.category)).size} categories`],
  ['Tongue twisters', TWISTERS.length, `+${PANGERAMS.length} pangrams`],
  ['Wit scenarios', WIT_SCENARIOS.length, ''],
  ['Arena scenarios', ARENA_SCENARIOS.length, ''],
  ['Body cards', ALL_BODY.length, `${new Set(ALL_BODY.map((c) => c.cluster)).size} clusters`],
  ['Academy modules', ACADEMY.length, `${ACADEMY.reduce((n, m) => n + m.drills.length, 0)} drills, ${ACADEMY.reduce((n, m) => n + m.scripts.length, 0)} scripts`],
  ['Games', GAMES.length, `${GAMES.reduce((n, g) => n + (g.prompts?.length || 0), 0)} prompts`],
  ['Frameworks', FRAMEWORKS.length, `${FRAMEWORK_CATEGORIES.length} categories`],
  ['Skill tracks', SKILL_TRACKS.length, `${SKILL_TRACKS.reduce((n, t) => n + t.exercises.length, 0)} exercises`],
  ['Daily drills', DAILY_DRILLS.length, ''],
];
for (const [k, n, extra] of rows) console.log(`  ${String(k).padEnd(20)} ${String(n).padStart(4)}  ${extra}`);

// ── cross-reference integrity ──
console.log('\nCROSS-REFERENCES');
note(new Set(FAST_LESSONS.map((l) => l.day)).size === FAST_LESSONS.length, 'fast: duplicate lesson days');
note(new Set([...ARCHIVE_LESSONS, ...BATCH2, ...BATCH3].map((l) => l.day)).size === ARCHIVE_LESSONS.length + BATCH2.length + BATCH3.length, 'deep: duplicate lesson days');
note(FAST_LESSONS.length === 30 && ARCHIVE_LESSONS.length + BATCH2.length + BATCH3.length === 90, 'lesson counts are not 30/90');
for (const t of TRACKS) {
  const days = new Set(t.days.map((d) => d.day));
  note(days.size === t.days.length, `${t.id}: duplicate days`);
}
const badRefs = LESSONS.filter((l) => (l.libraryRefs || []).some((r) => !libIds.has(r)));
note(badRefs.length === 0, `lessons referencing missing library ids: ${badRefs.slice(0, 5).map((l) => l.day).join(',')}`);
const noRefs = LESSONS.filter((l) => !(l.libraryRefs || []).length);
note(noRefs.length === 0, `lessons with no libraryRefs: ${noRefs.length}`);

const inbound = {};
for (const c of Object.values(CHAPTERS)) for (const r of c.related || []) inbound[r] = (inbound[r] || 0) + 1;
const orphans = Object.keys(CHAPTERS).filter((k) => !inbound[k]);
note(orphans.length === 0, `chapters with no inbound related edge: ${orphans.join(',')}`);
const dangling = [];
for (const [k, c] of Object.entries(CHAPTERS)) for (const r of c.related || []) if (!libIds.has(r) || r === k) dangling.push(`${k}->${r}`);
note(dangling.length === 0, `dangling/self related ids: ${dangling.join(',')}`);
const missingChapters = LIBRARY.filter((l) => !CHAPTERS[l.id]).map((l) => l.id);
note(missingChapters.length === 0, `library entries without a chapter: ${missingChapters.join(',')}`);

for (const f of FRAMEWORKS) {
  note(f.steps?.length >= 3, `${f.id}: fewer than 3 steps`);
  note((f.pitfalls || []).length >= 2, `${f.id}: fewer than 2 pitfalls`);
  note(!!f.example && !!f.drill?.length, `${f.id}: missing example or drill`);
  note(FRAMEWORK_CATEGORIES.includes(f.category), `${f.id}: unknown category ${f.category}`);
}
for (const g of GAMES) {
  note(!!(g.prompts?.length || g.words?.length), `${g.id}: no prompts`);
  note((g.rules || []).length >= 3, `${g.id}: fewer than 3 rules`);
}
const skillIds = new Set(SKILL_TRACKS.map((t) => t.id));
for (const d of DAILY_DRILLS) {
  note(skillIds.has(d.skill) || d.skill === 'creator' || d.skill === 'storytelling' || d.skill === 'humour', `${d.id}: unknown skill ${d.skill}`);
  note(!!d.success, `${d.id}: missing success criterion`);
}
for (const s of WIT_SCENARIOS) note(!!s.setup && !!s.category, `${s.id}: incomplete wit scenario`);
for (const a of ARENA_SCENARIOS) note(!!a.opener && (a.facts || []).length > 0, `${a.id}: arena scenario incomplete`);
for (const p of IMPROMPTU_PROMPTS) note(!!p.text && !!p.category, `${p.id}: incomplete prompt`);

// ── pangrams are pangrams, and none of them repeat ──
const pangramText = PANGERAMS.map((p) => (typeof p === 'string' ? p : p.text)).filter(Boolean);
const lower = pangramText.map((p) => p.toLowerCase());
note(new Set(lower).size === lower.length, 'pangrams: duplicate sentences');
const notPangram = pangramText.filter((p) => {
  const l = p.toLowerCase();
  return [...'abcdefghijklmnopqrstuvwxyz'].some((c) => !l.includes(c));
});
note(notPangram.length === 0, `pangrams missing letters: ${notPangram.join(' | ')}`);

// ── body-language deck ──
const bodyClusters = new Set(BODY_CARDS.map((c) => c.cluster));
for (const c of ALL_BODY) {
  const missing = BODY_KEYS.filter((k) => c[k] === undefined || c[k] === null || c[k] === '');
  note(missing.length === 0, `${c.id}: body card missing ${missing.join(',')}`);
  note(Array.isArray(c.options) && c.options.length >= 3, `${c.id}: fewer than 3 options`);
  note(!!c.options?.[c.answer], `${c.id}: answer index ${c.answer} out of range`);
  note(bodyClusters.has(c.cluster), `${c.id}: unknown cluster ${c.cluster}`);
}
note(new Set(ALL_BODY.map((c) => c.id)).size === ALL_BODY.length, 'body: duplicate card ids');
for (const k of Object.keys(BODY_CLUSTER_NOTES)) note(!!BODY_CLUSTER_NOTES[k]?.length || typeof BODY_CLUSTER_NOTES[k] === 'string', `body note ${k}: empty`);

// ── academy modules ──
note(new Set(ACADEMY.map((m) => m.id)).size === ACADEMY.length, 'academy: duplicate module ids');
for (const m of ACADEMY) {
  note(m.principles?.length >= 6, `${m.id}: fewer than 6 principles`);
  note((m.mechanics || []).length >= 2, `${m.id}: fewer than 2 mechanics`);
  note((m.scripts || []).length >= 4, `${m.id}: fewer than 4 scripts`);
  note((m.drills || []).length >= 4, `${m.id}: fewer than 4 drills`);
  note((m.cautions || []).length >= 3, `${m.id}: fewer than 3 cautions`);
  note((m.reads || []).length >= 4, `${m.id}: fewer than 4 reads`);
  note(!!m.tone && !!m.tagline && !!m.thesis, `${m.id}: missing tone/tagline/thesis`);
  const bad = (m.reads || []).filter((r) => !libIds.has(typeof r === 'string' ? r : r.id));
  note(bad.length === 0, `${m.id}: reads pointing at missing library ids: ${bad.slice(0, 4).join(',')}`);
  for (const s of m.scripts || []) note(!!(s.line || s.you || s.text), `${m.id}: script missing content`);
  for (const d of m.drills || []) {
    note(!!d.title && !!d.do, `${m.id}: drill missing title or instruction`);
    note(!!d.success, `${m.id}: drill "${d.title}" missing success criterion`);
    note(Number(d.time) > 0, `${m.id}: drill "${d.title}" missing time`);
  }
}

console.log(problems.length ? `\n✗ ${problems.length} problem(s)` : '\n✓ all cross-references resolve');
for (const p of problems) console.log('   ·', p);
process.exit(problems.length ? 1 : 0);
