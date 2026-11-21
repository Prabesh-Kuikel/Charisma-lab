# Two ways to run Charisma Lab

The app has **two build targets**. Same UI, same content, same engines — different storage.

| | **Server mode** (default) | **Static mode** (`VITE_LOCAL=1`) |
|---|---|---|
| Command | `npm start` | `npm run build:static` |
| Backend | Express + SQLite (`data/charisma.db`) | none — everything in the browser |
| Storage | SQLite file | `localStorage` |
| Works on GitHub Pages | ❌ | ✅ |
| Cross-device sync | ✅ same database everywhere | ❌ per-browser |
| Streak/XP | server-side | per-device |

Both modes contain all 120 written lessons, 41 long-form chapters, 10 games,
23 frameworks, 40 body-language cards, 6 academy modules, 5 skill tracks,
30 daily drills, the coach and the creator studio.

```bash
npm start              # server mode → http://localhost:3000   (needs Node 22.13+; 24 LTS recommended)
npm run build:static   # static mode → open dist/index.html (or deploy to Pages)
```

> Static mode is auto-detected on `*.github.io` hosts as well, so the Pages build
> works even if the flag is missed.

---

## What "fully static" actually means here

There is no `fetch` at all. Content modules, the analysis engine, the arena
partner, the coach and the game scoring are all plain ES modules that ship in
the bundle:

```
src/local/api.js      implements the same API surface in the browser
src/local/store.js    localStorage with the same shapes as the SQLite tables
server/content/*      content, imported directly by the browser
server/analysis.js    scoring engines (pure functions, no Node APIs)
server/coach.js       coach rules
server/gameEngine.js  game rubrics
```

Verified: the static build runs with `merge fetch = () => reject` and still
serves every view — dashboard, courses, library, games, coach, creator, skills.

### Trade-offs, stated plainly

- **Progress is per-browser.** Phone and laptop do not share it. Server mode does.
- **Clearing site data wipes your XP.** The server mode's SQLite file survives.
- **No accounts.** Which is why it is free, private and needs no key.
- Everything else — content, scoring, drills — is identical.

If you want static hosting *and* shared progress, that needs a backend service
(Supabase, Firebase, your own API) and a `store.js` adapter. Not built.

---

## Frameworks Vault

23 structures used by people who speak for a living, each with the conditions that make it
work, its failure modes, a worked example and a practice drill:

**Clarity** PREP · BLUF · Pyramid Principle · What–So What–Now What — **Persuasion** SCQA · PAS ·
Before–After–Bridge · FAB — **Sales** SPIN · Acknowledge–Reframe–Ask · For–Who–We–Unlike —
**Storytelling** Story Spine · Head–Heart–Hands · Past–Present–Future — **Feedback** SBI —
**Conflict** NVC · LARA · Bridge & Redirect — **Negotiation** BATNA & Anchors · If–Then Trades ·
Three-Option Close — **Performance** Bookend Talk · 3–2–1

Searchable, filterable by category, cross-linked to the library chapters that explain them.

## Games

Ten, all playable solo, all scored deterministically:

| Game | Trains | What it forces |
|---|---|---|
| Yes, And Relay | Presence, improv | Accept an offer, add something, block nothing |
| One-Sentence Story | Storytelling | Compress a story to one sentence with a turn |
| Sell This Object | Sales | Buyer → outcome → price → ask, in 30 seconds |
| Objection Whack-a-Mole | Sales | Acknowledge then reframe, in two sentences |
| Cold Open | Presence | Speak 30 seconds with no preparation |
| Frame Flip | Wit | Treat a jab as high praise |
| Rapid Fire | Presence | Three random words, one sentence each, no hesitation |
| 15-Second Pitch | Sales | Positioning under 45 words with a number |
| Hostile Question | Negotiation | Acknowledge → bridge → fact, without attacking |
| Story Spine Sprint | Storytelling | All six beats in ninety seconds |

