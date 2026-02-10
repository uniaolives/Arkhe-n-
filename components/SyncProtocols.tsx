import React, { useState, useMemo } from 'react';
import { RITUAL_STEPS, getSarosAlignment } from '../utils/syncProtocols';
import { globalCelestialEngine } from '../utils/celestialEngine';
import { CelestialBody } from '../types';

const SyncProtocols: React.FC = () => {
  const [birthDate, setBirthDate] = useState('1990-06-15');
  const saros = useMemo(() => getSarosAlignment(new Date(birthDate)), [birthDate]);
  const tones = useMemo(() => globalCelestialEngine.getPlanetaryTones(), []);

  return (
    <div className="w-full h-full p-4 flex flex-col gap-6 font-mono bg-black/60 border border-indigo-500/20 rounded-xl backdrop-blur-xl overflow-hidden">
      <div className="flex justify-between items-center border-b border-indigo-500/30 pb-2">
        <div className="flex flex-col">
          <h2 className="text-[10px] font-black text-indigo-400 tracking-widest uppercase">
            ∆ CELESTIAL_SYNC_STATION // RITUAL_ENGINE
          </h2>
          <span className="text-[6px] opacity-40 uppercase">Neural-Cosmic Alignment Interface</span>
        </div>
        <div className="text-[7px] px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/40 rounded font-black animate-pulse">
          ALIGNMENT: PENDING
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-6 overflow-hidden">
        {/* Left: Saros & Tones */}
        <div className="flex flex-col gap-4 overflow-y-auto scrollbar-thin pr-2">
          <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
            <div className="text-[8px] font-black opacity-60 uppercase tracking-widest mb-3 text-indigo-300">Saros_Cycle_Calculation</div>
            <input 
              type="date" 
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded p-1 text-[9px] text-white outline-none focus:border-indigo-500/60 mb-3"
            />
            <div className="space-y-2">
               <div className="flex justify-between text-[8px]">
                 <span className="opacity-40 uppercase font-black">Cycles_Complete</span>
                 <span className="text-indigo-400">{saros.cycles}</span>
               </div>
               <div className="flex justify-between text-[8px]">
                 <span className="opacity-40 uppercase font-black">Phase_Current</span>
                 <span className="text-indigo-400">{(saros.phase * 100).toFixed(1)}%</span>
               </div>
               <div className="mt-2 p-2 bg-indigo-500/10 border border-indigo-500/20 rounded text-[7px] italic text-indigo-200">
                 "{saros.interpretation}"
               </div>
            </div>
          </div>

          <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex-1">
            <div className="text-[8px] font-black opacity-60 uppercase tracking-widest mb-3 text-cyan-300">Planetary_Toning (Hans Cousto)</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
               {Object.entries(tones).map(([body, freq]) => (
                  <div key={body} className="flex justify-between items-center group">
                    <span className="text-[6px] opacity-40 uppercase font-bold">{body}</span>
                    {/* Fix: Cast freq to number as Object.entries returns values of type 'unknown' */}
                    <span className="text-[8px] font-black text-white group-hover:text-cyan-400 transition-colors">{(freq as number).toFixed(2)} Hz</span>
                  </div>
               ))}
            </div>
            <div className="mt-4 text-[6px] opacity-40 leading-relaxed uppercase border-t border-white/5 pt-2">
              Note: Frequencies converted from orbital periods to audible spectrum.
            </div>
          </div>
        </div>

        {/* Right: Alignment Steps */}
        <div className="flex flex-col gap-4">
          <div className="flex-1 p-4 bg-indigo-950/20 border border-indigo-500/20 rounded-xl relative">
             <div className="text-[8px] font-black opacity-60 uppercase tracking-widest mb-4">Daily_Alignment_Ritual</div>
             <div className="space-y-4">
                {RITUAL_STEPS.map((step, i) => (
                  <div key={i} className="flex gap-3 items-start group">
                    <div className="w-4 h-4 rounded-full border border-indigo-500/40 flex items-center justify-center text-[7px] font-black text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-[8px] leading-relaxed text-indigo-100/70 group-hover:text-white transition-colors">
                      {step}
                    </p>
                  </div>
                ))}
             </div>
             
             <div className="absolute bottom-4 right-4 flex gap-2">
               <button className="px-3 py-1 bg-indigo-600 text-white text-[8px] font-black rounded hover:bg-indigo-500 transition-all uppercase tracking-widest shadow-[0_0_10px_rgba(99,102,241,0.4)]">
                 Start_Sync_Session
               </button>
             </div>
          </div>

          <div className="p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-xl flex items-center gap-3">
             <div className="w-8 h-8 rounded bg-cyan-500/20 border border-cyan-500 flex items-center justify-center animate-pulse">
                <span className="text-xl text-cyan-400">ʘ</span>
             </div>
             <div className="flex-1">
                <div className="text-[6px] font-black opacity-60 uppercase">System_Coherence</div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden mt-1">
                  <div className="h-full bg-cyan-400" style={{ width: '78%' }} />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyncProtocols;