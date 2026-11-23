// ─────────────────────────────────────────────────────────────
//  Fourth wing · the gaps between the big sections
//  Eight frameworks (the vault had nothing for care, family,
//  money or self-advocacy), eight wit scenarios in registers the
//  simulator never had, eight body-language cards for meetings and
//  family rooms, and ten daily drills that train the retention
//  loop rather than adding another monologue.
// ─────────────────────────────────────────────────────────────

export const EXTRA_FRAMEWORK_CATEGORIES = ['Care', 'Family', 'Money', 'Self'];

export const EXTRA_FRAMEWORKS = [
  // ── Care ─────────────────────────────────────────────────
  {
    id: 'hold-space', name: 'Hold, Don\u2019t Fix', category: 'Care', seconds: 30,
    oneLiner: 'When someone is in pain, your job in the first minute is to agree that it is bad, not to make it smaller.',
    when: ['Someone tells you bad news', 'A friend is crying and you feel useless', 'Any time you catch yourself about to say "have you tried"'],
    steps: [
      { label: 'Name it plainly', detail: '"That sounds unbearable." Not "at least", not "everything happens for a reason" — those minimise, and minimising is heard as abandonment.' },
      { label: 'Stay', detail: '"And I am not going anywhere." The truth plus your continued presence is the whole offer; the truth alone is just accurate cruelty.' },
      { label: 'Ask about the day', detail: '"How was today?" is answerable in one word. "How are you?" forces either a lie or a burden.' },
      { label: 'Offer one specific help', detail: '"I am bringing food Thursday at six — what can you not eat?" Never "let me know if you need anything".' },
      { label: 'Follow their register', detail: 'If they want to talk about the match, talk about the match. Being ordinary company is a service, not avoidance.' },
    ],
    pitfalls: ['Rushing to a solution to end your own discomfort.', 'Crying until they comfort you, which reverses the transaction.', 'Comparing to someone who survived, which turns a life into a probability.'],
    drill: 'Say the two sentences — the honesty and the staying — out loud, then sit in ten seconds of silence without rescuing anyone.',
  },
  {
    id: 'specific-help', name: 'The Specific Help Offer', category: 'Care', seconds: 20,
    oneLiner: '"Let me know if you need anything" is a task. A date, a thing and a question is a gift.',
    when: ['Anyone in crisis, illness or grief', 'A colleague drowning in work', 'A new parent, a carer, anyone whose week has collapsed'],
    steps: [
      { label: 'Pick a real task', detail: 'Food, a lift, cover for two calls, the pharmacy. Concrete beats kind-sounding.' },
      { label: 'Put a date and time in it', detail: '"Thursday at six" cannot be postponed indefinitely; "sometime" can.' },
      { label: 'Remove the work of accepting', detail: 'End with a question they can answer in three words: "what can you not eat?"' },
      { label: 'Say what you will not do', detail: '"I have not told anyone why" — privacy is part of the gift.' },
    ],
    pitfalls: ['Offering a menu of options, which is admin for someone with no capacity.', 'Over-promising so you can feel useful, then cancelling.', 'Announcing the help publicly, which makes it about you.'],
    drill: 'Text one person in your life who is having a hard month, with a task, a time and a question. Today.',
  },
  // ── Family ───────────────────────────────────────────────
  {
    id: 'three-beat-boundary', name: 'The Three-Beat Boundary', category: 'Family', seconds: 25,
    oneLiner: 'Warmth, then the topic rule, then the substitute — all in one breath, or the line gets tested.',
    when: ['The relative who asks the same question every dinner', 'In-laws, parents, siblings with opinions', 'Any topic you have decided is closed'],
    steps: [
      { label: 'Warmth that is true', detail: 'Name the care behind the question, not the person: "you ask because you actually care, and I love that".' },
      { label: 'The topic rule', detail: 'About the room, not the person: "I am not discussing it at dinner." Topic rules can be obeyed; character rules can only be avenged.' },
      { label: 'The substitute', detail: '"You will hear it from me first." Gives them a future, so they stop fighting for information now.' },
      { label: 'Repeat identically', detail: 'Same words, same tone, third time. The repeat is what rewrites the pattern; irritation on the second delivery proves it was a mood.' },
    ],
    pitfalls: ['Warmth without a rule — a lovely chat in which nothing is decided.', 'A rule without warmth — now there is a family story about how you changed.', 'Turning it into a debate about their right to care.'],
    drill: 'Write your three beats for the question you dread, under thirty-five words. Deliver it while pouring tea.',
  },
  {
    id: 'state-not-charge', name: 'State, Not Charge', category: 'Family', seconds: 30,
    oneLiner: 'Make yourself the subject of the sentence. Proud people can answer a condition; they can only defend a character.',
    when: ['A defensive parent', 'Any conversation where "you always" is forming', 'When being right is losing you the decade'],
    steps: [
      { label: 'You as subject', detail: '"I have not been sleeping because I do not understand what is happening with the house." Same information as an accusation, none of the survival maths.' },
      { label: 'One incident', detail: 'A pattern is an identity attack. "When you told Ramesh to ignore the letter" is a Tuesday that can be discussed.' },
      { label: 'Door before you need it', detail: '"It is possible I have this wrong — if I do, tell me where." The only way a proud person can move without losing rank.' },
      { label: 'Ask for one action', detail: '"Will you come with me on Thursday?" is answerable. "Be more honest" is not.' },
      { label: 'Close with what stays', detail: '"I came to you first because you are still who I come to." Fill the closing silence with the relationship.' },
    ],
    pitfalls: ['Bringing the history.', 'Recruiting a sibling as evidence.', 'Softening until the Thursday appointment never gets asked for.'],
    drill: 'Rewrite the hardest thing you need to say so every sentence begins with "I". Cut "always", "never", "again".',
  },
  // ── Money ────────────────────────────────────────────────
  {
    id: 'number-and-silence', name: 'The Number and the Silence', category: 'Money', seconds: 15,
    oneLiner: 'Say the figure flatly, attach scope in one clause, then say nothing. Everything you add is a discount.',
    when: ['Quoting a price', 'Asking for a raise', 'Any moment where someone asks what you charge'],
    steps: [
      { label: 'No runway', detail: 'Delete "so, um, we were thinking maybe somewhere around". A preamble is a request for permission, and permission is expensive.' },
      { label: 'One clause of scope', detail: '"It is X, and that includes the strategy, the build and two revisions." Price with scope invites a decision; price alone invites comparison.' },
      { label: 'Stop', detail: 'Five seconds. Count them. Whatever you say in that gap will be a discount — a joke, a laugh, "but we can be flexible".' },
      { label: 'Ask their budget', detail: '"What number were you working with?" Replaces defending your price with collecting information.' },
      { label: 'De-scope, never discount', detail: '"I can do it for Y if we drop the revisions and you handle the copy. Same rate, smaller job."' },
    ],
    pitfalls: ['A range — "between A and B" means B.', 'Explaining your costs, which invites an audit of your life.', 'Filling the silence, which converts a firm number into a nervous one.'],
    drill: 'Say your number out loud, then sit in five seconds of silence on a timer. Ten reps.',
  },
  {
    id: 'blame-yourself-first', name: 'Blame Yourself First', category: 'Money', seconds: 25,
    oneLiner: 'When someone owes you, their shame is the obstacle. Take the awkwardness and the arithmetic becomes possible.',
    when: ['A friend who has not paid you back', 'An unpaid invoice with a relationship attached', 'Any chase that has gone quiet for months'],
    steps: [
      { label: 'Name it in one line', detail: '"I want to sort out the money from March properly, so it stops being a thing between us."' },
      { label: 'Own the delay', detail: '"I never followed up because it felt awkward. That is on me." Real, and it costs you nothing on the debt.' },
      { label: 'Give structure', detail: '"Does 5,000 a month from next month work?" Amount, date, frequency — shame cannot survive arithmetic.' },
      { label: 'Name the stake', detail: '"I would rather have this awkward ten minutes than change how we are with each other."' },
      { label: 'Confirm in writing', detail: 'Same day, lightly. "I will nudge you by the 7th — that is me keeping my own word."' },
    ],
    pitfalls: ['Hinting, which teaches them the topic is a trap.', 'Asking in front of others.', 'Forgiving silently and remembering loudly.'],
    drill: 'Write the amount, the plan and the confirmation message. Say the first two sentences aloud five times.',
  },
  // ── Self ─────────────────────────────────────────────────
  {
    id: 'evidence-ladder', name: 'The Evidence Ladder', category: 'Self', seconds: 30,
    oneLiner: 'Confidence is not a mindset. It is a stack of small receipts you collected on purpose.',
    when: ['Starting from zero', 'After a bad run of conversations', 'Any time you are waiting to feel ready'],
    steps: [
      { label: 'Pick one rung', detail: 'So small it is almost silly: say one sentence to the barista. The size of the rep does not matter; the collection does.' },
      { label: 'Do it today', detail: 'Not this week. Confidence is built by frequency, not intensity.' },
      { label: 'Record it', detail: 'One line in My Scripts or a ticked daily drill. The receipt is what makes the ladder real.' },
      { label: 'Climb one rung', detail: 'Next rep slightly harder: a question instead of a comment, a name, a small opinion.' },
      { label: 'Never let a gap mean starting over', detail: 'A missed week is a gap, not a reset. Rejoin at the rung you left.' },
    ],
    pitfalls: ['Waiting to feel confident before acting — the feeling is the output.', 'Skipping three rungs and calling the failure evidence you cannot do it.', 'Collecting receipts privately and never spending them on a real interaction.'],
    drill: 'Choose today\u2019s rung, do it within three hours, and write down what actually happened in one sentence.',
  },
  {
    id: 'the-warm-exit-frame', name: 'The Warm Exit', category: 'Self', seconds: 20,
    oneLiner: 'Leave on a high, by name, naming the best moment. The exit is what decides whether there is a next time.',
    when: ['Ending any good conversation', 'Networking, weddings, work socials', 'When you have run out of things to say'],
    steps: [
      { label: 'Name the exit as generosity', detail: '"I am going to let you go before I talk your ear off." Escape dressed as care.' },
      { label: 'Name the specific best moment', detail: '"The goat story was worth the whole evening." Specificity proves you were there.' },
      { label: 'Leave one thread hanging', detail: '"But I want to hear how the exam went — find me later." A reason to return.' },
      { label: 'Take the last name', detail: 'Use it once in the exit. It is the cheapest way to be remembered.' },
    ],
    pitfalls: ['The slow fade, which leaves them unsure whether you left or escaped.', 'Leaving without the specific moment, which reads as polite and forgettable.', 'Staying twenty minutes past your own interest, which costs you the warmth.'],
    drill: 'End one conversation deliberately today, with the moment and the thread. Notice how differently the next hello lands.',
  },
];

