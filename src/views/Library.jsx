import React, { useEffect, useMemo, useRef, useState } from 'react';
import { api } from '../api';
import { Ico, Spinner } from '../components/ui';

const highlight = (text, q) => {
  if (!q || q.length < 2) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
};

const CAT_TONE = {
  'Robert Greene Power Laws': 'rose',
  'Dale Carnegie Rules': 'orange',
  'Storytelling Frameworks': 'cyan',
  'Wit Patterns': 'amber',
  'Voice & Delivery': 'mint',
};

export default function Library({ content, go, boot }) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [open, setOpen] = useState(boot?.openId || null);
  const [items, setItems] = useState(content.library);
  const [busy, setBusy] = useState(false);
  const openRef = useRef(null);

  const cats = useMemo(() => ['All', ...new Set(content.library.map((i) => i.category))], [content.library]);
  const counts = useMemo(() => {
    const m = { All: content.library.length };
    content.library.forEach((i) => { m[i.category] = (m[i.category] || 0) + 1; });
    return m;
  }, [content.library]);
  const chapterCount = useMemo(() => content.library.filter((i) => i.hasChapter).length, [content.library]);

  useEffect(() => {
    let live = true;
    setBusy(true);
    const t = setTimeout(async () => {
      try {
        const r = await api.library(q, cat);
        if (live) setItems(r.items);
      } catch { if (live) setItems(content.library); }
      if (live) setBusy(false);
    }, 180);
    return () => { live = false; clearTimeout(t); };
  }, [q, cat, content.library]);

  // scroll to a deep-linked entry
  useEffect(() => {
    if (boot?.openId && openRef.current) openRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [boot?.openId, items.length]);

  return (
    <>
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="row wrap" style={{ gap: 12 }}>
          <div style={{ position: 'relative', flex: '1 1 280px' }}>
            <span style={{ position: 'absolute', left: 13, top: 12, color: '#6b6b85' }}><Ico name="search" size={15} /></span>
            <input className="input" style={{ paddingLeft: 38 }} placeholder="Search fallbacks, frameworks, laws, rules, full chapter text…"
              value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="row tiny dim" style={{ gap: 8 }}>
            {busy ? <Spinner /> : null}
            <span>{items.length} entries</span>
            <span className="chip mint" style={{ fontSize: 10 }}>{chapterCount} full chapters</span>
          </div>
        </div>
        <div className="row wrap" style={{ gap: 6, marginTop: 14 }}>
          {cats.map((c) => (
            <button key={c} className={`chip clickable ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>
              {c} <span className="dim">{counts[c]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="stack sm">
        {items.length === 0 && (
          <div className="card empty">No entries match “{q}”. Try a broader term like “silence”, “story” or “status”.</div>
        )}
        {items.map((i) => {
          const isOpen = open === i.id;
          const chapter = i.chapter;
          return (
            <div className="lib-item" key={i.id} ref={isOpen ? openRef : null} style={isOpen ? { borderColor: 'rgba(139,92,246,0.4)' } : undefined}>
              <div className="lib-head" onClick={() => setOpen(isOpen ? null : i.id)}>
                <div style={{ flex: 1 }}>
                  <div className="row wrap" style={{ gap: 7, marginBottom: 6 }}>
                    <span className={`chip ${CAT_TONE[i.category] || 'violet'}`} style={{ fontSize: 10 }}>{i.category}</span>
                    <span className="tiny dim">{i.source}</span>
                    {i.hasChapter && <span className="chip mint" style={{ fontSize: 10 }}>full chapter</span>}
                  </div>
                  <div className="lib-title">{highlight(i.title, q)}</div>
                  <div className="lib-short">{highlight(i.short, q)}</div>
                </div>
                <span style={{ color: '#6b6b85', transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.18s' }}>
                  <Ico name="chevron" size={16} />
                </span>
              </div>

              {isOpen && (
                <div className="lib-body fade-in">
                  {chapter?.thesis && (
                    <div className="lesson-example" style={{ marginBottom: 16 }}>
                      <div className="lesson-label cyan">The claim</div>
                      <p style={{ margin: 0 }}>{chapter.thesis}</p>
                    </div>
                  )}

                  <p style={{ margin: '0 0 12px' }}>{highlight(i.body, q)}</p>

                  {chapter?.deep?.map((p, idx) => (
                    <p key={idx} style={{ margin: '0 0 13px', lineHeight: 1.75 }}>{p}</p>
                  ))}

                  {chapter?.script && (
                    <div style={{ margin: '18px 0' }}>
                      <div className="lesson-label">Worked script</div>
                      <div className="script">
                        {chapter.script.map((l, idx) => (
                          <div key={idx} className={`script-line ${l.who === 'You' ? 'you' : ''}`}>
                            <span className="script-who">{l.who}</span>
                            <span>{l.line}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {chapter?.failureModes && (
                    <div style={{ margin: '18px 0' }}>
                      <div className="lesson-label rose">Where it goes wrong</div>
                      <ul className="lesson-list">{chapter.failureModes.map((f, idx) => <li key={idx}>{f}</li>)}</ul>
                    </div>
                  )}

                  {chapter?.drill && (
                    <div style={{ margin: '18px 0' }}>
                      <div className="lesson-label mint">Practice it</div>
                      <ol className="lesson-list">{chapter.drill.map((d, idx) => <li key={idx}>{d}</li>)}</ol>
                    </div>
                  )}

                  <div className="row wrap" style={{ gap: 6, margin: '16px 0 10px' }}>
                    {i.tags.map((t) => <span key={t} className="chip" style={{ fontSize: 10 }}>#{t}</span>)}
                  </div>
                  <div className="tiny dim" style={{ marginBottom: 12 }}><strong>Use it for:</strong> {i.use}</div>

                  {i.courseLinks?.length > 0 && (
                    <>
                      <div className="lesson-label">Taught in the course</div>
                      <div className="row wrap" style={{ gap: 6 }}>
                        {i.courseLinks.map((l, idx) => (
                          <button key={idx} className="chip clickable" onClick={() => go('courses', { track: l.track, day: l.day })}>
                            <Ico name="book" size={10} /> {l.trackName?.includes('Fast') ? 'Fast' : 'Deep'} · Day {l.day} — {l.title}
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {!chapter && (
                    <div className="tiny dim" style={{ marginTop: 12, fontStyle: 'italic' }}>
                      Long-form chapter for this entry is still being written — the summary above and the cross-links are live.
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
