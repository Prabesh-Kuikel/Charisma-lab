import React, { useMemo, useState } from 'react';
import { api } from '../api';
import { Ico } from '../components/ui';

const TONE = {
  Clarity: 'cyan', Persuasion: 'violet', Sales: 'rose', Storytelling: 'mint',
  Conflict: 'amber', Negotiation: 'violet', Performance: 'orange', Feedback: 'mint',
  Care: 'rose', Family: 'amber', Money: 'mint', Self: 'cyan',
};

export default function Frameworks({ content, notify, go, boot, refresh }) {
  const all = content.frameworks || [];
  const cats = content.frameworkCategories || [];
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [open, setOpen] = useState(boot?.openId || all[0]?.id || null);
  const [practised, setPractised] = useState([]);

  const items = useMemo(() => {
    const needle = q.toLowerCase().trim();
    return all.filter((f) => {
      const inCat = cat === 'All' || f.category === cat;
      if (!inCat) return false;
      if (!needle) return true;
      const hay = `${f.name} ${f.category} ${f.oneLiner} ${f.when.join(' ')} ${f.example} ${f.steps.map((s) => s.label + ' ' + s.detail).join(' ')}`.toLowerCase();
      return hay.includes(needle);
    });
  }, [all, q, cat]);

  const mark = async (f) => {
    if (practised.includes(f.id)) return;
    setPractised((p) => [...p, f.id]);
    try { await api.logXp({ kind: 'framework', xp: 10 }); notify(`Practised · ${f.name}`); refresh?.(); }
    catch (e) { notify(e.message); }
  };

  const copy = async (f) => {
    const text = `${f.name} (${f.seconds}s)\n\n${f.steps.map((s, i) => `${i + 1}. ${s.label} — ${s.detail}`).join('\n')}\n\nExample: ${f.example}`;
    try { await navigator.clipboard.writeText(text); notify('Copied'); }
    catch { notify('Copy blocked by the browser'); }
  };

  return (
    <div className="stack">
      <div className="card">
        <div className="row wrap" style={{ gap: 10 }}>
          <div style={{ position: 'relative', flex: '1 1 260px' }}>
            <span style={{ position: 'absolute', left: 13, top: 12, color: '#6b6b85' }}><Ico name="search" size={15} /></span>
            <input className="input" style={{ paddingLeft: 38 }} placeholder="Search frameworks, steps, examples…" aria-label="Search frameworks" 
              value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <span className="chip mint" style={{ fontSize: 10 }}>{all.length} frameworks</span>
        </div>
        <div className="row wrap" style={{ gap: 6, marginTop: 12 }}>
          <button className={`chip clickable ${cat === 'All' ? 'active' : ''}`} aria-pressed={cat === 'All'} onClick={() => setCat('All')}>
            All <span className="dim">{all.length}</span>
          </button>
          {cats.map((c) => (
            <button key={c} className={`chip clickable ${cat === c ? 'active' : ''}`} aria-pressed={cat === c} onClick={() => setCat(c)}>
              {c} <span className="dim">{all.filter((f) => f.category === c).length}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="stack sm">
        {items.length === 0 && <div className="card empty">Nothing matches “{q}”. Try “pitch”, “story” or “objection”.</div>}
        {items.map((f) => {
          const isOpen = open === f.id;
          return (
            <div className="lib-item" key={f.id} style={isOpen ? { borderColor: 'rgba(139,92,246,0.4)' } : undefined}>
              <div className="lib-head" onClick={() => setOpen(isOpen ? null : f.id)}>
                <div style={{ flex: 1 }}>
                  <div className="row wrap" style={{ gap: 7, marginBottom: 6 }}>
                    <span className={`chip ${TONE[f.category] || 'violet'}`} style={{ fontSize: 10 }}>{f.category}</span>
                    <span className="tiny dim">{f.seconds}s · {f.steps.length} steps</span>
                    {practised.includes(f.id) && <span className="chip mint" style={{ fontSize: 10 }}>practised</span>}
                  </div>
                  <div className="lib-title">{f.name}</div>
                  <div className="lib-short">{f.oneLiner}</div>
                </div>
                <span style={{ color: '#6b6b85', transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.18s' }}>
                  <Ico name="chevron" size={16} />
                </span>
              </div>

              {isOpen && (
                <div className="lib-body fade-in">
                  <div className="lesson-label mint">Use it when</div>
                  <ul className="lesson-list">{f.when.map((w, i) => <li key={i}>{w}</li>)}</ul>

                  <div className="lesson-label" style={{ marginTop: 16 }}>The structure</div>
                  <div className="stack sm">
                    {f.steps.map((s, i) => (
                      <div className="row" key={i} style={{ gap: 10, alignItems: 'flex-start' }}>
                        <span className="chip violet" style={{ fontSize: 10, minWidth: 22, justifyContent: 'center' }}>{i + 1}</span>
                        <div>
                          <div style={{ fontSize: 12.5, fontWeight: 700 }}>{s.label}</div>
                          <div className="tiny dim">{s.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="lesson-example" style={{ marginTop: 16 }}>
                    <div className="lesson-label cyan">In one go</div>
                    <p style={{ margin: 0, fontStyle: 'italic' }}>{f.example}</p>
                  </div>

                  <div className="lesson-label rose" style={{ marginTop: 16 }}>Where it goes wrong</div>
                  <ul className="lesson-list">{f.pitfalls.map((p, i) => <li key={i}>{p}</li>)}</ul>

                  <div className="lesson-label mint" style={{ marginTop: 16 }}>Practise it</div>
                  <ol className="lesson-list">{f.drill.map((d, i) => <li key={i}>{d}</li>)}</ol>

                  <div className="row wrap" style={{ gap: 8, marginTop: 14 }}>
                    <button className={`btn sm ${practised.includes(f.id) ? '' : 'primary'}`} onClick={() => mark(f)} disabled={practised.includes(f.id)}>
                      <Ico name="check" size={13} /> {practised.includes(f.id) ? 'Practised' : 'Mark practised'}
                    </button>
                    <button className="btn sm" onClick={() => copy(f)}><Ico name="pen" size={13} /> Copy</button>
                    <button className="btn ghost sm" onClick={() => go('games')}>Drill it</button>
                    <button className="btn ghost sm" onClick={() => go('coach')}>Ask the coach</button>
                  </div>

                  {!!(f.pairs || []).length && (
                    <div className="row wrap" style={{ gap: 6, marginTop: 12 }}>
                      {f.pairs.filter((p) => !p.startsWith('cf-')).map((p) => {
                        // "reading" told you nothing; name the chapter you will land in
                        const entry = (content.library || []).find((l) => l.id === p);
                        return (
                          <button key={p} className="chip clickable" style={{ fontSize: 10 }} onClick={() => go('library', { openId: p })}
                            title={entry ? `Open the chapter: ${entry.title}` : 'Open in the library'}>
                            <Ico name="library" size={10} /> {entry ? entry.title : p}
                          </button>
                        );
                      })}
                      {f.pairs.filter((p) => p.startsWith('cf-')).map((p) => {
                        const other = all.find((x) => x.id === p.replace('cf-', ''));
                        return other ? (
                          <button key={p} className="chip clickable" style={{ fontSize: 10 }} onClick={() => setOpen(other.id)}>
                            pairs with {other.name}
                          </button>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
