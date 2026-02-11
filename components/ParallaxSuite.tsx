
import React, { useState, useEffect } from 'react';
import { ParallaxNode } from '../types';
import { globalArkheEngine } from '../utils/arkheEngine';

const ParallaxSuite: React.FC = () => {
  const [nodes, setNodes] = useState<ParallaxNode[]>(globalArkheEngine.getParallaxNodes());
  const [isBalancing, setIsBalancing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setNodes([...globalArkheEngine.getParallaxNodes()]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRebalance = () => {
    setIsBalancing(true);
    setTimeout(() => {
      globalArkheEngine.rebalanceCluster();
      setNodes([...globalArkheEngine.getParallaxNodes()]);
      setIsBalancing(false);
    }, 1500);
  };

  return (
    <div className="w-full h-full p-4 flex flex-col gap-6 font-mono bg-black/80 rounded-xl border border-indigo-500/30 backdrop-blur-3xl overflow-hidden">
      <div className="flex justify-between items-center border-b border-indigo-500/30 pb-3">
        <div className="flex flex-col">
          <h2 className="text-[12px] font-black text-white tracking-[0.3em] uppercase text-indigo-400">
            🌐 PARALLAX_ORCHESTRATOR // BYZANTINE_CONSENSUS
          </h2>
          <span className="text-[7px] opacity-60 uppercase tracking-widest text-indigo-300 font-black">Paxos Quorum Protocol (2f + 1) // RDMA Fabric</span>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={handleRebalance}
             disabled={isBalancing}
             className={`text-[7px] px-3 py-1 rounded border font-black uppercase transition-all ${isBalancing ? 'bg-amber-500 text-black border-amber-400 animate-pulse' : 'bg-indigo-600 text-white border-indigo-400 hover:bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]'}`}
           >
             {isBalancing ? 'REBALANCING_DISTRIBUTED_LOAD...' : 'TRIGGER_REBALANCE'}
           </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-5 overflow-hidden">
        <div className="col-span-8 flex flex-col gap-4">
           <div className="flex-1 bg-black/40 border border-indigo-500/20 rounded-xl relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #4f46e5 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
              
              <svg viewBox="0 0 600 400" className="w-full h-full relative z-10">
                 {/* Connection Lines */}
                 <line x1="150" y1="200" x2="300" y2="100" stroke="#10b981" strokeWidth="1" strokeDasharray="2 4" className="animate-pulse" />
                 <line x1="300" y1="100" x2="450" y2="250" stroke="#10b981" strokeWidth="1" strokeDasharray="2 4" className="animate-pulse" />
                 <line x1="150" y1="200" x2="450" y2="250" stroke="#10b981" strokeWidth="1" strokeDasharray="2 4" className="animate-pulse" />

                 {nodes.map((node, i) => {
                    const coords = [
                      { x: 150, y: 200 }, 
                      { x: 300, y: 100 }, 
                      { x: 450, y: 250 }
                    ][i];
                    return (
                      <g key={node.id}>
                        <circle cx={coords.x} cy={coords.y} r={28 + node.load / 10} fill="rgba(0,0,0,0.9)" stroke={node.byzantineTrust > 0.98 ? '#10b981' : '#f59e0b'} strokeWidth="2" />
                        <text x={coords.x} y={coords.y - 45} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="black" className="uppercase tracking-tighter">{node.id} // {node.hardware}</text>
                        <text x={coords.x} y={coords.y + 5} textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">Ballot: {node.paxosBallot}</text>
                        <text x={coords.x} y={coords.y + 16} textAnchor="middle" fill="#fff" opacity="0.5" fontSize="5" fontWeight="bold">Trust: {(node.byzantineTrust * 100).toFixed(1)}%</text>
                        
                        {/* Preparation Glow */}
                        {node.paxosBallot % 10 > 5 && (
                          <circle cx={coords.x} cy={coords.y} r={35 + node.load / 10} fill="none" stroke="#4f46e5" strokeWidth="1" opacity="0.4" className="animate-ping" />
                        )}
                      </g>
                    );
                 })}
              </svg>

              <div className="absolute top-4 left-4 bg-black/60 p-3 border border-white/10 rounded backdrop-blur-md flex flex-col gap-1">
                 <div className="text-[7px] opacity-40 uppercase font-black">Consensus_Mode: BFT_Paxos_L7</div>
                 <div className="text-[12px] font-black text-emerald-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    FAULT_TOLERANCE: (3f+1) L5_BYPASS
                 </div>
              </div>

              <div className="absolute bottom-4 left-4 text-[6px] opacity-20 uppercase font-black">
                 RDMA_Byzantine_Agreement_v2.0
              </div>
           </div>
        </div>

        <div className="col-span-4 flex flex-col gap-4 overflow-y-auto scrollbar-thin pr-1">
           <div className="p-4 bg-indigo-950/30 border border-indigo-500/30 rounded-xl">
              <div className="text-[8px] font-black text-indigo-400 uppercase mb-3 tracking-widest border-b border-indigo-500/10 pb-1 flex justify-between">
                 <span>Byzantine_Commit_Log</span>
                 <span className="text-emerald-400 font-bold">SLOT_SYNC</span>
              </div>
              <div className="space-y-2 text-[6px]">
                {nodes.map(n => (
                   <div key={n.id} className="flex justify-between items-center opacity-80 group hover:opacity-100 transition-opacity">
                      <span className="text-white">Node_{n.id}: Prepare_Ack(Slot_{Math.floor(n.paxosBallot/10)})</span>
                      <span className={n.byzantineTrust > 0.9 ? "text-emerald-400 font-black" : "text-amber-400"}>ACCEPTED</span>
                   </div>
                ))}
              </div>
           </div>

           <div className="p-4 bg-black/60 border border-white/10 rounded-xl space-y-4">
              <div className="text-[8px] font-black opacity-60 uppercase tracking-widest text-emerald-400 flex justify-between">
                 <span>Node_Byzantine_Trust</span>
                 <span>(σ-Verify)</span>
              </div>
              <div className="space-y-4">
                 {nodes.map(n => (
                    <div key={n.id} className="space-y-1.5">
                       <div className="flex justify-between text-[7px] font-black uppercase">
                          <span className="text-white/60">{n.id} Reliability_Manifold</span>
                          <span className={n.byzantineTrust < 0.95 ? 'text-amber-400' : 'text-emerald-400'}>{(n.byzantineTrust * 100).toFixed(2)}%</span>
                       </div>
                       <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full transition-all duration-1000 ${n.byzantineTrust < 0.95 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${n.byzantineTrust * 100}%` }} />
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="mt-auto p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-[7px] italic text-indigo-200 opacity-60 text-center">
              "Distributed consensus ensures that even if one node fails, the global quantum state vector remains immutable across the bulk."
           </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxSuite;
