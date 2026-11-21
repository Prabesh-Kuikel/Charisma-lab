# Getting Charisma Lab onto GitHub

The project is now a **git repository with a clean initial commit** — 44 tracked files,
304 KB of source. Nothing is on GitHub yet: this sandbox has no GitHub access and no
credentials, so the push has to happen from a machine that's signed in as you.

Your `.gitignore` already keeps out the things you don't want in a repo:

```
node_modules   dependencies (reinstall with npm install)
dist           build output (regenerate with npm run build)
data           charisma.db — your local progress/streak database
test/app.mjs   generated test bundle
```

## Option A — from exported files (easiest, no git knowledge)

1. Download `charisma-lab-source.zip` from the workspace.
2. On GitHub: **New repository** → name it `charisma-lab` → don't add a README (you have one).
3. Unzip locally, then in that folder:

```bash
git init -b main
git add -A
git commit -m "Charisma Lab: 8-feature charisma trainer"
git remote add origin https://github.com/YOUR-USERNAME/charisma-lab.git
git push -u origin main
```

## Option B — from the git bundle (keeps the existing commit and history)

```bash
git clone charisma-lab.bundle charisma-lab
cd charisma-lab
git remote set-url origin https://github.com/YOUR-USERNAME/charisma-lab.git
git push -u origin main
```

## Option C — upload through the browser

GitHub supports dragging a folder into the web uploader. Drop the unzipped project
in, but skip `node_modules/`, `dist/` and `data/` — GitHub's web UI will happily
accept a 100 MB `node_modules` and you don't want that.

## After the first push, anyone who clones runs

```bash
npm install
npm run build
npm start          # http://localhost:3000
```

`npm install` needs to build `better-sqlite3` natively; it works on Node 20+.

## Nice to add once it's up

- **Repo description:** "8-module charisma trainer — 120 written lessons, 41 long-form library chapters, deterministic speech analysis."
- **Topics:** `react`, `express`, `sqlite`, `charisma`, `public-speaking`, `training`.
- A screenshot or two in the README — the dark dashboard and the lesson reader are the
  best-looking views.
- If you want a public demo, Render or Fly.io both run an Express + SQLite app with
  almost no config. Note that `better-sqlite3` writes to disk, so a platform with an
  ephemeral filesystem will lose progress between deploys.
