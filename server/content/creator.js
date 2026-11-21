// ─────────────────────────────────────────────────────────────
//  Content Creator Track
//  From zero to a publishing habit: pillars, hooks, formats,
//  a four-week plan, the skills ladder, and an idea engine.
// ─────────────────────────────────────────────────────────────

export const CREATOR_PILLARS = [
  { id: 'teach', name: 'Teach one thing', blurb: 'The most reliable pillar. Every post answers a question somebody actually typed into a search bar.', examples: ['The one sentence that fixed my cold emails', 'Why your second draft is always shorter', 'Three words to cut from any apology'] },
  { id: 'story', name: 'Tell a true story', blurb: 'Stories earn attention because they promise a turn. Keep them under ninety seconds and start in the middle.', examples: ['The client meeting I lost in four words', 'I said yes for a year and here is what happened'] },
  { id: 'opinion', name: 'Take a position', blurb: 'A point of view is a filter: it repels some and recruits others. Vagueness recruits nobody.', examples: ['Networking events are mostly a tax on the shy', 'Your niche is too narrow to be interesting'] },
  { id: 'proof', name: 'Show the work', blurb: 'Process beats polish. Screenshots, drafts, numbers, failures. It is the cheapest credibility available.', examples: ['My first 30 posts, by the numbers', 'The version I almost published'] },
  { id: 'translate', name: 'Translate expertise', blurb: 'Take something you know and make it obvious to someone outside it. This is where most professionals have an unfair advantage.', examples: ['What a contract clause actually means', 'How to read a balance sheet in five minutes'] },
  { id: 'world', name: 'Curate a world', blurb: 'Taste as content: what you read, use, visit, or refuse. Builds identity, not just traffic.', examples: ['Five tools I pay for and would pay double', 'The books I reread'] },
];

export const CREATOR_FORMATS = [
  { id: 'talking-head', name: 'Talking head, one take', length: '30–60s', why: 'Fastest to make, hardest to fake. Eye contact and a claim are enough.', trap: 'Starting with "Hey guys" — cut everything before the first useful word.' },
  { id: 'screen', name: 'Screen + voiceover', length: '40–90s', why: 'Perfect for teaching, because the viewer sees the thing instead of imagining it.', trap: 'Reading the screen. Say what the screen does not.' },
  { id: 'carousel', name: 'Carousel / slides', length: '6–10 slides', why: 'Highest save rate. Each slide must be able to stand alone as a screenshot.', trap: 'One idea spread across nine slides. Do the reverse.' },
  { id: 'text', name: 'Short text post', length: '60–150 words', why: 'Cheapest to publish, best for opinions and stories. One line per paragraph.', trap: 'Burying the hook in the third line, where nobody reads.' },
  { id: 'demo', name: 'Live demo / challenge', length: '1–3 min', why: 'Proof in motion beats claims about proof. Show a result happening.', trap: 'Editing out the failure — the failure is the interesting part.' },
  { id: 'long', name: 'Long-form essay or video', length: '8–20 min', why: 'Depth is a moat. It also feeds every short format afterwards.', trap: 'Publishing a long piece before you have published ten short ones.' },
];

export const HOOK_PATTERNS = [
  { pattern: 'The contradiction', example: 'I got better at selling when I stopped talking about the product.', why: 'Two ideas that should not coexist: the brain has to stay for the resolution.' },
  { pattern: 'The specific number', example: 'I sent 214 cold emails. Eleven worked. All eleven had one line in common.', why: 'Specificity is the cheapest signal that this is real.' },
  { pattern: 'The cost of ignorance', example: 'You are losing about £4k a year to one sentence in your invoices.', why: 'Loss aversion outperforms benefit promises, reliably.' },
  { pattern: 'The forbidden opinion', example: 'Your morning routine is not the problem. Your calendar is.', why: 'Tension recruits. Just be willing to defend it in the comments.' },
  { pattern: 'The mid-scene open', example: 'The client said "we are going with someone else" and I asked one question.', why: 'Starting inside the moment removes the preamble nobody watches.' },
  { pattern: 'The promise with a constraint', example: 'Everything you need to know about pricing, in forty seconds, no jargon.', why: 'Constraints make promises believable.' },
  { pattern: 'The direct address', example: 'If you manage three or more people, this meeting problem is yours.', why: 'Naming the audience filters for the people who will care.' },
  { pattern: 'The demo teaser', example: 'Here is the same email, before and after one line.', why: 'A visible transformation is the strongest hook that exists.' },
];

