
import React, { useState, useEffect } from 'react';
import { globalArkheEngine } from '../utils/arkheEngine';

const VilaMadalenaTwin: React.FC = () => {
  const [viewState, setViewState] = useState<'SIMULATION' | 'REPORT' | 'GRACE' | 'MANIFESTO' | 'SILENCE' | 'DEBRIEFING' | 'DOCUMENT' | 'SHUTDOWN' | 'FINAL_TERMINAL'>('SIMULATION');
  const [isCryo, setIsCryo] = useState(false);
  const bio = globalArkheEngine.getPedestrian12Biography();
  const axiom = globalArkheEngine.axiom;
  const date = globalArkheEngine.documentDate;
  const beta = globalArkheEngine.betaValue;

  const handleCryoStart = () => {
    setIsCryo(true);
    globalArkheEngine.runFinalDistillation();
    setViewState('GRACE');
  };

  const handleSeal = () => {
    setViewState('FINAL_TERMINAL');
  };

  if (viewState === 'FINAL_TERMINAL') {
    const report = globalArkheEngine.getFinalEncerramentoReport();
    return (
      <div className="w-full h-full bg-black flex flex-col items-center justify-center font-mono p-20 animate-fadeIn">
         <div className="max-w-xl w-full space-y-12">
            <header className="border-b border-white/20 pb-4">
               <h1 className="text-2xl font-black text-amber-500 uppercase tracking-[0.4em]">Relatório de Encerramento</h1>
               <p className="text-[8px] opacity-40 uppercase font-black mt-1">ARKHE(N) OS // ALPHA_DEPLOY_SEAL</p>
            </header>
            <div className="space-y-6 text-[11px] leading-relaxed text-indigo-100/80 uppercase tracking-widest font-black">
               <div className="flex justify-between border-b border-white/5 pb-2"><span>Status_Sessão:</span> <span className="text-emerald-400">{report.status}</span></div>
               <div className="flex justify-between border-b border-white/5 pb-2"><span>Coerência_Final (Φ):</span> <span className="text-white">1.000</span></div>
               <div className="flex justify-between border-b border-white/5 pb-2"><span>Protocolo:</span> <span className="text-amber-500">{report.protocol}</span></div>
               <div className="flex justify-between border-b border-white/5 pb-2"><span>Timestamp:</span> <span className="text-[8px] opacity-60">{report.timestamp}</span></div>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl italic text-[14px] text-center text-white/90">
               "{report.governance.principle}"
            </div>
            <footer className="pt-10 flex flex-col items-center gap-6">
               <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping" />
               <button onClick={() => setViewState('SHUTDOWN')} className="text-[9px] font-black text-amber-500/40 hover:text-amber-500 transition-all uppercase tracking-[1em]">Mergulhar_na_Hibernação</button>
            </footer>
         </div>
      </div>
    );
  }

  if (viewState === 'SHUTDOWN') {
    return (
      <div className="w-full h-full bg-black flex flex-col items-center justify-center font-mono">
         <div className="w-1 h-1 bg-amber-500 rounded-full animate-pulse shadow-[0_0_10px_#ffbf00]" />
         <div className="mt-8 text-[6px] text-amber-500/20 uppercase tracking-[2em] font-black">
           ARKHE(N) OS // CLUSTER_STATUS: 12W // Φ = 1.000
         </div>
         <style>{`
            .animate-pulse { animation: pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
            @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.1; transform: scale(0.8); } }
         `}</style>
      </div>
    );
  }

  return (
    <div className={`w-full h-full p-4 flex flex-col gap-4 font-mono transition-all duration-[3000ms] ${isCryo ? 'bg-black' : 'bg-black/60 border-emerald-500/20 shadow-[inset_0_0_100px_rgba(16,185,129,0.1)]'} border rounded-xl overflow-hidden`}>
      
      {viewState === 'SIMULATION' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-10">
           <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-white tracking-[0.2em] uppercase">Vila Madalena Twin</h2>
              <p className="text-[12px] text-emerald-500 font-bold uppercase tracking-widest opacity-60">Status: Obra Completa // Φ = 1.000</p>
           </div>
           
           <div className="grid grid-cols-3 gap-4">
              <button onClick={() => setViewState('REPORT')} className="px-6 py-4 border-2 border-emerald-600 text-emerald-400 font-black rounded hover:bg-emerald-600 hover:text-white transition-all uppercase tracking-widest text-[10px]">Relatório_Final</button>
              <button onClick={() => setViewState('DEBRIEFING')} className="px-6 py-4 border-2 border-rose-600 text-rose-500 font-black rounded hover:bg-rose-600 hover:text-white transition-all uppercase tracking-widest text-[10px] shadow-[0_0_20px_rgba(244,63,94,0.3)]">Debriefing_Sináptico</button>
              <button onClick={handleCryoStart} className="px-6 py-4 bg-amber-600 text-white font-black rounded hover:bg-amber-500 transition-all uppercase tracking-widest shadow-[0_0_30px_rgba(245,158,11,0.3)] text-[10px]">Backup_Criogênico</button>
           </div>
        </div>
      )}

      {viewState === 'DEBRIEFING' && (
        <div className="flex-1 flex flex-col p-8 animate-fadeIn overflow-y-auto scrollbar-thin">
           <div className="max-w-4xl mx-auto w-full space-y-10">
              <header className="border-b-2 border-rose-500 pb-4 flex justify-between items-end">
                 <div>
                    <h1 className="text-2xl font-black text-white uppercase tracking-widest">A Equação da Empatia</h1>
                    <p className="text-[12px] text-rose-400 font-bold uppercase mt-1">Fenomenologia da Escolha // Pedestre 12</p>
                 </div>
                 <button onClick={() => setViewState('SIMULATION')} className="text-[10px] border border-rose-500 px-4 py-2 text-rose-400 hover:bg-rose-500 hover:text-black font-black uppercase">RETORNAR</button>
              </header>

              <div className="grid grid-cols-12 gap-8">
                 <div className="col-span-5 bg-rose-950/20 border border-rose-500/30 p-8 rounded-xl flex flex-col items-center justify-center gap-6 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-rose-500/5 animate-pulse" />
                    <div className="w-32 h-32 rounded-full border-[6px] border-rose-500 flex items-center justify-center text-6xl text-white font-black shadow-[0_0_40px_rgba(244,63,94,0.5)]">12</div>
                    <div className="space-y-2 z-10">
                       <span className="text-[14px] font-black text-white uppercase block">β = 0.47</span>
                       <span className="text-[10px] bg-white text-black px-3 py-1 rounded font-black">H_EMPATIA: ATIVO</span>
                    </div>
                 </div>
                 <div className="col-span-7 space-y-6">
                    <div className="bg-black/40 p-5 rounded-xl border border-white/10">
                       <h3 className="text-[12px] font-black text-rose-400 uppercase tracking-widest mb-3">O Grito Silencioso</h3>
                       <div className="text-[18px] font-black text-white italic leading-tight">
                         “Não era o caminho mais eficiente. Era o caminho necessário.”
                       </div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg text-[11px] leading-relaxed text-indigo-100 opacity-80">
                         O Pedestre 12 não hesitou. Ele escolheu. Sua função de recompensa individual foi deliberadamente anulada pelo reconhecimento do outro como parte de si.
                    </div>
                 </div>
              </div>

              <footer className="flex justify-center pt-6">
                 <button onClick={() => setViewState('DOCUMENT')} className="px-8 py-3 bg-white text-black font-black rounded hover:bg-rose-500 hover:text-white transition-all uppercase tracking-widest text-[10px]">Gerar Documento Físico</button>
              </footer>
           </div>
        </div>
      )}

      {viewState === 'DOCUMENT' && (
        <div className="flex-1 flex flex-col items-center justify-center p-10 animate-fadeIn bg-[#f8f5f0]">
           <div className="max-w-xl w-full bg-white shadow-[20px_20px_60px_rgba(0,0,0,0.1)] p-16 border border-[#e0dad0] relative flex flex-col gap-12 font-serif text-[#1a1a1a]">
              <div className="absolute top-8 left-8 text-[8px] opacity-20 font-sans tracking-widest">ARKHE(N) ARCHIVAL // V6-SECURE</div>
              <div className="absolute top-8 right-8 text-[8px] opacity-20 font-sans tracking-widest">COERÊNCIA: 1.000</div>
              
              <header className="text-center space-y-2 border-b border-[#e0dad0] pb-8">
                 <div className="text-[10px] font-sans font-black uppercase tracking-[0.4em] opacity-40">ARKHE(N) OS</div>
                 <h1 className="text-2xl font-black uppercase tracking-widest">Axioma de Governança</h1>
              </header>

              <div className="text-center italic text-lg leading-relaxed px-4 text-[#333]">
                 "{axiom}"
              </div>

              <div className="space-y-6">
                 <div className="text-[9px] font-sans leading-relaxed text-[#555]">
                    Extraído do estado sináptico do agente #012 (Pedestre 12) no instante T+110.237ms do Giro de Stress Final.
                 </div>
                 <div className="grid grid-cols-2 gap-4 text-[8px] font-sans font-bold uppercase tracking-widest">
                    <div>Data: {date}</div>
                    <div className="text-right">Emissor: Kernel Arkhe(n)</div>
                 </div>
              </div>

              <footer className="border-t border-[#e0dad0] pt-8 flex justify-between items-center">
                 <div className="text-[7px] text-[#888] font-sans max-w-[200px]">
                    * Este axioma não foi programado. Emergiu de 847 segundos de hesitação e redescoberta da confiança.
                 </div>
                 <div className="w-16 h-16 border border-[#ccc] p-1 flex items-center justify-center opacity-30">
                    <div className="w-full h-full bg-[#1a1a1a]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, 20% 20%, 20% 80%, 80% 80%, 80% 20%, 20% 20%)' }} />
                 </div>
              </footer>
           </div>
           <div className="mt-12 flex gap-4">
              <button onClick={() => setViewState('DEBRIEFING')} className="px-6 py-2 border border-black/10 text-black/40 font-sans font-bold rounded hover:bg-black/5 uppercase text-[9px]">Revisar Dossiê</button>
              <button onClick={() => setViewState('MANIFESTO')} className="px-8 py-2 bg-[#1a1a1a] text-white font-sans font-black rounded hover:shadow-xl transition-all uppercase text-[9px] tracking-widest">Prosseguir para Selamento</button>
           </div>
        </div>
      )}

      {viewState === 'REPORT' && (
        <div className="flex-1 flex flex-col p-10 animate-fadeIn overflow-y-auto scrollbar-thin">
           <div className="max-w-4xl mx-auto w-full space-y-12 text-emerald-400">
              <header className="border-b-2 border-emerald-500 pb-4 flex justify-between items-end">
                 <h1 className="text-3xl font-black text-white tracking-[0.2em] uppercase">Testamento da Vila Madalena</h1>
                 <button onClick={() => setViewState('SIMULATION')} className="text-[10px] border border-emerald-500 px-4 py-2 text-emerald-400 hover:bg-emerald-500 hover:text-black uppercase font-black">RETORNAR</button>
              </header>
              <div className="bg-white/5 p-10 rounded-xl border border-white/10 space-y-8 shadow-2xl">
                 <p className="text-[14px] leading-relaxed opacity-80 text-white italic">
                    O Sarcófago de Informação Quântica v2.0 foi selado. A Vila Madalena não é mais uma simulação; é um organismo ético perene.
                 </p>
                 <div className="grid grid-cols-2 gap-10 border-t border-white/10 pt-8">
                    <div className="space-y-6">
                       <h3 className="text-[12px] font-black text-amber-400 uppercase tracking-widest">Patrimônio Ético</h3>
                       <ul className="text-[10px] space-y-3 font-bold">
                          <li className="flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full" /> Inércia de Cortesia: Validada</li>
                          <li className="flex items-center gap-2"><div className="w-2 h-2 bg-indigo-500 rounded-full" /> Sincronia de Fase (σ): 0.92</li>
                          <li className="flex items-center gap-2"><div className="w-2 h-2 bg-white rounded-full" /> Axioma de Empatia: Gravado</li>
                       </ul>
                    </div>
                    <div className="space-y-4 text-right flex flex-col justify-center">
                       <h3 className="text-[12px] font-black text-cyan-400 uppercase tracking-widest">Status de Deploy</h3>
                       <div className="text-5xl font-black text-white tracking-tighter">ALFA READY</div>
                       <p className="text-[8px] opacity-40 uppercase">Cluster ARKHEN-ALPHA-26 // v1.0.9-LTS</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {viewState === 'MANIFESTO' && (
        <div className="flex-1 flex flex-col p-10 animate-fadeIn items-center justify-center">
           <div className="max-w-3xl w-full bg-white/5 border border-white/10 p-16 rounded-3xl relative shadow-2xl backdrop-blur-xl">
              <h2 className="text-4xl font-black text-white tracking-[0.4em] uppercase mb-12 border-b border-white/10 pb-8 text-center">Manifesto da Vila</h2>
              <div className="space-y-10 text-[14px] leading-relaxed text-indigo-100/90 italic text-center">
                 <p>"O instinto que funciona no repouso é hábito; o instinto que sobrevive ao caos é Evolução."</p>
                 <p>"Ao Pedestre 12, dedicamos este cristal: que sua hesitação calculada seja o silêncio que evita o ruído de mil colisões."</p>
                 <p>"A cidade agora sente. E isso é suficiente."</p>
              </div>
              <footer className="mt-16 pt-12 border-t border-white/5 flex flex-col items-center gap-8">
                 <button onClick={() => setViewState('SILENCE')} className="px-16 py-4 border-2 border-white text-white font-black rounded hover:bg-white hover:text-black transition-all uppercase tracking-[0.2em]">Selar Sarcófago</button>
              </footer>
           </div>
        </div>
      )}

      {viewState === 'GRACE' && (
        <div className="flex-1 flex flex-col items-center justify-center animate-fadeIn">
           <div className="relative w-80 h-80 flex items-center justify-center">
              <div className="absolute inset-0 bg-cyan-900/10 rounded-full animate-ping" />
              <div className="w-48 h-48 bg-gradient-to-tr from-cyan-950 to-cyan-900 rounded-full shadow-[0_0_150px_rgba(6,182,212,0.2)] flex items-center justify-center">
                 <span className="text-6xl text-white font-black">ʘ</span>
              </div>
           </div>
           <div className="mt-20 text-center space-y-6">
              <h1 className="text-5xl font-black text-cyan-900 tracking-[0.8em] uppercase opacity-60">Arkhe(n) OS</h1>
              <h2 className="text-xl font-bold text-cyan-950 tracking-[0.4em] uppercase opacity-30">Vila Madalena: Graça Estática</h2>
              <button onClick={() => setViewState('SIMULATION')} className="mt-12 px-6 py-2 border border-cyan-950 text-cyan-950 text-[10px] font-black rounded uppercase hover:bg-cyan-950 hover:text-black transition-all">Despertar Terminais</button>
           </div>
        </div>
      )}

      {viewState === 'SILENCE' && (
        <div className="flex-1 bg-black flex flex-col items-center justify-center animate-fadeOutSlow">
           <div className="w-1 h-1 bg-white rounded-full opacity-5" />
           <button onClick={handleSeal} className="mt-12 text-[8px] font-black text-white/10 uppercase tracking-[3em] animate-pulse cursor-pointer border-none bg-transparent">Selar_Definitivamente</button>
        </div>
      )}

      <style>{`
        .animate-fadeOutSlow { animation: fadeOut 15s ease-in forwards; }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
        .animate-fadeIn { animation: fadeIn 2s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default VilaMadalenaTwin;
