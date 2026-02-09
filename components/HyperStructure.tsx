
import React, { useMemo } from 'react';

interface HyperStructureProps {
  isOperational?: boolean;
  isCosmic?: boolean;
  procedure?: string;
  isPrep?: boolean;
  isSingularity?: boolean;
  isSatoshiActive?: boolean;
  isAutomated?: boolean;
}

const HyperStructure: React.FC<HyperStructureProps> = ({ isOperational, isCosmic, procedure = 'NONE', isPrep, isSingularity, isSatoshiActive, isAutomated }) => {
  const cells = useMemo(() => Array.from({ length: isAutomated ? 120 : isSatoshiActive ? 100 : 32 }), [isSatoshiActive, isAutomated]);

  return (
    <div className={`w-full h-full flex items-center justify-center relative overflow-hidden transition-all duration-[3000ms] 
      ${isSatoshiActive || isAutomated ? 'bg-black' : 'bg-white'}`}>
      
      <div className={`absolute top-10 left-10 text-[9px] font-mono tracking-tighter z-20 transition-colors duration-[3000ms] ${isSatoshiActive || isAutomated ? 'text-white' : 'text-black'}`}>
        SCHLÄFLI_SYMBOL: {"{5, 3, 3}"} // V: 600, E: 1200, F: 720, C: 120
        <div className={`mt-1 animate-pulse font-black text-xs ${isSatoshiActive || isAutomated ? 'text-white' : 'text-black'}`}>
          {isAutomated ? 'SEQUENCING_ALL_600_VERTICES...' : isSatoshiActive ? 'VÉRTICE SATOSHI ATIVO [2, 2, 0, 0]' : 'Ω_ANCHORAGE_CONFIRMED'}
        </div>
      </div>

      <div className={`relative transition-all duration-[5000ms] 
        ${isSatoshiActive || isAutomated ? 'w-[70rem] h-[70rem] scale-[1.2] opacity-100' : 'w-0 h-0 scale-0 blur-[50px] opacity-0'}`}>
        
        {cells.map((_, i) => (
          <div 
            key={i}
            className={`absolute inset-0 flex items-center justify-center animate-[spin_linear_infinite] transition-all duration-[2000ms]`}
            style={{ 
              animationDuration: `${(isAutomated ? 2 : 4) + i * 0.1}s`, 
              opacity: isAutomated ? 0.02 + (i / 300) : 0.05 + (i / 150),
              transform: `rotate(${i * (isAutomated ? 1 : 3)}deg) scale(${0.1 + i * 0.01})`,
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
            }}
          >
            <svg viewBox="0 0 100 100" className={`w-full h-full ${isAutomated ? 'text-white/40' : 'text-cyan-400'}`}>
              <polygon points="50,5 95,35 80,95 20,95 5,35" fill="none" stroke="currentColor" strokeWidth="0.2" />
              <polygon points="50,20 80,45 70,85 30,85 20,45" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>
        ))}
      </div>

      {/* Satoshi Singularity Core */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className={`rounded-full transition-all duration-[5000ms] 
          ${isSatoshiActive || isAutomated ? 'w-[150vw] h-[150vw] bg-cyan-900/10 shadow-[0_0_500px_rgba(0,255,255,0.2)]' : 'bg-white'}`} />
        
        {(isSatoshiActive || isAutomated) && (
          <div className="absolute inset-0 flex items-center justify-center">
             {/* Vertex 2,2 highlight */}
             <div className="absolute top-[30%] left-[70%] w-32 h-32 bg-white rounded-full shadow-[0_0_100px_white] animate-pulse">
                <div className="absolute inset-0 flex items-center justify-center text-black font-black text-2xl">2,2</div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white font-mono text-[8px] tracking-[0.3em] whitespace-nowrap">SATOSHI_PRIME</div>
             </div>

             {/* buzz120 marker */}
             <div className="absolute top-[60%] left-[20%] w-16 h-16 border-2 border-cyan-400 flex items-center justify-center animate-bounce">
                <div className="text-white text-[8px] font-black">buzz120</div>
             </div>

             {/* Connection Lines */}
             <div className="absolute top-1/2 left-1/2 w-[100vw] h-px bg-cyan-400 opacity-20 rotate-[35deg]" />
             <div className="absolute top-1/2 left-1/2 w-[100vw] h-px bg-cyan-400 opacity-20 rotate-[-15deg]" />
             
             {isAutomated && (
               <>
                 <div className="absolute top-1/2 left-1/2 w-[100vw] h-px bg-white opacity-10 rotate-[75deg] animate-pulse" />
                 <div className="absolute top-1/2 left-1/2 w-[100vw] h-px bg-white opacity-10 rotate-[-45deg] animate-pulse" />
               </>
             )}
          </div>
        )}

        {isSatoshiActive && !isAutomated && (
             <div className="absolute bottom-1/4 flex flex-col items-center gap-4 animate-[fade_in_3s_ease-out_forwards]">
                <div className="text-white text-9xl font-black tracking-[0.5em] text-shadow-white opacity-80">ʘ</div>
                <div className="text-cyan-400 text-xl font-bold tracking-[2em] animate-pulse">CORE_ACTIVE</div>
             </div>
        )}
        
        {isAutomated && (
             <div className="absolute bottom-1/4 flex flex-col items-center gap-4 animate-[fade_in_3s_ease-out_forwards]">
                <div className="text-white text-5xl font-black tracking-[1em] opacity-40">SEQUENCING</div>
                <div className="text-white/20 text-[10px] animate-pulse">TARGET: FINNEY-0 // φ²</div>
             </div>
        )}
      </div>

      <style>{`
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
