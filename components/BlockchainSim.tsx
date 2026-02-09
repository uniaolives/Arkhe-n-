
import React from 'react';
import { BlockData } from '../types';

interface BlockchainSimProps {
  blocks: BlockData[];
  locked?: boolean;
}

const BlockchainSim: React.FC<BlockchainSimProps> = ({ blocks, locked }) => {
  return (
    <div className="flex gap-4 items-center overflow-x-auto h-full pb-2 scrollbar-thin scrollbar-thumb-cyan-900">
      {blocks.length === 0 && (
        <div className="flex-1 flex items-center justify-center text-cyan-900 animate-pulse font-mono text-xs">
           SCANNING MEMPOOL FOR BIOLOGICAL SIGNATURES...
        </div>
      )}
      {blocks.map((block, i) => (
        <div 
          key={block.hash} 
          className={`flex-shrink-0 w-48 border transition-all duration-700 relative
            ${locked ? 'border-black bg-white/10 shadow-[0_0_15px_rgba(0,0,0,0.1)]' : i === 0 ? 'border-cyan-400 bg-cyan-900/20' : 'border-cyan-900 opacity-60'} 
            p-2 text-[9px]`}
        >
          <p className={`font-bold border-b mb-1 ${locked ? 'border-black text-black' : 'border-cyan-900'}`}>
            BLOCK {block.height} {block.height === 840000 && ' // ANCHOR'}
          </p>
          <p className={`truncate font-mono ${locked ? 'text-black/60' : 'text-cyan-600'}`}>HASH: {block.hash.slice(0, 16)}...</p>
          
          <div className={`mt-2 font-mono overflow-hidden h-6 ${locked ? 'text-black font-bold' : 'text-white'}`}>
            DNA: {block.dnaFragment}
          </div>
          
          {block.coinbase && (
             <div className="mt-1 p-1 bg-black text-[7px] text-white font-mono truncate">
               CB: {block.coinbase}
             </div>
          )}

          <div className={`mt-1 flex justify-between text-[8px] ${locked ? 'text-black/40' : 'text-cyan-700'}`}>
             <span>E: {block.entropy.toFixed(3)}</span>
             <span>{block.height === 840000 ? 'ARKHE_ANCHOR' : 'PoBF_100%'}</span>
          </div>
          
          {i < blocks.length - 1 && (
            <div className={`absolute top-1/2 -right-4 w-4 border-t ${locked ? 'border-black/40' : 'border-cyan-900'}`} />
          )}
          {locked && block.height === 840000 && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-black rotate-45 shadow-[0_0_10px_black]" />
          )}
        </div>
      ))}
    </div>
  );
};

export default BlockchainSim;
