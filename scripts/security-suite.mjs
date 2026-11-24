// ─────────────────────────────────────────────────────────────
//  Security suite runner
//
//  `test/security.test.mjs` needs a live server, and about a third of its
//  checks are "this malformed body is rejected" — which cannot pass if the
//  request is refused by the rate limiter first. Pointing the suite at the
//  dev server made it pass or fail depending on whatever else had been
//  requested in the last minute, and running it twice in a row failed the
//  second time. It now starts its own server on a spare port with a throwaway
//  database, runs the suite against it, and shuts it down.
// ─────────────────────────────────────────────────────────────
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const PORT = Number(process.env.SECURITY_PORT || 3910);
const base = `http://127.0.0.1:${PORT}`;
const dataDir = mkdtempSync(join(tmpdir(), 'cl-sec-'));

const server = spawn(process.execPath, ['server/index.js'], {
  cwd: root,
  env: { ...process.env, PORT: String(PORT), HOST: '127.0.0.1', DATA_DIR: dataDir },
  stdio: 'ignore',
});

let up = false;
for (let i = 0; i < 60 && !up; i++) {
  await new Promise((r) => setTimeout(r, 250));
  up = await fetch(base + '/api/health').then((r) => r.ok).catch(() => false);
}
if (!up) {
  server.kill('SIGKILL');
  console.error(`✗ could not start a server on ${base}`);
  process.exit(1);
}

const suite = spawn(process.execPath, ['test/security.test.mjs'], {
  cwd: root,
  env: { ...process.env, BASE: base },
  stdio: 'inherit',
});

const code = await new Promise((resolve) => suite.on('exit', resolve));
server.kill('SIGKILL');
try { rmSync(dataDir, { recursive: true, force: true }); } catch { /* best effort */ }
process.exit(code ?? 1);
