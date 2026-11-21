// Runs the API server and the Vite dev server together: npm run dev
import { spawn } from 'node:child_process';

const procs = [
  { name: 'api', cmd: 'node', args: ['server/index.js'], color: '\x1b[35m' },
  { name: 'web', cmd: 'npx', args: ['vite'], color: '\x1b[36m' },
];

const children = procs.map(({ name, cmd, args, color }) => {
  const child = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'], shell: process.platform === 'win32' });
  const tag = `${color}[${name}]\x1b[0m `;
  const pipe = (stream, out) => stream.on('data', (d) => {
    String(d).split('\n').filter(Boolean).forEach((l) => out.write(tag + l + '\n'));
  });
  pipe(child.stdout, process.stdout);
  pipe(child.stderr, process.stderr);
  child.on('exit', (code) => {
    if (code !== 0 && code !== null) console.log(`${tag}exited with ${code}`);
    shutdown();
  });
  return child;
});

let closing = false;
function shutdown() {
  if (closing) return;
  closing = true;
  children.forEach((c) => { try { c.kill('SIGTERM'); } catch {} });
  setTimeout(() => process.exit(0), 300);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
