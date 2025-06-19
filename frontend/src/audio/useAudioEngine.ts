import { useEffect, useRef } from 'react';
import type { OscillatorOptions } from './types';

export function useAudioEngine() {
  const audioContextRef = useRef<AudioContext>();
  const nodesRef = useRef<Map<string, AudioWorkletNode>>(new Map());

  useEffect(() => {
    const ctx = new AudioContext({ sampleRate: 44100 });
    audioContextRef.current = ctx;
    
    // Load worklet module (ensure path is correct in production)
    ctx.audioWorklet.addModule('/src/audio/oscillator-processor.js').catch(console.error);
  }, []);

  function createOscillator(opts: OscillatorOptions) {
    const ctx = audioContextRef.current!;
    const node = new AudioWorkletNode(ctx, 'oscillator-processor', {
      numberOfOutputs: 1,
      outputChannelCount: [1],
      parameterData: {
        frequency: opts.frequency,
        detune: opts.detuneCents
      }
    });
    const gainNode = ctx.createGain();
    gainNode.gain.value = opts.gain;
    node.connect(gainNode).connect(ctx.destination);
    nodesRef.current.set(opts.id, node);
  }

  function stopOscillator(id: string) {
    const node = nodesRef.current.get(id);
    if (node) {
      node.disconnect();
      nodesRef.current.delete(id);
    }
  }

  function resume() {
    audioContextRef.current?.resume();
  }

  return { createOscillator, stopOscillator, resume };
}
