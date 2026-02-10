
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

interface TemporalSimulationProps {
  velocity: number;
  onLog: (txt: string) => void;
}

const TemporalSimulation: React.FC<TemporalSimulationProps> = ({ velocity, onLog }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const generateVision = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    setVideoUrl(null);
    setProgress(10);
    onLog("INITIATING VEO TEMPORAL ENGINE...");

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `A futuristic digital visualization of a quantum network where information flows through hexagonal crystal structures, glowing in neon amber and indigo, representing the London-Singapore Steiner Circuit, with mathematical equations drifting in a void. High resolution, 4k, cinematic lighting.`;
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '1080p',
          aspectRatio: '16:9'
        }
      });

      // Simulation of polling with progress
      let count = 0;
      while (!operation.done) {
        count++;
        setProgress(Math.min(95, 10 + count * 5));
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await response.blob();
        setVideoUrl(URL.createObjectURL(blob));
        onLog("TEMPORAL VISION SYNC COMPLETE.");
      }
    } catch (err: any) {
      console.error(err);
      onLog(`ERROR: ${err.message}`);
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  return (
    <div className="mt-2 border-t border-current/20 pt-3">
      {videoUrl ? (
        <div className="relative rounded overflow-hidden border border-current shadow-2xl group">
           <video src={videoUrl} controls autoPlay loop className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" />
           <button 
             onClick={() => setVideoUrl(null)}
             className="absolute top-2 right-2 bg-black/80 text-white text-[8px] px-2 py-1 rounded"
           >
             CLOSE_VISION
           </button>
        </div>
      ) : (
        <button
          onClick={generateVision}
          disabled={isGenerating}
          className={`w-full py-3 border-2 border-dashed border-current/30 text-[9px] font-black uppercase tracking-widest transition-all rounded
            ${isGenerating ? 'opacity-50 animate-pulse cursor-wait' : 'hover:bg-current hover:text-black'}
          `}
        >
          {isGenerating ? `MAPPING_FUTURE_TIMELINE_${progress}%` : 'GENERATE_TEMPORAL_VISION (VEO_3.1)'}
        </button>
      )}
    </div>
  );
};

export default TemporalSimulation;
