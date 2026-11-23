// ─────────────────────────────────────────────────────────────
//  SKILL_TRACKS_EXTRA — three more tracks in the same shape as
//  server/content/skills.js: principles, scripts, exercises.
//  They cover what the first five tracks did not: hard
//  conversations, being interviewed, and running a room.
//  Every exercise has a "done when" you can check, not a vibe.
// ─────────────────────────────────────────────────────────────

// `reads` are library chapter ids the track depends on (verified by npm run audit),
// `arena` are Conversation Arena personas that drill the same muscle.
export const SKILL_TRACKS_EXTRA = [
  {
    id: 'conflict',
    name: 'Hard Conversations',
    tone: 'rose',
    tagline: 'Say the thing without burning the bridge.',
    principle:
      'Conflict is not a contest of volume. It is a test of whether the other person believes you understood them before you asked for anything.',
    principles: [
      'Understand first, out loud. "So the part that matters to you is—" is not agreement, it is proof you listened.',
      'One ask per conversation. Two asks means neither lands.',
      'Describe behaviour, not character. "You were late three times" survives; "you are unreliable" does not.',
      'Put the relationship in the sentence: "I want this to stay easy between us" changes what the next sentence is allowed to be.',
      'End with a date, not a feeling. "Let us look at it Friday" beats "let us keep talking".',
      'If you were wrong, say it in one line and then stop. A long apology turns into a request for comfort.',
    ],
    scripts: [
      { them: 'Are you saying this is my fault?', you: 'I am saying the last three handoffs slipped and I want to fix the handoff, not assign a person. Can we look at the Tuesday one together?' },
      { them: 'I do not have time for this right now.', you: 'Fair. I am not asking for an hour — five minutes on Thursday, and I will bring the two options already written out.' },
      { them: 'You are being really sensitive about this.', you: 'Maybe. It still landed badly, and I would rather tell you than go quiet about it.' },
      { them: 'Fine. Whatever you want.', you: 'I do not want a yes like that. What would actually work for you?' },
      { them: 'Nobody else has a problem with it.', you: 'That is possible. I am the one in the room with the problem, so I am the one telling you.' },
    ],
    exercises: [
      {
        id: 'x-offload', title: 'The One-Ask Rewrite',
        why: 'Most avoided messages are three asks wearing a coat of context.',
        steps: [
          'Write the message you have been avoiding, fully, without editing.',
          'Delete every sentence that is neither evidence nor the single ask.',
          'Cut it under 90 words and send the short version.',
        ],
        time: 10, success: 'It is under 90 words and contains exactly one request.',
      },
      {
        id: 'x-reflect', title: 'Reflect Before You Reply',
        why: 'The first sentence decides whether the second one is heard.',
        steps: [
          'In your next three tense exchanges, make your first sentence a repeat of what they said.',
          'No "but" in that sentence — the word cancels everything before it.',
          'Then add your point as a separate sentence.',
        ],
        time: 5, success: 'Three reflections with zero "but" in the first sentence.',
      },
      {
        id: 'x-behaviour', title: 'Behaviour, Not Character',
        why: 'Character accusations invite a defence; behaviour descriptions invite a fix.',
        steps: [
          'Take one irritation you have been carrying.',
          'Rewrite it as a behaviour with a count and a date — no "always", no "never".',
          'Read it out loud. If it sounds like a verdict on the person, cut it again.',
        ],
        time: 6, success: 'You can say it without "always" or "never" appearing once.',
      },
      {
        id: 'x-own', title: 'Own One Thing, Out Loud',
        why: 'Naming your part first is the cheapest way to lower the temperature.',
        steps: [
          'In your next disagreement, find one thing you got wrong before you defend anything.',
          'Say it in the first two sentences, in one line, with no explanation attached.',
          'Then ask your question.',
        ],
        time: 5, success: 'You named it inside the first two sentences and did not re-open it.',
      },
      {
        id: 'x-date', title: 'Close With a Date',
        why: 'Unresolved tension becomes resentment in the gap between conversations.',
        steps: [
          'Every unresolved conversation today ends with a specific time and channel.',
          'Say it before you leave: "Thursday, 4pm, and I will have the numbers."',
          'Write it down where they can see it.',
        ],
        time: 3, success: 'Three conversations ended with a date rather than a feeling.',
      },
    ],
    reads: ['lib-dc1', 'lib-dc2', 'lib-dc3', 'lib-ei2'],
    arena: ['priya', 'daniel-manager', 'marco', 'sunita'],
    gym: ['Difficult'],
  },
  {
    id: 'interview',
    name: 'Interviews',
    tone: 'cyan',
    tagline: 'Answers with edges, not adjectives.',
    principle:
      'An interviewer is not looking for the best story. They are looking for the smallest honest signal they can defend to a hiring committee on your behalf.',
    principles: [
      'Answer the question that was asked in the first sentence. Context is second.',
      'Numbers are proof of memory. No numbers and they assume you are paraphrasing someone else.',
      'Include one thing you got wrong. Calibration reads as senior; perfection reads as rehearsed.',
      'When you do not know, say so, then say how you would find out.',
      '"We" answers only count if you name your part in them.',
      'Ask one question that proves you are already thinking about their actual constraint.',
    ],
    scripts: [
      { them: 'Tell me about yourself.', you: 'I fix the boring middle of delivery — the handoffs where projects quietly lose two weeks. Last year that was a 34-day slip I cut to nine. Before that I was doing the same thing in a team half the size.' },
      { them: 'What is your biggest weakness?', you: 'I under-communicate when I am deep in a problem. I lost a week of a teammate\'s work that way, so now I send a two-line status every Thursday whether or not I am finished.' },
      { them: 'Why are you leaving?', you: 'The team is good. The work stopped being the part of the job I am best at, and I would rather say that than pretend it is about money.' },
      { them: 'Do you have any questions for us?', you: 'What has to be true in six months for this hire to have worked? And what usually stops that from being true?' },
      { them: 'This role needs someone more senior.', you: 'That is fair. What would I need to show in the first ninety days to remove that doubt?' },
    ],
    exercises: [
      {
        id: 'x-star-min', title: 'The 45-Second Story',
        why: 'Long answers read as fear of the silence after a short one.',
        steps: [
          'Take one strong story you always tell.',
          'Compress it: situation in one line, your action, the number, one honest caveat.',
          'Time it out loud until it fits in 45 seconds.',
        ],
        time: 10, success: 'It fits in 45 seconds and still contains one number.',
      },
      {
        id: 'x-own-miss', title: 'Rehearse the Answers You Avoid',
        why: 'The questions you dodge are the ones the room remembers.',
        steps: [
          'Write the two interview answers you most hope not to be asked.',
          'Rehearse them until they are calm rather than clever.',
          'Say them to one person out loud, without laughing or rushing.',
        ],
        time: 12, success: 'You can say "I got that wrong" in a flat, normal voice.',
      },
      {
        id: 'x-one-question', title: 'One Question That Lands',
        why: 'The last question you ask is often what they write down.',
        steps: [
          'Find out one real constraint of the team before you go in.',
          'Write a question about that constraint — not about culture, not about growth.',
          'Ask it, then say nothing for five seconds after they answer.',
        ],
        time: 5, success: 'They answer for longer than you asked.',
      },
      {
        id: 'x-number', title: 'Number Transplant',
        why: 'Numbers are the difference between remembering and paraphrasing.',
        steps: [
          'Take three stories you use already.',
          'Put a real number in each: days, percent, people, money, attempts.',
          'If there is no number, find something countable and count it honestly.',
        ],
        time: 8, success: 'Three stories, three numbers you would defend under questioning.',
      },
      {
        id: 'x-mock', title: 'Interview With No Notice',
        why: 'You only find your performing voice when the question surprises you.',
        steps: [
          'Ask someone to interview you for ten minutes with no preparation.',
          'Notice the exact question where you start performing instead of answering.',
          'Write that question down and answer it plainly, once, tonight.',
        ],
        time: 10, success: 'You can name the question you hide behind.',
      },
    ],
    reads: ['lib-pr2', 'lib-pr1', 'lib-pr5', 'lib-s5'],
    arena: ['priya-interview', 'daniel'],
    gym: ['Professional'],
  },
  {
    id: 'hosting',
    name: 'Running a Room',
    tone: 'violet',
    tagline: 'Be the reason people talk to each other.',
    principle:
      'A good host is not the most interesting person in the room. They are the person who keeps noticing who is not in a conversation yet.',
    principles: [
      'Introduce with the reason, not the title: "This is Sam — the only other person here who has tried to build one of these."',
      'Hand the floor more often than you take it. Two to one is the ratio to aim for.',
      'One question everyone can answer beats one question only you can answer.',
      'End things early. The last ten minutes are what people remember as the whole evening.',
      'Go to the person on their second drink with no conversation, and use their name.',
      'Never let a silence mean nobody has permission to speak. Fill it with a question, not a story.',
    ],
    scripts: [
      { them: 'I do not really know anyone here.', you: 'Stay with me for two minutes — there is someone you will actually want to meet. What are you working on at the moment?' },
      { them: 'So what do you do?', you: 'Boring answer: systems work. Better answer: I make sure teams stop losing the same week twice. What about you?' },
      { them: 'Can I get a word with you?', you: 'Of course. Let me park this table first, they get restless.' },
      { them: 'This is a great event, you should do it more often.', you: 'That is the nicest thing anyone has said. What made it work for you — the people or the size?' },
      { them: 'Nobody is talking to me.', you: 'That is on me, not you. Come with me — there is a table that needs a fourth.' },
    ],
    exercises: [
      {
        id: 'x-intro-two', title: 'Introduce Two People',
        why: 'The host\'s real product is the conversations that happen without them.',
        steps: [
          'In your next group setting, find two people with a specific shared reason to talk.',
          'Introduce them with that reason in one sentence — not their job titles.',
          'Say one line, then step back and let them run.',
        ],
        time: 5, success: 'You left the conversation and they stayed in it.',
      },
      {
        id: 'x-floor', title: 'Hand the Floor',
        why: 'Talk time is the honest measure of whether you are hosting or performing.',
        steps: [
          'During one social hour, keep a mental count: times you handed the conversation on versus times you took it.',
          'Target 2:1 in favour of handing it on.',
          'At the end, note which hand-over produced the best story.',
        ],
        time: 20, success: 'You hit 2:1 across one social hour.',
      },
      {
        id: 'x-room-read', title: 'Read the Room',
        why: 'The quietest person is usually the one who will remember you for a year.',
        steps: [
          'Once an hour, scan for the two quietest people.',
          'Make each of them a question only they could answer.',
          'Then shut up for the length of their answer.',
        ],
        time: 5, success: 'Two people who were silent are now talking.',
      },
      {
        id: 'x-early-end', title: 'End It Early',
        why: 'People remember the end of an evening, not the average.',
        steps: [
          'End one gathering while it is still good.',
          'Say why out loud: "I am going while everyone is happy."',
          'Do not do the slow goodbye at the door.',
        ],
        time: 5, success: 'You left before the energy dropped and someone said so.',
      },
      {
        id: 'x-question', title: 'One Answerable Question',
        why: 'A question with no expert answer gives everyone permission to speak.',
        steps: [
          'Prepare three group questions that are interesting but not impressive.',
          'Ask the best meal of the year so far, not the best career move.',
          'Count how many people answer and how long each answer runs.',
        ],
        time: 5, success: 'Three people answer and nobody rambles past a minute.',
      },
    ],
    reads: ['lib-f4', 'lib-st1', 'lib-f6', 'lib-wm3'],
    arena: ['maya', 'alea', 'group-three'],
    gym: ['Everyday'],
  },
];
