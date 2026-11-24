// ─────────────────────────────────────────────────────────────
//  Academy · Speaking to a room
//
//  Sixteen modules covered one person, two people and a small group.
//  Nothing covered the thing most people are actually afraid of: a
//  room of faces looking up at you. It is a different discipline —
//  you cannot read one face and adjust, you cannot ask a question
//  back, and your nerves are visible at a distance.
//
//  Same shape as every other module, so the Academy renders unchanged:
//  six principles, three mechanics, five scripts, cautions that say
//  what this is NOT for, five drills with a success test.
// ─────────────────────────────────────────────────────────────

export const ACADEMY_EXTRA_4 = [
  {
    id: 'speaking-to-a-room',
    name: 'Speaking to a Room',
    tone: 'cyan',
    tagline: 'The room is not judging you. It is trying to follow you.',
    thesis: 'Speaking to a room is not conversation with more people in it. Conversation is a loop you adjust inside; a talk is a one-way transmission with a delay, and the audience gives you almost no signal until it is over. That changes the whole craft: you cannot read the room in real time, so you have to design the talk so it works without feedback — one idea, stated early, made concrete, and closed before it wears out. Nerves do not disappear; they get spent on preparation instead of performance.',
    principles: [
      {
        title: 'One idea, said out loud in the first minute',
        body: 'The most common failure is not nerves, it is having four ideas and hoping the audience assembles them. They will not — they are hearing it once, at speed, while thinking about their phone. Decide the single sentence you want repeated back to someone afterwards, say it early, and let every other part of the talk serve it.',
      },
      {
        title: 'The audience is rooting for you',
        body: 'People who take a seat to listen want you to be good — being bored is worse for them than for you. The hostile-room scenario is rarer than the fear of it. What audiences actually punish is not awkwardness; it is wasting their time: no point, no ending, no reason it was them in the room.',
      },
      {
        title: 'You cannot read a room, so design for the third row',
        body: 'In conversation you adjust to the face in front of you. In a room you are looking at thirty faces with thirty expressions, most of which are resting and none of which are feedback. Pick one or two friendly faces in different parts of the room and speak to them individually — your voice and pacing will do the work the feedback loop would have done.',
      },
      {
        title: 'Concrete beats impressive',
        body: 'A number, a name, a small scene, a specific date — these are what survive in memory. Abstraction feels intelligent to say and evaporates on arrival. If a slide or a sentence could have been said by anyone about anything, cut it. The audience remembers the story and the number, and forgets the framework you were proud of.',
      },
      {
        title: 'Slides are not the talk',
        body: 'The moment people read your slides, they stop listening to you — reading and listening compete for the same channel, and reading usually wins. Slides earn their place by carrying what speech cannot: a photograph, a chart with one obvious shape, a short exact quote. Fewer words on the slide is not a style preference; it is the only way to keep the attention on the argument.',
      },
      {
        title: 'End early, on the sentence you started with',
        body: 'Audiences forgive a nervous opening, a fumbled transition and a bad joke. They do not forgive a talk that will not end. Plan the last sentence word for word, land it, and stop — do not add the thing you forgot, do not ask "does that make sense", do not trail into "yeah, so, anyway". The ending is what they remember, because it is the only part they heard in a settled state.',
      },
    ],
    mechanics: [
      {
        name: 'The Point–Proof–Point opener',
        why: 'The first sixty seconds carry more weight than everything after them, and nerves peak exactly there. A fixed structure means you do not have to invent an opening while your hands are shaking.',
        steps: [
          'Point: say the one sentence you want remembered. Plainly. No throat-clearing, no biography, no "I am going to talk about".',
          'Proof: one concrete thing that makes the point credible — a number, a scene, a short story you can tell in forty seconds.',
          'Point again: restate it in slightly different words, so the first version is now anchored by evidence.',
          'Then move on. The opening is done; nothing else in the talk has to be improvised under pressure.',
        ],
        example: '"Most teams are losing their best people to silence, not to money. Last year we lost two engineers who had each been unhappy for months and neither had said a word to their manager. Silence is the expensive part. I want to show you the two conversations that stop it."',
      },
      {
        name: 'The Three-Sentence Structure',
        why: 'Under nerves, working memory shrinks — you lose the thread because there is no thread. Three sentences you can hold in your head are worth more than forty you cannot recall.',
        steps: [
          'Write the whole talk, then cut it to three sentences: what is true, why it matters, what I am asking for.',
          'Say those three out loud until they need no notes.',
          'Every slide, story and aside becomes the elaboration of one of the three — if it does not elaborate one, it is cut.',
          'When your mind blanks on stage, return to the next of the three. It is a floor you cannot fall through.',
        ],
        example: 'True: "Our onboarding takes six weeks and most of it is waiting." Matters: "That is why half of every new hire\'s first month is lost." Ask: "Give me two days of engineering time to fix the handoffs."',
      },
      {
        name: 'The Landing',
        why: 'The last seventeen seconds decide what people carry out of the room, and it is the part almost everyone improvises.',
        steps: [
          'Write the final sentence word for word. Not the point — the sentence.',
          'Say it out loud five times, including once immediately before you go on.',
          'Do not add a thank-you before it; put the thanks, if you want one, before the landing so the last thing in the room is the idea.',
          'Say it, stop, and stay still for two seconds. The pause is what tells the room it is finished.',
        ],
        example: '"So the next time someone goes quiet in a review, that is the moment the money is being lost. That is the conversation I am asking us to have. Thank you."',
      },
    ],
    scripts: [
      {
        them: 'The floor is yours. Where do you want to start?',
        you: 'I want to start with the sentence I hope you leave with — [the point]. Everything after this is the evidence for it.',
        why: 'Announces the structure so the audience can follow it, and removes the "where is this going" restlessness.',
      },
      {
        them: 'Someone interrupts with a hard question in minute two.',
        you: 'That is the right question and it lands in about ten minutes. Do you mind if I get there, or do you want the answer now?',
        why: 'Hands the choice back, keeps ownership of the structure, and treats the interruption as intelligence rather than attack.',
      },
      {
        them: 'Your mind goes blank mid-talk.',
        you: '[Pause. Look at your three sentences.] I have lost my place, so let me give you the part I know is worth hearing — [next of the three].',
        why: 'Naming the blank costs nothing and reads as confidence; audiences are more comfortable with honesty than with fluster.',
      },
      {
        them: 'A question you genuinely cannot answer.',
        you: 'I do not know. I do know where to find out, and I will send it to you by tomorrow.',
        why: 'The admission is cheap and the follow-up is what people remember; bluffing is the only expensive option.',
      },
      {
        them: 'The dreaded "any questions?" silence.',
        you: 'People usually ask me about [the sharpest objection]. Let me take that one first.',
        why: 'Replaces the vacuum with a question you have already prepared, and the room will join once someone has gone first.',
      },
    ],
    cautions: [
      'This is not a licence for a confident-sounding talk with nothing in it. The structure makes a real point survive contact with an audience; it cannot invent one.',
      'Stage fright that stops you functioning — panic attacks, avoidance that costs you work — is not a technique problem, and a talk structure will not fix it. Professional help for anxiety works, and this module is not a substitute.',
      'Do not use these mechanics to manipulate a room into a decision that would not survive scrutiny. Steering a group is easy; unsteering them is not.',
      'If the room belongs to someone else — a memorial, a eulogy, a colleague\'s farewell — the goal is not your performance. Serve the occasion, keep it short, and let the person, not the speaker, be the subject.',
    ],
    drills: [
      {
        title: 'The one sentence',
        time: 5,
        do: 'Take a talk you have to give and write the single sentence you want repeated back. Cut anything in the talk that does not serve it.',
        success: 'You can say the sentence from memory, and you know what you cut.',
      },
      {
        title: 'Sixty seconds, no notes',
        time: 6,
        do: 'Deliver the Point–Proof–Point opener out loud, standing, to a recording, with no notes. Do not restart — finish even if it is bad.',
        success: 'The recording is under ninety seconds and the point is in the first fifteen.',
      },
      {
        title: 'The landing five times',
        time: 5,
        do: 'Write your final sentence and say it aloud five times. Then say it after a deliberate two-second pause.',
        success: 'You can land it without looking down, and you stop talking afterwards.',
      },
      {
        title: 'Third-row practice',
        time: 8,
        do: 'Rehearse to two people sitting at opposite ends of a room. Speak to one, then the other, changing where your eyes go every two sentences.',
        success: 'Both people report being spoken to, not over.',
      },
      {
        title: 'The hostile question',
        time: 7,
        do: 'Have someone interrupt your rehearsal at a random moment with the hardest question they can think of. Answer with the "right question, ten minutes" move once, and answer it fully once.',
        success: 'You keep the structure in both cases and neither derails you.',
      },
    ],
    reads: ['lib-v1', 'lib-v2', 'lib-c1', 'lib-f1', 'lib-dc1'],
  },
];
