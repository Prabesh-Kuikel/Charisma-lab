// ─────────────────────────────────────────────────────────────
//  Chapters for the Written & Async wing
//
//  Lazy-loaded with the other chapters (see src/local/chapters.js), so
//  the six new playbooks cost nothing on first load until someone
//  opens one.
//
//  Same shape as every other chapter: a thesis you could argue with,
//  three to five paragraphs of depth, a copyable script, failure modes
//  named honestly, a drill, and cross-links.
// ─────────────────────────────────────────────────────────────

export const WRITTEN_DEEP = {  'lib-wr1': {
    thesis: 'A message does not contain a tone. The reader supplies one, usually from their own mood and their history with you — which is why the same line can land warm on Monday and cold on Friday.',
    deep: [
      'This is not a failure of writing skill. Speech carries prosody: pitch, pace, pauses, the half-smile. Remove all of it and a sentence becomes a bare proposition that the reader must score emotionally themselves. They use three inputs to do it: what they know about your intentions, how the last exchange ended, and their own current state. You control exactly none of those at read time. You control only the words and the timing.',
      'The two things readers use to infer tone are ambiguity of intent ("what does he actually want from me?") and ambiguity of regard ("is he annoyed at me?"). Both get resolved in the reader\'s head with the most negative plausible answer, because a negative answer is safer to act on than a positive one. This is why brevity reads as coldness and why "ok" is the most dangerous word in the language.',
      'The unreliable fix is decoration: exclamation marks, emoji, "haha", deliberate misspellings. It gets read as effort, and effort in a message about nothing reads as anxiety. The reliable fix is to remove the guesswork. Name the ask. Name the regard. "Can you send the file by Thursday? No rush if it slips to Friday — I just need to know which." That message has no tone at all, and therefore cannot be misread.',
      'There is one more move that is underused: the pre-emptive disclaimer. "Nothing is wrong, I just want to ask you something" costs six words and disarms an entire category of misreading before it starts.',
    ],
    script: [
      { who: 'You', line: '"Can you send the file by Thursday? No rush if it slips to Friday — I just need to know which."' },
      { who: 'You', line: '"I am not annoyed, I am just being brief — that is a text problem, not a you problem."' },
      { who: 'You', line: '"Nothing is wrong. I have a boring logistics question."' },
    ],
    failureModes: [
      'Adding warmth by decoration — more exclamation marks, more emoji, more "haha" — which reads as anxiety rather than friendliness.',
      'Assuming the reader has your context. They have your last three messages and a bad mood.',
      'Apologising for the message before sending it ("sorry to bother you") — you have now made the message an imposition and told them so.',
      'Using brevity as efficiency with people who read brevity as coldness. Know your reader.',
    ],
    drill: [
      'Take the last message that got a confusing reply. Rewrite it as one ask, one deadline, one clause of regard. Send the rewrite as a follow-up without explaining why.',
    ],
    related: ['lib-wr3', 'lib-wr4'],
  },
  'lib-wr2': {
    thesis: 'Response time is a signal you cannot switch off. You can only decide what it says.',
    deep: [
      'Human beings treat delay as information. In every study of reciprocity, longer gaps between turns correlate with lower engagement — and readers are exquisitely sensitive to changes in a person\'s usual rhythm. If you normally reply in ten minutes and one day take eight hours, that gap will be read as something, even if you were on a train with no signal.',
      'The three readings are warmth, status, and punishment. Fast replies read as warm or available. Slow replies read as busy, important, or cold. And after any friction, a sudden slowdown reads as a verdict: "he has decided something about me". This is why silence after an argument is more painful than any reply — the absence is interpreted, and it is interpreted as the worst available meaning.',
      'You cannot opt out. Claiming you "do not play games with reply times" is honest but does not change what the other person reads. What you can do is choose a rhythm deliberately and keep it stable, because stability is what removes the signal. A person who reliably answers logistics within a day and feelings within a few hours is not sending any message at all, and that is the goal.',
      'When you genuinely need time, say so. One line — "I want to answer this properly, give me until tonight" — converts a silence that reads as avoidance into a wait that reads as care. It is the single highest-return message in written communication, and almost nobody sends it.',
    ],
    script: [
      { who: 'You', line: '"I want to answer this properly — give me until tonight."' },
      { who: 'You', line: '"I went quiet because I did not know what to say, not because I did not care. Here is the honest answer."' },
      { who: 'You', line: '"I am bad at same-day replies and it is never about you. If something is urgent, call me and I will pick up."' },
    ],
    failureModes: [
      'Deliberately delaying a reply to seem busy — it reads as busy to you and as rejection to them, and only one of those is happening.',
      'Leaving an emotionally loaded message unanswered for days because you do not have the right words. Silence is a message with worse words.',
      'Matching someone else\'s slow replies as a form of protest. You are both now in a silent contest nobody will win.',
      'Apologising repeatedly for reply speed. Once is courtesy; five times is a request for reassurance.',
    ],
    drill: [
      'Find the message you have been avoiding. Send one line saying when you will answer it. Notice that the dread drops before you have answered anything.',
    ],
    related: ['lib-wr6', 'lib-wr3'],
  },
  'lib-wr3': {
    thesis: 'Written conflict has none of the three things that de-escalate conflict: tone, timing, and the sight of the other person softening.',
    deep: [
      'A live argument carries continuous repair. You hear the wobble in their voice and soften. You see their face change and stop. You can say "hang on, that came out wrong" and it lands in the same second. Written conflict removes all of it and replaces it with three accelerants: a permanent record you can re-read, an audience who may see it later, and latency, which lets both parties construct their case instead of resolving it.',
      'That is why the same disagreement that would take four minutes on a call consumes three days by text and ends with both people quoting each other\'s worst sentence. Neither party is being unreasonable. The medium is doing it.',
      'The move is not to write more carefully. Careful writing in a conflict reads as legal drafting, which escalates. The move is to change channels the moment you notice the temperature rising — and to notice early, at the point where you are constructing an argument rather than answering a question.',
      'If a call is impossible, change the register instead: fewer words, one question, no case-building. A three-sentence message ending in a time to talk does more repair than a beautifully written paragraph, because the paragraph is still an argument and the three sentences are still an offer.',
    ],
    script: [
      { who: 'You', line: '"This is getting long and I do not want to get it wrong. Can we talk at 6?"' },
      { who: 'You', line: '"I think we read that differently. I am not trying to win this. Call tonight?"' },
      { who: 'You', line: '"I am not going to do this by text — it will come out wrong. I am free tonight and tomorrow morning."' },
    ],
    failureModes: [
      'Writing the paragraph. You will send it, and it will be received as a lawyer\'s letter regardless of how fair it is.',
      'Quoting their worst line back at them, which guarantees they defend the sentence instead of the point.',
      'Going silent with no return ticket — that is read as a verdict, and it escalates in a different direction.',
      'Using "I am just being honest" as cover for scoring points. Honesty in writing is mostly indistinguishable from precision cruelty.',
    ],
    drill: [
      'In your next written disagreement, send three sentences maximum, ending with a time to talk. Do not send a fourth.',
    ],
    related: ['lib-dc1', 'lib-wr2'],
  },
  'lib-wr4': {
    thesis: 'Multiple asks in one message produce one reply, and it is never the important one.',
    deep: [
      'A reader triaging a message looks for the cheapest way to discharge it. Three asks present three exits, and the easiest exit is the one that gets taken: the quick yes, the one they can answer from memory, or worse, the thumbs-up that acknowledges everything and commits to nothing. The important ask dies quietly, and you find out three days later.',
      'This is not laziness. It is how attention works under load. A message with one request has one obvious action; a message with four has a small project, and projects get scheduled. Splitting the message converts a project into four actions, each of which can be done in the thirty seconds between meetings.',
      'The structure that survives busy readers: the ask in the first line, the deadline and the consequence in the same line, the context underneath and clearly optional. "Quick ask: approve the £2k budget by Thursday? Context below, no need to read it if the answer is yes." A reader can now answer without reading the rest, which is exactly what you want.',
      'Say what happens if you hear nothing. Silence should be a decision rather than a limbo, for them and for you: "If I do not have it by Thursday I will assume no and re-plan." That sentence alone converts most vague threads into answers, because it makes the cost of not replying explicit without being a threat.',
    ],
    script: [
      { who: 'You', line: '"Quick ask: can you approve the £2k budget by Thursday? Context below, no need to read it if the answer is yes."' },
      { who: 'You', line: '"If I do not have it by Thursday I will assume no and re-plan — that is fine, I just need to know."' },
      { who: 'You', line: '"A no is genuinely useful here — it lets me move on today."' },
    ],
    failureModes: [
      'Three asks in one message. You will get one answer, and statistically not the one that mattered.',
      'Burying the ask under two paragraphs of background. The background is for the people who say yes.',
      'Following up with "just bumping this" and no new information — it adds pressure without adding a reason to reply.',
      'Asking two people the same question in one thread, which guarantees neither feels responsible.',
    ],
    drill: [
      'Open your drafts and find a message with more than one request. Split it, put each ask in its own first line, and send them separately.',
    ],
    related: ['lib-cr1', 'lib-wr1'],
  },
  'lib-wr5': {
    thesis: 'Every channel carries a default weight. Sending heavy content in a light channel insults the content.',
    deep: [
      'Channels are not neutral pipes. A meme thread, a voice note, an email, a letter, a call — each arrives with a built-in register, and the reader applies that register before they parse the content. Heavy news arriving in the light channel reads as a joke or as an ambush, depending on which sentence they reach first.',
      'The reverse failure is more common at work: light content in a formal channel creates dread. A subject line of "Quick question" above three paragraphs makes people brace for bad news, and by the time they reach "what do you want for lunch" they are annoyed at you for the adrenaline.',
      'Choosing well is mostly a matter of matching three variables: weight (how much this changes something), intimacy (how close you are), and the need for a response. Endings, apologies, and bad news want a call or a voice. Coordination and warmth are fine in text. Formal channels are for anything that may be forwarded.',
      'And the universal fix, when you are unsure: one line naming the weight before the content. "Nothing is wrong, I just want to ask you something." It costs six words and removes the entire guessing layer.',
    ],
    script: [
      { who: 'You', line: '"Nothing is wrong — well, something is, but I am not angry at you. Read this one properly."' },
      { who: 'You', line: '"Logistics, not drama. Two quick things."' },
      { who: 'You', line: '"Can I call you in ten minutes? I would rather say the rest out loud."' },
    ],
    failureModes: [
      '"We need to talk" with nothing after it — dread with no release, and the cruellest sentence in modern messaging.',
      'Sending bad news at midnight, when you cannot answer a reply and they cannot sleep.',
      'Using a group chat for something that only two people should see.',
      'Putting an apology in a DM to a person you owe a call. It reads as an attempt to minimise, because it is one.',
    ],
    drill: [
      'Send your next piece of heavy news with a weight marker in the first line and a call offered in the last.',
    ],
    related: ['lib-wr3', 'lib-wr6'],
  },
  'lib-wr6': {
    thesis: 'A voice note is warmer than text and cheaper than a call — for the first forty seconds.',
    deep: [
      'Voice restores the thing text removes: prosody. Your hesitation, your laugh, your ordinary warmth all arrive without having to be manufactured in punctuation. For anyone you cannot see often, a forty-second note does more for the relationship than a week of well-written messages.',
      'It is also the most abused format in messaging, because rambling is easier than composing. A three-minute recording is not intimacy; it is a monologue the other person cannot interrupt, and it converts a message into an appointment. Most people postpone it, which is the opposite of the intended effect.',
      'Forty seconds is the working limit: long enough for a short story plus a question, short enough to be heard immediately, on a train, with one ear. Structure it like a tiny story — the thing that happened, what it made you think, one question back — and it stops being a download and becomes a conversation.',
      'The last rule is a triage rule: if the message contains a decision, a date, a name or a number, put it in text as well. Voice is for warmth and story. Logistics in audio get lost, and the person has to replay you three times to extract a time, which is a small cruelty dressed as friendliness.',
    ],
    script: [
      { who: 'You', line: '"Something happened today that you will find funny — [story]. It made me think about what you said about quitting. Did you actually do it?"' },
      { who: 'You', line: '"This is too long for a voice note. Are you free for ten minutes tonight?"' },
      { who: 'You', line: '"Voice note coming, but the actual question is: are you around Thursday?"' },
    ],
    failureModes: [
      'Sending the rambling take. It is not intimacy, it is a monologue with no exit.',
      'Burying an ask at minute two, where it will be missed and you will have to follow up anyway.',
      'Re-recording five times. The fifth take sounds like a hostage statement and takes the warmth you were trying to send.',
      'Voice-noting someone who has told you, directly or not, that they prefer text.',
    ],
    drill: [
      'Send one voice note under forty seconds: a story, what it made you think, one question. Put any logistics in text.',
    ],
    related: ['lib-wr2', 'lib-wr5'],
  },
};
