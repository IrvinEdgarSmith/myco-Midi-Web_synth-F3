// Slider.tsx
// Vertical/horizontal slider control
import { useRef, useState, useEffect, useCallback } from 'react';
import styles from './Slider.module.css';

interface SliderProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  orientation?: 'horizontal' | 'vertical';
  showValue?: boolean;
  unit?: string;
}

export default function Slider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  orientation = 'vertical',
  showValue = true,
  unit = '',
}: SliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const normalized = (value - min) / (max - min);
  const percentage = normalized * 100;

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateValue(e);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    updateValue(e);
  }, [isDragging]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  }, []);

  const updateValue = useCallback((e: React.PointerEvent) => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    let ratio: number;

    if (orientation === 'vertical') {
      ratio = 1 - (e.clientY - rect.top) / rect.height;
    } else {
      ratio = (e.clientX - rect.left) / rect.width;
    }

    ratio = Math.max(0, Math.min(1, ratio));
    let newValue = min + ratio * (max - min);
    newValue = Math.round(newValue / step) * step;
    
    onChange(newValue);
  }, [orientation, min, max, step, onChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    let newValue = value;
    const bigStep = (max - min) / 10;

    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowRight':
        newValue = Math.min(max, value + (e.shiftKey ? bigStep : step));
        break;
      case 'ArrowDown':
      case 'ArrowLeft':
        newValue = Math.max(min, value - (e.shiftKey ? bigStep : step));
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      default:
        return;
    }

    e.preventDefault();
    onChange(newValue);
  }, [value, min, max, step, onChange]);

  return (
    <div className={`${styles.container} ${styles[orientation]}`}>
      <label className={styles.label}>{label}</label>
      
      <div
        ref={trackRef}
        className={styles.track}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        role="slider"
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-orientation={orientation}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div 
          className={styles.fill}
          style={
            orientation === 'vertical'
              ? { height: `${percentage}%` }
              : { width: `${percentage}%` }
          }
        />
        <div 
          className={styles.thumb}
          style={
            orientation === 'vertical'
              ? { bottom: `${percentage}%` }
              : { left: `${percentage}%` }
          }
        />
      </div>

      {showValue && (
        <div className={styles.value}>
          {value.toFixed(step < 1 ? 1 : 0)}{unit}
        </div>
      )}
    </div>
  );
}
