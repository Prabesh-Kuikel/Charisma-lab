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
const { GYM_EXTRA_5 } = await import('../server/content/gym-extra-5.js');
const { WIT_EXTRA_5 } = await import('../server/content/wit-extra-5.js');
const { WIT_EXTRA_10 } = await import('../server/content/wit-extra-10.js');
const { EXTRA_PROMPTS_5 } = await import('../server/content/lab-extra-5.js');
const { LIBRARY_EXTRA_5 } = await import('../server/content/library-extra-5.js');
const { LIBRARY_EXTRA_5_DEEP } = await import('../server/content/library-extra-5-deep.js');
const { WRITTEN_ENTRIES, WRITTEN_GYM, WRITTEN_CATEGORY } = await import('../server/content/written.js');
const { WRITTEN_DEEP } = await import('../server/content/written-deep.js');
const { LIBRARY_DEPTH_7 } = await import('../server/content/library-depth-7.js');
const { GYM_OUTCOMES } = await import('../server/content/gym-outcomes.js');
const { PSY_ENTRIES, PSY_ALL, PSY_CATEGORIES } = await import('../server/content/psychology.js');
const { STORIES, STORY_TYPES } = await import('../server/content/stories.js');
const { ACADEMY_PACING, ACADEMY_LEVELS, academyPath } = await import('../server/content/academy-pacing.js');
const { EXTRA_FRAMEWORKS_5, EXTRA_DAILY_5, EXTRA_DAILY_10, EXTRA_DAILY_10B } = await import('../server/content/content-5.js');
const lab = await import('../server/content/lab.js');
const extra = await import('../server/content/lab-extra.js');
const { FRAMEWORKS, FRAMEWORK_CATEGORIES } = await import('../server/content/frameworks.js');
const IMPROMPTU_PROMPTS = [...lab.IMPROMPTU_PROMPTS, ...extra.EXTRA_PROMPTS, ...EXTRA_PROMPTS_5];
const TWISTERS = [...lab.TWISTERS, ...extra.EXTRA_TWISTERS];
const PANGERAMS = [...lab.PANGERAMS, ...extra.EXTRA_PANGERAMS];
const { WIT_SCENARIOS } = await import('../server/content/wit.js');
const { ARENA_SCENARIOS } = await import('../server/content/arena.js');
const { ARENA_EXTRA } = await import('../server/content/arena-extra.js');
const { ARENA_EXTRA_10 } = await import('../server/content/arena-extra-10.js');
const { BODY_CARDS } = await import('../server/content/body.js');
const { EXTRA_BODY_CARDS, BODY_CLUSTER_NOTES } = await import('../server/content/body-extra.js');
const { ACADEMY } = await import('../server/content/academy.js');
const { ACADEMY_EXTRA } = await import('../server/content/academy-extra.js');
const { LIBRARY_EXTRA } = await import('../server/content/library-extra.js');
const { LIBRARY_EXTRA_DEEP } = await import('../server/content/library-extra-deep.js');
const { GYM_SCENARIOS, GYM_CATEGORIES } = await import('../server/content/gym.js');
const { GYM_EXTRA, GYM_EXTRA_CATEGORIES } = await import('../server/content/gym-extra.js');
const { LIBRARY_EXTRA_3 } = await import('../server/content/library-extra-3.js');
const { LIBRARY_EXTRA_3_DEEP } = await import('../server/content/library-extra-3-deep.js');
const { ACADEMY_EXTRA_3 } = await import('../server/content/academy-extra-3.js');
const { ACADEMY_EXTRA_4 } = await import('../server/content/academy-extra-4.js');
const { ACADEMY_EXTRA_5 } = await import('../server/content/academy-extra-5.js');
const { EXTRA_FRAMEWORKS, EXTRA_FRAMEWORK_CATEGORIES, EXTRA_WIT, EXTRA_BODY_V4, EXTRA_DAILY } = await import('../server/content/content-v4.js');
const { ASSESS_QUESTIONS, ASSESS_DIMENSIONS, scoreAssessment } = await import('../server/content/assessment.js');
const { CHAPTER_IDS } = await import('../server/content/chapter-ids.js');
const { GAMES } = await import('../server/content/games.js');
const { SKILL_TRACKS } = await import('../server/content/skills.js');
const { SKILL_TRACKS_EXTRA } = await import('../server/content/skills-extra.js');
const { DAILY_DRILLS } = await import('../server/content/daily.js');

