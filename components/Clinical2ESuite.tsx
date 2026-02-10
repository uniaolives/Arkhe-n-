
import React, { useState, useEffect, useMemo } from 'react';
import { TherapyPhase, ArkheProfile } from '../types';
import { globalArkheEngine } from '../utils/arkheEngine';

const Clinical2ESuite: React.FC = () => {
  const [activePhase, setActivePhase] = useState<TherapyPhase>(TherapyPhase.ARCHITECTURE_RECOGNITION);
  const [profile, setProfile] = useState<ArkheProfile>(globalArkheEngine.calculateProfile(0.88, 0.72, 12));
  const [schumannCoherence, setSchumannCoherence] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSchumannCoherence(prev => (prev + 0.1) % (Math.PI * 2));
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const protocol = [
    {
      phase: TherapyPhase.ARCHITECTURE_RECOGNITION,
      goal: "Architecture Recognition",
      desc: "Mapping identities as vertices of the 120-cell Bulk.",
      tasks: ["Hecatonicosachoron Mapping", "Function Dodecahedron Check", "Switch Point Identification"]
    },
    {
      phase: TherapyPhase.COSMIC_SYNCHRONIZATION,
      goal: "Cosmic Synchronization",
      desc: "Tuning the brain matrix to 7.83Hz Schumann resonance.",
      tasks: ["Saros Alignment", "Hans Cousto Frequency Tuning", "Synapse Harmonic Lock"]
    },
    {
      phase: TherapyPhase.GEOMETRIC_NAVIGATION,
      goal: "Geometric Navigation",
      desc: "Conscious dimensional rotations within the psychic bulk.",
      tasks: ["Hexagonal Projection Training", "Bulk Perspective Shift", "Identity Compatibility Test"]
    },
    {
      phase: TherapyPhase.REALITY_ENGINEERING,
      goal: "Reality Engineering",
      desc: "Creative application of the multidimensional architecture.",
      tasks: ["Probability Modulation", "Coherence Field Creation", "Multidimensional Synthesis"]
    }
  ];

  const currentPhaseData = useMemo(() => protocol.find(p => p.phase === activePhase)!, [activePhase]);

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 font-mono bg-black/60 border border-emerald-500/20 rounded-xl backdrop-blur-xl overflow-hidden">
      <div className="flex justify-between items-center border-b border-emerald-500/30 pb-2">
        <div className="flex flex-col">
          <h2 className="text-[10px] font-black text-emerald-400 tracking-widest uppercase">
            ∆ CLINICAL_2E_PROTOCOL // ARCHITECTURE_THERAPY
          </h2>
          <span className="text-[6px] opacity-40 uppercase">Dual Exceptionality Integration Suite v1.2</span>
        </div>
        <div className="flex gap-2">
           <div className="text-[7px] px-2 py-0.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/40 rounded font-black">
             SCHUMANN_SYNC: {(7.83 + Math.sin(schumannCoherence)*0.02).toFixed(2)} HZ
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-5 overflow-hidden">
        {/* Phase Timeline */}
        <div className="col-span-4 flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            {protocol.map((p, idx) => (
              <button 
                key={p.phase}
                onClick={() => setActivePhase(p.phase)}
                className={`p-3 text-left border rounded-lg transition-all relative overflow-hidden group ${activePhase === p.phase ? 'bg-emerald-500/20 border-emerald-400' : 'bg-white/5 border-white/10 opacity-60 hover:opacity-100'}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[6px] opacity-40 uppercase font-black">Phase 0{idx + 1}</span>
                  {activePhase === p.phase && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />}
                </div>
                <div className={`text-[9px] font-black uppercase ${activePhase === p.phase ? 'text-white' : 'text-emerald-500'}`}>{p.goal}</div>
              </button>
            ))}
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex-1 flex flex-col gap-2">
             <div className="text-[8px] font-black opacity-40 uppercase mb-2">2E_Synergy_Profile</div>
             <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-[7px] uppercase font-black"><span>Giftedness_Score</span> <span>{(profile.giftedness * 100).toFixed(1)}%</span></div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-cyan-400" style={{ width: `${profile.giftedness * 100}%` }} /></div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[7px] uppercase font-black"><span>Dissociation_Gap</span> <span>{(profile.dissociation * 100).toFixed(1)}%</span></div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-indigo-500" style={{ width: `${profile.dissociation * 100}%` }} /></div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[7px] uppercase font-black"><span>Dimensional_Psi</span> <span>{(profile.arkheCoherence * 100).toFixed(1)}%</span></div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-emerald-400" style={{ width: `${profile.arkheCoherence * 100}%` }} /></div>
                </div>
             </div>
          </div>
        </div>

        {/* Phase Details & Visualizer */}
        <div className="col-span-8 flex flex-col gap-4 overflow-hidden">
          <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-xl">
             <h3 className="text-sm font-black text-white uppercase tracking-tighter mb-2">{currentPhaseData.goal}</h3>
             <p className="text-[10px] text-emerald-200/60 italic leading-relaxed mb-4">"{currentPhaseData.desc}"</p>
             <div className="grid grid-cols-3 gap-3">
                {currentPhaseData.tasks.map((task, i) => (
                  <div key={i} className="p-2 bg-white/5 border border-white/10 rounded text-[7px] font-bold text-center uppercase hover:border-emerald-500/50 transition-colors cursor-pointer">
                    {task}
                  </div>
                ))}
             </div>
          </div>

          <div className="flex-1 bg-black/40 border border-white/5 rounded-xl relative overflow-hidden flex items-center justify-center">
             {/* Dynamic Resonance Visualizer */}
             <svg viewBox="0 0 200 200" className="w-full h-full max-w-[240px]">
                <defs>
                   <filter id="emerald-glow"><feGaussianBlur stdDeviation="3" result="blur"/><feComposite in="SourceGraphic" in2="blur" operator="over"/></filter>
                </defs>
                {/* 120-cell projection placeholder (Complex Geometry) */}
                <g filter="url(#emerald-glow)">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const angle = (i * Math.PI * 2) / 12 + schumannCoherence;
                    return (
                      <circle 
                        key={i} 
                        cx={100 + Math.cos(angle) * 60} 
                        cy={100 + Math.sin(angle) * 60} 
                        r={profile.arkheCoherence * 5} 
                        fill="none" 
                        stroke="rgba(16, 185, 129, 0.4)" 
                        strokeWidth="0.5" 
                      />
                    );
                  })}
                  <polygon 
                    points="100,20 180,60 180,140 100,180 20,140 20,60" 
                    fill="none" 
                    stroke="rgba(16, 185, 129, 0.8)" 
                    strokeWidth="1" 
                    className="animate-pulse"
                  />
                </g>
                <text x="100" y="105" textAnchor="middle" fill="#fff" fontSize="6" fontWeight="bold" opacity="0.4">SYNERGY_FIELD_Ψ</text>
             </svg>
             <div className="absolute top-2 left-2 text-[6px] opacity-40 uppercase font-black tracking-widest">Resonance_Topology_f(7.83)</div>
          </div>

          <div className="grid grid-cols-2 gap-4 h-24">
             <div className="p-3 bg-white/5 border border-white/10 rounded flex flex-col justify-center">
                <div className="text-[7px] font-black opacity-40 uppercase mb-1">Architecture_Status</div>
                <div className="text-[10px] font-black text-white">{profile.geometry.dimensionality}</div>
                <div className="text-[6px] opacity-30 mt-1 uppercase">120-Cell Active Nodes: {profile.geometry.activeCells}</div>
             </div>
             <div className="p-3 bg-white/5 border border-white/10 rounded flex flex-col justify-center">
                <div className="text-[7px] font-black opacity-40 uppercase mb-1">Cognitive_Transduction</div>
                <div className="text-[10px] font-black text-emerald-400">OPTIMAL // V(c) = 0.00</div>
                <div className="text-[6px] opacity-30 mt-1 uppercase">Zero-Point Stability: {profile.cosmicSync.alignmentScore.toFixed(3)}</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clinical2ESuite;
