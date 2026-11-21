import React, { useMemo, useState } from 'react';
import { api } from '../api';
import { Ico } from '../components/ui';
import { generateIdeas } from '../../server/content/creator.js';

const TABS = [
  { id: 'start', label: 'Start here' },
  { id: 'ideas', label: 'Idea engine' },
  { id: 'hooks', label: 'Hooks' },
  { id: 'formats', label: 'Formats' },
  { id: 'plan', label: '4-week plan' },
  { id: 'skills', label: 'Skills ladder' },
];

export default function Creator({ content, notify, go }) {
  const c = content.creator || {};
  const [tab, setTab] = useState('start');
  const [topic, setTopic] = useState((c.topics || [])[0] || 'my job');
  const [angle, setAngle] = useState((c.angles || [])[0] || 'in three steps');
  const [hookIdx, setHookIdx] = useState(0);
  const [checked, setChecked] = useState([]);

  const ideas = useMemo(() => generateIdeas(topic, angle, 6), [topic, angle]);

  const logIdea = async (text) => {
    try { await api.logXp({ kind: 'creator-idea', xp: 5 }); } catch { /* offline ok */ }
    try { await navigator.clipboard.writeText(text); notify('Copied — go make it'); }
    catch { notify('Idea logged'); }
  };

  return (
    <div className="stack">
      <div className="card">
        <div className="row wrap" style={{ gap: 6 }}>
          {TABS.map((t) => (
            <button key={t.id} className={`chip clickable ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
        </div>
      </div>

      {tab === 'start' && (
        <div className="grid split">
          <div className="stack">
            <div className="card">
              <div className="card-title">The only thing that matters first</div>
              <p className="card-desc">
                Publishing beats planning. One idea, under 150 words, first line that survives being read alone.
                Do that five times before you evaluate anything — taste improves faster than output, and until you have
                output there is nothing for taste to work on.
              </p>
            </div>
            <div className="card">
              <div className="lesson-label mint">Six pillars</div>
              <div className="stack sm">
                {(c.pillars || []).map((p) => (
                  <div key={p.id}>
                    <div style={{ fontWeight: 650, fontSize: 12.5 }}>{p.name}</div>
                    <div className="tiny dim">{p.blurb}</div>
                    <div className="row wrap" style={{ gap: 4, marginTop: 4 }}>
                      {p.examples.map((e, i) => <span key={i} className="chip" style={{ fontSize: 9.5 }}>{e}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="stack">
            <div className="card">
              <div className="card-title">Before you publish</div>
              <div className="stack sm">
                {(c.checklist || []).map((q, i) => (
                  <label key={i} className="row" style={{ gap: 8, alignItems: 'flex-start', cursor: 'pointer' }}>
                    <input type="checkbox" checked={checked.includes(i)}
                      onChange={() => setChecked((v) => v.includes(i) ? v.filter((x) => x !== i) : [...v, i])} />
                    <span className="tiny" style={{ lineHeight: 1.5 }}>{q}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="card-title">Skills you are actually building</div>
              <p className="card-desc">
                Noticing, structuring, opening, editing, shipping, reading the room. They are sequenced in the ladder tab —
                and the same skills show up in every other module here: a hook is a cold open, a story is a Story Spine,
                a sales page is an objection bank.
              </p>
              <div className="row wrap" style={{ gap: 6, marginTop: 10 }}>
                <button className="chip clickable" onClick={() => go('games')}>Games</button>
                <button className="chip clickable" onClick={() => go('coach')}>Ask the coach</button>
                <button className="chip clickable" onClick={() => go('library')}>Library</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'ideas' && (
        <div className="stack">
          <div className="card">
            <div className="card-title">Idea engine</div>
            <div className="row wrap" style={{ gap: 8, margin: '10px 0' }}>
              <select className="select" value={topic} onChange={(e) => setTopic(e.target.value)}>
                {(c.topics || []).map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <select className="select" value={angle} onChange={(e) => setAngle(e.target.value)}>
                {(c.angles || []).map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div className="stack sm">
              {ideas.map((id, i) => (
                <div className="list-row" key={i}>
                  <span style={{ flex: 1, fontSize: 13 }}>{id}</span>
                  <button className="btn sm" onClick={() => logIdea(id)}>Use</button>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="card-title">Ten hooks, one idea</div>
            <p className="card-desc">Write ten first lines for a single piece and publish the one that makes you slightly nervous. Pick a pattern:</p>
            <div className="stack sm" style={{ marginTop: 10 }}>
              {(c.hooks || []).map((h) => (
                <div key={h.pattern} className="feedback" style={{ margin: 0 }}>
                  <strong style={{ fontSize: 12.5 }}>{h.pattern}</strong>
                  <div style={{ fontSize: 13, margin: '4px 0' }}>“{h.example}”</div>
                  <div className="tiny dim">{h.why}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'hooks' && (
        <div className="stack">
          <div className="card">
            <div className="card-title">Hook drill</div>
            <p className="card-desc">One pattern at a time. Write your own version, then compare with the example.</p>
            <div className="row wrap" style={{ gap: 6, margin: '12px 0' }}>
              {(c.hooks || []).map((h, i) => (
                <button key={h.pattern} className={`chip clickable ${hookIdx === i ? 'active' : ''}`} onClick={() => setHookIdx(i)}>
                  {h.pattern}
                </button>
              ))}
            </div>
            {c.hooks?.[hookIdx] && (
              <div className="lesson-example">
                <div className="lesson-label cyan">{c.hooks[hookIdx].pattern}</div>
                <p style={{ margin: '6px 0', fontSize: 14 }}>“{c.hooks[hookIdx].example}”</p>
                <p className="tiny dim" style={{ margin: 0 }}>{c.hooks[hookIdx].why}</p>
              </div>
            )}
          </div>
          <div className="card">
            <div className="lesson-label amber">The five-second test</div>
            <ul className="lesson-list">
              <li>Would you stop scrolling for this line, honestly?</li>
              <li>Does it contain a number, a contradiction, or a named audience?</li>
              <li>Could the next sentence be predicted — and does that make you want to read it?</li>
              <li>Is the most interesting clause in the first six words?</li>
            </ul>
          </div>
        </div>
      )}

      {tab === 'formats' && (
        <div className="grid g2">
          {(c.formats || []).map((f) => (
            <div className="card" key={f.id}>
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 6 }}>
                <div className="card-title" style={{ margin: 0 }}>{f.name}</div>
                <span className="chip" style={{ fontSize: 10 }}>{f.length}</span>
              </div>
              <p className="card-desc">{f.why}</p>
              <div className="tiny" style={{ marginTop: 8, color: '#fda4af' }}>Trap: {f.trap}</div>
            </div>
          ))}
          <div className="card" style={{ gridColumn: '1 / -1' }}>
            <div className="card-title">Cadence by platform</div>
            <div className="stack sm" style={{ marginTop: 8 }}>
              {(c.platforms || []).map((p) => (
                <div className="list-row" key={p.id} style={{ alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: 12.5 }}>{p.name}</strong>
                    <div className="tiny dim">{p.shape}</div>
                    <div className="tiny dim" style={{ marginTop: 3 }}>{p.note}</div>
                  </div>
                  <span className="chip mint" style={{ fontSize: 10 }}>{p.cadence}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'plan' && (
        <div className="grid g2">
          {(c.plan || []).map((w) => (
            <div className="card" key={w.week}>
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 6 }}>
                <div className="card-title" style={{ margin: 0 }}>Week {w.week} · {w.theme}</div>
              </div>
              <div className="tiny dim" style={{ marginBottom: 8 }}>{w.goal}</div>
              <ul className="lesson-list">{w.tasks.map((t, i) => <li key={i}>{t}</li>)}</ul>
            </div>
          ))}
        </div>
      )}

      {tab === 'skills' && (
        <div className="stack">
          {(c.ladder || []).map((s) => (
            <div className="card" key={s.level}>
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 6 }}>
                <div className="card-title" style={{ margin: 0 }}>
                  <span className="chip violet" style={{ fontSize: 10 }}>L{s.level}</span> {s.name}
                </div>
              </div>
              <p className="card-desc">{s.what}</p>
              <div className="tiny" style={{ marginTop: 8, color: 'var(--mint)' }}>Drill: {s.drill}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