export const EXTRA_WIT = [
  {
    id: 'w21', category: 'Repair', level: 2,
    title: 'You Killed the Joke',
    setup: 'You made a joke at a work lunch. Nobody laughed. One person is looking at their plate.',
    theySay: 'Well. That landed.',
    context: 'Small group, your joke died, and someone has named the death. The room is now watching how you handle it.',
    strategies: ['deadpan', 'self-deprecation', 'exit'],
    modelLines: [
      'It did not land, and I would rather own that than explain it.',
      'I am going to hold that one up as a warning to the others. Anyway — what were you saying about the roof?',
      'Right. Let you go on that one — new topic, from me, immediately: anything but that.',
    ],
    coach: 'Composure is the whole skill here. One light acknowledgement, no post-mortem, no explanation of what you meant. Then hand the floor to someone else.',
  },
  {
    id: 'w22', category: 'Repair', level: 3,
    title: 'The Joke That Went Too Far',
    setup: 'You teased a colleague and their face changed. Two other people are still laughing.',
    theySay: 'No, it is fine. It is funny.',
    context: 'They said it is fine in the voice that means it is not. The others are still laughing, which makes repair harder.',
    strategies: ['honesty-warm', 'specific-gratitude', 'exit'],
    modelLines: [
      'It is not fine, and I can see that. That was too close, and I am sorry — that was me, not you.',
      'I am going to stop there. It was a bad read on my part, not a joke you should have to laugh at. Let you go.',
      'Let me get the next round and leave you out of it entirely.',
    ],
    coach: 'Stop the joke, name the cost, apologise once without a "but", and do not ask them to reassure you. The audience matters less than the person.',
  },
  {
    id: 'w23', category: 'Flirt', level: 2,
    title: 'They Tease You First',
    setup: 'You have been talking for ten minutes and it is going well. They decide to test you.',
    theySay: 'You are a bit sure of yourself, are you not?',
    context: 'Warm, playful, but a real question: are you going to get defensive, or play?',
    strategies: ['agree-amp', 'charm-flip', 'grace'],
    modelLines: [
      'True. Only about the small things — my taste in music is a disaster area.',
      'I am sure about the coffee, and about this conversation. Everything else is negotiable.',
      'Fair enough. Says the person who just cut me off mid-sentence. I am taking notes.',
    ],
    coach: 'Teasing back is a gift only if it is warm. Agree with the small part, give something away, keep the smile in your voice — never match the edge with a bigger edge.',
  },
  {
    id: 'w24', category: 'Group', level: 3,
    title: 'The Table That Will Not Let You Speak',
    setup: 'Six people, fast conversation, one person dominating. You have a good story and no gap to enter.',
    theySay: '[The dominant talker starts another one without pausing.]',
    context: 'Not hostile — just fast. You have about two seconds of gap between each of their sentences.',
    strategies: ['warm-entry', 'hold-frame', 'calm-competence'],
    modelLines: [
      'Hold that thought — I have one that fits, and I will finish it in one breath, then it is yours.',
      'Can I put a question in the middle of this before it moves on?',
      'That is the same thing that happened to me last year, and I have not told anyone here.',
    ],
    coach: 'Enter in the gap, not over the top of someone. One short, self-contained hinge line plus a specific detail — not a general opinion, which gets absorbed.',
  },
  {
    id: 'w25', category: 'Retort', level: 2,
    title: 'The Backhanded Compliment',
    setup: 'A relative, in front of everyone.',
    theySay: 'You look so much better than the last time we saw you. What happened?',
    context: 'Plausibly kind, definitely a test, with an audience. Nobody in the room believes it was a compliment.',
    strategies: ['callback', 'charm-flip', 'deadpan'],
    modelLines: [
      'Sleep. I cannot recommend it more highly — you said the same thing to me last year, so I finally listened.',
      'I have been taking your advice from last year. Every single piece of it.',
      'Thank you — I have been working on looking less like my old self, which I assume was the issue.',
    ],
    coach: 'Do not protest and do not swing. Answer the surface, ignore the knife, and let one small callback do the correcting.',
  },
  {
    id: 'w26', category: 'Callback', level: 2,
    title: 'The Second Meeting',
    setup: 'You met three months ago at a conference. They clearly do not remember you but are pretending to.',
    theySay: 'Of course! Great to see you again.',
    context: 'You need to prove value fast without making them feel caught out.',
    strategies: ['callback', 'specific-gratitude', 'grace'],
    modelLines: [
      'You gave me a line about deadlines I have been quoting ever since. It is now other people\u2019s problem.',
      'We were in the queue that never moved. I am the one who said the coffee was a decision.',
      'I am not going to pretend we both remember it in detail: we met at the panel, and you were far more interesting than the speaker.',
    ],
    coach: 'Give them a specific detail to hold instead of asking them to remember. Reflection plus a gift beats a test they have already failed.',
  },
  {
    id: 'w27', category: 'Tension', level: 3,
    title: 'The Meeting That Turned',
    setup: 'A meeting about something practical has become personal. A senior colleague has just blamed your team.',
    theySay: 'And nobody on your side raised this, which I find telling.',
    context: 'Public, adversarial, your team is watching. Humour here has to lower the temperature without conceding.',
    strategies: ['calm-competence', 'reframe', 'agree-amp'],
    modelLines: [
      'That is fair. Here is what we did raise, and when — then judge it properly.',
      'You may be right about the silence. I would rather spend the next two minutes on the fix than the finding.',
      'That is a fair hit and I am not going to argue with it in the room. Can we do the post-mortem after, with me, properly?',
    ],
    coach: 'Never joke your way out of a real accusation — it reads as contempt. Concede the surface, move to the useful question, take the harder conversation privately.',
  },
  {
    id: 'w28', category: 'Banter', level: 1,
    title: 'The Silence',
    setup: 'You and a friend are queuing. Nothing is happening. The pause has gone on four seconds.',
    theySay: 'So.',
    context: 'Not awkward yet. Four seconds, both of you aware of it.',
    strategies: ['deadpan', 'callback', 'low-stakes'],
    modelLines: [
      'That is the most loaded "so" I have heard all year.',
      'We are at the stage of the queue where people reveal things. I will tell you one useless fact, then you.',
      'I will go. I have been rehearsing a sentence about this queue for ten minutes.',
    ],
    coach: 'Do not fill a silence with a new subject — name the silence, lightly, and hand them the next line. It costs nothing and reads as ease.',
  },
];

