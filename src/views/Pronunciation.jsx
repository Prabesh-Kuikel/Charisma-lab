import React, { useEffect, useMemo, useState } from 'react';
import { api, fmtTime } from '../api';
import { Ico, Ring, Bar, Spinner } from '../components/ui';
import { useRecorder, useSpeech, useTimer } from '../hooks';

const TIERS = ['Warm-up', 'Standard', 'Advanced'];

export default function Pronunciation({ content, notify }) {
  const [tier, setTier] = useState('Warm-up');
  const [twister, setTwister] = useState(null);
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [best, setBest] = useState({});
  const rec = useRecorder();
  const speech = useSpeech();
  const timer = useTimer();

  const pool = useMemo(() => content.twisters.filter((t) => t.tier === tier), [content.twisters, tier]);
  // pangrams arrive as plain strings from the base set and as {text} records from the extras
  const pangrams = useMemo(() => {
    const t = (content.pangerams || []).map((p) => (typeof p === 'string' ? p : p?.text || '')).filter(Boolean);
    return [...new Set(t)];
  }, [content.pangerams]);

  useEffect(() => { pick(); /* eslint-disable-next-line */ }, [tier]);

  const pick = () => {
    const t = pool[Math.floor(Math.random() * pool.length)];
    setTwister(t);
    setResult(null);
    rec.reset();
    timer.reset('up');
  };

  const listen = (rate) => speech.speak(twister.text, rate);

  const start = async () => {
    setResult(null);
    timer.start('up');
    await rec.start();
  };

  const stop = async () => {
    timer.pause();
    rec.stop();
  };

  const score = async () => {
    if (!twister) return;
    setBusy(true);
    try {
      const r = await api.analyzePronunciation({
        target: twister.text,
        heard: rec.transcript,
        durationSec: rec.rmsStats.seconds || timer.seconds || 1,
      });
      setResult(r);
      setBest((b) => ({ ...b, [twister.id]: Math.max(b[twister.id] || 0, r.accuracy) }));
      notify(`Accuracy ${r.accuracy}%`);
    } catch (e) { notify(e.message); }
    setBusy(false);
  };

  const targetWpm = twister?.target ? `${twister.target} reps / min` : '';

  return (
    <div className="grid split">
      <div className="stack">
        <div className="row wrap">
          <div className="tabs">
            {TIERS.map((t) => <button key={t} className={`tab ${tier === t ? 'active' : ''}`} onClick={() => setTier(t)}>{t}</button>)}
          </div>
          <div className="spacer" />
          <button className="btn sm" onClick={pick}><Ico name="refresh" size={13} /> New twister</button>
        </div>

        <div className="prompt-box" style={{ borderColor: 'rgba(34,211,238,0.3)', background: 'linear-gradient(135deg, rgba(34,211,238,0.12), rgba(139,92,246,0.05))' }}>
          <div className="row" style={{ marginBottom: 12 }}>
            <span className="chip cyan"><Ico name="wave" size={11} /> {twister?.tier}</span>
            {twister?.focus.map((f) => <span className="chip" key={f}>{f} sounds</span>)}
            <span className="spacer" />
            {best[twister?.id] ? <span className="chip mint">best {best[twister.id]}%</span> : null}
          </div>
          <div className="prompt-text">{twister?.text}</div>
          <div className="row wrap" style={{ marginTop: 16, gap: 8 }}>
            <button className="btn sm" onClick={() => listen(0.7)} disabled={!speech.supported}><Ico name="play" size={12} /> Listen slow</button>
            <button className="btn sm" onClick={() => listen(0.95)} disabled={!speech.supported}><Ico name="play" size={12} /> Natural</button>
            <button className="btn sm" onClick={() => listen(1.25)} disabled={!speech.supported}><Ico name="bolt" size={12} /> Fast</button>
            {speech.speaking && <button className="btn sm ghost" onClick={speech.cancel}><Ico name="x" size={12} /> Stop</button>}
          </div>
        </div>

        <div className="card">
          <div className="row" style={{ marginBottom: 12 }}>
            {rec.recording ? <><span className="rec-dot" /><span className="chip rose">Recording</span></> : <span className="chip">Mic test</span>}
            <span className="spacer" />
            <span className="timer-display" style={{ fontSize: 26 }}>{fmtTime(timer.seconds)}</span>
          </div>

          <div className="wave" style={{ marginBottom: 14 }}>
            {(rec.recording ? rec.levels : new Array(40).fill(3)).map((h, i) => (
              <i key={i} style={{ height: `${Math.max(3, h)}%`, background: 'linear-gradient(180deg,#22d3ee,#8b5cf6)' }} />
            ))}
          </div>

          <label className="label">Heard</label>
          <div className="transcript-box" style={{ marginBottom: 12 }}>
            {rec.transcript || (rec.interim ? <span className="interim">{rec.interim}</span> : <span className="dim">Say the twister three times. Your recognised speech appears here and is compared word by word.</span>)}
          </div>

          <div className="row wrap" style={{ gap: 9 }}>
            {!rec.recording ? (
              <button className="btn primary" onClick={start}><Ico name="mic" size={14} /> {rec.audioUrl ? 'Record again' : 'Record'}</button>
            ) : (
              <button className="btn danger" onClick={stop}><Ico name="stop" size={14} /> Stop</button>
            )}
            <button className="btn" onClick={score} disabled={busy || !rec.transcript}>
              {busy ? <Spinner /> : <><Ico name="target" size={14} /> Score accuracy</>}
            </button>
            {rec.audioUrl && <audio src={rec.audioUrl} controls style={{ height: 34, maxWidth: 200 }} />}
          </div>
          {rec.error && <div className="feedback fix" style={{ marginTop: 12 }}>{rec.error}</div>}
          {!rec.srSupported && (
            <div className="feedback fix" style={{ marginTop: 12 }}>
              Speech recognition is not available here. Use Chrome or Edge for live scoring, or type what you said below.
            </div>
          )}
          {!rec.srSupported && (
            <textarea className="textarea" style={{ marginTop: 10, minHeight: 64 }} placeholder="Type the words you actually said…"
              onChange={(e) => rec.setTyped(e.target.value)} value={rec.transcript} />
          )}
        </div>

        {result && (
          <div className="card fade-in">
            <div className="row" style={{ marginBottom: 14 }}>
              <Ring value={result.accuracy} size={78} stroke={7} label="accuracy" suffix="%" />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{result.accuracy >= 90 ? 'Performance ready' : result.accuracy >= 70 ? 'Nearly there' : 'Needs another pass'}</div>
                <p className="card-desc">{result.message}</p>
              </div>
            </div>
            <div className="row wrap" style={{ gap: 5 }}>
              {result.words.map((w, i) => (
                <span key={i} className="chip" style={{
                  background: w.hit ? 'rgba(52,211,153,0.14)' : 'rgba(244,63,94,0.14)',
                  borderColor: w.hit ? 'rgba(52,211,153,0.4)' : 'rgba(244,63,94,0.4)',
                  color: w.hit ? '#6ee7b7' : '#fda4af',
                }}>{w.word}</span>
              ))}
            </div>
            {result.wpm > 0 && (
              <div className="row tiny dim" style={{ marginTop: 12, gap: 14 }}>
                <span>{result.wpm} words / min</span>
                <span>{Math.round((result.hitRate || 0) * 100)}% of target words recognised</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="stack" style={{ alignSelf: 'start' }}>
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: 10 }}><Ico name="target" size={14} /> The articulation protocol</h3>
          {[
            ['1 · Slow truth', 'Say it at half speed with an exaggerated mouth. Every consonant must be visible.'],
            ['2 · Ladder up', 'Repeat it three times, each 10% faster, without losing a syllable.'],
            ['3 · Full speed', 'Only now go for speed. Speed without articulation is just noise at pace.'],
            ['4 · The reset', 'If you stumble, stop. Do not push through — restart from half speed.'],
          ].map(([a, b]) => (
            <div key={a} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 2 }}>{a}</div>
              <div className="tiny dim">{b}</div>
            </div>
          ))}
        </div>

        <div className="card">
          <h3 className="card-title" style={{ marginBottom: 12 }}><Ico name="trophy" size={14} /> Personal bests</h3>
          {Object.keys(best).length === 0 && <p className="card-desc">Score a twister to set your first record.</p>}
          {Object.entries(best).map(([id, v]) => {
            const t = content.twisters.find((x) => x.id === id);
            return (
              <div key={id} style={{ marginBottom: 11 }}>
                <div className="row tiny" style={{ marginBottom: 4 }}>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t?.text}</span>
                  <span className="spacer" />
                  <span className="mono dim">{v}%</span>
                </div>
                <Bar value={v} tone={v >= 85 ? 'mint' : v >= 65 ? '' : 'amber'} height={5} />
              </div>
            );
          })}
        </div>

        <div className="card">
          <h3 className="card-title" style={{ marginBottom: 10 }}><Ico name="brain" size={14} /> Pangram finisher</h3>
          <p className="card-desc" style={{ marginBottom: 10 }}>One sentence containing every letter. The ultimate warm-up.</p>
          {pangrams.map((p, i) => (
            <div key={`${p}-${i}`} className="list-row" style={{ alignItems: 'flex-start' }}>
              <span className="dot" style={{ background: '#22d3ee', marginTop: 6 }} />
              <div style={{ fontSize: 12.5, lineHeight: 1.5 }}>{p}</div>
            </div>
          ))}
          <button className="btn sm" style={{ marginTop: 10 }} onClick={() => speech.speak(pangrams[0], 0.8)} disabled={!speech.supported}>
            <Ico name="play" size={12} /> Hear it
          </button>
        </div>

        {targetWpm && (
          <div className="card tight">
            <div className="tiny dim">Voice engine</div>
            <div className="row" style={{ marginTop: 8, gap: 8 }}>
              <span className="chip">{speech.supported ? 'Web Speech synthesis ready' : 'Synthesis unavailable'}</span>
              <span className="chip">{rec.srSupported ? 'Recognition ready' : 'No recognition'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
