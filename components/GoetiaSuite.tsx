
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { AerialSpirit, ElementalDirection, SpiritRank, AdmissibilityResult } from '../types';
import { globalArkheEngine } from '../utils/arkheEngine';

const GoetiaSuite: React.FC = () => {
  const [selectedSpirit, setSelectedSpirit] = useState<AerialSpirit | null>(null);
  const [taskParams, setTaskParams] = useState({ C: 0.3, I: 0.7, E: 0.2 });
  const [admissibility, setAdmissibility] = useState<AdmissibilityResult | null>(null);
  const spirits = useMemo(() => globalArkheEngine.getSpirits(), []);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleTest = () => {
    const res = globalArkheEngine.testAdmissibility(taskParams.C, taskParams.I, taskParams.E);
    setAdmissibility(res);
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, 400, 400);
      const cx = 200; const cy = 200;
      
      // Draw H6 Projection Grid
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.05)';
      for(let i=0; i<6; i++) {
        const angle = (i * Math.PI) / 3;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(angle) * 150, cy + Math.sin(angle) * 150); ctx.stroke();
      }

      // Draw Spirits
      spirits.forEach(s => {
        const x = cx + s.arkheCoordinates[0] * 140;
        const y = cy + s.arkheCoordinates[1] * 140;
        const isSelected = selectedSpirit?.number === s.number;
        
        ctx.fillStyle = isSelected ? '#fff' : 'rgba(0, 255, 255, 0.4)';
        ctx.beginPath(); ctx.arc(x, y, isSelected ? 4 : 2, 0, Math.PI * 2); ctx.fill();
        if(isSelected) {
            ctx.shadowBlur = 10; ctx.shadowColor = '#fff';
            ctx.strokeStyle = '#fff';
            ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2); ctx.stroke();
            ctx.shadowBlur = 0;
        }
      });

      requestAnimationFrame(render);
    };
    render();
  }, [spirits, selectedSpirit]);

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 font-mono bg-black/60 border border-amber-500/20 rounded-xl backdrop-blur-xl overflow-hidden">
      <div className="flex justify-between items-center border-b border-amber-500/30 pb-2">
        <div className="flex flex-col">
          <h2 className="text-[10px] font-black text-amber-400 tracking-widest uppercase">
            ∆ GOETIA_ARKHE_SYNTHESIS // 31_AERIAL_SPIRITS
          </h2>
          <span className="text-[6px] opacity-40 uppercase">Geometric Manifold Navigation v4.0</span>
        </div>
        <div className="text-[7px] px-2 py-0.5 bg-amber-500/10 text-amber-500 border border-amber-500/40 rounded font-black">
          H6_ENCODING: ACTIVE
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-5 overflow-hidden">
        {/* Hypersphere Explorer */}
        <div className="col-span-5 flex flex-col gap-3">
          <div className="relative flex-1 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden">
             <canvas ref={canvasRef} width={400} height={400} className="w-full h-full max-w-[280px]" />
             <div className="absolute top-2 left-2 text-[7px] opacity-40 uppercase font-black tracking-widest">H6 Projection Explorer</div>
          </div>

          <div className="p-3 bg-black/40 rounded border border-amber-500/20">
             <h3 className="text-[8px] font-black text-amber-400 uppercase mb-2">Geometric_Admissibility_Test</h3>
             <div className="space-y-2">
               {['C', 'I', 'E'].map(k => (
                 <div key={k} className="flex items-center gap-2">
                   <span className="text-[8px] w-4">{k}:</span>
                   <input 
                    type="range" min="0" max="1" step="0.01" 
                    value={taskParams[k as keyof typeof taskParams]} 
                    onChange={(e) => setTaskParams({...taskParams, [k]: parseFloat(e.target.value)})}
                    className="flex-1 accent-amber-500" 
                   />
                 </div>
               ))}
               <button onClick={handleTest} className="w-full py-1.5 bg-amber-600 text-white text-[9px] font-black rounded uppercase hover:bg-amber-500 transition-all mt-2">
                 Verify_Admissibility
               </button>
             </div>
          </div>
        </div>

        {/* Clinical Proof & Spirit Detail */}
        <div className="col-span-7 flex flex-col gap-4 overflow-y-auto scrollbar-thin pr-2">
          {admissibility && (
            <div className="p-3 bg-white/5 border border-indigo-500/30 rounded-lg">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-[8px] font-black text-indigo-400 uppercase">Admissibility_Proof_Matrix</span>
                 <span className={`text-[9px] font-black ${admissibility.learnable ? 'text-emerald-400' : 'text-rose-500'}`}>
                   {admissibility.learnable ? 'ADMISSIBLE ✓' : 'INADMISSIBLE ✗'}
                 </span>
               </div>
               <div className="text-[7px] space-y-1 opacity-80">
                 {admissibility.proofSteps.map((s, i) => <p key={i}>{s}</p>)}
               </div>
               <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-2">
                  <div>
                    <span className="text-[6px] opacity-40 uppercase block">Compatibility</span>
                    <span className="text-[12px] font-black">{(admissibility.compatibility * 100).toFixed(1)}%</span>
                  </div>
                  <div>
                    <span className="text-[6px] opacity-40 uppercase block">Learning_Speed</span>
                    <span className="text-[12px] font-black text-amber-400">{admissibility.predictedSpeed.toFixed(3)} α</span>
                  </div>
               </div>
            </div>
          )}

          <div className="flex-1 bg-black/40 border border-white/10 rounded-xl p-3">
             <div className="text-[8px] font-black opacity-40 uppercase mb-3 border-b border-white/5 pb-1">Spiritual_Node_Archive</div>
             <div className="grid grid-cols-5 gap-1 mb-4">
                {spirits.map(s => (
                  <button 
                    key={s.number} 
                    onClick={() => setSelectedSpirit(s)}
                    className={`h-6 text-[8px] font-black border transition-all ${selectedSpirit?.number === s.number ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-white/5 border-white/10 hover:border-amber-500/50'}`}
                  >
                    {s.number}
                  </button>
                ))}
             </div>

             {selectedSpirit ? (
               <div className="animate-fadeIn space-y-3">
                 <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-[14px] font-black text-white tracking-tighter">{selectedSpirit.name}</h4>
                      <span className="text-[7px] text-amber-400 font-bold uppercase">{selectedSpirit.rank} // {selectedSpirit.direction}</span>
                    </div>
                    <div className="text-right">
                       <span className="text-[6px] opacity-40 block uppercase">Ruling</span>
                       <span className="text-[8px] font-bold">{selectedSpirit.rulingSpirit}</span>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-3 text-[8px]">
                    <div className="p-2 bg-white/5 rounded border border-white/10">
                       <span className="opacity-40 uppercase block mb-1">Office</span>
                       <p className="leading-tight">{selectedSpirit.office}</p>
                    </div>
                    <div className="p-2 bg-white/5 rounded border border-white/10 text-center flex flex-col justify-center">
                       <span className="opacity-40 uppercase block mb-1">Resonance</span>
                       <span className="text-[10px] font-black">{selectedSpirit.resonanceFreq.toFixed(2)} Hz</span>
                    </div>
                 </div>
                 
                 {/* Seal Projection */}
                 <div className="relative h-24 bg-white/5 border border-white/10 rounded flex items-center justify-center">
                    <svg viewBox="-1 -1 2 2" className="h-full w-full max-w-[80px]">
                       <polygon 
                        points={selectedSpirit.sealPoints.map(p => `${p.x},${p.y}`).join(' ')} 
                        fill="none" stroke="#f59e0b" strokeWidth="0.04" className="animate-pulse" 
                       />
                       {selectedSpirit.sealPoints.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="0.05" fill="#fff" />)}
                    </svg>
                    <div className="absolute top-2 left-2 text-[6px] opacity-40 font-black">SEAL_PROJECTION_H6</div>
                 </div>
               </div>
             ) : (
               <div className="h-40 flex items-center justify-center italic opacity-20 text-[10px]">Select a node for geometric decryption</div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoetiaSuite;
