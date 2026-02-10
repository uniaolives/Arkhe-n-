
import React, { useMemo, useState, useEffect } from 'react';
import { SystemStatus } from '../types';

interface HyperStructureProps {
  vertexCount: number;
  velocity: number;
  status: SystemStatus;
}

const HyperStructure: React.FC<HyperStructureProps> = ({ vertexCount, velocity, status }) => {
  const [frame, setFrame] = useState(0);
  
  // High-Resolution 600-Cell Vertex Projection (Simplified Mock for visualization)
  const vertices = useMemo(() => {
    return Array.from({ length: 120 }).map((_, i) => ({
      id: i,
      x: Math.cos(i * (Math.PI / 60)) * 300,
      y: Math.sin(i * (Math.PI / 60)) * 300,
      z: Math.sin(i * (Math.PI / 30)) * 200,
      w: Math.cos(i * (Math.PI / 15)) * 100,
    }));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(f => (f + 1) % 10000);
    }, 32);
    return () => clearInterval(interval);
  }, []);

  // Relativistic scaling and visual distortion
  const isApproachingC = Math.abs(velocity) > 0.8;
  const timeDilationFactor = 1 - Math.pow(velocity, 2);
  const rotationSpeed = 0.01 * timeDilationFactor;

  return (
    <div className="w-full h-full flex items-center justify-center bg-black/40 overflow-hidden relative group">
      {/* Grid Scanner Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5" 
           style={{ backgroundImage: `linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />

      <svg viewBox="0 0 1000 1000" className="w-full h-full transform transition-transform duration-1000">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        <g transform="translate(500, 500)">
          {/* Internal Connectors */}
          {vertices.slice(0, Math.min(vertexCount, 120)).map((v, i) => {
            const rotAngle = frame * rotationSpeed + i * 0.1;
            const x = (v.x * Math.cos(rotAngle) - v.z * Math.sin(rotAngle)) * (1 - Math.abs(velocity) * 0.5);
            const y = v.y * (1 + Math.abs(velocity) * 0.2);
            
            return (
              <line 
                key={`line-${i}`}
                x1={0} y1={0} x2={x} y2={y}
                stroke="currentColor"
                strokeWidth="0.3"
                opacity={0.15 * (1 - Math.abs(velocity) * 0.8)}
              />
            );
          })}

          {/* Render Active Photonic Vertices */}
          {vertices.slice(0, Math.min(vertexCount, 120)).map((v, i) => {
            const rotAngle = frame * rotationSpeed + i * 0.1;
            // Lorentz Contraction mock: Flatten x-axis based on velocity
            const x = (v.x * Math.cos(rotAngle) - v.z * Math.sin(rotAngle)) * Math.sqrt(1 - Math.pow(velocity, 2));
            const y = (v.y * Math.sin(rotAngle) + v.z * Math.cos(rotAngle));
            const size = (2 + Math.abs(v.w) / 40) * (isApproachingC ? 2 : 1);
            const opacity = 0.4 + (Math.sin(frame * 0.05 + i) + 1) / 4;

            return (
              <g key={`vertex-${i}`} className="cursor-crosshair">
                <circle 
                  cx={x} cy={y} r={size}
                  fill="currentColor"
                  opacity={opacity}
                  filter="url(#glow)"
                />
                {i % 20 === 0 && (
                   <text 
                    x={x + 10} y={y + 5} 
                    fontSize="6" fill="currentColor" 
                    opacity="0.3" fontStyle="italic"
                   >
                    λ{i}: {(v.w/100).toFixed(2)}
                   </text>
                )}
              </g>
            );
          })}

          {/* Center Singularity */}
          <circle 
            r={15 + Math.sin(frame * 0.1) * 2} 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            className="animate-pulse"
          />
          <path 
            d="M-25,0 L25,0 M0,-25 L0,25" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            opacity="0.5" 
          />
        </g>
      </svg>

      {/* Relativistic Feedback */}
      {isApproachingC && (
        <div className="absolute inset-0 pointer-events-none animate-pulse flex items-center justify-center">
           <div className="text-[10px] font-black tracking-[1em] text-white opacity-40">LORENTZ_LIMIT_WARNING</div>
        </div>
      )}
    </div>
  );
};

export default HyperStructure;
