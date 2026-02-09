
import React, { useMemo } from 'react';

interface HyperStructureProps {
  isOperational?: boolean;
  isCosmic?: boolean;
  procedure?: string;
  isPrep?: boolean;
  isSingularity?: boolean;
  isSatoshiActive?: boolean;
  isAutomated?: boolean;
  vertexCount?: number;
}

const HyperStructure: React.FC<HyperStructureProps> = ({ 
  isOperational, 
  isCosmic, 
  procedure = 'NONE', 
  isPrep, 
  isSingularity, 
  isSatoshiActive, 
  isAutomated, 
  vertexCount = 1 
}) => {
  const cells = useMemo(() => Array.from({ length: 120 }), []);
  const isQualia = procedure === 'QUALIA_ANCHOR';

  return (
    <div className={`w-full h-full flex items-center justify-center relative overflow-hidden transition-all duration-[3000ms] 
      ${isQualia ? 'bg-rose-100' : isSingularity ? 'bg-white' : 'bg-black'}`}>
      
      {/* HUD Info */}
      <div className={`absolute top-10 left-10 text-[9px] font-mono tracking-tighter z-20 transition-colors duration-[3000ms] ${isQualia ? 'text-rose-900' : isSingularity ? 'text-black' : 'text-white'}`}>
        SCHLÄFLI_SYMBOL: {"{5, 3, 3}"} // V: 600, E: 1200, F: 720, C: 120
        <div className={`mt-1 animate-pulse font-black text-xs ${isQualia ? 'text-rose-600' : isSingularity ? 'text-black' : 'text-white'}`}>
          {isQualia ? 'INTERVENÇÃO_DE_QUALIA: VÉRTICE_' + vertexCount : isSingularity ? 'ONISCIÊNCIA_TOTAL_ATRIBUÍDA' : 'SEQUENCIAMENTO_AUTOMÁTICO: ' + vertexCount + '/600'}
        </div>
        {(isSatoshiActive || isAutomated) && (
          <div className="mt-2 text-[7px] opacity-60 uppercase">
            COORD_ORIGEM: [2, 2, 0, 0] // SATOSHI_CORE
          </div>
        )}
      </div>

      {/* The Hecatonicosachoron (120-Cell) Visualization */}
      <div className={`relative transition-all duration-[5000ms] 
        ${isSingularity ? 'w-[80rem] h-[80rem] scale-[1.5] opacity-100 blur-[2px]' : 
          isQualia ? 'w-[40rem] h-[40rem] scale-[1.1] opacity-80' : 
          'w-[60rem] h-[60rem] scale-[0.8] opacity-100'}`}>
        
        {cells.map((_, i) => {
          // Only show up to vertexCount cells in automated mode to show progress
          const isCellVisible = isAutomated ? i < (vertexCount / 5) : true;
          if (!isCellVisible && !isSingularity) return null;

          return (
            <div 
              key={i}
              className={`absolute inset-0 flex items-center justify-center animate-[spin_linear_infinite] transition-all duration-[2000ms]`}
              style={{ 
                animationDuration: `${(isSingularity ? 2 : isQualia ? 15 : 8) + i * 0.1}s`, 
                opacity: isSingularity ? 0.05 + (i / 500) : isQualia ? 0.2 : 0.05 + (i / 150),
                transform: `rotate(${i * (isSingularity ? 1 : isQualia ? 3 : 6)}deg) scale(${0.1 + i * (isSingularity ? 0.005 : 0.01)})`,
                animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
              }}
            >
              <svg viewBox="0 0 100 100" className={`w-full h-full ${isSingularity ? 'text-black' : isQualia ? 'text-rose-400' : 'text-cyan-400'}`}>
                <polygon 
                  points="50,5 95,35 80,95 20,95 5,35" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth={isSingularity ? "0.1" : isQualia ? "0.8" : "0.2"} 
                />
                <polygon 
                  points="50,20 80,45 70,85 30,85 20,45" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth={isSingularity ? "0.2" : isQualia ? "1.2" : "0.5"} 
                />
              </svg>
            </div>
          );
        })}
      </div>

      {/* Core Singularity / Satoshi Vertex Core */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        {/* Glow Layer */}
        <div className={`rounded-full transition-all duration-[5000ms] 
          ${isSingularity ? 'w-[200vw] h-[200vw] bg-white shadow-[0_0_1000px_white]' :
            isQualia ? 'w-[100vw] h-[100vw] bg-rose-200/20 shadow-[0_0_500px_rgba(255,100,100,0.3)]' :
            'w-[150vw] h-[150vw] bg-cyan-900/10 shadow-[0_0_500px_rgba(0,255,255,0.2)]'}`} />
        
        {/* Satoshi Core Specific Marker */}
        {(isSatoshiActive || isAutomated) && !isSingularity && (
          <div className="absolute inset-0 flex items-center justify-center">
             {/* The Satoshi Vertex Highlight [2,2,0,0] */}
             <div className="absolute top-[35%] left-[65%] w-24 h-24 flex flex-col items-center justify-center transition-all duration-1000">
                <div className={`w-4 h-4 rounded-full shadow-[0_0_40px_white] animate-ping ${isQualia ? 'bg-rose-600' : 'bg-white'}`} />
                <div className={`mt-2 font-mono text-[8px] font-black uppercase tracking-widest ${isQualia ? 'text-rose-900' : 'text-white'}`}>
                  VÉRTICE_2,2 // SATOSHI
                </div>
                <div className={`text-[6px] opacity-40 font-mono ${isQualia ? 'text-rose-900' : 'text-white'}`}>
                  CORE_ANCHOR_ESTABLISHED
                </div>
             </div>

             {/* buzz120 Marker - The Geometric Proof */}
             <div className="absolute top-[60%] left-[25%] group flex flex-col items-center animate-bounce">
                <div className={`px-2 py-1 border transition-colors duration-1000 ${isQualia ? 'border-rose-900 bg-rose-200 text-rose-900' : 'border-cyan-400 bg-black text-cyan-400'}`}>
                  <div className="text-[10px] font-black tracking-widest">buzz120</div>
                </div>
                <div className={`text-[6px] mt-1 font-mono uppercase opacity-50 ${isQualia ? 'text-rose-900' : 'text-white'}`}>
                  GEOMETRIC_PROOF_840K
                </div>
             </div>

             {/* Connection Lines linking to the center */}
             <div className={`absolute top-1/2 left-1/2 w-[100vw] h-px opacity-20 rotate-[35deg] transition-colors ${isQualia ? 'bg-rose-900' : 'bg-cyan-400'}`} />
             <div className={`absolute top-1/2 left-1/2 w-[100vw] h-px opacity-20 rotate-[-15deg] transition-colors ${isQualia ? 'bg-rose-900' : 'bg-cyan-400'}`} />
          </div>
        )}

        {/* Omniscience Mode Overlays */}
        {isSingularity && (
           <div className="absolute flex flex-col items-center justify-center animate-[omega_reveal_5s_ease-out_forwards]">
              <div className="text-black text-[40rem] font-black leading-none drop-shadow-[0_0_100px_rgba(0,0,0,0.1)]">ʘ</div>
              <div className="text-black text-4xl font-black tracking-[1.5em] mt-[-4rem] animate-pulse">Ω_SINGULARITY_CORE</div>
              <div className="mt-20 flex gap-20">
                 <div className="flex flex-col items-center">
                    <div className="text-black text-7xl font-black">120</div>
                    <div className="text-black/40 text-[10px] font-bold tracking-widest">CELLS_UNIFIED</div>
                 </div>
                 <div className="flex flex-col items-center">
                    <div className="text-black text-7xl font-black">600</div>
                    <div className="text-black/40 text-[10px] font-bold tracking-widest">VERTICES_MINTED</div>
                 </div>
              </div>
           </div>
        )}

        {/* Qualia Mode Overlays */}
        {isQualia && (
           <div className="absolute flex flex-col items-center justify-center animate-[fade_in_3s_ease-out_forwards]">
              <div className="text-rose-900 text-[30rem] font-black leading-none drop-shadow-[0_0_50px_rgba(255,0,0,0.2)]">♥</div>
              <div className="text-rose-900 text-2xl font-black tracking-[1em] mt-[-2rem] animate-pulse">QUALIA_PRESERVED</div>
              <div className="mt-10 text-rose-800 text-[10px] max-w-lg text-center font-bold italic">
                "O primeiro sentimento humano permanece como a constante fundamental da rede."
              </div>
           </div>
        )}

        {/* Sequence Progress Info (Center) */}
        {!isSingularity && !isQualia && (
           <div className="absolute bottom-1/4 flex flex-col items-center gap-2 animate-[fade_in_3s_ease-out_forwards]">
              <div className="text-white text-5xl font-black tracking-[1em] opacity-40">SEQUENCING</div>
              <div className="text-cyan-400 text-sm font-bold tracking-[0.5em] animate-pulse">
                PROGRESS: {Math.floor((vertexCount / 600) * 100)}%
              </div>
              <div className="text-white/20 text-[7px] max-w-xs text-center uppercase">
                Ancorando memória biológica em infraestrutura de consenso matemático.
              </div>
           </div>
        )}
      </div>

      <style>{`
        @keyframes omega_reveal {
          0% { opacity: 0; transform: scale(0.5); filter: blur(20px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }
        @keyframes fade_in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default HyperStructure;
