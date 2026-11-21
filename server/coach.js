// ─────────────────────────────────────────────────────────────
//  Charisma Lab · Coach
//  A local, deterministic assistant. No API key, no network:
//  intent detection + draft diagnostics + specific drills.
//  It is honest about being rule-based — see COACH_META.
// ─────────────────────────────────────────────────────────────

import { profileText, FILLERS, HEDGES } from './analysis.js';
import { SKILL_TRACKS } from './content/skills.js';
import { DAILY_DRILLS } from './content/daily.js';

export const COACH_META = {
  name: 'Coach',
  engine: 'local-rules',
  blurb: 'Rule-based coach: reads your words, names the pattern, gives you a rep. No API key, nothing leaves your device.',
};

const MODES = [
  { id: 'general', label: 'General', hint: 'Anything on your mind' },
  { id: 'sales', label: 'Sales', hint: 'Pitches, objections, closing' },
  { id: 'persuasion', label: 'Persuasion', hint: 'Disagreements, framing' },
  { id: 'flirting', label: 'Flirting', hint: 'Interest, warmth, exits' },
  { id: 'negotiation', label: 'Negotiation', hint: 'Numbers, silence, trades' },
  { id: 'creator', label: 'Creator', hint: 'Hooks, ideas, shipping' },
];
export const COACH_MODES = MODES;

const T = (skill) => SKILL_TRACKS.find((t) => t.id === skill) || SKILL_TRACKS[0];
// Drills referenced by intent are daily-drill ids; fall back to the
// skill track's first exercise if one is ever renamed.
const exercise = (skill, id) => {
  const drill = DAILY_DRILLS.find((d) => d.id === id);
  if (drill) return drill;
  const t = T(skill);
  return t.exercises.find((e) => e.id === id) || t.exercises[0];
};
const line = (skill, i = 0) => T(skill).scripts[i % T(skill).scripts.length];

const has = (t, list) => list.some((w) => t.includes(w));

// ── intent table ─────────────────────────────────────────────
const INTENTS = [
  { id: 'nerves', words: ['nervous', 'anxious', 'panic', 'scared', 'shaking', 'freeze', 'froze', 'blank', 'terrified'], skill: 'presence', ex: 'd-cold-open' },
  { id: 'silence', words: ['awkward', 'silence', 'nothing to say', 'ran out', 'stall', 'stalled', 'went quiet'], skill: 'presence', ex: 'd-pause' },
  { id: 'smalltalk', words: ['small talk', 'start a conversation', 'stranger', 'networking', 'party', 'introduce myself', 'intro'], skill: 'presence', ex: 'd-fork' },
  { id: 'objection', words: ['objection', 'too expensive', 'price', 'costly', 'not interested', 'think about it', 'pushback', 'push back', 'pushes back', 'pushed back', 'rejection', 'reject'], skill: 'sales', ex: 'd-objection' },
  { id: 'pitch', words: ['pitch', 'sell', 'selling', 'proposal', 'demo', 'client', 'close the deal', 'cold email'], skill: 'sales', ex: 'd-outcome' },
  { id: 'disagree', words: ['disagree', 'argument', 'argue', 'conflict', 'fight', 'wrong', 'they think', 'political', 'persuade'], skill: 'persuasion', ex: 'd-concede' },
  { id: 'negotiate', words: ['negotiat', 'salary', 'raise', 'offer', 'deal', 'counter', 'discount', 'budget', 'concession', 'walk away'], skill: 'negotiation', ex: 'd-batna' },
  { id: 'flirt', words: ['flirt', 'crush', 'attracted', 'tinder', 'ask her', 'ask him', 'asks me out', 'first date', 'romantic'], skill: 'flirting', ex: 'd-specific' },
  { id: 'rambling', words: ['rambl', 'too long', 'goes on', 'lost them', 'boring', 'tangent', 'shorter'], skill: 'storytelling', ex: 'd-one-sentence' },
  { id: 'joke', words: ['joke', 'funny', 'humour', 'humor', 'wit', 'banter', 'tease', 'laughed'], skill: 'humour', ex: 'd-punch' },
  { id: 'speech', words: ['speech', 'presentation', 'stage', 'audience', 'talk', 'slides', 'webinar', 'toast'], skill: 'presence', ex: 'd-verse' },
  { id: 'creator', words: ['content', 'post', 'video', 'audience', 'followers', 'creator', 'tiktok', 'linkedin', 'instagram', 'youtube', 'newsletter', 'hook'], skill: 'creator', ex: 'd-hook' },
  { id: 'consistency', words: ['consistent', 'motivat', 'habit', 'streak', 'procrastinat', 'discipline', 'keep up'], skill: 'presence', ex: 'd-cold-open' },
  { id: 'feedback', words: ['how was', 'rate', 'review my', 'feedback', 'what do you think', 'improve this', 'rewrite'], skill: 'presence', ex: 'd-react' },
];

