
import React from 'react';

interface DnaVisualizerProps {
  active: boolean;
}

const DnaVisualizer: React.FC<DnaVisualizerProps> = ({ active }) => {
  const nodes = Array.from({ length: 20 });

  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <div className="flex flex-col gap-2 items-center">
        {nodes.map((_, i) => (
          <div
            key={i}
            className={`w-full flex justify-between px-4 transition-all duration-1000 ${active ? 'animate-pulse' : ''}`}
            style={{
              transform: `rotate(${i * 18}deg) scale(${0.8 + Math.sin(i / 2) * 0.2})`,
              opacity: 0.3 + (Math.sin(i / 2 + (active ? Date.now() / 1000 : 0)) + 1) / 2
            }}
          >
            <div className={`w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-cyan-400' : 'bg-white'}`} />
            <div className="flex-1 border-t border-cyan-800 self-center mx-2 opacity-20" />
            <div className={`w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-white' : 'bg-cyan-400'}`} />
          </div>
        ))}
      </div>
      
      {active && (
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="text-[10px] bg-black/80 p-2 border border-cyan-400 animate-bounce">
             FRAGMENTING 0x{Math.random().toString(16).slice(2, 6)}...
           </div>
        </div>
      )}
    </div>
  );
};

export default DnaVisualizer;