const problems = [];
const note = (ok, msg) => { if (!ok) problems.push(msg); };

const CHAPTERS = { ...LIBRARY_DEEP, ...LIBRARY_DEEP_2, ...LIBRARY_DEEP_3 };
const LESSONS = [...FAST_LESSONS, ...ARCHIVE_LESSONS, ...BATCH2, ...BATCH3];
const ALL_LIB = [...LIBRARY, ...LIBRARY_EXTRA, ...LIBRARY_EXTRA_3, ...LIBRARY_EXTRA_5, ...WRITTEN_ENTRIES];
// mirror the merge in server/index.js and src/local/api.js: the nineteen
// original playbooks gained a fifth "what good looks like" line in round 7
const ALL_GYM_RAW = [...GYM_SCENARIOS, ...GYM_EXTRA, ...GYM_EXTRA_5, ...WRITTEN_GYM];
const ALL_GYM = ALL_GYM_RAW.map((g) => (GYM_OUTCOMES[g.id] && g.lines.length < 5
  ? { ...g, lines: [...g.lines, GYM_OUTCOMES[g.id]] }
  : g));
const ALL_GYM_CATS = [...GYM_CATEGORIES, ...GYM_EXTRA_CATEGORIES, WRITTEN_CATEGORY.name];
const ALL_ACADEMY = [...ACADEMY, ...ACADEMY_EXTRA, ...ACADEMY_EXTRA_3, ...ACADEMY_EXTRA_4, ...ACADEMY_EXTRA_5];
const BASE_CHAPTERS = { ...CHAPTERS, ...LIBRARY_EXTRA_DEEP, ...LIBRARY_EXTRA_3_DEEP, ...LIBRARY_EXTRA_5_DEEP, ...WRITTEN_DEEP };
// same merge as src/local/chapters.js: the round-7 pass appends paragraphs
const ALL_CHAPTERS = { ...BASE_CHAPTERS };
for (const [id, extra] of Object.entries(LIBRARY_DEPTH_7 || {})) {
  if (ALL_CHAPTERS[id]) ALL_CHAPTERS[id] = { ...ALL_CHAPTERS[id], deep: [...(ALL_CHAPTERS[id].deep || []), ...extra] };
}
const libIds = new Set(ALL_LIB.map((l) => l.id));
const ALL_ARENA = [...ARENA_SCENARIOS, ...ARENA_EXTRA, ...ARENA_EXTRA_10];
const ALL_TRACKS = [...SKILL_TRACKS, ...SKILL_TRACKS_EXTRA];
const ALL_BODY = [...BODY_CARDS, ...EXTRA_BODY_CARDS, ...EXTRA_BODY_V4];
const ALL_WIT = [...WIT_SCENARIOS, ...EXTRA_WIT, ...WIT_EXTRA_5, ...WIT_EXTRA_10];
const ALL_FW_CATS = [...FRAMEWORK_CATEGORIES, ...EXTRA_FRAMEWORK_CATEGORIES];
const ALL_FW = [...FRAMEWORKS, ...EXTRA_FRAMEWORKS, ...EXTRA_FRAMEWORKS_5];
const ALL_DRILLS = [...DAILY_DRILLS, ...EXTRA_DAILY, ...EXTRA_DAILY_5, ...EXTRA_DAILY_10, ...EXTRA_DAILY_10B];
const BODY_KEYS = ['id', 'cluster', 'difficulty', 'scene', 'question', 'options', 'answer', 'cue', 'explain'];

