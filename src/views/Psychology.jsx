import React, { useMemo, useState } from 'react';
import { Ico } from '../components/ui';
import { logRep } from '../local/reps';

// ─────────────────────────────────────────────────────────────
//  Human Psychology
//  A reading-and-practice wing rather than a "tricks" list. Every
//  entry shows the effect, the honest use, how the same lever is
//  used on you, the limit of the evidence, and one rep. The defence
//  section is not tucked away: it is a toggle on every card, and
//  the "how it is used on you" view flips the whole wing around.
// ─────────────────────────────────────────────────────────────

const STRENGTH_TONE = {
  Strong: 'mint',
  'Moderate to strong': 'mint',
  'Strong (theory), moderate (charisma specifics)': 'amber',
  Moderate: 'amber',
  'Strong (the effect); mixed (its ethics)': 'amber',
  'Strong (as a procedure)': 'violet',
  'Strong (minimal groups); contested (Robbers Cave reading)': 'amber',
  'Moderate; the classic study is weak but the effect replicates': 'amber',
};

const tone = (s) => STRENGTH_TONE[s] || 'violet';

export default function Psychology({ content, go, notify, boot }) {
  const entries = content.psychology || [];
  const cats = content.psyCategories || [];
  const manifesto = content.psyManifesto;

  const [cat, setCat] = useState('All');
  const [lens, setLens] = useState('learn'); // learn | defence
  const [q, setQ] = useState('');
  const [openId, setOpenId] = useState(boot?.openId || null);
  const [read, setRead] = useState([]);

  const counts = useMemo(() => {
    const m = { All: entries.length };
    entries.forEach((e) => { m[e.category] = (m[e.category] || 0) + 1; });
    return m;
  }, [entries]);

  const list = useMemo(() => {
    const t = q.toLowerCase().trim();
    return entries.filter((e) => {
      if (cat !== 'All' && e.category !== cat) return false;
      if (!t) return true;
      return `${e.title} ${e.oneLiner} ${e.field} ${(e.keywords || []).join(' ')} ${e.mechanism} ${(e.effect || []).join(' ')} ${(e.use || []).join(' ')} ${(e.defence || []).join(' ')}`.toLowerCase().includes(t);
    });
  }, [entries, cat, q]);

  const open = (e) => {
    const next = openId === e.id ? null : e.id;
    setOpenId(next);
    // reading an entry counts as a rep, once per entry — the same rule the
    // library uses, so the practice log stays honest rather than inflated
    if (next && !read.includes(e.id)) {
      setRead((r) => [...r, e.id]);
      logRep({ kind: 'psychology', ref: e.id, label: e.title, seconds: 180 });
    }
  };

  const catName = (id) => (cats.find((c) => c.id === id) || {}).name || id;

  return (
    <div className="stack">
      {manifesto && (
        <div className="card" style={{ borderColor: 'rgba(139,92,246,0.35)' }}>
          <div className="row wrap" style={{ gap: 8, marginBottom: 10 }}>
            <span className="chip violet" style={{ fontSize: 10 }}><Ico name="brain" size={11} /> the editorial rule</span>
            <span className="chip" style={{ fontSize: 10 }}>{entries.length} mechanisms</span>
            <span className="chip" style={{ fontSize: 10 }}>{cats.length} families</span>
            <div className="spacer" />
            <button className={`chip clickable ${lens === 'defence' ? 'active' : ''}`} aria-pressed={lens === 'defence'} style={{ fontSize: 10 }}
              onClick={() => setLens(lens === 'defence' ? 'learn' : 'defence')}
              title="Flip the whole section around: what is being done to you, and how to notice">
              <Ico name="eye" size={11} /> {lens === 'defence' ? 'Show: how to use it' : 'Show: how it is used on you'}
            </button>
          </div>
          <h2 style={{ fontSize: 19, margin: '0 0 8px' }}>{manifesto.title}</h2>
          {(manifesto.body || []).map((p, i) => (
            <p className="card-desc" key={i} style={{ marginBottom: i === manifesto.body.length - 1 ? 12 : 10 }}>{p}</p>
          ))}
          <div className="row wrap" style={{ gap: 6 }}>
            {(manifesto.rules || []).map((r, i) => (
              <span key={i} className="chip" style={{ fontSize: 10, whiteSpace: 'normal', height: 'auto', padding: '7px 10px', alignItems: 'flex-start' }}>
                <Ico name="check" size={10} /> {r}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="card">
        <div className="row wrap" style={{ gap: 10 }}>
          <div style={{ position: 'relative', flex: '1 1 260px' }}>
            <span style={{ position: 'absolute', left: 13, top: 12, color: '#6b6b85' }}><Ico name="search" size={15} /></span>
            <input className="input" style={{ paddingLeft: 38 }} value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search a mechanism — anchoring, halo, scarcity, loneliness…" aria-label="Search mechanisms" />
          </div>
          <span className="tiny dim">{list.length} shown</span>
        </div>
        <div className="row wrap" style={{ gap: 6, marginTop: 14 }}>
          <button className={`chip clickable ${cat === 'All' ? 'active' : ''}`} aria-pressed={cat === 'All'} onClick={() => setCat('All')}>All <span className="dim">{counts.All}</span></button>
          {cats.map((c) => (
            <button key={c.id} className={`chip clickable ${cat === c.id ? 'active' : ''}`} aria-pressed={cat === c.id} onClick={() => setCat(c.id)} title={c.note}>
              {c.name} <span className="dim">{counts[c.id] || 0}</span>
            </button>
          ))}
        </div>
        {cat !== 'All' && (
          <p className="tiny dim" style={{ marginTop: 10, marginBottom: 0 }}>
            {(cats.find((c) => c.id === cat) || {}).note}
          </p>
        )}
      </div>

      {list.length === 0 && (
        <div className="card empty">
          Nothing matches “{q}”. Try a mechanism you have heard of — <em>halo</em>, <em>anchoring</em>, <em>sunk cost</em>, <em>reactance</em>.
        </div>
      )}

      <div className="stack sm">
        {list.map((e) => {
          const isOpen = openId === e.id;
          return (
            <div className={`card${isOpen ? "" : " lazy-card"}`} key={e.id} style={isOpen ? { borderColor: 'rgba(139,92,246,0.45)' } : undefined}>
              <div className="row wrap" style={{ gap: 7, marginBottom: 8 }}>
                <span className="chip violet" style={{ fontSize: 10 }}>{catName(e.category)}</span>
                <span className={`chip ${tone(e.strength)}`} style={{ fontSize: 10 }} title={`Evidence strength: ${e.strength}`}>
                  evidence: {e.strength.split(/[;(]/)[0].trim().toLowerCase()}
                </span>
                <span className="tiny dim">{e.field}</span>
              </div>
              <button onClick={() => open(e)} aria-expanded={isOpen}
                style={{ background: 'none', border: 0, padding: 0, textAlign: 'left', cursor: 'pointer', color: 'inherit', width: '100%' }}>
                <div className="card-title" style={{ marginBottom: 5 }}>{e.title}</div>
                <p className="card-desc" style={{ margin: 0 }}>{e.oneLiner}</p>
              </button>

              <div className="row wrap" style={{ gap: 6, marginTop: 12 }}>
                <button className={`btn sm ${isOpen ? '' : 'primary'}`} onClick={() => open(e)}>
                  <Ico name={isOpen ? 'chevron' : 'book'} size={12} /> {isOpen ? 'Close' : 'Read the mechanism'}
                </button>
                <button className="chip clickable" style={{ fontSize: 10 }} onClick={() => go('coach', { mode: 'psychology' })} title="Talk it through with the psychology coach">
                  <Ico name="chat" size={10} /> take it to the coach
                </button>
              </div>

              {isOpen && (
                <div className="fade-in" style={{ marginTop: 16 }}>
                  <div className="lesson-label cyan">What the research shows</div>
                  {(e.effect || []).map((p, i) => (
                    <p key={i} style={{ margin: '0 0 10px', lineHeight: 1.7, fontSize: 14 }}>{p}</p>
                  ))}
                  <div className="tiny dim" style={{ marginBottom: 14 }}>
                    <strong>Evidence:</strong> {e.evidence}
                  </div>

                  <div className="lesson-label">The mechanism</div>
                  <p style={{ margin: '0 0 14px', lineHeight: 1.7, fontSize: 14 }}>{e.mechanism}</p>

                  <div className="grid g2" style={{ gap: 12, marginBottom: 14 }}>
                    <div className="card" style={{ background: 'rgba(52,211,153,0.05)', borderColor: 'rgba(52,211,153,0.25)' }}>
                      <div className="lesson-label mint" style={{ marginBottom: 8 }}>
                        <Ico name="target" size={11} /> {lens === 'defence' ? 'The honest use' : 'How it helps you'}
                      </div>
                      <ul className="lesson-list" style={{ margin: 0 }}>{(e.use || []).map((u, i) => <li key={i}>{u}</li>)}</ul>
                    </div>
                    <div className="card" style={{ background: 'rgba(251,113,133,0.05)', borderColor: 'rgba(251,113,133,0.28)' }}>
                      <div className="lesson-label rose" style={{ marginBottom: 8 }}>
                        <Ico name="eye" size={11} /> How it is used on you
                      </div>
                      <ul className="lesson-list" style={{ margin: 0 }}>{(e.defence || []).map((d, i) => <li key={i}>{d}</li>)}</ul>
                    </div>
                  </div>

                  <div className="lesson-example" style={{ marginBottom: 14 }}>
                    <div className="lesson-label amber">Where the evidence stops</div>
                    <p style={{ margin: 0, lineHeight: 1.7, fontSize: 13.5 }}>{e.limit}</p>
                  </div>

                  <div className="card" style={{ background: 'rgba(139,92,246,0.07)', borderColor: 'rgba(139,92,246,0.3)' }}>
                    <div className="lesson-label violet" style={{ marginBottom: 6 }}>Practise it today</div>
                    <p style={{ margin: 0, lineHeight: 1.7, fontSize: 14 }}>{e.practise}</p>
                  </div>

                  {!!(e.reads || []).length && (
                    <div className="row wrap" style={{ gap: 6, marginTop: 14 }}>
                      <span className="tiny dim">Chapters behind it:</span>
                      {e.reads.map((id) => {
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

                  {!!(e.pairs || []).length && (
                    <div className="row wrap" style={{ gap: 6, marginTop: 14 }}>
                      <span className="tiny dim">Read next:</span>
                      {e.pairs.map((p) => {
                        const other = entries.find((x) => x.id === p);
                        return other ? (
                          <button key={p} className="chip clickable" style={{ fontSize: 10 }} onClick={() => { setOpenId(p); setQ(''); setCat('All'); }}>
                            {other.title}
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

      <div className="card">
        <div className="card-title" style={{ marginBottom: 8 }}>Keep reading</div>
        <div className="row wrap" style={{ gap: 6 }}>
          <button className="chip clickable" onClick={() => go('library', { cat: 'Robert Greene Power Laws' })}><Ico name="library" size={10} /> Power laws</button>
          <button className="chip clickable" onClick={() => go('body')}><Ico name="eye" size={10} /> Body Decoder</button>
          <button className="chip clickable" onClick={() => go('frameworks')}><Ico name="target" size={10} /> Frameworks</button>
          <button className="chip clickable" onClick={() => go('academy')}><Ico name="book" size={10} /> Academy</button>
          <button className="chip clickable" onClick={() => go('notes')}><Ico name="pen" size={10} /> Your notes</button>
        </div>
      </div>
    </div>
  );
}
