import React, { useEffect, useMemo, useRef, useState } from 'react';
import { addNote, notesFor, removeNote, verdictFor, setVerdict, VERDICTS } from '../local/notes';
import { logRep } from '../local/reps';
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

export default function Library({ content, go, boot, notify }) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [open, setOpen] = useState(boot?.openId || null);
  const [noteTick, setNoteTick] = useState(0);
  const [noteText, setNoteText] = useState('');
  const [quote, setQuote] = useState('');
  const [verdictTick, setVerdictTick] = useState(0);
  const [items, setItems] = useState(content.library);
  const [busy, setBusy] = useState(false);
  const [chapters, setChapters] = useState({}); // id → chapter, fetched on open
  const [chapterErr, setChapterErr] = useState(null);
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
        // default order matters: an unordered filter buries the new chapters
        // under the 41 legacy entries, so a fresh search looks empty
        const r = await api.library(q, cat);
        if (live) setItems(r.items);
      } catch { if (live) setItems(content.library); }
      if (live) setBusy(false);
    }, 180);
    return () => { live = false; clearTimeout(t); };
  }, [q, cat, content.library]);

  // the prose is a lazy chunk: fetch it when an entry is actually opened
  useEffect(() => {
    if (!open || chapters[open]) return;
    let live = true;
    (async () => {
      try {
        const ch = await api.chapter(open);
        if (live && ch) setChapters((c) => ({ ...c, [open]: ch }));
        else if (live) setChapters((c) => ({ ...c, [open]: null }));
      } catch (e) {
      // a failed chapter fetch used to look identical to "no chapter exists";
      // say so instead of telling the reader the prose was never written
      if (live) setChapterErr(e?.message || 'fetch failed');
    }
    })();
    return () => { live = false; };
  }, [open, chapters]);

  // A chapter only counts as read once you have actually sat with it. The
  // old version logged 240 seconds the moment you pressed "save note", which
  // is a reward for typing, not for reading.
  const openedAt = useRef(0);
  const readLogged = useRef(new Set());
  const logReading = (id, seconds, repeat = false) => {
    if (!id || readLogged.current.has(id)) return;
    readLogged.current.add(id);
    const title = (content.library.find((l) => l.id === id) || {}).title || '';
    logRep({ kind: 'reading', ref: id, label: title, seconds, repeat });
  };
  useEffect(() => {
    if (!open) return undefined;
    openedAt.current = Date.now();
    const t = setTimeout(() => logReading(open, 45), 45000);
    return () => { clearTimeout(t); if (Date.now() - openedAt.current > 30000) logReading(open, (Date.now() - openedAt.current) / 1000); };
  }, [open]);

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
            <input className="input" style={{ paddingLeft: 38 }} placeholder="Search fallbacks, frameworks, laws, rules, full chapter text…" aria-label="Search the library" 
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
            <button key={c} className={`chip clickable ${cat === c ? 'active' : ''}`} aria-pressed={cat === c} onClick={() => setCat(c)}>
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
          const chapter = chapters[i.id] || null;
          return (
            <div className={`lib-item${isOpen ? "" : " lazy-card"}`} key={i.id} ref={isOpen ? openRef : null} style={isOpen ? { borderColor: 'rgba(139,92,246,0.4)' } : undefined}>
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
                    <p key={idx} className="lib-para" style={{ margin: '0 0 13px', lineHeight: 1.75 }}>
                      {p}
                      <button className="save-quote" title="Save this paragraph as a highlight"
                        aria-label="Save this paragraph to your notes"
                        onClick={() => { setQuote(p.slice(0, 260)); setNoteText(''); setNoteTick((t) => t + 1); }}>
                        <Ico name="pen" size={10} /> save
                      </button>
                    </p>
                  ))}

                  {chapter?.script && (
                    <div style={{ margin: '18px 0' }}>
                      <div className="lesson-label">Worked script</div>
                      <div className="script">
                        {chapter.script.map((l, idx) => (
                          <div key={idx} className={`script-line ${l.who === 'You' ? 'you' : ''}`}>
                            <span className="script-who">{l.who}</span>
                            <span style={{ flex: 1 }}>{l.line}</span>
                            <button className="icon-btn" title="Save this line" aria-label="Save this line to your notes"
                              onClick={() => { setQuote(l.line); setNoteText(''); setNoteTick((t) => t + 1); }}
                              style={{ background: 'none', border: 0, cursor: 'pointer', color: 'inherit', opacity: 0.5, padding: 2 }}>
                              <Ico name="pen" size={11} />
                            </button>
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

                  {/* 97 chapters carry related ids and no view ever showed them:
                      the cross-links existed in the data and were invisible. */}
                  {chapter?.related?.length > 0 && (
                    <div style={{ margin: '18px 0' }}>
                      <div className="lesson-label cyan">Read next</div>
                      <div className="row wrap" style={{ gap: 6 }}>
                        {chapter.related
                          .map((id) => content.library.find((l) => l.id === id))
                          .filter(Boolean)
                          .map((r) => (
                            <button key={r.id} className="chip clickable" style={{ fontSize: 10 }}
                              title={r.short}
                              onClick={() => { setOpen(r.id); setCat('All'); setQ(''); }}>
                              {r.title}
                            </button>
                          ))}
                      </div>
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

                  {!chapter && i.hasChapter && (
                    <div className="tiny dim" style={{ marginTop: 12, fontStyle: 'italic' }}>
                      {chapterErr
                        ? `The long-form chapter did not load (${chapterErr}). The summary and cross-links still work — try reopening the entry.`
                        : 'Fetching the long-form chapter…'}
                    </div>
                  )}
                  {!chapter && !i.hasChapter && (
                    <div className="tiny dim" style={{ marginTop: 12, fontStyle: 'italic' }}>
                      This entry is a summary: the pattern, what to use it for, and the cross-links. The full chapters are the ones badged “full chapter”.
                    </div>
                  )}

                  {/* ── the margin: notes, highlights, verdict ── */}
                  <div style={{ marginTop: 20, borderTop: '1px solid var(--line)', paddingTop: 16 }}>
                    <div className="row" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
                      <div className="lesson-label violet" style={{ margin: 0 }}>
                        <Ico name="pen" size={11} /> Your margin
                      </div>
                      <span className="tiny dim">{notesFor(i.id).length} saved</span>
                    </div>

                    {quote && (
                      <div className="row" style={{ gap: 6, marginBottom: 8, alignItems: 'flex-start' }}>
                        <span className="tiny" style={{ fontStyle: 'italic', opacity: 0.75, flex: 1 }}>“{quote.slice(0, 160)}…”</span>
                        <button className="chip clickable" style={{ fontSize: 10 }} onClick={() => setQuote('')}>
                          <Ico name="x" size={10} /> clear
                        </button>
                      </div>
                    )}

                    <textarea className="textarea" style={{ minHeight: 64 }} value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder={quote ? 'Why did that line matter? (one sentence is enough)' : 'What did this change about what you will do?'} />
                    <div className="row wrap" style={{ marginTop: 8, gap: 6 }}>
                      <button className="btn primary sm" disabled={!noteText.trim()}
                        onClick={() => {
                          try {
                            addNote({ ref: i.id, refType: 'library', title: i.title, quote, text: noteText });
                            logReading(i.id, Math.max(60, (Date.now() - openedAt.current) / 1000));
                            setNoteText(''); setQuote(''); setNoteTick((t) => t + 1);
                            notify('Saved to your notes');
                          } catch (e) { notify(e.message); }
                        }}>
                        <Ico name="check" size={12} /> Save note
                      </button>
                      <div className="spacer" />
                      <span className="tiny dim">Did you use it?</span>
                      {Object.entries(VERDICTS).map(([k, meta]) => {
                        const current = verdictFor(i.id)?.verdict === k;
                        return (
                          <button key={k} className={`chip clickable ${current ? 'active' : ''} ${meta.tone}`} aria-pressed={current} style={{ fontSize: 10 }}
                            onClick={() => {
                              setVerdict(i.id, k, i.title);
                              if (k === 'used') logRep({ kind: 'reading', ref: i.id, label: i.title, seconds: 60, repeat: true });
                              setVerdictTick((t) => t + 1);
                              notify(meta.label);
                            }}>
                            {meta.label}
                          </button>
                        );
                      })}
                    </div>

                    {notesFor(i.id).length > 0 && (
                      <div className="stack" style={{ gap: 6, marginTop: 12 }}>
                        {notesFor(i.id).map((n) => (
                          <div key={n.id} className="list-row" style={{ alignItems: 'flex-start' }}>
                            <span className="dot" style={{ background: '#8b5cf6', marginTop: 6 }} />
                            <span className="tiny" style={{ flex: 1 }}>
                              {n.quote && <span style={{ fontStyle: 'italic', opacity: 0.8, display: 'block' }}>“{n.quote.slice(0, 90)}…”</span>}
                              {n.text}
                            </span>
                            <button className="btn ghost sm" aria-label="Delete note" onClick={() => { removeNote(n.id); setNoteTick((t) => t + 1); }}>
                              <Ico name="x" size={11} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
