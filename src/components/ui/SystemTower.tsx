'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Cpu, Shield, Zap, Globe, Database, Activity,
  Layers, Radio, Share2
} from 'lucide-react';

const towerLevels = [
  { id: 5, name: 'AI_MODULE', label: 'L5: AI & TRADING', color: '#ff9900', icon: Activity, tech: 'Python, Gemini, Monte Carlo', details: 'High-frequency algorithmic trade engine with predictive sentiment analysis.' },
  { id: 4, name: 'INTEL_NODE', label: 'L4: OSINT & SECURITY', color: '#ff3b3b', icon: Shield, tech: 'Crucix, Node Analysis, AES-256', details: 'Threat intelligence platform with 27 active data relay points.' },
  { id: 3, name: 'SaaS_CORE', label: 'L3: SaaS & PLATFORMS', color: '#00ccff', icon: Globe, tech: 'Next.js 15, Firebase, Multi-tenancy', details: 'Scalable multi-tenant infrastructure for enterprise education systems.' },
  { id: 2, name: 'IOT_BRIDGE', label: 'L2: INDUSTRIAL IOT', color: '#fbbf24', icon: Radio, tech: 'ESP32-S3, CANBus, 77GHz Radar', details: 'Real-time sensor processing and industrial automotive communication.' },
  { id: 1, name: 'UI_ENGINE', label: 'L1: UI & DESIGN', color: '#a855f7', icon: Layers, tech: 'tek-ui, React 19, Framer Motion', details: 'Premium design system with glassmorphism and performance optimization.' },
  { id: 0, name: 'BASE_ROOT', label: 'L0: DATA & KERNEL', color: '#22c55e', icon: Database, tech: 'PostgreSQL, Docker, Cloud Run', details: 'Distributed database architecture with automatic scale-out protocols.' },
];

