// ─────────────────────────────────────────────────────────────
//  The glossary
//
//  The app used "frame" 112 times, "anchor" 43 times, "callback" 85
//  times and never once defined any of them in one place. A learner
//  meeting "pre-frame", "logrolling" or "BATNA" had to infer the meaning
//  from the sentence it appeared in, which is how people end up using
//  jargon confidently and wrongly.
//
//  Every entry carries four things, because a glossary that only defines
//  terms teaches vocabulary rather than judgement:
//    · plain   — the definition, in words you could say out loud
//    · say     — how it sounds in an actual conversation
//    · honest  — where the term comes from and how much weight it carries
//    · trap    — the specific way people misuse it
//
//  The `source` field is deliberately blunt. "Behavioural science" means
//  there are studies behind it. "Field term" means practitioners use it
//  and it describes something real, but nobody has measured it. "Folk"
//  means it is a useful story, not a finding. Selling folklore as
//  science is the failure mode this wing exists to prevent.
// ─────────────────────────────────────────────────────────────

export const GLOSSARY_CATEGORIES = [
  { id: 'structure', name: 'Structure & framing', note: 'The words for how a conversation is set up before anyone argues about content.' },
  { id: 'listening', name: 'Listening & response', note: 'What you do after they finish talking — the part most people skip.' },
  { id: 'influence', name: 'Influence & persuasion', note: 'The mechanisms, with the honest limits attached.' },
  { id: 'negotiation', name: 'Negotiation', note: 'The vocabulary of trading rather than arguing.' },
  { id: 'pitch', name: 'Pitching & selling', note: 'The terms used in a room where someone is deciding whether to buy.' },
  { id: 'conflict', name: 'Conflict & repair', note: 'How arguments actually escalate, and the moves that de-escalate.' },
  { id: 'delivery', name: 'Delivery & voice', note: 'How you say it: pace, pause, pitch, fillers, physical presence.' },
  { id: 'social', name: 'Social mechanics', note: 'Status, face, rapport — the invisible ledger of a room.' },
];

