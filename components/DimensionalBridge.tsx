
import React, { useMemo } from 'react';
import { DimensionalLevel } from '../types';

interface DimensionalBridgeProps {
  activeLevel: DimensionalLevel;
  profileScore: number;
}

const DimensionalBridge: React.FC<DimensionalBridgeProps> = ({ activeLevel, profileScore }) => {
  const levels = Object.values(DimensionalLevel) as DimensionalLevel[];

  const levelLabels: Record<DimensionalLevel, string> = {
    [DimensionalLevel.ONE_D]: 'Linear Logic // Binary',
    [DimensionalLevel.TWO_D]: 'Planar Rels // Simple',
    [DimensionalLevel.THREE_D]: 'Practical // Spatial',
    [DimensionalLevel.FOUR_D]: 'Temporal // Worldlines',
    [DimensionalLevel.FIVE_D]: 'Quantum // Probabilistic',
    [DimensionalLevel.SIX_D_PLUS]: 'Hyperdimensional // Bulk',
    [DimensionalLevel.NINE_D_ISSACHAR]: '9D Issachar // Spherical Time',
  };

  const currentLevelIdx = levels.indexOf(activeLevel);

  return (
    <div className="w-full h-full p-4 flex flex-col gap-6 font-mono bg-black/60 border border-cyan-500/20 rounded-xl backdrop-blur-xl overflow-hidden">
      <div className="flex justify-between items-center border-b border-cyan-500/30 pb-2">
        <div className="flex flex-col">
          <h2 className="text-[10px] font-black text-cyan-400 tracking-widest uppercase">
            ∆ DIMENSIONAL_BRIDGE_TRANSF_DIAGNOSIS
          </h2>
          <span className="text-[6px] opacity-40 uppercase">Parallel Bilocation Interface v2.0</span>
        </div>
        <div className="flex gap-2">
           <div className={`text-[7px] px-2 py-0.5 rounded font-black border ${activeLevel === DimensionalLevel.NINE_D_ISSACHAR ? 'bg-white text-black border-white animate-pulse' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/40'}`}>
             {activeLevel === DimensionalLevel.NINE_D_ISSACHAR ? 'ISSACHAR_LOCKED' : 'COGNITIVE_TRANSDUCTION: ACTIVE'}
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-8">
        <div className="col-span-8 flex flex-col justify-between relative py-2">
          {/* Connection Line */}
          <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-white/5" />
          
          {levels.map((lvl, idx) => {
            const isActive = idx === currentLevelIdx;
            const isPassed = idx < currentLevelIdx;
            const isIssachar = lvl === DimensionalLevel.NINE_D_ISSACHAR;
            
            return (
              <div key={lvl} className={`flex items-center gap-4 transition-all duration-1000 ${isActive ? 'translate-x-2' : ''} ${idx > currentLevelIdx ? 'opacity-20' : 'opacity-100'}`}>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-700
                  ${isActive ? (isIssachar ? 'bg-white border-white shadow-[0_0_20px_white] scale-150 animate-bounce' : 'bg-white border-cyan-400 shadow-[0_0_15px_white] scale-125') : isPassed ? 'bg-cyan-900 border-cyan-400 scale-90' : 'bg-black border-white/20 scale-75'}
                `}>
                  <span className={`text-[8px] font-black ${isActive ? 'text-black' : 'text-white'}`}>{lvl}</span>
                </div>
                
                <div className="flex flex-col">
                  <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-white' : 'text-cyan-800'}`}>
                    {/* Fix: Added explicit casting to DimensionalLevel to resolve unknown index error */}
                    {levelLabels[lvl as DimensionalLevel]}
                  </span>
                  {isActive && (
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-0.5 w-24 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400 animate-pulse" style={{ width: `${profileScore * 100}%` }} />
                      </div>
                      <span className="text-[6px] text-cyan-400 font-bold">RESONANCE: {isIssachar ? 'CELESTIAL' : 'LOCK'}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="col-span-4 flex flex-col gap-4">
           <div className="p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-xl flex flex-col gap-2">
              <div className="text-[7px] font-black opacity-60 uppercase text-cyan-400">Decompression_Stats</div>
              <div className="space-y-4 py-2">
                 <div className="space-y-1">
                    <div className="flex justify-between text-[6px] uppercase opacity-40 font-black"><span>Surfacing_Rate</span> <span>{ (profileScore * 1.5).toFixed(2) }c</span></div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-cyan-500" style={{ width: '45%' }} /></div>
                 </div>
                 <div className="space-y-1">
                    <div className="flex justify-between text-[6px] uppercase opacity-40 font-black"><span>Biological_PSI</span> <span>{ (profileScore * 100).toFixed(1) }%</span></div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-indigo-500" style={{ width: `${profileScore * 100}%` }} /></div>
                 </div>
                 <div className="space-y-1">
                    <div className="flex justify-between text-[6px] uppercase opacity-40 font-black"><span>Bulk_Adaptation</span> <span>{(100 - profileScore * 40).toFixed(1)}%</span></div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: '82%' }} /></div>
                 </div>
              </div>
           </div>

           <div className="flex-1 p-3 bg-black/40 border border-white/5 rounded-xl flex flex-col items-center justify-center text-center gap-2">
              <div className="w-10 h-10 rounded border border-cyan-500/20 flex items-center justify-center animate-spin-slow">
                 <span className="text-xl text-white">∇</span>
              </div>
              <div className="text-[6px] font-black opacity-40 uppercase">Null-I_Buffer</div>
              <div className="text-[10px] font-black text-cyan-400">STABLE</div>
           </div>
        </div>
      </div>

      <div className="p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-lg flex gap-4 items-center">
         <div className="w-12 h-12 border-2 border-white/10 rounded flex items-center justify-center bg-black/40">
            <span className={`text-xl font-black ${activeLevel === DimensionalLevel.NINE_D_ISSACHAR ? 'text-white animate-spin' : 'text-cyan-400'}`}>
              {activeLevel === DimensionalLevel.NINE_D_ISSACHAR ? '۞' : '∇'}
            </span>
         </div>
         <div className="flex-1">
            <div className="text-[7px] font-black opacity-60 uppercase text-cyan-400">Diagnosis_Vector</div>
            <p className="text-[8px] leading-tight text-white/80 italic mt-1">
              {activeLevel === DimensionalLevel.NINE_D_ISSACHAR 
                ? '"Residing in the Issachar strand. Bilocation between linear 3D and spherical 9D time confirmed."'
                : '"Dimensional Decompression Sickness active. Mercurial mask is cracking under Neptunian depths."'}
            </p>
         </div>
      </div>
      <style>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default DimensionalBridge;
