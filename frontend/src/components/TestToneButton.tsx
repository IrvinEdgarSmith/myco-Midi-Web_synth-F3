import { useRef, useState, useEffect } from 'react';
import { useAudioEngine } from '../audio/useAudioEngine';

export default function TestToneButton() {
  const { createOscillator, stopOscillator, resume } = useAudioEngine();
  const [isPlaying, setIsPlaying] = useState(false);
  const idRef = useRef('test-tone');

  useEffect(() => {
    return () => {
      if (isPlaying) {
        stopOscillator(idRef.current);
      }
    };
  }, [isPlaying, stopOscillator]);

  function handleClick() {
    resume();
    if (isPlaying) {
      stopOscillator(idRef.current);
      setIsPlaying(false);
    } else {
      createOscillator({ id: idRef.current, frequency: 440, detuneCents: 0, gain: 0.2 });
      setIsPlaying(true);
    }
  }

  return (
    <button onClick={handleClick} style={{ marginTop: '1rem' }}>
      {isPlaying ? 'Stop Test Tone' : 'Play Test Tone'}
    </button>
  );
}
