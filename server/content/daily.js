// ─────────────────────────────────────────────────────────────
//  Daily Dojo
//  A short, rotating set of reps across every communication skill.
//  Nothing here is gated: any day, any order, no streak required.
// ─────────────────────────────────────────────────────────────

export const WEEKLY_THEMES = [
  { id: 'open', name: 'Openings', cue: 'First ninety seconds' },
  { id: 'listen', name: 'Listening', cue: 'React before you ask' },
  { id: 'persuade', name: 'Persuasion', cue: 'Their reasons, not yours' },
  { id: 'ask', name: 'Asking', cue: 'Forks, not interrogations' },
  { id: 'humour', name: 'Humour', cue: 'Rearranged, not invented' },
  { id: 'edge', name: 'Negotiation & boundaries', cue: 'Calm is the tactic' },
  { id: 'ship', name: 'Creator reps', cue: 'Publish something small' },
];

export const DAILY_DRILLS = [
  { id: 'd-fork', skill: 'presence', title: 'Three fork questions', do: 'Ask three "was it X or Y?" questions in real conversation today. Notice which one produced a story longer than a sentence.', time: 5, success: 'One answer ran over 20 seconds.' },
  { id: 'd-react', skill: 'presence', title: 'Quote them back', do: 'In three conversations, repeat one of their exact words before you reply. Then ask a follow-up on that word.', time: 5, success: 'They say "exactly" at least once.' },
  { id: 'd-pause', skill: 'presence', title: 'Count to three', do: 'Let one silence run for three full seconds without filling it. Hold eye contact and a relaxed face.', time: 3, success: 'They speak first.' },
  { id: 'd-name', skill: 'presence', title: 'Name twice', do: 'Use one person\'s name early in conversation, and exactly once more in the middle. Never a third time.', time: 3, success: 'You stop before it becomes a tic.' },
  { id: 'd-one-sentence', skill: 'storytelling', title: 'One-sentence story', do: 'Tell any story in a single sentence of 25 words or fewer, with a turn inside it.', time: 6, success: 'The listener asks a question.' },
  { id: 'd-spine', skill: 'storytelling', title: 'Story Spine sprint', do: 'Fill in six beats about your day: once upon a time / every day / until one day / because of that / until finally / and ever since.', time: 7, success: 'You can say it in 90 seconds.' },
  { id: 'd-two-sense', skill: 'storytelling', title: 'One sound, one smell', do: 'Retell a memory using exactly one sound and one smell. No adjectives about feelings.', time: 6, success: 'Someone reacts physically.' },
  { id: 'd-punch', skill: 'humour', title: 'Rearrange the punchline', do: 'Take three sentences you said today. Move the funniest word to the end of each and delete everything after it.', time: 6, success: 'At least one still works.' },
  { id: 'd-flip', skill: 'humour', title: 'Frame flip', do: 'Answer one tease by treating it as praise, then hand a question back.', time: 5, success: 'No counter-insult, no wince.' },
  { id: 'd-callback', skill: 'humour', title: 'Callback once', do: 'Reference something from earlier in the same conversation in under eight words.', time: 4, success: 'They laugh before you finish the sentence.' },
  { id: 'd-outcome', skill: 'sales', title: 'Rewrite a feature', do: 'Take one thing you offer (or your job) and rewrite it as "so you can…" with a number in it.', time: 6, success: 'There is a number in the sentence.' },
  { id: 'd-objection', skill: 'sales', title: 'Two-sentence objection', do: 'Write an objection you fear. Answer it in two sentences: acknowledge, then reframe. No "but".', time: 7, success: 'The word "but" appears zero times.' },
  { id: 'd-close', skill: 'sales', title: 'Ask for something small', do: 'Ask one person for one specific small thing today — a link, five minutes, an intro. Use a question, not an apology.', time: 5, success: 'You asked without pre-amble.' },
  { id: 'd-concede', skill: 'persuasion', title: 'Concede first', do: 'In one disagreement, state the thing they are right about before anything else.', time: 5, success: 'You said it with no "but" attached.' },
  { id: 'd-steelman', skill: 'persuasion', title: 'Steelman an opinion', do: 'State an opposing view better than its supporters would. Write it down in two sentences.', time: 8, success: 'Someone who holds it would nod.' },
  { id: 'd-tradeoff', skill: 'persuasion', title: 'Frame the trade', do: 'Present a decision as two honest costs instead of one recommendation.', time: 6, success: 'Both options sound survivable.' },
  { id: 'd-batna', skill: 'negotiation', title: 'Know your walk-away', do: 'Write exactly what you will do if the thing you want falls through. Make it survivable, then improve it by one step.', time: 10, success: 'The alternative is specific.' },
  { id: 'd-if-then', skill: 'negotiation', title: 'If–then trade', do: 'Write one concession as a trade: "If you…, then I…". Never give without an if.', time: 6, success: 'Your sentence starts with "if".' },
  { id: 'd-hold', skill: 'negotiation', title: 'Ten-second hold', do: 'Say a firm sentence out loud, then stay silent for ten full seconds without filling it.', time: 5, success: 'You complete the timer.' },
  { id: 'd-specific', skill: 'flirting', title: 'Specific compliment', do: 'Compliment a choice or a skill, not an attribute. Three times today. Then keep the conversation going.', time: 6, success: 'Each compliment could only apply to that person.' },
  { id: 'd-warm-exit', skill: 'flirting', title: 'Warm exit', do: 'End one conversation deliberately, naming the best moment. No apology, no "anyway".', time: 4, success: 'You leave first and it feels good.' },
  { id: 'd-presence', skill: 'flirting', title: 'Notice out loud', do: 'Say one true observation about the moment that nobody else has said. Small, not clever.', time: 4, success: 'Someone says "I was thinking that".' },
  { id: 'd-hook', skill: 'creator', title: 'Ten hooks', do: 'Take one idea you have and write ten first lines for it. Do not write the rest of the piece.', time: 8, success: 'One hook makes you slightly nervous to publish.' },
  { id: 'd-ship', skill: 'creator', title: 'Publish one small thing', do: 'Post one observation under 150 words, in public, today. Imperfect and on time.', time: 10, success: 'It is published, not drafted.' },
  { id: 'd-notice', skill: 'creator', title: 'Ten observations', do: 'Capture ten things you noticed today in a note. No filtering, no editing, no publishing.', time: 6, success: 'Ten lines exist.' },
  { id: 'd-teach', skill: 'creator', title: 'Teach it in five lines', do: 'Explain something you know in five lines: claim, why, example, mistake, action.', time: 8, success: 'A stranger could act on it.' },
  { id: 'd-cold-open', skill: 'presence', title: 'Cold open', do: 'Speak for 30 seconds on a random topic with no preparation. Claim first, example second.', time: 4, success: 'You started within two seconds.' },
  { id: 'd-verse', skill: 'presence', title: 'Speak in verse', do: 'Answer any question in chunks of five to eight words, breathing at each full stop.', time: 4, success: 'No chunk ran into the next.' },
  { id: 'd-land-down', skill: 'presence', title: 'Land it downward', do: 'Make five statements, dropping your final word on each. No uptalk.', time: 3, success: 'A statement sounds like a statement.' },
  { id: 'd-eye', skill: 'presence', title: 'Eye triangle', do: 'Hold contact through questions and break it only while thinking. Practise in three conversations.', time: 5, success: 'You did not look away mid-question.' },
];

const dayIndex = (date) => {
  const d = date instanceof Date ? date : new Date(date);
  const start = Date.UTC(d.getUTCFullYear(), 0, 0);
  return Math.floor((d.getTime() - start) / 86400000);
};

// Rotation is stable per calendar day, but every drill is always
// available in the library — nothing is unlocked by playing.
export function planForDate(date = new Date()) {
  const idx = dayIndex(date);
  const theme = WEEKLY_THEMES[idx % WEEKLY_THEMES.length];
  const pick = (offset) => DAILY_DRILLS[(idx * 3 + offset * 7) % DAILY_DRILLS.length];
  const drills = [pick(0), pick(1), pick(2)];
  const unique = [];
  for (const d of drills) if (d && !unique.find((u) => u.id === d.id)) unique.push(d);
  for (const d of DAILY_DRILLS) { if (unique.length >= 3) break; if (!unique.find((u) => u.id === d.id)) unique.push(d); }

  const key = date instanceof Date ? date.toISOString().slice(0, 10) : String(date).slice(0, 10);
  return {
    key,
    theme,
    focus: theme.cue,
    drills: unique.slice(0, 3),
    challenge: `${theme.name} week: run every drill twice before Friday — once to survive it, once to make it sound like you.`,
  };
}
