export interface AudioNodeOptions {
  id: string;
  inputs?: string[];
  outputs?: string[];
}

export interface OscillatorNodeOptions extends AudioNodeOptions {
  type: OscillatorType;
  frequency: number;
  detune?: number;
}

export interface FilterNodeOptions extends AudioNodeOptions {
  type: BiquadFilterType;
  frequency: number;
  Q: number;
}

export interface EnvelopeOptions {
  attack: number; // milliseconds
  decay: number;  // milliseconds
  sustain: number; // 0-1 range
  release: number; // milliseconds
}
