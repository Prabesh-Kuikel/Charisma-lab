import React, { useMemo, useRef, useState } from 'react';
import { Ico } from '../components/ui';
import { appKeys, exportJSON, importJSON, downloadBackup, clearAll, snapshotData } from '../local/backup';
import { getAIConfig, setAIConfig, AI_PROVIDERS } from '../local/ai-client';

const fmtBytes = (n) => (n < 1024 ? `${n} B` : n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / 1048576).toFixed(1)} MB`);

function bytesOf() {
  let total = 0;
  for (const k of appKeys()) {
    try { total += (localStorage.getItem(k) || '').length * 2; } catch { /* skip */ }
  }
  return total;
}

export default function Settings({ stats, notify, refresh, go, onWipe }) {
  const [msg, setMsg] = useState(null);
  const [confirmWipe, setConfirmWipe] = useState('');
  const fileRef = useRef(null);
  const [importMode, setImportMode] = useState('merge');
  const [ai, setAi] = useState(() => getAIConfig());
  const [showAdvanced, setShowAdvanced] = useState(false);

  const snap = useMemo(() => snapshotData(), [msg]);
  const bytes = useMemo(() => bytesOf(), [msg, stats?.user?.xp]);
  const keys = useMemo(() => appKeys(), [msg]);

  const say = (m) => { setMsg(m); notify?.(m); };

  const doExport = () => {
    const name = downloadBackup();
    say(`Saved ${name}`);
  };

  const doImport = async (file) => {
    try {
      const text = await file.text();
      const res = importJSON(text, importMode);
      say(`Restored ${res.written} stores (${importMode}) — reloading`);
      setTimeout(() => window.location.reload(), 700);
    } catch (e) {
      say(e.message);
    }
  };

  const saveAi = () => {
    setAIConfig(ai);
    say('AI settings saved');
  };

  const wipe = () => {
    if (confirmWipe !== 'DELETE') { say('Type DELETE to confirm'); return; }
    try { downloadBackup('charisma-lab-before-reset.json'); } catch { /* still wipe */ }
    clearAll();
    onWipe?.();
    say('Wiped. A backup was downloaded first, just in case.');
    setTimeout(() => window.location.reload(), 900);
  };

  const c = snap.counts || {};

  return (
    <div className="stack">
      <div className="card">
        <div className="card-title"><Ico name="download" size={14} /> Your progress lives in this browser</div>
        <p className="card-desc" style={{ marginTop: 8 }}>
          There is no account and no server — everything you do is stored on this device only. That is private, and it
          is also fragile: clearing site data, a different browser, or a new laptop means starting from zero. Export a
          backup after a good week and you can move or recover everything.
        </p>
        <div className="row wrap" style={{ gap: 8, marginTop: 14 }}>
          <button className="btn sm primary" onClick={doExport}>
            <Ico name="download" size={12} /> Download backup
          </button>
          <button className="btn sm" onClick={() => fileRef.current?.click()}>
            <Ico name="upload" size={12} /> Restore from file
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            aria-label="Choose a backup file to restore"
            style={{ display: 'none' }}
            onChange={(e) => { const f = e.target.files?.[0]; if (f) doImport(f); e.target.value = ''; }}
          />
          <div className="row" style={{ gap: 4 }}>
            <button className={`chip clickable ${importMode === 'merge' ? 'active' : ''}`} aria-pressed={importMode === 'merge'} style={{ fontSize: 10 }} onClick={() => setImportMode('merge')}>merge</button>
            <button className={`chip clickable ${importMode === 'replace' ? 'active' : ''}`} aria-pressed={importMode === 'replace'} style={{ fontSize: 10 }} onClick={() => setImportMode('replace')}>replace</button>
          </div>
        </div>
        <div className="tiny dim" style={{ marginTop: 10 }}>
          <strong>merge</strong> keeps whichever side has more XP and unions your days and sessions — the safe default.{' '}
          <strong>replace</strong> overwrites this browser completely.
        </div>
      </div>

      <div className="grid g2">
        <div className="card">
          <div className="card-title" style={{ marginBottom: 10 }}>What is in the backup</div>
          <div className="stack sm">
            <Row label="Experience" value={`${c.xp ?? 0} XP`} />
            <Row label="Days trained" value={c.activityDays ?? 0} />
            <Row label="Course days completed" value={c.courseDays ?? 0} />
            <Row label="Scored sessions" value={c.sessions ?? 0} />
            <Row label="Playbooks in rotation" value={c.playbooksInRotation ?? 0} />
            <Row label="My Scripts" value={c.myScripts ?? 0} />
          </div>
        </div>

        <div className="card">
          <div className="card-title" style={{ marginBottom: 10 }}>Storage on this device</div>
          <div className="stack sm">
            <Row label="Used by Charisma Lab" value={fmtBytes(bytes)} />
            <Row label="Separate stores" value={keys.length} />
            <Row label="Mode" value={stats?.storage === 'browser' ? 'browser-only' : 'server'} />
          </div>
          <details style={{ marginTop: 12 }}>
            <summary className="tiny dim" style={{ cursor: 'pointer' }}>Show the keys</summary>
            <div className="mono tiny dim" style={{ marginTop: 8, lineHeight: 1.7, wordBreak: 'break-all' }}>
              {keys.map((k) => <div key={k}>{k.replace('charisma-lab.', '· ')}</div>)}
              <div>· ai.v1 (never exported — holds your key)</div>
            </div>
          </details>
        </div>
      </div>

      <div className="card">
        <div className="card-title"><Ico name="spark" size={14} /> AI provider</div>
        <p className="card-desc" style={{ marginTop: 8 }}>
          Optional. The rules-based Coach, the Arena engine and every score in this app work with no key at all. A key
          only unlocks free-form model answers in the Coach and the Arena persona.
        </p>
        <div className="row wrap" style={{ gap: 6, marginTop: 12 }}>
          {AI_PROVIDERS.map((p) => (
            <button
              key={p.id}
              className={`chip clickable ${ai.provider === p.id ? 'active' : ''}`} aria-pressed={ai.provider === p.id}
              style={{ fontSize: 10 }}
              onClick={() => setAi({ ...ai, provider: p.id })}
            >
              {p.name}{p.keyless ? ' · keyless' : ' · key'}
            </button>
          ))}
        </div>
        {!AI_PROVIDERS.find((p) => p.id === ai.provider)?.keyless && (
          <input
            className="input"
            type="password"
            placeholder="Paste your API key — it stays in this browser"
            value={ai.key || ''}
            onChange={(e) => setAi({ ...ai, key: e.target.value })}
            style={{ width: '100%', marginTop: 10 }}
            aria-label="API key" />
        )}
        <div className="row wrap" style={{ gap: 8, marginTop: 12 }}>
          <button className="btn sm primary" onClick={saveAi}><Ico name="check" size={12} /> Save AI settings</button>
          <button className="chip clickable" style={{ fontSize: 10 }} onClick={() => setShowAdvanced((v) => !v)}>
            {showAdvanced ? 'hide' : 'show'} advanced
          </button>
        </div>
        {showAdvanced && (
          <div className="stack sm" style={{ marginTop: 10 }}>
            <input className="input" placeholder="Model (blank = provider default)" value={ai.model || ''}
              onChange={(e) => setAi({ ...ai, model: e.target.value })} aria-label="Model" style={{ width: '100%' }} />
            <input className="input" placeholder="Base URL (blank = default)" value={ai.baseUrl || ''}
              onChange={(e) => setAi({ ...ai, baseUrl: e.target.value })} aria-label="Base URL" style={{ width: '100%' }} />
          </div>
        )}
        <div className="tiny dim" style={{ marginTop: 10 }}>
          Keys are stored in <span className="mono">charisma-lab.ai.v1</span> and are deliberately excluded from every
          backup file.
        </div>
      </div>

      <div className="card">
        <div className="card-title">Read aloud & voice</div>
        <p className="card-desc" style={{ marginTop: 8 }}>
          Every scripted line in the app is spoken by your browser's own speech engine — no audio is downloaded and no
          text is sent anywhere. If a line stays silent, the browser has no English voice installed: on Chrome and Edge
          that is usually already there; on Firefox you may need to add one. Recording uses the microphone only while the
          record button is pressed, and the audio never leaves the page.
        </p>
        <button className="btn sm" style={{ marginTop: 10 }} onClick={() => speakTest()}>
          <Ico name="play" size={12} /> Test speech
        </button>
      </div>

      <div className="card" style={{ borderColor: 'rgba(251, 113, 133, .35)' }}>
        <div className="card-title" style={{ color: '#fb7185' }}><Ico name="trash" size={14} /> Start over</div>
        <p className="card-desc" style={{ marginTop: 8 }}>
          This erases every rep, score, script and review date in this browser. A backup is downloaded automatically
          before anything is deleted, so this is reversible.
        </p>
        <div className="row wrap" style={{ gap: 8, marginTop: 12 }}>
          <input
            className="input"
            placeholder="Type DELETE"
            value={confirmWipe}
            onChange={(e) => setConfirmWipe(e.target.value)}
            style={{ width: 160 }}
            aria-label="Type DELETE to confirm" />
          <button className="btn sm" onClick={wipe} disabled={confirmWipe !== 'DELETE'}>
            <Ico name="trash" size={12} /> Erase everything
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-title" style={{ marginBottom: 10 }}>Not built yet — honestly</div>
        <ul className="lesson-list">
          <li><strong>Offline install.</strong> There is a service worker: open the app once online and it installs; after that a hard reload works with the network off. On a very first visit offline, nothing can load — the shell has not been stored yet.</li>
          <li><strong>Cross-device sync.</strong> A file backup is the only bridge between machines. No accounts, no sync server.</li>
          <li><strong>Smaller first load.</strong> Courses and the chapter reader load on demand, and the search index builds when you first open search, not at boot. The core app is still ~160 kB gzipped in one chunk — breaking it up further is the next structural job.</li>
        </ul>
        <button className="chip clickable" style={{ fontSize: 10, marginTop: 12 }} onClick={() => go('start')}>
          <Ico name="compass" size={10} /> take the assessment instead
        </button>
      </div>

      {msg && <div className="card mint tiny">{msg}</div>}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="row" style={{ justifyContent: 'space-between', gap: 10 }}>
      <span className="tiny dim">{label}</span>
      <span className="tiny" style={{ fontWeight: 600 }}>{value}</span>
    </div>
  );
}

function speakTest() {
  try {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance('The pause is the persuasive part. This line is being read by your browser.');
    u.rate = 0.95;
    synth.speak(u);
  } catch { /* nothing to do */ }
}
