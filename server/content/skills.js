// ─────────────────────────────────────────────────────────────
//  Skill Tracks · Sales · Persuasion · Flirting · Negotiation · Presence
//  Each track: principles, scripted lines, and five exercises that
//  can be done today without a partner.
// ─────────────────────────────────────────────────────────────

export const SKILL_TRACKS = [
  {
    id: 'sales',
    name: 'Sales',
    tone: 'rose',
    tagline: 'Diagnose before you prescribe.',
    principle: 'Nobody buys a product. They buy a version of their week that is easier.',
    principles: [
      'Ask three questions before you say one thing about yourself.',
      'Sell the outcome, price the product.',
      'An objection is a request for proof, not a rejection.',
      'Silence after the price is part of the price.',
      'The close is a question, not a speech.',
    ],
    scripts: [
      { them: 'So what do you do?', you: 'I help teams stop losing deals in the paperwork. What does your week look like when paperwork goes wrong?' },
      { them: 'It\'s too expensive.', you: 'That is a fair concern — expensive compared to what? If it saves one deal a quarter, where does that put it?' },
      { them: 'Send me some information.', you: 'Happy to. So I send the right thing: is the blocker the price, the timing, or getting the team to agree?' },
    ],
    exercises: [
      { id: 'sales-q3', title: 'Three Questions, Zero Pitch', why: 'You cannot diagnose from a monologue.', steps: ['Write down three questions about their situation, not your product.', 'Use them in one real conversation today.', 'Do not mention what you sell until they ask.'], time: 10, success: 'They asked you a question first.' },
      { id: 'sales-outcome', title: 'Outcome Rewrite', why: 'Features are forgettable; consequences are not.', steps: ['Take any product you know — yours or a friend\'s.', 'Write down its three features.', 'Rewrite each as "so you can…" with a number in it.'], time: 12, success: 'Every line has a number or a named moment.' },
      { id: 'sales-objection', title: 'Objection Bank', why: 'Fluency under pressure is retrieval, not invention.', steps: ['Write the five objections you fear most.', 'Write a two-sentence answer to each: acknowledge, then reframe.', 'Say all five out loud until they stop sounding rehearsed.'], time: 15, success: 'No answer contains the word "but".' },
      { id: 'sales-price', title: 'Say the Number', why: 'Most people flinch at their own price and the client hears it.', steps: ['Write your price on paper.', 'Say it out loud, then stay silent for five full seconds.', 'Repeat five times, allowing the silence each time.'], time: 8, success: 'You can hold five seconds without filling it.' },
      { id: 'sales-close', title: 'Four Ways to Ask', why: 'One script is a script; four is a choice.', steps: ['Write four different closing questions.', 'Make one assumptive, one direct, one soft, one curious.', 'Pick the one that fits your voice and say it out loud twice.'], time: 10, success: 'Your close is a question of fewer than twelve words.' },
    ],
    reads: ['lib-bz1', 'lib-bz2', 'lib-bz3', 'lib-mny2'],
    arena: ['marco', 'elena', 'daniel'],
    gym: ['Business'],
  },
  {
    id: 'persuasion',
    name: 'Persuasion',
    tone: 'violet',
    tagline: 'Make the other person\'s reasons visible.',
    principle: 'People do not act on your reasons. They act on their own, surfaced out loud.',
    principles: [
      'Show the trade-off instead of arguing for the option.',
      'One vivid example beats five statistics.',
      'Concede the strongest counter-point before they raise it.',
      'Use their words, not your vocabulary, when you summarise.',
      'Ask "what would change your mind?" — it converts a fight into a definition.',
    ],
    scripts: [
      { them: 'I just don\'t see why we need this.', you: 'That is the right thing to be suspicious of. What would it have to do in the first two weeks for you to call it worth it?' },
      { them: 'You\'re oversimplifying.', you: 'Probably, yes. Which part am I flattening that actually matters?' },
      { them: 'Everyone disagrees with you.', you: 'Then I should hear the strongest version. What is the best case against it?' },
    ],
    exercises: [
      { id: 'pers-steelman', title: 'Steelman Before You Argue', why: 'You cannot answer a position you have not actually stated.', steps: ['Pick one opinion you disagree with.', 'Write the strongest version of it, better than its actual supporters.', 'Then write your reply in two sentences.'], time: 12, success: 'Your summary would satisfy someone who holds that view.' },
      { id: 'pers-concede', title: 'Concede First', why: 'Leading with agreement removes the need to resist.', steps: ['Take a real disagreement from this week.', 'Write the one thing they are right about.', 'Say that sentence first, out loud, before any counter-point.'], time: 10, success: 'You can say it without "but" attached.' },
      { id: 'pers-tradeoff', title: 'Frame the Trade-off', why: 'Choice framing moves people further than advocacy.', steps: ['Name the decision.', 'Write both options as costs, honestly.', 'Ask which cost they would rather carry.'], time: 10, success: 'Both options sound survivable.' },
      { id: 'pers-story', title: 'Evidence Ladder', why: 'The order of evidence decides whether it is believed.', steps: ['For one claim, write three pieces of evidence.', 'Rank them by how vivid they are, not how impressive.', 'Lead with the most vivid, close with the most rigorous.'], time: 12, success: 'The first piece is a specific event, not a statistic.' },
      { id: 'pers-mind', title: 'What Would Change Your Mind?', why: 'The question that defuses most arguments.', steps: ['Write your position on something small.', 'Write what evidence would falsify it.', 'Then ask someone the same question about theirs.'], time: 8, success: 'You have a real answer for yourself.' },
    ],
    reads: ['lib-c6', 'lib-c9', 'lib-g4', 'lib-bz4'],
    arena: ['daniel', 'elena'],
    gym: ['Business'],
  },
  {
    id: 'flirting',
    name: 'Flirting',
    tone: 'amber',
    tagline: 'Warmth plus specificity, minus pressure.',
    principle: 'Flirting is not a script. It is noticing something real about a person and letting them see you noticed — with no cost attached to not reciprocating.',
    principles: [
      'Compliment a choice, never a body part you cannot unsee.',
      'Ask, then react to the actual answer — the reaction is the flirting.',
      'One playful tease, then return to warmth. Never stack.',
      'Make the exit easy and you will be invited back.',
      'Interest is expressed, not extracted. No interrogation.',
    ],
    scripts: [
      { them: 'I\'m not really a going-out person.', you: 'I respect that enormously. What is a good evening for you, then?' },
      { them: 'That\'s a weird thing to notice.', you: 'It is. I\'m going to keep it — it was the most interesting thing about the room.' },
      { them: 'I have to go find my friends.', you: 'Of course. Find me before you leave, or I\'ll assume the goat story won.' },
    ],
    exercises: [
      { id: 'flirt-specific', title: 'Specific Compliment Practice', why: '"You\'re lovely" costs nothing; "that joke was genuinely well built" costs attention.', steps: ['Give three compliments today that name a choice or a skill.', 'No compliment about appearance alone.', 'Say it and then keep the conversation going.'], time: 15, success: 'Every compliment could only apply to that person.' },
      { id: 'flirt-reaction', title: 'React, Don\'t Interview', why: 'Questions without reactions feel like a form.', steps: ['Ask one question.', 'Before your next question, say a full sentence about their answer.', 'Repeat five times in a real conversation.'], time: 12, success: 'Ratio is one question for every reaction.' },
      { id: 'flirt-tease', title: 'One Tease, Then Warmth', why: 'Playfulness needs a floor to land on.', steps: ['Pick something harmless they said.', 'Tease it in under eight words.', 'Immediately follow with genuine interest.'], time: 10, success: 'They laugh and keep talking.' },
      { id: 'flirt-exit', title: 'The Warm Exit', why: 'Leaving well is the strongest signal available.', steps: ['Write your exit line — one sentence, no apology.', 'Include something you will remember about them.', 'Practise it on someone you are not interested in.'], time: 8, success: 'Your exit contains no "anyway" or "I should probably go".' },
      { id: 'flirt-text', title: 'The Message That Isn\'t a Test', why: 'Pressure is the most common reason for silence.', steps: ['Write a message referencing something they said.', 'No question marks needed, no summary of your day.', 'Send one and then put the phone down for an hour.'], time: 6, success: 'It gives them nothing to defend against.' },
    ],
    reads: ['lib-wm1', 'lib-wm2', 'lib-wm3', 'lib-hm4'],
    arena: ['alea', 'jonah'],
    gym: ['Dating'],
  },
  {
    id: 'negotiation',
    name: 'Negotiation',
    tone: 'cyan',
    tagline: 'Calm is the tactic.',
    principle: 'Every negotiation is two conversations: the one about the number, and the one about whether you are the sort of person who can be pushed.',
    principles: [
      'Ask for their number first. Whoever anchors first gives away information.',
      'Name the constraint, never the opponent.',
      'Silence after an offer is not rude; it is leverage.',
      'Trade, do not concede. Every give needs a get.',
      'Your best alternative is the only source of real calm.',
    ],
    scripts: [
      { them: 'What\'s your budget?', you: 'I\'d rather hear what the work is worth to you. What range are you working inside?' },
      { them: 'That\'s more than we expected.', you: 'That is understandable. If the number is fixed, which part of the scope should we cut?' },
      { them: 'Take it or leave it.', you: 'I hear that, and I appreciate the clarity. Let me check one thing before I answer.' },
    ],
    exercises: [
      { id: 'neg-batna', title: 'Write Your BATNA', why: 'Calm comes from knowing what happens if you walk.', steps: ['Name the deal on the table.', 'Write exactly what you will do if it fails.', 'Improve that alternative by one small step today.'], time: 15, success: 'Your walk-away plan is specific and survivable.' },
      { id: 'neg-anchor', title: 'The Deflection Rep', why: 'Whoever speaks first gives something away.', steps: ['Write the question you fear ("what\'s your rate?").', 'Write three ways to answer with a question.', 'Say each out loud and hold the pause after.'], time: 10, success: 'You can deflect without sounding evasive.' },
      { id: 'neg-silence', title: 'Ten-Second Hold', why: 'Most concessions happen in other people\'s silence.', steps: ['Set a timer for ten seconds.', 'Say a firm sentence, then stay quiet until it ends.', 'Repeat five times. It will feel awful. That is the training.'], time: 8, success: 'You complete the timer without filling it.' },
      { id: 'neg-trade', title: 'If–Then Trades', why: 'Concessions should be conditional, always.', steps: ['List three things you can give.', 'List three you want.', 'Write each trade as "If you…, then I…".'], time: 12, success: 'You never give without an if.' },
      { id: 'neg-name', title: 'Name the Constraint', why: 'Attacking a person escalates; naming a constraint invites help.', steps: ['Take a real frustration.', 'Rewrite it as a constraint, not a complaint.', 'Say it to whoever can help, and ask them a question after.'], time: 10, success: 'It contains no "you always" or "you never".' },
    ],
    reads: ['lib-mny3', 'lib-bz2', 'lib-dc4', 'lib-pr4'],
    arena: ['elena', 'marco'],
    gym: ['Professional'],
  },
  {
    id: 'presence',
    name: 'Presence & Small Talk',
    tone: 'mint',
    tagline: 'The first ninety seconds decide the rest.',
    principle: 'Presence is not charisma. It is being visibly interested in something other than your own performance.',
    principles: [
      'Ask for the story behind the answer, not a new topic.',
      'Two-thirds them, one-third you.',
      'React to the specific words. That is what being heard feels like.',
      'Silence is a contribution, not a failure.',
      'Leave before you are bored — the warm exit beats the slow fade.',
    ],
    scripts: [
      { them: 'I work in insurance.', you: 'Everyone says that like it\'s boring. What is the part of it that people would not guess?' },
      { them: 'Long day.', you: 'What made it long — the volume or one specific thing?' },
      { them: 'Anyway, I should let you go.', you: 'I should too — but I\'m glad the goat story happened. Find me next time.' },
    ],
    exercises: [
      { id: 'pres-fork', title: 'Fork Questions', why: 'Open questions stall; forks give somewhere to go.', steps: ['Write five "was it X or Y?" questions about ordinary things.', 'Use three in real conversation.', 'Notice which one produced a story.'], time: 12, success: 'At least one answer was longer than a sentence.' },
      { id: 'pres-react', title: 'React to the Words', why: 'Repeating their phrase is the cheapest proof of listening.', steps: ['In three conversations, quote one word back before replying.', 'No interpretation, just their word.', 'Ask a follow-up on it.'], time: 10, success: 'They say "exactly" or keep going unprompted.' },
      { id: 'pres-entry', title: 'The Three-Second Entry', why: 'Hovering is worse than interrupting.', steps: ['Approach a group you can leave.', 'Wait for a sentence to end, then speak within three seconds.', 'Open with an observation about the room, not yourself.'], time: 10, success: 'You joined without a lull.' },
      { id: 'pres-pause', title: 'Silence Tolerance', why: 'The person who breaks silence first gives up status.', steps: ['In one conversation, let a pause run three full seconds.', 'Look at them, do not fill.', 'Let them speak first.'], time: 8, success: 'You can count to three in your head while smiling.' },
      { id: 'pres-exit', title: 'One-Line Exit', why: 'Owning your exit makes you invited back.', steps: ['Write an exit that names the best moment.', 'No apology, no reason, no "anyway".', 'Use it once this week.'], time: 6, success: 'The exit is one sentence and it makes them smile.' },
    ],
    reads: ['lib-st1', 'lib-st2', 'lib-st3', 'lib-v1'],
    arena: ['maya', 'alea', 'group-three'],
    gym: ['Starting'],
  },
];

export const skillById = (id) => SKILL_TRACKS.find((s) => s.id === id) || null;
export const allSkillExercises = () => SKILL_TRACKS.flatMap((t) => t.exercises.map((e) => ({ ...e, track: t.id, trackName: t.name, tone: t.tone })));
