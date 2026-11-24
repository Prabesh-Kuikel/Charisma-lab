// ─────────────────────────────────────────────────────────────
//  Lab expansion pack
//  More impromptu prompts, more tongue twisters, more pangrams.
//  Merged into IMPROMPTU_PROMPTS / TWISTERS / PANGERAMS.
// ─────────────────────────────────────────────────────────────

export const EXTRA_PROMPTS = [
  // ── Sales ────────────────────────────────────────────────
  { id: 'p43', text: 'Sell a service that makes meetings shorter, to someone whose job is running meetings.', category: 'Sales', difficulty: 3, prep: 15, speak: 90 },
  { id: 'p44', text: 'You have 60 seconds to sell a stranger on your favourite book.', category: 'Sales', difficulty: 1, prep: 10, speak: 60 },
  { id: 'p45', text: 'Pitch a product that deliberately does less than its competitor.', category: 'Sales', difficulty: 3, prep: 20, speak: 90 },
  { id: 'p46', text: 'Handle this objection out loud: "It is too expensive."', category: 'Sales', difficulty: 2, prep: 10, speak: 60 },
  { id: 'p47', text: 'Sell a second-hand umbrella on a sunny day.', category: 'Sales', difficulty: 2, prep: 10, speak: 60 },
  { id: 'p48', text: 'Explain your pricing model to someone who has never bought consulting.', category: 'Sales', difficulty: 3, prep: 20, speak: 120 },
  { id: 'p49', text: 'Convince a friend to raise their prices by 20%.', category: 'Sales', difficulty: 3, prep: 15, speak: 120 },
  { id: 'p50', text: 'Ask for the sale in three different ways, out loud.', category: 'Sales', difficulty: 2, prep: 15, speak: 90 },

  // ── Persuasion ───────────────────────────────────────────
  { id: 'p51', text: 'Persuade a room that shorter emails are more persuasive.', category: 'Persuasion', difficulty: 2, prep: 15, speak: 120 },
  { id: 'p52', text: 'Someone says your plan will not work. Concede one thing, then answer.', category: 'Persuasion', difficulty: 3, prep: 15, speak: 90 },
  { id: 'p53', text: 'Argue for the opposite of what you actually believe, convincingly.', category: 'Persuasion', difficulty: 3, prep: 20, speak: 120 },
  { id: 'p54', text: 'Present a decision as two honest costs instead of one recommendation.', category: 'Persuasion', difficulty: 2, prep: 15, speak: 90 },
  { id: 'p55', text: 'Explain what would change your mind about something you are sure of.', category: 'Persuasion', difficulty: 2, prep: 15, speak: 120 },
  { id: 'p56', text: 'Make the case for a budget cut that affects you personally.', category: 'Persuasion', difficulty: 3, prep: 20, speak: 120 },

  // ── Clarity ──────────────────────────────────────────────
  { id: 'p57', text: 'Explain compound interest to a nine-year-old in 90 seconds.', category: 'Clarity', difficulty: 2, prep: 10, speak: 90 },
  { id: 'p58', text: 'Describe how your product works without using any jargon.', category: 'Clarity', difficulty: 2, prep: 10, speak: 90 },
  { id: 'p59', text: 'Summarise your job in one sentence — then defend it in ninety seconds.', category: 'Clarity', difficulty: 3, prep: 15, speak: 90 },
  { id: 'p60', text: 'Explain a mistake you made using only cause and effect, no adjectives.', category: 'Clarity', difficulty: 3, prep: 15, speak: 120 },
  { id: 'p61', text: 'Give three reasons — and make the third one the real reason.', category: 'Clarity', difficulty: 2, prep: 10, speak: 90 },
  { id: 'p62', text: 'Read out a decision, then explain it so nobody needs the email again.', category: 'Clarity', difficulty: 2, prep: 15, speak: 120 },

  // ── Story ────────────────────────────────────────────────
  { id: 'p63', text: 'Tell a story in which you are not the hero.', category: 'Story', difficulty: 3, prep: 20, speak: 150 },
  { id: 'p64', text: 'Tell the story of a conversation that changed a decision.', category: 'Story', difficulty: 2, prep: 20, speak: 120 },
  { id: 'p65', text: 'Open mid-scene: "The client said we were going with someone else, and I said one sentence." Finish the story.', category: 'Story', difficulty: 3, prep: 15, speak: 120 },
  { id: 'p66', text: 'Tell a ninety-second story with exactly one sound and one smell in it.', category: 'Story', difficulty: 3, prep: 20, speak: 90 },
  { id: 'p67', text: 'Describe a place that no longer exists.', category: 'Story', difficulty: 2, prep: 15, speak: 120 },
  { id: 'p68', text: 'Tell a story where the smallest detail turns out to be the point.', category: 'Story', difficulty: 3, prep: 20, speak: 120 },
  { id: 'p69', text: 'Tell the same thirty-second story twice — first badly, then well.', category: 'Story', difficulty: 2, prep: 10, speak: 90 },
  { id: 'p70', text: 'Tell a story about a silence you did not fill.', category: 'Story', difficulty: 3, prep: 20, speak: 120 },

  // ── Performance ──────────────────────────────────────────
  { id: 'p71', text: 'Give a two-minute conference talk that opens with a number.', category: 'Performance', difficulty: 3, prep: 20, speak: 120 },
  { id: 'p72', text: 'Introduce a speaker you admire in forty seconds.', category: 'Performance', difficulty: 2, prep: 10, speak: 40 },
  { id: 'p73', text: 'Open a meeting that everyone resents being in.', category: 'Performance', difficulty: 2, prep: 15, speak: 90 },
  { id: 'p74', text: 'Deliver bad news to a team, calmly, in ninety seconds.', category: 'Performance', difficulty: 3, prep: 20, speak: 90 },
  { id: 'p75', text: 'Close a talk with one sentence they will repeat.', category: 'Performance', difficulty: 2, prep: 10, speak: 60 },
  { id: 'p76', text: 'Host the first sixty seconds of a podcast about ordinary objects.', category: 'Performance', difficulty: 2, prep: 10, speak: 60 },

  // ── Improvisation ────────────────────────────────────────
  { id: 'p77', text: 'You are the last person on Earth and you have found a working phone. Leave a voicemail.', category: 'Improvisation', difficulty: 3, prep: 10, speak: 90 },
  { id: 'p78', text: 'Answer every question in this round with "Yes, and…".', category: 'Improvisation', difficulty: 1, prep: 5, speak: 90 },
  { id: 'p79', text: 'Explain your day as if it were a nature documentary.', category: 'Improvisation', difficulty: 3, prep: 10, speak: 120 },
  { id: 'p80', text: 'You must defend a decision you made in the last five minutes.', category: 'Improvisation', difficulty: 2, prep: 5, speak: 90 },
  { id: 'p81', text: 'Speak for ninety seconds without using the word "I".', category: 'Improvisation', difficulty: 3, prep: 10, speak: 90 },
  { id: 'p82', text: 'Give a tour of a room you know, as if it were a museum.', category: 'Improvisation', difficulty: 2, prep: 10, speak: 120 },

  // ── Provocation ──────────────────────────────────────────
  { id: 'p83', text: 'Is honesty always the best policy? Take a side.', category: 'Provocation', difficulty: 3, prep: 15, speak: 120 },
  { id: 'p84', text: 'Argue that ambition is mostly a story people tell to avoid choosing.', category: 'Provocation', difficulty: 2, prep: 15, speak: 120 },
  { id: 'p85', text: 'What is the most useful lie a person can tell themselves?', category: 'Provocation', difficulty: 3, prep: 20, speak: 120 },
  { id: 'p86', text: 'Should you tell a friend their work is not good?', category: 'Provocation', difficulty: 2, prep: 15, speak: 120 },
  { id: 'p87', text: 'Defend small talk to someone who hates it.', category: 'Provocation', difficulty: 2, prep: 15, speak: 120 },
  { id: 'p88', text: 'Argue that confidence is a by-product, not a skill.', category: 'Provocation', difficulty: 3, prep: 15, speak: 120 },
];

