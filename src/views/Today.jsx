import React, { useMemo, useState } from 'react';
import { Ico, Ring, Bar } from '../components/ui';
import { dueItems } from '../local/srs';
import { allScripts, nextToRehearse } from '../local/my-scripts';
import { summary as repSummary, removeRep, repsToday, KINDS } from '../local/reps';
import { addNote, notesOrdered, verdictStats, pendingVerdicts, VERDICTS, setVerdict } from '../local/notes';

// ─────────────────────────────────────────────────────────────
//  Today
//  One screen that answers the only question that matters when
//  you open a 20-page app in a spare ten minutes: what do I do
//  right now? Everything here is a decision, not a dashboard.
// ─────────────────────────────────────────────────────────────

const card = { display: 'flex', flexDirection: 'column', gap: 10 };

function minutesAgo(ts) {
  const m = Math.round((Date.now() - new Date(ts).getTime()) / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  return d === 1 ? 'yesterday' : `${d} days ago`;
}

export default function Today({ content, stats, progress, go, notify, boot }) {
  const [tick, setTick] = useState(0);
  const [quick, setQuick] = useState('');
  const refresh = () => setTick((t) => t + 1);

  const due = useMemo(() => dueItems((content.gym || []).map((g) => g.id)), [content.gym]);
  const reps = useMemo(() => repSummary(), [tick]);
  const todayReps = useMemo(() => repsToday().slice().reverse(), [tick]);
  const scripts = useMemo(() => allScripts(), [tick]);
  const suggestScript = useMemo(() => nextToRehearse(), [tick]);
  const verdicts = useMemo(() => verdictStats(), [tick]);
  const backlog = useMemo(() => pendingVerdicts(4), [tick]);
  const recentNotes = useMemo(() => notesOrdered().slice(0, 3), [tick]);

  const duePlaybooks = due.map((d) => (content.gym || []).find((g) => g.id === (d.id || d))).filter(Boolean);
  const rotationCount = Object.keys((() => { try { return JSON.parse(localStorage.getItem('charisma-lab.srs.v1') || '{}'); } catch { return {}; } })()).length;
  const starterPlaybooks = useMemo(() => {
    const picks = ['gym-pro-salary', 'gym-difficult-family-money', 'gym-date-second-date'];
    const found = picks.map((id) => (content.gym || []).find((g) => g.id === id)).filter(Boolean);
    return found.length ? found : (content.gym || []).slice(0, 3);
  }, [content.gym]);
  // mentors is an object keyed by id, not an array
  const mentor = useMemo(() => {
    const list = Object.values(content.mentors || {});
    if (!list.length) return null;
    const m = list[new Date().getDate() % list.length];
    return { ...m, line: m.principles?.[new Date().getDate() % Math.max(1, m.principles.length)] };
  }, [content.mentors]);
  const dailyTheme = content.daily?.themes?.[(new Date().getDay() + 6) % 7];
  const dailyDrill = useMemo(() => {
    const drills = content.daily?.drills || [];
    if (!drills.length) return null;
    const day = Math.floor(Date.now() / 86400000);
    return drills[day % drills.length];
  }, [content.daily]);

  // what to do first, in priority order — the same logic the Progress page
  // recommends from, but resolved into a button that goes straight there
  const next = useMemo(() => {
    if (due.length) {
      return {
        tone: 'mint', label: 'Clear due reviews',
        title: `${due.length} rep${due.length === 1 ? '' : 's'} are past their date`,
        body: 'Skills fade on a schedule. One rep each is the highest-value ten minutes you have today.',
        cta: 'Start the queue', view: 'gym',
      };
    }
    if (reps.suggestion) {
      return {
        tone: 'amber', label: 'Restart something',
        title: `${reps.suggestion.label} has gone quiet for ${reps.suggestion.days} days`,
        body: 'Nothing is ruined by a gap. One short rep resets it, and the app will re-schedule it for you.',
        cta: 'Pick it back up', view: reps.suggestion.kind === 'impromptu' ? 'impromptu' : reps.suggestion.kind,
      };
    }
    if (!reps.total) {
      return {
        tone: 'violet', label: 'First rep',
        title: 'Start with one impromptu — 90 seconds, no prep',
        body: 'Nobody improves by reading about charisma. One spoken rep today puts a number on where you are.',
        cta: 'Run a rep', view: 'impromptu',
      };
    }
    if (dailyDrill) {
      return {
        tone: 'cyan', label: 'Today’s drill',
        title: dailyDrill.title,
        body: `${dailyDrill.do} (${dailyDrill.time} min — done when: ${dailyDrill.success})`,
        cta: 'Open Daily Dojo', view: 'daily',
      };
    }
    return { tone: 'mint', label: 'Keep going', title: 'One reps is enough', body: 'You are on streak. A single rep keeps it honest.', cta: 'Impromptu sprint', view: 'impromptu' };
  }, [due.length, reps, dailyDrill]);

  const saveQuick = () => {
    const text = quick.trim();
    if (!text) return;
    // a one-liner typed on Today is either a note or a script — infer from a question mark
    if (text.includes('?') || text.length < 90) {
      addNote({ ref: 'today', refType: 'other', title: 'Quick capture', text });
      notify('Saved to your notes');
    } else {
      import('../local/my-scripts').then(({ addScript }) => { addScript({ text, tag: 'Small talk' }); notify('Saved to My Scripts'); });
    }
    setQuick('');
    refresh();
  };

  const undo = (rep) => {
    removeRep(rep.id);
    refresh();
    notify('Rep removed');
  };

  const markUsed = (ref) => {
    setVerdict(ref, 'used', '');
    refresh();
    notify('Marked as used — that is the one that counts');
  };

  const greeting = (() => {
    const h = new Date().getHours();
    return h < 5 ? 'Still up' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  })();

  return (
    <div className="stack" key={tick}>
      {/* ── the one decision ─────────────────────────────── */}
      <div className="card" style={{ borderColor: 'rgba(139,92,246,0.35)', background: 'linear-gradient(180deg, rgba(139,92,246,0.10), rgba(0,0,0,0) 60%)' }}>
        <div className="row wrap" style={{ justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <span className={`chip ${next.tone}`} style={{ fontSize: 10 }}>{next.label}</span>
            <div style={{ fontSize: 20, fontWeight: 780, margin: '10px 0 6px', lineHeight: 1.3 }}>{next.title}</div>
            <p className="card-desc" style={{ marginBottom: 14 }}>{next.body}</p>
            <div className="row wrap" style={{ gap: 8 }}>
              <button className="btn primary" onClick={() => go(next.view)}>
                <Ico name="play" size={13} /> {next.cta}
              </button>
              <button className="btn" onClick={() => go('progress')}>See the full picture</button>
            </div>
          </div>
          <div className="stack" style={{ gap: 8, alignItems: 'center', minWidth: 120 }}>
            <Ring value={Math.min(100, reps.total ? Math.round((reps.today / 3) * 100) : 0)} size={84} stroke={8} label="today" />
            <div className="tiny dim">{reps.today} rep{reps.today === 1 ? '' : 's'} today</div>
            <div className="tiny dim">{reps.streak.current}-day streak · best {reps.streak.best}</div>
          </div>
        </div>
      </div>

      <div className="grid g3">
        {/* ── due queue ───────────────────────────────────── */}
        <div className="card" style={card}>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <h3 className="card-title" style={{ margin: 0 }}><Ico name="refresh" size={14} /> Due for review</h3>
            <span className={`chip ${due.length ? 'mint' : ''}`} style={{ fontSize: 10 }}>{due.length}</span>
          </div>
          {duePlaybooks.length === 0 ? (
            <>
              <p className="card-desc" style={{ margin: 0 }}>
                Nothing overdue. {rotationCount} playbook{rotationCount === 1 ? '' : 's'} in rotation — the schedule brings each one back at 3, then 7, 21 and 60 days.
              </p>
              {rotationCount === 0 && (
                <>
                  <div className="tiny dim">Start a rotation with one of these — the app will schedule it for you:</div>
                  {starterPlaybooks.map((g) => (
                    <button key={g.id} className="list-row" style={{ textAlign: 'left', background: 'none', border: 0, cursor: 'pointer', color: 'inherit', width: '100%' }}
                      onClick={() => go('gym', { openId: g.id })}>
                      <span className="dot" style={{ background: '#a78bfa' }} />
                      <span className="tiny" style={{ flex: 1 }}>{g.title}</span>
                      <span className="chip" style={{ fontSize: 9 }}>{g.category}</span>
                    </button>
                  ))}
                </>
              )}
            </>
          ) : (
            <>
              {duePlaybooks.slice(0, 3).map((g) => (
                <button key={g.id} className="list-row" style={{ textAlign: 'left', background: 'none', border: 0, cursor: 'pointer', color: 'inherit', width: '100%' }}
                  onClick={() => go('gym', { openId: g.id })}>
                  <span className="dot" style={{ background: '#34d399' }} />
                  <span className="tiny" style={{ flex: 1 }}>{g.title}</span>
                  <Ico name="chevron" size={12} />
                </button>
              ))}
              {duePlaybooks.length > 3 && (
                <button className="btn sm" onClick={() => go('gym')}>All {duePlaybooks.length} due</button>
              )}
            </>
          )}
          <div className="spacer" />
          <button className="chip clickable" style={{ alignSelf: 'flex-start' }} onClick={() => go('gym')}>Open the Gym</button>
        </div>

        {/* ── today's drill ───────────────────────────────── */}
        <div className="card" style={card}>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <h3 className="card-title" style={{ margin: 0 }}><Ico name="spark" size={14} /> {dailyTheme?.name || 'Today’s drill'}</h3>
            <span className="chip" style={{ fontSize: 10 }}>{dailyTheme?.cue || 'no prep'}</span>
          </div>
          {dailyDrill ? (
            <>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{dailyDrill.title}</div>
              <p className="card-desc" style={{ margin: 0 }}>{dailyDrill.do}</p>
              <div className="tiny" style={{ color: 'var(--mint)' }}>Done when: {dailyDrill.success}</div>
              <div className="tiny dim">{dailyDrill.time} min · {KINDS.daily.label}</div>
            </>
          ) : <p className="card-desc">No drills loaded.</p>}
          <div className="spacer" />
          <button className="btn sm" onClick={() => go('daily')}><Ico name="arrow" size={12} /> Daily Dojo</button>
        </div>

        {/* ── a line to rehearse ──────────────────────────── */}
        <div className="card" style={card}>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <h3 className="card-title" style={{ margin: 0 }}><Ico name="pen" size={14} /> A line in your own words</h3>
            <span className="chip" style={{ fontSize: 10 }}>{scripts.length} saved</span>
          </div>
          {suggestScript ? (
            <>
              <blockquote className="script" style={{ margin: 0 }}>
                <div className="script-line you"><span className="script-who">{suggestScript.tag}</span><span>{suggestScript.text}</span></div>
              </blockquote>
              <div className="tiny dim">Least rehearsed of your {scripts.length}. Say it out loud twice, then count it.</div>
              <div className="spacer" />
              <div className="row wrap" style={{ gap: 6 }}>
                <button className="btn sm primary" onClick={() => go('scripts')}><Ico name="mic" size={12} /> Rehearse it</button>
                <button className="chip clickable" onClick={() => go('scripts')}>My Scripts</button>
              </div>
            </>
          ) : (
            <>
              <p className="card-desc" style={{ margin: 0 }}>You have no scripts yet. A line you wrote is worth ten you read — start with the one sentence you always fumble.</p>
              <div className="spacer" />
              <button className="btn sm primary" onClick={() => go('scripts')}><Ico name="pen" size={12} /> Write one line</button>
            </>
          )}
        </div>
      </div>

      <div className="grid split">
        <div className="stack">
          {/* ── quick capture ──────────────────────────────── */}
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: 8 }}><Ico name="bolt" size={14} /> Quick capture</h3>
            <p className="card-desc" style={{ marginBottom: 10 }}>
              Something you noticed, a line that worked, a question a person asked you that you fumbled. It stays in this browser and goes into your backup.
            </p>
            <textarea className="textarea" style={{ minHeight: 62 }} value={quick}
              onChange={(e) => setQuick(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) saveQuick(); }}
              placeholder="e.g. Better opener than “how was your weekend”? — the question a person asked you that you fumbled" aria-label="Note about a question you fumbled" />
            <div className="row" style={{ marginTop: 8, gap: 8 }}>
              <button className="btn primary sm" onClick={saveQuick} disabled={!quick.trim()}>
                <Ico name="check" size={12} /> Save
              </button>
              <span className="tiny dim">⌘/Ctrl + Enter · notes and short lines go to Notes, longer ones to My Scripts</span>
            </div>
          </div>

          {/* ── the practice log ───────────────────────────── */}
          <div className="card">
            <div className="row" style={{ justifyContent: 'space-between', marginBottom: 10 }}>
              <h3 className="card-title" style={{ margin: 0 }}><Ico name="trophy" size={14} /> Today’s log</h3>
              <span className="tiny dim">{reps.minutes} min all-time · {reps.xp} XP from reps</span>
            </div>
            {todayReps.length === 0 ? (
              <p className="card-desc" style={{ margin: 0 }}>
                Nothing logged yet today. The first rep is the only hard one — 90 seconds of impromptu puts a number on where you are.
              </p>
            ) : (
              <div className="stack" style={{ gap: 6 }}>
                {todayReps.map((r) => (
                  <div key={r.id} className="list-row" style={{ alignItems: 'flex-start' }}>
                    <span className="dot" style={{ background: '#8b5cf6', marginTop: 6 }} />
                    <span className="tiny" style={{ flex: 1 }}>
                      <strong>{(KINDS[r.kind] || {}).label || r.kind}</strong>
                      {r.label ? ` · ${r.label.slice(0, 70)}` : ''}
                      {typeof r.score === 'number' ? ` · scored ${r.score}` : ''}
                    </span>
                    <span className="chip" style={{ fontSize: 10 }}>+{r.xp} XP</span>
                    <span className="tiny dim">{minutesAgo(r.at)}</span>
                    <button className="btn ghost sm" aria-label="Remove this rep" onClick={() => undo(r)}>
                      <Ico name="x" size={11} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="spacer" />
            <div className="row wrap" style={{ gap: 6 }}>
              <button className="chip clickable" onClick={() => go('impromptu')}><Ico name="mic" size={10} /> Impromptu</button>
              <button className="chip clickable" onClick={() => go('arena')}><Ico name="chat" size={10} /> Arena</button>
              <button className="chip clickable" onClick={() => go('gym')}><Ico name="target" size={10} /> Playbook</button>
              <button className="chip clickable" onClick={() => go('library')}><Ico name="library" size={10} /> Read a chapter</button>
            </div>
          </div>
        </div>

        <div className="stack">
          {/* ── did it change anything? ─────────────────────── */}
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: 8 }}><Ico name="check" size={14} /> Did you use it?</h3>
            <div className="tiny dim" style={{ marginBottom: 10 }}>
              Reading is not practice. Mark what you actually used — {verdicts.used} used, {verdicts.will} still waiting, {verdicts.no} rejected.
            </div>
            {verdicts.total > 0 && (
              <div style={{ marginBottom: 12 }}>
                <Bar value={verdicts.ratio} tone={verdicts.ratio >= 50 ? 'mint' : verdicts.ratio >= 25 ? 'amber' : 'rose'} />
                <div className="tiny dim" style={{ marginTop: 6 }}>{verdicts.ratio}% of what you marked, you actually used.</div>
              </div>
            )}
            {backlog.length === 0 ? (
              <p className="card-desc" style={{ margin: 0 }}>
                {verdicts.total ? 'Nothing waiting. When you open a chapter, say whether it changed anything you do.' : 'Open any chapter and answer one question at the bottom: did this change anything you do?'}
              </p>
            ) : (
              <>
                <div className="tiny dim" style={{ marginBottom: 6, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>You said you would use these</div>
                {backlog.map((b) => (
                  <div key={b.ref} className="list-row" style={{ alignItems: 'center' }}>
                    <span className="tiny" style={{ flex: 1 }}>{b.title || b.ref}</span>
                    <button className="chip clickable mint" style={{ fontSize: 10 }} onClick={() => markUsed(b.ref)}>
                      {VERDICTS.used.label}
                    </button>
                  </div>
                ))}
              </>
            )}
            <div className="spacer" />
            <button className="btn sm" onClick={() => go('library')}><Ico name="library" size={12} /> Open the library</button>
          </div>

          {/* ── recent notes ───────────────────────────────── */}
          <div className="card">
            <div className="row" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
              <h3 className="card-title" style={{ margin: 0 }}><Ico name="pen" size={14} /> Your notes</h3>
              <button className="chip clickable" style={{ fontSize: 10 }} onClick={() => go('notes')}>All notes</button>
            </div>
            {recentNotes.length === 0 ? (
              <p className="card-desc" style={{ margin: 0 }}>Nothing yet. Every chapter has a note box at the bottom, and every quoted line can be saved with your reaction.</p>
            ) : recentNotes.map((n) => (
              <div key={n.id} style={{ borderLeft: '2px solid rgba(139,92,246,0.5)', paddingLeft: 10, marginBottom: 10 }}>
                {n.quote && <div className="tiny" style={{ fontStyle: 'italic', opacity: 0.8 }}>“{n.quote.slice(0, 90)}”</div>}
                <div className="tiny">{n.text.slice(0, 140)}</div>
                <div className="tiny dim">{n.title || n.ref} · {minutesAgo(n.at)}</div>
              </div>
            ))}
          </div>

          {/* ── one mentor line ─────────────────────────────── */}
          {mentor && (
            <div className="card" style={{ borderColor: 'rgba(34,211,238,0.28)' }}>
              <h3 className="card-title" style={{ marginBottom: 8 }}><Ico name="brain" size={14} /> {mentor.name}</h3>
              <p className="card-desc" style={{ margin: 0, fontStyle: 'italic' }}>“{mentor.line}”</p>
              {mentor.tagline && <div className="tiny dim" style={{ marginTop: 6 }}>{mentor.tagline}</div>}
            </div>
          )}
        </div>
      </div>

      {boot?.openNotes && (
        <div className="card"><button className="btn sm" onClick={() => go('notes')}>Open your notes</button></div>
      )}
    </div>
  );
}
