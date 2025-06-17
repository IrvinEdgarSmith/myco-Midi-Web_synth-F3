// AdditiveSynth.tsx
// Right sidebar - Additive synthesis controls
import { useState } from 'react';
import ContainerPanel from '../../components/panels/ContainerPanel';
import Knob from '../../components/controls/Knob';
import Slider from '../../components/controls/Slider';
import styles from './AdditiveSynth.module.css';

export default function AdditiveSynth() {
  // Sound Generation state
  const [harmonicPreset, setHarmonicPreset] = useState('sine');
  const [partialCount, setPartialCount] = useState(8);
  const [phaseMode, setPhaseMode] = useState('zero');
  
  // Timbre Shaping state
  const [brightness, setBrightness] = useState(50);
  const [spread, setSpread] = useState(30);
  const [oddEvenBalance, setOddEvenBalance] = useState(0);
  const [spectralTilt, setSpectralTilt] = useState(0);
  
  // Spectral Shaping state
  const [harmonicSmear, setHarmonicSmear] = useState(0);
  const [stretch, setStretch] = useState(1);
  const [combInterval, setCombInterval] = useState(3);
  const [combDepth, setCombDepth] = useState(0);
  
  // Tuning state
  const [coarseDetune, setCoarseDetune] = useState(0);
  const [fineDetune, setFineDetune] = useState(0);
  
  // Partial amplitudes (for deep edit)
  const [partials, setPartials] = useState(new Array(16).fill(50));

  // Helper functions
  const resetTuning = () => {
    setCoarseDetune(0);
    setFineDetune(0);
  };

  // Calculate total detune in cents for display
  const totalDetuneCents = coarseDetune * 100 + fineDetune;

  // Quick tuning presets for harmonic intervals
  const setTuningPreset = (semitones: number, cents: number = 0) => {
    setCoarseDetune(semitones);
    setFineDetune(cents);
  };

  const handlePartialChange = (index: number, value: number) => {
    const newPartials = [...partials];
    newPartials[index] = value;
    setPartials(newPartials);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Additive Synth</h2>
      
      {/* Sound Generation */}
      <ContainerPanel
        title="Sound Generation"
        hasAdvanced={true}
        advancedChildren={
          <div className={styles.controls}>
            <Knob
              label="Partials"
              value={partialCount}
              onChange={setPartialCount}
              min={1}
              max={32}
              step={1}
            />
            <div className={styles.phaseSelector}>
              <label>Phase Mode</label>
              <select
                value={phaseMode}
                onChange={(e) => setPhaseMode(e.target.value)}
                className={styles.select}
              >
                <option value="zero">Zero</option>
                <option value="random">Random</option>
                <option value="aligned">Aligned</option>
              </select>
            </div>
          </div>
        }
      >
        <div className={styles.presetButtons}>
          <button
            className={`${styles.presetButton} ${harmonicPreset === 'sine' ? styles.active : ''}`}
            onClick={() => setHarmonicPreset('sine')}
          >
            Sine
          </button>
          <button
            className={`${styles.presetButton} ${harmonicPreset === 'square' ? styles.active : ''}`}
            onClick={() => setHarmonicPreset('square')}
          >
            Square
          </button>
          <button
            className={`${styles.presetButton} ${harmonicPreset === 'saw' ? styles.active : ''}`}
            onClick={() => setHarmonicPreset('saw')}
          >
            Saw
          </button>
          <button
            className={`${styles.presetButton} ${harmonicPreset === 'triangle' ? styles.active : ''}`}
            onClick={() => setHarmonicPreset('triangle')}
          >
            Triangle
          </button>          <button
            className={`${styles.presetButton} ${harmonicPreset === 'custom' ? styles.active : ''}`}
            onClick={() => setHarmonicPreset('custom')}
          >
            Custom
          </button>
        </div>
        
        <div className={styles.controls}>
          <Knob
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

      {/* Timbre Shaping */}
      <ContainerPanel
        title="Timbre Shaping"
        hasAdvanced={true}
        advancedChildren={
          <div className={styles.spectralEditor}>
            <div className={styles.tiltCurve}>
              <canvas className={styles.curveCanvas} />
            </div>
            <Slider
              label="Tilt"
              value={spectralTilt}
              onChange={setSpectralTilt}
              min={-100}
              max={100}
              orientation="horizontal"
            />
          </div>
        }
      >
        <div className={styles.controls}>
          <Knob
            label="Brightness"
            value={brightness}
            onChange={setBrightness}
            min={0}
            max={100}
            unit="%"
          />
          <Knob
            label="Spread"
            value={spread}
            onChange={setSpread}
            min={0}
            max={100}
            unit="%"
          />
          <Knob
            label="Odd/Even"
            value={oddEvenBalance}
            onChange={setOddEvenBalance}
            min={-100}
            max={100}
          />
        </div>
      </ContainerPanel>

      {/* Spectral Shaping (Advanced) */}
      <ContainerPanel
        title="Spectral Shaping"
        hasAdvanced={false}
      >
        <div className={styles.controls}>
          <Knob
            label="Smear"
            value={harmonicSmear}
            onChange={setHarmonicSmear}
            min={0}
            max={100}
            unit="%"
          />
          <Knob
            label="Stretch"
            value={stretch}
            onChange={setStretch}
            min={0.5}
            max={2}
            step={0.01}
          />
          <Knob
            label="Comb Int"
            value={combInterval}
            onChange={setCombInterval}
            min={1}
            max={16}
            step={1}
          />
          <Knob
            label="Comb Depth"
            value={combDepth}
            onChange={setCombDepth}
            min={0}
            max={100}
            unit="%"
          />
        </div>
        
        {/* Deep Edit (Partials) */}
        <ContainerPanel
          title="Deep Edit (Partials)"
          hasAdvanced={false}
        >
          <div className={styles.partialsGrid}>
            {partials.map((value, index) => (
              <div key={index} className={styles.partialControl}>
                <label>{index + 1}</label>
                <Slider
                  label=""
                  value={value}
                  onChange={(v) => handlePartialChange(index, v)}
                  min={0}
                  max={100}
                  orientation="vertical"
                  showValue={false}
                />
              </div>
            ))}
          </div>
          <button className={styles.button}>Reset Partials</button>
        </ContainerPanel>
      </ContainerPanel>

      {/* Amplitude Envelope */}
      <ContainerPanel
        title="Amplitude Envelope"
        hasAdvanced={true}
        advancedChildren={
          <div className={styles.controls}>
            <div className={styles.velocityCurve}>
              <canvas className={styles.curveCanvas} />
            </div>
            <Knob
              label="Velocity"
              value={80}
              onChange={() => {}}
              min={0}
              max={100}
              unit="%"
            />
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
              value={10}
              onChange={() => {}}
              min={0}
              max={5000}
              unit="ms"
            />
            <Slider
              label="D"
              value={200}
              onChange={() => {}}
              min={0}
              max={5000}
              unit="ms"
            />
            <Slider
              label="S"
              value={70}
              onChange={() => {}}
              min={0}
              max={100}
              unit="%"
            />
            <Slider
              label="R"
              value={500}
              onChange={() => {}}
              min={0}
              max={10000}
              unit="ms"
            />
          </div>
        </div>
      </ContainerPanel>

      {/* Harmonic Tuning */}
      <ContainerPanel
        title="Harmonic Tuning"
        hasAdvanced={true}
        advancedChildren={
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
            <button 
              className={styles.button}
              onClick={resetTuning}
            >
              Reset Tuning
            </button>
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
                onClick={() => setTuningPreset(5)}
                title="Perfect fourth up"
              >
                +4th
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
            label="H.Spread"
            value={50}
            onChange={() => {}}
            min={0}
            max={100}
            unit="%"
          />
          <Knob
            label="Intonation"
            value={0}
            onChange={() => {}}
            min={-50}
            max={50}
            unit="ct"
          />
        </div>
      </ContainerPanel>
    </div>
  );
}
