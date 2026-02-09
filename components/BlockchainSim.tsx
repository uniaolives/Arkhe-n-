
import React from 'react';
import { BlockData } from '../types';

interface BlockchainSimProps {
  blocks: BlockData[];
}

const BlockchainSim: React.FC<BlockchainSimProps> = ({ blocks }) => {
  return (
    <div className="flex gap-4 items-center overflow-x-auto h-full pb-2">
      {blocks.length === 0 && (
        <div className="flex-1 flex items-center justify-center text-cyan-900 animate-pulse">
           SCANNING MEMPOOL FOR BIOLOGICAL SIGNATURES...
        </div>
      )}
      {blocks.map((block, i) => (
        <div 
          key={block.hash} 
          className={`flex-shrink-0 w-32 border ${i === 0 ? 'border-cyan-400 bg-cyan-900/20' : 'border-cyan-900 opacity-60'} p-2 text-[9px] relative transition-all duration-500`}
        >
          <p className="font-bold border-b border-cyan-900 mb-1">BLOCK {block.height}</p>
          <p className="truncate text-cyan-600">HASH: {block.hash.slice(0, 10)}...</p>
          <div className="mt-2 text-white overflow-hidden h-6">
            DNA: {block.dnaFragment}
          </div>
          <div className="mt-1 flex justify-between text-[8px] text-cyan-700">
             <span>E: {block.entropy.toFixed(3)}</span>
             <span>OP_R</span>
          </div>
          {i < blocks.length - 1 && (
            <div className="absolute top-1/2 -right-4 w-4 border-t border-cyan-900" />
          )}
        </div>
      ))}
    </div>
  );
};

export default BlockchainSim;
