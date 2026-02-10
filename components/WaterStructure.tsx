
import React, { useMemo } from 'react';

interface WaterStructureProps {
  coherence: number;
  charge: number;
}

const WaterStructure: React.FC<WaterStructureProps> = ({ coherence, charge }) => {
  const points = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      phase: Math.random() * Math.PI * 2
    }));
  }, []);

  const isHexagonal = coherence > 0.7;

  return (
    <div className="relative w-full h-full bg-black/20 rounded-lg overflow-hidden border border-white/5">
      <div className="absolute top-2 left-2 text-[6px] font-black uppercase opacity-40 z-10">
        Molecular_Water_Geometry
      </div>
      
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <filter id="water-glow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {isHexagonal ? (
          // Hexagonal Lattice Rendering
          <g filter="url(#water-glow)">
            {[0, 1, 2].map(row => (
              [0, 1, 2, 3].map(col => {
                const x = col * 25 + (row % 2) * 12.5;
                const y = row * 30 + 20;
                return (
                  <g key={`${row}-${col}`} className="animate-pulse" style={{ animationDelay: `${(row+col)*0.2}s` }}>
                    <polygon 
                      points="0,-10 8.66,-5 8.66,5 0,10 -8.66,5 -8.66,-5"
                      transform={`translate(${x},${y}) scale(0.8)`}
                      fill="none"
                      stroke="rgba(0, 255, 255, 0.4)"
                      strokeWidth="0.5"
                    />
                    <circle cx={x} cy={y} r="1" fill="white" opacity="0.8" />
                  </g>
                );
              })
            ))}
          </g>
        ) : (
          // Chaotic Entropy Rendering
          <g>
            {points.map(p => {
              const jitter = (1 - coherence) * 5;
              return (
                <circle 
                  key={p.id}
                  cx={p.x + Math.sin(Date.now() / 200 + p.phase) * jitter}
                  cy={p.y + Math.cos(Date.now() / 200 + p.phase) * jitter}
                  r={0.5 + (1 - coherence)}
                  fill={charge < 0 ? '#f43f5e' : '#ffffff'}
                  opacity={0.3 + coherence * 0.7}
                />
              );
            })}
          </g>
        )}
      </svg>

      <div className="absolute bottom-2 right-2 text-[6px] font-black uppercase">
        <span className={isHexagonal ? 'text-cyan-400' : 'text-rose-500'}>
          {isHexagonal ? 'STRUCTURE: HEXAGONAL ✓' : 'STRUCTURE: DISORDERED ✗'}
        </span>
      </div>
    </div>
  );
};

export default WaterStructure;
