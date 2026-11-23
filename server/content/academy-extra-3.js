// ─────────────────────────────────────────────────────────────
//  Academy · third wing
//  Two modules the first fourteen did not cover: the family
//  system you did not choose, and humour as a discipline rather
//  than a talent. Same shape, so the Academy renders unchanged.
// ─────────────────────────────────────────────────────────────

export const ACADEMY_EXTRA_3 = [
  // ══════════════════════════════════════════════════════════
  {
    id: 'family-systems',
    name: 'Family & The Rooms You Cannot Leave',
    tone: 'rose',
    tagline: 'Every other room lets you leave. This one you have to be good in.',
    thesis: 'Family communication is not harder small talk — it is a different discipline. The people in the room knew you when you had no social skill at all, they hold a record of every version of you, and they are the one audience you cannot replace. Skill here is not charm; it is the ability to change a pattern without winning the argument.',
    principles: [
      { title: 'You are talking to a role, not only a person', body: 'When your mother speaks to you, she is also speaking to the child she raised, the family’s expectations, and her own record as a parent. Arguments that seem disproportionate are usually about the role, not the sentence. Addressing the role — thanking it, acknowledging it — empties most of the charge.' },
      { title: 'Patterns beat words', body: 'In families, one clear conversation changes nothing and the same conversation held calmly four times changes everything. Consistency is the only thing that has ever moved a family system. Expect the first three attempts to be treated as a mood.' },
      { title: 'Rules for the table, not for a person', body: 'A rule aimed at one person is a shot; a rule for the room is a custom. "We do not discuss money at dinner" survives. "Stop asking me about money" creates a villain and a defender.' },
      { title: 'Protect dignity over accuracy', body: 'You can be completely right and still lose the next decade. Being right is cheap in families; being someone people can concede to without humiliation is what gets change. Always leave a way for the other person to move without losing face.' },
      { title: 'Never negotiate in the moment of heat', body: 'The terms proposed during a family fight are always the harshest available and never the ones anyone meant. Defer: "I want to talk about this properly — Sunday, just us." De-escalation is not avoidance when the follow-up is on the calendar.' },
      { title: 'The 4th month matters more than the 1st', body: 'In crisis, family support arrives in a flood and leaves in a drought. Being present after everyone else has returned to normal is the single most valuable thing you can do in a family, and it costs one phone call on an ordinary Tuesday.' },
    ],
    mechanics: [
      {
        name: 'The Three-Beat Boundary',
        why: 'Family boundaries fail because warmth and the line arrive in separate sentences. Combining them means the relationship is not being negotiated while the topic is.',
        steps: [
          'Warmth that is specifically true — name the care, not the person.',
          'The topic rule, stated once, in the room’s language.',
          'The substitute: what you will do instead, so no hole is left.',
          'Repeat identically when tested. Same words, same tone.',
        ],
        example: '"Auntie, you ask because you actually care and I love that — and I am not discussing it at dinner. I will call you myself the day there is news. … Same answer as earlier, and I am glad you care enough to keep asking."',
      },
      {
        name: 'State, Not Charge',
        why: 'Proud people sort every sentence into information or indictment. Once it is an indictment, the content is gone and you are arguing about character.',
        steps: [
          'Put yourself as the grammatical subject.',
          'Describe your condition, not their behaviour.',
          'Name one incident, never a pattern.',
          'Offer the face-saving door before you need it.',
          'Ask for one action, not a change of character.',
        ],
        example: '"I have not been sleeping, because I do not understand what is happening with the house. It is possible I have this wrong — if I do, tell me where. I am not asking for a promise; I am asking whether you will come with me on Thursday."',
      },
      {
        name: 'The Terms Conversation',
        why: 'Adults sharing a home inherit whatever is not discussed in the first fortnight. Terms agreed early are warmer than resentment agreed late.',
        steps: [
          'Gratitude first, briefly, and meant.',
          'Ask what they want before you offer anything.',
          'Name the five terms: money, chores, guests, quiet hours, private space.',
          'Write it down where everyone can see it.',
          'Set a review date so the arrangement is a lease, not a life sentence.',
        ],
        example: '"This is a big thing you are doing for me. Before I say what I think — what would make this feel fair to you while I am here? … Let us put the rest on one page and look again in two months."',
      },
    ],
    scripts: [
      { them: 'When are we hearing good news?', you: 'Auntie, you ask because you actually care — I love that. It is not happening yet, and you will hear it from me first. Bua, tell me how you asked Ma.', why: 'Warmth, rule, substitute, redirect — four beats in fifteen seconds.' },
      { them: 'You have changed.', you: 'I have. Some of it I am proud of and some of it I am still working out. What specifically are you seeing?', why: 'Accepts the observation without accepting the verdict, and invites the real content.' },
      { them: 'Do not tell me how to live my life.', you: 'Fair. I am not trying to run it — I am telling you what I am worried about, and then I will drop it.', why: 'Separates your concern from control, which is the actual accusation.' },
      { them: 'After everything I have done for you…', you: 'You have done more than I can repay, and that is exactly why I came to you first with this.', why: 'Refuses the guilt ledger without denying the generosity.' },
      { them: 'This is not the time.', you: 'Agreed. Sunday, just us, ten minutes. I will not bring it up before then.', why: 'Defers without disappearing, and puts the follow-up on the calendar.' },
    ],
    cautions: [
      'Family skill is not the same as family endurance. Boundaries are not a failure of love; the absence of them is what eventually ends contact.',
      'Do not use these patterns to manage people into compliance. They are for making hard truths survivable, not for winning.',
      'Some situations — abuse, addiction, violence — are not communication problems, and treating them as such keeps people in danger. Get help outside the family system.',
      'You cannot fix a parent. You can change your half of the pattern, and that is genuinely enough to change how the room feels.',
    ],
    drills: [
      { title: 'The repeat', time: 10, do: 'Have someone ask you the same intrusive question three times. Answer with the identical warm sentence three times, same tone.', success: 'You do not break on the second.' },
      { title: 'State, not charge', time: 8, do: 'Rewrite the hardest thing you need to say to a relative so every sentence starts with "I".', success: 'It is still true after the rewrite.' },
      { title: 'One incident', time: 6, do: 'Take a complaint you usually express as a pattern and reduce it to one specific occasion with a date.', success: 'It can be answered without defending a personality.' },
      { title: 'The fourth-month call', time: 4, do: 'Put a reminder in your phone for ninety days from today, for someone currently in crisis.', success: 'You will be the only one who calls that week.' },
      { title: 'Terms on one page', time: 12, do: 'If adults share your home, write the five terms and the review date tonight.', success: 'Nothing is left to be guessed later.' },
    ],
    reads: ['lib-fam1', 'lib-fam2', 'lib-fam3', 'lib-fam4', 'lib-fam5', 'lib-dc1'],
  },

  // ══════════════════════════════════════════════════════════
  {
    id: 'humour-craft',
    name: 'Humour As A Discipline',
    tone: 'amber',
    tagline: 'Funny is not a personality. It is a set of small mechanical decisions.',
    thesis: 'Humour looks like spontaneity and behaves like engineering: target, timing, specificity and the willingness to let a line die. People who are consistently funny in rooms are not funnier than you — they are making better decisions about direction and length, and they have practised the recovery.',
    principles: [
      { title: 'Direction before content', body: 'Aim at yourself or at the shared situation, and the room relaxes. Aim at a person before there is warmth on the record, and the room runs a threat assessment instead of laughing. Same joke, different direction, opposite result.' },
      { title: 'Specific beats absurd', body: '"A dog" is not funny. "A dog that has decided the postman is his personal nemesis and has committed his life to it" is funny, because the detail is doing the work. Comedy lives in the particular; generality is where jokes go to be described rather than laughed at.' },
      { title: 'Brevity is the whole craft', body: 'Every extra clause costs you. A joke that has to be re-explained has already died, and the explanation is what people remember. If you cannot say it in one breath, do not say it.' },
      { title: 'Land it and stop', body: 'The laugh is not the end of your turn. People who keep talking after the laugh dilute the joke and take the room from enjoying it to watching them enjoy themselves. Say the line, then be quiet.' },
      { title: 'The callback is worth more than the joke', body: 'Attention is scarcer than wit. A returned reference proves you were listening, which is why the second-best joke in the room often gets the best reaction when it is aimed at something everyone remembers.' },
      { title: 'Dead jokes handled well are charming', body: 'Composure is the skill underneath all of it. "That usually works, so I am blaming the room" costs you nothing and reads as security. Panic or apology after a line that did not land costs more than the silence would have.' },
    ],
    mechanics: [
      {
        name: 'The Target Ladder',
        why: 'Every joke has a target whether you chose one or not. Choosing deliberately is the difference between warm and hostile.',
        steps: [
          'Strangers and new acquaintances → target the situation, the institution, the shared absurdity.',
          'Established warmth → the person becomes available as a target, gently, and ideally reciprocally.',
          'Always available → yourself, specifically, told without apology.',
          'Never, in any group → someone who cannot answer back.',
        ],
        example: '"This queue has clearly been designed by someone who has never stood in it." … "I once got lost in a hotel that had one corridor. One." … "I am going to blame the room for that one."',
      },
      {
        name: 'The Pressure Valve',
        why: 'Some true things cannot be said plainly in a family or a team. A joke carries them because it offers everyone an exit.',
        steps: [
          'Pick one true observation, not a catalogue.',
          'Aim it at the situation or the whole group, never one person.',
          'Keep it under fifteen words.',
          'Deliver warm, eyes on the room, not on a target.',
          'Stop. If asked "are you serious?", answer "half", and stop again.',
        ],
        example: '"Nobody noticed the deadline until two days after it passed, which is certainly a bold strategy." … "Half."',
      },
      {
        name: 'The Callback Ledger',
        why: 'A running reference proves attention and builds a shared world — the cheapest intimacy available.',
        steps: [
          'Collect three specific, odd details per evening. Specific, not funny.',
          'Use one in the same conversation, after a lull.',
          'Use one in a larger group, making the original person your co-author.',
          'Use one days later in a message with no other reason to send it.',
          'Retire it. Two callbacks per conversation, maximum.',
        ],
        example: '"Still thinking about the coffee that tasted like a decision." … "The chair has been promoted. It has a role in the hallway now."',
      },
    ],
    scripts: [
      { them: 'That was not funny.', you: 'No, it was not. I am going to hold that one up as a warning to the others.', why: 'Owns it lightly, keeps composure, does not apologise twice.' },
      { them: '(silence after your joke)', you: 'Anyway. What were you saying about the roof?', why: 'The clean bail-out: no explanation, no post-mortem, returns to them.' },
      { them: 'You are quite harsh.', you: 'Half. And if you tell me it was the wrong half, I will listen.', why: 'Keeps the joke deniable while leaving the real conversation open.' },
      { them: '(teases you back)', you: 'That was better than mine and I am going to let it sit for a second.', why: 'Taking a return well is what turns a jab into a game.' },
    ],
    cautions: [
      'Humour is not a substitute for saying the thing. A pressure valve used for years instead of one honest conversation becomes a family tradition of not talking.',
      'Never punch down. It reads as competence to the person doing it and as cruelty to everyone watching, and audiences remember cruelty longer than they remember jokes.',
      'Do not use self-deprecation as a way to pre-empt criticism you fear. That is anxiety wearing a joke, and people can hear the difference.',
      'If the room laughs and one person goes quiet, the joke is not finished — check on the quiet person afterwards. That is the whole of social responsibility in humour.',
    ],
    drills: [
      { title: 'One breath rule', time: 5, do: 'Take a joke you like and cut it to one breath, then say it out loud three times.', success: 'Nothing essential is lost in the cut.' },
      { title: 'Three specifics', time: 10, do: 'In one evening, collect three oddly specific details. Use one that night.', success: 'You can repeat it word for word the next day.' },
      { title: 'Target check', time: 6, do: 'Before each of your next three jokes, consciously pick a target from the ladder.', success: 'None of them is a person who cannot answer back.' },
      { title: 'The clean bail', time: 4, do: 'Let one joke die in silence on purpose and bail without explaining.', success: 'Nobody remembers, because you did not make it a moment.' },
      { title: 'Callback in a message', time: 3, do: 'Send a callback to a specific detail two days later, with no other reason to text.', success: 'They reply with the detail back.' },
    ],
    reads: ['lib-hm1', 'lib-hm2', 'lib-hm3', 'lib-hm4', 'lib-w1', 'lib-w5'],
  },
];
