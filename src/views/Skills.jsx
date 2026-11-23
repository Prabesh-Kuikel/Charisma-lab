import React, { useMemo, useState } from 'react';
import { api } from '../api';
import { Ico } from '../components/ui';
import { getSkills, markSkill } from '../local/progress-log.js';

export default function Skills({ content, notify, go }) {
  const tracks = content.skills || [];
  const chapterTitle = useMemo(() => {
    const map = {};
    for (const c of content.library || []) map[c.id] = c.title;
    return map;
  }, [content.library]);
  const persona = (id) => (content.arena || []).find((a) => a.id === id);
  const [activeId, setActiveId] = useState(tracks[0]?.id || null);
  const [done, setDone] = useState(() => Object.keys(getSkills()));
  const [openEx, setOpenEx] = useState(null);

  const track = useMemo(() => tracks.find((t) => t.id === activeId) || tracks[0], [tracks, activeId]);

  const mark = async (ex) => {
    const key = `${track.id}:${ex.id}`;
    if (done.includes(key)) return;
    markSkill(key);
    setDone((d) => [...d, key]);
    try { await api.logXp({ kind: `skill-${track.id}`, xp: 12 }); notify(`Logged · ${ex.title}`); }
    catch (e) { notify(e.message); }
  };

  if (!track) return <div className="empty">No skill tracks loaded.</div>;

  return (
    <div className="stack">
      <div className="card">
        <div className="row wrap" style={{ gap: 8 }}>
          {tracks.map((t) => (
            <button key={t.id} className={`chip clickable ${t.id === track.id ? 'active' : ''}`}
              onClick={() => { setActiveId(t.id); setOpenEx(null); }}>
              {t.name} <span className="dim">{t.exercises.length}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid split">
        <div className="stack">
          <div className="card">
            <span className={`chip ${track.tone}`} style={{ fontSize: 10 }}>{track.name}</span>
            <div style={{ fontSize: 19, fontWeight: 750, margin: '10px 0 6px', lineHeight: 1.35 }}>{track.tagline}</div>
            <p className="card-desc" style={{ fontStyle: 'italic' }}>{track.principle}</p>
          </div>

          <div className="card">
            <div className="lesson-label">Five principles</div>
            <ol className="lesson-list">{track.principles.map((p, i) => <li key={i}>{p}</li>)}</ol>
          </div>

          <div className="card">
            <div className="lesson-label cyan">Lines that work</div>
            <div className="script">
              {track.scripts.map((s, i) => (
                <React.Fragment key={i}>
                  <div className="script-line">
                    <span className="script-who">Them</span>
                    <span style={{ fontStyle: 'italic', color: 'var(--text-dim)' }}>“{s.them}”</span>
                  </div>
                  <div className="script-line you">
                    <span className="script-who">You</span>
                    <span>{s.you}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="stack">
          {track.exercises.map((ex) => {
            const key = `${track.id}:${ex.id}`;
            const isDone = done.includes(key);
            const isOpen = openEx === key;
            return (
              <div className="card" key={ex.id}>
                <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div className="card-title" style={{ marginBottom: 4 }}>{ex.title}</div>
                    <div className="tiny dim">{ex.why}</div>
                  </div>
                  <div className="row" style={{ gap: 6 }}>
                    <span className="chip" style={{ fontSize: 10 }}>{ex.time} min</span>
                    <button className="btn ghost sm" onClick={() => setOpenEx(isOpen ? null : key)}>
                      <Ico name="chevron" size={13} />
                    </button>
                  </div>
                </div>
                {isOpen && (
                  <div className="fade-in" style={{ marginTop: 12 }}>
                    <div className="lesson-label">Do this</div>
                    <ol className="lesson-list">{ex.steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
                    <div className="tiny" style={{ margin: '10px 0', color: 'var(--mint)' }}>Done when: {ex.success}</div>
                    <button className={`btn sm ${isDone ? '' : 'primary'}`} onClick={() => mark(ex)} disabled={isDone}>
                      <Ico name="check" size={13} /> {isDone ? 'Logged' : 'Mark done'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {(track.reads || []).length > 0 && (
            <div className="card">
              <div className="lesson-label">Read this first</div>
              <p className="card-desc" style={{ marginBottom: 10 }}>
                The chapters this track assumes. Each one opens at the right place.
              </p>
              <div className="stack" style={{ gap: 6 }}>
                {(track.reads || []).filter((r) => chapterTitle[r]).map((r) => (
                  <button key={r} className="chip clickable" style={{ justifyContent: 'flex-start' }}
                    onClick={() => go('library', { openId: r })}>
                    {chapterTitle[r]}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="card">
            <div className="card-title">Practise it live</div>
            <p className="card-desc" style={{ marginBottom: 10 }}>Reading about it changes nothing. Take it into the simulator.</p>
            {(track.arena || []).length > 0 && (
              <div style={{ marginBottom: 10 }}>
                <div className="lesson-label" style={{ color: 'var(--violet)' }}>Personas that drill this</div>
                <div className="row wrap" style={{ gap: 6 }}>
                  {(track.arena || []).map((id) => {
                    const a = persona(id);
                    if (!a) return null;
                    return (
                      <button key={id} className="chip clickable" onClick={() => go('arena')}>
                        {a.emoji} {a.name} <span className="dim">{a.scene}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="row wrap" style={{ gap: 6 }}>
              <button className="chip clickable" onClick={() => go('arena')}>Conversation Arena</button>
              <button className="chip clickable" onClick={() => go('gym')}>Conversation Gym{(track.gym || []).length ? ` · ${track.gym.join(', ')}` : ''}</button>
              <button className="chip clickable" onClick={() => go('games')}>Games</button>
              <button className="chip clickable" onClick={() => go('coach')}>Ask the coach</button>
              <button className="chip clickable" onClick={() => go('library')}>Library</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
