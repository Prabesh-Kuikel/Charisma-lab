// ─────────────────────────────────────────────────────────────
//  Course content: 30-Day Fast Track + 90-Day Deep Dive
//  Each day = one insight + one drill + one reflection
// ─────────────────────────────────────────────────────────────

const d = (day, title, mentor, insight, drillType, drillName, prompt, minutes, xp) => ({
  day, title, mentor, insight,
  drill: { type: drillType, name: drillName, prompt, minutes },
  xp,
});

export const FAST_TRACK = {
  id: 'fast',
  name: '30-Day Fast Track',
  subtitle: 'Voice, structure and social spark in one month.',
  description:
    'A daily, 12–18 minute sprint. Week 1 rebuilds your instrument, Week 2 installs structure, Week 3 makes you a story machine, Week 4 turns it into social presence.',
  days: [
    // ── Week 1 · The Instrument
    d(1, 'Baseline Recording', 'giang', 'You cannot improve what you have never heard. Today you meet your own voice as a stranger would.', 'impromptu', 'Cold Open', 'Record a 60-second answer to: "Who are you when you are at your best?" Do not script it.', 15, 40),
    d(2, 'The Air Rule', 'giang', 'Articulation comes from space, not force. Fill your mouth with air and consonants clean themselves up.', 'pronunciation', 'Space & Consonants', 'Run the "Red Leather, Yellow Leather" ladder three times slowly, then once at speed.', 12, 40),
    d(3, 'Verse, Not Prose', 'ultraspeaking', 'Speak in short chunks. One idea, one breath. Long sentences are where confidence goes to die.', 'impromptu', 'Chunk the Answer', 'Answer "What is one thing you changed your mind about?" in five separate 6-word chunks.', 12, 45),
    d(4, 'The 5 Dial of Voice', 'giang', 'Pitch, pace, pause, projection, tone. Today you will deliberately move three of them.', 'pronunciation', 'Dial Drill', 'Say the same 20-word sentence five times — once each: slow, loud, whisper, low-pitch, staccato.', 14, 45),
    d(5, 'Filler Audit', 'ultraspeaking', 'Um, like, sort of, kind of — these are brakes you are pumping without knowing it.', 'impromptu', 'Zero-Filler Run', 'Speak for 90 seconds on "the last thing that genuinely surprised me". Target zero filler words.', 15, 50),
    // ── Week 2 · Structure
    d(6, 'The Power of Silence', 'greene', 'Say less than necessary. Silence makes other people lean in and fill the gap.', 'impromptu', 'Pause Practice', 'Tell a 60-second story but insert a full 3-second pause before every punchline.', 12, 50),
    d(7, 'PREP Framework', 'humm', 'Point, Reason, Example, Point. The four-beat structure that survives any panic.', 'impromptu', 'PREP Sprint', 'Use PREP to answer: "Should everyone learn to negotiate?" in 90 seconds.', 15, 50),
    d(8, 'Hook, Line, Sinker', 'vanessa', 'The first seven words decide whether the rest is heard.', 'impromptu', 'Seven-Word Hooks', 'Write and speak five different opening lines for the same story. Keep the one that makes you lean forward.', 14, 50),
    d(9, 'Head–Heart–Hands', 'humm', 'Logic persuades the head, story moves the heart, a clear ask moves the hands. Most speakers only do the head.', 'impromptu', 'Three-Part Persuasion', 'Pitch a hobby as if it were an investment. Hit head, heart and hands in 2 minutes.', 16, 55),
    d(10, 'The Three-Second Rule', 'vanessa', 'Pausing for three seconds before you answer reads as gravity, not hesitation.', 'arena', 'Gravity Reps', 'In the Arena, take a full beat before each reply. Notice how the other person waits.', 12, 55),
    // ── Week 3 · Story
    d(11, 'Story Spine', 'clark', 'Once upon a time / every day / until one day / because of that / until finally. Six lines, infinite stories.', 'story', 'Spine a Memory', 'Take a childhood memory through all six spine beats out loud in 2 minutes.', 15, 55),
    d(12, 'Specificity Sells', 'vanessa', 'Generic stories bounce off. "A blue plastic chair" sticks where "a chair" evaporates.', 'story', 'Detail Swap', 'Retell yesterday in 90 seconds using only concrete nouns and no adjectives of judgement.', 12, 55),
    d(13, 'The Vulnerability Dial', 'carnegie', 'Admitting a small failure buys enormous trust — provided it costs you something.', 'story', 'Costly Truth', 'Tell a 2-minute story about a mistake you made where you were clearly wrong.', 15, 60),
    d(14, 'Callbacks & Loops', 'vanessa', 'Open a curiosity loop early, close it late. The audience stays for the payoff.', 'story', 'Close the Loop', 'Tell a 2-minute story that plants a question in the first 15 seconds and answers it at the end.', 14, 60),
    d(15, 'The One-Liner Economy', 'greene', 'Compression is power. If it takes 40 words to be funny, you are explaining, not joking.', 'wit', 'Cut to Ten', 'Take three rambling thoughts from today and compress each to a single 10-word line.', 14, 60),
    // ── Week 4 · Spark & Presence
    d(16, 'The Callback Weapon', 'vanessa', 'Inside jokes are just callbacks with a shorter runway. Reference something from 20 minutes ago.', 'wit', 'Callback Reps', 'In three Arena conversations, reference a specific detail the other person mentioned earlier.', 15, 65),
    d(17, 'Self-Deprecation, Properly', 'carnegie', 'Punch yourself, never your listener. Low status on purpose is a high-status move.', 'wit', 'Charm Flip', 'In the Wit Simulator, answer three high-status teases with warmth plus a small self-jab.', 14, 65),
    d(18, 'The Agree-and-Elevate', 'greene', 'Never argue. Agree, then escalate the frame until the tension becomes yours to steer.', 'arena', 'Tension Reps', 'Run the "Resolving Tension" arena three times. Never contradict. Only reframe.', 16, 65),
    d(19, 'Read the Room in 4 Seconds', 'vanessa', 'Feet, torso, hands, eyes. In that order you can read someone\'s real interest before they speak.', 'body', 'Cue Spotting', 'Score 10 decoder cards. Then predict one real person\'s mood before they talk.', 12, 65),
    d(20, 'Names & Attention', 'carnegie', 'Use a name twice in the first minute, then never again — attention without flattery.', 'arena', 'Name Lock', 'In the Networking arena, use the persona\'s name early and well.', 12, 65),
    d(21, 'The Status Flip', 'greene', 'Status is a dial, not a trait. Voluntarily lower it to make others comfortable; raise it to anchor a decision.', 'wit', 'Status Dial', 'Say the same thing three ways: deferential, equal, authoritative. Feel the shift.', 14, 70),
    d(22, 'Storytelling Under Pressure', 'ultraspeaking', 'Improvise a story with a stranger\'s word as your theme. No prep, no rescue.', 'impromptu', 'Random Constraint', 'Generate an impromptu prompt, take 10 seconds of prep, speak for 2 minutes.', 16, 70),
    d(23, 'Warmth + Competence', 'vanessa', 'Signal both in the first 30 seconds or people quietly sort you into "nice but useless" or "impressive but cold".', 'arena', '30-Second Sort', 'Open three arena conversations with one warm signal and one competence signal.', 15, 70),
    d(24, 'Handling the Interrupt', 'humm', 'Do not speed up. Slow down, finish the sentence, then hand the floor back with a question.', 'impromptu', 'Interrupt Drill', 'Speak for 2 minutes where every 20 seconds you must pause, hold, and continue on a new prompt.', 14, 70),
    d(25, 'The Humor Swing', 'greene', 'Missed jokes build trust when you own the miss. Never explain the joke — narrate the failure.', 'wit', 'Bomb Recovery', 'Make three deliberately bad puns in the Wit Simulator and recover each with charm.', 14, 75),
    d(26, 'Power Listening', 'carnegie', 'The most charismatic thing you can do in a conversation is remember and reference specifics.', 'arena', 'Mirror & Extend', 'In the Arena, paraphrase the persona\'s last line before adding your own.', 14, 75),
    d(27, 'Micro-Expression Literacy', 'vanessa', 'Micro-flashes are leaks, not proof. Use them to ask better questions, never to accuse.', 'body', 'Flash Reading', 'Score 12 decoder cards and write down the question you would ask in each scenario.', 12, 75),
    d(28, 'The 90-Second Pitch', 'clark', 'You need one story about yourself that survives retelling by someone else.', 'impromptu', 'Signature Story', 'Deliver your 90-second signature story. Then deliver it again in 45 seconds.', 18, 80),
    d(29, 'Live Fire', 'humm', 'Skills transfer only under mild social risk. Today you perform for a real human.', 'arena', 'Live Run', 'Run two full Arena scenarios back to back, then one real-world conversation you would normally avoid.', 20, 80),
    d(30, 'Graduation Tape', 'giang', 'Put Day 1 and Day 30 side by side. The delta is the evidence.', 'impromptu', 'Re-Baseline', 'Re-record the Day 1 prompt. Compare clarity, pace and filler count.', 15, 100),
  ],
};

