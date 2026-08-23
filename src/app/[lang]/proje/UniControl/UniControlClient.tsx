'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  Radio,
  Activity,
  Shield,
  Zap,
  Sliders,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  ExternalLink,
  Code2,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Layers,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';

export function UniControlClient() {
  const { t, lang } = useI18n();
  const isEn = lang === 'en';

  // Radar Interactive State
  const [targetDistance, setTargetDistance] = useState<number>(4.2); // meters
  const [targetAngle, setTargetAngle] = useState<number>(15); // degrees
  const [reverseGear, setReverseGear] = useState<boolean>(true);
  const [buzzerMuted, setBuzzerMuted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'radar' | 'io' | 'can'>('radar');

  // Threat Zone calculation
  const getThreatLevel = (dist: number) => {
    if (dist < 1.5) return { level: 'ZONE 1 - CRITICAL', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30', tone: 'FAST BEEP / CONTINUOUS' };
    if (dist < 3.5) return { level: 'ZONE 2 - WARNING', color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/30', tone: 'MEDIUM PULSE' };
    if (dist < 7.0) return { level: 'ZONE 3 - CAUTION', color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', tone: 'SLOW PULSE' };
    return { level: 'ZONE 4 - CLEAR', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', tone: 'STANDBY' };
  };

  const threat = getThreatLevel(targetDistance);

  // CAN Bus simulated frame stream
  const [canFrames, setCanFrames] = useState<Array<{ id: string; len: number; data: string; time: string }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;
      const rawDist = Math.round(targetDistance * 100).toString(16).padStart(4, '0').toUpperCase();
      const rawAngle = (Math.round((targetAngle + 60) * 2)).toString(16).padStart(2, '0').toUpperCase();
      
      const newFrame = {
        id: '0x18FF50E1',
        len: 8,
        data: `${rawDist.slice(0, 2)} ${rawDist.slice(2, 4)} ${rawAngle} 00 FF 01 ${reverseGear ? '80' : '00'} 4A`,
        time: timeStr,
      };

      setCanFrames((prev) => [newFrame, ...prev.slice(0, 5)]);
    }, 400);

    return () => clearInterval(interval);
  }, [targetDistance, targetAngle, reverseGear]);

  return (
    <section className="space-y-8">

      {/* Flagship Hero Card */}
      <div className="apple-card p-8 sm:p-12 md:p-14 space-y-8 relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold bg-orange-500/10 text-apple-orange border border-orange-500/20">
              <Cpu className="w-3.5 h-3.5" />
              ESP32-S3 · ESP-IDF · FreeRTOS
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-muted text-foreground/80 border border-border">
              v5.1.0 Architecture
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono text-apple-green bg-green-500/10 border border-green-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              ISO 16750 Field Verified
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.02]">
            UniControl
          </h1>

          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed font-normal max-w-2xl">
            {isEn
              ? 'Industrial automotive safety & vehicle telemetry controller. Unifies Brigade BS-9000 radar, CAN 2.0B / FD bus, Nextion HMI, black-box logging, and 24V isolated I/O.'
              : 'Ağır vasıtalar ve iş makineleri için ESP32-S3 tabanlı otomotiv güvenlik kontrolcüsü: Brigade BS-9000 radar, CAN 2.0B / FD hattı, Nextion HMI, kara kutu ve 24V izole I/O.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="https://github.com/alazndy/UniControl"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-foreground text-background hover:opacity-90 active:scale-95 transition-all shadow-md"
          >
            <Code2 className="w-4 h-4" />
            <span>{isEn ? 'GitHub Repository' : 'GitHub Kaynak Kod'}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
          <a
            href="https://github.com/alazndy/UniControl/blob/master/docs/v2-design-review.md"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider border border-border bg-card hover:bg-muted text-foreground transition-all shadow-xs"
          >
            <Layers className="w-4 h-4" />
            <span>{isEn ? 'V2 Design Review' : 'V2 Mimari Raporu'}</span>
          </a>
        </div>

        {/* Hardware Benchmark Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-border text-xs">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-apple-orange font-mono">250 kbps</div>
            <div className="text-muted-foreground mt-0.5">{isEn ? 'Classic CAN & FD' : 'CAN Veri Hattı'}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-apple-blue font-mono">&lt; 1 ms</div>
            <div className="text-muted-foreground mt-0.5">{isEn ? 'Radar Threat Eval' : 'Tehdit Ayrıştırma'}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-apple-green font-mono">24V DC</div>
            <div className="text-muted-foreground mt-0.5">{isEn ? 'Opto-Isolated I/O' : 'İzole Araç Girişi'}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-apple-purple font-mono">FATFS</div>
            <div className="text-muted-foreground mt-0.5">{isEn ? 'SD Black Box + RTC' : 'Kara Kutu Kaydı'}</div>
          </div>
        </div>
      </div>

      {/* ── LIVE INTERACTIVE SIMULATOR ── */}
      <div className="apple-card p-6 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-apple-orange uppercase tracking-wider">
              <Radio className="w-4 h-4" />
              <span>{isEn ? 'LIVE HARDWARE EMULATION HUD' : 'CANLI DONANIM VE RADAR SİMÜLATÖRÜ'}</span>
            </div>
            <h3 className="text-2xl font-extrabold text-foreground tracking-tight mt-1">
              {isEn ? 'Brigade BS-9000 Radar & Telemetry Engine' : 'Brigade BS-9000 Radar ve Telemetri Motoru'}
            </h3>
          </div>

          {/* Segmented Control */}
          <div className="inline-flex p-1 rounded-xl bg-muted/80 border border-border text-xs font-semibold">
            <button
              onClick={() => setActiveTab('radar')}
              className={cn(
                "px-3.5 py-1.5 rounded-lg transition-all",
                activeTab === 'radar' ? "bg-card text-foreground shadow-xs font-bold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isEn ? 'Radar Sweep' : 'Radar Taraması'}
            </button>
            <button
              onClick={() => setActiveTab('io')}
              className={cn(
                "px-3.5 py-1.5 rounded-lg transition-all",
                activeTab === 'io' ? "bg-card text-foreground shadow-xs font-bold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isEn ? '24V Vehicle I/O' : '24V Araç I/O'}
            </button>
            <button
              onClick={() => setActiveTab('can')}
              className={cn(
                "px-3.5 py-1.5 rounded-lg transition-all",
                activeTab === 'can' ? "bg-card text-foreground shadow-xs font-bold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isEn ? 'CAN 2.0B Stream' : 'CAN Veri Akışı'}
            </button>
          </div>
        </div>

        {/* TAB 1: RADAR SIMULATOR */}
        {activeTab === 'radar' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Interactive Radar Scope Display */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 rounded-3xl bg-muted/40 border border-border relative overflow-hidden">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border-2 border-border/80 flex items-center justify-center bg-card/90 shadow-inner">
                {/* Distance concentric circles */}
                <div className="absolute w-3/4 h-3/4 rounded-full border border-border/60" />
                <div className="absolute w-1/2 h-1/2 rounded-full border border-border/60" />
                <div className="absolute w-1/4 h-1/4 rounded-full border border-border/60" />
                <div className="absolute w-full h-0.5 bg-border/40" />
                <div className="absolute h-full w-0.5 bg-border/40" />

                {/* Radar Sweep Animation */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-500/20 via-transparent to-transparent animate-spin origin-center duration-3000 pointer-events-none" />

                {/* Center Vehicle Icon */}
                <div className="z-10 px-3 py-1 rounded-md bg-foreground text-background font-mono text-[10px] font-bold shadow-md">
                  HOST TRUCK
                </div>

                {/* Target Dot */}
                <motion.div
                  animate={{
                    x: Math.sin((targetAngle * Math.PI) / 180) * (targetDistance * 12),
                    y: -Math.cos((targetAngle * Math.PI) / 180) * (targetDistance * 12),
                  }}
                  transition={{ type: 'spring', damping: 15 }}
                  className={cn(
                    "absolute w-5 h-5 rounded-full flex items-center justify-center shadow-lg cursor-pointer",
                    threat.bg,
                    threat.border,
                    "border-2 ring-4 ring-orange-500/20"
                  )}
                >
                  <div className={cn("w-2.5 h-2.5 rounded-full animate-ping", threat.bg)} />
                </motion.div>
              </div>

              <div className="mt-4 flex items-center justify-between w-full max-w-sm px-2 text-xs font-mono text-muted-foreground">
                <span>RANGE: 0.5m - 20.0m</span>
                <span className={cn("font-bold", threat.color)}>{threat.level}</span>
              </div>
            </div>

            {/* Right: Telemetry Controls & HUD Status */}
            <div className="lg:col-span-6 space-y-5">
              <div className={cn("p-4 rounded-2xl border transition-all", threat.bg, threat.border)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={cn("w-5 h-5", threat.color)} />
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-foreground">{threat.level}</div>
                      <div className="text-[11px] font-mono text-muted-foreground">{threat.tone}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setBuzzerMuted(!buzzerMuted)}
                    className="p-2 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground"
                    title={buzzerMuted ? 'Unmute Acoustic Alarm' : 'Mute Acoustic Alarm'}
                  >
                    {buzzerMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-apple-orange" />}
                  </button>
                </div>
              </div>

              {/* Distance Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-muted-foreground">{isEn ? 'Target Obstacle Distance' : 'Engel Mesafesi'}:</span>
                  <span className="font-bold text-foreground">{targetDistance.toFixed(1)} m</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="15.0"
                  step="0.1"
                  value={targetDistance}
                  onChange={(e) => setTargetDistance(parseFloat(e.target.value))}
                  className="w-full accent-orange-500 bg-muted rounded-lg h-2 cursor-pointer"
                />
              </div>

              {/* Angle Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-muted-foreground">{isEn ? 'Radar Azimuth Angle' : 'Açısal Konum'}:</span>
                  <span className="font-bold text-foreground">{targetAngle}°</span>
                </div>
                <input
                  type="range"
                  min="-45"
                  max="45"
                  step="1"
                  value={targetAngle}
                  onChange={(e) => setTargetAngle(parseInt(e.target.value))}
                  className="w-full accent-orange-500 bg-muted rounded-lg h-2 cursor-pointer"
                />
              </div>

              {/* Reverse Gear Toggle */}
              <div className="pt-2 flex items-center justify-between p-3.5 rounded-2xl bg-muted/60 border border-border text-xs">
                <div>
                  <div className="font-bold text-foreground">{isEn ? 'Reverse Gear Interlock' : 'Geri Vites Sinyali (24V)'}</div>
                  <div className="text-[10px] text-muted-foreground">{isEn ? 'Activates high-power radar containment' : 'Yüksek güç radar alanını tetikler'}</div>
                </div>
                <button
                  onClick={() => setReverseGear(!reverseGear)}
                  className={cn(
                    "px-4 py-1.5 rounded-xl font-mono text-xs font-bold border transition-all",
                    reverseGear ? "bg-orange-500 text-white border-orange-600" : "bg-card text-muted-foreground border-border"
                  )}
                >
                  {reverseGear ? 'ACTIVE (24V)' : 'OFF (0V)'}
                </button>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: 24V VEHICLE I/O */}
        {activeTab === 'io' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-muted/50 border border-border space-y-2">
              <div className="text-[10px] font-mono text-muted-foreground uppercase">INPUT 1 · GPIO 14</div>
              <div className="text-sm font-bold text-foreground">Reverse Gear (24V)</div>
              <span className="inline-block px-2 py-0.5 text-[10px] font-mono rounded bg-green-500/10 text-apple-green border border-green-500/20">
                OPTO-COUPLER HIGH
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-muted/50 border border-border space-y-2">
              <div className="text-[10px] font-mono text-muted-foreground uppercase">OUTPUT 1 · GPIO 18</div>
              <div className="text-sm font-bold text-foreground">High-Side Horn Relay</div>
              <span className="inline-block px-2 py-0.5 text-[10px] font-mono rounded bg-orange-500/10 text-apple-orange border border-orange-500/20">
                MOSFET ARMED
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-muted/50 border border-border space-y-2">
              <div className="text-[10px] font-mono text-muted-foreground uppercase">UART1 · GPIO 17/16</div>
              <div className="text-sm font-bold text-foreground">Nextion 4.3" HMI</div>
              <span className="inline-block px-2 py-0.5 text-[10px] font-mono rounded bg-blue-500/10 text-apple-blue border border-blue-500/20">
                115200 BAUD SYNC
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-muted/50 border border-border space-y-2">
              <div className="text-[10px] font-mono text-muted-foreground uppercase">SPI · GPIO 13/12/11</div>
              <div className="text-sm font-bold text-foreground">MicroSD Black Box</div>
              <span className="inline-block px-2 py-0.5 text-[10px] font-mono rounded bg-purple-500/10 text-apple-purple border border-purple-500/20">
                FATFS LOGGING ON
              </span>
            </div>
          </div>
        )}

        {/* TAB 3: LIVE CAN BUS STREAM */}
        {activeTab === 'can' && (
          <div className="p-4 rounded-2xl bg-muted/60 border border-border space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center text-muted-foreground text-[11px] border-b border-border pb-2">
              <span>TIMESTAMP</span>
              <span>CAN ID</span>
              <span>DLC</span>
              <span>PAYLOAD (HEX)</span>
            </div>
            <div className="space-y-1.5">
              {canFrames.map((f, idx) => (
                <div key={idx} className="flex justify-between items-center text-foreground hover:bg-muted/80 p-1.5 rounded-lg transition-colors">
                  <span className="text-muted-foreground">{f.time}</span>
                  <span className="text-apple-blue font-bold">{f.id}</span>
                  <span className="text-muted-foreground">[{f.len}]</span>
                  <span className="text-apple-orange font-semibold">{f.data}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </section>
  );
}
