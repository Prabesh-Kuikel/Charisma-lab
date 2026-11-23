// ─────────────────────────────────────────────────────────────
//  Start Here · a two-minute self-assessment
//  Twelve honest questions, scored into five dimensions. The
//  result is not a grade — it is a route: three specific places
//  to begin, chosen from your weakest dimension and your stated
//  situation.
// ─────────────────────────────────────────────────────────────

export const ASSESS_DIMENSIONS = [
  { id: 'opening', name: 'Opening', blurb: 'Starting from nothing with a stranger.', tone: 'cyan' },
  { id: 'depth', name: 'Depth', blurb: 'Turning a chat into something real.', tone: 'violet' },
  { id: 'humour', name: 'Humour & ease', blurb: 'Being fun without being a performance.', tone: 'amber' },
  { id: 'difficult', name: 'Difficult conversations', blurb: 'Saying the thing that costs something.', tone: 'rose' },
  { id: 'presence', name: 'Presence & delivery', blurb: 'Voice, pace, and holding a room.', tone: 'mint' },
];

// answers: 0 = not yet, 1 = sometimes, 2 = often
export const ASSESS_QUESTIONS = [
  { id: 'q1', dim: 'opening', text: 'You walk into a room where you know almost nobody. Within five minutes you are in a real conversation.', },
  { id: 'q2', dim: 'opening', text: 'You can start a conversation in a queue, a lift or a waiting room without it feeling forced.', },
  { id: 'q3', dim: 'depth', text: 'People tell you things they would not tell most people.', },
  { id: 'q4', dim: 'depth', text: 'You can move a conversation past small talk on purpose, not by luck.', },
  { id: 'q5', dim: 'humour', text: 'You can make a group laugh without making anyone the target.', },
  { id: 'q6', dim: 'humour', text: 'When a joke of yours dies, you recover without apologising or explaining.', },
  { id: 'q7', dim: 'difficult', text: 'You can say a hard thing to someone you love and keep the relationship intact.', },
  { id: 'q8', dim: 'difficult', text: 'You ask for what you want — money, help, space — without a paragraph of justification.', },
  { id: 'q9', dim: 'presence', text: 'On the phone or on a call, people stop talking when you start.', },
  { id: 'q10', dim: 'presence', text: 'You can speak for two minutes without filling the gaps with "um", "like" or "sort of".', },
  { id: 'q11', dim: 'difficult', text: 'You can hear a criticism without defending yourself in the first sentence.', },
  { id: 'q12', dim: 'presence', text: 'Your voice does what you want when you are nervous — it does not rise or speed up.', },
];

export const ASSESS_SITUATIONS = [
  { id: 'strangers', label: 'Meeting new people', tone: 'cyan' },
  { id: 'dating', label: 'Dating & attraction', tone: 'rose' },
  { id: 'work', label: 'Work & career', tone: 'violet' },
  { id: 'business', label: 'Business & selling', tone: 'amber' },
  { id: 'family', label: 'Family & friends', tone: 'mint' },
  { id: 'stage', label: 'Speaking & presenting', tone: 'orange' },
];

/**
 * Score answers into a 0–100 profile and produce a three-step route.
 * Pure: no storage, no React — testable and deterministic.
 */
export function scoreAssessment(answers = {}, situation = '') {
  const byDim = {};
  for (const d of ASSESS_DIMENSIONS) byDim[d.id] = { id: d.id, name: d.name, got: 0, max: 0 };
  for (const q of ASSESS_QUESTIONS) {
    const v = Number(answers[q.id] ?? 0);
    byDim[q.dim].got += Math.min(2, Math.max(0, v));
    byDim[q.dim].max += 2;
  }
  const dims = ASSESS_DIMENSIONS.map((d) => {
    const s = byDim[d.id];
    const pct = s.max ? Math.round((s.got / s.max) * 100) : 0;
    return { ...d, score: pct, band: pct < 34 ? 'starting' : pct < 67 ? 'building' : 'strong' };
  });
  const total = Math.round(dims.reduce((n, d) => n + d.score, 0) / dims.length);
  const ranked = [...dims].sort((a, b) => a.score - b.score);
  const weakest = ranked.slice(0, 2).map((d) => d.id);

  return {
    total,
    band: total < 34 ? 'starting' : total < 67 ? 'building' : 'strong',
    dims,
    weakest,
    route: buildRoute(weakest[0], situation),
  };
}

// Each dimension maps to the exact content that fixes it.
const FIX = {
  opening: {
    playbooks: ['gym-party', 'gym-cafe', 'gym-event'],
    chapters: ['lib-st1', 'lib-st2', 'lib-st3'],
    module: 'small-talk',
    line: 'You do not need to be interesting. You need to be the person who made it easy to reply.',
  },
  depth: {
    playbooks: ['gym-unsaid', 'gym-first-date', 'gym-grief'],
    chapters: ['lib-ei1', 'lib-ei3', 'lib-wm5'],
    module: 'emotional-depth',
    line: 'Depth is not a bigger question. It is one rung lower than the last answer, and no sudden turns.',
  },
  humour: {
    playbooks: ['gym-group', 'gym-party', 'gym-rejection'],
    chapters: ['lib-hm1', 'lib-hm2', 'lib-hm4'],
    module: 'humour-craft',
    line: 'Aim the joke at yourself or at the room. Never at one person before the care is on the record.',
  },
  difficult: {
    playbooks: ['gym-boundary', 'gym-difficult-boss', 'gym-family-parent-defended'],
    chapters: ['lib-dc2', 'lib-dc3', 'lib-fam2'],
    module: 'difficult-conversations',
    line: 'Say the impact, not the verdict. One incident, not the pattern. Ask for one action.',
  },
  presence: {
    playbooks: ['gym-interview', 'gym-networking', 'gym-raise'],
    chapters: ['lib-v1', 'lib-v4', 'lib-f5'],
    module: 'confidence',
    line: 'Slow down, land the last word of the sentence downward, then stop.',
  },
};

const SITUATION_PLAYBOOK = {
  strangers: 'gym-party',
  dating: 'gym-first-date',
  work: 'gym-colleague',
  business: 'gym-price',
  family: 'gym-family-marriage-pressure',
  stage: 'gym-interview',
};

function buildRoute(weakestDim, situation) {
  const fix = FIX[weakestDim] || FIX.opening;
  const pb = SITUATION_PLAYBOOK[situation] && !fix.playbooks.includes(SITUATION_PLAYBOOK[situation])
    ? [SITUATION_PLAYBOOK[situation], ...fix.playbooks.slice(0, 2)]
    : fix.playbooks.slice(0, 3);
  return {
    focus: weakestDim,
    playbooks: pb,
    chapters: fix.chapters,
    module: fix.module,
    line: fix.line,
    steps: [
      { kind: 'gym', id: pb[0], why: 'Do the real situation out loud. Reading it is not practice.' },
      { kind: 'chapter', id: fix.chapters[0], why: 'The reasoning behind the drill, so you can adapt it.' },
      { kind: 'module', id: fix.module, why: 'The full module: principles, mechanics and four drills.' },
      { kind: 'arena', id: 'arena', why: 'Run it live against a persona that reacts to you, then read the report.' },
    ],
  };
}
