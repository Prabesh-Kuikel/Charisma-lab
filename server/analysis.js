// ─────────────────────────────────────────────────────────────
//  Charisma Lab · Analysis Engine
//  Heuristic NLP scoring: clarity, structure, tone, energy,
//  wit detection, and a stateful conversation partner.
// ─────────────────────────────────────────────────────────────

export const FILLERS = ['um', 'uh', 'erm', 'like', 'basically', 'actually', 'literally', 'sort of', 'kind of', 'you know', 'i mean', 'right', 'okay so', 'so yeah', 'anyway', 'stuff like that', 'whatever'];
export const HEDGES = ['maybe', 'i guess', 'i think', 'sort of', 'kind of', 'perhaps', 'probably', 'just', 'a little bit', 'i might', 'possibly', 'hopefully', 'i feel like', 'not sure', 'i suppose'];
export const POWER = ['will', 'must', 'decided', 'committed', 'clear', 'because', 'therefore', 'precisely', 'exactly', 'guarantee', 'lead', 'built', 'shipped', 'fixed', 'learned', 'chose', 'owned', 'i know', 'we did', 'i did'];
export const STRUCTURE = ['first', 'second', 'third', 'finally', 'next', 'then', 'because', 'for example', 'for instance', 'the reason', 'so what', 'which means', 'in short', 'to sum up', 'the point is', 'picture this', 'imagine', 'here\'s the thing'];
export const WARMTH = ['thank', 'appreciate', 'glad', 'love', 'enjoy', 'wonderful', 'help', 'together', 'understand', 'kind', 'generous', 'you should', 'your', 'we ', 'us ', 'our '];
export const AGGRESSION = ['stupid', 'idiot', 'shut up', 'hate', 'pathetic', 'moron', 'loser', 'dumb', 'ridiculous', 'always', 'never', 'wrong', 'you people'];
export const HUMOUR = ['joke', 'ha', 'funny', 'honestly', 'apparently', 'somehow', 'technically', 'allegedly', 'great', 'amazing', 'brilliant', 'presumably'];
export const ENERGY = ['absolutely', 'incredible', 'huge', 'massive', 'love', 'amazing', 'excited', 'brilliant', 'yes', 'wow', 'finally', 'genuinely', 'seriously', 'real'];
export const VAGUE = ['things', 'stuff', 'some', 'various', 'several', 'etc', 'and so on', 'whatever', 'nice', 'good', 'interesting', 'cool'];
export const COURTESY_OPENERS = ['hey', 'hi', 'hello', 'so,', 'okay', 'look,', 'right,'];
export const CURIOSITY = ['what', 'how', 'why', 'which', 'tell me', 'how come', 'what\'s'];

