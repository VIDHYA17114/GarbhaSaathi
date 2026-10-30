/**
 * krishnaFluteAudio.js
 * 
 * Procedural Web Audio API Indian Bansuri (Krishna's Flute) & Tanpura Drone Synthesizer.
 * Generates soothing, authentic Indian classical flute melodies in Raga Yaman / Bhupali / Desh
 * with harmonic overtones, gentle breath acoustics, vibrato, and a warm Tanpura drone.
 * 
 * Works 100% offline with zero external audio assets or network requests.
 */

class KrishnaFluteSynthesizer {
  constructor() {
    this.audioCtx = null;
    this.masterGain = null;
    this.fluteGain = null;
    this.droneGain = null;
    this.isPlaying = false;
    this.melodyTimer = null;
    this.droneOscillators = [];
    this.currentMelodyIndex = 0;
    this.volume = 0.55;

    // Raga Bhupali / Yaman inspired frequencies (in Hz)
    // Key: C4/C5 base (approx Sa = 261.63Hz / 523.25Hz)
    // Notes: Sa (523.25), Re (587.33), Ga (659.25), Pa (783.99), Dha (880.00), Komal Ni / Shuddha Ni (987.77), High Sa (1046.50)
    this.scale = [
      { name: 'Sa',  freq: 523.25, dur: 2.4 },
      { name: 'Re',  freq: 587.33, dur: 1.8 },
      { name: 'Ga',  freq: 659.25, dur: 2.8 },
      { name: 'Pa',  freq: 783.99, dur: 3.2 },
      { name: 'Dha', freq: 880.00, dur: 2.0 },
      { name: 'Pa',  freq: 783.99, dur: 2.6 },
      { name: 'Ga',  freq: 659.25, dur: 3.5 },
      { name: 'Re',  freq: 587.33, dur: 2.2 },
      { name: 'Sa',  freq: 523.25, dur: 4.0 },
      // High phrase
      { name: 'Ga',  freq: 659.25, dur: 2.0 },
      { name: 'Pa',  freq: 783.99, dur: 2.4 },
      { name: 'Dha', freq: 880.00, dur: 2.6 },
      { name: 'Sa2', freq: 1046.50, dur: 3.6 },
      { name: 'Dha', freq: 880.00, dur: 2.2 },
      { name: 'Pa',  freq: 783.99, dur: 3.0 },
      { name: 'Ga',  freq: 659.25, dur: 2.8 },
      { name: 'Re',  freq: 587.33, dur: 2.5 },
      { name: 'Sa',  freq: 523.25, dur: 4.5 }
    ];
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return false;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    if (!this.masterGain) {
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
      this.masterGain.connect(this.audioCtx.destination);

      // Flute branch
      this.fluteGain = this.audioCtx.createGain();
      this.fluteGain.gain.setValueAtTime(0.7, this.audioCtx.currentTime);
      this.fluteGain.connect(this.masterGain);

      // Drone branch
      this.droneGain = this.audioCtx.createGain();
      this.droneGain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
      this.droneGain.connect(this.masterGain);
    }
    return true;
  }

