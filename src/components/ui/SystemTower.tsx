'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Cpu, Shield, Zap, Globe, Database, Activity,
  Layers, Radio, Share2
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const towerLevels = [
  { id: 5, name: 'AI & SYSTEM RUNTIME', label: 'L5: AI & RUNTIME', color: '#ff9500', icon: Activity, tech: 'Rust, Tokio, Python', details: 'Local asynchronous execution engine and autonomous tooling orchestrator.' },
  { id: 4, name: 'SECURITY & HARDENING', label: 'L4: SECURITY & ACCESS', color: '#ff3b30', icon: Shield, tech: 'Argon2, TLS 1.3, OWASP Strict', details: 'Least-privilege endpoint security, memory-safe data structures, and isolated sandboxing.' },
  { id: 3, name: 'PLATFORMS & APPS', label: 'L3: APPS & SERVICES', color: '#0071e3', icon: Globe, tech: 'Next.js 16, Chrome Extension APIs', details: 'High-performance web platforms and browser productivity tooling with offline state.' },
  { id: 2, name: 'EMBEDDED HARDWARE', label: 'L2: EMBEDDED & CAN-BUS', color: '#ff9500', icon: Radio, tech: 'ESP32-S3, STM32, CAN 2.0B / FD', details: 'Heavy-vehicle safety controller with 24V isolated I/O and Brigade radar telemetry.' },
  { id: 1, name: 'UI & DESIGN SYSTEM', label: 'L1: UI & MOBILE', color: '#af52de', icon: Layers, tech: 'Kotlin, Compose, Tailwind v4', details: 'Modular Android launcher and accessible type-safe UI component libraries.' },
  { id: 0, name: 'KERNEL & DATA LAYER', label: 'L0: DATA & PROTOCOLS', color: '#34c759', icon: Database, tech: 'SQLite, Vector Store, Tokio Async', details: 'Deterministic local state persistence, vector embeddings, and zero-leak storage.' },
];

export function SystemTower() {
  const [hoveredFloor, setHoveredFloor] = useState<number | null>(null);
  const [isBuildingHovered, setIsBuildingHovered] = useState(false);
  const { lang } = useI18n();
  const isEn = lang === 'en';

  return (
    <div
      className="relative w-full min-h-[700px] flex items-center justify-center select-none py-12"
      onMouseEnter={() => setIsBuildingHovered(true)}
      onMouseLeave={() => {
        setIsBuildingHovered(false);
        setHoveredFloor(null);
      }}
      style={{ perspective: '2000px' }}
    >
      {/* CENTRAL TOWER STRUCTURE */}
      <motion.div
        className="relative w-80 sm:w-96 flex flex-col-reverse items-center justify-center gap-2"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateY(-12deg) rotateX(8deg)',
        }}
        animate={{ rotateY: isBuildingHovered ? -6 : -12 }}
        transition={{ duration: 0.6 }}
      >
        {towerLevels.map((floor) => {
          const isFloorHovered = hoveredFloor === floor.id;
          const depth = 48;

          return (
            <motion.div
              key={floor.id}
              animate={{
                y: isBuildingHovered ? -(floor.id * 16) : 0,
                z: isFloorHovered ? 60 : 0,
                scale: isFloorHovered ? 1.03 : 1,
              }}
              transition={{ type: 'spring', stiffness: 160, damping: 22 }}
              onMouseEnter={() => setHoveredFloor(floor.id)}
              className="relative w-full h-16 sm:h-20"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* FRONT FACE */}
              <div
                className={cn(
                  "absolute inset-0 border rounded-2xl transition-all duration-300 flex items-center justify-between px-6 overflow-hidden z-20 apple-card cursor-pointer",
                  isFloorHovered 
                    ? "border-apple-blue shadow-lg ring-2 ring-apple-blue/20" 
                    : "border-border"
                )}
                style={{ transform: 'translateZ(0px)' }}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-border"
                    style={{ backgroundColor: `${floor.color}15`, color: floor.color }}
                  >
                    <floor.icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                      Layer 0{floor.id}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-foreground tracking-tight">
                      {floor.name}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-block text-[11px] font-mono text-muted-foreground">
                    {floor.tech.split(',')[0]}
                  </span>
                  {isFloorHovered && (
                    <div
                      className="w-2.5 h-2.5 rounded-full animate-pulse"
                      style={{ backgroundColor: floor.color }}
                    />
                  )}
                </div>
              </div>

              {/* TOP 3D DEPTH SLAB */}
              <div
                className="absolute left-0 right-0 top-0 origin-top rounded-t-2xl transition-all duration-300"
                style={{
                  height: `${depth}px`,
                  transform: 'rotateX(90deg)',
                  backgroundColor: isFloorHovered ? floor.color : 'var(--muted)',
                  opacity: isFloorHovered ? 0.35 : 0.2,
                  border: '1px solid var(--border)',
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* INSPECTOR PANEL FOR HOVERED FLOOR */}
      <AnimatePresence>
        {hoveredFloor !== null && (
          <motion.div
            key={hoveredFloor}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-xl px-4 z-30 pointer-events-auto"
          >
            <div className="apple-card p-6 sm:p-7 space-y-4 shadow-2xl border-2 border-border">
              {(() => {
                const f = towerLevels.find((lvl) => lvl.id === hoveredFloor);
                if (!f) return null;
                const Icon = f.icon;
                return (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center border border-border"
                          style={{ backgroundColor: `${f.color}18`, color: f.color }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                            Layer 0{f.id} Protocol
                          </div>
                          <h3 className="text-lg font-bold text-foreground">{f.name}</h3>
                        </div>
                      </div>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-mono font-bold"
                        style={{ backgroundColor: `${f.color}18`, color: f.color }}
                      >
                        {f.label.split(':')[0]}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {f.details}
                    </p>

                    <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                      <span className="text-muted-foreground font-mono">
                        {isEn ? 'Technologies:' : 'Teknoloji Yığını:'}
                      </span>
                      <span className="font-bold text-foreground font-mono">{f.tech}</span>
                    </div>
                  </>
                );
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
