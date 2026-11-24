import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../api';
import { Ico, Bar, Ring, Spinner } from '../components/ui';

const DRILL_VIEW = {
  impromptu: 'impromptu', story: 'impromptu', voice: 'pronunciation',
  pronunciation: 'pronunciation', wit: 'wit', arena: 'arena',
  body: 'body', library: 'library',
};

export default function Courses({ content, progress, refresh, notify, go, boot }) {
  const [trackId, setTrackId] = useState(boot?.track || 'fast');
  const [track, setTrack] = useState(null);
  const [selected, setSelected] = useState(boot?.day || null);
  const [notes, setNotes] = useState('');
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState('all');
  const [tab, setTab] = useState('lesson');

  useEffect(() => {
    let live = true;
    setTrack(null);
    api.track(trackId).then((t) => { if (live) setTrack(t); }).catch(() => {});
    return () => { live = false; };
  }, [trackId]);

  const done = progress[trackId] || {};
  const maxDays = trackId === 'fast' ? 30 : 90;

  const nextDay = useMemo(() => {
    for (let d = 1; d <= maxDays; d++) if (!done[d]) return d;
    return maxDays;
  }, [done, maxDays]);

  const day = track?.days.find((d) => d.day === (selected || nextDay)) || null;
  const lesson = day?.lesson;
  const doneCount = Object.keys(done).length;

  const libraryById = useMemo(() => {
    const m = {};
    (content.library || []).forEach((i) => { m[i.id] = i; });
    return m;
  }, [content.library]);

  const complete = async () => {
    if (!day) return;
    setBusy(true);
    try {
      const r = await api.completeDay({ track: trackId, day: day.day, notes });
      notify(r.alreadyDone ? 'Already logged — notes updated.' : `Day ${day.day} complete · +${r.xpGained} XP`);
      setNotes('');
      await refresh();
    } catch (e) { notify(e.message); }
    setBusy(false);
  };

  const uncomplete = async () => {
    if (!day) return;
    setBusy(true);
    try {
      await api.uncompleteDay({ track: trackId, day: day.day });
      notify('Day reopened.');
      await refresh();
    } catch (e) { notify(e.message); }
    setBusy(false);
  };

  const launch = () => {
    if (!day) return;
    go(DRILL_VIEW[day.drill.type] || 'impromptu', {
      drillPrompt: day.drill.prompt, dayTitle: day.title, fromCourse: true, track: trackId, day: day.day,
    });
  };

  const days = track ? (filter === 'all' ? track.days
    : filter === 'todo' ? track.days.filter((d) => !done[d.day]) : track.days.filter((d) => done[d.day])) : [];

  const grouped = useMemo(() => {
    if (trackId !== 'deep' || !track?.blocks || filter !== 'all') return null;
    return track.blocks.map((b) => ({
      ...b,
      days: track.days.filter((d) => d.day > (b.n - 1) * 10 && d.day <= b.n * 10),
    }));
  }, [track, trackId, filter]);

  return (
    <>
      <div className="row wrap" style={{ marginBottom: 18, gap: 12 }}>
        <div className="tabs">
          <button className={`tab ${trackId === 'fast' ? 'active' : ''}`} onClick={() => { setTrackId('fast'); setSelected(null); setTab('lesson'); }}>30-Day Fast Track</button>
          <button className={`tab ${trackId === 'deep' ? 'active' : ''}`} onClick={() => { setTrackId('deep'); setSelected(null); setTab('lesson'); }}>90-Day Deep Dive</button>
        </div>
        <div className="spacer" />
        <div className="tabs">
          {['all', 'todo', 'done'].map((f) => (
            <button key={f} className={`tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f === 'all' ? 'All' : f === 'todo' ? 'To do' : 'Completed'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid main-side">
        <div className="card">
          <div className="row" style={{ marginBottom: 12 }}>
            <div>
              <h3 className="card-title" style={{ marginBottom: 3 }}>
                {trackId === 'fast' ? content.tracks[0].name : content.tracks[1].name}
              </h3>
              <p className="card-desc">
                {trackId === 'fast' ? content.tracks[0].description : content.tracks[1].description}
                {track && track.days[0]?.lesson === null && ' — lessons for this track are being written; the drill briefs below are complete.'}
              </p>
            </div>
            <div className="spacer" />
            <Ring value={(doneCount / maxDays) * 100} size={62} stroke={6} label="done" suffix="%" />
          </div>
          <Bar value={(doneCount / maxDays) * 100} />
          <div className="row tiny dim" style={{ marginTop: 7 }}>
            <span>{doneCount} of {maxDays} days complete</span><span className="spacer" />
            <span>Next: Day {nextDay}</span>
          </div>

          {!track && <div className="empty"><Spinner /></div>}

          {track && grouped && grouped.map((b) => (
            <div key={b.n}>
              <div className="block-head">
                <span className="chip violet">Block {b.n}</span>
                <span className="block-name">{b.name}</span>
                <span className="block-sub">{b.subtitle}</span>
              </div>
              <div className="day-grid">
                {b.days.map((d) => <DayCell key={d.day} d={d} done={done[d.day]} current={d.day === nextDay} onClick={() => setSelected(d.day)} />)}
              </div>
              <div className="tiny dim" style={{ marginTop: 8 }}>Every day is open — pick any one, in any order. Nothing here is locked by your streak.</div>
            </div>
          ))}

          {track && !grouped && (
            <div className="day-grid" style={{ marginTop: 16 }}>
              {days.map((d) => <DayCell key={d.day} d={d} done={done[d.day]} current={d.day === nextDay} onClick={() => setSelected(d.day)} />)}
            </div>
          )}
          {track && !grouped && days.length === 0 && <div className="empty">Nothing in this filter.</div>}
        </div>

        <div className="stack" style={{ alignSelf: 'start', position: 'sticky', top: 84 }}>
          {day ? (
            <div className="card fade-in" key={day.day}>
              <div className="row wrap" style={{ marginBottom: 12 }}>
                <span className="chip violet">Day {day.day}</span>
                <span className="chip">{day.drill.minutes} min</span>
                {lesson && <span className="chip cyan">{lesson.headline && 'lesson'}</span>}
                <span className="spacer" />
                {done[day.day] && <span className="chip mint"><Ico name="check" size={11} /> Done</span>}
              </div>
              <h3 style={{ fontSize: 19, margin: '0 0 8px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>{day.title}</h3>
              {lesson?.headline && <p className="card-desc" style={{ marginBottom: 12, fontStyle: 'italic' }}>{lesson.headline}</p>}

              <div className="row" style={{ gap: 9, marginBottom: 14 }}>
                <div style={{ width: 30, height: 30, borderRadius: 9, background: `${content.mentors[day.mentor]?.color || '#8b5cf6'}22`, border: `1px solid ${content.mentors[day.mentor]?.color || '#8b5cf6'}44`, display: 'grid', placeItems: 'center', fontSize: 13 }}>
                  <Ico name="users" size={13} />
                </div>
                <div>
                  <div className="tiny" style={{ fontWeight: 700 }}>{content.mentors[day.mentor]?.name}</div>
                  <div className="tiny dim">{content.mentors[day.mentor]?.tagline}</div>
                </div>
              </div>

              <div className="tabs" style={{ marginBottom: 14, display: 'flex' }}>
                <button className={`tab ${tab === 'lesson' ? 'active' : ''}`} onClick={() => setTab('lesson')} style={{ flex: 1 }}>Lesson</button>
                <button className={`tab ${tab === 'drill' ? 'active' : ''}`} onClick={() => setTab('drill')} style={{ flex: 1 }}>Drill</button>
              </div>

              {tab === 'lesson' && (
                lesson ? (
                  <div className="lesson">
                    <div className="lesson-block">
                      <div className="lesson-label">Why it works</div>
                      <p className="lesson-why">{lesson.why}</p>
                    </div>
                    {lesson.body.map((para, i) => <p className="lesson-p" key={i}>{para}</p>)}

                    {lesson.example && (
                      <div className="lesson-example">
                        <div className="lesson-label cyan">{lesson.example.label}</div>
                        <p style={{ margin: 0 }}>{lesson.example.text}</p>
                      </div>
                    )}

                    <div className="lesson-block">
                      <div className="lesson-label rose">The mistake</div>
                      <p style={{ margin: 0 }}>{lesson.mistake}</p>
                    </div>

                    <div className="lesson-block">
                      <div className="lesson-label mint">Run the drill</div>
                      <ol className="lesson-list">{lesson.drillBrief.map((s, i) => <li key={i}>{s}</li>)}</ol>
                    </div>

                    <div className="lesson-block">
                      <div className="lesson-label">Key points</div>
                      <ul className="lesson-list">{lesson.keyPoints.map((s, i) => <li key={i}>{s}</li>)}</ul>
                    </div>

                    {day.libraryRefs?.length > 0 && (
                      <div className="lesson-block">
                        <div className="lesson-label">Go deeper</div>
                        <div className="stack sm">
                          {day.libraryRefs.map((id) => {
                            const item = libraryById[id];
                            if (!item) return null;
                            return (
                              <button key={id} className="lesson-ref" onClick={() => go('library', { openId: id })}>
                                <Ico name="library" size={14} />
                                <span>
                                  <span style={{ fontWeight: 650 }}>{item.title}</span>
                                  <span className="tiny dim" style={{ display: 'block' }}>{item.category} · {item.short}</span>
                                </span>
                                <Ico name="arrow" size={13} />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="stack sm">
                    <div style={{ padding: 13, borderRadius: 12, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}>
                      <div className="lesson-label">The insight</div>
                      <div style={{ fontSize: 13, lineHeight: 1.65 }}>{day.insight}</div>
                    </div>
                    <div className="chip cyan">Drill · {day.drill.name}</div>
                    <p className="card-desc">{day.drill.prompt}</p>
                  </div>
                )
              )}

              {tab === 'drill' && (
                <div className="stack sm">
                  <div className="chip cyan">Drill · {day.drill.name} · {day.drill.minutes} min</div>
                  <p className="card-desc">{day.drill.prompt}</p>
                  {lesson?.drillBrief && (
                    <ol className="lesson-list" style={{ marginTop: 4 }}>{lesson.drillBrief.map((s, i) => <li key={i}>{s}</li>)}</ol>
                  )}
                  <button className="btn primary full" style={{ marginTop: 8 }} onClick={launch}>
                    <Ico name="play" size={14} /> Launch the drill
                  </button>
                </div>
              )}

              <label className="label" htmlFor="course-reflection" style={{ marginTop: 16 }}>Reflection notes</label>
              <textarea id="course-reflection" className="textarea" style={{ minHeight: 66, marginBottom: 12 }} value={notes}
                onChange={(e) => setNotes(e.target.value)} placeholder="What did you notice about your voice, structure or nerves?" />

              {!done[day.day] ? (
                <button className="btn full" disabled={busy} onClick={complete}
                  style={{ background: 'rgba(52,211,153,0.16)', borderColor: 'rgba(52,211,153,0.4)', color: '#6ee7b7' }}>
                  {busy ? <Spinner /> : <><Ico name="check" size={14} /> Mark complete · +{day.xp} XP</>}
                </button>
              ) : (
                <button className="btn full" disabled={busy} onClick={uncomplete}>Reopen day</button>
              )}
            </div>
          ) : (
            <div className="card empty">Select a day to open the module.</div>
          )}

          <div className="card">
            <h3 className="card-title" style={{ marginBottom: 10 }}><Ico name="users" size={14} /> The mentors</h3>
            {Object.values(content.mentors).map((m) => (
              <div className="list-row" key={m.id} style={{ alignItems: 'flex-start' }}>
                <span className="dot" style={{ background: m.color, marginTop: 6 }} />
                <div>
                  <div style={{ fontWeight: 650 }}>{m.name}</div>
                  <div className="tiny dim" style={{ marginTop: 1 }}>{m.tagline}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function DayCell({ d, done, current, onClick }) {
  return (
    <button className={`day-cell ${done ? 'done' : ''} ${current && !done ? 'current' : ''}`} onClick={onClick}>
      {done && <span className="day-check"><Ico name="check" size={13} /></span>}
      <div className="day-num">Day {d.day}</div>
      <div className="day-title">{d.title}</div>
      <div className="day-mentor">{d.drill.minutes} min · {d.drill.name}</div>
      {d.lesson && <span className="day-badge">lesson</span>}
    </button>
  );
}
