# Tech Context - Myco Synth Web MIDI Project

## Technology Stack

### Core Technologies
- **Frontend Framework**: React 18.2.0 ✅
- **Language**: TypeScript 5.4.2 ✅
- **Build Tool**: Vite 5.2.0 ✅
- **Package Manager**: npm (default)
- **Audio Processing**: Web Audio API, Web MIDI API
- **State Management**: React hooks (useState) - considering Context API/Zustand

### Audio & MIDI APIs
- **Web Audio API**: Primary audio processing engine
- **Web MIDI API**: Hardware MIDI device integration
- **MediaRecorder API**: Audio recording and export
- **AudioWorklet**: Custom audio processing (preferred)
- **ScriptProcessorNode**: Fallback for older browsers

### Development Tools (Current Setup)
- **Build**: Vite with React TypeScript template
- **Type Checking**: TypeScript strict mode enabled
- **Testing**: TBD (Vitest + React Testing Library planned)
- **Linting**: TBD (ESLint + Prettier planned)
- **Dev Server**: Vite dev server with hot reload
- **CI/CD**: TBD (GitHub Actions planned)

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

### Project Structure (Current)
```
frontend/
├── src/
│   ├── components/      # ✅ Reusable UI components
│   │   ├── controls/    # ✅ Knob, Slider controls
│   │   ├── layout/      # ✅ RootGrid layout system
│   │   ├── panels/      # ✅ ContainerPanel component
│   │   └── visualizers/ # ✅ AudioVisualizer component
│   ├── pages/           # ✅ Main UI pages
│   │   └── synth/       # ✅ SubtractiveSynth, AdditiveSynth, CentralWorkspace
│   ├── theme/           # ✅ CSS tokens and theming
│   ├── App.tsx          # ✅ Main application component
│   └── main.tsx         # ✅ React entry point
├── public/              # Static assets
├── index.html           # ✅ Main HTML template
├── package.json         # ✅ React + TypeScript + Vite
├── vite.config.ts       # ✅ Vite configuration
└── tsconfig.json        # ✅ TypeScript configuration
```

### Environment Variables (Current)
```bash
# Development (configured)
NODE_ENV=development
VITE_DEV_PORT=5173

# Audio settings (planned)
AUDIO_SAMPLE_RATE=44100
AUDIO_BUFFER_SIZE=256
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

## Dependencies (Current Setup)

### Production Dependencies
```json
{
  "react": "^18.2.0",           # ✅ Core React library
  "react-dom": "^18.2.0"       # ✅ React DOM rendering
}
```

### Development Dependencies
```json
{
  "@types/react": "^18.2.14",           # ✅ React TypeScript types
  "@types/react-dom": "^18.2.7",        # ✅ React DOM TypeScript types
  "@vitejs/plugin-react": "^4.2.0",     # ✅ Vite React plugin
  "typescript": "^5.4.2",               # ✅ TypeScript compiler
  "vite": "^5.2.0"                      # ✅ Build tool and dev server
}
```

### Pending Dependencies (To Be Added)
- Audio framework: TBD (Tone.js vs pure Web Audio API)
- State management: TBD (Context API vs Zustand vs Redux Toolkit)
- Testing: Vitest + React Testing Library
- Linting: ESLint + Prettier
- UI utilities: TBD (consider headless UI library)

## Build Configuration (Current)

### Development Build ✅
- Hot module replacement enabled
- TypeScript compilation
- CSS modules support
- Development server on port 5173

### Production Build ✅
- Vite optimized bundling
- TypeScript compilation
- Tree shaking enabled
- Asset optimization

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Production build
npm run preview  # Preview production build
```

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
