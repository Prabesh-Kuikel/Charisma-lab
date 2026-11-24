// ─────────────────────────────────────────────────────────────
//  Post-build pass for the GitHub Pages bundle
//  Two things had to be done by hand after every `build:pages`, and a
//  hand-done step is a step that gets forgotten in a hurry:
//    1. Vite emits `crossorigin` on the module script and the stylesheet.
//       Harmless on a server that sends no CORS headers, but it turns a
//       plain stylesheet fetch into a CORS fetch, so a hosting mistake
//       (or an S3-style bucket) silently strips the CSS.
//    2. The CSP meta tag has to survive the build and stay identical to the
//       one the Express server sends, or the two deployment modes drift.
//  This script enforces both and fails the build rather than shipping a
//  bundle that renders unstyled.
// ─────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const docsPath = fileURLToPath(new URL('docs/index.html', root));
const srcPath = fileURLToPath(new URL('index.html', root));

if (!existsSync(docsPath)) {
  console.error('✗ docs/index.html is missing — run build:pages first');
  process.exit(1);
}

let html = readFileSync(docsPath, 'utf8');
const problems = [];

// 1. drop crossorigin: every asset is same-origin and relative
const before = (html.match(/\scrossorigin(="[^"]*")?/g) || []).length;
html = html.replace(/\scrossorigin(="[^"]*")?/g, '');
if (before) console.log(`  stripped ${before} crossorigin attribute(s)`);

// 2. the security policy must be present, and must match the source document
const metaCsp = /<meta http-equiv="Content-Security-Policy" content="([^"]+)"/.exec(html);
if (!metaCsp) {
  problems.push('docs/index.html has no Content-Security-Policy meta tag');
} else {
  const srcHtml = readFileSync(srcPath, 'utf8');
  const srcCsp = /<meta http-equiv="Content-Security-Policy" content="([^"]+)"/.exec(srcHtml);
  if (srcCsp && srcCsp[1] !== metaCsp[1]) {
    problems.push('the built CSP differs from index.html — the server and static builds have drifted');
  }
  if (!/script-src 'self'/.test(metaCsp[1])) problems.push("CSP does not restrict scripts to 'self'");
  if (/script-src[^;]*https?:/.test(metaCsp[1])) problems.push('CSP allows an external script origin');
}
if (!/name="referrer" content="strict-origin-when-cross-origin"/.test(html)) {
  problems.push('the built page lost its referrer policy meta tag');
}

// 3. a GitHub Pages build must never reference a root-absolute asset
const abs = [...html.matchAll(/(?:src|href)="(\/(?!\/)[^"]*)"/g)].map((m) => m[1]);
if (abs.length) problems.push(`root-absolute asset path(s): ${abs.join(', ')}`);

// 4. no inline script (the CSP would block it anyway, so catch it at build time)
const inline = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].filter((m) => m[1].trim());
if (inline.length) problems.push(`${inline.length} inline script block(s) in the built page`);

writeFileSync(docsPath, html);

if (problems.length) {
  console.error('\n✗ static build is not shippable:');
  for (const p of problems) console.error('   ·', p);
  process.exit(1);
}
const kb = (Buffer.byteLength(html) / 1024).toFixed(1);
console.log(`✓ docs/index.html is shippable (${kb} kB, CSP intact, relative assets only)`);
