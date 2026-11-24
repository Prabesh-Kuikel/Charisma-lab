// ─────────────────────────────────────────────────────────────
//  Written & asynchronous communication
//
//  The whole app taught live speech: rooms, faces, timing, recovery.
//  Ninety-one library entries and not one of them covered the medium
//  most people actually spend their day in — text, DMs, email, chat.
//
//  That is not a cosmetic gap. Written communication is the same skill
//  with different physics: no tone of voice, no recovery in real time,
//  a permanent record, and an audience that reads it in a different
//  mood than the one you wrote it in. The advice that transfers is
//  not "be clear"; it is a set of specific moves, and they are what
//  these entries teach.
//
//  Same content contract as every other wing: a thesis you can act on,
//  a script you can copy, failure modes named, a drill, and the honest
//  limit of the advice.
// ─────────────────────────────────────────────────────────────

export const WRITTEN_CATEGORY = {
  id: 'written',
  name: 'Written & Async',
  note: 'Text, DMs, email and chat. Same skill, different physics: no tone of voice, no real-time repair, and a permanent record.',
};

export const WRITTEN_ENTRIES = [
  {
    id: 'lib-wr1',
    category: 'Written & Async',
    source: 'Charisma Lab',
    tags: ['texting', 'tone', 'ambiguity', 'reading'],
    title: 'Tone Is Supplied by the Reader',
    short: 'You did not send a tone. They chose one.',
    body: 'A message carries no tone. The reader supplies it, usually from their own mood, their history with you, and the last thing you said. That is why "fine" can start a fight and why the same line reads warm to one person and cold to another. The fix is not to add exclamation marks until it feels friendly — it is to remove the two things readers use to guess a tone: ambiguity about what you want, and ambiguity about how you feel about them. Name the ask. Name the warmth. "Can you send the file by Thursday? No rush if it slips to Friday — I just need to know which."',
    use: 'Any message where the reply matters, and any message to someone who is already annoyed with you.',
  },
  {
    id: 'lib-wr2',
    category: 'Written & Async',
    source: 'Charisma Lab',
    tags: ['timing', 'reply', 'pace', 'anxiety'],
    title: 'The Reply-Time Signal',
    short: 'How fast you reply is a message of its own.',
    body: 'Response time is read as interest, status, or punishment, whether or not you meant any of the three. Instant replies read as eager or available; slow ones read as busy or cold; and after a conflict, a slow reply reads as a verdict. You cannot opt out of sending this signal, only decide what it says. Pick a rhythm and stay in it: reply to logistics within a day, reply to feeling within hours, and if you need time to answer something loaded, say so in one line rather than going quiet — "I want to answer this properly, give me until tonight."',
    use: 'Dating, family, and any thread where someone is waiting on an emotional answer rather than a fact.',
  },
  {
    id: 'lib-wr3',
    category: 'Written & Async',
    source: 'Charisma Lab',
    tags: ['conflict', 'repair', 'escalation', 'email'],
    title: 'Never Fight by Text',
    short: 'The medium removes everything that de-escalates.',
    body: 'Conflict needs tone, timing, and the ability to see the other person soften. Written conflict has none of the three and adds a permanent record, an audience, and the ability to re-read the worst line forty times. That is why a small disagreement by message becomes a large one by midnight. The move is not to write more carefully — it is to switch channels once you notice the temperature rising. "This is getting long and I do not want to get it wrong. Can we talk at 6?" If a call is impossible, change the register instead: fewer words, one question, no case-building.',
    use: 'Any thread where you can feel yourself drafting a paragraph to win — texts, DMs, group chat, email.',
  },
  {
    id: 'lib-wr4',
    category: 'Written & Async',
    source: 'Charisma Lab',
    tags: ['email', 'work', 'clarity', 'ask'],
    title: 'One Ask Per Message',
    short: 'If you want three things done, send three messages.',
    body: 'Multiple asks in one message reliably produce one reply, answering the easiest one. The reader triages: they answer what is quick, feel they have dealt with it, and the important ask dies quietly. Split it. Each message gets one ask, one deadline, one owner, and the ask appears in the first line — not after two paragraphs of context. "Quick ask: approve the budget by Thursday?" then the context underneath, for the people who want it. This is not about being terse; it is about not burying the only thing you need.',
    use: 'Work email, Slack or team chat, DMs to busy people, and any request to someone more senior than you.',
  },
  {
    id: 'lib-wr5',
    category: 'Written & Async',
    source: 'Charisma Lab',
    tags: ['voice notes', 'warmth', 'media', 'choice'],
    title: 'Match the Medium to the Weight',
    short: 'A serious thing in a light medium reads as a joke.',
    body: 'Each channel carries a default weight: a meme is light, a voice note is intimate, a call is serious, a letter is formal. Sending heavy content in a light channel insults the content; sending light content in a formal channel creates dread — a subject line of "Quick question" above three paragraphs makes people braced for bad news. Choose deliberately. Apologies, endings, and bad news want a call or a voice. Warmth, jokes and coordination are fine in text. And if you are unsure, one line naming the weight removes all the guessing: "Nothing is wrong, I just want to ask you something."',
    use: 'Choosing how to send news, and repairing the dread caused by an ominous subject line.',
  },
  {
    id: 'lib-wr6',
    category: 'Written & Async',
    source: 'Charisma Lab',
    tags: ['voice notes', 'async', 'storytelling', 'practice'],
    title: 'The 40-Second Voice Note',
    short: 'Warmer than text or chat, cheaper than a call — if it is short.',
    body: 'A voice note carries the thing text cannot: your actual warmth, hesitation and humour. It is also the most abused format, because it is easier to ramble than to type. Forty seconds is the working limit — long enough for a short story plus a question, short enough that nobody postpones it. Structure it like a tiny story: the thing that happened, what it made you think, and one question back. If it runs past a minute, you are not being warm, you are thinking out loud at someone who cannot get a word in.',
    use: 'Staying close to someone at a distance, and any message where you want your voice heard without scheduling a call.',
  },
];

