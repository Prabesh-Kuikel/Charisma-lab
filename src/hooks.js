import { useCallback, useEffect, useRef, useState } from 'react';

// ── Recording + live level metering + speech recognition ──
export function useRecorder() {
  const [recording, setRecording] = useState(false);
  const [level, setLevel] = useState(0);
  const [levels, setLevels] = useState(new Array(40).fill(3));
  const [audioUrl, setAudioUrl] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [interim, setInterim] = useState('');
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState(null);
  const [rmsStats, setRmsStats] = useState({ mean: 0, variance: 0, pauseCount: 0, seconds: 0 });

  const streamRef = useRef(null);
  const recRef = useRef(null);
  const chunksRef = useRef([]);
  const audioCtxRef = useRef(null);
  const rafRef = useRef(null);
  const srRef = useRef(null);
  const finalRef = useRef('');
  const tickRef = useRef(null);
  const rmsSamples = useRef([]);
  const pauseRef = useRef(0);

  const supported = typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia;
  const srSupported = typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  const cleanup = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    clearInterval(tickRef.current);
    try { srRef.current?.stop(); } catch {}
    streamRef.current?.getTracks().forEach((t) => t.stop());
    audioCtxRef.current?.close().catch(() => {});
    audioCtxRef.current = null;
  }, []);

  const start = useCallback(async () => {
    setError(null);
    setAudioUrl(null);
    setTranscript('');
    setInterim('');
    finalRef.current = '';
    setElapsed(0);
    rmsSamples.current = [];
    pauseRef.current = 0;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      streamRef.current = stream;

      // ── recorder
      const mime = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus' : '';
      const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      chunksRef.current = [];
      rec.ondataavailable = (e) => { if (e.data.size) chunksRef.current.push(e.data); };
      rec.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: rec.mimeType || 'audio/webm' });
        setAudioUrl(URL.createObjectURL(blob));
      };
      rec.start(250);
      recRef.current = rec;

      // ── analyser
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      src.connect(analyser);
      const buf = new Uint8Array(analyser.fftSize);
      let quietFrames = 0;

      const loop = () => {
        analyser.getByteTimeDomainData(buf);
        let sum = 0;
        for (let i = 0; i < buf.length; i++) {
          const v = (buf[i] - 128) / 128;
          sum += v * v;
        }
        const rms = Math.sqrt(sum / buf.length);
        rmsSamples.current.push(rms);
        if (rms < 0.012) { quietFrames++; if (quietFrames === 20) pauseRef.current++; }
        else quietFrames = 0;
        const pct = Math.min(100, rms * 620);
        setLevel(pct);
        setLevels((prev) => [...prev.slice(1), Math.max(3, pct)]);
        rafRef.current = requestAnimationFrame(loop);
      };
      loop();

      // ── speech recognition
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SR) {
        const sr = new SR();
        sr.continuous = true;
        sr.interimResults = true;
        sr.lang = 'en-US';
        sr.onresult = (ev) => {
          let fin = '', int = '';
          for (let i = ev.resultIndex; i < ev.results.length; i++) {
            const r = ev.results[i];
            if (r.isFinal) fin += r[0].transcript + ' ';
            else int += r[0].transcript;
          }
          if (fin) {
            finalRef.current += fin;
            setTranscript(finalRef.current.trim());
          }
          setInterim(int);
        };
        sr.onerror = () => {};
        try { sr.start(); } catch {}
        srRef.current = sr;
      }

      tickRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
      setRecording(true);
    } catch (e) {
      setError(e.name === 'NotAllowedError'
        ? 'Microphone permission denied. You can still type your transcript to get scored.'
        : 'Microphone unavailable. You can still type your transcript to get scored.');
      setRecording(false);
    }
  }, []);

  const stop = useCallback(() => {
    setRecording(false);
    try { recRef.current?.state !== 'inactive' && recRef.current?.stop(); } catch {}
    const samples = rmsSamples.current;
    const mean = samples.length ? samples.reduce((a, b) => a + b, 0) / samples.length : 0;
    const variance = samples.length ? samples.reduce((a, b) => a + (b - mean) ** 2, 0) / samples.length : 0;
    setRmsStats({ mean, variance, pauseCount: pauseRef.current, seconds: Math.max(1, elapsed) });
    cleanup();
    setInterim('');
    setLevel(0);
    setLevels(new Array(40).fill(3));
  }, [cleanup, elapsed]);

  const reset = useCallback(() => {
    setAudioUrl(null); setTranscript(''); setInterim(''); setElapsed(0);
    setRmsStats({ mean: 0, variance: 0, pauseCount: 0, seconds: 0 });
    finalRef.current = '';
    setLevels(new Array(40).fill(3));
  }, []);

  const setTyped = useCallback((t) => { finalRef.current = t; setTranscript(t); }, []);

  useEffect(() => () => cleanup(), [cleanup]);

  return {
    recording, level, levels, audioUrl, transcript, interim, elapsed, error,
    rmsStats, start, stop, reset, setTyped, supported, srSupported,
  };
}

// ── Countdown / count-up timer ──
export function useTimer() {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [mode, setMode] = useState('up'); // 'up' | 'down'
  const [target, setTarget] = useState(120);
  const ref = useRef(null);

  useEffect(() => {
    if (!running) { clearInterval(ref.current); return; }
    ref.current = setInterval(() => {
      setSeconds((s) => {
        if (mode === 'down') {
          if (s <= 1) { setRunning(false); return 0; }
          return s - 1;
        }
        return s + 1;
      });
    }, 1000);
    return () => clearInterval(ref.current);
  }, [running, mode]);

  const start = (m = mode, t = target) => {
    setMode(m); setTarget(t);
    setSeconds(m === 'down' ? t : 0);
    setRunning(true);
  };
  const pause = () => setRunning(false);
  const resume = () => setRunning(true);
  const stop = () => { setRunning(false); return seconds; };
  const reset = (m = mode, t = target) => { setRunning(false); setMode(m); setTarget(t); setSeconds(m === 'down' ? t : 0); };
  const set = (m, t) => { setMode(m); setTarget(t); setSeconds(m === 'down' ? t : 0); };

  return { running, seconds, mode, target, start, pause, resume, stop, reset, set };
}

// ── Web Speech synthesis ──
export function useSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const [voiceRate, setVoiceRate] = useState(0.95);
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;

  const speak = useCallback((text, rate = voiceRate) => {
    if (!synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = rate;
    u.pitch = 1;
    const voices = synth.getVoices();
    const preferred = voices.find((v) => /Samantha|Google UK English Female|Google US English|Microsoft (Aria|Jenny)/i.test(v.name)) || voices.find((v) => v.lang?.startsWith('en'));
    if (preferred) u.voice = preferred;
    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    synth.speak(u);
  }, [synth, voiceRate]);

  const cancel = useCallback(() => { synth?.cancel(); setSpeaking(false); }, [synth]);

  useEffect(() => () => synth?.cancel(), [synth]);

  return { speak, cancel, speaking, voiceRate, setVoiceRate, supported: !!synth };
}
