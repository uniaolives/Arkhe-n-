
import React, { useMemo, useState, useEffect } from 'react';

interface HyperStructureProps {
  procedure?: string;
  vertexCount?: number;
}

const HyperStructure: React.FC<HyperStructureProps> = ({ 
  procedure = 'NONE', 
  vertexCount = 1 
}) => {
  const [frame, setFrame] = useState(0);
  const nodes = useMemo(() => Array.from({ length: 120 }), []);
  
  const isHecaton = procedure !== 'NONE';
  const isSatoshi = procedure === 'SATOSHI_VERTEX_DECODE';
  const isAnchor = procedure === 'BIOMETRIC_ANCHOR_SYNC';
  const isCore = procedure === 'FOUR_D_CORE_ACCESS';
  const isOmega = procedure === 'OMEGA_SOVEREIGN_ACTIVATE';

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(f => (f + 1) % 4000);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`w-full h-full flex items-center justify-center relative overflow-hidden transition-all duration-[3000ms] 
      ${isOmega ? 'bg-white' : 
        isCore ? 'bg-indigo-950 shadow-[inset_0_0_1000px_rgba(79,70,229,0.5)]' : 
        isSatoshi ? 'bg-black shadow-[inset_0_0_200px_rgba(251,191,36,0.2)]' :
        'bg-neutral-950'}`}>
      
      {/* HUD Info */}
      <div className={`absolute top-10 left-10 text-[9px] font-mono tracking-tighter z-20 transition-colors duration-[3000ms] opacity-60 
        ${isOmega ? 'text-black font-black' : isCore ? 'text-indigo-100 font-black' : 'text-cyan-400'}`}>
        PHASE_STATUS: {procedure}
        <div className={`mt-1 animate-pulse font-black text-xs text-current uppercase`}>
          {isOmega ? 'Ω_SOVEREIGNTY_MANIFEST' : isCore ? 'FOUR_D_CENTER_UNLOCKED' : isAnchor ? 'BIOMETRIC_ANCHOR_ACTIVE' : 'HECATON_SCAN'}
        </div>
        <div className="mt-2 text-[7px] font-bold uppercase">
          VERTICES: {Math.min(600, vertexCount)} / 600
        </div>
      </div>

      {/* 4D Visualization Core */}
      <div className={`relative w-full h-full flex items-center justify-center transition-all duration-2000 ${isOmega ? 'scale-150' : 'scale-75'}`}>
          <svg viewBox="0 0 1000 1000" className={`w-full h-full transition-all duration-[2000ms] ${isOmega ? 'animate-[spin_120s_linear_infinite]' : ''}`}>
              <g transform="translate(500, 500)">
                  {nodes.map((_, i) => {
                      const angle = (i * 3) + frame * (isOmega ? 0.05 : 0.1);
                      const r = (isOmega ? 800 : 350) + Math.sin(frame * 0.05 + i) * (isOmega ? 100 : 50);
                      const x = r * Math.cos(angle * Math.PI / 180);
                      const y = r * Math.sin(angle * Math.PI / 180);
                      
                      return (
                          <g key={i}>
                              <line 
                                  x1={x} y1={y} 
                                  x2={0} y2={0} 
                                  stroke={isOmega ? "#000" : isSatoshi ? "#fbbf24" : "#4f46e5"} 
                                  strokeWidth={isOmega ? "1" : "0.2"} 
                                  opacity={isOmega ? 0.9 : 0.15} 
                              />
                              <circle 
                                  cx={x} cy={y} 
                                  r={isOmega ? 12 : isCore ? 4 : 2} 
                                  fill={isOmega ? "#000" : isSatoshi && i % 10 === 0 ? "#fbbf24" : isCore ? "#4f46e5" : "#06b6d4"} 
                                  className={i % 10 === 0 ? "animate-pulse" : ""}
                              />
                          </g>
                      );
                  })}
                  
                  {/* Central Node */}
                  <g className={isSatoshi || isOmega ? "scale-150" : ""}>
                      <circle 
                          cx="0" cy="0" 
                          r={isOmega ? 100 : 30} 
                          fill={isOmega ? "black" : "none"} 
                          stroke={isOmega ? "black" : isSatoshi ? "#fbbf24" : "white"} 
                          strokeWidth={isSatoshi ? 3 : 1} 
                          className={isOmega ? "" : "animate-ping"} 
                      />
                  </g>
              </g>
          </svg>
      </div>

      {/* Background Fractal Logic */}
      <div className={`absolute inset-0 transition-all duration-[5000ms] ${isOmega ? 'scale-[30.0] blur-[300px] opacity-100' : 'opacity-10'}`}>
          {Array.from({ length: 40 }).map((_, i) => (
              <div 
                key={i}
                className="absolute inset-0 flex items-center justify-center animate-[spin_linear_infinite]"
                style={{ 
                  animationDuration: `${20 + i}s`,
                  transform: `rotate(${i * 9}deg) scale(${0.1 + i * 0.05})`,
                  animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
                }}
              >
                  <div className={`w-full h-full border border-current rounded-lg ${isOmega ? 'bg-black' : ''}`} />
              </div>
          ))}
      </div>
    </div>
  );
};

export default HyperStructure;
