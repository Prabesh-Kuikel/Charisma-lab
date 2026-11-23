# Audit — what was broken, what was fixed

Run it yourself:

```bash
npm run audit        # content + cross-references
npm run audit:api    # every endpoint, status + shape
npm test             # engine, content and static-mode checks
node test/<name>.test.mjs   # jsdom UI suites
```

## Findings

| # | Finding | Severity | Status |
|---|---|---|---|
| 1 | **Daily Dojo, Skill Tracks and Games lost their completion ticks on reload.** Nothing persisted them — you logged a rep, refreshed, and the tick was gone even though XP was saved. | High | **Fixed.** `src/local/progress-log.js` persists daily ticks (per date), skill completions and the last 30 game reps in `localStorage`, in both server and static mode. |
| 2 | **Coach recommended drills from the wrong bank.** Intent IDs pointed at `daily.js` drill ids but the lookup searched `skills.js` exercises, silently falling back to the first exercise of a track — so several intents gave unrelated drills. | High | **Fixed.** The lookup now checks daily drills first, then the track. |
| 3 | **Intent matching mis-fired.** "I freeze when a client pushes back on price" matched *nerves* instead of *objections*, because single-word cues outvoted the specific phrase. | Medium | **Fixed.** Scoring is matched-cue count ×10 plus longest matched phrase, so specific phrases win. |
| 4 | **No usable SQLite driver produced a raw stack trace** instead of an instruction. | Medium | **Fixed.** `server/db.js` now prints the two remedies and exits 1. |
| 5 | **`better-sqlite3` failure aborted the whole install** on platforms without a matching native prebuild. | High | **Fixed earlier.** Moved to `optionalDependencies`; verified with a full install where every native build is skipped. |
| 6 | Games "Clear" button actually cleared the prompt, which read as a bug. | Low | **Fixed.** Renamed to "Skip" with a refresh icon. |
| 7 | **Pronunciation Lab crashed the whole page.** The five pangrams added with the twister batch were `{id, text, tier}` records, not strings, so React threw "Objects are not valid as a React child" and the view rendered nothing. Three of the five also duplicated pangrams that already existed. | High | **Fixed.** The view normalises string-or-record pangrams and de-duplicates; two of the extras were replaced with genuinely new pangrams; the audit now asserts every pangram contains all 26 letters and no sentence repeats. |
| 8 | Two academy modules shipped with only two cautions each, below the module contract. | Medium | **Fixed.** Added a real third caution to each (boundaries for charisma, "the barista is not your reps" for everyday talk); the audit enforces ≥3. |
| 10 | **The AI coach rendered a blank answer** under a "Why: answered by gpt-oss-20b in 850ms" footer: the AI branch returned `{reply}` while the bubble renders `{text}`, so only the metadata showed. The same path also sent the current turn to the model twice. | High | **Fixed.** `callAI` returns `text` (and `reply` for compatibility) and skips the duplicate turn; `test/coach-ai.test.mjs` asserts the answer text renders, the turn is sent once, and the Arena persona writes the partner's line. |
| 9 | Every jsdom suite died on Node 26 with `Cannot set property navigator of #<Object> which has only a getter` — 12 of 14 suites unrun. | High | **Fixed.** All suites now use `Object.defineProperty(global,'navigator',…)`; `npm run bundle:test` rebuilds the UI bundle from `src` so suites can never test stale code again. |

## Round 5 — security hardening (found by attacking the running server) + two content wings

Every item below was **reproduced against a live server first**, then fixed, then re-tested.

