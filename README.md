# Charisma Lab · Speaking OS

A full-stack charisma and speaking training platform. React + Vite front end, Express + SQLite back end, with a local heuristic "AI" coach that scores your speech, wit and conversations in real time — no API keys, no external services, no network calls at runtime.

---

## Run it

```bash
npm install
npm run build      # build the front end into /dist
npm start          # http://localhost:3000  (API + UI on one port)
```

Development, with hot reload:

```bash
npm run dev        # starts the API (3000) and Vite (5173) together
```

Data is stored in `data/charisma.db` (created on first run). Delete that folder to reset all progress.

Check your environment any time:

```bash
npm run doctor     # node version, SQLite driver, content counts, build state
```

### SQLite: two drivers, one app

`server/sqlite.js` opens the database with **better-sqlite3** when its native binary loads,
and falls back to Node's built-in **`node:sqlite`** when it doesn't — which is what happens on
a platform without a matching native prebuild. Nothing to configure; the driver in
use is printed on boot. `node:sqlite` needs Node 22.13+ (24 or 26 recommended).

### Static mode (no server at all)

```bash
npm run build:static   # everything runs in the browser
```

Content, analysis, the arena partner, the coach and the games all ship in the
bundle; progress lives in `localStorage`. This is what the GitHub Pages workflow
deploys, and it is how the app can be live with no backend and no hosting cost.
See `MODES-AND-FEATURES.md` for the trade-offs.

### Other docs

| File | What it covers |
|---|---|
| `MODES-AND-FEATURES.md` | Server vs static mode, games, skill tracks, daily drills, coach, creator studio |
| `DEPLOY.md` | Getting it live properly (Render / Fly / VPS) and the single-user caveat |
| `PUSH-FROM-COMPUTER.md` | Uploading the code to your own GitHub from a desktop or laptop |

---

## What's inside

### 1. Interactive Dashboard
Daily streak with longest-run tracking, a 13-week consistency heatmap, XP and level progression, Fast Track / Deep Dive completion rings, a "next up" module card, six quick-exercise launchers, today's power law, and a recent-activity feed.

### 2. Courses — 30-Day Fast Track & 90-Day Deep Dive
- **Fast Track:** 30 days across four weeks — the instrument, structure, story, spark.
- **Deep Dive:** 90 days in nine ten-day blocks, each ending with a checkpoint.
- **Every one of the 120 days is a written lesson** — headline, why it works, 3–4 body paragraphs, a worked example, the common mistake, a drill brief and three key points. About **47,900 words** of course teaching, served from `/api/track/:id` and rendered in the lesson reader with notes, completion tracking and "Go deeper" chapter references.
- The reader also exposes a **Drill tab** per day, so the practice brief is one click from the teaching.

Every day carries a mentor, one sharp insight, one timed drill, an XP value and a reflection field. Drills deep-link straight into the matching lab with the prompt pre-loaded. Mentors: UltraSpeaking, Dale Carnegie, Robert Greene, Vanessa Van Edwards, Vin Pham, Philipp Humm, Dorie Clark.

### 3. Impromptu Speech Lab
88 weighted prompts across 7 categories, a prep countdown that auto-opens the recorder, a live waveform from the microphone, live transcription via the Web Speech API, a simulated recorder with playback, and an analysis pass that scores **clarity, structure, tone and energy** plus pace (wpm), filler density, hedging and pause count — then assigns the next drill.

### 4. Tongue Twister & Pronunciation Lab
48 twisters tiered warm-up → advanced, filterable by tier, with Web Speech **synthesis** playback at three speeds, a mic test with level metering, and word-by-word **accuracy scoring** using Levenshtein matching against your recognised speech. Speed-aware scoring, personal bests and a pangram finisher.

### 5. Wit, Humor & Banter Simulator
28 scenarios (retorts, callbacks, self-deprecation, charm flips, group banter, plus new **repair**, **flirt**, **group-entry** and **tension** registers). Each gives a setup, the hostile line, the context, and the strategies that actually work there. Responses are scored on **humour, timing, warmth and strategy**, with detected-strategy tags, a coaching line and a model line. Optional rapid-fire 20-second mode.

### 6. AI Conversation Arena
**13 personas across six scenes** — Networking, Date / Casual Bar, Resolving Tension, Interview, Group and Care — each with a brief, likes, allergies, evolving disclosures, a reaction repertoire and **three library chapters to read before you walk in**. The second wing adds the conversations people actually lose sleep over: a manager twelve minutes into a performance review, a landlord who is avoiding a date, a father who has just been told to stop driving, an interviewer testing whether you are real, a three-person table you are arriving in the middle of, and a colleague whose father has died. The reply engine tracks **rapport turn by turn**: it rewards questions, specificity, second-person focus and callbacks to details the persona shared earlier, and punishes monologues, hedging and pitching. Live coach hints appear as you go; ending a session returns a Curiosity / Specificity / Warmth / Momentum report.

