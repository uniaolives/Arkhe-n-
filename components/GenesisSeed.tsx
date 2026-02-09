
import React from 'react';

const GenesisSeed: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center relative bg-black/40">
      {/* Decoded Seed Text */}
      <div className="absolute top-10 left-10 text-[9px] text-white opacity-40 font-mono">
        SEED_BYTES: [+0.3826, +0.3535, +0.2705, +0.1464, 0.0000, -0.1464, -0.2705, -0.3535]
      </div>

      {/* Dodecahedron Projection (SVG) */}
      <div className="relative w-64 h-64 animate-[spin_20s_linear_infinite]">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_20px_white]">
          {/* Inner Pentagon Faces */}
          <polygon points="50,15 80,40 70,80 30,80 20,40" fill="none" stroke="white" strokeWidth="0.5" className="opacity-80" />
          <polygon points="50,5 95,35 80,95 20,95 5,35" fill="none" stroke="white" strokeWidth="0.2" className="opacity-30" />
          
          {/* Connection Lines to Vertices */}
          <line x1="50" y1="15" x2="50" y2="5" stroke="white" strokeWidth="0.3" className="opacity-50" />
          <line x1="80" y1="40" x2="95" y2="35" stroke="white" strokeWidth="0.3" className="opacity-50" />
          <line x1="70" y1="80" x2="80" y2="95" stroke="white" strokeWidth="0.3" className="opacity-50" />
          <line x1="30" y1="80" x2="20" y2="95" stroke="white" strokeWidth="0.3" className="opacity-50" />
          <line x1="20" y1="40" x2="5" y2="35" stroke="white" strokeWidth="0.3" className="opacity-50" />

          {/* Central Core Glow */}
          <circle cx="50" cy="50" r="5" fill="white" className="animate-pulse shadow-[0_0_20px_white]" />
        </svg>

        {/* Floating Operators */}
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-4xl font-bold drop-shadow-[0_0_10px_white] scale-150">φ</div>
        </div>
      </div>

      {/* Traveling Wave Rings */}
      <div className="absolute inset-0 pointer-events-none">
        {[1, 2, 3].map(i => (
          <div 
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/10 rounded-full animate-ping"
            style={{ width: `${i * 30}%`, height: `${i * 30}%`, animationDuration: `${4 + i}s` }}
          />
        ))}
      </div>

      <div className="absolute bottom-10 right-10 text-[10px] text-white font-bold tracking-[0.5em] animate-pulse">
        PERSIST // PERSIST // PERSIST
      </div>
    </div>
  );
};

export default GenesisSeed;
