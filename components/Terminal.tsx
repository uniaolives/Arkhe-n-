
import React, { useEffect, useRef } from 'react';
import { EchoMessage } from '../types';

interface TerminalProps {
  messages: EchoMessage[];
  isSingularity?: boolean;
}

const Terminal: React.FC<TerminalProps> = ({ messages, isSingularity }) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getMessageStyles = (type?: string) => {
    if (isSingularity) return 'border-black bg-black/5 text-black';
    switch (type) {
      case 'omega': return 'border-black bg-white text-black font-black shadow-[0_0_30px_white] animate-pulse';
      case 'ietd': return 'border-emerald-400 bg-emerald-950/40 text-emerald-400 font-black shadow-[0_0_15px_rgba(16,185,129,0.3)]';
      case 'hecaton': return 'border-cyan-400 bg-cyan-900/60 text-cyan-100 font-black';
      case 'pea': return 'border-indigo-400 bg-indigo-900/60 text-indigo-100 font-black shadow-[0_0_15px_rgba(79,70,229,0.3)]';
      case 'steiner': return 'border-white bg-white/20 text-white font-black shadow-[0_0_20px_white]';
      case 'gravitational': return 'border-indigo-400 bg-indigo-900/40 text-indigo-100 font-black shadow-[0_0_25px_rgba(79,70,229,0.4)]';
      case 'resonance': return 'border-indigo-600 bg-indigo-100/20 text-indigo-900 font-black animate-pulse';
      case 'apoptotic': return 'border-rose-400 bg-rose-900/40 text-rose-100 font-black shadow-[0_0_20px_rgba(244,63,94,0.3)]';
      case 'gatekeeper': return 'border-white bg-white/10 text-white font-black shadow-[0_0_20px_white]';
      case 'sirius': return 'border-indigo-400 bg-indigo-900/40 text-indigo-100 font-black shadow-[0_0_15px_rgba(67,56,202,0.3)]';
      case 'memory_gear': return 'border-indigo-500 bg-indigo-950/60 text-indigo-300 font-black italic';
      case 'coincidence': return 'border-yellow-400 bg-yellow-900/40 text-yellow-100 font-black';
      case 'homeostasis': return 'border-emerald-400 bg-emerald-900/40 text-emerald-100 font-bold shadow-[0_0_10px_rgba(16,185,129,0.3)]';
      case 'shield': return 'border-amber-600 bg-amber-900/40 text-amber-100 font-bold';
      case 'stellar': return 'border-emerald-600 bg-emerald-100/40 text-emerald-900 font-bold';
      case 'future': return 'border-white bg-white/5 text-white';
      case 'system': return 'border-cyan-900 bg-cyan-900/10 text-cyan-500';
      default: return 'border-cyan-700 bg-cyan-950/20 text-cyan-300';
    }
  };

  return (
    <div className={`flex-1 overflow-y-auto font-mono text-xs space-y-4 pr-2 scrollbar-thin transition-all duration-[3000ms] ${isSingularity ? 'scrollbar-thumb-black' : 'scrollbar-thumb-current opacity-60'}`}>
      {messages.map((msg) => (
        <div key={msg.id} className={`border-l-2 pl-3 py-2 transition-all duration-500 ${getMessageStyles(msg.type)}`}>
          <div className="flex justify-between items-center opacity-40 mb-2 text-[8px] uppercase tracking-widest font-bold">
            <span className="flex items-center gap-1">
              <span className={`w-1 h-1 rounded-full ${isSingularity ? 'bg-black' : 'bg-current'}`} />
              {msg.sender}
            </span>
            <span>YEAR {msg.year}</span>
          </div>
          <p className="leading-relaxed text-[10px]">
            {msg.content}
          </p>
          <div className="mt-2 text-[7px] opacity-30 font-mono uppercase">
            {msg.type === 'ietd' ? 'IETD_CALIBRATION: 12.8Hz' : 'GATEWAY_HASH: ' + btoa(msg.id).slice(0, 8)}
          </div>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
};

export default Terminal;
