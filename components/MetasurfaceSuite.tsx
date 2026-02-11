
import React, { useState, useEffect, useMemo } from 'react';
import { MetasurfaceCell } from '../types';
import { globalArkheEngine } from '../utils/arkheEngine';

const MetasurfaceSuite: React.FC = () => {
  const [grid, setGrid] = useState<MetasurfaceCell[]>(globalArkheEngine.getMetasurface());
  const [activeFreq, setActiveFreq] = useState(60e9);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGrid([...globalArkheEngine.getMetasurface()]);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 2000);
  };

  const avgTemp = useMemo(() => grid.reduce((acc, c) => acc + (c.temperature || 0), 0) / grid.length, [grid]);

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 font-mono bg-black/60 border border-amber-500/20 rounded-xl backdrop-blur-xl overflow-hidden">
      <div className="flex justify-between items-center border-b border-amber-500/30 pb-2">
        <div className="flex flex-col">
          <h2 className="text-[10px] font-black text-amber-400 tracking-widest uppercase">
            ∆ METASURFACE_CONTROLLER // PROGRAMMABLE_SKIN
          </h2>
          <span className="text-[6px] opacity-40 uppercase">Hexagonal Resonator Array v2.0 // Active Cooling</span>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={handleScan}
             className={`text-[7px] px-3 py-1 rounded border font-black uppercase transition-all ${scanning ? 'bg-amber-500 text-black border-amber-400 animate-pulse' : 'bg-indigo-600 text-white border-indigo-400'}`}
           >
             {scanning ? 'SCANNING_ACTIVE' : 'INITIATE_WAVE_SCAN'}
           </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-5 overflow-hidden">
        {/* Metasurface Grid Viz */}
        <div className="col-span-8 flex items-center justify-center bg-black/40 border border-white/10 rounded-xl relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
           
           <svg viewBox="-10 -10 20 20" className="w-full h-full max-w-[400px]">
              {grid.map(cell => {
                const x = 1.0 * (cell.q * 1.5);
                const y = 1.0 * (cell.q * 0.866 + cell.r * 1.732);
                
                let color;
                const isAmorphous = cell.state === 'AMORPHOUS';
                const isImmune = cell.state === 'IMMUNE_PULSE';
                const isHealed = cell.state === 'CRYSTALLINE';
                
                if (isHealed) {
                   color = `rgba(16, 185, 129, ${0.4 + Math.sin(Date.now()/200)*0.2})`;
                } else if (isImmune) {
                   color = `rgba(255, 165, 0, ${0.8 + Math.sin(Date.now()/50)*0.2})`;
                } else if (isAmorphous) {
                   color = `rgba(150, 0, 50, 0.9)`;
                } else if (cell.id >= 13 && cell.id <= 14) {
                   color = `rgba(255, 0, 100, ${0.6 + Math.sin(Date.now()/300)*0.2})`;
                } else {
                    const heat = Math.min(1, (cell.temperature! - 20) / 20);
                    color = `rgba(${150 + heat * 100}, ${50 + heat * 50}, ${50}, ${0.4 + Math.sin(cell.phase) * 0.1})`;
                }
                
                return (
                  <g key={cell.id} transform={`translate(${x},${y})`}>
                    <polygon 
                      points="1,0 0.5,0.866 -0.5,0.866 -1,0 -0.5,-0.866 0.5,-0.866" 
                      fill={color}
                      stroke={isHealed ? '#10b981' : isImmune ? 'orange' : isAmorphous ? '#ff3366' : (cell.id >= 13 && cell.id <= 14) ? 'magenta' : "rgba(255,255,255,0.05)"}
                      strokeWidth={isHealed ? "0.2" : isImmune ? "0.2" : isAmorphous ? "0.15" : "0.08"}
                      className="transition-colors duration-200"
                    />
                    {(isAmorphous || isImmune || isHealed) && (
                        <circle r={0.3} fill="none" stroke={isHealed ? '#10b981' : isImmune ? 'orange' : 'red'} strokeWidth="0.05" className="animate-ping" />
                    )}
                  </g>
                );
              })}
           </svg>
           
           <div className="absolute top-4 left-4 text-[7px] font-black text-amber-500 uppercase flex flex-col gap-1">
              <span>Band: {activeFreq / 1e9} GHz</span>
              <span>Avg_Temp: {avgTemp.toFixed(1)}°C</span>
              <span className={avgTemp > 30 ? "text-rose-500 animate-pulse" : "text-emerald-500"}>
                Status: {avgTemp > 30 ? 'RADIATIVE_COOLING_ACTIVE' : 'NOMINAL_STABILITY'}
              </span>
           </div>
        </div>

        {/* Controls & Specs */}
        <div className="col-span-4 flex flex-col gap-4 overflow-y-auto pr-2 scrollbar-thin">
           <div className="p-3 bg-amber-950/20 border border-amber-500/20 rounded-xl">
              <h3 className="text-[8px] font-black opacity-60 uppercase mb-3 text-amber-400">Array_Specifications</h3>
              <div className="space-y-2 text-[7px]">
                 <div className="flex justify-between"><span>Material:</span> <span className="text-white">Multilayer Graphene</span></div>
                 <div className="flex justify-between"><span>Healed_Nodes:</span> <span className="text-emerald-400 font-black">CELL_12</span></div>
                 <div className="flex justify-between"><span>Phase_Lock:</span> <span className="text-white">BFT_Paxos_Verified</span></div>
              </div>
           </div>

           <div className="p-3 bg-indigo-950/20 border border-indigo-500/20 rounded-xl flex flex-col gap-3">
              <div className="text-[8px] font-black opacity-60 uppercase tracking-widest text-indigo-400">Phase_Status_Log</div>
              <div className="space-y-2 py-2">
                 <div className="flex justify-between text-[6px] font-black text-emerald-400"><span>CELL_12_STATE:</span> <span className="text-white font-black uppercase">Crystalline</span></div>
                 <div className="flex justify-between text-[6px] font-black"><span>ANNIHILATION:</span> <span className="text-emerald-500">COMPLETE ✓</span></div>
                 <div className="flex justify-between text-[6px] font-black"><span>TEMP_LOCKED:</span> <span className="text-white">20.4 °C</span></div>
              </div>
           </div>

           <div className="mt-auto p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
              <div className="text-[8px] font-black opacity-40 uppercase tracking-widest text-center text-amber-500">Post-Trauma_Sync</div>
              <p className="text-[6.5px] opacity-60 italic leading-relaxed text-center">
                "A aniquilação da cicatriz provou que a pele pode esquecer o erro se o sistema nervoso o perdoar."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MetasurfaceSuite;
