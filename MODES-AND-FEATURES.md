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

Both modes contain all 120 written lessons, **83 long-form chapters**,
**16 academy modules**, **31 Conversation Gym playbooks**, 10 games, **31 frameworks**,
**48 body-language cards**, **8 skill tracks**, **40 daily drills**, 28 wit scenarios,
**13 Arena personas across 6 scenes**,
the coach, the creator studio, and the retention layer (spaced review, read-aloud
on every line, record-and-compare, My Scripts).

Four things sit on top of the content:

- **Search everything** — ⌘K / Ctrl-K (or `/`, or the search field in the top
  bar) opens one index over **204 records**: every chapter, playbook, module,
  course lesson, framework, skill track, drill and game. Results open the thing,
  not the page it lives on.
- **Start Here** — a twelve-question self-assessment that scores five dimensions
  and hands back a four-step route. It is a suggestion engine; nothing is locked.
- **Progress** — rolling score trend, per-skill deltas, honest coverage numbers,
  what has gone quiet, and one recommendation for today.
- **Backup & Settings** — download or restore everything as one JSON file, see
  what is stored, and erase it after an automatic safety copy.

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

## What loads when

The app is deliberately split so the first paint is quick:

| Chunk | Size (gzip) | When |
|---|---|---|
| `index.js` — shell, views, engines | ~143 KB | first paint |
| `api.js` — all content except long prose | ~141 KB | first paint |
| `chapters.js` — 83 long-form chapters | ~79 KB | first chapter you open, or a library search |
| `lessons.js` — 120 course lessons | ~104 KB | first Courses visit, or the search index |

The initial download dropped from one **~415 KB gzip** bundle to roughly
**285 KB**, with the two prose halves fetched only when they are used. All of it
still works offline once cached, and there is no server involved.

## Frameworks Vault

31 structures used by people who speak for a living, each with the conditions that make it
work, its failure modes, a worked example and a practice drill:

**Clarity** PREP · BLUF · Pyramid Principle · What–So What–Now What — **Persuasion** SCQA · PAS ·
Before–After–Bridge · FAB — **Sales** SPIN · Acknowledge–Reframe–Ask · For–Who–We–Unlike —
**Storytelling** Story Spine · Head–Heart–Hands · Past–Present–Future — **Feedback** SBI —
**Conflict** NVC · LARA · Bridge & Redirect — **Negotiation** BATNA & Anchors · If–Then Trades ·
Three-Option Close — **Performance** Bookend Talk · 3–2–1

**Care** Hold, Don't Fix · The Specific Help Offer — **Family** The Three-Beat Boundary ·
State, Not Charge — **Money** The Number and the Silence · Blame Yourself First —
**Self** The Evidence Ladder · The Warm Exit

The care, family, money and self categories are new: the vault previously had nothing
for the conversations that are not about work.

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

## Academy — sixteen modules

Each module is genuinely written: **6 principles, 2–3 mechanics with worked
examples, 4–5 scripted exchanges, 4 drills and 4 cross-linked chapters.**

**Wing one — social fundamentals**

| Module | Thesis |
|---|---|
| Charismatic Conversation | Attention transfer, not personality display |
| Developing Humour | Misdirection and shared context, not joke delivery |
| Tension & Flirting | Escalation with consent and readable signals |
| Everyday Conversation | Forks, not interrogations |
| Body Language & Cues | Read the cluster, never the single cue |
| Human Psychology | What people are defending, and why |

**Wing two — every field of life**

| Module | Thesis |
|---|---|
| Small Talk Mastery | Small talk is the door every real conversation comes through |
| Talking to Women | Calm, specific, safe enough to be chosen — consent-first throughout |
| Difficult Conversations | The conversation you are avoiding costs more than the conversation |
| Emotional Depth | Being the person people tell the true thing to is rare |
| Professional Communication | Being heard is a separate, learnable skill |
| Business & Sales Talk | Nobody buys a pitch; they buy the removal of a cost they named |
| Storytelling & Wit | Three sentences and a stop beats fifteen and a moral |
| Confidence From Zero | Confidence is evidence collected slowly, not a mindset trick |

**Wing three — the rooms you cannot leave, and craft**

