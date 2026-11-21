// ─────────────────────────────────────────────────────────────
//  Academy · six deep modules
//  Charismatic conversation · Humour · Tension & flirting ·
//  Everyday conversation · Body language · Human psychology
//
//  Each module: thesis, principles, mechanics (frameworks with
//  worked examples), scripts, drills, and honest cautions.
// ─────────────────────────────────────────────────────────────

export const ACADEMY = [
  // ══════════════════════════════════════════════════════════
  {
    id: 'charismatic-conversation',
    name: 'Charismatic Conversation',
    tone: 'violet',
    tagline: 'Charisma is not volume. It is the feeling of being the only person in the room.',
    thesis: 'Charisma is a transfer of attention, not a display of personality. People do not remember what you said; they remember how fully you seemed to be there, and whether they felt more interesting in your presence.',
    principles: [
      { title: 'Attention is the currency', body: 'Undivided attention is rare enough to feel like a gift. Phone away, body turned, no scanning the room over a shoulder. The person who is actually interested is remembered as fascinating — that is the great irony of social skill.' },
      { title: 'Warmth before competence', body: 'Competence persuades people to respect you; warmth persuades them to keep talking. Lead with warmth in the first minute and competence becomes credible. Reverse the order and competence reads as threat.' },
      { title: 'Specificity is proof', body: '"That was great" costs nothing. "The way you handled the second objection, by conceding the price point first — that was the whole thing" proves you were listening. Specific praise is the strongest social move available.' },
      { title: 'Status is a dial, not a rank', body: 'Lowering yourself slightly raises the room. Owning a small mistake early removes the need for anyone else to notice it. Raising your status should be a choice for a purpose, not a reflex.' },
      { title: 'Leave them slightly wanting', body: 'The warm exit beats the slow fade. Ending a good conversation on a high, by name, with a specific memory, is what makes the next one easy to arrange.' },
      { title: 'Emotional contagion is real', body: 'The room takes its temperature from whoever is most settled. Speak slower, breathe out, let silences exist, and the pace of the conversation becomes yours without any assertion at all.' },
    ],
    mechanics: [
      {
        name: 'The Three-Minute Arc',
        why: 'Charismatic conversations have a shape: an opening that gives them somewhere to go, a middle where you find the thread they care about, and an exit that leaves a reason to return.',
        steps: [
          '0:00–0:20 — Observation or fork question about the here and now.',
          '0:20–2:00 — Two follow-ups deep on one thread. React to their words before asking anything.',
          '2:00–2:40 — Add one thing of your own: a short story, an admission, a specific opinion.',
          '2:40–3:00 — Warm exit: name the best moment, then leave.',
        ],
        example: '"Is this as good as last year, or is that just me? … The catering. What was the thing you came for tonight? … No — say more about the mud, that is the most honest job description I have heard. … I spent three years doing the same but with spreadsheets. … I am going to find the person who invited me before I lose the nerve. You are the best conversation I have had tonight, and I will be annoyed if this is the last one."',
      },
      {
        name: 'The Charisma Loop',
        why: 'Interest generates disclosure, disclosure generates interest. Most people break the loop by monologuing or by interviewing.',
        steps: [
          'Notice something specific (not a compliment yet).',
          'Say it out loud, briefly.',
          'Ask a question that follows from it.',
          'React to the answer in a full sentence.',
          'Disclose something of similar weight.',
          'Return the question to them.',
        ],
        example: '"You are the only person here who looked relieved when the talk ended. Was that relief or revenge? … That is a better answer than the talk deserved. I have started leaving things when they are good rather than waiting for them to get bad. How do you decide?"',
      },
    ],
    scripts: [
      { them: 'So what do you do?', you: 'Depends on the day — I help teams stop losing deals in the paperwork. What does your week look like when paperwork goes wrong?', why: 'Answers the question and hands it back with a fork.' },
      { them: 'I am not really a people person.', you: 'Most people who say that are just exhausted by the wrong kind of people. What kind of people do you actually like?', why: 'Reframes a self-deprecating label instead of agreeing with it.' },
      { them: 'Anyway, I should let you go.', you: 'I should too — but I am glad the goat story happened. Find me before you leave.', why: 'Warm exit that makes the next contact easy.' },
      { them: 'You are very quiet.', you: 'I am. I have spent the last ten minutes deciding whether to say the thing I actually think. Here it is.', why: 'Turns a comment about you into a gift of honesty.' },
    ],
    cautions: [
      'Charisma without consent is pressure. If someone shortens their answers twice, let them go — gracefully.',
      'Do not use attention as technique. It is detectable, and the detection is fatal.',
      'Warmth is not agreement. You can hold a room and still say a clear no — charisma without boundaries becomes a performance that empties you out.',
    ],
    drills: [
      { title: 'Two-thirds ratio', time: 10, do: 'In one conversation, aim for two-thirds them talking to one-third you, without being silent.', success: 'They talk more than you and neither of you notices a pause.' },
      { title: 'Specific praise', time: 5, do: 'Give one compliment today that could only apply to that person.', success: 'It names a choice, not an attribute.' },
      { title: 'Warm exit', time: 3, do: 'End one conversation deliberately, naming the best moment.', success: 'You leave first, and it feels good.' },
      { title: 'The settled minute', time: 5, do: 'For the first minute of one conversation, speak 20% slower than you want to.', success: 'The other person slows down to match you.' },
    ],
    reads: ['lib-c3', 'lib-c4', 'lib-c5', 'lib-f2'],
  },

  // ══════════════════════════════════════════════════════════
  {
    id: 'humour',
    name: 'Developing Humour',
    tone: 'amber',
    tagline: 'Funny is mostly editing: timing, order, and the discipline to stop.',
    thesis: 'Humour is not a personality trait you either have or lack. It is a set of mechanical operations — surprise, compression, misdirection, recognition — applied to material you already have. Learn the operations and you can be reliably amusing without being a natural.',
    principles: [
      { title: 'The laugh lives at the end', body: 'Move the funniest word to the last possible position. Nothing may follow the punch word: no tag, no explanation, no little laugh of your own. Amateurs refund laughs with sentences after the joke.' },
      { title: 'Compression is the joke', body: 'Two sentences can almost always become one. Cut every clause that explains why you are joking; if the joke needed the explanation, it was not a joke, it was information.' },
      { title: 'Surprise is arithmetic', body: 'Humour is the gap between what the sentence promised and where it landed. The setup should create a strong expectation, and the punchline should be the wrong-but-inevitable answer.' },
      { title: 'You cannot invent under pressure', body: 'Nobody writes in real time. Prepare retrievable material: three self-deprecations, three flips for hostile jabs, three references you can pull from the current conversation. Fluency is retrieval.' },
      { title: 'Punch inward, never down', body: 'The most reliable target is yourself: your own choices, your own optimism, your own timing. Punching at someone in the room buys a laugh and spends trust. Aim at the pattern, not the person.' },
      { title: 'Dry beats loud', body: 'Deliver a joke flat and let the room do the work. Laughing at your own joke is the thing that most reliably prevents other people laughing at it.' },
    ],
    mechanics: [
      {
        name: 'The Three Operations',
        why: 'Every joke you will tell socially is one of these three, or two of them stacked.',
        steps: [
          'Reversal — set up a pattern, then break it: "I have a five-year plan. It is from three years ago."',
          'Escalation — take an ordinary thing one honest step too far: "There were two people. Then three. Then it was a queue. Then it was a meeting."',
          'Misattribution — treat an attack as praise: "You are intense." "I am. It is the only way I get anyone to finish a sentence."',
        ],
        example: 'Reversal: "I am not superstitious. But I am a little stitious." Escalation: "Diet starts Monday. Which Monday is a separate question." Misattribution: "That is an ambitious plan." "Thank you — ambition is the only thing keeping the plan from being fiction."',
      },
      {
        name: 'The Hook–Turn–Landing',
        why: 'Structured for spoken humour rather than written, where you cannot edit or re-read.',
        steps: [
          'Hook: a single sentence that sets the scene and contains one odd detail.',
          'Turn: the word "until" or "so" — the moment where expectations break.',
          'Landing: three to six words, final word carrying the image.',
          'Stop. Look at them. Let it sit. Say nothing.',
        ],
        example: '"My landlord said the flat had character. Until I found out character meant the door does not close. He was not wrong, but he was not honest either."',
      },
      {
        name: 'Callbacks & Shared Language',
        why: 'A callback is the only form of humour whose setup has already been paid for. It also creates belonging, which is worth more than the laugh.',
        steps: [
          'Somewhere early, use a specific, slightly odd detail.',
          'Twenty minutes later, refer to it in two or three words.',
          'Never explain it. Let recognition do the work.',
          'Late in the evening, reduce it to a single word or a look.',
        ],
        example: 'Earlier: "and that was when the goat got into the car." Later: "So at the wedding — no goats, ideally." Later still: "Watch the gate."',
      },
    ],
    scripts: [
      { them: 'Are you always this quiet?', you: 'Only while I am deciding whether the next thing I say is worth being remembered for. It usually is not.', why: 'Self-deprecating, flat, and it hands them a reason to keep talking to you.' },
      { them: 'You are late again.', you: 'I was up all night rehearsing a better excuse and this is the best I could do.', why: 'Confess to the flaw before it can be used, and admit the excuse is weak.' },
      { them: 'That is a strange thing to notice.', you: 'It is. I am keeping it — it was the most interesting thing in the room.', why: 'Warm ownership of an observation instead of retreating.' },
      { them: 'You clearly love the sound of your own voice.', you: 'I do. It is the only voice that agrees with me. And it is better than yours, which is the real problem.', why: 'Acknowledges the jab, escalates playfully, returns the ball.' },
    ],
    cautions: [
      'Never punch down at someone who has less power in the room, especially not twice.',
      'If a joke dies, do not rescue it. Ask a question immediately — the recovery attempt is the actual failure.',
      'Self-deprecation about something you are genuinely insecure about will read as pain, not humour. Choose flaws you are happy to own.',
    ],
    drills: [
      { title: 'Ten hooks', time: 8, do: 'For one idea, write ten first lines. Publish only the one that makes you slightly nervous.', success: 'One of them is uncomfortable to say out loud.' },
      { title: 'Compression pass', time: 6, do: 'Take three sentences you said today. Cut each to one and move the funniest word to the end.', success: 'At least one is shorter and funnier.' },
      { title: 'Flat delivery', time: 4, do: 'Deliver three lines with a completely flat face.', success: 'Somebody laughs at the third.' },
      { title: 'Callback drill', time: 10, do: 'In one conversation, reference something from earlier in under eight words.', success: 'They laugh before you finish.' },
    ],
    reads: ['lib-w1', 'lib-w2', 'lib-w3', 'lib-w5'],
  },

  // ══════════════════════════════════════════════════════════
  {
    id: 'tension-flirting',
    name: 'Tension & Flirting',
    tone: 'rose',
    tagline: 'Warmth, specificity, and a little friction — with an exit that costs them nothing.',
    thesis: 'Flirting is not a script or a set of lines. It is a specific quality of attention: noticing something real about a person, letting them see that you noticed, and offering it without attaching a price. Tension is created by warmth plus mild unpredictability, not by pressure.',
    principles: [
      { title: 'Consent is the architecture, not the disclaimer', body: 'Interest is expressed and observed, never extracted. Flirting works only when the other person is free to not reciprocate without cost — and when they signal they are not interested, that is the whole answer.' },
      { title: 'Specificity is the flirt', body: 'A precise compliment about a choice, a joke or a skill is attention made visible. A general compliment about looks is a transaction. "That was a good question" matters more than "you are beautiful".' },
      { title: 'Tension needs a second beat', body: 'The difference between friendly and flirtatious is often just a pause and eye contact held a beat longer than necessary, with nothing said. The silence does the work; talking fills it back in.' },
      { title: 'Tease once, then return to warmth', body: 'Playful friction is a seasoning. One tease, then immediate genuine interest — never stacked teases, and never a tease about something they cannot change.' },
      { title: 'Make the exit easy and you will be invited back', body: 'Leaving first, warmly, with a specific memory, is the single most attractive move available. Clinging reads as scarcity; a clean exit reads as choice.' },
      { title: 'Attraction is not persuasion', body: 'You cannot argue someone into desire and you should never try. State interest plainly, once, and accept the answer. Confidence is asking clearly and being fine either way.' },
    ],
    mechanics: [
      {
        name: 'The Notice–Name–Pause',
        why: 'The core of live flirting: show that you noticed something real, say it specifically, then let a beat exist.',
        steps: [
          'Notice a choice, a skill, or a small act of character.',
          'Name it in one sentence, no adjective stacking.',
          'Hold eye contact for one beat longer than usual.',
          'Let them respond. Do not fill the gap.',
        ],
        example: '"You gave up your seat twice and did not mention it either time. I noticed." [pause, eye contact] "I am going to remember that about you."',
      },
      {
        name: 'The Tension Ladder',
        why: 'Escalation should be small, reversible, and observant — never a leap.',
        steps: [
          'Openness: genuine interest, no flattery.',
          'Playfulness: one tease, immediately followed by warmth.',
          'Specificity: name something true that others would not have noticed.',
          'Disclosure: one honest thing about yourself of similar weight.',
          'Statement of interest: plain, once, with no pressure attached.',
        ],
        example: 'Openness: "You are the only person here who did not laugh at that." Playfulness: "Which either makes you kind or deaf." Warmth: "I am going with kind." Specificity: "You also noticed the thing everyone missed in the second half." Interest: "I would like to have this conversation again properly."',
      },
    ],
    scripts: [
      { them: 'I am not really a going-out person.', you: 'I respect that enormously. What is a good evening for you, then?', why: 'Affirms their preference and gets a real answer instead of a performance.' },
      { them: 'That is a weird thing to notice.', you: 'It is. I am keeping it — it was the most interesting thing in the room.', why: 'Owns the observation instead of apologising for it.' },
      { them: 'I have to go find my friends.', you: 'Of course. Find me before you leave, or I will assume the goat story won.', why: 'Easy exit, playful claim, no pressure to stay.' },
      { them: 'Are you flirting with me?', you: 'Badly, yes. Is that welcome or should I stop?', why: 'Direct, transparent, and hands them the decision.' },
      { them: 'I have a partner.', you: 'Then I am glad we had a good conversation. Take care of each other.', why: 'The only correct answer: gracious, brief, no negotiation.' },
    ],
    cautions: [
      'If someone does not reciprocate, that is a complete sentence. Do not repeat the approach or look for a loophole.',
      'Never use teasing to test insecurity, and never make someone the punchline in front of others.',
      'Do not treat the tension ladder as a technique to bypass consent. It is an invitation, not a lever.',
    ],
    drills: [
      { title: 'Specific compliment x3', time: 8, do: 'Three compliments today that name a choice or a skill. Then keep the conversation going.', success: 'Every one could only apply to that person.' },
      { title: 'The extra beat', time: 4, do: 'In one conversation, hold eye contact one beat longer during a pause — and say nothing.', success: 'You did not fill it.' },
      { title: 'One tease, then warmth', time: 5, do: 'Tease one harmless thing in under eight words, then follow with genuine interest immediately.', success: 'They laugh and keep talking.' },
      { title: 'Plain statement', time: 3, do: 'Write your statement of interest in one sentence with no qualifiers or jokes to hide behind.', success: 'It is under 15 words and you could say it out loud.' },
    ],
    reads: ['lib-c3', 'lib-w3', 'lib-f6', 'lib-c4'],
  },

  // ══════════════════════════════════════════════════════════
  {
    id: 'everyday',
    name: 'Everyday Conversation',
    tone: 'mint',
    tagline: 'The ninety seconds that decide the rest — and the exit that makes the next one easy.',
    thesis: 'Most people are not bad at conversation; they are bad at starts and ends. The middle takes care of itself once someone is talking about something they care about. Fix the entry and the exit and you fix the majority of awkwardness.',
    principles: [
      { title: 'Open with the room, not yourself', body: 'An observation about the shared situation is always available and never intrusive: the queue, the talk, the weather as a joke, the food. It gives the other person something to agree or disagree with, which is all an opener needs to do.' },
      { title: 'Fork questions beat open questions', body: '"How was it?" stalls. "Was it what you expected, or were you hoping for something more practical?" gives two places to land and reveals what they value.' },
      { title: 'React before you ask again', body: 'A question without a reaction feels like a form. One sentence about what they just said is what makes the next question feel like interest rather than process.' },
      { title: 'Go deeper, not wider', body: 'Four questions about one topic beats one question each about four topics. The second and third questions on the same thread are where people feel met.' },
      { title: 'Silence is a contribution', body: 'Three seconds of silence with a relaxed face is confidence. Filling it with a new topic tells the other person their last answer was not enough.' },
      { title: 'Exit while it is good', body: 'The warm exit is a skill: name the best moment, say what you will remember, and leave. Ending well is what makes people want the next conversation.' },
    ],
    mechanics: [
      {
        name: 'The Four-Move Opener',
        why: 'A repeatable entry that works at parties, conferences and lifts.',
        steps: [
          'Shared observation (one sentence, about the here and now).',
          'Fork question tied to it.',
          'Reaction to their answer, referring to their exact words.',
          'Follow-up that goes one level deeper.',
        ],
        example: '"Half the room left at the keynote. Did you stay because it was good, or because you were trapped at the front? … That is a much better reason than mine. What was the bit that got you?"',
      },
      {
        name: 'The Redirect Bridge',
        why: 'How to change a subject without it feeling like a subject change.',
        steps: [
          'Acknowledge their point in one short sentence.',
          'Bridge with "that reminds me of…" or "the same thing happens with…".',
          'Ask a question in the new topic that connects to the old one.',
        ],
        example: '"That thing about the client changing their mind — the same thing happens with hiring. Have you ever hired someone and known in ten minutes?"',
      },
      {
        name: 'The Two-Sentence Exit',
        why: 'Most conversations end by accident; this ends them by design.',
        steps: [
          'Signal the end before you move ("I am going to find the person who invited me").',
          'Name the best moment, specifically.',
          'Leave. Do not re-open with "oh, one more thing".',
        ],
        example: '"I am going to find the person who dragged me here. The mud story was the best thing I have heard all evening. Good luck with the sensors."',
      },
    ],
    scripts: [
      { them: 'I work in insurance.', you: 'Everyone says that like it is boring. What is the part people would never guess?', why: 'A fork for a person who has just flattened their own job.' },
      { them: 'Long day.', you: 'What made it long — the volume, or one specific thing?', why: 'Offers two doors instead of demanding a monologue.' },
      { them: 'Anyway, I should let you go.', you: 'I should too. This was the best conversation I have had in a while — thank you.', why: 'Warm, brief, no clinging.' },
      { them: 'I do not really do small talk.', you: 'Then let us skip it. What have you been thinking about lately that you have not had a reason to say out loud?', why: 'Takes them at their word and raises the stakes gently.' },
    ],
    cautions: [
      'Do not convert small talk into an interview. Three questions without a disclosure is an interrogation.',
      'If someone gives three short answers in a row, they are done. Let them out without awkwardness.',
      'Do not treat every daily exchange as training. The barista is not your reps — hit your drill in one conversation and let the rest of the day be ordinary.',
    ],
    drills: [
      { title: 'Three entries', time: 10, do: 'Open three real conversations with a shared observation plus a fork.', success: 'At least one continues past two minutes.' },
      { title: 'Quote back', time: 5, do: 'Repeat one of their exact words before replying, three times today.', success: 'They say "exactly" at least once.' },
      { title: 'Deeper, not wider', time: 8, do: 'Ask three follow-ups on one thread before changing topic.', success: 'They tell you something they did not plan to.' },
      { title: 'Deliberate exit', time: 4, do: 'End one conversation with the two-sentence exit.', success: 'You leave first and nobody feels dropped.' },
    ],
    reads: ['lib-f2', 'lib-c3', 'lib-c5', 'lib-f6'],
  },

  // ══════════════════════════════════════════════════════════
  {
    id: 'body-language',
    name: 'Body Language & Cues',
    tone: 'cyan',
    tagline: 'Read clusters, never single cues. Bodies leak, but they also lie.',
    thesis: 'Body language is not a codebook. A single gesture means almost nothing; a cluster of changes from a known baseline means a great deal. Read what changed, when it changed, and what it changed in response to. Everything else is astrology with a lab coat.',
    principles: [
      { title: 'Baseline first, deviation second', body: 'You cannot read behaviour without knowing how that person behaves when calm. Watch for the change: the sudden stillness, the crossed arms that were open a minute ago, the laugh that stops being real.' },
      { title: 'Change is the signal', body: 'A person who always folds their arms is not defensive. A person who unfolds to lean in, or folds after a question, has told you something about that question.' },
      { title: 'Clusters, not cues', body: 'Three signs of discomfort together — feet turned away, torso angled to the exit, answers shortening — mean more than any one of them. One is noise; three is a pattern.' },
      { title: 'Watch feet and hands, not faces', body: 'Faces are managed for observers. Feet point where someone wants to go; hands fidget when the mind is working or hiding. The lower body leaks more than the eyebrows.' },
      { title: 'Your body sets the temperature', body: 'Open shoulders, unforced slow breathing, hands visible and still. You cannot fake calm for long, but you can physically slow down, and the room will follow more than it admits.' },
      { title: 'Context beats interpretation', body: 'Arms crossed in a cold room means cold. Read the environment before reading the person — and never use cues to psychologise someone you have not spoken to.' },
    ],
    mechanics: [
      {
        name: 'The Baseline Read',
        why: 'A repeatable method that avoids the fortune-telling trap.',
        steps: [
          'Observe for 30 seconds of ordinary conversation: hands, feet, blink rate, smile speed.',
          'Note the topic in progress.',
          'Watch for a deviation when the topic changes.',
          'Test gently: change the subject and see whether the deviation reverses.',
        ],
        example: 'She is animated while talking about her team, then goes still when you mention the reorganisation. Ask: "Is the reorg a good thing or a polite disaster?" If the animation returns, the pause was about the topic, not you.',
      },
      {
        name: 'Comfort / Discomfort Tells',
        why: 'Practical clusters worth knowing, with their most common misreadings.',
        steps: [
          'Comfort: torso squared to you, feet toward you, hands visible, blink rate normal, spontaneous mirroring.',
          'Discomfort: feet toward the exit, torso angled away, hands behind or hidden, lip compression, sudden stillness, shortened answers.',
          'Warm-up: engagement, leaning in, eyebrow flash on greeting, genuine smile that reaches the eyes (orbicularis, not just mouth).',
          'Shutdown: closed eyes for a beat, chin down, single flat word answers, phone pickup.',
        ],
        example: 'They were leaning in, then leaned back and checked their phone mid-sentence. That is not a cue to be cleverer — it is a cue to finish gracefully.',
      },
      {
        name: 'The Confidence Configuration',
        why: 'What to do with your own body rather than worry about theirs.',
        steps: [
          'Feet planted, roughly hip width. Weight even.',
          'Shoulders down and back, not up and forward.',
          'Hands visible, empty, still or slowly expressive — never pockets, never hidden behind the back.',
          'Chin level, eye contact in the triangle, breaking away only to think.',
          'Breathe out longer than in, twice, before speaking.',
        ],
        example: 'Before a difficult conversation: stand still at the door for four seconds, exhale twice, then walk in and stop before speaking. You will look calm, and you will be measurably calmer.',
      },
    ],
    scripts: [
      { them: '[Says nothing, looks at the floor]', you: 'You do not have to answer that one. Shall I ask something easier?', why: 'Reads shutdown and removes pressure — the most likeable response available.' },
      { them: '[Checks phone mid-sentence]', you: 'I will let you get to that — good to see you. We should do this properly.', why: 'Treats the cue as a boundary rather than an insult.' },
      { them: '[Laughs a beat late, flat]', you: 'That was a polite laugh. What did you actually think?', why: 'Names the mismatch gently and gives them permission to be honest.' },
      { them: '[Steps back as you step in]', you: '[steps back, keeps distance] Anyway — what brought you here?', why: 'Restores their space without comment. Never mention it.' },
    ],
    cautions: [
      'Never tell someone you can read them. Being "read" feels invasive, and you are probably wrong.',
      'Many cues are medical, cultural or simply about temperature. Autism, anxiety, ADHD, chronic pain and fatigue all change body behaviour.',
      'Do not use cues as a substitute for asking. A question is always more reliable than an inference.',
    ],
    drills: [
      { title: 'Baseline, then ask', time: 15, do: 'Spend one conversation watching for changes only, then ask a question about the topic that produced the change.', success: 'Your guess is confirmed or disproved by their answer.' },
      { title: 'Feet and exits', time: 10, do: 'In three conversations, note which way feet point without looking down at them.', success: 'You predict who is about to leave.' },
      { title: 'Confidence configuration', time: 5, do: 'Practise the postural setup before one real conversation.', success: 'You do not correct your posture during it.' },
      { title: 'The four-second entry', time: 5, do: 'Before entering any room this week: stop, breathe out twice, then move.', success: 'Your first sentence is slower than usual.' },
    ],
    reads: ['lib-c5', 'lib-v6', 'lib-v5', 'lib-f2'],
  },

  // ══════════════════════════════════════════════════════════
  {
    id: 'psychology',
    name: 'Human Psychology',
    tone: 'violet',
    tagline: 'Why people do what they do — and the defence against people who know it.',
    thesis: 'Social psychology is descriptive before it is tactical. Attention, reciprocity, status, and consistency move people reliably. Knowing the mechanisms makes you a better communicator and a harder target: every leverage point below is also a lever someone else can pull on you.',
    principles: [
      { title: 'Attention is the bottleneck', body: 'People decide with what is available, not what is true. Whatever is most vivid, most recent and most repeated will decide. Make your point vivid and specific, or someone else\'s will be.' },
      { title: 'Reciprocity creates obligation', body: 'A small gift, a favour, an admission — all create a felt debt. Used generously it builds relationships. Used to manufacture compliance it is a trap: noticing the gift as a move dissolves the obligation.' },
      { title: 'Status is negotiated continuously', body: 'Every conversation has a status dance: who yields, who talks over whom, who apologises first. You can dial status deliberately — lower yourself to make someone comfortable, raise it to hold a boundary.' },
      { title: 'Consistency and identity drive action', body: 'People act in line with the identity they have just stated out loud. That is why "I am not the kind of person who…" works, and why commitments made in public are honoured more than private ones.' },
      { title: 'Loss aversion outranks gain', body: 'The fear of losing something matters roughly twice as much as the chance to gain it. Frame around what is at risk — honestly — and the point lands harder than any list of benefits.' },
      { title: 'Scarcity manufactures desire — and it is a trap', body: 'Time limits, exclusivity and "last one" raise value dramatically. Which is exactly why you should treat urgency in others as a warning sign, not a fact.' },
    ],
    mechanics: [
      {
        name: 'The Influence Stack',
        why: 'Six drivers: reciprocity, consistency, social proof, authority, liking, scarcity. Each has an honest use and a manipulative one.',
        steps: [
          'Reciprocity — give first, genuinely. Manipulative version: a gift engineered to create debt.',
          'Consistency — ask for a small public commitment, then build on it. Manipulative: the foot-in-the-door escalation.',
          'Social proof — show that similar people already do it. Manipulative: fake reviews and invented crowds.',
          'Authority — cite real, checkable expertise. Manipulative: the white coat with no credentials.',
          'Liking — find genuine common ground. Manipulative: mirroring and false rapport.',
          'Scarcity — state real constraints. Manipulative: manufactured urgency.',
        ],
        example: '"Three teams your size moved last quarter and all three said the same thing: the migration was easier than the meetings about it." That is social proof with specific numbers rather than an emotional appeal.',
      },
      {
        name: 'The Bias Defence',
        why: 'Protecting yourself is the other half of literacy. These are the four traps most common in conversation.',
        steps: [
          'Anchoring: the first number spoken distorts every later judgement. Before you counter, decide your number independently.',
          'Halo effect: fluency and attractiveness are read as competence. Separate the confident delivery from the argument.',
          'Sunk cost: past investment is not a reason to continue. Ask only what you would choose today.',
          'Confirmation: you will search for agreement. Before concluding, write the strongest opposing case yourself.',
        ],
        example: 'A recruiter says "our range is 40". Your research said 55. Write 55 down before the call, or 40 will become the reference point even though you know it is wrong.',
      },
      {
        name: 'The Status Trade',
        why: 'Deliberate status moves, with their costs.',
        steps: [
          'Raise: state a firm opinion, use fewer qualifiers, hold the pause, name a boundary.',
          'Lower: admit a flaw first, ask a question you cannot answer, laugh at yourself once.',
          'Trade: concede publicly to remove someone\'s need to fight, then state your condition.',
          'Never: raise status by attacking people who cannot respond.',
        ],
        example: '"I got that wrong — the deadline was mine to protect and I let it slip." Cost: one unit of status. Return: nobody else needs to say it, and you keep the room.',
      },
    ],
    scripts: [
      { them: 'Everyone agrees with me on this.', you: 'Then I should hear the strongest version. Who has argued against it best?', why: 'Tests social proof, invites evidence, and keeps you calm.' },
      { them: 'This offer expires today.', you: 'Then I will not decide today. If it is a good deal on Monday it is a good deal on Monday.', why: 'Defuses manufactured scarcity without hostility.' },
      { them: 'You owe me one.', you: 'I do, and I will pay it. What are we trading?', why: 'Honours reciprocity while converting a vague debt into a specific exchange.' },
      { them: 'You are being emotional about this.', you: 'I am. So let us separate the decision from the feeling — what would make it work for both of us?', why: 'Refuses the status attack without denying the feeling.' },
    ],
    cautions: [
      'Every technique in this module can be used to manipulate. The test: would the other person still agree if they could see the whole mechanism?',
      'Never use psychology to override a no, a boundary, or a consent decision.',
      'If you catch yourself treating a person as a system to optimise, stop and have the conversation instead.',
    ],
    drills: [
      { title: 'Spot the lever', time: 10, do: 'In one piece of advertising today, name which of the six drivers it uses.', success: 'You can identify the mechanism in one sentence.' },
      { title: 'Independent number', time: 5, do: 'Before a negotiation, write your number down privately, then compare after they anchor.', success: 'You do not move toward their first number.' },
      { title: 'Status trade', time: 5, do: 'Make one deliberate status-lowering move with a specific cost you are willing to carry.', success: 'It removes tension rather than costing respect.' },
      { title: 'Steelman test', time: 8, do: 'Write the strongest version of an opinion you dislike.', success: 'Someone who holds it would recognise it.' },
    ],
    reads: ['lib-g1', 'lib-g2', 'lib-g4', 'lib-c6'],
  },
];

export const academyById = (id) => ACADEMY.find((m) => m.id === id) || null;
