import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

createRoot(document.getElementById('root')).render(<App />);

// ── offline shell ────────────────────────────────────────────
// The app keeps everything on the device but still needed the network to
// open. Registering the service worker makes the second visit work on a
// plane, and a new deploy is picked up on the next online load.
//
// Deliberately quiet: a failed registration must never break the app (an
// insecure context, a file:// open, or a browser with workers disabled all
// land here), and the "new version" prompt appears at most once.
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('./sw.js', { scope: './' });
      // a worker waiting means a newer build is installed and idle
      const announce = (worker) => {
        if (!worker) return;
        window.dispatchEvent(new CustomEvent('cl:update-ready', { detail: worker }));
      };
      if (reg.waiting) announce(reg.waiting);
      reg.addEventListener('updatefound', () => {
        const w = reg.installing;
        if (!w) return;
        w.addEventListener('statechange', () => {
          if (w.state === 'installed' && navigator.serviceWorker.controller) announce(w);
        });
      });
    } catch { /* no offline support: the app still works online */ }
  });
}

// Let the app tell a waiting worker to take over (used by the update toast).
window.addEventListener('cl:apply-update', () => {
  navigator.serviceWorker?.getRegistration().then((reg) => {
    reg?.waiting?.postMessage('SKIP_WAITING');
    window.location.reload();
  }).catch(() => window.location.reload());
});
