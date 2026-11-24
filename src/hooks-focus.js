import { useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────
//  Focus management for dialogs
//  Two things every modal owes a keyboard user, and both were
//  missing from the palette and the shortcuts sheet:
//    1. Tab and Shift-Tab cycle inside the dialog instead of
//       escaping into the page behind it;
//    2. closing returns focus to whatever opened it, so you are
//       not dumped at the top of the document.
//  Escape is left to the caller, which already handles it.
// ─────────────────────────────────────────────────────────────
const FOCUSABLE = [
  'a[href]', 'button:not([disabled])', 'input:not([disabled])', 'select:not([disabled])',
  'textarea:not([disabled])', '[tabindex]:not([tabindex="-1"])',
].join(',');

export function useFocusTrap(active, containerRef, initialRef) {
  const restoreRef = useRef(null);

  useEffect(() => {
    if (!active) return undefined;
    // remember the opener *before* focus moves, so closing can restore it
    restoreRef.current = typeof document !== 'undefined' ? document.activeElement : null;

    const focusFirst = () => {
      const target = initialRef?.current || containerRef.current?.querySelector(FOCUSABLE);
      target?.focus?.();
    };
    // the dialog needs a frame to exist before it can take focus
    const t = typeof requestAnimationFrame === 'function' ? requestAnimationFrame(focusFirst) : setTimeout(focusFirst, 0);

    const onKey = (e) => {
      if (e.key !== 'Tab') return;
      const root = containerRef.current;
      if (!root) return;
      const items = [...root.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      // no activeElement inside the trap (e.g. focus on body) → pull it back in
      if (!root.contains(document.activeElement)) { e.preventDefault(); first.focus(); return; }
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };

    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('keydown', onKey, true);
      if (typeof cancelAnimationFrame === 'function') cancelAnimationFrame(t); else clearTimeout(t);
      const back = restoreRef.current;
      // only restore if the opener is still in the document
      if (back && back.isConnected && typeof back.focus === 'function') back.focus();
    };
  }, [active, containerRef, initialRef]);
}

export default useFocusTrap;
