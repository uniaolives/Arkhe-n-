import React, { useState, useEffect } from 'react';
import { DrugPrediction, SystemStatus } from '../types';
import { globalIsoEngine } from '../utils/isomorphicEngine';

interface BiotechLabProps {
  onSynthesis: (pred: DrugPrediction) => void;
  onVerbalStep: (text: string) => void;
  status: SystemStatus;
}

const BiotechLab: React.FC<BiotechLabProps> = ({ onSynthesis, onVerbalStep, status }) => {
  const [mentalState, setMentalState] = useState('');
  const [isDesigning, setIsDesigning] = useState(false);
  const [prediction, setPrediction] = useState<DrugPrediction | null>(null);
  const [sessionStep, setSessionStep] = useState<number>(-1); // -1: none, 0-2: steps
  const [sessionCoherence, setSessionCoherence] = useState(0.5);

  const handleDesign = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!mentalState.trim() || isDesigning) return;
    setIsDesigning(true);
    setSessionStep(-1);
    
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

  const startSession = () => {
    setSessionStep(0);
    setSessionCoherence(0.5);
  };

  const nextStep = () => {
    if (!prediction) return;
    const nextIdx = sessionStep + 1;
    if (nextIdx < prediction.verbalActivations.length) {
      onVerbalStep(prediction.verbalActivations[nextIdx]);
      setSessionStep(nextIdx);
      setSessionCoherence(prev => Math.min(1, prev + 0.15));
    } else {
      setSessionStep(prediction.verbalActivations.length); // Finished
    }
  };

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 font-mono bg-black/80 rounded-xl border border-emerald-500/20 backdrop-blur-xl">
      <div className="flex justify-between items-center border-b border-emerald-500/30 pb-3">
        <div className="flex flex-col">
          <h2 className="text-[11px] font-black tracking-[0.2em] text-emerald-400 uppercase">
            🧬 ISOMMORPHIC_LAB // ISO-DDE v5.5
          </h2>
          <span className="text-[6px] opacity-40 uppercase">Unified Molecular Design & Verbal Integration</span>
        </div>
        <div className="flex gap-2">
          <div className="text-[7px] px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded border border-emerald-500/30 font-bold">
            ACCURACY: 99.2%
          </div>
          <div className={`text-[7px] px-2 py-1 rounded border font-bold animate-pulse ${sessionStep >= 0 ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-indigo-500/10 border-indigo-500 text-indigo-400'}`}>
            {sessionStep >= 0 ? 'SESSION: ACTIVE' : 'ENGINE: STANDBY'}
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-5 overflow-hidden">
        {/* Left: Design or Session Info */}
        <div className="col-span-4 flex flex-col gap-4 overflow-y-auto pr-2 scrollbar-thin">
          {sessionStep === -1 ? (
             <form 
               onSubmit={handleDesign}
               // @ts-ignore - WebMCP tool metadata
               toolname="design-isomorphic-molecule"
               tooldescription="Initiate simulated lead generation for a pharmaceutical molecule complex based on a targeted consciousness state (e.g. 'mystical focus', 'neural repair')."
               className="p-4 bg-emerald-950/10 rounded-lg border border-emerald-500/20 shadow-inner relative"
             >
               <div className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-black border border-emerald-500/30 rounded text-[5px] text-emerald-400 font-black">MCP_TOOL</div>
               <label className="text-[8px] opacity-60 uppercase mb-2 block font-black tracking-widest text-emerald-400">Target_Consciousness_State</label>
               <textarea 
                 name="mental-state-target"
                 value={mentalState}
                 onChange={(e) => setMentalState(e.target.value)}
                 placeholder="e.g. mystical focus, creative flow, neural repair..."
                 className="w-full bg-black/60 border border-emerald-500/20 p-3 text-[10px] outline-none focus:border-emerald-500/60 rounded h-20 resize-none transition-all placeholder:opacity-30"
               />
               <button 
                 type="submit"
                 disabled={isDesigning || !mentalState.trim()}
                 className="mt-4 w-full bg-emerald-500 text-black font-black text-[10px] py-2.5 rounded hover:bg-emerald-400 transition-all disabled:opacity-30 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
               >
                 {isDesigning ? 'COMPUTING_ENERGIES...' : 'INITIALIZE_LEAD_GEN'}
               </button>
             </form>
          ) : sessionStep < (prediction?.verbalActivations.length || 0) ? (
             <div className="p-4 bg-amber-950/20 rounded-lg border border-amber-500/30 flex flex-col gap-4">
                <div className="text-[8px] font-black uppercase text-amber-400 tracking-widest">Verbal_Administration_Session</div>
                <div className="bg-black/60 p-4 border border-amber-500/20 rounded italic text-center text-amber-100 text-[11px] leading-relaxed">
                   "{prediction?.verbalActivations[sessionStep]}"
                </div>
                <div className="space-y-1">
                   <div className="flex justify-between text-[7px] font-black text-amber-400">
                      <span>PHARMA_RESONANCE</span>
                      <span>{(sessionCoherence * 100).toFixed(0)}%</span>
                   </div>
                   <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400" style={{ width: `${sessionCoherence * 100}%` }} />
                   </div>
                </div>
                <button 
                  onClick={nextStep}
                  className="w-full bg-amber-500 text-black font-black text-[9px] py-2 rounded hover:brightness-110 uppercase"
                >
                  RESONATE_&_CONTINUE
                </button>
             </div>
          ) : (
             <div className="p-4 bg-emerald-950/20 rounded-lg border border-emerald-500/20 flex flex-col items-center justify-center gap-2 text-center">
                <div className="w-10 h-10 border-2 border-emerald-500 rounded-full flex items-center justify-center text-emerald-400 animate-bounce">✓</div>
                <div className="text-[10px] font-black uppercase text-emerald-400">ADMINISTRATION_COMPLETE</div>
                <p className="text-[8px] opacity-60">Molecular complex stabilized within the bio-photonic field.</p>
                <button 
                  onClick={() => setSessionStep(-1)}
                  className="mt-4 text-[8px] font-black border border-emerald-500/40 px-3 py-1 rounded hover:bg-emerald-500 hover:text-black transition-all"
                >
                  CLOSE_SESSION
                </button>
             </div>
          )}

          {prediction && sessionStep === -1 && (
            <div className="flex flex-col gap-3 animate-fadeIn">
              <div className="text-[8px] font-black text-emerald-400 opacity-60 uppercase tracking-widest flex justify-between items-center">
                <span>Activation_Protocol</span>
                <button onClick={startSession} className="text-[7px] bg-indigo-500 text-white px-2 py-0.5 rounded hover:bg-indigo-400 transition-all font-black">START_SESSION</button>
              </div>
              <div className="p-3 bg-emerald-900/10 border border-emerald-500/20 rounded-lg space-y-2">
                 {prediction.verbalActivations.map((v, i) => (
                    <div key={i} className="text-[7px] text-emerald-200/50 leading-tight border-l border-emerald-500/20 pl-2">
                       {v}
                    </div>
                 ))}
              </div>
              <div className="p-3 bg-indigo-900/10 border border-indigo-500/20 rounded-lg">
                <div className="text-[7px] font-black opacity-60 uppercase mb-2 text-indigo-400">Binding_Interactions</div>
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

        {/* Right: Detailed Visualization Section */}
        <div className="col-span-8 bg-black/40 rounded-xl border border-white/5 flex flex-col relative overflow-hidden">
          {prediction ? (
            <div className="flex-1 p-5 grid grid-cols-2 gap-6 overflow-y-auto scrollbar-thin">
              {/* Schmidt State Hexagon (6-Vertex) */}
              <div className="flex flex-col gap-3">
                <div className="text-[8px] font-black opacity-60 uppercase tracking-widest text-center">Schmidt_Hexagonal_State</div>
                <div className="relative aspect-square flex items-center justify-center border border-emerald-500/10 rounded-xl bg-emerald-500/5">
                  <svg viewBox="-1.2 -1.2 2.4 2.4" className="w-full h-full max-w-[240px]">
                    <polygon points="1,0 0.5,0.866 -0.5,0.866 -1,0 -0.5,-0.866 0.5,-0.866" fill="none" stroke="rgba(16,185,129,0.15)" strokeWidth="0.015" />
                    <polygon points="0.7,0 0.35,0.606 -0.35,0.606 -0.7,0 -0.35,-0.606 0.35,-0.606" fill="none" stroke="rgba(16,185,129,0.1)" strokeWidth="0.01" />
                    <polygon 
                      points={`
                        ${Math.cos(0 * Math.PI / 3) * prediction.schmidtVertices.affinity},${Math.sin(0 * Math.PI / 3) * prediction.schmidtVertices.affinity}
                        ${Math.cos(1 * Math.PI / 3) * prediction.schmidtVertices.selectivity},${Math.sin(1 * Math.PI / 3) * prediction.schmidtVertices.selectivity}
                        ${Math.cos(2 * Math.PI / 3) * prediction.schmidtVertices.pk},${Math.sin(2 * Math.PI / 3) * prediction.schmidtVertices.pk}
                        ${Math.cos(3 * Math.PI / 3) * prediction.schmidtVertices.safety},${Math.sin(3 * Math.PI / 3) * prediction.schmidtVertices.safety}
                        ${Math.cos(4 * Math.PI / 3) * prediction.schmidtVertices.synthesizability},${Math.sin(4 * Math.PI / 3) * prediction.schmidtVertices.synthesizability}
                        ${Math.cos(5 * Math.PI / 3) * prediction.schmidtVertices.novelty},${Math.sin(5 * Math.PI / 3) * prediction.schmidtVertices.novelty}
                      `}
                      fill="rgba(16,185,129,0.35)"
                      stroke="#10b981"
                      strokeWidth="0.04"
                      className={sessionStep >= 0 ? "animate-pulse" : ""}
                    />
                  </svg>
                  <div className="absolute inset-0 p-3 flex flex-col justify-between pointer-events-none text-[7px] font-black opacity-70">
                    <div className="flex justify-between uppercase">
                      <div className="flex flex-col items-start"><span className="text-emerald-400">SELECTIVITY</span></div>
                      <div className="flex flex-col items-end"><span className="text-emerald-400">AFFINITY</span></div>
                    </div>
                    <div className="flex justify-between uppercase">
                      <div className="flex flex-col items-start"><span className="text-emerald-400">ADME</span></div>
                      <div className="flex flex-col items-end"><span className="text-emerald-400">NOVELTY</span></div>
                    </div>
                    <div className="flex justify-between uppercase mt-auto mb-2 px-8">
                       <div className="flex flex-col items-center"><span className="text-emerald-400">SAFETY</span></div>
                       <div className="flex flex-col items-center"><span className="text-emerald-400">SYNTHESIS</span></div>
                    </div>
                  </div>
                </div>
                
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

              {/* Stats & Coeffs */}
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-3">
                   <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl">
                      <div className="text-[7px] opacity-50 font-black uppercase text-emerald-400">Binding_pKd</div>
                      <div className="text-2xl font-black text-emerald-300 tracking-tighter">{prediction.affinity.toFixed(2)}</div>
                   </div>
                   <div className="p-3 bg-indigo-950/30 border border-indigo-500/30 rounded-xl">
                      <div className="text-[7px] opacity-50 font-black uppercase text-indigo-400">Druggability</div>
                      <div className="text-2xl font-black text-indigo-300 tracking-tighter">{(prediction.druggability * 100).toFixed(1)}%</div>
                   </div>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col gap-3">
                  <div className="text-[8px] font-black opacity-50 uppercase tracking-widest text-emerald-400">Arkhe_Coefficients</div>
                  <div className="space-y-2.5">
                    {Object.entries(prediction.arkhe).map(([k, v]) => (
                      <div key={k} className="flex items-center gap-3">
                         <span className="text-[10px] font-black text-emerald-500 w-4">{k}</span>
                         <div className="flex-1 h-1.5 bg-black rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400" style={{ width: `${(v as number) * 100}%` }} />
                         </div>
                         <span className="text-[8px] opacity-40 w-8 text-right">{(v as number).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                   <div className="text-[8px] font-black opacity-50 uppercase tracking-widest text-emerald-400 mb-3">ADMET_In_Silico</div>
                   <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-[9px] font-mono">
                      <div className="flex flex-col"><span className="opacity-40 uppercase text-[6px]">Solubility</span><span className="text-emerald-300">{prediction.admet.solubility.toFixed(2)}</span></div>
                      <div className="flex flex-col"><span className="opacity-40 uppercase text-[6px]">Permeability</span><span className="text-emerald-300">{prediction.admet.permeability.toFixed(2)}</span></div>
                      <div className="flex flex-col"><span className="opacity-40 uppercase text-[6px]">Hepato_Tox</span><span className={prediction.admet.hepatoxicity > 0.1 ? "text-rose-400" : "text-emerald-300"}>{(prediction.admet.hepatoxicity * 100).toFixed(1)}%</span></div>
                      <div className="flex flex-col"><span className="opacity-40 uppercase text-[6px]">Cardio_Tox</span><span className={prediction.admet.cardiotoxicity > 0.1 ? "text-rose-400" : "text-emerald-300"}>{(prediction.admet.cardiotoxicity * 100).toFixed(1)}%</span></div>
                   </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center opacity-20">
               <div className="w-24 h-24 border-2 border-emerald-500/30 rounded-full animate-ping" />
               <p className="mt-8 text-[12px] font-black uppercase tracking-[0.5em]">Waiting_for_Lead_Generation</p>
            </div>
          )}
          
          <div className="bg-emerald-950/40 p-3 text-[8px] font-black uppercase border-t border-emerald-500/20 flex justify-between items-center">
             <div className="flex gap-4">
               <span>Lead_ID: <span className="text-emerald-400">{prediction?.id || '---'}</span></span>
               <span className="opacity-30">|</span>
               <span>Target: <span className="text-emerald-400">{prediction?.target || 'SCANNING_PROTEOME'}</span></span>
             </div>
             <div className="flex gap-3">
               <span className="text-emerald-500 flex items-center gap-1">
                 <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                 ENGINE: {isDesigning ? 'SIMULATING_DOCKING' : 'IDLE'}
               </span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiotechLab;
