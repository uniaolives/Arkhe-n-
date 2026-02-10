
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { NeuroProfile, MetasurfaceState, BrainwaveBand, HolographicMode } from '../types';
import { globalArkheEngine } from '../utils/arkheEngine';

const NeuroMetasurfaceSuite: React.FC = () => {
  const [attention, setAttention] = useState(50);
  const [targetAttention, setTargetAttention] = useState(50);
  const [collectiveEnabled, setCollectiveEnabled] = useState(false);
  const [hologramMode, setHologramMode] = useState<HolographicMode>(HolographicMode.STATIC);
  
  const [neuroProfile, setNeuroProfile] = useState<NeuroProfile>(globalArkheEngine.calculateNeuroProfile(50));
  const [metaState, setMetaState] = useState<MetasurfaceState>(globalArkheEngine.computeMetasurface(neuroProfile, hologramMode, collectiveEnabled));
  
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);
  const patternCanvasRef = useRef<HTMLCanvasElement>(null);
  const holoCanvasRef = useRef<HTMLCanvasElement>(null);

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
    const profile = globalArkheEngine.calculateNeuroProfile(attention, collectiveEnabled);
    setNeuroProfile(profile);
    setMetaState(globalArkheEngine.computeMetasurface(profile, hologramMode, collectiveEnabled));
  }, [attention, collectiveEnabled, hologramMode]);

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

    ctx.setLineDash([2, 2]);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.beginPath(); ctx.moveTo(w/2, 0); ctx.lineTo(w/2, h); ctx.stroke();
    ctx.setLineDash([]);
  }, [metaState]);

  // Holographic 3D Simulation View
  useEffect(() => {
    const canvas = holoCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      
      const beamAz = (metaState.beamAngle.azimuth * Math.PI) / 180;
      const beamEl = (metaState.beamAngle.elevation * Math.PI) / 180;

      ctx.save();
      ctx.translate(cx, cy);
      
      // Draw simulated volumetric beam
      const beamLen = 150;
      const endX = Math.sin(beamAz) * beamLen;
      const endY = -Math.cos(beamAz) * beamLen * Math.cos(beamEl);
      
      const gradient = ctx.createLinearGradient(0, 0, endX, endY);
      gradient.addColorStop(0, 'rgba(0, 255, 255, 0.8)');
      gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 10 * metaState.focus;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Holographic Noise (Volumetric particles)
      if (hologramMode === HolographicMode.VOLUMETRIC) {
        for (let i = 0; i < 20; i++) {
          const t = (frame * 0.02 + i * 0.5) % 1;
          const px = endX * t + (Math.random() - 0.5) * 20;
          const py = endY * t + (Math.random() - 0.5) * 20;
          ctx.fillStyle = `rgba(255, 255, 255, ${1-t})`;
          ctx.beginPath(); ctx.arc(px, py, 1, 0, Math.PI * 2); ctx.fill();
        }
      }

      ctx.restore();
      if (hologramMode !== HolographicMode.STATIC) {
        requestAnimationFrame(render);
      }
    };
    render();
  }, [metaState, hologramMode]);

  const laws = [
    "I. A neuro-metasurface may not injure a human being.",
    "II. A neuro-metasurface must obey orders from humans.",
    "III. A neuro-metasurface must protect its own existence.",
    "IV. A neuro-metasurface must preserve cognitive liberty."
  ];

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 font-mono bg-black/60 border border-cyan-500/20 rounded-xl backdrop-blur-xl overflow-hidden">
      <div className="flex justify-between items-center border-b border-cyan-500/30 pb-2">
        <div className="flex flex-col">
          <h2 className="text-[10px] font-black text-cyan-400 tracking-widest uppercase">
            ∆ NEURO_GEOMETRIC_INTERFACE // V.8.3_QUANTUM_CORE
          </h2>
          <span className="text-[6px] opacity-40 uppercase">Holographic Consciousness Amplification & Governance</span>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={() => setCollectiveEnabled(!collectiveEnabled)}
             className={`text-[7px] px-2 py-0.5 rounded border transition-all font-black uppercase ${collectiveEnabled ? 'bg-amber-500 text-black border-amber-400 animate-pulse' : 'bg-white/5 text-white/40 border-white/10'}`}
           >
             {collectiveEnabled ? 'Collective: Sync' : 'Collective: Off'}
           </button>
           <div className={`text-[7px] px-2 py-0.5 rounded border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 font-black`}>
             BT_EEG: LINKED
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-5 overflow-hidden">
        {/* Brainwave & Quantum Analytics */}
        <div className="col-span-3 flex flex-col gap-3">
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex-1 flex flex-col gap-4">
             <div className="text-[8px] font-black opacity-40 uppercase tracking-widest border-b border-white/5 pb-1 flex justify-between">
                <span>Quantum_EEG</span>
                <span className="text-cyan-400">8-QUBIT</span>
             </div>
             
             <div className="flex-1 flex flex-col gap-3">
                <div className="grid grid-cols-4 gap-1 h-12 items-end">
                   {neuroProfile.quantum?.qubitState.map((q, i) => (
                     <div key={i} className="flex-1 bg-cyan-500/20 rounded-t border-t border-cyan-400/40" style={{ height: `${q * 100}%` }} />
                   ))}
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between text-[6px] uppercase opacity-40"><span>Entanglement</span> <span className="text-white">{(neuroProfile.quantum?.entanglement || 0).toFixed(3)}</span></div>
                   <div className="flex justify-between text-[6px] uppercase opacity-40"><span>Q-Coherence</span> <span className="text-white">{(neuroProfile.quantum?.coherence || 0).toFixed(3)}</span></div>
                </div>
             </div>

             <div className="space-y-4">
                <div className="space-y-1">
                   <div className="flex justify-between text-[7px] uppercase font-black">
                      <span>Attention</span>
                      <span className="text-cyan-400">{attention.toFixed(1)}%</span>
                   </div>
                   <input 
                     type="range" min="0" max="100" step="0.1" 
                     value={targetAttention} 
                     onChange={(e) => setTargetAttention(parseFloat(e.target.value))}
                     className="w-full accent-cyan-400 bg-white/5" 
                   />
                </div>
             </div>
          </div>
          
          <div className="p-3 bg-rose-950/20 border border-rose-500/20 rounded-xl h-32">
             <div className="text-[8px] font-black opacity-60 uppercase text-rose-400 mb-2">Ethical_Governance_v4</div>
             <div className="space-y-1.5 overflow-y-auto h-full pr-1 scrollbar-thin">
                {laws.map((law, i) => (
                  <p key={i} className="text-[6px] leading-tight opacity-70 border-l border-rose-500/30 pl-2">{law}</p>
                ))}
             </div>
          </div>
        </div>

        {/* Metasurface & Hologram */}
        <div className="col-span-6 flex flex-col gap-4 overflow-hidden">
           <div className="grid grid-cols-2 gap-4 flex-1">
              <div className="bg-black/40 border border-white/5 rounded-xl p-3 flex flex-col gap-2">
                 <div className="text-[7px] font-black opacity-40 uppercase tracking-widest">Phase_Distribution</div>
                 <div className="flex-1 relative flex items-center justify-center">
                    <canvas ref={gridCanvasRef} width={256} height={256} className="w-full h-full max-w-[200px]" />
                 </div>
              </div>

              <div className="bg-black/40 border border-white/5 rounded-xl p-3 flex flex-col gap-2">
                 <div className="text-[7px] font-black opacity-40 uppercase tracking-widest flex justify-between">
                    <span>Holographic_Projection</span>
                    <select 
                      value={hologramMode} 
                      onChange={(e) => setHologramMode(e.target.value as HolographicMode)}
                      className="bg-black text-[6px] border border-white/10 rounded px-1 outline-none"
                    >
                      {Object.values(HolographicMode).map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                 </div>
                 <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-white/5 rounded">
                    <canvas ref={holoCanvasRef} width={256} height={256} className="w-full h-full" />
                    <div className="absolute inset-0 pointer-events-none border border-white/10 opacity-20" />
                 </div>
              </div>
           </div>

           <div className="h-24 p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-xl flex gap-4 items-center">
              <div className="flex-1 grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <div className="flex justify-between text-[7px] font-black opacity-40 uppercase"><span>Far-Field Pattern</span></div>
                    <canvas ref={patternCanvasRef} width={256} height={60} className="w-full h-10 opacity-60" />
                 </div>
                 <div className="flex flex-col justify-center">
                    <div className="flex justify-between text-[6px] font-black opacity-40 uppercase mb-1">Beam Vector</div>
                    <div className="text-xl font-black text-white">{metaState.beamAngle.azimuth.toFixed(1)}° <span className="text-[8px] opacity-40 text-cyan-400">Az</span></div>
                    <div className="text-[10px] font-black text-cyan-400/60">{metaState.beamAngle.elevation.toFixed(1)}° <span className="text-[8px] opacity-40">El</span></div>
                 </div>
              </div>
           </div>
        </div>

        {/* Collective Sync & Telemetry */}
        <div className="col-span-3 flex flex-col gap-3 overflow-y-auto scrollbar-thin pr-1">
           {collectiveEnabled ? (
             <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl flex flex-col gap-3">
                <div className="text-[8px] font-black opacity-60 uppercase text-amber-400 tracking-widest">Collective_Sync_Data</div>
                <div className="space-y-4">
                   <div className="space-y-1">
                      <div className="flex justify-between text-[7px] font-black"><span>Shared_Coherence</span> <span className="text-amber-400">{(metaState.collective?.userSync || 0 * 100).toFixed(1)}%</span></div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-amber-500" style={{ width: `${(metaState.collective?.userSync || 0) * 100}%` }} /></div>
                   </div>
                   <div className="p-2 bg-black/40 rounded border border-white/5">
                      <span className="text-[6px] opacity-40 block uppercase">Emergent_Pattern</span>
                      <span className="text-[9px] font-black text-white">{metaState.collective?.emergentPattern}</span>
                   </div>
                   <div className="grid grid-cols-2 gap-2">
                      <div className="text-center">
                         <span className="text-[6px] opacity-40 block uppercase">Global_S</span>
                         <span className="text-[10px] font-black">{metaState.collective?.globalEntropy.toFixed(3)}</span>
                      </div>
                      <div className="text-center">
                         <span className="text-[6px] opacity-40 block uppercase">Nodes</span>
                         <span className="text-[10px] font-black text-amber-400">{metaState.collective?.activeNodes} USER</span>
                      </div>
                   </div>
                </div>
             </div>
           ) : (
             <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center opacity-30 h-40">
                <p className="text-[8px] font-black uppercase text-center">Enable Collective Mode for Shared Real-Time Control</p>
             </div>
           )}

           <div className="flex-1 p-3 bg-black/40 border border-white/10 rounded-xl flex flex-col gap-2">
              <div className="text-[8px] font-black opacity-40 uppercase tracking-widest border-b border-white/5 pb-1">System_Log_I</div>
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                 <div className="text-[6px] border-l-2 border-cyan-500 pl-2 opacity-80">"Phase alignment success at 10.42GHz."</div>
                 <div className="text-[6px] border-l-2 border-rose-500 pl-2 opacity-80">"Ethical Override: Power density limited to 10mW/cm²."</div>
                 <div className="text-[6px] border-l-2 border-emerald-500 pl-2 opacity-80">"Collective intention focused on 3D volumetric lock."</div>
                 <div className="text-[6px] border-l-2 border-indigo-500 pl-2 opacity-80">"Quantum EEG entropy decaying. Re-sync in 4ms."</div>
              </div>
           </div>
        </div>
      </div>

      <div className="p-2 bg-cyan-950/30 border border-cyan-500/20 rounded-lg flex items-center gap-4">
         <div className="w-10 h-10 rounded-full border border-cyan-500/40 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-cyan-500/10 animate-pulse" />
            <span className="text-lg">⚙</span>
         </div>
         <div className="flex-1">
            <div className="text-[7px] font-black opacity-60 uppercase text-cyan-400 tracking-tighter">Consciousness_Modulation_Status</div>
            <p className="text-[8px] leading-tight text-white/90 italic">
               {hologramMode === HolographicMode.VOLUMETRIC 
                 ? "Holographic beamforming constructing 3D field structures in local space..."
                 : "Linear beam steering active. Tracking primary attention vector."}
            </p>
         </div>
      </div>
    </div>
  );
};

export default NeuroMetasurfaceSuite;
