import React, { useEffect, useRef, useState } from 'react';
import { api } from '../api';
import { Ico, Ring, ScoreRow, Spinner, Bar } from '../components/ui';
import { askAI, aiEnabled } from '../local/ai-client.js';
import { arenaSystemPrompt } from '../../server/ai.js';

// Scenes in teaching order, with the sentence that tells you why it is hard.
const SCENE_META = {
  Networking: 'Rooms where nobody owes you attention. Warmth plus a specific reason to keep talking.',
  'Date / Casual Bar': 'Low stakes on paper, high stakes in the body. Play, curiosity, and no interview energy.',
  'Resolving Tension': 'Someone is upset and you are the one who has to fix it without grovelling or defending.',
  Interview: 'You are being judged on evidence. Stories with numbers, and honest edges left on.',
  Group: 'Two people who already have a rhythm, and you arriving in the middle of it.',
  Care: 'Talking to someone in pain. The hardest skill here is not solving anything.',
};

const SCENE_ORDER = Object.keys(SCENE_META);

export default function Arena({ content, notify, go }) {
  const [scene, setScene] = useState('Networking');
  const [session, setSession] = useState(null); // {sessionId, scenario, history, trust}
  const [msg, setMsg] = useState('');
  const [sending, setSending] = useState(false);
  const [coach, setCoach] = useState(null);
  const [summary, setSummary] = useState(null);
  const [starting, setStarting] = useState(false);
  const [aiPersona, setAiPersona] = useState(() => aiEnabled());
  const chatRef = useRef(null);

  const sceneTabs = [...new Set([
    ...SCENE_ORDER.filter((s) => content.arena.some((a) => a.scene === s)),
    ...content.arena.map((a) => a.scene).filter((s) => !SCENE_ORDER.includes(s)),
  ])];
  const scenarios = content.arena.filter((a) => a.scene === scene);
  const chapterTitle = (id) => (content.library.find((c) => c.id === id) || {}).title;

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [session?.history?.length, sending]);

  const start = async (scenarioId) => {
    setStarting(true);
    setSummary(null);
    setCoach(null);
    try {
      const r = await api.arenaStart({ scenarioId });
      setSession(r);
    } catch (e) { notify(e.message); }
    setStarting(false);
  };

  const send = async () => {
    if (!msg.trim() || !session) return;
    const text = msg.trim();
    setMsg('');
    setSending(true);
    setSession((s) => ({ ...s, history: [...s.history, { role: 'user', text }] }));
    try {
      // Deterministic engine first: it tracks trust and gives coaching notes.
      const r = await api.arenaMessage({ sessionId: session.sessionId, message: text });

      let reply = r.reply;
      let aiUsed = false;
      if (aiPersona && aiEnabled()) {
        try {
          const history = [...session.history, { role: 'user', text }]
            .slice(-10)
            .map((m) => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text }));
          const out = await askAI({
            messages: history,
            system: arenaSystemPrompt(session.scenario),
            mode: 'general',
            temperature: 0.85,
            maxTokens: 160,
          });
          reply = out.text;
          aiUsed = true;
        } catch (e) {
          if (e.name === 'RateLimit') notify(`AI persona cooling down (${e.retryAfter}s) — using the scripted persona`);
          else notify('AI persona unavailable — scripted persona answering');
        }
      }

      setSession((s) => ({
        ...s,
        history: [...s.history, { role: 'persona', text: reply, kind: r.kind, trust: r.trustBefore, ai: aiUsed }],
        trust: r.trustBefore,
      }));
      setCoach(r.coach ? { text: r.coach, tier: r.tier } : null);
    } catch (e) { notify(e.message); }
    setSending(false);
  };

  const end = async () => {
    if (!session) return;
    try {
      const r = await api.arenaEnd({ sessionId: session.sessionId });
      setSummary(r);
    } catch (e) { notify(e.message); }
  };

  const leave = () => { setSession(null); setSummary(null); setCoach(null); setMsg(''); };

  const sc = session?.scenario;

  return (
    <div className={`grid ${session ? 'split' : ''}`}>
      <div className="stack">
        {!session && (
          <>
            <div className="row wrap">
              <div className="tabs">
                {sceneTabs.map((s) => (
                  <button key={s} className={`tab ${scene === s ? 'active' : ''}`} onClick={() => setScene(s)}>
                    {s}
                    <span className="tiny dim" style={{ marginLeft: 6 }}>{content.arena.filter((a) => a.scene === s).length}</span>
                  </button>
                ))}
              </div>
              <div className="spacer" />
              <span className="chip violet"><Ico name="chat" size={11} /> dynamic persona engine</span>
            </div>

            {SCENE_META[scene] && (
              <div className="feedback" style={{ background: 'rgba(139,92,246,0.07)', borderColor: 'rgba(139,92,246,0.25)' }}>
                <strong style={{ color: '#a78bfa' }}>{scene}:</strong> {SCENE_META[scene]}
              </div>
            )}

            <div className="grid g3">
              {scenarios.map((a) => (
                <div key={a.id} className="card" style={{ borderColor: `${a.color}33` }}>
                  <div className="row" style={{ marginBottom: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 13, background: `${a.color}22`, border: `1px solid ${a.color}44`, display: 'grid', placeItems: 'center', fontSize: 20 }}>{a.emoji}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{a.name}</div>
                      <div className="tiny dim">{a.role}</div>
                    </div>
                  </div>
                  <p className="card-desc" style={{ marginBottom: 12, minHeight: 74 }}>{a.brief}</p>
                  <div className="row tiny dim" style={{ marginBottom: 12, gap: 6 }}>
                    <span className="chip" style={{ fontSize: 10 }}>difficulty {a.difficulty}/5</span>
                    <span className="chip" style={{ fontSize: 10 }}>{a.traits.slice(0, 2).join(' · ')}</span>
                  </div>
                  <div className="tiny" style={{ marginBottom: 12 }}>
                    <span className="dim">Goal: </span>{a.goal}
                  </div>
                  <button className="btn primary full" onClick={() => start(a.id)} disabled={starting}>
                    {starting ? <Spinner /> : <><Ico name="play" size={13} /> Enter the conversation</>}
                  </button>
                </div>
              ))}
            </div>

            <div className="card">
              <h3 className="card-title" style={{ marginBottom: 10 }}><Ico name="brain" size={14} /> How the Arena scores you</h3>
              <div className="grid g4" style={{ gap: 12 }}>
                {[
                  ['Curiosity', 'Do you ask, or do you perform?'],
                  ['Specificity', 'Numbers, nouns, concrete examples.'],
                  ['Warmth', 'Second-person focus and no aggression.'],
                  ['Momentum', 'Length, pace and whether you hand the turn back.'],
                ].map(([a, b]) => (
                  <div key={a}>
                    <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 3 }}>{a}</div>
                    <div className="tiny dim">{b}</div>
                  </div>
                ))}
              </div>
              <div className="feedback" style={{ marginTop: 14, background: 'rgba(139,92,246,0.07)', borderColor: 'rgba(139,92,246,0.25)' }}>
                <strong>Rule of the Arena:</strong> personas react to what you actually write. Referencing a detail they gave you earlier is the single strongest move available — it is what real charisma feels like from the inside.
              </div>
            </div>
          </>
        )}

        {session && (
          <div className="card" style={{ borderColor: `${sc?.color}44` }}>
            <div className="row" style={{ marginBottom: 14 }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: `${sc?.color}22`, border: `1px solid ${sc?.color}44`, display: 'grid', placeItems: 'center', fontSize: 17 }}>{sc?.emoji}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{sc?.name}</div>
                <div className="tiny dim">{sc?.role} · {sc?.scene}</div>
              </div>
              <span className="spacer" />
              <button className="btn sm ghost" onClick={leave}><Ico name="x" size={13} /> Leave</button>
            </div>

            <div className="trust-meter" style={{ marginBottom: 14 }}>
              <span className="tiny dim" style={{ whiteSpace: 'nowrap' }}>Rapport</span>
              <Bar value={session.trust} tone={session.trust >= 70 ? 'mint' : session.trust >= 45 ? '' : 'rose'} />
              <span className="mono tiny">{session.trust}</span>
            </div>

            <div className="chat" ref={chatRef}>
              {session.history.map((h, i) => (
                <div key={i} className={`msg ${h.role === 'user' ? 'user' : ''}`}>
                  <div className="msg-ava" style={h.role === 'persona' ? { background: `${sc?.color}22`, borderColor: `${sc?.color}44` } : {}}>
                    {h.role === 'user' ? '🗣' : sc?.emoji}
                  </div>
                  <div className="bubble">
                    {h.text}
                    {h.role === 'persona' && h.trust != null && (
                      <div className="bubble-meta">
                        <span className="dot" style={{ background: h.trust >= 70 ? '#34d399' : h.trust >= 45 ? '#fbbf24' : '#f43f5e' }} />
                        rapport {h.trust}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {sending && (
                <div className="msg">
                  <div className="msg-ava" style={{ background: `${sc?.color}22` }}>{sc?.emoji}</div>
                  <div className="bubble"><Spinner /></div>
                </div>
              )}
            </div>

            {coach && (
              <div className="feedback" style={{ marginTop: 12, background: 'rgba(139,92,246,0.08)', borderColor: 'rgba(139,92,246,0.25)' }}>
                <strong style={{ color: '#a78bfa' }}>Live coach:</strong> {coach.text}
              </div>
            )}

            <div style={{ marginTop: 14 }}>
              <textarea className="textarea" style={{ minHeight: 78 }} value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) send(); }}
                placeholder={`Reply to ${sc?.name}…  (⌘/Ctrl + Enter to send)`} />
              <div className="row" style={{ marginTop: 10, gap: 9 }}>
                <button className="btn primary" onClick={send} disabled={sending || !msg.trim()}>
                  {sending ? <Spinner /> : <><Ico name="arrow" size={14} /> Send</>}
                </button>
                <button className="btn" onClick={end}>End & review</button>
                <div className="spacer" />
                <button className={`chip clickable ${aiPersona ? 'active' : ''}`} style={{ fontSize: 10 }}
                  onClick={() => { setAiPersona((v) => !v); notify(aiPersona ? 'Scripted persona' : 'AI persona on'); }}>
                  <Ico name="spark" size={10} /> {aiPersona ? 'AI persona' : 'scripted'}
                </button>
                <span className="tiny dim">{session.history.filter((h) => h.role === 'user').length} turns</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {session && (
        <div className="stack" style={{ alignSelf: 'start' }}>
          {!summary ? (
            <>
              <div className="card">
                <h3 className="card-title" style={{ marginBottom: 10 }}><Ico name="target" size={14} /> Your brief</h3>
                <p className="card-desc" style={{ marginBottom: 12 }}>{sc?.brief}</p>
                <div className="chip mint" style={{ marginBottom: 12 }}>{sc?.goal}</div>
                <div className="tiny dim" style={{ marginBottom: 6, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Likes</div>
                <div className="row wrap" style={{ gap: 5, marginBottom: 12 }}>
                  {sc?.likes.map((l) => <span key={l} className="chip mint" style={{ fontSize: 10 }}>{l}</span>)}
                </div>
                <div className="tiny dim" style={{ marginBottom: 6, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Allergic to</div>
                <div className="row wrap" style={{ gap: 5 }}>
                  {sc?.dislikes.map((l) => <span key={l} className="chip rose" style={{ fontSize: 10 }}>{l}</span>)}
                </div>
                {(sc?.reads || []).length > 0 && (
                  <>
                    <div className="tiny dim" style={{ margin: '14px 0 6px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Read before you walk in</div>
                    <div className="row wrap" style={{ gap: 5 }}>
                      {(sc?.reads || []).filter(chapterTitle).map((id) => (
                        <button key={id} className="chip clickable" style={{ fontSize: 10 }}
                          onClick={() => go('library', { openId: id })}>
                          {chapterTitle(id)}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="card">
                <h3 className="card-title" style={{ marginBottom: 10 }}><Ico name="bolt" size={14} /> Moves that work here</h3>
                {[
                  'Reference something they said two turns ago — callbacks build trust fastest.',
                  'One specific detail beats three general claims.',
                  'Ask before you assert. Curiosity is the cheapest status move.',
                  'When rapport drops, slow down and shorten. Never over-explain.',
                ].map((m) => (
                  <div key={m} className="list-row" style={{ alignItems: 'flex-start' }}>
                    <span className="dot" style={{ background: '#8b5cf6', marginTop: 6 }} />
                    <span className="tiny" style={{ lineHeight: 1.55 }}>{m}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="card fade-in">
              <div className="row" style={{ marginBottom: 14, alignItems: 'flex-start' }}>
                <Ring value={summary.score} size={86} stroke={8} label="session" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{summary.score >= 75 ? 'Strong run' : summary.score >= 55 ? 'Mixed run' : 'Rough run'}</div>
                  <div className="tiny dim" style={{ marginTop: 3 }}>{summary.turns} turns · {summary.avgWords} words/turn · {summary.questions} questions</div>
                  <div className="chip" style={{ marginTop: 8 }}>final rapport {summary.trust}</div>
                </div>
              </div>
              <ScoreRow name="Curiosity" value={summary.scores.curiosity} />
              <ScoreRow name="Specificity" value={summary.scores.specificity} />
              <ScoreRow name="Warmth" value={summary.scores.warmth} />
              <ScoreRow name="Momentum" value={summary.scores.momentum} />
              <div className="feedback" style={{ marginTop: 14 }}>
                <strong>Next time:</strong> {summary.scores.curiosity < 60
                  ? 'ask more questions — you carried too much of the talking.'
                  : summary.scores.specificity < 60
                    ? 'bring one concrete example or number per turn.'
                    : summary.scores.momentum < 60
                      ? 'keep turns between 12 and 50 words and hand the floor back.'
                      : 'you are ready for a harder persona — try Marco, Elena, Priya at the counter, or the three-person table.'}
              </div>
              <div className="row" style={{ marginTop: 12, gap: 8 }}>
                <button className="btn primary full" onClick={() => start(sc.id)}>Run it again</button>
                <button className="btn full" onClick={leave}>Pick a new scenario</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