| # | Finding (with the proof) | Status |
|---|---|---|
| S1 | **SSRF in the AI relay.** `POST /api/ai/chat` accepted a caller-supplied `baseUrl` and dialled it. `{"baseUrl":"http://127.0.0.1:3100/api/user"}` returned the internal route's body through the AI relay — i.e. a web page the user visits could read local services and cloud metadata (`169.254.169.254`) through the app. | **Fixed.** Upstream URL is now environment-only (`AI_BASE_URL`) and only honoured for `provider: "compatible"`. Retest: all three payloads → **502**, nothing internal returned. |
| S2 | **Wildcard CORS.** `app.use(cors())` sent `Access-Control-Allow-Origin: *`, so any site could read `/api/sessions` and `POST /api/reset` from the user's browser. Loopback binding is no defence — the request comes from the user's own machine. | **Fixed.** Explicit allowlist (same-origin + loopback + `ALLOWED_ORIGINS`). Retest: `Origin: https://evil.example` → **no ACAO header**, preflight blocked; same origin still echoed. |
| S3 | **No rate limiting.** 12 concurrent AI calls all reached upstream; nothing protected the free tier or the process. | **Fixed.** `server/guard.js`: token bucket per IP (page 120/min, writes 40/min, AI 8/min, loopback 4× for local use), `Retry-After`, plus a concurrency cap of 4 on the AI relay. Retest: burst of 10 → `200 200 200 200 503 503 503 503 503 503`. |
| S4 | **636 KB uncompressed content.** `/api/content` shipped raw JSON on every cold load. | **Fixed.** Cached gzip with `Vary: accept-encoding`. **635,792 → 202,173 bytes** (−68%). |
| S5 | **`Permissions-Policy` omitted microphone**, so the Impromptu/Rehearsal recorders would be blocked in server mode; the app also send no COOP/CORP and let API JSON be cached by a proxy. | **Fixed.** `microphone=(self)`, `Cross-Origin-Opener-Policy: same-origin`, `Cross-Origin-Resource-Policy: same-origin`, `Cache-Control: no-store` on API responses. |
| S6 | **`/api/ai/status` echoed the configured upstream URL** and every provider field — useful to an attacker mapping the box. | **Fixed.** Returns only `{provider, model, enabled, hasKey, customEndpoint}`. |
| S7 | **The public (Pages) build had no CSP at all** — there is no server there to set a header, so the static site was the least protected deployment. | **Fixed.** The production policy ships as a `<meta>` in `docs/index.html` and is **pinned against the server header** by `test/security.test.mjs` so the two cannot drift. Verified in Chromium against the built page: an injected `https://evil.example/x.js` is refused (`csp`), and an inline `onclick` handler does not execute. |
| S8 | `npm run dev` would have been broken by that policy (Vite injects an inline Fast Refresh preamble and evaluates modules with `new Function`). | **Fixed properly, not by weakening production.** `vite.config.js` now carries the policy in one place: served as a header in dev (with `'unsafe-inline' 'unsafe-eval'`), stripped from `dist/` (the server sends the strict header), and injected as a `<meta>` only for the `VITE_LOCAL` Pages build. |

**Honest limit, unchanged:** there is no authentication because there is no account. Do not expose this API to the public internet without auth in front of it. What is guaranteed now is that a *web page the user happens to visit* cannot drive it, cannot read it, and cannot use it as a proxy into the local network.

Run it yourself: `npm run test:security` (server running) and `node test/guard.test.mjs` (pure units, no server).

### Verified after the security fixes

- `npm run test:security` → all sections pass, including the three SSRF payloads, the evil-origin probe, gzip size, load shedding, the static-build CSP and the drift check.
- `node test/guard.test.mjs` → **22 checks** (bucket caps and refill, loopback ×4 mapping, `Retry-After`, idempotent concurrency release, cached gzip reuse, plain-JSON fallback). `npm test` now runs it.
- `npm run audit:api` → **28/28**, now also asserting both Arena wings, six scenes, eight skill tracks and that persona fact/probe ladders are stripped from the served brief.

## Round 5 — content: the Arena's second wing and three more skill tracks

| Added | Detail |
|---|---|
| **6 new Arena personas** (`server/content/arena-extra.js`) | Interview (*Priya*, an interviewer testing whether you are real), Group (*The Kitchen Group*, three people you arrive in the middle of), Care (*Marcus*, whose father has died), and three Resolving Tension scenes that are not office politics: *Rowan* the manager twelve minutes into a performance review, *Sunita* the landlord avoiding a date, *Bua* the father who has just been told to stop driving. Each has traits, likes, allergies, an opener, three probes, four escalating disclosures and two exit lines. **Arena: 7 → 13 personas, 3 → 6 scenes.** |
| **Rapport heuristics for every persona** | `server/analysis.js` gained like/dislike regexes and a cold-pressure line for all six new ids, so rapport is genuinely computed, not neutral. Measured: a warm turn scores **68–78**, a lazy one **33–51**. The audit now fails if any persona has no keys ("scores blind"). |
| **3 new Skill Tracks** (`server/content/skills-extra.js`) | **Hard Conversations**, **Interviews**, **Running a Room** — six principles, five literal scripts and five exercises each, every exercise with a time estimate and a checkable *done when*. **Skill tracks: 5 → 8, exercises: 25 → 40.** |
| **Cross-links, both directions** | Every one of the 13 personas now names **three library chapters to read before you walk in**, shown in the brief panel and clickable straight into the chapter. Every one of the 8 skill tracks names the chapters it assumes, the Arena personas that drill it and the Gym category to practise in. The audit fails on any dangling id in either direction. |
| **The Arena screen itself** | Scene tabs are generated from the content (six now, with counts) instead of a hardcoded three; each scene carries a one-line statement of what makes it hard; new scenes render without a code change. |
| **Skill Tracks screen bug** | The *Lines that work* block nested a full-width `.script-line` inside another, so the partner's line wrapped to one-word-per-row at 1440 px (visible in the old layout). Rebuilt as a proper Them/You pair. |

