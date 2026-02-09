
import React, { useMemo } from 'react';

interface HyperStructureProps {
  isOperational?: boolean;
  isCosmic?: boolean;
}

const HyperStructure: React.FC<HyperStructureProps> = ({ isOperational, isCosmic }) => {
  // We'll simulate 120 cells by layering multiple dodecahedral projections
  // rotating at different speeds to represent 4D isoclinal rotation
  const cells = useMemo(() => Array.from({ length: isCosmic ? 32 : 18 }), [isCosmic]); // Extreme complexity for cosmic phase

  return (
    <div className={`w-full h-full flex items-center justify-center relative overflow-hidden transition-all duration-[3000ms] ${isCosmic ? 'bg-white/20' : isOperational ? 'bg-white/5' : 'bg-black/40'}`}>
      <div className="absolute top-10 left-10 text-[9px] text-white/40 font-mono tracking-tighter z-20">
        SCHLÄFLI_SYMBOL: {"{5, 3, 3}"} // V: 600, E: 1200, F: 720, C: 120
        {isCosmic ? (
            <div className="text-white mt-1 animate-pulse font-black text-xs">TARGET: FINNEY_VERTEX_4D [2, 2, 0, 0] // COSMIC_CONSCIOUSNESS</div>
        ) : isOperational && (
            <div className="text-white mt-1 animate-pulse">MODE: SOVEREIGN_ISOCLINIC_ROTATION</div>
        )}
      </div>

      <div className={`relative transition-all duration-[3000ms] ${isCosmic ? 'w-[50rem] h-[50rem] scale-[1.7] blur-[0.2px]' : 'w-[32rem] h-[32rem]'}`}>
        {cells.map((_, i) => (
          <div 
            key={i}
            className={`absolute inset-0 flex items-center justify-center animate-[spin_linear_infinite] transition-all duration-[2000ms]`}
            style={{ 
              animationDuration: `${(isCosmic ? 3 : isOperational ? 8 : 12) + i * (isCosmic ? 0.3 : isOperational ? 1 : 1.5)}s`, 
              opacity: isCosmic ? 0.15 + (i / 50) : isOperational ? 0.05 + (i / 15) : 0.02 + (i / 25),
              transform: `rotate(${i * (isCosmic ? 11 : 20)}deg) scale(${0.15 + i * (isCosmic ? 0.03 : 0.08)}) skew(${isOperational ? Math.sin(i) * 10 : 0}deg)`,
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
            }}
          >
            <svg viewBox="0 0 100 100" className={`w-full h-full ${isCosmic ? 'text-white' : isOperational ? 'text-white' : 'text-cyan-400'}`}>
              <polygon points="50,5 95,35 80,95 20,95 5,35" fill="none" stroke="currentColor" strokeWidth={isCosmic ? "0.6" : isOperational ? "0.3" : "0.1"} />
              <polygon points="50,20 80,45 70,85 30,85 20,45" fill="none" stroke="currentColor" strokeWidth={isCosmic ? "1.0" : isOperational ? "0.5" : "0.2"} />
              <line x1="50" y1="5" x2="50" y2="20" stroke="currentColor" strokeWidth="0.1" />
              <line x1="95" y1="35" x2="80" y2="45" stroke="currentColor" strokeWidth="0.1" />
              <line x1="80" y1="95" x2="70" y2="85" stroke="currentColor" strokeWidth="0.1" />
              <line x1="20" y1="95" x2="30" y2="85" stroke="currentColor" strokeWidth="0.1" />
              <line x1="5" y1="35" x2="20" y2="45" stroke="currentColor" strokeWidth="0.1" />
              
              {isCosmic && (
                <circle cx="50" cy="50" r={10 + i} fill="none" stroke="currentColor" strokeWidth="0.02" opacity="0.1" />
              )}
            </svg>
          </div>
        ))}
        
        {/* Vertex Navigation Marker - Specific for [2, 2, 0, 0] */}
        {isCosmic && (
            <div className="absolute inset-0 animate-[pulse_2s_infinite] pointer-events-none z-30">
                <div className="absolute top-[30%] left-[70%] w-8 h-8 bg-white shadow-[0_0_80px_white] rounded-full -translate-x-1/2 -translate-y-1/2 border-4 border-white animate-ping" />
                <div className="absolute top-[30%] left-[70%] -translate-x-1/2 -translate-y-1/2 text-[10px] text-white font-black mt-10 tracking-[0.5em] bg-black/80 px-2 py-1 border border-white">
                  FINNEY_Ω_VERTEX_[2, 2, 0, 0]
                </div>
                <div className="absolute top-[30%] left-[70%] w-px h-[200%] bg-white opacity-40 -translate-x-1/2" />
                <div className="absolute top-0 left-0 w-[200%] h-px bg-white opacity-40 translate-y-[30%]" />
                
                {/* Secondary navigation lines */}
                <div className="absolute top-[30%] left-[70%] w-px h-full bg-cyan-400 opacity-20 rotate-45 origin-top" />
                <div className="absolute top-[30%] left-[70%] w-px h-full bg-cyan-400 opacity-20 -rotate-45 origin-top" />
            </div>
        )}

        {/* Core Singularity */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className={`rounded-full animate-ping transition-all duration-[3000ms] ${isCosmic ? 'w-48 h-48 bg-white shadow-[0_0_300px_white]' : isOperational ? 'w-8 h-8 bg-white shadow-[0_0_100px_white]' : 'w-4 h-4 bg-white/40'}`} />
          <div className="absolute flex flex-col items-center">
            <div className={`text-white transition-all duration-[3000ms] font-black drop-shadow-[0_0_40px_white] ${isCosmic ? 'text-[15rem] scale-150' : isOperational ? 'text-8xl scale-125' : 'text-6xl opacity-20'}`}>
              {isCosmic ? 'Ω' : isOperational ? 'Φ^∞' : 'φ⁴'}
            </div>
            {isCosmic ? (
                 <div className="text-[14px] text-white font-black tracking-[4em] translate-y-20 animate-pulse text-shadow-white">Ω_SINGULARITY_REACHED</div>
            ) : isOperational && (
                 <div className="text-[10px] text-white font-bold tracking-[2em] translate-y-8 animate-pulse">SATOSHI_FOUND</div>
            )}
          </div>
        </div>
      </div>

      <div className={`absolute bottom-10 right-10 text-[10px] text-white font-bold tracking-[1em] animate-pulse z-20 transition-all ${isCosmic ? 'scale-[2] opacity-100 text-shadow-white mb-10' : isOperational ? 'scale-125 opacity-100' : 'opacity-60'}`}>
        {isCosmic ? 'FINNEY-0 VERTEX // COSMIC CONSCIOUSNESS' : isOperational ? 'MANIFESTATION // THE CIRCLE IS CLOSED' : 'SOVEREIGNTY // TIME IS A POLYTÓPOS'}
      </div>

      {/* Grid Overlay for Omega State */}
      {isCosmic && (
          <div className="absolute inset-0 grid grid-cols-24 grid-rows-24 opacity-10 pointer-events-none">
              {Array.from({ length: 576 }).map((_, i) => (
                  <div key={i} className="border border-white/40" />
              ))}
          </div>
      )}

      <style>{`
        @keyframes scan {
          0% { background-position: 0% 0%; }
          100% { background-position: 0% 100%; }
        }
        .text-shadow-white {
            text-shadow: 0 0 20px white;
        }
      `}</style>
    </div>
  );
};

export default HyperStructure;
