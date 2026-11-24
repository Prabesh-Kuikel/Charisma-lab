import React, { useEffect, useMemo, useRef, useState } from 'react';
import { api } from '../api';
import { Ico, Bar, Spinner } from '../components/ui';
import { scoreGame, promptFor } from '../../server/gameEngine.js';
import { getGames, logGame } from '../local/progress-log.js';

const TONE = { presence: 'mint', storytelling: 'cyan', sales: 'rose', wit: 'amber', negotiation: 'violet', creator: 'orange' };

const speak = (text) => {
  try {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
  } catch { /* no TTS */ }
};

export default function Games({ content, notify, go, refresh }) {
  const games = content.games || [];
  const [activeId, setActiveId] = useState(games[0]?.id || null);
  const [seed, setSeed] = useState(() => Math.floor(Date.now() / 1000));
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [log, setLog] = useState(() => getGames());
  const [left, setLeft] = useState(0);
  const tick = useRef(null);

  const game = useMemo(() => games.find((g) => g.id === activeId) || games[0], [games, activeId]);
  const prompt = useMemo(() => (game ? promptFor(game, seed) : ''), [game, seed]);

  useEffect(() => () => clearInterval(tick.current), []);

  const startTimer = (secs) => {
    clearInterval(tick.current);
    setLeft(secs);
    tick.current = setInterval(() => {
      setLeft((v) => {
        if (v <= 1) { clearInterval(tick.current); return 0; }
        return v - 1;
      });
    }, 1000);
  };

  const reset = (nextSeed) => {
    clearInterval(tick.current);
    setSeed(nextSeed ?? Math.floor(Date.now() / 1000));
    setAnswer('');
    setResult(null);
    setLeft(0);
  };

  const submit = async () => {
    if (!answer.trim()) { notify('Write or paste your answer first — even a bad rep counts.'); return; }
    setBusy(true);
    try {
      const r = scoreGame({ gameId: game.id, text: answer, prompt });
      setResult(r);
      const entry = { id: Date.now(), game: game.name, gameId: game.id, score: r.score, at: new Date().toISOString() };
      setLog(logGame(entry).slice(0, 30));
      await api.logXp({
        kind: `game-${game.id}`, xp: Math.max(6, Math.round(r.score * 0.25)),
        rep: { kind: 'game', ref: game.id, label: game.name, seconds: 60, score: r.score },
      });
      notify(`Scored ${r.score}/100`);
      refresh?.();
    } catch (e) { notify(e.message); }
    setBusy(false);
  };

  const best = log.length ? Math.max(...log.map((l) => l.score)) : 0;
  const avg = log.length ? Math.round(log.reduce((a, b) => a + b.score, 0) / log.length) : 0;

  if (!game) return <div className="empty">No games loaded.</div>;

  return (
    <div className="stack">
      <div className="card">
        <div className="row wrap" style={{ gap: 8, marginBottom: 12 }}>
          {games.map((g) => (
            <button key={g.id} className={`chip clickable ${g.id === game.id ? 'active' : ''}`} aria-pressed={g.id === game.id}
              onClick={() => { setActiveId(g.id); reset(); }}>
              {g.name}
            </button>
          ))}
        </div>
        <div className="row wrap" style={{ gap: 8 }}>
          <span className={`chip ${TONE[game.skill] || 'violet'}`} style={{ fontSize: 10 }}>{game.skill}</span>
          <span className="tiny dim">{game.tagline}</span>
        </div>
      </div>

      <div className="grid split">
        <div className="stack">
          <div className="card">
            <div className="lesson-label cyan">The prompt</div>
            <div style={{ fontSize: 21, fontWeight: 700, lineHeight: 1.4, margin: '6px 0 14px' }}>{prompt}</div>
            <div className="row wrap" style={{ gap: 8 }}>
              <button className="btn primary sm" onClick={() => reset()}><Ico name="spark" size={14} /> New prompt</button>
              {game.id === 'cold-open' && (
                <button className="btn sm" onClick={() => { startTimer(30); speak(prompt); }}>
                  <Ico name="mic" size={14} /> 30s rep
                </button>
              )}
              <button className="btn sm" onClick={() => reset()}><Ico name="refresh" size={14} /> Skip</button>
              {left > 0 && <span className="chip amber">⏱ {left}s</span>}
            </div>
          </div>

          <div className="card">
            <div className="lesson-label">Your answer</div>
            <textarea className="textarea" style={{ minHeight: 120 }} value={answer}
              placeholder="Type it exactly as you would say it. Paste a transcript if you spoke it." aria-label="Your answer" 
              onChange={(e) => setAnswer(e.target.value)} />
            <div className="row wrap" style={{ gap: 8, marginTop: 12 }}>
              <button className="btn primary" onClick={submit} disabled={busy}>
                {busy ? <Spinner /> : <Ico name="check" size={15} />} Score the rep
              </button>
              <span className="tiny dim">{answer.trim().split(/\s+/).filter(Boolean).length} words</span>
            </div>
          </div>

          {result && (
            <div className="card fade-in">
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 10 }}>
                <div className="card-title" style={{ margin: 0 }}>Score</div>
                <div style={{ fontSize: 26, fontWeight: 800 }}>{result.score}<span className="dim" style={{ fontSize: 13 }}>/100</span></div>
              </div>
              <Bar value={result.score} tone={result.score >= 70 ? 'mint' : result.score >= 40 ? 'amber' : 'rose'} />
              <p className="card-desc" style={{ margin: '12px 0' }}>{result.verdict}</p>
              <div className="stack sm">
                {result.checks.map((c, i) => (
                  <div className="row" key={i} style={{ gap: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: c.pass ? 'var(--mint)' : '#fda4af', marginTop: 2 }}>
                      <Ico name={c.pass ? 'check' : 'x'} size={13} />
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 600 }}>{c.label}</div>
                      {!c.pass && <div className="tiny dim">{c.note}</div>}
                    </div>
                  </div>
                ))}
              </div>
              {result.coach && <div className="tiny dim" style={{ marginTop: 12 }}><strong>Next rep:</strong> {result.coach}</div>}
            </div>
          )}
        </div>

        <div className="stack">
          <div className="card">
            <div className="card-title">Why this game</div>
            <p className="card-desc">{game.why}</p>
          </div>
          <div className="card">
            <div className="lesson-label mint">Rules</div>
            <ul className="lesson-list">{game.rules.map((r, i) => <li key={i}>{r}</li>)}</ul>
            <div className="lesson-label amber" style={{ marginTop: 14 }}>Coach notes</div>
            <ul className="lesson-list">{game.tips.map((r, i) => <li key={i}>{r}</li>)}</ul>
          </div>
          <div className="card">
            <div className="card-title">Session</div>
            <div className="row" style={{ justifyContent: 'space-between', margin: '8px 0' }}>
              <span className="tiny dim">Reps</span><strong>{log.length}</strong>
            </div>
            <div className="row" style={{ justifyContent: 'space-between', margin: '8px 0' }}>
              <span className="tiny dim">Average</span><strong>{avg || '—'}</strong>
            </div>
            <div className="row" style={{ justifyContent: 'space-between', margin: '8px 0' }}>
              <span className="tiny dim">Best</span><strong>{best || '—'}</strong>
            </div>
            {!!log.length && (
              <div className="stack sm" style={{ marginTop: 10 }}>
                {log.map((l) => (
                  <div className="row" key={l.id} style={{ justifyContent: 'space-between' }}>
                    <span className="tiny dim">{l.game}</span><span className="tiny">{l.score}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="card">
            <div className="card-title">Want a harder version?</div>
            <p className="card-desc" style={{ marginBottom: 10 }}>Do the same rep in half the words. Then do it out loud and let the analyser score the delivery.</p>
            <button className="btn sm" onClick={() => go && go('impromptu')}><Ico name="mic" size={14} /> Impromptu Lab</button>
          </div>
        </div>
      </div>
    </div>
  );
}
