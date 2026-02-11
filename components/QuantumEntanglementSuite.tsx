
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { QuantumPair, BellState, BioAgent } from '../types';
import { globalArkheEngine } from '../utils/arkheEngine';

const BELL_STATE_COLORS: Record<BellState, string> = {
  [BellState.PHI_PLUS]: '#10b981', // Emerald
  [BellState.PHI_MINUS]: '#3b82f6', // Azure
  [BellState.PSI_PLUS]: '#a855f7', // Violet
  [BellState.PSI_MINUS]: '#ef4444', // Crimson
};

const QuantumEntanglementSuite: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const sceneRef = useRef<THREE.Scene>(new THREE.Scene());
  const nodeMeshes = useRef<Record<string, THREE.Mesh>>({});
  const linkMeshes = useRef<Record<string, THREE.Line>>({});

  const [pairs, setPairs] = useState<QuantumPair[]>(globalArkheEngine.getEntanglementPairs());
  const [metrics, setMetrics] = useState(globalArkheEngine.getQuantumMetrics());
  const [qShield, setQShield] = useState(false);
  const [searchSig, setSearchSig] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [foundAgent, setFoundAgent] = useState<BioAgent | null>(null);
  const [logs, setLogs] = useState<{id: number, type: string, msg: string, time: string}[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const scene = sceneRef.current;
    scene.background = new THREE.Color(0x010103);
    scene.fog = new THREE.FogExp2(0x000000, 0.012);

    const camera = new THREE.PerspectiveCamera(70, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    camera.position.set(0, 45, 90);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(containerRef.current.clientWidth, containerRef.current.clientHeight), 1.5, 0.4, 0.85);
    bloomPass.threshold = 0.1;
    bloomPass.strength = 1.3;
    bloomPass.radius = 0.4;

    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);
    composerRef.current = composer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const nodePos = { 
      'q1': new THREE.Vector3(-40, 0, 25), 
      'q2': new THREE.Vector3(40, 0, 25), 
      'q3': new THREE.Vector3(0, 0, -45) 
    };

    const nodeGeo = new THREE.IcosahedronGeometry(7, 1);
    Object.entries(nodePos).forEach(([id, pos]) => {
      const mat = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true, transparent: true, opacity: 0.6 });
      const mesh = new THREE.Mesh(nodeGeo, mat);
      mesh.position.copy(pos);
      scene.add(mesh);
      nodeMeshes.current[id] = mesh;
    });

    const animate = () => {
      requestAnimationFrame(animate);
      Object.values(nodeMeshes.current).forEach((m: THREE.Mesh) => { 
        if (m) {
          m.rotation.y += 0.006; 
          m.rotation.x += 0.002; 
          const pulse = 1 + Math.sin(Date.now() * 0.002) * 0.05;
          m.scale.set(pulse, pulse, pulse);
        }
      });
      controls.update();
      if (composerRef.current) composerRef.current.render();
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      if (composerRef.current) composerRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    const currentIds = new Set(pairs.map(p => p.id));
    Object.keys(linkMeshes.current).forEach(id => { 
      if (!currentIds.has(id)) { 
        const mesh = linkMeshes.current[id];
        if (mesh) scene.remove(mesh); 
        delete linkMeshes.current[id]; 
      } 
    });
    pairs.forEach(pair => {
      if (!pair) return;
      if (!linkMeshes.current[pair.id]) {
        const posA = nodeMeshes.current[pair.nodeA]?.position;
        const posB = nodeMeshes.current[pair.nodeB]?.position;
        if (posA && posB) {
          const mid = new THREE.Vector3().addVectors(posA, posB).multiplyScalar(0.5);
          mid.y += 25;
          const curve = new THREE.QuadraticBezierCurve3(posA, mid, posB);
          const points = curve.getPoints(50);
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const color = BELL_STATE_COLORS[pair.bellType] || '#ffffff';
          const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.8 });
          const line = new THREE.Line(geometry, material);
          scene.add(line);
          linkMeshes.current[pair.id] = line;
        }
      } else {
        const mesh = linkMeshes.current[pair.id];
        if (mesh && mesh.material) {
           (mesh.material as THREE.LineBasicMaterial).opacity = 0.2 + pair.fidelity * 0.8;
        }
      }
    });
  }, [pairs]);

  const addLog = (type: string, msg: string) => {
    setLogs(prev => [{ id: Date.now(), type, msg, time: new Date().toLocaleTimeString() }, ...prev].slice(0, 50));
  };

  const handleToggleShield = () => {
    const next = !qShield;
    setQShield(next);
    globalArkheEngine.setQShield(next);
    addLog('system', next ? '🛡️ Q-Shield (BFT) Activated: Multi-node Surface Code online.' : '⚠️ Q-Shield Offline: Cluster coherence vulnerable.');
  };

  const handleManualEntangle = () => {
    const n1 = Math.floor(Math.random() * 3);
    let n2 = Math.floor(Math.random() * 3);
    while (n1 === n2) n2 = Math.floor(Math.random() * 3);
    const pair = globalArkheEngine.entangleNodes(n1, n2);
    addLog('entangle', `Paxos State Committed [Slot ${pair.consensusSlot}]: Generated EPR-${pair.id}`);
    setPairs([...globalArkheEngine.getEntanglementPairs()]);
  };

  const handleSearch = () => {
    if (!searchSig || isSearching) return;
    setIsSearching(true);
    setFoundAgent(null);
    addLog('quantum', `Distributed Grover Search: Amplifying states across NCCL fabric...`);
    
    const spike = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 2, 80, 8), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 }));
    sceneRef.current.add(spike);
    const animateSpike = () => {
       if (!spike.material) return;
       (spike.material as THREE.MeshBasicMaterial).opacity -= 0.02;
       if((spike.material as THREE.MeshBasicMaterial).opacity > 0) requestAnimationFrame(animateSpike);
       else sceneRef.current.remove(spike);
    };
    animateSpike();

    setTimeout(() => {
        const target = globalArkheEngine.groverSearch(parseInt(searchSig));
        setIsSearching(false);
        if (target) {
            setFoundAgent(target);
            addLog('quantum', `Grover Convergence Success: Oracle match at Slot ${metrics.consensusSlot}.`);
        } else {
            addLog('error', 'Grover Failure: Oracle not found in distributed substrate.');
        }
    }, 2500);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setPairs([...globalArkheEngine.getEntanglementPairs()]);
      setMetrics(globalArkheEngine.getQuantumMetrics());
    }, 1000);
    return () => clearInterval(timer);
  }, [metrics.consensusSlot]);

  return (
    <div className={`w-full h-full flex flex-col font-mono text-white bg-[#010103] transition-all duration-300`}>
      
      <header className="flex justify-between items-center p-4 border-b border-indigo-500/30 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="text-2xl animate-pulse">⚛️</span>
          <div>
            <h1 className="text-sm font-black tracking-widest uppercase">
               Arkhe-Vis <span className="bg-gradient-to-r from-emerald-400 to-indigo-500 bg-clip-text text-transparent">Quantum</span> BFT v2.0
            </h1>
            <div className="text-[7px] opacity-60 font-black uppercase">Consensus Slot: {metrics.consensusSlot} // BFT_HARDENED</div>
          </div>
        </div>
        <div className="flex gap-4">
           <MetricHud label="Entropy" value={metrics.globalEntropy.toFixed(3)} />
           <MetricHud label="Coherence" value={`${metrics.avgCoherence.toFixed(0)}ms`} color="text-cyan-400" />
           <MetricHud label="Pairs" value={metrics.activePairs} color="text-indigo-400" />
        </div>
      </header>

      <main className="flex-1 grid grid-cols-12 overflow-hidden relative">
        <aside className="col-span-3 border-r border-indigo-500/20 p-4 bg-black/60 flex flex-col gap-6 overflow-y-auto scrollbar-thin z-10 shadow-[20px_0_40px_rgba(0,0,0,0.4)]">
           <section className="space-y-4">
              <h3 className="text-[9px] font-black text-emerald-400 uppercase tracking-widest border-b border-emerald-500/10 pb-2">🛡️ Q-Shield (BFT-QEC)</h3>
              <button 
                onClick={handleToggleShield}
                className={`w-full py-3 rounded border text-[9px] font-black uppercase transition-all flex items-center justify-center gap-2 ${qShield ? 'bg-emerald-500 text-black border-white shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'bg-white/5 border-white/10 text-white/40 hover:text-white'}`}
              >
                {qShield ? 'STABILIZER: ONLINE' : 'ACTIVATE Q-SHIELD'}
              </button>
              <div className="space-y-1">
                 <div className="flex justify-between text-[7px] uppercase font-black opacity-60"><span>Surface Code Eff.</span> <span>{(metrics.qShieldLevel * 100).toFixed(1)}%</span></div>
                 <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 transition-all duration-1000" style={{ width: `${metrics.qShieldLevel * 100}%` }} />
                 </div>
              </div>
           </section>

           <section className="space-y-4">
              <h3 className="text-[9px] font-black text-indigo-400 uppercase tracking-widest border-b border-indigo-500/10 pb-2">🔍 Distributed Grover</h3>
              <div className="flex flex-col gap-2">
                 <input 
                   type="number" 
                   placeholder="Genome Oracle ID" 
                   value={searchSig}
                   onChange={e => setSearchSig(e.target.value)}
                   className="w-full bg-black/40 border border-white/10 rounded p-2 text-[10px] outline-none focus:border-indigo-500 font-mono text-white"
                 />
                 <button 
                   onClick={handleSearch}
                   disabled={isSearching}
                   className={`w-full py-3 bg-indigo-600 text-white text-[9px] font-black rounded uppercase hover:bg-indigo-500 transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)] ${isSearching ? 'animate-pulse' : ''}`}
                 >
                   {isSearching ? 'Amplifying Wavefunction...' : 'Execute Distributed Search'}
                 </button>
              </div>
              {foundAgent && (
                <div className="p-3 bg-indigo-950/40 border border-indigo-500/40 rounded-lg animate-slideInLeft">
                   <div className="text-[12px] font-black text-white">ORACLE_MATCH: ID_{foundAgent.id}</div>
                   <div className="text-[7px] opacity-60 mt-1 uppercase font-bold text-indigo-300">Byzantine Proof: ENTANGLED ✓</div>
                </div>
              )}
           </section>

           <div className="mt-auto space-y-2">
              <button onClick={handleManualEntangle} className="w-full py-2.5 border border-white/20 text-[9px] font-black rounded uppercase hover:bg-white/10 transition-all">🔗 Propose EPR State</button>
              <button onClick={() => globalArkheEngine.collapseAll()} className="w-full py-2.5 bg-rose-950/40 border border-rose-500/40 text-rose-500 text-[9px] font-black rounded hover:bg-rose-500/20 uppercase transition-all">💥 Global Collapse</button>
           </div>
        </aside>

        <section ref={containerRef} className="col-span-6 h-full cursor-move" />

        <aside className="col-span-3 border-l border-indigo-500/20 p-4 bg-black/60 flex flex-col gap-4 overflow-hidden z-10 shadow-[-20px_0_40px_rgba(0,0,0,0.4)]">
           <h3 className="text-[9px] font-black text-indigo-400 uppercase tracking-widest border-b border-indigo-500/10 pb-2">📊 BFT Analytics</h3>
           <div className="space-y-4">
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl group hover:border-emerald-500/30 transition-all shadow-inner">
                 <div className="text-[7px] opacity-40 uppercase font-black mb-2 tracking-tighter">Byzantine State Slot</div>
                 <div className="text-3xl font-black text-white tracking-tighter">#{metrics.consensusSlot}</div>
                 <div className="text-[6px] opacity-40 uppercase mt-1">Immutable Ledger Lock</div>
              </div>
              
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                 <div className="text-[7px] opacity-40 uppercase font-black mb-1">State Propagation Latency</div>
                 <div className="text-xl font-black text-emerald-400">0.08 <span className="text-[10px] opacity-40 uppercase">μs (Bypass)</span></div>
              </div>

              <div className="p-4 bg-black/40 border border-white/5 rounded-xl space-y-3">
                 <div className="text-[7px] opacity-40 uppercase font-black tracking-widest">Active Bell States (Live)</div>
                 <div className="grid grid-cols-4 gap-1.5">
                    {Object.entries(BELL_STATE_COLORS).map(([state, color]) => (
                       <div key={state} className="flex flex-col items-center gap-1">
                          <div className="w-2 h-2 rounded-full shadow-[0_0_5px_currentColor]" style={{ backgroundColor: color, color }} />
                          <span className="text-[6px] opacity-40 font-bold">{state}</span>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="flex-1 flex flex-col gap-2 overflow-hidden mt-2">
              <div className="text-[8px] font-black opacity-40 uppercase tracking-widest border-b border-white/10 pb-1 flex justify-between">
                 <span>BFT_Event_Stream</span>
                 <span>(Live)</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                 {logs.map(log => (
                    <div key={log.id} className={`p-2 bg-black/40 rounded border-l-2 text-[8px] animate-slideInRight ${log.type === 'entangle' ? 'border-indigo-500' : log.type === 'collapse' ? 'border-rose-500' : 'border-emerald-500'}`}>
                       <div className="flex justify-between items-center opacity-40 mb-1">
                          <span className="uppercase font-black text-[7px]">{log.type}</span>
                          <span>{log.time}</span>
                       </div>
                       <p className="leading-tight opacity-90 text-[8px]">{log.msg}</p>
                    </div>
                 ))}
                 {logs.length === 0 && <div className="text-[7px] opacity-20 italic">Awaiting BFT quorum signal...</div>}
              </div>
           </div>
        </aside>
      </main>

      <footer className="h-10 bg-black border-t border-indigo-500/20 px-6 flex items-center justify-between text-[7px] font-black uppercase opacity-60">
         <div className="flex gap-6">
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Byzantine Robust</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Gray-Scott Substrate</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white" /> NCCL Linked</span>
         </div>
         <div className="text-white">Active Nodes: 3 // Quorum Level: L7 // V(c): 0.00c</div>
      </footer>

      <style>{`
        .animate-slideInLeft { animation: slideInLeft 0.5s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.5s ease-out; }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </div>
  );
};

const MetricHud = ({ label, value, color = "text-white" }: { label: string, value: string | number, color?: string }) => (
  <div className="flex flex-col items-end">
    <span className="text-[6px] opacity-40 uppercase font-black tracking-widest">{label}</span>
    <span className={`text-[11px] font-black ${color}`}>{value}</span>
  </div>
);

export default QuantumEntanglementSuite;
