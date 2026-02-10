
import React, { useEffect, useRef } from 'react';
import { compactify, transformTime, transformSpace } from '../utils/relativity';

interface SpacetimeExplorerProps {
  velocity?: number;
}

const SpacetimeExplorer: React.FC<SpacetimeExplorerProps> = ({ velocity = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const scale = (w / 2) - 10;

      // Draw Penrose Disk Boundary
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.arc(cx, cy, scale, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Light Cones (Null Geodesics) ds2 = 0
      // In compactified coordinates, these are straight 45 deg lines
      ctx.strokeStyle = 'rgba(0,0,0,0.1)';
      ctx.lineWidth = 0.5;
      for(let i=-2; i<=2; i += 0.5) {
        ctx.beginPath();
        // Forward cones
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + scale * Math.cos(Math.PI/4 + i), cy - scale * Math.sin(Math.PI/4 + i));
        ctx.stroke();
      }

      // Draw Transformed "Hal Finney" Worldline
      // t flows from -2 to 2. x = 0 (Hal is at rest in his frame)
      ctx.strokeStyle = '#4f46e5';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let t = -2; t <= 2; t += 0.1) {
        // Observer sees Hal moving at -velocity
        const x_obs = transformSpace(t, 0, velocity);
        const t_obs = transformTime(t, 0, velocity);
        const { Tp, Rp } = compactify(t_obs, x_obs);
        
        const px = cx + Rp * (scale/Math.PI);
        const py = cy - Tp * (scale/Math.PI);
        
        if (t === -2) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Current "Now" Point for Hal
      const tNow = (Math.sin(frame * 0.02) * 1.5);
      const xNow_obs = transformSpace(tNow, 0, velocity);
      const tNow_obs = transformTime(tNow, 0, velocity);
      const { Tp: tpNow, Rp: rpNow } = compactify(tNow_obs, xNow_obs);
      
      const curX = cx + rpNow * (scale/Math.PI);
      const curY = cy - tpNow * (scale/Math.PI);
      
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(curX, curY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Traveling Photons from Hal (λ nodes)
      // Photons move at c, so x = t or x = -t
      for (let i = 0; i < 6; i++) {
        const photonT = ((frame * 0.01 + i * 0.5) % 3) - 1.5;
        const photonDir = i % 2 === 0 ? 1 : -1;
        const x_ph = photonDir * photonT;
        
        // Transformed for observer
        const x_ph_obs = transformSpace(photonT, x_ph, velocity);
        const t_ph_obs = transformTime(photonT, x_ph, velocity);
        const { Tp: phTp, Rp: phRp } = compactify(t_ph_obs, x_ph_obs);
        
        const phX = cx + phRp * (scale/Math.PI);
        const phY = cy - phTp * (scale/Math.PI);

        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(phX, phY, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(render);
    };

    render();
  }, [velocity]);

  return (
    <div className="w-full h-full bg-white/10 flex flex-col items-center justify-center p-2 relative">
      <div className="absolute top-2 left-2 text-[6px] font-black uppercase opacity-50 text-black">
        Penrose Projection // Λ=C Stability
      </div>
      <canvas ref={canvasRef} width={200} height={200} className="w-full h-full max-w-[160px] max-h-[160px]" />
      <div className="mt-1 text-[7px] font-bold text-black opacity-40">τ = 0.00 (ds²=0 Mode)</div>
    </div>
  );
};

export default SpacetimeExplorer;
