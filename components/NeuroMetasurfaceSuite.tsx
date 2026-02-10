
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { NeuroProfile, MetasurfaceState, BrainwaveBand } from '../types';
import { globalArkheEngine } from '../utils/arkheEngine';

const NeuroMetasurfaceSuite: React.FC = () => {
  const [attention, setAttention] = useState(50);
  const [targetAttention, setTargetAttention] = useState(50);
  const [neuroProfile, setNeuroProfile] = useState<NeuroProfile>(globalArkheEngine.calculateNeuroProfile(50));
  const [metaState, setMetaState] = useState<MetasurfaceState>(globalArkheEngine.computeMetasurface(neuroProfile));
  
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);
  const patternCanvasRef = useRef<HTMLCanvasElement>(null);

  // Smooth attention tracking
  useEffect(() => {
    const timer = setInterval(() => {
      setAttention(prev => {
        const diff = targetAttention - prev;
        return prev + diff * 0.05 + (Math.random() - 0.5) * 0.5;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [targetAttention]);

  // Update engines
  useEffect(() => {
    const profile = globalArkheEngine.calculateNeuroProfile(attention);
    setNeuroProfile(profile);
    setMetaState(globalArkheEngine.computeMetasurface(profile));
  }, [attention]);

  // Draw Metasurface Grid
  useEffect(() => {
    const canvas = gridCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { phaseProfile, gridSize } = metaState;
    const cellSize = canvas.width / gridSize;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const phase = phaseProfile[i][j];
        const hue = (phase / (2 * Math.PI)) * 360;
        ctx.fillStyle = `hsla(${hue}, 80%, 50%, 0.8)`;
        ctx.fillRect(j * cellSize, i * cellSize, cellSize - 1, cellSize - 1);
        
        // Add metallic overlay
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.strokeRect(j * cellSize, i * cellSize, cellSize - 1, cellSize - 1);
      }
    }
  }, [metaState]);

  // Draw Radiation Pattern
  useEffect(() => {
    const canvas = patternCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { radiationPattern } = metaState;
    const w = canvas.width;
    const h = canvas.height;
    
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    radiationPattern.forEach((val, i) => {
      const x = (i / radiationPattern.length) * w;
      const y = h - (val * h * 0.8) - 10;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Center marker
    ctx.setLineDash([2, 2]);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.beginPath(); ctx.moveTo(w/2, 0); ctx.lineTo(w/2, h); ctx.stroke();
    ctx.setLineDash([]);
  }, [metaState]);

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 font-mono bg-black/60 border border-cyan-500/20 rounded-xl backdrop-blur-xl overflow-hidden">
      <div className="flex justify-between items-center border-b border-cyan-500/30 pb-2">
        <div className="flex flex-col">
          <h2 className="text-[10px] font-black text-cyan-400 tracking-widest uppercase">
            ∆ NEURO_GEOMETRIC_INTERFACE // PROGRAMMABLE_METASURFACE
          </h2>
          <span className="text-[6px] opacity-40 uppercase">Consciousness-to-Matter Electromagnetic Control</span>
        </div>
        <div className="flex gap-2">
           <div className={`text-[7px] px-2 py-0.5 rounded border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 font-black animate-pulse`}>
             BT_EEG: LINKED
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-5 overflow-hidden">
        {/* Brainwave Analytics */}
        <div className="col-span-4 flex flex-col gap-3">
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex-1 flex flex-col gap-4">
             <div className="text-[8px] font-black opacity-40 uppercase tracking-widest border-b border-white/5 pb-1">EEG_Spectrum_Analysis</div>
             
             <div className="flex-1 flex items-end justify-between gap-1 px-2">
                {Object.entries(neuroProfile.bandPowers).map(([band, power]) => (
                  <div key={band} className="flex-1 flex flex-col items-center gap-2">
                    {/* Fix: Cast power to number to resolve arithmetic operation error on unknown type in Object.entries */}
                    <div className="w-full bg-cyan-500/20 rounded-t border-t border-cyan-400/40 relative overflow-hidden" style={{ height: `${Math.min(100, (power as number) * 2)}%` }}>
                       <div className="absolute inset-0 bg-cyan-400 opacity-20 animate-pulse" />
                    </div>
                    <span className="text-[6px] font-black opacity-60 rotate-45 mt-2">{band}</span>
                  </div>
                ))}
             </div>

             <div className="space-y-4 mt-4">
                <div className="space-y-1">
                   <div className="flex justify-between text-[7px] uppercase font-black">
                      <span>Attention_Intensity</span>
                      <span className="text-cyan-400">{attention.toFixed(1)}%</span>
                   </div>
                   <input 
                     type="range" min="0" max="100" step="0.1" 
                     value={targetAttention} 
                     onChange={(e) => setTargetAttention(parseFloat(e.target.value))}
                     className="w-full accent-cyan-400 bg-white/5" 
                   />
                </div>
                <div className="grid grid-cols-2 gap-2">
                   <div className="p-2 bg-black/40 border border-white/10 rounded">
                      <span className="text-[6px] opacity-40 block uppercase">Stability</span>
                      <span className="text-[10px] font-black text-white">{neuroProfile.stability.toFixed(3)}</span>
                   </div>
                   <div className="p-2 bg-black/40 border border-white/10 rounded">
                      <span className="text-[6px] opacity-40 block uppercase">Trend</span>
                      <span className="text-[10px] font-black text-emerald-400 uppercase">{neuroProfile.trend}</span>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Metasurface Visualization */}
        <div className="col-span-8 flex flex-col gap-4 overflow-hidden">
           <div className="grid grid-cols-2 gap-4 flex-1">
              {/* Grid Explorer */}
              <div className="bg-black/40 border border-white/5 rounded-xl p-3 flex flex-col gap-2">
                 <div className="text-[7px] font-black opacity-40 uppercase tracking-widest">Phase_Distribution_Matrix</div>
                 <div className="flex-1 relative flex items-center justify-center">
                    <canvas ref={gridCanvasRef} width={256} height={256} className="w-full h-full max-w-[200px] border border-white/10 shadow-[0_0_20px_rgba(0,255,255,0.1)]" />
                 </div>
                 <div className="flex justify-between text-[6px] opacity-40 font-black">
                    <span>0 RADIANS</span>
                    <span>2π RADIANS</span>
                 </div>
              </div>

              {/* Radiation Pattern */}
              <div className="bg-black/40 border border-white/5 rounded-xl p-3 flex flex-col gap-2">
                 <div className="text-[7px] font-black opacity-40 uppercase tracking-widest">Far-Field_Radiation_Pattern</div>
                 <div className="flex-1 relative flex items-center justify-center">
                    <canvas ref={patternCanvasRef} width={256} height={128} className="w-full max-h-[120px]" />
                 </div>
                 <div className="grid grid-cols-2 gap-2 mt-auto">
                    <div className="p-2 bg-white/5 rounded border border-white/10">
                       <span className="text-[6px] opacity-40 block uppercase">Beam_Azimuth</span>
                       <span className="text-[12px] font-black text-white">{metaState.beamAngle.azimuth.toFixed(2)}°</span>
                    </div>
                    <div className="p-2 bg-white/5 rounded border border-white/10">
                       <span className="text-[6px] opacity-40 block uppercase">Focus_Index</span>
                       <span className="text-[12px] font-black text-cyan-400">{metaState.focus.toFixed(3)} f</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* System Messages */}
           <div className="h-20 p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-xl flex gap-4 items-center">
              <div className="w-12 h-12 border border-cyan-500/40 rounded flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-cyan-500/10 animate-pulse" />
                 <span className="text-xl font-black text-white relative z-10">📡</span>
              </div>
              <div className="flex-1">
                 <div className="text-[7px] font-black opacity-60 uppercase text-cyan-400">Control_Telemetry</div>
                 <p className="text-[8px] leading-tight text-white/80 italic mt-1">
                    {attention > 75 
                      ? '"Cognitive Beamforming Active: High-intensity focus detected. Narrowing EM aperture."'
                      : attention < 25
                        ? '"Standby Mode: Alpha/Theta dominance. Diffuse radiation pattern initialized."'
                        : '"Relativistic Stability: Beta-range synchronization. Tracking attention vector."'
                    }
                 </p>
              </div>
              <div className="text-right">
                 <div className="text-[6px] opacity-40 uppercase font-black">Coherence</div>
                 <div className="text-[14px] font-black text-white">{(neuroProfile.stability * 100).toFixed(1)}%</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NeuroMetasurfaceSuite;
