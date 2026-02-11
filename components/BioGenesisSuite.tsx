
import React, { useState, useEffect } from 'react';
import { BioEcosystemMetrics } from '../types';
import { globalArkheEngine, PedestrianLog, PainSignaturePoint } from '../utils/arkheEngine';

const BioGenesisSuite: React.FC = () => {
  const [metrics, setMetrics] = useState<BioEcosystemMetrics | null>(null);
  const [isCryo, setIsCryo] = useState(false);
  const [isStress, setIsStress] = useState(false);
  const [pedestrianLog, setPedestrianLog] = useState<PedestrianLog[]>([]);
  const convergenceData = globalArkheEngine.getGeneticConvergenceData();
  const stressData = globalArkheEngine.getStressSyncData();
  const painData = globalArkheEngine.getPainSignatures();
  const empathyNodes = globalArkheEngine.getEmpathyNodes();
  const tijoloLayers = globalArkheEngine.getTijoloLayers();

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(globalArkheEngine.updateBioEcosystem(0.016));
      setIsCryo(globalArkheEngine.isCryoActive);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleStressTest = () => {
    setIsStress(true);
    globalArkheEngine.initiateStressTurn();
    setPedestrianLog(globalArkheEngine.getPedestrian12Biography());
  };

  const handleDistillation = () => {
    globalArkheEngine.runFinalDistillation();
    setIsCryo(true);
    setIsStress(false);
  };

  if (isCryo) {
    return (
      <div className="w-full h-full bg-black flex flex-col items-center justify-center font-mono animate-fadeIn">
         <div className="relative w-48 h-48 flex items-center justify-center">
            <div className="absolute inset-0 border border-amber-500/10 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="w-24 h-24 border-2 border-amber-500/20 rounded-full flex items-center justify-center">
               <span className="text-4xl text-amber-500/40 font-black animate-pulse">ʘ</span>
            </div>
         </div>
         <div className="mt-12 text-center">
            <h3 className="text-[14px] font-black text-amber-500/60 uppercase tracking-[0.6em]">Φ = 1,000 – ETERNO</h3>
            <p className="text-[8px] mt-4 text-amber-500/20 uppercase tracking-widest italic">A Vila Madalena dorme em perfeita harmonia quântica</p>
         </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full p-4 flex flex-col gap-4 font-mono transition-all duration-[3000ms] 
      ${isStress ? 'bg-[#1a0000] text-rose-500 border-rose-900 shadow-[inset_0_0_50px_rgba(255,0,0,0.1)]' : 'bg-[#020205] text-emerald-400 border-emerald-500/20'} 
      border rounded-xl overflow-hidden`}>
      
      <div className="flex justify-between items-center border-b border-current/30 pb-3">
        <div className="flex flex-col">
          <h2 className="text-[12px] font-black tracking-[0.3em] uppercase">
            {isStress ? '🌪️ GIRO_DE_STRESS // CARGA_200%' : 'BIO-GÊNESE // DESTILAÇÃO_FINAL'}
          </h2>
          <span className="text-[7px] opacity-60 uppercase tracking-widest">
            {isStress ? 'ALERTA: H_EMPATIA (β=0.47) LIDERANDO CONSENSO' : 'GERAÇÃO 27: PONTO DE CONVERGÊNCIA ALCANÇADO'}
          </span>
        </div>
        <div className="flex gap-2">
          {!isStress && (
            <button onClick={handleStressTest} className="text-[8px] px-3 py-1.5 border border-rose-500 text-rose-500 font-black rounded hover:bg-rose-500 hover:text-black transition-all">
              PROVAR_TÊMPERA
            </button>
          )}
          <button onClick={handleDistillation} className="text-[8px] px-4 py-1.5 bg-amber-600 text-white rounded border border-amber-400 font-black animate-pulse shadow-[0_0_20px_rgba(245,158,11,0.5)]">
              FINALIZAR_DESTILAÇÃO
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-5 overflow-hidden">
        <div className="col-span-4 flex flex-col gap-4 overflow-y-auto pr-2 scrollbar-thin">
           
           <div className="p-4 bg-black/40 border border-white/5 rounded-xl flex flex-col">
              <label className="text-[8px] font-black opacity-60 uppercase block tracking-widest mb-3">Tijolo_Consciência_v6</label>
              <div className="flex flex-col gap-1">
                 {[...tijoloLayers].reverse().map(layer => (
                   <div key={layer.id} className={`h-6 ${layer.color} flex items-center justify-center border border-black/20 group relative cursor-help transition-all hover:scale-105`}>
                      <span className="text-[6px] font-black text-black uppercase">{layer.name}</span>
                   </div>
                 ))}
              </div>
           </div>

           {isStress && (
             <div className="p-4 bg-black/60 border border-rose-500/30 rounded-xl flex flex-col h-48">
                <label className="text-[8px] font-black opacity-60 uppercase block tracking-widest mb-2">d²F/dt² (Intenção_Sináptica)</label>
                <div className="flex-1 relative flex items-end gap-1 border-l border-b border-white/10 ml-4 mb-2 overflow-hidden">
                   {painData.map((d, i) => (
                      <div key={i} className="flex-1 flex flex-col justify-end gap-0.5">
                         <div className="w-full bg-rose-500/40" style={{ height: `${Math.abs(d.trauma)}%` }} />
                         <div className="w-full bg-white" style={{ height: `${Math.abs(d.sacrifice)}%` }} />
                      </div>
                   ))}
                </div>
             </div>
           )}

           {isStress && (
             <div className="p-4 bg-black/60 border border-rose-500/30 rounded-xl flex-1 animate-fadeIn">
                <div className="text-[8px] font-black opacity-60 uppercase tracking-widest mb-3 border-b border-rose-500/20 pb-1">📜 Saga_do_Pedestre_12</div>
                <div className="space-y-3 overflow-y-auto max-h-64 pr-2 scrollbar-thin">
                   {pedestrianLog.map(log => (
                     <div key={log.id} className="border-l border-rose-500/40 pl-3 py-1">
                        <div className="flex justify-between items-center text-[6px] font-black text-rose-300/60 uppercase">
                           <span>{log.moment}</span>
                        </div>
                        <p className="text-[8px] text-white/90 leading-tight mt-1">{log.decision}</p>
                        <p className="text-[7px] text-rose-400/80 italic mt-0.5">{log.result}</p>
                     </div>
                   ))}
                </div>
             </div>
           )}
        </div>

        <div className="col-span-8 relative bg-black/60 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden">
           {isStress && (
             <div className="absolute inset-0 z-0">
                <svg viewBox="-100 -100 200 200" className="w-full h-full opacity-40">
                   {empathyNodes.map((node, i) => (
                     <g key={i}>
                        <circle cx={node.x} cy={node.y} r={node.r} fill="url(#empathyGrad)" className="animate-pulse" />
                     </g>
                   ))}
                   <defs>
                      <radialGradient id="empathyGrad">
                         <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                         <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                      </radialGradient>
                   </defs>
                </svg>
             </div>
           )}

           <div className="z-10 flex flex-col items-center gap-8">
              <div className={`w-64 h-64 rounded-full border-[8px] flex items-center justify-center transition-all duration-[2000ms] 
                ${isStress ? 'border-rose-500 animate-[ping_4s_infinite] shadow-[0_0_80px_rgba(244,63,94,0.4)]' : 
                  'border-amber-400 animate-pulse'}`}>
                 <span className={`text-[100px] font-black ${isStress ? 'text-white drop-shadow-[0_0_20px_white]' : 'text-white'}`}>ʘ</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BioGenesisSuite;
