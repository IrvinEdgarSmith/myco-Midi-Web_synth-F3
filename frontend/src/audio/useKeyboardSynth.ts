import { useEffect } from 'react';
import SynthEngine from './SynthEngine';

const KEY_TO_NOTE: Record<string, number> = {
  a: 60,
  w: 61,
  s: 62,
  e: 63,
  d: 64,
  f: 65,
  t: 66,
  g: 67,
  y: 68,
  h: 69,
  u: 70,
  j: 71,
  k: 72,
  o: 73,
  l: 74,
  p: 75,
};

export default function useKeyboardSynth(engine?: SynthEngine) {
  useEffect(() => {
    if (!engine) return;

    const down = new Set<string>();

    const handleKeyDown = (e: KeyboardEvent) => {
      const note = KEY_TO_NOTE[e.key];
      if (note !== undefined && !down.has(e.key)) {
        down.add(e.key);
        engine.noteOn(note, 1);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const note = KEY_TO_NOTE[e.key];
      if (note !== undefined) {
        down.delete(e.key);
        engine.noteOff(note);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [engine]);
}
