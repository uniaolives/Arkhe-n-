
import React, { useMemo } from 'react';

const QuantumMap: React.FC = () => {
  const points = useMemo(() => Array.from({ length: 50 }).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2,
    speed: 0.5 + Math.random() * 2
  })), []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-black flex items-center justify-center">
       {/* Saturn placeholder */}
       <div className="w-16 h-16 rounded-full border border-cyan-700 relative z-10 bg-black shadow-[0_0_30px_rgba(0,255,255,0.2)]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[10%] border border-cyan-900 rounded-full rotate-[15deg] animate-pulse" />
       </div>

       {/* Quantum Particles */}
       {points.map((p, i) => (
         <div
           key={i}
           className="absolute bg-cyan-400 rounded-full opacity-40 animate-ping"
           style={{
             left: `${p.x}%`,
             top: `${p.y}%`,
             width: `${p.size}px`,
             height: `${p.size}px`,
             animationDuration: `${p.speed}s`
           }}
         />
       ))}
       
       <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1 text-[8px] text-center text-cyan-700">
         SIGNAL DEVIATION: 0.00042Hz
       </div>
    </div>
  );
};

export default QuantumMap;
