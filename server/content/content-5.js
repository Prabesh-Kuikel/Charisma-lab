// ─────────────────────────────────────────────────────────────
//  CONTENT_5 — the fifth round's fill-in content.
//  Two things the audit made obvious: "Feedback" was the only
//  framework category with a single entry, and five of the eight
//  skills had no daily drill beyond one. This fixes both, and
//  adds a second daily-drill pass so every skill has three
//  (presence had eight; it stays the exception, deliberately —
//  presence is the skill you can practise anywhere).
// ─────────────────────────────────────────────────────────────

export const EXTRA_FRAMEWORKS_5 = [
  {
    id: 'cf-feedback-order',
    name: 'Ask–Tell–Ask',
    category: 'Feedback',
    seconds: 60,
    oneLiner: 'Feedback that starts with a question gets heard; feedback that starts with a verdict gets defended.',
    when: [
      'Giving feedback to someone who did not ask for it',
      'A person who gets defensive every time you open your mouth',
      'When you are not sure your read is the whole picture',
    ],
    steps: [
      { label: 'Ask', detail: 'Ask how they saw it before you say how you saw it. "How did you think Tuesday went?" Their answer tells you whether you are even talking about the same event.' },
      { label: 'Tell', detail: 'One observation, specific, with the impact. No adjectives about the person, no list.' },
      { label: 'Ask again', detail: 'Ask what they make of that. This is the beat that turns a verdict into a conversation — and the beat everybody skips.' },
      { label: 'Agree the next one', detail: 'One change, small enough to happen by Friday, named by them rather than dictated by you.' },
    ],
    example: '"How did you think the review went on Tuesday? … From where I sat, you answered before the client finished twice, and they stopped asking questions after that. What do you make of that? … So what would you do differently in the next one?"',
    pitfalls: [
      'Asking the opening question as a formality and then delivering the verdict anyway. People can hear the difference immediately and it costs you the rest of the conversation.',
      'Two observations. One is feedback; two is a performance review.',
      'Filling the silence after "what do you make of that?" — the silence is where the thinking happens, and it is yours to hold, not to rescue.',
    ],
    drill: [
      'Take one piece of feedback you have been putting off and rewrite it in the four beats.',
      'Say the opening question out loud. If it sounds like a trap, change it until it sounds like a real question.',
    ],
    pairs: ['lib-cr2', 'lib-dc2', 'lib-ei2'],
  },
  {
    id: 'cf-checkout',
    name: 'The Three-Beat Checkout',
    category: 'Negotiation',
    seconds: 30,
    oneLiner: 'Never leave an agreement without a number, a date and a name — the three things that turn a good conversation into a real one.',
    when: [
      'Ending any meeting where something was agreed',
      'The moment before you hang up on a client call',
      'Any conversation with family where you suspect nothing will change',
    ],
    steps: [
      { label: 'Number', detail: 'The measurable thing: the figure, the count, the amount. "Better" is not a number.' },
      { label: 'Date', detail: 'When it happens, to the day. "Soon" and "next week-ish" are ways of not agreeing.' },
      { label: 'Name', detail: 'Who does it. Shared ownership is the same as nobody doing it.' },
    ],
    example: '"So, to be sure I have it: the migration goes out on the 14th, Sam writes the rollback plan by Thursday, and I tell the client on Friday. Anything I have got wrong?"',
    pitfalls: [
      'Checking out in your own head and leaving them to infer the agreement from what was said. Inference is where plans go to die.',
      'Adding a fourth item at the checkout, which reopens the negotiation instead of closing it.',
      'Sounding like a lawyer. The checkout is a summary offered for correction, not a contract being imposed.',
    ],
    drill: [
      'In your next three meetings, say the three-beat checkout out loud before anyone stands up.',
      'Write the checkout for a conversation you had yesterday that ended vaguely. Send it as one message.',
    ],
    pairs: ['lib-mny3', 'lib-pr4', 'lib-cr6'],
  },
  {
    id: 'cf-loop',
    name: 'The Misread Loop',
    category: 'Clarity',
    seconds: 20,
    oneLiner: 'When a message lands wrong, say the effect and ask the question — do not explain your intent.',
    when: [
      'A text you sent got a short reply',
      'A joke that died in a meeting',
      'Any moment you find yourself typing "that is not what I meant"',
    ],
    steps: [
      { label: 'Name the effect', detail: '"That read sharp" — describe what landed, not what you meant.' },
      { label: 'Own the sending', detail: 'One clause: "I wrote it in a hurry on a train." Context, not excuse.' },
      { label: 'Check, do not defend', detail: '"Was that how it came across?" A question keeps the loop open; an explanation closes it with your version.' },
    ],
    example: '"That read sharper than I intended — I wrote it on a train with one thumb. Was that how it came across, or did I misread your reply?"',
    pitfalls: [
      'Explaining what you meant for four sentences. By the end, the other person is defending their reading of a message you have now made about you.',
      'The blanket "sorry if anyone was offended". It repairs the room, not the person.',
      'Doing it in public. A misread fixed in front of an audience is a performance.',
    ],
    drill: [
      'Find one message thread where the tone went wrong this week and send the Misread Loop into it.',
      'Add one clause of context to your next three short messages before sending.',
    ],
    pairs: ['lib-cr8', 'lib-cr5', 'lib-dc1'],
  },
];