### 7. Body Language & Micro-Expression Decoder
48 quiz cards across six clusters (feet & legs, micro-expressions, eyes, hands, status & space, mirroring). Each gives a described scene, four reads, the correct interpretation, the cue to look for, and the psychology behind it — with cluster-first, ethics-forward framing.

### 9. Conversation Gym & My Scripts — the retention layer

**31 situation playbooks across 10 categories** (Starting, Everyday, Dating, Difficult, Depth, Professional, Business, Family, Money, Care), each with the situation, your goal, five steps, the literal lines, the failure modes and one drill. Logging a rep schedules it to come back.

- **Spaced repetition** — every logged playbook returns at **3 → 7 → 21 → 60 days**. A clean rep promotes one step; *I stumbled* resets to 3 days and records a lapse. A *Due for review* banner, a **Due today** queue ordered by how overdue the item is, and per-card `due now` / `in 9d` chips.
- **Read aloud on every line** — every scripted line anywhere in the app (Gym, Academy, Library chapters, Skill Tracks) is tappable and keyboard-reachable and is spoken by the browser's speech engine. No files, no network, no key.
- **Record and compare** — hear the line at 0.7× / 0.85× / 1×, record your own take, play both back, and get your words-per-minute against a 110–160 target. The previous take is kept so you can hear the improvement.
- **My Scripts** — write your own version of any line, tag it, rehearse it, and let the app suggest the least-rehearsed one. Every playbook has a *write my own version* link.

Everything here is `localStorage`-only and works in the static build.

### 10. Skill Tracks — eight tracks, each with reps you can check

Sales, Persuasion, Flirting, Negotiation, Presence & Small Talk, **Hard Conversations**, **Interviews** and **Running a Room**. Every track carries six principles, five literal scripts (what they say → what you say) and five exercises with time estimates and a **done-when** line you either met or did not. Each track also cross-links the chapters it assumes and the Arena personas and Gym categories that drill the same muscle, so reading, drilling and roleplay are one loop rather than three tabs.

### 10. Finding things — search, Start Here, Progress, Backup

As the library passed eighty chapters, *finding* became the bottleneck, so four surfaces were added on top of the content:

- **Search everything** — `⌘K` / `Ctrl-K`, or `/`, or the field in the top bar. One index over the whole product — chapters, playbooks, academy modules, all 120 course lessons, frameworks, skill tracks, daily drills, games, psychology mechanisms and stories. Results deep-link to the thing itself — a chapter opens, a playbook opens with its rep controls, a lesson opens on the right day.
- **Start Here** — twelve honest questions scored into five dimensions (opening, depth, humour, difficult conversations, presence), then a four-step route built from your weakest dimension and the situation you picked. The first visit lands here; nothing is gated afterwards.
- **Progress** — rolling score trend, per-skill deltas with direction, honest coverage (how many of the chapters you have actually opened), what has gone quiet, and exactly one recommendation for today, in priority order: due review → falling skill → neglected practice → unexplored area → write a script → take one rep.
- **Backup & Settings** — your progress is browser-only, so it can now be downloaded and restored as one JSON file. Merge keeps whichever side has more XP and unions your days and sessions; replace wins outright. The AI key is deliberately never exported. Erasing everything downloads a safety copy first.

### 11. Academy — 16 modules

Charisma, humour, tension & flirting, everyday conversation, body language, psychology, small talk, talking to women, difficult conversations, emotional depth, professional, business, storytelling & wit, confidence — plus **Family & The Rooms You Cannot Leave** and **Humour As A Discipline**. Each module: 6 principles, 2–3 mechanics with worked examples, 4–5 scripted exchanges, 4–5 drills and 4+ linked chapters.

### 12. Stories That Land — twenty-one tellable anecdotes

Everyone is told to tell stories. Almost nobody is taught how, so this wing treats a
story as a **structure** rather than a talent. **21 stories across 7 shapes** (origin,
failure, the turn, conflict, teaching, vision, humour), each written to be told in
60–90 seconds and broken into beats you rehearse out loud:

- **Say this first** — a worked opening line, because the failure mode is starting a
  week before the story does.
- **The beats, in order** — four or five sentences, not paragraphs. This is the unit
  you memorise, so you can tell it without a script.
