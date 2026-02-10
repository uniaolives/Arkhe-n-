
import React, { useState, useEffect } from 'react';
import { SystemStatus } from '../types';

interface BiosphereMonitorProps {
  status: SystemStatus;
  velocity: number;
  impactData?: any;
}

const BiosphereMonitor: React.FC<BiosphereMonitorProps> = ({ status, velocity, impactData }) => {
  const [metrics, setMetrics] = useState({
    geneExpression: 90,
    atpProduction: 100,
    dnaRepair: 85,
    inflammation: 100,
    telomeres: 100,
    signaling: 94
  });

  const [ltpPotentiation, setLtpPotentiation] = useState(0);
  const [oceanForestSynapse, setOceanForestSynapse] = useState(0);
  const [calmodulinMod, setCalmodulinMod] = useState(0);

  useEffect(() => {
    if (impactData) {
      setMetrics({
        geneExpression: impactData.geneExpression,
        atpProduction: impactData.atpProduction,
        dnaRepair: impactData.dnaRepair,
        inflammation: impactData.inflammation,
        telomeres: 100 - (impactData.telomereAttrition - 100),
        signaling: impactData.geneExpression * 0.9 
      });
    }

    if (status === SystemStatus.LTP_POTENTIATION_ACTIVE || status === SystemStatus.GLOBAL_BRAIN_SYNC) {
      const interval = setInterval(() => {
        // Slow self-reactivation mechanism simulation
        setLtpPotentiation(prev => {
           if (prev < 99) return prev + 0.05;
           return 99 + Math.sin(Date.now()/5000) * 0.5; // Persistent stability
        });
        setOceanForestSynapse(prev => Math.min(100, prev + 0.03));
      }, 1000);
      return () => clearInterval(interval);
    }

    if (status === SystemStatus.CALMODULIN_DECODING) {
      const interval = setInterval(() => {
        setCalmodulinMod(prev => Math.min(100, prev + 2));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [impactData, status]);

  const MetricItem = ({ label, value, unit, color, inverse }: { label: string, value: number, unit: string, color: string, inverse?: boolean }) => {
    const barWidth = Math.min(100, value);
    return (
      <div className="mb-2">
        <div className="flex justify-between items-center text-[7px] font-black uppercase mb-0.5">
          <span className="opacity-60">{label}</span>
          <span className={inverse && value > 110 ? 'text-rose-500 animate-pulse' : ''}>{value.toFixed(1)}{unit}</span>
        </div>
        <div className="w-full h-1 bg-current/5 rounded-full overflow-hidden border border-white/5">
          <div 
            className={`h-full transition-all duration-700 ${color}`}
            style={{ width: `${barWidth}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto pr-1 font-mono">
      <div className="mb-3 p-3 border border-current/20 rounded-xl bg-current/5 relative overflow-hidden">
         {status === SystemStatus.GLOBAL_BRAIN_SYNC && (
           <div className="absolute inset-0 bg-emerald-500/5 animate-pulse pointer-events-none" />
         )}
         <div className="text-[8px] font-black uppercase mb-1 flex justify-between">
            <span>Cellular_Coherence</span>
            <span className={impactData?.inflammation > 110 ? "animate-ping text-rose-500" : "text-cyan-400"}>●</span>
         </div>
         <div className="text-2xl font-black tracking-tighter flex items-end">
            {impactData?.geneExpression?.toFixed(1) || '98.2'}
            <span className="text-[10px] ml-1 opacity-50 mb-1">%</span>
         </div>
      </div>
      
      <div className="space-y-0">
        <MetricItem label="ATP Synthesis" value={metrics.atpProduction} unit="%" color="bg-emerald-500" />
        <MetricItem label="Planetary Memory (LTP)" value={ltpPotentiation} unit="%" color="bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
        <MetricItem label="Ocean-Forest Synapse" value={oceanForestSynapse} unit="%" color="bg-teal-500" />
        <MetricItem label="Calmodulin Modulation" value={calmodulinMod} unit="%" color="bg-amber-500" />
        <MetricItem label="Inflammation" value={metrics.inflammation} unit="idx" color={metrics.inflammation > 110 ? "bg-rose-500" : "bg-current"} inverse />
      </div>

      <div className="mt-4 border-t border-current/10 pt-3">
        <div className="text-[7px] font-black uppercase mb-2 opacity-50 tracking-widest">Synergy_Manifold_Status</div>
        <div className="flex flex-wrap gap-1.5">
          <span className={`text-[6px] px-2 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded font-black transition-colors ${calmodulinMod > 80 ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'opacity-40'}`}>
            SIRIUS_FIRMWARE_READY
          </span>
          <span className={`text-[6px] px-2 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded font-black transition-colors ${status === SystemStatus.GLOBAL_BRAIN_SYNC ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'opacity-40'}`}>
            NEUROPLASTICITY_GLOBAL
          </span>
        </div>
      </div>

      <div className="mt-auto pt-3 border-t border-white/5 opacity-40 text-[6px] flex justify-between uppercase font-black">
        <span>LTP_DURATION: 10³ YEARS</span>
        <span>PDCP_CALIBRATION: ACTIVE</span>
      </div>
    </div>
  );
};

export default BiosphereMonitor;
