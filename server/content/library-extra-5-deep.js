// ─────────────────────────────────────────────────────────────
//  LIBRARY_EXTRA_5_DEEP — long-form chapters for the fifth wing.
//  Eight chapters, one per new library entry. Same contract as
//  library-deep.js: thesis, four deep paragraphs, a three-beat
//  script, four failure modes, two drills and three `related`
//  edges (both directions are checked by `npm run audit`).
// ─────────────────────────────────────────────────────────────

export const LIBRARY_EXTRA_5_DEEP = {
  'lib-cr1': {
    thesis:
      'A first impression is not a verdict on your personality. It is a compression your brain performs because it cannot afford to evaluate every person properly. The useful news is that the compression follows rules — and the rules are learnable in an afternoon.',
    deep: [
      'Within about a tenth of a second, people form a judgement about your trustworthiness, competence and aggression, and that judgement colours everything you say afterwards. The mechanism is unglamorous: your face at rest, your posture, how long you hold eye contact, whether you look like you are waiting for permission. None of it is character. All of it is legible. What makes first impressions feel unfair is that they are made from data you are not consciously transmitting.',
      'Warmth is read before competence, and it is read mostly through the face at rest and through the first thing you do with your attention. A person whose face is neutral while listening looks severe; the same person with the faintest upturn at the eyes looks calm. That is not a smile — a smile at nothing is unnerving. It is the relaxation of a face that is not currently defending itself, and it is the single highest-leverage thing you can change.',
      'Competence is read second and largely through stillness. Fidgeting, over-explaining, filling silence and laughing at your own sentences all read as a request for reassurance. It is not that confident people are calm; it is that calm people get read as confident, whether or not they are. Slow hands, one thing at a time, a pause before answering — these read as authority because they suggest nothing is being hidden.',
      'The mistake almost everyone makes is trying to be impressive in the first thirty seconds. Impressive is a status claim, and a status claim from a stranger invites scrutiny. Warmth invites company. So the sequence that works is unglamorous: be readable, then be specific, then be slightly more interesting than expected. Nobody has ever been remembered for a great opening line; people are remembered for the reason they wanted to keep talking.',
    ],
    script: [
      { who: 'Them', line: '(Walks into the room. You have four seconds before they decide how to treat you.)' },
      { who: 'You', line: 'Hi — Alex. I was told you would be the person who actually knows how this works.' },
      { who: 'Them', line: 'Depends what "this" is. What are you trying to do?' },
      { who: 'You', line: 'Make sure I do not spend the next month building the wrong thing. Can I ask you one specific question?' },
    ],
    failureModes: [
      'Performing warmth with a fixed grin. Held too long, a smile reads as a mask and makes people slightly uneasy — the goal is a settled face, not a happy one.',
      'Trying to demonstrate competence before they have decided you are safe. Everything you say in those first minutes is heard through suspicion, however true it is.',
      'Talking about yourself to fill a silence. The silence was fine; filling it told them something true and unflattering about your relationship with it.',
      'Assuming the first impression is final. It is not — it is a hypothesis people revise constantly, which means the recovery is easy and most people never attempt it.',
    ],
    drill: [
      'For one day, at every introduction, give your name and one specific reason you are talking to this person. No "how are you", no "nice to meet you". Watch how much faster the conversation gets real.',
      'Record yourself answering "what do you do?" on your phone. Watch it back with the sound off. Whatever your body is doing in the first four seconds is what strangers are reading.',
    ],
    related: ['lib-f8', 'lib-st1', 'lib-wm2'],
  },

  'lib-cr2': {
    thesis:
      'Repair is not what you say after you get it wrong. It is what you do in the four minutes afterwards, and those four minutes have a shape that most people instinctively get backwards.',
    deep: [
      'When trust is damaged, the other person is not primarily looking for an explanation. They are looking for evidence that you understand the shape of what happened — because being understood is the experience of safety. That is why the apology that opens with "I am sorry, but" fails even when the "but" is true: the sentence tells them you are still in the position of explaining rather than the position of seeing.',
      'The order that works is unhelpfully counter-intuitive. Name the thing, in specific behavioural terms, before any reason. Then name the effect, and name it as theirs, not yours — "you had to redo the whole thing on Friday" lands; "I felt awful about it" is about you. Then say what changes, in a way they can hold you to. Then stop. The stop is the part nobody does, because silence feels like being judged, and the urge to fill it produces the second apology that undoes the first.',
      'There is a version of this that fails silently and is worth naming: the repair that is too big. A long, emotional apology turns the conversation into a performance of remorse and implicitly asks the hurt person to comfort you, or to reassure you that you are a good person. It is a kind of emotional taxation, and people remember it more than the original offence.',
      'Finally, repair has a timestamp. What is small and immediate stays small. The same sentence three weeks later has to carry three weeks of ambiguity, and it will not. If you know you got it wrong, the trade is not between saying something awkward now and saying it gracefully later. It is between saying it now and it becoming a story about your character.',
    ],
    script: [
      { who: 'Them', line: 'It is fine. Do not worry about it.' },
      { who: 'You', line: 'It is not really fine, and I would rather say it properly. I gave your work back at the last minute on Monday, which meant you rebuilt it over a weekend.' },
      { who: 'Them', line: '(Silence.)' },
      { who: 'You', line: 'From now on you get it Thursday morning, and if I cannot make Thursday I will tell you on Wednesday. And I am sorry — that was on me, not the process.' },
    ],
    failureModes: [
      'The "but". Any explanation appended to an apology converts the apology into an argument about whether the hurt was proportionate.',
      'Asking for absolution: "are we okay?" turns the other person into a judge and hands them a job they did not apply for.',
      'Repairing in public. A public apology is often a performance for the audience; the actual repair happens in a smaller room.',
      'Changing the behaviour but never saying the sentence. It repairs the relationship but leaves them with the private thought that you never noticed, which is the thing they will bring up in three months.',
    ],
    drill: [
      'Take one thing you got wrong this week and write the four beats in order: behaviour, their effect, what changes, stop. Say it out loud. If the version out loud is longer, it is not the same apology.',
      'In your next disagreement, at the first moment you are wrong, say "that is on me" in four words or fewer and then stop. Count the seconds you can hold the silence.',
    ],
    related: ['lib-dc3', 'lib-dc1', 'lib-ei2'],
  },

  'lib-cr3': {
    thesis:
      'A warm boundary is not a softer boundary. It is the same line, said in a way that leaves the other person with their dignity — which is the only reason they can follow it without needing revenge.',
    deep: [
      'People hear the word "boundary" and picture a wall. The research on what actually holds is the opposite: boundaries that stick are the ones where the relationship feels safer after the sentence than before it. A line that costs someone face produces compliance and resentment, in that order, and the resentment usually outlives the compliance.',
      'The mechanism is simple and almost embarrassingly polite. Warmth first: something true and specific that shows you have understood their position. Then the line, short and unhedged. Then a door: what you are offering instead, so they know the connection is not the thing being refused. Three beats, and the second one is the only one people practise.',
      'The line itself must be a position, not a feeling, and not a negotiation. "I am not able to do that" is a position. "I would really rather not, if that is okay with you" is a negotiation you have already invited them to win. Most people who struggle with boundaries are not bad at saying no; they are bad at saying no without turning it into a question.',
      'The hardest part is repetition. A warm boundary said once is often treated as a position to be argued with, not a fact — particularly with family, where the pattern of your life so far is that persistence works. The second saying is where the warmth has to stay identical and the line has to stay identical. Change either one and you have told them the line is negotiable.',
    ],
    script: [
      { who: 'Them', line: 'You can just do this one thing for me. It is not a big deal.' },
      { who: 'You', line: 'I know it is not a big deal to you, and I can see why you would think that.' },
      { who: 'Them', line: 'So? It would take you ten minutes.' },
      { who: 'You', line: 'I am still not going to be able to do it. But I can send you the two names who would do it properly — do you want them now or tomorrow?' },
    ],
    failureModes: [
      'Explaining. Every reason is a handle. The first reason invites a rebuttal; the fifth invites a debate about your character.',
      'Apologising more than once. One "sorry" is warmth; three tells them you think the boundary is rude and invites them to agree.',
      'The iced-over version. A cold, correct boundary is a very expensive way to win one exchange.',
      'Changing the terms on the second ask. The second ask is the test, and everyone knows it. Say the same words again, in the same tone.',
    ],
    drill: [
      'Write the boundary you have never said out loud, then write it in the three-beat form. Practise the line until you can say it without a question mark in your voice.',
      'Say no once today, warm and short, with no reason attached. Notice how much less explaining is needed than you expected.',
    ],
    related: ['lib-dc4', 'lib-fam1', 'lib-wm4'],
  },

  'lib-cr4': {
    thesis:
      'Interviewing is not a test of your career. It is a matching problem run twice — once by them, once by you — and almost everyone prepares only for their half.',
    deep: [
      'The interviewer is not collecting your life story. They are collecting what the industry calls evidence: a small number of concrete, checkable instances that let them defend a hiring decision to someone who was not in the room. This is why an honest story with a number in it outperforms a polished story without one. You are not being assessed on how good your career sounds; you are being assessed on how easy you are to advocate for.',
      'That reframes the hardest questions. "What is your biggest weakness?" is not an invitation to a humble-brag, it is a calibration check: can you see yourself accurately? "Tell me about a failure" is the same check with a story attached. "Why are you leaving?" is a test of whether you will badmouth your current employer, which is a proxy for what you will say about them. In every case the answer that works is shorter, more specific and more honest than the one most people rehearse.',
      'The second half of the matching problem is yours, and it is the half people skip. One question about the actual constraint of the team — what has to be true in six months for this hire to have worked, and what usually stops it from being true — tells you more about the job than the entire job description, and tells them more about you than any of your answers. It also converts the interview from a test into a conversation between two people trying to decide something, which is the room you want to be in.',
      'Two practical consequences. First, silence is legal: after a hard question, two seconds of thinking reads as substance, while an immediate answer reads as a reflex. Second, do not take the job on the strength of the interview alone. The interview is a sample of one person’s behaviour in a formal room. Ask to speak to someone who will be your peer, and ask them what they would change.',
    ],
    script: [
      { who: 'Them', line: 'Tell me about a time you failed.' },
      { who: 'You', line: 'I shipped a migration two weeks late because I told the team it would take a week and never re-checked my own estimate. The cost was a frozen release and one very bad Friday.' },
      { who: 'Them', line: 'What did you change?' },
      { who: 'You', line: 'I now write the estimate down and check it with the person doing the work, not the person who wants it done. Which is why the second migration landed early.' },
      { who: 'Them', line: 'Any questions for us?' },
      { who: 'You', line: 'Two. What has to be true in six months for this hire to have worked, and what usually stops that from being true?' },
    ],
    failureModes: [
      'Preparing answers and not questions. The questions are where you find out whether you want the job, and they are also the part interviewers remember.',
      'Rehearsing until the answer sounds written. Rehearsed perfection reads as a lack of judgement about what mattered.',
      'Naming a weakness that is secretly a strength. Everyone in the room has heard "I care too much" and it costs you more than an honest one would.',
      'Treating the interview as the whole relationship. The first ninety days are the actual interview, and how you leave the room matters more than how you enter it.',
    ],
    drill: [
      'Take your three strongest stories and compress each to 45 seconds with one number and one honest caveat. Time them out loud.',
      'Write one question about their constraint. Ask it in your next interview and say nothing for five seconds after they answer.',
    ],
    related: ['lib-pr2', 'lib-pr1', 'lib-pr5'],
  },

  'lib-cr5': {
    thesis:
      'The conversation after the conversation is where most of the damage happens. A single awkward exchange survives; an awkward exchange that nobody mentions grows into a theory about the other person.',
    deep: [
      'When something goes slightly wrong between two people — a joke that missed, a decision made without somebody, a compliment that sounded like a slight — both parties run the same private process. They replay the moment, decide what it means about the other person, and then wait to see whether the other person brings it up. The waiting is the problem. Silence confirms the theory, because silence is compatible with both interpretations.',
      'The repair after a small thing is therefore not an apology. It is a reference. "I have been thinking about what I said on Tuesday and I think it landed badly" costs one sentence and closes the loop. The point is not the awkwardness itself, which has already faded; the point is that the other person no longer has an unfinished sentence in their head with your name on it.',
      'What makes this hard is a false economy. Bringing up something small feels like making it bigger, so the instinct is to let it go. But the other person has already made it bigger. You are not choosing between a small thing and a big thing; you are choosing between a small thing now and an unspoken thing that will shape how they read your next three messages.',
      'There is one exception worth knowing: do not perform repair for an audience. The public "I am sorry if anyone was offended" is a demonstration for the room, not a repair for the person. If somebody was actually hurt, they need a version of the conversation with nobody else in it.',
    ],
    script: [
      { who: 'You', line: 'Can I say one thing about Tuesday? I made that joke about the deadline and I heard how it landed a second after I said it.' },
      { who: 'Them', line: 'It is fine, honestly.' },
      { who: 'You', line: 'Good — but I wanted you to know I noticed it, rather than leaving you to wonder whether I did.' },
    ],
    failureModes: [
      'The pre-emptive apology. Apologising constantly for things nobody noticed trains people to see you as fragile.',
      'Repairing by text when it deserves a voice. Text makes the small thing feel formal and gives them time to draft a reply they do not mean.',
      'Asking "are we okay?" — it puts the burden of reassurance on the person who was on the receiving end.',
      'Deciding the other person is oversensitive. It is a convenient conclusion that makes further conversation unnecessary, which is exactly why it is tempting.',
    ],
    drill: [
      'Pick one moment from the last fortnight you have been quietly replaying and say the one-sentence reference out loud. Then actually send it, today.',
      'In your next three conversations, when you notice the other person pause oddly, name it: "that landed differently than I meant — what did you hear?"',
    ],
    related: ['lib-cr2', 'lib-dc1', 'lib-hm3'],
  },

  'lib-cr6': {
    thesis:
      'Delegation fails at the sentence, not at the trust. Most people delegate a task and accidentally keep the decisions, then wonder why the work comes back as a draft of their own thinking.',
    deep: [
      'A delegation has three parts — the outcome, the constraints, and the decisions the other person is allowed to make without asking — and almost everyone says only the first. "Can you put together the vendor comparison?" sounds complete and is missing both the standard of done and the boundary of authority. The person receiving it has to guess, and the safe guess is to produce something that can be corrected, which is why you get a draft instead of a decision.',
      'The second failure is invisible and more expensive: delegating the work while retaining the anxiety. You hand over the task and then check in daily, ask for early drafts, and rewrite the parts you would have done differently. The person learns two things — that the task is theirs and that the outcome is yours — and the second lesson is the one that sticks. Next time they wait to be told.',
      'What good delegation sounds like is deliberately unpolished: "The outcome is a one-page recommendation with a number on it. You can decide who you talk to and which three vendors you shortlist. The only thing I need to approve is the recommendation itself, and I do not want to see a draft before Thursday." Four sentences, and each one removes a decision they would otherwise have had to guess at.',
      'The last piece is the follow-up, which should be about the work and not about reassurance. "What do you need from me?" is a better question than "how is it going?" — the first presumes the task is theirs and offers support; the second invites a status report and quietly reinstates you as the person who has to be satisfied.',
    ],
    script: [
      { who: 'You', line: 'I want you to own the vendor decision. The outcome is one page, three options, a recommendation and a number.' },
      { who: 'Them', line: 'Who do I need to check with?' },
      { who: 'You', line: 'Nobody. You choose who you speak to and you pick the shortlist. I approve the recommendation on Thursday and I will not ask for a draft before then.' },
      { who: 'Them', line: 'What if I get it wrong?' },
      { who: 'You', line: 'Then we will have found out on Thursday instead of in June. What do you need from me to start?' },
    ],
    failureModes: [
      'Delegating the task and keeping the credit. It is the fastest way to make a capable person stop volunteering.',
      'The "just a quick update" check-in every morning. It is a leash with a friendly name.',
      'Rewriting the output silently. Half-delegation is worse than no delegation: they lose the learning and you lose the hours.',
      'Delegating to the person who is already overloaded because they are the one you trust. Reliability is not infinite, and this is how your best person becomes your former best person.',
    ],
    drill: [
      'Take one thing you are currently doing yourself and write the four sentences: outcome, constraints, decisions they own, when you will look. Send them today.',
      'For one week, ask "what do you need from me?" instead of "how is it going?" in every handover conversation.',
    ],
    related: ['lib-pr4', 'lib-pr2', 'lib-dc2'],
  },

  'lib-cr7': {
    thesis:
      'An honest no is not the opposite of a good relationship. It is the maintenance schedule for one — because every yes you did not mean becomes a debt that eventually gets paid with interest.',
    deep: [
      'Most people say yes for one of three reasons: the request arrived in a warm moment, the alternative is a two-second silence that feels like disappointment, or they are running a private rule that a good person is available. All three are ways of spending your future self\'s time to buy a small amount of comfort now, and all three are invisible to the person asking.',
      'The mechanics of a no that survives contact with real people are consistent. Acknowledge the ask specifically, so they know you actually heard it rather than reflexively declining. Give the shortest true reason, or none at all — a reason is not required, and a long one is an invitation to negotiate. Offer what you can genuinely do, if anything, and make it smaller than what was asked. Then stop. The stop matters because the negotiation is rarely in the request; it is in the pause afterwards.',
      'There is a version of honesty that is worse than a vague yes, and it is worth being precise about. "I would love to but I am completely swamped and I feel terrible" is a no surrounded by so much feeling that the other person ends up managing you. Honesty about your capacity is a gift. Honesty about your guilt is a request for care dressed as transparency.',
      'The long-run effect is the counter-intuitive part. People trust a clear no more than a soft yes, because a clear no is information they can plan around. The person who says yes to everything becomes slightly unreliable in a way nobody says out loud — you stop being the person they ask when the answer matters, and start being the person they ask when it does not.',
    ],
    script: [
      { who: 'Them', line: 'Could you take on the client review this quarter? I know you are busy.' },
      { who: 'You', line: 'I cannot take the review this quarter — I am already carrying two that I would have to drop, and dropping them would be worse for everyone.' },
      { who: 'Them', line: 'It would really help me out.' },
      { who: 'You', line: 'I know, and I am sorry. What I can do is read your summary on Thursday morning and tell you if it is ready. That is genuinely all I have.' },
    ],
    failureModes: [
      'The no with a runway: three sentences of preamble before the actual word, so the request has time to gather support.',
      'The false yes you plan to wriggle out of later. It is still a no; it just costs the other person a week and your reputation a little more.',
      'Offering a reason that can be solved. "I am swamped this week" invites "then do it next week" — say the constraint that is actually fixed.',
      'Saying no to the person and yes to the guilt, then doing the task badly at midnight. The worst of every option.',
    ],
    drill: [
      'Write your default no in three sentences and keep it somewhere you can find it under pressure. The reason you need it in advance is that the moment itself is not a thinking moment.',
      'Say no to one small request today with no reason attached, and stay in the conversation afterwards. The staying is the skill.',
    ],
    related: ['lib-cr3', 'lib-dc4', 'lib-mny1'],
  },

  'lib-cr8': {
    thesis:
      'You cannot control how a message lands. You can control whether the person receiving it has enough context to build a fair version of it — and most conversational damage is a context problem wearing the costume of a personality problem.',
    deep: [
      'Every message gets read through three things: your history with the sender, your current state, and whatever you assume about their intent. None of these are in the message. That is why the same sentence is affectionate from one person and barbed from another, and why "it was obviously a joke" is such a useless defence — obviousness is exactly the thing that varies.',
      'The practical implication is to send context along with content. "Short reply, not annoyed — I am typing this on a train" takes eight words and removes an entire interpretive branch. Naming your state is not oversharing; it is the equivalent of street lighting. The people who are easiest to work with are usually not the warmest, they are the most legible.',
      'The other half of this is reading generously without becoming naive. If a message is ambiguous and the relationship is good, assume the better reading and check it lightly: "I read that as a bit sharp — was that the intention?" This is not weakness; it is refusing to let an ambiguity quietly become a fact. The naive version is assuming the better reading and never checking; the cynical version is assuming the worse one and never checking. Both leave the same unfinished sentence in the room.',
      'And when you are the one being misread, the correction is one sentence, not a defence. "That came out sharper than I meant" repairs it. Explaining what you actually meant, at length, usually confirms the impression that you are more interested in being understood than in the effect you had.',
    ],
    script: [
      { who: 'You', line: 'Quick one before you read the rest: I am on a train and typing with one thumb, so if this reads blunt, it is the thumb.' },
      { who: 'Them', line: 'Got it. The deadline thing — is that a real deadline or a wish?' },
      { who: 'You', line: 'Real, and it is not mine. Which is why I am asking rather than telling.' },
    ],
    failureModes: [
      'Assuming a text has a tone. It does not — you supplied one, and then argued for it.',
      'Long explanations of intent when the other person has already told you the effect. The effect is the data; your intent is the defence.',
      'Reading everything generously and checking nothing. Context is not the same as conflict-avoidance.',
      'Naming your state as an excuse: "I am stressed, so…" explains the message and excuses nothing. Say what happened, not what you were feeling when it happened badly.',
    ],
    drill: [
      'In your next three messages that could be misread, add one clause of context: your state, your channel, or your confidence level. Notice which one people respond to.',
      'Take one ambiguous message you received this week and write the two readings — the generous one and the cynical one. Then ask the light question instead of choosing.',
    ],
    related: ['lib-cr5', 'lib-dc1', 'lib-pr5'],
  },
};
