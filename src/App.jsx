import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { api } from './api';
import { downloadBackup } from './local/backup';
import { Ico, Toast } from './components/ui';
import { SHORTCUTS } from './components/CommandPalette';
import { useFocusTrap } from './hooks-focus';
import Today from './views/Today';
import Notes from './views/Notes';
import Dashboard from './views/Dashboard';
import Courses from './views/Courses';
import Impromptu from './views/Impromptu';
import Pronunciation from './views/Pronunciation';
import Wit from './views/Wit';
import Arena from './views/Arena';
import BodyDecoder from './views/BodyDecoder';
import Library from './views/Library';
import Glossary from './views/Glossary';
import Games from './views/Games';
import Frameworks from './views/Frameworks';
import Academy from './views/Academy';
import Gym from './views/Gym';
import MyScripts from './views/MyScripts';
import Start from './views/Start';
import Progress from './views/Progress';
import Settings from './views/Settings';
import CommandPalette from './components/CommandPalette';
import { buildIndex } from './local/search';
import { attachReadAloud } from './local/read-aloud';
import Coach from './views/Coach';
import Daily from './views/Daily';
import Skills from './views/Skills';
import Creator from './views/Creator';
import Psychology from './views/Psychology';
import Stories from './views/Stories';

const GOTO = {
  t: 'today', g: 'gym', i: 'impromptu', l: 'library', n: 'notes', p: 'progress',
  d: 'daily', c: 'coach', a: 'arena', s: 'skills', f: 'frameworks', w: 'wit',
  k: 'courses', y: 'scripts', b: 'body', e: 'settings', o: 'start', r: 'progress', h: 'psychology',
  j: 'stories',
};

const NAV = [
  { key: 'today', label: 'Today', icon: 'flame', group: 'Overview' },
  { key: 'start', label: 'Start Here', icon: 'compass', group: 'Overview' },
  { key: 'dashboard', label: 'Dashboard', icon: 'dashboard', group: 'Overview' },
  { key: 'progress', label: 'Progress', icon: 'spark', group: 'Overview' },
  { key: 'daily', label: 'Daily Dojo', icon: 'spark', group: 'Training' },
  { key: 'courses', label: 'Courses', icon: 'book', group: 'Training' },
  { key: 'skills', label: 'Skill Tracks', icon: 'target', group: 'Training' },
  { key: 'psychology', label: 'Psychology', icon: 'brain', group: 'Training' },
  { key: 'stories', label: 'Stories', icon: 'book', group: 'Training', badge: 'NEW' },
  { key: 'frameworks', label: 'Frameworks', icon: 'brain', group: 'Training' },
  { key: 'academy', label: 'Academy', icon: 'book', group: 'Training' },
  { key: 'gym', label: 'Conversation Gym', icon: 'target', group: 'Practice', badge: 'NEW' },
  { key: 'scripts', label: 'My Scripts', icon: 'pen', group: 'Practice' },
  { key: 'notes', label: 'Notes', icon: 'pen', group: 'Practice' },
  { key: 'games', label: 'Games', icon: 'bolt', group: 'Practice' },
  { key: 'coach', label: 'Coach', icon: 'chat', group: 'Practice', badge: 'AI' },
  { key: 'creator', label: 'Creator Studio', icon: 'pen', group: 'Create' },
  { key: 'impromptu', label: 'Impromptu Lab', icon: 'mic', group: 'Training' },
  { key: 'pronunciation', label: 'Pronunciation Lab', icon: 'wave', group: 'Training' },
  { key: 'wit', label: 'Wit & Banter', icon: 'spark', group: 'Practice' },
  { key: 'arena', label: 'Conversation Arena', icon: 'chat', group: 'Practice', badge: 'AI' },
  { key: 'body', label: 'Body Decoder', icon: 'eye', group: 'Practice' },
  { key: 'glossary', label: 'Glossary', icon: 'book', group: 'Reference', badge: 'NEW' },
  { key: 'library', label: 'Resource Library', icon: 'library', group: 'Reference' },
  { key: 'settings', label: 'Backup & Settings', icon: 'gear', group: 'Reference' },
];