## Security pass (round 4, still true)

| Check | Result |
|---|---|
| `npm audit` | 2 advisories, both in **dev-only** tooling (vite/esbuild dev server). Not shipped in `docs/`. The dev server now binds `127.0.0.1` and restricts `allowedHosts`, which closes the practical attack path. |
| CSP on every response | `default-src 'self'`, `script-src 'self'` (no inline script — verified: 0 inline `<script>` blocks in the built page), `object-src 'none'`, `frame-ancestors 'none'`, `base-uri 'self'` |
| Other headers | `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: no-referrer`, `Permissions-Policy` locks camera/geolocation/payment |
| Request bodies | capped at **256 KB** (was 2 MB); a 400 KB body is rejected with **413** |
| Malformed JSON | **400**, never a 500 |
| Path traversal | `/../../etc/passwd` and encoded variants leak nothing |
| Unknown `/api/*` route | JSON **404**, never the SPA shell (which would return HTML to a `fetch`) |
| Secrets | no API-key-shaped string in any client payload; `/api/ai/status` reports only a boolean `hasKey` |
| Fingerprinting | `x-powered-by` disabled |
| Network exposure | server binds `127.0.0.1` by default; `HOST=0.0.0.0` is now an explicit opt-in |

Run it yourself: `npm run test:security` (with the server running).

**Honest limit:** this is a single-user local app. There is no authentication,
because there is no account. Do not put it on a public URL without adding auth in
front of it. Round 5 replaced the open CORS policy with an explicit allowlist, so the
Pages build no longer needs (or gets) a wildcard — add its origin to
`ALLOWED_ORIGINS` if you ever point the static build at a deployed API.

## Verified after the fixes

- `npm run audit` → all cross-references resolve (no dangling library ids, no orphan chapters, no missing lesson refs, no malformed body cards, academy reads all resolve, every pangram is a real pangram).
- `npm run audit:api` → **28/28 endpoint checks pass**, including 16 academy modules, 31 gym playbooks, 83 library entries and 48 body cards, negative cases and `/api/ai/status`.
- **21 suites green** (6 pure-logic, 14 jsdom/UI, plus the security suite): `npm test` and `npm run test:ui` both exit 0 with `ERRORS: none`. — including `academy.test.mjs` (6 modules × 5 tabs, drill awards XP, chapter cross-link opens) and `ai.test.mjs` (rate limit → `RateLimit` with `.retryAfter`, cooldown makes 0 network calls, 502 becomes a plain error so the rules engine takes over).
- Both engines verified in the browser bundle: rules engine answers offline; with AI on, a real `gpt-oss-20b` answer rendered in the Coach bubble and the Arena persona replied in character.
- Live AI verified end to end: `POST /api/ai/chat` → `gpt-oss-20b` answered a flirting scenario in 14.9 s cold (keyless).
- Game rubrics discriminate: every game scores a strong rep ≥60 and strictly above a lazy one.
- Static mode still makes **0 fetch calls** and renders every view, including the new Frameworks page and My Scripts.
- **Retention layer verified:** `test/retention.test.mjs` (28 checks) pins the schedule — first rep 3 days, then 7, 21, 60, capped; a stumble resets to 3 and records a lapse; the due queue lists only today-or-overdue, most-overdue first; script CRUD and a corrupt store fall back cleanly. `test/retention-ui.test.mjs` drives the real UI with a seeded queue: the *Due for review* banner counts 2, the **Due today** filter shows exactly those 2, logging a rep pushes items forward in `localStorage`, and every scripted line in a library chapter is marked `role="button"` with an `aria-label` for read-aloud.