export const PLATFORM_NOTES = [
  { id: 'short-video', name: 'Short video', shape: 'Vertical, 20–60s, hook in the first 1.5s, captions burned in', cadence: '3–5 per week', note: 'Retention at three seconds decides everything. Say the most interesting clause first; the context can come later.' },
  { id: 'text-social', name: 'Text social', shape: 'One idea, one line per paragraph, hook in line one', cadence: '4–7 per week', note: 'The first line is the whole post. If it could be deleted, it should have been.' },
  { id: 'newsletter', name: 'Newsletter', shape: 'One idea, one story, one action — under 600 words', cadence: 'Weekly', note: 'The only channel you own. Ask for the reply; replies are the algorithm there.' },
  { id: 'long-video', name: 'Long video / podcast', shape: 'One question answered properly, chapters, 8–20 min', cadence: 'Fortnightly', note: 'One long piece should produce eight short ones. Publish the shorts first.' },
];

export const CREATOR_SKILLS = [
  { level: 1, name: 'Noticing', what: 'Finding ideas in your ordinary week', drill: 'Keep a note app open. Capture ten observations a week, no filtering. Publish one.' },
  { level: 2, name: 'Structuring', what: 'Turning an observation into a unit with a hook, a body and a landing', drill: 'Take three notes and turn each into a five-line outline in under four minutes.' },
  { level: 3, name: 'Opening', what: 'Writing five hooks per piece and choosing the least comfortable', drill: 'For one idea, write ten first lines. Publish the one you would be slightly afraid to say.' },
  { level: 4, name: 'Editing', what: 'Cutting 30% without losing meaning', drill: 'Draft, then delete every sentence that could be removed without the piece collapsing. Read it out loud.' },
  { level: 5, name: 'Shipping', what: 'Publishing at a standard you can repeat rather than a standard you can admire', drill: 'Publish five pieces in ten days. Imperfect and on time beats perfect and absent.' },
  { level: 6, name: 'Reading the room', what: 'Using what resonated to decide what comes next', drill: 'Review your five best-performing pieces. Name the shared trait in one sentence. Do more of that.' },
];

export const FOUR_WEEK_PLAN = [
  { week: 1, theme: 'Ship, badly', goal: 'Break the perfectionism loop', tasks: ['Write down 20 ideas in one sitting — no judging.', 'Publish 3 pieces. Any format. Under 200 words each.', 'Ask one person for a single sentence of feedback.'] },
  { week: 2, theme: 'Find the hook', goal: 'Learn what earns the second line', tasks: ['Write 10 hooks for one idea; publish only the best.', 'Re-publish your best week-1 piece with a stronger first line.', 'Screen-record your process for one piece and post it.'] },
  { week: 3, theme: 'Pick a lane', goal: 'Narrow until it is describable', tasks: ['Write your one-sentence promise: "I help X do Y".', 'Publish 3 pieces that all fit that promise.', 'Delete or archive anything that does not.'] },
  { week: 4, theme: 'Build a habit', goal: 'Make it survivable', tasks: ['Batch-create 4 pieces in one session.', 'Schedule them. Publish on the boring days.', 'Write your repeatable template in five lines.'] },
];

export const CREATOR_CHECKLIST = [
  'Does the first line survive being read alone?',
  'Is there one idea, not three?',
  'Could a stranger state the point after one read?',
  'Is there one concrete detail — a number, a name, a screenshot?',
  'Does the ending land, or does it trail off into "anyway"?',
  'Have you cut the first sentence? (It is usually throat-clearing.)',
];

export const IDEA_TOPICS = ['my job', 'a mistake I made', 'a client conversation', 'a tool I use daily', 'something I was wrong about', 'a boring task I fixed', 'a book that changed a habit', 'a rejection', 'a first day somewhere', 'a rule I break'];
export const IDEA_ANGLES = ['the version nobody tells you', 'in three steps', 'as a story with a turn', 'as a before/after', 'as a list of what not to do', 'as a question you were afraid to ask', 'with the numbers', 'from the other person\'s side'];

export function generateIdeas(topic, angle, n = 4) {
  const t = topic || IDEA_TOPICS[0];
  const a = angle || IDEA_ANGLES[0];
  const patterns = [
    `${t} — ${a}`,
    `What ${t} taught me about ${IDEA_TOPICS[(IDEA_TOPICS.indexOf(t) + 3) % IDEA_TOPICS.length]}`,
    `The one sentence that changed ${t}`,
    `${t}, ${a}: a five-line breakdown`,
    `Why most advice about ${t} is wrong`,
    `I tested ${t} for 30 days. Here is what broke.`,
  ];
  return patterns.slice(0, Math.max(1, Math.min(n, patterns.length)));
}
