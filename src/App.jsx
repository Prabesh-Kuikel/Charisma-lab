import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { api } from './api';
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
import Coach from './views/Coach';
import Daily from './views/Daily';
import Skills from './views/Skills';
import Creator from './views/Creator';

const NAV = [
  { key: 'dashboard', label: 'Dashboard', icon: 'dashboard', group: 'Overview' },
  { key: 'daily', label: 'Daily Dojo', icon: 'spark', group: 'Training' },
  { key: 'courses', label: 'Courses', icon: 'book', group: 'Training' },
  { key: 'skills', label: 'Skill Tracks', icon: 'target', group: 'Training' },
  { key: 'frameworks', label: 'Frameworks', icon: 'brain', group: 'Training' },
  { key: 'academy', label: 'Academy', icon: 'book', group: 'Training' },
  { key: 'games', label: 'Games', icon: 'bolt', group: 'Practice' },
  { key: 'coach', label: 'Coach', icon: 'chat', group: 'Practice', badge: 'AI' },
  { key: 'creator', label: 'Creator Studio', icon: 'pen', group: 'Create' },
  { key: 'impromptu', label: 'Impromptu Lab', icon: 'mic', group: 'Training' },
  { key: 'pronunciation', label: 'Pronunciation Lab', icon: 'wave', group: 'Training' },
  { key: 'wit', label: 'Wit & Banter', icon: 'spark', group: 'Practice' },
  { key: 'arena', label: 'Conversation Arena', icon: 'chat', group: 'Practice', badge: 'AI' },
  { key: 'body', label: 'Body Decoder', icon: 'eye', group: 'Practice' },
  { key: 'library', label: 'Resource Library', icon: 'library', group: 'Reference' },
];

const TITLES = {
  dashboard: ['Command Center', 'Your streak, your progress, your next rep.'],
  daily: ['Daily Dojo', 'Three short reps a day. Nothing locked, no streak required.'],
  skills: ['Skill Tracks', 'Sales, persuasion, flirting, negotiation, presence.'],
  academy: ['Academy', 'Charisma, humour, tension, everyday talk, body language, psychology.'],
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

  useEffect(() => { localStorage.setItem('cl.view', view); setNavOpen(false); window.scrollTo(0, 0); }, [view]);

  const go = (v, payload) => { setView(v); setBoot(payload || null); };

  const progressMap = useMemo(() => {
    const m = { fast: {}, deep: {} };
    (stats?.progress || []).forEach((p) => { if (m[p.track]) m[p.track][p.day] = p; });
    return m;
  }, [stats]);

  const page = (() => {
    if (!content || !stats) return null;
    const common = { content, stats, refresh, notify, go };
    switch (view) {
      case 'daily': return <Daily {...common} />;
      case 'skills': return <Skills {...common} />;
      case 'frameworks': return <Frameworks {...common} />;
      case 'academy': return <Academy {...common} />;
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
            {stats && (
              <div className="streak-pill" title="Current daily streak">
                <Ico name="flame" size={14} /> {stats.streak.current} day{stats.streak.current === 1 ? '' : 's'}
              </div>
            )}
            <div className="avatar">{(stats?.user?.name || 'S').slice(0, 1).toUpperCase()}</div>
          </div>
        </header>

        <div className="content fade-in" key={view}>
          {loading && (
            <div className="card center" style={{ padding: 50 }}>
              <div className="row" style={{ justifyContent: 'center', gap: 12 }}>
                <span className="spin" /> <span className="muted">Warming up the lab…</span>
              </div>
            </div>
          )}
          {err && !loading && (
            <div className="card">
              <div className="card-title">Backend not reachable</div>
              <p className="card-desc">{err}. Start the API with <code className="mono">npm run dev:api</code> and the UI with <code className="mono">npm run dev</code>.</p>
            </div>
          )}
          {page}
        </div>
      </div>

      <Toast msg={toast} />
    </div>
  );
}
