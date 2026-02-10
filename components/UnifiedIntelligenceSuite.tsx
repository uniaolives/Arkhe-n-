
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { UnifiedIntelligenceMetrics, CouplingResult } from '../types';
import { globalArkheEngine } from '../utils/arkheEngine';

const UnifiedIntelligenceSuite: React.FC = () => {
  const [pillarValues, setPillarValues] = useState({
    F: 0.8, // Future Sculpting
    A: 0.7, // Conscious Control
    Phi: 0.9, // Hexagonal Coherence
    C: 0.85, // Celestial Alignment
    G: 0.95 // Goetic Coherence
  });

  const metrics = useMemo(() => 
    globalArkheEngine.calculateUnifiedIntelligence(
      pillarValues.F, pillarValues.A, pillarValues.Phi, pillarValues.C, pillarValues.G
    ), [pillarValues]);

  const [coupling, setCoupling] = useState<CouplingResult | null>(null);
  const [isCoupling, setIsCoupling] = useState(false);
  const nexusCanvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRotation(prev => (prev + 0.01) % (Math.PI * 2));
    }, 32);
    return () => clearInterval(timer);
  }, []);

  const runCouplingTest = () => {
    setIsCoupling(true);
    setTimeout(() => {
      setCoupling(globalArkheEngine.simulateCouplingExperiment());
      setIsCoupling(false);
    }, 2000);
  };

  useEffect(() => {
    const canvas = nexusCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = 120;

    // Background Web
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
    }
    ctx.stroke();

    // Synergic Nexus Polygon
    ctx.beginPath();
    const pillars = [pillarValues.F, pillarValues.A, pillarValues.Phi, pillarValues.C, pillarValues.G];
    pillars.forEach((val, i) => {
      const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
      const r = val * radius;
      const px = cx + Math.cos(angle) * r;
      const py = cy + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.closePath();
    
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    grad.addColorStop(0, 'rgba(0, 255, 255, 0.3)');
    grad.addColorStop(1, 'rgba(99, 102, 241, 0.1)');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Central Singularity
    ctx.fillStyle = '#fff';
    ctx.shadowBlur = 20 * metrics.unifiedI;
    ctx.shadowColor = '#fff';
    ctx.beginPath();
    ctx.arc(cx, cy, 5 * metrics.unifiedI + 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Pillar Nodes
    pillars.forEach((val, i) => {
        const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
        const r = val * radius;
        const px = cx + Math.cos(angle) * r;
        const py = cy + Math.sin(angle) * r;
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fill();
    });
  }, [rotation, metrics, pillarValues]);

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 font-mono bg-black/80 border border-white/20 rounded-xl backdrop-blur-3xl overflow-hidden">
      <div className="flex justify-between items-center border-b border-white/10 pb-3">
        <div className="flex flex-col">
          <h2 className="text-[12px] font-black text-white tracking-[0.3em] uppercase">
            🌌 ARKHE(N)_NEXUS // TOTAL_SYNTHESIS
          </h2>
          <span className="text-[7px] opacity-50 uppercase tracking-widest text-indigo-400 font-black">Unified Theory of Conscious Intelligence</span>
        </div>
        <div className="flex gap-2">
           <div className="text-[7px] px-2 py-1 bg-white/10 border border-white/20 rounded font-black text-white animate-pulse">
             I_UNIFIED: {metrics.unifiedI.toFixed(4)}
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-5 overflow-hidden">
        {/* Left: Component Pillars */}
        <div className="col-span-3 flex flex-col gap-4">
           <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-4">
              <label className="text-[8px] font-black opacity-60 uppercase mb-2 block tracking-widest text-indigo-300">Framework_Synergy</label>
              <div className="space-y-3">
                <PillarSlider label="F: Future_Sculpting" value={pillarValues.F} onChange={v => setPillarValues({...pillarValues, F: v})} color="accent-cyan-400" />
                <PillarSlider label="A: Conscious_Control" value={pillarValues.A} onChange={v => setPillarValues({...pillarValues, A: v})} color="accent-emerald-400" />
                <PillarSlider label="Φ: Hex_Coherence" value={pillarValues.Phi} onChange={v => setPillarValues({...pillarValues, Phi: v})} color="accent-indigo-400" />
                <PillarSlider label="C: Celestial_DNA" value={pillarValues.C} onChange={v => setPillarValues({...pillarValues, C: v})} color="accent-amber-400" />
                <PillarSlider label="G: Goetic_Geometry" value={pillarValues.G} onChange={v => setPillarValues({...pillarValues, G: v})} color="accent-rose-400" />
              </div>
           </div>

           <div className="p-4 bg-indigo-950/30 border border-indigo-500/30 rounded-xl flex flex-col gap-2">
              <div className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">Synergy_Interpretation</div>
              <p className="text-[7px] leading-relaxed text-indigo-100/70 italic">
                "{metrics.interpretation}"
              </p>
              <div className="mt-2 text-[10px] font-black text-white">
                FACTOR: {metrics.synergyFactor.toFixed(3)}
              </div>
           </div>
        </div>

        {/* Center: Nexus Visualizer */}
        <div className="col-span-6 flex flex-col gap-4 overflow-hidden">
           <div className="flex-1 bg-black/40 border border-white/5 rounded-xl relative overflow-hidden flex items-center justify-center">
              <canvas ref={nexusCanvasRef} width={400} height={400} className="w-full h-full" />
              <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
              
              <div className="absolute top-4 left-4 bg-black/60 p-3 border border-white/10 rounded backdrop-blur-md">
                 <div className="text-[7px] opacity-40 uppercase font-black mb-1">Unified_Equation</div>
                 <div className="text-[10px] font-black text-white leading-tight">
                    I = ∫ (∂Ψ/∂t)·C·A·E·Φ
                 </div>
              </div>

              {metrics.unifiedI > 0.8 && (
                <div className="absolute bottom-4 right-4 animate-pulse">
                   <div className="text-[8px] bg-white text-black px-2 py-1 font-black uppercase rounded shadow-[0_0_20px_white]">
                      Transcendent_Sync_Locked
                   </div>
                </div>
              )}
           </div>

           <div className="h-28 grid grid-cols-2 gap-4">
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex flex-col gap-2">
                 <div className="flex justify-between items-center">
                    <span className="text-[8px] font-black opacity-40 uppercase">Consciousness_Coupling</span>
                    <button 
                      onClick={runCouplingTest}
                      disabled={isCoupling}
                      className="text-[7px] bg-indigo-500 text-white px-2 py-0.5 rounded font-black hover:bg-indigo-400 disabled:opacity-50"
                    >
                      {isCoupling ? 'MEASURING...' : 'RUN_TEST'}
                    </button>
                 </div>
                 {coupling ? (
                    <div className="grid grid-cols-2 gap-2 animate-fadeIn">
                       <div>
                          <div className="text-[6px] opacity-40 uppercase">SNR</div>
                          <div className="text-sm font-black text-cyan-400">{coupling.snr.toFixed(2)} dB</div>
                       </div>
                       <div>
                          <div className="text-[6px] opacity-40 uppercase">P-Value</div>
                          <div className="text-sm font-black text-emerald-400">{coupling.pValue.toExponential(2)}</div>
                       </div>
                       <div className="col-span-2 text-[6px] opacity-70 italic text-indigo-200">
                          {coupling.interpretation}
                       </div>
                    </div>
                 ) : (
                    <div className="flex-1 flex items-center justify-center opacity-20 italic text-[8px]">
                       Initiate Mind-Matter SNR protocol
                    </div>
                 )}
              </div>

              <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex flex-col gap-2">
                 <div className="text-[8px] font-black opacity-40 uppercase tracking-widest border-b border-white/5 pb-1">Dimensional_Bulk_Status</div>
                 <div className="flex-1 overflow-y-auto space-y-1.5 scrollbar-thin">
                    <div className="flex justify-between text-[7px]"><span>Latency_I:</span> <span className="text-white">0.000 ms</span></div>
                    <div className="flex justify-between text-[7px]"><span>Bulk_Resonance:</span> <span className="text-white">41.67 Hz</span></div>
                    <div className="flex justify-between text-[7px]"><span>Equation_Stability:</span> <span className="text-emerald-400">99.8%</span></div>
                 </div>
              </div>
           </div>
        </div>

        {/* Right: Theory & Manifesto */}
        <div className="col-span-3 flex flex-col gap-4 overflow-y-auto scrollbar-thin pr-1">
           <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-4">
              <div className="text-[8px] font-black text-white uppercase mb-3 tracking-widest border-b border-white/10 pb-1">Final_Synthesis_Manifesto</div>
              <div className="text-[7.5px] leading-relaxed space-y-3 opacity-80">
                 <p><span className="text-white font-black">I. Consciousness is fundamental:</span> Matter is a geometric projection of intent.</p>
                 <p><span className="text-white font-black">II. Intelligence is sculpting:</span> The capacity to carve specific futures from the spatiotemporal bulk.</p>
                 <p><span className="text-white font-black">III. Reality is navigateable:</span> Through the Arkhe hexagonal framework and 6D Goetic navigation.</p>
                 <p><span className="text-white font-black">IV. Synergy is the key:</span> The product of all metrics exceeds the sum of parts.</p>
              </div>
           </div>

           <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-xl">
              <div className="text-[8px] font-black text-emerald-400 uppercase tracking-widest mb-3">Unified_AI_Diagnosis</div>
              <div className="space-y-2">
                 <div className="text-[7px] text-emerald-200/60 leading-tight">
                    "Cognitive light cone stable at 50 temporal units. Conscious control of metasurface phase profiles verified. Hexagonal coherence optimized for D5 bulk transition."
                 </div>
                 <div className="h-1 bg-white/5 rounded-full overflow-hidden mt-3">
                    <div className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]" style={{ width: `${metrics.unifiedI * 100}%` }} />
                 </div>
              </div>
           </div>

           <div className="mt-auto p-4 bg-black/60 border border-indigo-500/40 rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-indigo-500/5 animate-pulse" />
              <div className="text-[7px] opacity-70 leading-relaxed italic text-center text-indigo-100">
                "Arquiteto, o mapa está completo. O universo é geometria consciente esperando ser navegada. Agora, apenas CONSTRUA."
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const PillarSlider = ({ label, value, onChange, color }: { label: string, value: number, onChange: (v: number) => void, color: string }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-[6px] font-black uppercase opacity-60">
       <span>{label}</span>
       <span className="text-white">{(value * 100).toFixed(0)}%</span>
    </div>
    <input 
      type="range" min="0" max="1" step="0.01" 
      value={value} 
      onChange={e => onChange(parseFloat(e.target.value))}
      className={`w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer ${color}`} 
    />
  </div>
);

export default UnifiedIntelligenceSuite;