export function SystemTower() {
  const [hoveredFloor, setHoveredFloor] = useState<number | null>(null);
  const [isBuildingHovered, setIsBuildingHovered] = useState(false);

  return (
    <div
      className="relative w-full h-[1000px] flex items-center justify-center select-none"
      onMouseEnter={() => setIsBuildingHovered(true)}
      onMouseLeave={() => {
        setIsBuildingHovered(false);
        setHoveredFloor(null);
      }}
      style={{ perspective: '2500px' }}
    >
      {/*  CENTRAL TOWER STRUCTURE (FRONT-FACING 3D)  */}
      <motion.div
        className="relative w-96 h-[600px] flex flex-col-reverse items-center justify-center gap-1"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateY(-20deg) rotateX(10deg)', // Hafif bir açıyla tam karşıdan bakış
        }}
        animate={{ rotateY: isBuildingHovered ? -10 : -20 }}
        transition={{ duration: 1 }}
      >
        {towerLevels.map((floor, index) => {
          const isFloorHovered = hoveredFloor === floor.id;

          const floorHeight = 80; // Dikey yükseklik
          const depth = 60; // Ekranın içine doğru derinlik
          const explodedGap = 20; // Katlar arası boşluk

          return (
            <motion.div
              key={floor.id}
              animate={{
                y: isBuildingHovered ? -(floor.id * 30) : 0, // Yukarı doğru açılma
                z: isFloorHovered ? 100 : 0, // Üzerine gelince sana doğru fırlama
                scale: isFloorHovered ? 1.05 : 1,
              }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              onMouseEnter={() => setHoveredFloor(floor.id)}
              className="relative w-80 h-20 mb-1"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* FRONT FACE (Senin gördüğün ana yüzey) */}
              <div
                className={cn(
                  "absolute inset-0 border-2 transition-all duration-500 flex items-center justify-between px-8 overflow-hidden z-20",
                  isFloorHovered ? "bg-black/90 border-white shadow-[0_0_50px_rgba(255,255,255,0.2)]" : "bg-zinc-900/60 border-white/10"
                )}
                style={{ transform: 'translateZ(0px)' }}
              >
                 <div className="flex items-center gap-4">
                    <floor.icon className={cn("w-6 h-6", isFloorHovered ? "text-white" : "text-white/20")} />
                    <div className="flex flex-col">
                       <span className={cn("text-[8px] font-mono tracking-[0.4em] uppercase", isFloorHovered ? "text-white/40" : "text-white/10")}>Layer_0{floor.id}</span>
                       <span className={cn("text-xs font-black font-mono tracking-widest uppercase", isFloorHovered ? "text-white" : "text-white/20")}>{floor.name}</span>
                    </div>
                 </div>
                 {isFloorHovered && (
                   <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-2 h-2 rounded-full bg-lcars-green animate-pulse shadow-[0_0_10px_#22c55e]"
                   />
                 )}
              </div>

              {/* TOP FACE (Üst yüzey - Derinlik veren parça) */}
              <div
                className="absolute left-0 right-0 top-0 origin-top transition-all duration-500"
                style={{
                  height: `${depth}px`,
                  transform: 'rotateX(90deg)',
                  backgroundColor: isFloorHovered ? floor.color : 'rgba(255,255,255,0.05)',
                  opacity: isFloorHovered ? 0.4 : 0.1,
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              />

              {/* RIGHT FACE (Sağ yüzey - Derinlik veren parça) */}
              <div
                className="absolute top-0 bottom-0 right-0 origin-right transition-all duration-500"
                style={{
                  width: `${depth}px`,
                  transform: 'rotateY(90deg)',
                  backgroundColor: isFloorHovered ? floor.color : 'rgba(0,0,0,0.8)',
                  opacity: isFloorHovered ? 0.3 : 0.2,
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              />

              {/* BOTTOM FACE */}
              <div
                className="absolute left-0 right-0 bottom-0 h-[60px] origin-bottom bg-black/40"
                style={{ transform: 'rotateX(-90deg)' }}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/*  HUD INTERFACE (Screen-Space / Flat)  */}
      <AnimatePresence>
        {hoveredFloor !== null && (
          <motion.div
            key={hoveredFloor}
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            className="fixed right-24 top-1/2 -translate-y-1/2 w-[540px] z-[200] pointer-events-auto"
          >
            <div className="glass p-12 rounded-[64px] border-white/10 space-y-10 relative overflow-hidden shadow-[0_0_120px_rgba(0,0,0,1)]">
               <div className="absolute top-0 left-0 w-2 h-48 bg-lcars-cyan rounded-full translate-x-4 translate-y-12 shadow-[0_0_30px_#00ccff]" />

               <div className="space-y-4">
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center">
                        {(() => {
                           const Icon = towerLevels.find(f => f.id === hoveredFloor)?.icon || Activity;
                           return <Icon className="w-8 h-8 text-lcars-cyan" />;
                        })()}
                     </div>
                     <div>
                        <div className="text-[12px] font-black font-mono text-white/30 uppercase tracking-[0.5em]">Sector_Protocol: 0{hoveredFloor}</div>
                        <h3 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">
                           {towerLevels.find(f => f.id === hoveredFloor)?.label.split(': ')[1]}
                        </h3>
                     </div>
                  </div>
               </div>

               <div className="space-y-8 text-white/60">
                  <p className="text-3xl leading-tight font-medium italic">
                     &quot;{towerLevels.find(f => f.id === hoveredFloor)?.details}&quot;
                  </p>

                  <div className="pt-10 border-t border-white/5 grid grid-cols-1 gap-8">
                     <div className="space-y-3">
                        <div className="text-[11px] font-mono text-white/20 uppercase tracking-[0.4em] font-black">Architecture_Stack</div>
                        <div className="text-2xl text-lcars-orange font-black uppercase tracking-tight">
                           {towerLevels.find(f => f.id === hoveredFloor)?.tech}
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-6">
                        <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                           <div className="text-[10px] font-mono text-white/20 uppercase font-black mb-1">Stability_Index</div>
                           <div className="text-2xl font-black text-white">99.98%</div>
                        </div>
                        <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                           <div className="text-[10px] font-mono text-white/20 uppercase font-black mb-1">Latency_Delay</div>
                           <div className="text-2xl font-black text-lcars-cyan">0.001ms</div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="pt-10 flex gap-6">
                  <button className="flex-1 py-5 bg-lcars-cyan rounded-[24px] text-black font-black text-[12px] tracking-[0.4em] uppercase hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shadow-[0_0_40px_rgba(0,204,255,0.4)]">Access_Core_Module</button>
                  <button className="w-16 h-16 glass rounded-[24px] flex items-center justify-center text-white/30 hover:text-white border-white/10 hover:border-white/20 transition-all cursor-pointer">
                     <Share2 className="w-6 h-6" />
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Terminal Readouts */}
      <div className="absolute top-20 left-20 opacity-30 pointer-events-none">
         <div className="flex items-center gap-4">
            <div className="w-1 h-12 bg-lcars-orange rounded-full" />
            <div className="space-y-1">
               <div className="text-[12px] font-mono text-white/40 uppercase tracking-[0.6em]">System_Tower_Architecture</div>
               <div className="text-5xl font-black text-white/20 uppercase tracking-tighter">Station_V16</div>
            </div>
         </div>
      </div>
    </div>
  );
}
