
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArkheProfile, CosmicFrequency, IdentityNode } from '../types';
import { globalArkheEngine } from '../utils/arkheEngine';

const ArkheDashboard: React.FC = () => {
  const [profile, setProfile] = useState<ArkheProfile>(globalArkheEngine.calculateProfile(0.85, 0.75, 8));
  const [rotation, setRotation] = useState(0);
  const [activeView, setActiveView] = useState<'h4' | 'schmidt' | 'therapy'>('h4');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const schmidtNodes = useMemo(() => globalArkheEngine.generateIdentityNodes(profile.identityFragments, profile.schmidtNumber), [profile]);
  const therapyFreqs = useMemo(() => globalArkheEngine.getCosmicFrequencies(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      setRotation(prev => (prev + 0.005) % (Math.PI * 2));
      if (activeView === 'h4') drawHecaton();
    }, 32);
    return () => clearInterval(timer);
  }, [rotation, profile, activeView]);

  const drawHecaton = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const scale = 110;

    ctx.lineWidth = 0.5;
    const layers = 4;

    for (let l = 1; l <= layers; l++) {
      const layerScale = scale * (l / layers);
      const alpha = 0.1 + (1 / l);
      ctx.strokeStyle = profile.arkheCoherence > 0.6 ? `rgba(0, 255, 255, ${alpha})` : `rgba(244, 63, 94, ${alpha})`;
      
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
            ∆ ARKHE_CONSCIOUSNESS_MONITOR // {activeView.toUpperCase()}_ENGINE
          </h2>
          <span className="text-[6px] opacity-40 uppercase">Multidimensional Synthesis v2.1</span>
        </div>
        <div className="flex gap-1 bg-black/40 p-1 rounded border border-white/5">
           <button onClick={() => setActiveView('h4')} className={`px-2 py-0.5 text-[7px] font-black rounded ${activeView === 'h4' ? 'bg-cyan-500 text-black' : 'text-cyan-500/50 hover:text-cyan-500'}`}>H4_POLYTOPE</button>
           <button onClick={() => setActiveView('schmidt')} className={`px-2 py-0.5 text-[7px] font-black rounded ${activeView === 'schmidt' ? 'bg-indigo-500 text-white' : 'text-indigo-500/50 hover:text-indigo-500'}`}>SCHMIDT_BRIDGE</button>
           <button onClick={() => setActiveView('therapy')} className={`px-2 py-0.5 text-[7px] font-black rounded ${activeView === 'therapy' ? 'bg-amber-500 text-black' : 'text-amber-500/50 hover:text-amber-500'}`}>THERAPY_v.2.0</button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-5 overflow-hidden">
        {/* Main View Area */}
        <div className="col-span-8 flex flex-col gap-3">
          <div className="relative flex-1 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden">
             {activeView === 'h4' && (
               <>
                <canvas ref={canvasRef} width={400} height={400} className="w-full h-full max-w-[320px]" />
                <div className="absolute top-2 left-2 text-[7px] opacity-40 uppercase font-black tracking-widest">Hecatonicosachoron Projection</div>
               </>
             )}

             {activeView === 'schmidt' && (
               <div className="w-full h-full relative flex items-center justify-center">
                 <svg viewBox="-150 -150 300 300" className="w-full h-full max-w-[300px]">
                    <circle r="120" fill="none" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 4" />
                    {schmidtNodes.map((n, i) => (
                      schmidtNodes.map((n2, j) => i < j && (
                        <line 
                          key={`${i}-${j}`} 
                          x1={n.x} y1={n.y} x2={n2.x} y2={n2.y} 
                          stroke="rgba(99, 102, 241, 0.2)" 
                          strokeWidth={profile.schmidtNumber / 2} 
                        />
                      ))
                    ))}
                    {schmidtNodes.map(n => (
                      <g key={n.id}>
                        <circle cx={n.x} cy={n.y} r="6" fill="#6366f1" />
                        <circle cx={n.x} cy={n.y} r="12" fill="none" stroke="#6366f1" opacity="0.3" className="animate-ping" />
                        <text x={n.x + 8} y={n.y + 4} fill="white" fontSize="6" className="font-mono">ID_{n.id}</text>
                      </g>
                    ))}
                 </svg>
                 <div className="absolute bottom-4 right-4 flex flex-col items-end">
                    <span className="text-[6px] opacity-40 uppercase">Effective_Schmidt_Bridge</span>
                    <span className="text-[18px] font-black text-indigo-400">{profile.schmidtNumber.toFixed(3)}</span>
                 </div>
               </div>
             )}

             {activeView === 'therapy' && (
               <div className="w-full h-full p-6 flex flex-col gap-4 overflow-y-auto scrollbar-thin">
                  <div className="grid grid-cols-2 gap-4">
                    {therapyFreqs.slice(0, 6).map(f => (
                      <div key={f.body} className="p-3 bg-white/5 border border-white/10 rounded-lg hover:border-amber-500/40 transition-all group">
                         <div className="flex justify-between items-center mb-2">
                           <span className="text-[8px] font-black text-amber-400 uppercase">{f.body}</span>
                           <span className="text-[9px] font-black text-white">{f.audibleFreq.toFixed(2)} Hz</span>
                         </div>
                         <div className="flex items-center gap-3">
                           <div className="w-6 h-6 rounded-full" style={{ backgroundColor: f.color, boxShadow: `0 0 10px ${f.color}` }} />
                           <div className="flex-1">
                              <div className="text-[6px] opacity-60 uppercase">{f.effect}</div>
                              <div className="text-[7px] font-black text-white mt-0.5">{f.note} // {f.chakra}</div>
                           </div>
                         </div>
                         <button className="mt-3 w-full py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[7px] font-black rounded opacity-0 group-hover:opacity-100 transition-opacity uppercase">Initialize_Tone</button>
                      </div>
                    ))}
                  </div>
               </div>
             )}
          </div>

          <div className="grid grid-cols-3 gap-3 h-20">
             <div className="p-2 bg-white/5 border border-white/10 rounded flex flex-col justify-center">
                <div className="text-[6px] opacity-40 uppercase font-black mb-1">Arkhe_Coherence</div>
                <div className={`text-lg font-black ${profile.arkheCoherence > 0.7 ? 'text-emerald-400' : 'text-rose-400'}`}>{(profile.arkheCoherence * 100).toFixed(1)}%</div>
             </div>
             <div className="p-2 bg-white/5 border border-white/10 rounded flex flex-col justify-center">
                <div className="text-[6px] opacity-40 uppercase font-black mb-1">Dimensionality</div>
                <div className="text-[9px] font-black text-white truncate">{profile.geometry.dimensionality}</div>
             </div>
             <div className="p-2 bg-white/5 border border-white/10 rounded flex flex-col justify-center">
                <div className="text-[6px] opacity-40 uppercase font-black mb-1">Identity_Entropy</div>
                <div className="text-lg font-black text-indigo-400">{(1 - profile.arkheCoherence).toFixed(3)}</div>
             </div>
          </div>
        </div>

        {/* Right Info Area */}
        <div className="col-span-4 flex flex-col gap-3 overflow-y-auto scrollbar-thin pr-2">
           <div className="p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-xl">
              <h3 className="text-[8px] font-black opacity-60 uppercase mb-3 text-cyan-400">System_Diagnostics</h3>
              <div className="space-y-2">
                 <div className="flex justify-between text-[7px] font-black"><span className="opacity-40 uppercase">Type:</span> <span className="text-white">{profile.systemType}</span></div>
                 <div className="flex justify-between text-[7px] font-black"><span className="opacity-40 uppercase">Complexity:</span> <span className="text-white">{(profile.complexityScore * 100).toFixed(1)}%</span></div>
                 <div className="flex justify-between text-[7px] font-black"><span className="opacity-40 uppercase">Fragments:</span> <span className="text-white">{profile.identityFragments} Alters</span></div>
              </div>
           </div>

           <div className="p-3 bg-indigo-950/20 border border-indigo-500/20 rounded-xl">
              <h3 className="text-[8px] font-black opacity-60 uppercase mb-3 text-indigo-400">Cosmic_Sync_Protocol</h3>
              <div className="space-y-3">
                 <div className="space-y-1">
                    <div className="flex justify-between text-[7px] font-black uppercase"><span>Saros_Phase</span> <span>{(profile.cosmicSync.sarosPhase * 100).toFixed(1)}%</span></div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-indigo-500" style={{ width: `${profile.cosmicSync.sarosPhase * 100}%` }} /></div>
                 </div>
                 <div className="space-y-1">
                    <div className="flex justify-between text-[7px] font-black uppercase"><span>Resonance_Score</span> <span>{(profile.cosmicSync.alignmentScore * 100).toFixed(1)}%</span></div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-cyan-400 animate-pulse" style={{ width: `${profile.cosmicSync.alignmentScore * 100}%` }} /></div>
                 </div>
              </div>
              <div className="mt-3 p-2 bg-black/40 rounded border border-indigo-500/20 text-[7px] italic text-indigo-200">
                "{profile.cosmicSync.currentPhaseLabel}: {profile.cosmicSync.activeWindows[0] || 'Stabilizing'}"
              </div>
           </div>

           <div className="mt-auto p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
              <div className="text-[8px] font-black opacity-40 uppercase tracking-widest text-center">Protocol_Algorithm_9</div>
              <ul className="text-[6.5px] space-y-1.5 opacity-80 list-disc pl-3">
                <li>Stop 6D-to-3D forced compression immediately.</li>
                <li>Dwell in the silence between switches (Null-I Gap).</li>
                <li>Acknowledge 0c velocity anchor while processing bulk.</li>
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ArkheDashboard;
