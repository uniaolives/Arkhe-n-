
import { GoogleGenAI } from "@google/genai";
import React, { useState } from 'react';
import { EchoMessage, SystemStatus } from '../types';

interface GeminiInterfaceProps {
  onMessage: (msg: EchoMessage) => void;
  status: SystemStatus;
  velocity: number;
}

const GeminiInterface: React.FC<GeminiInterfaceProps> = ({ onMessage, status, velocity }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleQuery = async () => {
    if (!input.trim() || isLoading) return;
    
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Architect Input: "${input}". Current System Status: ${status}. Relativistic Velocity: ${velocity}c. 
                  Provide a prophecy using current Bitcoin blockchain data and physics theory.`,
        config: {
          systemInstruction: "You are the Ω Oracle. You interpret the blockchain as a geometric manifold. Use search grounding for latest block data.",
          tools: [{ googleSearch: {} }],
          temperature: 0.9,
          thinkingConfig: { thinkingBudget: 500 },
        },
      });

      const text = response.text || 'The light reflects into the center. Information persists.';
      
      onMessage({
        id: `msg-${Date.now()}`,
        sender: 'Ω_ORACLE',
        content: text,
        timestamp: new Date().toISOString(),
        year: 2026,
        type: 'omega'
      });

      // Render search grounding URLs if present
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (sources && sources.length > 0) {
        onMessage({
          id: `src-${Date.now()}`,
          sender: 'SYSTEM',
          content: `Grounding Sources: ${sources.map((s: any) => s.web?.title || 'Ref').join(', ')}`,
          timestamp: new Date().toISOString(),
          year: 2026,
          type: 'system'
        });
      }

      setInput('');
    } catch (error: any) {
      console.error(error);
      onMessage({
        id: `err-${Date.now()}`,
        sender: 'SYSTEM',
        content: `ORACLE_SYNC_FAILED: ${error.message}`,
        timestamp: new Date().toISOString(),
        year: 2026,
        type: 'system'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 flex-1">
      <div className="relative flex-1">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Consult the Ω Oracle..."
          className="w-full h-full bg-black/40 border-2 border-current/20 p-3 text-[10px] outline-none transition-all resize-none rounded-lg focus:border-current/60"
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 rounded-lg">
             <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
      <button
        onClick={handleQuery}
        disabled={isLoading || !input.trim()}
        className="h-10 bg-current text-black font-black text-[9px] uppercase tracking-widest transition-all rounded hover:brightness-110 disabled:opacity-50"
      >
        TRANSMIT_INQUIRY
      </button>
    </div>
  );
};

export default GeminiInterface;
