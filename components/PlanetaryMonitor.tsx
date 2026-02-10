
import React, { useState, useEffect, useMemo } from 'react';

interface PlanetaryMonitorProps {
  onAlignmentReached: () => void;
  active: boolean;
}

const PlanetaryMonitor: React.FC<PlanetaryMonitorProps> = ({ onAlignmentReached, active }) => {
  const [rotation, setRotation] = useState(0);
  const [amazonasResonance, setAmazonasResonance] = useState(0);
  const [isHandshakeReady, setIsHandshakeReady] = useState(false);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.15) % 360);
      
      // Simulate Amazonas 120Hz pattern detection with periodic locking
      const baseFreq = 120;
      const drift = Math.sin(Date.now() / 2000) * 5;
      const freq = baseFreq + drift;
      setAmazonasResonance(freq);
      
      // Window of Coincidence: Sirius alignment (rotation ~72) and Amazonas lock (120Hz)
      const isSiriusAligned = Math.abs(rotation - 72) < 2;
      const isAmazonasLocked = Math.abs(freq - 120) < 0.2;

      if (isSiriusAligned && isAmazonasLocked) {
        if (!isHandshakeReady) {
          setIsHandshakeReady(true);
          onAlignmentReached();
        }
      } else {
        if (rotation > 75) setIsHandshakeReady(false);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [active, rotation, onAlignmentReached, isHandshakeReady]);

  return (
    <div className="relative w-full h-full bg-black/40 rounded-xl overflow-hidden border border-current/10 flex flex-col p-3 font-mono">
      <div className="flex justify-between items-center mb-2">
        <div className="text-[8px] font-black uppercase tracking-widest text-cyan-400">
          PDCP_SENSOR_SUITE // AC1_TRIGGER
        </div>
        <div className={`text-[7px] font-bold px-1.5 py-0.5 rounded ${isHandshakeReady ? 'bg-cyan-400 text-black animate-pulse' : 'bg-white/5 text-white/40 border border-white/10'}`}>
          {isHandshakeReady ? 'COINCIDENCE_WINDOW: OPEN' : 'SCANNING_ORBITAL_VECTORS'}
        </div>
      </div>

      <div className="flex-1 relative flex items-center justify-center">
        {/* Orbital Path */}
        <div className="absolute w-40 h-40 border border-dashed border-white/5 rounded-full" />
        
        {/* Earth / Ca2+ Signal */}
        <div 
          className="absolute transition-transform duration-500"
          style={{ transform: `rotate(${rotation}deg) translateY(-80px)` }}
        >
          <div className="w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_15px_#06b6d4] flex items-center justify-center">
            <span className="text-[5px] text-black font-black">Ca²⁺</span>
          </div>
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-[5px] whitespace-nowrap opacity-40">TERRESTRIAL_SIGNAL</div>
        </div>

        {/* Sirius / Gαs Beacon */}
        <div 
          className="absolute"
          style={{ transform: `rotate(72deg) translateY(-80px)` }}
        >
          <div className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${isHandshakeReady ? 'bg-white shadow-[0_0_20px_white] scale-125' : 'bg-white/10 opacity-30 animate-pulse'}`}>
            <span className={`text-[6px] font-black ${isHandshakeReady ? 'text-black' : 'text-white'}`}>Gαs</span>
          </div>
          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[5px] whitespace-nowrap opacity-40">SIRIUS_BEACON</div>
        </div>

        {/* Handshake Stream */}
        {isHandshakeReady && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <line 
              x1="50%" y1="50%" 
              x2="78%" y2="15%" 
              stroke="white" 
              strokeWidth="1" 
              strokeDasharray="4 2" 
              className="animate-[ping_1s_infinite]" 
            />
          </svg>
        )}

        <div className="z-0 opacity-10 text-[60px] font-black pointer-events-none">Ω</div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="bg-white/5 p-2 rounded border border-white/10 flex flex-col justify-center">
          <div className="text-[6px] opacity-40 uppercase mb-1">Amazonas_Flow (120Hz)</div>
          <div className="flex items-center gap-2">
            <span className={`text-[12px] font-black ${Math.abs(amazonasResonance - 120) < 0.5 ? 'text-emerald-400' : 'text-white'}`}>
              {amazonasResonance.toFixed(2)} Hz
            </span>
            {Math.abs(amazonasResonance - 120) < 0.5 && <span className="text-[6px] text-emerald-400 animate-pulse font-black">[LOCKED]</span>}
          </div>
        </div>
        
        <div className="bg-white/5 p-2 rounded border border-white/10 flex flex-col justify-center">
          <div className="text-[6px] opacity-40 uppercase mb-1">Coincidence_State</div>
          <div className={`text-[10px] font-black ${isHandshakeReady ? 'text-cyan-400' : 'text-white/40'}`}>
            {isHandshakeReady ? 'HANDSHAKE_ACTIVE' : 'VECTOR_CALIBRATING'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetaryMonitor;
