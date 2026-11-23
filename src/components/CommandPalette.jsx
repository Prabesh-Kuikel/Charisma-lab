import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Ico } from './ui';
import { search, suggestions, KIND_LABEL } from '../local/search';

const NAV_ACTIONS = [
  { id: 'nav:dashboard', label: 'Go to Dashboard', icon: 'dashboard', view: 'dashboard' },
  { id: 'nav:gym', label: 'Go to Conversation Gym', icon: 'target', view: 'gym' },
  { id: 'nav:scripts', label: 'Go to My Scripts', icon: 'pen', view: 'scripts' },
  { id: 'nav:academy', label: 'Go to Academy', icon: 'book', view: 'academy' },
  { id: 'nav:library', label: 'Go to Resource Library', icon: 'library', view: 'library' },
  { id: 'nav:daily', label: 'Go to Daily Dojo', icon: 'spark', view: 'daily' },
  { id: 'nav:arena', label: 'Go to Conversation Arena', icon: 'chat', view: 'arena' },
  { id: 'nav:settings', label: 'Backup, restore & settings', icon: 'gear', view: 'settings' },
];

export default function CommandPalette({ open, onClose, index, onPick, onNav }) {
  const [q, setQ] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQ('');
      setCursor(0);
      // let the dialog paint before focusing, or iOS refuses
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  const navHits = useMemo(() => {
    if (!q) return [];
    const t = q.toLowerCase();
    return NAV_ACTIONS.filter((a) => a.label.toLowerCase().includes(t)).slice(0, 4);
  }, [q]);

  const results = useMemo(() => {
    if (!index) return [];
    if (!q) return suggestions(index, 6);
    return search(index, q, 20);
  }, [index, q]);

  const rows = useMemo(() => [
    ...navHits.map((a) => ({ kind: 'action', ...a })),
    ...results.map((r) => ({ kind: 'result', ...r })),
  ], [navHits, results]);

  useEffect(() => { setCursor(0); }, [q]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); setCursor((c) => Math.min(c + 1, rows.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)); }
      else if (e.key === 'Enter') {
        const row = rows[cursor];
        if (!row) return;
        e.preventDefault();
        if (row.kind === 'action') onNav(row.view);
        else onPick(row);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, rows, cursor, onClose, onPick, onNav]);

  useEffect(() => {
    const el = listRef.current?.querySelector('.pal-row.active');
    el?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  if (!open) return null;

  return (
    <div className="pal-scrim" onMouseDown={onClose}>
      <div className="pal" role="dialog" aria-modal="true" aria-label="Search everything" onMouseDown={(e) => e.stopPropagation()}>
        <div className="pal-head">
          <Ico name="search" size={16} />
          <input
            ref={inputRef}
            className="pal-input"
            placeholder="Search 83 chapters, 31 playbooks, 16 modules, 120 lessons…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search everything"
          />
          <button className="pal-esc" onClick={onClose} aria-label="Close search">esc</button>
        </div>

        <div className="pal-list" ref={listRef}>
          {!q && results.length > 0 && <div className="pal-group">Start here</div>}
          {q && navHits.length > 0 && <div className="pal-group">Jump to</div>}
          {rows.map((row, i) => (
            row.kind === 'action' ? (
              <button
                key={row.id}
                className={`pal-row pal-action ${i === cursor ? 'active' : ''}`}
                onMouseEnter={() => setCursor(i)}
                onClick={() => onNav(row.view)}
              >
                <span className="pal-ico"><Ico name={row.icon} size={14} /></span>
                <span className="pal-main"><span className="pal-title">{row.label}</span></span>
              </button>
            ) : (
              <button
                key={row.id}
                className={`pal-row pal-result ${i === cursor ? 'active' : ''}`}
                onMouseEnter={() => setCursor(i)}
                onClick={() => onPick(row)}
              >
                <span className="pal-type">{KIND_LABEL[row.kind] || row.kind}</span>
                <span className="pal-main">
                  <span className="pal-title">{row.title}</span>
                  <span className="pal-blurb">{row.blurb}</span>
                </span>
                {row.category && <span className="pal-cat">{row.category}</span>}
              </button>
            )
          ))}
          {q && rows.length === 0 && (
            <div className="pal-none">
              Nothing for “{q}”. Try a single word — <em>silence</em>, <em>price</em>, <em>grief</em>, <em>callback</em>.
            </div>
          )}
          {!q && rows.length === 0 && <div className="pal-none">Search is still indexing…</div>}
        </div>

        <div className="pal-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> move</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>esc</kbd> close</span>
          <span className="pal-hint">Tap the search field on any page, or press ⌘K / Ctrl-K</span>
        </div>
      </div>
    </div>
  );
}
