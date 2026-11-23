// Security checks that run against the live server (start it first: npm start).
// Covers: headers, CSP, body-size limits, input handling, path traversal,
// unknown-route behaviour and the fact that no secret is ever served to the browser.
const BASE = process.env.BASE || 'http://127.0.0.1:3000';
const problems = [];
const check = (ok, msg) => { if (!ok) problems.push(msg); };
const get = (p, o) => fetch(BASE + p, o);

// ── 1. security headers ──
const root = await get('/');

// ── 1a. no inline script anywhere in the served document (CSP would block it) ──
const rootHtml = await root.text();
const inlineScripts = [...rootHtml.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].filter((m) => m[1].trim());
console.log('inline scripts in the served page:', inlineScripts.length);
check(inlineScripts.length === 0, `the page contains ${inlineScripts.length} inline script block(s); CSP script-src 'self' would block them`);

// ── 1b. every asset the page references actually loads ──
const assetRefs = [...rootHtml.matchAll(/(?:src|href)="(\/[^"]+)"/g)].map((m) => m[1]);
console.log('assets referenced:', assetRefs.join(' '));
check(assetRefs.length > 0, 'the served page references no assets at all');
for (const a of assetRefs) {
  const r = await get(a);
  check(r.status === 200, `referenced asset ${a} returned ${r.status}`);
}
// ── 1c. traversal must not leak a file, whatever the status code ──

const h = root.headers;
const csp = h.get('content-security-policy') || '';
console.log('STATUS', root.status);
console.log('CSP:', csp.slice(0, 120) + '…');
check(h.get('x-content-type-options') === 'nosniff', 'missing X-Content-Type-Options: nosniff');
check(h.get('x-frame-options') === 'DENY', 'missing X-Frame-Options: DENY');
check(/frame-ancestors 'none'/.test(csp), "CSP missing frame-ancestors 'none'");
check(/object-src 'none'/.test(csp), "CSP missing object-src 'none'");
check(/script-src 'self'/.test(csp), "CSP must restrict scripts to 'self'");
check(!/script-src[^;]*https?:/.test(csp), 'CSP must not allow an external script origin');
check(/worker-src 'self' blob:/.test(csp), 'CSP must allow the recitation worker (self + blob)');
check(/base-uri 'self'/.test(csp), "CSP missing base-uri 'self'");
check(h.get('referrer-policy') === 'no-referrer', 'missing Referrer-Policy');
check(!h.get('x-powered-by'), 'x-powered-by leaks the framework — should be disabled');

// ── 2. body size limit ──
const big = 'x'.repeat(400 * 1024);
const tooBig = await get('/api/coach', {
  method: 'POST', headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ message: big, mode: 'general' }),
});
console.log('400KB body →', tooBig.status);
check(tooBig.status === 413, `oversized body should be rejected with 413, got ${tooBig.status}`);

// ── 3. malformed JSON must not 500 ──
const bad = await get('/api/coach', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{oops' });
console.log('malformed JSON →', bad.status);
check(bad.status >= 400 && bad.status < 500, `malformed JSON should be a 4xx, got ${bad.status}`);

// ── 4. path traversal ──
for (const p of ['/../../etc/passwd', '/..%2f..%2fetc%2fpasswd', '/api/../../../etc/passwd']) {
  const r = await get(p);
  const t = await r.text();
  const leaked = /root:x:0:0/.test(t);
  console.log(`traversal ${p} → ${r.status}${leaked ? ' LEAK!' : ''}`);
  check(!leaked, `path traversal leaked /etc/passwd via ${p}`);
}

// ── 5. no secrets in any client payload ──
const content = await get('/api/content');
const ctext = await content.text();
const status = await get('/api/ai/status');
const stext = await status.text();
const sj = JSON.parse(stext);
console.log('ai/status keys:', Object.keys(sj).join(','));
check(!/sk-[A-Za-z0-9]{16,}/.test(ctext + stext), 'an API-key-shaped string was served to the client');
check(sj.hasKey === false || typeof sj.hasKey === 'boolean', 'ai/status must report whether a key exists, not the key');
check(!JSON.stringify(sj.providers || []).includes('apiKey'), 'provider list must not include key material');

// ── 6. AI route input hardening ──
const many = Array.from({ length: 40 }, (_, i) => ({ role: 'user', content: `msg ${i}` }));
const r1 = await get('/api/ai/chat', {
  method: 'POST', headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ messages: many, system: 'x', provider: 'nope-not-a-provider' }),
});
const j1 = await r1.json().catch(() => ({}));
console.log('ai/chat with 40 messages + bad provider →', r1.status, j1.ok === false ? '(graceful)' : '');
check(r1.status < 500, `ai/chat should never 500 on bad input, got ${r1.status}`);
check(j1.ok !== true || typeof j1.text === 'string', 'ai/chat returned an unexpected shape');

