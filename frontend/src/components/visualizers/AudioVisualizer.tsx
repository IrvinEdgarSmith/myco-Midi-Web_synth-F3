// AudioVisualizer.tsx
// Abstract audio visualizer using noise-driven visual art
import { useEffect, useRef, useState } from 'react';
import styles from './AudioVisualizer.module.css';

interface AudioVisualizerProps {
  analyserNode?: AnalyserNode | null;
}

export default function AudioVisualizer({ analyserNode }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isActive, setIsActive] = useState(false);
  const activityTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Keyboard event handlers
    const handleKeyDown = (e: KeyboardEvent) => {
      // Musical keyboard keys (like a piano)
      const musicalKeys = ['a', 'w', 's', 'e', 'd', 'f', 't', 'g', 'y', 'h', 'u', 'j', 'k', 'o', 'l', 'p'];
      if (musicalKeys.includes(e.key.toLowerCase())) {
        setIsActive(true);
        
        // Clear any existing timeout
        if (activityTimeoutRef.current) {
          clearTimeout(activityTimeoutRef.current);
        }
        
        // Set timeout to stop animation after key release
        activityTimeoutRef.current = setTimeout(() => {
          setIsActive(false);
        }, 500); // Continue animation for 500ms after key release
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Visualization variables
    let time = 0;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      hue: number;
      energy: number;
    }> = [];

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: 0,
        vy: 0,
        size: Math.random() * 3 + 1,
        hue: Math.random() * 60 + 200, // Blue to purple range
        energy: 0,
      });
    }

    const draw = () => {
      // Fade effect
      ctx.fillStyle = 'rgba(11, 13, 23, 0.1)';
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Get audio data if available
      let audioLevel = 0;
      if (analyserNode && isActive) {
        const dataArray = new Uint8Array(analyserNode.frequencyBinCount);
        analyserNode.getByteFrequencyData(dataArray);
        audioLevel = dataArray.reduce((sum, val) => sum + val, 0) / dataArray.length / 255;
      }

      // Draw particles
      particles.forEach((particle, index) => {
        // Only move particles when active (key pressed)
        if (isActive || particle.energy > 0.01) {
          // Update energy
          if (isActive) {
            particle.energy = Math.min(1, particle.energy + 0.1);
          } else {
            particle.energy *= 0.95; // Decay energy
          }

          // Update velocity based on energy
          const noise = Math.sin(time * 0.001 + index) * particle.energy;
          particle.vx = (Math.random() - 0.5) * 2 * particle.energy + noise;
          particle.vy = (Math.random() - 0.5) * 2 * particle.energy + Math.cos(time * 0.001 + index) * particle.energy;

          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Wrap around edges
          if (particle.x < 0) particle.x = canvas.offsetWidth;
          if (particle.x > canvas.offsetWidth) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.offsetHeight;
          if (particle.y > canvas.offsetHeight) particle.y = 0;
        }

        // Audio reactivity
        const size = particle.size + (audioLevel || particle.energy) * 10;
        const brightness = 30 + (audioLevel || particle.energy) * 70;
        const opacity = 0.3 + particle.energy * 0.6;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 70%, ${brightness}%, ${opacity})`;
        ctx.fill();

        // Connect nearby particles only when active
        if (particle.energy > 0.1) {
          particles.forEach((other, otherIndex) => {
            if (index === otherIndex || other.energy < 0.1) return;
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              const connectionOpacity = 0.2 * (1 - distance / 100) * Math.min(particle.energy, other.energy);
              ctx.strokeStyle = `hsla(${particle.hue}, 70%, 50%, ${connectionOpacity})`;
              ctx.stroke();
            }
          });
        }
      });

      if (isActive) {
        time++;
      }
      
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animationRef.current);
      if (activityTimeoutRef.current) {
        clearTimeout(activityTimeoutRef.current);
      }
    };
  }, [analyserNode, isActive]);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
      {!isActive && (
        <div className={styles.hint}>Press musical keys (A-P) to activate visualizer</div>
      )}
    </div>
  );
}
