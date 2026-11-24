// ─────────────────────────────────────────────────────────────
//  Service worker — offline support for a local-first app
//
//  The app has no server and stores everything on the device, but
//  until now it still needed the network to *open*. Close the tab on
//  a train and the whole thing was gone, which made "no account, no
//  server" a claim about privacy rather than about availability.
//
//  Strategy, deliberately boring:
//    · precache the shell on install (index.html + the hashed assets
//      it names), so the first offline launch works immediately
//    · navigation requests: network first, fall back to the cached
//      shell — a deploy is picked up as soon as you are online
//    · everything else same-origin: cache first, revalidate in the
//      background (stale-while-revalidate), because the hashed
//      filenames change whenever the content does
//    · never cache the AI provider — it is cross-origin and keyless,
//      and a stale model reply would be worse than no reply
//
//  Cache name carries the build id, so a new deploy gets a clean
//  cache and the old one is dropped on activate.
// ─────────────────────────────────────────────────────────────

const BUILD = '__BUILD_ID__';
const SHELL = `charisma-shell-${BUILD}`;
const RUNTIME = 'charisma-runtime-v1';

// Only same-origin, same-scope requests are ever cached.
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL);
    // index.html first: it names the hashed assets the rest of the
    // install depends on, and it is the one URL guaranteed to exist
    const res = await fetch('./index.html', { cache: 'reload' });
    if (res.ok) await cache.put('./index.html', res.clone());
    try {
      const html = await res.text();
      const assets = [...html.matchAll(/(?:src|href)="\.\/(assets\/[^"]+)"/g)].map((m) => `./${m[1]}`);
      const extra = ['./manifest.webmanifest', './icon-192.png', './icon-512.png'];
      await Promise.all([...new Set([...assets, ...extra])].map(async (url) => {
        try {
          const r = await fetch(url, { cache: 'reload' });
          if (r.ok) await cache.put(url, r);
        } catch { /* one missing asset must not fail the whole install */ }
      }));
    } catch { /* html unparseable: the runtime cache will fill in */ }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names
      .filter((n) => n.startsWith('charisma-shell-') && n !== SHELL)
      .map((n) => caches.delete(n)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // anything cross-origin (the AI provider) is left to the network
  if (url.origin !== self.location.origin) return;

  // navigations: network first so a deploy is picked up, cache as the floor
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(SHELL);
        cache.put('./index.html', fresh.clone());
        return fresh;
      } catch {
        const cache = await caches.open(SHELL);
        return (await cache.match('./index.html')) || (await cache.match(req))
          || new Response('<h1>Offline</h1><p>Open this app once while online to install it.</p>',
            { headers: { 'Content-Type': 'text/html' }, status: 503 });
      }
    })());
    return;
  }

  // assets: cache first, refresh in the background
  event.respondWith((async () => {
    const cache = await caches.open(RUNTIME);
    const hit = await cache.match(req);
    const network = fetch(req).then((res) => {
      if (res && res.ok) cache.put(req, res.clone());
      return res;
    }).catch(() => null);
    return hit || (await network) || new Response('', { status: 504 });
  })());
});

// The page can ask a waiting worker to take over immediately.
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
