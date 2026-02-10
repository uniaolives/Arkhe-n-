
import React, { useState, useEffect } from 'react';
import { VerbalPolarity, BioChemicalEvent } from '../types';
import { analyzeVerbalChemistry, reframeStatement } from '../utils/verbalEngine';
import { globalProcessor } from '../utils/eventProcessor';
import WaterStructure from './WaterStructure';

interface VerbalScannerProps {
  onImpactChange: (impact: any) => void;
  onLog: (msg: string, type: any, hash?: string) => void;
  onStatsUpdate: () => void;
}

const VerbalScanner: React.FC<VerbalScannerProps> = ({ onImpactChange, onLog, onStatsUpdate }) => {
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState<any>(analyzeVerbalChemistry(''));
  const [detoxDay, setDetoxDay] = useState(1);

  useEffect(() => {
    if (input.length > 5) {
      const res = analyzeVerbalChemistry(input);
      setAnalysis(res);
      onImpactChange(res.impact);
      
      const { status, hash } = globalProcessor.processVerbalEvent(input, res);
      if (status === 'SUCCESS') {
        onLog(input, 'event', hash);
        onStatsUpdate();
      }
    }
  }, [input]);

  const handleRefinement = () => {
    const reframed = reframeStatement(input);
    setInput(reframed);
    onLog(`REFRAMED: ${reframed}`, 'chemistry');
  };

  const getPolarityColor = (p: VerbalPolarity) => {
    switch (p) {
      case VerbalPolarity.COHERENT: return 'text-emerald-400';
      case VerbalPolarity.CONSTRUCTIVE: return 'text-cyan-400';
      case VerbalPolarity.TOXIC: return 'text-rose-500';
      case VerbalPolarity.DISRUPTIVE: return 'text-amber-500';
      default: return 'text-neutral-500';
    }
  };

  return (
    <div className="flex flex-col h-full gap-2">
      <div className="h-1 w-full rounded-full overflow-hidden flex bg-white/5">
        <div className="h-full bg-rose-600 transition-all duration-500" style={{ width: analysis.charge < 0 ? `${Math.abs(analysis.charge) * 100}%` : '0%' }} />
        <div className="h-full bg-cyan-400 transition-all duration-500" style={{ width: analysis.charge > 0 ? `${analysis.charge * 100}%` : '0%' }} />
      </div>

      <div className="relative group">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Initiate verbal bio-cascade..."
          className="w-full bg-black/40 border border-current/20 p-2 text-[9px] h-14 outline-none transition-all focus:border-current/60 rounded-lg resize-none font-mono"
        />
        <div className="absolute bottom-2 right-2 flex gap-1">
          <button 
            onClick={handleRefinement}
            className="text-[6px] font-black bg-current text-black px-2 py-0.5 rounded hover:opacity-80 transition-all uppercase shadow-[0_0_10px_currentColor]"
          >
            Refit_Resonance
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
         <div className="flex flex-col justify-center gap-1">
            <div className={`text-[8px] font-black tracking-widest uppercase ${getPolarityColor(analysis.polarity)}`}>
              {analysis.polarity} SIG
            </div>
            <div className="text-[7px] opacity-60 font-mono">λ: {analysis.photonic.wavelength.toFixed(1)}nm</div>
            <div className="text-[7px] opacity-60 font-mono">ν: {analysis.photonic.frequency.toFixed(2)}THz</div>
            
            {/* Mini Cascade Timeline */}
            <div className="mt-2 space-y-1">
               {analysis.cascade?.slice(0, 4).map((e: BioChemicalEvent) => (
                 <div key={e.type} className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity cursor-help">
                    <div className="w-1 h-1 rounded-full bg-current" />
                    <span className="text-[5px] font-black truncate">{e.type.replace('_', ' ')}</span>
                 </div>
               ))}
            </div>
         </div>
         <WaterStructure coherence={analysis.photonic.waterCoherence} charge={analysis.charge} />
      </div>

      <div className="mt-auto border-t border-white/10 pt-2">
        <div className="flex justify-between text-[6px] font-black uppercase mb-1.5">
          <span>Detox_Protocol</span>
          <span className="opacity-40">Day {detoxDay}/7</span>
        </div>
        <div className="flex gap-1">
          {[1,2,3,4,5,6,7].map(d => (
            <div 
              key={d}
              onClick={() => setDetoxDay(d)}
              className={`flex-1 h-1 rounded-sm cursor-pointer transition-all ${d <= detoxDay ? 'bg-current shadow-[0_0_3px_currentColor]' : 'bg-white/10'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerbalScanner;