export const EXTRA_BODY_V4 = [
  { id: 'bd41', cluster: 'Status & Space', difficulty: 2, scene: 'In a meeting, one person speaks with their chin level, hands visible on the table, and pauses before answering. Three people are nodding.', question: 'What is doing most of the work?', options: ['Their volume', 'Their stillness and the pause they take before speaking', 'Their eye contact frequency', 'Their chair position'], answer: 1, cue: 'Stillness reads as status. Fidgeting signals urgency; a pause before answering signals that you are choosing to speak.', explain: 'In meetings, silence before you answer is read as confidence — you are not scrambling. Visible hands and a level chin complete the signal. Volume is a weaker cue than composure.' },
  { id: 'bd42', cluster: 'Status & Space', difficulty: 3, scene: 'Two colleagues disagree. One leans forward and raises their hand slightly, palm down. The other leans back and crosses their arms.', question: 'Which is more likely to win the room?', options: ['The one leaning forward, because urgency is persuasive in teams', 'The one leaning back, because retreating signals real authority', 'Neither — leaning forward with a palm-down gesture signals "stop", which often reads as defensive rather than authoritative', 'The one with their arms crossed, because it signals disagreement'], answer: 2, cue: 'Palm-down, forward leaning gestures are a "cut" — physically ending someone else. Open palms and leaning back are more often read as listening.', explain: 'The forward lean plus palm-down cut is a physical interruption, and groups read it as anxiety more often than conviction. The confident version keeps hands open and leans back a degree.' },
  { id: 'bd43', cluster: 'Feet & Legs', difficulty: 2, scene: 'A family dinner. Your relative has one foot pointing toward the door through the entire meal. They are smiling and asking good questions.', question: 'Most likely read?', options: ['They are cold', 'They are engaged but want to leave — the foot is the tell, not the smile', 'They are hiding something', 'They are uncomfortable with the food'], answer: 1, cue: 'Feet point at what we want and away from what we are done with. It is one of the last cues to be consciously controlled.', explain: 'This is the classic case for reading the cluster: the face is warm and the feet are truthful. Note the intent gently with an exit offer — "we can wrap up if you have somewhere to be" — and watch the relief.' },
  { id: 'bd44', cluster: 'Micro-Expressions', difficulty: 4, scene: 'You tell a colleague you disagree with their plan. For a fraction of a second their eyebrows shoot up and their mouth tightens, then they nod and say "fair point".', question: 'What happened?', options: ['They accepted the point immediately', 'A flash of surprise or threat was suppressed and replaced with a social response', 'They were amused', 'The expression was noise'], answer: 1, cue: 'An eyebrow flash followed by a fast recovery is a suppressed first reaction. The nod is the second, chosen one.', explain: 'Both are true at once: they had a defensive reflex and covered it. That is not dishonesty — it is a person managing themselves. The useful move is to slow down and ask what they see differently.' },
  { id: 'bd45', cluster: 'Hands', difficulty: 2, scene: 'Across a coffee table, someone listening to you rests their chin on their hand and slowly begins to look at the floor.', question: 'What are you actually getting?', options: ['Deep attention', 'Signals of concentration that are indistinguishable from boredom — check your length', 'Disagreement', 'Attraction'], answer: 1, cue: 'Hand-to-face is ambiguous: chin on fist can be attention or fatigue. The decider is whether they return with a question.', explain: 'The only reliable test is whether they engage when you stop. If they pick it up, you had attention. If not, you had two minutes too many. Shorten and hand the floor over.' },
  { id: 'bd46', cluster: 'Eyes', difficulty: 3, scene: 'Someone you are talking to looks at your mouth while you speak, then back at your eyes when you stop.', question: 'Best read?', options: ['Lying', 'Likely attraction or very deliberate attention — the mouth is a warmth cue, not a threat cue', 'They cannot hear you', 'They disagree'], answer: 1, cue: 'Eye-to-mouth is a triangle associated with warmth and attraction. Eye-to-forehead is the dominance triangle.', explain: 'It is a warmth cue, not a licence. Nothing here is consent: notice it, do not act on it, and let them lead the pace.' },
  { id: 'bd47', cluster: 'Mirroring', difficulty: 2, scene: 'Ten minutes into a conversation, you notice the other person has taken the same lean and the same slower tempo as you. Previously they were leaning back and fast.', question: 'What is this usually evidence of?', options: ['They are imitating you to build rapport on purpose', 'Rapport building — mirroring is usually unconscious when it is genuine', 'They are mocking you', 'Nothing at all'], answer: 1, cue: 'Genuine mirroring is unconscious and appears as the conversation warms. Deliberate mirroring usually looks a beat late.', explain: 'If you want to test it, change your posture once and see whether they follow after some seconds. If they do, the conversation is aligned — which is your cue to say the slightly braver thing.' },
  { id: 'bd48', cluster: 'Micro-Expressions', difficulty: 3, scene: 'You ask a friend how the new job is going. They say "great, really good" and their shoulders lift a centimetre while their lips press together for a moment.', question: 'Most useful interpretation?', options: ['They are happy', 'There is a cost they are not raising — the press and the shoulder lift contradict the words', 'They are lying about the job', 'Nothing readable'], answer: 1, cue: 'Lip pressing is a classic stifling cue; shoulder lift reads as tension. Words can be chosen, tension is not.', explain: 'Do not call it out as an accusation. Leave a door: "that sounds like a lot, honestly" and then stop. If they want to use the door, they will — and you will not have made them defend the good version.' },
];