export const EXTRA_TWISTERS = [
  { id: 't25', text: 'She sells sea shells by the sea shore.', tier: 'Warm-up', focus: ['S', 'SH'], target: 6 },
  { id: 't26', text: 'Six skinny sardines slipped silently sideways.', tier: 'Warm-up', focus: ['S'], target: 5 },
  { id: 't27', text: 'Big black bugs bleed blue black blood.', tier: 'Warm-up', focus: ['B', 'L'], target: 5 },
  { id: 't28', text: 'Fresh fried fish, fish fresh fried.', tier: 'Warm-up', focus: ['F', 'R'], target: 5 },
  { id: 't29', text: 'Truly rural.', tier: 'Warm-up', focus: ['R', 'L'], target: 3 },
  { id: 't30', text: 'The sixth sheikh\'s sixth sheep is sick.', tier: 'Standard', focus: ['S', 'K', 'TH'], target: 7 },
  { id: 't31', text: 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?', tier: 'Standard', focus: ['W', 'CH'], target: 8 },
  { id: 't32', text: 'A proper copper coffee pot.', tier: 'Standard', focus: ['P', 'K'], target: 4 },
  { id: 't33', text: 'Lesser leather never weathered wetter weather better.', tier: 'Standard', focus: ['TH', 'W', 'L'], target: 7 },
  { id: 't34', text: 'The seething sea ceaseth and thus the seething sea sufficeth us.', tier: 'Standard', focus: ['S', 'TH'], target: 7 },
  { id: 't35', text: 'Betty bought a bit of butter, but the butter was so bitter, she bought a bit of better butter.', tier: 'Standard', focus: ['B', 'T'], target: 9 },
  { id: 't36', text: 'Eleven benevolent elephants.', tier: 'Standard', focus: ['L', 'V'], target: 4 },
  { id: 't37', text: 'Peter Piper picked a peck of pickled peppers.', tier: 'Standard', focus: ['P'], target: 6 },
  { id: 't38', text: 'Genuinely rural juror.', tier: 'Advanced', focus: ['R', 'L'], target: 4 },
  { id: 't39', text: 'Irish wristwatch, Swiss wristwatch.', tier: 'Advanced', focus: ['R', 'SW', 'CH'], target: 5 },
  { id: 't40', text: 'Theophilus Thistle, the successful thistle sifter, sifted sixty thistles.', tier: 'Advanced', focus: ['TH', 'S'], target: 9 },
  { id: 't41', text: 'Six sleek swans swam swiftly southwards.', tier: 'Advanced', focus: ['S', 'W'], target: 6 },
  { id: 't42', text: 'Pad kid poured curd pulled cod.', tier: 'Advanced', focus: ['P', 'K'], target: 6 },
  { id: 't43', text: 'Selfish shellfish.', tier: 'Advanced', focus: ['SH', 'LF'], target: 3 },
  { id: 't44', text: 'Rory the warrior and Roger the worrier were reared wrongly in a rural brewery.', tier: 'Advanced', focus: ['R', 'W'], target: 11 },
  { id: 't45', text: 'Black background, brown background.', tier: 'Advanced', focus: ['B', 'GR'], target: 4 },
  { id: 't46', text: 'Imagine an imaginary menagerie manager imagining managing an imaginary menagerie.', tier: 'Advanced', focus: ['M', 'N', 'J'], target: 10 },
  { id: 't47', text: 'A skunk sat on a stump and thunk the stump stunk, but the stump thunk the skunk stunk.', tier: 'Advanced', focus: ['SK', 'ST', 'TH'], target: 11 },
  { id: 't48', text: 'Thin sticks, thick bricks.', tier: 'Warm-up', focus: ['TH', 'K', 'B'], target: 4 },
];

export const EXTRA_PANGERAMS = [
  { id: 'pg6', text: 'Amazingly few discotheques provide jukeboxes.', tier: 'Warm-up' },
  { id: 'pg7', text: 'How vexingly quick daft zebras jump!', tier: 'Standard' },
  { id: 'pg8', text: 'Crazy Frederick bought many very exquisite opal jewels.', tier: 'Standard' },
  { id: 'pg9', text: 'Quick zephyrs blow, vexing daft Jim.', tier: 'Advanced' },
  { id: 'pg10', text: 'Jived fox nymph grabs quick waltz.', tier: 'Advanced' },
];
