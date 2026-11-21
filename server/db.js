import { openDb } from './sqlite.js';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '..', 'data');
fs.mkdirSync(DATA_DIR, { recursive: true });

let db;
try {
  db = await openDb(path.join(DATA_DIR, 'charisma.db'));
} catch (err) {
  // Both drivers failed: say what to do, do not dump a stack trace.
  console.error('\n  Charisma Lab cannot start: no usable SQLite driver.\n');
  process.exit(1);
}
export { db };
console.log(`[db] driver: ${db.driver} · ${path.join(DATA_DIR, 'charisma.db')}`);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Speaker',
  xp INTEGER NOT NULL DEFAULT 0,
  goal TEXT NOT NULL DEFAULT 'Presence',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS activity (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  day TEXT NOT NULL,
  kind TEXT NOT NULL,
  xp INTEGER NOT NULL DEFAULT 0,
  UNIQUE(user_id, day, kind) ON CONFLICT IGNORE,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS progress (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  track TEXT NOT NULL,
  day INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'done',
  score INTEGER,
  notes TEXT,
  completed_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, track, day) ON CONFLICT IGNORE,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  kind TEXT NOT NULL,
  ref TEXT,
  score INTEGER,
  payload TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id, kind, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_user ON activity(user_id, day);
`);

export function ensureUser() {
  const existing = db.prepare('SELECT * FROM users ORDER BY id LIMIT 1').get();
  if (existing) return existing;
  const info = db.prepare("INSERT INTO users (name, goal) VALUES ('Speaker', 'Presence')").run();
  return db.prepare('SELECT * FROM users WHERE id = ?').get(info.lastInsertRowid);
}

export const today = () => new Date().toISOString().slice(0, 10);

export function logActivity(userId, kind, xp = 0) {
  db.prepare('INSERT INTO activity (user_id, day, kind, xp) VALUES (?,?,?,?)').run(userId, today(), kind, xp);
  if (xp) db.prepare('UPDATE users SET xp = xp + ? WHERE id = ?').run(xp, userId);
}

export function activityDays(userId, limit = 120) {
  return db.prepare('SELECT day, SUM(xp) AS xp, COUNT(*) AS sessions FROM activity WHERE user_id = ? GROUP BY day ORDER BY day DESC LIMIT ?')
    .all(userId, limit);
}

export function streakOf(days) {
  // days: array of {day} descending
  const set = new Set(days.map((d) => d.day));
  let streak = 0;
  const cur = new Date();
  // allow today OR yesterday to start the streak
  const fmt = (dt) => dt.toISOString().slice(0, 10);
  if (!set.has(fmt(cur))) {
    cur.setDate(cur.getDate() - 1);
    if (!set.has(fmt(cur))) return { current: 0, longest: longestStreak(set) };
  }
  while (set.has(fmt(cur))) {
    streak++;
    cur.setDate(cur.getDate() - 1);
  }
  return { current: streak, longest: Math.max(streak, longestStreak(set)) };
}

function longestStreak(set) {
  const sorted = [...set].sort();
  let best = 0, run = 0, prev = null;
  for (const d of sorted) {
    if (prev) {
      const pd = new Date(prev + 'T00:00:00Z');
      pd.setUTCDate(pd.getUTCDate() + 1);
      run = pd.toISOString().slice(0, 10) === d ? run + 1 : 1;
    } else run = 1;
    best = Math.max(best, run);
    prev = d;
  }
  return best;
}

export function progressFor(userId) {
  return db.prepare('SELECT track, day, status, score, notes, completed_at FROM progress WHERE user_id = ? ORDER BY day').all(userId);
}

export function saveSession(userId, kind, ref, score, payload) {
  const info = db.prepare('INSERT INTO sessions (user_id, kind, ref, score, payload) VALUES (?,?,?,?,?)')
    .run(userId, kind, ref ?? null, score ?? null, JSON.stringify(payload ?? {}));
  return info.lastInsertRowid;
}

export function getSession(userId, id) {
  return db.prepare('SELECT * FROM sessions WHERE user_id = ? AND id = ?').get(userId, id);
}

export function updateSession(id, score, payload) {
  db.prepare('UPDATE sessions SET score = ?, payload = ? WHERE id = ?').run(score ?? null, JSON.stringify(payload), id);
}

export function recentSessions(userId, limit = 20) {
  return db.prepare('SELECT id, kind, ref, score, created_at FROM sessions WHERE user_id = ? ORDER BY created_at DESC LIMIT ?')
    .all(userId, limit);
}

export function statsFor(userId) {
  const days = activityDays(userId, 400);
  const streak = streakOf(days);
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
  const byKind = db.prepare('SELECT kind, COUNT(*) n, AVG(score) avg FROM sessions WHERE user_id = ? GROUP BY kind').all(userId);
  const best = db.prepare('SELECT kind, MAX(score) best FROM sessions WHERE user_id = ? GROUP BY kind').all(userId);
  const prog = progressFor(userId);
  const level = Math.floor((user.xp || 0) / 500) + 1;
  return {
    user: { id: user.id, name: user.name, xp: user.xp, goal: user.goal, created_at: user.created_at },
    streak,
    level,
    xpToNext: 500 - ((user.xp || 0) % 500),
    levelProgress: ((user.xp || 0) % 500) / 500,
    days,
    byKind, best, progress: prog,
    totalSessions: byKind.reduce((a, b) => a + b.n, 0),
  };
}
