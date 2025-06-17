// SubtractiveSynth.tsx
// Left sidebar - Subtractive synthesis controls
import { useState } from 'react';
import ContainerPanel from '../../components/panels/ContainerPanel';
import Knob from '../../components/controls/Knob';
import Slider from '../../components/controls/Slider';
import styles from './SubtractiveSynth.module.css';

export default function SubtractiveSynth() {  // Sound Generation state
  const [oscWaveform, setOscWaveform] = useState('sawtooth');
  const [pulseWidth, setPulseWidth] = useState(50);
  
  // Unison & Tuning state
  const [unisonVoices, setUnisonVoices] = useState(1);
  const [voiceSpread, setVoiceSpread] = useState(0);
  const [coarseDetune, setCoarseDetune] = useState(0);
  const [fineDetune, setFineDetune] = useState(0);
  
  // Timbre Shaping state
  const [filterType, setFilterType] = useState('lowpass');
  const [filterCutoff, setFilterCutoff] = useState(1000);
  const [filterResonance, setFilterResonance] = useState(0);
  const [filterEnvAmount, setFilterEnvAmount] = useState(0);
  const [keyTracking, setKeyTracking] = useState(false);

  // Helper functions
  const resetTuning = () => {
    setCoarseDetune(0);
    setFineDetune(0);
  };

  // Calculate total detune in cents for display
  const totalDetuneCents = coarseDetune * 100 + fineDetune;

  // Quick tuning presets
  const setTuningPreset = (semitones: number, cents: number = 0) => {
    setCoarseDetune(semitones);
    setFineDetune(cents);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Subtractive Synth</h2>
      
      {/* Sound Generation */}
      <ContainerPanel
        title="Sound Generation"
        hasAdvanced={true}
        advancedChildren={
          <div className={styles.controls}>
            {oscWaveform === 'pulse' && (
              <Knob
                label="Pulse Width"
                value={pulseWidth}
                onChange={setPulseWidth}
                min={0}
                max={100}
                unit="%"
              />
            )}
            {oscWaveform === 'supersaw' && (
              <>
                <Knob
                  label="Detune"
                  value={50}
                  onChange={() => {}}
                  min={0}
                  max={100}
                />
                <Knob
                  label="Mix"
                  value={80}
                  onChange={() => {}}
                  min={0}
                  max={100}
                  unit="%"
                />
              </>
            )}
          </div>
        }
      >        <div className={styles.controls}>
          <div className={styles.waveformSelector}>
            <label>Waveform</label>
            <div className={styles.waveformButtons}>
              <button
                className={`${styles.waveformButton} ${oscWaveform === 'sine' ? styles.active : ''}`}
                onClick={() => setOscWaveform('sine')}
              >
                Sine
              </button>
              <button
                className={`${styles.waveformButton} ${oscWaveform === 'triangle' ? styles.active : ''}`}
                onClick={() => setOscWaveform('triangle')}
              >
                Triangle
              </button>
              <button
                className={`${styles.waveformButton} ${oscWaveform === 'sawtooth' ? styles.active : ''}`}
                onClick={() => setOscWaveform('sawtooth')}
              >
                Sawtooth
              </button>
              <button
                className={`${styles.waveformButton} ${oscWaveform === 'square' ? styles.active : ''}`}
                onClick={() => setOscWaveform('square')}
              >
                Square
              </button>            </div>
          </div>          <Knob
            label="Coarse"
            value={coarseDetune}
            onChange={setCoarseDetune}
            min={-24}
            max={24}
            step={1}
            unit="st"
          />
          <div className={styles.tuningDisplay}>
            <label>Total</label>
            <div className={styles.tuningValue}>
              {totalDetuneCents > 0 ? '+' : ''}{totalDetuneCents}ct
            </div>
          </div>
          <Knob
            label="Fine"
            value={fineDetune}
            onChange={setFineDetune}
            min={-100}
            max={100}
            step={1}
            unit="ct"
          />
        </div>
      </ContainerPanel>

      {/* Unison & Tuning */}
      <ContainerPanel
        title="Unison & Tuning"
        hasAdvanced={true}        advancedChildren={
          <div className={styles.controls}>
            <Knob
              label="Master Coarse"
              value={coarseDetune}
              onChange={setCoarseDetune}
              min={-48}
              max={48}
              step={1}
              unit="st"
            />
            <Knob
              label="Master Fine"
              value={fineDetune}
              onChange={setFineDetune}
              min={-200}
              max={200}
              step={1}
              unit="ct"
            />
            <div className={styles.toggleControl}>
              <label>
                <input
                  type="checkbox"
                  checked={keyTracking}
                  onChange={(e) => setKeyTracking(e.target.checked)}
                />
                Key Track
              </label>            </div>
            <button className={styles.button} onClick={resetTuning}>Reset Tuning</button>
            <div className={styles.tuningPresets}>
              <button 
                className={styles.presetButton}
                onClick={() => setTuningPreset(12)}
                title="Octave up"
              >
                +Oct
              </button>
              <button 
                className={styles.presetButton}
                onClick={() => setTuningPreset(7)}
                title="Perfect fifth up"
              >
                +5th
              </button>
              <button 
                className={styles.presetButton}
                onClick={() => setTuningPreset(-12)}
                title="Octave down"
              >
                -Oct
              </button>
            </div>
          </div>
        }
      >
        <div className={styles.controls}>
          <Knob
            label="Voices"
            value={unisonVoices}
            onChange={setUnisonVoices}
            min={1}
            max={8}
            step={1}
          />
          <Slider
            label="Spread"
            value={voiceSpread}
            onChange={setVoiceSpread}
            min={0}
            max={100}
            orientation="horizontal"
            unit="%"
          />
        </div>
      </ContainerPanel>

      {/* Timbre Shaping */}
      <ContainerPanel
        title="Timbre Shaping"
        hasAdvanced={true}
        advancedChildren={
          <div className={styles.controls}>
            <Knob
              label="Env Amount"
              value={filterEnvAmount}
              onChange={setFilterEnvAmount}
              min={-100}
              max={100}
              unit="%"
            />
            <div className={styles.toggleControl}>
              <label>
                <input
                  type="checkbox"
                  checked={keyTracking}
                  onChange={(e) => setKeyTracking(e.target.checked)}
                />
                Key Track
              </label>
            </div>
          </div>
        }
      >
        <div className={styles.controls}>
          <div className={styles.filterSelector}>
            <label>Filter Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className={styles.select}
            >
              <option value="lowpass">Low Pass</option>
              <option value="highpass">High Pass</option>
              <option value="bandpass">Band Pass</option>
              <option value="notch">Notch</option>
            </select>
          </div>
          <Knob
            label="Cutoff"
            value={filterCutoff}
            onChange={setFilterCutoff}
            min={20}
            max={20000}
            step={10}
            unit="Hz"
          />
          <Knob
            label="Resonance"
            value={filterResonance}
            onChange={setFilterResonance}
            min={0}
            max={100}
            unit="%"
          />
        </div>
      </ContainerPanel>
    </div>
  );
}
