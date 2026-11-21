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

## Verified after the fixes

- `npm run audit` → all cross-references resolve (no dangling library ids, no orphan chapters, no missing lesson refs, no malformed body cards, academy reads all resolve, every pangram is a real pangram).
- `npm run audit:api` → 23/23 endpoint checks pass, including negative cases, `/api/ai/status`, 6 academy modules and 40 body cards.
- **15 jsdom/unit suites, `ERRORS: none` in each** — including `academy.test.mjs` (6 modules × 5 tabs, drill awards XP, chapter cross-link opens) and `ai.test.mjs` (rate limit → `RateLimit` with `.retryAfter`, cooldown makes 0 network calls, 502 becomes a plain error so the rules engine takes over).
- Both engines verified in the browser bundle: rules engine answers offline; with AI on, a real `gpt-oss-20b` answer rendered in the Coach bubble and the Arena persona replied in character.
- Live AI verified end to end: `POST /api/ai/chat` → `gpt-oss-20b` answered a flirting scenario in 14.9 s cold (keyless).
- Game rubrics discriminate: every game scores a strong rep ≥60 and strictly above a lazy one.
- Static mode still makes **0 fetch calls** and renders every view, including the new Frameworks page.
