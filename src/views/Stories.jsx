import React, { useMemo, useState } from 'react';
import { Ico } from '../components/ui';
import { logRep } from '../local/reps';

// ─────────────────────────────────────────────────────────────
//  Stories — a wing for the thing everyone is told to do and
//  nobody is taught: telling one.
//
//  Twenty-one tellable anecdotes, each broken into beats rather
//  than paragraphs, because that is what you rehearse. Every card
//  carries four sections the usual advice omits: the detail that
//  makes it believable, the turn (what actually changed), why it
//  holds attention, and when NOT to tell it. The last one matters
//  most — most bad storytelling is a good story in the wrong room.
// ─────────────────────────────────────────────────────────────

const TYPE_TONE = {
  origin: 'violet', failure: 'rose', turn: 'cyan', conflict: 'amber',
  teaching: 'mint', vision: 'violet', humour: 'orange',
};

const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export default function Stories({ content, go, notify, boot }) {
  const all = content.stories || [];
  const types = content.storyTypes || [];
  const rules = content.storyRules || [];
  const notes = content.storyNotes || {};

  const [type, setType] = useState('all');
  const [q, setQ] = useState('');
  const [openId, setOpenId] = useState(boot?.openId || null);
  const [told, setTold] = useState([]);

  const counts = useMemo(() => {
    const m = { all: all.length };
    all.forEach((s) => { m[s.type] = (m[s.type] || 0) + 1; });
    return m;
  }, [all]);

  const list = useMemo(() => {
    const needle = q.toLowerCase().trim();
    return all.filter((s) => {
      if (type !== 'all' && s.type !== type) return false;
      if (!needle) return true;
      const hay = `${s.title} ${s.oneLiner} ${s.opening} ${s.turn} ${s.why} ${s.whenNot} ${s.detail} ${s.beats.join(' ')} ${(s.keywords || []).join(' ')}`.toLowerCase();
      return hay.includes(needle);
    });
  }, [all, type, q]);

  const typeLabel = (id) => (types.find((t) => t.id === id) || {}).label || id;

  const toggle = (s) => {
    const next = openId === s.id ? null : s.id;
    setOpenId(next);
    // opening a story counts as one rep, once — the same honesty rule the
    // psychology and library wings use, so the log is not inflated by browsing
    if (next && !told.includes(s.id)) {
      setTold((t) => [...t, s.id]);
      logRep({ kind: 'story', ref: s.id, label: s.title, seconds: Math.max(60, s.seconds || 60) });
    }
  };

  const copy = async (s) => {
    const text = [
      `${s.title} — ${s.oneLiner}`,
      '',
      `Opening line: "${s.opening}"`,
      '',
      'Beats:',
      ...s.beats.map((b, i) => `${i + 1}. ${b}`),
      '',
      `The detail: ${s.detail}`,
      `The turn: ${s.turn}`,
      `Why it lands: ${s.why}`,
      `Do not tell it: ${s.whenNot}`,
      '',
      `Target length: ${s.seconds}s`,
    ].join('\n');
    try { await navigator.clipboard.writeText(text); notify('Story outline copied'); }
    catch { notify('Copy blocked by the browser'); }
  };

  return (
    <div className="stack">
      <div className="card" style={{ borderColor: 'rgba(251,146,60,0.3)' }}>
        <div className="row wrap" style={{ gap: 8, marginBottom: 10 }}>
          <span className="chip orange" style={{ fontSize: 10 }}><Ico name="book" size={11} /> tell it, do not write it</span>
          <span className="chip" style={{ fontSize: 10 }}>{all.length} stories</span>
          <span className="chip" style={{ fontSize: 10 }}>{types.length} shapes</span>
          <div className="spacer" />
          <span className="tiny dim">60–90 seconds each, rehearsed by beat</span>
        </div>
        <h2 style={{ fontSize: 19, margin: '0 0 8px' }}>A story is a structure, not a talent</h2>
        <p className="card-desc" style={{ marginBottom: 10 }}>
          Nobody is born able to tell one. What separates the person who holds a room for ninety seconds from the person
          who loses it after ten is almost never material — it is knowing where the turn is, which detail proves it, and
          when to stop. Each story below is broken into beats so you can rehearse it out loud without a script.
        </p>
        <div className="row wrap" style={{ gap: 6 }}>
          {rules.map((r, i) => (
            <span key={i} className="chip" style={{ fontSize: 10, whiteSpace: 'normal', height: 'auto', padding: '7px 10px', alignItems: 'flex-start' }}>
              <Ico name="check" size={10} /> {r}
            </span>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="row wrap" style={{ gap: 10 }}>
          <div style={{ position: 'relative', flex: '1 1 260px' }}>
            <span style={{ position: 'absolute', left: 13, top: 12, color: '#6b6b85' }}><Ico name="search" size={15} /></span>
            <input className="input" style={{ paddingLeft: 38 }} value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search a story — failure, interview, apology, pitch, funny…" aria-label="Search stories" />
          </div>
          <span className="tiny dim">{list.length} shown</span>
        </div>
        <div className="row wrap" style={{ gap: 6, marginTop: 14 }}>
          <button className={`chip clickable ${type === 'all' ? 'active' : ''}`} aria-pressed={type === 'all'} onClick={() => setType('all')}>
            All <span className="dim">{counts.all}</span>
          </button>
          {types.map((t) => (
            <button key={t.id} className={`chip clickable ${type === t.id ? 'active' : ''}`} aria-pressed={type === t.id} onClick={() => setType(t.id)} title={t.blurb}>
              {t.label} <span className="dim">{counts[t.id] || 0}</span>
            </button>
          ))}
        </div>
        {type !== 'all' && (types.find((t) => t.id === type) || {}).blurb && (
          <p className="tiny dim" style={{ marginTop: 10, marginBottom: 0 }}>{(types.find((t) => t.id === type) || {}).blurb}</p>
        )}
      </div>

      {list.length === 0 && (
        <div className="card empty">
          Nothing matches “{q}”. Try a situation — <em>interview</em>, <em>apology</em>, <em>pitch</em>, <em>funny</em>, <em>failure</em>.
        </div>
      )}

      <div className="stack sm">
        {list.map((s) => {
          const isOpen = openId === s.id;
          return (
            <div className="card" key={s.id} style={isOpen ? { borderColor: 'rgba(251,146,60,0.45)' } : undefined}>
              <div className="row wrap" style={{ gap: 7, marginBottom: 8 }}>
                <span className={`chip ${TYPE_TONE[s.type] || 'violet'}`} style={{ fontSize: 10 }}>{typeLabel(s.type)}</span>
                <span className="chip" style={{ fontSize: 10 }}>{mmss(s.seconds)}</span>
                <span className="tiny dim">{s.teller}</span>
              </div>
              <button onClick={() => toggle(s)} aria-expanded={isOpen}
                style={{ background: 'none', border: 0, padding: 0, textAlign: 'left', cursor: 'pointer', color: 'inherit', width: '100%' }}>
                <div className="card-title" style={{ marginBottom: 5 }}>{s.title}</div>
                <p className="card-desc" style={{ margin: 0 }}>{s.oneLiner}</p>
              </button>

              <div className="row wrap" style={{ gap: 6, marginTop: 12 }}>
                <button className={`btn sm ${isOpen ? '' : 'primary'}`} onClick={() => toggle(s)}>
                  <Ico name={isOpen ? 'chevron' : 'book'} size={12} /> {isOpen ? 'Close' : 'Open the beats'}
                </button>
                <button className="chip clickable" style={{ fontSize: 10 }} onClick={() => copy(s)} title="Copy the outline so you can rehearse it offline">
                  <Ico name="pen" size={10} /> copy outline
                </button>
                <button className="chip clickable" style={{ fontSize: 10 }} onClick={() => go('impromptu')} title="Practise speaking it under a timer">
                  <Ico name="mic" size={10} /> time it out loud
                </button>
              </div>

              {isOpen && (
                <div className="fade-in" style={{ marginTop: 16 }}>
                  <div className="lesson-example" style={{ marginBottom: 14 }}>
                    <div className="lesson-label amber" style={{ marginBottom: 4 }}>Say this first</div>
                    <p style={{ margin: 0, lineHeight: 1.7, fontSize: 14, fontStyle: 'italic' }}>“{s.opening}”</p>
                  </div>

                  <div className="lesson-label cyan">The beats, in order</div>
                  <ol className="lesson-list" style={{ margin: '0 0 14px', paddingLeft: 20 }}>
                    {s.beats.map((b, i) => <li key={i} style={{ marginBottom: 6 }}>{b}</li>)}
                  </ol>

                  <div className="grid g2" style={{ gap: 12, marginBottom: 14 }}>
                    <div className="card" style={{ background: 'rgba(52,211,153,0.05)', borderColor: 'rgba(52,211,153,0.25)' }}>
                      <div className="lesson-label mint" style={{ marginBottom: 6 }}><Ico name="eye" size={11} /> The detail that proves it</div>
                      <p style={{ margin: 0, lineHeight: 1.65, fontSize: 13.5 }}>{s.detail}</p>
                    </div>
                    <div className="card" style={{ background: 'rgba(34,211,238,0.05)', borderColor: 'rgba(34,211,238,0.25)' }}>
                      <div className="lesson-label cyan" style={{ marginBottom: 6 }}><Ico name="target" size={11} /> The turn</div>
                      <p style={{ margin: 0, lineHeight: 1.65, fontSize: 13.5 }}>{s.turn}</p>
                    </div>
                  </div>

                  <div className="lesson-label violet">Why it holds attention</div>
                  <p style={{ margin: '0 0 14px', lineHeight: 1.7, fontSize: 14 }}>{s.why}</p>

                  <div className="card" style={{ background: 'rgba(251,113,133,0.06)', borderColor: 'rgba(251,113,133,0.28)', marginBottom: 14 }}>
                    <div className="lesson-label rose" style={{ marginBottom: 6 }}><Ico name="eye" size={11} /> Do not tell this one…</div>
                    <p style={{ margin: 0, lineHeight: 1.65, fontSize: 13.5 }}>{s.whenNot}</p>
                  </div>

                  <div className="lesson-label amber">Rehearse it</div>
                  <ul className="lesson-list" style={{ margin: '0 0 14px' }}>
                    {(s.practise || []).map((p, i) => <li key={i}>{p}</li>)}
                  </ul>

                  {!!(s.reads || []).length && (
                    <div className="row wrap" style={{ gap: 6, marginTop: 4 }}>
                      <span className="tiny dim">Chapters behind it:</span>
                      {s.reads.map((id) => {
                        const ch = (content.library || []).find((l) => l.id === id);
                        return (
                          <button key={id} className="chip clickable" style={{ fontSize: 10 }}
                            onClick={() => go('library', { openId: id })} title="Open the chapter">
                            <Ico name="library" size={10} /> {ch ? ch.title : id}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {!!(s.pairs || []).length && (
                    <div className="row wrap" style={{ gap: 6, marginTop: 4 }}>
                      <span className="tiny dim">Read next:</span>
                      {s.pairs.map((p) => {
                        const other = all.find((x) => x.id === p);
                        if (other) {
                          return (
                            <button key={p} className="chip clickable" style={{ fontSize: 10 }}
                              onClick={() => { setOpenId(p); setQ(''); setType('all'); }}>
                              {other.title}
                            </button>
                          );
                        }
                        return (
                          <button key={p} className="chip clickable" style={{ fontSize: 10 }}
                            onClick={() => go(p.startsWith('psy-') ? 'psychology' : 'frameworks', { openId: p })}>
                            {p.replace(/^psy-/, '').replace(/-/g, ' ')}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="card">
        <div className="card-title" style={{ marginBottom: 8 }}>Three rules that do most of the work</div>
        <div className="grid g3" style={{ gap: 10 }}>
          {[['One story, one point', notes.rule], ['Length', notes.timing], ['Remembering it', notes.memory]].map(([h, p]) => (
            <div key={h} className="card" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="lesson-label violet" style={{ marginBottom: 6 }}>{h}</div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.65 }}>{p}</p>
            </div>
          ))}
        </div>
        <div className="row wrap" style={{ gap: 6, marginTop: 12 }}>
          <button className="chip clickable" onClick={() => go('gym')}><Ico name="target" size={10} /> Conversation Gym</button>
          <button className="chip clickable" onClick={() => go('impromptu')}><Ico name="mic" size={10} /> Impromptu Lab</button>
          <button className="chip clickable" onClick={() => go('frameworks')}><Ico name="dashboard" size={10} /> Story frameworks</button>
          <button className="chip clickable" onClick={() => go('psychology')}><Ico name="brain" size={10} /> Why it lands</button>
          <button className="chip clickable" onClick={() => go('coach', { mode: 'storytelling' })}><Ico name="chat" size={10} /> polish one with the coach</button>
        </div>
      </div>
    </div>
  );
}
