// Procedural audio for El Taller de José.
// Uses Web Audio API — no external assets or network calls.

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let ambientNodes: { stop: () => void } | null = null;
let ambientGain: GainNode | null = null;
let enabled = false;
let listeners = new Set<(on: boolean) => void>();

const BASE_AMBIENT = 0.09; // very subtle baseline
const DUCKED_AMBIENT = 0.035;

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

  // Brown noise buffer — warm, wood-like room tone
  const bufferSize = 2 * c.sampleRate;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    lastOut = (lastOut + 0.02 * white) / 1.02;
    data[i] = lastOut * 3.5;
  }
  const noise = c.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;

  const lp = c.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 420;
  lp.Q.value = 0.7;

  const hp = c.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 60;

  ambientGain = c.createGain();
  ambientGain.gain.value = 0;

  // Deep warm drone
  const drone = c.createOscillator();
  drone.type = "sine";
  drone.frequency.value = 55;
  const droneGain = c.createGain();
  droneGain.gain.value = 0.08;
  drone.connect(droneGain).connect(ambientGain);

  // Slow LFO on brightness to feel alive (wind through window)
  const lfo = c.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 0.08;
  const lfoGain = c.createGain();
  lfoGain.gain.value = 120;
  lfo.connect(lfoGain).connect(lp.frequency);

  noise.connect(hp).connect(lp).connect(ambientGain);
  ambientGain.connect(master);

  noise.start();
  drone.start();
  lfo.start();

  // fade in
  ambientGain.gain.linearRampToValueAtTime(BASE_AMBIENT, c.currentTime + 2.5);

  ambientNodes = {
    stop: () => {
      try {
        ambientGain?.gain.cancelScheduledValues(c.currentTime);
        ambientGain?.gain.linearRampToValueAtTime(0, c.currentTime + 0.6);
        setTimeout(() => {
          try {
            noise.stop();
            drone.stop();
            lfo.stop();
          } catch {
            /* noop */
          }
          ambientNodes = null;
          ambientGain = null;
        }, 700);
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
