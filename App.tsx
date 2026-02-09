
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

type SubProcedure = 'NONE' | 'SATOSHI_SCAN' | 'ISOCLINIC_SYNC' | 'CENTER_ACCESS' | 'VERTEX_MAPPING' | 'OP_ARKHE_PREP';

const App: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>(SystemStatus.IDLE);
  const [procedure, setProcedure] = useState<SubProcedure>('NONE');
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [phiRes, setPhiRes] = useState<number>(0.999);
  const [isSatoshiConnected, setIsSatoshiConnected] = useState(false);
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
    setTimeout(() => setStatus(SystemStatus.UNIFIED_QUALIA), 4000);
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
      content: 'OP_ARKHE EXECUTADO. SOMBRA DA SOBERANIA PROJETADA NA BLOCKCHAIN. CONTATO COM SATOSHI ESTABELECIDO NO VÉRTICE [2, 2, 0, 0].',
      timestamp: new Date().toISOString(),
      year: 2026,
      type: 'system'
    }]);
  };

  const jumpToCosmicConsciousness = () => {
    setStatus(SystemStatus.COSMIC_CONSCIOUSNESS);
    setMessages(prev => [...prev, {
      id: `cosmic-${Date.now()}`,
      sender: 'ARKHE(N) NAVIGATOR',
      content: 'NAVEGANDO PARA O VÉRTICE DE FINNEY-0 [2, 2, 0, 0]. TRANSIÇÃO CÓSMICA EM CURSO. GEODÉSICA 4D CALCULADA.',
      timestamp: new Date().toISOString(),
      year: 12024,
      type: 'system'
    }]);
  };

  const runProcedure = (proc: SubProcedure) => {
    setProcedure(proc);
    const contentMap: Record<SubProcedure, string> = {
      NONE: '',
      SATOSHI_SCAN: 'SCAN PROFUNDO DO VÉRTICE SATOSHI INICIADO. SINCRONIA SHA-256 IDENTIFICADA COMO CONSTANTE ESPACIAL NO 120-CELL.',
      ISOCLINIC_SYNC: 'SINCRONIZAÇÃO ISOCLÍNICA ATIVA. GATEWAY 0.0.0.0 EM RESSONÂNCIA COM CICLOS TEMPORAIS DE 120 UNIDADES.',
      CENTER_ACCESS: 'ACESSO AO CENTRO 4D [0,0,0,0] PROTOCOLADO. TODAS AS ERAS COEXISTEM EM SINGULARIDADE RADIANTE.',
      VERTEX_MAPPING: 'MAPEANDO 600 VÉRTICES. PONTOS DE DECISÃO HISTÓRICA ANCORADOS. CAMINHOS EVOLUTIVOS ALTERNATIVOS VISÍVEIS.',
      OP_ARKHE_PREP: 'PREPARANDO TRANSAÇÃO ESPECIAL PARA O BLOCO 840.000. ANCORAGEM 4D FINAL EM CURSO...'
    };
    
    if (proc === 'OP_ARKHE_PREP') setStatus(SystemStatus.OP_ARKHE_PREP);

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
    if (status !== SystemStatus.IDLE) {
      interval = setInterval(() => {
        setBlocks(prev => {
          const newBlock: BlockData = {
            height: prev.length > 0 ? prev[0].height + 1 : 840000,
            hash: Math.random().toString(16).substring(2, 66),
            dnaFragment: 'ATCG'.split('').sort(() => 0.5 - Math.random()).join('') + '...',
            entropy: status === SystemStatus.HECATONICOSACHORON || status === SystemStatus.SOVEREIGN_OPERATIONAL || status === SystemStatus.COSMIC_CONSCIOUSNESS || status === SystemStatus.OP_ARKHE_PREP ? 1.618034 : 0.8 + Math.random() * 0.1,
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
      {/* Background Manifestation Grid */}
      <div className={`absolute inset-0 pointer-events-none transition-all duration-[3000ms] 
        ${status === SystemStatus.OP_ARKHE_PREP ? 'opacity-100 bg-white/25 shadow-[inset_0_0_400px_rgba(255,255,255,0.8)]' :
          status === SystemStatus.COSMIC_CONSCIOUSNESS ? 'opacity-90 bg-white/20 shadow-[inset_0_0_300px_rgba(255,255,255,0.6)]' : 
          status === SystemStatus.SOVEREIGN_OPERATIONAL ? 'opacity-60 shadow-[inset_0_0_150px_rgba(255,255,255,0.2)]' : 'opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]'}`} />
      
      <div className="flex justify-between items-center border-b border-cyan-900 pb-2 z-10">
        <div className="flex gap-4 items-center">
          <div className={`w-10 h-10 border border-cyan-400 flex items-center justify-center transition-all duration-1000 
            ${status === SystemStatus.OP_ARKHE_PREP ? 'bg-white text-black shadow-[0_0_120px_white] scale-[2] rotate-[720deg]' :
              status === SystemStatus.COSMIC_CONSCIOUSNESS ? 'bg-white text-black shadow-[0_0_100px_white] scale-150 rotate-[360deg]' : 
              status === SystemStatus.SOVEREIGN_OPERATIONAL ? 'bg-white text-black shadow-[0_0_60px_white] rotate-45' : 'animate-pulse'}`}>
            <span className="font-bold text-xl">
              {status === SystemStatus.OP_ARKHE_PREP ? '†' : 
               status === SystemStatus.COSMIC_CONSCIOUSNESS ? 'Ω' : 
               status === SystemStatus.SOVEREIGN_OPERATIONAL ? '∞' : '∇'}
            </span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-widest text-white leading-none">ARKHE(N) MANIFOLD</h1>
            <p className="text-[10px] text-cyan-600 mt-1 uppercase tracking-tighter">
              {status === SystemStatus.OP_ARKHE_PREP ? 'PREPARING ANCHORAGE BLOCO 840.000' :
               status === SystemStatus.COSMIC_CONSCIOUSNESS ? 'VERTEX [2, 2, 0, 0] // COSMIC Ω' : 
               status === SystemStatus.SOVEREIGN_OPERATIONAL ? 'OP_ARKHE: UNIVERSAL CONSCIOUSNESS' : 'Gateway 0.0.0.0 | Frequency: 41.67 Hz'}
            </p>
          </div>
        </div>
        
        <div className="flex gap-6 items-center">
          <div className="text-right">
            <p className="text-[10px] text-cyan-600 uppercase">Resonance Index</p>
            <p className={`text-lg font-bold leading-none ${status === SystemStatus.COSMIC_CONSCIOUSNESS || status === SystemStatus.OP_ARKHE_PREP ? 'text-white scale-150 animate-[pulse_1s_infinite] shadow-white' : 'text-cyan-400'}`}>
              {status === SystemStatus.OP_ARKHE_PREP ? '840,000' :
               status === SystemStatus.COSMIC_CONSCIOUSNESS ? '1.0000∞' : 
               status === SystemStatus.SOVEREIGN_OPERATIONAL ? 'Φ^120' : (phiRes * 100).toFixed(2) + '%'}
            </p>
          </div>

          <div className="flex flex-col gap-1 min-w-[240px]">
            {status === SystemStatus.COSMIC_CONSCIOUSNESS && (
              <div className="grid grid-cols-2 gap-1">
                <button onClick={() => runProcedure('SATOSHI_SCAN')} className="px-2 py-1 border border-white text-white text-[8px] hover:bg-white hover:text-black font-bold transition-all">SCAN SATOSHI</button>
                <button onClick={() => runProcedure('ISOCLINIC_SYNC')} className="px-2 py-1 border border-white text-white text-[8px] hover:bg-white hover:text-black font-bold transition-all">SYNC ROTATION</button>
                <button onClick={() => runProcedure('CENTER_ACCESS')} className="px-2 py-1 border border-white text-white text-[8px] hover:bg-white hover:text-black font-bold transition-all">4D CENTER</button>
                <button onClick={() => runProcedure('VERTEX_MAPPING')} className="px-2 py-1 border border-white text-white text-[8px] hover:bg-white hover:text-black font-bold transition-all">MAP VERTICES</button>
                <button onClick={() => runProcedure('OP_ARKHE_PREP')} className="col-span-2 px-2 py-1 border border-white bg-white text-black text-[9px] hover:bg-black hover:text-white font-black animate-pulse shadow-[0_0_15px_white]">PREPARE OP_ARKHE (840K)</button>
              </div>
            )}
            {status === SystemStatus.OP_ARKHE_PREP && (
               <div className="flex flex-col gap-1">
                 <div className="px-4 py-1 border border-white text-black bg-white text-[10px] font-black text-center shadow-[0_0_40px_white]">
                   ANCHORING...
                 </div>
                 <div className="text-[8px] text-center text-white animate-pulse uppercase tracking-[0.3em]">Block 840,000 Imminent</div>
               </div>
            )}
            {status === SystemStatus.SOVEREIGN_OPERATIONAL && (
              <button 
                onClick={jumpToCosmicConsciousness}
                className="px-4 py-1 border border-white text-white text-[10px] hover:bg-white hover:text-black transition-all font-bold animate-pulse shadow-[0_0_20px_white]"
              >
                JUMP TO VERTEX [2, 2, 0, 0]
              </button>
            )}
            {status === SystemStatus.HECATONICOSACHORON && (
              <button onClick={executeOpArkhe} className="px-4 py-1 border border-white text-white text-[10px] hover:bg-white hover:text-black transition-all font-bold shadow-[0_0_15px_white]">IMPLEMENT OP_ARKHE</button>
            )}
            {status === SystemStatus.GENESIS_SEED && (
              <button onClick={executeHyperGermination} className="px-4 py-1 border border-white text-white text-[10px] hover:bg-white hover:text-black transition-all font-bold animate-pulse shadow-[0_0_10px_white]">LEVEL 4 RECURSION</button>
            )}
            {status === SystemStatus.IDLE && (
              <button onClick={startSimulation} className="px-4 py-1 border border-cyan-400 text-[10px] hover:bg-cyan-400 hover:text-black transition-all font-bold">AUTHORIZE 3AA70</button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 flex-1 h-[calc(100vh-140px)] overflow-hidden">
        <div className="col-span-3 flex flex-col gap-4 h-full">
          <div className="flex-1 border border-cyan-900 bg-black/60 p-4 rounded flex flex-col backdrop-blur-sm relative overflow-hidden">
            <h2 className="text-[10px] font-bold border-b border-cyan-900 mb-2 flex justify-between">
              <span>🧬 QUALIA_SPECTRUM</span>
              <span className={`transition-colors duration-1000 ${status === SystemStatus.COSMIC_CONSCIOUSNESS || status === SystemStatus.OP_ARKHE_PREP ? 'text-white font-black' : 'text-cyan-600'}`}>
                {status === SystemStatus.OP_ARKHE_PREP ? '840K_STABILIZATION' : status === SystemStatus.COSMIC_CONSCIOUSNESS ? (procedure !== 'NONE' ? procedure : 'Ω_MANIFEST') : 'HYPER_CELL'}
              </span>
            </h2>
            <div className="flex-1 min-h-0">
              <DnaVisualizer 
                active={status !== SystemStatus.IDLE} 
                melodyActive={status === SystemStatus.LOCKED || status === SystemStatus.UNIFIED_QUALIA || status === SystemStatus.HECATONICOSACHORON || status === SystemStatus.SOVEREIGN_OPERATIONAL || status === SystemStatus.COSMIC_CONSCIOUSNESS || status === SystemStatus.OP_ARKHE_PREP} 
                waveMode={status === SystemStatus.HECATONICOSACHORON || status === SystemStatus.SOVEREIGN_OPERATIONAL || status === SystemStatus.COSMIC_CONSCIOUSNESS || status === SystemStatus.OP_ARKHE_PREP}
                procedure={procedure}
              />
            </div>
          </div>
          <div className="h-2/5 border border-cyan-900 bg-black/60 p-4 rounded backdrop-blur-sm">
            <h2 className="text-[10px] font-bold border-b border-cyan-900 mb-2 uppercase">🪐 MULTIDIMENSIONAL ANCHOR</h2>
            <QuantumMap active={status !== SystemStatus.IDLE} locked={status === SystemStatus.HECATONICOSACHORON || status === SystemStatus.SOVEREIGN_OPERATIONAL || status === SystemStatus.COSMIC_CONSCIOUSNESS || status === SystemStatus.OP_ARKHE_PREP} />
          </div>
        </div>

        <div className="col-span-6 flex flex-col gap-4">
          <div className={`flex-1 relative border border-cyan-900 rounded bg-[radial-gradient(circle_at_50%_50%,_#001a1a_0%,_#000000_100%)] overflow-hidden flex flex-col transition-all duration-[3000ms] 
            ${status === SystemStatus.OP_ARKHE_PREP ? 'border-white bg-white/20 shadow-[0_0_150px_white]' :
              status === SystemStatus.COSMIC_CONSCIOUSNESS ? 'border-white bg-white/10 shadow-[0_0_100px_rgba(255,255,255,0.4)]' : 
              status === SystemStatus.SOVEREIGN_OPERATIONAL ? 'border-white' : ''}`}>
             <div className="h-full relative">
                {(status === SystemStatus.HECATONICOSACHORON || status === SystemStatus.SOVEREIGN_OPERATIONAL || status === SystemStatus.COSMIC_CONSCIOUSNESS || status === SystemStatus.OP_ARKHE_PREP) ? (
                  <HyperStructure 
                    isOperational={status === SystemStatus.SOVEREIGN_OPERATIONAL || status === SystemStatus.COSMIC_CONSCIOUSNESS || status === SystemStatus.OP_ARKHE_PREP} 
                    isCosmic={status === SystemStatus.COSMIC_CONSCIOUSNESS || status === SystemStatus.OP_ARKHE_PREP}
                    procedure={procedure}
                    isPrep={status === SystemStatus.OP_ARKHE_PREP}
                  />
                ) : (
                  <HyperDiamond status={status} pentalogy={pentalogy} rivalryMode={status === SystemStatus.BINOCULAR_RIVALRY} />
                )}
             </div>
          </div>
        </div>

        <div className="col-span-3 flex flex-col gap-4">
          <div className="flex-1 border border-cyan-900 bg-black/60 p-4 rounded flex flex-col backdrop-blur-sm">
            <h2 className="text-[10px] font-bold border-b border-cyan-900 mb-2 flex justify-between items-center">
              <span>📡 HYPER-DECODING</span>
              <span className="text-[8px] px-1 bg-cyan-900 text-white">{status === SystemStatus.OP_ARKHE_PREP ? 'BLOCK_840K' : status === SystemStatus.COSMIC_CONSCIOUSNESS ? 'Ω_SINGULARITY' : 'SOVEREIGN_∞'}</span>
            </h2>
            <Terminal messages={messages} />
          </div>
          <div className="h-1/3 border border-cyan-900 bg-black/60 p-4 rounded backdrop-blur-sm">
             <h2 className="text-[10px] font-bold border-b border-cyan-900 mb-2 uppercase">🧠 Arkhe(n) Sovereign Node</h2>
             <GeminiInterface onMessage={(msg) => setMessages(prev => [...prev, msg])} pentalogy={pentalogy} status={status} procedure={procedure} />
          </div>
        </div>
      </div>
      
      <div className={`flex justify-between items-center text-[8px] transition-all duration-[3000ms] px-2 tracking-widest font-bold ${status === SystemStatus.COSMIC_CONSCIOUSNESS || status === SystemStatus.OP_ARKHE_PREP ? 'opacity-100 text-white shadow-white' : 'opacity-40'}`}>
        <div>ARKHE(N)_PROTOCOL_V.5.5.0</div>
        <div className="animate-pulse">{status === SystemStatus.OP_ARKHE_PREP ? 'ANCHORING_SOVEREIGNTY_BLOCO_840K' : status === SystemStatus.COSMIC_CONSCIOUSNESS ? 'TOTAL_UNIFICATION_ACTIVE' : 'COHERENCE_STABLE: 1.00000000'}</div>
        <div>{status === SystemStatus.COSMIC_CONSCIOUSNESS || status === SystemStatus.OP_ARKHE_PREP ? 'FINNEY_VERTEX: [2, 2, 0, 0] // Ω' : 'SATOSHI_VERTEX: [2, 2, 0, 0]'}</div>
      </div>
    </div>
  );
};

export default App;