// ── 7. unknown api routes are JSON 404s, not the SPA shell ──
const nf = await get('/api/does-not-exist');
const nft = await nf.text();
console.log('/api/does-not-exist →', nf.status);
check(nf.status === 404, `unknown api route should 404, got ${nf.status}`);
check(!/<div id="root">/.test(nft), 'unknown api routes must not fall through to the SPA shell');

// ── 8. progress endpoints reject nonsense ──
const badXp = await get('/api/activity', {
  method: 'POST', headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ kind: '<script>alert(1)</script>', xp: -99999 }),
});
const bxt = await badXp.text();
console.log('/api/activity with junk kind →', badXp.status);
check(badXp.status < 500, `activity endpoint should not 500 on junk, got ${badXp.status}`);
check(!/<script>/.test(bxt), 'input was reflected unescaped into the response');

// ── 9. SSRF: the AI relay must never dial a URL supplied by the caller ──
// This was a real hole: POST {baseUrl:"http://127.0.0.1:<port>/api/user"} made the
// server fetch its own internal route and hand the body back to the caller.
for (const target of [
  'http://127.0.0.1:' + (process.env.PORT || 3000) + '/api/user',
  'http://169.254.169.254/latest/meta-data/',
  'file:///etc/passwd',
]) {
  const r = await get('/api/ai/chat', {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }], baseUrl: target, provider: 'compatible' }),
  });
  const t = await r.text();
  const leaked = /"name"\s*:|root:x:0:0|ami-id|instance-id/.test(t);
  console.log(`SSRF ${target.slice(0, 42)} → ${r.status}${leaked ? ' RELAYED INTERNAL DATA' : ''}`);
  check(!leaked, `the AI relay fetched caller-supplied URL ${target} and returned its body`);
}

// ── 10. CORS must not be a wildcard ──
// A wildcard let any site the user visited read /api/sessions and reset progress.
const evil = await fetch(BASE + '/api/user', { headers: { origin: 'https://evil.example' } });
const evilAcao = evil.headers.get('access-control-allow-origin');
console.log('CORS from https://evil.example →', evilAcao || '(no ACAO header)');
check(!evilAcao || evilAcao === 'null', `CORS is open to arbitrary origins (${evilAcao})`);

const same = await fetch(BASE + '/api/user', { headers: { origin: BASE } });
console.log('CORS from same origin →', same.headers.get('access-control-allow-origin'));
check(same.headers.get('access-control-allow-origin') === BASE, 'same-origin CORS should be allowed');

// ── 11. a preflight from a foreign origin must not be blessed ──
const pre = await fetch(BASE + '/api/ai/chat', {
  method: 'OPTIONS',
  headers: { origin: 'https://evil.example', 'access-control-request-method': 'POST' },
});
const preAcao = pre.headers.get('access-control-allow-origin');
console.log('preflight from evil origin →', pre.status, preAcao || '(no ACAO)');
check(!preAcao || preAcao === 'null', `preflight blessed a foreign origin (${preAcao})`);

// ── 12. responses must not be cached by proxies ──
const nocache = (await get('/api/bootstrap')).headers.get('cache-control') || '';
console.log('cache-control on /api/bootstrap →', nocache);
check(/no-store/.test(nocache), `API responses should be no-store, got "${nocache}"`);

// ── 13. ai/status must not echo the configured upstream URL ──
check(!('baseUrl' in sj), 'ai/status leaks the configured baseUrl');
check(!('key' in sj), 'ai/status leaks the key field');

