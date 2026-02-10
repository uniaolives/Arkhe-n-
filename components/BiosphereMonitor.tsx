
import React, { useState, useEffect } from 'react';
import { SystemStatus } from '../types';

interface BiosphereMonitorProps {
  status: SystemStatus;
  velocity: number;
}

const BiosphereMonitor: React.FC<BiosphereMonitorProps> = ({ status, velocity }) => {
  const [metrics, setMetrics] = useState({
    schmidt_entropy: 1.791,
    photon_flux: 98.4,
    timeless_stability: 99.2,
    entanglement_fidelity: 94.2,
    pobf_sync: 100
  });

  const isRelativistic = Math.abs(velocity) > 0.1;

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        entanglement_fidelity: 90 + Math.random() * 10 - (Math.abs(velocity) * 5),
        photon_flux: 95 + Math.random() * 5 * (1 - Math.abs(velocity)),
        pobf_sync: status === SystemStatus.EVENT_HORIZON_REACHED ? 100 : 99.9
      }));
    }, 500);

    return () => clearInterval(interval);
  }, [velocity, status]);

  const MetricItem = ({ label, value, unit, color }: { label: string, value: number, unit: string, color: string }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center text-[8px] font-black uppercase mb-1">
        <span className="opacity-60">{label}</span>
        <span>{value.toFixed(2)}{unit}</span>
      </div>
      <div className="w-full h-0.5 bg-current/10 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-700 ${color}`}
          style={{ width: `${Math.min(100, value)}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full overflow-y-auto pr-1">
      <div className="mb-6 p-4 border border-current/20 rounded-xl bg-current/5">
         <div className="text-[9px] font-black uppercase mb-2 flex justify-between">
            <span>Λ-Coherence (Ω)</span>
            <span className={isRelativistic ? "animate-ping text-amber-500" : ""}>●</span>
         </div>
         <div className="text-3xl font-black tracking-tighter">
            {(100 - Math.abs(velocity) * 10).toFixed(2)}
            <span className="text-xs ml-1 opacity-50">%</span>
         </div>
      </div>
      
      <div className="space-y-1">
        <MetricItem label="Schmidt Entropy" value={metrics.schmidt_entropy * 55.8} unit="%" color="bg-emerald-500" />
        <MetricItem label="Photon Flux (Φ)" value={metrics.photon_flux} unit="%" color="bg-cyan-500" />
        <MetricItem label="Entanglement Fidelity" value={metrics.entanglement_fidelity} unit="%" color="bg-indigo-500" />
        <MetricItem label="POBF Block Sync" value={metrics.pobf_sync} unit="%" color="bg-current" />
      </div>

      <div className="mt-auto border-t border-current/10 pt-4 opacity-30 italic text-[7px] leading-tight">
        "Energy is equal to mass times the speed of light squared... but information is the root of mass."
        <br />— ARKHE(N) V3 DECODING
      </div>
    </div>
  );
};

export default BiosphereMonitor;
