// Quick environment check: node version, SQLite driver, paths, build state.
// Run with: npm run doctor
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const line = (k, v) => console.log(`  ${k.padEnd(16)} ${v}`);

console.log('\nCharisma Lab - environment\n');
line('node', process.version);
line('platform', `${process.platform} ${process.arch}`);
line('port', process.env.PORT || '3000 (default)');
line('data dir', process.env.DATA_DIR || path.join(root, 'data'));

const { openDb } = await import('../server/sqlite.js');
const tmp = path.join(root, 'data', '.doctor.db');
fs.mkdirSync(path.dirname(tmp), { recursive: true });
try {
  const db = await openDb(tmp, { quiet: true });
  line('sqlite driver', db.driver);
  db.exec('CREATE TABLE IF NOT EXISTS t(a INTEGER)');
  db.prepare('INSERT INTO t VALUES (?)').run(1);
  const row = db.prepare('SELECT count(*) AS n FROM t').get();
  line('sqlite write', row.n >= 1 ? 'ok' : 'FAILED');
  db.close();
} catch (e) {
  line('sqlite', 'FAILED - ' + (e.code || e.message));
  process.exitCode = 1;
} finally {
  for (const f of [tmp, tmp + '-wal', tmp + '-shm']) { try { fs.unlinkSync(f); } catch {} }
}

const dist = path.join(root, 'dist', 'index.html');
line('build', fs.existsSync(dist) ? 'dist/ present' : 'missing - run npm run build');
const l1 = await import('../server/content/lessons-fast.js');
const l2 = await import('../server/content/lessons-deep.js');
const l3 = await import('../server/content/lessons-deep-2.js');
const l4 = await import('../server/content/lessons-deep-3.js');
const c1 = await import('../server/content/library-deep.js');
const c2 = await import('../server/content/library-deep-2.js');
const c3 = await import('../server/content/library-deep-3.js');
const lessons = l1.FAST_LESSONS.length + l2.ARCHIVE_LESSONS.length + l3.BATCH2.length + l4.BATCH3.length;
const chapters = Object.keys({ ...c1.LIBRARY_DEEP, ...c2.LIBRARY_DEEP_2, ...c3.LIBRARY_DEEP_3 }).length;
line('content', `${lessons} lessons, ${chapters} chapters`);
console.log('');
