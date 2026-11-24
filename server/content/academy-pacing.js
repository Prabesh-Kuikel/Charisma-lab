// ─────────────────────────────────────────────────────────────
//  Academy pacing
//
//  Sixteen modules, all built to the same spec — six principles, three
//  mechanics, four or five drills — which is good for consistency and bad
//  for pacing: the academy had no idea which module hurts first, so a
//  beginner could open "Family & The Rooms You Cannot Leave" in week one
//  and bounce off it, and someone experienced had no fast lane.
//
//  This adds a curriculum layer on top of the content rather than
//  rewriting the modules: a level, a prerequisite, an honest "why this
//  order", and a session length. It is derived data, so the modules stay
//  the single source of truth and a new module cannot ship unpaced — the
//  audit and the test suite both fail if one does.
// ─────────────────────────────────────────────────────────────

// 1 = start here (works on its own), 2 = builds on level 1, 3 = needs
// something to have gone wrong at least once in your life to be useful
export const ACADEMY_LEVELS = [
  { id: 1, name: 'Foundations', note: 'Nothing here requires you to have had a bad conversation yet. Start with the first module and do not skip it.' },
  { id: 2, name: 'Rooms with stakes', note: 'These are the rooms where the outcome matters. Do one at a time, and take the drill into a real conversation the same week.' },
  { id: 3, name: 'Hard and specific', note: 'Long-arc material. Useful only when you have a live situation to apply it to — and better read twice with a gap.' },
];

export const ACADEMY_PACING = {
  'charismatic-conversation': {
    level: 1, after: null, minutes: 12,
    why: 'The one module everything else assumes. Attention transfer is the base mechanic of every other page in the app.',
  },
  everyday: {
    level: 1, after: 'charismatic-conversation', minutes: 10,
    why: 'Forks and follow-ups are the smallest unit of skill here, and they show up in every other module.',
  },
  'small-talk': {
    level: 1, after: 'everyday', minutes: 10,
    why: 'The door every real conversation comes through. Read it while you still find small talk slightly embarrassing — that is when it is useful.',
  },
  confidence: {
    level: 1, after: null, minutes: 8,
    why: 'Place it early on purpose: it is the reframe that stops the other fifteen modules feeling like evidence of a deficit.',
  },
  humour: {
    level: 1, after: 'everyday', minutes: 12,
    why: 'Misdirection and shared context. Read after everyday conversation so you have somewhere to point a joke.',
  },
  'body-language': {
    level: 2, after: 'charismatic-conversation', minutes: 10,
    why: 'Cluster-reading only makes sense once you have watched attention move in a real conversation.',
  },
  psychology: {
    level: 2, after: null, minutes: 15,
    why: 'The mechanisms. Read it alongside the Human Psychology wing rather than instead of it.',
  },
  professional: {
    level: 2, after: 'everyday', minutes: 12,
    why: 'Being heard at work is a separate, narrower skill. Do it when you have a live meeting to apply it to.',
  },
  business: {
    level: 2, after: 'professional', minutes: 12,
    why: 'Nobody buys a pitch; they buy the removal of a cost they named. Needs the discovery habits from professional first.',
  },
  storytelling: {
    level: 2, after: 'small-talk', minutes: 12,
    why: 'Three sentences and a stop. Take the drills into the Stories wing where you can rehearse whole anecdotes.',
  },
  'tension-flirting': {
    level: 2, after: 'everyday', minutes: 12,
    why: 'Escalation with consent and readable signals. Only useful once you can already hold an everyday conversation.',
  },
  'emotional-depth': {
    level: 3, after: 'psychology', minutes: 12,
    why: 'Being the person people tell the true thing to. Needs a live relationship to practise on, so it is not a first-week read.',
  },
  'difficult-conversations': {
    level: 3, after: 'emotional-depth', minutes: 14,
    why: 'The conversation you are avoiding costs more than the conversation. Read when you can name the one you are avoiding.',
  },
  'talking-to-women': {
    level: 3, after: 'tension-flirting', minutes: 12,
    why: 'Calm, specific, safe enough to be chosen — consent-first throughout. It assumes the flirting module and a lot of self-awareness.',
  },
  'family-systems': {
    level: 3, after: 'difficult-conversations', minutes: 15,
    why: 'Every other room lets you leave. Do this one with a real situation in mind, or it reads as abstract.',
  },
  'speaking-to-a-room': {
    level: 2, after: 'confidence', minutes: 14,
    why: 'One person, then a small group, then a room. The structure is designed for exactly the moment you cannot read the faces back.',
  },
  pitching: {
    level: 2, after: 'professional', minutes: 15,
    why: 'Selling an idea is a room with stakes. Read it after the professional module, when you have a real proposal to practise on — otherwise it is theory.',
  },
  'humour-craft': {
    level: 3, after: 'humour', minutes: 12,
    why: 'Mechanics rather than instincts. Pointless before the first humour module, excellent after it.',
  },
};

/** Modules grouped into the order to actually read them. */
export function academyPath(modules = []) {
  return [1, 2, 3]
    .map((level) => ({
      level,
      name: (ACADEMY_LEVELS.find((l) => l.id === level) || {}).name || `Level ${level}`,
      note: (ACADEMY_LEVELS.find((l) => l.id === level) || {}).note || '',
      modules: modules
        .filter((m) => (ACADEMY_PACING[m.id] || {}).level === level)
        .map((m) => ({ ...m, pacing: ACADEMY_PACING[m.id] })),
    }))
    .filter((g) => g.modules.length);
}

/** Where to start for someone who has not read any of it. */
export const ACADEMY_START = 'charismatic-conversation';

/** Every module id that has pacing, for the audit and the tests. */
export const PACED_IDS = Object.keys(ACADEMY_PACING);
