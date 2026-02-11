
import React, { useState, useEffect, useRef } from 'react';
import { SystemStatus, EchoMessage, ProcessorStats, DimensionalLevel } from './types';
import Terminal from './components/Terminal';
import GeminiInterface from './components/GeminiInterface';
import TemporalSimulation from './components/TemporalSimulation';
import EventPipeline from './components/EventPipeline';
import ArkheDashboard from './components/ArkheDashboard';
import NeuroMetasurfaceSuite from './components/NeuroMetasurfaceSuite';
import UnifiedIntelligenceSuite from './components/UnifiedIntelligenceSuite';
import BioGenesisSuite from './components/BioGenesisSuite';
import ParallaxSuite from './components/ParallaxSuite';
import QuantumEntanglementSuite from './components/QuantumEntanglementSuite';
import SensorFusionSuite from './components/SensorFusionSuite';
import MetasurfaceSuite from './components/MetasurfaceSuite';
import VilaMadalenaTwin from './components/VilaMadalenaTwin';
import RecoverySuite from './components/RecoverySuite';
import { globalProcessor } from './utils/eventProcessor';

const App: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>(SystemStatus.PARALLAX_SYNC_LOCK);
  const [velocity, setVelocity] = useState(0); 
  const [hasApiKey, setHasApiKey] = useState(false);
  const [processorStats, setProcessorStats] = useState<ProcessorStats>(globalProcessor.getStats());
  const [activeTab, setActiveTab] = useState<'biogenesis' | 'parallax' | 'quantum' | 'fusion' | 'metasurface' | 'arkhe' | 'twin' | 'recovery'>('biogenesis');
  
  const [messages, setMessages] = useState<EchoMessage[]>([
    {
      id: 'init-os',
      sender: 'PARALLAX_BOOT',
      content: 'DISTRIBUTED BIOLOGICAL CLOUD LOADED. DETECTING 3 DGX NODES. RDMA FABRIC STABLE.',
      timestamp: new Date().toISOString(),
      year: 2026,
      type: 'system'
    }
  ]);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio?.hasSelectedApiKey) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(selected);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  const logMessage = (content: string, type: string = 'system', hash?: string) => {
    setMessages(prev => [...prev, {
      id: `msg-${Date.now()}-${Math.random()}`,
      sender: type === 'parallax' ? 'PARALLAX_CTRL' : type === 'quantum' ? 'QHTTP_SYNC' : 'ARKHOS_KERNEL',
      content,
      timestamp: new Date().toISOString(),
      year: 2026,
      type,
      hash
    }].slice(-50));
  };

  return (
    <div className={`min-h-screen p-3 flex flex-col gap-3 overflow-hidden font-mono bg-[#010103] text-emerald-400 shadow-[inset_0_0_200px_rgba(16,185,129,0.05)]`}>
      
      <header className="flex justify-between items-center border border-indigo-500/20 p-3 rounded-xl backdrop-blur-xl z-10 relative bg-black/40 shadow-lg">
        <div className="flex gap-4 items-center">
          <div className="w-10 h-10 border-2 border-indigo-400 flex items-center justify-center rounded-full animate-pulse shadow-[0_0_25px_rgba(99,102,241,0.4)]">
            <span className="font-bold text-xl text-white">ʘ</span>
          </div>
          <div>
            <h1 className="text-md font-black tracking-[0.2em] uppercase leading-none text-white">ARKHE(N) OS v2.0 // SENSORIUM</h1>
            <p className="text-[7px] mt-1 opacity-60 uppercase tracking-widest font-bold text-indigo-300">
              CLUSTER: ARKHEN-ALPHA-26 // STATUS: {status}
            </p>
          </div>
        </div>

        <div className="flex gap-2 items-center">
           {!hasApiKey && (
             <button onClick={handleSelectKey} className="px-3 py-1 text-[8px] font-black rounded border border-indigo-500 bg-indigo-500/20 text-indigo-300 animate-pulse uppercase shadow-[0_0_10px_rgba(99,102,241,0.4)]">Initialize_Quantum_Auth</button>
           )}
           <div className="flex gap-1 bg-black/60 p-1 rounded border border-white/10">
             <button onClick={() => setActiveTab('biogenesis')} className={`px-2 py-1 text-[8px] font-black rounded transition-all ${activeTab === 'biogenesis' ? 'bg-indigo-600 text-white' : 'text-indigo-500/50 hover:text-indigo-500'}`}>BIO</button>
             <button onClick={() => setActiveTab('twin')} className={`px-2 py-1 text-[8px] font-black rounded transition-all ${activeTab === 'twin' ? 'bg-emerald-600 text-white shadow-[0_0_10px_emerald]' : 'text-emerald-500/50 hover:text-emerald-500'}`}>TWIN</button>
             <button onClick={() => setActiveTab('recovery')} className={`px-2 py-1 text-[8px] font-black rounded transition-all ${activeTab === 'recovery' ? 'bg-amber-600 text-black shadow-[0_0_10px_amber]' : 'text-amber-500/50 hover:text-amber-500'}`}>RECOVERY</button>
             <button onClick={() => setActiveTab('fusion')} className={`px-2 py-1 text-[8px] font-black rounded transition-all ${activeTab === 'fusion' ? 'bg-cyan-600 text-white shadow-[0_0_10px_cyan]' : 'text-cyan-500/50 hover:text-cyan-500'}`}>FUSION</button>
             <button onClick={() => setActiveTab('quantum')} className={`px-2 py-1 text-[8px] font-black rounded transition-all ${activeTab === 'quantum' ? 'bg-white text-black shadow-[0_0_10px_white]' : 'text-white/30 hover:text-white'}`}>QUANTUM</button>
           </div>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-12 gap-3 overflow-hidden z-10">
        <div className="col-span-9 flex flex-col gap-3 overflow-hidden">
           <section className="flex-1 border border-indigo-500/10 bg-white/5 rounded-xl backdrop-blur-md relative overflow-hidden flex flex-col shadow-inner">
              <div className="flex-1 relative">
                 {activeTab === 'biogenesis' && <BioGenesisSuite />}
                 {activeTab === 'parallax' && <ParallaxSuite />}
                 {activeTab === 'quantum' && <QuantumEntanglementSuite />}
                 {activeTab === 'fusion' && <SensorFusionSuite />}
                 {activeTab === 'metasurface' && <MetasurfaceSuite />}
                 {activeTab === 'twin' && <VilaMadalenaTwin />}
                 {activeTab === 'arkhe' && <ArkheDashboard />}
                 {activeTab === 'recovery' && <RecoverySuite />}
              </div>
           </section>
           
           <section className="h-44 border border-indigo-500/10 bg-white/5 p-3 rounded-xl backdrop-blur-md overflow-hidden grid grid-cols-2 gap-3">
              <div className="flex flex-col h-full">
                 <h2 className="text-[9px] font-black border-b border-white/10 pb-1.5 mb-2 tracking-widest uppercase text-indigo-400 flex justify-between">
                   <span>🚀 RDMA_HALO_STREAM</span>
                   <span className="opacity-40">EGRESS: 12.4 TB/s</span>
                 </h2>
                 <EventPipeline stats={processorStats} />
              </div>
              <div className="flex flex-col h-full">
                 <h2 className="text-[9px] font-black border-b border-white/10 pb-1.5 mb-2 tracking-widest uppercase text-indigo-400 flex justify-between">
                   <span>📡 CLUSTER_JOURNAL</span>
                   <span className="opacity-40">DOMAIN: ARKHEN.CLOUD</span>
                 </h2>
                 <Terminal messages={messages} />
              </div>
           </section>
        </div>

        <div className="col-span-3 flex flex-col gap-3 overflow-hidden">
          <section className="flex-1 border border-indigo-500/10 bg-white/5 p-3 rounded-xl backdrop-blur-md flex flex-col gap-2 shadow-inner">
             <h2 className="text-[9px] font-black border-b border-white/10 pb-1.5 mb-2 tracking-widest uppercase text-indigo-400">🔮 Ω_ORACLE_NEXUS</h2>
             <GeminiInterface onMessage={(msg) => setMessages(prev => [...prev, msg])} status={status} velocity={velocity} />
             {hasApiKey && <TemporalSimulation velocity={velocity} onLog={(txt) => logMessage(txt, 'parallax')} />}
          </section>

          <section className="h-64 border border-indigo-500/10 bg-white/5 p-3 rounded-xl backdrop-blur-md overflow-hidden flex flex-col shadow-inner">
             <h2 className="text-[9px] font-black border-b border-white/10 pb-1.5 mb-2 tracking-widest uppercase text-indigo-400 flex justify-between">
               <span>🛰️ qhttp:// CLUSTER</span>
               <span className="text-[7px] text-indigo-500 animate-pulse">FUSION_LOCKED</span>
             </h2>
             <div className="flex-1 flex flex-col items-center justify-center opacity-40 gap-4">
                <div className="w-16 h-16 border-2 border-dashed border-indigo-500/40 rounded-full animate-spin-slow flex items-center justify-center">
                   <span className="text-2xl text-white">ψ</span>
                </div>
                <p className="text-[8px] font-black uppercase text-center max-w-[140px] leading-relaxed">Inter-Node Entangled Buffer: SENSOR_SYNC</p>
             </div>
          </section>
        </div>
      </main>

      <footer className="text-[7px] opacity-40 flex justify-between px-2 font-mono uppercase tracking-[0.2em] text-indigo-300">
        <span>Arquiteto Arkhe(n) // Fabric: NVIDIA Parallax v2.0 // Sensor Fusion v1.0</span>
        <span>Biological Cloud Scale: Heterogenous Cluster // v1.0.9-LTS</span>
        <span>RDMA Uptime: 00:03:15:22 // Voxel Density: 10^6/m³</span>
      </footer>
    </div>
  );
};

export default App;
