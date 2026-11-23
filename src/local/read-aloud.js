// ─────────────────────────────────────────────────────────────
//  Global read-aloud
//  Every scripted line in the app becomes tappable: click (or
//  Enter on a focused line) and the browser reads it aloud.
//  No audio files, no network — Web Speech only.
// ─────────────────────────────────────────────────────────────

const SEL = '.script-line, .lesson-example p';

function textOf(el) {
  const clone = el.cloneNode(true);
  clone.querySelectorAll('.script-who, button, audio, svg').forEach((n) => n.remove());
  return (clone.textContent || '').replace(/\s+/g, ' ').trim();
}

function speak(text) {
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  if (!synth || !text) return;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.92;
  u.pitch = 1;
  const voices = synth.getVoices?.() || [];
  const pref = voices.find((v) => /Samantha|Google UK English Female|Google US English|Microsoft (Aria|Jenny)/i.test(v.name))
    || voices.find((v) => v.lang?.startsWith('en'));
  if (pref) u.voice = pref;
  synth.speak(u);
}

export function attachReadAloud(root = document.body) {
  const mark = () => {
    root.querySelectorAll(SEL).forEach((el) => {
      if (el.dataset.ra) return;
      el.dataset.ra = '1';
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      const t = textOf(el);
      if (t) el.setAttribute('aria-label', `Read aloud: ${t.slice(0, 90)}`);
      el.title = 'Click to hear this read aloud';
      el.classList.add('ra-line');
    });
  };

  const onClick = (e) => {
    if (e.target.closest('button, a, input, textarea, audio')) return;
    const el = e.target.closest(SEL);
    if (!el) return;
    speak(textOf(el));
  };

  const onKey = (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const el = e.target.closest?.(SEL);
    if (!el || e.target.closest('button')) return;
    e.preventDefault();
    speak(textOf(el));
  };

  document.addEventListener('click', onClick, true);
  document.addEventListener('keydown', onKey);

  let t = null;
  const MO = typeof MutationObserver !== 'undefined' ? MutationObserver
    : typeof window !== 'undefined' ? window.MutationObserver : null;
  const mo = MO ? new MO(() => {
    window.clearTimeout(t);
    t = window.setTimeout(mark, 120);
  }) : { disconnect() {} };
  try { mo.observe(root, { childList: true, subtree: true }); } catch { /* headless */ }
  mark();

  return () => {
    document.removeEventListener('click', onClick, true);
    document.removeEventListener('keydown', onKey);
    mo.disconnect();
    window.clearTimeout(t);
  };
}
