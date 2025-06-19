// TypeScript Worklet definitions
declare const sampleRate: number;
declare function registerProcessor(name: string, ctor: any): void;
declare abstract class AudioWorkletProcessor {
  readonly port: MessagePort;
  constructor(options?: any);
  static get parameterDescriptors(): any[];
  abstract process(
    _inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>
  ): boolean;
}

// Worklet processor generating basic sine waveform with frequency and detune parameters

class OscillatorProcessor extends AudioWorkletProcessor {
  phase = 0;

  static get parameterDescriptors() {
    return [
      { name: 'frequency', defaultValue: 440, minValue: 0, automationRate: 'a-rate' },
      { name: 'detune', defaultValue: 0, minValue: -1200, maxValue: 1200, automationRate: 'a-rate' },
    ];
  }

  constructor() {
    super();
  }

  process(
    _inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>
  ): boolean {
    const output = outputs[0];
    const freqParam = parameters.frequency;
    const detuneParam = parameters.detune;

    for (let channel = 0; channel < output.length; ++channel) {
      const channelData = output[channel];
      for (let i = 0; i < channelData.length; ++i) {
        const freq = freqParam.length > 1 ? freqParam[i] : freqParam[0];
        const det = detuneParam.length > 1 ? detuneParam[i] : detuneParam[0];
        const realFreq = freq * Math.pow(2, det / 1200);
        channelData[i] = Math.sin(this.phase) * 0.5;
        this.phase += (2 * Math.PI * realFreq) / sampleRate;
        if (this.phase > 2 * Math.PI) this.phase -= 2 * Math.PI;
      }
    }
    return true;
  }
}

registerProcessor('oscillator-processor', OscillatorProcessor);
