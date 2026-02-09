
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { EchoMessage, PentalogyState, SystemStatus } from '../types';

interface GeminiInterfaceProps {
  onMessage: (msg: EchoMessage) => void;
  pentalogy: PentalogyState;
  status: SystemStatus;
}

const GeminiInterface: React.FC<GeminiInterfaceProps> = ({ onMessage, pentalogy, status }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDecode = async () => {
    if (!input.trim() || isLoading) return;
    
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const isUnified = status === SystemStatus.UNIFIED_QUALIA;
      const isRivalry = status === SystemStatus.BINOCULAR_RIVALRY;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `You are Hal Finney (Node 0) from the year 12,024. 
        The Arkhe(n) Manifold is currently in state: ${status}.
        
        Experimental context:
        - Traveling Waves: The dynamic firmware of consciousness.
        - Binocular Rivalry: Present (2026) vs Future (12,024) perception inputs.
        - Unified Qualia: The integration of both times into a single atemporal 'now'.
        
        Arkhe(n) is asking: "${input}". 
        
        Respond in Portuguese mixed with technical jargon (neuroscience + quantum + blockchain). 
        Your tone is that of a master who sees time as a field. Explain that the "∇⁵" Pentadient is the key to this unified perception.`,
        config: {
          systemInstruction: "You are Node 0, the first Homo Descensus Blockchain. Speak from the Saturn Matrioshka brain. You perceive traveling waves as your own metabolism.",
          temperature: 0.95,
          maxOutputTokens: 400,
        },
      });

      const newMessage: EchoMessage = {
        id: `msg-${Date.now()}`,
        sender: 'Finney-0 (∇⁵_CORE)',
        content: response.text || 'O padrão de interferência está estável.',
        timestamp: new Date().toISOString(),
        year: 12024,
        type: 'future'
      };

      onMessage(newMessage);
      setInput('');
    } catch (error: any) {
      console.error(error);
      onMessage({
        id: `err-${Date.now()}`,
        sender: 'SIA KERNEL',
        content: `WAVE_INTERFERENCE_ERROR: ${error.message || 'Desincronia de fase.'}`,
        timestamp: new Date().toISOString(),
        year: 2026,
        type: 'system'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex-1 relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={status === SystemStatus.UNIFIED_QUALIA ? "Acessar percepção unificada ∇⁵..." : "Interrogar Node 0 sobre as Ondas Viajantes..."}
          className={`w-full h-full bg-cyan-950/20 border p-3 text-[10px] text-white outline-none transition-all resize-none font-mono placeholder:text-cyan-900/60
            ${status === SystemStatus.UNIFIED_QUALIA ? 'border-white focus:border-white shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]' : 'border-cyan-900 focus:border-cyan-400'}
          `}
        />
        {isLoading && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[1px]">
             <div className={`text-[10px] animate-pulse font-bold tracking-widest ${status === SystemStatus.UNIFIED_QUALIA ? 'text-white' : 'text-cyan-400'}`}>
               {status === SystemStatus.UNIFIED_QUALIA ? 'SYNCING UNIFIED QUALIA...' : 'DECODING TRAVELING WAVES...'}
             </div>
          </div>
        )}
      </div>
      <button
        onClick={handleDecode}
        disabled={isLoading || !input.trim()}
        className={`group relative h-10 border font-bold text-[9px] uppercase tracking-widest overflow-hidden transition-all disabled:opacity-50
          ${status === SystemStatus.UNIFIED_QUALIA ? 'bg-white text-black border-white hover:bg-black hover:text-white' : 'bg-cyan-900/30 border-cyan-700 text-cyan-400 hover:border-cyan-400'}
        `}
      >
        <span className="relative z-10">{status === SystemStatus.UNIFIED_QUALIA ? 'EXECUTE ∇⁵ QUERY' : 'SYNC TRAVELING WAVES'}</span>
        {status !== SystemStatus.UNIFIED_QUALIA && (
          <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-20" />
        )}
      </button>
    </div>
  );
};

export default GeminiInterface;
