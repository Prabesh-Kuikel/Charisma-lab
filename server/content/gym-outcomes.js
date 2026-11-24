// ─────────────────────────────────────────────────────────────
//  Round 7 · the one-line-outcome gap
//  The original 30 playbooks ended each situation with four scripts
//  and no way to tell a good attempt from a bad one, so a rep could
//  not be scored and the person had nothing to look at in the
//  moment. This adds the fifth line — the "what good sounds like"
//  outcome — for the nineteen that were missing it.
//
//  Kept separate from gym.js so the original file stays readable;
//  merged by id in server/index.js and src/local/api.js.
// ─────────────────────────────────────────────────────────────

export const GYM_OUTCOMES = {
  'gym-party': {
    label: 'What good looks like',
    text: 'You spoke to two groups, not one. In the first you said three sentences and left before the topic changed; in the second someone asked what you do. The test is not whether they liked you — it is whether you left each group at your own choosing.',
  },
  'gym-cafe': {
    label: 'What good looks like',
    text: 'You made one observation out loud to a stranger and it did not have a question mark on the end. If they answered, you stayed for one more exchange and then let it end. Nothing was required of the other person, and the room did not become about you.',
  },
  'gym-event': {
    label: 'What good looks like',
    text: 'You arrived early enough to meet the host before the room filled, and you left with one name you could write down. Anything past that is a bonus; two hours of standing near the food is not a rep.',
  },
  'gym-colleague': {
    label: 'What good looks like',
    text: 'A conversation happened that was not about work and was not about the weather. You learned one thing about them that is not on their CV, and they learned one thing about you that is not on yours.',
  },
  'gym-neighbour': {
    label: 'What good looks like',
    text: 'You know one fact about the person behind the neighbouring door, they know one about you, and neither of you had to manufacture an excuse to end the conversation. Repeat recognition, not instant friendship.',
  },
  'gym-group': {
    label: 'What good looks like',
    text: 'You said one complete thing to the whole group, not just the person beside you, and you invited someone quieter in with a question aimed at them. Shares went up in the room and none of them were yours.',
  },
  'gym-phone': {
    label: 'What good looks like',
    text: 'The call was shorter than the one you rehearsed, the other person spoke more than the first two minutes, and you ended with a specific next thing rather than "let us talk soon".',
  },
  'gym-first-date': {
    label: 'What good looks like',
    text: 'Neither of you performed. You asked about something specific they said earlier and they asked one back unprompted, and the ending was clear — a next thing, or a clean close. Ambiguity is the only failure.',
  },
  'gym-rejection': {
    label: 'What good looks like',
    text: 'You answered in one warm sentence, did not explain, and stayed in the room for at least a minute afterwards. The other person is not owed an apology, and you did not leave your own evening early.',
  },
  'gym-difficult-boss': {
    label: 'What good looks like',
    text: 'You stated the problem in one sentence, named the outcome you need, and asked for a decision — then stopped talking. Whether they agreed is not the measure; whether the ask was clean and unhedged is.',
  },
  'gym-boundary': {
    label: 'What good looks like',
    text: 'You said the line once, in the same tone you use for facts, and did not add a reason. If they pushed, you repeated the identical sentence. The relationship is intact and the line has not moved.',
  },
  'gym-grief': {
    label: 'What good looks like',
    text: 'You said less than you wanted to and stayed longer than was comfortable. Nothing was fixed, nobody was rescued, and the other person did most of the talking. That is the whole job.',
  },
  'gym-unsaid': {
    label: 'What good looks like',
    text: 'You said the one sentence you have been carrying, without the three-sentence runway in front of it, and then you let the silence sit. It did not have to be received well to count as said.',
  },
  'gym-interview': {
    label: 'What good looks like',
    text: 'You answered with one example in full (situation, action, result) instead of three examples in outline, and you asked two questions that came from what they actually said rather than from a list.',
  },
  'gym-networking': {
    label: 'What good looks like',
    text: 'You gave something before you asked for anything — a specific recommendation, an introduction, a useful sentence — and you left with one follow-up that has a date in it.',
  },
  'gym-raise': {
    label: 'What good looks like',
    text: 'You named a number first, said it once, and did not fill the silence afterwards. Even a "let me think about it" counts as progress when the ask was specific and unapologetic.',
  },
  'gym-price': {
    label: 'What good looks like',
    text: 'You said the number without a discount attached and without an apology in front of it. If they flinched, you stayed quiet long enough for them to speak first.',
  },
  'gym-discovery': {
    label: 'What good looks like',
    text: 'You asked about the problem, not the solution, and you resisted presenting for the first half of the call. The other person described their own situation in their own words at least once.',
  },
  'gym-splitting-bill': {
    label: 'What good looks like',
    text: 'The money was mentioned before the food arrived, in a normal voice, and it was never mentioned again. No one left the table feeling watched.',
  },
};
