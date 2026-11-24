import React, { useMemo, useState } from 'react';
import { Ico } from '../components/ui';
import Rehearse from '../components/Rehearse';
import { allScripts, addScript, removeScript, markUsed, nextToRehearse, SCRIPT_TAGS } from '../local/my-scripts';
import { logRep } from '../local/reps';
import { useSpeech } from '../hooks';

export default function MyScripts({ go, notify, params }) {
  const [list, setList] = useState(() => allScripts());
  const [tag, setTag] = useState('All');
  const [text, setText] = useState(params?.source || '');
  const [newTag, setNewTag] = useState('Small talk');
  const [openId, setOpenId] = useState(null);
  const speech = useSpeech();

  const filtered = useMemo(() => (tag === 'All' ? list : list.filter((s) => s.tag === tag)), [list, tag]);
  const open = list.find((s) => s.id === openId) || null;
  const suggest = useMemo(() => nextToRehearse(), [list]);

  const save = () => {
    try {
      const item = addScript({ text, tag: newTag });
      setList(allScripts());
      setText('');
      notify('Saved to your scripts');
      setOpenId(item.id);
    } catch (e) { notify(e.message); }
  };

  const drop = (id) => {
    removeScript(id);
    setList(allScripts());
    if (openId === id) setOpenId(null);
  };

  const used = (id) => {
    const line = list.find((s) => s.id === id);
    markUsed(id);
    logRep({ kind: 'scripts', ref: id, label: line?.text?.slice(0, 90) || 'Script rehearsal', seconds: 45, repeat: true });
    setList(allScripts());
    notify('Rep counted');
  };

  if (open) {
    return (
      <div className="stack">
        <div className="card">
          <div className="row wrap" style={{ gap: 6, marginBottom: 10 }}>
            <button className="btn sm" onClick={() => setOpenId(null)}>
              <Ico name="arrow" size={12} /> My scripts
            </button>
            <span className="chip mint" style={{ fontSize: 10 }}>{open.tag}</span>
            <span className="chip" style={{ fontSize: 10 }}>{open.uses || 0} reps</span>
            <div className="spacer" />
            <button className="btn sm" onClick={() => drop(open.id)}>
              <Ico name="x" size={12} /> Delete
            </button>
          </div>
          <blockquote className="script" style={{ margin: 0 }}>
            <div className="script-line you">
              <span className="script-who">you</span>
              <span>{open.text}</span>
            </div>
          </blockquote>
        </div>

        <Rehearse line={open.text} label={open.tag} onUsed={() => used(open.id)} />

        <div className="card">
          <div className="card-title" style={{ marginBottom: 10 }}>Make it yours</div>
          <p className="card-desc">
            A line you wrote is worth ten you read. Cut it down until every word is load-bearing, then say it five times
            until it stops sounding like a sentence and starts sounding like you.
          </p>
          <div className="row wrap" style={{ gap: 6, marginTop: 10 }}>
            <button className="chip clickable" style={{ fontSize: 10 }} onClick={() => go('gym')}>
              <Ico name="play" size={10} /> more playbooks
            </button>
            <button className="chip clickable" style={{ fontSize: 10 }} onClick={() => go('arena')}>
              <Ico name="chat" size={10} /> try it in the arena
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="stack">
      <div className="card">
        <div className="card-title">My scripts</div>
        <p className="card-desc" style={{ marginTop: 8 }}>
          The lines that are actually yours. Save the version you would really say — not the polished one — tag it to a
          situation, and rehearse it until it is automatic.
        </p>
        {suggest && (
          <div className="row wrap" style={{ gap: 8, marginTop: 12 }}>
            <span className="tiny dim">Suggested next:</span>
            <button className="chip clickable mint" style={{ fontSize: 10 }} onClick={() => setOpenId(suggest.id)}>
              <Ico name="play" size={10} /> {suggest.text.slice(0, 46)}…
            </button>
          </div>
        )}
      </div>

      <div className="card">
        <div className="lesson-label violet">Write a new one</div>
        <textarea
          className="input"
          rows={3}
          placeholder="e.g. I have to head off in a minute — but I am glad we got into this properly."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: '100%', marginTop: 10, resize: 'vertical' }}
          aria-label="Your script line" />
        <div className="row wrap" style={{ gap: 6, marginTop: 10 }}>
          {SCRIPT_TAGS.map((t) => (
            <button key={t} className={`chip clickable ${newTag === t ? 'active' : ''}`} aria-pressed={newTag === t} style={{ fontSize: 10 }} onClick={() => setNewTag(t)}>
              {t}
            </button>
          ))}
          <div className="spacer" />
          <button className="btn sm primary" onClick={save} disabled={!text.trim()}>
            <Ico name="check" size={12} /> Save
          </button>
        </div>
      </div>

      <div className="card">
        <div className="row wrap" style={{ gap: 6 }}>
          <button className={`chip clickable ${tag === 'All' ? 'active' : ''}`} aria-pressed={tag === 'All'} onClick={() => setTag('All')}>
            All {list.length}
          </button>
          {SCRIPT_TAGS.map((t) => {
            const n = list.filter((s) => s.tag === t).length;
            return n > 0 ? (
              <button key={t} className={`chip clickable ${tag === t ? 'active' : ''}`} aria-pressed={tag === t} onClick={() => setTag(t)}>
                {t} {n}
              </button>
            ) : null;
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card">
          <div className="empty">
            Nothing saved yet. Open any playbook in the Gym, hit “write my own version”, or type a line above.
          </div>
          <button className="btn sm full" style={{ marginTop: 10 }} onClick={() => go('gym')}>
            <Ico name="play" size={12} /> Browse playbooks
          </button>
        </div>
      ) : (
        <div className="grid g2">
          {filtered.map((s) => (
            <div key={s.id} className="card">
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
                <span className="chip mint" style={{ fontSize: 10 }}>{s.tag}</span>
                <span className="tiny dim">{s.uses || 0} reps</span>
              </div>
              <p style={{ margin: '0 0 12px', fontSize: 14, lineHeight: 1.55 }}>{s.text}</p>
              <div className="row" style={{ gap: 6, justifyContent: 'space-between' }}>
                <button className="icon-btn" aria-label="Hear this line" onClick={() => speech.speak(s.text, 0.9)}
                  style={{ background: 'none', border: 0, cursor: 'pointer', color: 'inherit', opacity: 0.6, padding: 2 }}>
                  <Ico name="play" size={12} />
                </button>
                <button className="btn sm primary" onClick={() => setOpenId(s.id)}>
                  <Ico name="mic" size={12} /> Rehearse
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
