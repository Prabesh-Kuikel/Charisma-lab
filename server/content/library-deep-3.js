// Library · long-form chapters (batch 3 of 4)
export const LIBRARY_DEEP_3 = {
  'lib-c3': {
    thesis: "You make more friends in two months by being interested than in two years by trying to be interesting. Attention is the rarest gift you can give.",
    deep: [
      "This is the most quoted rule in the library and the most frequently performed rather than practised. The difference is detectable: performed interest asks questions in sequence without reacting; genuine interest reacts to the specific content of each answer. One produces a form, the other produces a conversation.",
      "The mechanism is attention scarcity. Everyone in a room is competing to be interesting; almost nobody is offering undivided attention. That asymmetry means curiosity is not merely pleasant, it is rare — and rarity is what makes it memorable. The person who was actually interested in you is remembered as fascinating, which is the great irony of social skill.",
      "The practical craft has three parts. Ask forked or open questions rather than closed ones. React briefly to each answer, proving you heard the specific words. And follow up at depth — the second and third questions about the same thing, which is where people feel met rather than surveyed.",
      "One caution: interest without reciprocity becomes unnerving. Offer small things — a reaction, an admission, a brief relevant story. The ratio should feel roughly two-thirds them to one-third you in a first conversation, not nine to one. Interest is a gift; scrutiny is not.",
    ],
    script: [
      { who: 'Them', line: "I'm on the sensors side, mostly." },
      { who: 'You', line: "Mostly? What's the other part?" },
      { who: 'Them', line: "Honestly? The mud. I spend more time cleaning equipment than designing it." },
      { who: 'You', line: "That's the first honest job description I've heard tonight. Is the mud a design failure, or is that just the job?" },
    ],
    failureModes: [
      'Question sequences with no reactions, which read as a survey rather than interest.',
      'Redirecting to yourself after each answer, which closes the thread you just opened.',
      'Interest aimed at impressive people only, which everyone in the room notices.',
    ],
    drill: [
      'Arena: ask three follow-ups on one thread before moving on.',
      'React to each answer with something specific rather than "right" or "cool".',
      'In one real conversation today, aim for two-thirds their talking to one-third yours.',
    ],
    related: ['lib-f3', 'lib-c5', 'lib-f4'],
  },

  'lib-c4': {
    thesis: "The sweetest sound to a person is their own name — used early, used twice, then never again.",
    deep: [
      "Names work because they are the highest-value identifier a person owns and because using one proves you were paying attention at a moment when it was easy not to. Used correctly — twice, early, attached to something specific — a name creates the feeling of being registered. Used badly, it becomes the signature move of a salesperson and the listener steps back.",
      "The pattern: once in your first reply after learning it (\"Good to meet you, Maya — what brought you here?\") and once within the first few minutes, attached to something they said (\"Maya, the thing about the mud is the most honest thing I've heard tonight\"). Then stop. After that, the relationship exists without the label, and further repetition reads as pressure.",
      "The deeper version is not names at all, it is detail. A remembered project, a sister's wedding, a broken phone — these outperform the name because they prove attention rather than recall. This is why the rule is really about being registered, with the name as the cheapest available proxy.",
      "And the recoverable failure: if you forget a name, do not bluff and do not stack apologies. \"I'm not going to pretend — your name has left the building. But I remember the project you were fighting for.\" One line of honesty plus a specific memory is more charming than a lucky recall, because it shows the relationship matters more than your record.",
    ],
    script: [
      { who: 'You', line: "Maya, right? I'm Sam. What brought you here tonight?" },
      { who: 'Them', line: "Honestly? Free wine and mild professional guilt." },
      { who: 'You', line: "Respectable. Maya — you said you're mostly on the sensor side. What's the part that isn't sensors?" },
    ],
    failureModes: [
      'Sprinkling the name into every sentence, which is a pressure tactic everyone recognises.',
      'Using a name to create false intimacy at the start of a difficult message — "Look, Maya, here\'s the thing..."',
      'Bluffing when you have forgotten it, which risks getting it wrong and creates a small humiliation for both of you.',
    ],
    drill: [
      'Arena: use the persona\'s name twice in the first three turns, then never again.',
      'Replace the third usage with a specific detail they gave you.',
      'In real life, practise the honest recovery line once with someone you have forgotten.',
    ],
    related: ['lib-c3', 'lib-f6', 'lib-c2'],
  },

  'lib-c5': {
    thesis: "Listen with your body and the speaker will describe you as a brilliant conversationalist. Attention is more persuasive than contribution.",
    deep: [
      "Listening is not a passive virtue; it is a set of visible behaviours, and the speaker is reading all of them. Phone face down. Torso angled toward them. Response short and followed by another question rather than a comparable story. These signals decide whether someone experiences you as present, and presence is what people are actually asking for when they say someone is good company.",
      "The hardest part is not interrupting, and the reason it is hard is that listening requires holding a thought without speaking it. Most interruptions are not rudeness — they are anxiety that the thought will be lost. The fix is mechanical: keep a note, or hold one keyword, and trust that the thread can be returned to. Almost every thought survives ninety seconds of patience.",
      "The second hardest part is not competing. When someone tells a story, the instinct is to offer a comparable one, which converts a shared moment into an exchange of credentials. The alternative is to ask about the thing they just said. It feels less generous and is dramatically more so.",
      "Listening well also has a strategic benefit that is rarely named: you learn things. In any room, the person asking and listening accumulates information while everyone else spends it. That asymmetry — knowing more than you have said — is the foundation of almost every form of social influence in this library.",
    ],
    script: [
      { who: 'Them', line: "So we lost the account, and honestly the worst part was telling the team." },
      { who: 'You', line: "Telling the team was worse than losing it?" },
      { who: 'Them', line: "Much. Because they'd worked weekends on it." },
      { who: 'You', line: "That's the part people don't see from outside. How did you do it?" },
    ],
    failureModes: [
      'Listening while preparing your reply, which produces perfectly timed responses that answer the wrong thing.',
      'Topping the story with a comparable one of your own, which turns listening into an exchange of credentials.',
      'Performing listening — nodding and "mm-hmm" without a single follow-up on the actual content.',
    ],
    drill: [
      'In three conversations today, respond with a question instead of your own story.',
      'Keep your phone face down and your torso angled toward the speaker.',
      'Note one thing you learned in each conversation that you would not have known otherwise.',
    ],
    related: ['lib-c3', 'lib-f3', 'lib-c2'],
  },

  'lib-c6': {
    thesis: "People act on their own reasons. Frame every request as something they already want.",
    deep: [
      "Every request can be framed two ways: what you need, and what they get. Only the second moves people reliably, and the translation is usually a single sentence. \"I need the data by Thursday\" becomes \"if the data lands Thursday, the release goes out before the weekend and support doesn't spend Monday firefighting.\"",
      "The craft is identifying the real benefit, which is almost never grand. People act to avoid blame, avoid rework, look good to someone specific, finish early, or avoid a meeting. Naming one of those accurately outperforms any appeal to strategy, because those are the reasons people actually have.",
      "There is an ethical line worth holding. Framing is honest when you are surfacing the trade that was always implicit; it becomes manipulation when you invent a benefit they do not hold. \"This will be great for your development\" said to someone who wants to leave at six is transparent and slightly insulting.",
      "And when you cannot find their benefit, ask: \"what would make this easier for you?\" The answer is usually the exact framing you needed, delivered for free — and asking also signals that you view them as a person with constraints rather than a function.",
    ],
    script: [
      { who: 'You', line: "Can you review this before Friday?" },
      { who: 'Them', line: "It's tight. I've got three things landing Thursday." },
      { who: 'You', line: "What if I take the client call on Monday? Then a Friday review means you're not in it." },
      { who: 'Them', line: "Then yes. Send it over." },
    ],
    failureModes: [
      'Explaining your urgency, which transfers a cost rather than offering a benefit.',
      'Inventing a benefit they do not want, which is detectable and corrodes trust.',
      'Framing generally ("this will help the team") instead of specifically (no Monday firefighting).',
    ],
    drill: [
      'Rewrite three real requests in terms of their gain rather than your need.',
      'Name one specific thing they care about for each: blame, rework, visibility, time.',
      'Then ask one of them today and measure the response speed.',
    ],
    related: ['lib-g7', 'lib-s6', 'lib-c2', 'lib-c9'],
  },

  'lib-c8': {
    thesis: "Show it, don't describe it. A demonstration beats a claim, and images outlive adjectives.",
    deep: [
      "Comprehension is easier than belief and both are easier with a demonstration. When you describe a problem, the listener has to construct it; when you show it, they simply see it. That reduction in effort is why a single vivid case outperforms a page of statistics in almost every setting where you need someone to feel something rather than merely agree.",
      "The craft is scale: demonstrate small and fast. A physical object, a screenshot, a two-sentence re-enactment, one number written on a whiteboard. Demonstrations fail when they become performances — a five-minute skit is a claim wearing a costume. The best examples take under twenty seconds and produce one clear reaction.",
      "The second craft point is selection. Demonstrate the thing that makes the problem feel real, not the thing that is easiest to show. A dashboard is impressive and abstract; the actual customer email is small and devastating. Choose the artefact with the emotional payload, which is usually the smaller one.",
      "This applies to your own credibility too. Instead of describing yourself as careful, show the checklist. Instead of claiming you are organised, show the three-line plan. The general principle: whenever you find yourself about to use an adjective about yourself or your work, replace it with an artefact.",
    ],
    script: [
      { who: 'You', line: "You know how the status update takes two days a month?" },
      { who: 'Them', line: "Roughly, yes." },
      { who: 'You', line: "Here's last month's. [shows the document] Four pages. And here's the client email that contradicts it." },
      { who: 'Them', line: "...I didn't know that had gone out." },
    ],
    failureModes: [
      'Demonstrating at the wrong scale — a five-minute skit where a twenty-second artefact would do.',
      'Showing the easy artefact rather than the emotionally real one.',
      'Describing yourself with adjectives when an artefact was available.',
    ],
    drill: [
      'Take one claim you make often and find the artefact that proves it.',
      'In a real conversation, demonstrate instead of describing — under twenty seconds.',
      'Replace one adjective about your own work with a concrete example this week.',
    ],
    related: ['lib-g4', 'lib-s4', 'lib-s2'],
  },

  'lib-v1': {
    thesis: "Pitch, pace, pause, projection, tone — five dials, one default. Most speakers never move them deliberately.",
    deep: [
      "Delivery is a mixing desk. Before any sentence that matters, you can choose to lower the pitch, slow the pace, add a silence, raise the projection or change the tone — and one deliberate move is enough to make that sentence land. The reason most speakers sound flat is not a lack of ability but a lack of decisions: they speak at whatever setting their nerves happen to produce.",
      "The dials are not equal. Pause is the strongest and least used: silence before an important line creates anticipation, and anticipation is attention. Pace is second, because a contrast between fast and slow does more for comprehension than uniformly good clarity. Pitch and projection matter, but they are amplifiers; tone is the emotional colour that decides how the words are received.",
      "The discipline is one dial per sentence. Speakers who discover this technique often move all five at once, which reads as theatrical and slightly desperate. Choose the single dial the sentence needs, use it, then return to baseline — variation is only perceptible against a norm.",
      "Train it as a habit rather than a performance: before each of your three most important sentences today, pick a dial and move it. Within a week the choice becomes semi-automatic, and you will hear the difference in your own recordings before anyone comments on it.",
    ],
    script: [
      { who: 'You', line: "Flat: \"We didn't hit the target this quarter and I want to talk about why.\"" },
      { who: 'You', line: "Dialled (pace −30%, pitch down slightly): \"We didn't hit the target this quarter. — pause — I want to talk about why.\"" },
      { who: 'You', line: "The words are identical. The second version buys the room's attention because the tempo announced that something serious was arriving." },
    ],
    failureModes: [
      'Moving all five dials at once, which reads as performance rather than intention.',
      'Using volume as the default dial, which is the least interesting and most tiring option.',
      'Never returning to baseline, so the variation stops being perceptible.',
    ],
    drill: [
      'Say one sentence five times, each time moving exactly one dial.',
      'Record the version that sounds most like you meaning it.',
      'Then pick one dial before each important sentence in a real conversation today.',
    ],
    related: ['lib-v4', 'lib-f5', 'lib-v2'],
  },

  'lib-v2': {
    thesis: "Clarity comes from space in the mouth, not force in the throat. Articulation is geometry.",
    deep: [
      "Mumbling is a space problem. Consonants are made by interrupting airflow with lips, tongue and jaw, and when the jaw is half-closed and the tongue rests low, those interruptions blur into a soup of vowels. The fix is mechanical and immediate: drop the jaw more than feels natural and let air fill the chamber before you speak.",
      "Force is the wrong instinct and it is nearly universal. Pushing produces louder mumbling, because tension in the throat does not create space in the mouth. The test is simple: if your throat is tired after ten minutes, you were forcing. If your ribs and back are tired, you were supporting correctly.",
      "The training method is deliberate overshoot. Articulate at 130% of normal for two minutes — exaggerated mouth shapes, visible consonants, looking absurd — then return to normal and observe that normal has become noticeably crisper. You have raised the ceiling rather than learning a new setting.",
      "Where this pays off most is names, numbers and technical terms, because those are the words a listener cannot reconstruct from context. If your articulation is vague at the edges of your vocabulary, you will be described as unclear even when everything else is excellent.",
    ],
    script: [
      { who: 'You', line: "Teeth almost together: \"red leather, yellow leather\" — unrecognisable." },
      { who: 'You', line: "Jaw dropped two fingers, one breath in: \"red leather, yellow leather\" — louder without effort, and recognisable." },
      { who: 'You', line: "Nothing about the throat changed. Only the geometry of the mouth." },
    ],
    failureModes: [
      'Pushing harder when misunderstood, which increases volume and decreases clarity.',
      'Practising at conversational speed, which rehearses the problem rather than the fix.',
      'Articulating only when nervous, so the habit never becomes available when relaxed.',
    ],
    drill: [
      'Run three twisters with a deliberately exaggerated jaw, twice through each.',
      'Record one at normal speed and score it, noting the exact cluster that failed.',
      'Do a two-minute exaggerated warm-up before anything that matters today.',
    ],
    related: ['lib-v1', 'lib-v3', 'lib-v5'],
  },

  'lib-v3': {
    thesis: "Think in five to eight word phrases. Verse gives your voice a floor to stand on, and prevents both rambling and running out of air.",
    deep: [
      "Long sentences create two failures at once: you run out of breath and you lose your own structure. Verse — speaking in short chunks with a breath at each boundary — solves both, because it converts a sentence into a sequence of deliverable units. Nothing about the content changes; only the amount of it that arrives per breath.",
      "The mechanism is double. Physically, five to eight words is what a supported breath comfortably carries, so the voice never has to push. Cognitively, each chunk gives the listener a place to agree with you before the next clause arrives, which is why verse sounds considered rather than fragmented — provided each chunk carries a distinct idea.",
      "The editing move is to split at every conjunction. Take a sentence with \"because\", \"but\", \"which\" and \"so\" inside it and give each clause its own full stop and breath. What was a paragraph becomes four lines, and the four lines are dramatically easier to follow and to remember.",
      "The trap is monotony: verse delivered at a constant pace with identical pitch is a shopping list. Chunking must be paired with variation — the most important chunk gets the longer pause before it and the downward landing on its final word.",
    ],
    script: [
      { who: 'You', line: "Prose: \"I used to think charisma was something you were born with or not, which bothered me because I'm not loud and I'm not quick with jokes, so I assumed the door was closed.\"" },
      { who: 'You', line: "Verse: \"I used to think charisma was genetic. / I'm not naturally loud. / I'm not quick with jokes. / So I assumed the door was closed. / I was wrong, and the reason is specific.\"" },
    ],
    failureModes: [
      'Chunking without variation, which produces a robotic list rather than considered speech.',
      'Chunks that contain two ideas, which defeats the purpose of the boundary.',
      'Using verse in writing and reverting to prose when speaking, which learns the wrong skill.',
    ],
    drill: [
      'Answer any prompt in five chunks of six words or fewer, breathing at each boundary.',
      'Mark which chunk is most important and give it the longest pause before it.',
      'Record it and compare the structure and clarity scores with your usual delivery.',
    ],
    related: ['lib-v1', 'lib-f7', 'lib-v5'],
  },

  'lib-v4': {
    thesis: "End statements downward. Uptalk converts a claim into a request for approval.",
    deep: [
      "A rising final word on a declarative sentence is not a flaw in the voice — it is a social habit, and it does real work. It signals openness, and in casual conversation it reads as friendly. In any context where you are making a claim, quoting a number, or stating a position, it signals that the claim is provisional, and listeners treat provisional claims as negotiable.",
      "The fix is narrow and mechanical: the last two words of statements, and only statements. Land the final stressed syllable downward and the same sentence becomes a decision rather than a suggestion. You are not flattening your melody, and you are not touching questions — genuine questions must still rise, or you will sound like a person issuing verdicts.",
      "The contexts where uptalk clusters are exactly where credibility matters: talking to people more senior, stating opinions in groups, and saying numbers. This is why the habit is worth targeted work — it costs you the most in the rooms where it is hardest to notice you are doing it.",
      "One test that works in practice: record five statements and five questions. If you cannot tell which is which with the sound only, your endings are not yet doing their job.",
    ],
    script: [
      { who: 'You', line: "Rising: \"So the timeline is six weeks and we'd need two more reviewers?\" — now it is a question nobody asked." },
      { who: 'You', line: "Falling: \"The timeline is six weeks. We'd need two more reviewers.\" — now it is a position." },
      { who: 'You', line: "The second version is not aggressive. It is merely finished." },
    ],
    failureModes: [
      'Over-correcting into a clipped, permanently downward delivery that sounds military.',
      'Applying it to questions, which turns curiosity into interrogation.',
      'Ignoring numbers, which are the words most damaged by a rising ending.',
    ],
    drill: [
      'Make ten statements out loud, landing each final word downward.',
      'Record five statements and five questions and test whether they are distinguishable.',
      'Use one firm statement in a meeting and notice whether anyone reopens the decision.',
    ],
    related: ['lib-v1', 'lib-g3', 'lib-v2'],
  },

  'lib-v5': {
    thesis: "Walk, stop, breathe, speak. Four seconds of deliberate stillness buys four minutes of attention.",
    deep: [
      "Most speakers start talking before they arrive: mid-entrance, mid-adjustment, mid-apology. The room's first impression is therefore of someone slightly out of control, and subsequent polish has to overcome it. A start ritual inverts that — you arrive, stop, breathe visibly, look up, and only then speak.",
      "The silence is the active ingredient. Four seconds of stillness tells the room that you are not in a hurry, which is the single most reliable signal of status available in public speaking. It also gives your voice time to settle onto supported air, so the first sentence arrives low and steady rather than high and rushed.",
      "The ritual is physical rather than verbal, which matters under nerves: it does not depend on remembering anything clever. Stop moving, exhale, look up. Three actions that work even when your mind is blank, and which together produce the appearance of composure — and, because posture influences state, a good deal of the substance of it.",
      "Apply it beyond the stage: before a difficult conversation, before a video call, before speaking first in a meeting. The same four seconds works everywhere, and it is the cheapest available upgrade to how seriously you are taken.",
    ],
    script: [
      { who: 'You', line: "Unritualised: \"Okay so, hi, sorry, can everyone hear me, right, so the thing I want to talk about is—\"" },
      { who: 'You', line: "Ritualised: [walk, stop, breathe, look up] \"Three weeks ago we lost a client because of one sentence in an email. I'm going to show you the sentence.\"" },
    ],
    failureModes: [
      'Filling the silence with "right, so" — the ritual only works if it is actually silent.',
      'Speaking while still moving, which splits the audience\'s attention.',
      'Apologising for the technology or the delay, which spends the attention the ritual just bought.',
    ],
    drill: [
      'Rehearse a three-minute talk with the full ritual and record it.',
      'Check that the first four seconds contained no words at all.',
      'Use the same four seconds before a real conversation today, and notice your own state change.',
    ],
    related: ['lib-v1', 'lib-f5', 'lib-g3'],
  },

  'lib-v6': {
    thesis: "Around sixty to seventy percent eye contact reads as confident. Under forty reads as evasive; constant locked gaze reads as threat.",
    deep: [
      "Eye contact has an inverted-U relationship with trust, and knowing the shape is more useful than trying to be fearless about it. Too little reads as shame or evasion; too much reads as dominance or challenge. The comfortable band, in most Western professional settings, is roughly sixty to seventy percent while speaking and somewhat more while listening.",
      "The technique that makes the band achievable is the eye triangle: move your gaze between the two eyes and the mouth rather than fixing on one point. This keeps contact continuous without the unblinking intensity that raises stress, and it gives you somewhere natural to look — which eliminates the darting that the fear of staring produces.",
      "Break gaze for thought, not for escape. Looking away while constructing a sentence is read as consideration; looking away while being asked something difficult is read as evasion. Same act, opposite meaning, decided by whether it happens after the question or during it.",
      "In groups, distribute: the speaker gets most of your gaze, the room gets some. Fixing exclusively on the senior person is one of the most common errors in meetings, because everyone else sees exactly what you did and draws conclusions about your motives.",
    ],
    script: [
      { who: 'You', line: "\"What happened with the Henderson account?\" [hold contact through the question]" },
      { who: 'You', line: "[look away for two seconds while assembling the chronology]" },
      { who: 'You', line: "\"It slipped by four days. Here's where it went wrong.\" [return to contact]" },
    ],
    failureModes: [
      'Constant unbroken gaze in the belief that it signals confidence, when it usually raises the other person\'s stress.',
      'Looking away during the question rather than during the thinking, which reads as evasion.',
      'Fixing on the most senior person in a group and ignoring everyone else.',
    ],
    drill: [
      'Practise the eye triangle in three conversations.',
      'Hold contact through questions and break only while thinking.',
      'In one meeting, give your gaze to whoever is speaking.',
    ],
    related: ['lib-v5', 'lib-c3', 'lib-v1'],
  },

  'lib-w2': {
    thesis: "The laugh lives at the end of the sentence. Rearrange until the funniest word arrives last and nothing follows it.",
    deep: [
      "This is the single most mechanical improvement available in humour. The same content, with the funniest word moved to the end, is funnier — because the laugh needs a place to land and the end of the sentence is the only place that has no competition. Most failed jokes are structurally sound and terminally ordered.",
      "The second half of the rule is the harder half: nothing follows the punch word. Amateurs add a tag — an explanation, a softening laugh, a \"sorry\" — and each addition gives the listener permission to downgrade their reaction. Say the funny thing last, then stop, and let the silence be the laugh.",
      "The editing process is subtractive and fast. Take a sentence you actually said, find the funniest word, move it to the end, then delete every word that is not load-bearing: the setup clause that explains why you are joking, the qualifier that softens it, the self-conscious aside. The result is usually half the length and reliably sharper.",
      "One exception worth knowing: in stories, the punch word is often an image rather than a joke word, and moving it to the end has the same effect — the final image becomes the thing the listener keeps, which is why good endings and good punchlines are the same craft.",
    ],
    script: [
      { who: 'You', line: "Bloated: \"I got there late, well not that late, and everyone was already sitting down which was a bit awkward honestly.\"" },
      { who: 'You', line: "Compressed: \"I arrived late and everyone was already seated — which is the only situation where walking in is a public event.\"" },
      { who: 'You', line: "\"Public event\" is the punch word, and nothing follows it." },
    ],
    failureModes: [
      'Adding a tag after the punchline — a laugh, an explanation, or "sorry" — which refunds the laugh.',
      'Burying the funny word mid-sentence because it is grammatically tidier.',
      'Explaining the joke when it dies, which is the one recovery that never works.',
    ],
    drill: [
      'Take five sentences you said today and move the funniest word to the end of each.',
      'Delete every clause that exists to explain or soften.',
      'Deliver them with a flat face and keep the two that still work.',
    ],
    related: ['lib-w1', 'lib-w3', 'lib-w5'],
  },

  'lib-w3': {
    thesis: "Punch yourself, not your listener. Low status on purpose is a high-status move — once, small, and aimed inward.",
    deep: [
      "Self-deprecation is a status instrument rather than a personality trait. By lowering your own position before anyone else does, you remove the need for competition and demonstrate that your self-image is not fragile. The audience conclusion is not \"this person is weak\" but \"this person is safe and secure\", which are the same thing in most rooms.",
      "The three constraints are what separate the working version from the one that makes people wince. *Inward*: the joke targets your choice or behaviour, never your listener's. *Small*: a real but minor flaw, specific enough to be recognisable. *Once*: repeated self-deprecation stops reading as confidence and starts reading as a request for validation.",
      "Placement multiplies the effect. Immediately after praise, a self-jab prevents the compliment becoming an obligation. Immediately after an attack, it removes the status question so the conversation can proceed. In both positions you spend a little status and buy a lot of ease — which is the best exchange rate in social life.",
      "The strongest constraint is what never to use. Do not self-deprecate about something you are genuinely insecure about, because you will over-perform it and the room will hear the wound underneath. The material must be a flaw you would happily be teased about by someone who likes you.",
    ],
    script: [
      { who: 'Them', line: "You're late again." },
      { who: 'You', line: "Guilty. I was up all night rehearsing a better excuse and this is the best I got." },
      { who: 'Them', line: "That's genuinely worse than no excuse." },
      { who: 'You', line: "It's a gift." },
    ],
    failureModes: [
      'Humblebragging — "I\'m such a perfectionist" — which is a compliment in a costume and listeners detect it instantly.',
      'Using self-deprecation before you have any credibility in a hostile room, which invites more criticism.',
      'Repetition, which converts confidence into a request for reassurance.',
    ],
    drill: [
      'Answer three high-status teases with warmth plus one small self-jab, under thirty words each.',
      'Keep the warmth score above 65 and check that no jab points outward.',
      'Use one in real life today and notice the absence of a second hit.',
    ],
    related: ['lib-w2', 'lib-c2', 'lib-w4'],
  },

  'lib-w4': {
    thesis: "Treat the jab as high praise and it has nowhere to land. The room watches you hold the frame.",
    deep: [
      "Misattributing an insult as a compliment is the most elegant defensive move in the repertoire, because it does not fight. Fighting accepts that status is at stake; reframing as praise declares that you did not experience an attack at all. The attacker is left either repeating themselves — which looks petty — or joining the new frame.",
      "The structure is three moves: take the sting literally, reinterpret it generously, and hand back something the other person wants. \"You're very competitive\" becomes \"Thank you, I try to be — on your behalf.\" You have accepted the word, given it a flattering meaning, and implied a service, and there is nothing left to attack.",
      "The delivery is the whole trick. It must be warm, unhurried and free of any wince. A flip delivered with tension in the face tells the room the insult landed, which returns the status to the attacker and makes the line look like a recovery rather than a choice. If you cannot deliver it calmly, do not attempt it.",
      "The practical preparation is to have three flips ready before you need them: one for a competence jab, one for a status jab, and one for a personal jab. Fluency here is retrieval, not invention — nobody constructs these in real time, which is why two seconds of breath before replying is more valuable than any amount of quick thinking.",
    ],
    script: [
      { who: 'Them', line: "So you're the one who does the little side project? How cute that you have hobbies." },
      { who: 'You', line: "It's adorable, I agree. I keep it small so it can't disappoint me publicly. What's your version of that?" },
      { who: 'Them', line: "[pause] ...I don't have one, actually." },
      { who: 'You', line: "Then I'm winning, obviously." },
    ],
    failureModes: [
      'Delivering the flip with a nervous smile, which reveals the insult landed.',
      'Flipping into a counter-insult, which converts a frame-hold into a fight.',
      'Attempting it after you have already replied defensively — the moment has passed and it now looks like a second attempt.',
    ],
    drill: [
      'Wit Simulator: three hostile prompts, each answered with a one-line flip.',
      'Prepare one flip each for competence, status and personal jabs and say them out loud.',
      'Practise the two-second breath before replying; the flip depends on it.',
    ],
    related: ['lib-g4', 'lib-w3', 'lib-w1'],
  },

  'lib-w5': {
    thesis: "The first laugh already did the work. Two or three words of reference is enough, and the shared language is worth more than the joke.",
    deep: [
      "A callback is the only form of humour whose setup has been paid for in advance. The room has already reacted to the earlier moment, so a three-word reference can produce a disproportionate laugh — but the laugh is the lesser benefit. The greater one is that callbacks create private language, and private language is the strongest available marker of belonging.",
      "Three rules keep it reliable. *Short*: two or three words, never a recap. *Pointed at a moment*: if the original moment was someone's embarrassment, the callback is a reminder rather than a joke. *Delayed*: it must arrive after the conversation has moved on, or it is merely continuation.",
      "The advanced form is the chain — the same reference used two or three times across an evening, each instance shorter than the last, until the final one is a single word or a gesture. At that point the group owns something together, which is a social outcome far more valuable than any individual laugh.",
      "The defensive use is worth having in conflict: a callback to a moment where you and the other person were aligned resets the emotional baseline without argument. You are not making a point — you are reminding both nervous systems that you have been on the same side before, and that reminder is more persuasive than any case you could build.",
    ],
    script: [
      { who: 'You', line: "[twenty minutes earlier] ...and that's when the goat got into the car." },
      { who: 'You', line: "[later] So Portugal in June — no goats, ideally." },
      { who: 'You', line: "[later still, as someone leaves] Watch the gate." },
    ],
    failureModes: [
      'Explaining the reference, which destroys the pleasure of recognition and marks you as someone keeping score.',
      'Using a callback to someone else\'s embarrassment, which is a reminder rather than a joke.',
      'Referencing something that got no reaction the first time — there is nothing to borrow.',
    ],
    drill: [
      'Wit Simulator: run three Callback scenarios and keep every reference under ten words.',
      'In a real conversation, use one detail twice — once early, once after the topic has moved.',
      'Attempt the chain: three references to the same moment across one evening.',
    ],
    related: ['lib-w1', 'lib-w2', 'lib-c4'],
  },
};
