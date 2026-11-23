import React from 'react';

export const Ico = ({ name, size = 16, ...p }) => {
  const paths = ICONS[name] || ICONS.dot;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...p}>
      {paths}
    </svg>
  );
};

const ICONS = {
  dashboard: <><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></>,
  book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>,
  mic: <><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="22" /></>,
  wave: <><path d="M2 12h3l2-7 3 14 2-9 2 5 2-3h6" /></>,
  spark: <><path d="M13 2 3 14h7l-1 8 11-13h-7l1-7z" /></>,
  chat: <><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-4-.9L3 21l1.9-4.4A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z" /></>,
  eye: <><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" /><circle cx="12" cy="12" r="3" /></>,
  library: <><path d="M4 4h4v16H4z" /><path d="M10 4h4v16h-4z" /><path d="m16 5 3.5-1 3 15.5-3.5 1z" /></>,
  flame: <><path d="M12 2s5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 1-3s-3 1-3 5a7 7 0 0 0 14 0c0-6-7-12-7-12z" /></>,
  check: <><path d="m20 6-11 11-5-5" /></>,
  play: <><path d="m6 3 14 9-14 9V3z" /></>,
  pause: <><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></>,
  stop: <><rect x="5" y="5" width="14" height="14" rx="2" /></>,
  arrow: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
  refresh: <><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /><path d="M3 21v-5h5" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" /></>,
  bolt: <><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" /></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  menu: <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>,
  x: <><path d="M18 6 6 18M6 6l12 12" /></>,
  chevron: <><path d="m9 18 6-6-6-6" /></>,
  trophy: <><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" /><path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3" /></>,
  brain: <><path d="M9 3a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 3 3V3z" /><path d="M15 3a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-3 3V3z" /></>,
  pen: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></>,
  gear: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H10a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V10a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></>,
  download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /><path d="M12 15V3" /></>,
  upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m17 8-5-5-5 5" /><path d="M12 3v12" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m16 8-2.5 5.5L8 16l2.5-5.5z" /></>,
  trash: <><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 14H6L5 6" /></>,
  dot: <circle cx="12" cy="12" r="3" />,
};

export const Ring = ({ value = 0, size = 92, stroke = 8, color = 'url(#ringGrad)', label = 'score', suffix = '' }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value)) / 100;
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id="ringGood" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id="ringWarn" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          stroke={value >= 75 ? 'url(#ringGood)' : value >= 50 ? 'url(#ringGrad)' : 'url(#ringWarn)'}
          strokeWidth={stroke} fill="none" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - pct)}
          style={{ transition: 'stroke-dashoffset 0.9s cubic-bezier(0.2,0.9,0.2,1)' }}
        />
      </svg>
      <div className="ring-label">
        <div className="ring-num">{Math.round(value)}{suffix}</div>
        <div className="ring-cap">{label}</div>
      </div>
    </div>
  );
};

export const Bar = ({ value, tone = '', height = 7 }) => (
  <div className={`bar ${tone}`} style={{ height }}>
    <i style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
  </div>
);

export const Stat = ({ label, value, note, tone = 'violet' }) => (
  <div className="card stat-card">
    <div className="stat-lab">{label}</div>
    <div className="stat-val" style={{ color: TONE[tone] }}>{value}</div>
    {note && <div className="stat-note">{note}</div>}
  </div>
);

export const TONE = {
  violet: '#a78bfa', cyan: '#22d3ee', mint: '#34d399', amber: '#fbbf24',
  rose: '#fb7185', orange: '#fb923c', text: '#f2f2f7',
};

export const Toast = ({ msg }) => (msg ? <div className="toast"><Ico name="check" size={15} />{msg}</div> : null);

export const ScoreRow = ({ name, value, tone }) => (
  <div className="score-row">
    <div className="score-name">{name}</div>
    <div className="score-bar"><Bar value={value} tone={tone || (value >= 75 ? 'mint' : value >= 55 ? '' : 'amber')} /></div>
    <div className="score-val">{Math.round(value)}</div>
  </div>
);

export const Spinner = () => <span className="spin" />;

export const Empty = ({ children = 'Nothing here yet.' }) => <div className="empty">{children}</div>;