- **The detail that proves it** and **the turn** — the one concrete object that makes
  it believable, and the moment where something changed.
- **Why it holds attention** — the mechanism, so you can write your own.
- **Do not tell this one…** — the section every storytelling guide omits. Most bad
  storytelling is a good story in the wrong room, and every card names the room.
- **Rehearse it** — three specific instructions, plus copy-outline and *time it out
  loud* (hands the story to the Impromptu timer) alongside a coaching hand-off.

Opening a story logs a `story` rep (8 XP), filters by shape and by how you actually
search — *interview*, *apology*, *funny*, *failure* — and cross-links into the
Frameworks and Psychology wings where the same mechanism is named.

### 13. Daily Dojo, Games, Skill Tracks, Coach, Creator Studio

- **Daily Dojo:** three rotating drills a day from a 30-drill bank, across every skill, with a weekly theme. Nothing is gated — the plan is a suggestion.
- **Games:** ten ultraspeaking-style reps (Yes, And Relay, One-Sentence Story, Sell This Object, Objection Whack-a-Mole, Cold Open, Frame Flip) with timers, per-rep scoring and specific fixes.
- **Skill Tracks:** Sales, Persuasion, Flirting, Negotiation, Presence — five principles, three worked scripts and five exercises each.
- **Coach:** a local, rule-based assistant. Intent detection, draft diagnostics from the same analyser as the Impromptu Lab, and a concrete drill per answer. No API key.
- **Creator Studio:** pillars, eight hook patterns, formats with failure modes, platform cadence, a skills ladder, a four-week plan and an idea engine.

### 8. Master Resource Library
**91 searchable entries across 16 categories** — Fallback Patterns, Storytelling Frameworks, Robert Greene Power Laws, Dale Carnegie Rules, Voice & Delivery, Wit Patterns, Small Talk, Talking to Women, Difficult Conversations, Emotional Depth, Professional, Business, **Family, Money, Humour**.

**All 91 entries are long-form chapters** (every one over 200 words; median 257): an opening thesis, 3–4 paragraphs of explanation, a worked `Them / You` script, three failure modes, three practice steps, tags and related chapters. Server-side search indexes the full chapter text, not just titles — so "hostage" finds the Yes, And chapter and "verse" finds the delivery chapter.

### Course ↔ Library integration

The two halves reference each other in both directions:

- Each course day carries `libraryRefs` (2 chapter ids) rendered as **Go deeper** buttons that deep-link straight into the opened chapter.
- Each chapter returns `courseLinks` from the server — the exact track days that teach it — rendered as **Taught in the course** chips that jump back to that day with the lesson already open.
- Chapters also carry `related` ids, and every chapter has at least one inbound edge, so the library is a graph rather than a list.

---

## Works offline (service worker)

The app keeps everything on the device, but until round 10 it still needed the
network to **open**. There is now a service worker (`public/sw.js`, stamped per
build by `scripts/build-sw.mjs`):

- the shell (`index.html` + its hashed assets) is precached on install, so the
  second visit opens with no connection at all;
- navigations are **network first, cache as the floor**, so a new deploy is
  picked up the moment you are online and an offline launch still works;
- assets are **stale-while-revalidate** — hashed filenames change with the
  content, so serving the cached copy while refreshing is always safe;
- **cross-origin requests are never cached**, so a stale AI reply can never be
  served in place of a live one;
- a waiting worker surfaces as one `reload to update` chip in the top bar, and
  an offline session shows `offline · still works` rather than an error.

Verified by hard-reloading the static build with the network switched off:
psychology, stories, the hash router, and logging a rep all work offline.

## Every view is addressable

`#/psychology`, `#/stories`, `#/gym`, `#/library` — the hash router exists for two
reasons: **Back used to leave the app** (on a phone that is the most-used gesture in
the product), and a hash URL still resolves from a GitHub Pages subpath with no
server rewrite. Back and Forward now move between views, and the address bar stays
in step without stacking an entry per rep.

## Accessibility

- Every dialog (search palette, shortcuts sheet) **traps Tab and gives focus back**
  to whatever opened it, via one shared `useFocusTrap` hook.
- All 36 filter chips in the app announce their selected state with
  `aria-pressed`, so a screen reader hears "selected" instead of guessing from
  colour. The test suite fails if a new chip forgets it.
- A skip link, `aria-current` on navigation, live-region toasts, read-aloud on
  every scripted line, and `prefers-reduced-motion` support throughout.

## Numbers that cannot go stale

`CONTENT-FACTS.md` is **generated** from the same modules the app serves
(`npm run facts -- --write`), and the test suite fails if the file and the content
disagree. Twenty-eight rounds of hand-edited release notes had produced a README
claiming 83 chapters when there were 91; that is now a build error, not a paragraph
somebody has to notice.

