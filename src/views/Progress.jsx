import React, { useMemo } from 'react';
import { Ico, Bar } from '../components/ui';
import { scoreTrend, improvements, coverage, neglected, recommend, sparkPath, KIND_NAME } from '../local/insights';
import { loadSrs, dueItems } from '../local/srs';
import { allScripts } from '../local/my-scripts';

const fmt = (d) => new Date(d).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

export default function Progress({ content, stats, go }) {
  const sessions = useMemo(() => stats?.sessions || [], [stats]);

  const data = useMemo(() => {
    const trend = scoreTrend(sessions);
    const imps = improvements(sessions);
    const cov = coverage(content, sessions, loadSrs(), allScripts(), new Set((stats?.days || []).map((d) => d.day)));
    const neg = neglected(sessions);
    const gymIds = (content.gym || []).map((g) => g.id);
    const due = dueItems(gymIds);
    const rec = recommend({ srsDue: due, improvements: imps, neglected: neg, coverage: cov, hasScripts: allScripts().length > 0 });
    return { trend, imps, cov, neg, rec, due };
  }, [sessions, content, stats]);

  const values = data.trend.map((t) => t.avg);
  const delta = data.trend.length >= 2
    ? Math.round(data.trend[data.trend.length - 1].avg - data.trend[0].avg)
    : 0;

  return (
    <div className="stack">
      <div className="card">
        <div className="row wrap" style={{ gap: 8, marginBottom: 10 }}>
          <span className="chip mint" style={{ fontSize: 10 }}><Ico name="spark" size={10} /> today&rsquo;s recommendation</span>
        </div>
        <h2 style={{ fontSize: 19, margin: '0 0 8px' }}>{data.rec.title}</h2>
        <p className="card-desc" style={{ marginBottom: 12 }}>{data.rec.body}</p>
        <button className="btn sm primary" onClick={() => go(data.rec.view)}>
          <Ico name="play" size={12} /> {data.rec.cta}
        </button>
      </div>

      <div className="grid g2">
        <div className="card">
          <div className="card-title" style={{ marginBottom: 10 }}>Score trend</div>
          {values.length < 2 ? (
            <div className="empty" style={{ padding: '18px 0' }}>
              Two scored sessions and this becomes a line. Do an impromptu or a wit rep.
              <div style={{ marginTop: 10 }}>
                <button className="btn sm" onClick={() => go('impromptu')}>
                  <Ico name="mic" size={12} /> Impromptu sprint
                </button>
              </div>
            </div>
          ) : (
            <>
              <svg viewBox="0 0 120 32" width="100%" height="70" preserveAspectRatio="none" aria-label="Rolling average score">
                <path d={sparkPath(values, 120, 32)} fill="none" stroke="#8b5cf6" strokeWidth="1.6" strokeLinejoin="round" />
                <path d={`${sparkPath(values, 120, 32)} L120,32 L0,32 Z`} fill="url(#tgrad)" opacity="0.18" />
                <defs>
                  <linearGradient id="tgrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <span className="tiny dim">{fmt(data.trend[0].at)} → {fmt(data.trend[data.trend.length - 1].at)}</span>
                <span className={`tiny ${delta > 0 ? 'mint' : delta < 0 ? 'rose' : 'dim'}`}>
                  {delta > 0 ? '+' : ''}{delta} points
                </span>
              </div>
              <div className="tiny dim" style={{ marginTop: 6 }}>
                Rolling average of your last five scored sessions, {values.length} measurements.
              </div>
            </>
          )}
        </div>

        <div className="card">
          <div className="card-title" style={{ marginBottom: 10 }}>Which skills are moving</div>
          {data.imps.length === 0 ? (
            <div className="empty" style={{ padding: '18px 0' }}>
              Four scored reps in one skill and this fills in. Being measured beats feeling better.
            </div>
          ) : (
            <div className="stack sm">
              {data.imps.map((i) => (
                <div key={i.kind} className="row" style={{ justifyContent: 'space-between', gap: 8 }}>
                  <span className="tiny" style={{ fontWeight: 600 }}>{i.name}</span>
                  <span className="tiny dim">{i.from} → {i.to}</span>
                  <span className={`chip ${i.delta > 2 ? 'mint' : i.delta < -2 ? 'rose' : ''}`} style={{ fontSize: 10 }}>
                    {i.delta > 0 ? '+' : ''}{i.delta}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-title" style={{ marginBottom: 4 }}>Coverage — how much of this you have actually used</div>
        <p className="card-desc" style={{ marginBottom: 12 }}>
          Not a scoreboard. It is the honest map of where you have been, and it is usually much smaller than people
          expect when there are 83 chapters.
        </p>
        <div className="stack sm">
          {data.cov.map((c) => (
            <div key={c.key}>
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 5 }}>
                <span className="tiny" style={{ fontWeight: 600 }}>{c.label}</span>
                <span className="tiny dim">{c.done}{c.total === Infinity ? '' : ` / ${c.total}`}{c.pct != null ? ` · ${c.pct}%` : ''}</span>
              </div>
              <Bar value={c.pct ?? Math.min(100, c.done * 10)} tone={c.pct != null && c.pct < 15 ? 'rose' : 'violet'} height={5} />
            </div>
          ))}
        </div>
      </div>

      <div className="grid g2">
        <div className="card">
          <div className="card-title" style={{ marginBottom: 10 }}>Gone quiet</div>
          {data.neg.length === 0 ? (
            <div className="empty" style={{ padding: '14px 0' }}>Nothing tracked yet.</div>
          ) : (
            <div className="stack sm">
              {data.neg.slice(0, 6).map((n) => (
                <div key={n.kind} className="row" style={{ justifyContent: 'space-between' }}>
                  <span className="tiny">{n.name}</span>
                  <span className={`tiny ${n.days >= 14 ? 'rose' : n.days >= 7 ? 'amber' : 'dim'}`}>
                    {n.days === 0 ? 'today' : `${n.days}d ago`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <div className="card-title" style={{ marginBottom: 10 }}>Review queue</div>
          {data.due.length === 0 ? (
            <div className="empty" style={{ padding: '14px 0' }}>
              Nothing due. Log a playbook in the Gym and it starts the 3/7/21/60 schedule.
            </div>
          ) : (
            <>
              <div className="tiny dim" style={{ marginBottom: 8 }}>{data.due.length} due, oldest first</div>
              <div className="stack sm">
                {data.due.slice(0, 4).map((d) => {
                  const g = (content.gym || []).find((x) => x.id === d.id);
                  return (
                    <button key={d.id} className="chip clickable" style={{ fontSize: 10, textAlign: 'left' }} onClick={() => go('gym', { openId: d.id })}>
                      <Ico name="refresh" size={10} /> {g?.title?.slice(0, 44) || d.id} · {d.overdue}d overdue
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-title" style={{ marginBottom: 10 }}>By kind</div>
        <div className="row wrap" style={{ gap: 6 }}>
          {(stats?.byKind || []).map((k) => (
            <span key={k.kind} className="chip" style={{ fontSize: 10 }}>
              {KIND_NAME[k.kind] || k.kind} · {k.n}{k.avg != null ? ` · avg ${Math.round(k.avg)}` : ''}
            </span>
          ))}
          {(!stats?.byKind || stats.byKind.length === 0) && <span className="tiny dim">No sessions logged yet.</span>}
        </div>
      </div>
    </div>
  );
}
