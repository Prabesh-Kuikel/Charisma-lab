# Get the site live — the version that cannot fail

This build ships a **pre-built site in `docs/`**. Nothing has to compile on
GitHub, so no workflow can fail on dependencies, and there is a fallback that
works even if GitHub Actions refuses to run at all.

---

## 1. Delete the two extra workflows (this is what broke it)

You had three competing workflows cancelling each other:

```
jekyll-gh-pages.yml   ← delete
static.yml            ← delete
pages.yml             ← keep (already correct in this zip)
```

Go to `github.com/<you>/<repo>/tree/main/.github/workflows`, open each of the
first two, click the **trash icon**, commit. If a file in this zip isn't there,
delete whatever else you find except `pages.yml`.

---

## 2. Upload THIS zip's contents

Unzip, then drag the **contents** into the repo root (**Add file → Upload files**).
`docs/` must come along — it is the actual website.

The zip contains exactly one workflow, one build output, no node_modules.

---

## 3. Choose ONE of these two Pages settings

### Option A — GitHub Actions (recommended)

**Settings → Pages → Build and deployment → Source: `GitHub Actions`**

The workflow only uploads `docs/`. There is no `npm install`, no build, nothing
to break. ~20 seconds and it deploys.

### Option B — Branch, no Actions at all

**Settings → Pages → Source: `Deploy from a branch`**
→ Branch: **`main`** → Folder: **`/docs`** → **Save**

GitHub publishes `docs/` directly. No workflow runs, so nothing can fail.
This is the bulletproof fallback — use it if you are tired of red Xs.

**Pick one. Do not mix them.** Option A + a leftover workflow, or Option B +
`pages.yml` still enabled, is exactly how three workflows ended up fighting.

---

## 4. Open the site

```
https://<your-username>.github.io/<your-repo>/
```

Hard-refresh, and bust the cache (Pages caches for 10 minutes):

```
https://<your-username>.github.io/<your-repo>/?v=1
```

Check it worked — F12 → Console:

```js
document.querySelector('script[type=module]').src
```

| Output | Meaning |
|---|---|
| `.../assets/index-XXXX.js` | ✅ working — the app renders |
| `/src/main.jsx` | ❌ still publishing the raw repo — you are on Option B but pointing at `/ (root)`, not `/docs` |

---

## 4b. What is in the site now

| Section | Count |
|---|---|
| Academy modules | **14** (small talk, talking to women, difficult conversations, emotional depth, professional, business, storytelling, confidence + the original six) |
| Conversation Gym | **18** situation playbooks with literal scripts |
| Library | **71** entries, **71** full chapters |
| Course lessons | 120 |
| Games / frameworks / body cards | 10 / 23 / 40 |

Every course, day and module is open at any time. Nothing is gated, nothing
depends on your streak, and everything runs in the browser with no backend.

## 5. When you change content later

The `docs/` build must be refreshed, or the live site keeps showing the old version:

```
npm install --ignore-scripts
```
```
npm run build:pages
```

Then upload the new `docs/` folder (or `git add -A && git commit && git push`).

`npm start` is unaffected — the server mode still reads `server/content/*.js`
live, so local edits show instantly.

---

## Why the earlier attempts failed

| Symptom | Cause |
|---|---|
| Blank page, `<script src="/src/main.jsx">` | Pages was publishing the raw repo, not a built bundle |
| `deploy` step: 404 "Ensure GitHub Pages has been enabled" | Pages **Source** was still "Deploy from a branch" |
| Jobs "cancelled" after 2 seconds | three workflows in the same concurrency group |
| Site blank even after a green run | the wrong workflow won the race |

This zip removes the race (one workflow), removes the build step from CI
(published output), and gives you a branch-based fallback that needs no CI at all.
