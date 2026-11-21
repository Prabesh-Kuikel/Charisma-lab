# Getting Charisma Lab live

Three routes, cheapest first. Read the **one thing to know first**, because it decides
which route you want.

---

## ⚠️ One thing to know first: this app is single‑user

The database has a single `users` row, and every request acts as that user. That's
deliberate — it's a personal trainer, not a multi‑tenant SaaS. It has one consequence for
a public URL: **every visitor shares the same XP, streak and progress.** If a stranger
opens your link and completes Day 1, that ticks Day 1 on your dashboard.

- Fine if the URL is for you (open it from your phone and laptop) or a few people you trust.
- Not fine if you plan to post it publicly.

Two ways to handle it:

1. **Keep it private-ish.** A long, unguessable Cloudflare/localhost.run URL is effectively
   a password. Good enough for personal use.
2. **Add per‑visitor identity.** Cookie‑based user rows, ~30 lines: set a signed `cl_uid`
   cookie, `getOrCreateUser(cookieId)`, and the `uid` constant in `server/index.js` becomes
   a lookup. Say the word and I'll implement it.

Either way, `/api/reset` wipes everything — it's exposed, so don't hand out a URL you care
about to people who like pressing buttons.

---


Good for: showing someone the app today, testing on another device.

```bash
npm start                                        # session 1
ssh -R 80:localhost:3000 nokey@localhost.run     # session 2 → prints https URL
```

---

## Route B — Render (recommended for a real, always‑on URL)

Free tier, GitHub‑connected deploys, HTTPS included. Sleeps after 15 minutes idle and
takes ~30 s to wake; 512 MB RAM — plenty here.

1. Push the repo to GitHub (see `PUSH-TO-GITHUB.md`).
2. Render → **New → Web Service** → connect the repo.
3. Settings:
   - **Build command:** `npm install && npm run build`
   - **Start command:** `npm start`
   - **Environment:** `NODE_VERSION=22.13.0`, `NODE_ENV=production`
   - **Health check path:** `/api/health`
4. Deploy. `PORT` is injected by Render and the server already reads it, binding `0.0.0.0`.

**The data problem.** Render's filesystem is ephemeral — every deploy, restart or wake from
sleep can reset `charisma.db`, wiping your streak. Options:

- Accept it (it's training progress, not money), **or**
- Attach a **persistent disk** (paid, ~$1/mo for 1 GB) mounted at `/var/data`, then set
  `DATA_DIR=/var/data`. That's the right answer if you want your history to survive.

**Even simpler:** Render's **Static Site** (free) talks to no API at all — that is the
GitHub Pages setup. Either both on Render, or the static site alone.

Other hosts that work the same way: **Fly.io** (needs a card, has volumes — best persistence),
**Railway** ($5 trial credit), **Koyeb**, or any €4 VPS with `pm2` + Caddy. All are
`npm install && npm run build && npm start` with `DATA_DIR` pointed at permanent storage.

---

## Route C — Your own VPS / always‑on machine

```bash
git clone https://github.com/YOU/charisma-lab.git && cd charisma-lab
npm install && npm run build
sudo mkdir -p /var/data/charisma && sudo chown $USER /var/data/charisma
DATA_DIR=/var/data/charisma PORT=3000 pm2 start server/index.js --name charisma
pm2 save && pm2 startup
```

Then put Caddy in front for automatic HTTPS:

```
charisma.yourdomain.com {
    reverse_proxy localhost:3000
}
```

---

## Production checklist

- [ ] `DATA_DIR` points at a **persistent** path — otherwise your streak vanishes on deploy.
- [ ] `npm run doctor` passes on the server (`sqlite write ok`).
- [ ] `DATA_DIR` is backed up — it's one file. `cp charisma.db charisma.db.bak` is a valid strategy.
- [ ] Decide about the single‑user sharing issue above (private URL, or per‑visitor identity).
- [ ] Nothing secret is committed: `.gitignore` already excludes `node_modules/`, `dist/`, `data/`.
- [ ] Don't expose `/api/reset` to strangers.

## What "live" will and won't do

**Will:** all eight modules, 120 written lessons, 41 long-form chapters, deterministic
speech scoring, streaks and XP persisted in SQLite, works in any modern browser.

**Won't, without extra work:** microphone features (Pronunciation Lab recording, live
analysis) need HTTPS to access the mic — every route above gives you HTTPS, so this works,
but on `http://` LAN addresses iOS/Android will refuse the mic. Voice *synthesis* playback
also needs a user gesture to start. Nothing else in the app needs the network: analysis is
fully local, so no API keys, no costs, no rate limits.
