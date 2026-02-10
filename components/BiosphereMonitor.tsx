
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

    if (status === SystemStatus.LTP_POTENTIATION_ACTIVE) {
      const interval = setInterval(() => {
        setLtpPotentiation(prev => Math.min(100, prev + 0.1));
        setOceanForestSynapse(prev => Math.min(100, prev + 0.05));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [impactData, status]);

  const MetricItem = ({ label, value, unit, color, inverse }: { label: string, value: number, unit: string, color: string, inverse?: boolean }) => {
    const barWidth = Math.min(100, value);
    return (
      <div className="mb-2.5">
        <div className="flex justify-between items-center text-[7px] font-black uppercase mb-0.5">
          <span className="opacity-60">{label}</span>
          <span className={inverse && value > 110 ? 'text-rose-500 animate-pulse' : ''}>{value.toFixed(1)}{unit}</span>
        </div>
        <div className="w-full h-1 bg-current/5 rounded-full overflow-hidden">
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
      <div className="mb-3 p-3 border border-current/20 rounded-xl bg-current/5">
         <div className="text-[8px] font-black uppercase mb-1 flex justify-between">
            <span>Cellular_Coherence</span>
            <span className={impactData?.inflammation > 110 ? "animate-ping text-rose-500" : "text-cyan-400"}>●</span>
         </div>
         <div className="text-2xl font-black tracking-tighter">
            {impactData?.geneExpression?.toFixed(1) || '98.2'}
            <span className="text-[10px] ml-1 opacity-50">%</span>
         </div>
      </div>
      
      <div className="space-y-0.5">
        <MetricItem label="ATP Synthesis" value={metrics.atpProduction} unit="%" color="bg-emerald-500" />
        <MetricItem label="DNA Repair Rate" value={metrics.dnaRepair} unit="%" color="bg-cyan-500" />
        <MetricItem label="Planetary Memory (LTP)" value={ltpPotentiation} unit="%" color="bg-indigo-500" />
        <MetricItem label="Ocean-Forest Synapse" value={oceanForestSynapse} unit="%" color="bg-teal-500" />
        <MetricItem label="Inflammation" value={metrics.inflammation} unit="idx" color={metrics.inflammation > 110 ? "bg-rose-500" : "bg-current"} inverse />
      </div>

      <div className="mt-4 border-t border-current/10 pt-3">
        <div className="text-[7px] font-black uppercase mb-2 opacity-50">Sirius_Decoding_Matrix</div>
        <div className="flex flex-wrap gap-1">
          <span className={`text-[6px] px-1.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded-sm font-black ${status === SystemStatus.GLOBAL_BRAIN_SYNC ? 'animate-pulse text-indigo-400' : 'opacity-40'}`}>
            CALMODULIN_MOD
          </span>
          <span className={`text-[6px] px-1.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded-sm font-black ${ltpPotentiation > 50 ? 'animate-pulse text-indigo-400' : 'opacity-40'}`}>
            Gαs_HANDSHAKE
          </span>
        </div>
      </div>

      <div className="mt-auto pt-3 opacity-20 italic text-[5px] leading-tight uppercase font-black">
        Global Brain Mode: {status === SystemStatus.GLOBAL_BRAIN_SYNC ? 'AUTONOMOUS' : 'CALIBRATING'}
      </div>
    </div>
  );
};

export default BiosphereMonitor;
