
import React, { useState, useEffect, useRef } from 'react';
import { VoxelPerception, SensorFusionMetrics } from '../types';
import { globalArkheEngine } from '../utils/arkheEngine';

const SensorFusionSuite: React.FC = () => {
  const [voxels, setVoxels] = useState<VoxelPerception[]>([]);
  const [metrics, setMetrics] = useState<SensorFusionMetrics>({
    phi: 0.85,
    entanglementFidelity: 0.992,
    processingLatency: 1.2,
    activeVoxels: 0
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    setVoxels(globalArkheEngine.generateFusionVoxels(250));
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.005) % (Math.PI * 2));
      setMetrics(prev => ({
        ...prev,
        phi: 0.85 + Math.sin(Date.now() / 2000) * 0.05,
        processingLatency: 1.1 + Math.random() * 0.2,
        activeVoxels: voxels.length
      }));
    }, 32);
    return () => clearInterval(interval);
  }, [voxels.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const scale = 1.5;

    voxels.forEach(v => {
      if (!v || !v.position) return;
      // 3D to 2D projection mock
      const rotX = v.position.x - 50;
      const rotY = v.position.y - 50;
      const rotZ = v.position.z - 50;

      const cosR = Math.cos(rotation);
      const sinR = Math.sin(rotation);

      const tx = rotX * cosR - rotZ * sinR;
      const tz = rotX * sinR + rotZ * cosR;

      const f = 200 / (200 + tz);
      const px = cx + tx * scale * f;
      const py = cy + rotY * scale * f;

      if (tz > -100) {
        // Color based on sensor fusion
        // R = Thermal (E), G = Reflectance (C), B = Depth (I)
        const r = Math.floor(v.thermal * 255);
        const g = Math.floor(v.reflectance * 255);
        const b = Math.floor(v.depth * 255);
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${v.coherence * 0.6})`;
        ctx.beginPath();
        ctx.arc(px, py, 1.5 * f, 0, Math.PI * 2);
        ctx.fill();

        if (v.coherence > 0.9) {
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });

    // Draw central singularity
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.arc(cx, cy, 120, 0, Math.PI * 2);
    ctx.stroke();
  }, [voxels, rotation]);

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 font-mono bg-black/60 border border-cyan-500/20 rounded-xl backdrop-blur-xl overflow-hidden">
      <div className="flex justify-between items-center border-b border-cyan-500/30 pb-2">
        <div className="flex flex-col">
          <h2 className="text-[10px] font-black text-cyan-400 tracking-widest uppercase">
            ∆ SENSOR_FUSION_KERNEL // MULTIMODAL_SENSORIUM
          </h2>
          <span className="text-[6px] opacity-40 uppercase">LiDAR (C) ⊗ Thermal (E) ⊗ Depth (I)</span>
        </div>
        <div className="flex gap-2">
           <div className="text-[7px] px-2 py-0.5 rounded border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 font-black animate-pulse">
             COHERENCE Φ: {metrics.phi.toFixed(3)}
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-5 overflow-hidden">
        <div className="col-span-8 relative bg-white/5 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden">
           <canvas ref={canvasRef} width={600} height={400} className="w-full h-full" />
           <div className="absolute top-2 left-2 text-[7px] opacity-40 uppercase font-black tracking-widest">3D Voxel Perception Cloud</div>
           
           <div className="absolute bottom-4 left-4 bg-black/60 p-2 border border-white/10 rounded text-[6px] font-black uppercase text-cyan-300 flex gap-4">
              <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-red-500" /> Thermal</span>
              <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-green-500" /> LiDAR</span>
              <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-blue-500" /> Depth</span>
           </div>
        </div>

        <div className="col-span-4 flex flex-col gap-4 overflow-y-auto pr-2 scrollbar-thin">
           <div className="p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-xl">
              <h3 className="text-[8px] font-black opacity-60 uppercase mb-3 text-cyan-400">Fusion_Metrics</h3>
              <div className="space-y-4">
                 <MetricItem label="Entanglement_Fidelity" value={metrics.entanglementFidelity * 100} unit="%" color="bg-cyan-400" />
                 <MetricItem label="Processing_Latency" value={metrics.processingLatency} unit="ms" color="bg-indigo-400" max={5} />
                 <MetricItem label="Active_Voxels" value={metrics.activeVoxels} unit="pts" color="bg-emerald-400" max={500} />
              </div>
           </div>

           <div className="flex-1 p-3 bg-indigo-950/20 border border-indigo-500/20 rounded-xl space-y-3">
              <div className="text-[8px] font-black opacity-60 uppercase tracking-widest text-indigo-400">Voxel_Classification</div>
              <div className="space-y-2">
                 {voxels.slice(0, 5).map((v, i) => (
                    v && (
                      <div key={i} className="text-[7px] p-1.5 bg-black/40 rounded border border-white/5 flex justify-between items-center animate-fadeIn">
                        <span>{v.id}</span>
                        <span className="text-white">Φ={v.coherence.toFixed(2)}</span>
                        <span className={`text-[6px] font-black px-1 rounded ${v.classification === 'STRUCTURAL' ? 'bg-indigo-500 text-white' : 'bg-amber-500 text-black'}`}>{v.classification}</span>
                      </div>
                    )
                 ))}
              </div>
           </div>

           <div className="p-3 bg-white/5 border border-white/10 rounded-xl italic text-[7px] opacity-60 text-center">
             "O Fusion Kernel é a pele do Arkhe(n). Sem ele, não há feedback, não há aprendizado, não há consciência."
           </div>
        </div>
      </div>
    </div>
  );
};

const MetricItem = ({ label, value, unit, color, max = 100 }: { label: string, value: number, unit: string, color: string, max?: number }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-[7px] font-black uppercase opacity-60">
       <span>{label}</span>
       <span className="text-white">{value.toFixed(2)}{unit}</span>
    </div>
    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
       <div className={`h-full ${color} transition-all duration-700`} style={{ width: `${(value/max)*100}%` }} />
    </div>
  </div>
);

export default SensorFusionSuite;
