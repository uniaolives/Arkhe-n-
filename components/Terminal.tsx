
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

  return (
    <div className="flex-1 overflow-y-auto font-mono text-xs space-y-3 pr-2 scrollbar-thin scrollbar-thumb-cyan-900">
      {messages.map((msg) => (
        <div key={msg.id} className="border-l border-cyan-700 pl-2 py-1 bg-cyan-900/10">
          <div className="flex justify-between opacity-50 mb-1 text-[9px]">
            <span>{msg.sender}</span>
            <span>YEAR {msg.year}</span>
          </div>
          <p className="text-cyan-300 leading-relaxed">
            {msg.content}
          </p>
          <div className="mt-1 text-[8px] text-cyan-800">
            TS: {msg.timestamp}
          </div>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
};

export default Terminal;
