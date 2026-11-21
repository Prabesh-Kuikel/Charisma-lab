import React, { useMemo, useState } from 'react';
import { api } from '../api';
import { Ico } from '../components/ui';
import { planForDate } from '../../server/content/daily.js';
import { getDaily, markDaily } from '../local/progress-log.js';

const SKILL_TONE = { presence: 'mint', storytelling: 'cyan', sales: 'rose', humour: 'amber', persuasion: 'violet', negotiation: 'cyan', flirting: 'amber', creator: 'orange' };

export default function Daily({ content, notify, go, stats }) {
  const daily = content.daily || { drills: [], themes: [] };
  const [dateKey, setDateKey] = useState(() => new Date().toISOString().slice(0, 10));
  const [dateKeyState, setDateKeyState] = useState(null);
  const [done, setDone] = useState(() => getDaily());
  const [filter, setFilter] = useState('All');

  const plan = useMemo(() => planForDate(new Date(dateKey + 'T12:00:00Z')), [dateKey]);
  const listed = useMemo(
    () => daily.drills.filter((d) => filter === 'All' || d.skill === filter),
    [daily.drills, filter],
  );
  const skills = useMemo(() => ['All', ...new Set(daily.drills.map((d) => d.skill))], [daily.drills]);

  // reload the persisted ticks whenever the visible date changes
  React.useEffect(() => { setDone(getDaily(dateKey)); }, [dateKey]);

  const mark = async (drill) => {
    if (done.includes(drill.id)) return;
    setDone(markDaily(drill.id, dateKey));
    try {
      await api.logXp({ kind: `daily-${drill.skill}`, xp: 10 });
      notify(`Logged · ${drill.title}`);
    } catch (e) { notify(e.message); }
  };

  const shiftDay = (delta) => {
    const d = new Date(dateKey + 'T12:00:00Z');
    d.setUTCDate(d.getUTCDate() + delta);
    setDateKey(d.toISOString().slice(0, 10));
  };

  return (
    <div className="stack">
      <div className="card">
        <div className="row wrap" style={{ justifyContent: 'space-between', gap: 10 }}>
          <div>
            <div className="card-title" style={{ marginBottom: 2 }}>
              <Ico name="spark" size={15} /> Today · {plan.theme.name}
            </div>
            <div className="card-desc">{plan.focus} — nothing is locked, nothing depends on your streak.</div>
          </div>
          <div className="row" style={{ gap: 6 }}>
            <button className="btn ghost sm" onClick={() => shiftDay(-1)}>←</button>
            <span className="chip">{dateKey}</span>
            <button className="btn ghost sm" onClick={() => shiftDay(1)}>→</button>
            <button className="btn sm" onClick={() => setDateKey(new Date().toISOString().slice(0, 10))}>Today</button>
          </div>
        </div>
      </div>

      <div className="grid g3">
        {plan.drills.map((d) => (
          <div className="card" key={d.id}>
            <div className="row" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
              <span className={`chip ${SKILL_TONE[d.skill] || 'violet'}`} style={{ fontSize: 10 }}>{d.skill}</span>
              <span className="tiny dim">{d.time} min</span>
            </div>
            <div className="card-title" style={{ marginBottom: 6 }}>{d.title}</div>
            <p className="card-desc">{d.do}</p>
            <div className="tiny" style={{ margin: '10px 0', color: 'var(--mint)' }}>Done when: {d.success}</div>
            <button className={`btn sm ${done.includes(d.id) ? '' : 'primary'}`} disabled={done.includes(d.id)}
              onClick={() => mark(d)}>
              <Ico name="check" size={13} /> {done.includes(d.id) ? 'Logged' : 'Log this rep'}
            </button>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-title">Weekly challenge</div>
        <p className="card-desc">{plan.challenge}</p>
      </div>

      <div className="card">
        <div className="row wrap" style={{ gap: 6, marginBottom: 12 }}>
          {skills.map((s) => (
            <button key={s} className={`chip clickable ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>
              {s} <span className="dim">{s === 'All' ? daily.drills.length : daily.drills.filter((d) => d.skill === s).length}</span>
            </button>
          ))}
        </div>
        <div className="stack sm">
          {listed.map((d) => (
            <div className="list-row" key={d.id} style={{ alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div className="row wrap" style={{ gap: 6, marginBottom: 4 }}>
                  <strong style={{ fontSize: 12.5 }}>{d.title}</strong>
                  <span className={`chip ${SKILL_TONE[d.skill] || 'violet'}`} style={{ fontSize: 9.5 }}>{d.skill}</span>
                  <span className="tiny dim">{d.time} min</span>
                </div>
                <div className="tiny dim">{d.do}</div>
              </div>
              <button className={`btn sm ${done.includes(d.id) ? 'ghost' : ''}`} onClick={() => mark(d)} disabled={done.includes(d.id)}>
                {done.includes(d.id) ? '✓' : 'Log'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">Prefer to pick your own?</div>
        <p className="card-desc" style={{ marginBottom: 10 }}>
          Every course day is open from the first minute — start on Day 63 if that is what you need today.
        </p>
        <div className="row wrap" style={{ gap: 6 }}>
          <button className="chip clickable" onClick={() => go('courses')}>All 120 course days</button>
          <button className="chip clickable" onClick={() => go('skills')}>Skill tracks</button>
          <button className="chip clickable" onClick={() => go('games')}>Games</button>
        </div>
      </div>
    </div>
  );
}