const TITLES = {
  today: ['Today', 'One decision, one drill, one line. What to do in the next ten minutes.'],
  notes: ['Notes & Highlights', 'Everything you saved while reading, plus whether you actually used it.'],
  start: ['Start Here', 'Twelve honest questions, then a route through the other twenty pages.'],
  progress: ['Progress', 'What is improving, what has gone quiet, and what to do in the next ten minutes.'],
  glossary: ['Glossary', 'The words this app uses — frame, BATNA, mirroring, upspeak — defined plainly, with where each one actually comes from and how it gets misused.'],
  settings: ['Backup & Settings', 'Your progress lives in this browser. Here is how to keep it, move it, and erase it.'],
  dashboard: ['Command Center', 'Your streak, your progress, your next rep.'],
  daily: ['Daily Dojo', 'Three short reps a day. Nothing locked, no streak required.'],
  skills: ['Skill Tracks', 'Eight skills: sales, persuasion, flirting, negotiation, presence, hard conversations, interviews, hosting.'],
  academy: ['Academy', 'Eighteen modules in three levels, eight to fifteen minutes each. Start at Foundations; the hard ones say what to read first.'],
  gym: ['Conversation Gym', 'Real situations, step-by-step scripts, and the exact lines to say. Spaced review built in.'],
  scripts: ['My Scripts', 'Your own lines: write them, tag them, rehearse them until they are automatic.'],
  
  frameworks: ['Frameworks Vault', 'Thirty-four structures, their conditions, and how each one fails.'],
  psychology: ['Human Psychology', 'The mechanisms behind attention, trust and status — with the evidence, and the defence.'],
  stories: ['Stories That Land', 'Twenty-one tellable anecdotes, broken into beats — the turn, the proof, the ending, and when not to tell it.'],
  games: ['Interactive Games', 'Rapid reps with a timer and a score.'],
  coach: ['Coach', 'Describe the situation. Get the pattern, the fix and a drill.'],
  creator: ['Creator Studio', 'Pillars, hooks, formats and a four-week publishing plan.'],
  courses: ['Courses', 'Thirty days fast, ninety days deep.'],
  impromptu: ['Impromptu Speech Lab', 'Random prompt. Timer. Recording. Cold analysis.'],
  pronunciation: ['Tongue Twister & Pronunciation Lab', 'Speed, enunciation and articulation scoring.'],
  wit: ['Wit, Humor & Banter Simulator', 'Rapid retorts, callbacks and charm flips.'],
  arena: ['AI Conversation Arena', 'Live roleplay with dynamic responses.'],
  body: ['Body Language & Micro-Expression Decoder', 'Read the cluster, not the cue.'],
  library: ['Master Resource Library', 'Fallback patterns, frameworks, laws and rules.'],
};