export const EXTRA_DAILY_5 = [
  // storytelling
  { id: 'd5-story-turn', skill: 'storytelling', title: 'The turn you can name', do: 'Tell a 90-second story about your week and make the turn explicit out loud: "and then the thing changed". Most stories fail because the turn is implied and the listener misses it.', time: 6, success: 'You said the turn out loud and the listener reacted at that point.' },
  { id: 'd5-story-cut', skill: 'storytelling', title: 'Cut the setup', do: 'Take the story you told most recently and remove every sentence before the first moment of tension. Tell the new version.', time: 5, success: 'The story now starts inside the action, not before it.' },

  // humour
  { id: 'd5-humour-callback', skill: 'humour', title: 'One callback, one room', do: 'In one conversation today, bring back a specific phrase someone used earlier in the same conversation. Use their word, not yours.', time: 10, success: 'Someone laughs or visibly warms at the callback.' },
  { id: 'd5-humour-deadpan', skill: 'humour', title: 'Say the absurd thing flat', do: 'Three times today, deliver a mild exaggeration with a completely straight face and no laugh attached.', time: 8, success: 'At least one person laughs and you did not smile first.' },

  // sales
  { id: 'd5-sales-diagnose', skill: 'sales', title: 'Three questions before the pitch', do: 'Next time you are asked what you do or what you sell, ask three questions first: what they use now, what broke last, what they would fix first.', time: 10, success: 'You reached the pitch with more information than you had at the start.' },

  // persuasion
  { id: 'd5-persuade-concede', skill: 'persuasion', title: 'Concede before you argue', do: 'In your next disagreement, state the strongest version of their point before you state yours. No "but" in the first sentence.', time: 6, success: 'They said "yes, exactly" at least once.' },

  // negotiation
  { id: 'd5-negotiate-silence', skill: 'negotiation', title: 'Hold the pause after the number', do: 'Say a price, a time or a number today and then say absolutely nothing for five full seconds.', time: 3, success: 'You counted five seconds without filling them.' },

  // flirting
  { id: 'd5-flirt-receive', skill: 'flirting', title: 'Receive one compliment', do: 'The next time someone says something kind to you, say only "thank you" plus one specific thing you liked about the moment. No deflection, no self-deprecation.', time: 3, success: 'You got through a compliment without turning it into a joke.' },

  // creator
  { id: 'd5-creator-one-line', skill: 'creator', title: 'One line, not one post', do: 'Write the single sentence you would want a stranger to repeat about your idea. Everything else you publish this week should support that line.', time: 10, success: 'You can say the line from memory and it fits in one breath.' },

  // presence
  { id: 'd5-presence-slow', skill: 'presence', title: 'Half speed for sixty seconds', do: 'In one conversation today, speak at half your normal pace for a minute. Count one breath before each sentence.', time: 2, success: 'Someone leans in or asks you to repeat yourself because they were listening harder.' },
];

