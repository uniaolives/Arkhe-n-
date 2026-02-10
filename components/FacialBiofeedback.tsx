
import React, { useRef, useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { KNNPattern, KNNSuggestion, KNNInsights, NeuralSequence } from '../types';
import { globalKnnEngine } from '../utils/knnEngine';
import { globalNeuralEngine } from '../utils/neuralEngine';

interface FacialBiofeedbackProps {
  onVerbalTrigger: (text: string) => void;
  onPatternLearned: (pattern: KNNPattern) => void;
  onNeuralSync: (seq: NeuralSequence) => void;
  memory: KNNPattern[];
  isActive: boolean;
}

const FacialBiofeedback: React.FC<FacialBiofeedbackProps> = ({ onVerbalTrigger, onPatternLearned, onNeuralSync, memory, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clusterCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<string>('NEUTRAL');
  const [knnResult, setKnnResult] = useState<any>(null);
  const [neuralSeq, setNeuralSeq] = useState<NeuralSequence | null>(null);
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
      ctx.globalAlpha = 0.2;
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

      // KNN Prediction
      const pred = globalKnnEngine.predict({ valence: v, arousal: a });
      setKnnResult(pred);

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

      // Neural Sequence Analysis
      globalNeuralEngine.addPattern(pattern);
      const seq = globalNeuralEngine.analyzeSequence();
      if (seq) {
        setNeuralSeq(seq);
        onNeuralSync(seq);
        setSuggestions(globalNeuralEngine.getNeuralRecommendation(emo));
      } else {
        setSuggestions(globalKnnEngine.getSuggestions(emo));
      }

      if (result.healingStatement) onVerbalTrigger(result.healingStatement);
    } catch (err) {
      console.error("Gemini Analysis Error:", err);
    } finally {
      setIsScanning(false);
    }
  };

  useEffect(() => {
    let interval: number;
    if (isActive) interval = window.setInterval(captureAndAnalyze, 10000);
    return () => clearInterval(interval);
  }, [isActive, memory]);

  return (
    <div className="relative w-full h-full bg-black rounded-xl overflow-hidden border border-current/20 group font-mono flex flex-col">
      <div className="flex-1 relative">
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000" style={{ transform: 'scaleX(-1)' }} />
        
        {/* HUD: Neural Sequence Visualizer */}
        {neuralSeq && (
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 h-16 bg-black/40 p-2 border border-current/10 rounded-lg backdrop-blur-sm">
            {neuralSeq.patterns.map((p, i) => (
              <div key={i} className="flex-1 flex flex-col gap-1 relative overflow-hidden group/seq">
                <div className="flex-1 bg-white/5 rounded border border-white/10 flex items-center justify-center">
                  <span className="text-[6px] opacity-60 truncate">{p.emotion}</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400" style={{ width: `${neuralSeq.attentionWeights[i] * 100}%` }} />
                </div>
                <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover/seq:opacity-100 transition-opacity" />
              </div>
            ))}
            <div className="w-16 flex flex-col justify-center items-center border-l border-current/10 pl-2">
              <span className="text-[6px] opacity-40 uppercase">Attention</span>
              <span className="text-[10px] font-black text-cyan-400">SYNC</span>
            </div>
          </div>
        )}

        {/* HUD: Cluster Space */}
        <div className="absolute top-4 right-4 w-36 h-36 bg-black/60 border border-current/30 rounded-lg p-2 backdrop-blur-md shadow-2xl">
          <div className="text-[7px] font-black uppercase opacity-60 mb-2 flex justify-between">
            <span>CLUSTER_SPACE</span>
            <span className="text-cyan-400">∇</span>
          </div>
          <canvas ref={clusterCanvasRef} width={140} height={140} className="w-full h-full" />
        </div>

        {/* HUD: Neural Overlay */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {neuralSeq && (
            <div className="p-2 bg-indigo-950/80 border border-indigo-400/40 backdrop-blur-md rounded-lg animate-fadeIn">
               <div className="text-[6px] opacity-40 uppercase mb-1 text-indigo-200">DEEP_NEURAL_PREDICT (Transformer+LSTM)</div>
               <div className="text-[12px] font-black text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                  {neuralSeq.predictedEmotion}
               </div>
               <div className="text-[7px] opacity-60 mt-1">CONFIDENCE: {(neuralSeq.confidence * 100).toFixed(1)}%</div>
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

      {/* Bottom Panel: Recommendations & Hybrid Engine */}
      <div className="p-3 bg-black/95 border-t border-current/20 flex gap-3 h-32">
        <div className="flex-1 flex flex-col">
          <div className="text-[7px] font-black opacity-40 uppercase mb-1.5 flex justify-between">
            <span>Neural_Path_Recommendations</span>
            <span className="text-indigo-400">ENGINE: HYBRID_TRANSFORMER</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-1 pr-1 scrollbar-thin">
            {suggestions.map((s, i) => (
              <div key={i} className="text-[8px] bg-white/5 p-1.5 rounded border border-white/5 flex items-start gap-2 animate-fadeIn">
                 <span className={`w-1 h-4 shrink-0 rounded-full ${s.type === 'optimal' ? 'bg-indigo-400' : 'bg-cyan-400'}`} />
                 <div>
                    <span className="font-bold text-white">{s.emotion}</span>: {s.reason}
                 </div>
              </div>
            ))}
            {suggestions.length === 0 && <div className="text-[7px] opacity-20 italic">Calibrating neural sequences...</div>}
          </div>
        </div>

        <div className="w-32 flex flex-col gap-2">
          <div className="flex-1 flex flex-col items-center justify-center border border-current/10 rounded bg-white/5">
            <span className="text-[6px] opacity-40 uppercase">CELLULAR_RESONANCE</span>
            <span className="text-[14px] font-black text-cyan-400">{(knnResult?.predictedWater * 100 || 50).toFixed(1)}%</span>
          </div>
          <button 
            onClick={captureAndAnalyze}
            disabled={isScanning}
            className="h-10 bg-current text-black font-black text-[9px] uppercase tracking-tighter rounded hover:brightness-110 disabled:opacity-50 shadow-[0_0_15px_rgba(0,255,255,0.2)]"
          >
            {isScanning ? 'PROCESSING...' : 'NEURAL_SYNC'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacialBiofeedback;
