import React, { useMemo, useState } from 'react';
import { Ico } from '../components/ui';
import {
  notesOrdered, removeNote, togglePin, updateNote, allVerdicts, VERDICTS, setVerdict,
} from '../local/notes';

// ─────────────────────────────────────────────────────────────
//  Notes & highlights
//  The reading side of the app had no margin to write in. This is
//  the margin: everything you saved from a chapter, a playbook, an
//  Arena run or the quick-capture box, with the verdict that makes
//  the collection useful ("I will use it" vs "I used it").
// ─────────────────────────────────────────────────────────────

const FILTERS = [
  { key: 'all', label: 'Everything' },
  { key: 'library', label: 'Chapters' },
  { key: 'gym', label: 'Playbooks' },
  { key: 'arena', label: 'Arena' },
  { key: 'academy', label: 'Academy' },
  { key: 'other', label: 'Quick captures' },
];

const ago = (iso) => {
  const d = Math.round((Date.now() - new Date(iso).getTime()) / 86400000);
  if (d <= 0) return 'today';
  if (d === 1) return 'yesterday';
  if (d < 30) return `${d} days ago`;
  return new Date(iso).toLocaleDateString();
};

export default function Notes({ go, notify }) {
  const [tick, setTick] = useState(0);
  const [filter, setFilter] = useState('all');
  const [q, setQ] = useState('');
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState('');

  const refresh = () => setTick((t) => t + 1);
  const notes = useMemo(() => notesOrdered(), [tick]);
  const verdicts = useMemo(() => allVerdicts(), [tick]);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return notes
      .filter((n) => filter === 'all' || n.refType === filter)
      .filter((n) => !needle || `${n.text} ${n.quote} ${n.title} ${n.ref}`.toLowerCase().includes(needle));
  }, [notes, filter, q]);

  const counts = useMemo(() => {
    const c = { all: notes.length };
    for (const n of notes) c[n.refType] = (c[n.refType] || 0) + 1;
    return c;
  }, [notes]);

  const startEdit = (n) => { setEditing(n.id); setDraft(n.text); };
  const saveEdit = (n) => {
    updateNote(n.id, { text: draft });
    setEditing(null);
    refresh();
    notify('Note updated');
  };
  const drop = (n) => { removeNote(n.id); refresh(); notify('Note deleted'); };
  const pin = (n) => { togglePin(n.id); refresh(); };
  const verdict = (n, v) => { setVerdict(n.ref, v, n.title); refresh(); notify(`Marked: ${VERDICTS[v].label}`); };

  const openSource = (n) => {
    const route = n.refType === 'gym' ? 'gym' : n.refType === 'academy' ? 'academy' : n.refType === 'arena' ? 'arena' : 'library';
    if (n.refType === 'other' || !n.ref) return;
    go(route, { openId: n.ref, moduleId: n.ref });
  };

  return (
    <div className="stack">
      <div className="card">
        <div className="row wrap" style={{ gap: 6, marginBottom: 10 }}>
          {FILTERS.map((f) => (
            <button key={f.key} className={`chip clickable ${filter === f.key ? 'active' : ''}`} aria-pressed={filter === f.key}
              onClick={() => setFilter(f.key)}>
              {f.label} <span className="dim">{counts[f.key] || 0}</span>
            </button>
          ))}
          <div className="spacer" />
          <input className="input" style={{ maxWidth: 240 }} value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search your notes…" aria-label="Search notes" />
        </div>
        <p className="card-desc" style={{ margin: 0 }}>
          {notes.length === 0
            ? 'Nothing saved yet. Open any chapter — there is a note box at the bottom and a save button on every quoted line.'
            : `${notes.length} saved${notes.filter((n) => n.pinned).length ? `, ${notes.filter((n) => n.pinned).length} pinned` : ''}. Notes live in this browser and travel inside your backup file.`}
        </p>
      </div>

      {shown.length === 0 && notes.length > 0 && (
        <div className="card"><p className="card-desc" style={{ margin: 0 }}>Nothing matches that filter.</p></div>
      )}

      {shown.map((n) => {
        const v = verdicts[n.ref];
        return (
          <div className="card" key={n.id} style={{ borderColor: n.pinned ? 'rgba(139,92,246,0.4)' : undefined }}>
            <div className="row wrap" style={{ gap: 6, marginBottom: 8 }}>
              <span className={`chip ${n.refType === 'library' ? 'violet' : n.refType === 'gym' ? 'mint' : ''}`} style={{ fontSize: 10 }}>
                {n.refType}
              </span>
              {n.title && <span className="tiny" style={{ fontWeight: 700 }}>{n.title}</span>}
              <div className="spacer" />
              <span className="tiny dim">{ago(n.at)}</span>
              <button className="btn ghost sm" aria-label={n.pinned ? 'Unpin note' : 'Pin note'} onClick={() => pin(n)}>
                <Ico name="bolt" size={11} />
              </button>
              {n.ref && n.refType !== 'other' && (
                <button className="btn ghost sm" aria-label="Open the source" onClick={() => openSource(n)}>
                  <Ico name="arrow" size={11} />
                </button>
              )}
              <button className="btn ghost sm" aria-label="Delete note" onClick={() => drop(n)}>
                <Ico name="trash" size={11} />
              </button>
            </div>

            {n.quote && (
              <blockquote style={{ margin: '0 0 8px', paddingLeft: 10, borderLeft: '2px solid rgba(139,92,246,0.5)', fontSize: 13, fontStyle: 'italic', opacity: 0.85 }}>
                “{n.quote}”
              </blockquote>
            )}

            {editing === n.id ? (
              <>
                <textarea className="textarea" style={{ minHeight: 70 }} value={draft} onChange={(e) => setDraft(e.target.value)} />
                <div className="row" style={{ marginTop: 8, gap: 8 }}>
                  <button className="btn sm primary" onClick={() => saveEdit(n)}><Ico name="check" size={12} /> Save</button>
                  <button className="btn sm" onClick={() => setEditing(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <p className="card-desc" style={{ margin: '0 0 10px', whiteSpace: 'pre-wrap' }}>{n.text}</p>
                <div className="row wrap" style={{ gap: 6 }}>
                  <span className="tiny dim">Did you use it?</span>
                  {Object.entries(VERDICTS).map(([k, meta]) => (
                    <button key={k} className={`chip clickable ${v?.verdict === k ? 'active' : ''} ${meta.tone}`} aria-pressed={v?.verdict === k}
                      style={{ fontSize: 10 }} onClick={() => verdict(n, k)}>
                      {meta.label}
                    </button>
                  ))}
                  <div className="spacer" />
                  <button className="chip clickable" style={{ fontSize: 10 }} onClick={() => startEdit(n)}>Edit</button>
                </div>
              </>
            )}
          </div>
        );
      })}

      <div className="card">
        <h3 className="card-title" style={{ marginBottom: 8 }}><Ico name="compass" size={14} /> Where notes come from</h3>
        <div className="row wrap" style={{ gap: 6 }}>
          <button className="chip clickable" onClick={() => go('library')}>Library chapters</button>
          <button className="chip clickable" onClick={() => go('gym')}>Gym playbooks</button>
          <button className="chip clickable" onClick={() => go('academy')}>Academy modules</button>
          <button className="chip clickable" onClick={() => go('today')}>Quick capture on Today</button>
        </div>
      </div>
    </div>
  );
}
