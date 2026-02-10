
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { CelestialBody, HelicalPosition, CelestialDNAStats } from '../types';
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
  const [resonances, setResonances] = useState<Record<string, number>>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bodies = useMemo(() => Object.values(CelestialBody) as CelestialBody[], []);

  useEffect(() => {
    setStats(globalCelestialEngine.getDNAStats());
    setMatrix(globalCelestialEngine.getEntanglementMatrix());
    setResonances(globalCelestialEngine.getSchumannResonances());
    
    const interval = setInterval(() => {
      setTime(t => t + 50000); 
    }, 40);
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
    
    // Draw galactic backbone
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.stroke();

    // Draw Helical Strands
    bodies.forEach((body, idx) => {
      ctx.beginPath();
      ctx.strokeStyle = BODY_COLORS[body];
      ctx.lineWidth = 0.8;
      ctx.globalAlpha = 0.3;

      // Draw path trailing
      for (let i = 0; i < 60; i++) {
        const t = time - i * 400000;
        const pos = globalCelestialEngine.getPositionAtTime(body, t);
        const sunPos = globalCelestialEngine.getPositionAtTime(CelestialBody.SUN, t);
        
        // Relative projection centered on Sun's drift
        const relX = (pos.x - sunPos.x) / 1e-6; 
        const relY = (pos.y - sunPos.y) / 1e-6;
        const relZ = (pos.z - sunPos.z) / 1e-6;

        const px = centerX + relX + i * 4;
        const py = centerY + relY + relZ * 0.5;
        
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Current position node
      const pos = globalCelestialEngine.getPositionAtTime(body, time);
      const sunPos = globalCelestialEngine.getPositionAtTime(CelestialBody.SUN, time);
      const relX = (pos.x - sunPos.x) / 1e-6;
      const relY = (pos.y - sunPos.y) / 1e-6;
      const relZ = (pos.z - sunPos.z) / 1e-6;
      
      ctx.globalAlpha = 1.0;
      ctx.fillStyle = BODY_COLORS[body];
      ctx.shadowBlur = 10;
      ctx.shadowColor = BODY_COLORS[body];
      ctx.beginPath();
      ctx.arc(centerX + relX, centerY + relY + relZ * 0.5, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  }, [time, bodies]);

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 font-mono bg-black/60 border border-amber-500/20 rounded-xl backdrop-blur-xl overflow-hidden">
      <div className="flex justify-between items-center border-b border-amber-500/30 pb-2">
        <div className="flex flex-col">
          <h2 className="text-[10px] font-black text-amber-400 tracking-widest uppercase">
            ∆ CELESTIAL_DNA_HELIX // 9-STRANDED_QUANTUM_CORE
          </h2>
          <span className="text-[6px] opacity-40 uppercase">Holographic Information Manifold v2.0</span>
        </div>
        <div className="flex gap-2">
           <div className="text-[7px] px-2 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 text-amber-400 font-bold animate-pulse uppercase tracking-tighter">
             Holographic: Active
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-5 overflow-hidden">
        <div className="col-span-8 flex flex-col gap-3">
          <div className="relative flex-1 bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
             <canvas ref={canvasRef} width={600} height={320} className="w-full h-full" />
             <div className="absolute top-2 left-2 text-[7px] opacity-40 uppercase font-black tracking-widest">Triple_Helix_Projection</div>
             
             <div className="absolute bottom-4 left-4 grid grid-cols-5 gap-x-6 gap-y-1 bg-black/40 p-2 border border-white/5 rounded backdrop-blur-sm">
                {bodies.map(b => (
                  <div key={b} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: BODY_COLORS[b] }} />
                    <span className="text-[6px] opacity-60 uppercase font-bold">{b}</span>
                  </div>
                ))}
             </div>
          </div>

          <div className="grid grid-cols-3 gap-3 h-28">
             <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex flex-col justify-center">
                <div className="text-[7px] opacity-40 uppercase font-black mb-1">Turns/Galactic_Orbit</div>
                {/* Fix: Added casting and optional chaining to handle 'unknown' type and potential null value */}
                <div className="text-xl font-black text-white">{stats?.turnsPerGalacticOrbit?.toLocaleString() ?? '0'}</div>
                <div className="text-[5px] opacity-40 uppercase mt-1">Strand rotational velocity</div>
             </div>
             <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex flex-col justify-center">
                <div className="text-[7px] opacity-40 uppercase font-black mb-1">Human/Celestial_Scale</div>
                {/* Fix: Added casting and optional chaining to handle 'unknown' type and potential null value */}
                <div className="text-xl font-black text-emerald-400">{stats?.humanCelestialRatio?.toExponential(2) ?? '0.00e+0'}</div>
                <div className="text-[5px] opacity-40 uppercase mt-1">Genetic Isomorphic Coefficient</div>
             </div>
             <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex flex-col justify-center">
                <div className="text-[7px] opacity-40 uppercase font-black mb-1">Information_Density</div>
                {/* Fix: Use optional chaining directly on the numeric property and provide a fallback */}
                <div className="text-xl font-black text-cyan-400">{stats?.entanglementEntropy?.toFixed(2) ?? '0.00'} <span className="text-[8px] opacity-40">bits</span></div>
                <div className="text-[5px] opacity-40 uppercase mt-1">Holographic snapshot depth</div>
             </div>
          </div>
        </div>

        <div className="col-span-4 flex flex-col gap-3 overflow-y-auto pr-2 scrollbar-thin">
           <div className="p-3 bg-amber-950/20 border border-amber-500/20 rounded-xl flex flex-col gap-3">
              <div className="text-[8px] font-black opacity-60 uppercase tracking-widest text-amber-400 border-b border-amber-500/10 pb-1 flex justify-between">
                <span>Planet_Schumann_Res</span>
                <span>Hz</span>
              </div>
              <div className="space-y-1.5">
                 {Object.entries(resonances).map(([name, freq]) => (
                    <div key={name} className="flex justify-between items-center text-[7px] font-bold">
                       <span className="opacity-40 uppercase">{name}</span>
                       <div className="flex-1 border-b border-white/5 mx-2" />
                       {/* Fix: Cast freq as number to resolve property access on unknown type */}
                       <span className={name === 'EARTH' ? 'text-cyan-400' : 'text-white'}>{(freq as number).toFixed(2)}</span>
                    </div>
                 ))}
              </div>
           </div>

           <div className="p-3 bg-indigo-950/20 border border-indigo-500/20 rounded-xl">
              <div className="text-[8px] font-black opacity-60 uppercase tracking-widest text-indigo-400 border-b border-indigo-500/10 pb-1 mb-2">Entanglement_Coeffs</div>
              <div className="grid grid-cols-2 gap-2">
                 <div className="p-2 bg-black/40 rounded border border-white/5 text-center">
                   <div className="text-[6px] opacity-40 uppercase">Coherence</div>
                   <div className="text-[10px] font-black text-emerald-400">{((stats?.quantumCoherence || 0) * 100).toFixed(1)}%</div>
                 </div>
                 <div className="p-2 bg-black/40 rounded border border-white/5 text-center">
                   <div className="text-[6px] opacity-40 uppercase">Qubits</div>
                   <div className="text-[10px] font-black text-amber-400">~30 EQ</div>
                 </div>
              </div>
           </div>

           <div className="mt-auto p-3 bg-white/5 border border-white/10 rounded italic text-[7px] leading-relaxed opacity-60 text-center">
             "O Sistema Solar é um computador quântico de 9 qubits... as ressonâncias orbitais são portas lógicas."
           </div>
        </div>
      </div>
    </div>
  );
};

export default CelestialHelix;
