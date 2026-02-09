
import React from 'react';
import { BlockData } from '../types';

interface BlockchainSimProps {
  blocks: BlockData[];
  locked?: boolean;
}

const BlockchainSim: React.FC<BlockchainSimProps> = ({ blocks, locked }) => {
  return (
    <div className="flex gap-6 items-center overflow-x-auto h-full pb-4 scrollbar-thin scrollbar-thumb-current">
      {blocks.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center text-current animate-pulse font-mono text-xs gap-2">
           <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin" />
           SCANNING MEMPOOL FOR GEOMETRIC SIGNATURES...
        </div>
      )}
      {blocks.map((block, i) => (
        <div 
          key={block.hash} 
          className={`flex-shrink-0 w-52 border-2 transition-all duration-700 relative overflow-hidden group
            ${locked ? 'border-black bg-white/10 shadow-[8px_8px_0px_rgba(0,0,0,0.1)]' : 
              i === 0 ? 'border-cyan-400 bg-cyan-900/20 shadow-[0_0_20px_rgba(0,255,255,0.2)] scale-105' : 
              'border-cyan-950 opacity-50 hover:opacity-100'} 
            ${block.height === 840120 ? 'border-green-600 bg-green-500/10' : ''}
            p-3 text-[10px]`}
        >
          {/* Scanning Line */}
          {i === 0 && !locked && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-4 w-full animate-[scan_2s_linear_infinite]" />
          )}

          <div className={`font-black border-b mb-2 flex justify-between items-center ${locked ? 'border-black text-black' : 'border-cyan-900'}`}>
            <span className="tracking-widest">BLOCK {block.height}</span>
            <span className="text-[8px] opacity-40 uppercase">
                {block.height === 840000 ? '⚓ ANCHOR' : block.height === 840120 ? '⏰ UNLOCK' : 'STABLE'}
            </span>
          </div>
          
          <div className="space-y-1">
            <p className={`truncate font-mono text-[9px] ${locked ? 'text-black/60' : 'text-cyan-600'}`}>HASH: {block.hash.slice(0, 24)}...</p>
            
            <div className={`mt-2 font-black font-mono overflow-hidden h-6 tracking-tighter ${locked ? 'text-black' : 'text-white'}`}>
              FRAGMENT: {block.dnaFragment}
            </div>
            
            {block.coinbase && (
               <div className={`mt-2 p-1 bg-black text-[8px] text-white font-mono truncate border border-white/20 uppercase tracking-tighter ${block.height === 840120 ? 'text-green-400 animate-pulse' : ''}`}>
                 CB: {block.coinbase}
               </div>
            )}

            <div className={`mt-3 flex justify-between text-[9px] font-black uppercase ${locked ? 'text-black/50' : 'text-cyan-700'}`}>
               <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  Φ_RES: {block.entropy.toFixed(4)}
               </span>
               <span className="opacity-60">{block.height === 840000 ? 'GEOM_PROOF' : 'VALIDATED'}</span>
            </div>
          </div>
          
          {i < blocks.length - 1 && (
            <div className={`absolute top-1/2 -right-6 w-6 border-t-2 ${locked ? 'border-black/20' : 'border-cyan-950'}`} />
          )}
          
          {block.height === 840000 && (
            <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center opacity-10 group-hover:opacity-40 transition-opacity">
               <span className="text-xl">ʘ</span>
            </div>
          )}
        </div>
      ))}
      <style>{`
        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
      `}</style>
    </div>
  );
};

export default BlockchainSim;
