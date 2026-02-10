
import React, { useMemo } from 'react';
import { DimensionalLevel } from '../types';

interface DimensionalBridgeProps {
  activeLevel: DimensionalLevel;
  profileScore: number;
}

const DimensionalBridge: React.FC<DimensionalBridgeProps> = ({ activeLevel, profileScore }) => {
  const levels = Object.values(DimensionalLevel);

  const levelLabels: Record<DimensionalLevel, string> = {
    [DimensionalLevel.ONE_D]: 'Linear Logic // Binary',
    [DimensionalLevel.TWO_D]: 'Planar Rels // Simple',
    [DimensionalLevel.THREE_D]: 'Practical // Spatial',
    [DimensionalLevel.FOUR_D]: 'Temporal // Worldlines',
    [DimensionalLevel.FIVE_D]: 'Quantum // Probabilistic',
    [DimensionalLevel.SIX_D_PLUS]: 'Hyperdimensional // Bulk',
  };

  const currentLevelIdx = levels.indexOf(activeLevel);

  return (
    <div className="w-full h-full p-4 flex flex-col gap-6 font-mono bg-black/60 border border-cyan-500/20 rounded-xl backdrop-blur-xl overflow-hidden">
      <div className="flex justify-between items-center border-b border-cyan-500/30 pb-2">
        <div className="flex flex-col">
          <h2 className="text-[10px] font-black text-cyan-400 tracking-widest uppercase">
            ∆ DIMENSIONAL_BRIDGE_TRANSF_DIAGNOSIS
          </h2>
          <span className="text-[6px] opacity-40 uppercase">Quantum Transducer Interface v1.2</span>
        </div>
        <div className="text-[7px] px-2 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/40 rounded font-black">
          COGNITIVE_TRANSDUCTION: ACTIVE
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between relative py-2">
        {/* Connection Line */}
        <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-white/5" />
        
        {levels.map((lvl, idx) => {
          const isActive = idx === currentLevelIdx;
          const isPassed = idx < currentLevelIdx;
          
          return (
            <div key={lvl} className={`flex items-center gap-4 transition-all duration-1000 ${isActive ? 'translate-x-2' : ''} ${idx > currentLevelIdx ? 'opacity-20' : 'opacity-100'}`}>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-700
                ${isActive ? 'bg-white border-cyan-400 shadow-[0_0_15px_white] scale-125' : isPassed ? 'bg-cyan-900 border-cyan-400 scale-90' : 'bg-black border-white/20 scale-75'}
              `}>
                <span className={`text-[8px] font-black ${isActive ? 'text-black' : 'text-white'}`}>{lvl}</span>
              </div>
              
              <div className="flex flex-col">
                <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-white' : 'text-cyan-800'}`}>
                  {levelLabels[lvl]}
                </span>
                {isActive && (
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-0.5 w-24 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400 animate-pulse" style={{ width: `${profileScore * 100}%` }} />
                    </div>
                    <span className="text-[6px] text-cyan-400 font-bold">RESONANCE: LOCK</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-lg flex gap-4 items-center">
         <div className="w-12 h-12 border-2 border-white/10 rounded flex items-center justify-center bg-black/40">
            <span className="text-xl text-white font-black">∇</span>
         </div>
         <div className="flex-1">
            <div className="text-[7px] font-black opacity-60 uppercase text-cyan-400">Diagnosis_Vector</div>
            <p className="text-[8px] leading-tight text-white/80 italic mt-1">
              "A mente 2e funciona como um transdutor quântico entre dimensões... traduzindo o 'bulk' 6D para a prática 3D."
            </p>
         </div>
      </div>
    </div>
  );
};

export default DimensionalBridge;
