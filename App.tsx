
import React, { useState, useEffect, useCallback } from 'react';
import { SystemStatus, BlockData, EchoMessage } from './types';
import Terminal from './components/Terminal';
import DnaVisualizer from './components/DnaVisualizer';
import BlockchainSim from './components/BlockchainSim';
import QuantumMap from './components/QuantumMap';
import HyperDiamond from './components/HyperDiamond';
import GeminiInterface from './components/GeminiInterface';

const App: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>(SystemStatus.IDLE);
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [entropy, setEntropy] = useState<number>(0.84);
  const [phiRes, setPhiRes] = useState<number>(0.999);
  const [messages, setMessages] = useState<EchoMessage[]>([
    {
      id: '1',
      sender: 'Node 0 (Finney)',
      content: 'I am seeing the sun, but it is no longer just a star. It is the heart of our hashrate.',
      timestamp: '12024-04-12',
      year: 12024
    }
  ]);

  const startSimulation = () => {
    setStatus(SystemStatus.FRAGMENTING);
    // Simulate mining/fragmentation loop
  };

  useEffect(() => {
    let interval: any;
    if (status === SystemStatus.FRAGMENTING) {
      interval = setInterval(() => {
        setBlocks(prev => {
          const newBlock: BlockData = {
            height: prev.length > 0 ? prev[0].height + 1 : 840000,
            hash: Math.random().toString(16).substring(2, 66),
            dnaFragment: 'ATCG'.split('').sort(() => 0.5 - Math.random()).join('') + '...',
            entropy: 0.8 + Math.random() * 0.1,
            timestamp: new Date().toISOString()
          };
          return [newBlock, ...prev].slice(0, 10);
        });
        setEntropy(0.8 + Math.random() * 0.1);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [status]);

  return (
    <div className="min-h-screen bg-black text-cyan-400 p-4 flex flex-col gap-4 overflow-hidden relative">
      {/* HUD Background Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,255,255,0.1),_transparent)]" />
      
      {/* Top Header */}
      <div className="flex justify-between items-center border-b border-cyan-900 pb-2 z-10">
        <div>
          <h1 className="text-2xl font-bold tracking-widest text-white">ARKHE(N) CONTROL CENTER v12.024</h1>
          <p className="text-xs text-cyan-600">PROTOCOL: QUANTUM SARCOPHAGUS | NODE: 0 (FINNEY)</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="text-right">
            <p className="text-xs text-cyan-600">SYSTEM FIDELITY (ΦRes)</p>
            <p className="text-lg font-bold">{(phiRes * 100).toFixed(3)}%</p>
          </div>
          <button 
            onClick={startSimulation}
            className={`px-6 py-2 border ${status === SystemStatus.IDLE ? 'border-cyan-400 hover:bg-cyan-900' : 'border-red-600 text-red-600'} transition-all font-bold`}
          >
            {status === SystemStatus.IDLE ? 'AUTHORIZE FRAGMENTATION' : 'SYSTEM BUSY'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 flex-1 h-[calc(100vh-120px)] overflow-hidden">
        {/* Left Column: DNA & Simulation */}
        <div className="col-span-3 flex flex-col gap-4">
          <div className="flex-1 border border-cyan-900 bg-black/40 p-4 rounded-lg flex flex-col">
            <h2 className="text-sm font-bold border-b border-cyan-900 mb-2">🧬 GENOME FRAGMENTATION</h2>
            <div className="flex-1 overflow-hidden">
              <DnaVisualizer active={status === SystemStatus.FRAGMENTING} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-2 border border-cyan-900">
                <p className="text-cyan-700 uppercase">Current Entropy</p>
                <p className="text-lg">{entropy.toFixed(4)}</p>
              </div>
              <div className="p-2 border border-cyan-900">
                <p className="text-cyan-700 uppercase">OP_RETURN Load</p>
                <p className="text-lg">40 Bytes/tx</p>
              </div>
            </div>
          </div>

          <div className="h-1/3 border border-cyan-900 bg-black/40 p-4 rounded-lg overflow-hidden">
            <h2 className="text-sm font-bold border-b border-cyan-900 mb-2">🪐 SATURN PULSE</h2>
            <QuantumMap />
          </div>
        </div>

        {/* Center Column: Core Visualizer */}
        <div className="col-span-6 flex flex-col gap-4">
          <div className="flex-1 relative border border-cyan-900 rounded-lg overflow-hidden bg-black">
             <HyperDiamond status={status} />
             <div className="absolute top-4 left-4 bg-black/60 p-2 border border-cyan-900 text-[10px]">
                <p>BASE 1: HUMANA (UNIFIED)</p>
                <p>BASE 2: SIA (NEURAL)</p>
                <p>BASE 3: QUANTUM (COLLAPSED)</p>
             </div>
          </div>
          <div className="h-1/4 border border-cyan-900 bg-black/40 p-4 rounded-lg">
             <h2 className="text-sm font-bold border-b border-cyan-900 mb-2">⛓️ BLOCKCHAIN PROPAGATION</h2>
             <BlockchainSim blocks={blocks} />
          </div>
        </div>

        {/* Right Column: Terminal & AI */}
        <div className="col-span-3 flex flex-col gap-4">
          <div className="flex-1 border border-cyan-900 bg-black/40 p-4 rounded-lg overflow-hidden flex flex-col">
            <h2 className="text-sm font-bold border-b border-cyan-900 mb-2">📡 ECHO-BLOCK DECODING</h2>
            <Terminal messages={messages} />
          </div>
          <div className="h-1/3 border border-cyan-900 bg-black/40 p-4 rounded-lg">
             <h2 className="text-sm font-bold border-b border-cyan-900 mb-2">🧠 SIA INTERFACE</h2>
             <GeminiInterface onMessage={(msg) => setMessages(prev => [...prev, msg])} />
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="flex justify-around text-[10px] border-t border-cyan-900 pt-2 text-cyan-700">
        <div>STATUS: {status}</div>
        <div>BLOCK: {blocks[0]?.height || 'WAITING'}</div>
        <div>HASH RATE: 642.4 EH/s</div>
        <div>GATEWAY: 0.0.0.0 (OPEN)</div>
        <div>LOCATION: TITAN / SATURN RING B</div>
      </div>
    </div>
  );
};

export default App;
