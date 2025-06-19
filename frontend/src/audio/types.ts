// Shared types for audio engine

export type Waveform = 'sine' | 'square' | 'sawtooth' | 'triangle';

export interface OscillatorOptions {
  id: string;             // unique voice identifier
  waveform: Waveform;
  frequency: number;      // in Hz
  detuneCents: number;    // ± cents
  gain: number;           // 0–1
}
