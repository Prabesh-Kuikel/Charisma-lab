import React, { useMemo, useState } from 'react';
import { api } from '../api';
import { Ico } from '../components/ui';
import { useSpeech } from '../hooks';
import Rehearse from '../components/Rehearse';
import { dueItems, allSrs, recordRep } from '../local/srs';

const TONE = { violet: 'violet', amber: 'amber', rose: 'rose', mint: 'mint', cyan: 'cyan', orange: 'orange' };

export default function Gym({ content, notify, go, boot, refresh }) {
  const scenarios = content.gym || [];
  const categories = content.gymCategories || [];
  const [cat, setCat] = useState('All');
  const [openId, setOpenId] = useState(boot?.openId || null);
  const [done, setDone] = useState([]);
  const [tick, setTick] = useState(0); // forces SRS reads to refresh after a rep
  const speech = useSpeech();

  const ids = useMemo(() => scenarios.map((s) => s.id), [scenarios]);

  const due = useMemo(() => dueItems(ids), [ids, tick]);
  const tracked = useMemo(() => allSrs(ids), [ids, tick]);

  const list = useMemo(() => {
    if (cat === 'All') return scenarios;
    if (cat === '__due') return scenarios.filter((s) => due.some((d) => d.id === s.id));
    return scenarios.filter((s) => s.category === cat);
  }, [scenarios, cat, due]);

  const active = scenarios.find((s) => s.id === openId) || null;

  const counts = useMemo(() => {
    const m = {};
    for (const s of scenarios) m[s.category] = (m[s.category] || 0) + 1;
    return m;
  }, [scenarios]);

  const mark = async (s, result = 'clean') => {
    if (done.includes(s.id)) return;
    setDone((d) => [...d, s.id]);
    recordRep(s.id, result);
    setTick((t) => t + 1);
    try {
      await api.logXp({ kind: 'gym', xp: result === 'stumble' ? 10 : 15 });
      notify(result === 'stumble' ? 'Noted — back in 3 days' : 'Rep logged');
      refresh?.(); // the header XP is stats, not state — without this it reads stale
    } catch (e) { notify(e.message); }
  };

  if (!scenarios.length) return <div className="empty">No playbooks loaded.</div>;

  if (active) {
    const tone = TONE[active.tone] || 'violet';
    const isDone = done.includes(active.id);
    const srs = tracked.find((t) => t.id === active.id);
    return (
      <div className="stack">
        <div className="card">
          <div className="row wrap" style={{ gap: 6, marginBottom: 12 }}>
            <button className="btn sm" onClick={() => setOpenId(null)}>
              <Ico name="arrow" size={12} /> All situations
            </button>
            <span className={`chip ${tone}`} style={{ fontSize: 10 }}>{active.category}</span>
            <span className="chip" style={{ fontSize: 10 }}>difficulty {active.difficulty}/5</span>
            {srs && (
              <span className={`chip ${srs.isDue ? 'amber' : 'mint'}`} style={{ fontSize: 10 }}>
                {srs.isDue ? 'due now' : `review in ${srs.dueIn}d`}
              </span>
            )}
            <div className="spacer" />
            <button className={`btn sm ${isDone ? '' : 'primary'}`} onClick={() => mark(active)} disabled={isDone}>
              {isDone ? <><Ico name="check" size={12} /> Done</> : <><Ico name="check" size={12} /> Log this rep</>}
            </button>
          </div>
          <h2 style={{ fontSize: 19, margin: '0 0 10px' }}>{active.title}</h2>
          <p className="card-desc" style={{ marginBottom: 12 }}>{active.situation}</p>
          <div className="lesson-example">
            <div className="lesson-label mint">Your goal</div>
            <p style={{ margin: 0 }}>{active.goal}</p>
          </div>
        </div>

        <div className="card">
          <div className="lesson-label cyan">Step by step</div>
          <ol className="lesson-list">{active.steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
        </div>

        <div className="card">
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 10 }}>
            <div className="lesson-label violet" style={{ margin: 0 }}>Say this</div>
            <span className="tiny dim">
              <Ico name="play" size={10} /> on any line to hear it
            </span>
          </div>
          <div className="stack" style={{ marginTop: 4 }}>
            {active.lines.map((l, i) => (
              /* the fifth line is the outcome, not a script: it gets its own
                 treatment so it reads as the test, not another thing to say */
              <div key={i} className="script" style={{ marginBottom: 0 }}>
                <div className={`script-line ${/^what good/i.test(l.label) ? 'outcome' : 'you'}`}>
                  <span className="script-who">{l.label}</span>
                  <span style={{ flex: 1 }}>{/^what good/i.test(l.label) ? <em>{l.text}</em> : l.text}</span>
                  {!/^what good/i.test(l.label) && (
                    <button
                      className="icon-btn"
                      title="Hear this line"
                      aria-label={`Read this line aloud: ${l.text}`}
                      onClick={() => speech.speak(l.text, 0.9)}
                      style={{ background: 'none', border: 0, cursor: 'pointer', color: 'inherit', opacity: 0.55, padding: 2 }}
                    >
                      <Ico name="play" size={11} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Rehearse
          line={active.lines[0]?.text || active.goal}
          label={active.title.slice(0, 28)}
          onUsed={() => { mark(active); notify('Nice. That is a rep your ear will remember.'); }}
        />

        <div className="card">
          <div className="lesson-label rose">Where it goes wrong</div>
          <ul className="lesson-list">{active.avoid.map((a, i) => <li key={i}>{a}</li>)}</ul>
        </div>

        <div className="card">
          <div className="lesson-label amber">Your rep</div>
          <p className="card-desc" style={{ marginTop: 8 }}>{active.drill}</p>
          <div className="row wrap" style={{ gap: 6, marginTop: 10 }}>
            <button className="btn sm" onClick={() => mark(active, 'stumble')}>
              <Ico name="x" size={12} /> I stumbled — bring it back in 3 days
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-title" style={{ marginBottom: 10 }}>Go deeper</div>
          <div className="row wrap" style={{ gap: 6 }}>
            {active.reads.map((r) => (
              <button key={r} className="chip clickable" style={{ fontSize: 10 }} onClick={() => go('library', { openId: r })}>
                <Ico name="library" size={10} /> chapter
              </button>
            ))}
            <button className="chip clickable" style={{ fontSize: 10 }} onClick={() => go('academy')}>
              <Ico name="book" size={10} /> academy
            </button>
            <button className="chip clickable" style={{ fontSize: 10 }} onClick={() => go('arena')}>
              <Ico name="chat" size={10} /> rehearse it live
            </button>
            <button className="chip clickable" style={{ fontSize: 10 }} onClick={() => go('scripts', { source: active.lines[0]?.text || '' })}>
              <Ico name="pen" size={10} /> write my own version
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="stack">
      {due.length > 0 && cat !== '__due' && (
        <div className="card" style={{ borderColor: 'var(--amber, #f0b429)' }}>
          <div className="row wrap" style={{ justifyContent: 'space-between', gap: 8 }}>
            <div>
              <div className="card-title" style={{ marginBottom: 4 }}>
                <Ico name="refresh" size={13} /> {due.length} due for review
              </div>
              <p className="card-desc" style={{ margin: 0 }}>
                These came back because the skill fades on a schedule: 3 days, then 7, then 21, then 60. One rep each,
                out loud, keeps them.
              </p>
            </div>
            <button className="btn sm primary" onClick={() => setCat('__due')}>
              <Ico name="play" size={12} /> Start review
            </button>
          </div>
        </div>
      )}

      <div className="card">
        <div className="row wrap" style={{ gap: 6 }}>
          <button className={`chip clickable ${cat === 'All' ? 'active' : ''}`} aria-pressed={cat === 'All'} onClick={() => setCat('All')}>
            All {scenarios.length}
          </button>
          {due.length > 0 && (
            <button className={`chip clickable ${cat === '__due' ? 'active' : ''}`} aria-pressed={cat === '__due'} onClick={() => setCat('__due')}>
              Due today {due.length}
            </button>
          )}
          {categories.map((c) => (
            <button key={c} className={`chip clickable ${cat === c ? 'active' : ''}`} aria-pressed={cat === c} onClick={() => setCat(c)}>
              {c} {counts[c] || 0}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">Situation playbooks</div>
        <p className="card-desc" style={{ marginTop: 8 }}>
          {cat === '__due'
            ? 'Your review queue, oldest first. Open one, say the lines out loud, log the rep — it moves further out on the schedule.'
            : 'Real situations people get stuck in, each with the steps, the exact lines to say and the ways it fails. Hero it out loud with the rehearse panel — reading them is not practice.'}
        </p>
        {tracked.length > 0 && (
          <div className="row wrap" style={{ gap: 6, marginTop: 10 }}>
            <span className="chip mint" style={{ fontSize: 10 }}>{tracked.length} in rotation</span>
            <span className="chip" style={{ fontSize: 10 }}>{tracked.filter((t) => t.isDue).length} due</span>
            <button className="chip clickable" style={{ fontSize: 10 }} onClick={() => go('scripts')}>
              <Ico name="pen" size={10} /> my scripts
            </button>
          </div>
        )}
      </div>

      {list.length === 0 ? (
        <div className="card"><div className="empty">Nothing due. Come back tomorrow — or open any playbook and log a rep ahead of schedule.</div></div>
      ) : (
        <div className="grid g2">
          {list.map((s) => {
            const rec = tracked.find((t) => t.id === s.id);
            return (
              <div key={s.id} className="card">
                <div className="row" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
                  <span className={`chip ${TONE[s.tone] || 'violet'}`} style={{ fontSize: 10 }}>{s.category}</span>
                  <span className="tiny dim">difficulty {s.difficulty}/5</span>
                </div>
                <div className="card-title" style={{ marginBottom: 6 }}>{s.title}</div>
                <p className="card-desc" style={{ marginBottom: 12 }}>{s.situation.slice(0, 120)}…</p>
                <div className="row" style={{ justifyContent: 'space-between', gap: 6 }}>
                  {rec ? (
                    <span className={`chip ${rec.isDue ? 'amber' : 'mint'}`} style={{ fontSize: 10 }}>
                      {rec.isDue ? 'due now' : `in ${rec.dueIn}d`}
                    </span>
                  ) : <span className="tiny dim">not started</span>}
                  <button className="btn sm primary" onClick={() => setOpenId(s.id)}>
                    <Ico name="play" size={12} /> Open
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