export const GLOSSARY = [
  // ── structure & framing ─────────────────────────────────────
  {
    id: 'g-frame', term: 'Frame', category: 'structure', source: 'field',
    plain: 'The unstated assumption about what kind of conversation this is — a job interview, a favour, a negotiation, a flirtation. Whoever sets the frame decides what counts as a sensible thing to say next.',
    say: '"Can I ask you something as a favour, not as a work thing?" — that one line sets the frame and changes what "no" costs.',
    honest: 'A field term from negotiation and hypnosis writing, not a measured construct. The underlying idea — that context sets expectations — is well supported; the vocabulary is not.',
    trap: 'People say "hold your frame" to mean "never concede", which is just stubbornness in a nicer coat. The useful version is narrower: do not let the other person redefine what the conversation is about without noticing.',
  },
  {
    id: 'g-reframe', term: 'Reframe', category: 'structure', source: 'behavioural',
    plain: 'Changing the interpretation of the same facts rather than changing the facts. "We lost three clients" becomes "we found out which three were never a fit".',
    say: '"Same numbers — I think we are disagreeing about what they mean, not what they are."',
    honest: 'Reframing effects are real and repeatable in decision research (see framing effects in the Psychology wing). What is not supported is the idea that a clever reframe beats a real objection.',
    trap: 'Reframing something the other person has already understood is heard as spin. Reframe only what is genuinely ambiguous, and never reframe their feelings.',
  },
  {
    id: 'g-pre-frame', term: 'Pre-frame (priming the topic)', category: 'structure', source: 'folk',
    plain: 'Telling someone what kind of thing you are about to say before you say it, so they hear it in the right register. "Nothing is wrong, I just want to ask you something."',
    say: '"This is a small logistics thing, not a complaint."',
    honest: 'The useful part is expectation-setting, which is ordinary and well understood. The strong version sold in some courses — that a phrase "primes" someone into compliance — is not supported by priming research, which has largely failed to replicate at the sizes claimed.',
    trap: 'Used as a manipulation trick ("can I ask you a quick question?" as a wedge) it produces irritation, and people notice it.',
  },
  {
    id: 'g-signposting', term: 'Signposting', category: 'structure', source: 'behavioural',
    plain: 'Saying out loud where you are in an explanation, so the listener can relax. "Three reasons. The second one is the one that matters."',
    say: '"Two things, and the second one is bigger."',
    honest: 'Straightforwardly good practice: it reduces the effort of following and improves recall of structure. Communication training has taught it for decades for that reason.',
    trap: 'Signposting that outnumbers the content — "firstly, secondly, thirdly, in summary" around four sentences reads as padding.',
  },
  {
    id: 'g-bottom-line', term: 'Bottom line up front (BLUF)', category: 'structure', source: 'field',
    plain: 'Put the conclusion in the first sentence, then support it. The opposite of a mystery novel, and the correct structure for anyone busy or anxious.',
    say: '"Short answer: no, and here is why that is fine."',
    honest: 'Military and journalism practice, and the reason news writing works. It is not a study finding, it is a convention that survives because it is testable against attention.',
    trap: 'BLUF on emotionally loaded news ("I am leaving") without a weight marker reads as brutal. Structure is not the same as tone.',
  },
  {
    id: 'g-premise', term: 'Premise', category: 'structure', source: 'field',
    plain: 'The thing that has to be true for your argument to work. If you lose the premise, the argument does not matter.',
    say: '"Before I answer that — do we agree the deadline is fixed? Because everything else depends on it."',
    honest: 'Basic argument structure, no controversy. The practical value is that most disagreements are actually premise disagreements wearing the costume of a content disagreement.',
    trap: 'Attacking a premise the other person has not actually stated. Check what they assumed before arguing with it.',
  },

  // ── listening & response ────────────────────────────────────
  {
    id: 'g-active-listening', term: 'Active listening', category: 'listening', source: 'behavioural',
    plain: 'Reflecting back what you understand so the other person can correct you — not parroting, and not "mm-hmm" noise.',
    say: '"So the thing that is actually bothering you is not the deadline, it is that nobody told you."',
    honest: 'A real and well-taught technique, but the evidence is more modest than the training industry implies: it reliably improves how understood people feel, and only sometimes improves outcomes.',
    trap: 'Mechanical reflection ("What I hear you saying is...") is widely recognised as a script and can feel colder than plain attention. Use less of it, better.',
  },
  {
    id: 'g-label', term: 'Label (naming the feeling)', category: 'listening', source: 'field',
    plain: 'Saying the emotion you can see, as a noun, without asking a question. "That sounds like a lot of pressure."',
    say: '"Sounds like you are carrying the whole thing alone."',
    honest: 'Affect labelling has decent evidence — naming an emotion reduces its intensity. The FBI-negotiation framing around it is a practitioner story wrapped around a real effect.',
    trap: 'Labeling wrongly and confidently. "You are angry" to someone who is embarrassed gets you locked out; offer it tentatively and let them correct you.',
  },
  {
    id: 'g-mirroring', term: 'Mirroring (and pacing)', category: 'listening', source: 'field',
    plain: 'Repeating the last few words someone said, as a question, to invite them to keep going. Also loosely used for matching someone\'s pace or posture.',
    say: 'Them: "It just fell apart." You: "Fell apart?"',
    honest: 'The verbal version is a cheap, effective invitation to elaborate. The body-language version is much weaker than its reputation: posture-matching studies exist but the "rapport in three minutes" claims do not hold up.',
    trap: 'Deliberately copying gestures. At best it is unnoticed, at worst it is spotted and reads as mockery.',
  },
  {
    id: 'g-callback', term: 'Callback', category: 'listening', source: 'field',
    plain: 'Referring back to something said earlier — in the same conversation, or weeks ago. It is the cheapest proof that you were listening, and the basis of most warmth between people.',
    say: '"You said in March you were going to try the cold-email thing. Did it work?"',
    honest: 'No controlled trials, and none needed: the mechanism is obvious, specific memory is hard to fake, and readers over-report being delighted by it.',
    trap: 'Callback-as-scorekeeping ("remember when you said..."). If the memory has a winner and a loser in it, it is an attack, not warmth.',
  },
  {
    id: 'g-tie-down', term: 'Tie-down', category: 'listening', source: 'field',
    plain: 'A short check that pins down what a vague statement meant, before you build on it. "When you say quickly — this week-quick or this quarter?"',
    say: '"Define expensive for me — expensive for you, or expensive for the budget?"',
    honest: 'Practical sales vocabulary, not a scientific term. Its real value is that most disagreement later is disagreement about a word agreed too fast earlier.',
    trap: 'Tie-downs used as interrogation. In a warm conversation, one is interest; five is a deposition.',
  },
  {
    id: 'g-looping', term: 'Looping', category: 'listening', source: 'field',
    plain: 'Summarising what someone said until they say "exactly" — and only then moving to your own point.',
    say: '"Let me check I have it: you need it Friday, and you need to be able to undo it. Have I got that?"',
    honest: 'A mediation and hostage-negotiation technique with a clear logic: agreement on the summary is agreement on the ground you stand on. No trial would be ethical or useful.',
    trap: 'Looping to stall, when the other person can see you have understood and want an answer.',
  },

  // ── influence & persuasion ──────────────────────────────────
  {
    id: 'g-social-proof', term: 'Social proof', category: 'influence', source: 'behavioural',
    plain: 'Deciding what is correct by seeing what others do, especially others like you. Powerful under uncertainty, weak when the decision is clear.',
    say: '"Two teams your size did this last quarter and both kept the same headcount."',
    honest: 'One of the more robust findings in social psychology, with replications. Its strength depends on similarity and uncertainty — a testimonial from someone unlike the buyer barely moves anything.',
    trap: 'Fabricated or unrepresentative proof. It works once and costs you the relationship permanently when noticed.',
  },
  {
    id: 'g-scarcity', term: 'Scarcity', category: 'influence', source: 'behavioural',
    plain: 'Things seem more valuable when they are limited in time, quantity or access.',
    say: '"This cohort closes Friday because the group size is fixed at twelve."',
    honest: 'A genuinely studied effect (Cialdini\'s influence research, with later replications) and the single most abused one in sales. The evidence is strongest when the limit is real and legible, and weak when the buyer suspects the scarcity is manufactured.',
    trap: 'Fake deadlines. Audiences have adapted to countdown timers, and a false scarcity claim is straightforwardly a lie.',
  },
  {
    id: 'g-reciprocity', term: 'Reciprocity', category: 'influence', source: 'behavioural',
    plain: 'People tend to return favours, including unrequested ones. The size of the return tracks how the giving felt, not how much it cost.',
    say: 'Send the useful thing with no ask attached. The ask can come later, or never.',
    honest: 'Well supported, with a caveat the sales industry ignores: unrequested generosity can create obligation and resentment, not warmth, when it is visibly instrumental.',
    trap: 'Gifts with a price tag attached ("I sent you that report, so...") convert generosity into a debt and usually lose the sale.',
  },
  {
    id: 'g-commitment', term: 'Commitment & consistency', category: 'influence', source: 'behavioural',
    plain: 'People act to stay consistent with what they have already said or done in public, even when circumstances change.',
    say: '"You said the priority was keeping the team intact — that is the thread I would protect in this plan."',
    honest: 'Solid evidence, and the mechanism behind most honest sales processes: get the buyer to say the goal out loud, then build the proposal around it.',
    trap: 'Manufacturing small yeses to trap someone into a large one. It is the technique behind a lot of high-pressure selling, and it is why people feel dirty after buying.',
  },
  {
    id: 'g-anchoring', term: 'Anchoring', category: 'influence', source: 'behavioural',
    plain: 'The first number mentioned pulls every subsequent estimate towards it, even when it is arbitrary.',
    say: 'In salary talks, the first credible number in the room sets the range. Say yours with a reason attached.',
    honest: 'One of the most replicated effects in behavioural economics. It also affects experts, which is why "I do not get anchored" is not a defence.',
    trap: 'Treating an anchor as a strategy. A number you cannot justify gets discounted and costs you credibility on the rest of the conversation.',
  },
  {
    id: 'g-loss-aversion', term: 'Loss aversion', category: 'influence', source: 'behavioural',
    plain: 'A loss of a given size feels roughly twice as strong as an equivalent gain. People work harder to avoid losing than to win.',
    say: '"Doing nothing is also a decision — it costs us the four months we have left."',
    honest: 'Robust and heavily replicated, though the "twice as strong" figure varies a lot by context and domain.',
    trap: 'Manufacturing fear to use it. Threat-based persuasion works fast and teaches the other person to avoid you.',
  },
  {
    id: 'g-steelman', term: 'Steelman', category: 'influence', source: 'field',
    plain: 'Stating the other side\'s argument better than they did before answering it. The opposite of a straw man.',
    say: '"The strongest version of your point is that we would be betting the quarter on one hire. That is fair — here is why I would still do it."',
    honest: 'A philosophical and debate practice, no trials. Its practical effect is large: people concede to someone who has clearly understood them.',
    trap: 'Steelmanning then ignoring it. If your answer does not engage the strong version, you have just spent thirty seconds proving you can repeat their point.',
  },

  // ── negotiation ─────────────────────────────────────────────
  {
    id: 'g-batna', term: 'BATNA', category: 'negotiation', source: 'field',
    plain: 'Best Alternative To a Negotiated Agreement. What you do if this deal does not happen. It is the source of your leverage, not your confidence.',
    say: '"Before I push for the number, I need to know what I am actually doing on Monday if this collapses."',
    honest: 'From Fisher and Ury\'s *Getting to Yes* — a framework, not an empirical finding, but one with unusual survival power because it is almost tautologically true.',
    trap: 'Confusing a BATNA with a threat. Announcing your alternative is usually weaker than simply having one.',
  },
  {
    id: 'g-zopa', term: 'ZOPA', category: 'negotiation', source: 'field',
    plain: 'Zone Of Possible Agreement — the overlap between the least they will accept and the most you will pay. No overlap, no deal, no matter how good the talking is.',
    say: '"If our ceiling is here and their floor is there, we are wasting a week. Better to find that out now."',
    honest: 'A diagram, not a discovery. Useful because it forces you to estimate the other side\'s real constraints instead of assuming they are being difficult.',
    trap: 'Assuming you can see their floor. You usually cannot, and guessing it confidently is how people leave money on the table.',
  },
  {
    id: 'g-interests', term: 'Positions vs interests', category: 'negotiation', source: 'field',
    plain: 'A position is what someone says they want ("I need 20%"). An interest is why ("I need to justify this to my board"). Positions collide; interests often do not.',
    say: '"Help me understand what the 20% is for — is it the number, or what the number buys you?"',
    honest: 'The core useful idea in negotiation literature, and it survives because it converts zero-sum arguments into trades.',
    trap: 'Assuming every position hides a generous interest. Sometimes the interest is exactly what they said.',
  },
  {
    id: 'g-logrolling', term: 'Logrolling', category: 'negotiation', source: 'behavioural',
    plain: 'Trading across issues rather than splitting each one. You care about the deadline, they care about the scope — give on one, take on the other.',
    say: '"You need it sooner, I need it smaller. What if the first version ships Friday with half the features?"',
    honest: 'A real finding from negotiation research — trades across differently-valued issues beat compromise within each one, and the effect is measurable.',
    trap: 'Revealing your priorities too freely. Logrolling requires someone to know what you care about, and that information can be used against you next round.',
  },
  {
    id: 'g-mesos', term: 'MESO', category: 'negotiation', source: 'field',
    plain: 'Multiple Equivalent Simultaneous Offers: putting three packages on the table at once instead of one number. All acceptable to you, differently shaped for them.',
    say: '"Three options: same price with a longer term, higher price with an exit, or lower price with the training included. Which is closest?"',
    honest: 'Taught in negotiation programmes and supported by research on multi-issue offers, which generally outperform single-number haggling. Less famous than BATNA because it requires preparation.',
    trap: 'Three offers that are all secretly worse for them. People compare the packages to each other, and the pattern is visible.',
  },
  {
    id: 'g-silence', term: 'The silence after the number', category: 'negotiation', source: 'field',
    plain: 'After you name a price or a limit, stop talking. The next person to speak is usually conceding.',
    say: '[Say the number. Stop. Let it sit for four seconds.]',
    honest: 'No studies, and none possible that would settle it. It is a strong practical heuristic because filling silence is a nervous habit, not a strategy.',
    trap: 'Using silence as a weapon on people with less power than you. It works, and it is the behaviour people remember as bullying.',
  },

  // ── pitching & selling ──────────────────────────────────────
  {
    id: 'g-value-prop', term: 'Value proposition', category: 'pitch', source: 'field',
    plain: 'One sentence naming who this is for, what it changes for them, and why it is different. If you cannot say it in a sentence, you do not have one.',
    say: '"We stop small agencies losing invoices in email. One line of code, one fewer spreadsheet."',
    honest: 'Marketing vocabulary. The underlying test is real: if the listener cannot repeat it back an hour later, it is not doing its job.',
    trap: 'Value propositions built from adjectives ("seamless, powerful, intuitive"). Adjectives are not a value proposition, they are a mood.',
  },
  {
    id: 'g-discovery', term: 'Discovery', category: 'pitch', source: 'field',
    plain: 'The questioning phase before any pitch — finding out what is actually wrong before proposing anything. Skipping it is the most common reason pitches miss.',
    say: '"Before I show you anything: what happens today when this goes wrong?"',
    honest: 'Standard practice in professional selling, and it aligns with a simple truth — a diagnosis you did not make is a prescription you cannot defend.',
    trap: 'Discovery as a checklist interrogation. If the questions do not change what you would propose, you are performing discovery.',
  },
  {
    id: 'g-elevator', term: 'Elevator pitch', category: 'pitch', source: 'folk',
    plain: 'A thirty-second version of what you do, for the moment someone asks. The name is a fiction; nothing important has ever been decided in a lift.',
    say: '"I help [who] do [what] so they can [outcome]. Last week that looked like [one concrete thing]."',
    honest: 'Folk. The real version people use is not a monologue, it is a first sentence designed to earn a second question. Pitches that try to say everything get cut off.',
    trap: 'Delivering the whole thing regardless of whether the listener is interested. The best elevator pitch ends with a question.',
  },
  {
    id: 'g-bant', term: 'BANT (and why it is criticised)', category: 'pitch', source: 'field',
    plain: 'Budget, Authority, Need, Timing — the old checklist for whether a lead is real. Useful as a set of questions, dangerous as a gate.',
    say: '"Is this your call, or are we both preparing something for someone else?"',
    honest: 'Corporate sales training, and increasingly criticised: a "no budget" prospect is often a prospect whose buyer has not been shown a reason yet. The authority question remains genuinely useful.',
    trap: 'Disqualifying someone early because they lack a line item. You will lose deals to competitors who did the work of creating the budget.',
  },
  {
    id: 'g-objection', term: 'Objection (and reframe)', category: 'pitch', source: 'field',
    plain: 'A stated reason not to buy. Almost always incomplete: the stated objection is usually the polite version of the real one.',
    say: '"That is a fair concern. Is it the price itself, or is it explaining the price internally?"',
    honest: 'Sales practice. The reliable part is that objections are requests for proof or for cover, not rejections.',
    trap: 'Answering the stated objection with a better argument. If the real objection was "I cannot defend this to my boss", winning the argument loses the deal.',
  },
  {
    id: 'g-close', term: 'The close', category: 'pitch', source: 'field',
    plain: 'Whatever moves the conversation to a decision. In practice usually a specific, small, easy next step rather than a dramatic ask.',
    say: '"Do you want to start with the pilot on one team, or wait until the new quarter?"',
    honest: 'Practice, not science. What is supported: choice between two acceptable next steps beats "so, what do you think?", which invites a deferral.',
    trap: 'The hard close. Pressure produces a yes that gets cancelled on Monday, and a reputation that follows you.',
  },
  {
    id: 'g-proof', term: 'Proof under objection', category: 'pitch', source: 'field',
    plain: 'The specific evidence you keep ready for the three objections you always get. Not a feature list — a fact, a name, a number, a demo.',
    say: '"Three teams your size run this. One of them had exactly that concern — do you want to talk to them?"',
    honest: 'Nothing exotic: specific evidence beats assertion, and a reference beats both.',
    trap: 'Using the same proof for every buyer. Proof works by similarity, so the closest possible example is worth ten impressive ones.',
  },

  // ── conflict & repair ───────────────────────────────────────
  {
    id: 'g-escalation', term: 'Escalation (and the cycle)', category: 'conflict', source: 'behavioural',
    plain: 'The pattern where each response is slightly harsher than the thing it answers. It has a shape, which means it can be interrupted.',
    say: '"We are both escalating. Can we stop here and pick this up when we are less tired?"',
    honest: 'Well described in relationship research (Gottman\'s work on conflict patterns) and in mediation practice. The specific "four horsemen" list is popularised but the broad pattern replicates.',
    trap: 'Naming the cycle in the middle of it. "You are escalating" during an argument is heard as an accusation. Name the cycle when the temperature is lower.',
  },
  {
    id: 'g-deescalation', term: 'De-escalation', category: 'conflict', source: 'behavioural',
    plain: 'Lowering the intensity of a conflict: slowing your speech, lowering your volume, reducing your word count, and not matching their energy.',
    say: '[Slower. Quieter. Shorter sentences. One question.]',
    honest: 'Genuinely studied, particularly in crisis and policing contexts: voice, pace and space matter more than the words.',
    trap: 'De-escalating with someone who reads calm as contempt. Sometimes the honest move is to name the heat, not to cool it unilaterally.',
  },
  {
    id: 'g-boundary', term: 'Boundary', category: 'conflict', source: 'field',
    plain: 'A statement about what you will do, not what they must do. "I will leave the table if it turns into shouting" is a boundary; "you cannot shout at me" is a demand.',
    say: '"I am not going to keep talking about this tonight. I will pick it up tomorrow morning."',
    honest: 'A therapy and coaching term with wide practical agreement. Its value is grammatical: a boundary is something you can always enforce without their consent.',
    trap: 'Boundaries used as ultimatums in disguise. If the consequence is designed to punish rather than protect, it is a threat with better branding.',
  },
  {
    id: 'g-repair', term: 'Repair attempt', category: 'conflict', source: 'behavioural',
    plain: 'Any small move that interrupts a conflict — a joke, an apology, "hang on, that came out wrong". The health of a relationship tracks whether repairs are offered and accepted, more than whether conflict happens.',
    say: '"That came out sharper than I meant. Let me try again."',
    honest: 'One of the better-supported ideas in couples research: the presence of repair attempts predicts outcomes better than the absence of conflict.',
    trap: 'Repairing with humour when the other person is not ready. A joke too early reads as dismissing the thing they are still upset about.',
  },
  {
    id: 'g-face', term: 'Face (and face-saving)', category: 'conflict', source: 'behavioural',
    plain: 'The public dignity a person holds in a room. Most resistance that looks irrational is someone protecting face rather than defending a position.',
    say: '"I do not need you to agree with me in the meeting — just tell me beforehand and I will not put you in that spot."',
    honest: 'A substantial cross-cultural research tradition (Goffman, and later cross-cultural work on face and politeness). Much stronger evidence than most items in this list.',
    trap: 'Assuming face works the same everywhere. The mechanism is universal; what specifically threatens it varies a lot by culture, seniority and family.',
  },
  {
    id: 'g-steamroll', term: 'Poke the bear / pressure test', category: 'conflict', source: 'field',
    plain: 'Deliberately introducing mild resistance to see how someone responds — used in negotiation training and in interviews to test composure.',
    say: '[In practice: "That is more than I expected — talk me through it."]',
    honest: 'Field technique with no evidence base behind the specific claims made for it, and a real risk: people who feel tested remember it.',
    trap: 'Using it on people who have less power than you. It is called a test when you do it and harassment when it is done to you.',
  },

  // ── delivery & voice ────────────────────────────────────────
  {
    id: 'g-pace', term: 'Pace (and the strategic pause)', category: 'delivery', source: 'behavioural',
    plain: 'How fast you speak, and the silences you leave. A pause before an important line makes the line land; a pause after a question makes the other person answer.',
    say: '[Finish the sentence. Count two beats before the next one.]',
    honest: 'Speech-rate and pause research is real: pauses aid comprehension and mark structure, and nervous speakers reliably speed up. The "seven-second pause" style of advice is folklore.',
    trap: 'Pausing so deliberately it becomes theatrical. Pauses read as confidence only when they are not being performed.',
  },
  {
    id: 'g-fillers', term: 'Fillers (um, uh, like)', category: 'delivery', source: 'behavioural',
    plain: 'The sounds that fill a gap while you think. They are not a sign of stupidity — they are a sign of speech planning, and everyone does it.',
    say: '[Replace the filler with a half-second of silence. The silence sounds more confident and costs nothing.]',
    honest: 'Linguistics is clear that fillers serve a function and that eliminating them entirely is neither possible nor necessary. Audiences over-penalise them in self-assessment far more than in judgement of others.',
    trap: 'Training yourself to fear fillers until you speak slower and stranger. The fix is a pause, not a war.',
  },
  {
    id: 'g-prosody', term: 'Prosody', category: 'delivery', source: 'behavioural',
    plain: 'The melody of speech — pitch movement, stress, rhythm. It carries most of the emotional information, which is exactly what text strips out.',
    say: '[Stress the one word that changes the meaning. "I did not say *that*."]',
    honest: 'Robust in speech science. Note the practical consequence: the same words can be warm or hostile purely by prosody, and no amount of punctuation replaces it in writing.',
    trap: 'Flat prosody read as coldness. Monotone delivery is judged as disinterest even when the speaker is intensely interested.',
  },
  {
    id: 'g-upspeak', term: 'Upspeak (rising intonation)', category: 'delivery', source: 'field',
    plain: 'Ending statements with a rising pitch so they sound like questions. It undercuts authority, and it is usually a habit rather than a choice.',
    say: '"We should move the deadline." [Down, not up.]',
    honest: 'Widely observed and widely coached against; the research on how much it costs a speaker is thinner and more contested than the coaching implies, and judgements vary by gender and region.',
    trap: 'Policing other people\'s upspeak. It is heavily gendered in how it gets judged, and the correction often costs more than the habit.',
  },
  {
    id: 'g-grounding', term: 'Grounding (physical)', category: 'delivery', source: 'field',
    plain: 'Getting your body settled before you speak: feet flat, weight down, one slow exhale. It reduces the visible tremor of nerves.',
    say: '[Before you start: feel both feet, breathe out longer than you breathe in, then speak.]',
    honest: 'Slow exhale genuinely shifts arousal via the parasympathetic system, which is physiology. The rest of the grounding vocabulary is practice.',
    trap: 'Grounding as a substitute for preparation. Calm with nothing to say is still nothing to say.',
  },

  // ── social mechanics ────────────────────────────────────────
  {
    id: 'g-status', term: 'Status (as a dial)', category: 'social', source: 'field',
    plain: 'How much room you take up relative to others. It is not rank or worth — it is a moment-to-moment dial, and it can be raised or lowered deliberately.',
    say: '[Lowering yourself slightly — a real admission, a genuine compliment — raises the room without cost.]',
    honest: 'Popularised by improvisation teaching (Johnstone) and it describes something people recognise instantly. It is a performance vocabulary, not a measured construct.',
    trap: 'Playing low status to be liked. Chronic self-deprecation is not warmth, it is a request to be reassured, and it gets tiring.',
  },
  {
    id: 'g-rapport', term: 'Rapport', category: 'social', source: 'behavioural',
    plain: 'The state where two people are comfortable enough to be a little unguarded. Built by attention and specificity, not by agreement.',
    say: '"What made you go that way instead of the obvious one?" [Genuine curiosity about their choices.]',
    honest: 'A real construct in therapy and communication research, measured via things like mutual attention and turn-taking. The 1990s "build rapport in 90 seconds with body mirroring" claims do not replicate.',
    trap: 'Mistaking similarity for rapport. Agreeing with everything produces pleasantness and no trust.',
  },
  {
    id: 'g-warmth', term: 'Warmth before competence', category: 'social', source: 'behavioural',
    plain: 'People judge you on two axes — warmth and competence — and warmth is assessed first. Lead with competence and it reads as a threat; lead with warmth and competence becomes credible.',
    say: '"Before I get into the numbers — how has this quarter actually been for you?"',
    honest: 'One of the more replicated findings in social perception (Fiske\'s warmth–competence model), with strong cross-cultural support.',
    trap: 'Performing warmth to get to the competence part. It reads as a technique, because it is one.',
  },
  {
    id: 'g-thin-slice', term: 'Thin-slicing', category: 'social', source: 'behavioural',
    plain: 'The fast, automatic judgement people form of you from very little information — face, posture, first sentence.',
    say: '[Your first three seconds are your resting face, your entry, and whether you look like you are waiting for permission.]',
    honest: 'The research is real (rapid trait judgements), but the honest summary is: the effect exists, it is small and corrigible, and it predicts much less about your life than the fear suggests.',
    trap: 'Treating a first impression as a verdict. It sets a prior, not a ceiling, and behaviour over time dominates it.',
  },
  {
    id: 'g-bid', term: 'Bid for connection', category: 'social', source: 'behavioural',
    plain: 'A small attempt to get attention or acknowledgement — a comment, a joke, a "look at this". Whether it gets turned towards or away is what builds or erodes a relationship.',
    say: '[When someone says something small, turn towards it for ten seconds instead of ignoring it.]',
    honest: 'From relationship research (Gottman): the accumulate of turned-toward bids predicts stability better than grand gestures. Strong observational base.',
    trap: 'Missing bids because they are small. Almost all of them are small; that is the point.',
  },
  {
    id: 'g-context', term: 'High-context vs low-context', category: 'social', source: 'behavioural',
    plain: 'Some cultures and families put most of the meaning in the situation and the relationship; others put it in the explicit words. Misreading which one you are in causes most "they were being fake / rude" judgements.',
    say: '"When you said it was fine — did you mean fine, or did you mean we should talk about it?"',
    honest: 'A framework (Hall) with real cross-cultural support and real criticism for over-generalising. Useful as a question to ask yourself, dangerous as a label for a person.',
    trap: 'Using it as a national stereotype ("they never say what they mean"). The variation inside any culture is larger than the difference between averages.',
  },
  {
    id: 'g-code-switch', term: 'Code-switching', category: 'social', source: 'behavioural',
    plain: 'Adjusting how you speak — vocabulary, accent, directness, humour — depending on the room. Everyone does it; some people have to do it to be safe.',
    say: '[Notice which version of you showed up in the last meeting, and whether the switch was a choice.]',
    honest: 'Well documented in sociolinguistics, including the costs of mandatory switching for people from minority groups.',
    trap: 'Treating code-switching as fake. The skill is real and usually a survival or professional necessity, not a character flaw.',
  },
];
