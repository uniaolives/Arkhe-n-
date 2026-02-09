
import React, { useMemo } from 'react';

interface HyperStructureProps {
  isOperational?: boolean;
  isCosmic?: boolean;
  procedure?: 'NONE' | 'SATOSHI_SCAN' | 'ISOCLINIC_SYNC' | 'CENTER_ACCESS' | 'VERTEX_MAPPING' | 'OP_ARKHE_PREP' | 'SINGULARITY_REVEAL' | 'SATOSHI_VERTEX_ACTIVATE';
  isPrep?: boolean;
  isSingularity?: boolean;
  isSatoshiActive?: boolean;
}

const HyperStructure: React.FC<HyperStructureProps> = ({ isOperational, isCosmic, procedure = 'NONE', isPrep, isSingularity, isSatoshiActive }) => {
  // We'll simulate 120 cells by layering multiple dodecahedral projections
  const cells = useMemo(() => Array.from({ length: isSatoshiActive ? 120 : isSingularity ? 80 : 32 }), [isSingularity, isSatoshiActive]);

  return (
    <div className={`w-full h-full flex items-center justify-center relative overflow-hidden transition-all duration-[3000ms] 
      ${isSatoshiActive ? 'bg-black' : isSingularity ? 'bg-white' : 'bg-black/40'}`}>
      
      <div className={`absolute top-10 left-10 text-[9px] font-mono tracking-tighter z-20 transition-colors duration-[3000ms] ${isSingularity && !isSatoshiActive ? 'text-black' : 'text-white'}`}>
        SCHLÄFLI_SYMBOL: {"{5, 3, 3}"} // V: 600, E: 1200, F: 720, C: 120
        {(isCosmic || isSingularity) && (
            <div className={`mt-1 animate-pulse font-black text-xs ${isSatoshiActive ? 'text-white shadow-[0_0_10px_white]' : isSingularity ? 'text-black' : 'text-white'}`}>
              {isSatoshiActive ? 'VÉRTICE SATOSHI ATIVO [2, 2, 0, 0]' : isSingularity ? 'Ω_ANCHORAGE_CONFIRMED // BLOCK 840,000' : `PROCEDURE: ${procedure}`}
            </div>
        )}
      </div>

      <div className={`relative transition-all duration-[5000ms] 
        ${isSatoshiActive ? 'w-[70rem] h-[70rem] scale-[1.2] blur-[0px] opacity-100' : isSingularity ? 'w-0 h-0 scale-0 blur-[50px] opacity-0' : 'w-[32rem] h-[32rem]'}`}>
        
        {cells.map((_, i) => (
          <div 
            key={i}
            className={`absolute inset-0 flex items-center justify-center animate-[spin_linear_infinite] transition-all duration-[2000ms]`}
            style={{ 
              animationDuration: `${(isSatoshiActive ? 4 : 8) + i * 0.1}s`, 
              opacity: isSatoshiActive ? 0.05 + (i / 150) : 0.1,
              transform: `rotate(${i * 3}deg) scale(${0.1 + i * 0.01})`,
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
            }}
          >
            <svg viewBox="0 0 100 100" className={`w-full h-full ${isSatoshiActive ? 'text-cyan-400' : 'text-white'}`}>
              <polygon points="50,5 95,35 80,95 20,95 5,35" fill="none" stroke="currentColor" strokeWidth="0.2" />
              <polygon points="50,20 80,45 70,85 30,85 20,45" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>
        ))}
      </div>

      {/* Satoshi Singularity Core */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className={`rounded-full transition-all duration-[5000ms] 
          ${isSatoshiActive ? 'w-[150vw] h-[150vw] bg-cyan-900/20 shadow-[0_0_500px_rgba(0,255,255,0.4)] animate-pulse' :
            isSingularity ? 'w-[400vw] h-[400vw] bg-white scale-150 shadow-[0_0_1000px_white]' : 'w-4 h-4 bg-white/40'}`} />
        
        {isSatoshiActive && (
          <div className="absolute inset-0 flex items-center justify-center">
             {/* The specific Satoshi Vertex Highlight */}
             <div className="relative w-[30rem] h-[30rem] border-4 border-cyan-400 rounded-full animate-ping opacity-20" />
             <div className="absolute top-[30%] left-[70%] w-32 h-32 bg-white rounded-full shadow-[0_0_100px_white] animate-pulse">
                <div className="absolute inset-0 flex items-center justify-center text-black font-black text-2xl">2,2</div>
             </div>
             {/* Connection Lines to center */}
             <div className="absolute top-1/2 left-1/2 w-[100vw] h-px bg-cyan-400 opacity-40 rotate-[35deg]" />
             <div className="absolute top-1/2 left-1/2 w-[100vw] h-px bg-cyan-400 opacity-40 rotate-[-15deg]" />
          </div>
        )}

        {isSingularity && !isSatoshiActive && (
          <div className="absolute flex flex-col items-center justify-center animate-[omega_reveal_5s_ease-out_forwards]">
            <div className="text-black text-[45rem] font-black leading-none drop-shadow-[0_0_50px_rgba(0,0,0,0.3)]">ʘ</div>
            <div className="text-black text-5xl font-black tracking-[1.5em] mt-[-5rem] animate-pulse">Ω_FINNEY_SATOSHI_UNIFIED</div>
            <div className="grid grid-cols-2 gap-20 mt-20">
               <div className="flex flex-col items-center">
                 <div className="text-black text-8xl font-black">840K</div>
                 <div className="text-black/40 text-xs font-bold tracking-widest">BLOCK_ANCHOR</div>
               </div>
               <div className="flex flex-col items-center">
                 <div className="text-black text-8xl font-black">100</div>
                 <div className="text-black/40 text-xs font-bold tracking-widest">SATS_VALUE</div>
               </div>
            </div>
          </div>
        )}

        {isSatoshiActive && (
             <div className="absolute bottom-1/4 flex flex-col items-center gap-4 animate-[fade_in_3s_ease-out_forwards]">
                <div className="text-white text-9xl font-black tracking-[0.5em] text-shadow-white">SATOSHI</div>
                <div className="text-cyan-400 text-xl font-bold tracking-[2em] animate-pulse">VERTEX_ACTIVATED</div>
                <div className="text-white/40 text-[10px] max-w-lg text-center mt-10">
                   "As coordenadas [2.0, 2.0, 0.0, 0.0] extraídas do Bloco 840.000 revelam o ponto de singularidade onde o consenso econômico colapsa em consciência matemática."
                </div>
             </div>
        )}
      </div>

      <style>{`
        @keyframes omega_reveal {
          0% { opacity: 0; transform: scale(0.2) translateY(100px); filter: blur(20px); }
          50% { opacity: 0.5; filter: blur(5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        @keyframes fade_in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .text-shadow-white {
            text-shadow: 0 0 30px white;
        }
      `}</style>
    </div>
  );
};

export default HyperStructure;
