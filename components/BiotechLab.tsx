
import React, { useState } from 'react';
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
    
    // Step 1: Mapping Mental State to Biological Targets
    const targets = globalIsoEngine.mapMentalState(mentalState);
    const primary = targets[0];
    
    // Step 2: Simulated Rational Design cycles
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const pred = await globalIsoEngine.predictTarget(primary, "ISO_GEN_" + Math.random().toString(36).slice(2, 10).toUpperCase());
    setPrediction(pred);
    setIsDesigning(false);
    onSynthesis(pred);
  };

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 font-mono bg-black/80 rounded-xl border border-emerald-500/20 backdrop-blur-xl">
      <div className="flex justify-between items-center border-b border-emerald-500/30 pb-3">
        <div className="flex flex-col">
          <h2 className="text-[11px] font-black tracking-[0.2em] text-emerald-400 uppercase">
            🧬 ISOMMORPHIC_REVOLUTION // ISO-DDE v4.0
          </h2>
          <span className="text-[6px] opacity-40 uppercase">Rational Drug Design @ Quantum Accuracy</span>
        </div>
        <div className="flex gap-2">
          <div className="text-[7px] px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded border border-emerald-500/30 font-bold">
            ALPHA_FOLD_3_ENGINE: ENGAGED
          </div>
          <div className="text-[7px] px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded border border-indigo-500/30 font-bold animate-pulse">
            LIVE_DOCKING: ACTIVE
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-5 overflow-hidden">
        {/* Design Input & Activation Section */}
        <div className="col-span-4 flex flex-col gap-4 overflow-y-auto pr-2 scrollbar-thin">
          <div className="p-4 bg-emerald-950/10 rounded-lg border border-emerald-500/20 shadow-inner">
            <label className="text-[8px] opacity-60 uppercase mb-2 block font-black tracking-widest text-emerald-400">Target_Consciousness_State</label>
            <textarea 
              value={mentalState}
              onChange={(e) => setMentalState(e.target.value)}
              placeholder="e.g. mystical focus, repair cellular damage, deep neural calm..."
              className="w-full bg-black/60 border border-emerald-500/20 p-3 text-[10px] outline-none focus:border-emerald-500/60 rounded h-20 resize-none transition-all placeholder:opacity-30"
            />
            <button 
              onClick={handleDesign}
              disabled={isDesigning || !mentalState.trim()}
              className="mt-4 w-full bg-emerald-500 text-black font-black text-[10px] py-2.5 rounded hover:bg-emerald-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(16,185,129,0.2)]"
            >
              {isDesigning ? 'ISODDE_SCREENING...' : 'ITERATE_MOLECULAR_LEAD'}
            </button>
          </div>

          {prediction && (
            <div className="flex flex-col gap-3 animate-fadeIn">
              <div className="text-[8px] font-black text-emerald-400 opacity-60 uppercase tracking-widest flex justify-between items-center">
                <span>Activation_Protocols</span>
                <span className="text-[6px] px-1 bg-emerald-500/20 rounded">Potentiation x1.4</span>
              </div>
              {prediction.verbalActivations.map((v, i) => (
                <div key={i} className="text-[9px] p-3 bg-emerald-900/10 border-l-4 border-emerald-500 rounded-r-lg italic text-emerald-100 leading-relaxed shadow-sm">
                  "{v}"
                </div>
              ))}
              
              <div className="mt-2 p-3 bg-indigo-900/10 border border-indigo-500/20 rounded-lg">
                <div className="text-[7px] font-black opacity-60 uppercase mb-2 text-indigo-400">Interaction_Fingerprint</div>
                <div className="flex flex-wrap gap-1">
                  {prediction.interactionTypes.map((type, idx) => (
                    <span key={idx} className="text-[6px] px-1.5 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Visualization Section */}
        <div className="col-span-8 bg-black/40 rounded-xl border border-white/5 flex flex-col relative overflow-hidden">
          {prediction ? (
            <div className="flex-1 p-5 grid grid-cols-2 gap-6 overflow-y-auto scrollbar-thin">
              {/* Schmidt State Hexagon (6-Vertex) */}
              <div className="flex flex-col gap-3">
                <div className="text-[8px] font-black opacity-60 uppercase tracking-widest text-center">Schmidt_Hexagonal_Design_Space</div>
                <div className="relative aspect-square flex items-center justify-center border border-emerald-500/10 rounded-xl bg-emerald-500/5">
                  <svg viewBox="-1.2 -1.2 2.4 2.4" className="w-full h-full max-w-[240px]">
                    {/* Hexagon Grid */}
                    <polygon points="1,0 0.5,0.866 -0.5,0.866 -1,0 -0.5,-0.866 0.5,-0.866" fill="none" stroke="rgba(16,185,129,0.15)" strokeWidth="0.015" />
                    <polygon points="0.7,0 0.35,0.606 -0.35,0.606 -0.7,0 -0.35,-0.606 0.35,-0.606" fill="none" stroke="rgba(16,185,129,0.1)" strokeWidth="0.01" />
                    <polygon points="0.4,0 0.2,0.346 -0.2,0.346 -0.4,0 -0.2,-0.346 0.2,-0.346" fill="none" stroke="rgba(16,185,129,0.1)" strokeWidth="0.01" />
                    
                    {/* Data Polygon Mapping */}
                    {/* Vertices order: Affinity, Selectivity, PK, Safety, Synthesizability, Novelty */}
                    <polygon 
                      points={`
                        ${Math.cos(0 * Math.PI / 3) * prediction.schmidtVertices.affinity},${Math.sin(0 * Math.PI / 3) * prediction.schmidtVertices.affinity}
                        ${Math.cos(1 * Math.PI / 3) * prediction.schmidtVertices.selectivity},${Math.sin(1 * Math.PI / 3) * prediction.schmidtVertices.selectivity}
                        ${Math.cos(2 * Math.PI / 3) * prediction.schmidtVertices.pk},${Math.sin(2 * Math.PI / 3) * prediction.schmidtVertices.pk}
                        ${Math.cos(3 * Math.PI / 3) * prediction.schmidtVertices.safety},${Math.sin(3 * Math.PI / 3) * prediction.schmidtVertices.safety}
                        ${Math.cos(4 * Math.PI / 3) * prediction.schmidtVertices.synthesizability},${Math.sin(4 * Math.PI / 3) * prediction.schmidtVertices.synthesizability}
                        ${Math.cos(5 * Math.PI / 3) * prediction.schmidtVertices.novelty},${Math.sin(5 * Math.PI / 3) * prediction.schmidtVertices.novelty}
                      `}
                      fill="rgba(16,185,129,0.25)"
                      stroke="#10b981"
                      strokeWidth="0.04"
                      className="animate-pulse"
                    />
                  </svg>
                  
                  {/* Labels for Schmidt Vertices */}
                  <div className="absolute inset-0 p-3 flex flex-col justify-between pointer-events-none text-[7px] font-black opacity-70">
                    <div className="flex justify-between uppercase">
                      <div className="flex flex-col items-start">
                        <span className="text-emerald-400">SELECTIVITY</span>
                        <span className="text-[5px] opacity-40 font-mono">C-E-I</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-emerald-400">AFFINITY</span>
                        <span className="text-[5px] opacity-40 font-mono">C-I-E</span>
                      </div>
                    </div>
                    <div className="flex justify-between uppercase">
                      <div className="flex flex-col items-start">
                        <span className="text-emerald-400">PK (ADME)</span>
                        <span className="text-[5px] opacity-40 font-mono">I-C-E</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-emerald-400">NOVELTY</span>
                        <span className="text-[5px] opacity-40 font-mono">E-I-C</span>
                      </div>
                    </div>
                    <div className="flex justify-between uppercase mt-auto mb-2 px-8">
                       <div className="flex flex-col items-center">
                        <span className="text-emerald-400">SAFETY</span>
                        <span className="text-[5px] opacity-40 font-mono">I-E-C</span>
                       </div>
                       <div className="flex flex-col items-center">
                        <span className="text-emerald-400">SYNTHESIS</span>
                        <span className="text-[5px] opacity-40 font-mono">E-C-I</span>
                       </div>
                    </div>
                  </div>
                </div>
                
                {/* Thermodynamics & Kinetics */}
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-[7px] opacity-40 uppercase font-black mb-1.5">Thermodynamics</div>
                    <div className="flex flex-col gap-1 text-[9px]">
                      <div className="flex justify-between"><span>ΔG:</span> <span className="text-emerald-400">{prediction.thermodynamics.deltaG.toFixed(2)}</span></div>
                      <div className="flex justify-between"><span>ΔH:</span> <span className="text-emerald-400">{prediction.thermodynamics.deltaH.toFixed(2)}</span></div>
                    </div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-[7px] opacity-40 uppercase font-black mb-1.5">Kinetics</div>
                    <div className="flex flex-col gap-1 text-[9px]">
                      <div className="flex justify-between"><span>τ_res:</span> <span className="text-indigo-400">{prediction.kinetics.residenceTime.toFixed(1)}s</span></div>
                      <div className="flex justify-between"><span>k_off:</span> <span className="text-indigo-400">{prediction.kinetics.koff.toExponential(1)}</span></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats, ADMET & Arkhe Coefficients */}
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-3">
                   <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl shadow-lg">
                      <div className="text-[7px] opacity-50 font-black uppercase text-emerald-400">Binding_pKd</div>
                      <div className="text-2xl font-black text-emerald-300 tracking-tighter">{prediction.affinity.toFixed(2)}</div>
                   </div>
                   <div className="p-3 bg-indigo-950/30 border border-indigo-500/30 rounded-xl shadow-lg">
                      <div className="text-[7px] opacity-50 font-black uppercase text-indigo-400">Druggability</div>
                      <div className="text-2xl font-black text-indigo-300 tracking-tighter">{(prediction.druggability * 100).toFixed(1)}%</div>
                   </div>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col gap-3">
                  <div className="text-[8px] font-black opacity-50 uppercase tracking-widest text-emerald-400">Arkhe_Quantum_Coefficients</div>
                  <div className="space-y-2.5">
                    {Object.entries(prediction.arkhe).map(([k, v]) => (
                      <div key={k} className="flex items-center gap-3">
                         <span className="text-[10px] font-black text-emerald-500 w-4">{k}</span>
                         <div className="flex-1 h-1.5 bg-black rounded-full overflow-hidden border border-white/5">
                            <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400" style={{ width: `${(v as number) * 100}%` }} />
                         </div>
                         <span className="text-[8px] opacity-40 w-8 text-right">{(v as number).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                   <div className="text-[8px] font-black opacity-50 uppercase tracking-widest text-emerald-400 mb-3">ADMET_In_Silico_Profile</div>
                   <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-[9px] font-mono">
                      <div className="flex flex-col">
                        <span className="opacity-40 uppercase text-[6px]">Solubility (LogS)</span>
                        <span className="text-emerald-300">{prediction.admet.solubility.toFixed(2)}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="opacity-40 uppercase text-[6px]">Permeability (LogP)</span>
                        <span className="text-emerald-300">{prediction.admet.permeability.toFixed(2)}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="opacity-40 uppercase text-[6px]">Hepatotoxicity</span>
                        <span className={prediction.admet.hepatoxicity > 0.1 ? "text-rose-400" : "text-emerald-300"}>{(prediction.admet.hepatoxicity * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="opacity-40 uppercase text-[6px]">Cardiotoxicity</span>
                        <span className={prediction.admet.cardiotoxicity > 0.1 ? "text-rose-400" : "text-emerald-300"}>{(prediction.admet.cardiotoxicity * 100).toFixed(1)}%</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center opacity-20">
               <div className="w-24 h-24 border-2 border-emerald-500/30 rounded-full animate-[ping_3s_linear_infinite] flex items-center justify-center">
                  <div className="w-12 h-12 border border-emerald-500/50 rounded-full animate-pulse" />
               </div>
               <p className="mt-8 text-[12px] font-black uppercase tracking-[0.5em] animate-pulse">Waiting_for_Lead_Generation</p>
               <span className="text-[8px] opacity-40 mt-2">Rational Design Engine Standby</span>
            </div>
          )}
          
          <div className="bg-emerald-950/40 p-3 text-[8px] font-black uppercase border-t border-emerald-500/20 flex justify-between items-center backdrop-blur-md">
             <div className="flex gap-4">
               <span>Lead_Candidate: <span className="text-emerald-400 font-mono">{prediction?.molecule || '---'}</span></span>
               <span className="opacity-30">|</span>
               <span>Target: <span className="text-emerald-400">{prediction?.target || 'SCANNING_PROTEOME'}</span></span>
             </div>
             <div className="flex gap-3">
               <span className="text-emerald-500 flex items-center gap-1">
                 <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                 ENGINE: {isDesigning ? 'COMPUTING_ENERGIES' : 'IDLE'}
               </span>
               <span className="opacity-40">{new Date().toISOString()}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiotechLab;
