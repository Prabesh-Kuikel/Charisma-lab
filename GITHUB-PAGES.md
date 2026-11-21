# Deploying the UI on GitHub Pages

**Update: Pages can now host the whole app.** The `VITE_LOCAL=1` build moves content,
analysis, the coach and progress into the browser (`localStorage`), so there is no API to
place anywhere. The workflow already sets that flag — push and it works.

What you give up is cross-device sync: progress is per-browser. If you want one shared
history, keep reading — the split setup below still works.

---

## What's already wired up

- `vite.config.js` reads `BASE_PATH`, so a project site served from
  `https://USER.github.io/charisma-lab/` gets correct asset URLs.
- `src/api.js` reads `VITE_API_URL`; unset means "same origin" (normal `npm start`).
- `.github/workflows/pages.yml` builds and publishes on every push to `main`.

Verified locally:

```
BASE_PATH=/charisma-lab/ → index.html references /charisma-lab/assets/index-*.js
VITE_API_URL=https://xxx.onrender.com → baked into the bundle
```

---

## Steps

### 1. Run an API somewhere reachable over HTTPS

Pages is served from `https://`, so the API must be too — a browser will block a `http://`
API as mixed content. Your phone tunnel (`https://…lhr.life`) works, Render works, a VPS
with Caddy works. Nothing else needs changing: `app.use(cors())` is already open, so the
Pages origin is allowed.

Note the base URL **without** `/api` — e.g. `https://charisma-api.onrender.com`.

### 2. Add it as a repository variable

GitHub → repo → **Settings → Secrets and variables → Actions → Variables → New variable**

- Name: `VITE_API_URL`
- Value: your API origin (as above)

### 3. Enable Pages

**Settings → Pages → Build and deployment → Source: GitHub Actions**

### 4. Push

```bash
git add -A
git commit -m "Add GitHub Pages deployment"
git push
```

The workflow builds and publishes; the site lands at
`https://YOUR-USERNAME.github.io/charisma-lab/`.

---

## The honest trade-offs

| | GitHub Pages | Render / phone tunnel |
|---|---|---|
| Hosts the API | ❌ | ✅ |
| Cost | free, no card | free tier / free |
| Your streak persisted | ✅ — but in the API host's SQLite, not on Pages | ✅ |
| Works with phone off | only if the API host is always on | depends on host |
| Cold starts | none (static CDN) | 15 min sleep on Render free |

Two things to be clear about:

1. **The Pages site itself stores nothing.** Open it with the API down and you get
   "Backend not reachable". The UI is only as live as the API behind it.
2. **Pages cannot host the API.** If you want one host that does everything, that's Render
   (or any VPS) — not Pages.

---

## The alternative: make it a real static app

If the appeal is "no server at all, ever, free forever", there is a bigger version of this:
bundle the content at build time and move persistence into the browser (`localStorage` /
IndexedDB), replacing the API layer with a local module. Content is already plain JS
modules under `server/content/`, and `server/analysis.js` is pure functions, so most of it
transfers.

What that costs: roughly 2–3 hours, and the analysis + arena engines need extracting from
`server/index.js`. What you lose: cross-device sync (phone progress won't appear on a
laptop), and the SQLite history. What you gain: genuinely free, permanently live static
hosting with no cold starts and no server to maintain.

Ask and I'll build it as a separate `web/` target so `npm start` keeps working unchanged.
