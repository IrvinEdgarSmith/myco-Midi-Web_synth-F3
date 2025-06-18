class AudioContextManager {
  private static instance: AudioContextManager;

  readonly context: AudioContext;
  readonly masterGain: GainNode;

  private constructor() {
    this.context = new AudioContext();
    this.masterGain = this.context.createGain();
    this.masterGain.gain.value = 0.8;
    this.masterGain.connect(this.context.destination);
  }

  static getInstance(): AudioContextManager {
    if (!this.instance) {
      this.instance = new AudioContextManager();
    }
    return this.instance;
  }

  async resume() {
    if (this.context.state === 'suspended') {
      await this.context.resume();
    }
  }
}

export default AudioContextManager;
