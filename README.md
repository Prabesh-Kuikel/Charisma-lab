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
42 weighted prompts across 7 categories, a prep countdown that auto-opens the recorder, a live waveform from the microphone, live transcription via the Web Speech API, a simulated recorder with playback, and an analysis pass that scores **clarity, structure, tone and energy** plus pace (wpm), filler density, hedging and pause count — then assigns the next drill.

### 4. Tongue Twister & Pronunciation Lab
24 twisters tiered warm-up → advanced, filterable by tier, with Web Speech **synthesis** playback at three speeds, a mic test with level metering, and word-by-word **accuracy scoring** using Levenshtein matching against your recognised speech. Speed-aware scoring, personal bests and a pangram finisher.

### 5. Wit, Humor & Banter Simulator
20 scenarios (retorts, callbacks, self-deprecation, charm flips, group banter). Each gives a setup, the hostile line, the context, and the strategies that actually work there. Responses are scored on **humour, timing, warmth and strategy**, with detected-strategy tags, a coaching line and a model line. Optional rapid-fire 20-second mode.

### 6. AI Conversation Arena
7 personas across Networking, Date / Casual Bar and Resolving Tension — each with a brief, likes, allergies, evolving disclosures and a reaction repertoire. The reply engine tracks **rapport turn by turn**: it rewards questions, specificity, second-person focus and callbacks to details the persona shared earlier, and punishes monologues, hedging and pitching. Live coach hints appear as you go; ending a session returns a Curiosity / Specificity / Warmth / Momentum report.

### 7. Body Language & Micro-Expression Decoder
16 quiz cards across six clusters (feet & legs, micro-expressions, eyes, hands, status & space, mirroring). Each gives a described scene, four reads, the correct interpretation, the cue to look for, and the psychology behind it — with cluster-first, ethics-forward framing.

### 9. Daily Dojo, Games, Skill Tracks, Coach, Creator Studio

- **Daily Dojo:** three rotating drills a day from a 30-drill bank, across every skill, with a weekly theme. Nothing is gated — the plan is a suggestion.
- **Games:** six ultraspeaking-style reps (Yes, And Relay, One-Sentence Story, Sell This Object, Objection Whack-a-Mole, Cold Open, Frame Flip) with timers, per-rep scoring and specific fixes.
- **Skill Tracks:** Sales, Persuasion, Flirting, Negotiation, Presence — five principles, three worked scripts and five exercises each.
- **Coach:** a local, rule-based assistant. Intent detection, draft diagnostics from the same analyser as the Impromptu Lab, and a concrete drill per answer. No API key.
- **Creator Studio:** pillars, eight hook patterns, formats with failure modes, platform cadence, a skills ladder, a four-week plan and an idea engine.

### 8. Master Resource Library
41 searchable entries across Fallback Patterns (8), Storytelling Frameworks (6), Robert Greene Power Laws (7), Dale Carnegie Rules (9), Voice & Delivery (6) and Wit Patterns (5).

**All 41 entries are long-form chapters** (~16,700 words): an opening thesis, 3–4 paragraphs of explanation, a worked `Them / You` script, three failure modes, three practice steps, tags and related chapters. Server-side search indexes the full chapter text, not just titles — so "hostage" finds the Yes, And chapter and "verse" finds the delivery chapter.

### Course ↔ Library integration

The two halves reference each other in both directions:

- Each course day carries `libraryRefs` (2 chapter ids) rendered as **Go deeper** buttons that deep-link straight into the opened chapter.
- Each chapter returns `courseLinks` from the server — the exact track days that teach it — rendered as **Taught in the course** chips that jump back to that day with the lesson already open.
- Chapters also carry `related` ids, and every chapter has at least one inbound edge, so the library is a graph rather than a list.

---

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
                      library-deep.js / -2.js / -3.js = the 41 long-form chapters
src/
  App.jsx             Shell, navigation, data bootstrap
  views/              Dashboard, Courses, Impromptu, Pronunciation, Wit, Arena, BodyDecoder, Library
  components/ui.jsx   Ring, Bar, Stat, ScoreRow, icons
  hooks.js            Recorder (MediaRecorder + AnalyserNode + SpeechRecognition), timers, synthesis
  styles.css          Design system
scripts/dev.mjs       Runs API + Vite together
test/                 jsdom render smoke tests
```