// ── 14. /api/content is compressed and still valid ──
const gz = await fetch(BASE + '/api/content', { headers: { 'accept-encoding': 'gzip' } });
const gzLen = Number(gz.headers.get('content-length') || 0);
const encoding = gz.headers.get('content-encoding');
await gz.arrayBuffer();
console.log(`/api/content → encoding=${encoding} bytes=${gzLen}`);
check(encoding === 'gzip', 'the 640 KB content payload should be gzipped');
check(gzLen > 0 && gzLen < 400000, `content should compress well below 400 KB, got ${gzLen}`);

// ── 15. the AI relay sheds load instead of opening unlimited sockets ──
const burst = [];
for (let i = 0; i < 10; i++) {
  burst.push(get('/api/ai/chat', {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ messages: [{ role: 'user', content: 'hi' }] }),
  }).then((r) => r.status).catch(() => 'err'));
}
const codes = await Promise.all(burst);
const shed = codes.filter((c) => c === 503).length;
console.log('ai/chat burst of 10 →', codes.join(' '));
check(shed >= 1, 'a burst of 10 AI calls should shed some as 503 rather than all hitting upstream');

// ── 16. the static build (docs/) must be as locked down as the server ──
// The Pages build has no server to set headers, so the CSP and referrer policy
// have to exist as <meta> tags. If they drift, the public site silently loses
// everything sections 1–15 just proved.
import { readFileSync } from 'node:fs';
const docsHtml = readFileSync(new URL('../docs/index.html', import.meta.url), 'utf8');
const metaCsp = (docsHtml.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)"/) || [])[1] || '';
console.log('static build meta CSP:', metaCsp ? 'present' : 'MISSING');
check(!!metaCsp, 'docs/index.html has no Content-Security-Policy meta tag');
check(/object-src 'none'/.test(metaCsp), "static CSP missing object-src 'none'");
check(/base-uri 'self'/.test(metaCsp), "static CSP missing base-uri 'self'");
check(/form-action 'self'/.test(metaCsp), "static CSP missing form-action 'self'");
check(/connect-src 'self'[^;]*text\.pollinations\.ai/.test(metaCsp), 'static CSP must still allow the keyless AI provider');
check(!/script-src[^;]*https?:/.test(metaCsp), 'static CSP must not allow an external script origin');
check(/name="referrer" content="strict-origin-when-cross-origin"/.test(docsHtml), 'static build missing a referrer policy meta tag');

// the CSP the server sends and the CSP baked into the static build must not drift
const serverCsp = (csp.match(/script-src[^;]+/) || [''])[0];
const staticScript = (metaCsp.match(/script-src[^;]+/) || [''])[0];
check(serverCsp.trim() === staticScript.trim(), `server CSP script-src "${serverCsp}" drifts from static "${staticScript}"`);

// no CDN scripts anywhere in the built page
const externalScripts = [...docsHtml.matchAll(/<script[^>]*\bsrc="(https?:)?\/\/[^"]+"/g)].map((m) => m[1]);
check(externalScripts.length === 0, `docs/index.html loads ${externalScripts.length} external script(s)`);
// every asset in the built page must be a relative path, or Pages breaks on a subpath
const absAssets = [...docsHtml.matchAll(/(?:src|href)="(\/(?!\/)[^"]+)"/g)].map((m) => m[1]);
check(absAssets.length === 0, `docs/index.html references root-absolute asset(s): ${absAssets.join(', ')}`);

// ── 17. the security screen doc: every fix in this file has to be reachable ──
// (guards against re-introducing a wildcard CORS or a caller-supplied baseUrl)
const serverSrc = readFileSync(new URL('../server/index.js', import.meta.url), 'utf8');
check(!/^\s*app\.use\(cors\(\)\)/m.test(serverSrc), 'server/index.js has a wildcard app.use(cors()) again');
check(!/body\.baseUrl|payload\.baseUrl|req\.body\.baseUrl/.test(serverSrc), 'a caller-supplied baseUrl is reaching the AI relay again');

console.log(problems.length ? `\n✗ ${problems.length} problem(s)` : '\n✓ security checks pass');
for (const p of problems) console.log('   ·', p);
process.exit(problems.length ? 1 : 0);
