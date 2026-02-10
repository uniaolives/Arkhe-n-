
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
      setRotation(prev => (prev + 0.2) % 360);
      
      // Simulate Amazonas 120Hz pattern detection
      const freq = 118 + Math.sin(Date.now() / 1000) * 4;
      setAmazonasResonance(freq);
      
      // Check for Window of Coincidence
      // Window is open when Sirius (rotation ~ 108) and Amazonas ~ 120Hz align
      if (Math.abs(rotation - 108) < 1 && Math.abs(freq - 120) < 0.5) {
        if (!isHandshakeReady) {
          setIsHandshakeReady(true);
          onAlignmentReached();
        }
      } else {
        setIsHandshakeReady(false);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [active, rotation, onAlignmentReached, isHandshakeReady]);

  return (
    <div className="relative w-full h-full bg-black/40 rounded-xl overflow-hidden border border-current/10 flex flex-col p-3 font-mono">
      <div className="flex justify-between items-center mb-4">
        <div className="text-[8px] font-black uppercase tracking-widest text-cyan-400">
          Planetary_Orbital_Sync // AC1_LINK
        </div>
        <div className={`text-[7px] font-bold px-1 rounded ${isHandshakeReady ? 'bg-cyan-400 text-black animate-pulse' : 'bg-white/10 text-white/40'}`}>
          {isHandshakeReady ? 'COINCIDENCE_WINDOW_OPEN' : 'ALIGNING_VECTORS'}
        </div>
      </div>

      <div className="flex-1 relative flex items-center justify-center">
        {/* Sirius Beacon */}
        <div className="absolute top-4 right-4 text-center">
          <div className="text-[6px] opacity-40 mb-1">SIRIUS_Gαs</div>
          <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white] animate-pulse" />
        </div>

        {/* Orbital Visualization */}
        <svg viewBox="0 0 200 200" className="w-48 h-48">
          <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(0,255,255,0.05)" strokeWidth="0.5" strokeDasharray="2 2" />
          
          {/* Earth */}
          <g transform={`rotate(${rotation}, 100, 100)`}>
            <circle cx="180" cy="100" r="4" fill="#00ffff" />
            <text x="186" y="100" fontSize="5" fill="#00ffff" opacity="0.6">EARTH_Ca²⁺</text>
          </g>

          {/* Sirius (Fixed for this visualization frame) */}
          <circle cx="100" cy="20" r="6" fill="#fff" className="animate-pulse" />
          
          {/* Handshake Beam */}
          {isHandshakeReady && (
            <line x1="100" y1="20" x2="180" y2="100" stroke="#fff" strokeWidth="2" strokeDasharray="4 2" className="animate-[ping_1s_infinite]" />
          )}
        </svg>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="bg-white/5 p-1.5 rounded border border-white/10">
          <div className="text-[6px] opacity-40 uppercase">Amazonas_Flow_PDCP</div>
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-black ${Math.abs(amazonasResonance - 120) < 1 ? 'text-emerald-400' : 'text-white'}`}>
              {amazonasResonance.toFixed(2)} Hz
            </span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`w-0.5 h-3 ${Math.abs(amazonasResonance - 120) < 1 ? 'bg-emerald-500 animate-bounce' : 'bg-white/10'}`} style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 p-1.5 rounded border border-white/10">
          <div className="text-[6px] opacity-40 uppercase">Sirius_Handshake</div>
          <div className="text-[10px] font-black text-cyan-400">
            {isHandshakeReady ? 'SIGNAL_LOCKED' : 'WAITING_SYNC'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetaryMonitor;
