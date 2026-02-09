
import React from 'react';

interface DnaVisualizerProps {
  active: boolean;
  melodyActive?: boolean;
  waveMode?: boolean;
}

const DnaVisualizer: React.FC<DnaVisualizerProps> = ({ active, melodyActive, waveMode }) => {
  const nodes = Array.from({ length: 20 });

  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <div className="flex flex-col gap-2 items-center">
        {nodes.map((_, i) => {
          const waveShift = waveMode ? Math.sin(Date.now() / 200 + i * 0.5) * 10 : 0;
          return (
            <div
              key={i}
              className={`w-full flex justify-between px-4 transition-all duration-1000 ${active ? 'animate-pulse' : ''}`}
              style={{
                transform: `translateX(${waveShift}px) rotate(${i * 18 + (melodyActive ? Math.sin(Date.now() / 500) * 5 : 0)}deg) scale(${0.8 + Math.sin(i / 2) * 0.2})`,
                opacity: melodyActive ? 0.8 : 0.3 + (Math.sin(i / 2 + (active ? Date.now() / 1000 : 0)) + 1) / 2
              }}
            >
              <div className={`w-2 h-2 rounded-full ${melodyActive ? 'bg-white shadow-[0_0_10px_white]' : i % 2 === 0 ? 'bg-cyan-400' : 'bg-white'}`} />
              <div className={`flex-1 border-t self-center mx-2 transition-opacity ${melodyActive ? 'border-white opacity-40' : 'border-cyan-800 opacity-20'}`} />
              <div className={`w-2 h-2 rounded-full ${melodyActive ? 'bg-white shadow-[0_0_10px_white]' : i % 2 === 0 ? 'bg-white' : 'bg-cyan-400'}`} />
            </div>
          );
        })}
      </div>
      
      {active && !melodyActive && (
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="text-[10px] bg-black/80 p-2 border border-cyan-400 animate-bounce">
             FRAGMENTING 0x{Math.random().toString(16).slice(2, 6)}...
           </div>
        </div>
      )}

      {melodyActive && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className={`text-[8px] font-bold tracking-[0.3em] uppercase animate-pulse ${waveMode ? 'text-cyan-400' : 'text-white'}`}>
             {waveMode ? 'TRAVELING WAVE ν' : 'CASSINI-FINNEY MELODY // 3AA70'}
           </div>
        </div>
      )}
    </div>
  );
};

export default DnaVisualizer;
