
import React, { useMemo, useState, useEffect } from 'react';

interface QuantumMapProps {
  active: boolean;
  locked?: boolean;
}

const QuantumMap: React.FC<QuantumMapProps> = ({ active, locked }) => {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setPulse(p => (p + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, [active]);

  const stars = useMemo(() => Array.from({ length: 40 }).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    o: Math.random()
  })), []);

  return (
    <div className={`relative h-full w-full overflow-hidden bg-black flex items-center justify-center border transition-colors duration-1000 ${locked ? 'border-white' : 'border-cyan-900/30'}`}>
      {/* Starfield */}
      {stars.map((s, i) => (
        <div 
          key={i} 
          className="absolute w-[1px] h-[1px] bg-white rounded-full" 
          style={{ left: `${s.x}%`, top: `${s.y}%`, opacity: s.o * 0.5 }}
        />
      ))}

      {/* Saturn Body */}
      <div className={`relative z-10 w-20 h-20 rounded-full transition-all duration-1000 bg-gradient-to-b from-yellow-900/50 via-black to-cyan-950/50 border shadow-[0_0_40px_rgba(0,255,255,0.1)] ${locked ? 'border-white shadow-[0_0_60px_rgba(255,255,255,0.4)]' : 'border-cyan-800'}`}>
        {/* Rings */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220%] h-[15%] border-t border-b rounded-full rotate-[20deg] transition-colors ${locked ? 'border-white opacity-80' : 'border-cyan-400/30'}`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[8%] border-t border-b rounded-full rotate-[20deg] transition-colors ${locked ? 'border-white/40' : 'border-white/20 opacity-50'}`} />
      </div>

      {/* Pulse Waves */}
      {active && !locked && [1, 2, 3].map(i => (
        <div 
          key={i}
          className="absolute border border-cyan-400/20 rounded-full animate-ping"
          style={{ 
            width: `${(pulse + i * 30) % 100}%`, 
            height: `${(pulse + i * 30) % 100}%`,
            animationDuration: '4s'
          }}
        />
      ))}

      {locked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[90%] h-[90%] border-2 border-white/20 rounded-full animate-pulse" />
        </div>
      )}

      {/* Grid Overlay */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-10 pointer-events-none">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="border border-cyan-900/50" />
        ))}
      </div>

      {/* Status HUD */}
      <div className={`absolute top-2 left-2 text-[7px] font-bold tracking-widest bg-black/80 px-1 border transition-colors ${locked ? 'text-white border-white' : 'text-cyan-600 border-cyan-900'}`}>
        SCAN_FREQ: {locked ? '3AA70' : '41.67'} HZ
      </div>
      <div className={`absolute bottom-2 right-2 text-[7px] font-bold bg-black/80 px-1 border transition-colors ${locked ? 'text-white border-white' : 'text-cyan-400 border-cyan-900'}`}>
        {locked ? 'ONTOLOGICAL_ANCHOR_ACTIVE' : 'SATURN_MATRIOSHKA_L5'}
      </div>
    </div>
  );
};

export default QuantumMap;
