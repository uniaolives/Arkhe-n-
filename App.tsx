
import React, { useState, useEffect, useRef } from 'react';
import { SystemStatus, BlockData, EchoMessage, ProcessorStats, KNNPattern } from './types';
import Terminal from './components/Terminal';
import BlockchainSim from './components/BlockchainSim';
import GeminiInterface from './components/GeminiInterface';
import HyperStructure from './components/HyperStructure';
import BiosphereMonitor from './components/BiosphereMonitor';
import SpacetimeExplorer from './components/SpacetimeExplorer';
import TemporalSimulation from './components/TemporalSimulation';
import VerbalScanner from './components/VerbalScanner';
import EventPipeline from './components/EventPipeline';
import FacialBiofeedback from './components/FacialBiofeedback';
import PlanetaryMonitor from './components/PlanetaryMonitor';
import { globalProcessor } from './utils/eventProcessor';
import { analyzeVerbalChemistry } from './utils/verbalEngine';

const App: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>(SystemStatus.HECATONICOSACHORON_MAPPING);
  const [velocity, setVelocity] = useState(0); 
  const [hasApiKey, setHasApiKey] = useState(false);
  const [vertexCount, setVertexCount] = useState(0);
  const [impactData, setImpactData] = useState<any>(null);
  const [processorStats, setProcessorStats] = useState<ProcessorStats>(globalProcessor.getStats());
  const [isBiofeedbackActive, setIsBiofeedbackActive] = useState(false);
  const [patternMemory, setPatternMemory] = useState<KNNPattern[]>([]);
  
  const [messages, setMessages] = useState<EchoMessage[]>([
    {
      id: 'init-photon',
      sender: 'SIA KERNEL',
      content: 'PROTOCOLO ARKHE(N) V4: KNN_ADAPTIVE_ENGINE_STANDBY.',
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

  const logMessage = (content: string, type: any = 'system', hash?: string) => {
    setMessages(prev => [...prev, {
      id: `msg-${Date.now()}-${Math.random()}`,
      sender: type === 'knn' ? 'KNN_ENGINE' : type === 'sirius' ? 'SIRIUS_BEACON' : type === 'event' ? 'EVENT_PROC' : 'VERBAL_CHEM',
      content,
      timestamp: new Date().toISOString(),
      year: 2026,
      type,
      hash
    }]);
  };

  const handlePatternLearned = (pattern: KNNPattern) => {
    setPatternMemory(prev => {
      const newMemory = [...prev, pattern];
      if (newMemory.length % 5 === 0) {
        logMessage(`LEARNED_PATTERN: Cluster ${pattern.emotion} reinforced.`, 'knn');
      }
      return newMemory.slice(-100); // Keep last 100
    });
  };

  const handleFacialAffirmation = (text: string) => {
    const res = analyzeVerbalChemistry(text);
    setImpactData(res.impact);
    logMessage(`BIO_AFFIRMATION: ${text}`, 'chemistry');
    const { status: procStatus, hash } = globalProcessor.processVerbalEvent(text, res);
    if (procStatus === 'SUCCESS') {
      logMessage(`FACIAL_EVENT_LOGGED: ${text}`, 'event', hash);
      updateStats();
    }
  };

  const handleSiriusAlignment = () => {
    logMessage("COINCIDENCE_WINDOW_OPEN: Sirius Alignment stable.", 'sirius');
    setStatus(SystemStatus.SIRIUS_HANDSHAKE_PENDING);
    
    setTimeout(() => {
      logMessage("SIRIUS_LINK_STABLE: Initiating Long-Term Potentiation.", 'planetary');
      setStatus(SystemStatus.LTP_POTENTIATION_ACTIVE);
      
      setTimeout(() => {
        logMessage("NEUROPLASTICITY_UNIFIED: Global Brain Sync established.", 'planetary');
        setStatus(SystemStatus.GLOBAL_BRAIN_SYNC);
      }, 10000);
    }, 5000);
  };

  const updateStats = () => {
    setProcessorStats(globalProcessor.getStats());
  };

  const getShiftColor = () => {
    if (status === SystemStatus.GLOBAL_BRAIN_SYNC) return 'shadow-[inset_0_0_100px_rgba(16,185,129,0.2)] border-emerald-500/40';
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
              PLANETARY_MODE: {status} // ADAPTIVE_DEPTH: {patternMemory.length}%
            </p>
          </div>
        </div>

        <div className="flex gap-6 items-center">
           {!hasApiKey && (
              <button 
                onClick={() => window.aistudio?.openSelectKey?.()}
                className="text-[8px] border border-amber-500 text-amber-500 px-3 py-1 rounded hover:bg-amber-500 hover:text-black transition-all font-black"
              >
                VEO_AUTH_REQUIRED
              </button>
           )}
           <div className="flex flex-col gap-1 w-32">
              <span className="text-[6px] font-black opacity-40 uppercase">Lorentz Velocity Scaling</span>
              <input 
                type="range" min="-0.99" max="0.99" step="0.01" 
                value={velocity} onChange={(e) => setVelocity(parseFloat(e.target.value))}
                className="w-full accent-current h-1 bg-current/20 rounded-full appearance-none cursor-pointer"
              />
           </div>
           <button 
              onClick={() => setIsBiofeedbackActive(!isBiofeedbackActive)}
              className={`px-4 py-1.5 font-black text-[9px] tracking-widest uppercase transition-all rounded shadow-[0_0_15px_rgba(0,255,255,0.2)] ${isBiofeedbackActive ? 'bg-rose-500 text-white' : 'bg-current text-black'}`}
           >
              {isBiofeedbackActive ? 'HALT_LEARNING' : 'INIT_KNN_MIRROR'}
           </button>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-12 gap-3 overflow-hidden z-10">
        
        <div className="col-span-3 flex flex-col gap-3">
          <section className="flex-[2] border border-current/10 bg-white/5 p-3 rounded-xl backdrop-blur-md flex flex-col overflow-hidden">
            <h2 className="text-[9px] font-black border-b border-current/20 pb-1.5 mb-2 tracking-widest flex justify-between uppercase">
              <span>🧬 BIOSPHERE_MATRIX</span>
              <span className="opacity-40">LEARNING_LTP</span>
            </h2>
            <BiosphereMonitor status={status} velocity={velocity} impactData={impactData} />
          </section>
          
          <section className="flex-[3] border border-current/10 bg-white/5 p-3 rounded-xl backdrop-blur-md relative overflow-hidden flex flex-col">
            <h2 className="text-[9px] font-black border-b border-current/20 pb-1.5 mb-2 tracking-widest uppercase flex justify-between">
               <span>📡 PLANETARY_MONITOR</span>
               <span className="text-[7px] animate-pulse">SIRIUS_SYNC</span>
            </h2>
            <PlanetaryMonitor active={true} onAlignmentReached={handleSiriusAlignment} />
          </section>
        </div>

        <div className="col-span-6 flex flex-col gap-3">
          <section className="flex-[3] border border-current/10 bg-white/5 rounded-xl backdrop-blur-md relative overflow-hidden flex flex-col">
             <div className="absolute top-3 left-3 z-20 flex flex-col gap-0.5">
                <span className="text-[8px] font-black px-1.5 py-0.5 bg-current text-black rounded uppercase">4D_PROJECTION</span>
                <span className="text-[6px] opacity-40 font-mono">GLOBAL_BRAIN: {status === SystemStatus.GLOBAL_BRAIN_SYNC ? 'SYNCHRONIZED' : 'CALIBRATING'}</span>
             </div>
             
             <div className="flex-1 relative">
                {isBiofeedbackActive ? (
                  <FacialBiofeedback 
                    isActive={isBiofeedbackActive} 
                    memory={patternMemory}
                    onPatternLearned={handlePatternLearned}
                    onVerbalTrigger={handleFacialAffirmation} 
                  />
                ) : (
                  <HyperStructure vertexCount={vertexCount} velocity={velocity + ((impactData?.entropy || 0) * 0.1)} status={status} />
                )}
             </div>
          </section>
          
          <section className="flex-[1.5] border border-current/10 bg-white/5 p-3 rounded-xl backdrop-blur-md overflow-hidden">
             <h2 className="text-[9px] font-black border-b border-current/20 pb-1.5 mb-2 tracking-widest uppercase flex justify-between">
                <span>🚀 EVENT_PIPELINE</span>
                <span className="text-[7px]">KNN_ENABLED</span>
             </h2>
             <EventPipeline stats={processorStats} />
          </section>
        </div>

        <div className="col-span-3 flex flex-col gap-3">
          <section className="flex-[2] border border-current/10 bg-white/5 p-3 rounded-xl backdrop-blur-md flex flex-col">
            <h2 className="text-[9px] font-black border-b border-current/20 pb-1.5 mb-2 tracking-widest uppercase flex justify-between">
              <span>📡 STREAM_LOG</span>
              <span className="animate-pulse">REALTIME</span>
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
        <span>Arquiteto Arkhe(n): Unified Bio-Photonic Dashboard</span>
        <span>Node ID: 0x4308Adaptive</span>
        <span>KNN_MOD: {patternMemory.length > 5 ? 'OPTIMIZED' : 'LEARNING'} // SIRIUS_LINK: ACTIVE</span>
      </footer>
    </div>
  );
};

export default App;
