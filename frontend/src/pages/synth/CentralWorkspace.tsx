// CentralWorkspace.tsx
// Central workspace with visualizers, MIDI controls, and global settings
import { useState } from 'react';
import ContainerPanel from '../../components/panels/ContainerPanel';
import AudioVisualizer from '../../components/visualizers/AudioVisualizer';
import Knob from '../../components/controls/Knob';
import Slider from '../../components/controls/Slider';
import styles from './CentralWorkspace.module.css';

export default function CentralWorkspace() {
  // Global controls
  const [masterVolume, setMasterVolume] = useState(75);
  const [pan, setPan] = useState(0);
  
  // MIDI state
  const [pitchWheel, setPitchWheel] = useState(0);
  const [modWheel, setModWheel] = useState(0);
  const [midiLearnMode, setMidiLearnMode] = useState(false);
  
  // Modulation state
  const [lfoRate, setLfoRate] = useState(5);
  const [lfoDepth, setLfoDepth] = useState(50);
  const [lfoWaveform, setLfoWaveform] = useState('sine');
  
  // ADSR state
  const [attack, setAttack] = useState(10);
  const [decay, setDecay] = useState(200);
  const [sustain, setSustain] = useState(70);
  const [release, setRelease] = useState(500);

  return (
    <div className={styles.container}>
      {/* Abstract Audio Visualizer */}
      <div className={styles.visualizerSection}>
        <AudioVisualizer />
      </div>

      {/* Global Spectrum Display */}
      <ContainerPanel
        title="Master Spectrum"
        hasAdvanced={true}
        advancedChildren={
          <div className={styles.controls}>
            <select className={styles.select}>
              <option>FFT</option>
              <option>Spectrogram</option>
              <option>Waterfall</option>
            </select>
            <Knob
              label="FFT Size"
              value={2048}
              onChange={() => {}}
              min={512}
              max={8192}
              step={512}
            />
          </div>
        }
      >
        <div className={styles.spectrumDisplay}>
          <canvas className={styles.spectrumCanvas} />
        </div>
      </ContainerPanel>

      {/* Tab Panels for Module Spectrums */}
      <div className={styles.tabContainer}>
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${styles.active}`}>Subtractive</button>
          <button className={styles.tab}>Additive</button>
        </div>
        <ContainerPanel
          title="Module Spectrum"
          hasAdvanced={true}
          advancedChildren={
            <div className={styles.controls}>
              <Slider
                label="Zoom"
                value={100}
                onChange={() => {}}
                min={50}
                max={200}
                orientation="horizontal"
                unit="%"
              />
              <Slider
                label="Smooth"
                value={50}
                onChange={() => {}}
                min={0}
                max={100}
                orientation="horizontal"
                unit="%"
              />
            </div>
          }
        >
          <div className={styles.moduleSpectrum}>
            <canvas className={styles.spectrumCanvas} />
          </div>
        </ContainerPanel>
      </div>

      {/* MIDI Inputs & Mapping */}
      <ContainerPanel
        title="MIDI Inputs & Mapping"
        hasAdvanced={true}
        advancedChildren={
          <div className={styles.controls}>
            <button className={styles.button}>Clear All Mappings</button>
            <select className={styles.select}>
              <option>Default Preset</option>
              <option>Performance</option>
              <option>Studio</option>
            </select>
          </div>
        }
      >
        <div className={styles.midiSection}>
          <div className={styles.midiWheels}>
            <div className={styles.wheelContainer}>
              <label>Pitch</label>
              <Slider
                label=""
                value={pitchWheel}
                onChange={setPitchWheel}
                min={-8192}
                max={8191}
                orientation="vertical"
                showValue={true}
              />
            </div>
            <div className={styles.wheelContainer}>
              <label>Mod</label>
              <Slider
                label=""
                value={modWheel}
                onChange={setModWheel}
                min={0}
                max={127}
                orientation="vertical"
                showValue={true}
              />
            </div>
          </div>
          
          <div className={styles.midiLearnPanel}>
            <button
              className={`${styles.button} ${midiLearnMode ? styles.active : ''}`}
              onClick={() => setMidiLearnMode(!midiLearnMode)}
            >
              {midiLearnMode ? 'Exit Learn Mode' : 'Enter Learn Mode'}
            </button>
            {midiLearnMode && (
              <p className={styles.learnText}>Move a hardware control to assign...</p>
            )}
            <div className={styles.mappingsList}>
              <div className={styles.mapping}>
                <span>Filter Cutoff</span>
                <span>CC #74</span>
                <span>65</span>
              </div>
              <div className={styles.mapping}>
                <span>Resonance</span>
                <span>CC #71</span>
                <span>32</span>
              </div>
            </div>
          </div>
        </div>
      </ContainerPanel>

      {/* Modulation */}
      <ContainerPanel
        title="Modulation"
        hasAdvanced={true}
        advancedChildren={
          <div className={styles.controls}>
            <button className={styles.button}>Depth Polarity</button>
            <Knob
              label="LFO 2 Rate"
              value={10}
              onChange={() => {}}
              min={0.1}
              max={20}
              unit="Hz"
            />
          </div>
        }
      >
        <div className={styles.controls}>
          <Knob
            label="LFO Rate"
            value={lfoRate}
            onChange={setLfoRate}
            min={0.1}
            max={20}
            step={0.1}
            unit="Hz"
          />
          <Knob
            label="LFO Depth"
            value={lfoDepth}
            onChange={setLfoDepth}
            min={0}
            max={100}
            unit="%"
          />          <div className={styles.waveformSelector}>
            <label>LFO Wave</label>
            <div className={styles.waveformButtons}>
              <button
                className={`${styles.waveformButton} ${lfoWaveform === 'sine' ? styles.active : ''}`}
                onClick={() => setLfoWaveform('sine')}
              >
                Sine              </button>
              <button
                className={`${styles.waveformButton} ${lfoWaveform === 'triangle' ? styles.active : ''}`}
                onClick={() => setLfoWaveform('triangle')}
              >
                Triangle
              </button>
              <button
                className={`${styles.waveformButton} ${lfoWaveform === 'square' ? styles.active : ''}`}
                onClick={() => setLfoWaveform('square')}
              >
                Square
              </button>
              <button
                className={`${styles.waveformButton} ${lfoWaveform === 'sawtooth' ? styles.active : ''}`}
                onClick={() => setLfoWaveform('sawtooth')}
              >
                Saw
              </button>
            </div>
          </div>
        </div>
      </ContainerPanel>

      {/* Global Controls & Effects */}
      <ContainerPanel
        title="Global Controls & Effects"
        hasAdvanced={true}
        advancedChildren={
          <div className={styles.effects}>
            <Knob label="Reverb" value={30} onChange={() => {}} min={0} max={100} unit="%" />
            <Knob label="Delay" value={0} onChange={() => {}} min={0} max={100} unit="%" />
            <Knob label="Distortion" value={0} onChange={() => {}} min={0} max={100} unit="%" />
            <Knob label="Bitcrush" value={0} onChange={() => {}} min={0} max={16} step={1} />
          </div>
        }
      >
        <div className={styles.controls}>
          <Knob
            label="Master"
            value={masterVolume}
            onChange={setMasterVolume}
            min={0}
            max={100}
            size="large"
            unit="%"
          />
          <Knob
            label="Pan"
            value={pan}
            onChange={setPan}
            min={-100}
            max={100}
            unit=""
          />
          <button className={styles.button}>Browse Presets</button>
        </div>
      </ContainerPanel>

      {/* Global Amplitude Envelope */}
      <ContainerPanel
        title="Global Amplitude Envelope"
        hasAdvanced={true}
        advancedChildren={
          <div className={styles.controls}>
            <select className={styles.select}>
              <option>Linear</option>
              <option>Exponential</option>
              <option>Logarithmic</option>
            </select>
            <button className={styles.button}>Reset</button>
          </div>
        }
      >
        <div className={styles.envelope}>
          <div className={styles.envelopeDisplay}>
            <canvas className={styles.envelopeCanvas} />
          </div>
          <div className={styles.adsrControls}>
            <Slider
              label="A"
              value={attack}
              onChange={setAttack}
              min={0}
              max={5000}
              unit="ms"
            />
            <Slider
              label="D"
              value={decay}
              onChange={setDecay}
              min={0}
              max={5000}
              unit="ms"
            />
            <Slider
              label="S"
              value={sustain}
              onChange={setSustain}
              min={0}
              max={100}
              unit="%"
            />
            <Slider
              label="R"
              value={release}
              onChange={setRelease}
              min={0}
              max={10000}
              unit="ms"
            />
          </div>
        </div>
      </ContainerPanel>
    </div>
  );
}