// ── gym playbooks: the same six situations, practised rather than read ──
export const WRITTEN_GYM = [
  {
    id: 'gym-wr-tone',
    category: 'Written & Async',
    title: 'A message that got read colder than you wrote it',
    tone: 'amber',
    difficulty: 2,
    situation: 'You sent "fine, do what you think is best" four hours ago. The reply was short. You can now see the message did not carry the tone you meant, and there is no way to un-send it.',
    goal: 'Repair the tone in one short message without a paragraph of explanation.',
    steps: [
      'Do not send a long correction. A wall of text after a cold message confirms that something was wrong.',
      'Name the tone you meant, in one line, and take the ambiguity on yourself: the medium was unclear, not the other person.',
      'Restate the actual ask or the actual feeling in concrete words. "Fine, do what you think is best" becomes "I am not upset, I genuinely do not have a preference on this one."',
      'End with an open question that is easy to answer, so the next message from them is cheap.',
    ],
    lines: [
      { label: 'Taking the ambiguity', text: '"That came out colder than I meant it — the flatness was the text, not me."' },
      { label: 'Saying the actual thing', text: '"I have no preference on this one. I was not being passive-aggressive, I was being brief and it read wrong."' },
      { label: 'Easy next message', text: '"Which one do you actually want? I will back it."' },
      { label: 'The one-line reset', text: '"Short version: I have no preference, and I am not annoyed. Pick whichever you like."' },
      { label: 'Naming the medium', text: '"Text makes me sound flatter than I am. Nothing is wrong on this end."' },
    ],
    avoid: [
      'Explaining at length why your message was fine — that is an argument, not a repair.',
      'Blaming the medium entirely ("you always read things into my texts") — it is half true and never helps.',
      'Sending three follow-up messages. One repair, then let them answer.',
    ],
    drill: 'Rewrite one message you know landed badly into three sentences: name the tone, say the real thing, ask an easy question.',
    reads: ['lib-wr1', 'lib-wr3'],
  },
  {
    id: 'gym-wr-escalation',
    category: 'Written & Async',
    title: 'The thread that is turning into a fight',
    tone: 'rose',
    difficulty: 3,
    situation: 'Eight messages in, both of you are writing paragraphs. You can feel yourself constructing a case. Nothing good has been said in the last three exchanges.',
    goal: 'Stop the escalation and move it to voice, without conceding the point or winning it.',
    steps: [
      'Stop typing the paragraph. Nothing you write now will be read as anything but escalation.',
      'Send one short message that names the pattern rather than the person and offers a channel change with a specific time.',
      'Do not re-litigate the content in this message. One clause maximum, and make it warm.',
      'If they keep writing, answer once, briefly, and hold the offer. Do not match their length.',
    ],
    lines: [
      { label: 'Stopping the thread', text: '"This is getting long and I do not want to get it wrong. Can we talk at 6?"' },
      { label: 'Naming the pattern, not the person', text: '"We are both writing essays at each other now. I would rather do this properly on a call."' },
      { label: 'Holding the line once', text: '"I am not going to do this by text — it will come out wrong. I am free tonight and tomorrow morning."' },
      { label: 'The exit that stays warm', text: '"I am going to stop here rather than say something I do not mean. Call me when you can."' },
      { label: 'Owning the medium', text: '"Every message I send is making this worse. That is the format, not us. Phone at 6?"' },
    ],
    avoid: [
      'Sending the paragraph you have already drafted. You will send it and it will be read as a lawyer’s letter.',
      'Quoting their worst line back to them.',
      'Going silent without saying you will come back — that reads as a verdict, not a pause.',
    ],
    drill: 'In your next written disagreement, cap yourself at three sentences and end with a time to talk.',
    reads: ['lib-wr3', 'lib-wr2'],
  },
  {
    id: 'gym-wr-ask',
    category: 'Written & Async',
    title: 'Asking a busy person for something',
    tone: 'cyan',
    difficulty: 2,
    situation: 'You need one decision from someone who gets forty messages a day and answers neither the long ones nor the vague ones. The last message you sent got a thumbs-up and nothing else.',
    goal: 'One message that gets a decision, or a clear no, within two days.',
    steps: [
      'Put the ask in the first line, phrased so a yes/no is possible.',
      'Add the deadline and the consequence of missing it, in the same line if possible.',
      'Put the context underneath, clearly optional. Two sentences maximum — they only need it if they are going to say yes.',
      'Say what happens if you hear nothing, so silence is a decision rather than a limbo.',
    ],
    lines: [
      { label: 'The one-line ask', text: '"Quick ask: can you approve the £2k budget by Thursday? Context below, no need to read it if the answer is yes."' },
      { label: 'The consequence', text: '"If I do not have it by Thursday we lose the launch slot, so I will assume no and re-plan."' },
      { label: 'The easy no', text: '"A no is genuinely useful here — it lets me move on today."' },
      { label: 'The deadline that is real', text: '"I need the yes or the no by Thursday — after that I am committing us to the other plan."' },
      { label: 'The single ask', text: '"One thing, and then I will leave you alone: is the 12th still on?"' },
    ],
    avoid: [
      'Three asks in one message. You will get one answer, and not the important one.',
      'Leading with two paragraphs of context — that is how the ask ends up unread.',
      'Following up with "just bumping this" and no new information.',
    ],
    drill: 'Take a pending request and rewrite it as: ask, deadline, consequence, then context. Send it.',
    reads: ['lib-wr4', 'lib-wr1'],
  },
  {
    id: 'gym-wr-weight',
    category: 'Written & Async',
    title: 'Sending heavy news through a light channel',
    tone: 'violet',
    difficulty: 3,
    situation: 'You need to tell someone something serious, and your only real channel with them is a messaging app that mostly carries memes. Sending it plainly will read as casual; sending it formally will terrify them.',
    goal: 'Deliver the weight without being cruel about it, and give them a way to respond that is not a text box.',
    steps: [
      'Open with a weight marker, first line, before the content. This buys you the whole message being read in the right register.',
      'Say the thing plainly in one sentence. Do not cushion it to the point where they have to work out what you said.',
      'Immediately offer a channel that matches the weight: a call now, or a call at a named time.',
      'Do not send three messages. One, then wait — the silence is theirs to fill.',
    ],
    lines: [
      { label: 'The weight marker', text: '"Nothing is wrong — well, something is, but I am not angry at you. Read this one properly."' },
      { label: 'The one sentence', text: '"I am leaving the job at the end of the month and I wanted you to hear it from me, not second-hand."' },
      { label: 'The matching channel', text: '"Can I call you in ten minutes? I would rather say the rest out loud."' },
      { label: 'Giving them the out', text: '"You do not have to answer tonight. I just did not want you to hear it from someone else."' },
      { label: 'De-fanging the opener', text: '"Logistics, not drama. Two quick things."' },
    ],
    avoid: [
      'A subject line or opener that says "quick question" or "we need to talk" with nothing after it. That is dread with no release.',
      'Sending it at midnight when you cannot answer a reply.',
      'Cushioning it so heavily that the actual news arrives in paragraph three.',
    ],
    drill: 'Send your next piece of heavy news with a weight marker in the first line and a call offered in the last.',
    reads: ['lib-wr5', 'lib-wr6'],
  },
  {
    id: 'gym-wr-revival',
    category: 'Written & Async',
    title: 'Reviving a conversation that went quiet',
    tone: 'mint',
    difficulty: 1,
    situation: 'A good conversation died three weeks ago mid-thread. No one did anything wrong; life happened. You want to restart it without apologising for existing or pretending the gap did not happen.',
    goal: 'One message that restarts the thread with something specific, no guilt and no "hey stranger".',
    steps: [
      'Do not acknowledge the gap with an apology. "Sorry I have been bad at replying" makes them manage your guilt.',
      'Send something specific that proves you were still thinking about them: a callback to a thing they said, a link, a result, a question only they can answer.',
      'Do not open with "hey" or "how have you been" — that is a blank cheque that asks them to do the work.',
      'Ask one question that is easy and interesting to answer, and let it be a complete message on its own.',
    ],
    lines: [
      { label: 'The callback', text: '"You said you were going to try the cold-email thing in March. Did it work, or did it die the way mine did?"' },
      { label: 'The specific update', text: '"I finally did the thing you suggested and it went badly in an interesting way — do you want the story?"' },
      { label: 'No-guilt opener', text: '"Random, but this made me think of your take on it."' },
      { label: 'The question only they can answer', text: '"You are the only person I know who has actually done this — was it worth it?"' },
      { label: 'The honest gap', text: '"I have been useless at messages for a month, and I am not going to pretend otherwise. How did the move go?"' },
    ],
    avoid: [
      '"Hey stranger!" and other openers that make the gap the topic.',
      'Apologising for the silence in the first line — it turns a warm message into a debt.',
      '"How are you?" as the whole message. It costs them an answer and gives them nothing.',
    ],
    drill: 'Send one revival message today: a specific callback, one question, no apology for the gap.',
    reads: ['lib-wr2', 'lib-wr6'],
  },
  {
    id: 'gym-wr-voice',
    category: 'Written & Async',
    title: 'The voice note that should have been a text',
    tone: 'orange',
    difficulty: 1,
    situation: 'You have recorded a two-minute voice note twice already. It is rambling. You are about to send it anyway because retyping feels like defeat.',
    goal: 'Send something warm and legible that respects the other person’s time.',
    steps: [
      'Decide what the message is for. If it contains a decision, an ask, or a date, it belongs in text — voice notes are terrible at logistics.',
      'If it is warmth or a story, cut it to forty seconds: the thing that happened, what it made you think, one question back.',
      'Delete the rambling recording rather than trimming your standards.',
      'If you genuinely have too much to say, that is a signal you want a call, not a longer recording. Ask for one.',
    ],
    lines: [
      { label: 'The forty-second shape', text: '"Something happened today that you will find funny — [story]. It made me think about what you said about quitting. Did you actually do it?"' },
      { label: 'Asking for the call instead', text: '"This is too long for a voice note. Are you free for ten minutes tonight?"' },
      { label: 'Text for the logistics', text: '"Voice note coming, but the actual question is: are you around Thursday?"' },
      { label: 'The close that invites a reply', text: '"Anyway, that is my day. What is happening with the thing you were dreading?"' },
      { label: 'The one-line version', text: '"Three words: it went fine. Story when you have four minutes."' },
    ],
    avoid: [
      'Sending a three-minute recording of you thinking. It is not intimate, it is a monologue people feel unable to interrupt.',
      'Putting an ask or a date at minute two where it will be missed.',
      'Re-recording more than twice — the fifth take sounds like a hostage statement.',
    ],
    drill: 'Send one voice note under forty seconds with a story and one question, and move any logistics into text.',
    reads: ['lib-wr6', 'lib-wr5'],
  },
];
