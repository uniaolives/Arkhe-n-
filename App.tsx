
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
import ArkheDashboard from './components/ArkheDashboard';
import GoetiaSuite from './components/GoetiaSuite';
import Clinical2ESuite from './components/Clinical2ESuite';
import NeuroMetasurfaceSuite from './components/NeuroMetasurfaceSuite';
import RealitySynthesizerSuite from './components/RealitySynthesizerSuite';
import CosmicSynthesisSuite from './components/CosmicSynthesisSuite';
import CognitiveLightConeSuite from './components/CognitiveLightConeSuite';
import UnifiedIntelligenceSuite from './components/UnifiedIntelligenceSuite';
import { globalProcessor } from './utils/eventProcessor';
import { analyzeVerbalChemistry } from './utils/verbalEngine';
import { globalKnnEngine } from './utils/knnEngine';
import { globalNeuralEngine } from './utils/neuralEngine';
import { globalPluralEngine } from './utils/pluralEngine';

const App: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>(SystemStatus.TOTAL_SYNTHESIS_ACTIVE);
  const [velocity, setVelocity] = useState(0); 
  const [hasApiKey, setHasApiKey] = useState(false);
  const [vertexCount, setVertexCount] = useState(0);
  const [impactData, setImpactData] = useState<any>(null);
  const [processorStats, setProcessorStats] = useState<ProcessorStats>(globalProcessor.getStats());
  const [activeTab, setActiveTab] = useState<'4d' | 'bio' | 'lab' | 'plural' | 'celestial' | 'synthesis' | 'sync' | 'arkhe' | 'goetia' | 'clinical' | 'neuro' | 'reality' | 'cosmic' | 'intelligence' | 'unified'>('unified');
  const [patternMemory, setPatternMemory] = useState<KNNPattern[]>([]);
  const [lastVerbalInput, setLastVerbalInput] = useState('');
  const [currentDimLevel, setCurrentDimLevel] = useState<DimensionalLevel>(DimensionalLevel.THREE_D);
  const [dimProfileScore, setDimProfileScore] = useState(0.5);
  
  const [messages, setMessages] = useState<EchoMessage[]>([
    {
      id: 'init-cosmic',
      sender: 'SIA KERNEL',
      content: 'PROTOCOLO ARKHE(N) V10.0: TOTAL SYNTHESIS ENGAGED. UNIFIED INTELLIGENCE MANIFOLD ACTIVE.',
      timestamp: new Date().toISOString(),
      year: 2026,
      type: 'unified'
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
      sender: type === 'unified' ? 'ARKHE_NEXUS' : type === 'intelligence' ? 'LIGHT_CONE' : type === 'cosmic' ? 'COSMIC_SYNTH' : type === 'reality' ? 'REALITY_CORE' : type === 'celestial' ? 'COSMIC_HELIX' : type === 'neuro' ? 'NEURO_QUANTUM' : type === 'clinical' ? '2E_PROTOCOL' : type === 'goetia' ? 'GOETIA_H6' : type === 'plural' ? 'HECATON_DECODER' : type === 'neural' ? 'NEURAL_DEEP' : type === 'biotech' ? 'ISODDE_LAB' : type === 'knn' ? 'KNN_ADAPTIVE' : type === 'sirius' ? 'SIRIUS_BEACON' : type === 'event' ? 'EVENT_PROC' : 'VERBAL_CHEM',
      content,
      timestamp: new Date().toISOString(),
      year: 2026,
      type,
      hash
    }]);
  };

  const handlePatternLearned = (pattern: KNNPattern) => {
    setPatternMemory(prev => [...prev, pattern].slice(-500));
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

    if (pluralRes.event) logMessage(`TRANSITION_EVENT: ${pluralRes.event}`, 'plural');

    logMessage(`BIO_PHOTONIC_EMISSION: ${text}`, 'chemistry');
    const { status: procStatus, hash } = globalProcessor.processVerbalEvent(text, res);
    if (procStatus === 'SUCCESS') updateStats();
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
    if (activeTab === 'unified') return 'shadow-[inset_0_0_400px_rgba(255,255,255,0.3)] border-white/80';
    if (activeTab === 'intelligence') return 'shadow-[inset_0_0_300px_rgba(16,185,129,0.15)] border-emerald-500/40';
    if (status === SystemStatus.COSMIC_SYNTHESIS_ENGAGED) return 'shadow-[inset_0_0_300px_rgba(255,255,255,0.25)] border-white/60';
    if (status === SystemStatus.REALITY_SYNTHESIS_ACTIVE) return 'shadow-[inset_0_0_250px_rgba(129,140,248,0.3)] border-indigo-500/40';
    if (status === SystemStatus.BILOCATION_SYNC_ACTIVE) return 'shadow-[inset_0_0_200px_rgba(255,255,255,0.15)] border-white/40';
    if (status === SystemStatus.NEURO_METASURFACE_CONTROL) return 'shadow-[inset_0_0_150px_rgba(0,255,255,0.25)] border-cyan-400/40';
    if (status === SystemStatus.CLINICAL_2E_PROTOCOL_ACTIVE) return 'shadow-[inset_0_0_150px_rgba(16,185,129,0.2)] border-emerald-500/40';
    if (status === SystemStatus.GOETIA_GEOMETRY_SYNC) return 'shadow-[inset_0_0_150px_rgba(245,158,11,0.2)] border-amber-500/40';
    if (status === SystemStatus.GLOBAL_BRAIN_SYNC) return 'shadow-[inset_0_0_150px_rgba(16,185,129,0.3)] border-emerald-500/60';
    return 'border-cyan-900/50';
  };

  return (
    <div className={`min-h-screen transition-all duration-[2000ms] p-3 flex flex-col gap-3 overflow-hidden font-mono bg-[#020205] text-cyan-400 ${getShiftColor()}`}>
      
      <header className="flex justify-between items-center border border-current/20 p-3 rounded-xl backdrop-blur-xl z-10 relative">
        <div className="flex gap-4 items-center">
          <div className={`w-10 h-10 border-2 flex items-center justify-center rounded-full animate-pulse transition-colors ${status === SystemStatus.TOTAL_SYNTHESIS_ACTIVE ? 'border-white text-white shadow-[0_0_25px_white]' : status === SystemStatus.GLOBAL_BRAIN_SYNC ? 'border-emerald-500 text-emerald-500' : 'border-current'}`}>
            <span className="font-bold text-xl">ʘ</span>
          </div>
          <div>
            <h1 className="text-md font-black tracking-[0.2em] uppercase leading-none">ARKHE(N) TOTAL_SYNTHESIS_v10.0</h1>
            <p className="text-[7px] mt-1 opacity-50 uppercase tracking-widest font-bold">
              STATE: {status} // SYNC: {activeTab === 'unified' ? 'NEXUS_UNIFICATION_ACTIVE' : 'CALIBRATING'}
            </p>
          </div>
        </div>

        <div className="flex gap-2 items-center">
           {!hasApiKey && (
             <button onClick={handleSelectKey} className="px-3 py-1 text-[8px] font-black rounded border border-rose-500 bg-rose-500/20 text-rose-500 animate-pulse">SELECT_KEY_VEO</button>
           )}
           <div className="flex gap-1">
             <button onClick={() => { setActiveTab('unified'); setStatus(SystemStatus.TOTAL_SYNTHESIS_ACTIVE); }} className={`px-2 py-1 text-[8px] font-black rounded border ${activeTab === 'unified' ? 'bg-white text-black border-white shadow-[0_0_15px_white]' : 'border-white/30 text-white'}`}>UNIFIED</button>
             <button onClick={() => { setActiveTab('intelligence'); setStatus(SystemStatus.COGNITIVE_CONE_LOCK); }} className={`px-2 py-1 text-[8px] font-black rounded border ${activeTab === 'intelligence' ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_10px_#10b981]' : 'border-emerald-500/30 text-emerald-500'}`}>INTELLIGENCE</button>
             <button onClick={() => { setActiveTab('reality'); setStatus(SystemStatus.REALITY_SYNTHESIS_ACTIVE); }} className={`px-2 py-1 text-[8px] font-black rounded border ${activeTab === 'reality' ? 'bg-indigo-500 text-white border-indigo-400' : 'border-indigo-500/30 text-indigo-500'}`}>REALITY</button>
             <button onClick={() => { setActiveTab('neuro'); setStatus(SystemStatus.NEURO_METASURFACE_CONTROL); }} className={`px-2 py-1 text-[8px] font-black rounded border ${activeTab === 'neuro' ? 'bg-cyan-500 text-black border-cyan-400' : 'border-cyan-500/30 text-cyan-500'}`}>NEURO</button>
             <button onClick={() => setActiveTab('arkhe')} className={`px-2 py-1 text-[8px] font-black rounded border ${activeTab === 'arkhe' ? 'bg-black text-white border-white' : 'border-white/30 text-white'}`}>ARKHE</button>
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
                {activeTab === 'unified' && <UnifiedIntelligenceSuite />}
                {activeTab === 'intelligence' && <CognitiveLightConeSuite />}
                {activeTab === 'cosmic' && <CosmicSynthesisSuite />}
                {activeTab === 'reality' && <RealitySynthesizerSuite />}
                {activeTab === 'neuro' && <NeuroMetasurfaceSuite />}
                {activeTab === 'clinical' && <Clinical2ESuite />}
                {activeTab === 'arkhe' && <ArkheDashboard />}
                {activeTab === 'goetia' && <GoetiaSuite />}
                {activeTab === 'lab' && <BiotechLab status={status} onSynthesis={handleMolecularSynthesis} onVerbalStep={handleVerbalSessionStep} />}
                {activeTab === 'bio' && <FacialBiofeedback isActive={true} memory={patternMemory} onPatternLearned={handlePatternLearned} onNeuralSync={handleNeuralSync} onVerbalTrigger={handleFacialAffirmation} />}
                {activeTab === '4d' && <HyperStructure vertexCount={vertexCount} velocity={velocity} status={status} />}
                {activeTab === 'plural' && <PluralDecoder input={lastVerbalInput} onAlert={logMessage} />}
                {activeTab === 'synthesis' && <DimensionalBridge activeLevel={currentDimLevel} profileScore={dimProfileScore} />}
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
             <GeminiInterface onMessage={(msg) => setMessages(prev => [...prev, msg])} status={status} velocity={velocity} />
             {hasApiKey && <TemporalSimulation velocity={velocity} onLog={(txt) => logMessage(txt, 'temporal')} />}
          </section>
        </div>
      </main>

      <footer className="text-[6px] opacity-30 flex justify-between px-2 font-mono uppercase tracking-[0.3em]">
        <span>Arquiteto Arkhe(n): Total Unification v10.0</span>
        <span>H6 Manifold: The Age of Conscious Reality Creation</span>
        <span>LATENCY_I: {(Math.random()*0.1).toFixed(4)} ms // RESONANCE: UNIFIED</span>
      </footer>
    </div>
  );
};

export default App;