  /**
   * Starts warm meditative Indian Tanpura drone (Sa-Pa drone: ~130.8 Hz and ~196 Hz)
   */
  startTanpuraDrone() {
    if (!this.audioCtx) return;
    this.stopTanpuraDrone();

    const droneNotes = [
      { freq: 130.81, gain: 0.18, type: 'sine' },      // Low Sa (C3)
      { freq: 196.00, gain: 0.12, type: 'sine' },      // Pa (G3)
      { freq: 261.63, gain: 0.08, type: 'triangle' },  // Middle Sa (C4)
      { freq: 523.25, gain: 0.04, type: 'sine' }       // High Sa overtone
    ];

    droneNotes.forEach(({ freq, gain, type }) => {
      const osc = this.audioCtx.createOscillator();
      const oscGain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      // Add very gentle slow modulation (chorus/beating)
      const lfo = this.audioCtx.createOscillator();
      const lfoGain = this.audioCtx.createGain();
      lfo.frequency.setValueAtTime(0.2 + Math.random() * 0.2, this.audioCtx.currentTime);
      lfoGain.gain.setValueAtTime(1.2, this.audioCtx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      oscGain.gain.setValueAtTime(gain * 0.7, this.audioCtx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(this.droneGain);

      osc.start();
      this.droneOscillators.push({ osc, oscGain, lfo });
    });
  }

  stopTanpuraDrone() {
    this.droneOscillators.forEach(({ osc, lfo }) => {
      try {
        osc.stop();
        osc.disconnect();
        lfo.stop();
        lfo.disconnect();
      } catch { /* ignore */ }
    });
    this.droneOscillators = [];
  }

  /**
   * Plays a single authentic bansuri flute note with realistic envelope,
   * gentle harmonic overtones, breath flutter, and vibrato.
   */
  playFluteNote(targetFreq, durationSeconds) {
    if (!this.audioCtx || !this.isPlaying) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;
    const noteGain = ctx.createGain();
    noteGain.connect(this.fluteGain);

    // 1. Fundamental tone (pure bamboo air column)
    const fundamental = ctx.createOscillator();
    fundamental.type = 'sine';
    // Gentle portamento / meend glide from previous note or slight bend
    const startFreq = targetFreq * (0.985 + Math.random() * 0.02);
    fundamental.frequency.setValueAtTime(startFreq, now);
    fundamental.frequency.exponentialRampToValueAtTime(targetFreq, now + 0.15);

    // 2. Harmonic overtone (2nd harmonic - gives bamboo warmth)
    const overtone = ctx.createOscillator();
    overtone.type = 'sine';
    overtone.frequency.setValueAtTime(targetFreq * 2, now);
    const overtoneGain = ctx.createGain();
    overtoneGain.gain.setValueAtTime(0.22, now);
    overtone.connect(overtoneGain);
    overtoneGain.connect(noteGain);

    // 3. Vibrato (LFO at ~5.2 Hz with 0.35s delay, characteristic of bansuri)
    const vibrato = ctx.createOscillator();
    const vibratoGain = ctx.createGain();
    vibrato.frequency.setValueAtTime(5.2, now);
    vibratoGain.gain.setValueAtTime(0, now);
    // Vibrato gradually blooms after note is sustained
    vibratoGain.gain.setValueAtTime(0, now + 0.35);
    vibratoGain.gain.linearRampToValueAtTime(6.5, now + 0.9);
    vibrato.connect(vibratoGain);
    vibratoGain.connect(fundamental.frequency);

    // 4. Breath noise (soft white noise filtered through bandpass)
    try {
      const bufferSize = ctx.sampleRate * 1.5;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(targetFreq * 1.5, now);
      bandpass.Q.setValueAtTime(3.0, now);

      const breathGain = ctx.createGain();
      breathGain.gain.setValueAtTime(0.02, now);

      noise.connect(bandpass);
      bandpass.connect(breathGain);
      breathGain.connect(noteGain);
      noise.start(now);
      noise.stop(now + durationSeconds);
    } catch { /* ignore */ }

    // 5. Envelope (Soft gentle attack, sustained melody, natural decay)
    const attack = 0.25;
    const release = 0.45;
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(0.45, now + attack);
    noteGain.gain.setValueAtTime(0.40, now + durationSeconds - release);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);

    fundamental.connect(noteGain);
    fundamental.start(now);
    overtone.start(now);
    vibrato.start(now);

    fundamental.stop(now + durationSeconds);
    overtone.stop(now + durationSeconds);
    vibrato.stop(now + durationSeconds);
  }

  /**
   * Loops the melodious Krishna bansuri composition indefinitely.
   */
  scheduleNextNote() {
    if (!this.isPlaying) return;

    const note = this.scale[this.currentMelodyIndex];
    this.playFluteNote(note.freq, note.dur);

    this.currentMelodyIndex = (this.currentMelodyIndex + 1) % this.scale.length;

    // Schedule next note with a tiny breath pause
    const nextDelay = (note.dur - 0.15) * 1000;
    this.melodyTimer = setTimeout(() => {
      this.scheduleNextNote();
    }, Math.max(800, nextDelay));
  }

  /**
   * Public: Start Krishna's Flute & Tanpura Drone music
   */
  start({ ambientOnly = false, volume = null } = {}) {
    if (this.isPlaying) return;

    const initialized = this.initContext();
    if (!initialized) return;

    this.isPlaying = true;
    if (volume !== null) {
      this.setVolume(volume);
    }

    this.startTanpuraDrone();

    if (!ambientOnly) {
      this.scheduleNextNote();
    }
  }

  /**
   * Public: Stop music
   */
  stop() {
    this.isPlaying = false;
    if (this.melodyTimer) {
      clearTimeout(this.melodyTimer);
      this.melodyTimer = null;
    }
    this.stopTanpuraDrone();
  }

  /**
   * Public: Toggle Play / Stop
   */
  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  /**
   * Public: Set master volume (0.0 to 1.0)
   */
  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
    }
  }

  getIsPlaying() {
    return this.isPlaying;
  }
}

// Global Singleton Instance
export const krishnaFluteAudio = new KrishnaFluteSynthesizer();