export const EXTRA_DAILY = [
  { id: 'd31', skill: 'presence', title: 'The Ten-Second Silence', do: 'In one conversation today, answer a question after a deliberate two-second pause. Count it in your head.', why: 'Silence before an answer reads as composure, not hesitation.', success: 'Nobody fills the gap for you.', time: 4 },
  { id: 'd32', skill: 'persuasion', title: 'One Queue, One Sentence', do: 'Say one observational sentence to a stranger in a queue, with no question attached, and let it sit.', why: 'Observations are un-refusable; questions put people on the spot.', success: 'They reply or they do not — and you are unaffected either way.', time: 5 },
  { id: 'd33', skill: 'humour', title: 'Kill One Joke Well', do: 'Let a joke die in total silence. Do not explain it, do not apologise, just bail cleanly.', why: 'Composure after a dead joke is more charming than the joke would have been.', success: 'The conversation moves on and nobody remembers.', time: 6 },
  { id: 'd34', skill: 'storytelling', title: 'One Rung Deeper', do: 'Take one answer someone gives you and go exactly one level further than you normally would.', why: 'Depth is not a bigger question, it is the next rung down with no sudden turn.', success: 'They say something they did not plan to say.', time: 8 },
  { id: 'd35', skill: 'negotiation', title: 'The One-Sentence No', do: 'Decline one thing today in a single sentence with no justification attached.', why: 'Every clause of explanation is an invitation to negotiate.', success: 'You did not follow it with "sorry, it is just that…".', time: 4 },
  { id: 'd36', skill: 'presence', title: 'Land the Last Word', do: 'In three sentences today, drop your pitch on the final word instead of rising.', why: 'A downward landing reads as certainty; an upward one asks for approval.', success: 'You notice a sentence landing rather than trailing off.', time: 6 },
  { id: 'd37', skill: 'persuasion', title: 'The Warm Rule', do: 'Set one small boundary with a relative using warmth, the rule, then the substitute.', why: 'Boundaries fail when the affection is in a different sentence.', success: 'You did not have to raise your voice or leave the room.', time: 10 },
  { id: 'd38', skill: 'sales', title: 'Say the Number Flat', do: 'Say a price, a rate or a cost out loud without a preamble and without apologising.', why: 'Speed reads as doubt, and doubt is what invites a discount.', success: 'There is a tiny silence and you let it exist.', time: 5 },
  { id: 'd39', skill: 'persuasion', title: 'Ask About the Day', do: 'Ask one person "how was today?" instead of "how are you?", and do not fix anything.', why: 'A day is answerable; a life is a burden.', success: 'You resist the urge to offer a solution.', time: 6 },
  { id: 'd40', skill: 'flirting', title: 'The Specific Thank You', do: 'Thank one person for something specific they did, naming the choice they made.', why: 'Specific praise can only apply to that person, which is what makes it evidence.', success: 'They look slightly surprised and then pleased.', time: 5 },
];
