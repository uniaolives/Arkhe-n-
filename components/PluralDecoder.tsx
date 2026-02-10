
import React, { useState, useEffect } from 'react';
import { PluralProfile, BioEventType } from '../types';
import { globalPluralEngine } from '../utils/pluralEngine';

interface PluralDecoderProps {
  input: string;
  onAlert: (msg: string, type: string) => void;
}

const PluralDecoder: React.FC<PluralDecoderProps> = ({ input, onAlert }) => {
  const [profile, setProfile] = useState<PluralProfile | null>(null);
  const [history, setHistory] = useState<PluralProfile[]>([]);

  useEffect(() => {
    if (input.length > 20) {
      const { profile: newProfile, event } = globalPluralEngine.analyzeText(input);
      setProfile(newProfile);
      setHistory(prev => [...prev, newProfile].slice(-20));

      if (event === BioEventType.EPISTEMOLOGICAL_RUPTURE) {
        onAlert("RUPTURA EPISTEMOLÓGICA DETECTADA: Possível Switch de Identidade.", "plural");
      }
      if (event === BioEventType.LEXICAL_COMPLEXITY_PEAK) {
        onAlert("PICO DE COMPLEXIDADE LINGUÍSTICA: Superdotação em Mascaramento Ativo.", "plural");
      }
    }
  }, [input]);

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 font-mono bg-black/60 border border-indigo-500/20 rounded-xl backdrop-blur-xl">
      <div className="flex justify-between items-center border-b border-indigo-500/30 pb-2">
        <h2 className="text-[10px] font-black text-indigo-400 tracking-widest uppercase">
          ∆ PLURAL_IDENTITY_DECODER // 2E_PROTOCOL
        </h2>
        <div className="flex gap-2">
           <span className="text-[7px] px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/30 font-bold">
             ESTILOMETRIA: ATIVA
           </span>
        </div>
      </div>

      {profile ? (
        <div className="flex-1 grid grid-cols-2 gap-4 overflow-hidden">
          <div className="flex flex-col gap-3">
             <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="text-[7px] opacity-40 uppercase font-black mb-2">Lexical_Metric (TTR)</div>
                <div className="text-2xl font-black text-cyan-400">{(profile.ttr * 100).toFixed(1)}%</div>
                <div className="w-full h-1 bg-white/5 mt-2 rounded-full overflow-hidden">
                   <div className="h-full bg-cyan-400" style={{ width: `${profile.ttr * 100}%` }} />
                </div>
             </div>

             <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="text-[7px] opacity-40 uppercase font-black mb-2">Stability_Index</div>
                <div className={`text-2xl font-black ${profile.epistemologicalStability < 0.5 ? 'text-rose-500 animate-pulse' : 'text-emerald-400'}`}>
                   {(profile.epistemologicalStability * 100).toFixed(1)}%
                </div>
                <p className="text-[6px] opacity-40 mt-1 uppercase">Threshold: 35.0% for Rupture</p>
             </div>
          </div>

          <div className="flex flex-col gap-3">
             <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/10 relative overflow-hidden">
                <div className="text-[7px] opacity-40 uppercase font-black mb-2">Identity_Fragmentation_Graph</div>
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                   <svg viewBox="0 0 100 100" className="w-24 h-24">
                      {history.map((h, i) => (
                        <circle 
                          key={i} 
                          cx={50 + Math.sin(i) * 30} 
                          cy={50 + Math.cos(i) * 30} 
                          r={h.ttr * 5} 
                          fill={h.epistemologicalStability < 0.5 ? '#f43f5e' : '#6366f1'} 
                        />
                      ))}
                      <line x1="50" y1="50" x2="50" y2="10" stroke="white" strokeWidth="0.1" opacity="0.5" />
                   </svg>
                </div>
                <div className="relative z-10 space-y-1">
                   <div className="flex justify-between text-[8px]">
                      <span>Alters_Detected:</span>
                      <span className="text-white">{profile.detectedAlters}</span>
                   </div>
                   <div className="flex justify-between text-[8px]">
                      <span>Amnesic_Shadow:</span>
                      <span className="text-white">{(profile.amnesicShadow * 100).toFixed(0)}%</span>
                   </div>
                   <div className="flex justify-between text-[8px]">
                      <span>Complexity_Peak:</span>
                      <span className="text-white">{(profile.syntacticComplexity * 10).toFixed(1)}</span>
                   </div>
                </div>
             </div>

             <div className="p-2 bg-indigo-950/20 border border-indigo-500/20 rounded flex items-center justify-center text-center">
                <p className="text-[7px] leading-tight text-indigo-200/60 italic">
                  "O intelecto superior atua frequentemente como uma ferramenta de adaptação extrema..."
                </p>
             </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center opacity-20">
           <div className="w-12 h-12 border-2 border-indigo-500/30 rounded-full animate-spin border-t-transparent" />
           <p className="mt-4 text-[8px] font-black uppercase tracking-widest">Waiting for linguistic data...</p>
        </div>
      )}
    </div>
  );
};

export default PluralDecoder;
