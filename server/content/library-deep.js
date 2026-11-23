// ═══════════════════════════════════════════════════════════
//  Library · long-form chapters (batch 1 of 4)
//  Adds: deep prose, a worked script, failure modes,
//  a practice drill, and cross-links to course days
// ═══════════════════════════════════════════════════════════

export const LIBRARY_DEEP = {
  'lib-f1': {
    thesis:
      "A blank mind is not a knowledge problem, it is a sequencing problem. You have plenty to say; you simply cannot find the entrance while four people watch. The buy-time question buys the entrance.",
    deep: [
      "When a question catches you cold, your working memory collapses to roughly one slot. You are simultaneously trying to work out what the asker means, whether you are qualified to answer, and how to begin — and those three tasks compete for the same tiny space. That is why the answer that eventually arrives is usually worse than the one you would have given five seconds later, alone in a corridor. The blankness is not ignorance. It is contention.",
      "The fix is not to think faster, it is to stop pretending you have already thought. Ask a question back: \"What made you ask that?\" or \"Is this about the launch or the budget?\" You have now done four things at once. You have bought eight to twelve seconds. You have found out what they actually want. You have flattered them by treating the question as worth clarifying. And you have converted a performance into a conversation, which is a far easier state to think in.",
      "The subtlety is in the tone. A deflecting question sounds like evasion; a curious question sounds like care. The difference is whether you look interested or cornered when you ask it — so keep your eyes on them, slow down, and let the question sound like it matters to you. If it does not sound like it matters, do not ask it; use the naming version instead: \"Let me give you the honest version — I've got three threads here and I want to pick the right one.\"",
      "Then answer with a structure, not with your whole knowledge. Point, reason, example, point. Four beats, ninety seconds, done. The buy-time question has bought you the time to choose a structure; spend it on structure rather than on trying to remember a better fact.",
    ],
    script: [
      { who: 'Them', line: "So where do you see this going in the next two years?" },
      { who: 'You', line: "Which part — the product, or the team?" },
      { who: 'Them', line: "The team, mostly. I'm worried we're hiring for the current shape of the company." },
      { who: 'You', line: "Then here's my honest read. Point: we're about to hire two people for a company that won't exist in eight months. Reason: everything we've built this year has been a bet that hasn't resolved yet. Example: we hired a generalist in March to run support and she's now effectively our product manager. Point: so I'd rather hire one person who can be re-shaped than two who fit today." },
    ],
    failureModes: [
      'Asking it every time. Used repeatedly, the buy-time question stops being curiosity and becomes a tic. Once or twice in a conversation, at genuine moments of ambiguity.',
      'Asking and then not listening. If they answer and you steam ahead with a prepared point, you have exposed the question as a stall. Their answer must visibly shape your reply.',
      'Using it on a hostile question. In a hostile setting, a question back can read as evasive. There, name the difficulty first: "That deserves a better answer than my first one."',
    ],
    drill: [
      'In the Arena, take one turn where you deliberately reply to the persona with a clarifying question instead of an answer.',
      'Notice whether their next disclosure is more useful than anything you would have guessed.',
      'Then in an Impromptu recording, deliberately open with two seconds of silence and a single clarifying sentence before your point.',
    ],
    related: ['lib-f2', 'lib-f7', 'lib-c5'],
  },

  'lib-f3': {
    thesis:
      "Three follow-ups before one opinion is the cheapest way to be remembered as fascinating while doing almost none of the talking — and it is not a trick, because curiosity genuinely does produce better conversations.",
    deep: [
      "Most conversations are two people taking turns to be interesting. That is why they feel like work. The Triple Follow-Up breaks the turn-taking pattern: instead of responding with your own story, you go one level deeper on theirs. \"What happened next?\" — \"How did that feel at the time?\" — \"What did you do about it?\" Three questions, no story from you, and the other person will leave describing you as easy to talk to.",
      "The reason this works is depth rather than breadth. A single question gets you the headline; three questions get you the person. Most people move on to a new topic out of politeness, afraid of prying. In practice the opposite is true: people are usually waiting for someone to ask the second question, because almost nobody does. Being the person who asks the second question is a genuine social advantage and it costs you nothing.",
      "The third question does specific work. The first two are about events and feelings; the third is about agency — what did you do? It moves the conversation from report to reflection, and that is the level at which people say things they actually mean. A conversation that never reaches the third question feels pleasant and forgettable, like small talk with better vocabulary.",
      "One constraint keeps this from turning into an interrogation: you must offer something small in return. A brief recognition — \"that sounds exhausting\" — or a one-line admission of your own, placed between questions, keeps the exchange reciprocal. Three questions and no self-disclosure is an interview; three questions with a small offering is intimacy.",
    ],
    script: [
      { who: 'Them', line: "I just moved here from Manchester. Bit of a shock, honestly." },
      { who: 'You', line: "What's been the biggest shock?" },
      { who: 'Them', line: "The noise. And nobody says hello on the street." },
      { who: 'You', line: "That would get to me — I'm from a village where everyone's in your business. How have you been handling it?" },
      { who: 'Them', line: "Badly, at first. Then I started running at six in the morning because the city's empty then." },
      { who: 'You', line: "And has that changed how you feel about living here, or just how you cope with it?" },
      { who: 'Them', line: "...That's a good question. Actually it's changed it. I know the place now." },
    ],
    failureModes: [
      'Rapid-fire questions with no reciprocity. That is an interview, and the other person will start giving shorter answers to make it stop.',
      'Asking a follow-up you do not care about. Insincerity is detectable in the follow-up\'s specificity: "how did that feel?" asked flatly lands as form-filling.',
      'Skipping the third question. Without the agency question you never get past reporting, and reporting is not memorable.',
    ],
    drill: [
      'In the Arena, run a conversation where you ask three follow-ups before offering any opinion or anecdote of your own.',
      'Check the curiosity score in the summary — this drill should push it above 75.',
      'In real life, do it once today with someone you normally exchange logistics with.',
    ],
    related: ['lib-c3', 'lib-c5', 'lib-f4'],
  },

  'lib-f4': {
    thesis:
      "Everything someone says contains free information they did not know they were offering. Conversations die when you step over the offering to find a more interesting topic.",
    deep: [
      "The first sentence anyone says in a new conversation is dense with usable material, and almost all of it gets discarded. \"I just came from the gym\" offers: the gym, the time of day, the habit, the body, the reason they are out afterwards. \"I work in logistics\" offers: the industry, the daily frustration, why they chose it, what they would rather do. The material for forty minutes is already in the room. You do not need a better topic; you need to stop leaving the offered material on the floor.",
      "The technique is a simple rule: when someone gives you free information, go three levels deeper before changing subject. Gym → which gym → what do you do there → how long have you gone there. Each level is a question, and each question is answered with more free information for the next level. This is why some people can talk to anyone for an hour without an interesting topic and others die after ninety seconds of real conversation.",
      "The key move most people miss is using a *detail* rather than a *category*. \"The gym, nice\" is a category and it kills the thread. \"The gym at eight in the morning — is that a discipline thing or a sleep thing?\" is a detail forked into two options, either of which is a genuine answer. Forking also helps because it refuses the yes/no trap: give people a choice between two interests and they will pick one and explain themselves.",
      "And then the exit is graceful, because you can leave the thread open rather than changing topic abruptly: \"I want to come back to the gym thing, but first — you said you were about to move.\" Nothing you were given is wasted, and nothing is dropped awkwardly.",
    ],
    script: [
      { who: 'Them', line: "Long day. I just came from the gym, actually." },
      { who: 'You', line: "At this hour? Is that discipline or is it the only slot you can get?" },
      { who: 'Them', line: "Only slot. I've got two kids, so it's the gym or nothing." },
      { who: 'You', line: "Two kids and you're here. What does the gym actually give you — is it the body or the hour of silence?" },
      { who: 'Them', line: "Honestly? The silence. The body's a side effect." },
      { who: 'You', line: "That's the most honest reason I've heard tonight. What happens to you on the weeks you miss it?" },
    ],
    failureModes: [
      'Answering instead of asking. Every time you respond to free information with a fact about yourself, you have closed the thread.',
      'Changing subject too early. Three levels is the minimum depth at which a thread starts producing anything worth remembering.',
      'Asking category questions ("what do you do?"). They produce one-word answers and one-word answers are conversation graveyards.',
    ],
    drill: [
      'In the Arena, find the free information in the persona\'s first line and go three levels deeper before anything else.',
      'Write down which level produced the most interesting disclosure.',
      'Next real conversation: take the first thing someone offers and go three questions deep, offering one small thing of your own between questions.',
    ],
    related: ['lib-f3', 'lib-c3', 'lib-v6'],
  },

  'lib-f6': {
    thesis:
      "How you leave is remembered longer than how you arrived. A warm exit makes you a person with options; a slow fade makes you a person who could not find one.",
    deep: [
      "Exits are the most neglected part of social skill, and the most diagnostic. Most people handle them one of two ways. They fade — hovering at the edge of a group, contributing less, drifting until the conversation dies around them. Or they escape — seizing on any excuse and vanishing, leaving the other person mid-sentence. Both produce the same residue: a slight awkwardness that outlasts everything said before it.",
      "The warm exit has three components. First, a *reason that protects the other person*: \"I want to let you go before I monopolise you.\" Note the framing — you are not escaping them, you are being considerate. Second, *evidence you were listening*: name one specific thing you want to follow up. Third, a *concrete next step*, even a tiny one: \"I'll send you that article.\" That converts an ending into a continuation, and continuations are what relationships are made of.",
      "Why this matters disproportionately: endings are the peak-end. People do not remember the average quality of a conversation, they remember its most intense moment and its finish. A perfectly fine twenty minutes fading into \"well, I should probably circulate\" becomes a forgettable encounter, while a mediocre conversation with a crisp, specific exit becomes a name they remember later.",
      "In groups, exits need a slightly different move: address the exit to the group and the thank-you to the individual. \"I'm going to grab some air — Priya, genuinely, the signposting thing is going to live in my head for a week.\" You have left the group without making them responsible for your leaving, and you have given one person a specific gift on your way out.",
    ],
    script: [
      { who: 'You', line: "Maya, I'm going to let you go before I monopolise you for the whole evening." },
      { who: 'Them', line: "You're fine, honestly." },
      { who: 'You', line: "I'm going to anyway, because I want to follow up properly — the thing you said about the market being too patient is going to annoy me all week, in a good way. I'll send you the paper on smallholder sensor longevity, since we're clearly the only two people here who'd read it." },
      { who: 'Them', line: "Please do. That's genuinely the first useful thing anyone's said tonight." },
      { who: 'You', line: "Then I'll quit while I'm ahead. Good to meet you properly." },
    ],
    failureModes: [
      'The apology exit: "Sorry, I should go, I hope that\'s okay." Nothing to be sorry for; the apology makes your leaving a cost you are imposing.',
      'The unresolved exit: naming a follow-up and never doing it. This is worse than no follow-up, because you have proved your specific attention was a technique.',
      'The slow fade. Standing at the edge of a group not speaking is interpreted, by everyone, as waiting for a better option.',
    ],
    drill: [
      'In the Arena, end a conversation using an explicit warm exit rather than just stopping.',
      'In real life, leave one conversation today with a reason that protects them, one specific detail, and one concrete next step.',
      'Write yourself the next-step line so you cannot forget it — and then actually send it.',
    ],
    related: ['lib-c4', 'lib-f5', 'lib-c3'],
  },

  'lib-g1': {
    thesis:
      "Displaying your talent too brightly makes the people above you feel insecure, and insecure superiors act against you. The solution is not to be worse — it is to make your contribution feel like their idea.",
    deep: [
      "This law is widely misread as flattery, which is both distasteful and ineffective. Its actual claim is structural: the person above you is measured by their judgement, so an idea that arrives from below without their fingerprints on it is a threat rather than an asset. They must either adopt it and look like they were led, or reject it and look stubborn. Most choose a third way — quiet delay — and your excellent idea dies of scheduling.",
      "The remedy is to give them ownership before you give them content. Early, informally, and without an audience: \"I've been going in circles on the pricing thing — could I borrow your brain for ten minutes?\" You now have a conversation in which the idea emerges jointly, and their fingerprints are on it from the first minute. When it is later proposed in a meeting, they will defend it as their own, because it is.",
      "The second half of the law is about visibility. Credit in public, substance in private. When something works, let them narrate it to the room and be visibly comfortable with that. What you get in exchange is something more durable than applause: the reputation, with them, of a person whose work arrives without friction. That reputation is the actual currency of advancement.",
      "There is a boundary worth naming. This is not advice to be servile or to hide your competence. You are building a track record that must be legible to everyone else — so be excellent in public, just be *strategically unthreatening*. The distinction: never let a superior be surprised by your ability in front of an audience that matters to them. Surprise them in private instead, where it reads as promise rather than competition.",
    ],
    script: [
      { who: 'You', line: "Do you have ten minutes this week? I keep hitting a wall on the pricing structure and you've done this three times." },
      { who: 'Boss', line: "What's the wall?" },
      { who: 'You', line: "I think we're pricing the wrong thing — we're charging for seats when the value is in the integration hours. But I don't trust my own read on it yet." },
      { who: 'Boss', line: "Hm. Send me the numbers and let me think about it." },
      { who: 'You', line: "Will do. And if you land on something, I'm happy to build the model and take it to the Tuesday group under your name — you'll get the questions you actually want asked." },
    ],
    failureModes: [
      'Copying them in on a finished deck the night before the meeting. This is the classic outshining move: it presents a fait accompli and forces them to either endorse something they did not shape or delay it.',
      'Winning the argument in front of their boss. Even if you are right, you have cost them the most expensive thing they own.',
      'Taking this to the point of invisibility. If nobody knows what you did, you have not managed status, you have erased yourself. Be excellent in public; be unthreatening in private.',
    ],
    drill: [
      'Find one idea you are currently attached to. Rewrite the pitch as a question, and ask it of the person it would most threaten.',
      'Notice whether their version of the idea is better than yours. Frequently it is, which is why the technique survives contact with reality.',
      'Then rehearse the "take it under your name" line in the Arena — it is a high-status move disguised as deference.',
    ],
    related: ['lib-g3', 'lib-c7', 'lib-c6'],
  },

  'lib-g2': {
    thesis:
      "If people cannot read your intentions, they cannot prepare against them. Ambiguity is not dishonesty — it is the refusal to hand people the script of your next move.",
    deep: [
      "Concealing intentions is the most misunderstood of Greene's laws because it sounds like deception. In practice it is mostly about *sequencing*: not announcing what you want before you understand the terrain. The person who declares their ambition in the first meeting has handed everyone a map of how to stop them, and usually they hand it over before they know who in the room has an interest in doing so.",
      "The everyday version is simply asking better questions before answering any. \"What's the outcome you're hoping for?\" before you state your position. \"Who else has a view on this?\" before you commit. You are not hiding anything. You are declining to negotiate against yourself before you have seen the other side of the table.",
      "The decoy is the sharper tool, and it should be used sparingly and never dishonestly. If a negotiation is going to be about price, let the first conversation be about scope — genuinely, because you need to know it. Your real priority remains unstated until you know whether it is achievable. Ambiguity has a legitimate form: \"I want this to work for both of us; I'm not sure yet what the shape is.\" That is usually true, and it keeps your options open without any lies.",
      "Where this becomes genuinely powerful is over months rather than minutes. People build models of you and then act on those models. If your behaviour is always legible in advance — always the same objections, the same eagerness, the same tells — you can be managed. Being slightly less predictable, in ways that are honest, is the closest thing to armour available in an organisation.",
    ],
    script: [
      { who: 'Them', line: "So what's your number? We'd like to get this wrapped up today." },
      { who: 'You', line: "Happy to get there. Before I put a number down — is the constraint the total, or the timing?" },
      { who: 'Them', line: "Timing. Board meets Thursday." },
      { who: 'You', line: "Then let me give you two shapes rather than one number. One that lands Thursday at full rate, and one that lands in three weeks at a lower rate. Which is more useful to you?" },
      { who: 'Them', line: "Thursday, probably. But tell me both." },
    ],
    failureModes: [
      'Using ambiguity as evasion. If the other person asks a direct question and you consistently dodge, you are not being strategic, you are being untrustworthy — and it will be remembered.',
      'Playing it so close that nobody can help you. Concealment is about timing, not secrecy with allies. Your team needs to know your intentions.',
      'Confusing ambiguity with mystery. Being vague about your own competence is not power, it is camouflage for anxiety.',
    ],
    drill: [
      'In the Arena, take two turns where you ask about the persona\'s constraints before stating your own position.',
      'In one real negotiation this week — however small — do not give your number until you know their constraint.',
      'Write down what you learned by waiting. The list is usually longer than expected.',
    ],
    related: ['lib-g3', 'lib-f1', 'lib-g5'],
  },

  'lib-g6': {
    thesis:
      "People absorb your emotional state before they process your words. Reason delivered in an agitated body registers as agitation, however sound the argument.",
    deep: [
      "This is the single most useful piece of practical psychology in the whole library, and it is mechanical rather than mystical. Nervous systems are coupled through breath, pace, volume and posture — the phenomenon usually called attunement. When two people talk, their heart rates and breathing patterns drift toward each other within minutes. Whoever is more regulated sets the tempo; whoever is faster follows.",
      "That means the fastest way to change a room is not to argue better but to breathe slower. In a conflict, deliberately taking one longer exhale, lowering your volume slightly and slowing your speech by twenty percent offers the other person's nervous system a slower rhythm to match. It works far more reliably than reassurance, because reassurance is a claim while a slower rhythm is an offer made directly to the body.",
      "The corollary is uncomfortable: you cannot fake regulation. If your own heart rate is elevated, your voice will carry it. Which is why the real training is not conversational technique but a physical reset — one long exhale before you speak, shoulders dropped, weight settled. Do that and you are genuinely calm enough to set the tempo; skip it and your careful words will arrive wrapped in your own adrenaline.",
      "Note the asymmetry this creates in groups. In any room, the most regulated person quietly becomes the reference point, regardless of seniority or volume. This is why some quiet people dominate meetings they barely speak in. They are not dominating; they are simply the pace the others have synced to.",
    ],
    script: [
      { who: 'Them', line: "[Fast, loud] I've had this account for six years and nobody has ever sent me something I can't read." },
      { who: 'You', line: "[Slower, lower, one full breath out first] You're right to be angry, and I'm not going to argue with the fact. Tell me what it looked like from your side and I'll tell you what I can do before Thursday." },
      { who: 'Them', line: "[pace drops] ...My CEO is looking at it right now." },
      { who: 'You', line: "Then here's what happens next. I'll send you a corrected version in two hours, and you'll hear from me before it breaks next time — not after." },
      { who: 'Them', line: "[quieter] Fine. Same heat, less noise. I appreciate that." },
    ],
    failureModes: [
      'Matching their energy when their energy is anger. Attunement cuts both ways — if you speed up to match, you both accelerate and the conversation becomes a contest of volume.',
      'Using calm as a weapon. Slow, low, and patronising is heard as superior and will escalate things faster than shouting would.',
      'Trying to reason first. Explanations delivered before regulation arrive as noise; the nervous system has no capacity to process content while it believes it is under attack.',
    ],
    drill: [
      'In the Arena, use Marco or Priya. Before each reply, take one full exhale and slow your typing pace deliberately.',
      'Track whether the persona\'s responses shorten and soften over the session.',
      'In real conflict today: one long exhale before your first sentence. That is the whole intervention.',
    ],
    related: ['lib-g4', 'lib-c7', 'lib-c9'],
  },

  'lib-c7': {
    thesis:
      "A person who loses face is no longer cooperating — they are defending. Leave a dignified interpretation available and you keep both the point and the person.",
    deep: [
      "This is Carnegie's most operationally useful rule and the one most often ignored in professional life, where being right is treated as a virtue independent of its cost. The mechanism: face is not vanity, it is the social version of physical balance. When someone is cornered publicly, their attention leaves the question entirely and goes to restoring their standing. From that moment, no argument you make can be heard, because they are no longer evaluating your evidence — they are managing an audience.",
      "The practical move is to construct an exit ramp before you need one. When correcting someone, attach the correction to circumstances rather than to their judgement: \"the brief we were given was ambiguous about the deadline\" does the same work as \"you missed the deadline\" while leaving them whole. When someone is wrong in a meeting, route the correction through a question about the process, not about the person: \"can we look at how that number was calculated?\" Everyone knows what is happening; nobody has been cornered.",
      "Public and private is the crucial distinction. Correction in private, credit in public. If a correction must happen in front of others, the framing should make the error ordinary: \"this one caught three of us out\". You lose nothing — the facts are still on the table — and you gain a person who is now quietly on your side rather than quietly against you.",
      "The harder version is with people who are behaving badly. Even there, the rule holds: describe the behaviour in terms that allow them to change without humiliation, and most will take the exit. \"I think that came out harder than you meant\" is a gift. \"You were aggressive in there\" closes the door and they will spend the rest of the week explaining themselves to other people.",
    ],
    script: [
      { who: 'Them', line: "[in front of the team] So who signed off on this? Because it's wrong." },
      { who: 'You', line: "That's on me — I approved it, and the spec we were working from was ambiguous about the second phase. Can we take ten minutes after this and fix both the document and the error?" },
      { who: 'Them', line: "...Fine. After the meeting." },
      { who: 'You', line: "[later, privately] For what it's worth, you were right to stop it in there. And next time I'll bring you the draft before it goes anywhere." },
    ],
    failureModes: [
      'Letting them save face by blaming someone else. The exit ramp must not require a scapegoat — you have merely moved the cornering downstairs.',
      'Saving face so thoroughly that the problem disappears. The point still has to land; keep the facts, soften only the attribution.',
      'Public correction of a person who is junior to you. This is the most expensive version available and it teaches the whole room to be careful around you.',
    ],
    drill: [
      'In the Arena, escape a confrontation with Priya or Marco without either side losing. Note which of your lines worked.',
      'Then recall the last time you corrected someone in public. Write the face-saving version of that sentence.',
      'Use one this week, in private or public, and watch how quickly cooperation returns.',
    ],
    related: ['lib-c1', 'lib-c9', 'lib-g6'],
  },

  'lib-c9': {
    thesis:
      "You can win the argument or you can win the person. Almost never both — and the argument is worth much less than you think.",
    deep: [
      "When you lose an argument, you lose. When you win an argument, you have made the other person feel inferior, hurt their pride, and made them resent your victory — and they will leave holding their original position more tightly than before. This is not a rhetorical flourish; it is the well-documented backfire effect. Direct contradiction produces defensiveness, and defensiveness produces entrenchment.",
      "The practical alternative is to make being wrong cheap. \"I may be wrong about this, but I think...\" is derided as weak, yet it is one of the strongest available moves, because it removes the status threat that makes people defend positions they do not even hold strongly. \"Let me see if I've got this right\" is the same move in a different costume. Both let the other person walk away from an old position without losing anything.",
      "There is a discipline to this: you must be genuinely willing to be the one who is wrong. If your humility is a tactic and they sense it, it becomes the most annoying thing in the room. The way to make it real is to ask a question you do not know the answer to, and to say so: \"I don't actually know how the client's budget works. Can you help me understand it?\" That is not a technique; it is what curiosity looks like when it is not performing.",
      "Where this goes wrong is when people mistake it for passivity. This rule is about arguments — conversations whose real purpose is establishing who is right. If the decision actually matters and the evidence actually exists, do not argue: demonstrate. Show the number, run the test, produce the example. Actions settle what argument only entrenches.",
    ],
    script: [
      { who: 'Them', line: "Remote work has completely destroyed collaboration here. I've seen it." },
      { who: 'You', line: "I might be seeing a different slice of it — can I ask what changed for your team specifically?" },
      { who: 'Them', line: "The handovers. Nobody knows what anyone's doing on a Tuesday." },
      { who: 'You', line: "That's a real problem, and it's not one I'd argue with. What would tell you it had been fixed — less than a week of lag, or something else?" },
      { who: 'Them', line: "Under a week. Honestly, if handovers were clean I wouldn't care where anyone sits." },
    ],
    failureModes: [
      'Correcting the fact while ignoring the feeling. People argue from experience, not from data; being told your experience is unrepresentative is heard as being told you are stupid.',
      'Winning small arguments for sport. Every easy victory you take in a low-stakes conversation spends a balance you will need in a high-stakes one.',
      'Using "I may be wrong" as a rhetorical device. It works only when you are actually prepared to be.',
    ],
    drill: [
      'In the Arena, find one turn where the persona is wrong and do not correct them — ask a question instead.',
      'Note whether their position softened or hardened. Write down the sentence that achieved it.',
      'In real life, let one small factual error pass this week. Notice that nothing happened.',
    ],
    related: ['lib-c7', 'lib-g4', 'lib-g6'],
  },

  'lib-w1': {
    thesis:
      "Never block the reality someone offers you. Accept it, then add one thing. Blocking kills the scene; accepting an absurdity and escalating it is what makes you the funniest person in it.",
    deep: [
      "Yes, and is an improvisation rule that doubles as a social one. Blocking is any move that corrects the premise of what someone just offered: \"no, that's not what happened\", \"that's not funny\", \"well, actually\". Every block ends a scene, because the other person now has to defend their premise instead of building on it. In comedy this is fatal; in a conversation it is merely dull, which is worse.",
      "The mechanic works because humour is generative rather than competitive. If someone says the holiday was a hostage negotiation, an agreeing move accepts the metaphor and extends it — \"my last one got two people to leave peacefully\" — and now there are two jokes where there was one. A blocking move (\"it wasn't that bad\") produces zero. This is why the funniest person in a group is usually the one who is easiest to be funny near.",
      "Yes-and has a limit that improvisers know and most conversationalists do not: you accept the premise, not the *claim*. If someone says something cruel about a third person, yes-anding the cruelty makes you complicit rather than funny. The safe version accepts the absurdity and adds yourself to it, or turns the joke toward the situation. Agree with the frame; redirect the target.",
      "Practically, the move is one sentence: accept, then add a specific. \"Agreed — and now it also does X.\" The specificity is what makes it funny; vague extensions (\"yeah, and it's even worse\") add nothing because they contain no new image. One concrete absurd detail beats three generic agreements.",
    ],
    script: [
      { who: 'Them', line: "Honestly, your playlist sounds like a hostage negotiation." },
      { who: 'You', line: "Hostage negotiation is generous. My last one got two people to leave peacefully." },
      { who: 'Them', line: "[laughs] What's the next track, a distant apology?" },
      { who: 'You', line: "Track seven is forty minutes of rain and a man admitting he was wrong. Nobody's made it to track eight." },
    ],
    failureModes: [
      'Blocking to be accurate. "It wasn\'t a hostage negotiation, it was just quiet" is true, unhelpful, and ends the fun for everyone.',
      'Yes-anding something cruel about an absent person. You have accepted the wrong premise; now you are the source of the cruelty rather than the joke.',
      'Adding nothing specific. "Yeah, and worse!" is agreement without content, and content is the whole mechanism.',
    ],
    drill: [
      'In the Wit Simulator, take three Banter scenarios and respond with an accept-plus-specific for each.',
      'Check the humour score — this drill should raise it while keeping warmth above 60.',
      'In one real conversation today, accept somebody\'s exaggeration instead of correcting it, and add one concrete absurd detail.',
    ],
    related: ['lib-w2', 'lib-w3', 'lib-w4'],
  },
};
