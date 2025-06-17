# Active Context - Myco Synth Web MIDI Project

## Current Work Focus
- Initial project scaffolding and workspace setup
- Establishing documentation framework and planning structure
- Preparing for technology stack research phase

## Recent Changes
- Created project planning documentation with comprehensive feature breakdown
- Established workspace documentation structure under `.clinerules/`
- Defined core project vision as web-based MIDI synthesizer application
- Outlined 8 primary feature-components with technical specifications
- Replaced Project-UI-Layout section with detailed Canvas specification including:
  - Two 27% sidebars (Subtractive & Additive synths)
  - 46% central workspace with audio visualizer and MIDI controls
  - Dark theme color palette (deep blue primary, purple secondary, etc.)
  - Detailed container breakdown with advanced toggle functionality

## Next Steps
1. Research and compare JavaScript frameworks (React vs Vue vs Vanilla) for UI implementation
2. Investigate Web Audio API compatibility and performance characteristics
3. Evaluate MIDI device integration options and browser support
4. Set up initial development environment and build toolchain
5. Create basic project structure and entry points

## Active Decisions and Considerations
- **UI Framework Selection**: Need to balance performance requirements with development speed
- **Audio Latency Targets**: Must maintain <10ms for real-time performance
- **Browser Support**: Focus on modern browsers with Web Audio API support
- **Architecture Pattern**: Considering modular component-based design for extensibility

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
