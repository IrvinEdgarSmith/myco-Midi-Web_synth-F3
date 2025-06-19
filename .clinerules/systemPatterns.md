# System Patterns - Myco Synth Web MIDI Project

## Architecture Philosophy

### Core Principles
- **Real-time First**: All design decisions prioritize audio performance and low latency
- **Modular Composition**: Each component is independently testable and replaceable
- **Progressive Enhancement**: Core functionality works without external dependencies
- **Accessibility by Design**: All interactions are keyboard/screen reader compatible

### Design Patterns

#### Event-Driven Architecture
- **Pattern**: Observer/Publisher-Subscriber for audio parameter changes
- **Rationale**: Decouples UI updates from audio processing for better performance
- **Implementation**: Central event bus for parameter automation and UI synchronization
- **Components**: Audio Engine ↔ UI Controls ↔ Preset System

#### Component-Based Modular Design
- **Pattern**: Each feature-component as independent module with defined interfaces
- **Rationale**: Enables parallel development and easier testing/debugging
- **Implementation**: Clear input/output contracts between components
- **Components**: All 8 feature-components follow this pattern

#### State Management Strategy
- **Pattern**: Centralized state with immutable updates
- **Rationale**: Predictable state changes and easier debugging of audio issues
- **Implementation**: Single source of truth for synthesizer parameters
- **Components**: Preset Management ↔ UI Framework ↔ Audio Engine

## Key Technical Decisions

### Audio Processing Architecture
**Decision**: AudioWorklet-first with ScriptProcessorNode fallback
**Date**: Project Planning Phase
**Rationale**: AudioWorklet runs on separate thread, reducing main thread blocking
**Impact**: Better audio performance but requires polyfill strategy for older browsers
**Alternatives Considered**: ScriptProcessorNode only, Web Workers
**Trade-offs**: Complexity vs Performance

### MIDI Integration Strategy
**Decision**: Web MIDI API with virtual MIDI fallback
**Date**: Project Planning Phase
**Rationale**: Native browser MIDI support where available, software fallback elsewhere
**Impact**: Full hardware integration on supported browsers, virtual keyboard on others
**Alternatives Considered**: Software-only MIDI, external MIDI libraries
**Trade-offs**: Browser compatibility vs Feature completeness

### UI Framework Approach
**Decision**: React + TypeScript + Vite (ADOPTED)
**Date**: June 19, 2025
**Rationale**: React ecosystem provides mature component model, excellent TypeScript support, and Vite offers fast development experience
**Implementation**: 27/46/27% responsive grid layout with modular component architecture
**Components**: RootGrid, ContainerPanel, Knob, Slider, AudioVisualizer
**Trade-offs**: Bundle size vs Development velocity (chosen DX over minimal size)

### Component Architecture Pattern
**Decision**: CSS Modules + Props-based State Management
**Date**: June 19, 2025
**Rationale**: Scoped styling prevents conflicts, props drilling sufficient for current complexity
**Implementation**: Each component has dedicated .module.css file, state passed via props
**Impact**: Clean separation of styles, TypeScript-safe component interfaces
**Alternatives Considered**: Styled-components, global CSS, Context API
**Trade-offs**: File organization vs Runtime performance

### UI Control Standardization
**Decision**: Custom Knob/Slider components with consistent interfaces
**Date**: June 19, 2025
**Rationale**: Synthesizer UX requires specialized audio controls with precise behavior
**Implementation**: Unified props interface (label, value, min, max, onChange, unit)
**Impact**: Consistent UX across all synthesis parameters, accessible by default
**Alternatives Considered**: Third-party UI libraries, native HTML inputs
**Trade-offs**: Development time vs UX control
**Date**: Research Phase (upcoming)
**Rationale**: Need to balance performance requirements with development velocity
**Impact**: Affects bundle size, rendering performance, and development timeline
**Alternatives to Evaluate**: React, Vue, Vanilla JS
**Trade-offs**: Developer experience vs Runtime performance

## Component Relationships

### Audio Signal Flow
```
MIDI Input → MIDI Interface Manager → Synthesizer Engines → Effects Chain → Audio Engine Core → Output
                                   ↓
                              Pattern Sequencer
```

### Data Flow Architecture
```
User Input → UI Framework → State Management → Audio Parameters → Audio Engine
                         ↓
                    Preset Management ← → Local Storage
```