// ── totals ──
const wc = (s) => String(s || '').split(/\s+/).filter(Boolean).length;
const lessonWords = LESSONS.reduce((n, l) => n + wc(l.headline) + wc(l.why) + l.body.join(' ').split(/\s+/).length + wc(l.example?.text) + wc(l.mistake) + l.drillBrief.join(' ').split(/\s+/).length + l.keyPoints.join(' ').split(/\s+/).length, 0);
const chapterWords = Object.values(CHAPTERS).reduce((n, c) => n + wc(c.thesis) + c.deep.join(' ').split(/\s+/).length + (c.script || []).reduce((m, s) => m + wc(s.line), 0) + c.failureModes.join(' ').split(/\s+/).length + c.drill.join(' ').split(/\s+/).length, 0);

console.log('\nCONTENT');
const rows = [
  ['Course lessons', LESSONS.length, `${lessonWords} words`],
  ['Library base wing', LIBRARY.length, `${Object.keys(CHAPTERS).length} chapters, ${chapterWords} words`],
  ['Impromptu prompts', IMPROMPTU_PROMPTS.length, `${new Set(IMPROMPTU_PROMPTS.map((p) => p.category)).size} categories`],
  ['Tongue twisters', TWISTERS.length, `+${PANGERAMS.length} pangrams`],
  ['Wit scenarios', ALL_WIT.length, ''],
  ['Arena personas', ALL_ARENA.length, `${new Set(ALL_ARENA.map((a) => a.scene)).size} scenes`],
  ['Body cards', ALL_BODY.length, `${new Set(ALL_BODY.map((c) => c.cluster)).size} clusters`],
  ['Academy modules', ALL_ACADEMY.length, `${ALL_ACADEMY.reduce((n, m) => n + m.drills.length, 0)} drills, ${ALL_ACADEMY.reduce((n, m) => n + m.scripts.length, 0)} scripts`],
  ['Library entries', ALL_LIB.length, `${Object.keys(ALL_CHAPTERS).length} chapters`],
  ['Conversation Gym', ALL_GYM.length, `${new Set(ALL_GYM.map((g) => g.category)).size} categories, ${ALL_GYM.reduce((n, g) => n + g.lines.length, 0)} lines`],
  ['Games', GAMES.length, `${GAMES.reduce((n, g) => n + (g.prompts?.length || 0), 0)} prompts`],
  ['Frameworks', ALL_FW.length, `${new Set(ALL_FW.map((f) => f.category)).size} categories`],
  ['Human Psychology', PSY_ALL.length, `${PSY_CATEGORIES.length} families, ${PSY_ALL.reduce((n, e) => n + e.use.length + e.defence.length, 0)} use/defence notes`],
  ['Stories', STORIES.length, `${STORY_TYPES.length} shapes, ${STORIES.reduce((n, s) => n + s.beats.length, 0)} beats, ${STORIES.reduce((n, s) => n + s.practise.length, 0)} rehearsal notes`],
  ['Skill tracks', ALL_TRACKS.length, `${ALL_TRACKS.reduce((n, t) => n + t.exercises.length, 0)} exercises`],
  ['Daily drills', ALL_DRILLS.length, ''],
];
for (const [k, n, extra] of rows) console.log(`  ${String(k).padEnd(20)} ${String(n).padStart(4)}  ${extra}`);

// ── depth: a chapter under 200 words of prose is a summary, not a chapter ──
const wordsPerChapter = Object.fromEntries(Object.entries(ALL_CHAPTERS).map(([id, c]) => [
  id, [c.thesis, ...(c.deep || [])].join(' ').split(/\s+/).filter(Boolean).length,
]));
const thin = Object.entries(wordsPerChapter).filter(([, w]) => w < 200);
console.log('\nDEPTH');
console.log(`  ${Object.keys(wordsPerChapter).length} chapters · median ${Object.values(wordsPerChapter).sort((a, b) => a - b)[Math.floor(Object.keys(wordsPerChapter).length / 2)]} words · ${thin.length} under 200`);
if (thin.length) console.log('  thin:', thin.map(([id, w]) => `${id}=${w}`).join(' '));
note(thin.length === 0, `chapters under 200 words: ${thin.length ? thin.map(([id]) => id).join(', ') : 'none'}`);
// every psychology entry must carry the three things that make it honest:
// a defence section, a limit on the evidence, and something to do
const psyBad = PSY_ALL.filter((e) => !(e.effect || []).length || !(e.use || []).length
  || !(e.defence || []).length || !e.limit || !e.evidence || !e.practise || !(e.keywords || []).length);
