// NeighbourLink Aural Identity
// Sound: The Door Chime
// "Two soft notes, a rising fifth. An invitation, never an alert."
// Note 1: G4 (392.00 Hz)
// Note 2: D5 (587.33 Hz)
// Soft bell tone, 3s duration, gentle decay.

class DoorChimePlayer {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playChime(): void {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // Note 1: G4 (392 Hz) at t = 0
      this.playBellNote(392.00, now, 1.4, 0.28);

      // Note 2: D5 (587.33 Hz - the rising fifth) at t = 0.35s
      this.playBellNote(587.33, now + 0.35, 2.4, 0.32);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  private playBellNote(freq: number, startTime: number, duration: number, peakGain: number) {
    if (!this.ctx) return;

    // Primary fundamental sine wave
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);

    // Warm soft bell envelope
    gain1.gain.setValueAtTime(0.0001, startTime);
    gain1.gain.exponentialRampToValueAtTime(peakGain, startTime + 0.04);
    gain1.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    // Gentle second harmonic overtone for warm bell resonance
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.01, startTime);

    gain2.gain.setValueAtTime(0.0001, startTime);
    gain2.gain.exponentialRampToValueAtTime(peakGain * 0.25, startTime + 0.03);
    gain2.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.6);

    // Soft lowpass filter to remove harshness, keeping tone warm like brass/clay
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, startTime);

    osc1.connect(gain1);
    osc2.connect(gain2);

    gain1.connect(filter);
    gain2.connect(filter);

    filter.connect(this.ctx.destination);

    osc1.start(startTime);
    osc2.start(startTime);

    osc1.stop(startTime + duration + 0.1);
    osc2.stop(startTime + duration + 0.1);
  }

  // Voice narration: "Warm, unhurried, about 140 words a minute. Reads the board in resident languages."
  speakText(text: string, lang = 'en', onComplete?: () => void) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    // Play soft chime first
    this.playChime();

    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // Unhurried ~140 wpm
      utterance.pitch = 1.0;
      
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang.startsWith(lang.slice(0, 2))) || null;
      if (voice) {
        utterance.voice = voice;
      }

      utterance.onend = () => {
        if (onComplete) onComplete();
      };
      utterance.onerror = () => {
        if (onComplete) onComplete();
      };

      window.speechSynthesis.speak(utterance);
    }, 450);
  }

  stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const doorChime = new DoorChimePlayer();
