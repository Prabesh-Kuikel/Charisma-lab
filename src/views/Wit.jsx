import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../api';
import { Ico, Ring, ScoreRow, Spinner, Bar } from '../components/ui';
import { useTimer } from '../hooks';

const CATS = ['All', 'Retort', 'Callback', 'Self-Deprecation', 'Charm Flip', 'Banter'];

export default function Wit({ content, notify }) {
  const [cat, setCat] = useState('All');
  const [activeId, setActiveId] = useState(null);
  const [response, setResponse] = useState('');
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [history, setHistory] = useState([]);
  const [rapid, setRapid] = useState(false);
  const timer = useTimer();

  const pool = useMemo(() => content.wit.filter((s) => cat === 'All' || s.category === cat), [content.wit, cat]);
  const active = content.wit.find((s) => s.id === activeId) || pool[0];

  useEffect(() => { setActiveId(pool[0]?.id || null); setResult(null); setResponse(''); /* eslint-disable-next-line */ }, [cat]);

  useEffect(() => {
    if (rapid && active && !result) {
      timer.start('down', 20);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rapid, activeId]);

  useEffect(() => {
    if (rapid && timer.seconds === 0 && !timer.running && !result && response.trim()) submit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer.seconds, timer.running]);

  const submit = async () => {
    if (!response.trim()) { notify('Say something — even a bad line is data.'); return; }
    setBusy(true);
    try {
      const r = await api.analyzeWit({ scenarioId: active.id, response });
      setResult(r);
      setHistory((h) => [{ id: active.id, title: active.title, score: r.overall, text: response, at: Date.now() }, ...h].slice(0, 20));
      notify(`Scored ${r.overall}/100`);
    } catch (e) { notify(e.message); }
    setBusy(false);
  };

  const next = () => {
    const idx = pool.findIndex((s) => s.id === active?.id);
    const nx = pool[(idx + 1) % pool.length];
    setActiveId(nx.id);
    setResponse('');
    setResult(null);
    if (rapid) timer.start('down', 20);
  };

  const avg = history.length ? Math.round(history.reduce((a, b) => a + b.score, 0) / history.length) : 0;

  return (
    <div className="grid split">
      <div className="stack">
        <div className="row wrap">
          <div className="tabs" style={{ flexWrap: 'wrap' }}>
            {CATS.map((c) => <button key={c} className={`tab ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{c}</button>)}
          </div>
          <div className="spacer" />
          <button className={`btn sm ${rapid ? 'primary' : ''}`} onClick={() => { setRapid((v) => !v); timer.reset('down', 20); }}>
            <Ico name="bolt" size={13} /> Rapid fire {rapid ? 'on' : 'off'}
          </button>
        </div>

        {active && (
          <>
            <div className="card fade-in" key={active.id}>
              <div className="row wrap" style={{ marginBottom: 12 }}>
                <span className="chip orange">{active.category}</span>
                <span className="chip">level {active.level}</span>
                {rapid && <span className={`chip ${timer.seconds <= 5 ? 'rose' : 'violet'}`}>{timer.seconds}s</span>}
                <span className="spacer" />
                <button className="btn sm ghost" onClick={next}>Skip <Ico name="arrow" size={12} /></button>
              </div>

              <h3 style={{ fontSize: 18, margin: '0 0 8px', letterSpacing: '-0.02em' }}>{active.title}</h3>
              <p className="card-desc" style={{ marginBottom: 14 }}>{active.setup}</p>

              <div style={{ padding: 16, borderRadius: 14, background: 'rgba(251,146,60,0.08)', border: '1px solid rgba(251,146,60,0.25)', marginBottom: 12 }}>
                <div className="tiny" style={{ textTransform: 'uppercase', letterSpacing: '0.12em', color: '#fb923c', fontWeight: 700, marginBottom: 7 }}>They say</div>
                <div style={{ fontSize: 15, lineHeight: 1.55, fontWeight: 550 }}>"{active.theySay}"</div>
              </div>

              <div className="row tiny dim" style={{ marginBottom: 14, gap: 8, alignItems: 'flex-start' }}>
                <Ico name="eye" size={12} /><span>{active.context}</span>
              </div>

              <label className="label">Your line — out loud, then typed</label>
              <textarea className="textarea" value={response} onChange={(e) => setResponse(e.target.value)}
                placeholder="Speak it aloud first. Then write exactly what you said…" style={{ minHeight: 92 }} />

              <div className="row wrap" style={{ marginTop: 12, gap: 9 }}>
                <button className="btn primary" onClick={submit} disabled={busy}>
                  {busy ? <Spinner /> : <><Ico name="bolt" size={14} /> Score my retort</>}
                </button>
                <button className="btn" onClick={() => setResponse('')}>Clear</button>
                <div className="spacer" />
                <span className="tiny dim">{response.trim() ? response.trim().split(/\s+/).length : 0} words</span>
              </div>
            </div>

            {result && (
              <div className="card fade-in">
                <div className="row" style={{ marginBottom: 16, alignItems: 'flex-start' }}>
                  <Ring value={result.overall} size={86} stroke={8} label="wit score" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 4 }}>{result.verdict}</div>
                    <div className="row wrap" style={{ gap: 5 }}>
                      {result.detected.length === 0 && <span className="chip rose">no strategy detected</span>}
                      {result.detected.map((d) => (
                        <span key={d} className={`chip ${result.matchedTargets.includes(d) ? 'mint' : ''}`}>{d}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <ScoreRow name="Humour" value={result.scores.humour} />
                <ScoreRow name="Timing" value={result.scores.timing} />
                <ScoreRow name="Warmth" value={result.scores.warmth} />
                <ScoreRow name="Strategy" value={result.scores.strategy} />

                <div className="stack sm" style={{ marginTop: 16 }}>
                  {result.positives.length > 0 && (
                    <div className="feedback good"><ul>{result.positives.map((p, i) => <li key={i}>{p}</li>)}</ul></div>
                  )}
                  {result.fixes.length > 0 && (
                    <div className="feedback fix"><ul>{result.fixes.map((p, i) => <li key={i}>{p}</li>)}</ul></div>
                  )}
                  <div className="feedback" style={{ background: 'rgba(139,92,246,0.07)', borderColor: 'rgba(139,92,246,0.25)' }}>
                    <strong>Coaching:</strong> {result.coaching}
                  </div>
                  {result.modelLine && (
                    <div className="feedback" style={{ borderStyle: 'dashed' }}>
                      <div className="tiny dim" style={{ marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>A model line</div>
                      "{result.modelLine}"
                    </div>
                  )}
                </div>

                <button className="btn primary full" style={{ marginTop: 14 }} onClick={next}>
                  Next scenario <Ico name="arrow" size={14} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="stack" style={{ alignSelf: 'start' }}>
        <div className="card">
          <div className="row" style={{ marginBottom: 12 }}>
            <h3 className="card-title"><Ico name="trophy" size={14} /> Session record</h3>
            <span className="spacer" />
            {avg > 0 && <span className="chip mint">avg {avg}</span>}
          </div>
          {history.length === 0 && <p className="card-desc">Your scored lines will stack up here. Aim for a running average above 70.</p>}
          {history.map((h) => (
            <div key={h.at} style={{ marginBottom: 12 }}>
              <div className="row tiny" style={{ marginBottom: 4 }}>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 190 }}>{h.title}</span>
                <span className="spacer" />
                <span className="mono dim">{h.score}</span>
              </div>
              <Bar value={h.score} tone={h.score >= 75 ? 'mint' : h.score >= 55 ? '' : 'amber'} height={5} />
            </div>
          ))}
        </div>

        <div className="card">
          <h3 className="card-title" style={{ marginBottom: 10 }}><Ico name="brain" size={14} /> The four laws of banter</h3>
          {[
            ['Agree, then escalate', 'Denial kills the joke. Accept the premise and push it further than they did.'],
            ['Punch inward or upward, never down', 'Self, situation, or the shared absurdity — never their wound.'],
            ['Two to three sentences maximum', 'A retort that needs explaining has already failed.'],
            ['End on the funny word', 'Rearrange the sentence until the punch lands last. Nothing after it.'],
          ].map(([a, b]) => (
            <div key={a} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 2 }}>{a}</div>
              <div className="tiny dim">{b}</div>
            </div>
          ))}
        </div>

        <div className="card">
          <h3 className="card-title" style={{ marginBottom: 10 }}><Ico name="spark" size={14} /> Scenario bank</h3>
          <div className="stack sm">
            {pool.slice(0, 8).map((s) => (
              <button key={s.id} className="row" style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '5px 0', color: s.id === active?.id ? '#fff' : '#9a9ab0' }}
                onClick={() => { setActiveId(s.id); setResponse(''); setResult(null); if (rapid) timer.start('down', 20); }}>
                <span className="dot" style={{ background: s.id === active?.id ? '#fb923c' : '#3a3a55' }} />
                <span style={{ fontSize: 12.5 }}>{s.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
