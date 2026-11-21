// ─────────────────────────────────────────────────────────────
//  Charisma Lab · Game Engine
//  Deterministic scoring for the interactive games. Pure ESM:
//  imported by the API server and by the static browser build.
// ─────────────────────────────────────────────────────────────

import { AGGRESSION, HEDGES, FILLERS } from './analysis.js';

const words = (s) => (s || '').trim().split(/\s+/).filter(Boolean);
const wc = (s) => words(s).length;
const lower = (s) => (s || '').toLowerCase();
const sentences = (s) => (s || '').split(/(?<=[.!?])\s+/).map((x) => x.trim()).filter(Boolean);
const has = (s, list) => list.some((w) => lower(s).includes(w));

const STOP = new Set(['the', 'a', 'an', 'is', 'are', 'it', 'to', 'of', 'and', 'for', 'in', 'on', 'that', 'this', 'be', 'you', 'your', 'i', 'we', 'my', 'me', 'at', 'with', 'as', 'but', 'so', 'do', 'does', 'did', 'not', 'no', 'if', 'they', 'them', 'was', 'were', 'have', 'has', 'just', 'very', 'really']);

const contentWords = (s) => lower(s).replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w));

// ── per-game rubrics ─────────────────────────────────────────
const RUBRICS = {
  'yes-and': (text, prompt) => {
    const t = lower(text);
    const n = wc(text);
    const accepts = /^\s*(yes|yeah|yep|absolutely|and|of course|deal|sure)\b/.test(t);
    const addsAnd = /\b(yes|yeah|yep|absolutely|sure)\b[^.]{0,20}\band\b/.test(t) || /^\s*and\b/.test(t);
    const blocks = /\b(but|however|actually|no way|i can't|we can't|instead|that won't|let's not)\b/.test(t);
    const builds = contentWords(text).filter((w) => !contentWords(prompt).includes(w)).length >= 3;
    const stake = /\b(because|so that|which means|imagine|otherwise|or else|the problem is|the best part|in fact)\b/.test(t);
    return [
      { label: 'Accepted the offer', pass: accepts && addsAnd, note: 'Open with "Yes, and…" — the literal words.' },
      { label: 'Added something new', pass: builds, note: 'Add a detail, consequence or stake they did not supply.' },
      { label: 'No blocking', pass: !blocks, note: 'A "but" or "actually" turns this into a negotiation of the offer.' },
      { label: 'Raised the stakes', pass: stake, note: 'Say why it matters: because / which means / otherwise.' },
      { label: 'Under 40 words', pass: n > 0 && n <= 40, note: `${n} words — trim to stay under 40.` },
    ];
  },

  'one-sentence': (text, prompt) => {
    const needed = (prompt || '').split('/').map((w) => w.trim().toLowerCase()).filter(Boolean);
    const used = needed.filter((w) => lower(text).includes(w));
    const n = wc(text);
    const stops = (text.match(/[.!?]/g) || []).length;
    const turn = /\b(but|until|then|so|which|when|because|instead|except|finally|and suddenly)\b/.test(lower(text));
    const lastIsLong = words(text).slice(-1)[0]?.length > 3;
    return [
      { label: `Used all ${needed.length} words`, pass: used.length === needed.length, note: `Missing: ${needed.filter((w) => !used.includes(w)).join(', ') || 'none'}` },
      { label: 'One sentence only', pass: stops <= 1, note: `${stops} sentence breaks — this must be a single sentence.` },
      { label: '25 words or fewer', pass: n > 0 && n <= 25, note: `${n} words.` },
      { label: 'Has a turn', pass: turn, note: 'Something must change: but / until / which is how.' },
      { label: 'Lands on a strong word', pass: lastIsLong, note: 'End on the surprising word, not a filler.' },
    ];
  },

  'sell-this': (text, prompt) => {
    const s = sentences(text);
    const first = lower(s[0] || '');
    const namesBuyer = /\b(for the|for someone|for anyone|for people|if you|who needs|who wants|anyone who)\b/.test(first);
    const outcome = /\b(so you|so they|which means|save|avoid|finally|never again|in \d|under \d|\d+ (minutes|hours|days|percent|%))\b/.test(lower(text));
    const price = /(\$|£|€|\d+\s?(a month|per month|bucks|dollars|pounds|quid))|free|in exchange|trade|costs?/.test(lower(text));
    const ask = /(would you|shall we|can i|let'?s|try it|take it|say yes|shall i|want one|\?)/.test(lower(text));
    const features = (lower(text).match(/\b(and it also|plus it|features|comes with|as well as)\b/g) || []).length;
    return [
      { label: 'Named the buyer first', pass: namesBuyer, note: 'Open with "For the person who…" — it is the strongest line in selling.' },
      { label: 'One concrete outcome', pass: outcome, note: 'Say what changes: saves X, ends Y, in Z minutes.' },
      { label: 'Price or trade included', pass: price, note: 'Name a number or an exchange. Vagueness kills the close.' },
      { label: 'Ended with a clear ask', pass: ask, note: 'Ask for one specific action.' },
      { label: 'Not a feature list', pass: features === 0, note: 'Cut "and it also…" — one outcome beats three features.' },
    ];
  },

  objection: (text, prompt) => {
    const concern = contentWords(prompt);
    const echoed = concern.filter((w) => lower(text).includes(w)).length;
    const acknowledges = echoed >= 1 || /\b(fair|understand|hear you|makes sense|get that|good question|valid)\b/.test(lower(text));
    const buts = /\bbut\b/.test(lower(text));
    const reframe = /(\?|which means|so the question|what if|how about|the way i see it|here'?s what|most people)\b/.test(lower(text));
    const n = wc(text);
    const defensive = /\b(cheap|you're wrong|that's not true|actually we|we're the best|trust me)\b/.test(lower(text));
    return [
      { label: 'Acknowledged their words', pass: acknowledges, note: 'Repeat the concern back before answering it.' },
      { label: 'No "but"', pass: !buts, note: '"But" erases everything before it.' },
      { label: 'Reframed or asked', pass: reframe, note: 'Second sentence: reframe, or ask a question.' },
      { label: 'Two sentences, under 35 words', pass: n > 0 && n <= 35, note: `${n} words.` },
      { label: 'Not defensive', pass: !defensive, note: 'Justifying your price is the tell that the objection landed.' },
    ];
  },

  'cold-open': (text, prompt) => {
    const s = sentences(text);
    const first = lower(s[0] || '');
    const claim = first.length > 12 && !/^(i'?m going to|i want to talk|today i|so um|um)\b/.test(first);
    const example = /\b(for example|for instance|like when|once|last week|i remember|imagine|picture)\b/.test(lower(text));
    const closes = s.length >= 3;
    const n = wc(text);
    return [
      { label: 'Opened with a claim', pass: claim, note: 'A claim, not an announcement of what you are about to say.' },
      { label: 'Included an example', pass: example, note: 'One concrete instance makes the claim believable.' },
      { label: 'Had a shape', pass: closes, note: 'Aim for claim → example → close.' },
      { label: 'Long enough to be a rep', pass: n >= 25, note: `${n} words — 25+ makes it a real rep.` },
      { label: 'Low filler', pass: !has(text, FILLERS) && !has(text, ['um']), note: 'Fillers detected — slow down and pause instead.' },
    ];
  },

  'frame-flip': (text, prompt) => {
    const t = lower(text);
    const accepts = /\b(thank|thanks|i'?ll take that|guilty|correct|glad|i do|fair)\b/.test(t);
    const generous = /\b(means|i try|take that as|compliment|i'?ll take|generous|best kind)\b/.test(t);
    const handsBack = /\b(what about you|your turn|yours|what'?s your|and you|how about you)\b/.test(t);
    const warm = !has(text, AGGRESSION) && !has(text, HEDGES.slice(0, 6));
    const n = wc(text);
    return [
      { label: 'Took it as praise', pass: accepts && generous, note: 'Accept the word literally, then give it a flattering meaning.' },
      { label: 'Handed something back', pass: handsBack, note: 'Give them a question or a compliment — leave them somewhere to stand.' },
      { label: 'No wince', pass: warm, note: 'No hedging ("sort of", "maybe") — it reveals the jab landed.' },
      { label: 'Short and calm', pass: n > 0 && n <= 30, note: `${n} words; brevity is the calm.` },
    ];
  },

  'rapid-fire': (text) => {
    const n = wc(text);
    const s = sentences(text);
    const filler = has(text, FILLERS);
    const concrete = /\b(last week|yesterday|my|a man|a woman|in (january|february|march|april|may|june|july|august|september|october|november|december)|at the|on the)\b/.test(lower(text));
    return [
      { label: 'Three sentences', pass: s.length >= 3, note: `${s.length} sentences — one per word.` },
      { label: 'Under 45 words', pass: n > 0 && n <= 45, note: `${n} words.` },
      { label: 'No fillers', pass: !filler, note: 'Fillers detected — trust the next word and keep moving.' },
      { label: 'Something concrete', pass: concrete, note: 'Name a person, a place or a time in at least one sentence.' },
      { label: 'Not one long run-on', pass: n / Math.max(1, s.length) <= 18, note: 'Sentences are long — each should stand alone.' },
    ];
  },

  'pitch-15': (text) => {
    const n = wc(text);
    const first = lower(sentences(text)[0] || text);
    const audience = /\b(for (the|people|teams|anyone|someone|a)|if you|when you|anyone who|people who)\b/.test(first);
    const outcome = /\b(so you|so they|which means|save|avoid|in \d|under \d|\d+ ?(minute|hour|day|week|percent|%|k|pounds|dollars))\b/.test(lower(text));
    const differs = /\b(unlike|instead of|rather than|whereas|other|most)\b/.test(lower(text));
    const jargon = /\b(synergy|leverage|holistic|paradigm|disrupt|solution-oriented|best-in-class)\b/.test(lower(text));
    return [
      { label: 'Audience named first', pass: audience, note: 'Open with who it is for — "for people who…".' },
      { label: 'One outcome with a number', pass: outcome, note: 'Say what changes, with a number in it.' },
      { label: 'Differentiated from the alternative', pass: differs, note: 'Add "unlike X" so they know what to compare.' },
      { label: 'Under 45 words', pass: n > 0 && n <= 45, note: `${n} words — trim to 45.` },
      { label: 'No jargon', pass: !jargon, note: 'Jargon detected. Say the plain version.' },
    ];
  },

  bridge: (text, prompt) => {
    const n = wc(text);
    const opens = /^(yes|that'?s fair|fair|you'?re right|it'?s true|i accept|the delay|the price|we did|i did|good question|understandably)/.test(lower(text));
    const bridges = /\b(what matters|the bigger (question|point)|what i would say|more important|the real question|what changed|since then|here'?s the thing)\b/.test(lower(text));
    const message = /\b(\d|now we|we now|since|so far|we shipped|we fixed|we changed|last \w+)\b/.test(lower(text));
    const defends = /\b(but you|that'?s not true|you'?re wrong|actually,? no)\b/.test(lower(text));
    const repeats = contentWords(prompt).filter((w) => /\.$/.test(w));
    return [
      { label: 'Acknowledged without arguing', pass: opens, note: 'Open by conceding the true part, in one short sentence.' },
      { label: 'Used a bridge phrase', pass: bridges, note: 'Bridge: "what matters here is…" / "what changed was…".' },
      { label: 'Delivered a fact, not a slogan', pass: message, note: 'The message needs a number or a dated change.' },
      { label: 'Did not attack back', pass: !defends, note: 'No counter-attack — that hands them the frame.' },
      { label: 'Under 60 words', pass: n > 0 && n <= 60, note: `${n} words.` },
    ];
  },

  spine: (text) => {
    const t = lower(text);
    const beats = [
      ['once', /\b(once|there was|there were|we had|i had)\b/],
      ['every day', /\b(every day|each week|usually|always|routine|normally)\b/],
      ['until one day', /\b(until|then one|one day|suddenly|when)\b/],
      ['because of that', /\b(because of that|so|therefore|which meant|as a result)\b/],
      ['until finally', /\b(until finally|in the end|eventually|finally)\b/],
      ['ever since', /\b(ever since|since then|now we|these days|to this day)\b/],
    ];
    const found = beats.filter(([, re]) => re.test(t)).length;
    const turnEarly = t.indexOf('until') > -1 && t.indexOf('until') < t.length * 0.6;
    const meaning = /\b(ever since|since then|now we|these days|to this day)\b/.test(t);
    return [
      { label: `${found}/6 beats present`, pass: found >= 5, note: 'Missing beats: build once / every day / until / because / finally / ever since.' },
      { label: 'Turn arrives early', pass: turnEarly, note: 'The disruption should land in the first third.' },
      { label: 'Ends on meaning', pass: meaning, note: 'Close on "and ever since…" — that is where the point lives.' },
      { label: 'Has a consequence chain', pass: /\b(because of that|which meant|as a result|so )\b/.test(t), note: 'Add a consequence, not a new event.' },
      { label: 'Long enough to be a story', pass: wc(text) >= 40, note: `${wc(text)} words — aim for 60–120.` },
    ];
  },
};

export function scoreGame({ gameId, text = '', prompt = '' }) {
  const rubric = RUBRICS[gameId];
  if (!rubric) return { score: 0, checks: [], verdict: 'Unknown game.' };

  const checks = rubric(text, prompt).map((c) => ({ ...c, note: c.pass ? '' : c.note }));
  const passed = checks.filter((c) => c.pass).length;
  const score = Math.round((passed / checks.length) * 100);

  const firstMiss = checks.find((c) => !c.pass);
  const verdict =
    score === 100 ? 'Clean rep. Do it once more with a harder prompt.'
      : score >= 70 ? 'Solid. One thing to fix.'
        : score >= 40 ? 'Halfway there — fix the first red line.'
          : 'Rough rep. That is fine: rewrite it once, immediately.';

  return {
    score,
    checks,
    verdict,
    fix: firstMiss ? firstMiss.note : '',
    coach: firstMiss ? `Next rep: ${firstMiss.note}` : 'Now do the same prompt in half the words.',
  };
}

// Deterministic daily rotation so the same day gives the same prompts.
export function promptFor(game, seed = 0) {
  if (game.prompter === 'words') {
    const pool = [...game.words];
    const out = [];
    let s = seed + 7;
    for (let i = 0; i < 3; i++) {
      s = (s * 1103515245 + 12345) % 2147483648;
      const idx = s % pool.length;
      out.push(pool.splice(idx, 1)[0]);
    }
    return out.join(' / ');
  }
  const pool = game.prompts || [];
  if (!pool.length) return '';
  const s = (seed * 2654435761) % 2147483648;
  return pool[Math.abs(s) % pool.length];
}
