import { useState } from 'react';
import { useAudioEngine } from '../audio/useAudioEngine';

export default function TestTone() {
  const { createOscillator, stopOscillator, resume } = useAudioEngine();
  const [playing, setPlaying] = useState(false);

  const start = () => {
    resume();
    createOscillator({
      id: 'test',
      waveform: 'sine',
      frequency: 440,
      detuneCents: 0,
      gain: 0.5
    });
    setPlaying(true);
  };

  const stop = () => {
    stopOscillator('test');
    setPlaying(false);
  };

  return (
    <div style={{ margin: '1rem' }}>
      <button onClick={start} disabled={playing}>Start Tone</button>
      <button onClick={stop} disabled={!playing} style={{ marginLeft: '0.5rem' }}>
        Stop Tone
      </button>
    </div>
  );
}
