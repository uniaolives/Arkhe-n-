
import React, { useState, useEffect } from 'react';

interface NetworkStatusProps {
  active: boolean;
}

const NetworkStatus: React.FC<NetworkStatusProps> = ({ active }) => {
  const [adoption, setAdoption] = useState(12.4);
  const [consistency, setConsistency] = useState(98.2);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setAdoption(prev => Math.min(100, prev + Math.random() * 0.5));
      setConsistency(prev => 95 + Math.random() * 4.9);
    }, 2000);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="space-y-2">
        <div className="flex justify-between text-[9px] font-black uppercase">
          <span className="opacity-50">4D Node Adoption</span>
          <span className="text-emerald-400">{adoption.toFixed(1)}%</span>
        </div>
        <div className="h-1 bg-emerald-900/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-1000"
            style={{ width: `${adoption}%` }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-[9px] font-black uppercase">
          <span className="opacity-50">Geometric Consistency</span>
          <span className="text-cyan-400">{consistency.toFixed(2)}%</span>
        </div>
        <div className="h-1 bg-cyan-900/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)] transition-all duration-1000"
            style={{ width: `${consistency}%` }}
          />
        </div>
      </div>

      <div className="mt-4 border border-emerald-900/20 p-2 rounded bg-emerald-950/10">
        <div className="text-[7px] font-bold opacity-40 uppercase mb-1">Active Vertices</div>
        <div className="grid grid-cols-8 gap-1">
          {Array.from({ length: 16 }).map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full animate-pulse transition-colors ${i < 6 ? 'bg-emerald-500' : 'bg-emerald-900/50'}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NetworkStatus;
