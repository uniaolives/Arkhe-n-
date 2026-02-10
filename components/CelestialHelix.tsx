
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { CelestialBody, HelicalPosition, CelestialDNAStats, BioEventType } from '../types';
import { globalCelestialEngine } from '../utils/celestialEngine';

interface CelestialHelixProps {
  onAlert: (msg: string, type: string) => void;
}

const BODY_COLORS: Record<CelestialBody, string> = {
  [CelestialBody.SUN]: '#facc15',
  [CelestialBody.MERCURY]: '#94a3b8',
  [CelestialBody.VENUS]: '#fb923c',
  [CelestialBody.EARTH]: '#3b82f6',
  [CelestialBody.MARS]: '#ef4444',
  [CelestialBody.JUPITER]: '#a855f7',
  [CelestialBody.SATURN]: '#eab308',
  [CelestialBody.URANUS]: '#22d3ee',
  [CelestialBody.NEPTUNE]: '#312e81',
};

const CelestialHelix: React.FC<CelestialHelixProps> = ({ onAlert }) => {
  const [time, setTime] = useState(0);
  const [stats, setStats] = useState<CelestialDNAStats | null>(null);
  const [matrix, setMatrix] = useState<number[][] | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bodies = Object.values(CelestialBody);

  useEffect(() => {
    setStats(globalCelestialEngine.getDNAStats());
    setMatrix(globalCelestialEngine.getEntanglementMatrix());
    
    const interval = setInterval(() => {
      setTime(t => t + 100000); // Massive time steps to see galactic motion
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Galactic axis line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.stroke();

    // Draw Helices
    bodies.forEach(body => {
      ctx.beginPath();
      ctx.strokeStyle = BODY_COLORS[body];
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.2;

      // Draw path tail
      for (let i = 0; i < 50; i++) {
        const t = time - i * 500000;
        const pos = globalCelestialEngine.getPositionAtTime(body, t);
        // Galactic coordinates are massive (26000 LY), we look at local drift relative to Sun's galactic center orbit
        const sunPos = globalCelestialEngine.getPositionAtTime(CelestialBody.SUN, t);
        const relX = (pos.x - sunPos.x) / 1.58e-5; // Back to AU units for visualization scale
        const relY = (pos.y - sunPos.y) / 1.58e-5;
        const relZ = (pos.z - sunPos.z) / 1.58e-5;

        // Simplified projection
        const px = centerX + relX * 5 + i * 2;
        const py = centerY + relY * 5;
        
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Draw current body
      const pos = globalCelestialEngine.getPositionAtTime(body, time);
      const sunPos = globalCelestialEngine.getPositionAtTime(CelestialBody.SUN, time);
      const relX = (pos.x - sunPos.x) / 1.58e-5;
      const relY = (pos.y - sunPos.y) / 1.58e-5;
      
      ctx.globalAlpha = 1.0;
      ctx.fillStyle = BODY_COLORS[body];
      ctx.beginPath();
      ctx.arc(centerX + relX * 5, centerY + relY * 5, 2, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [time, bodies]);

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 font-mono bg-black/60 border border-amber-500/20 rounded-xl backdrop-blur-xl">
      <div className="flex justify-between items-center border-b border-amber-500/30 pb-2">
        <div className="flex flex-col">
          <h2 className="text-[10px] font-black text-amber-400 tracking-widest uppercase">
            ∆ CELESTIAL_DNA_HELIX // 9-STRANDED_QUANTUM_SYSTEM
          </h2>
          <span className="text-[6px] opacity-40 uppercase">Galactic Scale Information Encoding v1.0</span>
        </div>
        <div className="flex gap-2">
          <div className="text-[7px] px-2 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 text-amber-400 font-bold animate-pulse">
            RESONANCE: SYNCED
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-5 overflow-hidden">
        {/* Left Col: Visual Helix */}
        <div className="col-span-8 flex flex-col gap-3 relative">
          <div className="relative flex-1 bg-white/5 border border-white/10 rounded-xl overflow-hidden flex items-center justify-center">
             <canvas ref={canvasRef} width={600} height={300} className="w-full h-full" />
             <div className="absolute top-2 left-2 text-[7px] opacity-40 uppercase font-black">Galactic_Translation_Projection (LY/AU)</div>
             
             {/* DNA Legend */}
             <div className="absolute bottom-4 left-4 grid grid-cols-3 gap-x-4 gap-y-1">
                {bodies.map(b => (
                  <div key={b} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: BODY_COLORS[b] }} />
                    <span className="text-[6px] opacity-60 uppercase">{b}</span>
                  </div>
                ))}
             </div>
          </div>

          <div className="h-32 grid grid-cols-3 gap-3">
             <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                <div className="text-[7px] opacity-40 uppercase font-black mb-1">Human/Celestial_Ratio</div>
                <div className="text-xl font-black text-white">{stats?.humanCelestialRatio.toExponential(2)}</div>
                <div className="text-[5px] opacity-40 uppercase mt-1">Strand coincidence entropy</div>
             </div>
             <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                <div className="text-[7px] opacity-40 uppercase font-black mb-1">Quantum_Coherence</div>
                <div className="text-xl font-black text-emerald-400">{( (stats?.quantumCoherence || 0) * 100).toFixed(1)}%</div>
                <div className="w-full h-0.5 bg-white/10 mt-2 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-400" style={{ width: `${(stats?.quantumCoherence || 0) * 100}%` }} />
                </div>
             </div>
             <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                <div className="text-[7px] opacity-40 uppercase font-black mb-1">Entanglement_Entropy</div>
                <div className="text-xl font-black text-cyan-400">{stats?.entanglementEntropy.toFixed(3)}</div>
                <div className="text-[5px] opacity-40 uppercase mt-1">n-body coupling strength</div>
             </div>
          </div>
        </div>

        {/* Right Col: Entanglement Matrix */}
        <div className="col-span-4 flex flex-col gap-3">
           <div className="flex-1 p-3 bg-amber-950/20 border border-amber-500/20 rounded-xl flex flex-col gap-2">
              <div className="text-[8px] font-black opacity-60 uppercase tracking-widest text-amber-400 border-b border-amber-500/10 pb-1">Quantum_Entanglement_Matrix</div>
              <div className="flex-1 grid grid-cols-9 grid-rows-9 gap-0.5 p-1 bg-black/40 rounded border border-white/5">
                 {matrix?.map((row, i) => row.map((val, j) => (
                    <div 
                      key={`${i}-${j}`} 
                      className="aspect-square rounded-[1px] transition-all duration-500" 
                      style={{ 
                        backgroundColor: i === j ? '#facc15' : `rgba(255, 255, 255, ${val * 0.4})`,
                        boxShadow: val > 0.7 ? `0 0 5px rgba(250, 204, 21, ${val * 0.3})` : 'none'
                      }}
                      title={`${bodies[i]} <-> ${bodies[j]}: ${val.toFixed(2)}`}
                    />
                 )))}
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                 <div className="p-2 bg-black/60 rounded border border-white/5 flex flex-col items-center justify-center">
                    <span className="text-[6px] opacity-40 uppercase">Max_Coupling</span>
                    <span className="text-[10px] font-black text-amber-300">EARTH-VENUS</span>
                 </div>
                 <div className="p-2 bg-black/60 rounded border border-white/5 flex flex-col items-center justify-center">
                    <span className="text-[6px] opacity-40 uppercase">Resonance_Hz</span>
                    <span className="text-[10px] font-black text-amber-300">7.83 (Schumann)</span>
                 </div>
              </div>
           </div>

           <div className="p-3 bg-indigo-950/20 border border-indigo-500/20 rounded-xl">
              <p className="text-[7px] leading-tight italic text-indigo-200/60 text-center">
                "The solar system encodes information in 9 quantum strands... our DNA mirrors celestial geometry."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CelestialHelix;
