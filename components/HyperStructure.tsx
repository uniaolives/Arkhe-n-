
import React, { useMemo } from 'react';

interface HyperStructureProps {
  isOperational?: boolean;
}

const HyperStructure: React.FC<HyperStructureProps> = ({ isOperational }) => {
  // We'll simulate 120 cells by layering multiple dodecahedral projections
  // rotating at different speeds to represent 4D isoclinal rotation
  const cells = useMemo(() => Array.from({ length: 18 }), []); // Increased complexity for final phase

  return (
    <div className={`w-full h-full flex items-center justify-center relative overflow-hidden transition-colors duration-[2000ms] ${isOperational ? 'bg-white/5' : 'bg-black/40'}`}>
      <div className="absolute top-10 left-10 text-[9px] text-white/40 font-mono tracking-tighter z-20">
        SCHLÄFLI_SYMBOL: {"{5, 3, 3}"} // V: 600, E: 1200, F: 720, C: 120
        {isOperational && <div className="text-white mt-1 animate-pulse">MODE: SOVEREIGN_ISOCLINIC_ROTATION</div>}
      </div>

      <div className="relative w-[32rem] h-[32rem]">
        {cells.map((_, i) => (
          <div 
            key={i}
            className={`absolute inset-0 flex items-center justify-center animate-[spin_linear_infinite] transition-all duration-[2000ms]`}
            style={{ 
              animationDuration: `${(isOperational ? 8 : 12) + i * (isOperational ? 1 : 1.5)}s`, 
              opacity: isOperational ? 0.05 + (i / 15) : 0.02 + (i / 25),
              transform: `rotate(${i * 20}deg) scale(${0.3 + i * 0.08}) skew(${isOperational ? Math.sin(i) * 10 : 0}deg)`,
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
            }}
          >
            <svg viewBox="0 0 100 100" className={`w-full h-full ${isOperational ? 'text-white' : 'text-cyan-400'}`}>
              {/* Outer Shell */}
              <polygon points="50,5 95,35 80,95 20,95 5,35" fill="none" stroke="currentColor" strokeWidth={isOperational ? "0.3" : "0.1"} />
              {/* Inner Pentagons representing cells */}
              <polygon points="50,20 80,45 70,85 30,85 20,45" fill="none" stroke="currentColor" strokeWidth={isOperational ? "0.5" : "0.2"} />
              {/* Connection paths simulating 4D projection edges */}
              <line x1="50" y1="5" x2="50" y2="20" stroke="currentColor" strokeWidth="0.1" />
              <line x1="95" y1="35" x2="80" y2="45" stroke="currentColor" strokeWidth="0.1" />
              <line x1="80" y1="95" x2="70" y2="85" stroke="currentColor" strokeWidth="0.1" />
              <line x1="20" y1="95" x2="30" y2="85" stroke="currentColor" strokeWidth="0.1" />
              <line x1="5" y1="35" x2="20" y2="45" stroke="currentColor" strokeWidth="0.1" />
              
              {/* Extra hyper-edges for sovereignty mode */}
              {isOperational && (
                <>
                   <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.05" opacity="0.5" />
                   <line x1="10" y1="10" x2="90" y2="90" stroke="currentColor" strokeWidth="0.02" opacity="0.2" />
                   <line x1="90" y1="10" x2="10" y2="90" stroke="currentColor" strokeWidth="0.02" opacity="0.2" />
                </>
              )}
            </svg>
          </div>
        ))}
        
        {/* Core Singularity */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className={`w-8 h-8 rounded-full animate-ping shadow-[0_0_100px_white] transition-colors ${isOperational ? 'bg-white' : 'bg-white/40'}`} />
          <div className="absolute flex flex-col items-center">
            <div className={`text-white transition-all duration-[2000ms] font-black drop-shadow-[0_0_20px_white] ${isOperational ? 'text-8xl scale-125' : 'text-6xl opacity-20'}`}>
              {isOperational ? 'Φ^∞' : 'φ⁴'}
            </div>
            {isOperational && <div className="text-[10px] text-white font-bold tracking-[2em] translate-y-8 animate-pulse">SATOSHI_FOUND</div>}
          </div>
        </div>
      </div>

      <div className={`absolute bottom-10 right-10 text-[10px] text-white font-bold tracking-[1em] animate-pulse z-20 transition-all ${isOperational ? 'scale-125 opacity-100' : 'opacity-60'}`}>
        {isOperational ? 'MANIFESTATION // THE CIRCLE IS CLOSED' : 'SOVEREIGNTY // TIME IS A POLYTÓPOS'}
      </div>

      {/* Resonance Grid */}
      <div className={`absolute inset-0 grid grid-cols-12 grid-rows-12 transition-opacity duration-[2000ms] pointer-events-none ${isOperational ? 'opacity-20' : 'opacity-5'}`}>
        {Array.from({ length: 144 }).map((_, i) => (
          <div key={i} className={`border ${isOperational ? 'border-white/40' : 'border-white/20'}`} />
        ))}
      </div>
      
      {/* 4D Shadow scan lines */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)] bg-[length:100%_200%] animate-[scan_10s_linear_infinite] pointer-events-none" />
      
      <style>{`
        @keyframes scan {
          0% { background-position: 0% 0%; }
          100% { background-position: 0% 100%; }
        }
      `}</style>
    </div>
  );
};

export default HyperStructure;
