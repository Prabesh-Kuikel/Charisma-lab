// ─────────────────────────────────────────────────────────────
//  Request guards
//  Dependency-free, in-memory, sized for a single-user app:
//  a token bucket per client, a global in-flight cap for the
//  expensive AI relay, and a cached gzip for the big JSON payload.
// ─────────────────────────────────────────────────────────────

import zlib from 'node:zlib';

// ── token bucket ──────────────────────────────────────────────
// Each client gets `capacity` requests, refilled at `perMinute`.
// Loopback clients are allowed a bigger bucket because the whole point
// of server mode is that one person is using it.
const buckets = new Map();

export function rateLimit({ capacity = 60, perMinute = 60, key = 'default', trustLoopback = true } = {}) {
  const refillPerMs = perMinute / 60000;
  return (req, res, next) => {
    const ip = (req.ip || req.socket?.remoteAddress || 'unknown').replace(/^::ffff:/, '');
    const loopback = ip === '127.0.0.1' || ip === '::1' || ip === 'localhost';
    const cap = trustLoopback && loopback ? capacity * 4 : capacity;
    const id = `${key}:${ip}`;
    const now = Date.now();
    let b = buckets.get(id);
    if (!b) { b = { tokens: cap, last: now }; buckets.set(id, b); }
    b.tokens = Math.min(cap, b.tokens + (now - b.last) * refillPerMs);
    b.last = now;
    if (b.tokens < 1) {
      const retryAfter = Math.ceil((1 - b.tokens) / refillPerMs / 1000);
      res.setHeader('Retry-After', String(retryAfter));
      return res.status(429).json({ ok: false, error: `Too many requests — slow down for ${retryAfter}s.`, retryAfter });
    }
    b.tokens -= 1;
    next();
  };
}

// keep the map from growing without bound on a long-lived process
setInterval(() => {
  const cutoff = Date.now() - 10 * 60 * 1000;
  for (const [k, v] of buckets) if (v.last < cutoff) buckets.delete(k);
}, 60 * 1000).unref?.();

// ── global concurrency cap ────────────────────────────────────
// The AI relay holds a socket for up to 45 s. Without a cap, a burst of
// twenty requests is twenty upstream calls and twenty sockets — a cheap
// way to burn the free quota or stall the box. Excess requests are told
// to wait rather than queued indefinitely.
export function concurrency({ max = 4, name = 'ai' } = {}) {
  let inFlight = 0;
  return (req, res, next) => {
    if (inFlight >= max) {
      res.setHeader('Retry-After', '5');
      return res.status(503).json({
        ok: false,
        error: `The ${name} relay is busy (${inFlight} in flight). Try again in a moment.`,
        fallback: 'rules',
      });
    }
    inFlight += 1;
    let released = false;
    const release = () => { if (!released) { released = true; inFlight -= 1; } };
    res.on('finish', release);
    res.on('close', release);
    next();
  };
}

// ── cached gzip ───────────────────────────────────────────────
// /api/content is ~640 KB of JSON. Compressing it once at boot and
// serving the buffer costs nothing per request and turns it into ~150 KB,
// which also makes the endpoint a much worse amplification target.
const gzipCache = new Map();

export function gzipJSON(route, producer) {
  return (req, res) => {
    const body = JSON.stringify(producer());
    const accepts = String(req.headers['accept-encoding'] || '');
    res.setHeader('Vary', 'Accept-Encoding');
    if (!/\bgzip\b/.test(accepts)) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      return res.send(body);
    }
    let buf = gzipCache.get(route);
    if (!buf) {
      buf = zlib.gzipSync(Buffer.from(body), { level: 9 });
      gzipCache.set(route, buf);
    }
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Content-Length', String(buf.length));
    res.end(buf);
  };
}
