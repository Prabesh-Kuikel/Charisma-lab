import React, { useEffect, useRef, useState } from 'react';
import { Ico } from './ui';
import { useRecorder, useSpeech } from '../hooks';

// Turn "say this" into a rep: hear it, record yourself, compare.
export default function Rehearse({ line, label, onUsed, compact = false }) {
  const speech = useSpeech();
  const rec = useRecorder();
  const [rate, setRate] = useState(0.85);
  const [savedPrev, setSavedPrev] = useState(null);
  const saveRef = useRef(null);

  // keep the last completed recording so you can compare take to take
  useEffect(() => {
    if (!rec.recording && rec.audioUrl && saveRef.current !== rec.audioUrl) {
      saveRef.current = rec.audioUrl;
      setSavedPrev(rec.audioUrl);
    }
  }, [rec.recording, rec.audioUrl]);

  const wordCount = String(line || '').trim().split(/\s+/).filter(Boolean).length;
  const secs = rec.elapsed || 0;
  const wpm = secs > 0 ? Math.round((wordCount / secs) * 60) : 0;
  const targetLow = 110;
  const targetHigh = 160;

  return (
    <div className="card" style={{ padding: compact ? 14 : 16 }}>
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 10 }}>
        <div className="card-title" style={{ margin: 0, fontSize: 13 }}>
          <Ico name="mic" size={13} /> Rehearse it out loud
        </div>
        {label && <span className="chip mint" style={{ fontSize: 10 }}>{label}</span>}
      </div>

      {!compact && (
        <p className="card-desc" style={{ marginBottom: 12 }}>
          Reading a line teaches you almost nothing. Saying it into your own ear does. Hear it, then record yourself
          and compare — the gap between the two is the whole lesson.
        </p>
      )}

      <div className="row wrap" style={{ gap: 6, marginBottom: 12 }}>
        <button className="btn sm" onClick={() => speech.speak(line, rate)} disabled={!speech.supported || !line}>
          <Ico name="play" size={12} /> Hear it
        </button>
        {[0.7, 0.85, 1].map((r) => (
          <button key={r} className={`chip clickable ${rate === r ? 'active' : ''}`} aria-pressed={rate === r} style={{ fontSize: 10 }} onClick={() => setRate(r)}>
            {r}×
          </button>
        ))}
        <button className="btn sm" onClick={() => speech.cancel()} disabled={!speech.speaking}>
          <Ico name="x" size={12} /> Stop
        </button>
      </div>

      {!rec.supported && (
        <div className="tiny dim" style={{ marginBottom: 10 }}>
          This browser cannot record. Read the line aloud three times and time yourself instead — the pacing check
          below still works.
        </div>
      )}

      <div className="row wrap" style={{ gap: 8 }}>
        {rec.recording ? (
          <button className="btn sm primary" onClick={rec.stop}>
            <Ico name="check" size={12} /> Stop ({rec.elapsed}s)
          </button>
        ) : (
          <button className="btn sm primary" onClick={rec.start} disabled={!rec.supported}>
            <Ico name="mic" size={12} /> Record my take
          </button>
        )}
        {rec.audioUrl && <audio src={rec.audioUrl} controls style={{ height: 32, flex: 1, minWidth: 180 }} />}
        {savedPrev && rec.audioUrl !== savedPrev && (
          <span className="tiny dim">previous take kept</span>
        )}
        {rec.audioUrl && (
          <button className="btn sm" onClick={() => { rec.reset(); setTimeout(() => rec.start(), 60); }} disabled={!rec.supported}>
            <Ico name="refresh" size={12} /> Again
          </button>
        )}
      </div>

      {rec.error && <div className="tiny rose" style={{ marginTop: 8 }}>{rec.error}</div>}

      {!rec.recording && secs > 0 && (
        <div className="row wrap" style={{ gap: 6, marginTop: 12 }}>
          <span className="chip" style={{ fontSize: 10 }}>{secs}s</span>
          <span className="chip" style={{ fontSize: 10 }}>{wordCount} words</span>
          <span className={`chip ${wpm >= targetLow && wpm <= targetHigh ? 'mint' : wpm > targetHigh ? 'amber' : 'rose'}`} style={{ fontSize: 10 }}>
            {wpm} wpm
          </span>
          <span className="tiny dim">
            {wpm === 0 ? 'Record a take to see your pace.'
              : wpm > targetHigh ? 'Fast. Slow down — the pause is the persuasive part.'
              : wpm < targetLow ? 'Slow and deliberate is fine in a script; check it does not sound read.'
              : 'Good pace: between ' + targetLow + ' and ' + targetHigh + ' wpm.'}
          </span>
        </div>
      )}

      {rec.transcript && !compact && (
        <div className="tiny dim" style={{ marginTop: 10 }}>
          <strong>You said:</strong> {rec.transcript.slice(0, 300)}
        </div>
      )}

      {onUsed && (
        <button className="btn sm full" style={{ marginTop: 12 }} onClick={() => { onUsed(); if (rec.audioUrl) rec.reset(); }}>
          <Ico name="check" size={12} /> I said it out loud — count this rep
        </button>
      )}
    </div>
  );
}
