import React, { useState, useEffect, useRef, useMemo } from 'react';
import { PsiFieldState, MindIntention, RealityLayer, RealitySynthesisResult, SacredGeometryPattern } from '../types';
import { globalArkheEngine } from '../utils/arkheEngine';

const RealitySynthesizerSuite: React.FC = () => {
  const [intention, setIntention] = useState<MindIntention>(MindIntention.FOCUS);
  const [psiState, setPsiState] = useState<PsiFieldState>({
    amplitude: Array.from({ length: 32 }).map(() => Math.random()),
    phase: Array.from({ length: 32 }).map(() => Math.random() * Math.PI * 2),
    coherenceLength: 0.8,
    entanglementEntropy: 5.2,
    collapseProbability: 0.1
  });
  const [synthResult, setSynthResult] = useState<RealitySynthesisResult>(globalArkheEngine.synthesizeReality(intention, psiState));
  const [feedbackActive, setFeedbackActive] = useState(false);
  
  const psiCanvasRef = useRef<HTMLCanvasElement>(null);
  const geoCanvasRef = useRef<HTMLCanvasElement>(null);

  // Update loop for Psi Field evolution
  useEffect(() => {
    const timer = setInterval(() => {
      setPsiState(prev => globalArkheEngine.evolvePsiField(prev, 0.01));
    }, 50);
    return () => clearInterval(timer);
  }, []);

  // Sync synthesis result whenever intention or psi changes
  useEffect(() => {
    const res = globalArkheEngine.synthesizeReality(intention, psiState);
    setSynthResult(res);
    
    if (feedbackActive && res.stability > 0.5) {
       // Mock reinforcing feedback
       setPsiState(prev => ({
         ...prev,
         coherenceLength: Math.min(1, prev.coherenceLength + 0.001)
       }));
    }
  }, [intention, psiState, feedbackActive]);

  // Draw Psi Field (Complex Wavefunction)
  useEffect(() => {
    const canvas = psiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const midY = canvas.height / 2;
    const step = canvas.width / psiState.amplitude.length;

    ctx.beginPath();
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 2;
    psiState.amplitude.forEach((amp, i) => {
      const x = i * step;
      const y = midY + Math.sin(psiState.phase[i]) * amp * 40;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw interference peaks
    ctx.fillStyle = 'rgba(0, 255, 255, 0.2)';
    psiState.amplitude.forEach((amp, i) => {
      const x = i * step;
      const y = midY + Math.sin(psiState.phase[i]) * amp * 40;
      ctx.beginPath(); ctx.arc(x, y, amp * 5, 0, Math.PI * 2); ctx.fill();
    });
  }, [psiState]);

  // Draw Sacred Geometry Template
  useEffect(() => {
    const canvas = geoCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const size = 80;

    ctx.strokeStyle = intention === MindIntention.HEAL ? '#10b981' : '#f59e0b';
    ctx.lineWidth = 1;
    ctx.setLineDash([]);

    if (synthResult.activePattern === SacredGeometryPattern.MANDALA) {
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6 + Date.now() * 0.001;
        ctx.beginPath();
        ctx.arc(cx + Math.cos(angle) * 30, cy + Math.sin(angle) * 30, 40, 0, Math.PI * 2);
        ctx.stroke();
      }
    } else if (synthResult.activePattern === SacredGeometryPattern.FLOWER_OF_LIFE) {
      for (let i = 0; i < 7; i++) {
        const angle = (i * Math.PI * 2) / 6;
        const x = i === 0 ? cx : cx + Math.cos(angle) * 30;
        const y = i === 0 ? cy : cy + Math.sin(angle) * 30;
        ctx.beginPath(); ctx.arc(x, y, 30, 0, Math.PI * 2); ctx.stroke();
      }
    } else if (synthResult.activePattern === SacredGeometryPattern.VORTEX) {
       ctx.beginPath();
       for (let i = 0; i < 200; i++) {
         const t = i * 0.1;
         const r = t * 1.5;
         const x = cx + r * Math.cos(t + Date.now() * 0.005);
         const y = cy + r * Math.sin(t + Date.now() * 0.005);
         if (i === 0) ctx.moveTo(x, y);
         else ctx.lineTo(x, y);
       }
       ctx.stroke();
    }
  }, [synthResult, intention]);

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 font-mono bg-black/70 border border-indigo-500/30 rounded-xl backdrop-blur-2xl overflow-hidden">
      <div className="flex justify-between items-center border-b border-indigo-500/30 pb-3">
        <div className="flex flex-col">
          <h2 className="text-[11px] font-black text-white tracking-[0.2em] uppercase">
            ∆ NMRI_REALITY_SYNTHESIZER // V.9.0_ULTIMATE
          </h2>
          <span className="text-[6px] opacity-40 uppercase tracking-widest text-cyan-400">Consciousness-Controlled Reality Interface</span>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={() => setFeedbackActive(!feedbackActive)}
             className={`text-[7px] px-2 py-1 rounded border font-black uppercase transition-all ${feedbackActive ? 'bg-emerald-500 text-black border-emerald-400 animate-pulse' : 'bg-white/5 text-white/40 border-white/10'}`}
           >
             Feedback_Loop: {feedbackActive ? 'LOCKED' : 'OFF'}
           </button>
           <div className="text-[7px] px-2 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/40 rounded font-black uppercase">
             Psi_Coherence: {(psiState.coherenceLength * 100).toFixed(1)}%
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-5 overflow-hidden">
        {/* Intention & Layer Coupling */}
        <div className="col-span-3 flex flex-col gap-4">
           <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
              <label className="text-[8px] font-black opacity-60 uppercase mb-2 block tracking-widest">Active_Intention</label>
              <div className="grid grid-cols-1 gap-1">
                 {Object.values(MindIntention).map(intent => (
                   <button 
                     key={intent}
                     onClick={() => setIntention(intent)}
                     className={`text-[8px] py-1.5 px-3 rounded text-left border transition-all ${intention === intent ? 'bg-cyan-500/20 border-cyan-400 text-white' : 'bg-black/40 border-white/5 text-white/40 hover:border-cyan-500/50'}`}
                   >
                     {intent}
                   </button>
                 ))}
              </div>
           </div>

           <div className="flex-1 p-3 bg-indigo-950/20 border border-indigo-500/20 rounded-xl flex flex-col gap-3 overflow-y-auto scrollbar-thin">
              <div className="text-[8px] font-black opacity-60 uppercase tracking-widest text-indigo-400">Reality_Layer_Coupling</div>
              {Object.entries(synthResult.layerCoupling).map(([layer, coupling]) => (
                <div key={layer} className="space-y-1">
                  <div className="flex justify-between text-[6px] font-black uppercase">
                    <span>{layer}</span>
                    {/* Fix: Explicitly cast coupling as number for arithmetic operations */}
                    <span className="text-white">{((coupling as number) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                    {/* Fix: Explicitly cast coupling as number for arithmetic operations */}
                    <div className="h-full bg-indigo-500" style={{ width: `${(coupling as number) * 100}%` }} />
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Psi Field & Synthesis View */}
        <div className="col-span-6 flex flex-col gap-4">
           <div className="flex-1 bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col gap-4 relative overflow-hidden">
              <div className="text-[8px] font-black opacity-40 uppercase tracking-widest">Quantum_Neural_Field_ψ(t)</div>
              <div className="flex-1 relative flex items-center justify-center">
                 <canvas ref={psiCanvasRef} width={400} height={150} className="w-full h-32 opacity-80" />
                 <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              
              <div className="h-1/2 relative bg-white/5 border border-white/5 rounded-lg flex items-center justify-center">
                 <canvas ref={geoCanvasRef} width={300} height={300} className="w-full h-full max-w-[200px]" />
                 <div className="absolute top-2 left-2 text-[6px] opacity-40 uppercase">Synthesis_Template: {synthResult.activePattern}</div>
                 <div className="absolute bottom-2 right-2 text-[6px] opacity-40 uppercase">Geometric_Realization_Field</div>
              </div>
           </div>

           <div className="h-24 grid grid-cols-3 gap-3">
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex flex-col justify-center">
                 <span className="text-[6px] opacity-40 uppercase font-black mb-1">Reality_Stability</span>
                 {/* Fix: Explicitly handle potential null/undefined for synthResult.stability */}
                 <span className={`text-lg font-black ${synthResult.stability > 0.7 ? 'text-emerald-400' : 'text-amber-400'}`}>{((synthResult.stability || 0) * 100).toFixed(1)}%</span>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex flex-col justify-center text-center">
                 <span className="text-[6px] opacity-40 uppercase font-black mb-1">Layer_Coupling</span>
                 <span className="text-lg font-black text-indigo-400">0.{Math.floor(Math.random() * 99)}</span>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex flex-col justify-center text-right">
                 <span className="text-[6px] opacity-40 uppercase font-black mb-1">Distortion_Δ</span>
                 {/* Fix: Explicitly handle potential null/undefined for synthResult.distortion */}
                 <span className="text-lg font-black text-rose-400">{((synthResult.distortion || 0) * 10).toFixed(3)}</span>
              </div>
           </div>
        </div>

        {/* Ethical Governance & Persistance */}
        <div className="col-span-3 flex flex-col gap-4">
           <div className="p-4 bg-rose-950/20 border border-rose-500/20 rounded-xl">
              <div className="text-[8px] font-black text-rose-400 uppercase mb-3 tracking-widest border-b border-rose-500/10 pb-1">Ethical_Filter_NMRI</div>
              <div className="space-y-2">
                 <div className="flex justify-between items-center text-[7px] font-bold">
                    <span className="opacity-40 uppercase">Harm_Prevention</span>
                    <span className="text-emerald-400">PASS ✓</span>
                 </div>
                 <div className="flex justify-between items-center text-[7px] font-bold">
                    <span className="opacity-40 uppercase">Cognitive_Liberty</span>
                    <span className="text-emerald-400">STABLE ✓</span>
                 </div>
                 <div className="flex justify-between items-center text-[7px] font-bold">
                    <span className="opacity-40 uppercase">Reality_Anchor</span>
                    <span className="text-amber-400">MODERATE !</span>
                 </div>
              </div>
           </div>

           <div className="flex-1 p-4 bg-indigo-950/30 border border-indigo-500/30 rounded-xl flex flex-col gap-4">
              <div className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">Persistence_Metrics</div>
              <div className="flex-1 flex flex-col items-center justify-center gap-2">
                 {/* Fix: Explicitly handle potential null/undefined for synthResult.persistence */}
                 <div className="text-3xl font-black text-white tracking-tighter">{((synthResult.persistence || 0) / 60).toFixed(1)}</div>
                 <span className="text-[7px] opacity-40 uppercase">Minutes_of_Stable_Manifestation</span>
              </div>
              <div className="p-3 bg-black/40 rounded border border-white/5">
                 <div className="text-[6px] opacity-40 uppercase mb-2">Signature_Hash</div>
                 <div className="text-[8px] font-mono break-all opacity-80 text-cyan-200">
                    {btoa(intention + SacredGeometryPattern.MANDALA).slice(0, 32)}
                 </div>
              </div>
           </div>

           <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
              <div className="text-[7px] opacity-60 leading-relaxed italic text-center text-white/80">
                "As the ψ-field collapses through archetypal templates, intention becomes local geometric structure."
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RealitySynthesizerSuite;