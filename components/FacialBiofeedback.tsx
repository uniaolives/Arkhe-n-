
import React, { useRef, useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { SystemStatus, KNNPattern } from '../types';
import { predictEmotionKNN } from '../utils/knnEngine';

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
  const [knnPrediction, setKnnPrediction] = useState<any>(null);
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

    // Draw Grid
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
    ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(0, centerY); ctx.lineTo(canvas.width, centerY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(centerX, 0); ctx.lineTo(centerX, canvas.height); ctx.stroke();

    // Draw Memory Patterns
    memory.forEach(p => {
      ctx.fillStyle = p.emotion === 'HAPPY' ? '#00ffff' : '#f43f5e';
      ctx.globalAlpha = 0.4;
      const px = centerX + p.valence * scale;
      const py = centerY - p.arousal * scale;
      ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2); ctx.fill();
    });

    // Draw Current Pointer
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = '#fff';
    ctx.shadowBlur = 10; ctx.shadowColor = '#00ffff';
    const cx = centerX + valence * scale;
    const cy = centerY - arousal * scale;
    ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access denied:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
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
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image
            }
          },
          {
            text: "Analyze this face for micro-expressions. Identify the dominant Ekman emotion. Return a JSON object with 'emotion', 'valence' (-1 to 1), 'arousal' (0 to 1), and a 'healingStatement'."
          }
        ],
        config: {
          responseMimeType: "application/json"
        }
      });

      const result = JSON.parse(response.text || '{}');
      setCurrentEmotion(result.emotion || 'NEUTRAL');
      setValence(result.valence || 0);
      setArousal(result.arousal || 0.5);
      
      // Perform KNN Prediction locally
      const knn = predictEmotionKNN(memory, { valence: result.valence || 0, arousal: result.arousal || 0.5 });
      setKnnPrediction(knn);

      // Learn the pattern
      onPatternLearned({
        id: `p-${Date.now()}`,
        emotion: result.emotion || 'NEUTRAL',
        valence: result.valence || 0,
        arousal: result.arousal || 0.5,
        waterCoherence: (result.valence || 0) > 0 ? 0.9 : 0.3,
        timestamp: new Date().toISOString()
      });

      if (result.healingStatement) {
        onVerbalTrigger(result.healingStatement);
      }
    } catch (err) {
      console.error("Gemini Analysis Error:", err);
    } finally {
      setIsScanning(false);
    }
  };

  useEffect(() => {
    let interval: number;
    if (isActive) {
      interval = window.setInterval(captureAndAnalyze, 10000);
    }
    return () => clearInterval(interval);
  }, [isActive, memory]);

  return (
    <div className="relative w-full h-full bg-black rounded-xl overflow-hidden border border-current/20 group font-mono">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-700"
        style={{ transform: 'scaleX(-1)' }}
      />
      
      {/* KNN Cluster Visualization Overlay */}
      <div className="absolute top-4 right-4 w-32 h-32 bg-black/60 border border-current/30 rounded-lg p-1 backdrop-blur-md">
        <div className="text-[6px] font-black uppercase opacity-60 mb-1 text-center">KNN_CLUSTER_SPACE</div>
        <canvas ref={clusterCanvasRef} width={120} height={120} className="w-full h-full" />
      </div>

      {/* Scanning HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none border-2 border-current/10 m-4 rounded-lg">
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-current" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-current" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-current" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-current" />
        
        {isScanning && (
          <div className="absolute top-0 left-0 w-full h-0.5 bg-current animate-[scan_2s_linear_infinite]" />
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end gap-2">
        <div className="bg-black/80 p-2 rounded border border-current/20 backdrop-blur-md flex-1">
          <div className="flex justify-between items-start mb-1">
             <div className="text-[7px] font-black uppercase opacity-60">Adaptive_Learning_SIG</div>
             <div className="text-[6px] bg-current text-black px-1 rounded">MEM: {memory.length}</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
               <div className="text-[6px] opacity-40 uppercase">GEMINI_RAW</div>
               <div className={`text-[9px] font-black truncate ${valence >= 0 ? 'text-cyan-400' : 'text-rose-500'}`}>
                 {currentEmotion}
               </div>
            </div>
            {knnPrediction && (
              <div>
                <div className="text-[6px] opacity-40 uppercase">KNN_PREDICT</div>
                <div className="text-[9px] font-black text-emerald-400">
                  {knnPrediction.prediction} ({(knnPrediction.confidence * 100).toFixed(0)}%)
                </div>
              </div>
            )}
          </div>
        </div>
        
        <button 
          onClick={captureAndAnalyze}
          disabled={isScanning}
          className="px-3 h-10 bg-current text-black font-black text-[8px] uppercase tracking-tighter rounded hover:brightness-110 disabled:opacity-50"
        >
          {isScanning ? 'ANALYZING...' : 'RE-SCAN'}
        </button>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default FacialBiofeedback;
