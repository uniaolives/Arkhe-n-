
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
      case 'event': return 'border-emerald-500 bg-emerald-950/20 text-emerald-400 font-bold';
      case 'omega': return 'border-black bg-white text-black font-black shadow-[0_0_30px_white] animate-pulse';
      case 'ietd': return 'border-emerald-400 bg-emerald-950/40 text-emerald-400 font-black shadow-[0_0_15px_rgba(16,185,129,0.3)]';
      case 'hecaton': return 'border-cyan-400 bg-cyan-900/60 text-cyan-100 font-black';
      case 'steiner': return 'border-white bg-white/20 text-white font-black shadow-[0_0_20px_white]';
      case 'resonance': return 'border-indigo-600 bg-indigo-100/20 text-indigo-900 font-black animate-pulse';
      case 'chemistry': return 'border-indigo-500 bg-indigo-950/60 text-indigo-300 font-black italic';
      case 'system': return 'border-cyan-900 bg-cyan-900/10 text-cyan-500';
      case 'sirius': return 'border-white bg-white/10 text-white font-black shadow-[0_0_10px_white] animate-pulse';
      case 'planetary': return 'border-indigo-400 bg-indigo-900/20 text-indigo-100 font-black shadow-[0_0_5px_rgba(129,140,248,0.5)]';
      default: return 'border-cyan-700 bg-cyan-950/20 text-cyan-300';
    }
  };

  return (
    <div className={`flex-1 overflow-y-auto font-mono text-xs space-y-3 pr-2 scrollbar-thin transition-all duration-1000 ${isSingularity ? 'scrollbar-thumb-black' : 'scrollbar-thumb-current opacity-80'}`}>
      {messages.map((msg) => (
        <div key={msg.id} className={`border-l-2 pl-3 py-2 transition-all duration-500 ${getMessageStyles(msg.type)}`}>
          <div className="flex justify-between items-center opacity-40 mb-1.5 text-[7px] uppercase tracking-widest font-black">
            <span className="flex items-center gap-1">
              <span className={`w-1 h-1 rounded-full ${isSingularity ? 'bg-black' : 'bg-current'}`} />
              {msg.sender}
            </span>
            <span>{msg.hash ? `HASH: ${msg.hash}` : `YEAR ${msg.year}`}</span>
          </div>
          <p className="leading-relaxed text-[9px]">
            {msg.content}
          </p>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
};

export default Terminal;