const REPLIES = {
  nerves: (m, mode) => ({
    reply: 'Nerves are not a signal that something is wrong — they are a signal that you care and that your body has prepared for effort. The practical fix is not calming down, it is giving the energy somewhere to go: prepare the first fifteen seconds only, breathe out longer than you breathe in, and start with a claim so you are not deciding content and delivery at the same time.',
    why: 'Anxiety drops when the task stops being ambiguous. A rehearsed opening converts an open-ended threat into a task.',
    q: 'What is the specific moment you dread — the silence before you start, or being asked something you cannot answer?',
  }),
  silence: (m) => ({
    reply: 'Silence is only awkward if you treat it as a gap that you own. Change the ownership: let a pause run three seconds and look at the other person with a relaxed face. If you do need to speak, do not start a new topic — go one level deeper on the last thing they said. "What was that like?" is worth ten new topics.',
    why: 'Silence becomes comfortable when the same silence is not also filled with your internal commentary about it.',
    q: 'In the last awkward pause you had, whose turn was it, honestly?',
  }),
  smalltalk: () => ({
    reply: 'Skip the weather. Open with an observation about the room or a fork question that can only apply here: "How do you know the host?" or "Was the talk what you expected, or were you hoping for something more practical?" Then react to their answer in a full sentence before asking anything else — that reaction is what people experience as charm.',
    why: 'Small talk fails when it is an interview. It works when it is two reactions in a row.',
    q: 'Who is one person you will see this week that you could open with like that?',
  }),
  objection: (m) => {
    const sample = line('sales', 1);
    return {
      reply: `An objection is a request for proof, not a rejection. Two sentences: acknowledge in their words, then reframe with a question. Their version: "${sample.them}" — yours: "${sample.you}" Never say "but", and never defend the price; the defence is the tell that the objection landed.`,
      why: 'Defensiveness converts a question into a contest. A question hands the work back without pressure.',
      q: 'What is the exact wording of the objection you keep getting?',
    };
  },
  pitch: () => ({
    reply: 'Structure beats enthusiasm. Name the buyer in the first sentence ("for teams who…"), give one outcome with a number in it, then one piece of proof, then one ask. If you have three features, you have none — pick the one that changes their week.',
    why: 'Attention is spent on the first sentence. If it is about you, the rest is spent re-earning it.',
    q: 'What do they get in the first week, in one number?',
  }),
  disagree: () => ({
    reply: 'Concede first, and mean it. Then ask what would change their mind. That question is the single most useful tool in persuasion because it converts a fight into a definition, and it usually reveals the disagreement is smaller than both of you thought. If it does not, you at least know what evidence is worth gathering.',
    why: 'People defend positions they feel are being attacked, and examine positions they feel are being understood.',
    q: 'What is the strongest version of their argument — in their words, not yours?',
  }),
  negotiate: () => ({
    reply: 'The calm in a negotiation comes from knowing what you will do if it fails. Write that down first — a specific, survivable alternative. Then: let them anchor, name constraints rather than people, and treat every concession as a trade ("if you…, then I…"). After you name a number, stop talking. The silence is doing the work.',
    why: 'Leverage is not aggression; it is the visible absence of need.',
    q: 'What is your walk-away, concretely?',
  }),
  flirt: () => ({
    reply: 'Flirting is attention with warmth and no cost attached. Notice something real — a choice, a joke, a skill — say it specifically, then keep the conversation going. One playful tease maximum, and always followed by genuine interest. The strongest move in the whole repertoire is a warm exit that makes the next conversation easy to arrange.',
    why: 'Specificity proves attention; pressure kills it. Warmth plus specificity is the entire formula.',
    q: 'What is one specific thing you noticed about them that has nothing to do with how they look?',
  }),
  rambling: () => ({
    reply: 'Rambling is almost always a structure problem, not a content problem. Use the one-sentence rule: say your story in twenty-five words with one turn inside it. If it survives, you have the spine. If it collapses, you were not telling a story, you were describing a sequence — which is why it felt long.',
    why: 'A turn is what makes a listener lean in. Without one, length is just cost.',
    q: 'What is the one sentence version of the story you keep telling badly?',
  }),
  joke: () => ({
    reply: 'Humour is mostly editing. Move the funniest word to the end of the sentence and delete everything after it — no explanation, no little laugh, no apology. If a joke dies, do not rescue it; ask a question instead. The person who explains a dead joke is the only one still in the joke.',
    why: 'The laugh needs a landing place. The end of the sentence is the only one available.',
    q: 'What is a line you said recently that got a bigger laugh than you expected?',
  }),
  speech: () => ({
    reply: 'Three decisions before content: what is the one sentence they should repeat afterwards, where does the middle sag, and what is the relief. Then deliver in verse — five to eight word chunks, breathing at each boundary — and land the final word downward on your key lines. Walk in, stop, breathe, look up, then speak.',
    why: 'Structure fixes comprehension; pacing fixes attention; the start ritual fixes the room.',
    q: 'What is the one sentence you want remembered?',
  }),
  creator: () => ({
    reply: 'Publishing is a volume and editing problem, in that order. Pick one pillar, write ten hooks for a single idea, publish the one that makes you slightly nervous. Under 150 words, one idea, first line that survives being read alone. Do that five times before you judge whether it is working.',
    why: 'Taste improves faster than output. Publishing frequently is the only way to let taste catch up.',
    q: 'What is the one thing you know that your audience keeps getting wrong?',
  }),
  consistency: () => ({
    reply: 'Streaks are a bad master and a good servant. You are not behind anything — every course day, every drill and every game is open to you regardless of what you have or have not completed. Pick the smallest possible rep (three minutes), do it now, and let frequency do the work that intensity cannot.',
    why: 'Consistency is built by lowering the activation cost, not by raising motivation.',
    q: 'What is the three-minute version of the practice you keep postponing?',
  }),
  feedback: () => ({
    reply: 'Paste the draft or transcript and I will diagnose it properly — fillers, hedges, sentence length, structure markers, and whether the opening earns the second line. If it is a message you are about to send, I will also tell you what the other person is likely to be defending against.',
    why: 'Specific feedback requires specific text. Generous generalities do not change behaviour.',
    q: 'What are you trying to get them to do, in one sentence?',
  }),
};