Each rep returns a 0–100 score with per-criterion pass/fail and a specific fix.

## Skill tracks

Sales · Persuasion · Flirting · Negotiation · Presence & Small Talk. Each has
five principles, three worked scripts, and five exercises with a success
criterion — all open from the start.

## Daily Dojo

Three rotating drills a day across every skill, 30 in the library, plus a weekly
theme and challenge. **Nothing is gated**: the plan is a suggestion, and the
full course, every library chapter and every drill are available at any time.

## Coach

It runs on **two engines, and the UI always says which one answered.**

1. **Rules engine (default, offline).** Intent detection, draft diagnostics
   using the same analyser as the Impromptu Lab, and a specific drill per
   answer. No key, nothing leaves the device, unlimited. This is a pattern
   matcher, not a language model, and the interface labels it that way.
2. **Conversational AI (optional).** A real model answers in your own words
   when it is available. Off, it falls back to the rules engine silently.

### AI providers — all free to use

| Provider | Key needed | Notes |
|---|---|---|
| **Pollinations** (default) | **none** | `text.pollinations.ai/openai`, OpenAI-compatible, `gpt-oss-20b`. Free tier = **1 reply per 45 s per IP**. CORS is `*`, so the static build calls it straight from the browser. |
| **Ollama** | **none** | `http://127.0.0.1:11434/v1/chat/completions`. Unthrottled, fully offline. Run `ollama run llama3.2` first. |
| **Any OpenAI-compatible host** | your own key | OpenRouter free models, LM Studio, Groq, etc. Key stays in `localStorage`; in server mode it can stay in the environment (`AI_API_KEY`) instead. |

Configure it in **Coach → AI settings** (provider chips, model, optional key)
or in the environment for server mode:

```bash
AI_PROVIDER=pollinations   # pollinations | ollama | compatible
AI_MODEL=                  # blank = provider default
AI_BASE_URL=               # e.g. http://127.0.0.1:11434/v1/chat/completions
AI_API_KEY=                # only for "compatible"
AI_ENABLED=0               # disable AI server-side
```

`GET /api/ai/status` reports the live provider; `POST /api/ai/chat` is the only
route the UI uses in server mode, so a key never reaches the browser.

### Honest about the free tier

The keyless default is rate-limited. Rather than pretend otherwise, the client:

- **serialises** every request (one in flight, ever),
- turns the provider's `402 FREE_LIMIT` into a visible **countdown**
  (`engine: local · 23s`) and a `RateLimit` error with `.retryAfter`,
- makes **zero network calls** while the countdown runs,
- and **falls back to the rules engine** so you always get an answer.

Want unlimited, private, no-quota chat? Run Ollama. That is the honest
recommendation, and it is one command.

### Arena personas

The Conversation Arena keeps its deterministic engine for trust scoring and
coaching notes, then optionally lets the model write the partner's reply
(the `AI persona` chip next to Send). Same scenario, same scoring, better
improvisation. Turn it off and the scripted persona returns.

## Academy

Six modules of genuinely written material, each with **6 principles, 2–3
mechanics, 4–5 scripted exchanges, 4 drills and 4 cross-linked chapters**:

| Module | Thesis |
|---|---|
| Charismatic Conversation | Attention transfer, not personality display |
| Developing Humour | Misdirection and shared context, not joke delivery |
| Tension & Flirting | Escalation with consent and readable signals |
| Everyday Conversation | Forks, not interrogations |
| Body Language & Cues | Read the cluster, never the single cue |
| Human Psychology | What people are defending, and why |

Every drill logs **12 XP** by kind `academy-<module>`, and every chapter chip
opens that exact entry in the Resource Library. Flirting and psychology content
is consent-first and non-manipulative by construction: the cautions tab is
mandatory, not decorative.

## Creator Studio

Six content pillars, eight hook patterns, six formats with their failure modes,
platform cadence, a six-level skills ladder, a four-week publishing plan, an
idea engine (topics × angles), and a pre-publish checklist.
