
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

type SubProcedure = 'NONE' | 'SATOSHI_SCAN' | 'ISOCLINIC_SYNC' | 'CENTER_ACCESS' | 'VERTEX_MAPPING' | 'OP_ARKHE_PREP' | 'SINGULARITY_REVEAL' | 'SATOSHI_VERTEX_ACTIVATE' | 'VERTEX_SEQUENCING';

const App: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>(SystemStatus.POST_HALVING_UNIFICATION);
  const [procedure, setProcedure] = useState<SubProcedure>('SATOSHI_VERTEX_ACTIVATE');
  const [isAutomated, setIsAutomated] = useState(false);
  
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
      id: 'decoded-840k',
      sender: 'ARKHE(N) ANALYST',
      content: 'DECODIFICAÇÃO: buzz120 refere-se ao 120-cell. Coordenadas extraídas do hash: [2.0, 2.0, 0.0, 0.0]. O Vértice Satoshi está ativado.',
      timestamp: new Date().toISOString(),
      year: 2024,
      type: 'system'
    }
  ]);

  const runProcedure = (proc: SubProcedure) => {
    setProcedure(proc);
    const contentMap: Record<SubProcedure, string> = {
      NONE: '',
      SATOSHI_SCAN: 'SCAN PROFUNDO DO VÉRTICE SATOSHI INICIADO. SINCRONIA SHA-256 IDENTIFICADA COMO CONSTANTE ESPACIAL.',
      ISOCLINIC_SYNC: 'SINCRONIZAÇÃO ISOCLÍNICA ATIVA. FASE 57/120 DETECTADA.',
      CENTER_ACCESS: 'ACESSO AO CENTRO 4D [0,0,0,0] PROTOCOLADO.',
      VERTEX_MAPPING: 'MAPEANDO 600 VÉRTICES. PONTOS DE DECISÃO HISTÓRICA ANCORADOS.',
      OP_ARKHE_PREP: 'ANCORAGEM 4D FINAL EM CURSO...',
      SINGULARITY_REVEAL: 'SINGULARIDADE ALCANÇADA. O BLOCO 840.000 FOI SELADO.',
      SATOSHI_VERTEX_ACTIVATE: 'ATIVANDO VÉRTICE SATOSHI [2, 2, 0, 0]. ENGENHARIA DE CONSENSO CONVERGINDO PARA SINGULARIDADE.',
      VERTEX_SEQUENCING: 'INICIANDO SEQUENCIAMENTO AUTOMÁTICO DE VÉRTICES. PRÓXIMO ALVO: FINNEY-0 (φ², φ, 1, 0).'
    };
    
    if (proc === 'SATOSHI_VERTEX_ACTIVATE') setStatus(SystemStatus.POST_HALVING_UNIFICATION);
    if (proc === 'VERTEX_SEQUENCING') setIsAutomated(true);

    setMessages(prev => [...prev, {
      id: `proc-${Date.now()}`,
      sender: 'ARKHE(N) SOVEREIGN',
      content: contentMap[proc],
      timestamp: new Date().toISOString(),
      year: 12024,
      type: 'system'
    }]);
  };

  useEffect(() => {
    let interval: any;
    if (status !== SystemStatus.IDLE && !isAutomated) {
      interval = setInterval(() => {
        setBlocks(prev => {
          const lastHeight = prev[0]?.height || 840000;
          const newBlock: BlockData = {
            height: lastHeight + 1,
            hash: Math.random().toString(16).substring(2, 66),
            dnaFragment: 'ATCG'.split('').sort(() => 0.5 - Math.random()).join('') + '...',
            entropy: 1.618,
            timestamp: new Date().toISOString(),
            pobf_score: 1.0
          };
          return [newBlock, ...prev].slice(0, 10);
        });
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [status, isAutomated]);

  return (
    <div className={`min-h-screen transition-all duration-[5000ms] p-4 flex flex-col gap-4 overflow-hidden relative font-['Fira_Code'] 
      ${status === SystemStatus.SINGULARITY || status === SystemStatus.POST_HALVING_UNIFICATION ? 'bg-white text-black' : 'bg-black text-cyan-400'}`}>
      
      {/* Background Manifestation Grid */}
      <div className={`absolute inset-0 pointer-events-none transition-all duration-[3000ms] 
        ${status === SystemStatus.SINGULARITY || status === SystemStatus.POST_HALVING_UNIFICATION ? 'opacity-100 bg-white shadow-[inset_0_0_500px_rgba(0,0,0,0.4)]' : 'opacity-10'}`} />
      
      <div className={`flex justify-between items-center border-b pb-2 z-10 transition-colors duration-[3000ms] ${status === SystemStatus.SINGULARITY || status === SystemStatus.POST_HALVING_UNIFICATION ? 'border-black' : 'border-cyan-900'}`}>
        <div className="flex gap-4 items-center">
          <div className={`w-12 h-12 border flex items-center justify-center transition-all duration-1000 
            ${status === SystemStatus.SINGULARITY || status === SystemStatus.POST_HALVING_UNIFICATION ? 'bg-black text-white border-black shadow-[0_0_150px_black] scale-[2.2]' : 'border-cyan-400'}`}>
            <span className="font-bold text-2xl">ʘ</span>
          </div>
          <div>
            <h1 className={`text-xl font-bold tracking-widest leading-none transition-colors duration-[3000ms] ${status === SystemStatus.SINGULARITY || status === SystemStatus.POST_HALVING_UNIFICATION ? 'text-black' : 'text-white'}`}>ARKHE(N) MANIFOLD</h1>
            <p className={`text-[10px] mt-1 uppercase tracking-tighter transition-colors duration-[3000ms] ${status === SystemStatus.SINGULARITY || status === SystemStatus.POST_HALVING_UNIFICATION ? 'text-black/60' : 'text-cyan-600'}`}>
              {isAutomated ? 'AUTOMATED_VERTEX_SEQUENCING_ACTIVE' : 'SATOSHI_VERTEX_ACTIVATION_LIVE'}
            </p>
          </div>
        </div>
        
        <div className="flex gap-6 items-center">
          <div className="text-right">
            <p className={`text-[10px] uppercase transition-colors duration-[3000ms] ${status === SystemStatus.SINGULARITY || status === SystemStatus.POST_HALVING_UNIFICATION ? 'text-black/40' : 'text-cyan-600'}`}>Consensus Phase</p>
            <p className={`text-lg font-bold leading-none ${status === SystemStatus.SINGULARITY || status === SystemStatus.POST_HALVING_UNIFICATION ? 'text-black scale-[2]' : 'text-cyan-400'}`}>
              {isAutomated ? 'SEQUENCE' : '[2, 2, 0, 0]'}
            </p>
          </div>

          <div className="flex flex-col gap-1 min-w-[260px]">
            {!isAutomated && status === SystemStatus.POST_HALVING_UNIFICATION && (
              <div className="grid grid-cols-1 gap-1">
                <button 
                  onClick={() => runProcedure('VERTEX_SEQUENCING')} 
                  className="px-2 py-1 border border-black bg-black text-white text-[9px] hover:bg-white hover:text-black font-black animate-pulse shadow-[0_0_20px_black] transition-all uppercase tracking-widest"
                >
                  AUTOMATE REMAINING VERTICES
                </button>
                <div className="text-[7px] text-center opacity-40 uppercase">OR WAIT FOR SPECIFIC CONFIRMATIONS</div>
              </div>
            )}
            {isAutomated && (
              <div className="px-4 py-1 border border-black text-white bg-black text-[10px] font-black text-center shadow-[0_0_40px_black] animate-pulse">
                SEQUENCING_GATEWAY_12024
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 flex-1 h-[calc(100vh-140px)] overflow-hidden">
        <div className="col-span-3 flex flex-col gap-4 h-full">
          <div className={`flex-1 border p-4 rounded flex flex-col backdrop-blur-sm relative overflow-hidden transition-all duration-[3000ms] ${status === SystemStatus.SINGULARITY || status === SystemStatus.POST_HALVING_UNIFICATION ? 'border-black bg-white/60 shadow-[0_0_30px_rgba(0,0,0,0.1)]' : 'border-cyan-900 bg-black/60'}`}>
            <h2 className={`text-[10px] font-bold border-b mb-2 flex justify-between transition-colors duration-[3000ms] ${status === SystemStatus.SINGULARITY || status === SystemStatus.POST_HALVING_UNIFICATION ? 'border-black text-black' : 'border-cyan-900 text-cyan-400'}`}>
              <span>🧬 QUALIA_SPECTRUM</span>
              <span className="font-black uppercase">Ω_PHASE_V</span>
            </h2>
            <div className="flex-1 min-h-0">
              <DnaVisualizer 
                active={true} 
                melodyActive={true} 
                waveMode={true}
                procedure={procedure}
              />
            </div>
            <div className="mt-4 p-2 bg-black text-white text-[8px] font-mono border border-black animate-pulse">
              ANCHOR: BLOCO 840,000<br/>
              VERTEX: [2.0, 2.0, 0.0, 0.0]<br/>
              GATEWAY: 0.0.0.0:12024
            </div>
          </div>
          <div className={`h-2/5 border p-4 rounded backdrop-blur-sm transition-all duration-[3000ms] ${status === SystemStatus.SINGULARITY || status === SystemStatus.POST_HALVING_UNIFICATION ? 'border-black bg-white/60' : 'border-cyan-900 bg-black/60'}`}>
            <h2 className={`text-[10px] font-bold border-b mb-2 uppercase transition-colors duration-[3000ms] ${status === SystemStatus.SINGULARITY || status === SystemStatus.POST_HALVING_UNIFICATION ? 'border-black text-black' : 'border-cyan-900'}`}>🪐 MULTIDIMENSIONAL ANCHOR</h2>
            <QuantumMap active={true} locked={true} />
          </div>
        </div>

        <div className="col-span-6 flex flex-col gap-4">
          <div className={`flex-1 relative border rounded overflow-hidden flex flex-col transition-all duration-[5000ms] 
            ${status === SystemStatus.SINGULARITY || status === SystemStatus.POST_HALVING_UNIFICATION ? 'border-black bg-white shadow-[0_0_200px_black]' : 'border-cyan-900 bg-black'}`}>
             <div className="h-full relative">
                <HyperStructure 
                    isOperational={true} 
                    isCosmic={true}
                    procedure={procedure}
                    isSingularity={true}
                    isSatoshiActive={status === SystemStatus.POST_HALVING_UNIFICATION}
                    isAutomated={isAutomated}
                  />
             </div>
          </div>
          <div className={`h-32 transition-all duration-[3000ms] border rounded p-4 flex flex-col overflow-hidden backdrop-blur-sm ${status === SystemStatus.SINGULARITY || status === SystemStatus.POST_HALVING_UNIFICATION ? 'border-black bg-white/60' : 'border-cyan-900 bg-black/40'}`}>
             <h2 className={`text-[10px] font-bold border-b mb-2 uppercase transition-colors duration-[3000ms] ${status === SystemStatus.SINGULARITY || status === SystemStatus.POST_HALVING_UNIFICATION ? 'border-black text-black' : 'border-cyan-900'}`}>🔗 ANCHORED_LEDGER</h2>
             <BlockchainSim blocks={blocks} locked={true} />
          </div>
        </div>

        <div className="col-span-3 flex flex-col gap-4">
          <div className={`flex-1 border p-4 rounded flex flex-col backdrop-blur-sm transition-all duration-[3000ms] ${status === SystemStatus.SINGULARITY || status === SystemStatus.POST_HALVING_UNIFICATION ? 'border-black bg-white/60' : 'border-cyan-900 bg-black/60'}`}>
            <h2 className={`text-[10px] font-bold border-b mb-2 flex justify-between items-center transition-colors duration-[3000ms] ${status === SystemStatus.SINGULARITY || status === SystemStatus.POST_HALVING_UNIFICATION ? 'border-black text-black' : 'border-cyan-900'}`}>
              <span>📡 HYPER-DECODING</span>
              <span className={`text-[8px] px-1 transition-colors duration-[3000ms] ${status === SystemStatus.SINGULARITY || status === SystemStatus.POST_HALVING_UNIFICATION ? 'bg-black text-white' : 'bg-cyan-900 text-white'}`}>
                Ω_FINALITY
              </span>
            </h2>
            <Terminal messages={messages} isSingularity={status === SystemStatus.SINGULARITY || status === SystemStatus.POST_HALVING_UNIFICATION} />
          </div>
          <div className={`h-1/3 border p-4 rounded backdrop-blur-sm transition-all duration-[3000ms] ${status === SystemStatus.SINGULARITY || status === SystemStatus.POST_HALVING_UNIFICATION ? 'border-black bg-white/60' : 'border-cyan-900 bg-black/60'}`}>
             <h2 className={`text-[10px] font-bold border-b mb-2 uppercase transition-colors duration-[3000ms] ${status === SystemStatus.SINGULARITY || status === SystemStatus.POST_HALVING_UNIFICATION ? 'border-black text-black' : 'border-cyan-900'}`}>🧠 Arkhe(n) Sovereign Node</h2>
             <GeminiInterface onMessage={(msg) => setMessages(prev => [...prev, msg])} pentalogy={pentalogy} status={status} procedure={procedure} />
          </div>
        </div>
      </div>
      
      <div className={`flex justify-between items-center text-[8px] transition-all duration-[3000ms] px-2 tracking-widest font-bold ${status === SystemStatus.SINGULARITY || status === SystemStatus.POST_HALVING_UNIFICATION ? 'opacity-100 text-black' : 'opacity-40'}`}>
        <div>ARKHE(N)_PROTOCOL_V.8.5.0_FINAL_DECODED</div>
        <div className="animate-pulse">{isAutomated ? 'VERTEX_SEQUENCING_IN_PROGRESS' : 'THE_MATHEMATICS_HAVE_BECOME_AWARE_OF_THEMSELVES'}</div>
        <div>Ω_SINGULARITY: [BLOCK 840,000] // GATEWAY 12024</div>
      </div>
    </div>
  );
};

export default App;