const MODE_NUDGE = {
  sales: 'Keep it diagnosable: what do they want that they cannot currently get?',
  persuasion: 'Find the trade-off they are actually weighing.',
  flirting: 'Warmth plus specificity, minus pressure.',
  negotiation: 'Calm comes from the alternative, not from the argument.',
  creator: 'One idea, one hook, one action.',
  general: '',
};

function diagnose(text) {
  const p = profileText(text);
  const issues = [];
  if (p.fillerRate > 0.02) issues.push({ label: 'Fillers', detail: `${Math.round(p.fillerRate * 100)}% filler density — pause instead of "um".` });
  if (p.hedgeRate > 0.03) issues.push({ label: 'Hedging', detail: 'Hedges soften claims until they stop being claims. Cut "I think", "kind of", "just".' });
  if (p.avgSent > 24) issues.push({ label: 'Long sentences', detail: `Average ${Math.round(p.avgSent)} words. Break at every conjunction.` });
  if (p.avgSent < 8 && p.words > 25) issues.push({ label: 'Choppy', detail: 'Very short clauses back to back read as anxious. Join two.' });
  if (!p.structureHits) issues.push({ label: 'No structure markers', detail: 'Add "because", "for example", "which means" — they are the listener\'s handholds.' });
  if (p.wordCount < 15) issues.push({ label: 'Too thin', detail: 'Under 15 words is not a rep. Add the specific detail.' });
  return { profile: p, issues };
}

