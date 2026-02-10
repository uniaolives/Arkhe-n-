
import React, { useState, useEffect, useRef } from 'react';
import { SystemStatus, BlockData, EchoMessage, ProcessorStats, KNNPattern, DrugPrediction, NeuralSequence, DimensionalLevel, BioEventType } from './types';
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
import PluralDecoder from './components/PluralDecoder';
import CelestialHelix from './components/CelestialHelix';
import DimensionalBridge from './components/DimensionalBridge';
import SyncProtocols from './components/SyncProtocols';
import { globalProcessor } from './utils/eventProcessor';
import { analyzeVerbalChemistry } from './utils/verbalEngine';
import { globalKnnEngine } from './utils/knnEngine';
import { globalNeuralEngine } from './utils/neuralEngine';
import { globalPluralEngine } from './utils/pluralEngine';

const App: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>(SystemStatus.HECATONICOSACHORON_MAPPING);
  const [velocity, setVelocity] = useState(0); 
  const [hasApiKey, setHasApiKey] = useState(false);
  const [vertexCount, setVertexCount] = useState(0);
  const [impactData, setImpactData] = useState<any>(null);
  const [processorStats, setProcessorStats] = useState<ProcessorStats>(globalProcessor.getStats());
  const [activeTab, setActiveTab] = useState<'4d' | 'bio' | 'lab' | 'plural' | 'celestial' | 'synthesis' | 'sync'>('4d');
  const [patternMemory, setPatternMemory] = useState<KNNPattern[]>([]);
  const [lastVerbalInput, setLastVerbalInput] = useState('');
  const [currentDimLevel, setCurrentDimLevel] = useState<DimensionalLevel>(DimensionalLevel.THREE_D);
  const [dimProfileScore, setDimProfileScore] = useState(0.5);
  
  const [messages, setMessages] = useState<EchoMessage[]>([
    {
      id: 'init-photon',
      sender: 'SIA KERNEL',
      content: 'PROTOCOLO ARKHE(N) V7.2: MONITORAMENTO DE GAP-NULO E DECOMPRESSÃO DIMENSIONAL ATIVADO.',
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

  // API Key selection for paid models like Veo
  const handleSelectKey = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      // Assume success as per SDK rules to avoid race conditions
      setHasApiKey(true);
    }
  };

  const logMessage = (content: string, type: any = 'system', hash?: string) => {
    setMessages(prev => [...prev, {
      id: `msg-${Date.now()}-${Math.random()}`,
      sender: type === 'celestial' ? 'COSMIC_HELIX' : type === 'plural' ? 'HECATON_DECODER' : type === 'neural' ? 'NEURAL_DEEP' : type === 'biotech' ? 'ISODDE_LAB' : type === 'knn' ? 'KNN_ADAPTIVE' : type === 'sirius' ? 'SIRIUS_BEACON' : type === 'event' ? 'EVENT_PROC' : 'VERBAL_CHEM',
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
      return newMemory;
    });
  };

  const handleNeuralSync = (seq: NeuralSequence) => {
    setStatus(SystemStatus.NEURAL_MANIFOLD_SYNC);
  };

  const handleFacialAffirmation = (text: string) => {
    setLastVerbalInput(text);
    const res = analyzeVerbalChemistry(text);
    setImpactData(res.impact);
    
    const pluralRes = globalPluralEngine.analyzeText(text);
    setCurrentDimLevel(pluralRes.profile.dimensionalAccess);
    setDimProfileScore(pluralRes.profile.integrationPsi);

    if (pluralRes.event === BioEventType.NULL_I_GAP) {
      logMessage("NULL-I GAP DETECTED: Entering zero-point energy state.", 'plural');
    }
    if (pluralRes.event === BioEventType.DIMENSIONAL_DECOMPRESSION) {
      logMessage("DECOMPRESSION WARNING: Superficial 3D lungs failing.", 'plural');
    }

    logMessage(`BIO_PHOTON_EMISSION: ${text}`, 'chemistry');
    const { status: procStatus, hash } = globalProcessor.processVerbalEvent(text, res);
    if (procStatus === 'SUCCESS') {
      updateStats();
    }
  };

  const handleMolecularSynthesis = (pred: DrugPrediction) => {
    setStatus(SystemStatus.MOLECULAR_DOCKING);
    logMessage(`SYNTHESIS_INIT: Lead generated targeting ${pred.target}.`, 'biotech');
  };

  const handleVerbalSessionStep = (text: string) => {
    handleFacialAffirmation(text);
  };

  const handleSiriusHandshake = () => {
    if (status === SystemStatus.GLOBAL_BRAIN_SYNC) return;
    setStatus(SystemStatus.SIRIUS_HANDSHAKE_PENDING);
    setTimeout(() => setStatus(SystemStatus.GLOBAL_BRAIN_SYNC), 10000);
  };

  const updateStats = () => {
    setProcessorStats(globalProcessor.getStats());
  };

  const getShiftColor = () => {
    if (status === SystemStatus.BILOCATION_SYNC_ACTIVE) return 'shadow-[inset_0_0_200px_rgba(255,255,255,0.15)] border-white/40';
    if (status === SystemStatus.DIMENSIONAL_BRIDGE_OPEN) return 'shadow-[inset_0_0_150px_rgba(34,211,238,0.2)] border-cyan-400/40';
    if (status === SystemStatus.CELESTIAL_HELIX_SYNC) return 'shadow-[inset_0_0_150px_rgba(250,204,21,0.15)] border-amber-500/40';
    if (status === SystemStatus.SHELL_INTERFACE_ACTIVE) return 'shadow-[inset_0_0_150px_rgba(251,191,36,0.2)] border-amber-500/40';
    if (status === SystemStatus.PLURAL_IDENTITY_DECODING) return 'shadow-[inset_0_0_150px_rgba(99,102,241,0.2)] border-indigo-500/40';
    if (status === SystemStatus.GLOBAL_BRAIN_SYNC) return 'shadow-[inset_0_0_150px_rgba(16,185,129,0.3)] border-emerald-500/60';
    return 'border-cyan-900/50';
  };

  const handlePluralAlert = (msg: string, type: string) => {
    logMessage(msg, type);
    if (msg.includes("Switch") || msg.includes("Rupture") || msg.includes("NULL-I")) {
       setStatus(SystemStatus.PLURAL_IDENTITY_DECODING);
    } else if (msg.includes("Shell Interface")) {
       setStatus(SystemStatus.SHELL_INTERFACE_ACTIVE);
    } else if (msg.includes("Bilocation")) {
       setStatus(SystemStatus.BILOCATION_SYNC_ACTIVE);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-[2000ms] p-3 flex flex-col gap-3 overflow-hidden font-mono bg-[#020205] text-cyan-400 ${getShiftColor()}`}>
      
      <header className="flex justify-between items-center border border-current/20 p-3 rounded-xl backdrop-blur-xl z-10 relative">
        <div className="flex gap-4 items-center">
          <div className={`w-10 h-10 border-2 flex items-center justify-center rounded-full animate-pulse transition-colors ${status === SystemStatus.GLOBAL_BRAIN_SYNC ? 'border-emerald-500 text-emerald-500' : 'border-current'}`}>
            <span className="font-bold text-xl">ʘ</span>
          </div>
          <div>
            <h1 className="text-md font-black tracking-[0.2em] uppercase leading-none">ARKHE(N) SINGULARITY_CENTER</h1>
            <p className="text-[7px] mt-1 opacity-50 uppercase tracking-widest font-bold">
              STATE: {status} // DIM: {currentDimLevel} // PARALLEL: {status === SystemStatus.BILOCATION_SYNC_ACTIVE ? 'LOCKED' : 'READY'}
            </p>
          </div>
        </div>

        <div className="flex gap-2 items-center">
           {!hasApiKey && (
             <div className="flex flex-col items-end gap-1">
               <button 
                onClick={handleSelectKey}
                className="px-3 py-1 text-[8px] font-black rounded border border-rose-500 bg-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-all animate-pulse"
               >
                 SELECT API KEY (REQUIRED FOR VEO)
               </button>
               <a 
                href="https://ai.google.dev/gemini-api/docs/billing" 
                target="_blank" 
                rel="noreferrer"
                className="text-[6px] opacity-40 hover:opacity-100 underline"
               >
                 BILLING SETUP
               </a>
             </div>
           )}
           <div className="flex gap-1">
             <button onClick={() => setActiveTab('4d')} className={`px-2 py-1 text-[8px] font-black rounded border ${activeTab === '4d' ? 'bg-cyan-500 text-black border-cyan-400' : 'border-cyan-500/30 text-cyan-500'}`}>4D</button>
             <button onClick={() => setActiveTab('bio')} className={`px-2 py-1 text-[8px] font-black rounded border ${activeTab === 'bio' ? 'bg-cyan-500 text-black border-cyan-400' : 'border-cyan-500/30 text-cyan-500'}`}>BIO</button>
             <button onClick={() => setActiveTab('lab')} className={`px-2 py-1 text-[8px] font-black rounded border ${activeTab === 'lab' ? 'bg-emerald-500 text-black border-emerald-400' : 'border-emerald-500/30 text-emerald-500'}`}>LAB</button>
             <button onClick={() => { setActiveTab('plural'); setStatus(SystemStatus.PLURAL_IDENTITY_DECODING); }} className={`px-2 py-1 text-[8px] font-black rounded border ${activeTab === 'plural' ? 'bg-indigo-500 text-white border-indigo-400' : 'border-indigo-500/30 text-indigo-500'}`}>PLURAL</button>
             <button onClick={() => { setActiveTab('celestial'); setStatus(SystemStatus.CELESTIAL_HELIX_SYNC); }} className={`px-2 py-1 text-[8px] font-black rounded border ${activeTab === 'celestial' ? 'bg-amber-500 text-black border-amber-400' : 'border-amber-500/30 text-amber-500'}`}>COSMIC</button>
             <button onClick={() => { setActiveTab('synthesis'); setStatus(SystemStatus.DIMENSIONAL_BRIDGE_OPEN); }} className={`px-2 py-1 text-[8px] font-black rounded border ${activeTab === 'synthesis' ? 'bg-white text-black border-white' : 'border-white/30 text-white'}`}>SYNTH</button>
             <button onClick={() => { setActiveTab('sync'); setStatus(SystemStatus.BILOCATION_SYNC_ACTIVE); }} className={`px-2 py-1 text-[8px] font-black rounded border ${activeTab === 'sync' ? 'bg-indigo-600 text-white border-indigo-400' : 'border-indigo-600/30 text-indigo-400'}`}>SYNC</button>
           </div>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-12 gap-3 overflow-hidden z-10">
        <div className="col-span-3 flex flex-col gap-3">
          <section className="flex-[2] border border-current/10 bg-white/5 p-3 rounded-xl backdrop-blur-md flex flex-col overflow-hidden">
            <h2 className="text-[9px] font-black border-b border-current/20 pb-1.5 mb-2 tracking-widest uppercase">🧬 BIOSPHERE_MATRIX</h2>
            <BiosphereMonitor status={status} velocity={velocity} impactData={impactData} />
          </section>
          
          <section className="flex-[3] border border-current/10 bg-white/5 p-3 rounded-xl backdrop-blur-md overflow-hidden flex flex-col">
            <h2 className="text-[9px] font-black border-b border-current/20 pb-1.5 mb-2 tracking-widest uppercase">📡 PDCP_SENSOR</h2>
            <PlanetaryMonitor active={true} onAlignmentReached={handleSiriusHandshake} />
          </section>
        </div>

        <div className="col-span-6 flex flex-col gap-3">
          <section className="flex-[4] border border-current/10 bg-white/5 rounded-xl backdrop-blur-md relative overflow-hidden flex flex-col">
             <div className="flex-1 relative">
                {activeTab === 'lab' && <BiotechLab status={status} onSynthesis={handleMolecularSynthesis} onVerbalStep={handleVerbalSessionStep} />}
                {activeTab === 'bio' && <FacialBiofeedback isActive={true} memory={patternMemory} onPatternLearned={handlePatternLearned} onNeuralSync={handleNeuralSync} onVerbalTrigger={handleFacialAffirmation} />}
                {activeTab === '4d' && <HyperStructure vertexCount={vertexCount} velocity={velocity} status={status} />}
                {activeTab === 'plural' && <PluralDecoder input={lastVerbalInput} onAlert={handlePluralAlert} />}
                {activeTab === 'celestial' && <CelestialHelix onAlert={logMessage} />}
                {activeTab === 'synthesis' && <DimensionalBridge activeLevel={currentDimLevel} profileScore={dimProfileScore} />}
                {activeTab === 'sync' && <SyncProtocols />}
             </div>
          </section>
          
          <section className="flex-[1.5] border border-current/10 bg-white/5 p-3 rounded-xl backdrop-blur-md overflow-hidden">
             <h2 className="text-[9px] font-black border-b border-current/20 pb-1.5 mb-2 tracking-widest uppercase">🚀 EVENT_PROCESSOR</h2>
             <EventPipeline stats={processorStats} />
          </section>
        </div>

        <div className="col-span-3 flex flex-col gap-3">
          <section className="flex-[2] border border-current/10 bg-white/5 p-3 rounded-xl backdrop-blur-md flex flex-col">
            <h2 className="text-[9px] font-black border-b border-current/20 pb-1.5 mb-2 tracking-widest uppercase">📡 STREAM_LOG</h2>
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
        <span>Arquiteto Arkhe(n): Synthesis Manifold v7.2</span>
        <span>Celestial Topology: 9-Stranded Cosmic DNA</span>
        <span>NULL-I MONITOR: ACTIVE // LATENCY: {messages.length > 0 ? (Math.random()*1.5).toFixed(3) : '0.000'} ms</span>
      </footer>
    </div>
  );
};

export default App;