export const EXTRA_DAILY_10 = [
  // hosting — the ninth skill track had no drills at all, so the Daily Dojo
  // could never send anyone to it. Nine drills, one per hosting problem.
  { id: 'd10-host-open', skill: 'hosting', title: 'The first ninety seconds', do: 'At the start of any gathering you run, say one sentence that tells people what this is and how long it lasts. Watch what happens to the room.', time: 3, success: 'Two people stopped hovering at the edge and sat down.' },
  { id: 'd10-host-intro', skill: 'hosting', title: 'Introduce with a fact, not a label', do: 'Introduce two people using one specific thing you know about each, instead of their job title. Then leave them alone for two minutes.', time: 5, success: 'They were still talking when you came back.' },
  { id: 'd10-host-shy', skill: 'hosting', title: 'The one-question rescue', do: 'Find the quietest person in the room and ask them one specific question about something they are holding, wearing or doing.', time: 4, success: 'They answered with more than one sentence.' },
  { id: 'd10-host-talk-time', skill: 'hosting', title: 'Count your own talk time', do: 'In one group conversation, silently count how many minutes you speak. Aim for under a third. Notice how hard it is to stay under.', time: 20, success: 'You spoke less than a third of the time and nobody noticed you holding back.' },
  { id: 'd10-host-exit', skill: 'hosting', title: 'Give people an exit', do: 'When you introduce two people, add one sentence they can both use to leave. Then watch whether the conversation ends cleanly.', time: 3, success: 'Someone ended a conversation without apologising for it.' },
  { id: 'd10-host-toast', skill: 'hosting', title: 'The thirty-second toast', do: 'Prepare and deliver one toast with exactly three beats: one specific memory, one thing they are like, one line to the room. No more than thirty seconds.', time: 10, success: 'You said the last line and stopped, and the pause afterwards was comfortable.' },
  { id: 'd10-host-thanks', skill: 'hosting', title: 'Name the help', do: 'Publicly thank one person by name for one specific thing they did. Not "for everything" — the one thing.', time: 2, success: 'They looked up, and someone else nodded.' },
  { id: 'd10-host-silence', skill: 'hosting', title: 'Sit in the silence', do: 'When a group conversation stalls, do not fill it. Wait seven full seconds and see who speaks. Then build on whichever thing they said.', time: 3, success: 'Someone volunteered something they would not have if you had talked.' },
  { id: 'd10-host-end', skill: 'hosting', title: 'End it on purpose', do: 'End a gathering with a stated close: "last drinks, I am kicking you out at eleven". Compare the ending to one that just fizzles.', time: 5, success: 'People left on time and said goodbye properly instead of drifting.' },
];

export const EXTRA_DAILY_10B = [
  // conflict and interview — the last two tracks the Daily Dojo could never
  // reach. Five each, written as the one thing you would do before a hard
  // conversation or a real interview, not as generic advice.
  { id: 'd10-conc-open', skill: 'conflict', title: 'Open with the third story', do: 'In one difficult conversation, say what happened without the accusation: "here is what I saw, here is what I made of it, and I might be wrong".', time: 5, success: 'They corrected your version instead of defending themselves.' },
  { id: 'd10-conc-pause', skill: 'conflict', title: 'Two seconds before answering', do: 'In an argument, wait two full seconds before replying. Count them. Watch what the other person does with the space.', time: 3, success: 'They said something truer in the gap than they had in the previous ten minutes.' },
  { id: 'd10-conc-request', skill: 'conflict', title: 'One observation, one request', do: 'Turn a complaint into one observation and one concrete request, out loud, today. Nothing else.', time: 6, success: 'The request was specific enough that they could say yes or no to it.' },
  { id: 'd10-conc-repair', skill: 'conflict', title: 'Repair without a but', do: 'Say sorry for one specific thing with no "but" and no explanation. Then stop talking and let them respond.', time: 3, success: 'You did not add a defence, and the silence was survivable.' },
  { id: 'd10-conc-exit', skill: 'conflict', title: 'Name the exit', do: 'In a conversation that is going badly, say when you will come back to it: "I want to finish this tomorrow at ten".', time: 2, success: 'The conversation stopped without either person leaving angry.' },
  { id: 'd10-int-evidence', skill: 'interview', title: 'One number per answer', do: 'Answer the next question anyone asks about your work with one concrete number in it. Notice how differently it lands.', time: 5, success: 'The person asked a follow-up about the number.' },
  { id: 'd10-int-gap', skill: 'interview', title: 'Name your own gap first', do: 'In a conversation about a role or a promotion, say the one thing you cannot do yet before anyone asks you about it.', time: 6, success: 'The reply was not "we were worried about that" but a question.' },
  { id: 'd10-int-question', skill: 'interview', title: 'The question that is not about the role', do: 'Prepare one question you would ask even if you were not being interviewed: what is hard here, what did the last person struggle with.', time: 10, success: 'The interviewer answered it at length and stopped reading from the script.' },
  { id: 'd10-int-stop', skill: 'interview', title: 'Stop at ninety seconds', do: 'Answer one question in under ninety seconds and then stop, even if it feels unfinished. Let them ask for more.', time: 4, success: 'They asked a follow-up, which means they were still listening at the end.' },
  { id: 'd10-int-money', skill: 'interview', title: 'Say the number without flinching', do: 'Practise out loud: say your salary expectation in one sentence, with a reason, and then say nothing at all for five seconds.', time: 5, success: 'You survived the five seconds without discounting your own number.' },
];
