import './theme/tokens.css';
import RootGrid from './components/layout/RootGrid';
import SubtractiveSynth from './pages/synth/SubtractiveSynth';
import CentralWorkspace from './pages/synth/CentralWorkspace';
import AdditiveSynth from './pages/synth/AdditiveSynth';

export default function App() {
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
