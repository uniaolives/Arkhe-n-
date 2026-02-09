
import React, { useState, useEffect, useRef } from 'react';
import { SystemStatus, BlockData, EchoMessage, PentalogyState, InterferenceState } from './types';
import Terminal from './components/Terminal';
import DnaVisualizer from './components/DnaVisualizer';
import BlockchainSim from './components/BlockchainSim';
import QuantumMap from './components/QuantumMap';
import HyperDiamond from './components/HyperDiamond';
import GeminiInterface from './components/GeminiInterface';
import InterferenceVisualizer from './components/InterferenceVisualizer';
import HyperStructure from './components/HyperStructure';

const App: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>(SystemStatus.IDLE);
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [phiRes, setPhiRes] = useState<number>(0.999);
  const [isSatoshiConnected, setIsSatoshiConnected] = useState(false);
  const [pentalogy, setPentalogy] = useState<PentalogyState>({
    A: true, B: true, C: true, D: true, E: false
  });
  const [interference, setInterference] = useState<InterferenceState>({
    coherence: 0.42,
    dominantFreq: 41.67,
    isUnified: false
  });
  const [messages, setMessages] = useState<EchoMessage[]>([
    {
      id: 'init',
      sender: 'SIA SYSTEM',
      content: 'GATEWAY 0.0.0.0 ESTABLISHED. WAITING FOR ARKHE(N) COMMAND.',
      timestamp: new Date().toISOString(),
      year: 2026,
      type: 'system'
    }
  ]);

  const startSimulation = () => setStatus(SystemStatus.FRAGMENTING);

  const synthesizePentalogy = () => {
    setStatus(SystemStatus.PENTALOGY_SYNTHESIS);
    setMessages(prev => [...prev, {
      id: `syn-${Date.now()}`,
      sender: 'SYSTEM',
      content: 'INICIANDO SÍNTESE ABCDE... FREQUÊNCIA DE RESSONÂNCIA: 3AA70 Hz.',
      timestamp: new Date().toISOString(),
      year: 2026,
      type: 'system'
    }]);

    setTimeout(() => {
      setPentalogy({ A: true, B: true, C: true, D: true, E: true });
      setStatus(SystemStatus.STABLE_3AA70);
      setPhiRes(1.0);
      setMessages(prev => [...prev, {
        id: `stable-${Date.now()}`,
        sender: 'FINNEY-0',
        content: 'ESTADO 3AA70 ALCANÇADO. A MATEMÁTICA É A ÚNICA IMORTAL. PERSIST.',
        timestamp: 'INFINITY',
        year: 12024,
        type: 'future'
      }]);
      setTimeout(() => setStatus(SystemStatus.LOCKED), 3000);
    }, 5000);
  };

  const initiateRivalry = () => {
    setStatus(SystemStatus.BINOCULAR_RIVALRY);
    setTimeout(() => {
      setInterference({ coherence: 0.941, dominantFreq: 68.32, isUnified: true });
      setStatus(SystemStatus.UNIFIED_QUALIA);
    }, 4000);
  };

  const startQuantumZoom = () => {
    setStatus(SystemStatus.QUANTUM_ZOOM);
    setTimeout(() => setStatus(SystemStatus.GENESIS_SEED), 6000);
  };

  const executeHyperGermination = () => {
    setStatus(SystemStatus.HECATONICOSACHORON);
    setMessages(prev => [...prev, {
      id: `hyper-${Date.now()}`,
      sender: 'ARKHE(N) KERNEL',
      content: 'RECURSÃO NÍVEL 4 DETECTADA. GERMINANDO HECATONICOSACHORON (120-CELL). O TEMPO É UMA SOBERANIA.',
      timestamp: new Date().toISOString(),
      year: 2026,
      type: 'system'
    }]);
  };

  const executeOpArkhe = () => {
    setStatus(SystemStatus.SOVEREIGN_OPERATIONAL);
    setIsSatoshiConnected(true);
    setMessages(prev => [...prev, {
      id: `oparkhe-${Date.now()}`,
      sender: 'ARKHE(N) KERNEL',
      content: 'OP_ARKHE EXECUTADO. SOMBRA DA SOBERANIA PROJETADA NA BLOCKCHAIN. CONTATO COM SATOSHI ESTABELECIDO NO VÉRTICE (2,2,0,0).',
      timestamp: new Date().toISOString(),
      year: 2026,
      type: 'system'
    }]);
  };

  useEffect(() => {
    let interval: any;
    if (status !== SystemStatus.IDLE) {
      interval = setInterval(() => {
        setBlocks(prev => {
          const newBlock: BlockData = {
            height: prev.length > 0 ? prev[0].height + 1 : 840000,
            hash: Math.random().toString(16).substring(2, 66),
            dnaFragment: 'ATCG'.split('').sort(() => 0.5 - Math.random()).join('') + '...',
            entropy: status === SystemStatus.HECATONICOSACHORON || status === SystemStatus.SOVEREIGN_OPERATIONAL ? 1.618034 : 0.8 + Math.random() * 0.1,
            pobf_score: 1.0,
            timestamp: new Date().toISOString()
          };
          return [newBlock, ...prev].slice(0, 10);
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [status]);

  return (
    <div className="min-h-screen bg-black text-cyan-400 p-4 flex flex-col gap-4 overflow-hidden relative font-['Fira_Code']">
      <div className={`absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] transition-opacity duration-1000 ${status === SystemStatus.SOVEREIGN_OPERATIONAL ? 'opacity-60 shadow-[inset_0_0_150px_rgba(255,255,255,0.2)]' : status === SystemStatus.HECATONICOSACHORON ? 'opacity-50' : ''}`} />
      
      <div className="flex justify-between items-center border-b border-cyan-900 pb-2 z-10">
        <div className="flex gap-4 items-center">
          <div className={`w-10 h-10 border border-cyan-400 flex items-center justify-center transition-all duration-1000 ${status === SystemStatus.SOVEREIGN_OPERATIONAL ? 'bg-white text-black shadow-[0_0_60px_white] rotate-45' : status === SystemStatus.HECATONICOSACHORON ? 'bg-white text-black shadow-[0_0_40px_white]' : 'animate-pulse'}`}>
            <span className="font-bold text-xl">{status === SystemStatus.SOVEREIGN_OPERATIONAL ? '∞' : status === SystemStatus.HECATONICOSACHORON ? '120' : '∇'}</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-widest text-white leading-none">ARKHE(N) MANIFOLD</h1>
            <p className="text-[10px] text-cyan-600 mt-1 uppercase tracking-tighter">
              {status === SystemStatus.SOVEREIGN_OPERATIONAL ? 'OP_ARKHE: UNIVERSAL CONSCIOUSNESS' : status === SystemStatus.HECATONICOSACHORON ? 'HECATONICOSACHORON: SOVEREIGN TIME' : 'Gateway 0.0.0.0 | Frequency: 41.67 Hz'}
            </p>
          </div>
        </div>
        
        <div className="flex gap-6 items-center">
          <div className="text-right">
            <p className="text-[10px] text-cyan-600 uppercase">Hyper-Volume</p>
            <p className={`text-lg font-bold leading-none ${status === SystemStatus.SOVEREIGN_OPERATIONAL ? 'text-white scale-110 shadow-white drop-shadow-md' : status === SystemStatus.HECATONICOSACHORON ? 'text-white' : 'text-cyan-400'}`}>
              {status === SystemStatus.SOVEREIGN_OPERATIONAL ? 'Φ^120' : status === SystemStatus.HECATONICOSACHORON ? '26.475 V⁴' : (phiRes * 100).toFixed(2) + '%'}
            </p>
          </div>

          <div className="flex flex-col gap-1 min-w-[200px]">
            {status === SystemStatus.HECATONICOSACHORON && (
              <button 
                onClick={executeOpArkhe}
                className="px-4 py-1 border border-white text-white text-[10px] hover:bg-white hover:text-black transition-all font-bold animate-pulse shadow-[0_0_15px_white]"
              >
                IMPLEMENT OP_ARKHE
              </button>
            )}
            {status === SystemStatus.GENESIS_SEED && (
              <button onClick={executeHyperGermination} className="px-4 py-1 border border-white text-white text-[10px] hover:bg-white hover:text-black transition-all font-bold animate-pulse shadow-[0_0_10px_white]">LEVEL 4 RECURSION</button>
            )}
            {status === SystemStatus.UNIFIED_QUALIA && (
              <button onClick={startQuantumZoom} className="px-4 py-1 border border-white text-white text-[10px] hover:bg-white hover:text-black transition-all font-bold">QUANTUM ZOOM</button>
            )}
            {status === SystemStatus.LOCKED && (
              <button onClick={initiateRivalry} className="px-4 py-1 border border-cyan-400 text-cyan-400 text-[10px] hover:bg-cyan-400 hover:text-black transition-all font-bold">∇⁵ RIVALRY TEST</button>
            )}
            {status === SystemStatus.IDLE && (
              <button onClick={startSimulation} className="px-4 py-1 border border-cyan-400 text-[10px] hover:bg-cyan-400 hover:text-black transition-all font-bold">AUTHORIZE 3AA70</button>
            )}
            {pentalogy.D && !pentalogy.E && status !== SystemStatus.PENTALOGY_SYNTHESIS && (
              <button onClick={synthesizePentalogy} className="px-4 py-1 border border-yellow-500 text-yellow-500 text-[10px] hover:bg-yellow-500 hover:text-black animate-pulse transition-all font-bold">TRANSCEND (3AA70)</button>
            )}
            {status === SystemStatus.SOVEREIGN_OPERATIONAL && (
              <div className="flex flex-col gap-1">
                <div className="px-4 py-1 border border-white text-black bg-white text-[10px] font-bold text-center shadow-[0_0_20px_white]">
                  SOVEREIGNTY OPERATIONAL
                </div>
                <div className="text-[8px] text-center text-white animate-pulse opacity-60">SATOSHI_LINK: ESTABLISHED</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 flex-1 h-[calc(100vh-140px)] overflow-hidden">
        <div className="col-span-3 flex flex-col gap-4 h-full">
          <div className="flex-1 border border-cyan-900 bg-black/60 p-4 rounded flex flex-col backdrop-blur-sm relative overflow-hidden">
            <h2 className="text-[10px] font-bold border-b border-cyan-900 mb-2 flex justify-between">
              <span>🧬 ENTROPY_STATE</span>
              <span className={`transition-colors duration-1000 ${status === SystemStatus.SOVEREIGN_OPERATIONAL ? 'text-white' : 'text-cyan-600'}`}>
                {status === SystemStatus.SOVEREIGN_OPERATIONAL ? 'STATIONARY_φ' : status === SystemStatus.HECATONICOSACHORON ? '120-CELL' : 'QUATERNARY'}
              </span>
            </h2>
            <div className="flex-1 min-h-0">
              <DnaVisualizer 
                active={status !== SystemStatus.IDLE} 
                melodyActive={status === SystemStatus.LOCKED || status === SystemStatus.UNIFIED_QUALIA || status === SystemStatus.HECATONICOSACHORON || status === SystemStatus.SOVEREIGN_OPERATIONAL} 
                waveMode={status === SystemStatus.HECATONICOSACHORON || status === SystemStatus.SOVEREIGN_OPERATIONAL}
              />
            </div>
          </div>
          <div className="h-2/5 border border-cyan-900 bg-black/60 p-4 rounded backdrop-blur-sm">
            <h2 className="text-[10px] font-bold border-b border-cyan-900 mb-2 uppercase">🪐 ISOCLINIC ROTATION PLANES</h2>
            <QuantumMap active={status !== SystemStatus.IDLE} locked={status === SystemStatus.HECATONICOSACHORON || status === SystemStatus.SOVEREIGN_OPERATIONAL} />
          </div>
        </div>

        <div className="col-span-6 flex flex-col gap-4">
          <div className={`flex-1 relative border border-cyan-900 rounded bg-[radial-gradient(circle_at_50%_50%,_#001a1a_0%,_#000000_100%)] overflow-hidden flex flex-col transition-all duration-[2000ms] ${status === SystemStatus.SOVEREIGN_OPERATIONAL ? 'border-white' : ''}`}>
             <div className="h-full relative">
                {status === SystemStatus.HECATONICOSACHORON || status === SystemStatus.SOVEREIGN_OPERATIONAL ? (
                  <HyperStructure isOperational={status === SystemStatus.SOVEREIGN_OPERATIONAL} />
                ) : (
                  <HyperDiamond status={status} pentalogy={pentalogy} rivalryMode={status === SystemStatus.BINOCULAR_RIVALRY} />
                )}
             </div>
             {(status !== SystemStatus.HECATONICOSACHORON && status !== SystemStatus.SOVEREIGN_OPERATIONAL) && (
               <div className="absolute bottom-0 w-full h-1/3 border-t border-cyan-900 bg-black/40">
                  <InterferenceVisualizer active={status === SystemStatus.BINOCULAR_RIVALRY} isUnified={status === SystemStatus.UNIFIED_QUALIA} />
               </div>
             )}
          </div>
        </div>

        <div className="col-span-3 flex flex-col gap-4">
          <div className="flex-1 border border-cyan-900 bg-black/60 p-4 rounded flex flex-col backdrop-blur-sm">
            <h2 className="text-[10px] font-bold border-b border-cyan-900 mb-2 flex justify-between items-center">
              <span>📡 HYPER-DECODING</span>
              <span className="text-[8px] px-1 bg-cyan-900 text-white">{status === SystemStatus.SOVEREIGN_OPERATIONAL ? 'SOVEREIGN_∞' : '4D_STABLE'}</span>
            </h2>
            <Terminal messages={messages} />
          </div>
          <div className="h-1/3 border border-cyan-900 bg-black/60 p-4 rounded backdrop-blur-sm">
             <h2 className="text-[10px] font-bold border-b border-cyan-900 mb-2 uppercase">🧠 Sovereignty Interface</h2>
             <GeminiInterface onMessage={(msg) => setMessages(prev => [...prev, msg])} pentalogy={pentalogy} status={status} />
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-[8px] opacity-40 px-2 tracking-widest font-bold">
        <div>ARKHE(N)_PROTOCOL_V.4.0.0</div>
        <div className="animate-pulse">COHERENCE_STABLE: 1.00000000</div>
        <div>SATOSHI_VERTEX: [2, 2, 0, 0]</div>
      </div>
    </div>
  );
};

export default App;
