# Tech Context - Myco Synth Web MIDI Project

## Technology Stack

### Core Technologies
- **Frontend Framework**: TBD (React/Vue/Vanilla JS)
- **Language**: JavaScript ES6+ / TypeScript (TBD)
- **Audio Processing**: Web Audio API, Web MIDI API
- **Build Tool**: TBD (Webpack/Vite/Rollup)
- **Package Manager**: TBD (npm/yarn/pnpm)

### Audio & MIDI APIs
- **Web Audio API**: Primary audio processing engine
- **Web MIDI API**: Hardware MIDI device integration
- **MediaRecorder API**: Audio recording and export
- **AudioWorklet**: Custom audio processing (preferred)
- **ScriptProcessorNode**: Fallback for older browsers

### Development Tools (To Be Determined)
- **Testing**: Jest/Vitest + Web Audio API mocks
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript (if selected)
- **Dev Server**: Development server with hot reload
- **CI/CD**: GitHub Actions or similar

## Browser Support Matrix

### Minimum Requirements
- **Chrome**: 66+ (AudioWorklet support)
- **Firefox**: 76+ (AudioWorklet support)
- **Safari**: 14.1+ (AudioWorklet support)
- **Edge**: 79+ (Chromium-based)

### Feature Support
- **Web Audio API**: ✅ All target browsers
- **Web MIDI API**: ✅ Chrome/Edge, ⚠️ Firefox (behind flag), ❌ Safari
- **AudioWorklet**: ✅ All target browsers (fallback to ScriptProcessorNode)
- **MediaRecorder**: ✅ All target browsers

## Development Setup

### Prerequisites
```bash
# Node.js version (to be determined)
node --version  # >= 16.0.0 recommended

# Package manager (to be selected)
npm --version   # or yarn/pnpm
```

### Environment Variables
```bash
# Development
NODE_ENV=development
AUDIO_SAMPLE_RATE=44100
AUDIO_BUFFER_SIZE=256

# Production
NODE_ENV=production
AUDIO_SAMPLE_RATE=44100
AUDIO_BUFFER_SIZE=128
```

### Project Structure (Planned)
```
myco-synth/
├── src/
│   ├── audio/           # Audio engine and synthesis
│   ├── midi/            # MIDI interface and routing
│   ├── ui/              # User interface components
│   ├── effects/         # Audio effects processing
│   ├── sequencer/       # Pattern sequencer logic
│   ├── presets/         # Preset management
│   ├── recording/       # Audio recording functionality
│   └── utils/           # Shared utilities
├── public/              # Static assets
├── tests/               # Test files
├── docs/                # Documentation
└── build/               # Build output
```

## Performance Constraints

### Audio Latency Targets
- **Input to Output**: < 10ms total latency
- **UI Responsiveness**: < 16ms for 60fps
- **MIDI Processing**: < 1ms message handling
- **Audio Buffer**: 128-256 samples preferred

### Memory Constraints
- **Audio Buffers**: Minimize allocation during playback
- **Preset Storage**: Efficient serialization/deserialization
- **UI Updates**: Throttled parameter changes

### CPU Optimization
- **Audio Processing**: Use AudioWorklet for efficiency
- **UI Rendering**: Minimize DOM updates during audio
- **Event Handling**: Debounce/throttle user inputs

## Dependencies (To Be Researched)

### Core Dependencies
- Audio framework/library (research needed)
- UI component library (research needed)
- State management (research needed)
- MIDI utilities (research needed)

### Development Dependencies
- Build tools and bundlers
- Testing frameworks
- Development server
- Code quality tools

## Build Configuration

### Development Build
- Hot module replacement
- Source maps enabled
- Unminified code
- Development audio buffer sizes

### Production Build
- Code minification and optimization
- Tree shaking for smaller bundles
- Production audio buffer sizes
- Performance monitoring

## Testing Strategy

### Unit Testing
- Audio engine components
- MIDI message parsing
- Preset serialization
- Utility functions

### Integration Testing
- Audio pipeline end-to-end
- MIDI device communication
- UI component interactions
- Effects chain processing

### Performance Testing
- Audio latency benchmarks
- Memory usage profiling
- CPU utilization monitoring
- Browser compatibility testing

## Deployment Considerations

### Hosting Requirements
- Static file hosting (Netlify/Vercel/GitHub Pages)
- HTTPS required for Web MIDI API
- Service worker for offline functionality
- CDN for global performance

### Security Considerations
- HTTPS mandatory for media APIs
- User permission handling for MIDI
- No sensitive data in client code
- Content Security Policy headers

## Known Technical Challenges

### Cross-Browser Issues
- Safari lacks Web MIDI API support
- Firefox Web MIDI behind feature flag
- AudioWorklet implementation differences
- Touch event handling variations

### Performance Bottlenecks
- JavaScript audio processing limitations
- Browser audio context suspension
- Real-time parameter updates
- Large preset file handling

### User Experience
- MIDI device permission prompts
- Audio context autoplay policies
- Mobile device limitations
- Accessibility requirements

## Research Needed

### Framework Selection
- Performance impact comparison
- Audio library ecosystems
- Bundle size analysis
- Development experience

### Audio Processing
- AudioWorklet best practices
- Cross-browser testing
- Latency optimization techniques
- Memory management strategies

### MIDI Integration
- Device compatibility testing
- Message timing accuracy
- Connection reliability
- Fallback strategies
