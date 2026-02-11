
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { BioAgent, BioEcosystemMetrics, KernelTelemetry } from '../types';
import { globalArkheEngine } from '../utils/arkheEngine';

const TRIBE_COLORS = ['#10b981', '#6366f1', '#f59e0b']; // Alpha (Emerald), Beta (Indigo), Gamma (Amber)

const BioGenesisSuite: React.FC = () => {
  const [metrics, setMetrics] = useState<BioEcosystemMetrics | null>(null);
  const [osMetrics, setOsMetrics] = useState<KernelTelemetry>({
    cpuUsage: 12, memUsage: 45, gpuUsage: 68, gpuTemp: 42, tensorCoreOps: 850,
    activeThreads: 350, ebpfLookups: 1240, numaNodes: [{id: 0, load: 30}, {id: 1, load: 15}], 
    schedulerMode: 'PARALLAX_CLOUD', parallaxSyncStatus: 'HALO_LOCK',
    clusterHealth: 98.2, nodeId: 'DGX_SPARK_01'
  });
  const [isPaused, setIsPaused] = useState(false);
  const [clusterMode, setClusterMode] = useState(false);
  const [agents, setAgents] = useState<BioAgent[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState({ x: 0.5, y: 0.5 });
  const [isDragging, setIsDragging] = useState(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    globalArkheEngine.initPrimordialSoup(400);
    setAgents(globalArkheEngine.getBioAgents());
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      const newMetrics = globalArkheEngine.updateBioEcosystem(0.016);
      setMetrics(newMetrics);
      setAgents([...globalArkheEngine.getBioAgents()]);
      
      setOsMetrics(prev => ({
        ...prev,
        cpuUsage: Math.min(100, 10 + (newMetrics.agentCount / 12) + Math.random()*15),
        gpuUsage: Math.min(100, 40 + (newMetrics.structureCoherence * 50) + Math.random()*10),
        ebpfLookups: prev.ebpfLookups + Math.floor(Math.random()*15),
        numaNodes: prev.numaNodes.map(n => ({ ...n, load: 10 + Math.random()*40 })),
        activeThreads: newMetrics.agentCount,
        clusterHealth: 98.2 + Math.sin(Date.now()/5000) * 0.5
      }));
    }, 16);
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    draw3D();
  }, [agents, rotation, selectedAgentId, clusterMode]);

  const draw3D = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2, cy = canvas.height / 2;
    const scale = 12, gridSize = 100;

    const project = (x: number, y: number, z: number) => {
      let tx = x - gridSize / 2, ty = y - gridSize / 2, tz = z - gridSize / 2;
      const cosY = Math.cos(rotation.y), sinY = Math.sin(rotation.y);
      const nx = tx * cosY - tz * sinY, nz = tx * sinY + tz * cosY;
      tx = nx; tz = nz;
      const cosX = Math.cos(rotation.x), sinX = Math.sin(rotation.x);
      const ny = ty * cosX - tz * sinX, nz2 = ty * sinX + tz * cosX;
      ty = ny; tz = nz2;
      const f = 400 / (400 + tz * scale);
      return { px: cx + tx * scale * f, py: cy + ty * scale * f, visible: tz > -100 };
    };

    // Substrate Bounding Box
    ctx.strokeStyle = clusterMode ? 'rgba(99, 102, 241, 0.3)' : 'rgba(16, 185, 129, 0.1)';
    ctx.lineWidth = 0.5;
    const corners = [[0,0,0], [100,0,0], [100,100,0], [0,100,0], [0,0,100], [100,0,100], [100,100,100], [0,100,100]];
    const edges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
    edges.forEach(e => {
      const p1 = project(corners[e[0]][0], corners[e[0]][1], corners[e[0]][2]);
      const p2 = project(corners[e[1]][0], corners[e[1]][1], corners[e[1]][2]);
      if(p1.visible && p2.visible) { ctx.beginPath(); ctx.moveTo(p1.px, p1.py); ctx.lineTo(p2.px, p2.py); ctx.stroke(); }
    });

    // Parallax Halo Viz (Cluster Mode)
    if (clusterMode) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.setLineDash([5, 5]);
      // Show partition boundaries
      const p1 = project(50, 0, 50); const p2 = project(50, 100, 50);
      if(p1.visible && p2.visible) { ctx.beginPath(); ctx.moveTo(p1.px, p1.py); ctx.lineTo(p2.px, p2.py); ctx.stroke(); }
      ctx.setLineDash([]);
    }

    // Synaptic Bonds
    ctx.lineWidth = 0.3;
    agents.forEach(a => {
      if (a.health <= 0) return;
      const p1 = project(a.position.x, a.position.y, a.position.z);
      if (!p1.visible) return;
      a.neighbors.forEach(nid => {
        const other = agents[nid];
        if (other && other.health > 0) {
          const p2 = project(other.position.x, other.position.y, other.position.z);
          if (p2.visible) {
            ctx.strokeStyle = clusterMode ? `rgba(129, 140, 248, ${0.12 * a.health})` : `rgba(255, 255, 255, ${0.12 * a.health})`;
            ctx.beginPath(); ctx.moveTo(p1.px, p1.py); ctx.lineTo(p2.px, p2.py); ctx.stroke();
          }
        }
      });
    });

    // Speciated Agents
    agents.forEach(a => {
      if (a.health <= 0) return;
      const { px, py, visible } = project(a.position.x, a.position.y, a.position.z);
      if (!visible) return;
      const isSelected = selectedAgentId === a.id;
      ctx.fillStyle = isSelected ? '#fff' : TRIBE_COLORS[a.tribeId];
      ctx.globalAlpha = 0.5 + a.health * 0.5;
      
      // Node Migration Visual
      if (clusterMode && a.position.x > 90) {
        ctx.shadowBlur = 10; ctx.shadowColor = '#fff';
      }

      ctx.beginPath(); ctx.arc(px, py, isSelected ? 4 : 2, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
    });
  };

  const selectedAgent = useMemo(() => 
    selectedAgentId !== null ? globalArkheEngine.getAgentInfo(selectedAgentId) : null, 
    [selectedAgentId, agents]
  );

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 font-mono bg-[#020205] border border-emerald-500/20 rounded-xl overflow-hidden text-emerald-400 shadow-[inset_0_0_50px_rgba(16,185,129,0.05)]">
      <div className="flex justify-between items-center border-b border-emerald-500/30 pb-3">
        <div>
          <h2 className="text-[12px] font-black tracking-[0.3em] uppercase">🧬 LINUX_ARKHE(N) // CLUSTER_LOCAL_VIEW</h2>
          <span className="text-[7px] opacity-60 uppercase">Node: {osMetrics.nodeId} // Parallax Distributed Substrate</span>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={() => setClusterMode(!clusterMode)}
             className={`text-[7px] px-3 py-1 rounded border font-black transition-all ${clusterMode ? 'bg-indigo-600 text-white border-indigo-400 animate-pulse' : 'bg-white/5 border-white/10 text-white/40'}`}
           >
             {clusterMode ? 'VIEW: CLUSTER_BOUNDARIES' : 'VIEW: LOCAL_ONLY'}
           </button>
           <button onClick={() => setIsPaused(!isPaused)} className="text-[7px] px-3 py-1 bg-white/5 border border-white/10 rounded font-black hover:bg-white/10">
             {isPaused ? 'RESUME_DAEMON' : 'PAUSE_DAEMON'}
           </button>
           <button onClick={() => globalArkheEngine.initPrimordialSoup(400)} className="text-[7px] px-3 py-1 bg-emerald-500 text-black rounded font-black shadow-[0_0_15px_#10b981]">
             RESEED_LOCAL_CORE
           </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-5 overflow-hidden">
        {/* Left: HPC Telemetry HUD */}
        <div className="col-span-3 flex flex-col gap-4">
           <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-4 shadow-inner">
              <label className="text-[8px] font-black opacity-60 uppercase block tracking-widest text-white flex justify-between">
                <span>Node_Telemetry</span>
                <span className="text-[6px] text-emerald-500">Uptime: 14h</span>
              </label>
              <MetricLine label="CPU_LOAD" value={osMetrics.cpuUsage} unit="%" color="bg-emerald-500" />
              <MetricLine label="HBM3_VRAM" value={osMetrics.gpuUsage} unit="%" color="bg-indigo-500" />
              
              <div className="grid grid-cols-2 gap-2 mt-2">
                 <div className="p-2 bg-black/40 rounded border border-white/5 text-center">
                    <div className="text-[6px] opacity-40 uppercase">Cluster_Sync</div>
                    <div className="text-[10px] font-black text-white">{osMetrics.clusterHealth.toFixed(1)}%</div>
                 </div>
                 <div className="p-2 bg-black/40 rounded border border-white/5 text-center">
                    <div className="text-[6px] opacity-40 uppercase">Mode</div>
                    <div className="text-[8px] font-black text-amber-400 leading-tight">PARALLAX_SYNC</div>
                 </div>
              </div>
           </div>

           <div className="flex-1 bg-black/40 border border-white/5 rounded-xl p-3 overflow-y-auto scrollbar-thin">
              <div className="text-[8px] font-black text-white uppercase tracking-widest mb-3 border-b border-white/5 pb-1">TRIBAL_SPECIATION</div>
              <div className="space-y-3">
                 <div className="flex items-center gap-2 group">
                    <div className="w-2 h-2 bg-[#10b981] rounded-sm group-hover:animate-pulse" />
                    <span className="text-[7px] text-white">Tribe_Alpha (Spark-Local)</span>
                 </div>
                 <div className="flex items-center gap-2 group">
                    <div className="w-2 h-2 bg-[#6366f1] rounded-sm group-hover:animate-pulse" />
                    <span className="text-[7px] text-white">Tribe_Beta (H100-Remote)</span>
                 </div>
                 <div className="flex items-center gap-2 group">
                    <div className="w-2 h-2 bg-[#f59e0b] rounded-sm group-hover:animate-pulse" />
                    <span className="text-[7px] text-white">Tribe_Gamma (GB200-Core)</span>
                 </div>
              </div>
              {clusterMode && (
                <div className="mt-4 p-2 bg-indigo-950/40 rounded text-[6.5px] leading-tight text-indigo-200 border border-indigo-500/20">
                  Detected {Math.floor(Math.random() * 5)} node-crossing events in last 500ms. RDMA halo synchronization active.
                </div>
              )}
           </div>
        </div>

        {/* Center: DGX Substrate View */}
        <div className="col-span-6 flex flex-col gap-4 overflow-hidden">
           <div 
             className="flex-1 bg-black/60 border border-indigo-500/20 rounded-xl relative overflow-hidden flex items-center justify-center cursor-crosshair shadow-[0_0_40px_rgba(99,102,241,0.05)]"
             onMouseDown={(e) => { setIsDragging(true); lastMouse.current = { x: e.clientX, y: e.clientY }; }}
             onMouseMove={(e) => { if(isDragging) { setRotation(prev => ({ x: prev.x + (e.clientY - lastMouse.current.y) * 0.01, y: prev.y + (e.clientX - lastMouse.current.x) * 0.01 })); lastMouse.current = { x: e.clientX, y: e.clientY }; } }}
             onMouseUp={() => setIsDragging(false)}
             onMouseLeave={() => setIsDragging(false)}
             onClick={(e) => {
               const rect = canvasRef.current?.getBoundingClientRect();
               if(!rect) return;
               setSelectedAgentId(Math.floor(Math.random()*agents.length));
             }}
           >
              <canvas ref={canvasRef} width={600} height={600} className="w-full h-full" />
              <div className="absolute inset-0 pointer-events-none border border-emerald-500/5" style={{ backgroundImage: 'radial-gradient(circle, #4f46e5 0.3px, transparent 0.3px)', backgroundSize: '40px 40px' }} />
              
              <div className="absolute bottom-4 left-4 bg-black/80 p-2 border border-white/10 rounded text-[7px] font-black uppercase text-indigo-400/80 backdrop-blur-sm flex gap-4">
                 <span>Substrate: {clusterMode ? 'CLUSTER_FIELD' : 'LOCAL_TENSOR'}</span>
                 <span>Halo: {osMetrics.parallaxSyncStatus}</span>
                 <span>Node: {osMetrics.nodeId}</span>
              </div>
           </div>
        </div>

        {/* Right: Cognitive Trace & Cluster interface */}
        <div className="col-span-3 flex flex-col gap-4 overflow-y-auto scrollbar-thin pr-1">
           {selectedAgent ? (
             <div className="p-4 bg-indigo-950/20 border border-indigo-500/30 rounded-xl space-y-4 animate-slideInRight">
                <div className="flex justify-between items-start">
                   <div>
                      <h3 className="text-[14px] font-black text-white">PROCESS_ID: {selectedAgent.id}</h3>
                      <span className="text-[8px] font-black uppercase bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">
                        {selectedAgent.cognitiveState.profile}
                      </span>
                   </div>
                   <button onClick={() => setSelectedAgentId(null)} className="text-[12px] opacity-40 hover:opacity-100 font-black text-indigo-400">×</button>
                </div>

                <div className="p-3 bg-black/40 rounded border border-white/10">
                   <div className="text-[7px] opacity-40 uppercase font-black mb-2 flex justify-between">
                     <span>C-I-E-F_Genome</span>
                     <span className="text-white">NODE_AFFINITY: {selectedAgent.tribeId === 2 ? 'GB200' : 'SPARK'}</span>
                   </div>
                   <div className="flex justify-between">
                      {Object.entries(selectedAgent.genome).map(([k, v]) => (
                        <div key={k} className="flex flex-col items-center">
                           <span className="text-[6px] opacity-40 font-bold">{k}</span>
                           <span className="text-[10px] font-black text-white">{(v as number).toFixed(2)}</span>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="space-y-2">
                   <div className="text-[7px] font-black opacity-40 uppercase text-indigo-300">Distributed_Inference_Focus</div>
                   <div className="text-[9px] text-white/90 leading-tight border-l-2 border-indigo-500 pl-2 py-2 bg-white/5 rounded-r">
                      {selectedAgent.cognitiveState.preferences}
                   </div>
                </div>
             </div>
           ) : (
             <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center justify-center h-48 opacity-30 gap-4">
                <div className="w-12 h-12 border border-white/10 rounded-full animate-ping" />
                <p className="text-[8px] font-black uppercase text-center max-w-[120px]">Awaiting node synchronization for process diagnostic</p>
             </div>
           )}

           <div className="mt-auto p-4 bg-indigo-950/40 border border-indigo-500/40 rounded-xl relative overflow-hidden group hover:bg-black/80 transition-all cursor-pointer">
              <div className="text-[8px] font-black text-indigo-300 uppercase tracking-widest mb-2 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                 Parallax_Gateway_Online
              </div>
              <p className="text-[7px] opacity-70 italic text-indigo-100 leading-tight">
                Listening for cross-node migrations via InfiniBand RDMA fabric.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

const MetricLine = ({ label, value, max = 100, unit = "", color }: { label: string, value: number, max?: number, unit?: string, color: string }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-[7px] font-black uppercase opacity-60">
       <span>{label}</span>
       <span className="text-white">{value.toFixed(1)}{unit}</span>
    </div>
    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
       <div className={`h-full ${color} transition-all duration-1000 shadow-[0_0_10px_rgba(99,102,241,0.2)]`} style={{ width: `${Math.min(100, (value/max)*100)}%` }} />
    </div>
  </div>
);

export default BioGenesisSuite;
