// Procedural audio for El Taller de José.
// Uses Web Audio API — no external assets or network calls.

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let ambientNodes: { stop: () => void } | null = null;
let ambientGain: GainNode | null = null;
let enabled = false;
let listeners = new Set<(on: boolean) => void>();

const BASE_AMBIENT = 0.12; // very subtle baseline
const DUCKED_AMBIENT = 0.045;

function ensureCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (ctx) return ctx;
  try {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 1;
    master.connect(ctx.destination);
  } catch {
    return null;
  }
  return ctx;
}

function startAmbient() {
  const c = ensureCtx();
  if (!c || !master || ambientNodes) return;

  ambientGain = c.createGain();
  ambientGain.gain.value = 0;

  // Gentle warm lowpass over the whole bed
  const lp = c.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 1600;
  lp.Q.value = 0.4;
  lp.connect(ambientGain);
  ambientGain.connect(master);

  // Soft ambient pad — A minor 9 voicing (A2, E3, C4, G4, B4)
  // Sine waves + slow tremolo per voice for a breathing, meditative feel.
  const voices = [
    { freq: 110.0, gain: 0.16, lfo: 0.07 }, // A2
    { freq: 164.81, gain: 0.11, lfo: 0.05 }, // E3
    { freq: 261.63, gain: 0.09, lfo: 0.09 }, // C4
    { freq: 392.0, gain: 0.06, lfo: 0.06 }, // G4
    { freq: 493.88, gain: 0.045, lfo: 0.08 }, // B4
  ];

  const stops: Array<() => void> = [];

  voices.forEach((v, idx) => {
    const osc = c.createOscillator();
    osc.type = idx === 0 ? "triangle" : "sine";
    osc.frequency.value = v.freq;

    // subtle detune drift for organic feel
    const detune = c.createOscillator();
    detune.type = "sine";
    detune.frequency.value = 0.05 + Math.random() * 0.08;
    const detuneGain = c.createGain();
    detuneGain.gain.value = 3.5;
    detune.connect(detuneGain).connect(osc.detune);

    const vg = c.createGain();
    vg.gain.value = 0;

    // slow tremolo LFO on the voice gain
    const lfo = c.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = v.lfo;
    const lfoAmp = c.createGain();
    lfoAmp.gain.value = v.gain * 0.35;
    lfo.connect(lfoAmp).connect(vg.gain);

    // steady base level for the voice
    vg.gain.setValueAtTime(v.gain, c.currentTime);

    osc.connect(vg).connect(lp);

    osc.start();
    detune.start();
    lfo.start();

    stops.push(() => {
      try {
        osc.stop();
        detune.stop();
        lfo.stop();
      } catch {
        /* noop */
      }
    });
  });

  // slow fade in — musical entrance
  ambientGain.gain.linearRampToValueAtTime(BASE_AMBIENT, c.currentTime + 4);

  ambientNodes = {
    stop: () => {
      try {
        ambientGain?.gain.cancelScheduledValues(c.currentTime);
        ambientGain?.gain.linearRampToValueAtTime(0, c.currentTime + 1.2);
        setTimeout(() => {
          stops.forEach((s) => s());
          ambientNodes = null;
          ambientGain = null;
        }, 1300);
      } catch {
        /* noop */
      }
    },
  };
}

export function toggleAudio(): boolean {
  const c = ensureCtx();
  if (!c) return false;
  if (c.state === "suspended") c.resume();
  if (enabled) {
    ambientNodes?.stop();
    enabled = false;
  } else {
    startAmbient();
    enabled = true;
  }
  listeners.forEach((l) => l(enabled));
  return enabled;
}

export function isAudioEnabled() {
  return enabled;
}

export function subscribeAudio(cb: (on: boolean) => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/** Momentarily lower ambient volume during a UI interaction */
export function duckAmbient(durationMs = 1400) {
  if (!ambientGain || !ctx) return;
  const now = ctx.currentTime;
  ambientGain.gain.cancelScheduledValues(now);
  ambientGain.gain.linearRampToValueAtTime(DUCKED_AMBIENT, now + 0.15);
  ambientGain.gain.linearRampToValueAtTime(BASE_AMBIENT, now + durationMs / 1000);
}

/** Single soft typewriter/key click */
export function playTypewriterKey() {
  const c = ensureCtx();
  if (!c || !master) return;
  if (c.state === "suspended") return; // requires user gesture

  const now = c.currentTime;
  // Short filtered noise burst = mechanical click
  const bufSize = Math.floor(c.sampleRate * 0.05);
  const buf = c.createBuffer(1, bufSize, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) {
    d[i] = (Math.random() * 2 - 1) * (1 - i / bufSize);
  }
  const src = c.createBufferSource();
  src.buffer = buf;

  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 1800 + Math.random() * 900;
  bp.Q.value = 4;

  const g = c.createGain();
  const vol = 0.06 + Math.random() * 0.03;
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(vol, now + 0.002);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

  src.connect(bp).connect(g).connect(master);
  src.start(now);
  src.stop(now + 0.1);
}

/** Warm hammer knock on wood */
export function playHammerKnock() {
  const c = ensureCtx();
  if (!c || !master) return;
  if (c.state === "suspended") c.resume();
  const now = c.currentTime;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = "triangle";
  o.frequency.setValueAtTime(160, now);
  o.frequency.exponentialRampToValueAtTime(55, now + 0.2);
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(0.25, now + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
  o.connect(g).connect(master);
  o.start(now);
  o.stop(now + 0.45);
}

/** Try to auto-enable ambient (may fail without user gesture — that's fine) */
export function tryStartAmbient() {
  const c = ensureCtx();
  if (!c) return;
  if (c.state === "suspended") {
    c.resume().then(() => {
      if (!enabled) toggleAudio();
    }).catch(() => {});
  } else if (!enabled) {
    toggleAudio();
  }
}