// ── 90-Day Deep Dive ────────────────────────────────────────
const B = (n, name, subtitle) => ({ n, name, subtitle });

export const DEEP_BLOCKS = [
  B(1, 'Foundation & Instrument', 'Days 1–10 · Breath, articulation, resonance'),
  B(2, 'Structure & Spontaneity', 'Days 11–20 · Frameworks that survive panic'),
  B(3, 'Storytelling Mastery', 'Days 21–30 · Arc, detail, emotion, payoff'),
  B(4, 'Presence & Body Language', 'Days 31–40 · Status, space, micro-signals'),
  B(5, 'Wit, Humor & Banter', 'Days 41–50 · Timing, callbacks, status play'),
  B(6, 'Social Intelligence', 'Days 51–60 · Rapport, curiosity, group dynamics'),
  B(7, 'Influence & Negotiation', 'Days 61–70 · Framing, concessions, power laws'),
  B(8, 'Stage, Camera & Authority', 'Days 71–80 · Projection, silence, on-camera'),
  B(9, 'Mastery & Signature Voice', 'Days 81–90 · Integration and personal brand'),
];

const raw = [
  // Block 1
  [1, 'Breath as Foundation', 'giang', 'Breath is the volume knob of presence. Shallow breath makes a shallow voice.', 'voice', 'Diaphragm Set', 'Read a paragraph aloud with a hand on your ribs. Ribs must widen, shoulders must not rise.', 12, 40],
  [2, 'Articulator Warm-up', 'giang', 'Lips, tongue, jaw — three muscles most speakers never isolate.', 'pronunciation', 'Warm-up Ladder', 'Run three tongue twisters twice each: slow-precise, then fast.', 12, 40],
  [3, 'Pitch Range Expansion', 'giang', 'Monotone is a narrow band, not a personality.', 'voice', 'Pitch Ladder', 'Say the alphabet sliding your pitch up on each letter, then down.', 12, 40],
  [4, 'Pace Control', 'ultraspeaking', 'Speed is a tool. Speed by accident is anxiety.', 'voice', 'Speed Switch', 'Tell the same 90-second story once at 100 wpm, once at 170 wpm.', 14, 45],
  [5, 'Pause as Punctuation', 'giang', 'Most speakers use volume where they need silence.', 'voice', 'Silence Sprint', 'Speak 2 minutes replacing every comma with a 1-second pause.', 14, 45],
  [6, 'Projection Without Shouting', 'humm', 'Project to the back wall and the front row still feels intimacy.', 'voice', 'Wall Test', 'Deliver a 1-minute announcement to the far side of your room, then to a whisper.', 12, 45],
  [7, 'Tone Colouring', 'giang', 'The same sentence can comfort or threaten. Tone carries the meaning.', 'voice', 'Emotion Palette', 'Say "We need to talk" in six different emotional colours.', 12, 45],
  [8, 'Recording Review', 'ultraspeaking', 'Feedback loops beat practice volume. Review as a coach, not a critic.', 'impromptu', 'Coach Review', 'Record 90 seconds, transcribe it, and mark one clarity win and one energy miss.', 15, 50],
  [9, 'Elimination of Uptalk', 'giang', 'Statements that end upward beg for approval.', 'voice', 'Down-Turn Drill', 'Make ten statements. Land each final word downward.', 12, 50],
  [10, 'Instrument Checkpoint', 'giang', 'Measure the instrument before adding repertoire.', 'impromptu', 'Baseline 2.0', 'Record a 2-minute talk. Score clarity, pace, filler count and energy.', 18, 60],
  // Block 2
  [11, 'PREP', 'humm', 'Point, Reason, Example, Point — the emergency structure.', 'impromptu', 'PREP x3', 'Three PREP answers, 90 seconds each, random prompts.', 15, 50],
  [12, 'What-So What-Now What', 'humm', 'A structure that forces you to be useful, not just interesting.', 'impromptu', 'Action Close', 'Explain a habit in three beats and end with one ask.', 15, 50],
  [13, 'Past-Present-Future', 'clark', 'Time boxes let you narrate momentum.', 'impromptu', 'Timeline Talk', 'Give a 2-minute update on any project using past-present-future.', 15, 50],
  [14, 'The Rule of Three', 'vanessa', 'Three is the smallest number that feels complete.', 'impromptu', 'Trilogy Sets', 'Answer five questions with exactly three points each — never four.', 14, 50],
  [15, 'Problem-Agitate-Resolve', 'greene', 'Tension must be built before relief is felt.', 'impromptu', 'PAR Pitch', 'Pitch a change you want in your life using PAR in 90 seconds.', 15, 55],
  [16, 'Contrast Frames', 'greene', 'Meaning lives in the gap between two things.', 'impromptu', 'Two-Worlds', 'Describe your work by contrasting it with the opposite of your work.', 14, 55],
  [17, 'Improvised Openings', 'ultraspeaking', 'The first line is a muscle. Train it cold.', 'impromptu', 'Cold Open x5', 'Five random prompts, five cold openings, 20 seconds each.', 14, 55],
  [18, 'Handling Hostile Questions', 'greene', 'Acknowledge the frame, then relocate to yours.', 'arena', 'Hostile Q&A', 'Take three hostile arena replies. Never defend — reframe.', 16, 55],
  [19, 'The 30-Second Version', 'humm', 'If you cannot compress, you do not yet understand it.', 'impromptu', 'Elevator Cut', 'Take a 3-minute idea down to 30 seconds with the same punch.', 14, 55],
  [20, 'Structure Checkpoint', 'humm', 'Structure should be invisible but load-bearing.', 'impromptu', 'Blind Structure', 'Speak for 2 minutes and have your listener identify which framework you used.', 16, 60],
  // Block 3
  [21, 'Story Spine', 'clark', 'Six beats carry any story.', 'story', 'Spine x2', 'Two memories through the six beats, 2 minutes each.', 16, 55],
  [22, 'Concrete Detail', 'vanessa', 'Specific nouns create memory; adjectives create fog.', 'story', 'Noun-Only Scene', 'Describe a room you love using only concrete nouns and verbs.', 14, 55],
  [23, 'Stakes & Want', 'greene', 'No want, no story. No stakes, no listening.', 'story', 'Want / Obstacle', 'Retell a story stating the want and obstacle in the first 20 seconds.', 15, 55],
  [24, 'The Midpoint Turn', 'clark', 'Every good story has a hinge where the situation reverses.', 'story', 'The Hinge', 'Tell a 2-minute story and make the turn obvious in one sentence.', 15, 55],
  [25, 'Sensory Colour', 'vanessa', 'Add two senses and the listener builds the scene for you.', 'story', 'Sense Pair', 'Retell any story adding exactly one sound and one smell.', 14, 55],
  [26, 'Vulnerability Calibration', 'carnegie', 'Reveal enough to be real, not so much that it becomes a burden.', 'story', 'Calibrated Reveal', 'Tell a failure story where you disclose one real cost and one lesson.', 16, 60],
  [27, 'Humor Inside Story', 'greene', 'Funny belongs to structure: subvert the expectation you built.', 'story', 'Plant the Twist', 'Tell a story with one planted expectation and one sudden subversion.', 15, 60],
  [28, 'Endings That Land', 'humm', 'End on the image, not the explanation.', 'story', 'Killer Last Line', 'Rewrite three story endings down to a single image line each.', 14, 60],
  [29, 'Your Signature Story', 'clark', 'One story that is unmistakably yours, retellable by others.', 'story', 'Signature Draft', 'Draft and deliver your signature 90-second story.', 18, 65],
  [30, 'Story Checkpoint', 'clark', 'Test it on a stranger. Their retelling is your real draft.', 'story', 'Stranger Test', 'Tell the signature story to one person, then ask what they remember.', 18, 70],
  // Block 4
  [31, 'Status Transactions', 'greene', 'Every interaction has a status rhythm. Learn to dial yours.', 'body', 'Status Dial', 'Deliver one line deferential, equal, dominant. Note the room change.', 14, 60],
  [32, 'Ocular Engagement', 'vanessa', 'Sixty to seventy percent eye contact reads as confident; 100% reads as threat.', 'body', 'Eye Triangle', 'Practise the eye-to-eye-to-mouth triangle in three conversations.', 12, 60],
  [33, 'Open Torso, Visible Hands', 'vanessa', 'Hidden hands read as hidden intent.', 'body', 'Hand Discipline', 'Speak 3 minutes with hands visible above waist, palms occasionally up.', 13, 60],
  [34, 'Space & Stance', 'humm', 'Plant before you speak. Fidgeting hands follow unstable feet.', 'body', 'Rooted Stance', 'Hold a 3-minute talk with feet hip-width and zero weight shifting.', 14, 60],
  [35, 'Micro-Expression Literacy', 'vanessa', 'Flashes are information, not verdicts.', 'body', 'Flash Reading', 'Score 12 decoder cards and note the follow-up question each demands.', 15, 60],
  [36, 'The Four-Second Read', 'vanessa', 'Feet, torso, hands, eyes — in that order.', 'body', 'Room Read', 'Observe three people for 4 seconds each and predict their mood.', 12, 60],
  [37, 'Gesture Vocabulary', 'humm', 'Gestures should enlarge meaning, not decorate nerves.', 'body', 'Gesture Map', 'Tell a story where each of three ideas gets a distinct gesture.', 14, 65],
  [38, 'Proximity & Mirroring', 'carnegie', 'Match energy first, then lead it. Never mirror the anger.', 'arena', 'Match then Lead', 'In the Arena, match the persona\'s energy for two turns, then slow it.', 15, 65],
  [39, 'Face Management', 'greene', 'A still face is a strategy; a warm face is a weapon. Pick deliberately.', 'body', 'Neutral Mask', 'Hold a warm neutral face while hearing three provocative lines.', 13, 65],
  [40, 'Presence Checkpoint', 'vanessa', 'Film yourself. The gap between felt and seen is the work.', 'body', 'Self-Audit', 'Record 2 minutes on camera and score stance, hands, eyes, energy.', 18, 75],
  // Block 5
  [41, 'Timing Mechanics', 'greene', 'Comedy is 70% placement. Put the funny word last.', 'wit', 'Punchword Move', 'Take five sentences and move the funny word to the end.', 13, 65],
  [42, 'The Callback', 'vanessa', 'Reuse a detail from earlier; familiarity does the work.', 'wit', 'Callback Chain', 'Three wit scenarios, each referencing an earlier detail.', 14, 65],
  [43, 'Self-Deprecation Done Right', 'carnegie', 'Aim inward, aim small, aim once.', 'wit', 'Inward Jab', 'Three teases answered with warmth plus one small self-jab.', 14, 65],
  [44, 'Charm Flip', 'greene', 'Turn an insult into an invitation.', 'wit', 'The Flip', 'Answer three hostile wit prompts by flipping the frame in one line.', 15, 70],
  [45, 'Deadpan & Dry', 'giang', 'Understatement is the highest-energy low-energy.', 'wit', 'Dry Delivery', 'Deliver five absurd statements with a totally straight face and flat tone.', 12, 70],
  [46, 'Misdirection Setup', 'greene', 'The listener must be looking elsewhere when the turn arrives.', 'wit', 'Bait and Turn', 'Build three 2-sentence setups that misdirect, then land.', 14, 70],
  [47, 'Banter Bounds', 'carnegie', 'Banter targets the shared moment, never the person\'s wound.', 'wit', 'Safe Targets', 'Run the group-banter scenario practising three safe targets.', 14, 70],
  [48, 'Recovering from a Bomb', 'humm', 'Narrate the failure, never defend the joke.', 'wit', 'Bomb Recovery', 'Three intentionally bad jokes, three smooth recoveries.', 13, 70],
  [49, 'Rapid Fire Retorts', 'greene', 'Speed comes from prepared patterns, not wit on demand.', 'wit', 'Retort Sprints', 'Ten retort prompts at 8 seconds each.', 15, 75],
  [50, 'Wit Checkpoint', 'vanessa', 'Humor without warmth is aggression.', 'wit', 'Warm Wit', 'Three scenarios where the final line must make the other person feel good.', 16, 80],
  // Block 6
  [51, 'Open Questions', 'carnegie', 'Never ask what can be answered in one word.', 'arena', 'Question Ladder', 'Run three conversations using only open questions.', 14, 70],
  [52, 'The Callback Economy', 'vanessa', 'People feel seen when their details return later.', 'arena', 'Detail Return', 'In two conversations, return a detail from 5+ turns earlier.', 14, 70],
  [53, 'Listening Loops', 'carnegie', 'Paraphrase, then add. Paraphrase proves attention.', 'arena', 'Mirror & Extend', 'Paraphrase each persona reply before responding.', 14, 70],
  [54, 'Joy Mining', 'vanessa', 'Find the topic that makes their face change, then stay there.', 'arena', 'Topic Hunt', 'Find each persona\'s sparkle topic within four turns.', 15, 70],
  [55, 'Graceful Exit', 'greene', 'How you leave is remembered more than how you arrived.', 'arena', 'Exit Lines', 'End three conversations with a warm, specific exit.', 12, 70],
  [56, 'Group Dynamics', 'greene', 'In groups, the quiet one is often the highest-status.', 'arena', 'Group Entry', 'Enter a group scenario, add value in one line, then yield.', 15, 75],
  [57, 'Difficult People', 'carnegie', 'Give them the dignity they are fighting for and the fight ends.', 'arena', 'Face Saving', 'Resolve three tension scenarios without anyone losing.', 16, 75],
  [58, 'Curiosity as Charisma', 'vanessa', 'Fascination is more seductive than brilliance.', 'arena', 'Deep Dive', 'Ask five follow-ups before offering any opinion.', 15, 75],
  [59, 'Compliments That Land', 'carnegie', 'Praise the specific choice, not the general trait.', 'arena', 'Specific Praise', 'Deliver three specific compliments inside conversation.', 13, 75],
  [60, 'Social Checkpoint', 'vanessa', 'Charisma is measured by how people feel after you leave.', 'arena', 'Post-Call Review', 'Run one full conversation and write how the persona would describe you.', 18, 85],
  // Block 7
  [61, 'Frame Control', 'greene', 'Whoever names the frame, owns the conversation.', 'arena', 'Frame Naming', 'Reframe three arena replies with a single naming sentence.', 15, 75],
  [62, 'Anchoring', 'greene', 'The first number sets the weather for the rest of the storm.', 'impromptu', 'Anchor Drill', 'Practise opening a negotiation with a confident anchor plus silence.', 14, 75],
  [63, 'Strategic Concessions', 'greene', 'Give slowly, never freely, and always get a trade.', 'impromptu', 'Trade Not Give', 'Run three trades where every concession is conditional.', 14, 75],
  [64, 'Silence Leverage', 'greene', 'The person comfortable with silence usually wins it.', 'arena', 'Hold the Pause', 'In three replies, remain silent after the persona finishes.', 13, 75],
  [65, 'The Eager Want', 'carnegie', 'Frame your ask in their language of benefit.', 'impromptu', 'Benefit Frame', 'Make three asks entirely in terms of their gain.', 14, 80],
  [66, 'Let Them Save Face', 'carnegie', 'Never corner. Always leave a dignified exit.', 'arena', 'Face Route', 'Escape three confrontations so the other side looks good.', 15, 80],
  [67, 'Saying No Beautifully', 'humm', 'A clean no is a kindness; a fuzzy no is a debt.', 'impromptu', 'Clean Refusal', 'Refuse three requests warmly and without explanation.', 13, 80],
  [68, 'Authority Signals', 'vanessa', 'Competence is shown by precision, not volume.', 'impromptu', 'Precision Pass', 'Explain a complex topic in 90 seconds with zero hedging language.', 15, 80],
  [69, 'Power Law Application', 'greene', 'Pick three laws from the library and apply them in one real conversation.', 'library', 'Law Selection', 'Study 3 power laws, then design one real-world application each.', 16, 80],
  [70, 'Influence Checkpoint', 'carnegie', 'Influence is measured in what others do, not what you said.', 'arena', 'Outcome Run', 'Run a negotiation arena and aim for a concrete agreement.', 18, 90],
  // Block 8
  [71, 'Stage Anchoring', 'humm', 'Walk to your mark, stop, breathe, then speak.', 'voice', 'Mark & Breathe', 'Rehearse a 3-minute talk with a deliberate start ritual.', 15, 80],
  [72, 'Opening 15 Seconds', 'vanessa', 'The room decides in the first 15 seconds whether to trust you.', 'impromptu', 'Cold Stage Open', 'Write and deliver five openings that require no introduction.', 15, 80],
  [73, 'On-Camera Presence', 'vanessa', 'The lens sees what a room forgives.', 'voice', 'Lens Eye', 'Record 2 minutes talking to the lens, no notes, eyes on the glass.', 15, 80],
  [74, 'Big Room Projection', 'giang', 'Projection is support, not strain.', 'voice', 'Far Wall', 'Deliver a story as if to a 200-person room, then to a camera close-up.', 14, 80],
  [75, 'Slide-less Structure', 'humm', 'If the deck is the message, you are the appendix.', 'impromptu', 'No-Notes Talk', 'Deliver a 4-minute talk with zero notes.', 18, 85],
  [76, 'Q&A Under Fire', 'greene', 'Answer the question they meant, not the one they asked.', 'arena', 'Press Conference', 'Handle five rapid hostile questions.', 16, 85],
  [77, 'The Emotional Beat', 'clark', 'One honest pause in a talk is worth ten slides.', 'impromptu', 'Held Beat', 'Deliver a 3-minute talk with one 4-second emotional pause.', 15, 85],
  [78, 'Landing the Ask', 'humm', 'End with a single, concrete, easy next action.', 'impromptu', 'One Ask', 'Deliver three closings each with exactly one ask.', 14, 85],
  [79, 'Camera Interview', 'clark', 'Answer in soundbites; the edit will thank you.', 'impromptu', 'Soundbite Answers', 'Answer five questions in 20 seconds each, one quotable line guaranteed.', 16, 85],
  [80, 'Stage Checkpoint', 'humm', 'Rehearse the ending harder than the beginning.', 'impromptu', 'Full Run', 'Deliver a 5-minute talk start to finish, recorded, then review.', 20, 95],
  // Block 9
  [81, 'Voice Brand Audit', 'clark', 'Your brand is the three words people use when you are not there.', 'voice', 'Three Words', 'Define three words you want to own, then speak a paragraph demonstrating them.', 16, 85],
  [82, 'Signature Frameworks', 'humm', 'Give your ideas names and they will travel without you.', 'impromptu', 'Name Your Model', 'Invent and deliver a named framework for something you actually know.', 18, 85],
  [83, 'Teaching What You Know', 'carnegie', 'You learn a subject the moment you teach it.', 'impromptu', 'Teach It', 'Teach a concept to an imaginary beginner in 3 minutes, zero jargon.', 16, 85],
  [84, 'Narrative of Becoming', 'clark', 'Say where you are going, not only where you have been.', 'story', 'Future Arc', 'Deliver a 2-minute story about who you are becoming.', 16, 90],
  [85, 'High-Stakes Rehearsal', 'ultraspeaking', 'Pressure is a rehearsal environment, not an enemy.', 'impromptu', 'Pressure Set', 'Three 90-second talks back to back with no break.', 18, 90],
  [86, 'Difficult Room', 'greene', 'Sceptical rooms are converted by calm, not charm.', 'arena', 'Sceptic Arena', 'Handle a sceptical persona for 8 turns without over-explaining.', 16, 90],
  [87, 'The 20-Minute Talk', 'humm', 'Long form is structure plus pacing plus relief.', 'impromptu', 'Long Form', 'Outline and deliver a 20-minute talk in three sections with one story each.', 25, 95],
  [88, 'Brand Story in 60', 'clark', 'One minute that makes people want the next one.', 'impromptu', 'Sixty Seconds', 'Deliver your brand story in 60 seconds with a callback.', 15, 95],
  [89, 'Mentor Review', 'ultraspeaking', 'Compare Day 1 to Day 89 and name the mechanism of change.', 'impromptu', 'Delta Review', 'Re-record your Day 1 baseline and analyse the difference in detail.', 18, 100],
  [90, 'Graduation Live', 'humm', 'Mastery is performed in public.', 'arena', 'Final Stage', 'Run a full Arena scenario and one real high-stakes conversation.', 25, 150],
];

export const DEEP_DIVE = {
  id: 'deep',
  name: '90-Day Deep Dive',
  subtitle: 'Nine blocks of ten days. From instrument to authority.',
  description:
    'A structured quarter of practice. Each block builds on the last: voice → structure → story → presence → wit → social → influence → stage → signature voice. Every tenth day is a checkpoint.',
  blocks: DEEP_BLOCKS,
  days: raw.map(([day, title, mentor, insight, drillType, drillName, prompt, minutes, xp]) =>
    d(day, title, mentor, insight, drillType, drillName, prompt, minutes, xp)
  ),
};

export const TRACKS = [FAST_TRACK, DEEP_DIVE];
export const TRACK_MAP = { fast: FAST_TRACK, deep: DEEP_DIVE };
