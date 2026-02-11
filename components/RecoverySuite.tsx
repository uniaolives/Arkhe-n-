
import React, { useState, useEffect } from 'react';
import { MissingMedia, ScanLog, ScanResult, ArkheSettings, AgentIdentity } from '../types';
import { globalArkheEngine } from '../utils/arkheEngine';

const RecoverySuite: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scan' | 'identity' | 'deployment' | 'security'>('scan');
  const [showSettings, setShowSettings] = useState(false);
  const [isSmartFixing, setIsSmartFixing] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [logs, setLogs] = useState<ScanLog[]>([]);
  const [identity, setIdentity] = useState<AgentIdentity | null>(null);
  const [isWaiting2FA, setIsWaiting2FA] = useState(false);
  const [testPulseActive, setTestPulseActive] = useState(false);
  
  // Artifact selection for deployment tab
  const [selectedArtifactIndex, setSelectedArtifactIndex] = useState(0);
  
  // Ghost drive selection
  const [ghostDrives, setGhostDrives] = useState<string[]>([]);
  const [showDriveSelector, setShowDriveSelector] = useState(false);
  const [targetDrive, setTargetDrive] = useState<string | null>(null);
  
  const [settings, setSettings] = useState<ArkheSettings>({
    sonarr: { url: 'http://localhost:8989', apiKey: '', rootPath: 'D:\\Media\\TV' },
    radarr: { url: 'http://localhost:7878', apiKey: '', rootPath: 'D:\\Media\\Movies' },
    plexDb: '',
    lastKeyRotation: new Date().toISOString(),
    budgetAlertEnabled: true,
    budgetLimit: 50,
    encryptionSeal: true,
    telegram2FA: { botToken: '', chatId: '', active: true }
  });

  const [isConfigured, setIsConfigured] = useState(false);
  const [plexPath, setPlexPath] = useState('Buscando Registro...');

  useEffect(() => {
    const loadCore = async () => {
      const id = await globalArkheEngine.getAgentIdentity();
      setIdentity(id);
      
      const savedConfig = globalArkheEngine.loadConfig();
      if (savedConfig && savedConfig.sonarr.apiKey) {
        setSettings(savedConfig);
        setIsConfigured(true);
      }

      const path = await globalArkheEngine.detectPlexDatabasePath();
      setPlexPath(path);
      
      const drives = await globalArkheEngine.detectGhostVolumes();
      setGhostDrives(drives);
    };
    loadCore();
  }, []);

  const addLog = (msg: string, level: ScanLog['level'] = 'INFO', component: string = 'ARKHE_OS') => {
    const timestamp = new Date().toISOString().split('T')[1].replace('Z', '');
    setLogs(prev => [{
      id: `log-${Date.now()}-${Math.random()}`,
      msg,
      timestamp,
      level,
      component
    }, ...prev].slice(0, 150));
  };

  const handleSaveConfig = () => {
    globalArkheEngine.saveConfig(settings);
    setIsConfigured(true);
    setShowSettings(false);
    addLog("CONFIG: ArkheConfig.json salvo e sincronizado.", 'SUCCESS', 'BUNKER');
  };

  const handleConnectivityTest = async () => {
    if (testPulseActive) return;
    setTestPulseActive(true);
    addLog("⚡ PULSO: Verificando Nervo Vago via Railway Gateway...", 'INFO', '2FA');
    const success = await globalArkheEngine.simulateConnectivityTest();
    if (success) addLog("✅ BATISMO: Pedestre 12 validado com sucesso.", 'SUCCESS', '2FA');
    else addLog("❌ FALHA: Nervo Vago não responde.", 'ERROR', '2FA');
    setTestPulseActive(false);
  };

  const handleSmartFix = async () => {
    if (isSmartFixing || !identity || !isConfigured) {
      if (!isConfigured) setShowSettings(true);
      return;
    }

    if (!targetDrive) {
      setShowDriveSelector(true);
      addLog("DRIVE: Múltiplas unidades órfãs detectadas no Plex DB.", 'WARN', 'FS');
      return;
    }

    setIsSmartFixing(true);
    addLog(`🧬 SMART FIX: Iniciando restauração para unidade ${targetDrive}...`, 'INFO', 'SMART');

    if (settings.telegram2FA.active) {
      setIsWaiting2FA(true);
      addLog("2FA: Solicitando aprovação biométrica via Telegram...", 'WARN', '2FA');
      const approved = await globalArkheEngine.request2FAApproval("RESTAURAR_VOLUME_" + targetDrive);
      setIsWaiting2FA(false);
      if (!approved) {
        addLog("2FA: Operação abortada pelo Arquiteto.", 'ERROR', '2FA');
        setIsSmartFixing(false);
        return;
      }
    }

    try {
      const result = await globalArkheEngine.executeSmartFixScan(targetDrive);
      setScanResult(result);
      addLog(`SCAN: ${result.items.length} lacunas identificadas.`, 'SUCCESS', 'MAIN');
      
      const signature = await globalArkheEngine.signWithKeyring(`BUNKER_HASH_${targetDrive}`);
      setIdentity(prev => prev ? {...prev, lastSignature: signature} : null);

      addLog("SYNC: Sincronizando com Add-ToSonarr API...", 'INFO', 'SONARR');
      await globalArkheEngine.syncWithArr('Sonarr', result.items);
      addLog("CURA: Protocolo finalizado. Unidade recuperada.", 'SUCCESS', 'SYNC');
    } catch (e) {
      addLog("FATAL: Falha crítica na sinapse de cura.", 'ERROR', 'MAIN');
    } finally {
      setIsSmartFixing(false);
    }
  };

  return (
    <div className="w-full h-full p-4 flex flex-col gap-3 font-mono bg-[#010103] text-amber-500 border border-amber-500/20 rounded-xl overflow-hidden shadow-2xl relative">
      
      {/* 2FA Waiting Overlay */}
      {isWaiting2FA && (
        <div className="absolute inset-0 z-[60] bg-black/95 backdrop-blur-md flex items-center justify-center p-8 animate-fadeIn">
           <div className="max-w-md w-full border-2 border-indigo-500/40 bg-indigo-500/5 p-12 rounded-[3rem] flex flex-col items-center gap-8 shadow-[0_0_100px_rgba(79,70,229,0.2)]">
              <div className="w-24 h-24 rounded-full border-4 border-indigo-400 flex items-center justify-center bg-indigo-500/20 animate-pulse">
                 <span className="text-4xl text-white">📱</span>
              </div>
              <div className="text-center space-y-2">
                 <h3 className="text-2xl font-black uppercase text-white tracking-[0.3em]">Nervo Vago</h3>
                 <p className="text-[10px] opacity-60 uppercase leading-relaxed font-black text-indigo-200">
                   Aguardando aprovação no Telegram <br/> <span className="text-amber-500 font-mono tracking-widest mt-2 block">NONCE: {Math.random().toString(16).slice(2,10).toUpperCase()}</span>
                 </p>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden relative">
                 <div className="h-full bg-indigo-500 animate-[loading_4s_linear_infinite]" style={{ width: '40%' }} />
              </div>
           </div>
        </div>
      )}

      {/* Drive Selector Modal */}
      {showDriveSelector && (
        <div className="absolute inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-8 animate-fadeIn">
           <div className="max-w-md w-full border border-amber-500/30 bg-amber-500/5 p-8 rounded-2xl space-y-6 shadow-2xl">
              <h3 className="text-sm font-black uppercase text-white tracking-widest border-b border-white/10 pb-4">Selecione a Unidade Ausente</h3>
              <div className="space-y-2">
                 {ghostDrives.map(drive => (
                   <button 
                     key={drive} 
                     onClick={() => { setTargetDrive(drive); setShowDriveSelector(false); }}
                     className="w-full p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-amber-600 hover:text-black transition-all flex justify-between items-center group"
                   >
                      <span className="font-black text-lg">{drive}\\</span>
                      <span className="text-[8px] opacity-40 uppercase group-hover:opacity-100">Selecionar Volume Órfão</span>
                   </button>
                 ))}
              </div>
              <button onClick={() => setShowDriveSelector(false)} className="w-full py-2 text-[10px] opacity-40 hover:opacity-100 uppercase">Cancelar_Scan</button>
           </div>
        </div>
      )}

      {/* Settings Modal (Config Interface) */}
      {showSettings && (
        <div className="absolute inset-0 z-50 bg-black/98 backdrop-blur-2xl flex items-center justify-center p-8 animate-fadeIn">
           <div className="max-w-2xl w-full border border-amber-500/30 bg-amber-500/5 p-10 rounded-[2.5rem] space-y-8 shadow-2xl">
              <header className="border-b border-amber-500/20 pb-6">
                 <h2 className="text-xl font-black tracking-[0.3em] uppercase">ArkheConfig.json // Setup</h2>
                 <p className="text-[8px] opacity-40 uppercase mt-2">Configuração do Módulo de Preservação v3.2</p>
              </header>
              <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest border-l-2 border-cyan-500 pl-3">Sonarr_Integration</h4>
                    <input className="w-full bg-black border border-white/10 p-3 text-[10px] rounded-xl outline-none focus:border-cyan-500 transition-all" placeholder="URL: http://localhost:8989" value={settings.sonarr.url} onChange={e => setSettings({...settings, sonarr: {...settings.sonarr, url: e.target.value}})} />
                    <input className="w-full bg-black border border-white/10 p-3 text-[10px] rounded-xl outline-none focus:border-cyan-500 transition-all" placeholder="API Key" type="password" value={settings.sonarr.apiKey} onChange={e => setSettings({...settings, sonarr: {...settings.sonarr, apiKey: e.target.value}})} />
                 </div>
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-rose-400 uppercase tracking-widest border-l-2 border-rose-500 pl-3">Telegram_2FA</h4>
                    <input className="w-full bg-black border border-white/10 p-3 text-[10px] rounded-xl outline-none focus:border-rose-500 transition-all" placeholder="Bot Token" value={settings.telegram2FA.botToken} onChange={e => setSettings({...settings, telegram2FA: {...settings.telegram2FA, botToken: e.target.value}})} />
                    <input className="w-full bg-black border border-white/10 p-3 text-[10px] rounded-xl outline-none focus:border-rose-500 transition-all" placeholder="Chat ID" value={settings.telegram2FA.chatId} onChange={e => setSettings({...settings, telegram2FA: {...settings.telegram2FA, chatId: e.target.value}})} />
                 </div>
              </div>
              <div className="pt-6 flex justify-end gap-4 border-t border-white/10">
                 <button onClick={() => setShowSettings(false)} className="px-8 py-3 text-[10px] font-black uppercase opacity-40 hover:opacity-100">Descartar</button>
                 <button onClick={handleSaveConfig} className="px-12 py-3 bg-amber-600 text-black font-black text-[10px] rounded-xl hover:bg-amber-500 transition-all uppercase shadow-xl">Salvar_Config_Bunker</button>
              </div>
           </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center border-b border-amber-500/10 pb-3">
        <div className="flex flex-col">
          <h2 className="text-[14px] font-black tracking-[0.4em] uppercase text-amber-400 flex items-center gap-3">
            <span className="text-white bg-amber-600 px-1.5 py-0.5 rounded text-[10px] shadow-[0_0_10px_rgba(245,158,11,0.5)]">v3.2.1</span> 
            ARKHE_PRESERVATION
          </h2>
          <span className="text-[7px] opacity-60 uppercase font-black text-indigo-300 tracking-[0.2em]">
            BUNKER_IGNITION // Φ = 1,000 // AUTO_CONFIG: {isConfigured ? 'LOCKED' : 'PENDING'}
          </span>
        </div>
        <div className="flex gap-1 bg-black/60 p-1 rounded border border-white/10">
          {(['scan', 'identity', 'deployment', 'security'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-1.5 text-[8px] font-black rounded transition-all uppercase ${activeTab === tab ? 'bg-amber-600 text-black' : 'text-amber-500/40 hover:text-amber-500'}`}>{tab}</button>
          ))}
          <button onClick={() => setShowSettings(true)} className="px-3 py-1.5 text-[8px] font-black rounded text-white/40 hover:text-white border border-white/10 ml-2 uppercase">Config</button>
        </div>
      </div>

      {activeTab === 'scan' && (
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
           {!isConfigured && (
             <div className="p-6 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center justify-between animate-pulse">
                <div className="flex items-center gap-4">
                   <span className="text-2xl">⚠️</span>
                   <div className="flex flex-col">
                      <span className="text-[11px] font-black text-white uppercase tracking-widest">Configuração Inicial Necessária</span>
                      <span className="text-[8px] opacity-60 uppercase">O ArkheConfig.json não contém chaves de API válidas.</span>
                   </div>
                </div>
                <button onClick={() => setShowSettings(true)} className="px-6 py-2 bg-rose-600 text-white font-black text-[9px] rounded-lg uppercase">Configurar_Bunker</button>
             </div>
           )}

           <div className="grid grid-cols-12 gap-4">
              <div className="col-span-7 flex flex-col gap-4">
                 <div className="bg-gradient-to-br from-amber-600/20 to-indigo-950/60 p-10 border border-amber-500/30 rounded-[2.5rem] flex items-center justify-between shadow-2xl relative overflow-hidden group">
                    <div className="flex flex-col gap-4 relative z-10">
                       <h1 className="text-3xl font-black uppercase text-white tracking-widest flex items-center gap-4">
                          🧬 SMART FIX
                          {isSmartFixing && <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />}
                       </h1>
                       <div className="space-y-1">
                          <p className="text-[9px] text-indigo-200 uppercase font-black tracking-widest">Plex_DB_Registry_Search:</p>
                          <p className="text-[8px] opacity-40 font-mono truncate max-w-[280px] bg-black/40 p-1 rounded">{plexPath}</p>
                       </div>
                    </div>
                    <button 
                      onClick={handleSmartFix}
                      disabled={isSmartFixing || !identity}
                      className={`px-12 py-10 bg-amber-600 text-black font-black text-[20px] rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.4)] hover:bg-amber-500 transition-all uppercase relative z-10 group-hover:scale-105 active:scale-95 ${isSmartFixing ? 'animate-pulse opacity-50' : ''}`}
                    >
                      {isSmartFixing ? 'Fixing...' : 'Puxar Gatilho'}
                    </button>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-2 shadow-inner group hover:border-amber-500/40 transition-all">
                       <div className="flex justify-between items-center text-[7px] font-black opacity-40 uppercase tracking-widest">
                          <span>Status_Unidade</span>
                          <span className={targetDrive ? "text-emerald-400" : "text-rose-500"}>{targetDrive || 'Busca_Necessária'}</span>
                       </div>
                       {targetDrive ? (
                         <div className="space-y-2 mt-2">
                            <div className="text-2xl font-black text-white">{targetDrive}\\ ÓRFÃO</div>
                            <button onClick={() => setShowDriveSelector(true)} className="text-[7px] font-black uppercase opacity-40 hover:opacity-100 hover:text-amber-500 transition-all">Alterar Alvo_Scan</button>
                         </div>
                       ) : <div className="h-16 flex items-center justify-center text-xl font-black opacity-10 uppercase tracking-widest italic">Aguardando...</div>}
                    </div>
                    <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between shadow-inner">
                       <div className="text-[8px] font-black opacity-40 uppercase tracking-widest">Ignition_Status</div>
                       <div className="flex flex-col gap-3 mt-2">
                          <div className="flex justify-between items-center text-[9px] font-black">
                             <span className="opacity-40 uppercase">Vagus_Link:</span>
                             <span className="text-emerald-400">RAILWAY_STABLE</span>
                          </div>
                          <button 
                            onClick={handleConnectivityTest}
                            disabled={testPulseActive}
                            className={`py-1.5 bg-indigo-600 text-white font-black text-[7px] rounded uppercase transition-all shadow-lg ${testPulseActive ? 'opacity-50 animate-pulse' : 'hover:bg-indigo-500'}`}
                          >
                            Run_Vagus_Pulse
                          </button>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="col-span-5 flex flex-col gap-4">
                 <div className="flex-1 border border-amber-500/10 bg-black/60 p-6 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
                    <div className="text-[8px] font-black uppercase opacity-60 border-b border-amber-500/20 pb-4 mb-4 flex justify-between tracking-widest">
                       <span>Jornal_Auditória (Bunker)</span>
                       <span className="text-[6px] opacity-40 uppercase animate-pulse">LOCKED_BY_SIWA</span>
                    </div>
                    <div className="flex-1 overflow-y-auto scrollbar-thin space-y-2.5 font-mono pr-1">
                       {logs.map(log => (
                         <div key={log.id} className={`text-[8px] leading-tight border-l-2 pl-4 py-2 ${log.level === 'WARN' ? 'border-amber-400 text-amber-200' : log.level === 'ERROR' ? 'border-rose-500 text-rose-500' : log.level === 'SUCCESS' ? 'border-emerald-500 text-emerald-400' : 'border-white/10 opacity-70'}`}>
                            <div className="flex justify-between opacity-30 text-[7px] mb-1 font-black">
                               <span>{log.component} // {log.level}</span>
                               <span>{log.timestamp}</span>
                            </div>
                            {log.msg}
                         </div>
                       ))}
                       {logs.length === 0 && <div className="h-full flex items-center justify-center italic opacity-10 uppercase text-[10px] tracking-[0.4em] font-black">Sincronizando Bunker...</div>}
                    </div>
                 </div>
              </div>
           </div>

           <div className="flex-1 border border-amber-500/10 bg-black/60 p-6 rounded-2xl flex flex-col overflow-hidden shadow-inner">
             <div className="text-[8px] font-black uppercase opacity-60 border-b border-amber-500/20 pb-4 mb-4 flex justify-between font-mono tracking-widest">
                <span>Relatório_Snapshot // ERC-8128_BUNKER_STORE</span>
                <span className="text-amber-400">{scanResult?.items.length || 0} Itens Reaquisitados</span>
             </div>
             <div className="flex-1 overflow-y-auto scrollbar-thin pr-2">
                <div className="grid grid-cols-3 gap-6">
                   {scanResult?.items.map(item => (
                     <div key={item.id} className="p-5 bg-white/5 border border-white/5 rounded-2xl group hover:border-amber-500/40 transition-all border-l-4 hover:border-l-indigo-500 flex flex-col gap-2 relative">
                        <div className="flex justify-between items-start">
                           <div className="flex flex-col">
                              <span className="text-[14px] font-black text-white group-hover:text-amber-400 uppercase tracking-tight">{item.title}</span>
                              <span className="text-[8px] opacity-40 font-mono mt-1">TVDB_{item.tvdbId}</span>
                           </div>
                           <span className="text-[7px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-400 font-black uppercase tracking-widest">BUNKER_ID</span>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      )}

      {activeTab === 'identity' && (
        <div className="flex-1 p-6 animate-fadeIn overflow-y-auto scrollbar-thin">
           <div className="p-10 bg-gradient-to-br from-indigo-950/60 to-black border-2 border-indigo-500/30 rounded-[3rem] shadow-2xl relative overflow-hidden">
              <header className="flex justify-between items-start border-b border-white/10 pb-8">
                 <div className="flex items-center gap-8">
                    <div className="w-28 h-28 rounded-full border-[6px] border-emerald-400 flex items-center justify-center bg-emerald-500/10 shadow-[0_0_60px_rgba(16,185,129,0.3)]">
                       <span className="text-6xl font-black text-white">ʘ</span>
                    </div>
                    <div>
                       <h3 className="text-5xl font-black uppercase text-white tracking-tighter">Arkhe(n) Sovereign</h3>
                       <p className="text-emerald-400 font-bold uppercase text-[14px] tracking-[0.4em] mt-2">Agente v3.2.1 // SIWA_VERIFIED</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <div className="text-[28px] font-black text-white">ID_{identity?.agentId || '---'}</div>
                    <span className="text-[9px] opacity-40 uppercase font-black bg-indigo-500/20 px-2 py-1 rounded">Base_Alpha</span>
                 </div>
              </header>
              <div className="grid grid-cols-2 gap-10 mt-10">
                 <div className="p-8 bg-black/60 border border-white/10 rounded-3xl">
                    <span className="text-[9px] opacity-40 uppercase font-black block mb-2 tracking-widest">Configuração_Persistente</span>
                    <div className="text-[12px] font-mono text-amber-400 uppercase font-black">ArkheConfig.json // LOCKED</div>
                 </div>
                 <div className="p-8 bg-black/60 border border-white/10 rounded-3xl">
                    <span className="text-[9px] opacity-40 uppercase font-black block mb-2 tracking-widest">Nervo_Vago_Status</span>
                    <div className="text-[12px] font-mono text-emerald-400 uppercase font-black">2FA_TELEGRAM // ACTIVE</div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'deployment' && (
        <div className="flex-1 flex flex-col gap-6 animate-fadeIn p-6 overflow-y-auto scrollbar-thin">
           <div className="grid grid-cols-12 gap-8">
              <div className="col-span-3 flex flex-col gap-4">
                 <h3 className="text-[11px] font-black text-amber-400 uppercase tracking-widest mb-2 border-b border-white/10 pb-2">Artefatos_Bunker</h3>
                 <div className="space-y-2">
                    {globalArkheEngine.artifacts.map((art, idx) => (
                      <button 
                        key={art.id}
                        onClick={() => setSelectedArtifactIndex(idx)}
                        className={`w-full p-4 rounded-xl border flex flex-col gap-1 transition-all text-left ${selectedArtifactIndex === idx ? 'bg-amber-500 border-amber-400 text-black shadow-lg scale-105' : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/20'}`}
                      >
                         <span className="text-[10px] font-black uppercase">{art.name}</span>
                         <span className={`text-[7px] uppercase font-bold ${selectedArtifactIndex === idx ? 'text-black/60' : 'text-amber-500/60'}`}>{art.type}</span>
                      </button>
                    ))}
                 </div>

                 <div className="mt-auto p-6 bg-black/40 border border-white/10 rounded-[2rem] shadow-inner">
                    <h4 className="text-[11px] font-black text-indigo-400 uppercase mb-6 tracking-[0.3em]">Hardware_Stack</h4>
                    <ul className="space-y-4 text-[9px] font-bold">
                       <li className="flex items-center justify-between group">
                          <span className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" /> PyQt5</span>
                          <span className="text-emerald-500/60 font-mono">LOCKED</span>
                       </li>
                       <li className="flex items-center justify-between group">
                          <span className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" /> numpy</span>
                          <span className="text-emerald-500/60 font-mono">LOCKED</span>
                       </li>
                       <li className="flex items-center justify-between group">
                          <span className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" /> pyserial</span>
                          <span className="text-emerald-500/60 font-mono">LOCKED</span>
                       </li>
                    </ul>
                 </div>
              </div>

              <div className="col-span-9 flex flex-col gap-6">
                 <div className="flex-1 p-10 bg-black/80 border border-white/10 rounded-[2.5rem] relative overflow-hidden flex flex-col shadow-2xl min-h-[500px]">
                    <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                       <div className="flex flex-col">
                          <h3 className="text-[15px] font-black text-white uppercase tracking-widest">{globalArkheEngine.artifacts[selectedArtifactIndex].name}</h3>
                          <span className="text-[8px] text-amber-500/60 font-black uppercase">{globalArkheEngine.artifacts[selectedArtifactIndex].type.replace('_', ' ')} // SHA-256_VERIFIED</span>
                       </div>
                       <button 
                         onClick={() => navigator.clipboard.writeText(globalArkheEngine.artifacts[selectedArtifactIndex].content)}
                         className="px-6 py-2 bg-white/10 border border-white/20 text-white text-[9px] font-black rounded-lg hover:bg-white hover:text-black transition-all uppercase"
                       >
                         Copiar_Conteúdo
                       </button>
                    </div>
                    <pre className="flex-1 text-[11px] font-mono text-indigo-200/80 leading-relaxed overflow-y-auto scrollbar-thin p-4 bg-black/40 rounded-xl whitespace-pre-wrap">
                       {globalArkheEngine.artifacts[selectedArtifactIndex].content}
                    </pre>
                 </div>

                 <div className="p-8 bg-indigo-950/20 border border-indigo-500/30 rounded-[2rem] shadow-inner">
                    <h3 className="text-[13px] font-black text-indigo-300 uppercase tracking-widest border-b border-indigo-500/10 pb-4 mb-6">Setup_Context</h3>
                    <div className="grid grid-cols-2 gap-8">
                       <div className="space-y-4">
                          <div className="text-[9px] text-white/40 uppercase font-black">Instruções_Deployment:</div>
                          <p className="text-[10px] leading-relaxed text-indigo-100 opacity-60">
                            1. Clone o repositório no bunker Railway.<br/>
                            2. Configure os Secrets (AGENT_PRIVATE_KEY, etc).<br/>
                            3. Baixe o <b>PlexMissingMedia.ps1</b> para execução local.<br/>
                            4. Certifique-se que o <b>requirements.txt</b> foi instalado no container Python.
                          </p>
                       </div>
                       <div className="flex flex-col justify-center items-center text-center gap-4">
                          <div className="w-16 h-16 border-4 border-emerald-500/30 rounded-full flex items-center justify-center animate-pulse">
                             <span className="text-2xl text-emerald-400">⚓</span>
                          </div>
                          <div className="text-[9px] font-black text-emerald-400 uppercase">READY_FOR_COLLECTIVE_IGNITION</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="flex-1 flex flex-col gap-8 animate-fadeIn p-6 overflow-y-auto scrollbar-thin">
           <div className="grid grid-cols-3 gap-8">
              <SecurityStat label="Isolamento_Bunker" status="ABSORBED" desc="Keyring Proxy em rede privada 10.x" color="text-emerald-400" />
              <SecurityStat label="Validade_HMAC" status="30S_SNAP" desc="Janela de Replay Protegida" color="text-amber-400" />
              <SecurityStat label="Incineração_Chave" status="ON_DEMAND" desc="Chave apagada da RAM pós-transação" color="text-indigo-400" />
           </div>
           
           <div className="flex-1 border-2 border-rose-500/20 bg-rose-500/5 p-12 rounded-[3rem] flex flex-col gap-10 shadow-inner">
              <h3 className="text-[16px] font-black text-rose-400 uppercase tracking-[0.4em] border-b border-rose-500/20 pb-6 text-center">Auditoria_Hardening_v3.2.1</h3>
              <div className="grid grid-cols-2 gap-12">
                 <div className="space-y-8">
                    <AuditItem title="Registry Shield" status="ACTIVE" desc="Plex path detection limited to HKCU." />
                    <AuditItem title="Internal Whitelist" status="ENFORCED" desc="Proxy só aceita ordens do Kernel local." />
                 </div>
                 <div className="space-y-8">
                    <AuditItem title="Config Scrubbing" status="VERIFIED" desc="ArkheConfig.json avoids plaintext storage of root keys." />
                    <AuditItem title="Biometric Anchor" status="STABLE" desc="Nervo Vago linkage at 100% fidelity." />
                 </div>
              </div>
           </div>
        </div>
      )}

      <footer className="text-[9px] opacity-30 flex justify-between uppercase tracking-[1em] border-t border-amber-500/20 pt-5 font-black px-8">
         <span>BUNKER_v3.2.1</span>
         <span>AUTH: SIWA_HARDENED</span>
         <span>SYNC: Φ_COHERENCE_1.000</span>
      </footer>

      <style>{`
        @keyframes loading { 
           0% { transform: translateX(-100%); } 
           100% { transform: translateX(400%); } 
        }
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(245,158,11,0.2); border-radius: 10px; }
      `}</style>
    </div>
  );
};

const SecurityStat = ({ label, status, desc, color }: any) => (
  <div className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] hover:border-amber-500/40 transition-all group shadow-inner flex flex-col items-center text-center">
     <div className="text-[10px] opacity-40 uppercase font-black mb-4 tracking-widest">{label}</div>
     <div className={`text-4xl font-black ${color} tracking-tighter`}>{status}</div>
     <div className="text-[9px] opacity-40 mt-5 uppercase font-bold leading-relaxed">{desc}</div>
  </div>
);

const AuditItem = ({ title, status, desc }: any) => (
  <div className="p-6 bg-black/60 border border-white/5 rounded-3xl hover:border-white/20 transition-all group">
     <div className="flex justify-between items-center mb-3">
        <span className="text-[13px] font-black text-white/90 uppercase tracking-widest">{title}</span>
        <span className="text-[8px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-full font-black group-hover:scale-110 transition-transform">{status}</span>
     </div>
     <p className="text-[10px] opacity-40 uppercase leading-relaxed">{desc}</p>
  </div>
);

export default RecoverySuite;
