// ─────────────────────────────────────────────────────────────
//  Lazily-loaded course lessons
//  The 120 lessons are 315 KB of prose that most pages never
//  touch, so they are split into their own chunk and fetched on
//  first use (Courses, the search index). Cached after one load.
// ─────────────────────────────────────────────────────────────

let pending = null;

export function loadLessons() {
  if (!pending) {
    pending = (async () => {
      const [fast, deep1, deep2, deep3] = await Promise.all([
        import('../../server/content/lessons-fast.js'),
        import('../../server/content/lessons-deep.js'),
        import('../../server/content/lessons-deep-2.js'),
        import('../../server/content/lessons-deep-3.js'),
      ]);
      const index = (rows) => Object.fromEntries((rows || []).map((l) => [l.day, l]));
      return {
        fast: index(fast.FAST_LESSONS),
        deep: index([...(deep1.ARCHIVE_LESSONS || []), ...(deep2.BATCH2 || []), ...(deep3.BATCH3 || [])]),
      };
    })().catch((e) => { pending = null; throw e; });
  }
  return pending;
}