### Event Communication Patterns
```
Audio Events: Audio Engine ←→ All Components (real-time updates)
UI Events: UI Framework → State Management → Audio Components
MIDI Events: MIDI Manager → Synthesizer Engines + Pattern Sequencer
Recording Events: Recording Engine ← Audio Engine (audio stream capture)
```

## Performance Optimization Patterns

### Audio Thread Isolation
- **Pattern**: Keep audio processing separate from UI rendering
- **Implementation**: AudioWorklet for audio, main thread for UI only
- **Benefit**: Prevents UI lag from affecting audio quality
- **Critical Areas**: Parameter automation, real-time effects processing

### Lazy Loading Strategy
- **Pattern**: Load components only when needed
- **Implementation**: Dynamic imports for non-essential features
- **Benefit**: Faster initial load, smaller main bundle
- **Applied To**: Advanced effects, preset libraries, recording features

### Memory Management
- **Pattern**: Object pooling for frequently created/destroyed audio objects
- **Implementation**: Reuse AudioBuffers, minimize garbage collection
- **Benefit**: Prevents audio glitches from GC pauses
- **Critical Areas**: Real-time audio processing, pattern sequencing

## Error Handling Patterns

### Graceful Degradation
- **Pattern**: Feature detection with fallbacks
- **Implementation**: Capability testing for Web APIs
- **Fallbacks**: Virtual MIDI when hardware unavailable, simplified audio on older browsers
- **User Experience**: Clear messaging about feature availability

### Audio Context Recovery
- **Pattern**: Automatic recovery from suspended audio contexts
- **Implementation**: User gesture detection to resume audio
- **Benefit**: Handles browser autoplay policies gracefully
- **Critical Areas**: Initial audio start, mobile device handling

## Security Patterns

### Permission Management
- **Pattern**: Progressive permission requests
- **Implementation**: Request MIDI access only when needed
- **User Experience**: Clear explanation of why permissions are needed
- **Fallback**: Full functionality without permissions where possible

### Data Validation
- **Pattern**: Input sanitization at component boundaries
- **Implementation**: Parameter range checking, MIDI message validation
- **Benefit**: Prevents audio glitches from invalid data
- **Critical Areas**: User input, MIDI data, preset loading

## Testing Patterns

### Audio Testing Strategy
- **Pattern**: Mock Audio APIs for unit tests
- **Implementation**: AudioContext stubs, synthetic audio data
- **Benefit**: Fast, reliable tests without actual audio hardware
- **Coverage**: Parameter validation, signal routing, timing accuracy

### Integration Testing
- **Pattern**: End-to-end audio pipeline testing
- **Implementation**: Automated tests with audio buffer analysis
- **Benefit**: Ensures real-world functionality
- **Coverage**: MIDI input → audio output workflows

## Deployment Patterns

### Progressive Web App
- **Pattern**: Service worker for offline functionality
- **Implementation**: Cache core assets, enable offline synthesis
- **Benefit**: Works without internet after initial load
- **Critical Features**: Core synthesizer, local presets

### Environment Configuration
- **Pattern**: Build-time optimization flags
- **Implementation**: Different audio buffer sizes for dev/prod
- **Benefit**: Optimized performance per environment
- **Variables**: Audio latency, bundle size, debugging features

## Future Architecture Considerations

### Extensibility Patterns
- **Plugin System**: Architecture ready for third-party extensions
- **API Design**: Clear interfaces for adding new synthesis engines
- **Modularity**: Components designed for easy replacement/enhancement

### Scalability Patterns
- **Multi-instance Support**: Architecture supports multiple synthesizer instances
- **Resource Management**: Memory and CPU usage monitoring
- **Performance Monitoring**: Built-in metrics collection for optimization

### Collaboration Features
- **Real-time Synchronization**: WebRTC for collaborative sessions
- **State Serialization**: Efficient preset sharing and version control
- **Conflict Resolution**: Handling simultaneous edits in collaborative mode

## Decision Log Template

For future architectural decisions:
```
**Decision**: [Brief description]
**Date**: [YYYY-MM-DD]
**Rationale**: [Why this decision was made]
**Impact**: [How this affects the system]
**Alternatives Considered**: [Other options evaluated]
**Trade-offs**: [What we gained vs what we sacrificed]
