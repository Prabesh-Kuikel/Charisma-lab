// Game engine + content sanity, no DOM needed.
import { GAMES } from '../server/content/games.js';
import { scoreGame, promptFor } from '../server/gameEngine.js';
import { SKILL_TRACKS } from '../server/content/skills.js';
import { DAILY_DRILLS } from '../server/content/daily.js';
import { CREATOR_PILLARS, CREATOR_FORMATS, HOOK_PATTERNS, CREATOR_SKILLS, FOUR_WEEK_PLAN } from '../server/content/creator.js';

let fails = 0;
const ok = (cond, label) => { if (!cond) { fails++; console.log('FAIL:', label); } };

ok(GAMES.length >= 10, `at least ten games (got ${GAMES.length})`);
for (const g of GAMES) {
  ok(g.prompts?.length || g.words?.length, `${g.id} has prompts`);
  ok(g.rules?.length >= 3, `${g.id} has rules`);
  const prompt = promptFor(g, 42);
  ok(!!prompt, `${g.id} generates a prompt`);
  const blank = scoreGame({ gameId: g.id, text: '', prompt });
  ok(blank.score === 0 || blank.score < 100, `${g.id} scores blank low`);
}

// A deliberately good rep should beat a deliberately bad one.
const good = scoreGame({ gameId: 'yes-and', prompt: 'We should rent a boat.', text: 'Yes, and we should bring the goat, because a boat without a goat is just a wet meeting.' });
const bad = scoreGame({ gameId: 'yes-and', prompt: 'We should rent a boat.', text: 'No, but that is a stupid idea.' });
ok(good.score > bad.score, `yes-and: good (${good.score}) > bad (${bad.score})`);

const sellGood = scoreGame({ gameId: 'sell-this', prompt: 'A jar of air.', text: 'For the person who misses a city they left, this is that city air in a jar, so you can open it on a bad Tuesday. It costs £12. Would you like one?' });
ok(sellGood.score >= 80, `sell-this good rep scores ${sellGood.score}`);

ok(SKILL_TRACKS.length === 5, 'five skill tracks');
for (const t of SKILL_TRACKS) {
  ok(t.principles.length >= 5, `${t.id} principles`);
  ok(t.exercises.length === 5, `${t.id} has 5 exercises`);
  for (const e of t.exercises) ok(e.steps?.length >= 3 && e.success, `${t.id}/${e.id} complete`);
}
ok(DAILY_DRILLS.length >= 30, 'thirty daily drills');
ok(CREATOR_PILLARS.length === 6 && CREATOR_FORMATS.length === 6 && HOOK_PATTERNS.length === 8, 'creator content');
ok(CREATOR_SKILLS.length === 6 && FOUR_WEEK_PLAN.length === 4, 'creator ladder + plan');

// every game must have a working rubric and discriminate good from bad reps
const probes = {
  'yes-and': ['Yes, and we bring the goat, because a boat without a goat is a wet meeting.', 'No, but that is stupid.'],
  'one-sentence': ['The ladder in the dentist office led to the monsoon.', 'ladder'],
  'sell-this': ['For the person who misses a city, this jar of air costs £12, so you can open a bad Tuesday. Would you like one?', 'Buy this.'],
  'objection': ['That is a fair concern on price — if it saves one deal a quarter, where does that put it?', 'No, it is cheap actually.'],
  'cold-open': ['First, meetings are mostly theatre. For example, last week four people sat through a status update that was one sentence. So the fix is obvious.', 'I dunno.'],
  'frame-flip': ['Thank you, I will take that as a compliment — I try to be. What about you?', 'You are the competitive one.'],
  'rapid-fire': ['Last week an elevator ate my sandwich. My diploma is in the puddle. The deadline is a rumour.', 'elevator sandwich diploma.'],
  'pitch-15': ['For people who lose proposals, we keep every pitch in one place until signed, so you save three hours a week, unlike a shared drive.', 'We are the best.'],
  'bridge': ['That is fair, we did miss the deadline. What matters is what changed: we now ship behind a checklist and eleven releases were on time.', 'That is not true, you are wrong.'],
  'spine': ['Once there was a team that shipped Fridays. Every day they wrote a doc nobody read. Until one day the client quoted it wrongly. Because of that they cut it to five lines. Until finally the client replied. Ever since, five lines is the standard.', 'Stuff happened.'],
};
for (const g of GAMES) {
  const [good, bad] = probes[g.id] || ['', ''];
  if (!good) continue;
  const gs = scoreGame({ gameId: g.id, text: good, prompt: g.prompts?.[0] || '' });
  const bs = scoreGame({ gameId: g.id, text: bad, prompt: g.prompts?.[0] || '' });
  ok(gs.score >= 60, `${g.id}: strong rep scores ${gs.score} (want >=60)`);
  ok(gs.score > bs.score, `${g.id}: strong (${gs.score}) beats weak (${bs.score})`);
}

console.log(`game/content checks: ${fails === 0 ? 'all pass' : fails + ' failed'}`);
process.exit(fails ? 1 : 0);