## This round — findability, onboarding, backup, and a split bundle

| Added / fixed | Detail |
|---|---|
| **Nothing was findable** | 83 chapters, 31 playbooks, 120 lessons and 31 frameworks with only a per-page filter. Added `src/local/search.js` — a 198-record index with stemming, stop-word removal, an every-token rule and title-weighted ranking — surfaced as a ⌘K palette (`src/components/CommandPalette.jsx`) that opens the exact thing, not the page it lives on. |
| **Deep links were silently dropped** | `go(view, payload)` set `boot`, but `common` never passed it to the views, so "open this playbook" opened the list. Fixed, plus a `navTick` remount so re-entering the same view with a payload works. `test/shell.test.mjs` now asserts the *detail* view (rep controls present), not just the page. |
| **No first run** | A new user landed on a dashboard of zeros. Added Start Here: a 12-question assessment (`server/content/assessment.js`, pure and deterministic) scoring five dimensions and producing a four-step route; the audit proves each dimension's route points at real playbooks, chapters and modules. |
| **Progress was stored but never shown** | Added `src/local/insights.js` + a Progress view: rolling score trend, per-skill deltas, coverage, neglect, and one ranked recommendation. 51 pure checks in `test/insights.test.mjs`. |
| **No way to back up browser storage** | Added `src/local/backup.js` + Backup & Settings: export/import one JSON file, merge (keeps the higher XP, unions days/sessions/scripts) or replace, storage usage, and a wipe that downloads a safety copy first. Import rejects foreign files, future schemas and non-JSON, and never accepts keys it does not own. The AI key is excluded from every backup. |
| **One 900 KB content chunk** | Split into lazy chunks. `lessons` (300 KB raw / 104 KB gzip) loads on first Courses visit or search-index build; `chapters` (229 KB raw / 79 KB gzip) loads on the first chapter opened or library search. Initial download went from ~415 KB to ~285 KB gzip with nothing removed. |
| **Chapter search would have gone silently blind** | Chapter prose is now lazy, so `api.library()` awaits the chunk before searching chapter text — otherwise "hostage" would stop finding the Yes, And chapter. |
| **Manifest drift risk** | `server/content/chapter-ids.js` is generated by `npm run chapters:ids` and the audit fails loudly if it disagrees with the real chapter maps (verified by deleting an id: the audit names it). |
| **Dev-facing copy** | The error card said "Backend not reachable … run npm run dev:api" in an app that has no backend. It now explains the real cause (a half-downloaded page) and offers a reload. |

## Previous round — retention + third wing

| Added | Detail |
|---|---|
| Spaced repetition | `src/local/srs.js` — 3/7/21/60-day schedule, promote on clean rep, reset to 3 on a stumble, lapses tracked. Gym banner, **Due today** filter, per-card due chips, weak-spot ordering. Persisted in `charisma-lab.srs.v1`. |
| Read aloud, everywhere | `src/local/read-aloud.js` is attached once in `App.jsx`. A delegated click/Enter/Space handler plus a `MutationObserver` tags every `.script-line` and `.lesson-example p` with `role="button"`, `tabindex="0"` and an `aria-label`, so Gym, Academy, Library chapters and Skill Tracks are all speakable — including lines rendered after the fact. |
| Record and compare | `src/components/Rehearse.jsx` on top of the existing `useRecorder` / `useSpeech` hooks: hear at 0.7/0.85/1×, record with `MediaRecorder`, keep the previous take, wpm against a 110–160 target, and log the rep into the queue. |
| My Scripts | `src/views/MyScripts.jsx` + `src/local/my-scripts.js` — your own lines, tagged, counted, rehearsable, suggested least-rehearsed first. Wired into the nav (Practice) and into every playbook. |
| Third wing content | 12 library entries + 12 long-form chapters (Family / Money / Humour), 13 playbooks (Family / Money / Care), 2 academy modules. **18,454 new words.** Every new read/related edge resolves (audited). |
| Accessibility | every scripted line is now keyboard-reachable with a screen-reader label; new controls carry `aria-label`s. |

**Not done yet, deliberately:** onboarding/assessment, progress export/import, code-splitting the 800 KB content chunk, and offline/PWA. They remain the top five gaps listed earlier.
