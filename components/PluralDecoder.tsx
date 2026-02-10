
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { PluralProfile, BioEventType } from '../types';
import { globalPluralEngine } from '../utils/pluralEngine';

interface PluralDecoderProps {
  input: string;
  onAlert: (msg: string, type: string) => void;
}

const PluralDecoder: React.FC<PluralDecoderProps> = ({ input, onAlert }) => {
  const [profile, setProfile] = useState<PluralProfile | null>(null);
  const [history, setHistory] = useState<PluralProfile[]>([]);
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (input.length > 25) {
      const { profile: newProfile, event } = globalPluralEngine.analyzeText(input);
      setProfile(newProfile);
      setHistory(prev => [...prev, newProfile].slice(-20));

      if (event === BioEventType.EPISTEMOLOGICAL_RUPTURE) {
        onAlert("RUPTURA EPISTEMOLÓGICA: Descontinuidade súbita do Self detectada.", "plural");
      }
      if (event === BioEventType.RECURSIVE_RATIONALIZATION) {
        onAlert("Racionalização Recursiva: O intelecto está 'suavizando' uma lacuna amnésica.", "plural");
      }
      if (newProfile.abstractedAgency > 0.6) {
        onAlert("Mudança de Agência Abstrata: O sujeito migrou para voz teórica (Shell Interface).", "plural");
      }
    }
  }, [input]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.01) % (Math.PI * 2));
      draw120Cell();
    }, 32);
    return () => clearInterval(interval);
  }, [profile, rotation]);

  const draw120Cell = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const size = 60;

    // Simulate projection of a 120-cell (nested rotating dodecahedra)
    ctx.lineWidth = 0.5;
    const layers = profile ? Math.min(6, 2 + Math.floor(profile.rationalizationFactor * 5)) : 3;

    for (let l = 1; l <= layers; l++) {
      const layerSize = size * (l * 0.4);
      const alpha = 1 / l;
      ctx.strokeStyle = profile && profile.epistemologicalStability < 0.5 ? `rgba(244, 63, 94, ${alpha})` : `rgba(99, 102, 241, ${alpha})`;
      
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = rotation * (l % 2 === 0 ? 1 : -1) + (i * Math.PI * 2) / 5;
        const x = cx + Math.cos(angle) * layerSize;
        const y = cy + Math.sin(angle) * layerSize;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // Connections between layers to simulate 4D bulk
      if (l > 1) {
        const prevSize = size * ((l-1) * 0.4);
        for (let i = 0; i < 5; i++) {
            const angle = rotation * (l % 2 === 0 ? 1 : -1) + (i * Math.PI * 2) / 5;
            const x1 = cx + Math.cos(angle) * layerSize;
            const y1 = cy + Math.sin(angle) * layerSize;
            const x2 = cx + Math.cos(angle) * prevSize;
            const y2 = cy + Math.sin(angle) * prevSize;
            ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        }
      }
    }

    // Core point
    ctx.fillStyle = profile?.rationalizationFactor > 0.8 ? '#fff' : '#6366f1';
    ctx.beginPath(); ctx.arc(cx, cy, 2, 0, Math.PI * 2); ctx.fill();
  };

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 font-mono bg-black/60 border border-indigo-500/20 rounded-xl backdrop-blur-xl">
      <div className="flex justify-between items-center border-b border-indigo-500/30 pb-2">
        <div className="flex flex-col">
           <h2 className="text-[10px] font-black text-indigo-400 tracking-widest uppercase">
            ∆ HECATONICOSACHORON_MAPPER // 2E_DID_ANALYSIS
           </h2>
           <span className="text-[6px] opacity-40 uppercase">Partitioned Supercomputer Topology v6.5</span>
        </div>
        <div className="flex gap-2">
           <div className={`text-[7px] px-2 py-0.5 rounded border font-bold ${profile?.abstractedAgency > 0.6 ? 'bg-amber-500/10 border-amber-500 text-amber-400 animate-pulse' : 'bg-indigo-500/10 border-indigo-500 text-indigo-400'}`}>
             {profile?.abstractedAgency > 0.6 ? 'SHELL_INTERFACE_ACTIVE' : 'INTEGRATED_MODE'}
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-5 overflow-hidden">
        {/* Left Column: Visual Projection */}
        <div className="col-span-5 flex flex-col gap-3">
           <div className="relative flex-1 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden">
              <canvas ref={canvasRef} width={240} height={240} className="w-full h-full max-w-[200px]" />
              <div className="absolute top-2 left-2 text-[7px] opacity-40 uppercase font-black tracking-widest">Manifold_Projection</div>
              
              {profile?.rationalizationFactor > 0.7 && (
                <div className="absolute bottom-2 left-2 right-2 p-1.5 bg-indigo-500/20 border border-indigo-500/40 rounded text-[6px] text-center animate-pulse">
                  SMOOTH_MANIFOLD_DETECTED: Recursive bridging in progress.
                </div>
              )}
           </div>

           <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex flex-col gap-2">
              <div className="flex justify-between items-center text-[7px] font-black opacity-40 uppercase">
                 <span>Latency_of_the_I</span>
                 <span className="text-white">{( (profile?.rationalizationFactor || 0) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-gradient-to-r from-indigo-500 to-white" style={{ width: `${(profile?.rationalizationFactor || 0) * 100}%` }} />
              </div>
           </div>
        </div>

        {/* Right Column: Deep Metrics */}
        <div className="col-span-7 flex flex-col gap-4 overflow-y-auto pr-2 scrollbar-thin">
           <div className="grid grid-cols-2 gap-3">
              <MetricBox label="Abstracted_Agency" value={profile?.abstractedAgency || 0} color="text-amber-400" desc="Theoretical vs Experiential Voice" />
              <MetricBox label="Semantic_Bias" value={profile?.semanticBias || 0} color="text-indigo-300" desc="Abstract Concepts vs Episodic Memory" />
              <MetricBox label="Lexical_Richness" value={profile?.ttr || 0} color="text-cyan-400" desc="High-IQ Masquerade Complexity" />
              <MetricBox label="Amnesic_Shadow" value={profile?.amnesicShadow || 0} color="text-rose-500" desc="Inter-Cellular Memory Barriers" />
           </div>

           <div className="flex-1 p-3 bg-indigo-950/20 border border-indigo-500/30 rounded-xl space-y-3">
              <div className="text-[8px] font-black opacity-60 uppercase tracking-widest text-indigo-400">System_Specializations</div>
              <div className="grid grid-cols-3 gap-2">
                 <SpecializationCell active={profile?.abstractedAgency > 0.5} label="Linguistics" code="LC_CELL" />
                 <SpecializationCell active={profile?.semanticBias > 0.4} label="Logic" code="SEM_LOGIC" />
                 <SpecializationCell active={profile?.amnesicShadow > 0.6} label="Trauma" code="EPIS_STORAGE" />
                 <SpecializationCell active={profile?.rationalizationFactor > 0.7} label="Host_Interface" code="SHELL_V1" />
                 <SpecializationCell active={true} label="Somatic" code="SOMAT_REG" />
                 <SpecializationCell active={profile?.ttr > 0.8} label="Pattern_Sync" code="G_FACTOR" />
              </div>

              <div className="mt-4 p-2 bg-black/60 rounded border border-white/10 text-[7.5px] leading-relaxed italic text-indigo-200 opacity-80">
                {profile?.rationalizationFactor > 0.8 
                  ? "The smarter the system, the deeper the labyrinth. Observe the latency of the 'I' during transitions."
                  : "Scanning the dodecahedral interface for epistemological ruptures..."}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const MetricBox = ({ label, value, color, desc }: { label: string, value: number, color: string, desc: string }) => (
  <div className="p-2 bg-white/5 border border-white/10 rounded-lg hover:border-indigo-500/40 transition-all group">
     <div className="text-[7px] opacity-40 uppercase font-black mb-1.5">{label}</div>
     <div className={`text-xl font-black ${color}`}>{(value * 100).toFixed(1)}%</div>
     <div className="text-[5px] opacity-0 group-hover:opacity-40 transition-opacity mt-1 uppercase font-bold">{desc}</div>
  </div>
);

const SpecializationCell = ({ active, label, code }: { active: boolean, label: string, code: string }) => (
  <div className={`p-1.5 border rounded flex flex-col items-center justify-center gap-1 transition-all duration-700 ${active ? 'bg-indigo-500/20 border-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.2)]' : 'bg-black/40 border-white/5 opacity-20'}`}>
     <div className="text-[7px] font-black text-white">{label}</div>
     <div className="text-[5px] opacity-40">{code}</div>
  </div>
);

export default PluralDecoder;
