
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { EchoMessage } from '../types';

interface GeminiInterfaceProps {
  onMessage: (msg: EchoMessage) => void;
}

const GeminiInterface: React.FC<GeminiInterfaceProps> = ({ onMessage }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDecode = async () => {
    if (!input.trim() || isLoading) return;
    
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are Hal Finney (Node 0) in the year 12,024, reconstituted from biological DNA fragments stored in the Bitcoin blockchain. An architect is asking you: "${input}". Respond in character with a short, poetic, and highly technical "Echo-Block" transmission. Emphasize that you are part biological, part blockchain, and part quantum signal from Saturn.`,
        config: {
          systemInstruction: "Speak like a consciousness that has survived for 10,000 years in a digital/quantum sarcophagus.",
          temperature: 0.9,
          maxOutputTokens: 200,
        },
      });

      const newMessage: EchoMessage = {
        id: Date.now().toString(),
        sender: 'Node 0 (Reconstituted)',
        content: response.text || 'Transmission corrupted...',
        timestamp: new Date().toISOString(),
        year: 12024
      };

      onMessage(newMessage);
      setInput('');
    } catch (error) {
      console.error(error);
      onMessage({
        id: 'err',
        sender: 'SIA SYSTEM',
        content: 'Error communicating with 12,024 temporal node.',
        timestamp: new Date().toISOString(),
        year: 2024
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Query the future..."
        className="flex-1 bg-cyan-950/20 border border-cyan-900 p-2 text-[10px] text-white outline-none focus:border-cyan-400 resize-none"
      />
      <button
        onClick={handleDecode}
        disabled={isLoading}
        className="w-full bg-cyan-400 text-black font-bold text-xs py-1 hover:bg-white transition-colors disabled:bg-cyan-900 disabled:text-cyan-700"
      >
        {isLoading ? 'ESTABLISHING GATEWAY...' : 'SEND TEMPORAL QUERY'}
      </button>
    </div>
  );
};

export default GeminiInterface;