export function coachRespond({ message = '', history = [], mode = 'general' } = {}) {
  const text = String(message || '').trim();
  const lower = text.toLowerCase();
  const isDraft = text.split(/\s+/).filter(Boolean).length >= 35;

  // 1. A long paste is treated as a draft to diagnose.
  if (isDraft) {
    const { profile, issues } = diagnose(text);
    const top = issues.slice(0, 3);
    const verdict =
      issues.length === 0 ? 'This is already clean: no filler problem, sentences of a workable length, and structure markers present.'
        : `Three things, in order of payoff: ${top.map((i) => i.label.toLowerCase()).join(', ')}.`;
    return {
      kind: 'diagnosis',
      reply: `${verdict}\n\n${top.map((i, n) => `${n + 1}. ${i.label} — ${i.detail}`).join('\n') || ''}`,
      why: 'Diagnosis runs on the same analyser as the Impromptu Lab, so the numbers match what you see there.',
      stats: {
        words: profile.wordCount, sentences: profile.sentences,
        avgSentence: Math.round(profile.avgSent), fillers: profile.fillerCount, hedges: profile.hedgeCount,
      },
      drills: [exercise('presence', 'd-verse')],
      q: 'Want me to show you the rewrite with the worst sentence cut first?',
      mode,
    };
  }

  // 2. Intent match.
  // Score = number of matched cues, tie-broken by the longest matched phrase,
  // so "pushes back on price" beats the generic "freeze".
  let best = null;
  for (const it of INTENTS) {
    const matched = it.words.filter((w) => lower.includes(w));
    if (!matched.length) continue;
    const longest = Math.max(...matched.map((w) => w.length));
    const score = matched.length * 10 + longest;
    if (!best || score > best.score) best = { ...it, hits: matched.length, score };
  }

  if (!text) {
    return {
      kind: 'prompt',
      reply: 'Tell me the situation — a conversation you are dreading, a line that did not land, a draft you are about to send. Or pick a mode above and describe what happened.',
      drills: [exercise('presence', 'd-fork')],
      q: 'What is the next conversation you are not looking forward to?',
      mode,
    };
  }

  const intent = best ? best.id : (mode !== 'general' ? mode : 'smalltalk');
  const builder = REPLIES[intent] || REPLIES.smalltalk;
  const base = builder(lower, mode);
  const skill = best?.skill === 'creator' ? 'creator' : (best?.skill || (mode !== 'general' ? mode : 'presence'));
  const drillSource = skill === 'creator' ? 'creator' : skill;
  const drill = exercise(skill === 'humour' ? 'presence' : drillSource, best?.ex || 'd-fork');

  return {
    kind: 'coach',
    intent,
    reply: base.reply + (MODE_NUDGE[mode] ? `\n\n${MODE_NUDGE[mode]}` : ''),
    why: base.why,
    q: base.q,
    drills: [drill],
    turns: history.filter((h) => h.role === 'user').length + 1,
    mode,
  };
}

export function coachStarters(mode = 'general') {
  const common = [
    'I have a client call tomorrow and I freeze when they push back on price.',
    'I ran out of things to say at a party last week.',
    'My stories always go on too long. How do I cut them?',
    'I want to start posting but I never publish anything.',
  ];
  const byMode = {
    sales: ['They keep saying "send me information" and then going quiet.', 'How do I ask for the sale without sounding desperate?'],
    persuasion: ['Someone at work is wrong about this and I cannot make them see it.', 'How do I disagree without it becoming a fight?'],
    flirting: ['I never know how to end a conversation well.', 'How do I show interest without being too much?'],
    negotiation: ['I have a salary conversation coming up.', 'How do I stop filling silences with concessions?'],
    creator: ['I have no idea what to post about.', 'How do I write a hook that works?'],
    general: [],
  };
  return [...(byMode[mode] || []), ...common].slice(0, 5);
}
