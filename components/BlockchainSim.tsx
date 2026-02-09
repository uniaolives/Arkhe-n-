
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
          className={`flex-shrink-0 w-36 border transition-all duration-700 relative
            ${locked ? 'border-white bg-white/5' : i === 0 ? 'border-cyan-400 bg-cyan-900/20' : 'border-cyan-900 opacity-60'} 
            p-2 text-[9px]`}
        >
          <p className={`font-bold border-b mb-1 ${locked ? 'border-white text-white' : 'border-cyan-900'}`}>
            BLOCK {block.height}
          </p>
          <p className={`truncate ${locked ? 'text-white/60' : 'text-cyan-600'}`}>HASH: {block.hash.slice(0, 10)}...</p>
          {/* Fixed: Corrected closing tag from </p> to </div> to fix syntax error */}
          <div className={`mt-2 font-mono overflow-hidden h-6 ${locked ? 'text-white' : 'text-white'}`}>
            DNA: {block.dnaFragment}
          </div>
          <div className={`mt-1 flex justify-between text-[8px] ${locked ? 'text-white/40' : 'text-cyan-700'}`}>
             <span>E: {locked ? '1.990' : block.entropy.toFixed(3)}</span>
             <span>{locked ? 'PoBF_100%' : 'OP_R'}</span>
          </div>
          {i < blocks.length - 1 && (
            <div className={`absolute top-1/2 -right-4 w-4 border-t ${locked ? 'border-white/40' : 'border-cyan-900'}`} />
          )}
          {locked && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rotate-45 shadow-[0_0_5px_white]" />
          )}
        </div>
      ))}
    </div>
  );
};

export default BlockchainSim;