note(psyBad.length === 0, `psychology entries missing evidence/use/defence/limit/practise/keywords: ${psyBad.map((e) => e.id).join(', ') || 'none'}`);
const psyCats = new Set(PSY_ALL.map((e) => e.category));
const emptyCats = PSY_CATEGORIES.filter((c) => !psyCats.has(c.id));
note(emptyCats.length === 0, `psychology families with no entries: ${emptyCats.map((c) => c.id).join(', ') || 'none'}`);

// every module needs a place in the reading order, or the academy is a flat
// list of sixteen equal chips with no way in
const unpaced = ALL_ACADEMY.filter((m) => !ACADEMY_PACING[m.id]).map((m) => m.id);
note(unpaced.length === 0, `academy modules with no level/pacing: ${unpaced.join(', ') || 'none'}`);
const academyIds = new Set(ALL_ACADEMY.map((m) => m.id));
const badAfter = Object.entries(ACADEMY_PACING)
  .filter(([, v]) => v.after && !academyIds.has(v.after)).map(([k, v]) => `${k}→${v.after}`);
note(badAfter.length === 0, `academy pacing points at a missing prerequisite: ${badAfter.join(', ') || 'none'}`);
const placedCount = academyPath(ALL_ACADEMY).reduce((n, g) => n + g.modules.length, 0);
note(placedCount === ALL_ACADEMY.length, `academy path places ${placedCount} of ${ALL_ACADEMY.length} modules`);
const levelIds = new Set(ACADEMY_LEVELS.map((l) => l.id));
note(Object.values(ACADEMY_PACING).every((p) => levelIds.has(p.level)), 'academy pacing uses an undeclared level');

// the written wing must cover the channels people actually use, not one
// generic "be clear in emails" entry
const writtenText = JSON.stringify(WRITTEN_ENTRIES).toLowerCase();
for (const channel of ['text', 'email', 'dm', 'voice note', 'chat']) {
  note(writtenText.includes(channel), `written wing never mentions ${channel}`);
}
note(WRITTEN_ENTRIES.length >= 6, `written wing is too thin (${WRITTEN_ENTRIES.length} entries)`);
note(Object.keys(WRITTEN_DEEP).length === WRITTEN_ENTRIES.length, 'a written entry has no chapter');
note(WRITTEN_GYM.every((g) => g.lines.length >= 5), 'a written playbook has fewer than 5 scripted lines');

// a story has to be tellable, not just readable: beats to rehearse, a turn,
// a reason it lands, and the warning about the room it does not belong in
const storyBad = STORIES.filter((s) => (s.beats || []).length < 3 || !s.opening || !s.turn || !s.detail
  || !s.why || !s.whenNot || !s.oneLiner || !(s.practise || []).length || !(s.keywords || []).length);
note(storyBad.length === 0, `stories missing beats/opening/turn/detail/why/whenNot/practise/keywords: ${storyBad.map((s) => s.id).join(', ') || 'none'}`);
const storyTypesUsed = new Set(STORIES.map((s) => s.type));
const emptyTypes = STORY_TYPES.filter((t) => !storyTypesUsed.has(t.id));
note(emptyTypes.length === 0, `story shapes with no stories: ${emptyTypes.map((t) => t.id).join(', ') || 'none'}`);
note(new Set(STORIES.map((s) => s.id)).size === STORIES.length, 'stories: duplicate ids');
const longStory = STORIES.filter((s) => (s.seconds || 0) > 120);
note(longStory.length === 0, `stories longer than two minutes cannot be told in a meeting: ${longStory.map((s) => s.id).join(', ') || 'none'}`);

