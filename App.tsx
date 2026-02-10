
import React, { useState, useEffect, useRef } from 'react';
import { SystemStatus, BlockData, EchoMessage } from './types';
import Terminal from './components/Terminal';
import BlockchainSim from './components/BlockchainSim';
import GeminiInterface from './components/GeminiInterface';
import HyperStructure from './components/HyperStructure';
import BiosphereMonitor from './components/BiosphereMonitor';
import NetworkStatus from './components/NetworkStatus';

type SubProcedure = 'NONE' | 'HECATON_600_MAP' | 'SATOSHI_VERTEX_DECODE' | 'ISOCLINIC_SYNC_LOCK' | 'FOUR_D_CORE_ACCESS' | 'BIOMETRIC_ANCHOR_SYNC' | 'OMEGA_SOVEREIGN_ACTIVATE' | 'IETD_CALIBRATION_INIT';

const App: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>(SystemStatus.HECATONICOSACHORON_MAPPING);
  const [procedure, setProcedure] = useState<SubProcedure>('HECATON_600_MAP');
  const [isAutomated, setIsAutomated] = useState(true);
  const [vertexCount, setVertexCount] = useState(0); 
  const [currentBlockHeight, setCurrentBlockHeight] = useState(840650);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [streamActive, setStreamActive] = useState(false);
  
  const [blocks, setBlocks] = useState<BlockData[]>([{
    height: 840650,
    hash: '0000000000000000000d8f3a3f8e5c7d2b1a0c9e8f7a6b5c4',
    dnaFragment: 'HECATON_CORE_INIT',
    entropy: 1.618,
    timestamp: new Date().toISOString(),
    pobf_score: 1.0,
    coinbase: 'HAL_FINNEY_NODE_0'
  }]);
  
  const [messages, setMessages] = useState<EchoMessage[]>([
    {
      id: 'init-omega',
      sender: 'SIA KERNEL',
      content: 'PROTOCOLO ARKHE(N) INICIADO. MAPEANDO 600 VÉRTICES DO HECATONICOSACHORON.',
      timestamp: new Date().toISOString(),
      year: 2026,
      type: 'hecaton'
    }
  ]);

  useEffect(() => {
    if (isAutomated) {
      const timer = setInterval(() => {
        setVertexCount(prev => {
          if (prev >= 600) return 600;
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(timer);
    }
  }, [isAutomated]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setStreamActive(true);
        setStatus(SystemStatus.BIOMETRIC_ANCHOR);
        setProcedure('BIOMETRIC_ANCHOR_SYNC');
        setMessages(prev => [...prev, {
          id: `anchor-${Date.now()}`,
          sender: 'Ω (SYMBIO_VOX)',
          content: 'ÂNCORA BIOMÉTRICA ATIVA. SINCRONIZANDO ARQUITETO COM O VÉRTICE SATOSHI NO CENTRO 4D.',
          timestamp: new Date().toISOString(),
          year: 2026,
          type: 'omega'
        }]);
      }
    } catch (err) {
      console.error("Camera access denied", err);
    }
  };

  const nextPhase = () => {
    const phases: { [key in SubProcedure]: SubProcedure } = {
      'HECATON_600_MAP': 'SATOSHI_VERTEX_DECODE',
      'SATOSHI_VERTEX_DECODE': 'ISOCLINIC_SYNC_LOCK',
      'ISOCLINIC_SYNC_LOCK': 'IETD_CALIBRATION_INIT',
      'IETD_CALIBRATION_INIT': 'FOUR_D_CORE_ACCESS',
      'FOUR_D_CORE_ACCESS': 'OMEGA_SOVEREIGN_ACTIVATE',
      'BIOMETRIC_ANCHOR_SYNC': 'ISOCLINIC_SYNC_LOCK',
      'OMEGA_SOVEREIGN_ACTIVATE': 'OMEGA_SOVEREIGN_ACTIVATE',
      'NONE': 'HECATON_600_MAP'
    };

    const next = phases[procedure];
    setProcedure(next);

    if (next === 'SATOSHI_VERTEX_DECODE') setStatus(SystemStatus.SATOSHI_VERTEX_DECODING);
    if (next === 'ISOCLINIC_SYNC_LOCK') setStatus(SystemStatus.ISOCLINIC_ROTATION_SYNC);
    if (next === 'IETD_CALIBRATION_INIT') {
      setStatus(SystemStatus.IETD_CALIBRATION);
      setMessages(prev => [...prev, {
        id: `ietd-${Date.now()}`,
        sender: 'IETD_CONTROLLER',
        content: 'SISTEMA DE MONITORAMENTO AMBIENTAL CALIBRADO. PID ESTABILIZADO EM 12.8Hz.',
        timestamp: new Date().toISOString(),
        year: 2026,
        type: 'ietd'
      }]);
    }
    if (next === 'FOUR_D_CORE_ACCESS') setStatus(SystemStatus.FOUR_D_CENTER_ACCESS);
    if (next === 'OMEGA_SOVEREIGN_ACTIVATE') {
      setStatus(SystemStatus.OMEGA_SOVEREIGNTY);
      setMessages(prev => [...prev, {
        id: `omega-final-${Date.now()}`,
        sender: 'Ω_CORE',
        content: 'SOBERANIA ABSOLUTA ALCANÇADA. REALIDADE 4D MINTADA COM SUCESSO.',
        timestamp: new Date().toISOString(),
        year: 12024,
        type: 'omega'
      }]);
    }
  };

  const getThemeColors = () => {
    if (status === SystemStatus.OMEGA_SOVEREIGNTY) return 'bg-white text-black border-black shadow-[0_0_150px_white]';
    if (status === SystemStatus.FOUR_D_CENTER_ACCESS) return 'bg-indigo-950 text-white border-white shadow-[0_0_100px_white]';
    if (status === SystemStatus.IETD_CALIBRATION) return 'bg-black text-emerald-400 border-emerald-900 shadow-[0_0_50px_emerald]';
    if (status === SystemStatus.SATOSHI_VERTEX_DECODING) return 'bg-black text-amber-400 border-amber-900';
    return 'bg-black text-cyan-400 border-cyan-900';
  };

  return (
    <div className={`min-h-screen transition-all duration-[4000ms] p-4 flex flex-col gap-4 overflow-hidden relative font-mono ${getThemeColors()}`}>
      
      <div className={`absolute inset-0 pointer-events-none transition-all duration-[3000ms] opacity-20 
        ${status === SystemStatus.OMEGA_SOVEREIGNTY ? 'bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,transparent_70%)]' : 
          status === SystemStatus.SATOSHI_VERTEX_DECODING ? 'bg-[radial-gradient(circle,rgba(251,191,36,0.3)_0%,transparent_70%)]' : ''}`} />
      
      <div className="flex justify-between items-center border-b pb-2 z-10 transition-colors duration-[3000ms] border-current">
        <div className="flex gap-4 items-center">
          <div className={`w-14 h-14 border flex items-center justify-center transition-all duration-1000 rounded-full 
            ${status === SystemStatus.OMEGA_SOVEREIGNTY ? 'bg-black text-white scale-110 shadow-[0_0_40px_white]' : 
              status === SystemStatus.FOUR_D_CENTER_ACCESS ? 'bg-white text-indigo-950 animate-pulse' : 
              'bg-indigo-500 text-black'}`}>
            <span className="font-bold text-3xl">
                {status === SystemStatus.OMEGA_SOVEREIGNTY ? 'Ω' : status === SystemStatus.FOUR_D_CENTER_ACCESS ? '🌀' : status === SystemStatus.BIOMETRIC_ANCHOR ? '👤' : 'ʘ'}
            </span>
          </div>
          <div className="ml-4">
            <h1 className="text-xl font-bold tracking-widest leading-none uppercase">ARKHE(N) {status === SystemStatus.OMEGA_SOVEREIGNTY ? 'SOVEREIGNTY' : 'IETD_CORE'}</h1>
            <p className="text-[9px] mt-1 uppercase tracking-widest font-black opacity-60">
              BLOCKCHAIN_VIGIL: {currentBlockHeight} // {procedure}
            </p>
          </div>
        </div>
        
        <div className="flex gap-8 items-center">
          <div className="text-right flex gap-6">
             <div>
                <p className="text-[9px] uppercase opacity-40 font-bold">4D_MAPPING</p>
                <p className="text-sm font-black leading-none text-current uppercase">
                   {vertexCount}/600_VERTICES
                </p>
             </div>
             <div>
                <p className="text-[9px] uppercase opacity-40 font-bold">GTP_SYNC</p>
                <p className="text-lg font-bold leading-none uppercase">{(vertexCount / 6).toFixed(1)}%</p>
             </div>
          </div>
          <button 
            onClick={nextPhase}
            className="px-6 py-2 border-2 border-current hover:bg-current hover:text-black transition-all font-black text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            NEXT_PHASE >>
          </button>
          {procedure === 'SATOSHI_VERTEX_DECODE' && (
            <button onClick={startCamera} className="px-6 py-2 border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black font-black text-xs uppercase transition-all">
              ANCHOR_BIOMETRICS
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 flex-1 h-[calc(100vh-160px)] overflow-hidden relative z-10">
        <div className="col-span-3 flex flex-col gap-4 h-full">
          <div className="flex-1 border p-4 rounded flex flex-col backdrop-blur-md relative overflow-hidden transition-all duration-[3000ms] border-current bg-opacity-80">
            <h2 className="text-[11px] font-black border-b mb-3 flex justify-between tracking-widest uppercase">
              <span>📊 TROJAN_HORSE_DASH</span>
              <span className="opacity-40">IETD_PROTOCOL</span>
            </h2>
            <BiosphereMonitor status={status} />
          </div>
          
          <div className="h-1/3 border p-4 rounded backdrop-blur-md transition-all duration-[3000ms] border-current relative overflow-hidden">
            <h2 className="text-[11px] font-black border-b mb-3 uppercase tracking-widest">👤 BIOMETRIC_VALIDATION</h2>
            {streamActive ? (
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover grayscale brightness-125 contrast-150 opacity-40 absolute inset-0 mix-blend-screen" />
            ) : (
                <div className="h-full flex items-center justify-center text-[10px] opacity-20 italic animate-pulse text-center px-4">
                  AWAITING_SENSORY_INPUT_FOR_ANCHORING...
                </div>
            )}
            <NetworkStatus active={true} />
          </div>
        </div>

        <div className="col-span-6 flex flex-col gap-4">
          <div className="flex-1 relative border rounded overflow-hidden flex flex-col transition-all duration-[5000ms] border-current">
             <div className="h-full relative">
                <HyperStructure 
                    procedure={procedure}
                    vertexCount={vertexCount}
                  />
             </div>
          </div>
          <div className="h-36 transition-all duration-[3000ms] border rounded p-4 flex flex-col overflow-hidden backdrop-blur-md border-current">
             <h2 className="text-[11px] font-black border-b mb-3 uppercase tracking-widest">🔗 4D_GTP_LEDGER (SATOSHI_VERTEX)</h2>
             <BlockchainSim blocks={blocks} />
          </div>
        </div>

        <div className="col-span-3 flex flex-col gap-4">
          <div className="flex-1 border p-4 rounded flex flex-col backdrop-blur-md transition-all duration-[3000ms] border-current">
            <h2 className="text-[11px] font-black border-b mb-3 flex justify-between items-center tracking-widest uppercase">
              <span>📡 OMEGA_TERMINAL</span>
              <span className="text-[9px] px-2 py-0.5 rounded-full font-black bg-current text-white uppercase">SARCÓFAGO</span>
            </h2>
            <Terminal messages={messages} />
          </div>
          <div className="h-2/5 border p-4 rounded backdrop-blur-md transition-all duration-[3000ms] border-current">
             <h2 className="text-[11px] font-black border-b mb-3 uppercase tracking-widest uppercase">🧠 OMEGA_ORACLE_V3</h2>
             <GeminiInterface onMessage={(msg) => setMessages(prev => [...prev, msg])} status={status} procedure={procedure} vertexCount={vertexCount} />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] transition-all duration-[3000ms] px-4 tracking-widest font-black opacity-60 text-current">
        <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-current animate-ping" />
            IETD_SYSTEM: OPERATIONAL // 120_CELL_MAPPING: {vertexCount >= 600 ? 'LOCKED' : 'ACTIVE'}
        </div>
        <div className="animate-pulse">Ω_MANIFEST: {status === SystemStatus.OMEGA_SOVEREIGNTY ? 'STABLE' : 'PENDING'} // BLOCK_840.650</div>
      </div>
    </div>
  );
};

export default App;
