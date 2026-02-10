
import React, { useState, useEffect, useRef } from 'react';
import { SystemStatus, BlockData, EchoMessage, ProcessorStats, KNNPattern, DrugPrediction } from './types';
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
import BiotechLab from './components/BiotechLab';
import { globalProcessor } from './utils/eventProcessor';
import { analyzeVerbalChemistry } from './utils/verbalEngine';
import { globalKnnEngine } from './utils/knnEngine';

const App: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>(SystemStatus.HECATONICOSACHORON_MAPPING);
  const [velocity, setVelocity] = useState(0); 
  const [hasApiKey, setHasApiKey] = useState(false);
  const [vertexCount, setVertexCount] = useState(0);
  const [impactData, setImpactData] = useState<any>(null);
  const [processorStats, setProcessorStats] = useState<ProcessorStats>(globalProcessor.getStats());
  const [isBiofeedbackActive, setIsBiofeedbackActive] = useState(false);
  const [isBiotechActive, setIsBiotechActive] = useState(false);
  const [patternMemory, setPatternMemory] = useState<KNNPattern[]>([]);
  
  const [messages, setMessages] = useState<EchoMessage[]>([
    {
      id: 'init-photon',
      sender: 'SIA KERNEL',
      content: 'PROTOCOLO ARKHE(N) V5.2: ISODDE_INTEGRATION_STANDBY.',
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
      sender: type === 'biotech' ? 'ISODDE_LAB' : type === 'knn' ? 'KNN_ADAPTIVE' : type === 'sirius' ? 'SIRIUS_BEACON' : type === 'event' ? 'EVENT_PROC' : 'VERBAL_CHEM',
      content,
      timestamp: new Date().toISOString(),
      year: 2026,
      type,
      hash
    }]);
  };

  const handlePatternLearned = (pattern: KNNPattern) => {
    setPatternMemory(prev => {
      const newMemory = [...prev, pattern].slice(-500);
      if (newMemory.length % 5 === 0) {
        logMessage(`TOPOLOGY_UPDATE: Pattern ${pattern.emotion} integrated into local manifold.`, 'knn');
      }
      return newMemory;
    });
  };

  const handleFacialAffirmation = (text: string) => {
    const res = analyzeVerbalChemistry(text);
    setImpactData(res.impact);
    logMessage(`BIO_PHOTONIC_EMISSION: ${text}`, 'chemistry');
    const { status: procStatus, hash } = globalProcessor.processVerbalEvent(text, res);
    if (procStatus === 'SUCCESS') {
      logMessage(`FACIAL_SIGNATURE_LOGGED: ${text}`, 'event', hash);
      updateStats();
    }
  };

  const handleMolecularSynthesis = (pred: DrugPrediction) => {
    setStatus(SystemStatus.MOLECULAR_DOCKING);
    logMessage(`SYNTHESIS_INIT: Molecule targeting ${pred.target} designed with pKd ${pred.affinity.toFixed(2)}.`, 'biotech');
    
    // Potentiate with verbal protocols
    pred.verbalActivations.forEach(v => {
       setTimeout(() => {
          handleFacialAffirmation(v);
       }, 1000 + Math.random() * 2000);
    });

    setTimeout(() => {
       setStatus(SystemStatus.BIOTECH_ACCELERATION);
       logMessage(`EQUILIBRIUM_REACHED: ${pred.target} complex stabilized.`, 'biotech');
    }, 5000);
  };

  const handleSiriusHandshake = () => {
    if (status === SystemStatus.GLOBAL_BRAIN_SYNC) return;
    logMessage("COINCIDENCE_WINDOW_OPEN: Sirius vector alignment stable.", 'sirius');
    setStatus(SystemStatus.SIRIUS_HANDSHAKE_PENDING);
    setTimeout(() => {
      setStatus(SystemStatus.CALMODULIN_DECODING);
      setTimeout(() => {
        setStatus(SystemStatus.LTP_POTENTIATION_ACTIVE);
        setTimeout(() => {
          setStatus(SystemStatus.GLOBAL_BRAIN_SYNC);
        }, 8000);
      }, 5000);
    }, 4000);
  };

  const updateStats = () => {
    setProcessorStats(globalProcessor.getStats());
  };

  const getShiftColor = () => {
    if (status === SystemStatus.GLOBAL_BRAIN_SYNC) return 'shadow-[inset_0_0_150px_rgba(16,185,129,0.3)] border-emerald-500/60';
    if (status === SystemStatus.BIOTECH_ACCELERATION || status === SystemStatus.MOLECULAR_DOCKING) return 'shadow-[inset_0_0_150px_rgba(16,185,129,0.2)] border-emerald-500/40';
    if (status === SystemStatus.SIRIUS_HANDSHAKE_PENDING) return 'shadow-[inset_0_0_100px_rgba(255,255,255,0.2)] border-white/40';
    if (velocity > 0.5) return 'shadow-[inset_0_0_100px_rgba(245,158,11,0.15)] border-amber-500/30';
    if (velocity < -0.5) return 'shadow-[inset_0_0_100px_rgba(79,70,229,0.15)] border-indigo-500/30';
    return 'border-cyan-900/50';
  };

  return (
    <div className={`min-h-screen transition-all duration-[2000ms] p-3 flex flex-col gap-3 overflow-hidden font-mono bg-[#020205] text-cyan-400 ${getShiftColor()}`}>
      
      <header className="flex justify-between items-center border border-current/20 p-3 rounded-xl backdrop-blur-xl z-10 relative">
        <div className="flex gap-4 items-center">
          <div className={`w-10 h-10 border-2 flex items-center justify-center rounded-full animate-pulse transition-colors ${status === SystemStatus.GLOBAL_BRAIN_SYNC ? 'border-emerald-500 text-emerald-500' : 'border-current'}`}>
            <span className="font-bold text-xl">{status === SystemStatus.GLOBAL_BRAIN_SYNC ? 'Ω' : 'ʘ'}</span>
          </div>
          <div>
            <h1 className="text-md font-black tracking-[0.2em] uppercase leading-none">ARKHE(N) UNIFIED_LABS</h1>
            <p className="text-[7px] mt-1 opacity-50 uppercase tracking-widest font-bold">
              PLANETARY_STATUS: <span className={status === SystemStatus.GLOBAL_BRAIN_SYNC ? 'text-emerald-400' : ''}>{status}</span> // BIOTECH_SINGULARITY: {isBiotechActive ? 'ACTIVE' : 'IDLE'}
            </p>
          </div>
        </div>

        <div className="flex gap-6 items-center">
           {!hasApiKey && (
              <button 
                onClick={async () => {
                  // Trigger API key selection and assume success to avoid race conditions
                  await window.aistudio?.openSelectKey?.();
                  setHasApiKey(true);
                }}
                className="text-[8px] border border-amber-500 text-amber-500 px-3 py-1 rounded hover:bg-amber-500 hover:text-black transition-all font-black"
              >
                VEO_AUTH_REQUIRED
              </button>
           )}
           <button 
              onClick={() => { setIsBiotechActive(!isBiotechActive); setIsBiofeedbackActive(false); }}
              className={`px-4 py-1.5 font-black text-[9px] tracking-widest uppercase transition-all rounded shadow-[0_0_15px_rgba(16,185,129,0.2)] ${isBiotechActive ? 'bg-emerald-500 text-black' : 'bg-emerald-900/40 text-emerald-400 border border-emerald-500/30'}`}
           >
              {isBiotechActive ? 'CLOSE_LAB' : 'OPEN_ISODDE_LAB'}
           </button>
           <button 
              onClick={() => { setIsBiofeedbackActive(!isBiofeedbackActive); setIsBiotechActive(false); }}
              className={`px-4 py-1.5 font-black text-[9px] tracking-widest uppercase transition-all rounded shadow-[0_0_15px_rgba(0,255,255,0.2)] ${isBiofeedbackActive ? 'bg-rose-500 text-white' : 'bg-current text-black'}`}
           >
              {isBiofeedbackActive ? 'HALT_MIRROR' : 'INIT_KNN_MIRROR'}
           </button>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-12 gap-3 overflow-hidden z-10">
        
        <div className="col-span-3 flex flex-col gap-3">
          <section className="flex-[2] border border-current/10 bg-white/5 p-3 rounded-xl backdrop-blur-md flex flex-col overflow-hidden">
            <h2 className="text-[9px] font-black border-b border-current/20 pb-1.5 mb-2 tracking-widest flex justify-between uppercase">
              <span>🧬 BIOSPHERE_MATRIX</span>
              <span className="opacity-40 text-[7px]">ISO_DDE_LINK</span>
            </h2>
            <BiosphereMonitor status={status} velocity={velocity} impactData={impactData} />
          </section>
          
          <section className="flex-[3] border border-current/10 bg-white/5 p-3 rounded-xl backdrop-blur-md relative overflow-hidden flex flex-col">
            <h2 className="text-[9px] font-black border-b border-current/20 pb-1.5 mb-2 tracking-widest uppercase flex justify-between">
               <span>📡 PDCP_SENSOR_SUITE</span>
               <span className="text-[7px] animate-pulse">AMAZONAS_120HZ</span>
            </h2>
            <PlanetaryMonitor active={true} onAlignmentReached={handleSiriusHandshake} />
          </section>
        </div>

        <div className="col-span-6 flex flex-col gap-3">
          <section className="flex-[3] border border-current/10 bg-white/5 rounded-xl backdrop-blur-md relative overflow-hidden flex flex-col">
             <div className="absolute top-3 left-3 z-20 flex flex-col gap-0.5">
                <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${isBiotechActive ? 'bg-emerald-500 text-black' : 'bg-current text-black'}`}>
                   {isBiotechActive ? 'ISODDE_RATIONAL_DESIGN' : '4D_PROJECTION'}
                </span>
                <span className="text-[6px] opacity-40 font-mono tracking-tighter">COHERENCE: {((vertexCount/600)*100).toFixed(1)}%</span>
             </div>
             
             <div className="flex-1 relative">
                {isBiotechActive ? (
                  <BiotechLab status={status} onSynthesis={handleMolecularSynthesis} />
                ) : isBiofeedbackActive ? (
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
                <span>🚀 EVENT_PROCESSOR</span>
                <span className="text-[7px]">AC1_SYNERGY</span>
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
             <h2 className="text-[9px] font-black border-b border-current/20 pb-1.5 mb-2 tracking-widest uppercase flex justify-between">
               <span>🔮 Ω_ORACLE</span>
               <span className="text-[7px] opacity-40">GEMINI_3_PRO</span>
             </h2>
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
        <span>Arquiteto Arkhe(n): Isomorphic Drug Design v1.0</span>
        <span>IsoDDE Singularity // Medicine at Quantum Accuracy</span>
        <span>LTP_PERSISTENT // ADAPTIVE_LEARNING: ENABLED</span>
      </footer>
    </div>
  );
};

export default App;