// Every view is addressable: #/psychology, #/gym, #/library. The hash router
// exists because Back used to leave the app entirely — on a phone, the single
// most-used navigation gesture dumped you out of a 22-view product — and because
// a hash URL still works from a GitHub Pages subpath with no server rewrite.
const VIEW_KEYS = new Set(NAV.map((n) => n.key));
const hashView = () => {
  const raw = (window.location.hash || '').replace(/^#\/?/, '').split('?')[0];
  return VIEW_KEYS.has(raw) ? raw : null;
};

export default function App() {
  const [view, setView] = useState(() => hashView() || localStorage.getItem('cl.view') || 'today');
  const [content, setContent] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [toast, setToast] = useState(null);
  // offline state and a waiting service worker, both surfaced in the top bar
  const [offline, setOffline] = useState(typeof navigator !== 'undefined' && navigator.onLine === false);
  const [updateReady, setUpdateReady] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const gPressed = useRef(false);
  // `go` is declared further down; the key handler reads it through a ref so
  // the listener can be installed once without touching a TDZ binding
  const goRef = useRef(null);
  const [boot, setBoot] = useState(null); // deep-link payload e.g. {view:'impromptu', promptId}
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [navTick, setNavTick] = useState(0); // bumps when a view is re-entered with a payload
  const [index, setIndex] = useState(null);

  const notify = useCallback((msg) => {
    setToast(msg);
    window.clearTimeout(notify._t);
    notify._t = window.setTimeout(() => setToast(null), 2600);
  }, []);

  const refresh = useCallback(async () => {
    try {
      const s = await api.bootstrap();
      setStats(s);
    } catch (e) { /* keep old */ }
  }, []);

  // The search index used to be built at boot on every device: 539 records and
  // ~950 KB of strings, which is a visible stall on a mid-range phone for a
  // surface most sessions never open. It is now built the first time the
  // palette is opened, and lesson prose is pulled in afterwards — so ⌘K pays
  // for itself and every other view pays nothing.
  const [indexReady, setIndexReady] = useState(false);
  useEffect(() => {
    if (!paletteOpen || index || !content) return;
    let dead = false;
    // yield a frame first, so the palette paints its "indexing" state instead
    // of blocking on the build
    const t = setTimeout(() => {
      if (dead) return;
      setIndex(buildIndex(content));
      setIndexReady(true);
      (async () => {
        try {
          const [fast, deep] = await Promise.all([api.track('fast'), api.track('deep')]);
          if (dead) return;
          const lessons = { fast: fast.lessons || {}, deep: deep.lessons || {} };
          setIndex(buildIndex(content, lessons));
        } catch { /* lessons are a bonus; keep the content-only index */ }
      })();
    }, 16);
    return () => { dead = true; clearTimeout(t); };
  }, [paletteOpen, content, index]);

  // ⌘K / Ctrl-K opens the palette from anywhere; "/" does too.
  useEffect(() => {
    const onKey = (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target?.tagName || '') || e.target?.isContentEditable;
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setPaletteOpen(true); return; }
      if (e.key === '/' && !typing) { e.preventDefault(); setPaletteOpen(true); return; }
      if (e.key === 'Escape') { setNavOpen(false); return; }
      if (typing || e.metaKey || e.ctrlKey || e.altKey) return;

      // `g` then a letter jumps to a view — the standard shortcut grammar, and
      // the only fast way to reach a practice view from a phone-free keyboard
      if (gPressed.current) {
        gPressed.current = false;
        const dest = GOTO[e.key.toLowerCase()];
        if (dest) { e.preventDefault(); goRef.current?.(dest); }
        return;
      }
      if (e.key.toLowerCase() === 'g') { gPressed.current = true; setTimeout(() => { gPressed.current = false; }, 1200); return; }
      if (e.key === '?' || (e.key === '/' && e.shiftKey)) { e.preventDefault(); setShortcutsOpen((v) => !v); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const [c, s] = await Promise.all([api.content(), api.bootstrap()]);
        setContent(c);
        setStats(s);
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // First visit: send people to Start Here rather than a dashboard of numbers
  // they have not earned yet. One flag, never repeated, and dismissible.
  useEffect(() => {
    if (loading || err) return;
    if (localStorage.getItem('cl.seenStart')) return;
    try { localStorage.setItem('cl.seenStart', '1'); } catch { /* quota */ }
    if (!localStorage.getItem('cl.view')) setView('start');
  }, [loading, err]);

  useEffect(() => {
    localStorage.setItem('cl.view', view);
    setNavOpen(false);
    window.scrollTo(0, 0);
    // keep the address bar in step, without stacking a history entry per rep
    const want = `#/${view}`;
    if (window.location.hash !== want) {
      try { window.history.pushState({ view }, '', want); } catch { window.location.hash = want; }
    }
  }, [view]);

  // Back / Forward move between views instead of leaving the app.
  useEffect(() => {
    const onHash = () => {
      const v = hashView();
      if (v && v !== viewRef.current) {
        setBoot(null);
        setView(v);
      }
    };
    window.addEventListener('hashchange', onHash);
    window.addEventListener('popstate', onHash);
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('popstate', onHash);
    };
  }, []);
  // keep the key handler's handle on `go` current without re-binding the listener
  useEffect(() => { goRef.current = go; });
  // the hashchange listener is installed once, so it reads the live view through a ref
  const shortcutsRef = useRef(null);
  useFocusTrap(shortcutsOpen, shortcutsRef, null);
  const viewRef = useRef(view);
  useEffect(() => { viewRef.current = view; }, [view]);

  // every scripted line in the app is tappable and read aloud
  useEffect(() => attachReadAloud(document.body), []);

  // Connection and update state. Both are quiet on purpose: an offline badge
  // rather than an error, and one "reload" chip rather than a modal.
  useEffect(() => {
    const on = () => setOffline(false);
    const off = () => setOffline(true);
    const updated = () => setUpdateReady(true);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    window.addEventListener('cl:update-ready', updated);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
      window.removeEventListener('cl:update-ready', updated);
    };
  }, []);

  const go = (v, payload) => {
    setView(v);
    setBoot(payload || null);
    // re-entering the same view with a payload has to remount it, or the
    // deep link is silently ignored (e.g. Search → the playbook you are in)
    if (payload) setNavTick((t) => t + 1);
  };

  const progressMap = useMemo(() => {
    const m = { fast: {}, deep: {} };
    (stats?.progress || []).forEach((p) => { if (m[p.track]) m[p.track][p.day] = p; });
    return m;
  }, [stats]);

  const page = (() => {
    if (!content || !stats) return null;
    const common = { content, stats, refresh, notify, go, boot };
    switch (view) {
      case 'today': return <Today {...common} progress={progressMap} />;
      case 'notes': return <Notes {...common} />;
      case 'daily': return <Daily {...common} />;
      case 'skills': return <Skills {...common} />;
      case 'psychology': return <Psychology {...common} boot={boot} />;
      case 'stories': return <Stories {...common} boot={boot} />;
      case 'frameworks': return <Frameworks {...common} />;
      case 'academy': return <Academy {...common} />;
      case 'gym': return <Gym {...common} />;
      case 'scripts': return <MyScripts {...common} boot={boot} params={boot} />;
      case 'start': return <Start {...common} />;
      case 'progress': return <Progress {...common} />;
      case 'settings': return <Settings {...common} onWipe={() => localStorage.clear()} />;
      case 'games': return <Games {...common} />;
      case 'coach': return <Coach {...common} boot={boot} />;
      case 'creator': return <Creator {...common} />;
      case 'courses': return <Courses {...common} progress={progressMap} boot={boot} />;
      case 'impromptu': return <Impromptu {...common} boot={boot} />;
      case 'pronunciation': return <Pronunciation {...common} />;
      case 'wit': return <Wit {...common} boot={boot} />;
      case 'arena': return <Arena {...common} />;
      case 'body': return <BodyDecoder {...common} boot={boot} />;
      case 'library': return <Library {...common} boot={boot} />;
      case 'glossary': return <Glossary {...common} boot={boot} />;
      default: return <Dashboard {...common} progress={progressMap} />;
    }
  })();

  const groups = [];
  NAV.forEach((n) => {
    let g = groups.find((x) => x.name === n.group);
    if (!g) groups.push((g = { name: n.group, items: [] }));
    g.items.push(n);
  });

  return (
    <div className="shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className={`scrim ${navOpen ? 'show' : ''}`} onClick={() => setNavOpen(false)} />
      <aside className={`sidebar ${navOpen ? 'open' : ''}`} aria-label="Main navigation">
        <div className="brand">
          <div className="brand-mark">C</div>
          <div>
            <div className="brand-name">Charisma Lab</div>
            <div className="brand-sub">Speaking OS</div>
          </div>
        </div>

        {groups.map((g) => (
          <div key={g.name}>
            <div className="nav-label">{g.name}</div>
            {g.items.map((n) => (
              <button key={n.key} className={`nav-item ${view === n.key ? 'active' : ''}`} onClick={() => go(n.key)}
                aria-current={view === n.key ? 'page' : undefined}>
                <span className="nav-ico"><Ico name={n.icon} size={16} /></span>
                {n.label}
                {n.badge && <span className="nav-badge">{n.badge}</span>}
              </button>
            ))}
          </div>
        ))}

        <div className="sidebar-foot" data-testid="xp-foot">
          {stats && (
            <div className="xp-mini">
              <div className="xp-mini-row">
                <span>Level {stats.level}</span>
                <span>{stats.user.xp} XP</span>
              </div>
              <div className="bar"><i style={{ width: `${stats.levelProgress * 100}%` }} /></div>
              <div className="tiny dim" style={{ marginTop: 7 }}>{stats.xpToNext} XP to level {stats.level + 1}</div>
            </div>
          )}
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <button className="hamburger" onClick={() => setNavOpen((v) => !v)} aria-label="Menu"><Ico name="menu" size={17} /></button>
          <div>
            <h1>{TITLES[view]?.[0] || 'Charisma Lab'}</h1>
            <div className="topbar-sub">{TITLES[view]?.[1] || ''}</div>
          </div>
          <div className="topbar-right">
            {updateReady && (
              <button className="chip clickable" style={{ fontSize: 10 }} title="A newer version is installed and ready"
                onClick={() => window.dispatchEvent(new Event('cl:apply-update'))}>
                <Ico name="refresh" size={11} /> reload to update
              </button>
            )}
            {offline && (
              <span className="chip amber" style={{ fontSize: 10 }} role="status"
                title="You are offline. Everything on this device still works; AI replies and links to other sites do not.">
                <Ico name="wave" size={11} /> offline · still works
              </span>
            )}
            <button className="search-trigger" onClick={() => setPaletteOpen(true)} aria-label="Search everything">
              <Ico name="search" size={14} />
              <span>Search everything</span>
              <kbd>⌘K</kbd>
            </button>
            {stats && (
              <div className="streak-pill" title="Current daily streak">
                <Ico name="flame" size={14} /> {stats.streak.current} day{stats.streak.current === 1 ? '' : 's'}
              </div>
            )}
            <div className="avatar">{(stats?.user?.name || 'S').slice(0, 1).toUpperCase()}</div>
          </div>
        </header>

        <main id="main" tabIndex={-1} className="content fade-in" key={boot ? `${view}:${navTick}` : view}>
          {loading && (
            <div className="card center" style={{ padding: 50 }}>
              <div className="row" style={{ justifyContent: 'center', gap: 12 }}>
                <span className="spin" /> <span className="muted">Warming up the lab…</span>
              </div>
            </div>
          )}
          {err && !loading && (
            <div className="card">
              <div className="card-title">The app could not load its content</div>
              <p className="card-desc">
                {err}. This build runs entirely in the browser, so the usual cause is a half-downloaded page — a hard
                refresh (Ctrl-Shift-R, or Cmd-Shift-R on a Mac) fixes it almost every time.
              </p>
              <button className="btn sm" style={{ marginTop: 10 }} onClick={() => window.location.reload()}>
                <Ico name="refresh" size={12} /> Reload
              </button>
            </div>
          )}
          {page}
        </main>
      </div>

      {paletteOpen && (
        <CommandPalette
          open={paletteOpen}
          index={index}
          indexing={paletteOpen && !indexReady}
          onClose={() => setPaletteOpen(false)}
          onNav={(v) => { setPaletteOpen(false); go(v); }}
          onPick={(row) => { setPaletteOpen(false); go(row.route, row.payload); }}
        />
      )}

      {shortcutsOpen && (
        <div className="modal-scrim show" onClick={() => setShortcutsOpen(false)} role="presentation">
          <div className="modal" role="dialog" aria-modal="true" aria-label="Keyboard shortcuts" ref={shortcutsRef} onClick={(e) => e.stopPropagation()}>
            <div className="row" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
              <div className="card-title" style={{ margin: 0 }}>Keyboard shortcuts</div>
              <button className="icon-btn" onClick={() => setShortcutsOpen(false)} aria-label="Close shortcuts"><Ico name="x" size={14} /></button>
            </div>
            <div className="stack sm">
              {SHORTCUTS.map((s2) => (
                <div key={s2.keys} className="row" style={{ justifyContent: 'space-between', gap: 10 }}>
                  <span className="tiny">{s2.label}</span>
                  <kbd>{s2.keys}</kbd>
                </div>
              ))}
            </div>
            <p className="tiny dim" style={{ marginTop: 14, marginBottom: 0 }}>
              Most screens also answer to Enter for their main action. Everything works with a keyboard alone.
            </p>
          </div>
        </div>
      )}

      <div className="sr-only" role="status" aria-live="polite">{boot ? `${TITLES[view]?.[0] || view} view` : ''}</div>
      <Toast msg={toast} />
    </div>
  );
}