const clamp = (n, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, n));
const countOcc = (text, phrases) => {
  let n = 0;
  for (const p of phrases) {
    const re = new RegExp(`\\b${p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    n += (text.match(re) || []).length;
  }
  return n;
};
const sentencesOf = (t) => t.split(/[.!?]+/).map((s) => s.trim()).filter((s) => s.length > 0);
const wordsOf = (t) => t.toLowerCase().match(/[a-z']+/g) || [];

// ── Text profile ────────────────────────────────────────────
export function profileText(transcript) {
  const t = (transcript || '').trim();
  const lower = t.toLowerCase();
  const words = wordsOf(t);
  const sentences = sentencesOf(t);
  const unique = new Set(words);
  const sentLens = sentences.map((s) => wordsOf(s).length).filter((n) => n > 0);
  const avgSent = sentLens.length ? sentLens.reduce((a, b) => a + b, 0) / sentLens.length : 0;
  const longSent = sentLens.filter((n) => n > 28).length;
  const fillerCount = countOcc(lower, FILLERS);
  const hedgeCount = countOcc(lower, HEDGES);
  const powerCount = countOcc(lower, POWER);
  const structureCount = countOcc(lower, STRUCTURE);
  const warmthCount = countOcc(lower, WARMTH);
  const aggroCount = countOcc(lower, AGGRESSION);
  const humourCount = countOcc(lower, HUMOUR);
  const energyCount = countOcc(lower, ENERGY);
  const vagueCount = countOcc(lower, VAGUE);
  const questions = (t.match(/\?/g) || []).length;
  const youCount = countOcc(lower, ['you', 'your', 'yours']);
  const iCount = countOcc(lower, ['i', 'me', 'my', 'mine']);

  return {
    chars: t.length,
    words: words.length,
    sentences: sentences.length,
    avgSent,
    longSent,
    fillerCount,
    fillerRate: words.length ? (fillerCount / words.length) * 100 : 0,
    hedgeCount,
    powerCount,
    structureCount,
    warmthCount,
    aggroCount,
    humourCount,
    energyCount,
    vagueCount,
    questions,
    youCount,
    iCount,
    ttr: words.length ? unique.size / words.length : 0,
    longestWords: [...unique].filter((w) => w.length >= 9).slice(0, 8),
    hasNumbers: /\b\d+[%km]?\b/.test(lower),
    hasStory: /\b(when|then|so|last|once|remember)\b/.test(lower) && /\b(i|we)\b/.test(lower),
  };
}

// ── Speaking analysis ───────────────────────────────────────
export function analyzeSpeech({ transcript = '', mode = 'impromptu', metrics = {}, promptText = '' }) {
  const p = profileText(transcript);
  const wpm = metrics.wpm || (metrics.durationSec ? Math.round((p.words / metrics.durationSec) * 60) : 0);
  const hasText = p.words >= 8;

  // Clarity — sentence length, filler, hedging, vagueness
  let clarity = 72;
  if (p.avgSent > 26) clarity -= 14;
  else if (p.avgSent > 20) clarity -= 6;
  else if (p.avgSent >= 7 && p.avgSent <= 18) clarity += 10;
  if (p.avgSent > 0 && p.avgSent < 5) clarity -= 6;
  clarity -= Math.min(24, p.fillerRate * 2.6);
  clarity -= Math.min(12, p.hedgeCount * 1.1);
  clarity -= Math.min(10, p.vagueCount * 1.2);
  clarity += Math.min(8, p.ttr > 0.45 ? 6 : 0);
  if (p.longSent > 2) clarity -= 6;

  // Structure — framework markers, connectivity, openings & closings
  let structure = 55;
  structure += Math.min(26, p.structureCount * 5);
  if (/\b(first|second|third)\b/.test(transcript.toLowerCase())) structure += 8;
  if (/\b(for example|for instance|picture this|imagine)\b/.test(transcript.toLowerCase())) structure += 7;
  if (/\b(in short|to sum up|so the point is|that's why|bottom line)\b/.test(transcript.toLowerCase())) structure += 8;
  if (p.sentences >= 4 && p.sentences <= 14) structure += 6;
  if (p.sentences < 3) structure -= 12;

  // Tone — warmth vs aggression, hedging balance, humour
  let tone = 62;
  tone += Math.min(16, p.warmthCount * 2.2);
  tone -= Math.min(26, p.aggroCount * 6);
  tone += Math.min(9, p.humourCount * 2.4);
  tone -= Math.min(10, Math.max(0, p.hedgeCount - 3) * 1.4);
  if (p.youCount > p.iCount * 0.4) tone += 6;

  // Energy — power words, intensity, pace, questions
  let energy = 58;
  energy += Math.min(18, p.energyCount * 3);
  energy += Math.min(14, p.powerCount * 2.2);
  energy += Math.min(8, p.questions * 3);
  if (wpm) {
    if (wpm < 95) energy -= 12;
    else if (wpm < 115) energy -= 4;
    else if (wpm <= 165) energy += 9;
    else if (wpm <= 190) energy -= 3;
    else energy -= 10;
  }
  if (metrics.rmsVariance != null) {
    // dynamic vocal variation = life in the voice
    energy += clamp((metrics.rmsVariance - 0.02) * 400, -8, 10);
  }
  if (metrics.pauseCount != null) {
    if (metrics.pauseCount >= 3 && metrics.pauseCount <= 18) energy += 5;
    else if (metrics.pauseCount > 26) energy -= 5;
  }

  // Length adequacy
  let lengthFit = 0;
  const words = p.words;
  if (hasText) {
    if (words < 40) lengthFit = -18;
    else if (words < 80) lengthFit = -8;
    else if (words <= 340) lengthFit = 6;
    else if (words <= 520) lengthFit = 2;
    else lengthFit = -8;
  }

  const scores = {
    clarity: Math.round(clamp(clarity)),
    structure: Math.round(clamp(structure)),
    tone: Math.round(clamp(tone)),
    energy: Math.round(clamp(energy)),
  };
  const overall = Math.round(clamp(
    (scores.clarity * 0.3 + scores.structure * 0.28 + scores.tone * 0.22 + scores.energy * 0.2) + lengthFit
  ));

  const strengths = [];
  const fixes = [];

  if (scores.clarity >= 75) strengths.push(`Clear phrasing — average sentence length ${p.avgSent.toFixed(1)} words with only ${p.fillerCount} filler${p.fillerCount === 1 ? '' : 's'}.`);
  else fixes.push(p.fillerRate > 2.2
    ? `Filler density is ${p.fillerRate.toFixed(1)}% (${p.fillerCount} hits). Target under 1.5% — replace "um" with a silent breath.`
    : `Sentences average ${p.avgSent.toFixed(0)} words. Cut each one to a single idea and aim for 8–18 words.`);

  if (p.hedgeCount > 2) fixes.push(`${p.hedgeCount} hedges detected ("I think", "sort of", "maybe"). Delete them — hedged opinions are not opinions.`);
  if (p.vagueCount > 3) fixes.push(`${p.vagueCount} vague words ("things", "stuff", "nice"). Swap each for a concrete noun.`);

  if (scores.structure >= 75) strengths.push(`Structure is audible — ${p.structureCount} connective markers give the listener a map.`);
  else fixes.push(p.structureCount < 2
    ? 'No framework markers. Use PREP (Point → Reason → Example → Point) or first/second/third so the listener can follow.'
    : 'Add an explicit close: "so the point is…" or "that\'s why…". Speeches that stop instead of ending feel unfinished.');

  if (scores.tone >= 75) strengths.push('Tone reads warm and secure — you are speaking to the listener, not at them.');
  else if (p.aggroCount > 1) fixes.push('Aggressive language detected. Take the heat out of the words and put it into the pause.');
  else fixes.push('Increase warmth: address the listener directly ("you", "your") and add one specific acknowledgement.');

  if (scores.energy >= 75) strengths.push(wpm ? `Delivery energy is strong at ${wpm} wpm.` : 'Energy and conviction language are strong.');
  else fixes.push(wpm && wpm < 110
    ? `Pace is ${wpm} wpm — slightly slow. Push to 130–155 wpm for momentum, and vary it around your key line.`
    : wpm && wpm > 185
      ? `Pace is ${wpm} wpm — too fast. Drop to 140–160 and add three deliberate pauses.`
      : 'Add conviction: at least three power words ("I decided", "we will", "precisely") and one deliberate pause before your main point.');

  if (!hasText) fixes.unshift('No transcript was captured — clarity scoring is limited. Enable microphone transcription for a full read.');

  const drill = suggestDrill(scores, p);
  return {
    overall, scores, wpm, words: p.words, profile: p,
    strengths: strengths.slice(0, 4),
    fixes: fixes.slice(0, 5),
    drill,
    verdict: verdictFor(overall),
    mode,
    hasTranscript: hasText,
  };
}

function verdictFor(n) {
  if (n >= 88) return 'Commanding. This is the version you should keep.';
  if (n >= 76) return 'Strong. Small refinements would make this memorable.';
  if (n >= 62) return 'Competent. The ideas are there; the delivery is leaking a little.';
  if (n >= 45) return 'Workable but nervous. Structure and pace are the fast wins.';
  return 'Raw. Good — you have a baseline. Start with clarity and one structure.';
}

function suggestDrill(scores, p) {
  const lowest = Object.entries(scores).sort((a, b) => a[1] - b[1])[0][0];
  return {
    clarity: { name: 'Verse Reps', text: 'Speak the same 90-second answer in 5–8 word chunks, breathing at every full stop. Three rounds.', lab: 'pronunciation' },
    structure: { name: 'PREP Sprint', text: 'Answer the same question three times, each in Point → Reason → Example → Point. No preamble.', lab: 'impromptu' },
    tone: { name: 'The Warmth Pass', text: 'Retell your answer with the listener as the subject of every second sentence ("you", "your").', lab: 'arena' },
    energy: { name: 'Pace & Pause', text: 'Deliver it once at 150 wpm with three 2-second pauses before the three biggest words.', lab: 'impromptu' },
  }[lowest];
}

// ── Pronunciation / tongue twister scoring ──────────────────
export function scorePronunciation({ target = '', heard = '', durationSec = 0, attempts = 1 }) {
  const clean = (s) => s.toLowerCase().replace(/[^a-z0-9' ]/g, ' ').replace(/\s+/g, ' ').trim();
  const tgt = clean(target).split(' ').filter(Boolean);
  const hr = clean(heard).split(' ').filter(Boolean);
  if (!hr.length) {
    return { accuracy: 0, message: 'No speech detected. Check your microphone and try again.', words: [], wpm: 0, streak: 0 };
  }
  const used = new Array(hr.length).fill(false);
  const words = tgt.map((w) => {
    let idx = hr.findIndex((h, i) => !used[i] && h === w);
    if (idx === -1) idx = hr.findIndex((h, i) => !used[i] && (levRatio(h, w) >= 0.75 || h.includes(w) || w.includes(h)));
    if (idx === -1) return { word: w, hit: false };
    used[idx] = true;
    return { word: w, hit: true, exact: hr[idx] === w };
  });
  const hit = words.filter((w) => w.hit).length;
  const exact = words.filter((w) => w.exact).length;
  const accuracy = Math.round(clamp((hit / tgt.length) * 70 + (exact / tgt.length) * 30));
  const wpm = durationSec ? Math.round((hr.length / durationSec) * 60) : 0;
  const speedAdj = wpm >= 110 && wpm <= 230 ? 8 : wpm > 270 ? -8 : wpm < 70 ? -7 : 0;
  const finalAccuracy = Math.round(clamp(accuracy + (accuracy > 70 ? speedAdj : 0)));
  const paceNote = wpm && wpm < 80 ? ' Pace is slow — accuracy first, then rebuild speed.' : '';
  const message = (finalAccuracy >= 92
    ? `Clean. ${wpm} wpm with full articulation — this is performance-ready speed.`
    : finalAccuracy >= 78
      ? `Solid. You kept the rhythm; ${words.filter(w => !w.hit).length || 'a few'} consonant cluster slipped. Slow by 10% and exaggerate.`
      : finalAccuracy >= 55
        ? 'Recognisable but the consonants are blurring. Do it at half speed with a visible mouth, then rebuild.'
        : 'The cluster broke down. Split the phrase into two-word chunks and repeat each three times before recombining.') + paceNote;
  return { accuracy: finalAccuracy, message, words, wpm, hitRate: hit / tgt.length };
}

function levRatio(a, b) {
  const m = a.length, n = b.length;
  if (!m || !n) return 0;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) {
    dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  }
  return 1 - dp[m][n] / Math.max(m, n);
}

// ── Wit scoring ─────────────────────────────────────────────
const STRATEGY_SIGNALS = {
  'agree-amp': [/\byou'?re right\b/, /\bguilty\b/, /\bfair\b/, /\btrue\b/, /\bi do\b/, /\bcan'?t argue\b/, /\bcorrect\b/],
  'deadpan': [/\bnoted\b/, /\bcorrect\b/, /\bmoving on\b/, /\bfine\b/, /\bthat happened\b/, /\.\.\./],
  'self-deprecation': [/\bmy fault\b/, /\bme\b.*\b(wrong|bad|terrible)\b/, /\bi once\b/, /\bi'?m not\b/, /\bmy (taste|memory|timing|excuse|playlist)\b/, /\bi deserve\b/, /\b(i|i'?m|my)\b[^.!?]{0,45}\b(excuse|worst|terrible|mess|disaster|late|lost|forgot|failing|failed|bad at)\b/, /\bbest i (got|had|can do)\b/, /\bup all night\b/, /\bretirement home\b/, /\bdidn'?t survive\b/],
  'callback': [/\bremember\b/, /\bearlier\b/, /\bbefore\b/, /\bstill\b/, /\bagain\b/, /\byou said\b/],
  'escalation': [/\bactually\b.*\bmore\b/, /\band then\b/, /\beven better\b/, /\bnext (track|level|time)\b/, /\bat least\b/],
  'charm-flip': [/\bthank you\b/, /\bcompliment\b/, /\bi'?ll take that\b/, /\bgenerous\b/, /\bwhat'?s your version\b/],
  'curiosity': [/\bwhat\b/, /\bhow\b/, /\bwhich\b/, /\btell me\b/],
  'brevity': [],
  'calm-competence': [/\bspecifically\b/, /\btwice\b/, /\bninety seconds\b/, /\bhere'?s what\b/, /\bconcretely\b/, /\bfor example\b/],
  'ask-question': [/\?$/],
  'playful-challenge': [/\bthree minutes\b/, /\bpayment\b/, /\bdeal\b/, /\bI'?ll take\b/, /\byou owe\b/, /\bchallenge\b/],
  'reframe': [/\bdifferent thing\b/, /\bwhat i'?m charging for\b/, /\bthat'?s fair\b/, /\bframe\b/, /\bnot the same\b/],
  'credit-share': [/\bshe\b/, /\bhe\b/, /\bthey\b/, /\bteam\b/, /\bbecause\b.*\b(helped|fixed|built)\b/],
  'specific-gratitude': [/\bthank you\b/, /\bmeans a lot\b/, /\bappreciate\b/, /\bi rehearsed\b/],
  'anti-deflect': [/\bthank you\b/, /\bi'?ll take\b/, /\bglad\b/, /\bgood to hear\b/],
  'boundary-warm': [/\bone breath\b/, /\btwenty seconds\b/, /\bafter that\b/, /\bhold that thought\b/, /\bi need\b/],
  'grace': [/\bfair enough\b/, /\bglad you\b/, /\bgood to meet\b/, /\btotally\b/],
  'generosity': [/\bi'?ll cover\b/, /\bmy round\b/, /\bon me\b/, /\bi'?ve got it\b/],
  'honesty-warm': [/\bhonest\b/, /\bi don'?t remember\b/, /\bnot going to pretend\b/, /\bthat was me\b/, /\bi did\b/],
  'warm-entry': [/\bhi\b/, /\bhey\b/, /\bmind if\b/, /\bdo you\b/],
  'low-stakes': [/\btrade\b/, /\bi'?ll tell you\b/, /\bone useless fact\b/, /\bif you\b/],
  'trade': [/\bif you\b/, /\bin exchange\b/, /\bdeal\b/, /\bwhat if\b/],
  'hold-frame': [/\bone breath\b/, /\bi'?ll finish\b/, /\bthen it'?s yours\b/],
  'exit': [/\banyway\b/, /\bi should\b/, /\blet you go\b/, /\bnice meeting\b/],
};

export function scoreWit({ scenario = {}, response = '' }) {
  const t = (response || '').trim();
  const p = profileText(t);
  const lower = t.toLowerCase();
  const words = p.words;

  const detected = [];
  for (const [key, sigs] of Object.entries(STRATEGY_SIGNALS)) {
    if (sigs.some((re) => re.test(lower))) detected.push(key);
  }
  const targets = scenario.strategies || [];
  const matchedTargets = detected.filter((d) => targets.includes(d));
  const offTarget = detected.filter((d) => !targets.includes(d));

  let humour = 54 + Math.min(20, p.humourCount * 5);
  if (/\b(actually|technically|apparently|honestly|presumably|somehow)\b/.test(lower)) humour += 8;
  if (detected.includes('callback')) humour += 10;
  if (detected.includes('self-deprecation')) humour += 7;
  if (/[?!]/.test(t) && words <= 40) humour += 3;
  if (detected.includes('escalation')) humour += 6;

  let timing = 55;
  if (words >= 8 && words <= 38) timing += 22;
  else if (words < 8) timing += words >= 4 ? 6 : -10;
  else if (words <= 55) timing += 2;
  else timing -= 18;
  if (/!/.test(t)) timing -= 3;
  if ((t.match(/\./g) || []).length >= 1 && words < 45) timing += 5;

  let warmth = 58 + Math.min(12, p.warmthCount * 3) - Math.min(30, p.aggroCount * 8);
  if (p.questions > 0) warmth += 6;
  if (detected.includes('charm-flip') || detected.includes('grace')) warmth += 8;
  if (/\b(you|your)\b/.test(lower) && p.iCount < words * 0.25) warmth += 4;

  let strategy = 48 + matchedTargets.length * 16 + Math.min(8, offTarget.length * 2);

  const overall = Math.round(clamp(humour * 0.24 + timing * 0.22 + warmth * 0.24 + strategy * 0.3));

  const positives = [];
  const fixes = [];
  if (matchedTargets.length) positives.push(`You used ${matchedTargets.map((m) => m).length} of the strategies that fit this scenario (${matchedTargets.join(', ')}).`);
  if (words >= 8 && words <= 38) positives.push(`Length is right — ${words} words lands before the room loses interest.`);
  if (warmth > 68) positives.push('Warmth is preserved, so the line reads as confidence rather than attack.');
  if (detected.includes('callback')) positives.push('Callback detected — reusing a live reference is the cheapest laugh in the room.');

  if (!matchedTargets.length) fixes.push(`This scenario rewards ${targets.join(' / ')}. Try one of those frames explicitly.`);
  if (words > 55) fixes.push(`${words} words is a paragraph, not a retort. Cut to under 35 and put the funny word last.`);
  if (words < 6) fixes.push('Too short to carry a frame. Add one concrete or absurd detail.');
  if (p.aggroCount > 0) fixes.push('Aggressive words detected. In banter, punch the situation or yourself — never the person.');
  if (!p.questions && warmth < 60) fixes.push('No question and no warmth — the safest escape hatch in a hostile moment is handing them an easy question.');

  const better = scenario.modelLines?.[Math.floor(Math.random() * (scenario.modelLines?.length || 1))] || '';
  return {
    overall,
    scores: {
      humour: Math.round(clamp(humour)),
      timing: Math.round(clamp(timing)),
      warmth: Math.round(clamp(warmth)),
      strategy: Math.round(clamp(strategy)),
    },
    detected, matchedTargets,
    positives: positives.slice(0, 3),
    fixes: fixes.slice(0, 3),
    coaching: scenario.coaching,
    modelLine: better,
    verdict: overall >= 82 ? 'Sharp. That would land in the room.' : overall >= 66 ? 'Good bones — one tighter ending and it sings.' : overall >= 48 ? 'Workable. The instinct is right; the shape is loose.' : 'Not yet. Read the scenario\'s coaching line and steal the structure.',
  };
}

// ── Conversation Arena engine ───────────────────────────────
const PERSONA_KEYS = {
  maya: { likes: [/mud|sensor|farm|field|hardware|messy|honest/i, /why|how come|what made|actually/i], dislikes: [/synergy|disrupt|space|pitch|raise|invest|networking is/i] },
  daniel: { likes: [/\d+|percent|weeks|shipped|shipped|failed|learned/i, /^.{0,120}$/], dislikes: [/passionate|vision|hardworking|excited to|opportunity|job|hire me/i] },
  alea: { likes: [/weird|embarrass|red flag|worst|unpopular|honestly/i, /\b(i hate|i love|i once)\b/i], dislikes: [/where do you work|what do you do|hobbies|how old|travel much/i] },
  jonah: { likes: [/football|match|school|tired|week|honestly/i, /\?$/], dislikes: [/crypto|business|linkedin|growth/i] },
  priya: { likes: [/i'?m sorry|i apolog|that'?s on me|you'?re right|i should have|the impact/i], dislikes: [/but |however|actually,|to be fair|the reason was|process/i] },
  marco: { likes: [/here'?s what i'?ll do|tonight|by \w+day|owner|i own|my fault|you'?ll know before/i], dislikes: [/policy|unfortunately|as per|escalate|discount/i] },
  elena: { likes: [/\d|percent|number|risk|wrong|don'?t know|honest/i], dislikes: [/huge market|revolutionary|disrupt|game.?chang|trust me/i] },
};

export function arenaReply({ scenario, history = [], message = '', turn = 0 }) {
  const t = (message || '').trim();
  const p = profileText(t);
  const lower = t.toLowerCase();
  const keys = PERSONA_KEYS[scenario.id] || { likes: [], dislikes: [] };
  const userTurns = history.filter((h) => h.role === 'user');

  let trust = 50;
  const notes = [];

  // Length window
  if (p.words === 0) trust -= 20;
  else if (p.words < 5) { trust -= 12; notes.push('Very short reply — the other person has nothing to work with.'); }
  else if (p.words <= 12) trust -= 2;
  else if (p.words <= 55) trust += 8;
  else if (p.words <= 90) { trust += 2; notes.push('Long answer — it reads slightly like a monologue.'); }
  else { trust -= 14; notes.push('That is a speech, not a turn. Cut it in half.'); }

  // Questions
  if (/\?/.test(t)) { trust += 9; notes.push('Good: you handed the conversation back with a question.'); }
  else if (p.words > 20) { trust -= 4; notes.push('No question — momentum depends on them carrying it.'); }

  // Specificity
  if (p.hasNumbers) trust += 5;
  if (p.vagueCount > 2) { trust -= 6; notes.push('Vague words ("things", "stuff") cost you credibility with this persona.'); }

  // Hedging
  if (p.hedgeCount > 2) { trust -= 7; notes.push('Hedging detected — this persona reads hesitation as a lack of substance.'); }
  if (p.fillerRate > 3) { trust -= 6; notes.push('Filler density is high. Slow down and breathe instead of filling.'); }

  // Self vs other focus
  const selfFocus = p.iCount + countOcc(lower, ['my ', 'mine']);
  const otherFocus = p.youCount;
  if (otherFocus > selfFocus) { trust += 7; }
  else if (selfFocus > otherFocus * 2 && p.words > 25) { trust -= 8; notes.push('You talked mostly about yourself. This persona rewards attention going outward.'); }

  // Persona-specific likes/dislikes
  if (keys.likes.some((re) => re.test(t))) { trust += 10; notes.push('You touched something this persona actually cares about.'); }
  if (keys.dislikes.some((re) => re.test(t))) { trust -= 13; notes.push('You triggered something this persona is allergic to.'); }

  // Callback: reference a detail the persona shared earlier
  const personaFacts = history.filter((h) => h.role === 'persona').map((h) => h.text).join(' ').toLowerCase();
  const sharedWords = wordsOf(t).filter((w) => w.length > 4 && personaFacts.includes(w));
  if (sharedWords.length >= 2) {
    trust += Math.min(10, sharedWords.length * 2.5);
    notes.push(`You referenced something they said earlier (${[...new Set(sharedWords)].slice(0, 3).join(', ')}) — that builds trust fast.`);
  }

  // Repetition penalty across turns
  const prior = userTurns.map((u) => u.text.toLowerCase()).join(' ');
  const repeats = wordsOf(t).filter((w) => w.length > 5 && prior.includes(w)).length;
  if (repeats > p.words * 0.5 && p.words > 10) notes.push('You are circling the same words — add a new angle.');

  if (!t) trust -= 25;

  trust = Math.round(clamp(trust, 0, 100));
  const tier = trust >= 72 ? 'warm' : trust >= 45 ? 'neutral' : 'cold';

  // choose reaction line
  const reactPool = scenario.reactions?.[tier] || ['Mm.'];
  const reaction = reactPool[Math.min(reactPool.length - 1, Math.floor((turn % reactPool.length)))];

  // choose next persona move
  const usedFacts = history.filter((h) => h.role === 'persona' && h.kind === 'fact').length;
  const facts = scenario.facts || [];
  const probes = scenario.probes || [];
  let kind, text;
  if (tier === 'cold' && Math.random() < 0.55) {
    kind = 'probe'; text = probes[turn % Math.max(1, probes.length)];
  } else if (usedFacts < facts.length && (tier !== 'cold' || turn > 2)) {
    kind = 'fact'; text = facts[usedFacts].text;
  } else if (probes.length) {
    kind = 'probe'; text = probes[turn % probes.length];
  } else {
    kind = 'reaction'; text = reaction;
  }

  // Persona-specific pressure questions when cold
  const coldPressure = {
    maya: 'Sorry — I\'m going to be honest, this is starting to feel like a pitch.',
    daniel: 'I\'m going to stop you there. What\'s the actual point?',
    alea: 'Okay, I\'m going to get another drink in a minute.',
    jonah: 'Right. Anyway.',
    priya: 'This isn\'t what I need to hear right now.',
    marco: 'You\'re losing me. Give me something concrete.',
    elena: 'I\'ve heard enough adjectives. Next.',
  };

  let line;
  if (tier === 'cold' && Math.random() < 0.45) {
    line = `${reaction} ${coldPressure[scenario.id] || ''}`.trim();
  } else if (kind === 'fact' && Math.random() < 0.5) {
    // a persona revealing something new rarely needs a preamble
    line = text;
  } else {
    line = `${reaction} ${text}`.trim();
  }

  const coach = notes.length ? notes[Math.floor(Math.random() * notes.length)] : null;

  return {
    reply: line,
    reaction,
    trustBefore: trust,
    trustDelta: trust - 50,
    tier,
    kind,
    coach,
    notes,
    wantsExit: turn >= 6 && tier === 'cold' || turn >= 11,
  };
}

export function arenaSummary({ scenario, history = [] }) {
  const userTurns = history.filter((h) => h.role === 'user');
  const joined = userTurns.map((u) => u.text).join(' ');
  const p = profileText(joined);
  const avgWords = userTurns.length ? Math.round(p.words / userTurns.length) : 0;
  const questions = (joined.match(/\?/g) || []).length;
  const scores = {
    curiosity: Math.round(clamp(40 + questions * 11 + Math.min(12, p.youCount * 1.5))),
    specificity: Math.round(clamp(45 + (p.hasNumbers ? 14 : 0) + Math.min(22, p.ttr * 45) - p.vagueCount * 3)),
    warmth: Math.round(clamp(52 + Math.min(20, p.warmthCount * 2.6) - p.aggroCount * 9 + (p.youCount > p.iCount ? 9 : 0))),
    momentum: Math.round(clamp(50 + Math.min(26, userTurns.length * 6) + (avgWords >= 12 && avgWords <= 55 ? 14 : -8))),
  };
  const overall = Math.round((scores.curiosity + scores.specificity + scores.warmth + scores.momentum) / 4);
  return { scores, overall, turns: userTurns.length, avgWords, questions };
}
