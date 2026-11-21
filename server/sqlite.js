// SQLite driver with a graceful fallback.
//
// Primary:   better-sqlite3  — fastest, prebuilt binaries for most platforms.
// Fallback:  node:sqlite     — built into Node 22.13+ / 23.4+ / 24+, no native build.
//
// The fallback exists because a machine without a matching prebuild has to compile
// better-sqlite3 from source with node-gyp, which needs python + a C/C++ toolchain
// and still fails often on newer Node. Node's built-in module needs nothing at all.
//
// Note the two-stage check: better-sqlite3's JavaScript wrapper imports cleanly
// even when its native addon can't load — the dlopen error only surfaces when the
// database is constructed. So we test construction, not just import.
//
// The adapter exposes the slice of the better-sqlite3 API this app uses:
// exec / pragma / prepare().get|all|run / close.

class NodeSqliteAdapter {
  constructor(Ctor, file) {
    this.driver = 'node:sqlite';
    this.db = new Ctor(file);
  }

  exec(sql) {
    this.db.exec(sql);
    return this;
  }

  // better-sqlite3's db.pragma('x = y') → plain PRAGMA statement here.
  pragma(stmt) {
    this.db.exec(`PRAGMA ${stmt}`);
    return this;
  }

  prepare(sql) {
    const stmt = this.db.prepare(sql);
    return {
      get: (...args) => stmt.get(...args),
      all: (...args) => stmt.all(...args),
      run: (...args) => {
        const r = stmt.run(...args);
        // normalise BigInt → Number so JSON responses and arithmetic behave
        return {
          changes: Number(r.changes ?? 0),
          lastInsertRowid: Number(r.lastInsertRowid ?? 0),
        };
      },
    };
  }

  close() {
    this.db.close();
  }
}

export async function openDb(file, { quiet = false } = {}) {
  let nativeErr = null;

  try {
    const mod = await import('better-sqlite3');
    const db = new mod.default(file);
    db.driver = 'better-sqlite3';
    return db;
  } catch (e) {
    nativeErr = e;
  }

  try {
    const { DatabaseSync } = await import('node:sqlite');
    const db = new NodeSqliteAdapter(DatabaseSync, file);
    if (!quiet) {
      console.log(`[db] better-sqlite3 unavailable (${nativeErr.code || 'load error'}) → using built-in node:sqlite`);
    }
    return db;
  } catch (e2) {
    console.error(
      '\nNo SQLite driver available.\n' +
        `  better-sqlite3: ${nativeErr.code || nativeErr.message}\n` +
        `  node:sqlite:    ${e2.code || e2.message} (needs Node 22.13+ / 24+; this is ${process.version})\n\n` +
        '  Fix with ONE of:\n' +
        '    1) Use Node 22.13+ / 24+\n' +
        '    2) Rebuild the native module (needs python + a C/C++ toolchain):\n' +
        '       npm rebuild better-sqlite3\n'
    );
    throw nativeErr;
  }
}
