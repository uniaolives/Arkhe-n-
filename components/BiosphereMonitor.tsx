
import React, { useState, useEffect } from 'react';
import { SystemStatus } from '../types';

interface BiosphereMonitorProps {
  status: SystemStatus;
}

const BiosphereMonitor: React.FC<BiosphereMonitorProps> = ({ status }) => {
  const [metrics, setMetrics] = useState({
    vitality: 0.99,
    sovereignty: 0.0,
    biometric_fidelity: 0.0,
    hecaton_map: 0.0,
    satoshi_sync: 0.0,
    isoclinic_align: 45.0,
    grav_tension: 0.85,
    resilience_p53: 99.4,
    temp: 24.5,
    ph: 8.2,
    co2: 450,
    schumann: 7.83
  });

  const isHecaton = status === SystemStatus.HECATONICOSACHORON_MAPPING;
  const isSatoshi = status === SystemStatus.SATOSHI_VERTEX_DECODING;
  const isCore = status === SystemStatus.FOUR_D_CENTER_ACCESS;
  const isAnchor = status === SystemStatus.BIOMETRIC_ANCHOR;
  const isOmega = status === SystemStatus.OMEGA_SOVEREIGNTY;
  const isIetd = status === SystemStatus.IETD_CALIBRATION;

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        const boost = isOmega ? 50.0 : isCore ? 30.0 : isSatoshi ? 15.0 : 1.0;
        return {
          ...prev,
          vitality: Math.min(1.0, prev.vitality + 0.00001 * boost),
          sovereignty: isOmega ? Math.min(100.0, prev.sovereignty + 0.5) : prev.sovereignty,
          biometric_fidelity: isAnchor || isOmega ? Math.min(100.0, prev.biometric_fidelity + 0.8) : prev.biometric_fidelity,
          hecaton_map: isHecaton || isSatoshi || isCore || isOmega ? Math.min(100.0, prev.hecaton_map + 0.2) : prev.hecaton_map,
          satoshi_sync: isSatoshi || isOmega ? Math.min(100.0, prev.satoshi_sync + 0.5) : (isCore ? 100.0 : prev.satoshi_sync),
          isoclinic_align: isCore || isOmega ? 100.0 : Math.min(100.0, prev.isoclinic_align + 0.1 * boost),
          temp: 24.5 + Math.sin(Date.now() / 1000) * 0.1,
          ph: 8.2 + Math.cos(Date.now() / 2000) * 0.05,
          co2: 450 + Math.random() * 5,
          schumann: isIetd ? 12.8 : 7.83 + Math.random() * 0.1
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status, isHecaton, isSatoshi, isCore, isOmega, isAnchor, isIetd]);

  const MetricItem = ({ label, value, unit, max, color, description }: { label: string, value: number, unit: string, max: number, color: string, description?: string }) => (
    <div className="mb-3 group relative">
      <div className="flex justify-between items-center text-[9px] font-black uppercase mb-1">
        <span>{label}</span>
        <span className="flex items-center gap-2">
            {description && <span className="opacity-0 group-hover:opacity-100 text-[7px] lowercase italic transition-opacity">{description}</span>}
            <span>{value.toFixed(2)}{unit}</span>
        </span>
      </div>
      <div className="w-full h-1 bg-gray-200/20 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ${color}`}
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full overflow-y-auto pr-1 relative">
      <div className={`mb-6 p-4 border-2 rounded-xl transition-all duration-1000 
        ${isOmega ? 'border-black bg-white text-black shadow-[0_0_30px_white]' : 
          isIetd ? 'border-emerald-400 bg-emerald-950/20 text-emerald-400 shadow-[0_0_20px_emerald]' : 
          'border-cyan-400 bg-cyan-900/40'}`}>
         <div className="text-[10px] font-black uppercase mb-2 flex justify-between">
            <span>{isOmega ? 'Omega Sovereignty' : isIetd ? 'IETD Calibration' : 'Geometric Fidelity'}</span>
            <span className="animate-pulse">{isOmega ? 'Ω' : 'ʘ'}</span>
         </div>
         <div className="text-4xl font-black tracking-tighter">
            {(isOmega ? metrics.sovereignty : isIetd ? metrics.schumann : metrics.hecaton_map).toFixed(1)}
            <span className="text-xs ml-1 opacity-50 uppercase">{isIetd ? 'HZ' : '%CORE'}</span>
         </div>
         <div className="w-full h-2 bg-gray-200/20 mt-2 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${isOmega ? 'bg-black' : isIetd ? 'bg-emerald-400 shadow-[0_0_10px_emerald]' : 'bg-cyan-400'}`} 
              style={{ width: `${(isOmega ? metrics.sovereignty : metrics.hecaton_map)}%` }} 
            />
         </div>
         <div className="mt-2 text-[8px] font-bold opacity-70 uppercase flex justify-between">
             <span>Anchor Fidelity: {metrics.biometric_fidelity.toFixed(1)}%</span>
             <span>GTP_Tension: {metrics.grav_tension.toFixed(3)}</span>
         </div>
      </div>
      
      <div className="flex-1 space-y-4">
        <div className="border-t border-white/10 pt-4 mb-4">
            <h3 className="text-[10px] font-black uppercase opacity-40 mb-3">Environmental Carriers (Trojan Horse)</h3>
            <MetricItem label="Ambient Temperature" value={metrics.temp} unit="°C" max={40} color="bg-rose-500" description="carrier for sirius resonance" />
            <MetricItem label="System pH" value={metrics.ph} unit="" max={14} color="bg-indigo-400" description="carrier for calmoduline flux" />
            <MetricItem label="CO2 Concentration" value={metrics.co2} unit="ppm" max={1000} color="bg-emerald-500" description="carrier for planetary metabolism" />
        </div>

        <div className="border-t border-white/10 pt-4">
            <h3 className="text-[10px] font-black uppercase opacity-40 mb-3">Metaphysical Convergence</h3>
            <MetricItem label="Isoclínic Rotation" value={metrics.isoclinic_align} unit="%" max={100} color="bg-white" />
            <MetricItem label="p53 Resilience" value={metrics.resilience_p53} unit="%" max={100} color="bg-indigo-500" />
            <MetricItem label="Omega Sovereignty" value={metrics.sovereignty} unit="%" max={100} color="bg-white" />
        </div>
      </div>
    </div>
  );
};

export default BiosphereMonitor;