| Module | Thesis |
|---|---|
| Family & The Rooms You Cannot Leave | Every other room lets you leave; this one you have to be good in. Skill here is changing a pattern, not winning the argument |
| Humour As A Discipline | Funny is not a personality, it is a set of small mechanical decisions — target, timing, specificity, recovery |

Every drill logs **12 XP** as `academy-<module>`; every chapter chip opens that
exact entry in the library. Flirting and psychology modules carry mandatory
cautions: consent-first, non-manipulative, and explicitly anti-coercion.

## Conversation Gym

**Thirty-one situation playbooks** across ten categories — Starting, Everyday,
Dating, Difficult, Depth, Professional, Business, **Family, Money, Care**. Not
theory: each one is the script people were never given.

Wing two covers the fields people actually lose sleep over: marriage pressure at
the family table, a defensive parent, dividing care with a sibling, moving back
home, a relative's drinking, a friend who owes money, asking for a raise, saying
your price, the group dinner nobody settled, a terminal diagnosis, a colleague's
bad news, an apology that is not landing, and the neighbour whose music goes
until two.

Every playbook has the same six parts:

1. **The situation**, described honestly (the party where you know nobody, the
   café approach, the boss you have to tell bad news to)
2. **Your goal** — one achievable outcome, not "be charming"
3. **Step by step** — five steps in the order you would actually do them
4. **Say this** — the literal lines, with what each one is doing
5. **Where it goes wrong** — the specific failure modes
6. **Your rep** — one drill, plus links into the Academy and library

Completing a playbook logs **15 XP** — or **10 XP** if you log it as a stumble.

### Retention: the queue, the read-aloud line, the recording

Skills decay on a schedule, so the Gym now schedules them.

- **Spaced repetition.** Every playbook you log enters a queue and comes back at
  **3 → 7 → 21 → 60 days**. A clean rep promotes one step; "I stumbled" resets to
  3 days and records a lapse. The Gym shows a *Due for review* banner with the
  count, a **Due today** filter that lists your queue oldest-first, and a per-card
  `due now` / `in 9d` chip. Stored in `localStorage` under `charisma-lab.srs.v1`.
- **Read aloud on every line.** Every scripted line anywhere in the app — Gym,
  Academy, Library chapters, Skill Tracks — is tappable and keyboard-focusable
  and is read by the browser's speech engine (`▶` on hover, `Enter` or `Space`
  to hear it). No audio files, no network, no key.
- **Record and compare.** Each playbook opens a *Rehearse it out loud* panel:
  hear the line at 0.7× / 0.85× / 1×, record your own take with `MediaRecorder`,
  play both back, and get your words-per-minute against a 110–160 target. The
  previous take is kept so you can hear the improvement. Logging the rep from
  the panel counts toward the queue.
- **Weak spots.** Items that have lapsed and are due surface first, because a
  stumble you have forgotten is the one that costs you in the room.

## My Scripts — the lines that are actually yours

A new view (`My Scripts` in the Practice group) for your own lines rather than
the ones we wrote. Write a version of any playbook line you would really say, tag
it (`Small talk`, `Dating`, `Work`, `Difficult`, `Business`, `Family`,
`Strangers`), and rehearse it with the same read-aloud and record-and-compare
panel. It suggests the least-rehearsed line, counts reps per line, and every
playbook has a **write my own version** link that pre-fills the entry.
Stored in `localStorage` under `charisma-lab.scripts.v1`.

## Library — 83 entries, 83 full chapters

**Wing two** adds 30 entries with 30 long-form chapters in six categories: Small
Talk, Talking to Women, Difficult Conversations, Emotional Depth, Professional,
Business.

**Wing three** adds **12 entries with 12 long-form chapters (~9,800 words)** in
three more: **Family** (warm boundary/hard rule, state not charge, divide tasks
not blame, the unrescuable thing, terms before patterns), **Money** (blame
yourself first, numbers in the group never in private, the number and the
silence) and **Humour** (the safe target is you, the callback ledger, the
pressure valve, tease the situation not the person).

Each chapter has a thesis, 4 deep paragraphs, a scripted exchange, failure modes,
drills and related-reading edges that all resolve.

## Creator Studio

Six content pillars, eight hook patterns, six formats with their failure modes,
platform cadence, a six-level skills ladder, a four-week publishing plan, an
idea engine (topics × angles), and a pre-publish checklist.
