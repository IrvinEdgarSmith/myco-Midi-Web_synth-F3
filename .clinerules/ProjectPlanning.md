# Project Planning - Myco Synth Web MIDI Project

## [Project Vision & Description]

### Core Vision
A web-based MIDI synthesizer application that provides musicians and producers with an intuitive interface for creating, manipulating, and performing electronic music directly in the browser. The project aims to democratize music production by eliminating the need for expensive hardware or complex software installations.

### Project Description
The Myco Synth Web MIDI Project is a comprehensive web application that leverages the Web Audio API and Web MIDI API to create a full-featured synthesizer environment. The application will feature multiple synthesis engines, real-time audio processing, MIDI device integration, and collaborative music creation capabilities. 

**Core Features:**
- Real-time audio synthesis using Web Audio API
- MIDI input/output support for hardware controllers
- Multiple synthesis engines (subtractive, FM, wavetable)
- Built-in effects processing (reverb, delay, filters)
- Pattern sequencer and arpeggiator
- Audio recording and export functionality
- Preset management system
- Collaborative session support
- Responsive design for desktop and tablet use

**Technology Stack:**
- Frontend: HTML5, CSS3, JavaScript (ES6+)
- Audio: Web Audio API, Web MIDI API
- UI Framework: To be determined (React/Vue/Vanilla)
- State Management: To be determined
- Build Tools: To be determined (Webpack/Vite)
- Testing: To be determined
- Deployment: To be determined

**Architecture Constraints:**
- Browser compatibility (modern browsers supporting Web Audio API)
- Real-time performance requirements (<10ms audio latency)
- Responsive design for various screen sizes
- Offline capability for core functionality
- Modular, extensible codebase

## [Feature-Components]

### Audio Engine Core
**Function:** Manages the primary audio context, routing, and real-time audio processing pipeline. Serves as the foundation for all audio operations and maintains the master audio graph.

**Parameters:** Sample rate (44.1kHz/48kHz), buffer size, master volume, audio context state, routing matrix.

**Underlying Technologies:** 
- Web Audio API AudioContext
- AudioWorklet for custom audio processing
- ScriptProcessorNode fallback for older browsers
- Input/Output: Audio samples, MIDI data, control parameters
- Output: Processed audio stream to speakers/headphones

### Synthesizer Engines
**Function:** Generate audio signals using various synthesis methods. Each engine provides unique sound characteristics and control parameters for diverse musical expression.

**Parameters:** Oscillator type, frequency, amplitude, filter cutoff, resonance, envelope parameters (ADSR), modulation sources.

**Underlying Technologies:**
- OscillatorNode for basic waveforms
- BiquadFilterNode for filtering
- GainNode for amplitude control
- Custom AudioWorklet processors for advanced synthesis
- Input: MIDI note data, control changes, automation
- Output: Audio signals to audio engine

### MIDI Interface Manager
**Function:** Handles communication with external MIDI devices and internal MIDI routing. Manages device discovery, connection status, and MIDI message parsing.

**Parameters:** Device list, channel assignments, velocity curves, timing offset, message filtering rules.

**Underlying Technologies:**
- Web MIDI API for hardware communication
- MIDI message parsing and routing logic
- Virtual MIDI ports for internal communication
- Input: MIDI hardware devices, virtual MIDI data
- Output: Parsed MIDI events, device status updates

### Effects Processing Chain
**Function:** Applies real-time audio effects to synthesizer outputs. Provides creative sound shaping tools and spatial processing capabilities.

**Parameters:** Effect type, wet/dry mix, effect-specific parameters, routing order, bypass state.

**Underlying Technologies:**
- ConvolverNode for reverb/impulse responses
- DelayNode for echo/delay effects
- DynamicsCompressorNode for compression
- Custom filters and modulators
- Input: Audio signals from synthesizers
- Output: Processed audio with applied effects

### Pattern Sequencer
**Function:** Records, plays back, and manipulates musical patterns and sequences. Enables loop-based composition and performance.

**Parameters:** Tempo (BPM), time signature, pattern length, quantization, swing, step data.

**Underlying Technologies:**
- High-resolution JavaScript timers
- Web Audio API scheduling
- Pattern data structures and algorithms
- Input: User step programming, real-time recording
- Output: Scheduled MIDI events, transport control

### User Interface Framework
**Function:** Provides responsive, accessible controls for all synthesizer parameters. Handles user input, real-time parameter updates, and visual feedback.

**Parameters:** Control mappings, layout configurations, theme settings, accessibility options.

**Underlying Technologies:**
- HTML5 Canvas for custom controls
- CSS Grid/Flexbox for responsive layout
- Touch/mouse event handling
- Real-time parameter binding
- Input: User interactions, automation data
- Output: Parameter changes, visual updates

### Preset Management System
**Function:** Saves, loads, and organizes synthesizer configurations and user presets. Enables sharing and backup of musical work.

