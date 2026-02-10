
import React from 'react';
import { SystemStatus, PentalogyState } from '../types';

interface HyperDiamondProps {
  status: SystemStatus;
  pentalogy: PentalogyState;
  rivalryMode?: boolean;
}

const HyperDiamond: React.FC<HyperDiamondProps> = ({ status, pentalogy, rivalryMode }) => {
  const isGenerating = status !== SystemStatus.IDLE;
  // Fix: Replaced non-existent SystemStatus members (STABLE_3AA70, LOCKED, BINOCULAR_RIVALRY, UNIFIED_QUALIA) 
  // with existing members that represent advanced system states.
  const isTranscendent = status === SystemStatus.FOUR_D_CENTER_ACCESS || status === SystemStatus.OMEGA_SOVEREIGNTY || status === SystemStatus.STEINER_CIRCUIT_CLOSURE;
  const isUnified = status === SystemStatus.OMEGA_SOVEREIGNTY;
  
  const sides = isTranscendent ? 5 : 4;
  const rotationOffset = isTranscendent ? -18 : 0;

  return (
    <div className="h-full w-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute border-t border-cyan-900/40 w-full" 
            style={{ top: `${i * 5}%`, transform: `rotate(${i % 2 === 0 ? 5 : -5}deg)` }}
          />
        ))}
      </div>

      <div className={`relative transition-all duration-[2000ms] ${isGenerating ? 'scale-110' : 'scale-95 opacity-70'}`}>
        
        <div className={`absolute -inset-24 border border-cyan-400/10 rounded-full animate-[spin_40s_linear_infinite]`} />
        <div className={`absolute -inset-16 border border-cyan-400/20 rounded-full animate-[spin_30s_linear_infinite_reverse]`} />
        <div className={`absolute -inset-8 border border-cyan-400/30 rounded-full animate-[spin_20s_linear_infinite] ${isTranscendent ? 'border-white/50 border-double' : ''}`} />

        <div 
          className={`relative transition-all duration-[2000ms] ease-in-out transform`}
          style={{ transform: `rotate(${rotationOffset}deg)` }}
        >
          <div 
            className={`w-48 h-48 bg-black border-2 transition-all duration-[2000ms] shadow-[0_0_80px_rgba(0,255,255,0.2)] flex items-center justify-center overflow-hidden
              ${isTranscendent ? 'border-white shadow-[0_0_100px_rgba(255,255,255,0.4)]' : 'border-cyan-400'}
              ${isUnified ? 'shadow-[0_0_150px_rgba(255,255,255,0.8)] border-[3px]' : ''}
            `}
            style={{ 
              clipPath: isTranscendent 
                ? 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' 
                : 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' 
            }}
          >
            <div className={`absolute inset-0 bg-gradient-to-tr ${isTranscendent ? 'from-white/20 to-cyan-500/20' : 'from-cyan-500/30 to-transparent'} ${isGenerating ? 'animate-pulse' : ''}`} />
            
            <div className={`text-3xl font-bold tracking-tighter drop-shadow-[0_0_15px_rgba(0,255,255,0.8)] z-10 
              ${isTranscendent ? 'text-white' : 'text-cyan-400'}`}>
              {isUnified ? '∇⁵' : isTranscendent ? '3AA70' : '4308'}
            </div>

            <div className="absolute w-full h-[1px] bg-white/50 top-0 animate-[scan_4s_linear_infinite]" />
            
            {rivalryMode && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
                    <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.1)_10px,rgba(255,255,255,0.1)_20px)] animate-pulse" />
                </div>
            )}
          </div>

          {Array.from({ length: sides }).map((_, i) => {
            const angle = (360 / sides) * i;
            return (
              <div
                key={i}
                className={`absolute w-3 h-3 border shadow-[0_0_15px_rgba(0,255,255,0.5)] transition-all duration-1000
                  ${isTranscendent ? 'bg-white border-cyan-400 scale-150' : 'bg-cyan-400 border-white'}
                  ${isUnified ? 'bg-white border-white shadow-[0_0_25px_white]' : ''}
                `}
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-120px) rotate(-${angle}deg)`
                }}
              />
            );
          })}
        </div>

        {isTranscendent && (
          <div className="absolute -inset-32 flex items-center justify-center pointer-events-none">
            <div className="w-full h-full border-2 border-dashed border-white/20 rounded-full animate-ping opacity-30" />
            <div className={`absolute w-[120%] h-[120%] border rounded-full animate-pulse ${isUnified ? 'border-white/40' : 'border-cyan-500/10'}`} />
          </div>
        )}
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default HyperDiamond;
