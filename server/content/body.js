// Body Language & Micro-Expression Decoder
// Each card: a described scene, 4 options, one correct read, and the psychology.

export const BODY_CARDS = [
  {
    id: 'b1', cluster: 'Feet & Legs', difficulty: 1,
    scene: 'Two people are talking at a party. One person\'s feet are pointed at the other; their torso is angled slightly away and their arms are crossed.',
    question: 'What is the most likely read?',
    options: [
      'They are cold and want to leave',
      'Feet signal genuine interest while the torso is protecting — likely engaged but guarded',
      'They are lying about something',
      'They dislike the person completely',
    ],
    answer: 1,
    cue: 'Feet point where attention goes.',
    explain:
      'The feet are the least socially managed part of the body. When feet point at someone, attention is genuinely there. Crossed arms plus a turned torso usually reads as self-protection or comfort-seeking, not deception. Read the cluster, never a single cue.',
  },
  {
    id: 'b2', cluster: 'Micro-Expressions', difficulty: 2,
    scene: 'You say you got the job. Your friend\'s face flashes a quick tightening around the eyes and a brief press of the lips — less than a fifth of a second — then a wide smile.',
    question: 'What just happened?',
    options: [
      'Nothing — micro-expressions are not real',
      'A suppressed negative flash (envy or disappointment) that was quickly masked by a social smile',
      'They are definitely lying about being happy',
      'They are about to cry',
    ],
    answer: 1,
    cue: 'A flash of contraction before the smile = a leak, not a verdict.',
    explain:
      'Micro-expressions are leaks, not verdicts. A brief orbicularis tightening and lip press before a social smile suggests an unplanned reaction was overridden. The kind move is to ask a question, not to accuse. Never confront someone on a single flash.',
  },
  {
    id: 'b3', cluster: 'Eyes', difficulty: 2,
    scene: 'In a meeting, a colleague holds your gaze for the entire 90 seconds you speak, barely blinking, chin slightly down.',
    question: 'How do you read this?',
    options: [
      'Total agreement',
      'A high-intensity, possibly challenging or evaluative stare — not the same as rapport',
      'They are in love with you',
      'They are deaf in one ear',
    ],
    answer: 1,
    cue: 'No blink + chin down = pressure, not warmth.',
    explain:
      'Comfortable rapport usually includes normal blinking, occasional gaze breaks, and a soft face. A locked, unbroken stare with a lowered chin often signals dominance-testing or deep evaluation. You can answer it by slowing your speech and softening your own face — never by out-staring.',
  },
  {
    id: 'b4', cluster: 'Hands', difficulty: 1,
    scene: 'A person is explaining an idea while their palms face up and their hands move outward on each key point. Their shoulders are relaxed.',
    question: 'What does this signal?',
    options: [
      'Nervousness and over-talking',
      'Openness and an invitation to be believed — a "nothing to hide" gesture cluster',
      'Aggression',
      'They are about to leave',
    ],
    answer: 1,
    cue: 'Visible palms read as candour.',
    explain:
      'Palm-up gestures with open shoulders are among the most reliable trust signals in the human repertoire, used across cultures. If you want to be believed, show your hands. Hidden hands quietly raise suspicion even when the words are perfect.',
  },
  {
    id: 'b5', cluster: 'Status & Space', difficulty: 3,
    scene: 'In a group of five, a new person enters. Everyone shifts slightly to make room, and two people angle their bodies toward the newcomer. Nobody has been introduced yet.',
    question: 'What is the group doing?',
    options: [
      'Showing off for each other',
      'Non-verbally granting status and attention before a word has been spoken',
      'Preparing to leave',
      'Signalling hostility',
    ],
    answer: 1,
    cue: 'Groups allocate space and body orientation before language arrives.',
    explain:
      'Groups allocate status through space and orientation within the first seconds: who gets room, whose arrival turns torsos, whose arrival turns only heads. You can use this deliberately by pausing at the edge of a group and letting them orient to you before you speak.',
  },
  {
    id: 'b6', cluster: 'Feet & Legs', difficulty: 2,
    scene: 'A colleague is smiling and nodding at your story, but their foot has started pointing toward the door and their weight has shifted onto their front leg.',
    question: 'What does the lower body suggest?',
    options: [
      'They love the story and want more',
      'Polite engagement on the face while the body is preparing to exit',
      'They need the bathroom immediately',
      'They are angry',
    ],
    answer: 1,
    cue: 'Weight forward + foot to the exit = leaving intention.',
    explain:
      'Face and voice are easy to manage; legs are not. A foot pointing at the exit with weight forward is an early exit signal. The charming move: land your story in one sentence and hand them a graceful out. That reads as high social intelligence.',
  },
  {
    id: 'b7', cluster: 'Micro-Expressions', difficulty: 3,
    scene: 'You propose an idea. Your manager\'s eyebrows flash up for a moment, lips tighten slightly, then they say, "Interesting. Let me think about it."',
    question: 'Best interpretation?',
    options: [
      'Enthusiasm — eyebrows up means yes',
      'A brief surprise or scepticism flash followed by a polite deferral; the idea is likely not landing',
      'Certain approval',
      'They did not hear you',
    ],
    answer: 1,
    cue: 'A flash plus a deferral phrase usually means no.',
    explain:
      'A quick brow flash is surprise, not endorsement. Combine it with lip tightening and a deferral ("let me think about it") and the odds shift toward a soft no. The skilled response is to ask a calibrating question — "what would need to be true for this to work?" — rather than to push.',
  },
  {
    id: 'b8', cluster: 'Eyes', difficulty: 1,
    scene: 'A person looks at your forehead and over your shoulder while you talk, smiling warmly.',
    question: 'What is happening?',
    options: [
      'Deep intimacy',
      'Polite attention is present but true focus is elsewhere — possibly social scanning',
      'They are blind',
      'They are mirroring you',
    ],
    answer: 1,
    cue: 'Gaze above the eyes plus shoulder scanning = divided attention.',
    explain:
      'Genuine attention tends to centre on the eye triangle. Glancing at the forehead and beyond your shoulder signals social scanning: your words are being received, but you are not the main event. You can reclaim focus with a name, a pause, or a direct question.',
  },
  {
    id: 'b9', cluster: 'Status & Space', difficulty: 3,
    scene: 'You have been talking for two minutes. The other person has not interrupted, has not moved, and has not mirrored any of your gestures.',
    question: 'What is the most useful read?',
    options: [
      'They are bored to death',
      'Stillness can be high-status listening — or polite withdrawal. Check the eyes and breathing.',
      'They are definitely planning to leave',
      'They agree with everything',
    ],
    answer: 1,
    cue: 'Stillness is ambiguous — read the eyes.',
    explain:
      'Stillness is one of the most misread cues. High-status people often listen with minimal movement; withdrawn people also go still. The differentiator is the eyes and breathing: focus and slight nods vs a flat gaze and slow breath. Ambiguity is information — test it with a question.',
  },
  {
    id: 'b10', cluster: 'Hands', difficulty: 2,
    scene: 'During a warm conversation, someone touches their neck and collarbone repeatedly while answering a question about where they were last night.',
    question: 'What is the responsible read?',
    options: [
      'Definite lie — the "neck touch" always means deception',
      'An adaptive self-soothing cue; it may signal discomfort or stress — not proof of lying',
      'They are flirting',
      'They have a rash',
    ],
    answer: 1,
    cue: 'Self-touch = self-soothing. Stress is not deception.',
    explain:
      'Neck and collarbone touching is a self-soothing pacifier and rises with stress of any kind — including being wrongly suspected. The ethical approach is to change the pressure of the moment (soften your tone, offer an exit) rather than to treat it as evidence.',
  },
  {
    id: 'b11', cluster: 'Mirroring', difficulty: 2,
    scene: 'Ten minutes into a conversation, the other person has started using your words ("pivot", "actually") and matching your pace and posture.',
    question: 'What is the most likely explanation?',
    options: [
      'They are mocking you',
      'Rapport is building — linguistic and postural convergence is a trust signal',
      'They are trying to manipulate you',
      'They forgot their own vocabulary',
    ],
    answer: 1,
    cue: 'Convergence is rapport, usually unconscious.',
    explain:
      'Matching pace, posture and vocabulary generally follows rapport rather than causing it — it is largely automatic. Once you notice it, you can gently lead: change your energy and see if they follow. If they do, you hold the room.',
  },
  {
    id: 'b12', cluster: 'Micro-Expressions', difficulty: 3,
    scene: 'You tell a joke. One person laughs loudly and a beat late; their eyes flick to two others before they laugh.',
    question: 'What does this pattern suggest?',
    options: [
      'Genuine, spontaneous amusement',
      'Social laughter — checking group permission before committing to the laugh',
      'They hate you',
      'They did not understand the joke',
    ],
    answer: 1,
    cue: 'Late laugh + eye check = social, not spontaneous.',
    explain:
      'Spontaneous laughter is fast and often precedes the eye check. A beat of delay followed by a glance around before laughing is social laughter: the person is reading the room. Useful knowledge — if you want genuine reactions, talk to people in smaller groups.',
  },
  {
    id: 'b13', cluster: 'Status & Space', difficulty: 2,
    scene: 'Two people stand talking. One stands still with feet planted; the other shifts weight repeatedly and touches their face every few seconds.',
    question: 'Who most likely holds the higher status in this moment?',
    options: [
      'The one shifting — movement means energy and dominance',
      'The still one — stability and low fidget read as grounded status',
      'Neither, status is not visible',
      'The one touching their face, because grooming signals confidence',
    ],
    answer: 1,
    cue: 'Grounded stillness reads as status; fidget reads as anxiety.',
    explain:
      'Grounding is the cheapest status upgrade available: planted feet, still hands, slow breath. Fidgeting is honest but costly — it broadcasts internal noise. Practise stillness in low-stakes conversations so it is available in high ones.',
  },
  {
    id: 'b14', cluster: 'Eyes', difficulty: 2,
    scene: 'At a bar, someone holds your gaze slightly longer than usual, smiles, then looks away and down before looking back.',
    question: 'Culturally, the best read in most Western contexts is:',
    options: [
      'Pure hostility',
      'Interest — the look-away-and-return pattern is a classic invitation to approach',
      'Total indifference',
      'They are checking the time',
    ],
    answer: 1,
    cue: 'Look, break, return = invitation.',
    explain:
      'Sustained gaze, a break with a smile, and a second return is one of the most consistent courtship signals across cultures. Read with care: context, culture, and the rest of the cluster matter. The safe move is a small approach with an easy exit.',
  },
  {
    id: 'b15', cluster: 'Hands', difficulty: 1,
    scene: 'A speaker grips the lectern with both hands, knuckles pale, and their shoulders are raised near the ears.',
    question: 'What is the most likely state?',
    options: [
      'Confident authority',
      'Nervous tension — anchoring and shoulder elevation are classic anxiety cues',
      'They are holding the lectern for balance',
      'They are bored',
    ],
    answer: 1,
    cue: 'White knuckles + raised shoulders = tension.',
    explain:
      'Gripping is an anchor behaviour that anxiety produces; shoulder elevation is part of the startle/fear pattern. If you spot it in yourself, drop your shoulders on an exhale and let your hands be visible and still. Audience members mirror the speaker\'s state.',
  },
  {
    id: 'b16', cluster: 'Mirroring', difficulty: 3,
    scene: 'You deliberately slow your speech and lower your volume during a tense exchange. Thirty seconds later the other person is speaking more slowly and quietly too.',
    question: 'What have you just demonstrated?',
    options: [
      'Nothing — coincidence',
      'Emotional contagion and state leadership: you set the tempo and they followed',
      'That they are copying you maliciously',
      'That they are falling asleep',
    ],
    answer: 1,
    cue: 'Whoever sets the tempo, leads the emotional state.',
    explain:
      'Nervous systems entrain. When you slow down and lower volume in conflict, you offer the other person\'s nervous system a slower pace to match — which is far more effective than arguing faster. This is the single most useful de-escalation move there is.',
  },
];

export const BODY_CLUSTERS = ['Feet & Legs', 'Micro-Expressions', 'Eyes', 'Hands', 'Status & Space', 'Mirroring'];
