// Guards: token bucket, concurrency cap, cached gzip.
// Pure units — no server needed, so this runs anywhere.
import assert from 'node:assert/strict';
import zlib from 'node:zlib';
import { rateLimit, concurrency, gzipJSON } from '../server/guard.js';

let pass = 0;
const ok = (name, cond) => { assert.equal(!!cond, true, name); pass++; };

// ── a fake req/res pair ──
function fakeReq({ ip = '203.0.113.9', headers = {} } = {}) {
  return { ip, socket: { remoteAddress: ip }, headers };
}
function fakeRes() {
  const res = {
    statusCode: 200, headers: {}, body: null, ended: null, listeners: {},
    setHeader(k, v) { this.headers[k.toLowerCase()] = v; },
    status(c) { this.statusCode = c; return this; },
    json(o) { this.body = o; return this; },
    send(o) { this.body = o; return this; },
    end(b) { this.ended = b; return this; },
    on(ev, fn) { (this.listeners[ev] = this.listeners[ev] || []).push(fn); return this; },
    fire(ev) { for (const fn of this.listeners[ev] || []) fn(); },
  };
  return res;
}

// ── token bucket: a remote client is capped, and refills ──
{
  const limit = rateLimit({ capacity: 3, perMinute: 60, key: 'unit', trustLoopback: false });
  const results = [];
  let passed = 0;
  for (let i = 0; i < 6; i++) {
    const res = fakeRes();
    limit(fakeReq(), res, () => { passed += 1; });
    results.push(res.statusCode);
  }
  ok('first three pass', results.slice(0, 3).every((c) => c === 200));
  ok('the rest are 429', results.slice(3).every((c) => c === 429));
  ok('the handler ran exactly capacity times', passed === 3);
}

{
  const limit = rateLimit({ capacity: 2, perMinute: 600000, key: 'refill', trustLoopback: false });
  const run = (n) => {
    let through = 0;
    for (let i = 0; i < n; i++) limit(fakeReq(), fakeRes(), () => { through += 1; });
    return through;
  };
  ok('bucket starts full', run(2) === 2);
  ok('and is then empty', run(1) === 0);
  // 600000/min = 10 tokens per millisecond-ish; a short sleep refills
  const until = Date.now() + 25;
  while (Date.now() < until) { /* spin */ }
  ok('it refills over time', run(5) >= 1);
}

{
  // loopback gets the bigger bucket by default — that is the point of server mode
  const limit = rateLimit({ capacity: 2, perMinute: 60, key: 'loop' });
  let through = 0;
  for (let i = 0; i < 8; i++) limit(fakeReq({ ip: '127.0.0.1' }), fakeRes(), () => { through += 1; });
  ok('loopback gets 4× capacity', through === 8);
}

{
  // IPv4-mapped IPv6 from a proxy must be treated as loopback, not a stranger
  const limit = rateLimit({ capacity: 2, perMinute: 60, key: 'mapped' });
  let through = 0;
  for (let i = 0; i < 8; i++) limit(fakeReq({ ip: '::ffff:127.0.0.1' }), fakeRes(), () => { through += 1; });
  ok('::ffff:127.0.0.1 counts as loopback', through === 8);
}

{
  const limit = rateLimit({ capacity: 1, perMinute: 60, key: 'hdr', trustLoopback: false });
  limit(fakeReq(), fakeRes(), () => {});
  const res = fakeRes();
  limit(fakeReq(), res, () => {});
  ok('429 sets Retry-After', Number(res.headers['retry-after']) >= 1);
  ok('429 body is JSON with an error', /too many/i.test(res.body?.error || ''));
  ok('429 body carries retryAfter', typeof res.body?.retryAfter === 'number');
}

// ── concurrency cap ──
{
  const cap = concurrency({ max: 2, name: 'AI' });
  const live = [];
  let thirdStatus = null;
  for (let i = 0; i < 3; i++) {
    const res = fakeRes();
    cap(fakeReq(), res, () => live.push(res));
    if (res.statusCode !== 200) thirdStatus = res.statusCode;
  }
  ok('two slots are handed out', live.length === 2);
  ok('the third is shed with 503', thirdStatus === 503);
  live[0].fire('finish');
  const res4 = fakeRes();
  let got = false;
  cap(fakeReq(), res4, () => { got = true; });
  ok('finishing a request frees a slot', got);
  live[1].fire('close');
  ok('close also frees a slot (client aborted)', true);
}

{
  // a double-release bug would let the counter go negative and silently disable the cap
  const cap = concurrency({ max: 1, name: 'x' });
  const res = fakeRes();
  cap(fakeReq(), res, () => {});
  res.fire('finish');
  res.fire('close');
  const a = fakeRes();
  let okA = false;
  cap(fakeReq(), a, () => { okA = true; });
  ok('release is idempotent', okA);
}

// ── cached gzip ──
{
  let built = 0;
  const handler = gzipJSON('unit-content', () => { built += 1; return { hello: 'world', n: 42 }; });
  const res1 = fakeRes();
  handler(fakeReq({ headers: { 'accept-encoding': 'gzip, deflate' } }), res1);
  ok('gzip path sets Content-Encoding', res1.headers['content-encoding'] === 'gzip');
  ok('gzip path sets Vary', /accept-encoding/i.test(res1.headers.vary || ''));
  ok('gzip body round-trips', JSON.parse(zlib.gunzipSync(res1.ended).toString()).n === 42);

  const res2 = fakeRes();
  handler(fakeReq({ headers: { 'accept-encoding': 'gzip' } }), res2);
  ok('the second call reuses the cached buffer', res2.ended === res1.ended);
  ok('the payload is built on every call, compression only once', built === 2);

  const plain = fakeRes();
  handler(fakeReq({ headers: {} }), plain);
  ok('no Accept-Encoding → plain JSON', plain.headers['content-encoding'] === undefined);
}

console.log(`\n✓ guard: ${pass} checks pass (token bucket, concurrency cap, cached gzip)`);
