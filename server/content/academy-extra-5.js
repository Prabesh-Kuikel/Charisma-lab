// ─────────────────────────────────────────────────────────────
//  Academy · Pitching
//
//  Pitching was the one gap a user would hit fast: the app had a Sales
//  skill track, scattered pitch advice inside other modules, and 100
//  impromptu prompts — but no module that teaches the thing itself.
//
//  "Pitch" here means the general skill, not just selling software: a
//  job interview answer, asking a manager for headcount, proposing to a
//  client, convincing a friend to come along. The structure is the same
//  in all of them, and the failure is the same: describing the thing
//  instead of changing what the listener believes.
//
//  Same module shape as the rest of the Academy.
// ─────────────────────────────────────────────────────────────

export const ACADEMY_EXTRA_5 = [
  {
    id: 'pitching',
    name: 'Pitching Anything',
    tone: 'orange',
    tagline: 'A pitch is not a description. It is a change of belief.',
    thesis: 'Most pitches fail because they describe the thing instead of changing what the listener believes about their own situation. A pitch is an argument in miniature: here is what is true for you, here is what it costs you, here is what I would do, here is why me, here is the smallest next step. Get that order right and mediocre material beats a polished monologue; get it wrong and the best product in the room sounds like a brochure.',
    principles: [
      {
        title: 'Diagnose before you prescribe',
        body: 'A pitch that arrives before any question is a guess about someone else\'s life. The single highest-value move in any pitch is one real question first — "what happens today when this goes wrong?" — because the answer gives you the words for everything that follows. If you have no time for a question, you have no time to be understood.',
      },
      {
        title: 'Sell the after, not the object',
        body: 'People do not buy a drill, a course or a hire. They buy the shelf that stays up, the promotion that stops feeling impossible, the Tuesday that is no longer ruined. Say the after-state in concrete, ordinary words — a specific hour of a specific day — and the object becomes the obvious means to it.',
      },
      {
        title: 'One idea, three proofs',
        body: 'A pitch with ten reasons is a pitch with none: the listener cannot rank them, so they remember the weakest and argue with that. Pick the one claim that matters, then carry exactly three proofs — a number, a specific story, and a reason to believe you specifically. Everything else is an appendix you never get to.',
      },
      {
        title: 'The objection is the pitch',
        body: 'Almost every pitch dies on an unspoken objection: it is too expensive, it will embarrass them, their boss will say no, it is not the right time. If you leave without knowing which one it was, you did not pitch — you presented. Name the likeliest objection yourself, before they have to, and the conversation moves from defending to solving.',
      },
      {
        title: 'Small ask, specific next step',
        body: '"So, what do you think?" invites a deferral, because it asks for a decision nobody can make mid-conversation. A pitch should end on the smallest concrete step that moves things forward — a pilot on one team, a call with the person who actually decides, a draft by Friday. Ask for a step, not for a verdict.',
      },
      {
        title: 'Length is subtracted, not written',
        body: 'Nobody has ever complained that a pitch was too short. The work is in cutting: the origin story nobody asked for, the two features that are not the point, the third metric, the apology for taking their time. A pitch you can deliver in ninety seconds, and expand on request, is strictly better than one you have to get through.',
      },
    ],
    mechanics: [
      {
        name: 'The Five-Sentence Pitch',
        why: 'Under pressure, working memory collapses and people start describing. Five sentences is short enough to remember and complete enough to be a real argument.',
        steps: [
          'The truth for them: one sentence about their situation, in their words if you have them.',
          'The cost: what it is costing them now — a number if you have one, a concrete scene if you do not.',
          'The change: what you would do, in one sentence, with no adjectives.',
          'Why you: the single most specific reason to believe you, not a list of credentials.',
          'The ask: the smallest next step, offered as a choice between two acceptable options.',
        ],
        example: '"Your onboarding takes six weeks, and half of that is waiting for access. That is a month of every new hire\'s output gone. I would remove the three handoffs that cause the wait — I did exactly this at my last job and it went to nine days. Want me to map it on one team first, or show you the map before we touch anything?"',
      },
      {
        name: 'The Objection Pre-empt',
        why: 'An objection you raise is a sign of honesty; the same objection raised by them is a reason to say no. Raising it first also lets you choose the version you answer.',
        steps: [
          'Name the strongest objection in their words, plainly — do not soften it into nothing.',
          'Show you have already thought about it: one sentence on why it is a real concern.',
          'Answer the object, not the sentence: if the real worry is internal politics, answer that, not the price.',
          'Hand the decision back on that specific point: "does that change how you would want to start?"',
        ],
        example: '"The obvious objection is that this is a lot to spend before the new quarter. It is — and the reason I would still start now is that the waiting cost is running whether or not we begin. If the timing is the real blocker rather than the money, say so and I will come back in three weeks instead of pushing."',
      },
      {
        name: 'The Three-Minute Structure',
        why: 'For a pitch that is longer than five sentences — a demo, an interview answer, a proposal — you need a shape the listener can hold. Three beats with a signposted turn is the shape that survives without notes.',
        steps: [
          'First 30 seconds: the one claim and the cost. No biography, no throat-clearing, no agenda slide.',
          'Next 2 minutes: three proofs in order of strength, signposted out loud ("two reasons, the second is the one I would bet on").',
          'Final 30 seconds: the objection you expect, then the specific next step.',
          'Then stop. Do not fill the silence with the thing you forgot — write it down and send it afterwards.',
        ],
        example: '"Claim: the reason the pipeline is thin is that nobody is doing discovery calls. Proof one: we closed one in eleven last quarter when we did them. Proof two: the two competitors who are growing both staffed it. Proof three: it is the only activity with no tooling cost. The objection is that it does not scale — it does not, and that is why I am asking for it as an experiment on one segment. Two weeks, one rep, one number. Worth doing?"',
      },
    ],
    scripts: [
      {
        them: 'So, tell me about yourself / what you do.',
        you: 'I help [who] stop [specific bad thing] — most recently by [one concrete thing you did]. What does that look like on your side at the moment?',
        why: 'Answers the question in one sentence, then hands the conversation back with a question, which is where a real pitch starts.',
      },
      {
        them: 'We do not have the budget for this.',
        you: 'That is fair. Is it that there is no budget line, or that the money is committed elsewhere? Those are different problems and I would answer them differently.',
        why: 'Turns a dead end into a diagnosis, and shows you are listening rather than reloading your argument.',
      },
      {
        them: 'Send me some information.',
        you: 'Happy to — so I send the right thing, is the blocker timing, price, or getting the team to agree?',
        why: 'The polite brush-off is usually genuine but unformed. One question converts a dead lead into a real objection you can answer.',
      },
      {
        them: 'We are already using someone else.',
        you: 'Most people I work with were. What would have to be true for it to be worth looking at an alternative — a specific failure, or just the price?',
        why: 'Does not attack the incumbent, which would put them in the position of defending their own decision.',
      },
      {
        them: 'It is too expensive.',
        you: 'Expensive compared to what? If this saves one deal a quarter, where does that put it? And if the number still does not work, tell me and I will tell you honestly whether a smaller version would.',
        why: 'Asks for the comparison being made rather than discounting immediately, and leaves a real off-ramp so the answer is not defensive.',
      },
    ],
    cautions: [
      'This is a structure for a claim you can support. Applied to a product or a promise that does not hold, it is a more effective way to oversell, which is worse than a bad pitch.',
      'Never invent the cost, the number or the reference. A pitch built on a fabricated datum works exactly once, and the person who discovers it tells everyone.',
      'If the answer is genuinely no, take the no. Pushing past a clear decision does not convert — it converts you into someone people avoid taking the meeting with.',
      'Pitching your own worth — a raise, a rate, a role — has an extra trap: the instinct to justify rather than to ask. State the number, give one reason, and stop talking.',
    ],
    drills: [
      {
        title: 'The five sentences',
        time: 8,
        do: 'Write your pitch as exactly five sentences — truth, cost, change, why you, ask. Cut every adjective and every credential that is not the single best one.',
        success: 'You can say it from memory in under forty seconds, and a friend can repeat the claim back.',
      },
      {
        title: 'Say the after',
        time: 6,
        do: 'Write the after-state as a specific hour of a specific day ("Wednesday, 9am, no spreadsheet open"). Delete every abstraction from the sentence.',
        success: 'The sentence contains no words like seamless, powerful, or solution.',
      },
      {
        title: 'Objection first',
        time: 7,
        do: 'Write the strongest objection to your pitch in the buyer\'s own words, then answer the object underneath it, not the sentence.',
        success: 'Your answer would still make sense if the objection were worded differently.',
      },
      {
        title: 'The ninety-second version',
        time: 5,
        do: 'Deliver the whole pitch to a recording in ninety seconds. Do not restart when you fumble — finish.',
        success: 'The recording is under two minutes and the ask is in the last ten seconds.',
      },
      {
        title: 'Ask for a step',
        time: 4,
        do: 'Rewrite your ending as a choice between two acceptable next steps instead of "what do you think?".',
        success: 'Both options are things you would genuinely be happy to do.',
      },
    ],
    reads: ['lib-s2', 'lib-s6', 'lib-bz1', 'lib-f1', 'lib-wr4'],
  },
];
