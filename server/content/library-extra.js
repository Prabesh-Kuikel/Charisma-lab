// ─────────────────────────────────────────────────────────────
//  Library · Second wing
//  Twenty-four entries covering the fields the first library did
//  not: small talk, talking to women, difficult conversations,
//  emotional depth, professional life and business talk.
//
//  Shape matches server/content/library.js exactly so the same
//  search, chips and chapter wiring work unchanged.
// ─────────────────────────────────────────────────────────────

export const LIBRARY_EXTRA = [
  // ── Small talk ───────────────────────────────────────────
  {
    id: 'lib-st1', category: 'Small Talk', source: 'Charisma Lab', tags: ['smalltalk', 'opener', 'observations'],
    title: 'The Shared-Reality Opener', short: 'Comment on what you both can see.',
    body: 'Open with something you are both looking at, so the observation is shared rather than performed: "This queue is moving like it is being paid by the hour." Shared reality is the lowest-risk opening that exists, because it cannot be wrong — you both already agree on the queue.',
    use: 'Parties, queues, waiting rooms, conferences, gyms, lifts.',
  },
  {
    id: 'lib-st2', category: 'Small Talk', source: 'Charisma Lab', tags: ['smalltalk', 'fork', 'followup'],
    title: 'The Fork', short: 'Every answer gives you two doors.',
    body: 'An answer is not a dead end, it is a junction. "I am in accounting" gives you the work door (what kind of accounting) and the person door (chose it, or fell into it). Offer a fork instead of asking a question that can be answered with one word: "What made you pick accounting — or did it pick you?"',
    use: 'Any first conversation, especially with quiet people.',
  },
  {
    id: 'lib-st3', category: 'Small Talk', source: 'Charisma Lab', tags: ['smalltalk', 'disclosure', 'rhythm'],
    title: 'The Three-Beat Rhythm', short: 'Ask, listen, give one back.',
    body: 'Question, question, question is an interview. Question, question, disclosure is a conversation. After two of their answers, hand something over: "I only moved here two years ago and I still do not know where to get good bread." Trading a small fact for a small fact is how two people become familiar.',
    use: 'Small talk with anyone, in any setting.',
  },
  {
    id: 'lib-st4', category: 'Small Talk', source: 'Charisma Lab', tags: ['smalltalk', 'exit', 'grace'],
    title: 'The Graceful Exit', short: 'Leave before enthusiasm runs out.',
    body: '"I am going to let you go before I talk your ear off — but I want to hear how the exam went, so find me later." Name the exit, give the reason as generosity rather than escape, and leave one thread hanging. A warm exit is why people are pleased to see you next time.',
    use: 'Networking events, weddings, work socials, parties.',
  },
  {
    id: 'lib-st5', category: 'Small Talk', source: 'Charisma Lab', tags: ['smalltalk', 'stories', 'turn'],
    title: 'The Small Story', short: 'Thirty seconds, one turn, no moral.',
    body: 'A small story gets its power from brevity: setup in one sentence, complication in one, resolution in one, then stop — do not add the moral. "The bus driver waited for me, then yelled at me, then bought me a coffee. I have been loyal to that route ever since." Leave the last beat out and you will notice the other person filling in.',
    use: 'Group conversations, dates, family dinners, interviews.',
  },
  {
    id: 'lib-st6', category: 'Small Talk', source: 'Charisma Lab', tags: ['smalltalk', 'silence', 'comfort'],
    title: 'The Non-Panicked Pause', short: 'Silence is not a verdict.',
    body: 'Say nothing for two full seconds on purpose — during small talk, pausing is the most useful thing you can do. Ask a question, then wait through the need to rescue it. The silence reads as confidence, and it gives them a chance to say something they had nearly decided not to.',
    use: 'Every conversation, especially where you speak too fast.',
  },

  // ── Talking to women ─────────────────────────────────────
  {
    id: 'lib-wm1', category: 'Talking to Women', source: 'Charisma Lab', tags: ['dating', 'approach', 'consent'],
    title: 'The Boring Approach', short: 'Approach like someone calm, not someone brave.',
    body: 'The approaches that work are conspicuously ordinary: a comment about the shared situation, a sincere question, an offer of help. "Exciting" approaches require her to manage your ego. Say the plain thing, then let the two of you find out whether there is anything there. Confidence is behaving as if a conversation is normal, because it is.',
    use: 'Cafes, bookshops, classes, friends-of-friends, dating apps (different medium, same rule).',
  },
  {
    id: 'lib-wm2', category: 'Talking to Women', source: 'Charisma Lab', tags: ['dating', 'specificity', 'compliment'],
    title: 'The Specific Compliment', short: 'Praise a choice she made.',
    body: '"You are beautiful" is a comment on her as a specimen and lands as generic. "You laughed at the thing nobody else caught — that was the best part of the evening" is a comment on a decision she made. Specific praise is the only kind that proves attention. One per conversation, sincerely, never as a prelude to a request.',
    use: 'Dates, a first conversation, a friend you have known for years.',
  },
  {
    id: 'lib-wm3', category: 'Talking to Women', source: 'Charisma Lab', tags: ['dating', 'flirt', 'reciprocity'],
    title: 'The Escalation Ladder', short: 'Climb one rung at a time and look for the nod.',
    body: 'Warmth, then curiosity, then a light tease, then a personal question, then an invitation — one rung at a time, checking for reciprocation between each. If she matches the rung (teases back, asks about you), continue. If she does not, hold where you are. Two unanswered rungs means stop climbing and enjoy the conversation you actually have.',
    use: 'Dating, parties, any conversation with romantic possibility.',
  },
  {
    id: 'lib-wm4', category: 'Talking to Women', source: 'Charisma Lab', tags: ['dating', 'rejection', 'grace'],
    title: 'The Gracious No', short: 'Receive refusal without a tax on it.',
    body: '"No problem at all — enjoy your evening." Then leave, warmly, immediately. Do not ask why, do not retreat visibly, do not say "your loss". A man who can be refused without punishing the refuser is read as safe — the single trait that makes women willing to be approached by him again, by someone else, tomorrow.',
    use: 'Approaches, date invitations, any no.',
  },
  {
    id: 'lib-wm5', category: 'Talking to Women', source: 'Charisma Lab', tags: ['dating', 'interest', 'signals'],
    title: 'Reading Interest Without Guessing', short: 'Look for investment, not friendliness.',
    body: 'Friendliness is a default setting; interest costs something. Look for investment: she asks questions back, she adds detail you did not request, her answers get longer, she keeps the conversation alive when you pause, she returns your tease, she stays put when she could leave. Verify with one small, low-cost invitation. If it is not a warm yes, it is a no — there is no next move.',
    use: 'Any conversation with romantic possibility. Assume nothing without investment.',
  },

  // ── Difficult conversations ──────────────────────────────
  {
    id: 'lib-dc1', category: 'Difficult Conversations', source: 'Harvard Negotiation Project', tags: ['conflict', 'feedback', 'framing'],
    title: 'Third Story', short: 'Describe the gap as an outsider would.',
    body: 'Start from the position a neutral observer could see: "I think we are both frustrated and want different things from this project, and I want to sort out a plan we each believe in." The third story lowers the temperature because neither person is cast as the problem, and the disagreement becomes the thing you are working on together, not each other.',
    use: 'Conflict with a colleague, partner, friend, or family member.',
  },
  {
    id: 'lib-dc2', category: 'Difficult Conversations', source: 'NVC', tags: ['conflict', 'boundaries', 'feelings'],
    title: 'Observation, Impact, Request', short: 'The three-part boundary.',
    body: '"When the report went in late (observation), I had to apologise to the client (impact). I need a heads-up by Thursday going forward — can you do that?" No opinion about their character, no "always" or "never", a request they can accept or refuse. Boundaries are requests with consequences attached, not accusations.',
    use: 'Feedback, held-up work, colleagues, partners, boundaries.',
  },
  {
    id: 'lib-dc3', category: 'Difficult Conversations', source: 'Charisma Lab', tags: ['conflict', 'apology', 'repair'],
    title: 'The Complete Apology', short: 'Name it, own it, repair it, change it.',
    body: 'Four parts, no then: "I said your work was sloppy in front of everyone. That was out of order and it embarrassed you. I have told the team that was mine to bring to you privately. I will do that from now on." No "but", no explanation of intent, no request for reassurance. An apology that asks for forgiveness is not finished.',
    use: 'Any apology that matters — personal or professional.',
  },
  {
    id: 'lib-dc4', category: 'Difficult Conversations', source: 'Charisma Lab', tags: ['conflict', 'saying-no', 'work'],
    title: 'The One-Job No', short: 'Refuse the request, keep the relationship.',
    body: '"I want to be straight with you: if I take this on this week, the thing I promised you by Friday slips. I can hold Friday, or hand this to Priya — which would you rather?" A no with an alternative and a preference is a higher-status answer than a reluctant yes.',
    use: 'Workload, workplace requests, friendship and family overreach.',
  },
  {
    id: 'lib-dc5', category: 'Difficult Conversations', source: 'Charisma Lab', tags: ['conflict', 'exits', 'relationships'],
    title: 'The Clean Break', short: 'End it clearly, kindly, and once.',
    body: '"I have thought about it and I do not think this is right for me. You have not done something wrong that you can fix, and that is hard to hear, I know. I want to be honest rather than gradual." Slow fade-outs are not kinder — they are the same rejection paid in instalments, with hope charged as interest.',
    use: 'Ending dating, a job, a friendship, a contract.',
  },

  // ── Emotional depth ──────────────────────────────────────
  {
    id: 'lib-ei1', category: 'Emotional Depth', source: 'Charisma Lab', tags: ['emotion', 'vulnerability', 'trust'],
    title: 'One Rung Deeper', short: 'Match, then add ten percent.',
    body: 'Depth is reciprocal: after they disclose, go one small step past wherever they stopped, not five steps. "Work has been heavy" invites "what is the heaviest part?" not "my father was sick and I have not slept in a month." Calibrated vulnerability is what turns company into intimacy; over-disclosure hands them a weight they did not agree to carry.',
    use: 'Friendships, dating, family, close colleagues.',
  },
  {
    id: 'lib-ei2', category: 'Emotional Depth', source: 'Charisma Lab', tags: ['emotion', 'listening', 'empathy'],
    title: 'Feel, Fact, Then Fix', short: 'Never repair before they are heard.',
    body: 'The order is: name the feeling ("that sounds exhausting"), establish the fact ("so you were doing both jobs for a month"), and only then ask whether a fix is wanted ("do you want ideas, or just to be listened to?"). Most people who are upset are not stuck on the problem, they are stuck on feeling alone with it.',
    use: 'Friends in trouble, partners, upset colleagues, family.',
  },
  {
    id: 'lib-ei3', category: 'Emotional Depth', source: 'Charisma Lab', tags: ['emotion', 'questions', 'depth'],
    title: 'The Question That Costs', short: 'Ask what they were afraid of.',
    body: 'Surface questions have correct answers; real questions do not. "What were you afraid would happen?" "What part of that is still with you?" "When did you last feel really good about something?" These are questions that cost the other person something to answer — which is exactly why they build the room you are trying to build.',
    use: 'Deep one-to-one conversation, dates that matter, old friends.',
  },
  {
    id: 'lib-ei4', category: 'Emotional Depth', source: 'Charisma Lab', tags: ['emotion', 'self', 'naming'],
    title: 'Say the Unsaid Thing', short: 'Name what is in the room.',
    body: '"I notice we have both been polite for the last ten minutes." "I have been avoiding this because I do not want to be bad at it." Naming the unspoken is the fastest route out of an awkward room, because it gives both people permission to stop performing.',
    use: 'Awkward silences, tension, after a mistake, family holidays.',
  },
  {
    id: 'lib-ei5', category: 'Emotional Depth', source: 'Charisma Lab', tags: ['emotion', 'grief', 'support'],
    title: 'Sitting With It', short: 'Do not try to make it okay.',
    body: '"I do not know what to say. I am here and I am not going anywhere." Someone in grief or crisis needs a witness, not a solution. Avoid the repair reflex: at least it is done, you will meet someone else, everything happens for a reason. Presence is the support; commentary is usually about your own discomfort.',
    use: 'Grief, illness, divorce, job loss, any crisis.',
  },

  // ── Professional life ────────────────────────────────────
  {
    id: 'lib-pr1', category: 'Professional', source: 'Charisma Lab', tags: ['work', 'meetings', 'structure'],
    title: 'The Meeting Speak', short: 'Claim the floor in one sentence.',
    body: '"One thing before we move on — I think we are deciding this before we know who owns it." Signal that you are contributing, then make one point, then hand back: "That is all from me." Small, structured, frequent contributions build a reputation far faster than one long monologue.',
    use: 'Any meeting, stand-up, project review, all-hands.',
  },
  {
    id: 'lib-pr2', category: 'Professional', source: 'Charisma Lab', tags: ['work', 'interview', 'story'],
    title: 'The SOAR Answer', short: 'Situation, obstacle, action, result.',
    body: 'Interview answers are judged on sequence, not brilliance: one line of situation, one line of obstacle, two of what you did and why, one of the measured result. "We were behind on a launch, the vendor dropped out, I re-sequenced the roadmap and we shipped eleven days late but under budget." Numbers make it land.',
    use: 'Interviews, performance reviews, promotion cases, sales references.',
  },
  {
    id: 'lib-pr3', category: 'Professional', source: 'Charisma Lab', tags: ['work', 'upward', 'managing'],
    title: 'The Upward One-Liner', short: 'Bring a decision, not a problem.',
    body: '"Two options — A is faster and risky, B is slower and safe. I recommend A. Do you want me to run it?" Managers are drowning in problems. Someone who arrives with the problem, two options, a recommendation and a request is seen as senior long before the job title says so.',
    use: 'Managing up, asking for help, escalating, sponsorship.',
  },
  {
    id: 'lib-pr4', category: 'Professional', source: 'Charisma Lab', tags: ['work', 'boundaries', 'burnout'],
    title: 'The Deadline Trade', short: 'Trade scope, not health.',
    body: '"I can have this on Thursday if I drop the QA pass, or Monday with it. Which matters more to you?" Allowing a manager to choose between scope, quality and time — instead of absorbing the shortfall yourself — is how people stop being quietly exploited. Never answer a deadline question with "I will manage".',
    use: 'Deadline pressure, scope creep, overload, unpaid overtime expectations.',
  },
  {
    id: 'lib-pr5', category: 'Professional', source: 'Charisma Lab', tags: ['work', 'networking', 'followup'],
    title: 'The Two-Line Follow-Up', short: 'Reference, value, ask.',
    body: 'The day after meeting someone useful: line one references something specific they said; line two offers something small or asks one clear question. No "add me on LinkedIn" as the whole message. Two lines, one ask, send it within 24 hours — a follow-up not sent within a day is a follow-up not sent.',
    use: 'Conferences, events, intros, after an interview.',
  },

  // ── Business talk ────────────────────────────────────────
  {
    id: 'lib-bz1', category: 'Business', source: 'SPIN', tags: ['business', 'sales', 'questions'],
    title: 'The Diagnosis Before the Pitch', short: 'Three questions before one sentence about you.',
    body: 'Situation, problem, implication: what have you got, what is annoying about it, what does that cost you every month. "How many hours a week does that eat? And what does that time cost you?" The pitch only ever begins after the implication has been said out loud by the buyer.',
    use: 'Sales calls, client discovery, consulting, pitching a project.',
  },
  {
    id: 'lib-bz2', category: 'Business', source: 'Charisma Lab', tags: ['business', 'objections', 'pricing'],
    title: 'The Re-Frame Objection', short: 'Agree with the concern, then move the axis.',
    body: '"You are right that we are the most expensive option. The question is whether the cheaper one costs you more in the second year — the last client moved at the twelfth month. Which risk is easier for you to own?" Never argue with an objection; the argument confirms the fear. Agree, then move the comparison axis.',
    use: 'Price objections, procurement, comparison shopping, committee decisions.',
  },
  {
    id: 'lib-bz3', category: 'Business', source: 'Charisma Lab', tags: ['business', 'negotiation', 'anchor'],
    title: 'The Quiet Anchor', short: 'Name the number, then stop.',
    body: 'State a figure once, in the middle of a sentence, then let silence do the work: "Based on that scope, the number is 12,400." Then nothing. The first person to speak after the price either defends it or concedes it — and it does not need to be you.',
    use: 'Freelance quoting, pricing, salary, supplier negotiation.',
  },
  {
    id: 'lib-bz4', category: 'Business', source: 'Charisma Lab', tags: ['business', 'trust', 'credibility'],
    title: 'The Costly Honest Thing', short: 'Volunteer the weakness.',
    body: 'Before they ask: "The thing this is weakest at is reporting — it is slow, and if you need instant dashboards I am not your best option." Volunteering one real limitation is the fastest way to be believed about everything else. Credibility comes from the size of the concession, not the pitch.',
    use: 'Pitches, proposals, negotiations, first meetings with clients.',
  },
];
