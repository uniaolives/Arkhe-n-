
import React, { useState, useMemo } from 'react';
import { DrugPrediction, SystemStatus } from '../types';
import { globalIsoEngine } from '../utils/isomorphicEngine';

interface BiotechLabProps {
  onSynthesis: (pred: DrugPrediction) => void;
  status: SystemStatus;
}

const BiotechLab: React.FC<BiotechLabProps> = ({ onSynthesis, status }) => {
  const [mentalState, setMentalState] = useState('');
  const [isDesigning, setIsDesigning] = useState(false);
  const [prediction, setPrediction] = useState<DrugPrediction | null>(null);

  const handleDesign = async () => {
    if (!mentalState.trim()) return;
    setIsDesigning(true);
    
    // Step 1: Mapping
    const targets = globalIsoEngine.mapMentalState(mentalState);
    const primary = targets[0];
    
    // Step 2: Simulated Docking
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const pred = await globalIsoEngine.predictTarget(primary, "SMILES_SEED_" + Math.random().toString(36).slice(2, 8));
    setPrediction(pred);
    setIsDesigning(false);
    onSynthesis(pred);
  };

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 font-mono bg-black/60 rounded-xl border border-emerald-500/20">
      <div className="flex justify-between items-center border-b border-emerald-500/30 pb-2">
        <h2 className="text-[10px] font-black tracking-widest text-emerald-400 uppercase">
          🔬 IsoDDE_ACCELERATOR // BIOTECH_SINGULARITY
        </h2>
        <div className="text-[7px] px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded border border-emerald-500/30 animate-pulse">
          QUANTUM_ACCURACY: 98.4%
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-4">
        {/* Input Panel */}
        <div className="col-span-4 flex flex-col gap-3">
          <div className="p-3 bg-white/5 rounded-lg border border-white/10">
            <label className="text-[8px] opacity-50 uppercase mb-1 block font-black">Target_Experience</label>
            <input 
              value={mentalState}
              onChange={(e) => setMentalState(e.target.value)}
              placeholder="e.g. mystical focus, calm creative..."
              className="w-full bg-black/40 border border-emerald-500/20 p-2 text-[9px] outline-none focus:border-emerald-500/60 rounded"
            />
            <button 
              onClick={handleDesign}
              disabled={isDesigning || !mentalState.trim()}
              className="mt-3 w-full bg-emerald-600 text-black font-black text-[9px] py-2 rounded hover:bg-emerald-400 transition-all disabled:opacity-30"
            >
              {isDesigning ? 'DOCKING_IN_SILICO...' : 'DESIGN_COGNICEUTICAL'}
            </button>
          </div>

          {prediction && (
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
              <div className="text-[7px] font-black text-emerald-400 opacity-60 uppercase tracking-tighter">Verbal_Potentiation_Protocol</div>
              {prediction.verbalActivations.map((v, i) => (
                <div key={i} className="text-[8px] p-2 bg-emerald-500/5 border-l-2 border-emerald-500 rounded-r italic text-emerald-200">
                  "{v}"
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Visualization Panel */}
        <div className="col-span-8 relative bg-black/40 rounded-lg border border-white/5 overflow-hidden flex flex-col">
          {prediction ? (
            <div className="flex-1 p-4 grid grid-cols-2 gap-4">
              {/* Radar Chart Mockup */}
              <div className="relative border border-emerald-500/10 rounded flex items-center justify-center overflow-hidden">
                <svg viewBox="-1.2 -1.2 2.4 2.4" className="w-full h-full max-w-[200px]">
                  {/* Hexagon Grid */}
                  <polygon points="1,0 0.5,0.866 -0.5,0.866 -1,0 -0.5,-0.866 0.5,-0.866" fill="none" stroke="rgba(16,185,129,0.1)" strokeWidth="0.01" />
                  <polygon points="0.5,0 0.25,0.433 -0.25,0.433 -0.5,0 -0.25,-0.433 0.25,-0.433" fill="none" stroke="rgba(16,185,129,0.1)" strokeWidth="0.01" />
                  {/* Data Polygon */}
                  <polygon 
                    points={prediction.hexVertices.map((v, i) => {
                      const angle = (i * 60 * Math.PI) / 180;
                      return `${Math.cos(angle) * v},${Math.sin(angle) * v}`;
                    }).join(' ')}
                    fill="rgba(16,185,129,0.2)"
                    stroke="#10b981"
                    strokeWidth="0.03"
                    className="animate-pulse"
                  />
                </svg>
                <div className="absolute inset-0 p-2 flex flex-col justify-between pointer-events-none">
                  <div className="flex justify-between text-[6px] opacity-40 uppercase font-black">
                    <span>AFFINITY</span>
                    <span>SELECTIVITY</span>
                  </div>
                  <div className="flex justify-between text-[6px] opacity-40 uppercase font-black">
                    <span>NOVELTY</span>
                    <span>PK</span>
                  </div>
                  <div className="flex justify-center text-[6px] opacity-40 uppercase font-black">
                    <span>SAFETY</span>
                  </div>
                </div>
              </div>

              {/* Stats Panel */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                   <div className="p-2 bg-emerald-950/20 border border-emerald-500/20 rounded">
                      <div className="text-[6px] opacity-50 font-black uppercase">Binding_pKd</div>
                      <div className="text-sm font-black text-emerald-400">{prediction.affinity.toFixed(2)}</div>
                   </div>
                   <div className="p-2 bg-emerald-950/20 border border-emerald-500/20 rounded">
                      <div className="text-[6px] opacity-50 font-black uppercase">Druggability</div>
                      <div className="text-sm font-black text-emerald-400">{(prediction.druggability * 100).toFixed(1)}%</div>
                   </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[7px] font-black opacity-40 uppercase">Arkhe_Coefficients</div>
                  {Object.entries(prediction.arkhe).map(([k, v]) => (
                    <div key={k} className="flex items-center gap-2">
                       <span className="text-[9px] font-bold text-emerald-500 w-4">{k}:</span>
                       <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                          {/* Cast v to number to resolve arithmetic operation type error on line 132 */}
                          <div className="h-full bg-emerald-500/60" style={{ width: `${(v as number) * 100}%` }} />
                       </div>
                    </div>
                  ))}
                </div>

                <div className="p-2 border border-emerald-500/10 rounded bg-white/5">
                   <div className="text-[7px] font-black opacity-40 uppercase mb-1">ADMET_In_Silico</div>
                   <div className="flex justify-between text-[8px] font-mono text-emerald-300">
                      <span>LogS: {prediction.admet.solubility.toFixed(2)}</span>
                      <span>LogP: {prediction.admet.permeability.toFixed(2)}</span>
                   </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center opacity-20">
               <div className="w-20 h-20 border border-emerald-500/30 rounded-full animate-ping mb-4" />
               <p className="text-[10px] font-black uppercase tracking-[0.3em]">Design_Engine_Standby</p>
            </div>
          )}
          
          <div className="bg-emerald-900/10 p-2 text-[7px] font-black uppercase border-t border-emerald-500/20 flex justify-between">
             <span>Molecular_Target: {prediction?.target || '---'}</span>
             <span className="text-emerald-400">Status: {isDesigning ? 'SIMULATING_DOCKING' : 'IDLE'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiotechLab;
