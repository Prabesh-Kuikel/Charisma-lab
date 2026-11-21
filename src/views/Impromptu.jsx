import React, { useEffect, useMemo, useRef, useState } from 'react';
import { api, fmtTime } from '../api';
import { Ico, Ring, ScoreRow, Spinner, Bar } from '../components/ui';
import { useRecorder, useTimer } from '../hooks';

export default function Impromptu({ content, go, notify, boot }) {
  const [cat, setCat] = useState('All');
  const [prompt, setPrompt] = useState(null);
  const [phase, setPhase] = useState('idle'); // idle | prep | live | scored
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [manual, setManual] = useState(false);
  const rec = useRecorder();
  const timer = useTimer();
  const prepTimer = useTimer();
  const audioRef = useRef(null);

  const cats = useMemo(() => ['All', ...new Set(content.prompts.map((p) => p.category))], [content.prompts]);
  const pool = useMemo(() => (cat === 'All' ? content.prompts : content.prompts.filter((p) => p.category === cat)), [cat, content.prompts]);

  const roll = (p) => {
    const next = p || pool[Math.floor(Math.random() * pool.length)];
    setPrompt(next);
    setPhase('idle');
    setResult(null);
    setManual(false);
    rec.reset();
    timer.reset('up');
    prepTimer.set('down', next.prep);
  };

  useEffect(() => {
    if (boot?.drillPrompt) {
      setPrompt({ id: 'course', text: boot.drillPrompt, category: boot.dayTitle || 'Course drill', difficulty: 2, prep: 10, speak: 120 });
      prepTimer.set('down', 10);
    } else {
      roll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boot?.drillPrompt]);

  const startPrep = () => { setPhase('prep'); prepTimer.start('down', prompt.prep); prepTimer._onDone = true; };
  const skipPrep = () => { prepTimer.pause(); startLive(); };

  const startLive = async () => {
    setPhase('live');
    timer.start('up');
    await rec.start();
  };

  const stopLive = async () => {
    timer.pause();
    rec.stop();
    setPhase('review');
  };

  const analyze = async () => {
    setBusy(true);
    try {
      const transcript = rec.transcript || '';
      const metrics = {
        durationSec: timer.seconds,
        wpm: rec.rmsStats.seconds ? Math.round(((transcript.trim().split(/\s+/).filter(Boolean).length) / rec.rmsStats.seconds) * 60) : undefined,
        rmsMean: rec.rmsStats.mean,
        rmsVariance: rec.rmsStats.variance,
        pauseCount: rec.rmsStats.pauseCount,
      };
      const r = await api.analyzeSpeech({ transcript, mode: 'impromptu', metrics, promptText: prompt.text, ref: prompt.id });
      setResult(r);
      setPhase('scored');
      notify(`Scored ${r.overall}/100`);
    } catch (e) { notify(e.message); }
    setBusy(false);
  };

  // auto-move from prep to live when the countdown hits zero
  useEffect(() => {
    if (phase === 'prep' && prepTimer.seconds === 0 && !prepTimer.running) startLive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, prepTimer.seconds, prepTimer.running]);

  const live = phase === 'live';
  const over = prompt && timer.seconds > prompt.speak + 30;

  return (
    <div className="grid split">
      <div className="stack">
        <div className="prompt-box">
          <div className="row" style={{ marginBottom: 12 }}>
            <span className="chip violet"><Ico name="spark" size={11} /> Impromptu prompt</span>
            {prompt && <span className="chip">{prompt.category}</span>}
            {prompt && <span className="chip">target {fmtTime(prompt.speak)}</span>}
            <span className="spacer" />
            <button className="btn sm" onClick={() => roll()}><Ico name="refresh" size={13} /> Reroll</button>
          </div>
          <div className="prompt-text">{prompt?.text || 'Rolling a prompt…'}</div>
          <div className="row wrap tiny dim" style={{ marginTop: 12, gap: 6 }}>
            {cats.slice(1).map((c) => (
              <button key={c} className={`chip clickable ${cat === c ? 'active' : ''}`} onClick={() => { setCat(c); }}>{c}</button>
            ))}
            {cat !== 'All' && <button className="chip clickable" onClick={() => setCat('All')}>Clear filter</button>}
          </div>
        </div>

        {phase === 'idle' && (
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: 10 }}><Ico name="clock" size={14} /> Prep window</h3>
            <p className="card-desc" style={{ marginBottom: 14 }}>
              You get {prompt?.prep || 15} seconds of silence to plan, then the recorder opens. Aim to speak for {prompt ? fmtTime(prompt.speak) : '2:00'}.
              Structure it: hook → one story → one point → close.
            </p>
            <div className="row">
              <button className="btn primary lg" onClick={startPrep}><Ico name="play" size={15} /> Start prep ({prompt?.prep || 15}s)</button>
              <button className="btn lg" onClick={() => startLive()}><Ico name="mic" size={15} /> Skip prep, go live</button>
            </div>
            <div className="row tiny dim" style={{ marginTop: 14, gap: 8 }}>
              <Ico name={rec.srSupported ? 'check' : 'dot'} size={12} />
              {rec.srSupported
                ? 'Live transcription available — your words will be scored for clarity and structure.'
                : 'Live transcription is not available in this browser. Record anyway, or type your transcript after.'}
            </div>
            {rec.error && <div className="feedback fix" style={{ marginTop: 12 }}>{rec.error}</div>}
          </div>
        )}

        {phase === 'prep' && (
          <div className="card center">
            <div className="tiny dim" style={{ letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>Prep — no speaking</div>
            <div className={`timer-display ${prepTimer.seconds <= 5 ? 'warn' : ''}`}>{fmtTime(prepTimer.seconds)}</div>
            <p className="card-desc" style={{ margin: '12px auto 16px', maxWidth: 380 }}>Three beats: what is the point, what is the story, what is the last line.</p>
            <button className="btn primary lg" onClick={skipPrep}><Ico name="mic" size={15} /> I'm ready — record now</button>
          </div>
        )}

        {(live || phase === 'review') && (
          <div className="card">
            <div className="row" style={{ marginBottom: 14 }}>
              {live ? <><span className="rec-dot" /><span className="chip rose">Recording</span></> : <span className="chip amber">Review</span>}
              <span className="spacer" />
              <span className={`timer-display ${over ? 'over' : timer.seconds > (prompt?.speak || 120) ? 'warn' : ''}`} style={{ fontSize: 30 }}>
                {fmtTime(timer.seconds)}
              </span>
            </div>

            <div className="wave" style={{ marginBottom: 14 }}>
              {(live ? rec.levels : new Array(40).fill(3)).map((h, i) => (
                <i key={i} style={{ height: `${Math.max(3, h)}%`, opacity: 0.35 + (h / 140) }} />
              ))}
            </div>

            <label className="label">Live transcript {rec.srSupported ? '· Web Speech API' : ''}</label>
            <div className="transcript-box" style={{ marginBottom: 12 }}>
              {rec.transcript || (rec.interim ? <span className="interim">{rec.interim}</span> : <span className="dim">Your words will appear here as you speak. If nothing appears, type your transcript below before analysing.</span>)}
              {rec.interim && rec.transcript && <span className="interim"> {rec.interim}</span>}
            </div>

            {!live && (
              <>
                <label className="label">Edit / paste transcript (optional, improves scoring)</label>
                <textarea className="textarea" style={{ minHeight: 90 }} value={rec.transcript}
                  onChange={(e) => rec.setTyped(e.target.value)}
                  placeholder="Paste or type what you said…" />
              </>
            )}

            <div className="row" style={{ marginTop: 14, gap: 9 }}>
              {live ? (
                <button className="btn danger lg" onClick={stopLive}><Ico name="stop" size={15} /> Stop & analyse</button>
              ) : (
                <>
                  <button className="btn primary lg" onClick={analyze} disabled={busy || (!rec.transcript && !rec.audioUrl)}>
                    {busy ? <Spinner /> : <><Ico name="bolt" size={15} /> Analyse my speech</>}
                  </button>
                  <button className="btn" onClick={() => { rec.reset(); timer.reset('up'); setPhase('idle'); setResult(null); }}>Reset</button>
                </>
              )}
              {rec.audioUrl && (
                <audio ref={audioRef} src={rec.audioUrl} controls style={{ height: 36, maxWidth: 240 }} />
              )}
            </div>
            {rec.rmsStats.seconds > 0 && !live && (
              <div className="row tiny dim" style={{ marginTop: 12, gap: 14 }}>
                <span><Ico name="clock" size={11} /> {rec.rmsStats.seconds}s captured</span>
                <span><Ico name="wave" size={11} /> {rec.rmsStats.pauseCount} pauses</span>
                <span><Ico name="bolt" size={11} /> vocal variance {(rec.rmsStats.variance * 1000).toFixed(1)}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="stack" style={{ alignSelf: 'start', position: 'sticky', top: 84 }}>
        {!result && (
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: 10 }}><Ico name="target" size={14} /> What gets scored</h3>
            {[
              ['Clarity', 'Sentence length, filler density, hedging, vagueness'],
              ['Structure', 'Framework markers, openings, closings, shape'],
              ['Tone', 'Warmth vs aggression, second-person focus, humour'],
              ['Energy', 'Pace, conviction language, vocal variation, pauses'],
            ].map(([a, b]) => (
              <div key={a} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 2 }}>{a}</div>
                <div className="tiny dim">{b}</div>
              </div>
            ))}
            <div className="feedback" style={{ marginTop: 6, background: 'rgba(139,92,246,0.07)', borderColor: 'rgba(139,92,246,0.25)' }}>
              <strong>Coach:</strong> the fastest wins are always pauses and filler. Cut "um", add a 2-second silence before your best line.
            </div>
          </div>
        )}

        {result && (
          <>
            <div className="card center">
              <Ring value={result.overall} size={124} stroke={10} label="overall" />
              <div style={{ fontSize: 13.5, fontWeight: 650, marginTop: 12 }}>{result.verdict}</div>
              <div className="row tiny dim" style={{ justifyContent: 'center', gap: 14, marginTop: 8 }}>
                <span>{result.words} words</span>
                {result.wpm > 0 && <span>{result.wpm} wpm</span>}
                <span>{result.profile.fillerCount} fillers</span>
              </div>
            </div>

            <div className="card">
              <h3 className="card-title" style={{ marginBottom: 14 }}><Ico name="target" size={14} /> Breakdown</h3>
              <ScoreRow name="Clarity" value={result.scores.clarity} />
              <ScoreRow name="Structure" value={result.scores.structure} />
              <ScoreRow name="Tone" value={result.scores.tone} />
              <ScoreRow name="Energy" value={result.scores.energy} />
            </div>

            {result.strengths.length > 0 && (
              <div className="feedback good">
                <strong style={{ display: 'block', marginBottom: 6 }}>Working well</strong>
                <ul>{result.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
              </div>
            )}
            {result.fixes.length > 0 && (
              <div className="feedback fix">
                <strong style={{ display: 'block', marginBottom: 6 }}>Fix next rep</strong>
                <ul>{result.fixes.map((s, i) => <li key={i}>{s}</li>)}</ul>
              </div>
            )}
            <div className="card" style={{ borderColor: 'rgba(139,92,246,0.3)' }}>
              <div className="chip violet" style={{ marginBottom: 8 }}>Assigned drill · {result.drill.name}</div>
              <p className="card-desc">{result.drill.text}</p>
              <button className="btn sm primary" style={{ marginTop: 12 }} onClick={() => roll()}>
                <Ico name="refresh" size={13} /> New prompt, apply the fix
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
