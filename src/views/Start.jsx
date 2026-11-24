import React, { useMemo, useState } from 'react';
import { Ico, Bar } from '../components/ui';
import { ASSESS_QUESTIONS, ASSESS_SITUATIONS, ASSESS_DIMENSIONS, scoreAssessment } from '../../server/content/assessment.js';

const KEY = 'charisma-lab.assessment.v1';
const BAND = {
  starting: { label: 'Starting from zero', tone: 'rose', note: 'Good. Zero is the honest place to begin, and everything here is open to you today.' },
  building: { label: 'Building', tone: 'amber', note: 'You have the instincts. What is missing is the repeatable structure underneath them.' },
  strong: { label: 'Strong', tone: 'mint', note: 'You are already good at parts of this. The gains now come from the two weakest dimensions.' },
};

const load = () => {
  try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { return null; }
};

export default function Start({ content, go, notify }) {
  const saved = useMemo(load, []);
  const [stage, setStage] = useState(saved ? 'result' : 'intro');
  const [answers, setAnswers] = useState(saved?.answers || {});
  const [situation, setSituation] = useState(saved?.situation || '');
  const [result, setResult] = useState(saved?.result || null);

  const answered = ASSESS_QUESTIONS.filter((q) => answers[q.id] != null).length;
  const ready = answered === ASSESS_QUESTIONS.length;

  const finish = () => {
    const r = scoreAssessment(answers, situation);
    setResult(r);
    setStage('result');
    try { localStorage.setItem(KEY, JSON.stringify({ answers, situation, result: r, at: new Date().toISOString() })); } catch { /* quota */ }
    notify?.(`Your focus: ${ASSESS_DIMENSIONS.find((d) => d.id === r.weakest[0])?.name || 'opening'}`);
  };

  const retake = () => { setStage('intro'); setResult(null); setAnswers({}); };

  if (stage === 'intro') {
    const first = !saved;
    return (
      <div className="stack">
        <div className="card">
          <div className="row wrap" style={{ gap: 10, marginBottom: 10 }}>
            <span className="chip mint" style={{ fontSize: 10 }}><Ico name="compass" size={10} /> Start here</span>
            <span className="chip" style={{ fontSize: 10 }}>2 minutes</span>
            <span className="chip" style={{ fontSize: 10 }}>nothing is locked</span>
          </div>
          <h2 style={{ fontSize: 21, margin: '0 0 10px' }}>
            {first ? 'There is a lot in here. Let us find your three things.' : 'Take the assessment again'}
          </h2>
          <p className="card-desc">
            Twelve honest questions. It scores five dimensions — opening, depth, humour, difficult conversations and
            presence — and gives you a route: the playbook to do tonight, the chapter that explains it, and the module
            that trains it. It is not a grade and nothing unlocks anything. You can ignore the result and open
            everything anyway.
          </p>
          <div className="row wrap" style={{ gap: 8, marginTop: 14 }}>
            <button className="btn sm primary" onClick={() => setStage('quiz')}>
              <Ico name="play" size={12} /> Twelve questions
            </button>
            <button className="btn sm" onClick={() => go('dashboard')}>Skip to the dashboard</button>
          </div>
        </div>

        <div className="grid g2">
          {[
            ['You will answer honestly', 'Answer for the last month, not for your best day. A flattering score routes you to the wrong room.', 'check'],
            ['You get a route, not a ranking', 'Three specific pieces of the app, chosen from your weakest dimension and the situation you named.', 'compass'],
            ['Nothing is gated', 'Every course day, playbook and module is open right now. This is a suggestion engine, not a lock.', 'target'],
          ].map(([t, d, ico]) => (
            <div key={t} className="card">
              <div className="card-title" style={{ marginBottom: 6 }}><Ico name={ico} size={13} /> {t}</div>
              <p className="card-desc" style={{ margin: 0 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (stage === 'quiz') {
    return (
      <div className="stack">
        <div className="card">
          <div className="row wrap" style={{ justifyContent: 'space-between', gap: 8 }}>
            <div className="card-title" style={{ margin: 0 }}>Answer for the last month</div>
            <span className="chip mint" style={{ fontSize: 10 }}>{answered} / {ASSESS_QUESTIONS.length}</span>
          </div>
          <Bar value={(answered / ASSESS_QUESTIONS.length) * 100} tone="violet" height={6} />
        </div>

        {ASSESS_QUESTIONS.map((q, i) => (
          <div key={q.id} className="card">
            <div className="row wrap" style={{ gap: 8, marginBottom: 10 }}>
              <span className="day-badge" style={{ width: 24, height: 24, fontSize: 10 }}>{i + 1}</span>
              <span className="tiny dim">{ASSESS_DIMENSIONS.find((d) => d.id === q.dim)?.name}</span>
            </div>
            <p style={{ margin: '0 0 12px', fontSize: 14, lineHeight: 1.6 }}>{q.text}</p>
            <div className="row wrap" style={{ gap: 6 }}>
              {[['Not yet', 0], ['Sometimes', 1], ['Often', 2]].map(([label, v]) => (
                <button
                  key={label}
                  className={`chip clickable ${answers[q.id] === v ? 'active' : ''}`} aria-pressed={answers[q.id] === v}
                  style={{ fontSize: 11 }}
                  onClick={() => setAnswers((a) => ({ ...a, [q.id]: v }))}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="card">
          <div className="card-title" style={{ marginBottom: 10 }}>Where do you need this most right now?</div>
          <div className="row wrap" style={{ gap: 6 }}>
            {ASSESS_SITUATIONS.map((s) => (
              <button
                key={s.id}
                className={`chip clickable ${situation === s.id ? 'active' : ''}`} aria-pressed={situation === s.id}
                onClick={() => setSituation(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="row wrap" style={{ gap: 8 }}>
          <button className="btn primary" onClick={finish} disabled={!ready}>
            <Ico name="check" size={13} /> Show my route {ready ? '' : `(${ASSESS_QUESTIONS.length - answered} left)`}
          </button>
          <button className="btn" onClick={() => setStage('intro')}>Back</button>
        </div>
      </div>
    );
  }

  // ── result ──
  const band = BAND[result.band] || BAND.building;
  const focusDim = result.dims.find((d) => d.id === result.weakest[0]);
  const pb = (id) => (content?.gym || []).find((g) => g.id === id);
  const chapter = (id) => (content?.library || []).find((l) => l.id === id);
  const module_ = (id) => (content?.academy || []).find((m) => m.id === id);

  return (
    <div className="stack">
      <div className="card">
        <div className="row wrap" style={{ gap: 8, marginBottom: 10 }}>
          <span className={`chip ${band.tone}`} style={{ fontSize: 10 }}>{band.label}</span>
          <span className="chip" style={{ fontSize: 10 }}>overall {result.total}/100</span>
          <div className="spacer" />
          <button className="chip clickable" style={{ fontSize: 10 }} onClick={retake}>retake</button>
        </div>
        <h2 style={{ fontSize: 20, margin: '0 0 8px' }}>
          Start with {focusDim?.name.toLowerCase()}
        </h2>
        <p className="card-desc" style={{ marginBottom: 12 }}>{band.note}</p>
        <div className="lesson-example">
          <div className="lesson-label mint">The one line to carry</div>
          <p style={{ margin: 0 }}>{result.route.line}</p>
        </div>
      </div>

      <div className="card">
        <div className="card-title" style={{ marginBottom: 12 }}>Your five dimensions</div>
        <div className="stack sm">
          {result.dims.map((d) => (
            <div key={d.id}>
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 5 }}>
                <span className="tiny" style={{ fontWeight: 600 }}>{d.name}</span>
                <span className={`tiny ${d.band === 'starting' ? 'rose' : d.band === 'building' ? 'amber' : 'mint'}`}>{d.score}</span>
              </div>
              <Bar value={d.score} tone={d.tone} height={6} />
              <div className="tiny dim" style={{ marginTop: 4 }}>{d.blurb}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title" style={{ marginBottom: 10 }}>Your route · four steps</div>
        <div className="stack sm">
          {result.route.steps.map((s, i) => {
            const p = s.kind === 'gym' ? pb(s.id) : null;
            const c = s.kind === 'chapter' ? chapter(s.id) : null;
            const m = s.kind === 'module' ? module_(s.id) : null;
            const title = p?.title || c?.title || m?.name || 'Rehearse it live in the Arena';
            const onClick = () => {
              if (s.kind === 'gym') go('gym', { openId: s.id });
              else if (s.kind === 'chapter') go('library', { openId: s.id });
              else if (s.kind === 'module') go('academy', { moduleId: s.id });
              else go('arena');
            };
            return (
              <div key={i} className="row wrap" style={{ gap: 10, alignItems: 'flex-start' }}>
                <span className="day-badge" style={{ width: 24, height: 24, fontSize: 10, flexShrink: 0 }}>{i + 1}</span>
                <div style={{ flex: 1, minWidth: 180 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{title}</div>
                  <div className="tiny dim">{s.why}</div>
                </div>
                <button className="btn sm" onClick={onClick}>
                  <Ico name="arrow" size={11} /> Open
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card">
        <div className="card-title" style={{ marginBottom: 10 }}>Also worth your evening</div>
        <div className="row wrap" style={{ gap: 6 }}>
          {result.route.chapters.slice(1).map((id) => {
            const c = chapter(id);
            return c ? (
              <button key={id} className="chip clickable" style={{ fontSize: 10 }} onClick={() => go('library', { openId: id })}>
                <Ico name="library" size={10} /> {c.title}
              </button>
            ) : null;
          })}
          <button className="chip clickable" style={{ fontSize: 10 }} onClick={() => go('gym')}>
            <Ico name="target" size={10} /> all {content.gym?.length || 41} playbooks
          </button>
          <button className="chip clickable" style={{ fontSize: 10 }} onClick={() => go('daily')}>
            <Ico name="spark" size={10} /> today&rsquo;s dojo
          </button>
        </div>
      </div>
    </div>
  );
}
