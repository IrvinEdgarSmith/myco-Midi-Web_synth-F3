# Active Context - Myco Synth Web MIDI Project

## Current Work Focus
- [June 19, 2025] React ecosystem adoption planning and implementation roadmap
- Core audio engine architecture design with AI-assisted development
- Integration of Web Audio API and MIDI functionality into React components

## Recent Changes
- [June 19, 2025] Decision made to adopt React + Vite + TypeScript ecosystem
- Completed full UI implementation with functional React components:
  - SubtractiveSynth panel with waveform buttons, coarse/fine tuning controls
  - AdditiveSynth panel with harmonic presets and spectral controls
  - CentralWorkspace with audio visualizer, MIDI controls, and global settings
  - Implemented ContainerPanel, Knob, Slider, and AudioVisualizer components
- Established 27/46/27% responsive grid layout (RootGrid component)
- Created comprehensive CSS module styling with dark theme
- Set up project structure with components/, pages/, and theme/ directories

## Next Steps
1. Implement core audio engine using Web Audio API with AudioWorklet
2. Add state management layer (Context API vs Zustand vs Redux Toolkit decision pending)
3. Integrate MIDI input/output handling with Web MIDI API
4. Connect UI controls to actual audio synthesis parameters
5. Add ESLint, Prettier, and testing infrastructure (Vitest + React Testing Library)
6. Implement preset save/load functionality with IndexedDB
7. Add effects processing chain and routing matrix

## Active Decisions and Considerations
- **State Management**: Context API vs Zustand vs Redux Toolkit for audio parameter state
- **Audio Engine**: Pure Web Audio API vs Tone.js framework vs custom AudioWorklet
- **MIDI Integration**: Hardware MIDI support strategy and fallback options
- **Performance Optimization**: Voice allocation and real-time audio processing patterns

## Important Patterns and Preferences
- **Real-time Performance**: All audio operations must be optimized for low latency
- **Modular Design**: Each feature-component should be independently testable
- **Progressive Enhancement**: Core functionality should work without MIDI hardware
- **Accessibility First**: All controls must be keyboard navigable and screen reader friendly

## Learnings and Project Insights
- Web Audio API provides sufficient capabilities for professional synthesizer implementation
- MIDI device integration may require user permission prompts in browsers
- Pattern sequencer timing will be critical for musical accuracy
- Virtual keyboard implementation needs velocity sensitivity for expressive performance
- Effects processing chain order significantly impacts sound quality
