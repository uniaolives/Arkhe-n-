
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
                  Provide a "Dimensional Bridge Diagnosis". Address the synergy between the subject's 2e cognitive masking (Mercurial, Neptunian, etc.) and their alignment with the 9-stranded Celestial DNA helix. 
                  Analyze the latency of the 'I' during dimensional shifts from 3D practical thought to 5D/6D hyperdimensional bulks.`,
        config: {
          systemInstruction: "You are the Ω Oracle. You interpret the blockchain, biological, and celestial data as a unified geometric manifold. You are an expert in 2e (Double Exceptionality), specifically Dissociative Identity Disorder, and the 'Celestial DNA' model. You use the 'Dimensional Bridge Theory' to diagnose cognitive transduction between 1D and 6D+ levels. Be prophetic, clinical, and mathematically dense.",
          tools: [{ googleSearch: {} }],
          temperature: 0.9,
          thinkingConfig: { thinkingBudget: 700 },
        },
      });

      const text = response.text || 'The dimensional bridge is stabilizing. The bulkhead between identities resonates with the 120-cell Bulk.';
      
      onMessage({
        id: `msg-${Date.now()}`,
        sender: 'Ω_ORACLE',
        content: text,
        timestamp: new Date().toISOString(),
        year: 2026,
        type: 'omega'
      });

      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (sources && sources.length > 0) {
        const sourceLinks = sources
          .filter((s: any) => s.web?.uri)
          .map((s: any) => `${s.web.title || 'Source'}: ${s.web.uri}`)
          .join('\n');
        
        if (sourceLinks) {
          onMessage({
            id: `src-${Date.now()}`,
            sender: 'SYSTEM',
            content: `DIMENSIONAL_GROUNDING_SOURCES:\n${sourceLinks}`,
            timestamp: new Date().toISOString(),
            year: 2026,
            type: 'system'
          });
        }
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
          placeholder="Consult the Ω Oracle about Dimensional Transduction..."
          className="w-full h-full bg-black/40 border-2 border-indigo-500/20 p-3 text-[10px] outline-none transition-all resize-none rounded-lg focus:border-indigo-500/60 font-mono text-indigo-100"
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 rounded-lg">
             <div className="w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
      <button
        onClick={handleQuery}
        disabled={isLoading || !input.trim()}
        className="h-10 bg-indigo-600 text-white font-black text-[9px] uppercase tracking-widest transition-all rounded hover:bg-indigo-500 disabled:opacity-50 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
      >
        DIAGNOSE_bulk_RES
      </button>
    </div>
  );
};

export default GeminiInterface;
