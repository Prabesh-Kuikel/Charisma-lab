// ─────────────────────────────────────────────────────────────
//  Content facts
//  Every number that appears in a README, a release note or a
//  zip description is generated here, from the same modules the
//  app serves. Prose that quotes a count goes stale the moment a
//  wing grows; this file cannot, because it is regenerated.
//
//  npm run facts          → print the table
//  npm run facts -- --write → rewrite CONTENT-FACTS.md
// ─────────────────────────────────────────────────────────────
import { writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const load = (p) => import(new URL(`../server/content/${p}`, import.meta.url));
const { TRACKS } = await load('courses.js');
const { loadLessons } = await import('../src/local/lessons.js');
const { loadChapters } = await import('../src/local/chapters.js');
const { IMPROMPTU_PROMPTS } = await load('lab.js');
const { EXTRA_PROMPTS } = await load('lab-extra.js');
const { EXTRA_PROMPTS_5 } = await load('lab-extra-5.js');
const { WIT_SCENARIOS } = await load('wit.js');
const { EXTRA_WIT } = await load('content-v4.js');
const { WIT_EXTRA_5 } = await load('wit-extra-5.js');
const { WIT_EXTRA_10 } = await load('wit-extra-10.js');
const { ARENA_SCENARIOS } = await load('arena.js');
const { ARENA_EXTRA } = await load('arena-extra.js');
const { ARENA_EXTRA_10 } = await load('arena-extra-10.js');
const { BODY_CARDS } = await load('body.js');
const { EXTRA_BODY_CARDS } = await load('body-extra.js');
const { EXTRA_BODY_V4 } = await load('content-v4.js');
const { LIBRARY } = await load('library.js');
const { LIBRARY_EXTRA } = await load('library-extra.js');
const { LIBRARY_EXTRA_3 } = await load('library-extra-3.js');
const { LIBRARY_EXTRA_5 } = await load('library-extra-5.js');
const { GAMES } = await load('games.js');
const { ACADEMY } = await load('academy.js');
const { ACADEMY_EXTRA } = await load('academy-extra.js');
const { ACADEMY_EXTRA_3 } = await load('academy-extra-3.js');
const { ACADEMY_EXTRA_4 } = await load('academy-extra-4.js');
const { ACADEMY_EXTRA_5 } = await load('academy-extra-5.js');
const { GLOSSARY } = await load('glossary.js');
const { GYM_SCENARIOS, GYM_CATEGORIES } = await load('gym.js');
const { WRITTEN_ENTRIES, WRITTEN_GYM, WRITTEN_CATEGORY } = await load('written.js');
const { GYM_EXTRA, GYM_EXTRA_CATEGORIES } = await load('gym-extra.js');
const { GYM_EXTRA_5 } = await load('gym-extra-5.js');
const { FRAMEWORKS, FRAMEWORK_CATEGORIES } = await load('frameworks.js');
const { EXTRA_FRAMEWORKS, EXTRA_FRAMEWORK_CATEGORIES, EXTRA_DAILY } = await load('content-v4.js');
const { EXTRA_FRAMEWORKS_5, EXTRA_DAILY_5, EXTRA_DAILY_10, EXTRA_DAILY_10B } = await load('content-5.js');
const { SKILL_TRACKS } = await load('skills.js');
const { SKILL_TRACKS_EXTRA } = await load('skills-extra.js');
const { PSY_ENTRIES, PSY_ALL, PSY_CATEGORIES } = await load('psychology.js');
const { STORIES, STORY_TYPES } = await load('stories.js');
const { DAILY_DRILLS } = await load('daily.js');
const { CREATOR_PILLARS, CREATOR_FORMATS, HOOK_PATTERNS } = await load('creator.js');

const lessons = await loadLessons();
const lessonCount = Object.values(lessons).reduce((n, m) => n + Object.keys(m).length, 0);
const ALL_LIB = [...LIBRARY, ...LIBRARY_EXTRA, ...LIBRARY_EXTRA_3, ...LIBRARY_EXTRA_5, ...WRITTEN_ENTRIES];
const ALL_GYM = [...GYM_SCENARIOS, ...GYM_EXTRA, ...GYM_EXTRA_5, ...WRITTEN_GYM];
const ALL_FW = [...FRAMEWORKS, ...EXTRA_FRAMEWORKS, ...EXTRA_FRAMEWORKS_5];
const ALL_ACADEMY = [...ACADEMY, ...ACADEMY_EXTRA, ...ACADEMY_EXTRA_3, ...ACADEMY_EXTRA_4, ...ACADEMY_EXTRA_5];
const ALL_WIT = [...WIT_SCENARIOS, ...EXTRA_WIT, ...WIT_EXTRA_5, ...WIT_EXTRA_10];
const ALL_PROMPTS = [...IMPROMPTU_PROMPTS, ...EXTRA_PROMPTS, ...EXTRA_PROMPTS_5];
const ALL_BODY = [...BODY_CARDS, ...EXTRA_BODY_CARDS, ...EXTRA_BODY_V4];
const ALL_DRILLS = [...DAILY_DRILLS, ...EXTRA_DAILY, ...EXTRA_DAILY_5, ...EXTRA_DAILY_10, ...EXTRA_DAILY_10B];
const ALL_CHAPTERS = await loadChapters();
const chapters = Object.keys(ALL_CHAPTERS).length;
const words = Object.values(ALL_CHAPTERS).reduce((n, c) => n + [c.thesis, ...(c.deep || [])].join(' ').split(/\s+/).filter(Boolean).length, 0);

export const FACTS = {
  'Views (addressable by #/view)': 24,
  'Course lessons written': lessonCount,
  'Course tracks': TRACKS.length,
  'Library entries': ALL_LIB.length,
  'Library chapters written': chapters,
  'Library word count': words,
  'Conversation Gym playbooks': ALL_GYM.length,
  'Gym categories': GYM_CATEGORIES.length + GYM_EXTRA_CATEGORIES.length + 1, // + Written & Async
  'Gym scripted lines': ALL_GYM.reduce((n, g) => n + g.lines.length, 0),
  'Academy modules': ALL_ACADEMY.length,
  'Academy drills': ALL_ACADEMY.reduce((n, m) => n + (m.drills || []).length, 0),
  'Impromptu prompts': ALL_PROMPTS.length,
  'Wit scenarios': ALL_WIT.length,
  'Arena personas': ARENA_SCENARIOS.length + ARENA_EXTRA.length + ARENA_EXTRA_10.length,
  'Body-language cards': ALL_BODY.length,
  'Frameworks': ALL_FW.length,
  'Framework categories': FRAMEWORK_CATEGORIES.length + EXTRA_FRAMEWORK_CATEGORIES.length,
  'Skill tracks': SKILL_TRACKS.length + SKILL_TRACKS_EXTRA.length,
  'Skill exercises': [...SKILL_TRACKS, ...SKILL_TRACKS_EXTRA].reduce((n, t) => n + (t.exercises || []).length, 0),
  'Daily drills': ALL_DRILLS.length,
  'Games': GAMES.length,
  'Glossary terms': GLOSSARY.length,
  'Psychology mechanisms': PSY_ALL.length,
  'Psychology families': PSY_CATEGORIES.length,
  'Stories': STORIES.length,
  'Story shapes': STORY_TYPES.length,
  'Story beats': STORIES.reduce((n, s) => n + s.beats.length, 0),
  'Creator pillars / formats / hooks': `${CREATOR_PILLARS.length} / ${CREATOR_FORMATS.length} / ${HOOK_PATTERNS.length}`,
};

const rows = Object.entries(FACTS);
// imported by the test suite, so only talk when actually run
const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (!isMain) {
  // export only
} else if (process.argv.includes('--write')) {
  const md = [
    '# Content facts',
    '',
    '<!-- Generated by `npm run facts -- --write`. Do not edit by hand: these',
    '     numbers come from the same modules the app serves, so they cannot',
    '     drift from what a reader will actually find. -->',
    '',
    `Generated ${new Date().toISOString().slice(0, 10)}.`,
    '',
    '| What | How many |',
    '|---|---:|',
    ...rows.map(([k, v]) => `| ${k} | ${v} |`),
    '',
    'Regenerate with `npm run facts -- --write`; check without writing with `npm run facts`.',
    '',
  ].join('\n');
  writeFileSync(fileURLToPath(new URL('../CONTENT-FACTS.md', import.meta.url)), md);
  console.log(`wrote CONTENT-FACTS.md (${rows.length} rows)`);
} else {
  for (const [k, v] of rows) console.log(`  ${String(k).padEnd(34)} ${v}`);
}
