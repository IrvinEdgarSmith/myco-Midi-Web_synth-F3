// Knob.tsx
// Rotary knob control for synth parameters
import { useRef, useState, useEffect, useCallback } from 'react';
import styles from './Knob.module.css';

interface KnobProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  size?: 'small' | 'medium' | 'large';
  unit?: string;
}

export default function Knob({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  size = 'medium',
  unit = '',
}: KnobProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragStartValue, setDragStartValue] = useState(value);
  const knobRef = useRef<HTMLDivElement>(null);

  // Calculate rotation angle (-140 to +140 degrees)
  const normalized = (value - min) / (max - min);
  const rotation = -140 + normalized * 280;

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartY(e.clientY);
    setDragStartValue(value);
    e.preventDefault();
  }, [value]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const deltaY = dragStartY - e.clientY;
    const range = max - min;
    const sensitivity = 200; // pixels for full range
    const deltaValue = (deltaY / sensitivity) * range;
    
    let newValue = dragStartValue + deltaValue;
    newValue = Math.max(min, Math.min(max, newValue));
    newValue = Math.round(newValue / step) * step;
    
    onChange(newValue);
  }, [isDragging, dragStartY, dragStartValue, min, max, step, onChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className={`${styles.container} ${styles[size]}`}>
      <div
        ref={knobRef}
        className={`${styles.knob} ${isDragging ? styles.dragging : ''}`}
        onMouseDown={handleMouseDown}
        role="slider"
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        tabIndex={0}
      >
        <div 
          className={styles.indicator}
          style={{ 
            transform: `translateX(-50%) rotate(${rotation}deg)`,
            transformOrigin: '50% 100%'
          }}
        />
      </div>
      <label className={styles.label}>{label}</label>
      <div className={styles.value}>
        {value.toFixed(step < 1 ? 1 : 0)}{unit}
      </div>
    </div>
  );
}