// a playbook without the "what good looks like" line cannot be scored by the reader
const noOutcome = ALL_GYM.filter((g) => (g.lines || []).length < 5);
note(noOutcome.length === 0, `playbooks with fewer than 5 scripted lines: ${noOutcome.length ? noOutcome.map((g) => g.id).join(', ') : 'none'}`);

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
// every skill a drill can point at: the eight tracks plus the three
// practice areas (creator, storytelling, humour) that are wings rather than tracks
const skillIds = new Set([...SKILL_TRACKS, ...SKILL_TRACKS_EXTRA].map((t) => t.id));
const DRILL_SKILLS = new Set([...skillIds, 'creator', 'storytelling', 'humour']);
const drillSkillCounts = {};
for (const d of ALL_DRILLS) drillSkillCounts[d.skill] = (drillSkillCounts[d.skill] || 0) + 1;
const unDrilled = [...skillIds].filter((id) => !drillSkillCounts[id]);
note(unDrilled.length === 0, `skill tracks with no daily drill: ${unDrilled.join(', ') || 'none'}`);
for (const d of ALL_DRILLS) {
  note(DRILL_SKILLS.has(d.skill), `${d.id}: unknown skill ${d.skill}`);
  note(!!d.success, `${d.id}: missing success criterion`);
}
for (const s of ALL_WIT) {
  note(!!s.setup && !!s.category && !!s.theySay, `${s.id}: incomplete wit scenario`);
  note((s.strategies || []).length >= 2, `${s.id}: fewer than 2 strategies`);
  note((s.modelLines || []).length >= 2, `${s.id}: fewer than 2 model lines`);
}
note(new Set(ALL_WIT.map((w) => w.id)).size === ALL_WIT.length, 'wit: duplicate scenario ids');

// ── skill tracks: every exercise must be checkable, not aspirational ──
note(new Set(ALL_TRACKS.map((t) => t.id)).size === ALL_TRACKS.length, 'skills: duplicate track ids');
const exIds = ALL_TRACKS.flatMap((t) => (t.exercises || []).map((e) => e.id));
note(new Set(exIds).size === exIds.length, 'skills: duplicate exercise ids across tracks');
for (const t of ALL_TRACKS) {
  note((t.principles || []).length >= 4, `${t.id}: fewer than 4 principles`);
  note((t.scripts || []).length >= 3, `${t.id}: fewer than 3 scripts`);
  note((t.exercises || []).length >= 3, `${t.id}: fewer than 3 exercises`);
  note(!!t.principle && !!t.tagline, `${t.id}: missing principle or tagline`);
  note(t.exercises.every((e) => e.success && (e.steps || []).length >= 2 && e.time > 0),
    `${t.id}: exercise without steps, time or a done-when`);
  note(t.scripts.every((sc) => sc.them && sc.you), `${t.id}: script missing one side of the exchange`);
}
note(new Set(ALL_DRILLS.map((d) => d.id)).size === ALL_DRILLS.length, 'daily: duplicate drill ids');
// psychology: unique ids, and every "read next" must resolve inside the wing
note(new Set(PSY_ALL.map((e) => e.id)).size === PSY_ALL.length, 'psychology: duplicate entry ids');
const psyIds = new Set(PSY_ALL.map((e) => e.id));
const psyDangling = [];
for (const e of PSY_ALL) for (const p2 of e.pairs || []) if (!psyIds.has(p2)) psyDangling.push(`${e.id}→${p2}`);
note(psyDangling.length === 0, `psychology: dangling cross-references ${psyDangling.join(', ')}`);

