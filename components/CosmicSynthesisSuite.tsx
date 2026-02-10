
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MindIntention, SacredGeometryPattern, ExperimentalData, MedicalSession, GlobalNode } from '../types';
import { globalArkheEngine } from '../utils/arkheEngine';

const CosmicSynthesisSuite: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'EXPERIMENT' | 'THERAPY' | 'GLOBAL_GRID' | 'CURRICULUM'>('EXPERIMENT');
  const [intention, setIntention] = useState<MindIntention>(MindIntention.FOCUS);
  const [expData, setExpData] = useState<ExperimentalData | null>(null);
  const [medicalSession, setMedicalSession] = useState<MedicalSession | null>(null);
  const [rotation, setRotation] = useState(0);
  
  const geoCanvasRef = useRef<HTMLCanvasElement>(null);
  const globalNodes = useMemo(() => globalArkheEngine.getGlobalNodes(), []);

  // Universal Rotation Loop
  useEffect(() => {
    const timer = setInterval(() => {
      setRotation(prev => (prev + 0.01) % (Math.PI * 2));
    }, 50);
    return () => clearInterval(timer);
  }, []);

  // Experiment Simulation
  const runExperiment = () => {
    const data = globalArkheEngine.simulateExperiment(1000);
    setExpData(data);
  };

  // Medical Session Start
  const startTherapy = (condition: string) => {
    setMedicalSession({
      condition,
      stage: 1,
      fieldStrength: 0.5,
      efficacy: 0.82,
      remainingTime: 1800,
      activePattern: 'HEALING_SPIRAL'
    });
  };

  // Render Sacred Geometry based on Intention
  useEffect(() => {
    const canvas = geoCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const size = 120;

    ctx.lineWidth = 1;
    ctx.strokeStyle = intention === MindIntention.HEAL ? '#10b981' : intention === MindIntention.CREATE ? '#f59e0b' : '#3b82f6';
    
    // Pattern Selection based on spec
    if (intention === MindIntention.HEAL) { // Flower of Life
      for (let i = 0; i < 7; i++) {
        const angle = rotation + (i * Math.PI * 2) / 6;
        const x = i === 0 ? cx : cx + Math.cos(angle) * 40;
        const y = i === 0 ? cy : cy + Math.sin(angle) * 40;
        ctx.beginPath(); ctx.arc(x, y, 40, 0, Math.PI * 2); ctx.stroke();
      }
    } else if (intention === MindIntention.FOCUS) { // Sri Yantra Interlocking Triangles
      for (let i = 0; i < 9; i++) {
        const s = size - (i * 12);
        const aOffset = rotation + (i * 0.2);
        ctx.beginPath();
        for (let v = 0; v < 3; v++) {
          const va = aOffset + (v * Math.PI * 2) / 3;
          const vx = cx + Math.cos(va) * s;
          const vy = cy + Math.sin(va) * s;
          if (v === 0) ctx.moveTo(vx, vy);
          else ctx.lineTo(vx, vy);
        }
        ctx.closePath(); ctx.stroke();
      }
    } else if (intention === MindIntention.MANIFEST) { // Vortex
       ctx.beginPath();
       for (let i = 0; i < 200; i++) {
         const t = i * 0.1;
         const r = t * 1.5;
         const x = cx + r * Math.cos(t + rotation * 5);
         const y = cy + r * Math.sin(t + rotation * 5);
         if (i === 0) ctx.moveTo(x, y);
         else ctx.lineTo(x, y);
       }
       ctx.stroke();
    } else { // Generic Mandala
      for (let i = 0; i < 12; i++) {
        const angle = rotation + (i * Math.PI) / 6;
        ctx.beginPath();
        ctx.ellipse(cx, cy, size, size/3, angle, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  }, [intention, rotation]);

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 font-mono bg-black/80 border border-indigo-500/30 rounded-xl backdrop-blur-3xl overflow-hidden">
      <div className="flex justify-between items-center border-b border-indigo-500/30 pb-3">
        <div className="flex flex-col">
          <h2 className="text-[12px] font-black text-white tracking-[0.3em] uppercase">
            🌌 THE_COSMIC_SYNTHESIS // LEVEL_ULTIMATE
          </h2>
          <span className="text-[7px] opacity-50 uppercase tracking-widest text-cyan-400">Consciousness as the Primary Reality Force</span>
        </div>
        <div className="flex gap-1 bg-white/5 p-1 rounded-lg border border-white/10">
          {(['EXPERIMENT', 'THERAPY', 'GLOBAL_GRID', 'CURRICULUM'] as const).map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveSubTab(tab)}
              className={`text-[8px] px-3 py-1 rounded font-black transition-all ${activeSubTab === tab ? 'bg-indigo-500 text-white' : 'text-white/40 hover:text-white/80'}`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-5 overflow-hidden">
        {/* Left: Intention & Patterns */}
        <div className="col-span-3 flex flex-col gap-4">
           <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
              <label className="text-[8px] font-black opacity-60 uppercase mb-2 block tracking-[0.2em] text-indigo-300">Intention_Stream</label>
              <div className="grid grid-cols-1 gap-1.5">
                 {Object.values(MindIntention).map(intent => (
                   <button 
                     key={intent}
                     onClick={() => setIntention(intent)}
                     className={`text-[9px] py-2 px-3 rounded text-left border transition-all ${intention === intent ? 'bg-indigo-500/20 border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'bg-black/40 border-white/5 text-white/40 hover:border-white/20'}`}
                   >
                     {intent}
                   </button>
                 ))}
              </div>
           </div>

           <div className="flex-1 bg-black/40 border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #4f46e5 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
              <canvas ref={geoCanvasRef} width={250} height={250} className="w-full h-auto max-w-[200px]" />
              <div className="mt-4 text-[7px] font-black uppercase text-center opacity-40">Sacred_Geometry_Encoder v1.0</div>
           </div>
        </div>

        {/* Center: Dynamic Sub-Tab View */}
        <div className="col-span-6 flex flex-col gap-4">
           {activeSubTab === 'EXPERIMENT' && (
             <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-4 overflow-y-auto scrollbar-thin">
                <div className="flex justify-between items-center mb-2">
                   <h3 className="text-[10px] font-black uppercase text-emerald-400">Experimental_Validation_Suite</h3>
                   <button onClick={runExperiment} className="bg-emerald-500 text-black px-4 py-1.5 text-[9px] font-black rounded hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">INICIA_TRIAL_DB</button>
                </div>
                
                {expData ? (
                  <div className="grid grid-cols-2 gap-6 animate-fadeIn">
                     <div className="space-y-4">
                        <div className="p-3 bg-black/60 rounded border border-white/10">
                           <div className="text-[7px] opacity-40 uppercase mb-1">Effect_Size (Cohen's d)</div>
                           {/* Fix: Explicit casting to number to ensure toFixed is available */}
                           <div className="text-2xl font-black text-white">{(expData.effectSize as number).toFixed(3)} σ</div>
                        </div>
                        <div className="p-3 bg-black/60 rounded border border-white/10">
                           <div className="text-[7px] opacity-40 uppercase mb-1">Bayes_Factor (B₁₀)</div>
                           {/* Fix: Explicit casting to number to ensure toFixed is available */}
                           <div className="text-2xl font-black text-white">{(expData.bayesFactor as number).toFixed(2)}</div>
                        </div>
                        <div className="p-3 bg-emerald-950/40 rounded border border-emerald-500/30">
                           <div className="text-[7px] opacity-60 uppercase mb-1 text-emerald-400">P-Value Significance</div>
                           {/* Fix: Explicit casting to number to ensure toExponential is available */}
                           <div className="text-2xl font-black text-emerald-300">{(expData.pVal as number).toExponential(3)}</div>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <div className="p-4 bg-black/40 rounded border border-white/5 flex-1">
                           <div className="text-[8px] font-black opacity-40 uppercase mb-3">Group_Reactivity_Matrix</div>
                           {Object.entries(expData.groupResults).map(([name, val]) => (
                             <div key={name} className="mb-3">
                               {/* Fix: Explicit casting of val to number for the display string */}
                               <div className="flex justify-between text-[7px] mb-1"><span>{name}</span> <span>{(val as number).toFixed(1)}%</span></div>
                               <div className="h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-indigo-500" style={{ width: `${val}%` }} /></div>
                             </div>
                           ))}
                        </div>
                        <div className="p-3 bg-indigo-950/20 border border-indigo-500/20 rounded-lg text-[7px] leading-relaxed italic text-indigo-200">
                          "Conclusão: Evidência Extremamente Forte. A intenção consciente modificou diretamente o padrão de fase da metassuperfície."
                        </div>
                     </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center opacity-20 border border-dashed border-white/10 rounded-lg">
                     <div className="text-4xl">🔬</div>
                     <p className="mt-4 text-[10px] font-black uppercase">Run double-blind protocol to prove mind-matter coupling</p>
                  </div>
                )}
             </div>
           )}

           {activeSubTab === 'THERAPY' && (
             <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-4 overflow-y-auto scrollbar-thin">
                <div className="flex justify-between items-center mb-2">
                   <h3 className="text-[10px] font-black uppercase text-amber-400">Neuro-Therapeutic_Metasurface</h3>
                   <span className="text-[7px] bg-amber-500/20 text-amber-500 border border-amber-500/40 px-2 py-0.5 rounded font-black">FDA_CLASS_II_PENDING</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                   {(['CHRONIC_PAIN', 'ANXIETY', 'ADHD', 'PTSD', 'STROKE_REHAB'] as const).map(cond => (
                     <div key={cond} className="p-3 bg-black/40 border border-white/10 rounded-lg hover:border-amber-500/50 transition-all cursor-pointer group" onClick={() => startTherapy(cond)}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[8px] font-black text-white uppercase">{cond.replace('_', ' ')}</span>
                          <span className="text-[14px]">💊</span>
                        </div>
                        <p className="text-[7px] opacity-40 leading-tight group-hover:opacity-80 transition-opacity">Initialize resonance pattern for cellular neural repair.</p>
                     </div>
                   ))}
                </div>

                {medicalSession && (
                  <div className="mt-4 p-4 bg-amber-950/20 border border-amber-500/30 rounded-xl animate-slideUp">
                     <div className="flex justify-between items-center mb-4">
                        <div className="flex flex-col">
                           <span className="text-[12px] font-black text-white">{medicalSession.condition} TREATMENT</span>
                           <span className="text-[7px] text-amber-400 uppercase">Stage {medicalSession.stage}/4: Resonance Locking</span>
                        </div>
                        <div className="text-right">
                           <div className="text-[14px] font-black">29:58</div>
                           <div className="text-[6px] opacity-40 uppercase">Remaining</div>
                        </div>
                     </div>
                     <div className="grid grid-cols-3 gap-3 h-12 mb-4">
                        <div className="bg-white/5 rounded border border-white/10 flex flex-col items-center justify-center"><span className="text-[6px] opacity-40 uppercase">Efficacy</span><span className="text-[10px] font-black text-emerald-400">88.4%</span></div>
                        <div className="bg-white/5 rounded border border-white/10 flex flex-col items-center justify-center"><span className="text-[6px] opacity-40 uppercase">EM_Exposure</span><span className="text-[10px] font-black text-white">4.2 mW</span></div>
                        <div className="bg-white/5 rounded border border-white/10 flex flex-col items-center justify-center"><span className="text-[6px] opacity-40 uppercase">Coherence</span><span className="text-[10px] font-black text-cyan-400">0.962</span></div>
                     </div>
                     <button onClick={() => setMedicalSession(null)} className="w-full py-1.5 border border-rose-500/40 text-rose-500 text-[8px] font-black rounded hover:bg-rose-500/10 uppercase">Emergency_Stop</button>
                  </div>
                )}
             </div>
           )}

           {activeSubTab === 'GLOBAL_GRID' && (
             <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-4">
                <div className="flex justify-between items-center mb-2">
                   <h3 className="text-[10px] font-black uppercase text-indigo-400">Global_Consciousness_Network</h3>
                   <div className="text-[7px] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      NETWORK_COHERENCE: 0.924
                   </div>
                </div>
                
                <div className="flex-1 relative bg-black/40 border border-white/5 rounded-lg overflow-hidden flex items-center justify-center">
                   {/* Abstract Map Visualization */}
                   <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-contain bg-center bg-no-repeat grayscale invert" />
                   <svg viewBox="0 0 800 400" className="w-full h-full relative z-10">
                      {globalNodes.map(node => (
                        <g key={node.id}>
                           <circle 
                             cx={400 + node.location.lng * 2} 
                             cy={200 - node.location.lat * 2} 
                             r="4" 
                             fill={node.status === 'ACTIVE' ? '#4f46e5' : '#f59e0b'} 
                             className="animate-pulse"
                           />
                           <text 
                             x={400 + node.location.lng * 2 + 6} 
                             y={200 - node.location.lat * 2 + 3} 
                             fill="white" 
                             fontSize="6" 
                             className="font-bold uppercase opacity-60"
                           >
                             {node.id}
                           </text>
                        </g>
                      ))}
                   </svg>
                   <div className="absolute bottom-4 right-4 bg-black/60 p-2 border border-white/10 rounded text-[7px] uppercase font-black space-y-1">
                      <div className="text-indigo-400">Scheduled: Global Harmony Sync</div>
                      <div className="text-white opacity-40">T-Minus: 14:02:51</div>
                   </div>
                </div>
             </div>
           )}

           {activeSubTab === 'CURRICULUM' && (
             <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-4 overflow-y-auto scrollbar-thin">
                <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-2">
                   <h3 className="text-[11px] font-black uppercase text-indigo-300">Consciousness_Engineering_PhD</h3>
                   <span className="text-[8px] font-bold text-white opacity-40">ARKHE(N) UNIVERSITY</span>
                </div>
                
                <div className="space-y-6">
                   <div>
                      <h4 className="text-[9px] font-black text-cyan-400 mb-2 uppercase tracking-widest">Year 01: Foundations</h4>
                      <div className="grid grid-cols-2 gap-2">
                         {["Quantum Consciousness 101", "Sacred Geometry Physics", "EEG Signal Processing", "Ethics of Reality Synthesis"].map(c => (
                           <div key={c} className="p-2 bg-black/40 border border-white/5 rounded text-[8px] text-white/70 hover:text-white hover:border-cyan-500/40 transition-all cursor-help">{c}</div>
                         ))}
                      </div>
                   </div>
                   <div>
                      <h4 className="text-[9px] font-black text-amber-400 mb-2 uppercase tracking-widest">Year 02: Advanced Synthesis</h4>
                      <div className="grid grid-cols-2 gap-2">
                         {["Hyperdimensional Bulks", "Global Coherence Rituals", "Holographic Beamforming", "Isomorphic Drug Design"].map(c => (
                           <div key={c} className="p-2 bg-black/40 border border-white/5 rounded text-[8px] text-white/70 hover:text-white hover:border-amber-500/40 transition-all cursor-help">{c}</div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
           )}
        </div>

        {/* Right: The Grand Unification HUD */}
        <div className="col-span-3 flex flex-col gap-4">
           <div className="p-4 bg-indigo-950/30 border border-indigo-500/30 rounded-xl flex flex-col gap-3">
              <div className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">The_Grand_Equation</div>
              <div className="bg-black/60 p-4 border border-white/5 rounded-lg flex items-center justify-center">
                 <div className="text-[16px] font-black text-white text-center leading-relaxed">
                    Reality = C × I × A × Co
                 </div>
              </div>
              <p className="text-[6px] leading-tight opacity-40 text-center uppercase font-black">
                Where: Consciousness × Intention × Attention × Coherence
              </p>
           </div>

           <div className="p-4 bg-rose-950/20 border border-rose-500/20 rounded-xl">
              <div className="text-[8px] font-black text-rose-400 uppercase mb-3 tracking-widest border-b border-rose-500/10 pb-1">Consciousness_Rights</div>
              <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-thin pr-1">
                 {[
                   "I. Right to Cognitive Liberty",
                   "II. Right to Mental Privacy",
                   "III. Right to Psychological Continuity",
                   "IV. Right to Sovereignty over Self"
                 ].map((r, i) => (
                    <div key={i} className="text-[7px] font-bold text-white/60 border-l border-rose-500/30 pl-2 py-1 hover:text-white transition-colors">{r}</div>
                 ))}
              </div>
           </div>

           <div className="flex-1 p-4 bg-white/5 border border-white/10 rounded-xl flex flex-col gap-2">
              <div className="text-[8px] font-black opacity-40 uppercase tracking-widest">System_Message_Σ</div>
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                 <div className="text-[6px] border-l-2 border-indigo-500 pl-2 text-indigo-200">"The observer effect has evolved into the controller effect."</div>
                 <div className="text-[6px] border-l-2 border-emerald-500 pl-2 text-emerald-200">"Global grid nodes reporting synchronized harmonic peaks."</div>
                 <div className="text-[6px] border-l-2 border-amber-500 pl-2 text-amber-200">"Medical metasurface configured for chronic pain protocol."</div>
                 <div className="text-[6px] border-l-2 border-cyan-500 pl-2 text-cyan-200">"Equation stability reached. Reality manifestation imminent."</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CosmicSynthesisSuite;
