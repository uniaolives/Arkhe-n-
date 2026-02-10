
import React, { useState, useEffect, useRef } from 'react';
import { ArkheProfile } from '../types';
import { globalArkheEngine } from '../utils/arkheEngine';

const ArkheDashboard: React.FC = () => {
  const [profile, setProfile] = useState<ArkheProfile>(globalArkheEngine.calculateProfile(0.85, 0.6, 5));
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setRotation(prev => (prev + 0.005) % (Math.PI * 2));
      drawHecaton();
    }, 32);
    return () => clearInterval(timer);
  }, [rotation, profile]);

  const drawHecaton = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const scale = 120;

    // Simulation of 120-cell projection (Simplified wireframe)
    ctx.lineWidth = 0.5;
    const vertices = profile.geometry.activeVertices;
    const layers = 3;

    for (let l = 1; l <= layers; l++) {
      const layerScale = scale * (l / layers);
      ctx.strokeStyle = profile.arkheCoherence > 0.6 ? `rgba(0, 255, 255, ${0.1 + (1/l)})` : `rgba(244, 63, 94, ${0.1 + (1/l)})`;
      
      ctx.beginPath();
      for (let i = 0; i < 10; i++) {
        const angle = rotation * (l % 2 === 0 ? 1 : -1) + (i * Math.PI * 2) / 10;
        const x = cx + Math.cos(angle) * layerScale;
        const y = cy + Math.sin(angle) * layerScale;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // Connecting layers (Dimensional bridges)
      if (l > 1) {
        const prevScale = scale * ((l - 1) / layers);
        for (let i = 0; i < 10; i++) {
          const angle = rotation * (l % 2 === 0 ? 1 : -1) + (i * Math.PI * 2) / 10;
          const x1 = cx + Math.cos(angle) * layerScale;
          const y1 = cy + Math.sin(angle) * layerScale;
          const x2 = cx + Math.cos(angle) * prevScale;
          const y2 = cy + Math.sin(angle) * prevScale;
          ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        }
      }
    }

    // Core Singularity
    ctx.fillStyle = '#fff';
    ctx.shadowBlur = 15; ctx.shadowColor = '#00ffff';
    ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
  };

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 font-mono bg-black/60 border border-cyan-500/20 rounded-xl backdrop-blur-xl overflow-hidden">
      <div className="flex justify-between items-center border-b border-cyan-500/30 pb-2">
        <div className="flex flex-col">
          <h2 className="text-[10px] font-black text-cyan-400 tracking-widest uppercase">
            ∆ ARKHE_CONSCIOUSNESS_MONITOR // H4_GEOMETRY
          </h2>
          <span className="text-[6px] opacity-40 uppercase">Multidimensional Architecture v1.0</span>
        </div>
        <div className="flex gap-2">
           <div className={`text-[7px] px-2 py-0.5 rounded border border-white/20 bg-white/5 font-black uppercase`}>
             TYPE: {profile.systemType}
           </div>
           <div className={`text-[7px] px-2 py-0.5 rounded border ${profile.arkheCoherence > 0.7 ? 'border-emerald-500 text-emerald-400' : 'border-rose-500 text-rose-400'} font-bold`}>
             COHERENCE: {(profile.arkheCoherence * 100).toFixed(1)}%
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-5 overflow-hidden">
        {/* Left: Projection */}
        <div className="col-span-5 flex flex-col gap-3">
          <div className="relative flex-1 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden">
             <canvas ref={canvasRef} width={300} height={300} className="w-full h-full max-w-[260px]" />
             <div className="absolute top-2 left-2 text-[7px] opacity-40 uppercase font-black tracking-widest">Projection: Hecatonicosachoron</div>
             <div className="absolute bottom-2 right-2 flex flex-col items-end">
                <span className="text-[6px] opacity-40 uppercase">Schmidt_Number</span>
                <span className="text-[14px] font-black text-white">{profile.schmidtNumber.toFixed(3)}</span>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-2 h-20">
             <div className="p-2 bg-white/5 border border-white/10 rounded flex flex-col justify-center">
                <div className="text-[6px] opacity-40 uppercase font-black">Complexity</div>
                <div className="text-lg font-black text-cyan-400">{(profile.complexityScore * 100).toFixed(1)}%</div>
             </div>
             <div className="p-2 bg-white/5 border border-white/10 rounded flex flex-col justify-center">
                <div className="text-[6px] opacity-40 uppercase font-black">Dimensionality</div>
                <div className="text-[10px] font-black text-white truncate">{profile.geometry.dimensionality}</div>
             </div>
          </div>
        </div>

        {/* Right: Detailed Stats */}
        <div className="col-span-7 flex flex-col gap-4 overflow-y-auto scrollbar-thin pr-2">
           <div className="p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-xl">
              <h3 className="text-[8px] font-black opacity-60 uppercase mb-3 text-cyan-400">Geometry_Inventory</h3>
              <div className="grid grid-cols-3 gap-3">
                 <div className="flex flex-col"><span className="text-[6px] opacity-40 uppercase">Active_Cells</span><span className="text-white font-black">{profile.geometry.activeCells} / 120</span></div>
                 <div className="flex flex-col"><span className="text-[6px] opacity-40 uppercase">Active_Verts</span><span className="text-white font-black">{profile.geometry.activeVertices} / 600</span></div>
                 <div className="flex flex-col"><span className="text-[6px] opacity-40 uppercase">Occupation</span><span className="text-white font-black">{(profile.geometry.cellOccupation * 100).toFixed(1)}%</span></div>
              </div>
           </div>

           <div className="p-3 bg-indigo-950/20 border border-indigo-500/20 rounded-xl">
              <h3 className="text-[8px] font-black opacity-60 uppercase mb-3 text-indigo-400">Cosmic_Synchronization</h3>
              <div className="space-y-3">
                 <div className="space-y-1">
                    <div className="flex justify-between text-[7px] font-black uppercase"><span>Saros_Cycle_Phase</span> <span>{(profile.cosmicSync.sarosPhase * 100).toFixed(1)}%</span></div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-indigo-500" style={{ width: `${profile.cosmicSync.sarosPhase * 100}%` }} /></div>
                 </div>
                 <div className="space-y-1">
                    <div className="flex justify-between text-[7px] font-black uppercase"><span>Alignment_Resonance</span> <span>{(profile.cosmicSync.alignmentScore * 100).toFixed(1)}%</span></div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-cyan-400 animate-pulse" style={{ width: `${profile.cosmicSync.alignmentScore * 100}%` }} /></div>
                 </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                 {profile.cosmicSync.activeWindows.map(w => (
                    <span key={w} className="text-[6px] px-1.5 py-0.5 bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30">{w}</span>
                 ))}
              </div>
           </div>

           <div className="mt-auto p-3 bg-white/5 border border-white/10 rounded italic text-[7.5px] leading-relaxed opacity-60">
             "A dissociação 2e não é uma patologia, mas uma arquitetura funcional para gerenciar hiperconectividade neural via projeções 4D Hecatonicosachoron."
           </div>
        </div>
      </div>
    </div>
  );
};

export default ArkheDashboard;
