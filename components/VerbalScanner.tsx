
import React, { useState, useEffect } from 'react';
import { VerbalPolarity } from '../types';
import { analyzeVerbalChemistry, reframeStatement } from '../utils/verbalEngine';
import { globalProcessor } from '../utils/eventProcessor';

interface VerbalScannerProps {
  onImpactChange: (entropy: number) => void;
  onLog: (msg: string, type: any, hash?: string) => void;
  onStatsUpdate: () => void;
}

const VerbalScanner: React.FC<VerbalScannerProps> = ({ onImpactChange, onLog, onStatsUpdate }) => {
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState(analyzeVerbalChemistry(''));
  const [detoxDay, setDetoxDay] = useState(1);

  useEffect(() => {
    const res = analyzeVerbalChemistry(input);
    setAnalysis(res);
    onImpactChange(res.impact.entropy);
    
    if (input.length > 5) {
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

  const Gauge = ({ label, value, color }: { label: string, value: number, color: string }) => {
    const normalized = Math.max(0, Math.min(100, (value + 1) * 50));
    return (
      <div className="flex-1 min-w-[50px]">
        <div className="flex justify-between text-[5px] font-black uppercase mb-1 opacity-50">
          <span>{label}</span>
        </div>
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${color}`} 
            style={{ width: `${normalized}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full gap-2">
      <div className="relative group">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Quantum_Input_Stream_L0..."
          className="w-full bg-black/40 border border-current/20 p-2 text-[9px] h-16 outline-none transition-all focus:border-current/60 rounded-lg resize-none font-mono"
        />
        <div className="absolute bottom-2 right-2 flex gap-1">
          <button 
            onClick={handleRefinement}
            className="text-[6px] font-black bg-current text-black px-2 py-0.5 rounded hover:opacity-80 transition-all uppercase"
          >
            Refit_Resonance
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center px-1">
        <div className={`text-[8px] font-black tracking-widest uppercase ${getPolarityColor(analysis.polarity)}`}>
          {analysis.polarity} SIG
        </div>
        <div className="text-[7px] opacity-40 font-mono">
          δ_CHG: {analysis.charge.toFixed(2)}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-1.5 bg-white/5 p-1.5 rounded-lg border border-white/5">
        <Gauge label="CORT" value={analysis.impact.cortisol} color="bg-rose-500" />
        <Gauge label="DHEA" value={analysis.impact.dhea} color="bg-emerald-500" />
        <Gauge label="IgA" value={analysis.impact.iga} color="bg-cyan-500" />
        <Gauge label="BDNF" value={analysis.impact.bdnf} color="bg-amber-400" />
        <Gauge label="ENT" value={analysis.impact.entropy} color="bg-white" />
      </div>

      <div className="mt-auto border-t border-white/10 pt-2">
        <div className="flex justify-between text-[6px] font-black uppercase mb-1.5">
          <span>Detox: Day {detoxDay}/7</span>
          <span className="opacity-40">Task: {
            ['Awareness', 'Interruption', 'Replacement', 'Healing', 'Integration', 'Amplification', 'Mastery'][detoxDay-1]
          }</span>
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