// stories point at psychology and frameworks, so resolve across both wings
const fwIdSet = new Set(ALL_FW.map((f) => f.id));
const storyIdSet = new Set(STORIES.map((s) => s.id));
const storyDangling = [];
for (const s of STORIES) {
  for (const p2 of s.pairs || []) {
    if (!psyIds.has(p2) && !fwIdSet.has(p2) && !storyIdSet.has(p2)) storyDangling.push(`${s.id}→${p2}`);
  }
}
note(storyDangling.length === 0, `stories: dangling cross-references ${storyDangling.join(', ')}`);
for (const f of ALL_FW) {
  note((f.steps || []).length >= 3, `${f.id}: fewer than 3 steps`);
  note((f.pitfalls || []).length >= 2, `${f.id}: fewer than 2 pitfalls`);
  note(!!f.oneLiner && !!f.drill, `${f.id}: framework missing one-liner or drill`);
  note(ALL_FW_CATS.includes(f.category), `${f.id}: unknown framework category ${f.category}`);
}
note(new Set(ALL_FW.map((f) => f.id)).size === ALL_FW.length, 'frameworks: duplicate ids');

// ── the lazy-loaded chapter manifest must match the real chapter maps ──
const realChapterIds = Object.keys(ALL_CHAPTERS).sort();
const manifest = [...CHAPTER_IDS].sort();
note(manifest.length === realChapterIds.length,
  `chapter-ids.js is stale: ${manifest.length} ids vs ${realChapterIds.length} chapters — run: node scripts/gen-chapter-ids.mjs`);
const drift = realChapterIds.filter((k) => !CHAPTER_IDS.includes(k));
note(drift.length === 0,
  `chapter-ids.js is missing ${drift.slice(0, 4).join(', ')}${drift.length > 4 ? ` (+${drift.length - 4})` : ''} — run: node scripts/gen-chapter-ids.mjs`);

