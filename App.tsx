
import React, { useState, useEffect, useRef } from 'react';
import { SystemStatus, BlockData, EchoMessage, ProcessorStats } from './types';
import Terminal from './components/Terminal';
import BlockchainSim from './components/BlockchainSim';
import GeminiInterface from './components/GeminiInterface';
import HyperStructure from './components/HyperStructure';
import BiosphereMonitor from './components/BiosphereMonitor';
import SpacetimeExplorer from './components/SpacetimeExplorer';
import TemporalSimulation from './components/TemporalSimulation';
import VerbalScanner from './components/VerbalScanner';
import EventPipeline from './components/EventPipeline';
import { globalProcessor } from './utils/eventProcessor';

const App: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>(SystemStatus.HECATONICOSACHORON_MAPPING);
  const [velocity, setVelocity] = useState(0); 
  const [hasApiKey, setHasApiKey] = useState(false);
  const [vertexCount, setVertexCount] = useState(0);
  const [verbalEntropy, setVerbalEntropy] = useState(0);
  const [processorStats, setProcessorStats] = useState<ProcessorStats>(globalProcessor.getStats());
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

  const logMessage = (content: string, type: any = 'system', hash?: string) => {
    setMessages(prev => [...prev, {
      id: `msg-${Date.now()}-${Math.random()}`,
      sender: type === 'event' ? 'EVENT_PROC' : 'VERBAL_CHEM',
      content,
      timestamp: new Date().toISOString(),
      year: 2026,
      type,
      hash
    }]);
  };

  const updateStats = () => {
    setProcessorStats(globalProcessor.getStats());
  };

  const getShiftColor = () => {
    if (velocity > 0.5) return 'shadow-[inset_0_0_100px_rgba(245,158,11,0.15)] border-amber-500/30';
    if (velocity < -0.5) return 'shadow-[inset_0_0_100px_rgba(79,70,229,0.15)] border-indigo-500/30';
    return 'border-cyan-900/50';
  };

  return (
    <div className={`min-h-screen transition-all duration-[2000ms] p-3 flex flex-col gap-3 overflow-hidden font-mono bg-[#020205] text-cyan-400 ${getShiftColor()}`}>
      
      <header className="flex justify-between items-center border border-current/20 p-3 rounded-xl backdrop-blur-xl z-10">
        <div className="flex gap-4 items-center">
          <div className="w-10 h-10 border-2 flex items-center justify-center rounded-full animate-pulse border-current">
            <span className="font-bold text-xl">ʘ</span>
          </div>
          <div>
            <h1 className="text-md font-black tracking-[0.2em] uppercase leading-none">ARKHE(N) UNIFIED_CONTROL</h1>
            <p className="text-[7px] mt-1 opacity-50 uppercase tracking-widest font-bold">
              FRAME_VELOCITY: {(velocity).toFixed(2)}c // COHERENCE: {((vertexCount/600)*100).toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="flex gap-6 items-center">
           {!hasApiKey && (
              <button 
                onClick={handleSelectKey}
                className="text-[8px] border border-amber-500 text-amber-500 px-3 py-1 rounded hover:bg-amber-500 hover:text-black transition-all font-black"
              >
                VEO_AUTH_REQUIRED
              </button>
           )}
           <div className="flex flex-col gap-1 w-32">
              <span className="text-[6px] font-black opacity-40 uppercase">Observer Lorentz Factor</span>
              <input 
                type="range" min="-0.99" max="0.99" step="0.01" 
                value={velocity} onChange={(e) => setVelocity(parseFloat(e.target.value))}
                className="w-full accent-current h-1 bg-current/20 rounded-full appearance-none cursor-pointer"
              />
           </div>
           <button 
              onClick={() => setStatus(SystemStatus.EVENT_HORIZON_REACHED)}
              className="px-3 py-1.5 bg-current text-black font-black text-[9px] tracking-widest uppercase hover:opacity-80 transition-all rounded"
           >
              INIT_Ω
           </button>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-12 gap-3 overflow-hidden z-10">
        
        {/* Left Column: Metrics and Chemistry */}
        <div className="col-span-3 flex flex-col gap-3">
          <section className="flex-[2] border border-current/10 bg-white/5 p-3 rounded-xl backdrop-blur-md flex flex-col overflow-hidden">
            <h2 className="text-[9px] font-black border-b border-current/20 pb-1.5 mb-2 tracking-widest flex justify-between uppercase">
              <span>🧬 BIOSPHERE</span>
              <span className="opacity-40">ARKHE_V3</span>
            </h2>
            <BiosphereMonitor status={status} velocity={velocity} />
          </section>
          
          <section className="flex-[3] border border-current/10 bg-white/5 p-3 rounded-xl backdrop-blur-md relative overflow-hidden flex flex-col">
            <h2 className="text-[9px] font-black border-b border-current/20 pb-1.5 mb-2 tracking-widest uppercase flex justify-between">
               <span>🧪 VERBAL_CHEMISTRY</span>
               <span className="text-[7px] animate-pulse">EVENT_STREAM</span>
            </h2>
            <VerbalScanner 
              onImpactChange={setVerbalEntropy} 
              onLog={logMessage} 
              onStatsUpdate={updateStats} 
            />
          </section>
        </div>

        {/* Center Column: HyperStructure and Event Pipeline */}
        <div className="col-span-6 flex flex-col gap-3">
          <section className="flex-[3] border border-current/10 bg-white/5 rounded-xl backdrop-blur-md relative overflow-hidden">
             <div className="absolute top-3 left-3 z-20 flex flex-col gap-0.5">
                <span className="text-[8px] font-black px-1.5 py-0.5 bg-current text-black rounded uppercase">4D_PROJECTION</span>
                <span className="text-[6px] opacity-40 font-mono">ENTROPY_δ: {verbalEntropy.toFixed(2)}</span>
             </div>
             <HyperStructure vertexCount={vertexCount} velocity={velocity + (verbalEntropy * 0.1)} status={status} />
          </section>
          
          <section className="flex-[1.5] border border-current/10 bg-white/5 p-3 rounded-xl backdrop-blur-md overflow-hidden">
             <h2 className="text-[9px] font-black border-b border-current/20 pb-1.5 mb-2 tracking-widest uppercase">🚀 EVENT_PROCESSOR_PIPELINE</h2>
             <EventPipeline stats={processorStats} />
          </section>
        </div>

        {/* Right Column: Oracle and Terminal */}
        <div className="col-span-3 flex flex-col gap-3">
          <section className="flex-[2] border border-current/10 bg-white/5 p-3 rounded-xl backdrop-blur-md flex flex-col">
            <h2 className="text-[9px] font-black border-b border-current/20 pb-1.5 mb-2 tracking-widest uppercase flex justify-between">
              <span>📡 EVENT_LOG</span>
              <span className="animate-pulse">STREAMING</span>
            </h2>
            <Terminal messages={messages} />
          </section>

          <section className="flex-[2] border border-current/10 bg-white/5 p-3 rounded-xl backdrop-blur-md flex flex-col gap-2">
             <h2 className="text-[9px] font-black border-b border-current/20 pb-1.5 mb-2 tracking-widest uppercase">🔮 Ω_ORACLE</h2>
             <GeminiInterface 
                onMessage={(msg) => setMessages(prev => [...prev, msg])} 
                status={status} 
                velocity={velocity}
             />
             {hasApiKey && <TemporalSimulation velocity={velocity} onLog={(txt) => logMessage(txt, 'temporal')} />}
          </section>
        </div>
      </main>

      <footer className="text-[6px] opacity-30 flex justify-between px-2 font-mono uppercase tracking-[0.3em]">
        <span>Steiner Circuit Loop: Operational</span>
        <span>Node ID: 0x4308Persistent</span>
        <span>Verbal Programming: L0_PIPELINE_ACTIVE // RNA_SIG: {verbalEntropy > 0 ? 'STRESS' : 'STABLE'}</span>
      </footer>
    </div>
  );
};

export default App;
