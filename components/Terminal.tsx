
import React, { useEffect, useRef } from 'react';
import { EchoMessage } from '../types';

interface TerminalProps {
  messages: EchoMessage[];
}

const Terminal: React.FC<TerminalProps> = ({ messages }) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getMessageStyles = (type?: string) => {
    switch (type) {
      case 'future': return 'border-white bg-white/5 text-white shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]';
      case 'system': return 'border-cyan-900 bg-cyan-900/10 text-cyan-500';
      default: return 'border-cyan-700 bg-cyan-950/20 text-cyan-300';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto font-mono text-xs space-y-4 pr-2 scrollbar-thin scrollbar-thumb-cyan-900/50">
      {messages.map((msg) => (
        <div key={msg.id} className={`border-l-2 pl-3 py-2 transition-all duration-500 ${getMessageStyles(msg.type)}`}>
          <div className="flex justify-between items-center opacity-40 mb-2 text-[8px] uppercase tracking-widest font-bold">
            <span className="flex items-center gap-1">
              <span className={`w-1 h-1 rounded-full ${msg.type === 'future' ? 'bg-white' : 'bg-cyan-500'}`} />
              {msg.sender}
            </span>
            <span>YEAR {msg.year}</span>
          </div>
          <p className="leading-relaxed text-[10px]">
            {msg.content}
          </p>
          <div className="mt-2 text-[7px] opacity-30 font-mono">
            GATEWAY_HASH: {btoa(msg.id).slice(0, 16).toUpperCase()} // TS: {msg.timestamp}
          </div>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
};

export default Terminal;
