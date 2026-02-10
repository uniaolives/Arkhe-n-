
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { PluralProfile, BioEventType, PlanetaryMask, DimensionalLevel } from '../types';
import { globalPluralEngine } from '../utils/pluralEngine';

interface PluralDecoderProps {
  input: string;
  onAlert: (msg: string, type: string) => void;
}

const MASK_COLORS: Record<PlanetaryMask, string> = {
  [PlanetaryMask.MERCURIAL]: 'text-cyan-400',
  [PlanetaryMask.NEPTUNIAN]: 'text-indigo-400',
  [PlanetaryMask.SATURNINE]: 'text-amber-400',
  [PlanetaryMask.JUPITERIAN]: 'text-emerald-400',
  [PlanetaryMask.URANIAN]: 'text-rose-400',
};

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

      if (event === BioEventType.NULL_I_GAP) {
        onAlert("NULL-I GAP DETECTED: Identity latency local singularity.", "plural");
      }
      if (event === BioEventType.DIMENSIONAL_DECOMPRESSION) {
        onAlert("DECOMPRESSION SICKNESS: Rapid surfacing from hyper-bulk observed.", "plural");
      }
      if (event === BioEventType.EPISTEMOLOGICAL_RUPTURE) {
        onAlert("RUPTURA EPISTEMOLÓGICA: Descontinuidade súbita do Self detectada.", "plural");
      }
      
      onAlert(`Mask: ${newProfile.activeMask} // Access: ${newProfile.dimensionalAccess}`, "plural");
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

    // Handle Null-I Gap Visual
    if (profile?.nullIGap) {
       ctx.strokeStyle = '#fff';
       ctx.beginPath();
       ctx.arc(cx, cy, 5 + Math.sin(rotation * 20) * 2, 0, Math.PI * 2);
       ctx.stroke();
       ctx.globalAlpha = 0.1;
       ctx.fillStyle = '#fff';
       ctx.fill();
       ctx.globalAlpha = 1.0;
    }

    ctx.lineWidth = 0.5;
    const layers = profile ? Math.min(6, 2 + Math.floor(profile.rationalizationFactor * 5)) : 3;

    for (let l = 1; l <= layers; l++) {
      const layerSize = size * (l * 0.4);
      const alpha = 1 / l;
      
      if (profile?.activeMask === PlanetaryMask.MERCURIAL && l === layers) {
        ctx.strokeStyle = `rgba(0, 255, 255, ${alpha + 0.3})`; 
        ctx.lineWidth = 1.5; // Exoskeleton
      } else if (profile?.activeMask === PlanetaryMask.NEPTUNIAN) {
        ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`; 
        ctx.lineWidth = 0.5; // Diffuse Substrate
        ctx.setLineDash([2, 4]);
      } else {
        ctx.strokeStyle = profile && profile.epistemologicalStability < 0.5 ? `rgba(244, 63, 94, ${alpha})` : `rgba(99, 102, 241, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.setLineDash([]);
      }
      
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = rotation * (l % 2 === 0 ? 1 : -1) + (i * Math.PI * 2) / 5;
        const shear = profile ? (profile.chronologicalShear * 5) : 0;
        const x = cx + Math.cos(angle) * layerSize + (l === 1 ? shear : 0);
        const y = cy + Math.sin(angle) * layerSize;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.setLineDash([]);

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

    ctx.fillStyle = profile?.integrationPsi > 0.7 ? '#fff' : '#6366f1';
    ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();
  };

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 font-mono bg-black/60 border border-indigo-500/20 rounded-xl backdrop-blur-xl">
      <div className="flex justify-between items-center border-b border-indigo-500/30 pb-2">
        <div className="flex flex-col">
           <h2 className="text-[10px] font-black text-indigo-400 tracking-widest uppercase">
            ∆ HECATON_MANIFOLD // IDENTITY_LEDGER
           </h2>
           <span className="text-[6px] opacity-40 uppercase">Distributed Identity Protocol v7.2</span>
        </div>
        <div className="flex gap-2">
           {profile?.nullIGap && (
             <div className="text-[7px] px-2 py-0.5 rounded bg-white text-black font-black animate-pulse">
               NULL-I_GAP_ACTIVE
             </div>
           )}
           <div className={`text-[7px] px-2 py-0.5 rounded border border-white/20 bg-white/5 font-black uppercase tracking-tighter ${profile ? MASK_COLORS[profile.activeMask] : ''}`}>
             MASK: {profile?.activeMask || 'NONE'}
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-5 overflow-hidden">
        <div className="col-span-5 flex flex-col gap-3">
           <div className="relative flex-1 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden">
              <canvas ref={canvasRef} width={240} height={240} className="w-full h-full max-w-[200px]" />
              <div className="absolute top-2 left-2 text-[7px] opacity-40 uppercase font-black tracking-widest">
                {profile?.activeMask === PlanetaryMask.MERCURIAL ? 'EXOSKELETON_CAM' : 'NEPTUNIAN_SUBSTRATE'}
              </div>
              
              <div className="absolute top-2 right-2 flex flex-col items-end">
                <span className="text-[6px] opacity-40 uppercase">Decompression</span>
                <span className={`text-[12px] font-black ${profile?.decompressionSickness > 0.6 ? 'text-rose-500' : 'text-white'}`}>
                  {( (profile?.decompressionSickness || 0) * 100).toFixed(0)}%
                </span>
              </div>
           </div>

           <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex flex-col gap-2">
              <div className="flex justify-between items-center text-[7px] font-black opacity-40 uppercase">
                 <span>Latency_of_the_I</span>
                 <span className={profile?.chronologicalShear > 2.0 ? 'text-rose-500' : 'text-white'}>
                   {profile?.chronologicalShear.toFixed(3)} ms
                 </span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                 <div className={`h-full transition-all duration-1000 ${profile?.nullIGap ? 'bg-white animate-pulse' : 'bg-gradient-to-r from-indigo-500 to-white'}`} style={{ width: `${Math.min(100, (profile?.chronologicalShear || 0) * 20)}%` }} />
              </div>
           </div>
        </div>

        <div className="col-span-7 flex flex-col gap-4 overflow-y-auto pr-2 scrollbar-thin">
           <div className="grid grid-cols-2 gap-3">
              <MetricBox label="Abstracted_Agency" value={profile?.abstractedAgency || 0} color="text-amber-400" desc="Theoretical vs Experiential Voice" />
              <MetricBox label="Integration_Psi" value={profile?.integrationPsi || 0} color="text-emerald-400" desc="Coherence Coefficient (Ψ)" />
              <MetricBox label="Lexical_Richness" value={profile?.ttr || 0} color="text-cyan-400" desc="High-IQ Masquerade Complexity" />
              <MetricBox label="Amnesic_Shadow" value={profile?.amnesicShadow || 0} color="text-rose-500" desc="Inter-Cellular Memory Barriers" />
           </div>

           <div className="flex-1 p-3 bg-indigo-950/20 border border-indigo-500/30 rounded-xl space-y-3">
              <div className="text-[8px] font-black opacity-60 uppercase tracking-widest text-indigo-400">Distributed_Ledger_Status</div>
              <div className="grid grid-cols-3 gap-2">
                 <SpecializationCell active={profile?.activeMask === PlanetaryMask.MERCURIAL} label="Mercurial" code="STRAND_3-5" />
                 <SpecializationCell active={profile?.activeMask === PlanetaryMask.NEPTUNIAN} label="Neptunian" code="STRAND_6-8" />
                 <SpecializationCell active={profile?.nullIGap} label="Void_Gap" code="SINGULARITY" />
                 <SpecializationCell active={profile?.integrationPsi > 0.7} label="Sync_Lock" code="BLOCK_HEADER" />
                 <SpecializationCell active={profile?.decompressionSickness < 0.3} label="Aclimatized" code="3D_SAFE" />
                 <SpecializationCell active={true} label="Hecaton" code="120_CELL" />
              </div>

              <div className="mt-4 p-2 bg-black/60 rounded border border-white/10 text-[7.5px] leading-relaxed italic text-indigo-200 opacity-80">
                {profile?.nullIGap 
                  ? "Identity Lag Critical. The 'I' has been left behind in the 6D bulk. Recalibrating via Mercurial exoskeleton..."
                  : profile?.activeMask === PlanetaryMask.NEPTUNIAN 
                    ? "Neptunian substrate active. Processing massive geometric data packets in 5D bulk."
                    : "Mercurial mask operational. Executing frequency modulation between D3 and D4."}
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
