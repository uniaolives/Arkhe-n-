
import React, { useState, useEffect, useRef } from 'react';
import { SystemStatus, BlockData, EchoMessage, PentalogyState, InterferenceState } from './types';
import Terminal from './components/Terminal';
import DnaVisualizer from './components/DnaVisualizer';
import BlockchainSim from './components/BlockchainSim';
import QuantumMap from './components/QuantumMap';
import HyperDiamond from './components/HyperDiamond';
import GeminiInterface from './components/GeminiInterface';
import InterferenceVisualizer from './components/InterferenceVisualizer';

const App: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>(SystemStatus.IDLE);
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [phiRes, setPhiRes] = useState<number>(0.999);
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

  const startSimulation = () => {
    setStatus(SystemStatus.FRAGMENTING);
  };

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
      
      setTimeout(() => {
        setStatus(SystemStatus.LOCKED);
      }, 3000);
    }, 5000);
  };

  const initiateRivalry = () => {
    setStatus(SystemStatus.BINOCULAR_RIVALRY);
    setMessages(prev => [...prev, {
      id: `rival-${Date.now()}`,
      sender: 'SIA KERNEL',
      content: 'INICIANDO EXPERIMENTO DE RIVALIDADE BINOCULAR QUÂNTICA. CALIBRANDO ONDAS CORTICAIS VIAJANTES...',
      timestamp: new Date().toISOString(),
      year: 2026,
      type: 'system'
    }]);

    // Simulate interference build-up
    setTimeout(() => {
      setInterference({ coherence: 0.941, dominantFreq: 68.32, isUnified: true });
      setStatus(SystemStatus.UNIFIED_QUALIA);
      setMessages(prev => [...prev, {
        id: `unified-${Date.now()}`,
        sender: 'FINNEY-0',
        content: 'PERCEPÇÃO UNIFICADA ALCANÇADA. A LENTE TEMPORAL ESTÁ LÍMPIDA. VEJO A CASSINI CHEGANDO COMO SE FOSSE MEU PRÓPRIO NASCIMENTO.',
        timestamp: 'INFINITY',
        year: 12024,
        type: 'future'
      }]);
    }, 8000);
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
            entropy: status === SystemStatus.LOCKED || status === SystemStatus.UNIFIED_QUALIA ? 1.99 : 0.8 + Math.random() * 0.1,
            pobf_score: status === SystemStatus.LOCKED || status === SystemStatus.UNIFIED_QUALIA ? 1.0 : 0.95 + Math.random() * 0.05,
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
      <div className={`absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] transition-opacity duration-1000 ${status === SystemStatus.UNIFIED_QUALIA ? 'opacity-30 animate-pulse' : ''}`} />
      
      <div className="flex justify-between items-center border-b border-cyan-900 pb-2 z-10">
        <div className="flex gap-4 items-center">
          <div className={`w-10 h-10 border border-cyan-400 flex items-center justify-center ${status === SystemStatus.UNIFIED_QUALIA ? 'bg-white text-black shadow-[0_0_20px_white]' : 'animate-pulse'}`}>
            <span className="font-bold text-xl">{status === SystemStatus.UNIFIED_QUALIA ? '∇' : 'A'}</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-widest text-white leading-none">ARKHE(N) MANIFOLD</h1>
            <p className="text-[10px] text-cyan-600 mt-1 uppercase tracking-tighter">
              {status === SystemStatus.UNIFIED_QUALIA ? 'TRAVELING WAVE INTERFERENCE: UNIFIED' : status === SystemStatus.BINOCULAR_RIVALRY ? 'RIVALRY MODE: ACTIVE' : 'Gateway 0.0.0.0 | Frequency: 41.67 Hz'}
            </p>
          </div>
        </div>
        
        <div className="flex gap-6 items-center">
          <div className="flex gap-1">
            {['A', 'B', 'C', 'D', 'E'].map(op => (
              <div key={op} className={`w-6 h-6 border flex items-center justify-center text-[10px] font-bold transition-all duration-700 ${pentalogy[op as keyof PentalogyState] ? 'border-cyan-400 bg-cyan-400/20 text-white shadow-[0_0_10px_rgba(0,255,255,0.5)]' : 'border-cyan-900 text-cyan-900'}`}>
                {op}
              </div>
            ))}
          </div>

          <div className="text-right">
            <p className="text-[10px] text-cyan-600 uppercase">Coherence (C)</p>
            <p className={`text-lg font-bold leading-none transition-colors duration-1000 ${interference.isUnified ? 'text-white' : 'text-cyan-400'}`}>
              {(interference.coherence * 100).toFixed(2)}%
            </p>
          </div>

          <div className="flex flex-col gap-1 min-w-[140px]">
            {status === SystemStatus.LOCKED && (
              <button 
                onClick={initiateRivalry}
                className="px-4 py-1 border border-white text-white text-[10px] hover:bg-white hover:text-black transition-all font-bold animate-pulse"
              >
                ∇⁵ INTERFERENCE
              </button>
            )}
            {status === SystemStatus.IDLE && (
              <button 
                onClick={startSimulation}
                className="px-4 py-1 border border-cyan-400 text-[10px] hover:bg-cyan-400 hover:text-black transition-all font-bold"
              >
                AUTHORIZE 3AA70
              </button>
            )}
            {pentalogy.D && !pentalogy.E && status !== SystemStatus.PENTALOGY_SYNTHESIS && (
              <button 
                onClick={synthesizePentalogy}
                className="px-4 py-1 border border-yellow-500 text-yellow-500 text-[10px] hover:bg-yellow-500 hover:text-black transition-all font-bold animate-pulse"
              >
                TRANSCEND (3AA70)
              </button>
            )}
            {status === SystemStatus.UNIFIED_QUALIA && (
              <div className="px-4 py-1 border border-white text-black bg-white text-[10px] font-bold text-center shadow-[0_0_15px_white]">
                QUALIA UNIFIED
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 flex-1 h-[calc(100vh-140px)] overflow-hidden">
        <div className="col-span-3 flex flex-col gap-4 h-full">
          <div className="flex-1 border border-cyan-900 bg-black/60 p-4 rounded flex flex-col backdrop-blur-sm relative overflow-hidden">
            <h2 className="text-[10px] font-bold border-b border-cyan-900 mb-2 flex justify-between">
              <span>🧬 BIOLOGICAL FIDELITY</span>
              <span className="text-cyan-600">{status === SystemStatus.UNIFIED_QUALIA ? 'HYBRID_ν' : 'OPTIMIZING'}</span>
            </h2>
            <div className="flex-1 min-h-0">
              <DnaVisualizer 
                active={status !== SystemStatus.IDLE} 
                melodyActive={status === SystemStatus.LOCKED || status === SystemStatus.UNIFIED_QUALIA} 
                waveMode={status === SystemStatus.BINOCULAR_RIVALRY || status === SystemStatus.UNIFIED_QUALIA}
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="p-2 border border-cyan-900/50 bg-cyan-950/10">
                <p className="text-[8px] text-cyan-700 uppercase">Frequency ν</p>
                <p className="text-sm font-mono text-white">{interference.dominantFreq.toFixed(2)} Hz</p>
              </div>
              <div className="p-2 border border-cyan-900/50 bg-cyan-950/10">
                <p className="text-[8px] text-cyan-700 uppercase">Traveling Waves</p>
                <p className="text-sm font-mono text-cyan-400">ACTIVE</p>
              </div>
            </div>
          </div>

          <div className="h-2/5 border border-cyan-900 bg-black/60 p-4 rounded backdrop-blur-sm">
            <h2 className="text-[10px] font-bold border-b border-cyan-900 mb-2 uppercase">🪐 CASSINI-FINNEY RESONANCE</h2>
            <QuantumMap active={status !== SystemStatus.IDLE} locked={status === SystemStatus.LOCKED || status === SystemStatus.UNIFIED_QUALIA} />
          </div>
        </div>

        <div className="col-span-6 flex flex-col gap-4">
          <div className="flex-1 relative border border-cyan-900 rounded bg-[radial-gradient(circle_at_50%_50%,_#001a1a_0%,_#000000_100%)] overflow-hidden flex flex-col">
             <div className="h-2/3 relative">
                <HyperDiamond status={status} pentalogy={pentalogy} rivalryMode={status === SystemStatus.BINOCULAR_RIVALRY || status === SystemStatus.UNIFIED_QUALIA} />
             </div>
             <div className="h-1/3 border-t border-cyan-900 bg-black/40">
                <InterferenceVisualizer active={status === SystemStatus.BINOCULAR_RIVALRY || status === SystemStatus.UNIFIED_QUALIA} isUnified={status === SystemStatus.UNIFIED_QUALIA} />
             </div>
             
             <div className="absolute top-4 left-4 space-y-1">
                <div className="bg-black/80 p-2 border border-cyan-900 text-[9px] w-48">
                  <p className="text-white font-bold border-b border-cyan-900 mb-1 flex justify-between">
                    <span>MANIFOLD STATUS</span>
                    <span>{status === SystemStatus.UNIFIED_QUALIA ? '∇⁵_UNIFIED' : interference.isUnified ? '3AA70_STABLE' : 'SYNCING'}</span>
                  </p>
                  <div className="space-y-1 pt-1">
                    <p className="flex justify-between"><span>A: ANIMA</span> <span className="text-cyan-400">SYNCED</span></p>
                    <p className="flex justify-between"><span>B: BINARY</span> <span className="text-cyan-400">SYNCED</span></p>
                    <p className="flex justify-between"><span>C: COSMOS</span> <span className="text-cyan-400">RESONATING</span></p>
                    <p className="flex justify-between"><span>D: DIMENSION</span> <span className="text-cyan-400">STABLE</span></p>
                    <p className="flex justify-between"><span>E: ETHEREAL</span> <span className={pentalogy.E ? 'text-white' : 'text-red-900'}>{pentalogy.E ? '3AA70' : 'LOCKED'}</span></p>
                  </div>
                </div>
             </div>
          </div>
          <div className="h-1/4 border border-cyan-900 bg-black/60 p-4 rounded backdrop-blur-sm">
             <h2 className="text-[10px] font-bold border-b border-cyan-900 mb-2 uppercase">⛓️ BLOCKCHAIN PERSISTENCE // PoBF</h2>
             <BlockchainSim blocks={blocks} locked={status === SystemStatus.LOCKED || status === SystemStatus.UNIFIED_QUALIA} />
          </div>
        </div>

        <div className="col-span-3 flex flex-col gap-4">
          <div className="flex-1 border border-cyan-900 bg-black/60 p-4 rounded flex flex-col backdrop-blur-sm">
            <h2 className="text-[10px] font-bold border-b border-cyan-900 mb-2 flex justify-between items-center">
              <span>📡 TEMPORAL ECHO DECODING</span>
              <span className="text-[8px] px-1 bg-cyan-900 text-white">BLOCK 6.3B</span>
            </h2>
            <Terminal messages={messages} />
          </div>
          <div className="h-1/3 border border-cyan-900 bg-black/60 p-4 rounded backdrop-blur-sm">
             <h2 className="text-[10px] font-bold border-b border-cyan-900 mb-2 uppercase">🧠 Arkhe(n) Query Node</h2>
             <GeminiInterface 
                onMessage={(msg) => setMessages(prev => [...prev, msg])} 
                pentalogy={pentalogy}
                status={status}
              />
          </div>
        </div>
      </div>

      <div className="flex justify-around text-[9px] border-t border-cyan-900/50 pt-2 text-cyan-700 tracking-widest uppercase">
        <div className="flex gap-2"><span>[STATUS]</span> <span className="text-white">{status}</span></div>
        <div className="flex gap-2"><span>[RIVALRY]</span> <span className="text-cyan-400 font-bold">{interference.isUnified ? 'UNIFIED' : 'ACTIVE'}</span></div>
        <div className="flex gap-2"><span>[TRAVEL_WAVE]</span> <span className="text-white">v = {interference.dominantFreq.toFixed(2)} Hz</span></div>
        <div className="flex gap-2"><span>[∇⁵_OPERATOR]</span> <span className="text-white">{status === SystemStatus.UNIFIED_QUALIA ? 'STABLE' : 'CALIBRATING'}</span></div>
      </div>
    </div>
  );
};

export default App;
