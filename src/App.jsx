import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { api } from './api';
import { downloadBackup } from './local/backup';
import { Ico, Toast } from './components/ui';
import Dashboard from './views/Dashboard';
import Courses from './views/Courses';
import Impromptu from './views/Impromptu';
import Pronunciation from './views/Pronunciation';
import Wit from './views/Wit';
import Arena from './views/Arena';
import BodyDecoder from './views/BodyDecoder';
import Library from './views/Library';
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

const NAV = [
  { key: 'start', label: 'Start Here', icon: 'compass', group: 'Overview' },
  { key: 'dashboard', label: 'Dashboard', icon: 'dashboard', group: 'Overview' },
  { key: 'progress', label: 'Progress', icon: 'spark', group: 'Overview' },
  { key: 'daily', label: 'Daily Dojo', icon: 'spark', group: 'Training' },
  { key: 'courses', label: 'Courses', icon: 'book', group: 'Training' },
  { key: 'skills', label: 'Skill Tracks', icon: 'target', group: 'Training' },
  { key: 'frameworks', label: 'Frameworks', icon: 'brain', group: 'Training' },
  { key: 'academy', label: 'Academy', icon: 'book', group: 'Training' },
  { key: 'gym', label: 'Conversation Gym', icon: 'target', group: 'Practice', badge: 'NEW' },
  { key: 'scripts', label: 'My Scripts', icon: 'pen', group: 'Practice' },
  { key: 'games', label: 'Games', icon: 'bolt', group: 'Practice' },
  { key: 'coach', label: 'Coach', icon: 'chat', group: 'Practice', badge: 'AI' },
  { key: 'creator', label: 'Creator Studio', icon: 'pen', group: 'Create' },
  { key: 'impromptu', label: 'Impromptu Lab', icon: 'mic', group: 'Training' },
  { key: 'pronunciation', label: 'Pronunciation Lab', icon: 'wave', group: 'Training' },
  { key: 'wit', label: 'Wit & Banter', icon: 'spark', group: 'Practice' },
  { key: 'arena', label: 'Conversation Arena', icon: 'chat', group: 'Practice', badge: 'AI' },
  { key: 'body', label: 'Body Decoder', icon: 'eye', group: 'Practice' },
  { key: 'library', label: 'Resource Library', icon: 'library', group: 'Reference' },
  { key: 'settings', label: 'Backup & Settings', icon: 'gear', group: 'Reference' },
];

const TITLES = {
  start: ['Start Here', 'Twelve honest questions, then a route through the other sixteen pages.'],
  progress: ['Progress', 'What is improving, what has gone quiet, and what to do in the next ten minutes.'],
  settings: ['Backup & Settings', 'Your progress lives in this browser. Here is how to keep it, move it, and erase it.'],
  dashboard: ['Command Center', 'Your streak, your progress, your next rep.'],
  daily: ['Daily Dojo', 'Three short reps a day. Nothing locked, no streak required.'],
  skills: ['Skill Tracks', 'Eight skills: sales, persuasion, flirting, negotiation, presence, hard conversations, interviews, hosting.'],
  academy: ['Academy', 'Sixteen modules: charisma, humour, flirting, small talk, difficult conversations, emotion, work, business, family, humour craft.'],
  gym: ['Conversation Gym', 'Real situations, step-by-step scripts, and the exact lines to say. Spaced review built in.'],
  scripts: ['My Scripts', 'Your own lines: write them, tag them, rehearse them until they are automatic.'],
  
  frameworks: ['Frameworks Vault', 'Twenty-three structures, their conditions, and how each one fails.'],
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

export default function App() {
  const [view, setView] = useState(() => localStorage.getItem('cl.view') || 'dashboard');
  const [content, setContent] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [toast, setToast] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
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

  // Build the global index once the content is in, pulling lesson text in
  // afterwards so the first paint is not blocked by 120 lessons.
  useEffect(() => {
    if (!content) return;
    let dead = false;
    setIndex(buildIndex(content));
    (async () => {
      try {
        const [fast, deep] = await Promise.all([api.track('fast'), api.track('deep')]);
        if (dead) return;
        const lessons = { fast: fast.lessons || {}, deep: deep.lessons || {} };
        setIndex(buildIndex(content, lessons));
      } catch { /* lessons are a bonus; keep the content-only index */ }
    })();
    return () => { dead = true; };
  }, [content]);

  // ⌘K / Ctrl-K opens the palette from anywhere; "/" does too.
  useEffect(() => {
    const onKey = (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target?.tagName || '') || e.target?.isContentEditable;
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setPaletteOpen(true); }
      else if (e.key === '/' && !typing) { e.preventDefault(); setPaletteOpen(true); }
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

  useEffect(() => { localStorage.setItem('cl.view', view); setNavOpen(false); window.scrollTo(0, 0); }, [view]);

  // every scripted line in the app is tappable and read aloud
  useEffect(() => attachReadAloud(document.body), []);

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
      case 'daily': return <Daily {...common} />;
      case 'skills': return <Skills {...common} />;
      case 'frameworks': return <Frameworks {...common} />;
      case 'academy': return <Academy {...common} />;
      case 'gym': return <Gym {...common} />;
      case 'scripts': return <MyScripts {...common} boot={boot} params={boot} />;
      case 'start': return <Start {...common} />;
      case 'progress': return <Progress {...common} />;
      case 'settings': return <Settings {...common} onWipe={() => localStorage.clear()} />;
      case 'games': return <Games {...common} />;
      case 'coach': return <Coach {...common} />;
      case 'creator': return <Creator {...common} />;
      case 'courses': return <Courses {...common} progress={progressMap} boot={boot} />;
      case 'impromptu': return <Impromptu {...common} boot={boot} />;
      case 'pronunciation': return <Pronunciation {...common} />;
      case 'wit': return <Wit {...common} />;
      case 'arena': return <Arena {...common} />;
      case 'body': return <BodyDecoder {...common} />;
      case 'library': return <Library {...common} boot={boot} />;
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
      <div className={`scrim ${navOpen ? 'show' : ''}`} onClick={() => setNavOpen(false)} />
      <aside className={`sidebar ${navOpen ? 'open' : ''}`}>
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
              <button key={n.key} className={`nav-item ${view === n.key ? 'active' : ''}`} onClick={() => go(n.key)}>
                <span className="nav-ico"><Ico name={n.icon} size={16} /></span>
                {n.label}
                {n.badge && <span className="nav-badge">{n.badge}</span>}
              </button>
            ))}
          </div>
        ))}

        <div className="sidebar-foot">
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

        <div className="content fade-in" key={boot ? `${view}:${navTick}` : view}>
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
        </div>
      </div>

      {paletteOpen && (
        <CommandPalette
          open={paletteOpen}
          index={index}
          onClose={() => setPaletteOpen(false)}
          onNav={(v) => { setPaletteOpen(false); go(v); }}
          onPick={(row) => { setPaletteOpen(false); go(row.route, row.payload); }}
        />
      )}

      <Toast msg={toast} />
    </div>
  );
}