## Security

Local-first, but the same rules apply as if it were public:

| Surface | What is enforced |
| --- | --- |
| Response headers | CSP (`script-src 'self'`, `frame-ancestors 'none'`, `object-src 'none'`), `nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: no-referrer`, COOP/CORP, a microphone-only Permissions-Policy |
| CORS | Explicit origin allowlist, no wildcard, no credentials |
| Request bodies | 256 KB JSON limit, `strict` parsing, arrays and scalars refused with a 400, every field type-checked and length-capped at the edge (`str`/`num`/`plainObject`), so a `{"$ne": null}` or a 300 kB transcript never reaches the analyser or SQLite |
| AI relay | Mode is a closed allowlist; no caller-supplied system prompt; no caller-supplied `baseUrl` (that was an SSRF); upstream is rate-limited and concurrency-capped |
| Backup import | Untrusted by definition: 8 MB cap, 20 000-element cap, only known keys, only array/object shapes, strings clamped to 4 000 chars, `__proto__`/`constructor`/`prototype` stripped at every depth, and a quota failure reports instead of claiming success |
| Storage | Two open tabs no longer clobber each other's XP; the in-memory copy re-hydrates from disk and listens for `storage` events |
| Bind address | Loopback only by default. `HOST=0.0.0.0` on its own now **refuses to start** — this app has no login and stores your whole history in one SQLite file — unless `ALLOW_PUBLIC_BIND=1` is also set, and then it warns on every boot |
| Offline cache | Cross-origin (AI provider) responses are never cached; the shell cache is versioned per build |
| Static build | Same CSP baked into `docs/index.html`, relative asset paths only, no inline script, no external script origin |

`npm run test:security` asserts all of it against a running server (21 sections,
including live type-confusion probes against every write route).

## API

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/content` | All curriculum, prompts, twisters, scenarios, cards, library |
| GET | `/api/track/:id` | Full day-by-day module list for `fast` or `deep` |
| GET | `/api/bootstrap` | User, streak, XP, level, activity, progress, recent sessions |
| PATCH | `/api/user` | Rename / set goal |
| POST | `/api/progress/complete` · `/uncomplete` | Mark a course day done (awards XP, logs activity) |
| POST | `/api/analyze/speech` | Clarity / structure / tone / energy analysis |
| POST | `/api/analyze/wit` | Wit scoring with strategy detection |
| POST | `/api/analyze/pronunciation` | Word-level accuracy + pace |
| POST | `/api/body/answer` | Decoder card grading |
| POST | `/api/arena/start` · `/message` · `/end` | Stateful roleplay + session report |
| GET | `/api/library?q=&category=` | Searchable resource library |
| POST | `/api/reset` | Wipe all progress |

## How the "AI" works

Everything is deterministic and local — no model calls:

- **Speech analysis** profiles the transcript (sentence length, filler/hedge/vagueness density, framework markers, warmth vs aggression, power language, lexical diversity) and combines it with delivery metrics captured in the browser (duration, words-per-minute, vocal RMS variance, pause count).
- **Arena replies** are generated from a trust score computed per turn, then mapped onto a persona's reaction tier, evolving disclosure bank and pressure probes — so conversations move instead of looping.
- **Wit scoring** detects 24 rhetorical strategies via pattern signals, then weighs the ones each scenario actually rewards against length, warmth and timing.

Microphone features need a secure context (`localhost` or HTTPS). Live transcription and twister scoring use the Web Speech API — best in Chrome or Edge; every lab degrades gracefully to typed transcripts elsewhere.

---

## Project layout

```
server/
  index.js            Express API + static hosting
  db.js               SQLite schema, streaks, XP, progress
  analysis.js         Scoring engine + conversation partner
  content/            courses, mentors, prompts, twisters, wit, arena, body, library
                      lessons-fast.js (30) + lessons-deep.js / -2.js / -3.js (30 each = 90)
                      library-deep.js / -2.js / -3.js = wing one chapters
                      library-extra*.js       = wings two and three (every entry has a chapter)
src/
  App.jsx             Shell, navigation, data bootstrap
  views/              23 views (Today, Courses, Gym, Psychology, Stories, Library …)
  components/ui.jsx   Ring, Bar, Stat, ScoreRow, icons
  hooks.js            Recorder (MediaRecorder + AnalyserNode + SpeechRecognition), timers, synthesis
  styles.css          Design system
scripts/dev.mjs       Runs API + Vite together
test/                 jsdom render smoke tests
```
