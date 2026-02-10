
import React, { useRef, useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { KNNPattern, KNNSuggestion, KNNInsights } from '../types';
import { globalKnnEngine } from '../utils/knnEngine';

interface FacialBiofeedbackProps {
  onVerbalTrigger: (text: string) => void;
  onPatternLearned: (pattern: KNNPattern) => void;
  memory: KNNPattern[];
  isActive: boolean;
}

const FacialBiofeedback: React.FC<FacialBiofeedbackProps> = ({ onVerbalTrigger, onPatternLearned, memory, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clusterCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<string>('NEUTRAL');
  const [knnResult, setKnnResult] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<KNNSuggestion[]>([]);
  const [insights, setInsights] = useState<KNNInsights | null>(null);
  const [valence, setValence] = useState(0);
  const [arousal, setArousal] = useState(0);

  useEffect(() => {
    if (isActive) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [isActive]);

  useEffect(() => {
    drawClusters();
    setInsights(globalKnnEngine.getInsights());
  }, [memory, valence, arousal]);

  const drawClusters = () => {
    const canvas = clusterCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = canvas.width / 2.5;

    // Grid
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
    ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(0, centerY); ctx.lineTo(canvas.width, centerY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(centerX, 0); ctx.lineTo(centerX, canvas.height); ctx.stroke();

    // Memory Patterns
    memory.forEach(p => {
      ctx.fillStyle = p.emotion === 'HAPPY' ? '#10b981' : p.emotion === 'SAD' ? '#3b82f6' : '#f43f5e';
      ctx.globalAlpha = 0.3;
      const px = centerX + p.valence * scale;
      const py = centerY - p.arousal * scale;
      ctx.beginPath(); ctx.arc(px, py, 1.5, 0, Math.PI * 2); ctx.fill();
    });

    // Current Marker
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = '#fff';
    ctx.shadowBlur = 15; ctx.shadowColor = '#00ffff';
    const cx = centerX + valence * scale;
    const cy = centerY - arousal * scale;
    ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Camera access denied:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
    }
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current || isScanning) return;
    setIsScanning(true);
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const base64Image = canvas.toDataURL('image/jpeg').split(',')[1];

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
          { text: "Analyze this face for EKMAN emotions. Return JSON: {emotion, valence: -1 to 1, arousal: 0 to 1, healingStatement, biochemicalImpact: 0 to 100}." }
        ],
        config: { responseMimeType: "application/json" }
      });

      const result = JSON.parse(response.text || '{}');
      const v = result.valence || 0;
      const a = result.arousal || 0.5;
      const emo = result.emotion || 'NEUTRAL';
      
      setValence(v);
      setArousal(a);
      setCurrentEmotion(emo);

      // KNN Prediction & Learning
      const pred = globalKnnEngine.predict({ valence: v, arousal: a });
      setKnnResult(pred);
      setSuggestions(globalKnnEngine.getSuggestions(emo));

      const pattern: KNNPattern = {
        id: `p-${Date.now()}`,
        emotion: emo,
        valence: v,
        arousal: a,
        waterCoherence: v > 0 ? 0.9 : 0.3,
        biochemicalImpact: result.biochemicalImpact || 50,
        timestamp: new Date().toISOString()
      };
      
      globalKnnEngine.addPattern(pattern);
      onPatternLearned(pattern);

      if (result.healingStatement) onVerbalTrigger(result.healingStatement);
    } catch (err) {
      console.error("Gemini Analysis Error:", err);
    } finally {
      setIsScanning(false);
    }
  };

  useEffect(() => {
    let interval: number;
    if (isActive) interval = window.setInterval(captureAndAnalyze, 12000);
    return () => clearInterval(interval);
  }, [isActive, memory]);

  return (
    <div className="relative w-full h-full bg-black rounded-xl overflow-hidden border border-current/20 group font-mono flex flex-col">
      <div className="flex-1 relative">
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000" style={{ transform: 'scaleX(-1)' }} />
        
        {/* HUD: Cluster Space */}
        <div className="absolute top-4 right-4 w-36 h-36 bg-black/60 border border-current/30 rounded-lg p-2 backdrop-blur-md shadow-2xl">
          <div className="text-[7px] font-black uppercase opacity-60 mb-2 flex justify-between">
            <span>CLUSTER_SPACE</span>
            <span className="text-cyan-400">∇</span>
          </div>
          <canvas ref={clusterCanvasRef} width={140} height={140} className="w-full h-full" />
        </div>

        {/* HUD: KNN Overlay */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {knnResult && (
            <div className={`p-2 bg-black/80 border border-current/20 backdrop-blur-md rounded-lg transition-all ${knnResult.isAnomaly ? 'border-rose-500 animate-pulse' : ''}`}>
               <div className="text-[6px] opacity-40 uppercase mb-1">KNN_ADAPTIVE_PREDICT</div>
               <div className="text-[10px] font-black text-emerald-400">
                  {knnResult.prediction} <span className="text-[7px] opacity-60">({(knnResult.confidence * 100).toFixed(0)}% CONF)</span>
               </div>
               {knnResult.isAnomaly && <div className="text-[6px] text-rose-500 font-bold mt-1">! ANOMALY DETECTED</div>}
            </div>
          )}
          
          {insights && (
            <div className="p-2 bg-black/80 border border-current/20 backdrop-blur-md rounded-lg">
               <div className="text-[6px] opacity-40 uppercase mb-1">USER_TOPOLOGY_INSIGHTS</div>
               <div className="text-[8px] flex flex-col gap-0.5">
                  <div className="flex justify-between gap-4"><span>DOMINANT:</span> <span className="text-white">{insights.dominantEmotion}</span></div>
                  <div className="flex justify-between gap-4"><span>BEST_H2O:</span> <span className="text-cyan-400">{insights.bestWaterEmotion}</span></div>
                  <div className="flex justify-between gap-4"><span>VARIABILITY:</span> <span className="text-amber-400">{insights.variability.toFixed(1)}%</span></div>
               </div>
            </div>
          )}
        </div>

        {isScanning && <div className="absolute inset-0 border-2 border-cyan-400/40 m-4 rounded-lg animate-pulse" />}
      </div>

      {/* Bottom Panel: Suggestions & Status */}
      <div className="p-3 bg-black/90 border-t border-current/20 flex gap-3 h-28">
        <div className="flex-1 flex flex-col">
          <div className="text-[7px] font-black opacity-40 uppercase mb-1.5 flex justify-between">
            <span>Adaptive_Recommendations</span>
            <span>MEM_BLOCKS: {memory.length}/500</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-1 pr-1 scrollbar-thin">
            {suggestions.map((s, i) => (
              <div key={i} className="text-[8px] bg-white/5 p-1 rounded border border-white/5 flex items-start gap-2">
                 <span className={`w-1 h-3 shrink-0 rounded-full ${s.type === 'optimal' ? 'bg-cyan-400' : 'bg-amber-400'}`} />
                 <div>
                    <span className="font-bold text-white">{s.emotion}</span>: {s.reason}
                 </div>
              </div>
            ))}
            {suggestions.length === 0 && <div className="text-[7px] opacity-20 italic">Learning your emotional rhythm...</div>}
          </div>
        </div>

        <div className="w-32 flex flex-col gap-2">
          <div className="flex-1 flex flex-col items-center justify-center border border-current/10 rounded bg-white/5">
            <span className="text-[6px] opacity-40 uppercase">H2O_PREDICTION</span>
            <span className="text-[14px] font-black text-cyan-400">{(knnResult?.predictedWater * 100 || 50).toFixed(1)}%</span>
          </div>
          <button 
            onClick={captureAndAnalyze}
            disabled={isScanning}
            className="h-8 bg-current text-black font-black text-[8px] uppercase tracking-tighter rounded hover:brightness-110 disabled:opacity-50"
          >
            {isScanning ? 'MAPPING...' : 'SYNC_MOMENT'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacialBiofeedback;
