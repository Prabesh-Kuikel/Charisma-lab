import React, { useMemo, useState } from 'react';
import { api } from '../api';
import { Ico } from '../components/ui';

// The app used "frame" 112 times and "anchor" 43 times and never defined
// either in one place. This view is the plain-language reference: what the
// term means, how it sounds out loud, where it actually comes from, and the
// specific way people misuse it.
const SOURCE = {
  behavioural: { label: 'evidence-backed', tone: 'mint', note: 'There are studies behind this, and they broadly replicate.' },
  field: { label: 'field term', tone: 'cyan', note: 'Practitioners use it and it describes something real, but nobody has measured it.' },
  folk: { label: 'folk term', tone: 'amber', note: 'A useful story, not a finding. Treat it as a heuristic.' },
};

const tone = (src) => (SOURCE[src] || SOURCE.field).tone;

export default function Glossary({ content, notify, go, boot, refresh }) {
  const all = content.glossary || [];
  const cats = content.glossaryCategories || [];
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [open, setOpen] = useState(boot?.openId || null);
  const [saved, setSaved] = useState([]);

  const counts = useMemo(() => {
    const m = { All: all.length };
    all.forEach((t) => { m[t.category] = (m[t.category] || 0) + 1; });
    return m;
  }, [all]);

  const items = useMemo(() => {
    const needle = q.toLowerCase().trim();
    return all.filter((t) => {
      if (cat !== 'All' && t.category !== cat) return false;
      if (!needle) return true;
      const hay = `${t.term} ${t.plain} ${t.say} ${t.honest} ${t.trap}`.toLowerCase();
      return hay.includes(needle);
    });
  }, [all, q, cat]);

  const catName = (id) => (cats.find((c) => c.id === id) || {}).name || id;

  const save = async (t) => {
    const key = `gloss:${t.id}`;
    if (saved.includes(key)) return;
    setSaved((s) => [...s, key]);
    try { await api.logXp({ kind: 'glossary', xp: 4 }); notify(`Saved · ${t.term}`); refresh?.(); }
    catch (e) { notify(e.message); }
  };

  return (
    <div className="stack">
      <div className="card">
        <div className="row" style={{ gap: 10, marginBottom: 12 }}>
          <div className="search-wrap" style={{ flex: 1 }}>
            <Ico name="search" size={14} />
            <input className="input" value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search a term — frame, BATNA, mirroring, upspeak, scarcity…"
              aria-label="Search the glossary" />
          </div>
          <span className="tiny dim">{items.length} shown</span>
        </div>
        <div className="row wrap" style={{ gap: 6 }}>
          <button className={`chip clickable ${cat === 'All' ? 'active' : ''}`} aria-pressed={cat === 'All'}
            onClick={() => setCat('All')}>All <span className="dim">{counts.All}</span></button>
          {cats.map((c) => (
            <button key={c.id} className={`chip clickable ${cat === c.id ? 'active' : ''}`} aria-pressed={cat === c.id}
              onClick={() => setCat(c.id)} title={c.note}>
              {c.name} <span className="dim">{counts[c.id] || 0}</span>
            </button>
          ))}
        </div>
        {cat !== 'All' && (
          <p className="tiny dim" style={{ marginTop: 10, marginBottom: 0 }}>{(cats.find((c) => c.id === cat) || {}).note}</p>
        )}
        {/* the honesty legend: the point of this wing is that it tells you which
            terms are measured and which are just useful words */}
        <p className="tiny dim" style={{ marginTop: 12, marginBottom: 0 }}>
          Every term says where it comes from: <span className="chip mint" style={{ fontSize: 9 }}>evidence-backed</span>{' '}
          has studies behind it, <span className="chip cyan" style={{ fontSize: 9 }}>field term</span>{' '}
          describes something real but is unmeasured, <span className="chip amber" style={{ fontSize: 9 }}>folk term</span>{' '}
          is a useful story rather than a finding.
        </p>
      </div>

      {items.length === 0 && (
        <div className="card empty">
          Nothing matches “{q}”. Try a term you have heard in a meeting — <em>BATNA</em>, <em>anchor</em>, <em>reframe</em>, <em>scarcity</em>.
        </div>
      )}

      <div className="stack sm">
        {items.map((t) => {
          const isOpen = open === t.id;
          return (
            <div className={`card${isOpen ? '' : ' lazy-card'}`} key={t.id}
              style={isOpen ? { borderColor: 'rgba(139,92,246,0.45)' } : undefined}>
              <div className="row wrap" style={{ gap: 7, marginBottom: 8 }}>
                <span className="chip violet" style={{ fontSize: 10 }}>{catName(t.category)}</span>
                <span className={`chip ${tone(t.source)}`} style={{ fontSize: 10 }} title={SOURCE[t.source]?.note}>
                  {SOURCE[t.source]?.label || t.source}
                </span>
                <span className="spacer" />
                <button className="chip clickable" style={{ fontSize: 10 }}
                  aria-pressed={isOpen}
                  aria-expanded={isOpen}
                  aria-controls={`g-body-${t.id}`}
                  aria-label={`${isOpen ? 'Close' : 'Open'} the definition of ${t.term}`}
                  onClick={() => setOpen(isOpen ? null : t.id)}>
                  {isOpen ? 'close' : 'define'} <Ico name={isOpen ? 'chevron' : 'arrow'} size={10} />
                </button>
              </div>

              <h3 style={{ margin: '0 0 6px', fontSize: 16 }}>{t.term}</h3>
              <p style={{ margin: 0, lineHeight: 1.7 }}>{t.plain}</p>

              {isOpen && (
                <div className="fade-in" id={`g-body-${t.id}`} style={{ marginTop: 14 }}>
                  <div className="lesson-example" style={{ marginBottom: 14 }}>
                    <div className="lesson-label cyan">Out loud</div>
                    <p style={{ margin: 0, fontStyle: 'italic' }}>{t.say}</p>
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <div className="lesson-label">Where it comes from, honestly</div>
                    <p style={{ margin: 0, lineHeight: 1.7 }}>{t.honest}</p>
                  </div>
                  <div>
                    <div className="lesson-label rose">The way it gets misused</div>
                    <p style={{ margin: 0, lineHeight: 1.7 }}>{t.trap}</p>
                  </div>
                  <div className="row wrap" style={{ gap: 6, marginTop: 14 }}>
                    <button className="chip clickable" style={{ fontSize: 10 }} onClick={() => save(t)}
                      aria-pressed={saved.includes(`gloss:${t.id}`)}>
                      <Ico name="pen" size={10} /> {saved.includes(`gloss:${t.id}`) ? 'saved' : 'mark as known'}
                    </button>
                    <button className="chip clickable" style={{ fontSize: 10 }} onClick={() => go('library')}>
                      <Ico name="library" size={10} /> playbooks that use it
                    </button>
                    <button className="chip clickable" style={{ fontSize: 10 }} onClick={() => go('coach', { mode: 'general', prefill: `Explain "${t.term}" with an example from my life.` })}>
                      <Ico name="chat" size={10} /> ask the coach
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
