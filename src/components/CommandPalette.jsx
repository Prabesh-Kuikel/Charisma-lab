import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Ico } from './ui';
import { search, suggestions, KIND_LABEL } from '../local/search';
import { useFocusTrap } from '../hooks-focus';

// Was eight destinations out of twenty-two, so half the app was unreachable
// from the thing whose whole job is "search everything". The list is generated
// from the same table the sidebar uses, so it cannot drift again.
const NAV_ACTIONS = [
  ['today', 'Today', 'flame', 'the next rep, due reviews and your log'],
  ['start', 'Start Here', 'compass', 'the assessment and the five-minute tour'],
  ['dashboard', 'Dashboard', 'dashboard', ''],
  ['progress', 'Progress', 'trophy', 'trend, coverage, the practice log'],
  ['daily', 'Daily Dojo', 'spark', 'the daily drill'],
  ['courses', 'Courses', 'book', '30-day and 90-day programs'],
  ['skills', 'Skill Tracks', 'target', 'eight tracks, forty exercises'],
  ['psychology', 'Human Psychology', 'brain', 'twenty-nine mechanisms, the evidence and the defence'],
  ['stories', 'Stories That Land', 'book', 'twenty-one stories broken into beats'],
  ['frameworks', 'Frameworks', 'dashboard', 'thirty-four named structures'],
  ['academy', 'Academy', 'book', 'sixteen modules, sixty-six drills'],
  ['impromptu', 'Impromptu Lab', 'mic', '100 prompts, timed and scored'],
  ['pronunciation', 'Pronunciation Lab', 'wave', 'twisters, pangrams, accuracy'],
  ['gym', 'Conversation Gym', 'target', 'forty-one playbooks'],
  ['scripts', 'My Scripts', 'pen', 'your own lines, rehearsed'],
  ['notes', 'Notes & Highlights', 'pen', 'everything you saved while reading'],
  ['games', 'Games', 'bolt', 'ten scored word games'],
  ['coach', 'Coach', 'chat', 'AI or the rules engine'],
  ['wit', 'Wit & Banter', 'spark', 'thirty-eight comeback scenarios'],
  ['arena', 'Conversation Arena', 'chat', 'live personas, scored'],
  ['body', 'Body Decoder', 'eye', 'forty-eight cues'],
  ['creator', 'Creator Studio', 'bolt', 'hooks, formats, a four-week plan'],
  ['library', 'Resource Library', 'library', 'ninety-one chapters'],
  ['settings', 'Backup, restore & settings', 'gear', 'export, import, clear'],
].map(([view, label, icon, hint]) => ({ id: `nav:${view}`, view, label: `Go to ${label}`, short: label, icon, hint }));

// Keyboard shortcuts, so the fast paths do not need the palette at all.
export const SHORTCUTS = [
  { keys: 'g then t', label: 'Today' }, { keys: 'g then g', label: 'Conversation Gym' },
  { keys: 'g then i', label: 'Impromptu Lab' }, { keys: 'g then l', label: 'Resource Library' },
  { keys: 'g then n', label: 'Notes' }, { keys: 'g then p', label: 'Progress' },
  { keys: 'g then d', label: 'Daily Dojo' }, { keys: 'g then c', label: 'Coach' }, { keys: 'g then h', label: 'Human Psychology' }, { keys: 'g then j', label: 'Stories' },
  { keys: '⌘K / Ctrl-K', label: 'Search everything' }, { keys: '?', label: 'This list' },
];

export default function CommandPalette({ open, onClose, index, onPick, onNav, indexing }) {
  const [q, setQ] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const dialogRef = useRef(null);

  // A dialog that traps nothing is a dialog for nobody: before this, Tab walked
  // out of the palette and into the page behind it, and closing it dropped focus
  // back to the top of the document instead of the button that opened it.
  useFocusTrap(open, dialogRef, inputRef);

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
    return NAV_ACTIONS
      .filter((a) => a.label.toLowerCase().includes(t) || a.hint.includes(t))
      .sort((a, b) => (a.short.toLowerCase().startsWith(t) ? -1 : 0) - (b.short.toLowerCase().startsWith(t) ? -1 : 0))
      .slice(0, 5);
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
      <div className="pal" role="dialog" aria-modal="true" aria-label="Search everything" ref={dialogRef} onMouseDown={(e) => e.stopPropagation()}>
        <div className="pal-head">
          <Ico name="search" size={16} />
          <input
            ref={inputRef}
            className="pal-input"
            placeholder="Search chapters, playbooks, personas, prompts, drills…"
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
          {rows.length === 0 && (indexing || !index) && <div className="pal-none">Building the index — once per session, then it is instant…</div>}
        </div>

        <div className="pal-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> move</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>esc</kbd> close</span>
          <span className="pal-hint">g then t / g / i / l / n / p to jump · ? for all shortcuts</span>
        </div>
      </div>
    </div>
  );
}
