// Stamp public/sw.js with the build id so each deploy gets its own cache,
// and copy it into dist/ and docs/ after the build.
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const src = readFileSync(root + 'public/sw.js', 'utf8');
const targets = process.argv.slice(2).length ? process.argv.slice(2) : ['dist', 'docs'];
// Deterministic on purpose. This used to hash Date.now(), which meant every
// rebuild of identical inputs produced a different sw.js — so a CI check that
// rebuilds docs/ and diffs it could never pass, and every push looked like a
// deploy even when nothing had changed. The stamp is now derived from the
// actual build output: if nothing changed, the id does not change.
function buildStamp(dir) {
  const h = createHash('sha1').update(src);
  const assets = root + dir + '/assets';
  if (existsSync(assets)) {
    for (const f of readdirSync(assets).sort()) h.update(f);
  }
  const index = root + dir + '/index.html';
  if (existsSync(index)) h.update(readFileSync(index));
  return h.digest('hex').slice(0, 10);
}
let wrote = 0;
for (const dir of targets) {
  if (!existsSync(root + dir)) continue;
  const hash = buildStamp(dir);
  writeFileSync(root + dir + '/sw.js', src.replace('__BUILD_ID__', hash));
  console.log(`  ${dir}/sw.js ← ${hash}`);
  wrote += 1;
}
console.log(`✓ service worker stamped into ${wrote} build dir(s) — stable across identical rebuilds`);
