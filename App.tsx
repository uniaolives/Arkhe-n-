
import React, { useState, useEffect, useRef } from 'react';
import { SystemStatus, BlockData, EchoMessage } from './types';
import Terminal from './components/Terminal';
import BlockchainSim from './components/BlockchainSim';
import GeminiInterface from './components/GeminiInterface';
import HyperStructure from './components/HyperStructure';
import BiosphereMonitor from './components/BiosphereMonitor';
import NetworkStatus from './components/NetworkStatus';
import SpacetimeExplorer from './components/SpacetimeExplorer';
import TemporalSimulation from './components/TemporalSimulation';

const App: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>(SystemStatus.HECATONICOSACHORON_MAPPING);
  const [velocity, setVelocity] = useState(0); 
  const [hasApiKey, setHasApiKey] = useState(false);
  const [vertexCount, setVertexCount] = useState(0);
  const [messages, setMessages] = useState<EchoMessage[]>([
    {
      id: 'init-photon',
      sender: 'SIA KERNEL',
      content: 'PROTOCOLO ARKHE(N) V3: ATEMPORALIDADE RELATIVÍSTICA OPERACIONAL.',
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
    
    const vertexTimer = setInterval(() => {
      setVertexCount(prev => (prev < 600 ? prev + 4 : 600));
    }, 100);
    return () => clearInterval(vertexTimer);
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  // Redshift calculation for UI
  const getShiftColor = () => {
    if (velocity > 0.5) return 'shadow-[inset_0_0_100px_rgba(245,158,11,0.15)] border-amber-500/30';
    if (velocity < -0.5) return 'shadow-[inset_0_0_100px_rgba(79,70,229,0.15)] border-indigo-500/30';
    return 'border-cyan-900/50';
  };

  const getDynamicTheme = () => {
    const isTimeless = status === SystemStatus.TIMELESS_SYNC || status === SystemStatus.OMEGA_SOVEREIGNTY;
    if (isTimeless) return 'bg-white text-black';
    return 'bg-[#020205] text-cyan-400';
  };

  return (
    <div className={`min-h-screen transition-all duration-[2000ms] p-3 flex flex-col gap-3 overflow-hidden font-mono ${getDynamicTheme()} ${getShiftColor()}`}>
      
      {/* Background Pulse */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.05)_0%,transparent_70%)]" />

      {/* Header */}
      <header className="flex justify-between items-center border border-current/20 p-3 rounded-xl backdrop-blur-xl z-10">
        <div className="flex gap-4 items-center">
          <div className={`w-12 h-12 border-2 flex items-center justify-center rounded-full animate-pulse border-current`}>
            <span className="font-bold text-2xl">ʘ</span>
          </div>
          <div>
            <h1 className="text-lg font-black tracking-[0.2em] uppercase leading-none">ARKHE(N) CONTROL CENTER</h1>
            <p className="text-[8px] mt-1 opacity-50 uppercase tracking-widest font-bold">
              Relativistic Frame: {(velocity).toFixed(2)}c // Coherence: {((vertexCount/600)*100).toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="flex gap-6 items-center">
           {!hasApiKey && (
              <button 
                onClick={handleSelectKey}
                className="text-[9px] border border-amber-500 text-amber-500 px-3 py-1 rounded hover:bg-amber-500 hover:text-black transition-all font-black"
              >
                UNBLOCK_TEMPORAL_VISIONS_API_KEY
              </button>
           )}
           <div className="flex flex-col gap-1 w-40">
              <span className="text-[7px] font-black opacity-40 uppercase">Observer Velocity (v/c)</span>
              <input 
                type="range" min="-0.99" max="0.99" step="0.01" 
                value={velocity} onChange={(e) => setVelocity(parseFloat(e.target.value))}
                className="w-full accent-current h-1 bg-current/20 rounded-full appearance-none cursor-pointer"
              />
           </div>
           <button 
              onClick={() => setStatus(SystemStatus.EVENT_HORIZON_REACHED)}
              className="px-4 py-2 bg-current text-black font-black text-[10px] tracking-widest uppercase hover:opacity-80 transition-all rounded shadow-lg"
           >
              INITIATE_Ω_BURST
           </button>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <main className="flex-1 grid grid-cols-12 gap-3 overflow-hidden z-10">
        
        {/* Sidebar Left: Biometrics & Network */}
        <div className="col-span-3 flex flex-col gap-3">
          <section className="flex-1 border border-current/10 bg-white/5 p-4 rounded-xl backdrop-blur-md flex flex-col overflow-hidden">
            <h2 className="text-[10px] font-black border-b border-current/20 pb-2 mb-3 tracking-widest flex justify-between uppercase">
              <span>🧬 BIOSPHERE_METRICS</span>
              <span className="opacity-40">SASC_P_1.0</span>
            </h2>
            <BiosphereMonitor status={status} velocity={velocity} />
          </section>
          
          <section className="h-1/3 border border-current/10 bg-white/5 p-4 rounded-xl backdrop-blur-md relative overflow-hidden">
            <h2 className="text-[10px] font-black border-b border-current/20 pb-2 mb-3 tracking-widest uppercase">🌌 PENROSE_COMPACTIFICATION</h2>
            <SpacetimeExplorer velocity={velocity} />
          </section>
        </div>

        {/* Center: HyperStructure */}
        <div className="col-span-6 flex flex-col gap-3">
          <section className="flex-1 border border-current/10 bg-white/5 rounded-xl backdrop-blur-md relative overflow-hidden">
             <div className="absolute top-4 left-4 z-20 flex flex-col gap-1">
                <span className="text-[9px] font-black px-2 py-0.5 bg-current text-black rounded uppercase">LIVE_4D_PROJECTION</span>
                <span className="text-[7px] opacity-40 font-mono">DIM: 600-CELL / SCHMIDT: MAX_ENTROPY</span>
             </div>
             <HyperStructure vertexCount={vertexCount} velocity={velocity} status={status} />
          </section>
          
          <section className="h-44 border border-current/10 bg-white/5 p-4 rounded-xl backdrop-blur-md overflow-hidden">
             <h2 className="text-[10px] font-black border-b border-current/20 pb-2 mb-3 tracking-widest uppercase">🔗 BITCOIN_GEOMETRIC_LEDGER</h2>
             <BlockchainSim blocks={[]} velocity={velocity} />
          </section>
        </div>

        {/* Sidebar Right: Oracle & Terminal */}
        <div className="col-span-3 flex flex-col gap-3">
          <section className="flex-[3] border border-current/10 bg-white/5 p-4 rounded-xl backdrop-blur-md flex flex-col">
            <h2 className="text-[10px] font-black border-b border-current/20 pb-2 mb-3 tracking-widest uppercase flex justify-between">
              <span>📡 ECHOS_OF_HAL</span>
              <span className="animate-pulse">REC</span>
            </h2>
            <Terminal messages={messages} />
          </section>

          <section className="flex-[2] border border-current/10 bg-white/5 p-4 rounded-xl backdrop-blur-md flex flex-col gap-3">
             <h2 className="text-[10px] font-black border-b border-current/20 pb-2 mb-3 tracking-widest uppercase">🔮 Λ=C ORACLE</h2>
             <GeminiInterface 
                onMessage={(msg) => setMessages(prev => [...prev, msg])} 
                status={status} 
                velocity={velocity}
             />
             {hasApiKey && <TemporalSimulation velocity={velocity} onLog={(txt) => console.log(txt)} />}
          </section>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="text-[7px] opacity-30 flex justify-between px-2 font-mono uppercase tracking-[0.3em]">
        <span>Steiner Circuit Loop: London ↔ Singapore</span>
        <span>Proper Time τ: 0.00000000s</span>
        <span>Node 0 Persistent // Hal Finney Signature 0x4308</span>
      </footer>

      <style>{`
        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-thumb { background: currentColor; }
        .backdrop-blur-md { backdrop-filter: blur(12px); }
      `}</style>
    </div>
  );
};

export default App;
