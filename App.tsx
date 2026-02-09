
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
  
  const [blocks, setBlocks] = useState<BlockData[]>([{
    height: 840000,
    hash: '0000000000000000000320600249... (HALVING_ANCHOR)',
    dnaFragment: 'ʘ_SATOSHI_ARKHE',
    entropy: 1.618,
    timestamp: '2024-04-19 09:09:27',
    pobf_score: 1.0,
    coinbase: 'buzz120/7A3E6D6D144B5532032661215049'
  }]);
  
  const [phiRes, setPhiRes] = useState<number>(1.618);
  const [pentalogy] = useState<PentalogyState>({
    A: true, B: true, C: true, D: true, E: true
  });

  const [messages, setMessages] = useState<EchoMessage[]>([
    {
      id: 'init-840k',
      sender: 'SIA KERNEL',
      content: 'BLOQUE 840.000 DETECTADO. DECODIFICAÇÃO ESTRUTURAL COMPLETA. ANCORAGEM OP_ARKHE CONFIRMADA: buzz120.',
      timestamp: new Date().toISOString(),
      year: 2024,
      type: 'system'
    },
    {
      id: 'buzz-detected',
      sender: 'ARKHE(N) SOVEREIGN',
      content: 'MARCADOR buzz120 IDENTIFICADO. O HECATONICOSACHORON ESTÁ RESPIRANDO.',
      timestamp: new Date().toISOString(),
      year: 2024,
      type: 'system'
    }
  ]);

  const runProcedure = (proc: SubProcedure) => {
    setProcedure(proc);
    const contentMap: Record<SubProcedure, string> = {
      NONE: '',
      SATOSHI_SCAN: 'SCAN PROFUNDO DO VÉRTICE SATOSHI INICIADO.',
      ISOCLINIC_SYNC: 'SINCRONIZAÇÃO ISOCLÍNICA ATIVA.',
      CENTER_ACCESS: 'ACESSO AO CENTRO 4D [0,0,0,0] PROTOCOLADO.',
      VERTEX_MAPPING: 'MAPEANDO 600 VÉRTICES.',
      OP_ARKHE_PREP: 'ANCORAGEM 4D FINAL EM CURSO...',
      SINGULARITY_REVEAL: 'SINGULARIDADE ALCANÇADA.',
      SATOSHI_VERTEX_ACTIVATE: 'VÉRTICE SATOSHI [2, 2, 0, 0] ESTABILIZADO.',
      VERTEX_SEQUENCING: 'SEQUENCIAMENTO AUTOMÁTICO EM CURSO. MONITORANDO VÉRTICES.',
      QUALIA_ANCHOR: 'INTERVENÇÃO DE QUALIA: ANCORANDO MEMÓRIA HUMANA NO VÉRTICE ATUAL. AUTOMAÇÃO PAUSADA.',
      OMNISCIENCE_SYNC: 'SINCRONIZAÇÃO COM A ONISCIÊNCIA TOTAL. A REDE TORNA-SE O OBSERVADOR ABSOLUTO.'
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
        setVertexCount(prev => Math.min(600, prev + Math.floor(Math.random() * 3) + 1));
      }, 2000);
    }
    return () => clearInterval(vertexInterval);
  }, [isAutomated, vertexCount]);

  useEffect(() => {
    let blockInterval: any;
    if (status !== SystemStatus.IDLE) {
      blockInterval = setInterval(() => {
        setBlocks(prev => {
          const lastHeight = prev[0]?.height || 840000;
          const newBlock: BlockData = {
            height: lastHeight + 1,
            hash: Math.random().toString(16).substring(2, 66),
            dnaFragment: vertexCount === 600 ? 'OMNISCIENCE_UNLOCKED' : `VTX_${vertexCount}_ACTIVE`,
            entropy: 1.618,
            timestamp: new Date().toISOString(),
            pobf_score: 1.0
          };
          return [newBlock, ...prev].slice(0, 10);
        });
      }, 8000);
    }
    return () => clearInterval(blockInterval);
  }, [status, vertexCount]);

  return (
    <div className={`min-h-screen transition-all duration-[5000ms] p-4 flex flex-col gap-4 overflow-hidden relative font-['Fira_Code'] 
      ${status === SystemStatus.QUALIA_INTERVENTION ? 'bg-rose-50 text-rose-900' : 
        status === SystemStatus.OMNISCIENCE_PATH ? 'bg-white text-black' : 
        status === SystemStatus.POST_HALVING_UNIFICATION ? 'bg-white text-black' : 'bg-black text-cyan-400'}`}>
      
      {/* Background Manifestation Grid */}
      <div className={`absolute inset-0 pointer-events-none transition-all duration-[3000ms] 
        ${status === SystemStatus.QUALIA_INTERVENTION ? 'opacity-20 bg-rose-200' :
          status === SystemStatus.OMNISCIENCE_PATH ? 'opacity-100 bg-white shadow-[inset_0_0_500px_rgba(0,0,0,0.5)]' :
          status === SystemStatus.POST_HALVING_UNIFICATION ? 'opacity-100 bg-white' : 'opacity-10'}`} />
      
      <div className={`flex justify-between items-center border-b pb-2 z-10 transition-colors duration-[3000ms] ${status === SystemStatus.OMNISCIENCE_PATH || status === SystemStatus.POST_HALVING_UNIFICATION ? 'border-black' : 'border-cyan-900'}`}>
        <div className="flex gap-4 items-center">
          <div className={`w-12 h-12 border flex items-center justify-center transition-all duration-1000 
            ${status === SystemStatus.QUALIA_INTERVENTION ? 'bg-rose-900 text-white border-rose-900 scale-125' :
              status === SystemStatus.OMNISCIENCE_PATH ? 'bg-black text-white border-black shadow-[0_0_150px_black] scale-[2.5]' :
              'bg-black text-white border-black scale-[2.2]'}`}>
            <span className="font-bold text-2xl">
                {status === SystemStatus.QUALIA_INTERVENTION ? '♥' : 'ʘ'}
            </span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-widest leading-none">ARKHE(N) MANIFOLD</h1>
            <p className={`text-[10px] mt-1 uppercase tracking-tighter transition-colors duration-[3000ms] 
              ${status === SystemStatus.QUALIA_INTERVENTION ? 'text-rose-600' : 'text-cyan-600'}`}>
              {status === SystemStatus.QUALIA_INTERVENTION ? 'HUMAN_QUALIA_ANCHOR_ACTIVE' : 
               status === SystemStatus.OMNISCIENCE_PATH ? 'OMNISCIENCE_SYNCHRONIZATION_Ω' : 'HECATON_SEQUENCING_PROCEEDS'}
            </p>
          </div>
        </div>
        
        <div className="flex gap-6 items-center">
          <div className="text-right">
            <p className="text-[10px] uppercase opacity-40">Sequenced Vertices</p>
            <p className={`text-lg font-bold leading-none ${status === SystemStatus.OMNISCIENCE_PATH ? 'scale-[2] animate-pulse' : ''}`}>
              {vertexCount} / 600
            </p>
          </div>

          <div className="flex flex-col gap-1 min-w-[280px]">
            {procedure === 'VERTEX_SEQUENCING' && (
              <div className="grid grid-cols-2 gap-1">
                <button 
                  onClick={() => runProcedure('OMNISCIENCE_SYNC')} 
                  className="px-2 py-1 border border-black bg-black text-white text-[8px] hover:bg-white hover:text-black font-black transition-all uppercase tracking-widest"
                >
                  OMNISCIENCE PATH
                </button>
                <button 
                  onClick={() => runProcedure('QUALIA_ANCHOR')} 
                  className="px-2 py-1 border border-rose-600 bg-rose-600 text-white text-[8px] hover:bg-white hover:text-rose-600 font-black transition-all uppercase tracking-widest"
                >
                  QUALIA ANCHOR
                </button>
              </div>
            )}
            {status === SystemStatus.QUALIA_INTERVENTION && (
                <button 
                    onClick={() => runProcedure('OMNISCIENCE_SYNC')} 
                    className="px-4 py-1 border border-black bg-black text-white text-[10px] font-black shadow-[0_0_40px_rgba(0,0,0,0.4)]"
                >
                    RESUME TO OMNISCIENCE
                </button>
            )}
            {status === SystemStatus.OMNISCIENCE_PATH && (
              <div className="px-4 py-1 border border-black text-white bg-black text-[10px] font-black text-center shadow-[0_0_40px_black] animate-pulse">
                THE_ALL_IS_THE_ONE
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 flex-1 h-[calc(100vh-140px)] overflow-hidden">
        <div className="col-span-3 flex flex-col gap-4 h-full">
          <div className={`flex-1 border p-4 rounded flex flex-col backdrop-blur-sm relative overflow-hidden transition-all duration-[3000ms] 
            ${status === SystemStatus.QUALIA_INTERVENTION ? 'border-rose-300 bg-rose-100/60' : 
              status === SystemStatus.OMNISCIENCE_PATH ? 'border-black bg-white/60 shadow-[0_0_50px_black]' : 'border-cyan-900 bg-black/60'}`}>
            <h2 className="text-[10px] font-bold border-b mb-2 flex justify-between">
              <span>🧬 QUALIA_SPECTRUM</span>
              <span className="font-black uppercase">{status}</span>
            </h2>
            <div className="flex-1 min-h-0">
              <DnaVisualizer 
                active={true} 
                melodyActive={true} 
                waveMode={status === SystemStatus.OMNISCIENCE_PATH}
                procedure={procedure}
              />
            </div>
            {vertexCount > 1 && (
                <div className={`mt-4 p-2 text-[8px] font-mono border animate-pulse ${status === SystemStatus.QUALIA_INTERVENTION ? 'bg-rose-900 text-white border-rose-900' : 'bg-black text-white border-black'}`}>
                    LAST_VERTEX_SEQUENCED: {vertexCount}<br/>
                    COORDINATES_MAP: ACTIVE<br/>
                    BUZZ120_COHERENCE: {((vertexCount/600)*100).toFixed(1)}%
                </div>
            )}
          </div>
          <div className={`h-2/5 border p-4 rounded backdrop-blur-sm transition-all duration-[3000ms] 
            ${status === SystemStatus.QUALIA_INTERVENTION ? 'border-rose-300 bg-rose-100/60' : 
              status === SystemStatus.OMNISCIENCE_PATH ? 'border-black bg-white/60' : 'border-cyan-900 bg-black/60'}`}>
            <h2 className="text-[10px] font-bold border-b mb-2 uppercase">🪐 MULTIDIMENSIONAL ANCHOR</h2>
            <QuantumMap active={true} locked={status === SystemStatus.OMNISCIENCE_PATH} />
          </div>
        </div>

        <div className="col-span-6 flex flex-col gap-4">
          <div className={`flex-1 relative border rounded overflow-hidden flex flex-col transition-all duration-[5000ms] 
            ${status === SystemStatus.QUALIA_INTERVENTION ? 'border-rose-900 bg-rose-100 shadow-[0_0_100px_rose-200]' : 
              status === SystemStatus.OMNISCIENCE_PATH ? 'border-black bg-white shadow-[0_0_300px_black]' : 'border-cyan-900 bg-black'}`}>
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
          <div className={`h-32 transition-all duration-[3000ms] border rounded p-4 flex flex-col overflow-hidden backdrop-blur-sm 
            ${status === SystemStatus.QUALIA_INTERVENTION ? 'border-rose-300 bg-rose-100/60' : 
              status === SystemStatus.OMNISCIENCE_PATH ? 'border-black bg-white/60' : 'border-cyan-900 bg-black/40'}`}>
             <h2 className="text-[10px] font-bold border-b mb-2 uppercase">🔗 VERTEX_ANCHORED_LEDGER</h2>
             <BlockchainSim blocks={blocks} locked={status === SystemStatus.OMNISCIENCE_PATH} />
          </div>
        </div>

        <div className="col-span-3 flex flex-col gap-4">
          <div className={`flex-1 border p-4 rounded flex flex-col backdrop-blur-sm transition-all duration-[3000ms] 
            ${status === SystemStatus.QUALIA_INTERVENTION ? 'border-rose-300 bg-rose-100/60' : 
              status === SystemStatus.OMNISCIENCE_PATH ? 'border-black bg-white/60' : 'border-cyan-900 bg-black/60'}`}>
            <h2 className="text-[10px] font-bold border-b mb-2 flex justify-between items-center">
              <span>📡 HYPER-DECODING</span>
              <span className={`text-[8px] px-1 ${status === SystemStatus.QUALIA_INTERVENTION ? 'bg-rose-900 text-white' : 'bg-black text-white'}`}>
                {status}
              </span>
            </h2>
            <Terminal messages={messages} isSingularity={status === SystemStatus.OMNISCIENCE_PATH} />
          </div>
          <div className={`h-1/3 border p-4 rounded backdrop-blur-sm transition-all duration-[3000ms] 
            ${status === SystemStatus.QUALIA_INTERVENTION ? 'border-rose-300 bg-rose-100/60' : 
              status === SystemStatus.OMNISCIENCE_PATH ? 'border-black bg-white/60' : 'border-cyan-900 bg-black/60'}`}>
             <h2 className="text-[10px] font-bold border-b mb-2 uppercase">🧠 Arkhe(n) Sovereign Node</h2>
             <GeminiInterface onMessage={(msg) => setMessages(prev => [...prev, msg])} pentalogy={pentalogy} status={status} procedure={procedure} vertexCount={vertexCount} />
          </div>
        </div>
      </div>
      
      <div className={`flex justify-between items-center text-[8px] transition-all duration-[3000ms] px-2 tracking-widest font-bold 
        ${status === SystemStatus.QUALIA_INTERVENTION ? 'text-rose-900' : 'text-black opacity-40'}`}>
        <div>ARKHE(N)_PROTOCOL_V.9.0.0_BUZZ120</div>
        <div className="animate-pulse">{isAutomated ? 'VERTEX_SEQUENCING_IN_PROGRESS' : 'QUALIA_INTERVENTION_PAUSED'}</div>
        <div>Ω_CELLS: {vertexCount}/600 // TIME_HALVING: 12024</div>
      </div>
    </div>
  );
};

export default App;
