// ─────────────────────────────────────────────────────────────
//  Lazily-loaded long-form chapters
//  The 83 chapters are 243 KB of prose. The app only needs to know
//  WHICH entries have one until you actually open one, so the prose
//  lives in its own chunk and is fetched on first open.
// ─────────────────────────────────────────────────────────────

let pending = null;
let cache = null;

export function loadChapters() {
  if (cache) return Promise.resolve(cache);
  if (!pending) {
    pending = (async () => {
      const [d1, d2, d3, x1, x2, x3, x4, wr] = await Promise.all([
        import('../../server/content/library-deep.js'),
        import('../../server/content/library-deep-2.js'),
        import('../../server/content/library-deep-3.js'),
        import('../../server/content/library-extra-deep.js'),
        import('../../server/content/library-extra-3-deep.js'),
        import('../../server/content/library-extra-5-deep.js'),
        import('../../server/content/library-depth-7.js'),
        import('../../server/content/written-deep.js'),
      ]);
      cache = {
        ...d1.LIBRARY_DEEP, ...d2.LIBRARY_DEEP_2, ...d3.LIBRARY_DEEP_3,
        ...x1.LIBRARY_EXTRA_DEEP, ...x2.LIBRARY_EXTRA_3_DEEP, ...x3.LIBRARY_EXTRA_5_DEEP,
        ...wr.WRITTEN_DEEP,
      };
      // the round-7 depth pass: extra paragraphs appended to the thinnest
      // chapters, rather than a second edition of the same chapter
      for (const [id, extra] of Object.entries(x4.LIBRARY_DEPTH_7 || {})) {
        if (cache[id]) cache[id] = { ...cache[id], deep: [...(cache[id].deep || []), ...extra] };
      }
      return cache;
    })().catch((e) => { pending = null; throw e; });
  }
  return pending;
}

export const chaptersLoaded = () => !!cache;
