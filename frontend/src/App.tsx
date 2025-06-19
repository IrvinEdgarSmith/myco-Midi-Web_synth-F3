import './theme/tokens.css';
import RootGrid from './components/layout/RootGrid';
import SubtractiveSynth from './pages/synth/SubtractiveSynth';
import CentralWorkspace from './pages/synth/CentralWorkspace';
import AdditiveSynth from './pages/synth/AdditiveSynth';
import TestTone from './components/TestTone';

export default function App() {
  return (
    <>
      <TestTone />
      <RootGrid>
        {/* Left Sidebar (Subtractive Synth) */}
        <SubtractiveSynth />

        {/* Centre Workspace */}
        <CentralWorkspace />

        {/* Right Sidebar (Additive Synth) */}
        <AdditiveSynth />
      </RootGrid>
    </>
  );
}
