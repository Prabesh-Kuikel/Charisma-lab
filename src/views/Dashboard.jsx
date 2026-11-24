import React, { useMemo } from 'react';
import { Ico, Ring, Bar, Stat } from '../components/ui';
import { dueItems } from '../local/srs';

const LAUNCHERS = [
  { key: 'today', icon: 'flame', tone: '#f472b6', name: 'Today', desc: 'One decision, one drill, one line', view: 'today' },
  { key: 'impromptu', icon: 'mic', tone: '#8b5cf6', name: 'Impromptu Sprint', desc: 'Random prompt, 60–150s timer, instant analysis', view: 'impromptu' },
  { key: 'pronunciation', icon: 'wave', tone: '#22d3ee', name: 'Twister Speed Run', desc: 'Articulation drill with accuracy scoring', view: 'pronunciation' },
  { key: 'wit', icon: 'spark', tone: '#fb923c', name: 'Banter Reps', desc: 'Live scenarios in every register, scored in a minute', view: 'wit' },
  { key: 'arena', icon: 'chat', tone: '#34d399', name: 'Arena Run', desc: 'Roleplay with a persona that reacts to you', view: 'arena' },
  { key: 'body', icon: 'eye', tone: '#fbbf24', name: 'Cue Spotting', desc: '48 decoder cards, psychology breakdowns', view: 'body' },
  { key: 'library', icon: 'library', tone: '#a78bfa', name: 'Pattern Library', desc: 'Fallbacks, frameworks, power laws, rules', view: 'library' },
];

function heatLevel(n) { return n === 0 ? '' : n === 1 ? 'l1' : n <= 3 ? 'l2' : n <= 6 ? 'l3' : 'l4'; }

