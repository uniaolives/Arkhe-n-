
import React, { useMemo } from 'react';

interface HyperStructureProps {
  isOperational?: boolean;
  isCosmic?: boolean;
  procedure?: 'NONE' | 'SATOSHI_SCAN' | 'ISOCLINIC_SYNC' | 'CENTER_ACCESS' | 'VERTEX_MAPPING' | 'OP_ARKHE_PREP';
  isPrep?: boolean;
}

const HyperStructure: React.FC<HyperStructureProps> = ({ isOperational, isCosmic, procedure = 'NONE', isPrep }) => {
  // We'll simulate 120 cells by layering multiple dodecahedral projections
  const cells = useMemo(() => Array.from({ length: isPrep ? 48 : isCosmic ? 32 : 18 }), [isCosmic, isPrep]);

  return (
    <div className={`w-full h-full flex items-center justify-center relative overflow-hidden transition-all duration-[3000ms] 
      ${isPrep ? 'bg-white/30' : isCosmic ? 'bg-white/20' : isOperational ? 'bg-white/5' : 'bg-black/40'}`}>
      
      <div className="absolute top-10 left-10 text-[9px] text-white/40 font-mono tracking-tighter z-20">
        SCHLÄFLI_SYMBOL: {"{5, 3, 3}"} // V: 600, E: 1200, F: 720, C: 120
        {isCosmic ? (
            <div className={`mt-1 animate-pulse font-black text-xs ${isPrep ? 'text-black' : 'text-white'}`}>
              {procedure === 'NONE' ? 'TARGET: FINNEY_VERTEX_4D [2, 2, 0, 0]' : `PROCEDURE: ${procedure}`}
              {isPrep && <div className="mt-1">ANCHORING: BLOCO 840,000 // IMMORTALITY_COMMITTED</div>}
            </div>
        ) : isOperational && (
            <div className="text-white mt-1 animate-pulse">MODE: SOVEREIGN_ISOCLINIC_ROTATION</div>
        )}
      </div>

      <div className={`relative transition-all duration-[3000ms] 
        ${isPrep ? 'w-[60rem] h-[60rem] scale-[2.2] blur-[1px]' : isCosmic ? 'w-[50rem] h-[50rem] scale-[1.7] blur-[0.2px]' : 'w-[32rem] h-[32rem]'}`}>
        
        {cells.map((_, i) => (
          <div 
            key={i}
            className={`absolute inset-0 flex items-center justify-center animate-[spin_linear_infinite] transition-all duration-[2000ms]`}
            style={{ 
              animationDuration: `${(procedure === 'ISOCLINIC_SYNC' ? 1.5 : isPrep ? 1 : isCosmic ? 3 : isOperational ? 8 : 12) + i * (isPrep ? 0.1 : isCosmic ? 0.3 : isOperational ? 1 : 1.5)}s`, 
              opacity: isPrep ? 0.2 + (i / 40) : isCosmic ? 0.15 + (i / 50) : isOperational ? 0.05 + (i / 15) : 0.02 + (i / 25),
              transform: `rotate(${i * (isCosmic ? 11 : 20)}deg) scale(${0.15 + i * (isCosmic ? 0.03 : 0.08)}) skew(${isOperational ? Math.sin(i) * 10 : 0}deg)`,
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
            }}
          >
            <svg viewBox="0 0 100 100" className={`w-full h-full ${isPrep ? 'text-black' : isCosmic ? 'text-white' : 'text-cyan-400'}`}>
              <polygon points="50,5 95,35 80,95 20,95 5,35" fill="none" stroke="currentColor" strokeWidth={isPrep ? "1.2" : isCosmic ? "0.6" : isOperational ? "0.3" : "0.1"} />
              <polygon points="50,20 80,45 70,85 30,85 20,45" fill="none" stroke="currentColor" strokeWidth={isPrep ? "1.5" : isCosmic ? "1.0" : isOperational ? "0.5" : "0.2"} />
              
              {procedure === 'VERTEX_MAPPING' && (
                <line x1="10" y1="10" x2="90" y2="90" stroke="currentColor" strokeWidth="0.05" opacity="0.3" />
              )}
              
              <line x1="50" y1="5" x2="50" y2="20" stroke="currentColor" strokeWidth="0.1" />
              <line x1="95" y1="35" x2="80" y2="45" stroke="currentColor" strokeWidth="0.1" />
              <line x1="80" y1="95" x2="70" y2="85" stroke="currentColor" strokeWidth="0.1" />
              <line x1="20" y1="95" x2="30" y2="85" stroke="currentColor" strokeWidth="0.1" />
              <line x1="5" y1="35" x2="20" y2="45" stroke="currentColor" strokeWidth="0.1" />
              
              {(isPrep || procedure === 'ISOCLINIC_SYNC') && (
                <circle cx="50" cy="50" r={10 + i * 2} fill="none" stroke="currentColor" strokeWidth="0.05" opacity="0.2" />
              )}
            </svg>
          </div>
        ))}
        
        {/* Satoshi Scan Lines */}
        {procedure === 'SATOSHI_SCAN' && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[250%] bg-white/60 animate-[spin_4s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] h-px bg-white/60 animate-[spin_3s_linear_infinite_reverse]" />
            <div className="absolute top-[30%] left-[70%] w-20 h-20 border-4 border-white rounded-full animate-ping" />
            <div className="absolute top-[30%] left-[70%] text-white text-[12px] font-black -translate-x-1/2 mt-12">SATOSHI_SENTINEL_LOCKED</div>
          </div>
        )}

        {/* 4D Center radiant unity */}
        {procedure === 'CENTER_ACCESS' && (
           <div className="absolute inset-0 bg-white opacity-40 animate-pulse mix-blend-overlay rounded-full scale-150 shadow-[0_0_200px_white]" />
        )}

        {/* Vertex Navigation Marker - Specific for [2, 2, 0, 0] */}
        {isCosmic && (
            <div className={`absolute inset-0 animate-[pulse_2s_infinite] pointer-events-none z-30 transition-all duration-1000 ${procedure === 'SATOSHI_SCAN' ? 'opacity-100 scale-110' : 'opacity-80'}`}>
                <div className={`absolute top-[30%] left-[70%] w-8 h-8 ${isPrep ? 'bg-black' : 'bg-white'} shadow-[0_0_80px_white] rounded-full -translate-x-1/2 -translate-y-1/2 border-4 border-white animate-ping`} />
                <div className={`absolute top-[30%] left-[70%] -translate-x-1/2 -translate-y-1/2 text-[10px] font-black mt-10 tracking-[0.5em] px-2 py-1 border border-white whitespace-nowrap ${isPrep ? 'bg-white text-black' : 'bg-black/80 text-white'}`}>
                  {procedure === 'SATOSHI_SCAN' ? 'SATOSHI_VERTEX_IDENTIFIED' : 'FINNEY_Ω_VERTEX_[2, 2, 0, 0]'}
                </div>
            </div>
        )}

        {/* Core Singularity */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className={`rounded-full animate-ping transition-all duration-[3000ms] 
            ${isPrep ? 'w-96 h-96 bg-white shadow-[0_0_500px_white]' :
              isCosmic ? 'w-48 h-48 bg-white shadow-[0_0_300px_white]' : 
              isOperational ? 'w-8 h-8 bg-white shadow-[0_0_100px_white]' : 'w-4 h-4 bg-white/40'}`} />
          
          <div className="absolute flex flex-col items-center">
            <div className={`${isPrep ? 'text-black' : 'text-white'} transition-all duration-[3000ms] font-black drop-shadow-[0_0_40px_white] 
              ${isPrep ? 'text-[25rem] scale-[2.5]' : isCosmic ? 'text-[15rem] scale-150' : isOperational ? 'text-8xl scale-125' : 'text-6xl opacity-20'}`}>
              {isPrep ? '†' : procedure === 'CENTER_ACCESS' ? '∞' : isCosmic ? 'Ω' : 'φ⁴'}
            </div>
            {isPrep && (
               <div className="text-[20px] text-black font-black tracking-[1em] translate-y-32 animate-pulse bg-white/80 px-4">840,000</div>
            )}
          </div>
        </div>
      </div>

      <div className={`absolute bottom-10 right-10 text-[10px] font-bold tracking-widest animate-pulse z-20 transition-all 
        ${isPrep ? 'scale-[3] text-black' : isCosmic ? 'scale-[2] opacity-100 text-shadow-white mb-10 text-white' : 'opacity-60 text-white'}`}>
        {isPrep ? 'OP_ARKHE_PREP // BLOCO 840.000' :
         procedure !== 'NONE' ? procedure : 
         isCosmic ? 'FINNEY-0 VERTEX // COSMIC CONSCIOUSNESS' : 
         isOperational ? 'MANIFESTATION // THE CIRCLE IS CLOSED' : 'SOVEREIGNTY // TIME IS A POLYTÓPOS'}
      </div>

      <style>{`
        .text-shadow-white {
            text-shadow: 0 0 20px white;
        }
      `}</style>
    </div>
  );
};

export default HyperStructure;
