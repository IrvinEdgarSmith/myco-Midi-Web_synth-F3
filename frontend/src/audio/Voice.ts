import AudioContextManager from './AudioContextManager';
import { EnvelopeOptions, OscillatorNodeOptions } from './interfaces';

export default class Voice {
  private context = AudioContextManager.getInstance().context;
  private gain = this.context.createGain();
  private oscillator: OscillatorNode;
  private envelope: EnvelopeOptions;
  private active = false;
  note: number;

  constructor(options: OscillatorNodeOptions, envelope: EnvelopeOptions, note: number) {
    this.oscillator = this.context.createOscillator();
    this.oscillator.type = options.type;
    this.oscillator.frequency.value = options.frequency;
    if (options.detune) {
      this.oscillator.detune.value = options.detune;
    }
    this.envelope = envelope;
    this.gain.gain.value = 0;
    this.oscillator.connect(this.gain);
    this.gain.connect(AudioContextManager.getInstance().masterGain);
    this.note = note;
  }

  start(time?: number) {
    const t = time ?? this.context.currentTime;
    this.oscillator.start(t);
    const { attack } = this.envelope;
    this.gain.gain.cancelScheduledValues(t);
    this.gain.gain.setValueAtTime(0, t);
    this.gain.gain.linearRampToValueAtTime(1, t + attack / 1000);
    this.active = true;
  }

  stop(time?: number) {
    if (!this.active) return;
    const t = time ?? this.context.currentTime;
    const { decay, sustain, release } = this.envelope;
    const sustainLevel = sustain;
    this.gain.gain.cancelScheduledValues(t);
    this.gain.gain.setValueAtTime(this.gain.gain.value, t);
    this.gain.gain.linearRampToValueAtTime(sustainLevel, t + decay / 1000);
    this.gain.gain.linearRampToValueAtTime(0, t + decay / 1000 + release / 1000);
    this.oscillator.stop(t + decay / 1000 + release / 1000 + 0.05);
    this.active = false;
  }
}
