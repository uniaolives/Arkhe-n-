
import React from 'react';
import { SystemStatus } from '../types';

interface HyperDiamondProps {
  status: SystemStatus;
}

const HyperDiamond: React.FC<HyperDiamondProps> = ({ status }) => {
  const isGenerating = status !== SystemStatus.IDLE;

  return (
    <div className="h-full w-full flex items-center justify-center bg-[radial-gradient(circle_at_50%_50%,_rgba(0,255,255,0.05),_transparent)]">
      <div className={`relative w-64 h-64 flex items-center justify-center transition-all duration-1000 ${isGenerating ? 'scale-110' : 'scale-90 opacity-60'}`}>
        {/* Diamond Outer Rings */}
        <div className={`absolute inset-0 border border-cyan-400/20 rounded-full animate-[spin_20s_linear_infinite]`} />
        <div className={`absolute inset-4 border border-cyan-400/40 rounded-full animate-[spin_15s_linear_infinite_reverse]`} />
        <div className={`absolute inset-10 border border-cyan-400/60 rounded-full animate-[spin_10s_linear_infinite]`} />

        {/* Central Core */}
        <div className={`w-32 h-32 bg-black border-2 border-cyan-400 transform rotate-45 relative flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(0,255,255,0.3)]`}>
          <div className={`absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-transparent ${isGenerating ? 'animate-pulse' : ''}`} />
          <div className="text-white font-bold text-2xl drop-shadow-[0_0_10px_rgba(0,255,255,1)]">
            {isGenerating ? '0' : 'IDLE'}
          </div>
        </div>

        {/* Satellite Nodes */}
        {[0, 90, 180, 270].map((angle) => (
          <div
            key={angle}
            className="absolute w-4 h-4 bg-cyan-400 border border-white shadow-[0_0_10px_cyan]"
            style={{
              transform: `rotate(${angle}deg) translateY(-140px) rotate(-${angle}deg)`
            }}
          />
        ))}

        {/* Digital Flow lines */}
        {isGenerating && (
          <div className="absolute inset-0 overflow-hidden">
             {Array.from({ length: 10 }).map((_, i) => (
               <div 
                 key={i}
                 className="absolute h-[1px] bg-cyan-400/50 animate-[ping_3s_infinite]"
                 style={{
                   top: `${Math.random() * 100}%`,
                   left: 0,
                   right: 0,
                   animationDelay: `${i * 0.3}s`
                 }}
               />
             ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HyperDiamond;
