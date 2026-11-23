// ─────────────────────────────────────────────────────────────
//  Library · Second wing, long-form chapters
//  One chapter per entry in library-extra.js, in the same shape as
//  library-deep*.js: thesis, deep[], script[], failureModes[],
//  drill[], related[].
// ─────────────────────────────────────────────────────────────

export const LIBRARY_EXTRA_DEEP = {
  // ── Small talk ───────────────────────────────────────────
  'lib-st1': {
    thesis: 'Small talk is not a test of wit. It is a joint activity of finding something to look at together.',
    deep: [
      'Most people treat an opening line as a performance they must pass. That is why they freeze: the imagined audience is judging content. The truth is that openers are judged on safety, not cleverness. The other person is running one question underneath your words — is this going to cost me something? An observation about the shared situation answers that question with a no.',
      'Shared reality is powerful because it cannot be wrong. The queue, the weather, the venue, the dog, the awful coffee, the announcement nobody can hear — you both already agree. Agreement, even trivial agreement, is the first beat of rapport, and you get it for free.',
      'The mistake is turning the observation into a question immediately. "That queue is slow, is it not?" is a closed door with a question mark. Instead, offer the observation and let it sit for a second: "This queue is moving like it is being paid by the hour." Most people will pick it up. If they do not, you have lost nothing and confirmed only that they are not available — which is information, not rejection.',
      'Read the response for investment, not warmth. Politened smiling costs nothing; adding a detail ("I have been here twenty minutes, I am starting to take it personally") is a small investment. That is your permission to continue, and it arrives within about ten seconds.',
    ],
    script: [
      { line: '"This queue is moving like it is being paid by the hour."', note: 'Observation, shared, low risk.' },
      { line: 'Them: "I have been here twenty minutes. I am starting to take it personally."', note: 'They invested. Continue.' },
      { line: '"Twenty minutes. What are you here for that is worth that?"', note: 'Fork: work door or person door.' },
      { line: '"If I am still here in ten, I am going to start reviewing the coffee."', note: 'Light, no demand, keeps the exit open.' },
    ],
    failureModes: [
      'Opening with a compliment on appearance — it demands a response about her body before you have any standing.',
      'Asking a closed question and then leaving a four-second gap, which reads as an interrogation with no answer key.',
      'Opening with something that requires the other person to be witty back (a joke, a riddle, a debate prompt). You have made them work.',
    ],
    drill: [
      'Three shared-reality openers in one day, to anyone: a barista, a colleague, someone in a queue. You are not trying to start a friendship, only to hear yourself say the sentence out loud.',
      'Record which opener got a detail added back. That is the only metric that matters.',
      'Say the observation and then deliberately say nothing for one beat. Notice how strong the urge is to rescue it.',
    ],
    related: ['lib-st2', 'lib-st6', 'lib-wm1'],
  },
  'lib-st2': {
    thesis: 'Every answer contains two doors. Most people thank the person for the answer and walk away from the building.',
    deep: [
      'Conversation dies at the point where a question can be fully answered in four words — "I am a nurse", "not much", "it was fine". That is not because the other person is boring. It is because you asked a question with a single exit.',
      'A fork is a question with two honest paths, and the second one is usually the personal one. "What made you go into nursing — or did it choose you?" Now they can answer with the job or with the story. The word "or" is the mechanism: it signals that you are interested in the person, not the fact.',
      'The second door is almost always about choice, change, or origin. Why this, how did you get here, what was it before, what would you do instead. Work is the door everyone opens; the person behind the work is the door worth opening.',
      'The discipline is to stop treating an answer as the end of a transaction and start treating it as a map. You are not looking for the next clever question; you are looking for which word in their answer has heat in it. Heat sounds like a longer sentence, a change of pace, or a small complaint.',
    ],
    script: [
      { line: 'Them: "I am in accounting."', note: 'Flat answer, single exit.' },
      { line: '"What kind — the forensic side, or the keeping-the-lights-on side?"', note: 'Fork one: work door.' },
      { line: 'Them: "Honestly? Keeping the lights on. It is boring in a way I have started to like."', note: 'Heat: they volunteered an opinion.' },
      { line: '"That is the most interesting thing anyone has said about accounting. What does boring do for you?"', note: 'Go one level deeper, not sideways.' },
    ],
    failureModes: [
      'Firing fork after fork without ever giving anything back — that is an interview with better questions.',
      'Forks that are really opinions: "What made you pick accounting — or did you just fall into it?" said with a smirk is a judgement wearing a question mark.',
      'Chasing a new topic the moment the current one gets quiet, instead of letting one topic deepen.',
    ],
    drill: [
      'Take one ordinary answer today and find both doors out loud: "what made you choose it — or did it choose you?"',
      'In your next three conversations, count how many times you changed topic instead of going deeper. Changing topic is the tell.',
      'Write down the last three things someone told you. For each, write the deeper question you did not ask. That is your map for next time.',
    ],
    related: ['lib-st1', 'lib-f4', 'lib-ei3'],
  },
  'lib-st3': {
    thesis: 'Two questions then a disclosure. That is the difference between an interview and a conversation.',
    deep: [
      'People who find small talk hard usually have one of two patterns: they ask and ask until it feels like an interrogation, or they talk and talk until it feels like a monologue. Both are the same failure — an imbalance in the trading of self.',
      'Conversation runs on reciprocity of disclosure. Two of their answers, then one of yours. Not a competing story, not advice, not a summary of what they said — a small, honest thing about you that sits on the same shelf as theirs.',
      'The disclosure should be slightly less impressive than it could be. "I only moved here two years ago and I still do not know where to get good bread" is better than a story about your promotion, because it makes you approachable and gives them something to help with. Status that nobody asked for is a wall.',
      'The rhythm also protects you. If you have given something and they have given nothing back after two rounds, the honest reading is that they are not available — and you can leave warmly without having performed for twenty minutes.',
    ],
    script: [
      { line: '"How long have you been in the area?"', note: 'Question one.' },
      { line: 'Them: "Three years. I came for work."', note: 'Short but with a hook.' },
      { line: '"What was the move like — did it get easier or harder after the first year?"', note: 'Question two, deeper.' },
      { line: '"I moved two years ago and I still do not know where to get good bread, so you are ahead of me."', note: 'Disclosure: small, honest, no status play.' },
    ],
    failureModes: [
      'Turning their disclosure into a competition ("you think that is bad, I once…"). It ends the exchange and marks you as someone who cannot be confided in.',
      'Disclosing something enormous too early, which hands them a weight they did not agree to carry.',
      'Offering advice where a disclosure was invited. "You should try…" is the fastest way to make someone stop talking.',
    ],
    drill: [
      'In one conversation today, hold to the rule: two questions, one disclosure. Count them.',
      'Make your disclosure about ten percent less impressive than the truth. Notice what happens to the other person\'s body language.',
      'Write three one-line disclosures you are comfortable offering to a stranger: where you live and how long, what you do badly, what you are currently trying to learn.',
    ],
    related: ['lib-st2', 'lib-ei1', 'lib-f3'],
  },
  'lib-st4': {
    thesis: 'Exits are remembered longer than openings. Leave while the conversation is still good.',
    deep: [
      'Most people do not struggle to start conversations nearly as much as they struggle to end them. So they wait for the conversation to die — and the last thing that happens between you is an awkward fade, which is what gets remembered.',
      'A warm exit has three parts: you name the departure, you give a generous reason, and you leave one thread hanging. "I am going to let you go before I talk your ear off. But I want to hear how Thursday goes — find me later." Nothing about that is a rejection of the other person.',
      'The generous reason is the load-bearing part. "I should go" reads as escape. "I want to let you have some of the evening" reads as care, even though both are true at once. You are not lying; you are choosing which true thing to say.',
      'The hanging thread is what turns an exit into a future. It gives the other person a reason to come back to you and a script for doing it, which is exactly what someone who finds people difficult needs — one more point of contact that is not cold.',
    ],
    script: [
      { line: '"I am going to let you go before I talk your ear off."', note: 'Name it, generously.' },
      { line: '"But I want to hear how Thursday goes — come and find me when you know."', note: 'Leave the thread hanging.' },
      { line: '"It was genuinely good to meet you, Sanjay."', note: 'Name them. Names are remembered.' },
      { line: '[Leave. Do not re-open, do not hover at the edge of the group.]', note: 'The exit only works if it is an exit.' },
    ],
    failureModes: [
      'The slow fade — drifting backwards while still talking, which is the most awkward possible ending.',
      'Over-explaining: three reasons why you must go, which signals that you believe you need permission.',
      'Leaving with a promise you will not keep ("we must get coffee") which converts a warm exit into a small lie.',
    ],
    drill: [
      'Practise the exit twice today at low stakes: end a phone call, end a chat at the water cooler. Say the sentence out loud.',
      'After one conversation, leave at the high point rather than the natural death. Notice your discomfort — that discomfort is the habit breaking.',
      'Write your own version of the three-part exit and use the identical words for a week, until the shape is automatic.',
    ],
    related: ['lib-f6', 'lib-pr5', 'lib-st5'],
  },
  'lib-st5': {
    thesis: 'A small story is three sentences and a stop. Most people add eleven sentences and a moral.',
    deep: [
      'In conversation, you are not competing with silence — you are competing with everyone else who wants the floor. Brevity is not modesty, it is the reason you get asked for another one.',
      'The shape that works in speech is smaller than the shape that works on a page: setup in one sentence (who, where), complication in one (what went wrong or strange), turn in one (what happened instead). Three sentences, then stop, before the moral.',
      'The stop is the technique. When you stop without explaining what it meant, the listener leans in, and someone will usually ask the question the story was designed to provoke. The story becomes a conversation instead of a performance. If you have ever felt people drift during your stories, the problem is almost always the last two sentences.',
      'Choose small over dramatic. A story about a bus driver who waited, shouted, then bought you a coffee is more useful socially than a story about the worst year of your life, because it costs nothing to receive and reveals a way of seeing the world.',
    ],
    script: [
      { line: '"The driver waited for me at the lights, which never happens."', note: 'Setup, one sentence.' },
      { line: '"Then he shouted at me for holding up the whole route."', note: 'Complication.' },
      { line: '"Then he bought me a coffee at the end of the line. I have been loyal to that route ever since."', note: 'Turn and stop. No moral.' },
      { line: '[Silence. Let them react or ask.]', note: 'The pause is where the conversation happens.' },
    ],
    failureModes: [
      'The moral. "The lesson is that people are complicated." Now it is a lecture with characters.',
      'Front-loading context — four sentences of who everyone is before anything happens.',
      'The escalation habit: adding details to make it bigger, which reads as exaggeration and costs you belief in everything else.',
    ],
    drill: [
      'Write three true three-sentence stories from the last month. Rehearse them out loud until the stop feels natural.',
      'In one conversation, tell a story and then physically stop — hands still, no filler. Count how many seconds before someone asked a question.',
      'Cut a story you already tell by half. Notice which half was carrying the weight.',
    ],
    related: ['lib-st4', 'lib-c3', 'lib-w3'],
  },
  'lib-st6': {
    thesis: 'Silence is not a verdict on you. It is a room the other person may be about to walk into.',
    deep: [
      'People who find conversation hard tend to experience a two-second pause as an accusation. So they fill it — with a new topic, an apology, a nervous joke. Each rescue tells the other person that silence is dangerous, and so the conversation speeds up until it has nowhere to go.',
      'The physiological truth: your discomfort peaks around second two and falls by second five. If you can stay, you teach your own nervous system that a pause is survivable, and you teach the other person that they do not have to perform either.',
      'Silence also does work that words cannot. It gives the other person space to reconsider, to add the thing they had decided not to say, or to answer more honestly than their first answer. Most of the best things people tell you arrive in the half-second after you would have interrupted.',
      'The trick is to make the pause active rather than absent: stay looking at them, keep your face open and undemanding, breathe out. A pause with attention is confidence. A pause with a phone, a glance away, or an anxious laugh is a withdrawal — same silence, opposite meaning.',
    ],
    script: [
      { line: '"What was the hardest part of that year?"', note: 'The question.' },
      { line: '[Two full seconds of nothing. Eyes level, breathe out.]', note: 'The pause, held.' },
      { line: 'Them: "Honestly? The part nobody saw. I was the one holding it together for everyone."', note: 'The sentence the pause bought.' },
      { line: '"Say more about that."', note: 'Four words. Do not rescue.' },
    ],
    failureModes: [
      'Filling the pause with a summary of what they just said, which signals impatience in the friendliest possible wrapper.',
      'Using silence as a weapon — holding it with a hard face to make someone uncomfortable. That is interrogation, not conversation.',
      'Apologising for the pause ("sorry, I am not very good at this"), which converts a moment of presence into a request for reassurance.',
    ],
    drill: [
      'In three conversations today, wait two seconds after they finish before you answer. Count them out mentally.',
      'Practise "say more about that" once. Notice that it is always enough.',
      'Sit in a cafe for five minutes and listen to two people talk. Count how rarely either of them pauses. That is the norm you are correcting.',
    ],
    related: ['lib-st1', 'lib-f5', 'lib-ei3'],
  },

  // ── Talking to women ─────────────────────────────────────
  'lib-wm1': {
    thesis: 'Approach as someone calm, not someone brave. The situation is ordinary; treat it that way.',
    deep: [
      'Men who find this hard tend to have built an enormous frame around it: an approach is a test they might fail, a performance that must be earned, a risk of humiliation. That frame is why it feels terrifying and why the behaviour it produces is strange — rehearsed lines, over-loud energy, a manic kind of confidence that everyone can hear.',
      'The reframe that actually helps: you are not asking her to like you, you are starting a conversation to find out whether you like each other\'s company. That flips the direction of evaluation, and it also happens to be the only honest version of what is going on.',
      'That is why the boring approach wins. A remark about the shared situation, a sincere question, an offer of help — each of these requires her to do nothing except respond naturally. Exciting approaches ask her to manage your ego as well as the conversation, which is precisely the cost most women are trying to avoid.',
      'Finally: it is a numbers game, and not in the cynical sense. Most conversations you start will lead nowhere, because most people do not match, and that is true regardless of how good you are. Expecting a 30% success rate removes the belief that every no is a verdict on your worth.',
    ],
    script: [
      { line: 'Approach at an angle, not head-on, and not from behind. Stop at a comfortable distance.', note: 'Body first, words second.' },
      { line: '"Excuse me — I have been trying to work out what that book is. Is it any good?"', note: 'Specific, situational, answerable.' },
      { line: 'Them: "It is terrible, honestly."', note: 'Any answer is a good answer.' },
      { line: '"Then I will leave it. I am Prabesh, by the way."', note: 'Name and a light close. No outcome demanded.' },
    ],
    failureModes: [
      'Approaching with a "technique" voice — a register you do not use with anyone else, which she will hear instantly.',
      'Standing in a way that blocks her exit or leaning into her space. She should never have to manoeuvre to leave.',
      'Continuing after two flat, uninvested answers. That is not persistence, it is pressure.',
    ],
    drill: [
      'Start three conversations with strangers today where the goal is exactly one exchange, with no attempt to continue. Get used to the sound of your own opening.',
      'Go somewhere you have a genuine reason to be. A reason makes the approach ordinary.',
      'Write down what you are actually afraid of. Most answers are "that she will think I am creepy" — which is why consent-first behaviour is a strategy, not just an ethic.',
    ],
    related: ['lib-wm4', 'lib-wm5', 'lib-st1'],
  },
  'lib-wm2': {
    thesis: 'Specific praise proves attention. General praise proves only that you were looking.',
    deep: [
      'Women receive a great deal of commentary on their appearance and rather little observation of their choices. "You are beautiful" lands in a category that has been used on her by strangers, salesmen and men who wanted something — even when you mean it sincerely, it arrives pre-used.',
      'A specific compliment does something structurally different: it can only be said by someone who was paying attention. "You were the only person who laughed at that joke" is evidence. Evidence is what credibility is made of, in every domain of communication.',
      'Praise the choice, the mind, the craft, the taste, the courage — and make it concrete enough that it cannot be recycled for anyone else. "You are so easy to talk to" is pleasant but generic. "You asked me the one question nobody asks" is specific and therefore worth believing.',
      'One per conversation, sincere, and never a prelude to a request. The moment a compliment becomes a down-payment, it stops being a compliment and becomes a tactic — and people are remarkably good at detecting tactics.',
    ],
    script: [
      { line: '"You laughed at the joke nobody else caught. I noticed."', note: 'Choice, not appearance.' },
      { line: 'Them: "It was the only funny thing anyone said."', note: 'She is engaging — good.' },
      { line: '"That is the nicest thing anyone has said to me about my terrible joke."', note: 'Play, not pressure.' },
      { line: '[Resist the urge to add a second compliment. One is credible; two is a sales pitch.]', note: 'The stop is part of it.' },
    ],
    failureModes: [
      'Complimenting appearance as the first thing out of your mouth — it defines her by her body before you know her name.',
      'Compliments that compare her to other women ("you are not like the others"), which is a slight wearing a compliment\'s coat.',
      'Complimenting then immediately asking for something (a number, a date), which retroactively converts the compliment into currency.',
    ],
    drill: [
      'Give three specific compliments this week — to women, men, anyone. Specific enough that the person could not recycle the sentence for someone else.',
      'After each one, say nothing more and observe. Practise the stop.',
      'Write one sentence about a person you know that is true, specific, and about a choice rather than a feature. Say it to them.',
    ],
    related: ['lib-c3', 'lib-wm3', 'lib-st3'],
  },
  'lib-wm3': {
    thesis: 'Move one rung at a time, and check for the nod before the next rung.',
    deep: [
      'Flirtation is not a speech; it is a conversation with a direction. What most men lack is not courage but calibration — the sense of how fast to move, and the willingness to stop when the answer is not a yes.',
      'The ladder: warmth (an ordinary friendly exchange), curiosity (real questions about her), play (a light tease or a callback, given gently), personal (a question that costs something to answer), invitation (a clear, low-cost ask). One rung at a time, with a beat in between.',
      'The check is reciprocation. If she matches the rung — teases back, asks you something real, adds detail she did not need to add — you may climb. If she does not, hold at the current rung and enjoy what you actually have. Two unmatched rungs in a row means the ladder ends here, and that is not failure; it means you found out early.',
      'This is also the ethical core of flirting, not a technique for avoiding consequences. Making the temperature something you keep checking rather than something you announce is what consent actually looks like in a conversation: continuous, mutual, and revocable at any rung.',
    ],
    script: [
      { line: 'Warmth: "You have been here longer than me — is the coffee worth the queue?"', note: 'Rung zero.' },
      { line: 'Curiosity: "What is the thing you are trying to do this year that nobody asks about?"', note: 'Rung one. Real question.' },
      { line: 'Play: "So you are one of those people who reads the manual. I am one of the ones who complains about the manual."', note: 'Rung two — gentle, about you both, no insult.' },
      { line: 'Them: "I have been complaining about the manual for two years." → Invitation: "I am going to be here again on Thursday. You should tell me whether you made it work."', note: 'Invitation, low cost, easy to decline.' },
    ],
    failureModes: [
      'Skipping to rung four (a date request) with no curiosity and no play — it lands as a cold transaction.',
      'Teasing as a way to test whether she likes you. A joke that stings is not flirting, it is a power move with a smile.',
      'Reframing a clear no as a challenge. "Her loss" or "she was playing hard to get" is how people talk themselves into being unsafe.',
    ],
    drill: [
      'Practise the ladder with warmth and curiosity only, on three people you have no romantic interest in. The skill is the calibration, not the outcome.',
      'After every conversation, write which rung you reached and where the reciprocation stopped. Do it five times; your calibration improves faster than any other practice.',
      'Write down, honestly, what you do when someone does not reciprocate. That behaviour is your whole character.',
    ],
    related: ['lib-wm2', 'lib-wm5', 'lib-wm4'],
  },
  'lib-wm4': {
    thesis: 'How you receive a no is what the next woman hears about you.',
    deep: [
      'A refusal is over in three seconds, but how you handle it is what gets remembered — by her, and by the people who saw. "No problem at all, enjoy your evening" costs you nothing and marks you as safe. Anything else costs you your standing in a room you may return to.',
      'The reflex to explain yourself, to negotiate, or to withdraw visibly all come from treating the no as a verdict about your worth. It is not. It is one person, in one moment, with information you do not have. Someone has to be the person who accepted it graciously — that person gets to try again tomorrow.',
      'Practise the physical recovery too: shoulder down, face easy, step back and away rather than turning sharply. The body delivers the message before the sentence lands.',
      'And do not narrate it afterwards. Telling a group "she shot me down" converts your private disappointment into her public trial. Men who do that wonder why women avoid their group.',
    ],
    script: [
      { line: 'Them: "No, I am fine, thank you."', note: 'The no.' },
      { line: '"No problem at all. Enjoy your evening."', note: 'Five seconds, warm, complete.' },
      { line: '[Step back, turn at an angle, return to what you were doing.]', note: 'Body confirms the words.' },
      { line: '[Say nothing further. Not a long look, not a sigh, not "your loss".]', note: 'The silence is the test.' },
    ],
    failureModes: [
      'Negotiating: "No pressure, just a coffee" is the same request with an argument attached.',
      'Punishing her socially — commenting to your friends, joking at her expense, going cold and pointed. Everyone sees it.',
      'Over-apologising, which makes your self-worth her responsibility and turns a short moment into a long one.',
    ],
    drill: [
      'Ask for something small with a high chance of refusal this week — a discount, a spare seat, a favour. Practise the warm no.',
      'Rehearse the exact sentence "no problem at all, enjoy your evening" until it needs no thought.',
      'Notice any urge to narrate the refusal to someone later. That narration is the habit to break.',
    ],
    related: ['lib-wm1', 'lib-wm5', 'lib-dc5'],
  },
  'lib-wm5': {
    thesis: 'Friendliness is a default. Interest costs something. Look for what she spent.',
    deep: [
      'The most common failure in this arena is not boldness or shyness — it is misreading politeness as attraction. Professional warmth, customer service, and social habit all produce smiling, nodding and answering. None of it is a signal.',
      'Investment is different because it costs something. She asks a question back. She adds detail you did not request ("my sister is a nurse too, she said the same"). Her answers get longer as the conversation continues. She keeps the thread alive when you pause. She returns your tease. She stays when she could leave, or she asks where you are going next.',
      'Look for the pattern, not the moment. One long answer could be a chatty day; three increasing messages, plus a question, plus a re-initiation, is a pattern, and patterns are what you act on.',
      'Then verify with one low-cost invitation — one specific, refusable, low-stakes ask. A warm yes is a yes. "Maybe, I am not sure, I will let you know" is a no, and there is no next move; the kindest and strongest thing available is to accept it and behave the same way as before. Assuming a warm yes is the whole skill; everything else is noise.',
    ],
    script: [
      { line: '[They have asked you two questions and added unrequested detail.]', note: 'Investment is present.' },
      { line: '"There is a place on that same street that does a decent version of this. Do you want to escape here for an hour on Saturday?"', note: 'One specific ask, easy to refuse.' },
      { line: 'Them: "I would actually, yes."', note: 'Warm yes. That is the answer you needed.' },
      { line: 'Them: "Maybe — I have a lot on, I will let you know." → "No worries at all." Then behave exactly as before.', note: 'Not a warm yes. Treat as a no, with grace.' },
    ],
    failureModes: [
      'Reading a service-industry smile as interest — she is at work, and that is her job.',
      'Escalating the invitation because the first one was soft: "just a quick coffee" after a no, then "a drink", then "why not".',
      'Testing her interest by touching or crowding. There is no verdict at the end of that road that makes it acceptable.',
    ],
    drill: [
      'Over the next week, note three conversations where someone invested. Write exactly what they did. Build a personal list of what investment looks like.',
      'Practise one low-cost invitation in a non-romantic setting (an offer to a colleague, a friend) to get comfortable with a refusable ask.',
      'Keep a list of the times something was not a warm yes and you treated it as one. This is the single fastest way to spare yourself and others.',
    ],
    related: ['lib-wm3', 'lib-wm4', 'lib-ei3'],
  },

  // ── Difficult conversations ──────────────────────────────
  'lib-dc1': {
    thesis: 'Start from the third story — the version a neutral observer could tell — and neither party has to be the problem.',
    deep: [
      'In a difficult conversation each person arrives with a story in which they are reasonable and the other person is the obstacle. Opening with that story forces the other person to defend before they can listen. That is why "I feel that you have been ignoring me" produces the argument you were trying to avoid.',
      'The third story is the version an outsider would describe: "I think we are trying to achieve your deadline and my quality bar, and we are each getting frustrated with the other." It is factually acceptable to both sides, and it puts the disagreement in the middle of the table rather than in the chest of one person.',
      'Next, name your contribution without waiting to be accused. "I have been avoiding the conversation, and the silence has probably read as sulking." Owning your part first is not weakness; it removes the need for the other person to establish your guilt, which is the thing that makes them loud.',
      'Then be clear about what you actually want. "I am not asking for an apology, I am asking for a different way of doing the next one." Vague feelings need a concrete request, or the conversation ends with everyone emotional and nothing changed.',
    ],
    script: [
      { line: '"I think we want different things from this project and we are each getting frustrated. Can we look at it together?"', note: 'The third story.' },
      { line: '"I have been avoiding this conversation, so the silence has been my part."', note: 'Own the contribution first.' },
      { line: '"What does a good outcome look like for you from here?"', note: 'Their interest, out loud, without your rebuttal.' },
      { line: '"So what I am asking for is X for the next two weeks, and X for me is Y. Does that work for you?"', note: 'A concrete request from a concrete offer.' },
    ],
    failureModes: [
      'Leading with the accusation and then suggesting "we talk like adults" — the third story cannot survive an opening attack.',
      'Using the frame as a trick while still needing to win, which people detect within two sentences.',
      'Skipping the concrete request, so the conversation feels resolved and the behaviour does not change.',
    ],
    drill: [
      'Take a current irritation and write it as a third story in one sentence. If it contains blame, rewrite it.',
      'Name your own contribution to a mess this week — at work or at home — before anyone names it for you.',
      'Ask "what does a good outcome look like for you?" in one difficult conversation and then say nothing until they finish.',
    ],
    related: ['lib-dc2', 'lib-dc3', 'lib-ei2'],
  },
  'lib-dc2': {
    thesis: 'Observation, impact, request — a boundary stated without a verdict on anyone\'s character.',
    deep: [
      'Most boundaries fail at the wording. "You are always late" is a character claim with "always" in it, so the argument becomes about whether you are right to say it — and about all the times they were not late. The actual request never gets heard.',
      'The three-part form fixes this. Observation: what a camera would record, with no "always" and no interpretation. Impact: what it cost you, concretely and personally. Request: what you want instead, phrased so it can be accepted or refused.',
      'Impact is the part people skip, and it is the part that makes the request legitimate. Without it the request sounds arbitrary; with it, you are not demanding a preference, you are reporting an effect and proposing a fix.',
      'The request must be doable and re-answerable. "I need a heads-up by Thursday" can be agreed to and checked. "I need you to respect my time" sounds stronger and means nothing in practice, so nothing changes and you will be having this conversation again in a month.',
    ],
    script: [
      { line: '"When the report came in on Monday rather than Thursday,"', note: 'Observation. No always, no verdict.' },
      { line: '"I had to apologise to the client and rebuild the schedule over the weekend."', note: 'Impact — concrete, personal, non-accusatory.' },
      { line: '"Going forward I need a heads-up by Thursday. Can you do that?"', note: 'Request, doable and refusable.' },
      { line: 'If they refuse: "Then I need to change how the client work is scheduled. I wanted to tell you before I did that."', note: 'A boundary without the request is only a preference.' },
    ],
    failureModes: [
      'Burying the request in a paragraph of feelings, so the listener cannot find the action item.',
      'Using "I feel" as a shield for an accusation: "I feel that you do not respect me" is still a character claim.',
      'Threatening consequences you will not enforce, which teaches people exactly how seriously to take your boundaries.',
    ],
    drill: [
      'Take one recurring irritation and write it in three sentences: observation, impact, request. Read it aloud. Cut any word that is a verdict.',
      'Deliver one small boundary this week where the stakes are low, so the form becomes familiar before you need it.',
      'Notice the word "always" in your speech today and replace it with a date.',
    ],
    related: ['lib-dc1', 'lib-dc4', 'lib-pr4'],
  },
  'lib-dc3': {
    thesis: 'An apology that asks for forgiveness is not finished. Name it, own it, repair it, change it.',
    deep: [
      'Most apologies are actually explanations: "I am sorry, but I was exhausted and you know how I get". The "but" moves the cause from your choice to your circumstances, and the other person hears that they are being asked to accept a reason instead of an apology.',
      'The complete version has four parts and no "but". Name what you did specifically, without softening it. Own the effect on them. Repair anything repairable, which usually means a public correction if the harm was public. And state what will be different, not as a promise about your character but as a change in behaviour.',
      'Intent is the trap. "I did not mean it that way" is true almost always and irrelevant almost always — the harm happened at the receiving end. If you want to include intent, do it after ownership, as information rather than as a defence.',
      'And then stop. Do not ask whether they are okay with you, do not seek reassurance, do not require them to accept it on your timeline. The apology is complete when you have said it; their acceptance is theirs to schedule.',
    ],
    script: [
      { line: '"I said your work was sloppy in front of the team. That was out of order."', note: 'Specific, unsoftened, no but.' },
      { line: '"It embarrassed you in front of people whose opinion matters to you. That is on me."', note: 'Own the effect.' },
      { line: '"I have already told them that was mine to have raised privately."', note: 'Repair what is repairable.' },
      { line: '"The next one I bring to you first, before anyone else hears it."', note: 'Changed behaviour, checkable.' },
    ],
    failureModes: [
      'The conditional apology ("I am sorry if you felt…") which apologises for their feelings rather than your action.',
      'The fast apology designed to end your own discomfort — audible to everyone as relief, not repair.',
      'Apologising and then re-litigating the disagreement in the same breath, which un-apologises what you just said.',
    ],
    drill: [
      'Write one outstanding apology in four sentences. Cut every "but", "if", and "you know how I am".',
      'Deliver the smallest real one this week — the longer it waits, the more it costs.',
      'Next time you catch yourself explaining, stop mid-sentence and say the ownership line instead.',
    ],
    related: ['lib-dc1', 'lib-ei4', 'lib-f2'],
  },
  'lib-dc4': {
    thesis: 'A no with an alternative and a preference is a higher-status answer than a reluctant yes.',
    deep: [
      'Most people say yes because refusing feels like conflict. Then they deliver badly, resent the asker, and the relationship quietly degrades — which is a worse outcome than the two minutes of discomfort a clear no would have cost.',
      'The one-job no refuses the request while protecting the relationship: you name your constraint honestly, you offer what you can genuinely do, and you ask them to choose. That structure tells the other person you take them seriously enough to negotiate with rather than manage.',
      'The critical ingredient is the preference. "I can do either, whatever works" hands the decision back and lets them optimise at your expense. "I would rather hold Friday" is a position, and positions are what make you someone worth negotiating with.',
      'You will be tested on this by people who are used to your yes. Expect one round of pressure; answer it with the same sentence, calmly, rather than a new justification. A no that changes shape under pressure was never a boundary, only a preference with better marketing.',
    ],
    script: [
      { line: '"I want to be straight with you: if I take this on this week, the thing I promised by Friday slips."', note: 'Name the constraint, not an excuse.' },
      { line: '"I can hold Friday, or hand this to Priya. Which would you rather?"', note: 'Offer what is genuinely possible.' },
      { line: '"I would rather hold Friday, honestly."', note: 'A preference is the load-bearing part.' },
      { line: 'Pressure: "It is just a small thing, though." → "It is small, and it is still the thing that makes Friday slip. So: hold Friday, or Priya?"', note: 'Same sentence, not a new argument.' },
    ],
    failureModes: [
      'The apologetic no that offers five reasons, each of which can be argued with.',
      'Saying yes and then not delivering — a slow no paid for by your credibility.',
      'The no that turns into a referendum on the relationship: "you always dump things on me at the last minute."',
    ],
    drill: [
      'Refuse one small request this week with the three-part shape: constraint, alternative, preference.',
      'Write your default sentence for the most common ask in your life — extra work, a favour, a last-minute plan — and rehearse it.',
      'When you feel the urge to add a second reason, notice it and stop. One reason is a boundary; three reasons is a negotiation you have already lost.',
    ],
    related: ['lib-dc2', 'lib-pr4', 'lib-pr3'],
  },
  'lib-dc5': {
    thesis: 'A clean ending is kinder than a fade. Ambiguity is the same rejection, paid in instalments with hope as interest.',
    deep: [
      'People avoid endings because they want to avoid causing pain. So they go quiet, become busy, answer more slowly — and the other person lives in a state of hope that costs them weeks. The pain is not avoided; it is redistributed, with interest, and it lands on someone who cannot ask what happened.',
      'The clean version tells the truth without a case for the prosecution: what is ending, that it is a decision rather than a punishment, and — importantly — that there is nothing they can fix. "You have not done something wrong that you can fix" is often the most useful sentence in the conversation, because otherwise they will spend a month looking for the mistake.',
      'Choosing is the other half. Endings that linger because of a final meeting, a last try, "one more weekend" prolong the ambiguity. Pick a date, say it clearly, and keep it. A decision that can be revisited is not a decision.',
      'And expect it to feel worse, not better, in the moment. Clean endings produce a sharp, short pain; fades produce a long, quiet one and a person who is convinced they are unloveable. That trade is worth choosing deliberately.',
    ],
    script: [
      { line: '"I have been thinking about this for a while, and I do not think we should carry on."', note: 'The decision, stated plainly, no ambiguity.' },
      { line: '"You have not done something wrong that you can fix. I want to be honest rather than gradual."', note: 'Removes the false task of fixing it.' },
      { line: '"I am not going to leave this open. I am sorry, and I did want to tell you in person."', note: 'Close the ambiguity, address the pain.' },
      { line: '"Is there anything you want to say? I have got time."', note: 'Give them their say, without reopening the decision.' },
    ],
    failureModes: [
      'Leaving it open ("I just need some space") when you have already decided, which buys you comfort with their hope.',
      'A list of character faults delivered as an exit — that is not honesty, it is the last word.',
      'Disappearing instead of ending it, and then being surprised that you are considered cruel.',
    ],
    drill: [
      'Write the four sentences you would say. Read them out loud once, so the first time you say them is not the moment it matters.',
      'Notice where you want to leave a door open. Ask whether you are leaving it open for them or for you.',
      'If you are on the receiving end of a fade, practise the direct question: "I would rather know — is this over?"',
    ],
    related: ['lib-dc1', 'lib-wm4', 'lib-ei5'],
  },

  // ── Emotional depth ──────────────────────────────────────
  'lib-ei1': {
    thesis: 'Match their depth, then go one small step further. Not five.',
    deep: [
      'Depth in conversation is reciprocal, and it is governed by the same logic as any exchange: neither person wants to be the only one exposed. When one person is much more revealing than the other, the more exposed person feels unsafe and the less exposed person feels burdened.',
      'The calibrated move is match plus one. If they say "work has been heavy", you do not respond with your father\'s illness; you respond with a question one step past where they stopped — "what is the heaviest part of it?" — and you offer your own equivalent when the moment opens.',
      'Over-disclosure feels like intimacy to the person doing it and like an obligation to the person receiving it. Under-disclosure feels like coldness. One rung deeper is the whole craft, and it applies in friendships, dating, family, and the strange middle-distance of colleagues who have become something like friends.',
      'The tell that you have gone too deep is a response that gets loud and formal at once — a summary sentence, a subject change, or the sudden involvement of your own situation. Step back down one rung, warmly, without apologising. Nothing has been broken.',
    ],
    script: [
      { line: 'Them: "Work has been heavy."', note: 'Rung two.' },
      { line: '"What is the heaviest part of it at the moment?"', note: 'One rung past. Question, not confession.' },
      { line: 'Them: "I think it is the part where I cannot complain about it."', note: 'They moved first. Now you match.' },
      { line: '"I recognise that — last year I was the one telling everyone it was fine. It was lonely in a way I did not expect."', note: 'Match plus one, in your own experience.' },
    ],
    failureModes: [
      'Flooding — disclosing three personal things and giving the other person no opening to respond at their pace.',
      'Interviewing deep immediately with a stranger; depth questions land as intimacy only after ordinary ground has been walked.',
      'Making yourself the subject of their disclosure ("that happened to me too, and…") which turns empathy into airtime.',
    ],
    drill: [
      'In one conversation today, respond to a disclosure with a question one step past it. Note what happens.',
      'Write a "match plus one" reply to a common disclosure so the pattern is available to you in the moment.',
      'Notice one time you over-disclosed. What were you hoping for? Most often it is reassurance, and there is a better way to ask for it.',
    ],
    related: ['lib-ei2', 'lib-ei3', 'lib-st3'],
  },
  'lib-ei2': {
    thesis: 'Feel, fact, then fix. Never repair before they are heard.',
    deep: [
      'When someone is upset, the instinct to help is a reflex that arrives before the information. So you offer solutions — and solutions are read as: what you are feeling is a problem I would like you to stop having.',
      'The three-beat order works because it mirrors what a person actually needs. First the feeling is named, which is what "being understood" literally means. Then the fact is established, which shows you were listening rather than playing a role. Only then, and only with permission, does the fix appear.',
      'Asking permission is the part almost nobody does. "Do you want ideas, or do you just want to be heard?" is one sentence and it prevents the most common scene in every relationship: the person in pain explaining why the advice is not right.',
      'The same order works at work. A colleague whose project collapsed does not need your root-cause analysis in the first eight seconds; they need "that is a horrible week" and enough quiet to believe you said it.',
    ],
    script: [
      { line: '"That sounds exhausting."', note: 'Name the feeling. Nothing else yet.' },
      { line: '"So you were doing both jobs for a month and nobody noticed."', note: 'Show the fact is registered.' },
      { line: '"Do you want ideas, or do you just want to be heard?"', note: 'Ask permission before repairing.' },
      { line: 'Them: "Just heard." → "Then I am not going to solve it."', note: 'The reframe that earns trust.' },
    ],
    failureModes: [
      'The silver lining ("at least you learned something"), which is a demand that they feel differently.',
      'Competing stories: "the same thing happened to me, only worse."',
      'Fixing without being asked, then feeling rejected when the fix is not appreciated.',
    ],
    drill: [
      'In three conversations where someone reports a difficulty, respond with only a feeling word and no advice. Sit with the discomfort of not helping.',
      'Ask the permission question once this week. Note the answer.',
      'Record your own ratio for one conversation: how many sentences of listening versus sentences of solution.',
    ],
    related: ['lib-ei5', 'lib-ei1', 'lib-dc1'],
  },
  'lib-ei3': {
    thesis: 'Surface questions have correct answers. Real questions cost something to answer.',
    deep: [
      'Most conversational questions are requests for data: where do you work, how long, do you like it. They are useful for finding the surface but they cannot take you below it, because they can be answered without the person being in any way present.',
      'A question that costs something cannot be answered by a stranger\'s reflex. "What were you afraid would happen?" "What part of that is still with you?" "What would you do if it could not fail?" "When did you last feel really good about something you did?" These ask the person to hand over something real.',
      'Cost is the mechanism, not a side effect. A question that costs the answerer something proves that the asker is not afraid of the answer — which is the definition of a room you can be honest in. This is why good interviewers and good friends feel structurally similar.',
      'The safety requirement is real: cost only works where there is already enough trust to pay it. With a stranger at a party, the first cost question should be small — about something they care about, not something they carry. Read the answer: a short, deflecting reply means step back down to surface for a while.',
    ],
    script: [
      { line: '"What is the thing you care about that nobody asks you about?"', note: 'A small cost. Good opener into depth.' },
      { line: 'Them: "That is a big question."', note: 'A signal, not a refusal. Let them find it.' },
      { line: '"Take your time. I am not going anywhere."', note: 'The line that makes depth safe.' },
      { line: '"What would make the next year feel like it went well?"', note: 'Big, forward-facing, answerable.' },
    ],
    failureModes: [
      'Cost questions as an opening move with someone you just met, which asks for intimacy before you have earned it.',
      'Asking a real question and then responding with your own comparable story instead of following up.',
      'Using depth questions instrumentally — as a technique to make people feel close to you, with no intention of holding what they say.',
    ],
    drill: [
      'Choose one question from the list above and ask it of someone you already know. Then say nothing for three seconds.',
      'Write the answer you would give to each one. Depth questions you cannot answer are hard to ask sincerely.',
      'After one deep conversation, write down what the other person would say you now know about them. If it is only facts, the questions stayed on the surface.',
    ],
    related: ['lib-ei1', 'lib-st6', 'lib-st2'],
  },
  'lib-ei4': {
    thesis: 'Name the unspoken thing. It gives both people permission to stop performing.',
    deep: [
      'Awkwardness in a room is usually not caused by an unknown thing; it is caused by a known thing nobody will say. Everyone can feel it, so everyone performs normality, and the performance is what makes the room unbearable.',
      'Naming it is a one-sentence act with a disproportionate effect: "I notice we have both been very polite for ten minutes." "I have been avoiding this because I do not want to get it wrong." "This is the first time we have been in a room alone since the argument." You have said the thing out loud, without blame and without a demand.',
      'The naming must be low-temperature and about the room rather than the person. "You are being weird" is a verdict; "I think we are both being a bit careful" includes you and turns it into a shared observation, which is the version people can agree with out loud.',
      'It also fails gracefully. If the other person dismisses it, you have still shown that you are willing to be the one who speaks plainly, which is a reputation worth having. If they accept it, the relief in the room is immediate and often surprising.',
    ],
    script: [
      { line: '"I think we are both being a bit careful here."', note: 'The room, not the person. Includes you.' },
      { line: 'Them: "…yes, probably."', note: 'Permission accepted. Now say the true thing.' },
      { line: '"So: I was wrong about the flat, and I have been avoiding the conversation."', note: 'The real content, delivered plainly.' },
      { line: '"I would rather we said the awkward version than had an easy evening and got nowhere."', note: 'Names the trade explicitly.' },
    ],
    failureModes: [
      'Diagnosing the other person: "you are being passive-aggressive" is a label, not a naming.',
      'Naming and then immediately backing away from the content, so the room is opened and left open.',
      'Using it as a way to force a conversation they are not ready for — naming the room is an invitation, not a lever.',
    ],
    drill: [
      'In one awkward moment this week, say the sentence "I think we are both being a bit careful". Notice the temperature change.',
      'Write the unspoken thing in your own family or team. Say it — once — with no blame attached.',
      'Practise in a low-stakes setting: a group chat gone quiet, a meeting nobody is enjoying.',
    ],
    related: ['lib-ei2', 'lib-dc1', 'lib-f2'],
  },
  'lib-ei5': {
    thesis: 'Someone in grief needs a witness, not a solution. Presence is the support.',
    deep: [
      'When someone is in real pain, we reach for words that will make the room tolerable for us. "Everything happens for a reason", "at least they are not suffering", "you will meet someone else" — every one of these is an instruction to feel differently, and every one lands as a small abandonment.',
      'What actually helps is unambitious: showing up, staying, and being honest about your own inability to fix anything. "I do not know what to say. I am here and I am not going anywhere" is more useful than any sentence invented to ease the silence.',
      'The other discipline is memory. Grief lasts far longer than sympathy, so the message in month three matters more than the flowers in week one. "I remember today is a year. I have not forgotten" is the kind of line people carry for decades.',
      'And keep whatever you offer concrete. "Let me know if you need anything" transfers the work back to someone who has none to spare. "I am bringing food on Thursday at six; I will leave it at the door" is help that does not require them to coordinate.',
    ],
    script: [
      { line: '"I do not know what to say."', note: 'Honesty is the only correct opening.' },
      { line: '"I am here, and I am not going anywhere."', note: 'Presence, not commentary.' },
      { line: '"Do you want to talk about him, or do you want me to just sit here?"', note: 'Give them the choice they rarely get.' },
      { line: '"I am bringing food on Thursday at six and leaving it at the door."', note: 'Concrete help, no coordination needed.' },
    ],
    failureModes: [
      'The repair reflex: offering explanations, silver linings, or lessons.',
      'Venerating the departed rather than listening to the living. They may need to say something unsentimental.',
      'Going quiet after the funeral, when the second and third months are harder than the first.',
    ],
    drill: [
      'Write down five things never to say to someone grieving, and one thing to say instead: "I am here."',
      'Set a reminder for a month from now to message anyone you know who is going through something.',
      'Practise sitting in silence for two minutes after someone says something sad. Do not fill it.',
    ],
    related: ['lib-ei2', 'lib-ei1', 'lib-st6'],
  },

  // ── Professional ─────────────────────────────────────────
  'lib-pr1': {
    thesis: 'Claim the floor with one sentence, make one point, hand it back.',
    deep: [
      'Many people with good content say nothing in meetings, because they are waiting for a gap and for the perfect contribution. The gap never arrives and the perfect contribution is never available in real time, so they leave having been silent and are remembered as quiet rather than as thoughtful.',
      'The reliable way in is the interjection with a purpose: "One thing before we move on —" is a sentence that requests the floor without aggression and buys you the two seconds to assemble a thought. Signalling that your contribution is short is what makes people happy to give you the floor.',
      'One point, not a survey. "I think we are deciding this before we know who owns it" is a contribution. Five related observations is a monologue, and monologues are punished socially even when they are right.',
      'Then hand the floor back deliberately: "That is all from me." Small, structured contributions repeated weekly build a reputation for judgement far faster than one long impressive speech, which mostly builds a reputation for length.',
    ],
    script: [
      { line: '"One thing before we move on —"', note: 'The floor request. Brief and accepted.' },
      { line: '"I think we are deciding this before we know who owns it, and that will bite us in a fortnight."', note: 'One point, one consequence.' },
      { line: '"That is all from me."', note: 'Deliberate hand-back. The most underrated sentence in meetings.' },
      { line: '"Happy to take that offline if it is a longer conversation."', note: 'Protects the meeting from your own idea.' },
    ],
    failureModes: [
      'Speaking only when the stakes are high, so your first contribution in months is a fully-formed opinion on the biggest issue.',
      'Adding "does that make sense?" or "sorry, just a quick thought" — the apology removes the status the contribution earned.',
      'Contributing an idea and then defending it for ten minutes, which converts a contribution into a fight.',
    ],
    drill: [
      'Make one intervention in your next meeting, using "one thing before we move on" and "that is all from me".',
      'Prepare exactly one sentence per meeting in advance. One is achievable; a lecture is not.',
      'Count your contributions in each meeting. The goal is frequency with brevity, not volume.',
    ],
    related: ['lib-pr3', 'lib-pr2', 'lib-dc4'],
  },
  'lib-pr2': {
    thesis: 'Interview answers are judged on sequence, not brilliance: situation, obstacle, action, result.',
    deep: [
      'Questions like "tell me about a time you handled conflict" are not invitations to be interesting. They are tests of whether you can structure an account of your own behaviour, which is a proxy for whether you can do it in the job.',
      'SOAR gives the sequence: one line of situation, one line of obstacle (the part most people omit, which is also the part that reveals whether there was anything to overcome), two lines of action with your reasoning, one line of measured result. Six sentences. Almost nobody does this, which is why it stands out.',
      'The result needs a number, or at least a comparison. "It went well" is not information. "We shipped eleven days late but under budget, and the client renewed" is. Numbers are also a memory aid under pressure: if you can remember the number, the rest of the story tends to follow.',
      'Rehearse five of these against the job description you are actually applying for, not against your life history. A great story that does not map to what they are hiring for is a story about you, not an answer about the role.',
    ],
    script: [
      { line: '"We were eight weeks from a launch and the vendor pulled out."', note: 'Situation and obstacle in one line.' },
      { line: '"I re-sequenced the roadmap so the client-facing work kept its date and the internal tooling slipped."', note: 'Action one, with reasoning.' },
      { line: '"I told the client the honest numbers before they asked, which is why they stayed."', note: 'Action two — the behaviour they are hiring for.' },
      { line: '"We shipped eleven days late and 4% under budget, and the contract renewed."', note: 'Measured result.' },
    ],
    failureModes: [
      'Ninety seconds of context before anything happens, so the interviewer has to work out what the obstacle was.',
      'Answering with a team story in which you did nothing identifiable ("we decided…").',
      'No result, or a result that is a feeling ("everyone was relieved").',
    ],
    drill: [
      'Write five SOAR answers for the five competencies in a job you would actually apply for. Read each out loud in under 70 seconds.',
      'Record yourself once. Count the sentences before the obstacle appears.',
      'Add a number to every result. If there is no number, produce a comparison.',
    ],
    related: ['lib-pr1', 'lib-pr5', 'lib-bz4'],
  },
  'lib-pr3': {
    thesis: 'Bring a decision, not a problem: two options, one recommendation, one request.',
    deep: [
      'Managers are saturated with problems. Almost every message they receive is a person describing difficulty and waiting for direction, which means the scarce commodity — and therefore the visible one — is somebody who arrives with the situation already structured.',
      'The upward one-liner has four parts: two options, a recommendation, a question about ownership. "A is faster and risky, B is slower and safe. I recommend A. Do you want me to run it?" It is under fifteen seconds and it demonstrates judgement, honesty about trade-offs, and respect for their authority at once.',
      'The "do you want me to run it" is the part that distinguishes this from a unilateral decision. You are not asking permission to think; you are offering a recommendation and a clear point at which they can intervene. That combination is what promotion conversations are quietly about.',
      'It also protects you. A recommendation that was accepted is a shared record that you were thinking; a problem you dumped is remembered as a problem you owned.',
    ],
    script: [
      { line: '"Two options on the client thing."', note: 'Signal the structure. They can stop you if it is a bad moment.' },
      { line: '"A: we absorb the cost and keep the date. B: we renegotiate the date and keep the margin."', note: 'Two real options, honest about the trade.' },
      { line: '"I recommend B, because the date was our error and margin was not."', note: 'One recommendation with a reason.' },
      { line: '"Do you want me to run it, or do you want to be in the room when I tell them?"', note: 'An ownership question, not a permission request.' },
    ],
    failureModes: [
      'Presenting two options that are obviously unequal — the recommendation becomes theatre.',
      'Raising the problem with no options because you wanted thinking-partner time. That is legitimate; say so ("I need twenty minutes of thinking out loud").',
      'Asking "what should I do?" after the recommendation, which hands the decision back and erases the point of the exercise.',
    ],
    drill: [
      'Convert your next problem into the four-part shape before you message anyone. Send it that way.',
      'Write down which one you would pick and why, before you speak. The recommendation is a skill, so practise deciding.',
      'Ask for a decision explicitly at the end of three interactions this week. Notice how often silence replaced a clear answer.',
    ],
    related: ['lib-pr1', 'lib-dc4', 'lib-bz1'],
  },
  'lib-pr4': {
    thesis: 'Trade scope, quality or time — never quietly absorb the shortfall in your own health.',
    deep: [
      'Deadline pressure usually arrives as a statement rather than a negotiation: "this needs to be done by Thursday". The person who says "I will manage" has agreed to absorb the impossible part personally, and the organisation learns nothing about the cost.',
      'The alternative is to make the constraint explicit and put the choice where it belongs: "I can have it Thursday if I drop the QA pass, or Monday with it. Which matters more to you?" You have not refused; you have surfaced the actual trade. Managers make that choice competently all the time when they are shown it.',
      'The same move handles scope creep. "I can add that, and something else moves. Which one do you want to move?" Overwork is rarely the result of one big demand; it is the result of hundreds of small unexamined ones, each of which seemed too trivial to negotiate.',
      'Never trade sleep silently. Sacrifice that nobody records is not repaid — it becomes the new baseline, and the next request assumes it.',
    ],
    script: [
      { line: '"I can do Thursday, but only if the QA pass goes."', note: 'State the real constraint first.' },
      { line: '"Or Monday with QA. Which matters more to you?"', note: 'The choice belongs to them.' },
      { line: '"That is fine — and it means the reporting piece moves to the following week."', note: 'Scope creep handled the same way.' },
      { line: 'If both are demanded: "Then I can do neither well, and I would rather tell you that today than on Friday."', note: 'The honest stop, early, not late.' },
    ],
    failureModes: [
      '"I will manage", which is a promise you cannot keep and which teaches them that the capacity exists.',
      'Raising the constraint on Thursday morning, when the only remaining variable is your own suffering.',
      'Absorbing it once "just this time" — the exception becomes the expectation by the second month.',
    ],
    drill: [
      'Next time you are given a deadline, name one thing that would have to move. Say it in the same conversation.',
      'Write down the last three times you absorbed an impossible deadline silently. What did it cost, and what did the other person learn?',
      'Ask one manager or client: "If these two things both have to happen this week, which one wins?"',
    ],
    related: ['lib-dc4', 'lib-pr3', 'lib-dc2'],
  },
  'lib-pr5': {
    thesis: 'Two lines within 24 hours: reference, value, one ask.',
    deep: [
      'Almost nobody follows up, which is why the people who do seem unusually effective. The follow-up is also the only part of networking that is actually in your control: you cannot make someone interesting, you can reliably send a good message the next day.',
      'Two lines is the form. Line one references something specific they said, which proves you were listening and not collecting contacts. Line two offers something small or asks one clear question. No paragraph about your background, no request to pick their brain, no calendar link.',
      'The offer matters more than the ask. A link to the thing they said they were looking for, a one-line introduction, a note about the book they mentioned — a follow-up that gives first is remembered; one that takes first is filed under sales.',
      'Within 24 hours, without exception. A follow-up sent four days later arrives after the memory of you has cooled, and the specificity that made it good reads as slightly strange. Send it the same evening if you can; latency is the whole game.',
    ],
    script: [
      { line: 'Subject: the sensor question. Line one: "You said you were stuck on finding a supplier who would do small batches."', note: 'Reference, specific, one line.' },
      { line: 'Line two: "I know one — Maya at Kestrel, she did 200 units for my last team. Want an intro?"', note: 'One offer, one ask, no paragraph.' },
      { line: '[Send within 24 hours. Nothing else in the message.]', note: 'The brevity is the point.' },
      { line: 'If no reply in a week: one short nudge, then stop. Two follow-ups is the maximum; three is pressure.', note: 'Know when the sequence ends.' },
    ],
    failureModes: [
      'The generic "great to meet you, let us connect" — it costs nothing, proves nothing, and gets nothing.',
      'The long message about everything you do, sent as a follow-up, which invites a response to your CV rather than to the conversation.',
      'Sending it two weeks later, when the specific reference now sounds like research.',
    ],
    drill: [
      'Write a two-line follow-up template with blanks for the reference and the ask. Fill it in twice this week.',
      'Practise one offer-first message to someone you have no request of.',
      'Track follow-ups you sent versus replies. The ratio is usually better than people expect, and the data kills the fear.',
    ],
    related: ['lib-pr2', 'lib-st4', 'lib-bz4'],
  },

  // ── Business ─────────────────────────────────────────────
  'lib-bz1': {
    thesis: 'Three questions before one sentence about yourself. The buyer diagnoses; you prescribe.',
    deep: [
      'The instinct on a sales call is to explain what you do, because you are worried it is not yet clear. But explanation before diagnosis is a claim about relevance made by someone with no evidence, and buyers are trained to discount it.',
      'The sequence that works is situation, problem, implication. Where are you now, what is annoying about it, what does that annoyance cost you in time, money or morale. The implication question is where the sale is actually made: "how many hours a week does that eat? and what does that time cost you?" You are not persuading anyone; you are helping them count something they have been avoiding counting.',
      'Only once the cost has been said out loud by the buyer does your solution stop being a pitch and start being an obvious next step. People do not buy products; they buy the removal of a cost they have just acknowledged in their own voice.',
      'This also protects you from doing free work for the wrong buyer. If someone will not engage with the implication conversation, they will not buy, and you have saved yourself two proposals, three calls and a follow-up.',
    ],
    script: [
      { line: '"How are you handling the scheduling today?"', note: 'Situation. Boring, necessary.' },
      { line: '"What is the most annoying part of doing it that way?"', note: 'Problem. Let them complain properly.' },
      { line: '"How many hours a week does that eat, and what does that time cost you?"', note: 'Implication. The sale happens here.' },
      { line: '"So the tooling question is really a question about a day a week. That is what I would want to fix first."', note: 'Only now do you talk about the fix.' },
    ],
    failureModes: [
      'Pitching first and then asking diagnostic questions that are really just invitations to admire the pitch.',
      'Asking implication questions that lead to a number you already have, which the buyer can feel.',
      'Skipping situation and going straight to implication with a stranger — it reads as a trap, because it is one.',
    ],
    drill: [
      'On your next call, commit to three questions before any description of what you do.',
      'Write the implication question you would ask for your product in one sentence. Get a number for it.',
      'Practise letting silence sit after the implication question. The buyer fills it with the cost.',
    ],
    related: ['lib-bz2', 'lib-pr3', 'lib-bz4'],
  },
  'lib-bz2': {
    thesis: 'Never argue with an objection. Agree with the concern, then move the axis of comparison.',
    deep: [
      'An objection is a fear stated as a fact. "You are too expensive" means "I am afraid of spending this and looking foolish". Arguing with it — "actually, we are competitively priced" — confirms the fear by treating it as a claim to be defeated.',
      'Agreement first defuses the defence: "You are right that we are the most expensive option." Nobody expects it, and the concession buys you the credibility to say the next sentence.',
      'Then move the axis. The objection was framed on price-in-month-one; you reframe to total-cost-in-year-two, or risk, or the cost of a failed implementation. "The question is whether the cheaper one costs you more in the second year — the last client moved at month twelve." You are not disputing their frame; you are offering a different, more useful one.',
      'Close by handing the choice back rather than pressing: "which risk is easier for you to own?" That sentence treats the buyer as an adult and makes the decision theirs, which is the only version that survives to signature.',
    ],
    script: [
      { line: 'Them: "That is a lot more than the other quote."', note: 'The objection.' },
      { line: '"You are right, we are the most expensive option on the table."', note: 'Agree. No defence.' },
      { line: '"The question I would want answered is what the cheaper option costs you in year two — the last client moved at month twelve."', note: 'Move the axis.' },
      { line: '"Which risk is easier to own: the price, or the second year?"', note: 'Their decision, explicitly.' },
    ],
    failureModes: [
      'Reeling off features in response to a price objection, which signals that you heard "insufficient value" and are now listing.',
      'Discounting immediately to end the discomfort, which teaches the buyer that the price was invented.',
      'Agreeing so enthusiastically that you talk yourself out of the sale ("yes, we are very expensive").',
    ],
    drill: [
      'List your three most common objections. Write the agreement sentence for each, out loud, until it is automatic.',
      'Write the second axis for each: what is the true comparison your buyer should be making?',
      'In your next negotiation, say the agreement sentence and then stop talking for three seconds.',
    ],
    related: ['lib-bz1', 'lib-bz3', 'lib-bz4'],
  },
  'lib-bz3': {
    thesis: 'Name the number once, then let the silence do the work.',
    deep: [
      'Price is delivered, not discussed. The most common error is to state a figure and then keep talking — justifying, qualifying, offering options — because the silence feels unbearable. Every additional sentence after the number reduces it.',
      'Say the figure in the middle of a sentence, flatly, at normal volume. "Based on that scope, the number is 12,400." No apology, no "around", no "we could probably". Then nothing at all.',
      'The principle underneath: the first person to speak after the price either defends it or concedes it. If you fill the silence, you are defending. If they fill it, they are usually conceding something — a budget range, a decision date, an internal champion.',
      'Expect discomfort. The silence after a figure is only about four seconds long in reality, and it is the most profitable four seconds in the conversation. Practise it with small numbers first — a quote for a favour, a rate for a small job — so the reflex is trained before the big one.',
    ],
    script: [
      { line: '"Based on that scope, the number is 12,400."', note: 'Flat, mid-sentence, no hedge.' },
      { line: '[Silence. Do not add a single word. Breathe out.]', note: 'The four seconds that decide it.' },
      { line: 'Them: "That is more than I had in mind."', note: 'They moved first. Now you can negotiate.' },
      { line: '"What did you have in mind, and what would have to be true for it to work?"', note: 'You are still not discounting. You are diagnosing.' },
    ],
    failureModes: [
      'Qualifying immediately ("but we could look at scope") — you have negotiated against yourself.',
      'Rounding down pre-emptively before anyone has objected.',
      'Delivering the number apologetically, quieter and faster than the rest of the sentence, which signals you do not believe it.',
    ],
    drill: [
      'Practise saying a number out loud in a flat voice, then waiting, in an empty room. Ten times. The reflex is physical.',
      'Next quote you send, remove every hedge word: around, approximately, flexible, happy to discuss.',
      'In one conversation about money this week, be the second person to speak.',
    ],
    related: ['lib-bz2', 'lib-bz4', 'lib-f5'],
  },
  'lib-bz4': {
    thesis: 'Volunteer one real limitation and everything else you say becomes believable.',
    deep: [
      'Buyers assume that pitches are edited. So the more uniformly excellent your claims, the more discount they apply — and the discount is invisible, which is what makes it so damaging.',
      'A volunteered weakness inverts the dynamic. "The thing this is weakest at is reporting — it is slow, and if you need instant dashboards I am not your best option" does three things at once: it proves you know your product, it demonstrates you are not editing, and it hands the buyer a test they can run, which makes every other claim verifiable.',
      'The weakness must be real and must matter to someone. Cosmetic flaws ("we are almost too responsive") are transparent and make the whole pitch smell worse than no concession at all.',
      'Use it early, before the objection arrives. Volunteered, it is credibility. Extracted, it is a confession. Same fact, opposite effect — the timing is the entire trick.',
    ],
    script: [
      { line: '"Before you ask: the weakest part is reporting."', note: 'Early, volunteered, unprompted.' },
      { line: '"It is slow, and if you need instant dashboards, I am not your best option."', note: 'Real, specific, matters to someone.' },
      { line: 'Them: "We do need dashboards, actually."', note: 'Good — that is the conversation you want now, not in month three.' },
      { line: '"Then let us look at whether the export covers it. It probably covers 80% of what you described."', note: 'Honest again. The credibility compounds.' },
    ],
    failureModes: [
      'Fake weaknesses designed to be praised ("I work too hard").',
      'Confessing something deal-breaking in a way that wastes their time — the goal is credibility, not self-sabotage.',
      'Volunteering the weakness after they have discovered it, which retroactively converts honesty into concealment.',
    ],
    drill: [
      'Write your three genuine limitations in one sentence each, in buyer language.',
      'Say one out loud at the start of your next pitch and watch the room\'s response.',
      'After each pitch, ask yourself: what did they learn that I did not want them to learn? Answer that first next time.',
    ],
    related: ['lib-bz1', 'lib-bz2', 'lib-pr3'],
  },
};
