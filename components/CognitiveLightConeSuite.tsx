
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MindIntention, IntelligenceMetrics, LightConeState } from '../types';
import { globalArkheEngine } from '../utils/arkheEngine';

const CognitiveLightConeSuite: React.FC = () => {
  const [intention, setIntention] = useState<MindIntention>(MindIntention.FOCUS);
  const [paradigm, setParadigm] = useState<'CONSTRAINT' | 'PREDICTION'>('CONSTRAINT');
  const [coneState, setConeState] = useState<LightConeState>({
    temporalHorizon: 50,
    spatialScale: 2.5,
    perturbationResistance: 0.8,
    dimensionality: 4
  });

  const [metrics, setMetrics] = useState<IntelligenceMetrics>(globalArkheEngine.calculateIntelligence(coneState, intention));
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    setMetrics(globalArkheEngine.calculateIntelligence(coneState, intention));
  }, [coneState, intention]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRotation(prev => (prev + 0.01) % (Math.PI * 2));
      drawCones();
    }, 32);
    return () => clearInterval(timer);
  }, [rotation, metrics, paradigm]);

  const drawCones = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const futureVol = metrics.coneVolume;
    const fs = metrics.futureSculpting;
    
    // Gradient Background
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200);
    grad.addColorStop(0, 'rgba(0, 255, 255, 0.05)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Coordinate Axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cx, 50); ctx.lineTo(cx, canvas.height - 50); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(50, cy); ctx.lineTo(canvas.width - 50, cy); ctx.stroke();

    // Past Cone (Memory) - Downwards
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    const pastWidth = 40 + metrics.multiscaleCoherence * 60;
    const pastDepth = 80;
    ctx.lineTo(cx - pastWidth, cy + pastDepth);
    ctx.lineTo(cx + pastWidth, cy + pastDepth);
    ctx.closePath();
    ctx.fillStyle = 'rgba(129, 140, 248, 0.2)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(129, 140, 248, 0.5)';
    ctx.stroke();

    // Future Cone (Sculpting) - Upwards
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    const futureWidth = 20 + fs * 100;
    const futureDepth = 20 + (coneState.temporalHorizon / 100) * 100;
    
    // "Sculpted" paths within the cone
    for(let i=0; i<5; i++) {
        const offset = (i - 2) * 15;
        const endX = cx + offset * fs;
        const endY = cy - futureDepth;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.bezierCurveTo(cx, cy - futureDepth/2, endX, cy - futureDepth/2, endX, endY);
        ctx.strokeStyle = intention === MindIntention.FOCUS ? 'rgba(0, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // Constraint Attractors (Bubbles in future)
    if (paradigm === 'CONSTRAINT') {
        for(let i=0; i<3; i++) {
            const bx = cx + Math.sin(rotation + i*2) * 40;
            const by = cy - futureDepth * 0.7;
            ctx.beginPath();
            ctx.arc(bx, by, 5 + metrics.constraintEfficiency * 10, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(16, 185, 129, 0.3)';
            ctx.fill();
            ctx.strokeStyle = '#10b981';
            ctx.stroke();
        }
    }

    // Main Future Cone
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx - futureWidth, cy - futureDepth);
    ctx.lineTo(cx + futureWidth, cy - futureDepth);
    ctx.closePath();
    ctx.fillStyle = intention === MindIntention.FOCUS ? 'rgba(0, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)';
    ctx.fill();
    ctx.strokeStyle = intention === MindIntention.FOCUS ? '#00ffff' : 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '7px Fira Code';
    ctx.fillText('V_FUTURE (COGNITIVE_HORIZON)', cx + futureWidth + 10, cy - futureDepth);
    ctx.fillText('V_PAST (MEMORY_RECONSTRUCTION)', cx + pastWidth + 10, cy + pastDepth);
    ctx.fillText('T+', cx - 10, 60);
    ctx.fillText('T-', cx - 10, canvas.height - 60);
  };

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 font-mono bg-black/80 border border-cyan-500/20 rounded-xl backdrop-blur-3xl overflow-hidden">
      <div className="flex justify-between items-center border-b border-cyan-500/30 pb-3">
        <div className="flex flex-col">
          <h2 className="text-[12px] font-black text-white tracking-[0.3em] uppercase">
            🔭 COGNITIVE_LIGHT_CONES // V.1.0_FORMALISM
          </h2>
          <span className="text-[7px] opacity-50 uppercase tracking-widest text-emerald-400 font-black">Intelligence as Spatiotemporal Future-State Sculpting</span>
        </div>
        <div className="flex gap-1 bg-white/5 p-1 rounded-lg border border-white/10">
          {(['CONSTRAINT', 'PREDICTION'] as const).map(p => (
            <button 
              key={p} 
              onClick={() => setParadigm(p)}
              className={`text-[8px] px-3 py-1 rounded font-black transition-all ${paradigm === p ? (p === 'CONSTRAINT' ? 'bg-emerald-500 text-black' : 'bg-rose-500 text-white') : 'text-white/40 hover:text-white/80'}`}
            >
              {p === 'CONSTRAINT' ? 'NEW_PARADIGM' : 'OLD_PARADIGM'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-5 overflow-hidden">
        {/* Left: Input Parameters */}
        <div className="col-span-3 flex flex-col gap-4">
           <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-4">
              <label className="text-[8px] font-black opacity-60 uppercase mb-2 block tracking-widest text-cyan-300">Light_Cone_Parameters</label>
              <div className="space-y-3">
                <ParameterSlider 
                    label="Temporal_Horizon" 
                    value={coneState.temporalHorizon} 
                    onChange={v => setConeState({...coneState, temporalHorizon: v})} 
                    max={100} 
                />
                <ParameterSlider 
                    label="Spatial_Scale" 
                    value={coneState.spatialScale} 
                    onChange={v => setConeState({...coneState, spatialScale: v})} 
                    max={10} 
                    step={0.1}
                />
                <ParameterSlider 
                    label="Perturbation_Res" 
                    value={coneState.perturbationResistance} 
                    onChange={v => setConeState({...coneState, perturbationResistance: v})} 
                    max={1} 
                    step={0.01}
                />
                <ParameterSlider 
                    label="Dimensionality" 
                    value={coneState.dimensionality} 
                    onChange={v => setConeState({...coneState, dimensionality: Math.floor(v)})} 
                    max={10} 
                />
              </div>
           </div>

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
        </div>

        {/* Center: Intelligence Visualization */}
        <div className="col-span-6 flex flex-col gap-4 overflow-hidden">
           <div className="flex-1 bg-black/40 border border-white/5 rounded-xl relative overflow-hidden flex items-center justify-center">
              <canvas ref={canvasRef} width={400} height={400} className="w-full h-full" />
              <div className="absolute inset-0 pointer-events-none border border-cyan-500/5 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #00ffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              
              <div className="absolute top-4 left-4 bg-black/60 p-3 border border-white/10 rounded backdrop-blur-md">
                 <div className="text-[7px] opacity-40 uppercase font-black mb-1">Scalar_Intelligence (I)</div>
                 <div className="text-3xl font-black text-white tracking-tighter">
                    {metrics.scalarI.toFixed(4)}
                 </div>
                 <div className="text-[6px] opacity-40 uppercase mt-1">∂(V_future)/∂t · ∂(V_past)/∂t⁻¹ · C</div>
              </div>

              {paradigm === 'CONSTRAINT' && (
                  <div className="absolute bottom-4 right-4 bg-emerald-950/40 p-2 border border-emerald-500/30 rounded text-[7px] text-emerald-400 uppercase font-black animate-pulse">
                     Mode: Constraint_Exploitation
                  </div>
              )}
           </div>

           <div className="h-24 grid grid-cols-4 gap-3">
              <MetricBox label="Future_Sculpting" value={metrics.futureSculpting} color="text-cyan-400" />
              <MetricBox label="Constraint_Eff" value={metrics.constraintEfficiency} color="text-emerald-400" />
              <MetricBox label="Scale_Coherence" value={metrics.multiscaleCoherence} color="text-indigo-400" />
              <MetricBox label="Goal_Persistence" value={metrics.goalPersistence} color="text-amber-400" />
           </div>
        </div>

        {/* Right: Formalism Details */}
        <div className="col-span-3 flex flex-col gap-4 overflow-y-auto scrollbar-thin pr-1">
           <div className="p-4 bg-indigo-950/20 border border-indigo-500/30 rounded-xl">
              <div className="text-[8px] font-black text-indigo-400 uppercase mb-3 tracking-widest border-b border-indigo-500/10 pb-1">Mathematical_Framework</div>
              <div className="space-y-4">
                 <div className="bg-black/40 p-2 rounded text-[7px] leading-relaxed">
                    <span className="text-indigo-300 font-bold">Equation:</span><br/>
                    Intelligence = reliable future-state sculpting across scales.
                 </div>
                 <div className="text-[6.5px] space-y-2 opacity-80">
                    <p><span className="text-white font-bold">V_future:</span> Reachable states via active constraints.</p>
                    <p><span className="text-white font-bold">V_past:</span> Information preserved in system memory.</p>
                    <p><span className="text-white font-bold">C:</span> Coherence coefficient under noise.</p>
                 </div>
              </div>
           </div>

           <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
              <div className="text-[8px] font-black opacity-60 uppercase tracking-widest text-emerald-300">Paradigm_Comparison</div>
              <div className="space-y-3">
                 <div className={`p-2 rounded border transition-all ${paradigm === 'CONSTRAINT' ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-white/5 opacity-40'}`}>
                    <div className="text-[7px] font-black text-emerald-400 uppercase">Constraint-Based (Active)</div>
                    <p className="text-[6px] mt-1 leading-tight text-white/70">Act to satisfy constraints; top-down attractors create "goals" without algorithms.</p>
                 </div>
                 <div className={`p-2 rounded border transition-all ${paradigm === 'PREDICTION' ? 'border-rose-500/40 bg-rose-500/5' : 'border-white/5 opacity-40'}`}>
                    <div className="text-[7px] font-black text-rose-400 uppercase">Prediction-Based (Passive)</div>
                    <p className="text-[6px] mt-1 leading-tight text-white/70">Observe patterns to predict reward; relies on distribution consistency.</p>
                 </div>
              </div>
           </div>

           <div className="mt-auto p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-xl">
              <div className="text-[7px] opacity-70 leading-relaxed italic text-center text-cyan-200">
                "Intelligence is matter reaching complexity to model its own constraints."
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const ParameterSlider = ({ label, value, onChange, max, step = 1 }: { label: string, value: number, onChange: (v: number) => void, max: number, step?: number }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-[6px] font-black uppercase opacity-60">
       <span>{label}</span>
       <span className="text-white">{value.toFixed(step < 1 ? 2 : 0)}</span>
    </div>
    <input 
      type="range" min="0" max={max} step={step} 
      value={value} 
      onChange={e => onChange(parseFloat(e.target.value))}
      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400" 
    />
  </div>
);

const MetricBox = ({ label, value, color }: { label: string, value: number, color: string }) => (
  <div className="p-2 bg-white/5 border border-white/10 rounded flex flex-col justify-center items-center">
    <div className="text-[6px] opacity-40 uppercase font-black mb-1">{label}</div>
    <div className={`text-sm font-black ${color}`}>{(value * 100).toFixed(1)}%</div>
    <div className="w-full h-0.5 bg-black rounded-full mt-2 overflow-hidden">
       <div className={`h-full ${color.replace('text-', 'bg-')}`} style={{ width: `${value * 100}%` }} />
    </div>
  </div>
);

export default CognitiveLightConeSuite;