export default function Dashboard({ content, stats, progress, go }) {
  const activeTrack = stats.progress.filter((p) => p.track === 'fast').length >= 30 ? 'deep' : 'fast';

  const nextDay = useMemo(() => {
    const track = activeTrack;
    const done = progress[track] || {};
    const list = content.tracks.find((t) => t.id === track);
    for (let d = 1; d <= list.dayCount; d++) if (!done[d]) return { track, day: d };
    return { track: 'deep', day: 1 };
  }, [progress, activeTrack, content.tracks]);

  const fastDone = Object.keys(progress.fast || {}).length;
  const deepDone = Object.keys(progress.deep || {}).length;
  const avgScore = useMemo(() => {
    const s = stats.byKind.filter((k) => k.avg != null && ['impromptu', 'wit', 'arena', 'pronunciation'].includes(k.kind));
    if (!s.length) return 0;
    const totalN = s.reduce((a, b) => a + b.n, 0);
    return Math.round(s.reduce((a, b) => a + b.avg * b.n, 0) / totalN);
  }, [stats.byKind]);

  // heatmap: last 12 weeks (84 days), weeks as columns, days as rows
  const heat = useMemo(() => {
    const map = Object.fromEntries(stats.days.map((d) => [d.day, d.sessions]));
    const cells = [];
    const start = new Date();
    start.setDate(start.getDate() - 83);
    // align to Monday
    const offset = (start.getDay() + 6) % 7;
    start.setDate(start.getDate() - offset);
    for (let i = 0; i < 91; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      cells.push({ key, n: map[key] || 0, future: d > new Date() });
    }
    return cells;
  }, [stats.days]);

  const tip = content.library[(new Date().getDate() * 3) % content.library.length];
  const dueGym = useMemo(() => dueItems((content.gym || []).map((g) => g.id)), [content.gym]);
  const assessed = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('charisma-lab.assessment.v1') || 'null'); } catch { return null; }
  }, []);
  const hour = new Date().getHours();
  const greeting = hour < 5 ? 'Still up' : hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <>
      <section className="hero">
        <div className="row wrap" style={{ gap: 8, marginBottom: 12 }}>
          <span className="chip violet"><Ico name="bolt" size={11} /> Level {stats.level}</span>
          <span className="chip orange"><Ico name="flame" size={11} /> {stats.streak.current} day streak</span>
          <span className="chip mint"><Ico name="check" size={11} /> {stats.totalSessions} reps logged</span>
        </div>
        <h2>{greeting}, {stats.user.name}.</h2>
        <p>
          {stats.streak.current === 0
            ? 'Your streak is waiting to start. One rep today is enough — the streak is the engine, not the score.'
            : `${stats.streak.current} day${stats.streak.current === 1 ? '' : 's'} in a row. Longest run: ${stats.streak.longest}. Today's rep keeps the identity alive.`}
          {fastDone > 0 && fastDone < 30 && ` You are ${30 - fastDone} days from finishing the Fast Track.`}
          {fastDone >= 30 && ` Fast Track complete. The Deep Dive is ${90 - deepDone} days of depth away.`}
        </p>
        <div className="hero-actions">
          <button className="btn primary lg" onClick={() => go('courses')}>
            <Ico name="play" size={15} /> Continue Day {nextDay.day} · {nextDay.track === 'fast' ? 'Fast Track' : 'Deep Dive'}
          </button>
          <button className="btn lg" onClick={() => go('impromptu')}><Ico name="mic" size={15} /> Random impromptu</button>
          <button className="btn lg ghost" onClick={() => go('arena')}><Ico name="chat" size={15} /> Enter the Arena</button>
        </div>
      </section>

      <div className="grid g4" style={{ marginTop: 16 }}>
        <Stat label="Daily streak" value={`${stats.streak.current}d`} note={`Longest: ${stats.streak.longest} day${stats.streak.longest === 1 ? '' : 's'}`} tone="orange" />
        <Stat label="Fast Track" value={`${fastDone}/30`} note={fastDone >= 30 ? 'Complete — move to Deep Dive' : `${Math.round((fastDone / 30) * 100)}% complete`} tone="violet" />
        <Stat label="Deep Dive" value={`${deepDone}/90`} note={`${Math.round((deepDone / 90) * 100)}% of the deep programme`} tone="cyan" />
        <Stat label="Avg. rep score" value={avgScore ? avgScore : '—'} note={avgScore ? 'Across labs and arena' : 'Take your first scored rep'} tone="mint" />
      </div>

      <div className="grid wide-side" style={{ marginTop: 16 }}>
        <div className="card">
          <div className="row" style={{ marginBottom: 14 }}>
            <div>
              <h3 className="card-title" style={{ marginBottom: 2 }}><Ico name="target" size={14} /> Consistency</h3>
              <p className="card-desc">Every square is a day of practice. Darker means more reps.</p>
            </div>
            <div className="spacer" />
            <div className="row tiny dim" style={{ gap: 5 }}>
              less
              <span style={{ width: 12, height: 12, borderRadius: 3, background: 'rgba(255,255,255,0.055)', display: 'inline-block' }} />
              <span style={{ width: 12, height: 12, borderRadius: 3, background: 'rgba(139,92,246,0.32)', display: 'inline-block' }} />
              <span style={{ width: 12, height: 12, borderRadius: 3, background: 'rgba(139,92,246,0.6)', display: 'inline-block' }} />
              <span style={{ width: 12, height: 12, borderRadius: 3, background: 'rgba(167,139,250,0.85)', display: 'inline-block' }} />
              <span style={{ width: 12, height: 12, borderRadius: 3, background: '#c4b5fd', display: 'inline-block' }} />
              more
            </div>
          </div>
          <div className="heat" style={{ overflowX: 'auto' }}>
            {heat.map((c, i) => (
              <i key={i} className={c.future ? '' : heatLevel(c.n)} title={`${c.key} · ${c.n} session${c.n === 1 ? '' : 's'}`} />
            ))}
          </div>

          <h2 className="section" style={{ marginTop: 22 }}>Quick exercise launchers<span className="rule" /></h2>
          <div className="grid g2" style={{ gap: 10 }}>
            {LAUNCHERS.map((l) => (
              <button key={l.key} className="launcher" onClick={() => go(l.view)}>
                <span className="launcher-ico" style={{ background: `${l.tone}1f`, color: l.tone, border: `1px solid ${l.tone}33` }}>
                  <Ico name={l.icon} size={17} />
                </span>
                <span>
                  <span className="launcher-name">{l.name}</span>
                  <span className="launcher-desc" style={{ display: 'block' }}>{l.desc}</span>
                </span>
                <span className="launcher-go"><Ico name="arrow" size={15} /></span>
              </button>
            ))}
          </div>
        </div>

        <div className="stack">
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: 12 }}><Ico name="book" size={14} /> Next up</h3>
            <div className="row" style={{ gap: 14 }}>
              <Ring value={(fastDone / 30) * 100} size={80} stroke={7} label={nextDay.track === 'fast' ? 'fast track' : 'deep dive'} suffix="%" />
              <div style={{ minWidth: 0 }}>
                <div className="stat-val" style={{ fontSize: 18 }}>Day {nextDay.day}</div>
                <div className="stat-note">{nextDay.track === 'fast' ? content.tracks[0].name : content.tracks[1].name}</div>
                <button className="btn sm primary" style={{ marginTop: 10 }} onClick={() => go('courses', { track: nextDay.track, day: nextDay.day })}>
                  Open module <Ico name="arrow" size={13} />
                </button>
              </div>
            </div>
            <div style={{ marginTop: 18 }}>
              <div className="row tiny dim" style={{ marginBottom: 6 }}><span>Fast Track</span><span className="spacer" /><span>{fastDone}/30</span></div>
              <Bar value={(fastDone / 30) * 100} />
              <div className="row tiny dim" style={{ margin: '12px 0 6px' }}><span>Deep Dive</span><span className="spacer" /><span>{deepDone}/90</span></div>
              <Bar value={(deepDone / 90) * 100} tone="mint" />
            </div>
          </div>

          <div className="card">
            <h3 className="card-title" style={{ marginBottom: 10 }}><Ico name="brain" size={14} /> Today's law</h3>
            <div className="chip violet" style={{ marginBottom: 9 }}>{tip.category}</div>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{tip.title}</div>
            <p className="card-desc">{tip.short} {tip.body.slice(0, 150)}…</p>
            <button className="btn sm" style={{ marginTop: 12 }} onClick={() => go('library')}>Read in library <Ico name="arrow" size={13} /></button>
          </div>

          <div className="card">
            <h3 className="card-title" style={{ marginBottom: 8 }}><Ico name="clock" size={14} /> Recent activity</h3>
            {stats.recent.length === 0 && <p className="card-desc">No reps yet. The first one takes 90 seconds.</p>}
            {stats.recent.slice(0, 6).map((r) => (
              <div className="list-row" key={r.id}>
                <span className="dot" style={{ background: r.score >= 75 ? '#34d399' : r.score >= 50 ? '#fbbf24' : '#8b5cf6' }} />
                <span style={{ textTransform: 'capitalize' }}>{r.kind}</span>
                <span className="dim tiny" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 110 }}>{r.ref || ''}</span>
                <span className="spacer" />
                <span className="mono tiny dim">{r.score ?? '—'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