// ── the assessment is deterministic and routes somewhere real ──
note(ASSESS_QUESTIONS.length >= 10, 'assessment: fewer than 10 questions');
const dims = new Set(ASSESS_DIMENSIONS.map((d) => d.id));
for (const q of ASSESS_QUESTIONS) note(dims.has(q.dim), `assessment ${q.id}: unknown dimension ${q.dim}`);
const allZero = scoreAssessment({});
const allTwo = Object.fromEntries(ASSESS_QUESTIONS.map((q) => [q.id, 2]));
const allMax = scoreAssessment(allTwo);
note(allZero.total === 0 && allMax.total === 100, `assessment: range broken (${allZero.total}/${allMax.total})`);
note(allZero.weakest.length === 2, 'assessment: no weakest dimensions');
const gymIdsAll = new Set(ALL_GYM.map((g) => g.id));
for (const dim of ASSESS_DIMENSIONS) {
  const r = scoreAssessment(Object.fromEntries(ASSESS_QUESTIONS.map((q) => [q.id, q.dim === dim.id ? 0 : 2])), 'work');
  note(r.weakest[0] === dim.id, `assessment: weakest dim should be ${dim.id}, got ${r.weakest[0]}`);
  for (const id of r.route.playbooks) note(gymIdsAll.has(id), `assessment route for ${dim.id}: unknown playbook ${id}`);
  for (const id of r.route.chapters) note(libIds.has(id) || ALL_LIB.some((l) => l.id === id), `assessment route for ${dim.id}: unknown chapter ${id}`);
  note(!!ALL_ACADEMY.find((m) => m.id === r.route.module), `assessment route for ${dim.id}: unknown module ${r.route.module}`);
}
for (const a of ALL_ARENA) {
  note(!!a.opener && (a.facts || []).length >= 3, `${a.id}: arena scenario needs an opener and 3+ facts`);
  note((a.exits || []).length >= 1, `${a.id}: no exit lines`);
  note((a.probes || []).length >= 1, `${a.id}: no pressure probes — cold turns will repeat`);
  note(['cold', 'neutral', 'warm'].every((t) => (a.reactions?.[t] || []).length >= 2),
    `${a.id}: reactions missing a tier (cold/neutral/warm, 2+ lines each)`);
  note(!!a.goal && (a.traits || []).length >= 2, `${a.id}: arena persona missing goal or traits`);
}
note(new Set(ALL_ARENA.map((a) => a.id)).size === ALL_ARENA.length, 'arena: duplicate persona ids');
// every arena persona must have like/dislike heuristics, or it scores blind
const analysisSrc = (await import('node:fs')).readFileSync(new URL('../server/analysis.js', import.meta.url), 'utf8');
const personaBlock = analysisSrc.slice(analysisSrc.indexOf('const PERSONA_KEYS'), analysisSrc.indexOf('export function arenaReply'));
const keyed = new Set([...personaBlock.matchAll(/^  '?([a-z-]+)'?:/gm)].map((m) => m[1]));
const unkeyed = ALL_ARENA.filter((a) => !keyed.has(a.id)).map((a) => a.id);
note(unkeyed.length === 0, `arena personas with no like/dislike keys: ${unkeyed.join(', ')}`);
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
note(new Set(ALL_ACADEMY.map((m) => m.id)).size === ALL_ACADEMY.length, 'academy: duplicate module ids');
for (const m of ALL_ACADEMY) {
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

// ── library second wing ──
const orphanCh = Object.keys(LIBRARY_EXTRA_DEEP).filter((k) => !libIds.has(k));
note(orphanCh.length === 0, `chapters with no library entry: ${orphanCh.slice(0, 4).join(',')}`);
const missingCh = LIBRARY_EXTRA.filter((l) => !LIBRARY_EXTRA_DEEP[l.id]).map((l) => l.id);
note(missingCh.length === 0, `new library entries without a chapter: ${missingCh.slice(0, 4).join(',')}`);
for (const l of LIBRARY_EXTRA) {
  note(!!l.title && !!l.short && !!l.body && !!l.use && !!l.category, `${l.id}: incomplete entry`);
  note(Array.isArray(l.tags) && l.tags.length > 0, `${l.id}: no tags`);
}
for (const [k, c] of Object.entries(LIBRARY_EXTRA_DEEP)) {
  note(c.thesis?.length > 40, `${k}: thesis too thin`);
  note(c.deep?.length >= 3, `${k}: fewer than 3 deep paragraphs`);
  note(c.script?.length >= 3, `${k}: fewer than 3 script lines`);
  note(c.failureModes?.length >= 2, `${k}: fewer than 2 failure modes`);
  note(c.drill?.length >= 2, `${k}: fewer than 2 drill steps`);
  const bad = (c.related || []).filter((r) => !libIds.has(r) || r === k);
  note(bad.length === 0, `${k}: dangling/self related ${bad.join(',')}`);
}

// ── conversation gym ──
note(new Set(ALL_GYM.map((g) => g.id)).size === ALL_GYM.length, 'gym: duplicate scenario ids');
for (const g of ALL_GYM) {
  note(ALL_GYM_CATS.includes(g.category), `${g.id}: unknown gym category ${g.category}`);
  note(!!g.title && !!g.situation && !!g.goal, `${g.id}: missing title/situation/goal`);
  note(g.steps?.length >= 4, `${g.id}: fewer than 4 steps`);
  note(g.lines?.length >= 3, `${g.id}: fewer than 3 lines`);
  note(g.avoid?.length >= 2, `${g.id}: fewer than 2 avoid notes`);
  note(!!g.drill, `${g.id}: no drill`);
  note(Number(g.difficulty) >= 1 && Number(g.difficulty) <= 5, `${g.id}: difficulty out of range`);
  const bad = (g.reads || []).filter((r) => !libIds.has(r));
  note(bad.length === 0, `${g.id}: reads pointing at missing ids ${bad.join(',')}`);
}
note(ALL_GYM.length >= 30, `gym: only ${ALL_GYM.length} scenarios`);

console.log(problems.length ? `\n✗ ${problems.length} problem(s)` : '\n✓ all cross-references resolve');
for (const p of problems) console.log('   ·', p);
process.exit(problems.length ? 1 : 0);
