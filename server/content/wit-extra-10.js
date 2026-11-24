// ─────────────────────────────────────────────────────────────
//  Wit & Banter · fourth wing
//  Round 10: the register audit found Group and Tension at three
//  scenarios each while Retort had six — the wrong way round. These
//  eight bring Group and Tension to six and add the two Retort cases
//  people actually meet (credits stolen, questions priced).
//  Same shape as wit.js: setup, the line, the context, the strategy
//  keys the scorer rewards, model lines, and a coaching line.
// ─────────────────────────────────────────────────────────────

export const WIT_EXTRA_10 = [
  {
    id: 'w39',
    category: 'Group',
    level: 3,
    title: "The Story That Ate the Evening",
    setup: "Someone has been telling the same story for nine minutes at a table of seven. Two people are on their phones and one is refilling drinks to escape.",
    theySay: "\"—and so I said, no, we are doing it MY way, and you should have seen his face—\"",
    context: "Nobody is brave enough to interrupt. The group is drifting rather than hostile.",
    strategies: ['warm-entry', 'ask-question', 'hold-frame'],
    modelLines: [
      "\"Hold that — what happened when he answered? I want the end before the next part.\"",
      "\"Sorry to cut across, but I have been wanting to ask this table something.\"",
      "\"Right, everyone gets ninety seconds. Go.\"",
    ],
    coach: "You are not stopping them, you are giving the story a shape it can end in. Ask for the ending and you get credit for being interested.",
  },
  {
    id: 'w40',
    category: 'Group',
    level: 4,
    title: "The In-Joke You Are Standing Inside",
    setup: "You have joined a table where four people share six years of history. Someone makes a reference and three people laugh; you have no idea what it is.",
    theySay: "\"[Laughter.] Oh — sorry, that is an old one. You would have had to be there.\"",
    context: "They are not excluding you on purpose. They have simply forgotten you are new for a second.",
    strategies: ['honesty-warm', 'ask-question', 'self-deprecation'],
    modelLines: [
      "\"I am completely lost and I would like the version for people who were not there.\"",
      "\"Give me the two-sentence version, then carry on.\"",
      "\"I have decided that was about a van and I am not taking questions.\"",
    ],
    coach: "Asking for the in-joke is the warm move. Pretending to get it is the cold one — they will notice and it will cost you more than the question would have.",
  },
  {
    id: 'w41',
    category: 'Group',
    level: 5,
    title: "The Person Being Laughed At",
    setup: "Someone in the group has just been the butt of a joke. They are smiling, but it is the wrong kind of smile.",
    theySay: "\"[Laughter.] — no, go on, it is funny, it is fine.\"",
    context: "The room has decided it is funny. You disagree quietly.",
    strategies: ['boundary-warm', 'calm-competence', 'ask-question'],
    modelLines: [
      "\"Okay, my turn to be the idiot — I did something worse last week.\"",
      "\"That one landed a bit hard, no? Let us move on.\"",
      "\"Actually, tell me the real version of that. I only know the joke.\"",
    ],
    coach: "Turning the joke onto yourself costs you nothing and ends it. A public correction costs the joker status and will be remembered longer than the joke.",
  },
  {
    id: 'w42',
    category: 'Tension',
    level: 3,
    title: "The Line You Did Not Defend",
    setup: "A joke at your expense landed badly with everyone except the person who made it. The room has gone quiet and is watching you — and it is not your own repair to make this time.",
    theySay: "\"...it was a joke. Relax.\"",
    context: "You can end this well or you can win it. Not both.",
    strategies: ['deadpan', 'boundary-warm', 'calm-competence'],
    modelLines: [
      "\"It was. And now we both know where the line is, which is useful information.\"",
      "\"I am relaxed. I am just not going to laugh at that one.\"",
      "\"Right — next joke, and this time make it about yourself.\"",
    ],
    coach: "Say one sentence and then let the room move on. A second sentence is a fight; a silence after the first is a boundary.",
  },
  {
    id: 'w43',
    category: 'Tension',
    level: 4,
    title: "The Comment That Was Almost a Compliment",
    setup: "A colleague has just said something that sounds like praise and is not. Everyone heard the shape of it.",
    theySay: "\"You are surprisingly good at this — I did not expect that at all.\"",
    context: "Calling it out makes you thin-skinned. Letting it pass teaches them it works.",
    strategies: ['deadpan', 'calm-competence', 'honesty-warm'],
    modelLines: [
      "\"Surprisingly. That is the word I will be thinking about later.\"",
      "\"I am going to take the good part and ignore the surprise.\"",
      "\"Thank you — I have been doing it for four years, so perhaps it is not that surprising.\"",
    ],
    coach: "Naming the word, calmly, is the whole move. It makes them hear it without you having to accuse them of anything.",
  },
  {
    id: 'w44',
    category: 'Tension',
    level: 5,
    title: "The Escalation You Are Invited Into",
    setup: "Two people in the group are escalating. One has just turned to you for backup, and taking a side will end the evening differently.",
    theySay: "\"—tell them. You agree with me, do you not?\"",
    context: "Both are your friends. The truth is complicated and the room is hot.",
    strategies: ['calm-competence', 'hold-frame', 'ask-question'],
    modelLines: [
      "\"I agree with the first part and not the second, and I am not doing the rest of it tonight.\"",
      "\"I am not going to referee. I am going to say that you both want the same thing.\"",
      "\"Can we do this tomorrow with coffee and fewer people?\"",
    ],
    coach: "Refusing to referee while naming the shared goal is the only move that keeps both relationships. Do not explain it at length.",
  },
  {
    id: 'w45',
    category: 'Retort',
    level: 3,
    title: "The Person Who Repeats Your Point Louder",
    setup: "You said something useful ninety seconds ago. A louder person has just said it again and the room is nodding at them.",
    theySay: "\"—which is exactly my point. We need to fix it properly.\"",
    context: "Everyone has forgotten who said it first, including, possibly, them.",
    strategies: ['deadpan', 'hold-frame', 'self-deprecation'],
    modelLines: [
      "\"Glad we agree. Shall I carry on from where I got to?\"",
      "\"That is the version I said, but yours was louder, which helps.\"",
      "\"Right — so, as established by both of us, we fix it properly. Here is how.\"",
    ],
    coach: "You cannot get credit back by pointing out the theft. Take the agreement and take the floor — the second part is the one that matters.",
  },
  {
    id: 'w46',
    category: 'Retort',
    level: 4,
    title: "The Interrogation Disguised as Interest",
    setup: "Someone is asking you a series of questions that are not quite friendly — where do you live, what does that cost, who do you know there.",
    theySay: "\"[Another question, delivered with a smile.]\"",
    context: "Every answer you give is being priced.",
    strategies: ['ask-question', 'hold-frame', 'deadpan'],
    modelLines: [
      "\"That is three questions in a row. Are you writing something?\"",
      "\"I am going to answer that with a question: why do you ask?\"",
      "\"I will trade you: one of mine for one of yours.\"",
    ],
    coach: "Turning the interview back is not rude; answering twelve questions is what makes you forgettable. One turn is enough.",
  },
];
