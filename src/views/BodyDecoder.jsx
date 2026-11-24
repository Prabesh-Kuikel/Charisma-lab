import React, { useMemo, useState } from 'react';
import { api } from '../api';
import { Ico, Bar, Spinner } from '../components/ui';

const KEYS = ['A', 'B', 'C', 'D'];

export default function BodyDecoder({ content, notify, go, boot }) {
  const [cluster, setCluster] = useState('All');
  const [idx, setIdx] = useState(() => {
    if (!boot?.openId) return 0;
    const i = (content.body || []).findIndex((c) => c.id === boot.openId);
    return i > 0 ? i : 0;
  });
  const [choice, setChoice] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [busy, setBusy] = useState(false);
  const [tally, setTally] = useState({ correct: 0, total: 0 });
  const [seen, setSeen] = useState([]);

  const deck = useMemo(
    () => content.body.filter((c) => cluster === 'All' || c.cluster === cluster),
    [content.body, cluster],
  );
  const card = deck[idx % deck.length];

  const pick = async (i) => {
    if (feedback || busy) return;
    setChoice(i);
    setBusy(true);
    try {
      const r = await api.answerBody({ cardId: card.id, choice: i });
      setFeedback(r);
      setTally((t) => ({ correct: t.correct + (r.correct ? 1 : 0), total: t.total + 1 }));
      if (!seen.includes(card.id)) setSeen((s) => [...s, card.id]);
    } catch (e) { notify(e.message); }
    setBusy(false);
  };

  const next = () => {
    setFeedback(null);
    setChoice(null);
    setIdx((i) => (i + 1) % deck.length);
  };

  const switchCluster = (c) => { setCluster(c); setIdx(0); setFeedback(null); setChoice(null); };

  const acc = tally.total ? Math.round((tally.correct / tally.total) * 100) : 0;
  const clusters = ['All', ...content.bodyClusters];

  return (
    <div className="grid split">
      <div className="stack">
        <div className="row wrap" style={{ gap: 6 }}>
          {clusters.map((c) => (
            <button key={c} className={`chip clickable ${cluster === c ? 'active' : ''}`} aria-pressed={cluster === c} onClick={() => switchCluster(c)}>{c}</button>
          ))}
        </div>

        <div className="flash fade-in" key={card.id}>
          <div className="row wrap" style={{ marginBottom: 14 }}>
            <span className="chip cyan">{card.cluster}</span>
            <span className="chip">difficulty {card.difficulty}/3</span>
            <span className="spacer" />
            <span className="tiny dim">{idx + 1} / {deck.length}</span>
          </div>

          <div style={{ fontSize: 16, lineHeight: 1.62, fontWeight: 500, marginBottom: 18 }}>{card.scene}</div>

          <div className="tiny dim" style={{ textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: 10 }}>
            {card.question}
          </div>

          <div className="stack sm">
            {card.options.map((o, i) => {
              const isCorrect = feedback && i === card.answer;
              const isWrong = feedback && choice === i && !feedback.correct;
              return (
                <button key={i} className={`option ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                  onClick={() => pick(i)} disabled={!!feedback}>
                  <span className="option-key">{KEYS[i]}</span>
                  <span>{o}</span>
                  {isCorrect && <span style={{ marginLeft: 'auto', color: '#6ee7b7' }}><Ico name="check" size={14} /></span>}
                  {isWrong && <span style={{ marginLeft: 'auto', color: '#fda4af' }}><Ico name="x" size={14} /></span>}
                </button>
              );
            })}
          </div>

          {busy && <div className="row" style={{ marginTop: 12, gap: 8 }}><Spinner /><span className="tiny dim">Reading the cue…</span></div>}

          {feedback && (
            <div className="fade-in" style={{ marginTop: 18 }}>
              <div className="row wrap" style={{ marginBottom: 10 }}>
                <span className={`chip ${feedback.correct ? 'mint' : 'rose'}`}>{feedback.correct ? 'Correct read' : 'Re-read the cluster'}</span>
                <span className="chip violet">Cue: {feedback.cue}</span>
              </div>
              <div className="feedback" style={{ marginBottom: 12 }}>
                <strong style={{ display: 'block', marginBottom: 6 }}>The psychology</strong>
                {feedback.explain}
              </div>
              <button className="btn primary" onClick={next}>Next card <Ico name="arrow" size={14} /></button>
            </div>
          )}
        </div>
      </div>

      <div className="stack" style={{ alignSelf: 'start' }}>
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: 12 }}><Ico name="eye" size={14} /> Decoder accuracy</h3>
          <div className="row" style={{ gap: 16, alignItems: 'baseline' }}>
            <div className="stat-val" style={{ color: acc >= 75 ? '#34d399' : acc >= 50 ? '#fbbf24' : '#a78bfa' }}>{acc}%</div>
            <div className="tiny dim">{tally.correct} of {tally.total} reads · {seen.length}/{content.body.length} cards seen</div>
          </div>
          <div style={{ marginTop: 12 }}><Bar value={acc} tone={acc >= 75 ? 'mint' : ''} /></div>
        </div>

        <div className="card">
          <h3 className="card-title" style={{ marginBottom: 10 }}><Ico name="brain" size={14} /> Read the cluster, not the cue</h3>
          {[
            ['Baseline first', 'Know how someone behaves when relaxed. Everything else is measured against that.'],
            ['Cluster, never single', 'One crossed arm means nothing. Arm + torso angle + foot direction means something.'],
            ['Look for shifts', 'The change from baseline is the signal — not the pose itself.'],
            ['Legs are honest', 'Feet and weight distribution are the hardest to manage socially. Read them first.'],
            ['Ethics matter', 'A micro-expression is a question mark, not a verdict. Ask; never accuse.'],
          ].map(([a, b]) => (
            <div key={a} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 2 }}>{a}</div>
              <div className="tiny dim">{b}</div>
            </div>
          ))}
        </div>

        <div className="card">
          <h3 className="card-title" style={{ marginBottom: 10 }}><Ico name="target" size={14} /> Practice in the wild</h3>
          <p className="card-desc">
            Pick one person today. Note their feet, torso, hands and eyes in four seconds, then predict their mood.
            Check your prediction by asking one open question. That loop — predict, then verify — is how this skill becomes instinct.
          </p>
        </div>
      </div>
    </div>
  );
}
