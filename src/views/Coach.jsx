import React, { useEffect, useRef, useState } from 'react';
import { api } from '../api';
import { Ico, Spinner } from '../components/ui';
import { askAI, getAIConfig, setAIConfig, AI_PROVIDERS, cooldownLeft, aiEnabled } from '../local/ai-client.js';

const MODE_LABEL = { general: 'General', sales: 'Sales', persuasion: 'Persuasion', flirting: 'Flirting', negotiation: 'Negotiation', creator: 'Creator' };

export default function Coach({ content, notify, go, boot }) {
  const modes = content.coachModes || [{ id: 'general', label: 'General' }];
  // Deep links carry a mode (`go('coach', { mode: 'storytelling' })`), and it
  // used to be dropped: every wing that offered "take it to the coach" landed
  // the user in General and they had to re-pick the focus by hand.
  const bootMode = boot?.mode && modes.some((m) => m.id === boot.mode) ? boot.mode : null;
  const [mode, setMode] = useState(bootMode || 'general');
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [thread, setThread] = useState([]);
  const [starters, setStarters] = useState([]);
  const [showWhy, setShowWhy] = useState(true);
  const [useAI, setUseAI] = useState(() => aiEnabled());
  const [aiCfg, setAiCfg] = useState(() => getAIConfig());
  const [showSettings, setShowSettings] = useState(false);
  const [cool, setCool] = useState(0);
  const [engine, setEngine] = useState('rules');
  const boxRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const h = await api.coachHistory();
        setThread(h.map((m) => ({ role: m.role, text: m.text })));
        setStarters(await api.coachStarters(mode));
      } catch { /* first run */ }
    })();
  }, [mode]);

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [thread, busy]);

  // cooldown ticker for the free tier
  useEffect(() => {
    const id = setInterval(() => setCool(cooldownLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const callAI = async (message) => {
    const history = thread.slice(-8).map((m) => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text }));
    // the turn being answered is already the last item in `thread` — do not send it twice
    const last = history[history.length - 1];
    const messages = last && last.role === 'user' && last.content === message
      ? history
      : [...history, { role: 'user', content: message }];
    const out = await askAI({ messages, mode });
    return {
      text: out.text, reply: out.text, kind: 'ai',
      why: `Answered by ${out.model || out.provider} in ${out.ms}ms.`,
      drills: [], engine: out.provider,
    };
  };

  const send = async (text) => {
    const message = String(text ?? input).trim();
    if (!message || busy) return;
    setInput('');
    setThread((t) => [...t, { role: 'user', text: message }]);
    setBusy(true);

    if (useAI && aiEnabled()) {
      try {
        const r = await callAI(message);
        setEngine(r.engine);
        setThread((t) => [...t, { role: 'coach', ...r }]);
        setBusy(false);
        return;
      } catch (e) {
        setEngine('rules');
        if (e.name === 'RateLimit') {
          notify(`Free AI tier: ${e.retryAfter}s cooldown — answering locally meanwhile`);
          setCool(e.retryAfter);
        } else {
          notify(`AI unavailable (${e.message.slice(0, 60)}) — local coach answering`);
        }
      }
    }

    try {
      const r = await api.coach({ message, mode });
      setThread((t) => [...t, {
        role: 'coach', text: r.reply, why: r.why, q: r.q,
        drills: r.drills || [], stats: r.stats, kind: r.kind,
      }]);
    } catch (e) {
      notify(e.message);
      setThread((t) => [...t, { role: 'coach', text: 'Something went wrong on this device. Try again.' }]);
    }
    setBusy(false);
  };

  const clear = async () => {
    try { await api.coachReset(); setThread([]); notify('Thread cleared'); } catch { /* ignore */ }
  };

  return (
    <div className="grid split">
      <div className="stack">
        <div className="card">
          <div className="row wrap" style={{ gap: 6, marginBottom: 10 }}>
            {modes.map((m) => (
              <button key={m.id} className={`chip clickable ${mode === m.id ? 'active' : ''}`} aria-pressed={mode === m.id} onClick={() => setMode(m.id)}>
                {m.label}
              </button>
            ))}
          </div>
          <div className="card-desc">{modes.find((m) => m.id === mode)?.hint || 'Ask about any conversation.'}</div>
          <div className="row wrap" style={{ gap: 8, marginTop: 10 }}>
            <button className={`chip clickable ${useAI ? 'active' : ''}`} aria-pressed={useAI} onClick={() => { setUseAI((v) => !v); notify(useAI ? 'Local coach only' : 'AI coach on'); }}>
              <Ico name="spark" size={11} /> {useAI ? 'AI coach on' : 'AI coach off'}
            </button>
            <button className="chip clickable" onClick={() => setShowSettings((v) => !v)}>
              <Ico name="menu" size={11} /> AI settings
            </button>
            <span className="chip" style={{ fontSize: 10 }}>engine: {cool > 0 ? `local · ${cool}s` : engine}</span>
          </div>
        </div>

        {showSettings && (
          <div className="card fade-in">
            <div className="card-title">Conversational AI</div>
            <p className="card-desc" style={{ marginBottom: 10 }}>
              The free public provider needs no key but throttles to one reply per ~45 seconds.
              A local Ollama model or your own key removes the limit.
            </p>
            <div className="row wrap" style={{ gap: 8, marginBottom: 10 }}>
              {AI_PROVIDERS.map((p) => (
                <button key={p.id} className={`chip clickable ${aiCfg.provider === p.id ? 'active' : ''}`} aria-pressed={aiCfg.provider === p.id}
                  onClick={() => setAiCfg(setAIConfig({ provider: p.id }))}>{p.name}</button>
              ))}
            </div>
            <div className="tiny dim" style={{ marginBottom: 10 }}>
              {AI_PROVIDERS.find((p) => p.id === aiCfg.provider)?.note}
            </div>
            <div className="row wrap" style={{ gap: 8 }}>
              <input className="input" style={{ flex: '1 1 200px' }} placeholder="model (optional)" aria-label="Model override" 
                value={aiCfg.model} onChange={(e) => setAiCfg(setAIConfig({ model: e.target.value }))} />
              {aiCfg.provider !== 'pollinations' && (
                <input className="input" style={{ flex: '2 1 260px' }} placeholder="API key (stored only in this browser)" aria-label="API key" 
                  type="password" value={aiCfg.key} onChange={(e) => setAiCfg(setAIConfig({ key: e.target.value }))} />
              )}
            </div>
            <div className="tiny dim" style={{ marginTop: 10 }}>
              {aiCfg.provider === 'ollama'
                ? 'Start it locally first: ollama run llama3.2 — then this works with no key and no limits.'
                : aiCfg.provider === 'compatible'
                  ? 'Any OpenAI-compatible endpoint works: OpenRouter free models, Groq, Together, LM Studio.'
                  : 'Free and keyless. If it throttles, the local coach answers instead — nothing breaks.'}
            </div>
          </div>
        )}

        <div className="card" style={{ padding: 0 }}>
          <div ref={boxRef} className="chat" style={{ maxHeight: '52vh', overflowY: 'auto', padding: 16 }}>
            {thread.length === 0 && (
              <div className="empty" style={{ border: 'none', background: 'transparent' }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Tell me what happened.</div>
                <div className="tiny dim">A conversation you are dreading, a line that did not land, a draft you are about to send. Paste a draft over 35 words and I will diagnose it line by line.</div>
              </div>
            )}
            {thread.map((m, i) => (
              <div key={i} className={`bubble ${m.role === 'user' ? 'you' : ''}`}>
                <div className="bubble-meta">{m.role === 'user' ? 'You' : 'Coach'}</div>
                <div style={{ whiteSpace: 'pre-wrap' }}>{m.text}</div>

                {m.stats && (
                  <div className="row wrap" style={{ gap: 6, marginTop: 10 }}>
                    <span className="chip" style={{ fontSize: 10 }}>{m.stats.words} words</span>
                    <span className="chip" style={{ fontSize: 10 }}>{m.stats.sentences} sentences</span>
                    <span className="chip" style={{ fontSize: 10 }}>avg {m.stats.avgSentence}w</span>
                    <span className={`chip ${m.stats.fillers ? 'rose' : 'mint'}`} style={{ fontSize: 10 }}>{m.stats.fillers} fillers</span>
                    <span className={`chip ${m.stats.hedges ? 'amber' : 'mint'}`} style={{ fontSize: 10 }}>{m.stats.hedges} hedges</span>
                  </div>
                )}

                {showWhy && m.why && (
                  <div className="tiny dim" style={{ marginTop: 10, borderLeft: '2px solid rgba(139,92,246,0.5)', paddingLeft: 10 }}>
                    <strong>Why:</strong> {m.why}
                  </div>
                )}

                {!!(m.drills && m.drills.length) && (
                  <div className="stack sm" style={{ marginTop: 12 }}>
                    {m.drills.map((d) => (
                      <div key={d.id} className="feedback" style={{ margin: 0 }}>
                        <div className="row" style={{ justifyContent: 'space-between', marginBottom: 4 }}>
                          <strong style={{ fontSize: 12.5 }}>Drill · {d.title}</strong>
                          <span className="chip mint" style={{ fontSize: 10 }}>{d.time} min</span>
                        </div>
                        <div className="tiny dim">{d.do}</div>
                        <div className="tiny" style={{ marginTop: 6, color: 'var(--mint)' }}>Done when: {d.success}</div>
                      </div>
                    ))}
                  </div>
                )}

                {m.q && <div className="tiny" style={{ marginTop: 10, color: 'var(--violet-soft)' }}>{m.q}</div>}
              </div>
            ))}
            {busy && <div className="bubble"><div className="bubble-meta">Coach</div><Spinner /></div>}
          </div>
        </div>

        <div className="card">
          <textarea className="textarea" style={{ minHeight: 76 }} value={input}
            placeholder="Describe the situation, or paste the draft you are about to send…" aria-label="Message to the coach" 
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) send(); }} />
          <div className="row wrap" style={{ gap: 8, marginTop: 10, justifyContent: 'space-between' }}>
            <span className="tiny dim">⌘/Ctrl + Enter to send</span>
            <div className="row" style={{ gap: 8 }}>
              <button className="btn ghost sm" onClick={clear}><Ico name="x" size={13} /> Clear</button>
              <button className="btn primary" onClick={() => send()} disabled={busy || !input.trim()}>
                {busy ? <Spinner /> : <Ico name="chat" size={15} />} Send
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="stack">
        <div className="card">
          <div className="card-title">Try one of these</div>
          <div className="stack sm" style={{ marginTop: 8 }}>
            {starters.map((s, i) => (
              <button key={i} className="chip clickable" style={{ textAlign: 'left', lineHeight: 1.5 }}
                onClick={() => send(s)}>{s}</button>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">How this assistant works</div>
          {useAI ? (
            <>
              <p className="card-desc">
                Two engines are installed. <strong style={{ color: '#a78bfa' }}>AI coach</strong> sends your last few
                turns to <strong>{aiCfg.provider}</strong> so the answer is written for your situation, word for word.
                {aiCfg.provider === 'ollama'
                  ? ' Ollama runs on your own machine, so nothing leaves the device.'
                  : ' That is a free public endpoint: your text goes to it, so leave out names and anything you would not want repeated.'}
              </p>
              <p className="card-desc" style={{ marginTop: 10 }}>
                When it is rate-limited, offline, or switched off, the{' '}
                <strong style={{ color: 'var(--text)' }}>rules engine</strong> answers instead: intent detection, the
                Impromptu Lab analyser and a bank of specific drills — entirely on your device, no network calls. It
                responds to patterns, not to meaning it has deeply understood. The label above each answer says which
                engine spoke.
              </p>
            </>
          ) : (
            <>
              <p className="card-desc">
                It runs entirely on your device: intent detection over what you type, the same analyser used in the
                Impromptu Lab, and a bank of specific drills. No API key, no network calls, nothing stored on a server.
              </p>
              <p className="card-desc" style={{ marginTop: 10 }}>
                That makes it fast and private, and it also means it is honest about its limits: it responds to patterns,
                not to meaning it has deeply understood. Paste real text and it gets useful, because real text has patterns.
                Turn on <strong style={{ color: 'var(--text)' }}>AI coach</strong> above if you want a real model instead.
              </p>
            </>
          )}
          <label className="row tiny dim" style={{ gap: 8, marginTop: 12, cursor: 'pointer' }}>
            <input type="checkbox" checked={showWhy} onChange={(e) => setShowWhy(e.target.checked)} />
            Show the reasoning under each answer
          </label>
        </div>

        <div className="card">
          <div className="card-title">Coach escalates</div>
          <p className="card-desc" style={{ marginBottom: 10 }}>When you are ready to practise rather than discuss:</p>
          <div className="row wrap" style={{ gap: 6 }}>
            <button className="chip clickable" onClick={() => go('arena')}>Conversation Arena</button>
            <button className="chip clickable" onClick={() => go('games')}>Games</button>
            <button className="chip clickable" onClick={() => go('skills')}>Skill tracks</button>
            <button className="chip clickable" onClick={() => go('impromptu')}>Impromptu</button>
          </div>
        </div>
      </div>
    </div>
  );
}
