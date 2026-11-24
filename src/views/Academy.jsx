import React, { useMemo, useState } from 'react';
import { api } from '../api';
import { Ico } from '../components/ui';
import { academyPath, ACADEMY_PACING, ACADEMY_START } from '../../server/content/academy-pacing.js';

const TONE = { violet: 'violet', amber: 'amber', rose: 'rose', mint: 'mint', cyan: 'cyan', orange: 'orange' };

export default function Academy({ content, notify, go, boot, refresh }) {
  const modules = content.academy || [];
  const [activeId, setActiveId] = useState(boot?.moduleId || modules[0]?.id || null);
  const [tab, setTab] = useState('principles');
  // the academy used to be sixteen flat chips with no order, so a beginner could
  // open the family module in week one. Levels are derived from academy-pacing.js.
  const [level, setLevel] = useState('all');
  const [done, setDone] = useState([]);

  // pace the modules once here: the chip list gets pacing from academyPath(),
  // but the detail panel reads `mod` from the raw array, so it needs it attached
  // too or the whole pacing card silently never renders.
  const paced = useMemo(() => modules.map((m) => ({ ...m, pacing: ACADEMY_PACING[m.id] })), [modules]);
  const mod = useMemo(() => paced.find((m) => m.id === activeId) || paced[0], [paced, activeId]);
  if (!mod) return <div className="empty">No modules loaded.</div>;

  const mark = async (title) => {
    const key = `${mod.id}:${title}`;
    if (done.includes(key)) return;
    setDone((d) => [...d, key]);
    try { await api.logXp({ kind: `academy-${mod.id}`, xp: 12 }); notify(`Logged · ${title}`); refresh?.(); }
    catch (e) { notify(e.message); }
  };

  const tone = TONE[mod.tone] || 'violet';
  const levels = content.academyLevels || [];
  const grouped = academyPath(paced);

  return (
    <div className="stack">
      <div className="card">
        <div className="row wrap" style={{ gap: 6, marginBottom: 12 }}>
          <button className={`chip clickable ${level === 'all' ? 'active' : ''}`} aria-pressed={level === 'all'}
            onClick={() => setLevel('all')}>All <span className="dim">{modules.length}</span></button>
          {activeId !== ACADEMY_START && (
            <button className="chip clickable" title="Modules are levelled now, so there is a first one"
              onClick={() => { setActiveId(ACADEMY_START); setTab('principles'); }}>start here</button>
          )}
          {levels.map((l) => (
            <button key={l.id} className={`chip clickable ${level === l.id ? 'active' : ''}`} aria-pressed={level === l.id}
              onClick={() => setLevel(l.id)} title={l.note}>
              {l.id} · {l.name} <span className="dim">{grouped.find((g) => g.level === l.id)?.modules.length || 0}</span>
            </button>
          ))}
        </div>
        {level !== 'all' && (
          <p className="tiny dim" style={{ margin: '0 0 12px' }}>
            {(levels.find((l) => l.id === level) || {}).note}
          </p>
        )}
        <div className="stack sm">
          {grouped.filter((g) => level === 'all' || g.level === level).map((g) => (
            <div key={g.level}>
              <div className="nav-label" style={{ marginBottom: 6 }}>Level {g.level} · {g.name}</div>
              <div className="row wrap" style={{ gap: 6 }}>
                {g.modules.map((m) => (
                  <button key={m.id} className={`chip clickable ${m.id === mod.id ? 'active' : ''}`} aria-pressed={m.id === mod.id}
                    onClick={() => { setActiveId(m.id); setTab('principles'); }}
                    title={m.pacing?.why}>
                    {m.name}
                    <span className="dim" style={{ marginLeft: 5 }}>{m.pacing?.minutes}m</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* where this module sits, and what it assumes you already read */}
      {mod.pacing && (
        <div className="card" style={{ borderColor: 'rgba(139,92,246,0.28)' }}>
          <div className="row wrap" style={{ gap: 8, marginBottom: 8 }}>
            <span className="chip violet" style={{ fontSize: 10 }}>level {mod.pacing.level} · {mod.pacing.minutes} min</span>
            {mod.pacing.after && (
              <button className="chip clickable" style={{ fontSize: 10 }}
                onClick={() => { setActiveId(mod.pacing.after); setTab('principles'); }}>
                <Ico name="arrow" size={10} /> read after {modules.find((m) => m.id === mod.pacing.after)?.name || mod.pacing.after}
              </button>
            )}
            {!mod.pacing.after && <span className="chip mint" style={{ fontSize: 10 }}>nothing required first</span>}
          </div>
          <p className="card-desc" style={{ margin: 0 }}>{mod.pacing.why}</p>
        </div>
      )}

      <div className="card">
        <span className={`chip ${tone}`} style={{ fontSize: 10 }}>{mod.name}</span>
        <div style={{ fontSize: 19, fontWeight: 750, margin: '10px 0 6px', lineHeight: 1.35 }}>{mod.tagline}</div>
        <p className="card-desc">{mod.thesis}</p>
      </div>

      <div className="card">
        <div className="row wrap" style={{ gap: 6 }}>
          {[['principles', 'Principles'], ['mechanics', 'Mechanics'], ['scripts', 'Scripts'], ['drills', 'Drills'], ['cautions', 'Cautions']].map(([id, label]) => (
            <button key={id} className={`chip clickable ${tab === id ? 'active' : ''}`} aria-pressed={tab === id} onClick={() => setTab(id)}>{label}</button>
          ))}
        </div>
      </div>

      {tab === 'principles' && (
        <div className="grid g2">
          {mod.principles.map((p, i) => (
            <div className="card" key={i}>
              <div className="card-title" style={{ marginBottom: 6 }}>
                <span className={`chip ${tone}`} style={{ fontSize: 10 }}>{i + 1}</span> {p.title}
              </div>
              <p className="card-desc">{p.body}</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'mechanics' && (
        <div className="stack">
          {mod.mechanics.map((m, i) => (
            <div className="card" key={i}>
              <div className="card-title">{m.name}</div>
              <p className="card-desc" style={{ marginBottom: 10 }}><strong style={{ color: 'var(--text)' }}>Why it works:</strong> {m.why}</p>
              <div className="lesson-label">The steps</div>
              <ol className="lesson-list">{m.steps.map((s, j) => <li key={j}>{s}</li>)}</ol>
              <div className="lesson-example" style={{ marginTop: 14 }}>
                <div className="lesson-label cyan">In practice</div>
                <p style={{ margin: 0, fontStyle: 'italic' }}>{m.example}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'scripts' && (
        <div className="stack">
          {mod.scripts.map((s, i) => (
            <div className="card" key={i}>
              <div className="script">
                <div className="script-line"><span className="script-who">Them</span><span>{s.them}</span></div>
                <div className="script-line you"><span className="script-who">You</span><span>{s.you}</span></div>
              </div>
              <div className="tiny dim" style={{ marginTop: 8 }}><strong>Why it works:</strong> {s.why}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'drills' && (
        <div className="grid g2">
          {mod.drills.map((d) => {
            const key = `${mod.id}:${d.title}`;
            const isDone = done.includes(key);
            return (
              <div className="card" key={d.title}>
                <div className="row" style={{ justifyContent: 'space-between', marginBottom: 6 }}>
                  <div className="card-title" style={{ margin: 0 }}>{d.title}</div>
                  <span className="chip mint" style={{ fontSize: 10 }}>{d.time} min</span>
                </div>
                <p className="card-desc">{d.do}</p>
                <div className="tiny" style={{ margin: '10px 0', color: 'var(--mint)' }}>Done when: {d.success}</div>
                <button className={`btn sm ${isDone ? '' : 'primary'}`} onClick={() => mark(d.title)} disabled={isDone}>
                  <Ico name="check" size={13} /> {isDone ? 'Logged' : 'Log this rep'}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'cautions' && (
        <div className="stack">
          <div className="card">
            <div className="lesson-label rose">Where this goes wrong</div>
            <ul className="lesson-list">{mod.cautions.map((c, i) => <li key={i}>{c}</li>)}</ul>
          </div>
          <div className="card">
            <div className="card-title">Take it further</div>
            <div className="row wrap" style={{ gap: 6, marginTop: 8 }}>
              {mod.reads.map((r) => (
                <button key={r} className="chip clickable" style={{ fontSize: 10 }} onClick={() => go('library', { openId: r })}>
                  <Ico name="library" size={10} /> chapter
                </button>
              ))}
              <button className="chip clickable" style={{ fontSize: 10 }} onClick={() => go('coach')}>Ask the coach</button>
              <button className="chip clickable" style={{ fontSize: 10 }} onClick={() => go('games')}>Practise in games</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
