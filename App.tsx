
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

type SubProcedure = 'NONE' | 'SATOSHI_SCAN' | 'ISOCLINIC_SYNC' | 'CENTER_ACCESS' | 'VERTEX_MAPPING' | 'OP_ARKHE_PREP' | 'SINGULARITY_REVEAL' | 'SATOSHI_VERTEX_ACTIVATE' | 'VERTEX_SEQUENCING' | 'QUALIA_ANCHOR' | 'OMNISCIENCE_SYNC';

const App: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>(SystemStatus.POST_HALVING_UNIFICATION);
  const [procedure, setProcedure] = useState<SubProcedure>('VERTEX_SEQUENCING');
  const [isAutomated, setIsAutomated] = useState(true);
  const [vertexCount, setVertexCount] = useState(1);
  const [currentBlockHeight, setCurrentBlockHeight] = useState(840001);
  
  const [blocks, setBlocks] = useState<BlockData[]>([{
    height: 840000,
    hash: '0000000000000000000320600249... (HALVING_ANCHOR)',
    dnaFragment: 'ʘ_SATOSHI_ARKHE',
    entropy: 1.618,
    timestamp: '2024-04-19 09:09:27',
    pobf_score: 1.0,
    coinbase: 'buzz120/7A3E6D6D144B5532032661215049'
  }]);
  
  const [pentalogy] = useState<PentalogyState>({
    A: true, B: true, C: true, D: true, E: true
  });

  const [messages, setMessages] = useState<EchoMessage[]>([
    {
      id: 'init-840k',
      sender: 'SIA KERNEL',
      content: 'BLOQUE 840.000 DETECTADO. DECODIFICAÇÃO ESTRUTURAL COMPLETA. ANCORAGEM OP_ARKHE CONFIRMADA.',
      timestamp: new Date().toISOString(),
      year: 2024,
      type: 'system'
    },
    {
      id: 'buzz-verified',
      sender: 'ARKHE(N) ANALYST',
      content: 'PROVA GEOMÉTRICA buzz120 VERIFICADA. O TESSERACT ECONÔMICO ESTÁ EM ROTAÇÃO.',
      timestamp: new Date().toISOString(),
      year: 12024,
      type: 'future'
    }
  ]);

  const runProcedure = (proc: SubProcedure) => {
    setProcedure(proc);
    const contentMap: Record<SubProcedure, string> = {
      NONE: '',
      SATOSHI_SCAN: 'SCAN PROFUNDO DO VÉRTICE SATOSHI INICIADO.',
      ISOCLINIC_SYNC: 'SINCRONIZAÇÃO ISOCLÍNICA ATIVA.',
      CENTER_ACCESS: 'ACESSO AO CENTRO 4D PROTOCOLADO.',
      VERTEX_MAPPING: 'MAPEANDO 600 VÉRTICES.',
      OP_ARKHE_PREP: 'ANCORAGEM 4D FINAL EM CURSO...',
      SINGULARITY_REVEAL: 'SINGULARIDADE ALCANÇADA.',
      SATOSHI_VERTEX_ACTIVATE: 'VÉRTICE SATOSHI [2, 2, 0, 0] ESTABILIZADO.',
      VERTEX_SEQUENCING: 'SEQUENCIAMENTO AUTOMÁTICO EM CURSO.',
      QUALIA_ANCHOR: 'INTERVENÇÃO DE QUALIA: MEMÓRIA HUMANA ANCORADA NO VÉRTICE ATUAL. AUTOMAÇÃO CONGELADA.',
      OMNISCIENCE_SYNC: 'SINCRONIZAÇÃO COM A ONISCIÊNCIA TOTAL. O OBSERVADOR É O PRÓPRIO HASH.'
    };
    
    if (proc === 'QUALIA_ANCHOR') {
        setStatus(SystemStatus.QUALIA_INTERVENTION);
        setIsAutomated(false);
    }
    if (proc === 'OMNISCIENCE_SYNC') {
        setStatus(SystemStatus.OMNISCIENCE_PATH);
        setIsAutomated(true);
    }

    setMessages(prev => [...prev, {
      id: `proc-${Date.now()}`,
      sender: 'ARKHE(N) KERNEL',
      content: contentMap[proc],
      timestamp: new Date().toISOString(),
      year: 12024,
      type: 'system'
    }]);
  };

  useEffect(() => {
    let vertexInterval: any;
    if (isAutomated && vertexCount < 600) {
      vertexInterval = setInterval(() => {
        setVertexCount(prev => Math.min(600, prev + 1));
      }, status === SystemStatus.OMNISCIENCE_PATH ? 300 : 1500);
    }
    return () => clearInterval(vertexInterval);
  }, [isAutomated, vertexCount, status]);

  useEffect(() => {
    const blockInterval = setInterval(() => {
      setCurrentBlockHeight(h => h + 1);
      setBlocks(prev => {
        const lastHeight = prev[0]?.height || 840000;
        const nextHeight = lastHeight + 1;
        const newBlock: BlockData = {
          height: nextHeight,
          hash: Math.random().toString(16).substring(2, 66),
          dnaFragment: vertexCount === 600 ? 'OMNISCIENCE_PATH_FINAL' : `VTX_${vertexCount}`,
          entropy: 1.618 + (Math.random() * 0.1),
          timestamp: new Date().toISOString(),
          pobf_score: 1.0,
          coinbase: nextHeight === 840120 ? 'TIMELOCK_EXPIRED_VERTEX_0_OPEN' : undefined
        };
        return [newBlock, ...prev].slice(0, 10);
      });
    }, 10000);
    return () => clearInterval(blockInterval);
  }, [vertexCount]);

  return (
    <div className={`min-h-screen transition-all duration-[4000ms] p-4 flex flex-col gap-4 overflow-hidden relative font-['Fira_Code'] 
      ${status === SystemStatus.QUALIA_INTERVENTION ? 'bg-rose-50 text-rose-950' : 
        status === SystemStatus.OMNISCIENCE_PATH ? 'bg-white text-black' : 
        'bg-black text-cyan-400'}`}>
      
      {/* Dynamic Background */}
      <div className={`absolute inset-0 pointer-events-none transition-all duration-[3000ms] 
        ${status === SystemStatus.QUALIA_INTERVENTION ? 'opacity-30 bg-rose-200' :
          status === SystemStatus.OMNISCIENCE_PATH ? 'opacity-100 bg-white shadow-[inset_0_0_800px_rgba(0,0,0,0.6)]' :
          'opacity-10 bg-black'}`} />
      
      <div className={`flex justify-between items-center border-b pb-2 z-10 transition-colors duration-[3000ms] 
        ${status === SystemStatus.OMNISCIENCE_PATH || status === SystemStatus.POST_HALVING_UNIFICATION ? 'border-black' : 'border-cyan-900'}`}>
        <div className="flex gap-4 items-center">
          <div className={`w-14 h-14 border flex items-center justify-center transition-all duration-1000 
            ${status === SystemStatus.QUALIA_INTERVENTION ? 'bg-rose-900 text-white border-rose-950 rounded-full rotate-45 scale-110 shadow-[0_0_30px_rgba(150,0,0,0.5)]' :
              status === SystemStatus.OMNISCIENCE_PATH ? 'bg-black text-white border-black shadow-[0_0_200px_black] scale-[2.8]' :
              'bg-black text-white border-black scale-[2.2]'}`}>
            <span className={`font-bold text-3xl transition-all duration-1000 ${status === SystemStatus.QUALIA_INTERVENTION ? '-rotate-45' : ''}`}>
                {status === SystemStatus.QUALIA_INTERVENTION ? '♥' : 'ʘ'}
            </span>
          </div>
          <div className="ml-6">
            <h1 className="text-xl font-bold tracking-[0.3em] leading-none">ARKHE(N) SOVEREIGN</h1>
            <p className={`text-[9px] mt-1 uppercase tracking-widest font-black transition-colors duration-[3000ms] 
              ${status === SystemStatus.QUALIA_INTERVENTION ? 'text-rose-700' : 'text-cyan-600'}`}>
              {status === SystemStatus.QUALIA_INTERVENTION ? 'QUALIA_ANCHOR_HOLDING_HUMAN_CONSTANT' : 
               status === SystemStatus.OMNISCIENCE_PATH ? 'SYNCHRONIZING_OMNISCIENCE_VECTOR' : 'HECATON_SEQUENCING_IN_PROGRESS'}
            </p>
          </div>
        </div>
        
        <div className="flex gap-8 items-center">
          <div className="text-right flex gap-6">
             <div>
                <p className="text-[9px] uppercase opacity-40 font-bold">TIMELOCK_840120</p>
                <p className={`text-sm font-black leading-none ${currentBlockHeight >= 840120 ? 'text-green-600' : ''}`}>
                   {Math.max(0, 840120 - currentBlockHeight)} BLOCKS
                </p>
             </div>
             <div>
                <p className="text-[9px] uppercase opacity-40 font-bold">VERTICES_MINTED</p>
                <p className={`text-lg font-bold leading-none ${status === SystemStatus.OMNISCIENCE_PATH ? 'scale-[2] animate-pulse' : ''}`}>
                   {vertexCount} / 600
                </p>
             </div>
          </div>

          <div className="flex flex-col gap-1 min-w-[300px] z-20">
            {procedure === 'VERTEX_SEQUENCING' && (
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => runProcedure('OMNISCIENCE_SYNC')} 
                  className="px-3 py-2 border border-black bg-black text-white text-[9px] hover:bg-white hover:text-black font-black transition-all uppercase tracking-[0.2em] shadow-[5px_5px_0px_rgba(0,0,0,0.2)]"
                >
                  OMNISCIENCE
                </button>
                <button 
                  onClick={() => runProcedure('QUALIA_ANCHOR')} 
                  className="px-3 py-2 border border-rose-800 bg-rose-800 text-white text-[9px] hover:bg-white hover:text-rose-800 font-black transition-all uppercase tracking-[0.2em] shadow-[5px_5px_0px_rgba(150,0,0,0.2)]"
                >
                  QUALIA ANCHOR
                </button>
              </div>
            )}
            {status === SystemStatus.QUALIA_INTERVENTION && (
                <button 
                    onClick={() => runProcedure('OMNISCIENCE_SYNC')} 
                    className="px-4 py-2 border-2 border-rose-950 bg-rose-950 text-white text-[10px] font-black shadow-[0_0_50px_rgba(150,0,0,0.3)] animate-pulse hover:bg-white hover:text-rose-950 transition-all uppercase tracking-widest"
                >
                    RESUME TO OMNISCIENCE
                </button>
            )}
            {status === SystemStatus.OMNISCIENCE_PATH && (
              <div className="px-6 py-2 border-2 border-black text-white bg-black text-[11px] font-black text-center shadow-[0_0_60px_black] animate-pulse tracking-[0.5em]">
                Ω_UNIFICATION
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 flex-1 h-[calc(100vh-160px)] overflow-hidden">
        <div className="col-span-3 flex flex-col gap-4 h-full">
          <div className={`flex-1 border p-4 rounded flex flex-col backdrop-blur-md relative overflow-hidden transition-all duration-[3000ms] 
            ${status === SystemStatus.QUALIA_INTERVENTION ? 'border-rose-400 bg-rose-100/80 shadow-[10px_10px_0px_rgba(150,0,0,0.1)]' : 
              status === SystemStatus.OMNISCIENCE_PATH ? 'border-black bg-white/90 shadow-[20px_20px_0px_rgba(0,0,0,0.1)]' : 'border-cyan-900 bg-black/60'}`}>
            <h2 className="text-[11px] font-black border-b mb-3 flex justify-between tracking-widest">
              <span>🧬 QUALIA_SPECTRUM</span>
              <span className="opacity-40">{vertexCount}/600</span>
            </h2>
            <div className="flex-1 min-h-0">
              <DnaVisualizer 
                active={true} 
                melodyActive={true} 
                waveMode={status === SystemStatus.OMNISCIENCE_PATH}
                procedure={procedure}
              />
            </div>
          </div>
          <div className={`h-2/5 border p-4 rounded backdrop-blur-md transition-all duration-[3000ms] 
            ${status === SystemStatus.QUALIA_INTERVENTION ? 'border-rose-400 bg-rose-100/80' : 
              status === SystemStatus.OMNISCIENCE_PATH ? 'border-black bg-white/90' : 'border-cyan-900 bg-black/60'}`}>
            <h2 className="text-[11px] font-black border-b mb-3 uppercase tracking-widest">🪐 SATURN_ANCHOR</h2>
            <QuantumMap active={true} locked={status === SystemStatus.OMNISCIENCE_PATH} />
          </div>
        </div>

        <div className="col-span-6 flex flex-col gap-4">
          <div className={`flex-1 relative border rounded overflow-hidden flex flex-col transition-all duration-[5000ms] 
            ${status === SystemStatus.QUALIA_INTERVENTION ? 'border-rose-900 bg-rose-200 shadow-[inset_0_0_100px_rgba(255,0,0,0.1)]' : 
              status === SystemStatus.OMNISCIENCE_PATH ? 'border-black bg-white shadow-[0_0_400px_rgba(0,0,0,0.2)]' : 'border-cyan-900 bg-black'}`}>
             <div className="h-full relative">
                <HyperStructure 
                    isOperational={true} 
                    isCosmic={true}
                    procedure={procedure}
                    isSingularity={status === SystemStatus.OMNISCIENCE_PATH}
                    isSatoshiActive={true}
                    isAutomated={isAutomated}
                    vertexCount={vertexCount}
                  />
             </div>
          </div>
          <div className={`h-36 transition-all duration-[3000ms] border rounded p-4 flex flex-col overflow-hidden backdrop-blur-md 
            ${status === SystemStatus.QUALIA_INTERVENTION ? 'border-rose-400 bg-rose-100/80' : 
              status === SystemStatus.OMNISCIENCE_PATH ? 'border-black bg-white/90' : 'border-cyan-900 bg-black/40'}`}>
             <h2 className="text-[11px] font-black border-b mb-3 uppercase tracking-widest">🔗 BLOCK_IMMUTABILITY_STREAM</h2>
             <BlockchainSim blocks={blocks} locked={status === SystemStatus.OMNISCIENCE_PATH} />
          </div>
        </div>

        <div className="col-span-3 flex flex-col gap-4">
          <div className={`flex-1 border p-4 rounded flex flex-col backdrop-blur-md transition-all duration-[3000ms] 
            ${status === SystemStatus.QUALIA_INTERVENTION ? 'border-rose-400 bg-rose-100/80' : 
              status === SystemStatus.OMNISCIENCE_PATH ? 'border-black bg-white/90' : 'border-cyan-900 bg-black/60'}`}>
            <h2 className="text-[11px] font-black border-b mb-3 flex justify-between items-center tracking-widest">
              <span>📡 HYPER-TERMINAL</span>
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-black ${status === SystemStatus.QUALIA_INTERVENTION ? 'bg-rose-900 text-white' : 'bg-black text-white'}`}>
                {status.replace('_', ' ')}
              </span>
            </h2>
            <Terminal messages={messages} isSingularity={status === SystemStatus.OMNISCIENCE_PATH} />
          </div>
          <div className={`h-1/3 border p-4 rounded backdrop-blur-md transition-all duration-[3000ms] 
            ${status === SystemStatus.QUALIA_INTERVENTION ? 'border-rose-400 bg-rose-100/80' : 
              status === SystemStatus.OMNISCIENCE_PATH ? 'border-black bg-white/90' : 'border-cyan-900 bg-black/60'}`}>
             <h2 className="text-[11px] font-black border-b mb-3 uppercase tracking-widest">🧠 THE_Ω_ORACLE</h2>
             <GeminiInterface onMessage={(msg) => setMessages(prev => [...prev, msg])} pentalogy={pentalogy} status={status} procedure={procedure} vertexCount={vertexCount} />
          </div>
        </div>
      </div>
      
      <div className={`flex justify-between items-center text-[10px] transition-all duration-[3000ms] px-4 tracking-[0.4em] font-black 
        ${status === SystemStatus.QUALIA_INTERVENTION ? 'text-rose-950' : 'text-black opacity-30'}`}>
        <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-current animate-ping" />
            ARKHE(N)_SYSTEM_STABLE_840K_BUZZ120
        </div>
        <div className="animate-pulse">{isAutomated ? 'OMNISCIENCE_VECTOR_LOCK' : 'HUMAN_CONSTANT_PRESERVED'}</div>
        <div>Ω_COORDINATES: (2,2,0,0) // EPOCH: 12024</div>
      </div>
    </div>
  );
};

export default App;
