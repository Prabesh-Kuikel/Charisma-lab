// ─────────────────────────────────────────────────────────────
//  Conversation Arena · fourth wing
//  Round 10: the coverage audit found the Arena lopsided. Group
//  had one persona, Care had one, Interview had one — and those are
//  the three rooms people actually lose sleep over. Twelve new
//  personas, weighted to the thin scenes rather than spread evenly.
//
//  Same shape as arena.js and arena-extra.js: brief, an opener that
//  is already mid-conversation, probes, facts disclosed by turn,
//  reactions by trust tier, chapters to read, and a way out.
// ─────────────────────────────────────────────────────────────

export const ARENA_EXTRA_10 = [
  // ── Group ───────────────────────────────────────────────
  {
    id: 'group-four', name: 'The four at the table', role: 'A table of four who already know each other', scene: 'Group', emoji: '🪑', difficulty: 4, color: '#8b5cf6',
    brief: 'You have joined a table where three of the four have worked together for years. There are in-jokes you will not get, and a conversation that does not pause when you arrive — it just narrows.',
    goal: 'Get into the conversation inside two minutes without taking it over or shrinking out of it.',
    traits: ['fast in-jokes', 'polite but distracted', 'respond to curiosity about the shared history', 'notice when someone is performing'],
    likes: ['asking about the in-joke rather than pretending to get it', 'one good contribution instead of five small ones', 'laughing at yourself', 'names'],
    dislikes: ['monologues', 'one-upping', 'asking nobody a question', 'apologising for joining'],
    opener: 'Sorry, we were just — no, it is a long story. Have you been to one of these before?',
    probes: [
      'Wait, do you two work together?',
      'What is the long story, actually?',
      'Is this the best table or did I just get lucky?',
    ],
    facts: [
      { turn: 1, text: 'We are all ex-Cobalt, so half of what we say is shorthand for a company that does not exist any more.' },
      { turn: 2, text: 'The long story is that Priya once flew to the wrong country for a two-hour meeting. We have told it at every gathering for six years.' },
      { turn: 3, text: 'Honestly we are terrible at meeting new people. We just default to the old material.' },
      { turn: 4, text: 'Okay, what do you do that gets you into rooms like this? You have not once mentioned your job, which is unusual here.' },
    ],
    reactions: {
      cold: ['Yeah. Anyway —', 'Mm.', 'Sorry, one second — hey, Tom!'],
      neutral: ['Ha, fair.', 'Okay that is a good question.', 'See, no one asks that.'],
      warm: ['You should come to the next one of these.', 'Right, you are getting the story in full now.', 'I have decided I like you. Somebody get them a drink.'],
    },
    reads: ['lib-f1', 'lib-st2', 'lib-f3'],
    exits: ['We are going to go and find the food before it all goes.', 'Right, I have been told to circulate.'],
  },
  {
    id: 'group-hostile', name: 'Marcus, holding court', role: 'The loudest person in the group, six minutes in', scene: 'Group', emoji: '😤', difficulty: 5, color: '#fb7185',
    brief: 'A group of six, one voice carrying all of it. Marcus is funny and fast and has learned that dominating is a substitute for listening. Two people are looking at their phones.',
    goal: 'Redirect the group to include the quiet people without publicly defeating Marcus.',
    traits: ['quick', 'competitive', 'funny at others expense', 'fragile about being interrupted'],
    likes: ['being given the floor and then passed to', 'genuine laughter', 'being asked to adjudicate', 'someone who can match pace once'],
    dislikes: ['being corrected', 'silence', 'eye-rolling', 'anyone recruiting allies against him'],
    opener: 'No, no, no — the whole point of the thing is that it was never about the money. Ask anyone. Ask Sunil.',
    probes: [
      'Sunil, what is your version of it?',
      'So what would you have done at that point?',
      'Is this a story we are all allowed into or is it a two-person thing?',
    ],
    facts: [
      { turn: 1, text: 'Sunil has heard this story four times. He is being polite.' },
      { turn: 2, text: 'Fine, yes. I do this. I fill the room. I know I do it.' },
      { turn: 3, text: 'My brother is the quiet one in the family and I have watched him get talked over his entire life.' },
      { turn: 4, text: 'You know what, I have been talking for ten minutes. Someone else go.' },
    ],
    reactions: {
      cold: ['Are you going to let me finish?', 'Right, sure.', 'Everyone is a critic.'],
      neutral: ['Ha. Fine. Fair.', 'Okay, that is a clean way to do it.', 'Point taken, point taken.'],
      warm: ['You know what, you are good at this.', 'Right — Sunil, your turn, and I am shutting up.', 'I have been in worse groups than this one tonight.'],
    },
    reads: ['lib-dc1', 'lib-f3', 'lib-dc3'],
    exits: ['I am going to get some air, this room is boiling.', 'Right, my round. What is everyone drinking?'],
  },
  {
    id: 'group-newcomer', name: 'Ada', role: 'The newest person in the room, standing at the edge', scene: 'Group', emoji: '🧍', difficulty: 2, color: '#34d399',
    brief: 'Ada started on Monday. She is standing near a group but not in it, holding a drink she has not sipped, trying to look like she is waiting for someone.',
    goal: 'Bring her in without making a production of it, and without leaving her stranded once you have.',
    traits: ['over-prepared', 'watching for signals', 'relieved by a direct question', 'afraid of taking too much space'],
    likes: ['being asked a specific question', 'being told the unwritten rules', 'someone staying for two minutes', 'being introduced with a fact about her'],
    dislikes: ['being made the subject of a group', 'vague "you should meet people"', 'being left mid-sentence', 'loud sympathy'],
    opener: 'Oh — hi. Sorry, I am just waiting for someone to finish a call. I am Ada. I started on Monday.',
    probes: [
      'How has the first week actually been?',
      'What is the thing nobody told you yet?',
      'Do you want to meet the two people here worth knowing?',
    ],
    facts: [
      { turn: 1, text: 'I have been going to the kitchen at 3pm every day because that is when the friendly people are there.' },
      { turn: 2, text: 'I was at my last place four years and I have forgotten how to do the first week.' },
      { turn: 3, text: 'Someone told me the Wednesday lunch is where the real decisions get made and I have been too nervous to go.' },
      { turn: 4, text: 'This is the first time this week I have not felt like I was intruding.' },
    ],
    reactions: {
      cold: ['Oh. Yeah. Thanks.', 'I might go and find my team actually.', 'No, it is fine.'],
      neutral: ['That is really helpful, actually.', 'Okay, that is good to know.', 'I did not know that.'],
      warm: ['Can I ask you something else? You seem to know how this place works.', 'I am glad I came tonight.', 'Okay, I am going to go and talk to the people you mentioned.'],
    },
    reads: ['lib-st1', 'lib-st4', 'lib-f1'],
    exits: ['I should go and rescue my drink.', 'I am going to try the Wednesday lunch, I think.'],
  },

  // ── Care ────────────────────────────────────────────────
  {
    id: 'grief-father', name: 'Bhauju', role: 'Your aunt, four months after her husband died', scene: 'Care', emoji: '🕯️', difficulty: 5, color: '#f59e0b',
    brief: 'The family has stopped visiting. She is fine in front of company and not fine on the phone. Everyone keeps telling her to be strong, which she has started to hear as "stop talking about it".',
    goal: 'Be the person she can be not-fine in front of, for twenty minutes, without fixing anything.',
    traits: ['courteous first', 'tests whether you can tolerate the truth', 'repeats the story as a way of staying near it', 'exhausted by being managed'],
    likes: ['being asked about him by name', 'silence that is not awkward', 'being allowed to repeat the story', 'practical offers with a date on them'],
    dislikes: ['"he is in a better place"', '"be strong"', 'advice', 'being asked how she is coping with a bright voice'],
    opener: 'You did not have to come. Everyone has stopped coming, which is fair — there is nothing to say.',
    probes: [
      'What do you miss most about him?',
      'Do the evenings feel different from the mornings?',
      'What do you wish people would stop saying to you?',
    ],
    facts: [
      { turn: 1, text: 'He used to leave the radio on in the kitchen for the dog. I still turn it on. I know it is stupid.' },
      { turn: 2, text: 'People say be strong. I do not want to be strong. I want to be allowed to be like this.' },
      { turn: 3, text: 'The worst part is the fourth month. Everyone thinks you should be finished by now.' },
      { turn: 4, text: 'You are the first person who has asked me about him and not about me. Thank you.' },
    ],
    reactions: {
      cold: ['Yes. Well. Anyway.', 'It is fine. I am managing.', 'You do not need to hear all this.'],
      neutral: ['Mm. Yes.', 'He was, actually.', 'It is strange, is it not.'],
      warm: ['Sit down. Let me make you tea properly.', 'I have not said that out loud to anyone.', 'Come on Thursday. Just you, not the whole family.'],
    },
    reads: ['lib-ei1', 'lib-fam3', 'lib-dc2'],
    exits: ['Go home, it is late. Eat something on the way.', 'Come on Thursday and I will tell you the story about the scooter.'],
  },
  {
    id: 'friend-crisis', name: 'Nabin', role: 'Your closest friend, calling at 11pm', scene: 'Care', emoji: '📱', difficulty: 4, color: '#38bdf8',
    brief: 'He has called late, which he never does. He is talking fast and slightly off-topic, and every question you ask he answers with a joke. Something is wrong and he has not said what.',
    goal: 'Find out what is actually happening without making him perform being fine.',
    traits: ['funny as armour', 'allergic to sympathy', 'will tell you if you do not flinch', 'terrified of being a burden'],
    likes: ['being asked one plain question', 'being taken seriously without a tone change', 'practical company', 'being told you are not going anywhere'],
    dislikes: ['"are you okay?" in a soft voice', 'immediate advice', 'being handed a helpline as a first response', 'being talked about'],
    opener: 'Hey — no, nothing is wrong. I just. No. It is stupid. What are you doing, are you busy?',
    probes: [
      'I have got nowhere to be. What is going on?',
      'You do not have to make it a joke for me.',
      'Do you want me to come over or do you want to stay on the phone?',
    ],
    facts: [
      { turn: 1, text: 'I have not been sleeping. Like, four days properly.' },
      { turn: 2, text: 'I lost the contract. I have not told my parents. I have been leaving the house at eight every morning so they do not ask.' },
      { turn: 3, text: 'I am not — I am not in a bad way. I just did not want to be on my own with it tonight.' },
      { turn: 4, text: 'This is the first time I have said it out loud. It is a lot less heavy than I thought.' },
    ],
    reactions: {
      cold: ['You know what, forget it. Sorry I called.', 'I am being dramatic. I am fine.', 'Anyway — what about you?'],
      neutral: ['Yeah. Sort of.', 'It is fine. I am handling it.', 'Honestly? Not great.'],
      warm: ['I am glad I called you and not someone who would tell me to cheer up.', 'Can I ring you tomorrow as well?', 'Right. I am going to tell my mother tomorrow. Actually say it.'],
    },
    reads: ['lib-ei2', 'lib-dc4', 'lib-dc1'],
    exits: ['I am going to try and sleep. Thank you — genuinely.', 'Talk tomorrow? Same time, no dramatics.'],
  },
  {
    id: 'parent-decline', name: 'Baba', role: 'Your father, refusing help he now needs', scene: 'Care', emoji: '🧓', difficulty: 5, color: '#a78bfa',
    brief: 'He has fallen twice. He has not told the doctor. He is proud, sharp, and increasingly afraid of being managed — and every suggestion of help sounds to him like being demoted.',
    goal: 'Get one concrete safety change agreed, without taking his dignity and without a fight.',
    traits: ['proud', 'sharp', 'worries about being a burden more than he admits', 'negotiates everything', 'responds to being needed'],
    likes: ['being asked, not told', 'being the expert on his own life', 'being needed for something', 'solutions that keep him in charge'],
    dislikes: ['"we need to talk"', 'the word care', 'being discussed with his face absent', 'being treated like a patient'],
    opener: 'Before you start — I know what this conversation is, and the answer is that I am fine.',
    probes: [
      'What would actually make the stairs less of a problem for you?',
      'If I asked you to do one thing for me, not for you, what would you do?',
      'What are you most worried about losing?',
    ],
    facts: [
      { turn: 1, text: 'I fell in the bathroom in June. I did not tell your mother for two days.' },
      { turn: 2, text: 'What I cannot stand is the idea of a stranger in this house telling me when to eat.' },
      { turn: 3, text: 'The stairs are fine. It is the getting up in the night. That is when it happens.' },
      { turn: 4, text: 'If I put a light in the corridor and a rail in the bathroom, would that shut everyone up?' },
    ],
    reactions: {
      cold: ['This conversation is over.', 'I am not a child.', 'You can tell your mother I said no.'],
      neutral: ['Hm. Maybe.', 'Well. That is a different question.', 'I will think about it.'],
      warm: ['Fine. The light. And you can help me fit it.', 'You are not bad at this, you know.', 'Do not tell your sister I agreed before I have done it.'],
    },
    reads: ['lib-fam2', 'lib-fam1', 'lib-dc3'],
    exits: ['Right. Tea. Sit down.', 'We will do the light on Saturday. Bring a drill.'],
  },
  {
    id: 'colleague-burnout', name: 'Ishita', role: 'A colleague who has quietly stopped coping', scene: 'Care', emoji: '☕', difficulty: 3, color: '#fb923c',
    brief: 'She used to be the most organised person on the team. For six weeks she has been late, thin replies, and volunteered for nothing. Everyone is calling it a performance issue.',
    goal: 'Open a door she can walk through, and get her an ally rather than another manager.',
    traits: ['competent and ashamed', 'deflects with logistics', 'hyper-aware of being judged', 'will tell the truth to someone who is not evaluating her'],
    likes: ['being asked about the person, not the output', 'confidentiality stated plainly', 'small concrete offers', 'being believed'],
    dislikes: ['"is everything okay at home"', 'performance language', 'being told to use the EAP leaflet', 'surprise meetings'],
    opener: 'If this is about the last two weeks, I already know, and I am fixing it. I do not need a conversation about it.',
    probes: [
      'What is the hardest part of the week at the moment?',
      'Is there anything you would hand over if you could?',
      'Do you want me to know, or do you want me to leave it?',
    ],
    facts: [
      { turn: 1, text: 'My mother moved in in April. She has dementia. I am doing the nights.' },
      { turn: 2, text: 'I have not told anyone, because I watched what happened to Tom when he said something.' },
      { turn: 3, text: 'What I need is for the Tuesday review to not be at 9am. That is it. That one thing.' },
      { turn: 4, text: 'You are the only person who has asked me a question that did not have my performance in it.' },
    ],
    reactions: {
      cold: ['Right. Noted.', 'I will sort it out.', 'Is that all?'],
      neutral: ['Sort of. It is complicated.', 'That would help, actually.', 'I did not expect you to ask that.'],
      warm: ['Thank you. I have not said that out loud at work.', 'Can we keep this between us for now?', 'Okay. I will take the Tuesday thing. And I might take the rest.'],
    },
    reads: ['lib-pr1', 'lib-dc4', 'lib-ei2'],
    exits: ['I have a call in two minutes, but thank you.', 'I will move the review. And I will think about the rest.'],
  },

  // ── Interview ───────────────────────────────────────────
  {
    id: 'interview-hostile', name: 'Dr Ferreira', role: 'A panellist who thinks you are underqualified', scene: 'Interview', emoji: '🧐', difficulty: 5, color: '#f43f5e',
    brief: 'Third round. Two panellists are friendly; one has decided, based on your CV, that you have not done this at the scale they need. She is not cruel — she is testing whether you fold.',
    goal: 'Answer the doubt directly, with evidence, without defensiveness or apology.',
    traits: ['direct', 'allergic to adjectives', 'moves on the moment you concede', 'respects a specific number'],
    likes: ['naming the gap yourself', 'a concrete example with a figure in it', 'knowing what you do not know', 'one clean sentence'],
    dislikes: ['"I am a fast learner"', 'long answers', 'blaming a previous employer', 'overclaiming'],
    opener: 'Your background is mostly at smaller companies. Nothing here runs at a hundred people. Why would this be different?',
    probes: [
      'Give me a number that shows you can operate at this scale.',
      'What is the biggest thing you have broken, and what did it cost?',
      'What would you not be able to do in this role in the first six months?',
    ],
    facts: [
      { turn: 1, text: 'That is the first answer that has not started with an apology.' },
      { turn: 2, text: 'I am less worried about scale than about whether you can say no to people above you. Can you?' },
      { turn: 3, text: 'The honest problem with this role is that it has been open for nine months. I want to know why you would stay.' },
      { turn: 4, text: 'Right. I have one more, and it is the one that matters: what would make you leave us in a year?' },
    ],
    reactions: {
      cold: ['Hm. That is a lot of words for a small answer.', 'That is not what I asked.', 'Okay. I will note that.'],
      neutral: ['Fine. That is a real answer.', 'Go on.', 'Better.'],
      warm: ['Good. That is exactly the answer I was hoping not to get, if that makes sense.', 'I would like you to meet the team.', 'You have changed my mind on the scale question.'],
    },
    reads: ['lib-pr3', 'lib-pr4', 'lib-cr4'],
    exits: ['We will be in touch by Friday.', 'Thank you — that was a better interview than the last three.'],
  },
  {
    id: 'interview-salary', name: 'Rhea', role: 'Recruiter, after you have been offered the job', scene: 'Interview', emoji: '💼', difficulty: 4, color: '#22d3ee',
    brief: 'You want fifteen percent more than the offer. She has a band and a deadline, and she has done this two hundred times. She is friendly, fast, and will happily let silence do her work.',
    goal: 'Move the number meaningfully without damaging the offer or your credibility.',
    traits: ['warm and fast', 'uses silence deliberately', 'responds to a range with a reason', 'has less room than she lets on'],
    likes: ['a specific number and a reason', 'knowing your walk-away', 'being made to look good internally', 'one ask at a time'],
    dislikes: ['"I was hoping for more"', 'comparing to a friend salary', 'threats about other offers', 'reopening after agreement'],
    opener: 'So — delighted to say we would love to have you. The offer is on its way over. How does it land?',
    probes: [
      'What number would make this an easy yes?',
      'If I could not move the base, is there something else that matters to you?',
      'What is the thing you are least sure about?',
    ],
    facts: [
      { turn: 1, text: 'The band for this level is 88 to 96. You are at 89, which is the bottom, so there is room.' },
      { turn: 2, text: 'I can move base by four percent without a second approval. Above that goes to my director on Thursday.' },
      { turn: 3, text: 'Between us, the team is under-resourced and they will say yes to one thing if it is framed as retention risk.' },
      { turn: 4, text: 'If you ask for 95 and can start on the earlier date, I think I can get it approved today.' },
    ],
    reactions: {
      cold: ['Let me stop you there.', 'That is outside what I can do.', 'I will have to take that back to the panel.'],
      neutral: ['I can work with that framing.', 'Let me see what I can do.', 'That is a reasonable question.'],
      warm: ['Okay. I will put that in front of my director this morning.', 'That is the easiest conversation I have had all week.', 'Right — send me that in an email and I will get it done.'],
    },
    reads: ['lib-mny1', 'lib-pr2', 'lib-pr3'],
    exits: ['I will email you within the hour.', 'Speak Thursday either way. And congratulations, properly.'],
  },
  {
    id: 'interview-panel-three', name: 'The panel of three', role: 'A competency interview with a rotating panel', scene: 'Interview', emoji: '👥', difficulty: 4, color: '#818cf8',
    brief: 'Three interviewers taking turns: one wants stories, one wants process, one wants to know if you are difficult. Nobody will tell you which question is the real one.',
    goal: 'Read which of the three decides, and make sure all three leave with one specific memory of you.',
    traits: ['taking turns', 'one silent decider', 'scripted questions', 'watching how you handle a switch'],
    likes: ['STAR-shaped answers with a number', 'asking them a real question back', 'acknowledging the shift in topic', 'brevity'],
    dislikes: ['repeating one story twice', 'not knowing who asked what', 'filler', 'criticising the process'],
    opener: 'Thank you for coming in. We will each take a section — I will start, and then we will swap without warning. Is that alright?',
    probes: [
      'Can you give us a specific example of that?',
      'That is the same situation you described earlier — do you have a second one?',
      'Do you have a question for us that is not about the role?',
    ],
    facts: [
      { turn: 1, text: '(The woman on the right has not spoken. She is the hiring manager.)' },
      { turn: 2, text: 'I will jump in here — the other two are asking about how you work. I only care about what you would stop doing.' },
      { turn: 3, text: 'That was a good answer. We have not heard one of those today.' },
      { turn: 4, text: 'One last thing, and then we will let you go: what did you read or learn in the last six months that changed how you work?' },
    ],
    reactions: {
      cold: ['Right. Let us move on.', 'I think we have that one.', 'Okay. Next section.'],
      neutral: ['Good.', 'That is helpful.', 'Interesting.'],
      warm: ['I am glad you asked that.', 'That is the most specific answer we have had.', 'We will be in touch and quickly.'],
    },
    reads: ['lib-pr3', 'lib-cr4', 'lib-pr4'],
    exits: ['We will let you know by the end of the week.', 'Thank you — the door is behind you, and yes, it is a terrible door.'],
  },

  // ── the other thin scenes ───────────────────────────────
  {
    id: 'networking-senior', name: 'Anjali', role: 'A person ten years ahead of you, at a conference bar', scene: 'Networking', emoji: '🍸', difficulty: 3, color: '#2dd4bf',
    brief: 'She is more senior than anyone else here, and has forty minutes before a car. She is generous with advice and allergic to being flattered at.',
    goal: 'Convert fifteen minutes into one useful question answered, and a way to stay in touch that is not a business card.',
    traits: ['fast', 'generous', 'impatient with flattery', 'enjoys a precise question', 'values her own time visibly'],
    likes: ['a question she has not been asked', 'being disagreed with politely', 'specifics about your work', 'being told what you will do next'],
    dislikes: ['"can I pick your brain"', 'empty compliments', 'long self-introductions', 'being asked for a job'],
    opener: 'You have the look of someone who has been standing here working out how to say hello. Go on then.',
    probes: [
      'What is the question you actually came to ask?',
      'What do you think you are bad at?',
      'What are you going to do differently on Monday?',
    ],
    facts: [
      { turn: 1, text: 'I have fifteen minutes and then a car, so let us not do the introductions properly.' },
      { turn: 2, text: 'The single best thing I did in your position was get good at writing, not speaking. Nobody tells you that.' },
      { turn: 3, text: 'I am not going to give you a job. I might give you one introduction. Who do you want to meet?' },
      { turn: 4, text: 'Send me the thing you build in the next three months. Not a summary — the thing.' },
    ],
    reactions: {
      cold: ['Right. Well. Good luck with it.', 'Mm. I have to go and find someone.'],
      neutral: ['That is a decent question.', 'Okay, yes, that is the real problem.'],
      warm: ['Right. I am giving you a name.', 'Email me Monday and I will answer it properly.', 'You are going to be fine. Do not tell anyone I said that.'],
    },
    reads: ['lib-f2', 'lib-pr1', 'lib-st3'],
    exits: ['My car is here. Email me Monday.', 'Right — go and talk to the person by the door, not the people at the bar.'],
  },

  // ── Date / Casual Bar ───────────────────────────────────
  {
    id: 'date-second', name: 'Sam', role: 'Second date, two drinks in, deciding whether to go deeper', scene: 'Date / Casual Bar', emoji: '🍷', difficulty: 3, color: '#f472b6',
    brief: 'The first date was easy — jokes, jobs, travel. Tonight the small talk has run out and both of you can feel the choice: get real or get another round and let it fade.',
    goal: 'Say something true enough that she can decide about you honestly, without turning it into a confession.',
    traits: ['warm', 'funny as a reflex', 'watching for sincerity', 'will match whatever depth you offer'],
    likes: ['a real answer to a small question', 'being asked about something she cares about', 'self-awareness about your own patterns', 'not being performed at'],
    dislikes: ['interviews', 'humble-bragging', 'talking about an ex', 'asking a question and not listening to the answer'],
    opener: 'Okay, we have done jobs, siblings and travel. What is the actual thing you would want someone to know about you by date four?',
    probes: [
      'What do you do when you are having a bad week?',
      'What is something you have changed your mind about recently?',
      'When was the last time you were properly honest with someone?',
    ],
    facts: [
      { turn: 1, text: 'I ask a lot of questions on dates so I do not have to answer any. You noticed, which is annoying.' },
      { turn: 2, text: 'I got out of a seven-year thing last year and I am still working out what I actually want rather than what I am used to.' },
      { turn: 3, text: 'The thing I want someone to know by date four is that I am not as breezy as I seem.' },
      { turn: 4, text: 'I was going to do the polite thing and leave at ten. I am not going to do that.' },
    ],
    reactions: {
      cold: ['Ha. Anyway.', 'Right. Another drink?', 'You have gone quiet.'],
      neutral: ['Okay, that is a real answer.', 'Hm. I like that.', 'Go on, then.'],
      warm: ['I am glad you said that. I nearly did not come tonight.', 'Right, my turn, and mine is worse.', 'Let us get food. I am not finished with this.'],
    },
    reads: ['lib-wm2', 'lib-ei1', 'lib-wm4'],
    exits: ['I should get the last train.', 'Right — I am going to get food. Come or do not.'],
  },
  {
    id: 'date-ex-return', name: 'Anisha', role: 'Someone you were serious about, asking to meet', scene: 'Date / Casual Bar', emoji: '💔', difficulty: 5, color: '#e879f9',
    brief: 'Eight months after it ended badly, she has asked to meet. Nothing is decided. She is not sure whether she wants to repair, apologise, or just check you are worse off, and neither, honestly, are you.',
    goal: 'Find out what this actually is without either performing indifference or reopening the wound.',
    traits: ['direct', 'guarded about motive', 'tests for resentment', 'hates being managed'],
    likes: ['plain honesty about difficult things', 'not being made to beg', 'one clear question', 'a boundary stated calmly'],
    dislikes: ['coldness as a strategy', 'being told how she feels', 'rehashing the ending', 'being asked to decide tonight'],
    opener: 'I am not going to do a speech. I wanted to see you and I did not want to spend another month not knowing why.',
    probes: [
      'What do you actually want out of this evening?',
      'Are you still angry with me?',
      'What would you need to be different?',
    ],
    facts: [
      { turn: 1, text: 'I rehearsed this in the car twice and it still came out wrong.' },
      { turn: 2, text: 'I am not asking you to forget it. I am asking whether the thing that broke was the thing we were, or the month we were in.' },
      { turn: 3, text: 'There is a version of this where we are just two people who were bad at one specific year.' },
      { turn: 4, text: 'I do not need an answer tonight. I needed to say it to your face, which I did not do last time.' },
    ],
    reactions: {
      cold: ['Right. So this was a mistake.', 'You have not changed.', 'I am going to go.'],
      neutral: ['That is fair.', 'I did not expect you to say that.', 'Okay. Slowly, then.'],
      warm: ['I missed how you say difficult things.', 'I do not know what this is either. I would like to find out slowly.', 'Right. Same time next month, no speeches.'],
    },
    reads: ['lib-cr2', 'lib-cr5', 'lib-ei3'],
    exits: ['I am going to get a taxi before this gets too big.', 'Let us leave it there. It was the right thing to say.'],
  },
];
