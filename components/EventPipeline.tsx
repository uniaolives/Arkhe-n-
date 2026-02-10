
import React from 'react';
import { ProcessorStats } from '../types';

interface EventPipelineProps {
  stats: ProcessorStats;
}

const EventPipeline: React.FC<EventPipelineProps> = ({ stats }) => {
  return (
    <div className="flex flex-col h-full gap-2 font-mono">
      <div className="grid grid-cols-4 gap-2 mb-2">
        <StatCard label="REC" value={stats.received} color="text-cyan-400" />
        <StatCard label="PROC" value={stats.processed} color="text-emerald-400" />
        <StatCard label="ERR" value={stats.errors} color="text-rose-500" />
        <StatCard label="LAG" value={`${stats.lag.toFixed(2)}ms`} color="text-amber-500" />
      </div>

      <div className="flex-1 border border-current/10 bg-black/40 rounded p-2 overflow-hidden relative">
        <div className="flex justify-between items-center text-[7px] opacity-40 mb-2 uppercase font-black">
          <span>Pipeline_Stream</span>
          <span>V2.0_Prometheus_Linked</span>
        </div>
        
        {/* Visual Pipeline Flow */}
        <div className="flex items-center justify-between mt-4 px-4 h-12 relative">
          <Node label="INGEST" active={stats.received > 0} />
          <div className="flex-1 h-0.5 bg-current/20 relative">
             <div className="absolute inset-0 bg-current/60 animate-[pipeline_2s_linear_infinite]" />
          </div>
          <Node label="ENRICH" active={stats.processed > 0} />
          <div className="flex-1 h-0.5 bg-current/20 relative">
             <div className="absolute inset-0 bg-current/60 animate-[pipeline_2s_linear_infinite_0.5s]" />
          </div>
          <Node label="STORAGE" active={stats.processed > 0} />
        </div>

        <div className="mt-4 space-y-1">
           <div className="flex justify-between text-[6px] uppercase opacity-60">
              <span>Throughput</span>
              <span>{(stats.processed / Math.max(1, performance.now() / 1000)).toFixed(2)} ev/s</span>
           </div>
           <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 animate-pulse" style={{ width: '65%' }} />
           </div>
        </div>
      </div>

      <style>{`
        @keyframes pipeline {
          0% { transform: scaleX(0); transform-origin: left; }
          50% { transform: scaleX(1); transform-origin: left; }
          51% { transform: scaleX(1); transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: right; }
        }
      `}</style>
    </div>
  );
};

const Node = ({ label, active }: { label: string; active: boolean }) => (
  <div className={`flex flex-col items-center gap-1 ${active ? 'opacity-100' : 'opacity-20'}`}>
    <div className={`w-2 h-2 rounded-full ${active ? 'bg-current animate-pulse' : 'bg-white/20'}`} />
    <span className="text-[6px] font-black">{label}</span>
  </div>
);

const StatCard = ({ label, value, color }: { label: string; value: string | number; color: string }) => (
  <div className="bg-white/5 border border-white/10 p-1.5 rounded flex flex-col items-center justify-center">
    <span className="text-[6px] opacity-40 uppercase font-black">{label}</span>
    <span className={`text-[10px] font-black ${color}`}>{value}</span>
  </div>
);

export default EventPipeline;
