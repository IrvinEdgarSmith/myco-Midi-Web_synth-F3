import AudioContextManager from './AudioContextManager';
import Voice from './Voice';
import { EnvelopeOptions, OscillatorNodeOptions } from './interfaces';

export default class SynthEngine {
  private voices: Voice[] = [];
  private activeVoices: Map<number, Voice> = new Map();

  constructor(private maxVoices = 16) {}

  noteOn(note: number, velocity = 1) {
    const frequency = 440 * Math.pow(2, (note - 69) / 12);
    const oscOptions: OscillatorNodeOptions = {
      id: `osc-${Date.now()}`,
      type: 'sawtooth',
      frequency,
    };
    const env: EnvelopeOptions = { attack: 10, decay: 50, sustain: velocity, release: 200 };

    let voice = this.voices.pop();
    if (!voice) {
      voice = new Voice(oscOptions, env, note);
    } else {
      voice = new Voice(oscOptions, env, note);
    }
    this.activeVoices.set(note, voice);
    voice.start();
  }

  noteOff(note: number) {
    const voice = this.activeVoices.get(note);
    if (voice) {
      voice.stop();
      this.activeVoices.delete(note);
      if (this.voices.length < this.maxVoices) {
        this.voices.push(voice);
      }
    }
  }

  setMasterGain(value: number) {
    AudioContextManager.getInstance().masterGain.gain.value = value;
  }
}