**Parameters:** Preset categories, metadata tags, version control, sharing permissions.

**Underlying Technologies:**
- LocalStorage/IndexedDB for local persistence
- JSON serialization for preset data
- Cloud storage integration (optional)
- Input: Current synthesizer state, user metadata
- Output: Saved presets, loaded configurations

### Audio Recording Engine
**Function:** Captures live audio output for export and sharing. Provides real-time recording with visualization and basic editing capabilities.

**Parameters:** Recording format, bit depth, sample rate, recording length, file naming.

**Underlying Technologies:**
- MediaRecorder API for audio capture
- Web Audio API monitoring and visualization
- Blob/File API for export functionality
- Input: Live audio stream, recording commands
- Output: Audio files (WAV/MP3), waveform visualization

## [Project-UI-Layout]

# Canvas: Main UI Layout

Pallet: Dark Theme, Deep blue Primary, secondary purple, Deep cyan tertiary, deep magenta third and deep lime green as an accent, use borders and gradients and design elements effectively

## Description

- Purpose: Interface with two 27% sidebars (Subtractive, Additive) and a 46% central workspace, grouping controls by synthesis phase.
- Scope: All settings live in phase containers; advanced features hidden behind collapse toggles within containers. Real‑time MIDI feedback and mapping live in the central workspace.

## UI Sections & Elements

### Left Sidebar (27%) – Subtractive Synth

### Container: Sound Generation

- OSC selectors, tuning knobs, waveform dropdown
- **Advanced (toggle):** waveform‑specific settings (Pulse Width, Supersaw detune/mix)
    
### Container: Unison & Tuning
    
- Unison voice count, voice spread slider
- **Advanced (toggle):** coarse detune, fine detune, phase mode, match‑levels button

### Container: Timbre Shaping

- Filter type selector, cutoff knob, resonance knob
- **Advanced (toggle):** envelope amount, keyboard tracking switch

---

### Central Workspace (46%)

### Container: Abstract Audio Visualizer

- Dynamic, noise‑driven visual art in top 30% of central area

### Container: Global Spectrum Display

- "Master Spectrum" FFT canvas
- **Advanced (toggle):** spectrogram/waterfall mode, fftSize selector

### Container: subtractive tab Spectrum Display

- "Module Spectrum" mini‑FFT graph
- **Advanced (toggle):** range zoom controls, smoothing slider
    
### Container: additive tab Spectrum Display
    
- "Module Spectrum" mini‑FFT graph
- **Advanced (toggle):** spectrum range and smoothing controls

### Container: MIDI Inputs & Mapping

- **Live Values Display**
    - Pitch Wheel graphic (–8192 to +8191)
    - Mod Wheel slider (0–127)
    - List of mapped controls: Label, CC#, current value, mini‑slider
- **MIDI‑Learn Panel**
    - Button: "Enter Learn Mode"
    - Instruction text: "Move a hardware control to assign"
    - List: "Waiting for CC…" then shows detected CC# and prompts to choose destination parameter
    - Button: "Exit Learn Mode"
- **Advanced (toggle):** Clear All Mappings button, mapping presets

### Container: Modulation Matrix Access

- "Open Modulation Matrix" button
- **Advanced (toggle within matrix):** source grouping, favorites panel
    
### Container: Modulation
    
- LFO 1 rate & depth, Env 2 ADSR
- **Advanced (toggle):** additional envelope assignments, secondary LFO routing
    
### Container: Modulation
    
- LFO 1 rate & depth sliders, waveform select
- Env 2 ADSR sliders
- **Advanced (toggle):** depth polarity switch, secondary envelope routing

### Container: Global Controls & Effects

- Master volume knob, pan control, preset browser
- **Advanced (toggle):** send‑level knobs, advanced effects (EQ, Distortion, Flanger, Bitcrusher)

### Container: Global Amplitude Envelope

- ADSR sliders, envelope graph, reset button
- **Advanced (toggle):** curve‑shape presets, context‑suspend tolerance
    
### Container: additive Amplitude Envelope
    
- ADSR sliders, envelope graph
- **Advanced (toggle):** velocity curve editor
    
### Container: left subtractive Amplitude Envelope
    
- ADSR sliders, envelope graph
- **Advanced (toggle):** velocity sensitivity, numeric value entry

---

### Right Sidebar (27%) – Additive Synth

### Container: Sound Generation

- Harmonic preset buttons (Sine, Square, etc.)
- **Advanced (toggle):** partial count selector, phase per partial

### Container: Timbre Shaping

- Brightness, spread/decay, odd/even balance knobs
- **Advanced (toggle):** spectral tilt curve editor

### Container: Spectral Shaping (Advanced)

- Harmonic smear, stretch, comb interval & depth*(Entire container hidden behind "Advanced Shaping" toggle)*
    
### (inside spectral)Container: Deep Edit (Partials)
    
- Collapsible grid of 16 partial sliders, reset button
