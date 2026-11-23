import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ── dev-only CSP ─────────────────────────────────────────────
// index.html carries the production policy (script-src 'self'). That policy would
// break `npm run dev`, because Vite's dev server injects the React Fast Refresh
// preamble as an INLINE module script and evaluates modules with new Function.
//
// So: open the script policy in dev only, and in production build REMOVE the
// <meta> from index.html entirely. The dist build is served by server/index.js,
// which sends the strict policy as a header; the Pages build (docs/) gets the
// strict policy injected back by the plugin below as a <meta>. One policy, three
// correct places, no drift — test/security.test.mjs pins the two that ship.
const DEV_CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "media-src 'self' blob:",
  "connect-src 'self' ws: http://127.0.0.1:* https://text.pollinations.ai https://openrouter.ai http://127.0.0.1:11434",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

function cspPlugin() {
  let staticBuild = false;
  return {
    name: 'charisma-csp',
    configResolved(config) {
      // VITE_LOCAL marks the GitHub-Pages build: it must ship a meta CSP because
      // there is no server to send a header.
      staticBuild = Boolean(process.env.VITE_LOCAL);
      void config;
    },
    configureServer(server) {
      server.middlewares.use((_req, res, next) => {
        res.setHeader('Content-Security-Policy', DEV_CSP);
        next();
      });
    },
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        const meta = /\n\s*<meta http-equiv="Content-Security-Policy"[^>]*>/;
        if (!staticBuild) return html.replace(meta, '');
        if (meta.test(html)) return html;
        return html.replace(/<meta charset="[^"]*"\s*\/?>/, (m) => `${m}\n    <meta http-equiv="Content-Security-Policy" content="${PROD_CSP}" />`);
      },
    },
  };
}

// the policy that ships in docs/index.html — must stay identical to the header
// server/index.js sends (test/security.test.mjs fails the build check if they drift)
const PROD_CSP =
  "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; img-src 'self' data: blob:; " +
  "font-src 'self' data:; connect-src 'self' https://text.pollinations.ai https://openrouter.ai " +
  "http://127.0.0.1:11434 http://localhost:11434; media-src 'self' blob:; object-src 'none'; " +
  "manifest-src 'self'; worker-src 'self' blob:; base-uri 'self'; form-action 'self'";

export default defineConfig({
  plugins: [react(), cspPlugin()],
  // Project Pages are served from /<repo>/, so asset URLs need that prefix.
  // Set BASE_PATH=/charisma-lab/ when building for GitHub Pages.
  base: process.env.BASE_PATH || '/',
  server: {
    // bind to localhost only: the dev server is for this machine, not the network.
    // (0.0.0.0 exposed the Vite dev server to every device on the wifi.)
    host: '127.0.0.1',
    port: 5173,
    strictPort: false,
    // only answer to these hosts — blocks DNS-rebinding style attacks that point
    // an attacker-controlled domain at your local dev server.
    allowedHosts: ['localhost', '127.0.0.1'],
    proxy: {
      '/api': { target: 'http://127.0.0.1:3000', changeOrigin: true },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Course lessons (315 KB of prose) and the long-form chapters (243 KB)
        // are the two big lazy-loaded halves; everything else stays in the
        // initial bundle so the app is usable immediately.
        manualChunks(id) {
          if (!id.includes('server/content/')) return undefined;
          if (/lessons-(fast|deep)/.test(id)) return 'lessons';
          if (/library-.*deep/.test(id)) return 'chapters';
          return undefined;
        },
      },
    },
  },
});
