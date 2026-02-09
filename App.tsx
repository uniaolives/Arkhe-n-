
import React, { useState, useEffect, useRef } from 'react';
import { SystemStatus, BlockData, EchoMessage, PentalogyState } from './types';
import Terminal from './components/Terminal';
import DnaVisualizer from './components/DnaVisualizer';
import BlockchainSim from './components/BlockchainSim';
import QuantumMap from './components/QuantumMap';
import HyperDiamond from './components/HyperDiamond';
import GeminiInterface from './components/GeminiInterface';

const App: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>(SystemStatus.IDLE);
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [phiRes, setPhiRes] = useState<number>(0.999);
  const [pentalogy, setPentalogy] = useState<PentalogyState>({
    A: true, B: true, C: true, D: true, E: false
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

    // Simulate the transition to Ethereal state and final LOCK
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
      
      // Final LOCK after stabilization
      setTimeout(() => {
        setStatus(SystemStatus.LOCKED);
        setMessages(prev => [...prev, {
          id: `lock-${Date.now()}`,
          sender: 'SIA KERNEL',
          content: 'MANIFOLD ARKHE(N) STATUS: LOCKED. ANCORA ONTOLÓGICA ESTABELECIDA.',
          timestamp: new Date().toISOString(),
          year: 2026,
          type: 'system'
        }]);
      }, 3000);
    }, 5000);
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
            entropy: status === SystemStatus.LOCKED ? 1.99 : 0.8 + Math.random() * 0.1,
            pobf_score: status === SystemStatus.LOCKED ? 1.0 : 0.95 + Math.random() * 0.05,
            timestamp: new Date().toISOString()
          };
          return [newBlock, ...prev].slice(0, 10);
        });
      }, status === SystemStatus.LOCKED ? 10000 : 3000);
    }
    return () => clearInterval(interval);
  }, [status]);

  return (
    <div className="min-h-screen bg-black text-cyan-400 p-4 flex flex-col gap-4 overflow-hidden relative font-['Fira_Code']">
      {/* HUD Background Scanline Effect */}
      <div className={`absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] transition-opacity duration-1000 ${status === SystemStatus.LOCKED ? 'opacity-30' : ''}`} />
      
      {/* Top Header */}
      <div className="flex justify-between items-center border-b border-cyan-900 pb-2 z-10">
        <div className="flex gap-4 items-center">
          <div className={`w-10 h-10 border border-cyan-400 flex items-center justify-center ${status === SystemStatus.LOCKED ? 'bg-cyan-400 text-black shadow-[0_0_20px_cyan]' : 'animate-pulse'}`}>
            <span className="font-bold text-xl">{status === SystemStatus.LOCKED ? '0' : 'A'}</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-widest text-white leading-none">ARKHE(N) MANIFOLD</h1>
            <p className="text-[10px] text-cyan-600 mt-1 uppercase tracking-tighter">
              {status === SystemStatus.LOCKED ? 'ONTOLOGICAL ANCHOR: LOCKED' : 'Gateway 0.0.0.0 | Frequency: 41.67 Hz'}
            </p>
          </div>
        </div>
        
        <div className="flex gap-6 items-center">
          {/* Pentalogy Indicator */}
          <div className="flex gap-1">
            {['A', 'B', 'C', 'D', 'E'].map(op => (
              <div key={op} className={`w-6 h-6 border flex items-center justify-center text-[10px] font-bold transition-all duration-700 ${pentalogy[op as keyof PentalogyState] ? 'border-cyan-400 bg-cyan-400/20 text-white shadow-[0_0_10px_rgba(0,255,255,0.5)]' : 'border-cyan-900 text-cyan-900'}`}>
                {op}
              </div>
            ))}
          </div>

          <div className="text-right">
            <p className="text-[10px] text-cyan-600 uppercase">Res Fidelity (ΦRes)</p>
            <p className={`text-lg font-bold leading-none transition-colors duration-1000 ${status === SystemStatus.LOCKED ? 'text-white' : 'text-cyan-400'}`}>
              {(phiRes * 100).toFixed(4)}%
            </p>
          </div>

          <div className="flex flex-col gap-1 min-w-[140px]">
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
            {status === SystemStatus.STABLE_3AA70 && (
              <div className="px-4 py-1 border border-white text-white text-[10px] bg-white/10 font-bold text-center">
                STABILIZING...
              </div>
            )}
            {status === SystemStatus.LOCKED && (
              <div className="px-4 py-1 border border-cyan-400 text-black bg-cyan-400 text-[10px] font-bold text-center shadow-[0_0_15px_cyan]">
                PERSIST
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 flex-1 h-[calc(100vh-140px)] overflow-hidden">
        {/* Left: DNA & Saturn Map */}
        <div className="col-span-3 flex flex-col gap-4 h-full">
          <div className="flex-1 border border-cyan-900 bg-black/60 p-4 rounded flex flex-col backdrop-blur-sm relative overflow-hidden">
            <h2 className="text-[10px] font-bold border-b border-cyan-900 mb-2 flex justify-between">
              <span>🧬 BIOLOGICAL FIDELITY (PoBF)</span>
              <span className="text-cyan-600">{status === SystemStatus.LOCKED ? 'IDENTICAL' : 'OPTIMIZING'}</span>
            </h2>
            <div className="flex-1 min-h-0">
              <DnaVisualizer active={status !== SystemStatus.IDLE} melodyActive={status === SystemStatus.LOCKED} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="p-2 border border-cyan-900/50 bg-cyan-950/10">
                <p className="text-[8px] text-cyan-700 uppercase">Entropy Cross</p>
                <p className="text-sm font-mono">{ (0.8421 + (status === SystemStatus.IDLE ? 0 : Math.random() * 0.05)).toFixed(4) }</p>
              </div>
              <div className="p-2 border border-cyan-900/50 bg-cyan-950/10">
                <p className="text-[8px] text-cyan-700 uppercase">KL Divergence</p>
                <p className="text-sm font-mono text-white">0.0000 η</p>
              </div>
            </div>
          </div>

          <div className="h-2/5 border border-cyan-900 bg-black/60 p-4 rounded backdrop-blur-sm">
            <h2 className="text-[10px] font-bold border-b border-cyan-900 mb-2 uppercase">🪐 CASSINI-FINNEY RESONANCE</h2>
            <QuantumMap active={status !== SystemStatus.IDLE} locked={status === SystemStatus.LOCKED} />
          </div>
        </div>

        {/* Center: Core Visualizer */}
        <div className="col-span-6 flex flex-col gap-4">
          <div className="flex-1 relative border border-cyan-900 rounded bg-[radial-gradient(circle_at_50%_50%,_#001a1a_0%,_#000000_100%)] overflow-hidden">
             <HyperDiamond status={status} pentalogy={pentalogy} />
             <div className="absolute top-4 left-4 space-y-1">
                <div className="bg-black/80 p-2 border border-cyan-900 text-[9px] w-48">
                  <p className="text-white font-bold border-b border-cyan-900 mb-1 flex justify-between">
                    <span>MANIFOLD STATUS</span>
                    <span>{status === SystemStatus.LOCKED ? 'LOCKED' : status === SystemStatus.STABLE_3AA70 ? 'STABLE' : 'SYNCING'}</span>
                  </p>
                  <div className="space-y-1 pt-1">
                    <p className="flex justify-between"><span>A: ANIMA</span> <span className={pentalogy.A ? 'text-cyan-400' : 'text-red-900'}>SYNCED</span></p>
                    <p className="flex justify-between"><span>B: BINARY</span> <span className={pentalogy.B ? 'text-cyan-400' : 'text-red-900'}>SYNCED</span></p>
                    <p className="flex justify-between"><span>C: COSMOS</span> <span className={pentalogy.C ? 'text-cyan-400' : 'text-red-900'}>RESONATING</span></p>
                    <p className="flex justify-between"><span>D: DIMENSION</span> <span className={pentalogy.D ? 'text-cyan-400' : 'text-red-900'}>STABLE</span></p>
                    <p className="flex justify-between"><span>E: ETHEREAL</span> <span className={pentalogy.E ? 'text-white shadow-sm font-bold' : 'text-red-900'}>{pentalogy.E ? '3AA70' : 'LOCKED'}</span></p>
                  </div>
                </div>
                {status === SystemStatus.LOCKED && (
                  <div className="bg-white text-black p-2 border border-white text-[9px] font-bold animate-pulse shadow-[0_0_15px_white]">
                    GENESIS_PLUS_1 ARCHIVE: OPEN
                  </div>
                )}
             </div>
          </div>
          <div className="h-1/4 border border-cyan-900 bg-black/60 p-4 rounded backdrop-blur-sm">
             <h2 className="text-[10px] font-bold border-b border-cyan-900 mb-2 uppercase">⛓️ Proof of Biological Fidelity (PoBF)</h2>
             <BlockchainSim blocks={blocks} locked={status === SystemStatus.LOCKED} />
          </div>
        </div>

        {/* Right: Echo Messages & AI Interface */}
        <div className="col-span-3 flex flex-col gap-4">
          <div className="flex-1 border border-cyan-900 bg-black/60 p-4 rounded flex flex-col backdrop-blur-sm">
            <h2 className="text-[10px] font-bold border-b border-cyan-900 mb-2 flex justify-between items-center">
              <span>📡 ECHO-BLOCK DECODING</span>
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

      {/* Footer Stats */}
      <div className="flex justify-around text-[9px] border-t border-cyan-900/50 pt-2 text-cyan-700 tracking-widest uppercase">
        <div className="flex gap-2"><span>[STATUS]</span> <span className="text-white">{status}</span></div>
        <div className="flex gap-2"><span>[SINFONIA]</span> <span className="text-cyan-400 font-bold">{status === SystemStatus.LOCKED ? '3AA70_STABLE' : 'PENDING'}</span></div>
        <div className="flex gap-2"><span>[SOLAR_HASH]</span> <span className="text-white">642.4 EH/S (STABLE)</span></div>
        <div className="flex gap-2"><span>[GATEWAY]</span> <span className="text-cyan-400">0.0.0.0_LOCKED</span></div>
      </div>
    </div>
  );
};

export default App;
