import './theme/tokens.css';
import RootGrid from './components/layout/RootGrid';
import SubtractiveSynth from './pages/synth/SubtractiveSynth';
import CentralWorkspace from './pages/synth/CentralWorkspace';
import AdditiveSynth from './pages/synth/AdditiveSynth';
import { useRef, useEffect } from 'react';
import SynthEngine from './audio/SynthEngine';
import AudioContextManager from './audio/AudioContextManager';
import useKeyboardSynth from './audio/useKeyboardSynth';

export default function App() {
  const engineRef = useRef<SynthEngine>();

  useEffect(() => {
    engineRef.current = new SynthEngine();
    AudioContextManager.getInstance().resume();
  }, []);


  useKeyboardSynth(engineRef.current);

  return (
    <RootGrid>
      {/* Left Sidebar (Subtractive Synth) */}
      <SubtractiveSynth />

      {/* Centre Workspace */}
      <CentralWorkspace />

      {/* Right Sidebar (Additive Synth) */}
      <AdditiveSynth />
    </RootGrid>
  );
}
