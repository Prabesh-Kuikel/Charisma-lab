// ─────────────────────────────────────────────────────────────
//  Academy · Second wing
//  Eight modules for the fields of life the first six did not
//  cover: small talk, talking to women, difficult conversations,
//  emotional depth, professional life, business, storytelling and
//  building social confidence from a low base.
//
//  Same shape as academy.js so the exact same view renders them.
// ─────────────────────────────────────────────────────────────

export const ACADEMY_EXTRA = [
  // ══════════════════════════════════════════════════════════
  {
    id: 'small-talk',
    name: 'Small Talk Mastery',
    tone: 'cyan',
    tagline: 'Small talk is not small. It is the door every real conversation comes through.',
    thesis: 'Small talk fails when it is treated as an interview or a performance. It succeeds when it is treated as a joint search for something worth talking about — two people looking at the same thing and finding which part has heat in it.',
    principles: [
      { title: 'Shared reality first', body: 'The safest opening is a comment on something you are both already experiencing: the queue, the weather, the venue, the dog, the music. It cannot be wrong, because you both agree on it. Cleverness is a distant third on the list of things an opener needs.' },
      { title: 'Ask for forks, not facts', body: 'Questions with one exit produce one-word answers. "What made you choose it — or did it choose you?" gives two doors. The word "or" is the whole mechanism: it says you are interested in the person, not the data.' },
      { title: 'Two questions, one disclosure', body: 'Question, question, question is an interrogation; answer, answer, answer is a monologue. After two of their answers, give something small and honest of your own. Reciprocity of disclosure is what turns strangers into acquaintances.' },
      { title: 'Follow heat, not topics', body: 'Every answer contains one word with energy in it: a complaint, a change of pace, an unexpected detail. Go three levels deep on that word instead of jumping to a new subject. Depth reads as interest; breadth reads as a checklist.' },
      { title: 'Silence is a room, not a verdict', body: 'A two-second pause feels like accusation and is actually an invitation. Wait through it and you will notice people say the honest thing in the half-second after you would have interrupted. Fill it and you train the conversation to stay shallow.' },
      { title: 'Exit on the high point', body: 'Conversations are remembered by their last beat. Leave while it is still good, name the reason generously, and leave one thread hanging so there is a reason to speak again. The warm exit beats the slow fade every time.' },
    ],
    mechanics: [
      {
        name: 'The Fork',
        why: 'Converts every dead-end answer into two possible directions, so a stalled conversation restarts itself without a new topic.',
        steps: [
          'Take their last answer and find the two doors: the work door (what, how) and the person door (why, how did you get here).',
          'Join them with "or" so both are genuinely available: "What kind of work — the technical side, or the people side?"',
          'Whichever they pick, ask one follow-up on that door before you change anything.',
          'Give something back within two questions so it does not become an interview.',
        ],
        example: 'Them: "I am a teacher." → "Primary or secondary?" → "Secondary — the ones with opinions. What is the thing you wish parents understood?"',
      },
      {
        name: 'The Three-Minute Small Talk Arc',
        why: 'Gives a shape to a conversation with no purpose, so it does not simply run out.',
        steps: [
          'Open on shared reality: one observation about the situation you are both in.',
          'Find the fork: two questions that locate what they actually care about.',
          'Go three levels into that one thing rather than finding a new thing.',
          'Close warmly with a named exit and a hanging thread.',
        ],
        example: '"This queue is moving like it is being paid by the hour." → "What are you here for that is worth twenty minutes?" → three levels on that → "I am going to let you go before I talk your ear off — good luck with it."',
      },
      {
        name: 'The Rescue Sequence',
        why: 'For when the conversation dies in front of you and you have nothing prepared.',
        steps: [
          'Say nothing for two seconds. Do not apologise for the silence and do not laugh nervously.',
          'Return to the last concrete noun they used: "You mentioned the move — was that recent?"',
          'If there is genuinely nothing, name the situation lightly: "This is the point where I ask you what you do and we both try to sound interested."',
          'Then take your exit early and warmly. A short good conversation beats a long dying one.',
        ],
        example: 'Silence → "You mentioned your sister was a nurse too — is she the one who told you about this place?"',
      },
    ],
    scripts: [
      { them: 'Them: "Not much, just work."', you: 'What kind of work — the part you would keep if you could, or the part that pays?', why: 'Fork with two honest doors. "Not much" gets a way out of it.' },
      { them: 'Them: "I do not really do small talk."', you: 'Then let us skip it. What have you been thinking about lately that you have not had a reason to say out loud?', why: 'Takes them at their word and raises the stakes gently.' },
      { them: 'Them: "Anyway, I should let you go."', you: 'I should too. This was the best conversation I have had in a while — thank you.', why: 'Warm exit, brief, no clinging, and a specific compliment.' },
      { them: 'Them: [silence after your question]', you: '[Wait two seconds.] Take your time — I am not going anywhere.', why: 'Makes the pause safe, which is usually enough to fill it.' },
      { them: 'Them: "So what do you do?"', you: 'Something boring enough that I apologise in advance. What I actually care about is teaching people to talk to strangers without wanting to die. What about you?', why: 'Answers briefly, redirects to something with heat, hands it back.' },
    ],
    cautions: [
      'Questions are not the goal. Three questions in a row without offering anything back is an interview, and people end interviews politely at the first opportunity.',
      'Do not use small talk as a tax you pay before the interesting part. If you are visibly waiting for the real conversation, the other person can feel the impatience and will not give you the real conversation.',
      'Read the third short answer as a no. When someone gives you three minimal replies in a row, they are done — let them out warmly rather than looking for a cleverer question.',
    ],
    drills: [
      { title: 'Three observations', time: 10, do: 'Start three conversations today with a comment on the shared situation only — no question attached. Anywhere: shop, lift, class.', success: 'You said the sentence out loud three times, and at least one person added a detail back.' },
      { title: 'Split every answer', time: 8, do: 'In one conversation, turn every flat answer into a fork using "or". Count how many forks you asked.', success: 'You asked at least three forks and one of them produced a longer answer.' },
      { title: 'Hold the pause', time: 5, do: 'In three conversations, wait two full seconds after they finish before responding. Do not fill it.', success: 'You held all three pauses and something more honest arrived in at least one of them.' },
      { title: 'Exit early', time: 5, do: 'Leave one conversation at the high point rather than the natural death, using the three-part exit: name it, generous reason, hanging thread.', success: 'You left while it was still going well and felt mildly uncomfortable doing it.' },
    ],
    reads: ['lib-st1', 'lib-st2', 'lib-st3', 'lib-st4'],
  },

  // ══════════════════════════════════════════════════════════
  {
    id: 'talking-to-women',
    name: 'Talking to Women',
    tone: 'rose',
    tagline: 'Not a technique. A way of being calm, specific and safe enough to be chosen.',
    thesis: 'Men who find this difficult are usually not short of courage or interest — they are short of calibration, and they have built an enormous frame around a perfectly ordinary act. The fix is to make the approach ordinary, make the attention specific, climb interest one rung at a time, and treat a no as information rather than a verdict.',
    principles: [
      { title: 'You are finding out, not auditioning', body: 'The frame that makes this bearable is also the honest one: you are not asking her to like you, you are finding out whether you enjoy each other. That flips the direction of evaluation and removes the fear of being judged, because you are judging too.' },
      { title: 'Boring beats brave', body: 'Approaches that work are conspicuously ordinary: a comment on the situation, a sincere question, an offer of help. They ask her to do nothing except respond naturally. Exciting approaches require her to manage your ego as well as the conversation — which is precisely the cost she is trying to avoid.' },
      { title: 'Specific praise proves attention', body: 'Women receive constant commentary on appearance and very little observation of their choices. "You were the only one who laughed at that" is evidence that only someone paying attention could produce. One sincere specific compliment per conversation, never as a down-payment on a request.' },
      { title: 'Interest costs something', body: 'Friendliness is the default setting of a polite person at work. Interest is what she spends: asking back, adding detail you did not request, keeping the thread alive, staying when she could leave. Look for investment and verify with one low-cost invitation.' },
      { title: 'Climb one rung, check the nod', body: 'Warmth, curiosity, play, personal, invitation — one rung at a time, checking reciprocation between each. Two unanswered rungs means stop climbing. This is not a trick for avoiding consequences; it is what an ongoing, mutual yes actually looks like in a conversation.' },
      { title: 'A no is data, and your reaction is character', body: 'Most approaches lead nowhere, because most people do not match, regardless of your skill. How you receive a refusal is what she remembers and what anyone watching remembers. "No problem at all, enjoy your evening" costs nothing and marks you as safe.' },
    ],
    mechanics: [
      {
        name: 'The Escalation Ladder',
        why: 'Gives you a way to move with romantic intent without ever making the other person carry the whole risk of stopping you.',
        steps: [
          'Warmth: an ordinary friendly exchange, no intent signalled.',
          'Curiosity: one real question about something she cares about.',
          'Play: a gentle tease or a callback, never about her body or her worth.',
          'Personal: a question that costs something to answer. Invitation: one specific, refusable, low-cost ask.',
          'Between every rung, check for reciprocation. If it is not there, hold. Two unmatched rungs means the ladder ends here.',
        ],
        example: 'Warmth → "is the coffee worth this queue?" | Curiosity → "what are you actually trying to get done this year?" | Play → "so you are a manual-reader, and I am a complain-about-the-manual person" | Invitation → "I am here again Thursday — come and tell me if it worked."',
      },
      {
        name: 'The Investment Read',
        why: 'Stops you mistaking professional politeness for attraction, which is the most common and most costly misread in this whole area.',
        steps: [
          'Discount anything that is part of her job: smiling, nodding, thanking, serving.',
          'Look for what cost her something: a question back, unrequested detail, longer answers, re-initiating, returning a tease, staying when she could leave.',
          'Require a pattern of three, not a single signal. One long answer is a chatty day.',
          'Verify with one low-cost invitation. A warm yes is a yes; anything else is a no with no next move.',
        ],
        example: 'She asks "and what do you do?" then adds "my sister does that and complains constantly" — two investments. Next rung is play; the rung after that is an invitation.',
      },
      {
        name: 'The Graceful Recovery',
        why: 'The moment a conversation stops being welcome, the only move that matters is the one that ends it well.',
        steps: [
          'Read the stop signals: shortened answers, body angled away, one-word replies, checking the phone.',
          'Say the warm close immediately: "No problem at all — enjoy your evening."',
          'Step back and turn away at an angle. Do not hover, do not linger, do not keep talking while retreating.',
          'Say nothing about it afterwards, to her or to anyone else. That silence is the whole test.',
        ],
        example: 'She gives two flat answers → "Anyway, I will let you get on. Have a good one." → step back, return to your own business, no comment to your friends.',
      },
    ],
    scripts: [
      { them: 'Them: [she is reading in a cafe]', you: 'Excuse me — I have been trying to work out what that book is. Is it worth the first fifty pages?', why: 'Ordinary, situational, easy to answer, easy to end.' },
      { them: 'Them: "You are not really my type."', you: 'That is completely fair. Have a good evening.', why: 'No negotiation, no sting, no lingering. This is the response that gets you a reputation worth having.' },
      { them: 'Them: "How old are you, actually?"', you: 'Old enough to ask a boring question in a cafe, apparently. What made you wonder?', why: 'Play without defensiveness — light, confident, hands it back.' },
      { them: 'Them: "I have a boyfriend."', you: 'No problem at all. He is lucky — enjoy your evening.', why: 'Take it at face value, immediately, without visible disappointment. Anything else is pressure.' },
      { them: 'Them: [she replies in one word, twice]', you: 'I will let you get on. It was nice to meet you.', why: 'Two flat answers is a stop. The graceful exit is the skill being demonstrated.' },
    ],
    cautions: [
      'Consent is not a technique to be optimised. If someone has to manoeuvre away from you, block a doorway, or repeat themselves, you are not flirting — you are pressuring, and no outcome justifies it.',
      'Never read a service worker, bartender, colleague or staff member as a romantic target: they cannot leave, and their friendliness is part of the job. That asymmetry is on you to notice.',
      'Do not treat refusal as a puzzle to solve with better technique. If refusal makes you angry, sarcastic, or eager to narrate it to friends, the problem is not your opener.',
    ],
    drills: [
      { title: 'Three ordinary openers', time: 15, do: 'Start three conversations today with no romantic intent at all — a barista, a stranger in a queue, someone in a bookshop. Goal: hear your own opening sentence without a racing heart.', success: 'Three sentences said out loud, one exchange each, no attempt to continue.' },
      { title: 'Compliment a choice', time: 10, do: 'Give three specific compliments today that are about a decision, not a feature — to anyone.', success: 'All three were specific enough that the person could not recycle the sentence for someone else.' },
      { title: 'Map the ladder', time: 15, do: 'In one conversation with romantic potential, deliberately climb one rung and check for reciprocation. Then write down where the reciprocation stopped.', success: 'You can name the exact rung you reached and the signal that told you to stop or continue.' },
      { title: 'Practise the no', time: 10, do: 'Ask for one thing with a real chance of refusal — a discount, a spare seat, a favour. Receive it warmly and leave.', success: 'You heard a no, said "no problem at all", and felt no urge to explain yourself.' },
    ],
    reads: ['lib-wm1', 'lib-wm2', 'lib-wm3', 'lib-wm5'],
  },

  // ══════════════════════════════════════════════════════════
  {
    id: 'difficult-conversations',
    name: 'Difficult Conversations',
    tone: 'amber',
    tagline: 'The conversation you are avoiding is costing more than the conversation would.',
    thesis: 'Difficult conversations go wrong at the opening. A blame story forces the other person to defend before they can listen, and after that nothing you say is heard. Start from the third story, state impact without a verdict, make one concrete request, and give the other person a face-saving path — and most of these conversations turn out to be ordinary.',
    principles: [
      { title: 'Avoidance is not free', body: 'Every difficult conversation you delay is paid for daily in small resentment, lost sleep, and behaviour that leaks. The conversation costs twenty minutes; the avoidance costs months. Do the arithmetic and the choice stops being close.' },
      { title: 'Start from the third story', body: 'Open with the version a neutral observer could tell, where neither person is the problem: "we want different things from this and we are both frustrated". Once the disagreement is on the table rather than in one person\'s chest, listening becomes possible.' },
      { title: 'Own your part first', body: 'Naming your own contribution before anyone accuses you removes the need for the other person to establish it. "I have been avoiding this, and the silence has probably read as sulking" disarms more effectively than any defence.' },
      { title: 'Separate impact from intent', body: 'What they meant is nearly always innocent and nearly always irrelevant. State the impact: what it cost you, concretely. Arguing about intent is how these conversations become about who is a good person instead of what will change.' },
      { title: 'One concrete request', body: 'Conversations end emotionally and change nothing when there is no ask. "I need a heads-up by Thursday — can you do that?" is checkable. "I need you to respect my time" sounds stronger and means nothing in practice.' },
      { title: 'Leave them a face-saving exit', body: 'People defend their dignity when they feel cornered, even when they agree with you. Give them a version of compliance that does not require an admission of fault and you will get the behaviour change without the war.' },
    ],
    mechanics: [
      {
        name: 'The Third Story Opening',
        why: 'Removes the need to defend so that the content can actually be heard.',
        steps: [
          'Write down the story you want to tell. Find every word in it that assigns blame.',
          'Rewrite it as an outsider would: what two reasonable people are each trying to achieve.',
          'Open with that version, then name your own contribution before asking for anything.',
          'Ask what a good outcome looks like for them, and do not rebut it while they answer.',
        ],
        example: '"I think we want different things from this project and we are each getting frustrated. I have been avoiding it, which has not helped. Can we look at it together?"',
      },
      {
        name: 'Observation · Impact · Request',
        why: 'States a boundary without a verdict on anyone\'s character, so it can be acted on rather than argued with.',
        steps: [
          'Observation: what a camera would record. No "always", no "never", no interpretation.',
          'Impact: what it cost you, personally and concretely.',
          'Request: one doable thing, phrased so it can be refused.',
          'If refused, name the consequence you will actually apply — not a threat you will not enforce.',
        ],
        example: '"When the report came in Monday rather than Thursday, I had to apologise to the client over the weekend. Going forward I need a heads-up by Thursday — can you do that?"',
      },
      {
        name: 'The Complete Apology',
        why: 'Repairs the relationship rather than merely ending your own discomfort.',
        steps: [
          'Name specifically what you did, with no softening.',
          'Own the effect on them — not what you intended.',
          'Repair anything repairable, including public corrections.',
          'State the behaviour that will change, then stop. Do not ask for reassurance.',
        ],
        example: '"I called your work sloppy in front of the team. That embarrassed you in front of people whose opinion matters. I have told them it was mine to raise privately, and I will bring the next one to you first."',
      },
    ],
    scripts: [
      { them: 'Them: "You are overreacting."', you: 'Maybe. I am still telling you what it was like from where I was standing, and I would like you to hear it before we argue about whether it was fair.', why: 'Refuses the fight about your feelings without conceding the content.' },
      { them: 'Them: "I did not mean it like that."', you: 'I believe you. It still landed how it landed, and that is the part I need us to sort out.', why: 'Separates intent from impact without dismissing either.' },
      { them: 'Them: "Fine, whatever you want."', you: 'That is not what I want — I want a plan we both actually think works. What would make this workable for you?', why: 'Refuses the false peace that guarantees the conversation repeats.' },
      { them: 'Them: "Why did you not say this sooner?"', you: 'Fair question. I avoided it because I did not want this exact conversation — that was my mistake, and I am here now.', why: 'Owns the delay instead of defending it.' },
      { them: 'Them: "I am sorry, alright?"', you: 'Thank you. I am not looking for an apology, I am looking for the Thursday heads-up going forward. Can you do that?', why: 'Converts an emotional exit into a checkable commitment.' },
    ],
    cautions: [
      'Do not start a difficult conversation to win one. If you need an admission of fault more than a change in behaviour, you will get neither, and the relationship will be worse than before.',
      'Never have it by text when it changes anything real. Text flattens tone, rewards escalation, and creates a record that both of you will reread in a worse mood than you wrote it.',
      'Timing is a real variable. Cornering someone in public, at the end of a long day, or in the first minute of a meeting is how a solvable problem becomes an incident. Ask for a time and say what it is about.',
    ],
    drills: [
      { title: 'Write the third story', time: 15, do: 'Take one current irritation. Write the blaming version, then rewrite it as a neutral observer would. Cut every word that assigns fault.', success: 'The neutral version contains no accusation and is still accurate.' },
      { title: 'Observation, impact, request', time: 12, do: 'Write one recurring irritation in exactly three sentences. Read it aloud and remove every "always" and every verdict.', success: 'Three sentences, one doable request, zero character claims.' },
      { title: 'Name your contribution', time: 10, do: 'In one live conversation this week, state your own part in a problem before anyone names it for you.', success: 'You said your part first, and the other person\'s defensiveness visibly dropped.' },
      { title: 'The complete apology', time: 15, do: 'Write one outstanding apology in four sentences: name it, own the effect, repair, change. Remove every "but", "if", and explanation of intent. Deliver it.', success: 'You said it with no request for reassurance attached.' },
    ],
    reads: ['lib-dc1', 'lib-dc2', 'lib-dc3', 'lib-dc4'],
  },

  // ══════════════════════════════════════════════════════════
  {
    id: 'emotional-depth',
    name: 'Emotional Depth',
    tone: 'violet',
    tagline: 'Company is easy. Being the person people tell the true thing to is rare.',
    thesis: 'Depth is not a personality trait and not a set of dramatic questions. It is a set of small disciplines: matching disclosure one rung at a time, hearing feelings before solving problems, asking questions that cost something, and staying in the room when it gets uncomfortable.',
    principles: [
      { title: 'Match, then one rung deeper', body: 'Disclosure is reciprocal. Over-disclosure feels like intimacy to you and like an obligation to them. Under-disclosure feels like coldness. Move one small step past where they stopped — never five.' },
      { title: 'Feel, fact, then fix', body: 'Name the feeling, show the fact is registered, and only then ask permission to solve. Most upset people are not stuck on the problem; they are stuck on feeling alone with it.' },
      { title: 'Real questions cost something', body: 'Surface questions have correct answers and change nothing. "What were you afraid would happen?" cannot be answered by reflex. Cost is the mechanism: it proves you are not afraid of the answer, which is what makes a room honest.' },
      { title: 'Name the unspoken thing', body: 'Awkwardness is usually a known thing nobody will say. One low-temperature sentence — "I think we are both being a bit careful" — gives both people permission to stop performing.' },
      { title: 'Presence beats commentary', body: 'In grief and crisis, explanations are for your discomfort. "I do not know what to say. I am here and I am not going anywhere" is more useful than anything invented to fill the silence.' },
      { title: 'Depth has a cost you must be willing to pay', body: 'If someone tells you something real, you now hold it. Depth without discretion is not intimacy, it is extraction. The room stays safe only if what is said in it stays in it.' },
    ],
    mechanics: [
      {
        name: 'The Depth Ladder',
        why: 'Lets a conversation get real without either person having to feel exposed or burdened.',
        steps: [
          'Ordinary ground first: what they do, what they are dealing with, in their words.',
          'One rung past their last answer: a question about that thing, not a confession of yours.',
          'When they move first, match them and add ten percent — your own equivalent experience.',
          'Watch for the step-back signals: a summary sentence, formality, a subject change. If one appears, go down a rung warmly with no apology.',
        ],
        example: '"Work has been heavy" → "what is the heaviest part?" → they disclose → "I recognise that — last year I was telling everyone it was fine, and it was lonely in a way I did not expect."',
      },
      {
        name: 'Feel · Fact · Fix',
        why: 'The order that makes someone feel understood rather than handled.',
        steps: [
          'Name the feeling in one word, no advice attached: "that sounds exhausting."',
          'Prove you registered the facts: summarise the situation in one sentence.',
          'Ask permission: "do you want ideas, or do you just want to be heard?"',
          'If they want to be heard, say you are not going to solve it, and then do not solve it.',
        ],
        example: '"That sounds exhausting. So you were covering both jobs for a month and nobody noticed. Do you want ideas, or do you just want to be heard?"',
      },
      {
        name: 'The Question That Costs',
        why: 'Takes a conversation below the facts without requiring anyone to perform.',
        steps: [
          'Ask about something they care about, not something they carry — with new people, start small.',
          'Ask one question and then stop. Do not stack three.',
          'After they answer, wait two seconds, then use "say more about that" rather than a new question.',
          'Treat a short, deflecting answer as a signal to go back up a rung, not as a failure.',
        ],
        example: '"What is the thing you care about that nobody asks you about?" … "Say more about that."',
      },
    ],
    scripts: [
      { them: 'Them: "I am fine, honestly."', you: 'You might be. You also might be saying that because it is easier. Either way, I am here if it changes.', why: 'Leaves the door open without demanding an answer.' },
      { them: 'Them: [tells you something painful]', you: 'I do not know what to say. I am glad you told me, and I am not going anywhere.', why: 'Honest presence instead of a repair attempt.' },
      { them: 'Them: "You would not understand."', you: 'Probably not exactly. Tell me the part you think I would get wrong and I will listen before I say anything.', why: 'Accepts the objection and asks for the thing that would change it.' },
      { them: 'Them: "Sorry, I am rambling."', you: 'You are not. This is the most interesting part of my week.', why: 'Removes the shame that makes people stop being honest.' },
      { them: 'Them: [goes quiet after a deep answer]', you: '[Wait. Do not fill it.] That sounds like it is still sitting with you.', why: 'Two seconds of silence, then a low-demand observation.' },
    ],
    cautions: [
      'Never use depth questions instrumentally — to make someone feel close to you for a purpose. That is extraction, and people find out eventually, usually from the way you treat what they told you.',
      'What is said in a deep conversation stays there. If you repeat it, you have not been given intimacy, you have borrowed it.',
      'Do not force depth on someone who is not ready. Two deflecting answers in a row means the moment is not there, and pushing turns a warm conversation into an interrogation with feelings.',
    ],
    drills: [
      { title: 'One rung deeper', time: 10, do: 'Respond to one disclosure today with a question one step past it, not a confession and not advice.', success: 'They answered the question and the conversation got more specific rather than broader.' },
      { title: 'Feel, fact, fix', time: 10, do: 'In three conversations where someone reports a difficulty, respond with a feeling word and no advice. Ask permission before any solution.', success: 'You offered zero unsolicited solutions across all three.' },
      { title: 'Ask one that costs', time: 15, do: 'Ask one real question of someone you already know — someone who would notice you listening.', success: 'You asked, they answered, and you followed up with "say more about that" instead of a new question.' },
      { title: 'Sit with it', time: 5, do: 'When someone says something sad, say nothing for two full minutes rather than filling the space with comfort.', success: 'You held the silence and did not offer a silver lining.' },
    ],
    reads: ['lib-ei1', 'lib-ei2', 'lib-ei3', 'lib-ei5'],
  },

  // ══════════════════════════════════════════════════════════
  {
    id: 'professional',
    name: 'Professional Communication',
    tone: 'mint',
    tagline: 'The work is the work. Being heard is a separate skill, and it is learnable.',
    thesis: 'Professional communication is judged on structure, brevity and reliability, not on brilliance. Claim the floor in one sentence, bring decisions rather than problems, trade scope instead of absorbing it, and answer with sequences. These are small, repeatable behaviours, and they compound into a reputation faster than any single impressive performance.',
    principles: [
      { title: 'Contribute small and often', body: 'One structured sentence per meeting builds more reputation than one long monologue per quarter. Frequency with brevity reads as judgement; length reads as a need to be heard.' },
      { title: 'Bring a decision, not a problem', body: 'Managers drown in problems. Someone who arrives with two options, a recommendation and an ownership question is seen as senior long before the title says so.' },
      { title: 'Structure is credibility', body: 'PREP for answers, SOAR for interviews, options-and-recommendation for escalations. Listeners cannot judge your intelligence, only your sequence, and the sequence is trainable.' },
      { title: 'Trade scope, not health', body: 'Deadline pressure should cost the project something, not you. "Thursday with no QA, or Monday with it — which matters more?" is a senior answer. "I will manage" is a promise you cannot keep.' },
      { title: 'Reliability beats brilliance', body: 'The person who says what they will do, does it at the stated quality, and flags problems early will always out-earn the brilliant person who surprises people. Predictability is the rarest professional virtue.' },
      { title: 'Write the message you would want to receive', body: 'Short, one ask, the decision at the top. Paragraphs of context before the question get skimmed; the question in the first line gets answered.' },
    ],
    mechanics: [
      {
        name: 'The Upward One-Liner',
        why: 'Converts "I have a problem" into visible judgement in under fifteen seconds.',
        steps: [
          'Signal the structure: "Two options on the client thing."',
          'State both honestly, including the trade-off each carries.',
          'Give one recommendation with a reason.',
          'Ask an ownership question, not a permission request: "do you want me to run it, or be in the room?"',
        ],
        example: '"Two options. A: we absorb the cost and keep the date. B: we renegotiate the date and keep the margin. I recommend B — the date was our error, the margin was not. Do you want me to run it?"',
      },
      {
        name: 'The SOAR Answer',
        why: 'Interview answers are judged on sequence; this is the sequence that lands under pressure.',
        steps: [
          'One line of situation and obstacle — the obstacle is the part that shows there was something to overcome.',
          'Two lines of action, including why you chose it.',
          'One line of measured result, with a number or a comparison.',
          'Stop. Six sentences total; let them ask the follow-ups.',
        ],
        example: '"Eight weeks from launch, the vendor pulled out. I re-sequenced so client work kept its date and internal tooling slipped, and I told the client the honest numbers before they asked. We shipped eleven days late, 4% under budget, and the contract renewed."',
      },
      {
        name: 'The Deadline Trade',
        why: 'Prevents you quietly absorbing the impossible part in your own evenings.',
        steps: [
          'Name the constraint the moment the deadline is set, not on the morning it is due.',
          'Offer the two real configurations: fast-and-thin, or slower-and-complete.',
          'Make them choose, and write the choice down.',
          'For scope creep, use the same sentence: "I can add that, and something else moves. Which one?"',
        ],
        example: '"I can do Thursday if the QA pass goes, or Monday with it. Which matters more to you?"',
      },
    ],
    scripts: [
      { them: 'Them: "Can you also just…?"', you: 'I can — and something else moves. Which of the two would you rather protect?', why: 'Refuses the invisible cost without refusing the work.' },
      { them: 'Them: [asks a question you do not know in a meeting]', you: 'I do not know yet. I will have an answer by this afternoon — is that soon enough?', why: 'Confidence is owning the gap and naming the time you will close it.' },
      { them: 'Them: "This is urgent."', you: 'Understood. What is it more urgent than? I am on the Thursday client piece and I want to get the trade right.', why: 'Converts an emotional label into a priority decision.' },
      { them: 'Them: "We need you to own this."', you: 'Happy to. To do it properly I need the two hours a week that currently go to the reporting — can we move that?', why: 'Accepts ownership and names the resource cost in the same breath.' },
      { them: 'Them: "Why did this slip?"', you: 'The vendor dropped out on the 12th, we re-sequenced on the 13th, and I told the client the next morning. Here is what I would change next time.', why: 'Sequence, ownership, and a forward-looking fix in three sentences.' },
    ],
    cautions: [
      'Never inflate a status to protect a deadline. One surprise costs more trust than a hundred honest delays, and people remember the surprise for years.',
      'Do not confuse volume with value. The person who speaks in every meeting is not the most respected; they are the most tolerated.',
      'Do not negotiate your capacity in public. If you need to renegotiate scope, do it privately first; a public refusal reads as a challenge and makes the manager defensive.',
    ],
    drills: [
      { title: 'One intervention', time: 5, do: 'In your next meeting, use "one thing before we move on" and "that is all from me" exactly once.', success: 'You spoke once, briefly, and handed the floor back deliberately.' },
      { title: 'Options and a recommendation', time: 10, do: 'Take a live problem and write it as two options, a recommendation and an ownership question before you message anyone.', success: 'You sent it in that shape, and you had a preference expressed out loud.' },
      { title: 'SOAR rehearsal', time: 20, do: 'Write five SOAR answers for a role you would actually want. Read each aloud under 70 seconds.', success: 'Every answer has a number in the result and an obstacle before the action.' },
      { title: 'Name the trade', time: 5, do: 'Next time you are given a deadline, name one thing that would have to move — in the same conversation.', success: 'You said it before the work, not after the slippage.' },
    ],
    reads: ['lib-pr1', 'lib-pr2', 'lib-pr3', 'lib-pr4'],
  },

  // ══════════════════════════════════════════════════════════
  {
    id: 'business',
    name: 'Business & Sales Talk',
    tone: 'orange',
    tagline: 'Nobody buys a pitch. They buy the removal of a cost they have just said out loud.',
    thesis: 'Business conversation is diagnosis before prescription. Ask what is annoying and what it costs, let the buyer count their own problem, then price without flinching. Credibility comes from volunteered limitations, and every objection is a fear that should be agreed with before it is reframed.',
    principles: [
      { title: 'Diagnose before you prescribe', body: 'Explanation before diagnosis is an unfounded claim about relevance, and buyers are trained to discount it. Three questions first: what you have, what is annoying about it, what that costs you.' },
      { title: 'Let them say the number', body: 'The sale happens when the buyer states the cost in their own voice. Your job until that moment is to ask, listen and shut up.' },
      { title: 'Agree, then move the axis', body: 'Never argue with an objection — the argument confirms the fear. Agree with the concern, then offer a more useful comparison: total cost in year two, risk, cost of failure.' },
      { title: 'Price is delivered, not discussed', body: 'Say the figure once, flatly, mid-sentence, then stop. The first person to speak after the price either defends it or concedes it — and it does not have to be you.' },
      { title: 'Volunteer the weakness', body: 'One real limitation, said before they find it, makes everything else you claim believable. Volunteered, it is credibility; extracted, it is a confession.' },
      { title: 'Silence is a negotiating instrument', body: 'After a demand, a number, or an objection, say nothing and hold the space. Most people fill it and concede something. Silence costs you nothing and is the cheapest leverage available.' },
    ],
    mechanics: [
      {
        name: 'Situation · Problem · Implication',
        why: 'Turns a pitch into a diagnosis, so the solution becomes obvious instead of asserted.',
        steps: [
          'Situation: "how are you handling it today?" — boring, necessary, builds a baseline.',
          'Problem: "what is the most annoying part of doing it that way?" — let them complain properly.',
          'Implication: "how many hours a week does that eat, and what does that time cost you?" — the sale happens here.',
          'Only then describe what you do, in their words, at the size of the cost they just named.',
        ],
        example: '"How are you scheduling today?" → "What is the worst part?" → "How many hours a week is that, and what does it cost you?" → "So this is really a question about a day a week."',
      },
      {
        name: 'Agree and Re-Axis',
        why: 'Defuses an objection without arguing, and moves the decision onto ground where your value is visible.',
        steps: [
          'Agree plainly with the true part of the objection. No defence, no features.',
          'Name the comparison that actually matters to their outcome.',
          'Give one concrete instance, ideally a client who changed their mind.',
          'Hand the choice back: "which risk is easier to own?"',
        ],
        example: '"You are right, we are the most expensive option. The question is what the cheaper one costs you in year two — the last client moved at month twelve. Which risk is easier to own?"',
      },
      {
        name: 'The Quiet Anchor',
        why: 'States price without inviting a negotiation against yourself.',
        steps: [
          'Deliver the figure inside a normal sentence, at normal volume, no hedge words.',
          'Stop. Breathe out. Do not qualify, justify, or offer scope changes.',
          'If they object, ask what they had in mind and what would have to be true — do not discount.',
          'If you do concede, take something back in the same sentence: scope, timing, or payment terms.',
        ],
        example: '"Based on that scope, the number is 12,400." [silence] "That is more than I had in mind." → "What did you have in mind, and what would have to be true for it to work?"',
      },
    ],
    scripts: [
      { them: 'Them: "Send me a proposal and we will see."', you: 'Happy to. So it is worth the time — if the numbers work, who else needs to say yes, and when would you want it live?', why: 'Tests whether it is a real opportunity without insulting them.' },
      { them: 'Them: "We do not have the budget."', you: 'Then let us not pretend. What would have to change for it to be a budget question rather than a no?', why: 'Distinguishes "not now" from "not ever" and keeps dignity on both sides.' },
      { them: 'Them: "Your competitor does it for half."', you: 'They might do the version of it that is half. What would you be giving up, do you think?', why: 'Moves from price to specification without insulting the competitor or the buyer.' },
      { them: 'Them: "We will think about it."', you: 'Of course. What is the one thing you would want answered before you could decide?', why: 'Surfaces the real objection instead of ending the conversation.' },
      { them: 'Them: "Can you do it cheaper?"', you: 'I can do it cheaper by removing something. Which part of the scope is worth less to you than the money?', why: 'Never discount the same work; trade it.' },
    ],
    cautions: [
      'Never manufacture urgency, scarcity or social proof. It works once, it is detectable, and it ends the relationship and the referral permanently.',
      'Do not pitch the wrong buyer for longer than one call. If the implication conversation will not happen, there is no sale — and chasing it costs you the time you needed for a real one.',
      'Do not talk over the silence after a price, a concession, or an objection. The urge to fill it is your discomfort, and filling it is the most expensive habit in business conversation.',
    ],
    drills: [
      { title: 'Three questions first', time: 15, do: 'On your next call, ask three diagnostic questions before describing anything you offer.', success: 'You got a number out of them about the cost of the problem.' },
      { title: 'Write your objections', time: 15, do: 'List your three most common objections. For each, write the agreement sentence and the second axis.', success: 'You can say all three agreements without pausing and without sounding sarcastic.' },
      { title: 'Hold the number', time: 10, do: 'In one money conversation this week, be the second person to speak after a figure is named.', success: 'You said nothing for four seconds and they filled the gap.' },
      { title: 'Volunteer a weakness', time: 10, do: 'State one real limitation at the start of your next pitch, in buyer language.', success: 'You said it before they asked, and it did not cost you the conversation.' },
    ],
    reads: ['lib-bz1', 'lib-bz2', 'lib-bz3', 'lib-bz4'],
  },

  // ══════════════════════════════════════════════════════════
  {
    id: 'storytelling',
    name: 'Storytelling & Wit',
    tone: 'amber',
    tagline: 'Three sentences and a stop beats fifteen and a moral.',
    thesis: 'Storytelling in conversation is a different craft from storytelling on a page. It is shorter, it is built for interruption, and its job is not to be admired but to be entered. Structure, brevity, one concrete detail, and the discipline to stop before the moral — that is the whole skill, and it is why some people seem magnetic in groups and others do not.',
    principles: [
      { title: 'Specificity is belief', body: 'One concrete detail — a name, a number, an object — does more than three sentences of context. "The bus driver bought me a coffee" is believable; "people are surprisingly kind" is not a story at all.' },
      { title: 'Three sentences, then stop', body: 'Setup, complication, turn. Stop before the moral. The silence after a good story is where the other people enter it, and the moral is what shuts the door.' },
      { title: 'Never explain the joke', body: 'Wit lands in the gap between what is said and what is meant. Explaining the gap destroys it. If it does not land, move on without commentary — the recovery is always shorter than the apology.' },
      { title: 'Callback beats new material', body: 'Referring back to something from ten minutes ago is funnier and warmer than a fresh joke, because it proves shared history. Callbacks build the "this is our conversation" feeling that makes people enjoy you.' },
      { title: 'Self-deprecation is high status', body: 'Joking about your own small failures signals you are not managing an image. Joking about other people\'s is war with a smile, and everyone in the room knows the difference immediately.' },
      { title: 'Wit is warmth with teeth', body: 'The people remembered as funny are almost never the ones with the best lines; they are the ones who make other people feel funny. Pulling people into the joke is a generosity, and it reads that way.' },
    ],
    mechanics: [
      {
        name: 'The Small Story',
        why: 'The shape that survives a group, a dinner, and an interruption.',
        steps: [
          'Setup in one sentence: who and where, no backstory.',
          'Complication in one sentence: what went wrong or strange.',
          'Turn in one sentence: what actually happened.',
          'Stop. No moral, no explanation, no "you had to be there". Let the silence work.',
        ],
        example: '"The driver waited at the lights for me, which never happens. Then he shouted at me for holding up the whole route. Then he bought me a coffee at the end of the line. I have been loyal to that route ever since."',
      },
      {
        name: 'The Callback',
        why: 'The cheapest, warmest source of humour available in any conversation.',
        steps: [
          'Notice a distinctive phrase or detail early in the conversation.',
          'Let ten minutes pass without using it.',
          'Return to it in a new context, lightly, in four words or fewer.',
          'Give credit for the original: "as Sanjay said earlier —" which makes them the source, not the target.',
        ],
        example: 'Ten minutes after someone calls the coffee "washing-up water": "One washing-up water, please" when the next round arrives.',
      },
      {
        name: 'The Misdirect',
        why: 'Explains why some remarks get a laugh without being jokes at all.',
        steps: [
          'Set an expectation with the first half of the sentence.',
          'Break it with the last two words.',
          'Keep the wording plain — a clever phrase distracts from the turn.',
          'If it does not land, do not explain. Move on in the same tone, and the moment stays small.',
        ],
        example: '"I have started waking up at five to meditate, journal and plan my day." … "I have also started lying to people about my mornings."',
      },
    ],
    scripts: [
      { them: 'Them: [your joke does not land]', you: 'Anyway — that was better in my head. What were you saying about the trip?', why: 'No apology, no explanation, no second attempt. The recovery is the skill.' },
      { them: 'Them: "You are funny."', you: 'I am mostly just repeating things my sister says. She is the funny one.', why: 'Deflects warmly, introduces a person, invites a follow-up.' },
      { them: 'Them: [makes a self-deprecating joke]', you: 'Careful, that is my job. I am the self-deprecating one in this conversation.', why: 'Playful, inclusive, protects them from over-exposing.' },
      { them: 'Them: [says something deliberately provocative]', you: 'I am going to let that one pass, mostly because I agree with it and I have a reputation to protect.', why: 'Wit that keeps the peace and still engages.' },
      { them: 'Them: "Tell us a story."', you: 'Three sentences: my landlord, a broken boiler, and the best shower of my life. That is it, that is the whole story.', why: 'Brevity as the joke. This is how you become someone people ask again.' },
    ],
    cautions: [
      'Never make a joke at the expense of someone in the room who cannot easily answer back — a junior colleague, a partner, a stranger. It gets a laugh and it costs you the room.',
      'Do not compete for the punchline. If someone is telling a story, your job is to be the best audience in the building, which is more memorable than being the third funniest person there.',
      'Do not tell stories about your own generosity, courage or success. Self-deprecation makes you likeable; self-celebration makes people want to test you.',
    ],
    drills: [
      { title: 'Three small stories', time: 15, do: 'Write three true three-sentence stories from the last month. Rehearse aloud until the stop feels natural.', success: 'All three are under 40 seconds and end without a moral.' },
      { title: 'Plant one callback', time: 15, do: 'In one conversation, note a distinctive phrase and deliberately return to it fifteen minutes later in a new context.', success: 'You used the callback and got a reaction — a laugh or a "you remembered".' },
      { title: 'Be the audience', time: 15, do: 'In one group conversation, ask three follow-up questions about someone else\'s story and tell none of your own.', success: 'You left feeling slightly under-used and other people felt interesting.' },
      { title: 'The non-apology recovery', time: 5, do: 'Make one joke today and, whether or not it lands, move on without explaining or apologising.', success: 'You delivered no commentary on your own joke.' },
    ],
    reads: ['lib-st5', 'lib-w1', 'lib-w3', 'lib-c3'],
  },

  // ══════════════════════════════════════════════════════════
  {
    id: 'confidence',
    name: 'Confidence From Zero',
    tone: 'mint',
    tagline: 'Confidence is not the absence of fear. It is evidence, collected slowly, that you survive this.',
    thesis: 'If conversations currently feel impossible, the answer is not a mindset trick and not a new personality. It is a graded ladder of exposure small enough to actually complete, an honest skill model that tells you what specifically went wrong, and a small number of scripts scripted until they stop requiring thought. Confidence is the by-product, not the entry fee.',
    principles: [
      { title: 'Start smaller than feels useful', body: 'The first rep is not a conversation; it is eye contact and a thank you. Ladders only work if every rung is genuinely achievable, because what you are building is evidence, and evidence you did not earn does not convince anyone — least of all you.' },
      { title: 'Skill, not personality', body: 'After a bad conversation, name the specific broken part: no fork question, filled the silence, told a story with a moral. "I am bad at people" is a verdict; "I skipped the follow-up question" is a fixable skill.' },
      { title: 'Scripts are training wheels, not cheating', body: 'Having five sentences ready removes the working-memory load that causes the freeze. You do not lose spontaneity by rehearsing; you buy the calmness that makes spontaneity possible.' },
      { title: 'Lower the bar to "one exchange"', body: 'A conversation that lasted thirty seconds and ended well is a success. The bar most people set — "be charming for twenty minutes" — guarantees failure and teaches nothing.' },
      { title: 'Volume beats perfection', body: 'Ten mediocre conversations teach more than one agonised perfect one. Social skill is statistical: you are collecting data, not performing a monologue for an audience of judges.' },
      { title: 'Recovery is the actual skill', body: 'Everyone has awkward moments; the skilled are simply the ones who do not treat awkwardness as an ending. "Anyway" plus a new question repairs almost anything, and nobody remembers it the way you do.' },
    ],
    mechanics: [
      {
        name: 'The Ten-Rung Ladder',
        why: 'Turns "be good at talking to people" into a sequence you can actually complete in a fortnight.',
        steps: [
          'Rung 1–2: eye contact + thank you with a person serving you; ask a stranger for the time or directions.',
          'Rung 3–4: one shared-reality observation; one fork question.',
          'Rung 5–6: a two-minute conversation with a stranger; a two-question follow-up in a conversation you did not start.',
          'Rung 7–8: join a group conversation; tell one three-sentence story to more than one person.',
          'Rung 9–10: initiate with someone you find intimidating; exit warmly at the high point.',
          'One rung per day. If a rung is too big, halve it — the sequence matters more than the speed.',
        ],
        example: 'Day 1: thank the barista by looking at them. Day 4: "this queue is moving like it is being paid by the hour" to a stranger. Day 9: two minutes with someone new at work.',
      },
      {
        name: 'The Five Scripts',
        why: 'Removes the freeze by giving the working memory nothing to invent.',
        steps: [
          'Opening: "Excuse me — [shared observation or sincere question]."',
          'Fork: "What made you choose it — or did it choose you?"',
          'Follow-up: "Say more about that."',
          'Disclosure: "I am still working out [small honest thing] myself."',
          'Exit: "I will let you get on — good to meet you, [name]."',
          'Rehearse all five out loud for a week. They cost nothing and they cover 80% of situations.',
        ],
        example: '"Excuse me — is this queue always like this?" … "What are you here for?" … "Say more about that." … "I am still working out whether I even like this place." … "I will let you get on — good luck with it."',
      },
      {
        name: 'The Post-Mortem',
        why: 'Converts a bad conversation from a verdict on your worth into a single fixable line item.',
        steps: [
          'Write what happened in three factual sentences, with no adjectives about yourself.',
          'Name the one specific thing that broke: no fork, filled the silence, asked nothing, over-stayed, over-shared.',
          'Write the sentence you would use next time.',
          'Note one thing that worked, however small. Then stop thinking about it.',
        ],
        example: '"I asked three questions without giving anything back. She gave short answers and left. Next time: two questions then a disclosure."',
      },
    ],
    scripts: [
      { them: '[you freeze completely]', you: 'I have completely lost my train of thought. Give me a second.', why: 'Naming the freeze converts it from a failure into a moment of honesty, which is very likeable.' },
      { them: 'Them: "You are quiet."', you: 'I am, in new groups. It takes me a minute to find something worth saying.', why: 'Owns it without apology, and it is usually true and always forgivable.' },
      { them: '[an awkward silence you cannot fill]', you: 'Anyway — what is the rest of your day looking like?', why: 'The universal repair. Four words and a new question.' },
      { them: '[you said something that landed badly]', you: 'That came out wrong. What I meant was —', why: 'Immediate, brief repair beats a long explanation.' },
      { them: '[you want to approach someone and cannot]', you: '[Say the observation. Do not wait for the fear to go.]', why: 'The fear does not precede confidence; the action does. This is the whole mechanism.' },
    ],
    cautions: [
      'Do not use exposure as self-punishment. If a rung leaves you shaken, go back a rung — a ladder you cannot climb is not a ladder, it is a wall you keep walking into.',
      'Avoid alcohol as the tool for this. It works once and then trains you that conversation requires it, which turns a learnable skill into a permanent dependency.',
      'Do not treat every awkward moment as data about your worth. The post-mortem names one skill, not a personality. The moment it becomes a character verdict, stop the exercise for the day.',
    ],
    drills: [
      { title: 'Rung one today', time: 10, do: 'Do the smallest version of the ladder: eye contact and a thank you with someone serving you, or asking a stranger the time.', success: 'You did it, and you did not narrate it away as nothing afterwards.' },
      { title: 'The five scripts', time: 15, do: 'Write your own five lines — opening, fork, follow-up, disclosure, exit — and say them out loud ten times each.', success: 'You can say all five without reading, in a normal speaking voice.' },
      { title: 'One exchange', time: 10, do: 'Have one conversation today whose only goal is a single exchange that ends warmly. Not two minutes. One exchange.', success: 'You ended it deliberately and it felt slightly too short.' },
      { title: 'The post-mortem', time: 5, do: 'After your next conversation, write three factual sentences, one broken skill, one better line, one thing that worked.', success: 'No sentence in the post-mortem contains a judgement about your character.' },
    ],
    reads: ['lib-st1', 'lib-st6', 'lib-f2', 'lib-ei4'],
  },
];
