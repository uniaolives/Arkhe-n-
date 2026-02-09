
import React, { useEffect, useRef } from 'react';

interface InterferenceVisualizerProps {
  active: boolean;
  isUnified: boolean;
}

const InterferenceVisualizer: React.FC<InterferenceVisualizerProps> = ({ active, isUnified }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!active) {
        ctx.fillStyle = '#002222';
        ctx.font = '10px Fira Code';
        ctx.textAlign = 'center';
        ctx.fillText('WAITING FOR RIVALRY INITIATION...', canvas.width / 2, canvas.height / 2);
        return;
      }

      const numLines = 50;
      const stepX = canvas.width / numLines;
      const centerY = canvas.height / 2;

      ctx.lineWidth = 1;
      
      // Draw traveling waves
      for (let i = 0; i < numLines; i++) {
        const x = i * stepX;
        
        // Present wave (2026)
        const wave1 = Math.sin(frame * 0.1 + i * 0.2) * 20;
        // Future wave (12024)
        const wave2 = Math.sin(frame * -0.07 + i * 0.4) * 20;
        
        // Interference
        const combined = isUnified ? (wave1 + wave2) : (frame % 100 < 50 ? wave1 : wave2);
        
        const opacity = isUnified ? 0.8 : 0.4;
        const color = isUnified ? '#ffffff' : (frame % 100 < 50 ? '#00ffff' : '#ffffff');
        
        ctx.strokeStyle = color;
        ctx.globalAlpha = opacity;
        
        ctx.beginPath();
        ctx.moveTo(x, centerY);
        ctx.lineTo(x, centerY + combined);
        ctx.stroke();

        // Trace line
        if (i > 0) {
            const prevX = (i - 1) * stepX;
            const prevWave1 = Math.sin(frame * 0.1 + (i-1) * 0.2) * 20;
            const prevWave2 = Math.sin(frame * -0.07 + (i-1) * 0.4) * 20;
            const prevCombined = isUnified ? (prevWave1 + prevWave2) : (frame % 100 < 50 ? prevWave1 : prevWave2);
            
            ctx.beginPath();
            ctx.moveTo(prevX, centerY + prevCombined);
            ctx.lineTo(x, centerY + combined);
            ctx.stroke();
        }
      }

      // Draw "Fringe" patterns if unified
      if (isUnified) {
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = '#ffffff';
        for (let j = 0; j < 5; j++) {
            const y = (frame + j * 40) % canvas.height;
            ctx.fillRect(0, y, canvas.width, 2);
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [active, isUnified]);

  return (
    <div className="w-full h-full p-2 flex flex-col">
        <div className="flex justify-between items-center mb-1">
            <span className="text-[8px] font-bold text-cyan-600">∇⁵ TRAVELING WAVE INTERFERENCE</span>
            <span className="text-[8px] text-white opacity-50 font-mono">
                {isUnified ? 'MODE: UNIFIED' : 'MODE: RIVALRY_OSCILLATION'}
            </span>
        </div>
        <canvas ref={canvasRef} className="w-full flex-1" width={400} height={100} />
    </div>
  );
};

export default InterferenceVisualizer;
