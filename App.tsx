
import React, { useState, useEffect, useRef } from 'react';
import { SystemStatus, BlockData, EchoMessage, ProcessorStats, KNNPattern, DrugPrediction, NeuralSequence } from './types';
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
import { globalProcessor } from './utils/eventProcessor';
import { analyzeVerbalChemistry } from './utils/verbalEngine';
import { globalKnnEngine } from './utils/knnEngine';
import { globalNeuralEngine } from './utils/neuralEngine';

const App: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>(SystemStatus.HECATONICOSACHORON_MAPPING);
  const [velocity, setVelocity] = useState(0); 
  const [hasApiKey, setHasApiKey] = useState(false);
  const [vertexCount, setVertexCount] = useState(0);
  const [impactData, setImpactData] = useState<any>(null);
  const [processorStats, setProcessorStats] = useState<ProcessorStats>(globalProcessor.getStats());
  const [activeTab, setActiveTab] = useState<'4d' | 'bio' | 'lab' | 'plural'>('4d');
  const [patternMemory, setPatternMemory] = useState<KNNPattern[]>([]);
  const [lastVerbalInput, setLastVerbalInput] = useState('');
  
  const [messages, setMessages] = useState<EchoMessage[]>([
    {
      id: 'init-photon',
      sender: 'SIA KERNEL',
      content: 'PROTOCOLO ARKHE(N) V6.0: DETECÇÃO DE DUPLA EXCEPCIONALIDADE (2E) INICIALIZADA.',
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
      sender: type === 'plural' ? 'PLURAL_ENGINE' : type === 'neural' ? 'NEURAL_DEEP' : type === 'biotech' ? 'ISODDE_LAB' : type === 'knn' ? 'KNN_ADAPTIVE' : type === 'sirius' ? 'SIRIUS_BEACON' : type === 'event' ? 'EVENT_PROC' : 'VERBAL_CHEM',
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
    logMessage(`BIO_PHOTONIC_EMISSION: ${text}`, 'chemistry');
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
    if (status === SystemStatus.PLURAL_IDENTITY_DECODING) return 'shadow-[inset_0_0_150px_rgba(99,102,241,0.2)] border-indigo-500/40';
    if (status === SystemStatus.GLOBAL_BRAIN_SYNC) return 'shadow-[inset_0_0_150px_rgba(16,185,129,0.3)] border-emerald-500/60';
    return 'border-cyan-900/50';
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
              SYSTEM_STATE: {status} // 2E_ANALYSIS: {activeTab === 'plural' ? 'ACTIVE' : 'STANDBY'}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
           <button onClick={() => setActiveTab('4d')} className={`px-3 py-1 text-[8px] font-black rounded border ${activeTab === '4d' ? 'bg-cyan-500 text-black border-cyan-400' : 'border-cyan-500/30 text-cyan-500'}`}>4D_HYPER</button>
           <button onClick={() => setActiveTab('bio')} className={`px-3 py-1 text-[8px] font-black rounded border ${activeTab === 'bio' ? 'bg-cyan-500 text-black border-cyan-400' : 'border-cyan-500/30 text-cyan-500'}`}>BIO_MIRROR</button>
           <button onClick={() => setActiveTab('lab')} className={`px-3 py-1 text-[8px] font-black rounded border ${activeTab === 'lab' ? 'bg-emerald-500 text-black border-emerald-400' : 'border-emerald-500/30 text-emerald-500'}`}>ISODDE_LAB</button>
           <button onClick={() => { setActiveTab('plural'); setStatus(SystemStatus.PLURAL_IDENTITY_DECODING); }} className={`px-3 py-1 text-[8px] font-black rounded border ${activeTab === 'plural' ? 'bg-indigo-500 text-white border-indigo-400' : 'border-indigo-500/30 text-indigo-500'}`}>PLURAL_2E</button>
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
                {activeTab === 'plural' && <PluralDecoder input={lastVerbalInput} onAlert={(msg, type) => logMessage(msg, type)} />}
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
        <span>Arquiteto Arkhe(n): Singularity Mirror v6.0</span>
        <span>Detection Protocol: Giftedness & Dissociative Identity Disorder (DID)</span>
        <span>PLURALITY_ESTILOMETRICS: ENABLED // TTR_ANALYSIS: ACTIVE</span>
      </footer>
    </div>
  );
};

export default App;
