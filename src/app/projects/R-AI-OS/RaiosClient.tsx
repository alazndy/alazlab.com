'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ShieldCheck,
  FolderLock,
  ListChecks,
  Link2,
  Globe2,
  Cpu,
  Server,
  RadioTower,
  BrainCircuit,
  Clock,
  KeyRound,
  Fingerprint,
  Layers,
  GitMerge,
  Database,
  Terminal,
  LayoutPanelLeft,
  Settings2,
} from 'lucide-react';
import { Typewriter } from '@/components/ui/Typewriter';
import { cn } from '@/lib/utils';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

export function RaiosClient({ techStack }: { techStack: string[] }) {
  return (
    <div className="min-h-screen bg-black">

      {/* ── HERO ── */}
      <div className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,59,59,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,59,59,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <motion.div
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          className="absolute top-0 right-0 w-[700px] h-[700px] bg-lcars-red/10 blur-[150px] rounded-full pointer-events-none"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto relative z-10 space-y-8"
        >
          <Link href="/#projects" className="inline-flex items-center gap-2 text-foreground/50 hover:text-lcars-red transition-colors font-mono tracking-widest uppercase text-xs">
            <ArrowLeft className="w-4 h-4" />
            Back to Hub
          </Link>

          <div className="space-y-6 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-3 px-4 py-2 bg-lcars-red/10 border border-lcars-red/30 rounded-full font-mono text-xs uppercase tracking-widest text-lcars-red"
            >
              <ShieldCheck className="w-4 h-4" />
              Universal AI Agent Kernel
            </motion.div>

            {/* Terminal Mockup — native visual, not a screenshot of the marketing site */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative w-full rounded-[32px] overflow-hidden border border-border mb-12 bg-[#050505] shadow-2xl"
            >
              <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-black/40">
                <span className="w-2.5 h-2.5 rounded-full bg-lcars-red/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-lcars-orange/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-lcars-green/70" />
                <span className="ml-3 text-[10px] uppercase tracking-widest text-foreground/30 font-mono">raios — kernel v3.6.0</span>
                <span className="ml-auto flex items-center gap-1.5 text-[10px] font-mono text-lcars-green">
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.6 }}
                    className="w-1.5 h-1.5 rounded-full bg-lcars-green"
                  />
                  LIVE
                </span>
              </div>
              <div className="p-6 font-mono text-[11px] sm:text-xs leading-relaxed overflow-x-auto">
                <pre className="text-lcars-red font-bold leading-[1.15] whitespace-pre mb-6">
{`██████╗        █████╗ ██╗      ██████╗ ███████╗
██╔══██╗      ██╔══██╗██║     ██╔═══██╗██╔════╝
██████╔╝█████╗███████║██║     ██║   ██║███████╗
██╔══██╗╚════╝██╔══██║██║     ██║   ██║╚════██║
██║  ██║      ██║  ██║██║     ╚██████╔╝███████║
╚═╝  ╚═╝      ╚═╝  ╚═╝╚═╝      ╚═════╝ ╚══════╝`}
                </pre>
                <div className="space-y-1.5 text-foreground/50">
                  <div><span className="text-foreground/30">$</span> raios health <span className="text-lcars-green">→ 140+ proje taranıyor...</span></div>
                  <div><span className="text-foreground/30">$</span> raios verify-chain <span className="text-lcars-green">→ audit chain intact ✓</span></div>
                  <div className="flex items-center gap-1">
                    <span className="text-foreground/30">$</span> raios search &quot;agent handoff&quot;
                    <Typewriter text="→ 1.0s (resident cortex)" speed={25} delay={800} className="text-lcars-cyan" />
                  </div>
                  <div className="text-foreground/25 pt-1">■ aiosd daemon — :42069 :42070 :42071 listening</div>
                </div>
              </div>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-foreground drop-shadow-[0_0_15px_rgba(255,59,59,0.2)]">
              R-AI-OS
            </h1>
            <p className="text-xl md:text-2xl text-foreground/60 font-light leading-relaxed">
              Birden fazla AI ajanının (Claude, Codex, OpenCode, Antigravity) aynı anda çalıştığı ortamlarda insan ile ajan sürüsü arasına giren hardened Rust çekirdeği. Kaos yerine denetimli sürü.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-6 space-y-16 relative z-10">

        {/* ── METRICS ── */}
        <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Kernel Sürümü', val: 'v3.6.0', icon: ShieldCheck, color: 'text-lcars-red' },
            { label: 'Roadmap', val: '26 / 26 Faz', icon: GitMerge, color: 'text-lcars-green' },
            { label: 'Protokoller', val: '3 (TCP/MCP/HTTP)', icon: RadioTower, color: 'text-lcars-cyan' },
            { label: 'Portfolio', val: '140+ Proje', icon: Database, color: 'text-lcars-purple' },
          ].map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass p-6 rounded-2xl border-border flex flex-col items-center text-center space-y-3"
            >
              <m.icon className={`w-6 h-6 ${m.color}`} />
              <div>
                <div className="text-lg font-black text-foreground tracking-tight">{m.val}</div>
                <div className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest">{m.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── SECURITY KERNEL — 4 LAYERS ── */}
        <div className="space-y-8">
          <motion.div {...fadeUp} className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight">Security Kernel</h2>
            <p className="text-foreground/40 text-sm font-mono uppercase tracking-widest">Zero-Trust — 4 Katman, Tamamı Test Edilmiş</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FolderLock, title: 'FS Sandbox', desc: 'Path canonicalization ile traversal (../../) engellenir. .ssh, AppData gibi klasörler tamamen kapalı.' },
              { icon: ListChecks, title: 'Policy Manager', desc: 'raios-policy.toml ile allow/deny/confirm kuralları. Headless modda onaysız işlemler fail-closed reddedilir.' },
              { icon: Link2, title: 'Audit Chain', desc: 'SHA-256 hash-chained SQLite ledger. Tek satır silinirse zincir bozulur, raios verify-chain ile doğrulanır.' },
              { icon: Globe2, title: 'Egress Filter', desc: 'Domain allowlist/blocklist ile HTTP/HTTPS çağrıları kısıtlanır. Tanınmayan domain fail-closed reddedilir.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="glass p-6 rounded-3xl border-border space-y-4 hover:border-lcars-red/30 transition-colors"
              >
                <item.icon className="w-7 h-7 text-lcars-red" />
                <h3 className="text-sm font-black text-foreground uppercase tracking-tight">{item.title}</h3>
                <p className="text-xs text-foreground/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── ARCHITECTURE ── */}
        <motion.div {...fadeUp} className="glass p-8 md:p-12 rounded-[32px] border-border space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">İkili Çekirdek Mimarisi</h2>
            <p className="text-foreground/40 text-sm font-mono uppercase tracking-widest">cargo install --path . — İki Bağımsız Binary</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/3 glass bg-black/40 p-6 rounded-3xl border border-border flex flex-col items-center text-center space-y-4"
            >
              <div className="w-16 h-16 bg-foreground/5 rounded-2xl flex items-center justify-center border border-border">
                <Cpu className="w-8 h-8 text-lcars-cyan" />
              </div>
              <div>
                <div className="font-black text-foreground">raios binary</div>
                <div className="text-[10px] font-mono text-foreground/50 uppercase mt-1">TUI + CLI Entrypoint</div>
              </div>
              <p className="text-xs text-foreground/40 leading-relaxed">Argümansız çağrıldığında Ratatui TUI&apos;yi başlatır; subcommand algılanırsa cli::run()&apos;a devreder.</p>
            </motion.div>

            <div className="flex flex-col items-center text-center space-y-2">
              <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                <RadioTower className="w-6 h-6 text-lcars-red" />
              </motion.div>
              <div className="text-xs font-mono text-lcars-red uppercase tracking-widest">Tri-Protocol Bus</div>
              <div className="h-0.5 w-16 bg-gradient-to-r from-lcars-red to-transparent hidden md:block" />
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/3 glass bg-black/40 p-6 rounded-3xl border border-border flex flex-col items-center text-center space-y-4"
            >
              <div className="w-16 h-16 bg-foreground/5 rounded-2xl flex items-center justify-center border border-border">
                <Server className="w-8 h-8 text-lcars-orange" />
              </div>
              <div>
                <div className="font-black text-foreground">aiosd daemon</div>
                <div className="text-[10px] font-mono text-foreground/50 uppercase mt-1">Tokio Async Runtime</div>
              </div>
              <p className="text-xs text-foreground/40 leading-relaxed">Güvenlik filtreleri, MCP sunucusu ve RPC kanalları bu daemon üzerinden akar; tek event bus paylaşılır.</p>
            </motion.div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-4 border-t border-border">
            <span className="px-3 py-1.5 bg-foreground/5 border border-border rounded-lg text-xs font-mono text-foreground/70">:42069 TCP — Daemon IPC</span>
            <span className="px-3 py-1.5 bg-foreground/5 border border-border rounded-lg text-xs font-mono text-foreground/70">:42070 MCP-over-TCP — Ajan Araç Çağrıları</span>
            <span className="px-3 py-1.5 bg-foreground/5 border border-border rounded-lg text-xs font-mono text-foreground/70">:42071 HTTP/WS — VS Code + Entegrasyonlar</span>
          </div>
        </motion.div>

        {/* ── DEEP SYSTEM ANALYSIS (tabbed) ── */}
        <DeepSystemAnalysis />

        {/* ── YENİ NESİL MODÜLLER ── */}
        <div className="space-y-8">
          <motion.h2 {...fadeUp} className="text-3xl font-black text-foreground uppercase tracking-tight text-center">
            Yeni Nesil Modüller
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: BrainCircuit, iconClass: 'text-lcars-purple', hoverClass: 'hover:border-lcars-purple/30', title: 'Trace Memory', desc: <>Hata ve düzeltmesi yerelde SQLite&apos;a kaydedilir; aynı hata tekrar oluşmadan önce hatırlanır. Başarılı fix&apos;ler instinct adayına dönüşür.</> },
              { icon: Clock, iconClass: 'text-lcars-cyan', hoverClass: 'hover:border-lcars-cyan/30', title: 'Autonomous Scheduler', desc: <><code className="text-xs">raios cron add/list/pause/resume</code> — control plane üzerinde atomik claim ile çalışan zamanlanmış görevler.</> },
              { icon: KeyRound, iconClass: 'text-lcars-orange', hoverClass: 'hover:border-lcars-orange/30', title: 'Secret Leasing', desc: <>TTL&apos;li otomatik iptal ile <code className="text-xs">raios secret grant/revoke</code>; her araç için sabit pencereli rate limiting.</> },
              { icon: Fingerprint, iconClass: 'text-lcars-green', hoverClass: 'hover:border-lcars-green/30', title: 'Tool Pinning', desc: <>Araç manifestosu SHA-256 ile imzalanır; uyuşmazlıkta çağrı reddedilir. Drift anında yakalanır.</> },
              { icon: Layers, iconClass: 'text-lcars-red', hoverClass: 'hover:border-lcars-red/30', title: 'Layered Memory', desc: <>L0→L3 hiyerarşisi: atomik gerçek → günlük sahne → persona. <code className="text-xs">mem_nodes</code>/<code className="text-xs">mem_lineage</code> ile gerçek izlenebilirlik.</> },
              { icon: RadioTower, iconClass: 'text-lcars-purple', hoverClass: 'hover:border-lcars-purple/30', title: 'Resident Cortex', desc: <>fastembed (all-MiniLM-L6-v2) gerçek embedding&apos;leri aiosd içinde kalıcı worker olarak yaşar — semantic search ~1s&apos;de.</> },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
                whileHover={{ y: -4 }}
                className={cn('glass p-8 rounded-3xl border-border space-y-4 transition-colors', item.hoverClass)}
              >
                <item.icon className={cn('w-8 h-8', item.iconClass)} />
                <h3 className="text-lg font-black text-foreground uppercase tracking-tight">{item.title}</h3>
                <p className="text-foreground/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── STACK & VS CODE ── */}
        <motion.div {...fadeUp} className="glass rounded-[32px] border-border p-8 md:p-12 space-y-8 bg-foreground/5">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between border-b border-border pb-8">
            <div className="space-y-4 max-w-lg">
              <h2 className="text-2xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-lcars-red" />
                VS Code Extension v0.8.0
              </h2>
              <p className="text-foreground/50 text-sm leading-relaxed">
                Sidebar&apos;da tam kontrol paneli: Git Status, Plans, Tasks, Swarm (inline Approve), Quick Actions. TokenBridge proxy sayesinde session token hiçbir zaman Webview&apos;a gitmez.
              </p>
            </div>
            <code className="block bg-black/40 border border-border p-4 rounded-xl text-xs text-foreground/70 font-mono whitespace-nowrap">
              code --install-extension raios-0.8.0.vsix --force
            </code>
          </div>

          <div className="space-y-4">
            <div className="text-[10px] font-mono text-foreground/30 uppercase tracking-widest">Technology Stack</div>
            <div className="flex flex-wrap gap-2">
              {techStack.map(tech => (
                <span key={tech} className="px-4 py-2 bg-black border border-border rounded-lg text-xs font-mono text-foreground/70">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const TABS = [
  { id: 'overview', label: '01 // Genel Bakış', icon: LayoutPanelLeft },
  { id: 'cli', label: '02 // CLI Katmanı', icon: Terminal },
  { id: 'tui', label: '03 // TUI Dashboard', icon: Settings2 },
  { id: 'kernel', label: '04 // Daemon Çekirdek', icon: RadioTower },
] as const;

type TabId = (typeof TABS)[number]['id'];

function DeepSystemAnalysis() {
  const [active, setActive] = useState<TabId>('overview');

  return (
    <motion.div {...fadeUp} className="border border-border bg-[#050505] rounded-[32px] p-6 md:p-10 shadow-2xl">
      <div className="mb-8 border-b border-border pb-6">
        <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-foreground mb-2 flex items-center gap-2">
          <Terminal size={22} className="text-lcars-red" />
          Aşırı Detaylı Sistem Analizi
        </h3>
        <p className="text-[11px] font-mono text-foreground/40 uppercase tracking-wider">
          Kernel v3.6.0 — /home/alaz/dev/core/R-AI-OS
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-6">
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 text-[11px] font-mono uppercase tracking-widest transition-all duration-200 border cursor-pointer rounded-lg',
                isActive
                  ? 'bg-lcars-red/10 border-lcars-red/50 text-lcars-red'
                  : 'bg-transparent border-border text-foreground/40 hover:border-foreground/30 hover:text-foreground/70'
              )}
            >
              <Icon size={12} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-[280px] bg-black/40 border border-border rounded-2xl p-6 font-mono text-[13px] leading-relaxed"
      >
        {active === 'overview' && (
          <div className="space-y-5">
            <div>
              <span className="text-lcars-red text-[11px] uppercase tracking-wider block mb-1">Proje Konumu</span>
              <div className="text-foreground text-[15px] font-bold">/home/alaz/dev/core/R-AI-OS</div>
            </div>
            <p className="text-foreground/50 border-l border-border pl-4">
              Tamamen Rust ile yazılmış bir workspace orchestration engine. Tek bir <code className="text-lcars-orange">raios</code> CLI ikilisiyle proje sağlığı, güvenlik, build, git ve AI ajan yönetimini tek çatı altında toplar.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-foreground/5 border border-border p-4 rounded-xl">
                <div className="text-foreground font-bold mb-1 text-xs uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-lcars-green rounded-full" /> raios binary
                </div>
                <p className="text-foreground/40 text-xs">Ratatui TUI dashboard + tüm CLI subcommand&apos;leri.</p>
              </div>
              <div className="bg-foreground/5 border border-border p-4 rounded-xl">
                <div className="text-lcars-cyan font-bold mb-1 text-xs uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-lcars-cyan rounded-full" /> aiosd daemon
                </div>
                <p className="text-foreground/40 text-xs">Arka planda kesintisiz çalışan; güvenlik filtreleri, MCP sunucusu, RPC kanalları buradan akar.</p>
              </div>
            </div>
          </div>
        )}

        {active === 'cli' && (
          <div className="space-y-5">
            <div>
              <span className="text-lcars-orange text-[11px] uppercase tracking-wider block mb-1">Giriş Noktası</span>
              <div className="text-foreground text-[15px] font-bold">src/bin/raios.rs</div>
            </div>
            <p className="text-foreground/50 border-l border-border pl-4">
              CLI katmanı komut satırı argümanlarını çözümler. Geçerli bir subcommand algılanırsa <code className="text-lcars-orange">cli::run()</code> modülüne devreder; argümansız çağrılırsa otomatik TUI moduna geçer.
            </p>
            <div className="bg-foreground/5 border border-border p-4 rounded-xl text-[12px] space-y-1">
              <div className="flex justify-between border-b border-border pb-1"><span>raios &lt;subcommand&gt;</span> <span className="text-foreground/40">→ cli::run()</span></div>
              <div className="flex justify-between pt-1"><span>raios (boş)</span> <span className="text-foreground/40">→ TUI</span></div>
            </div>
          </div>
        )}

        {active === 'tui' && (
          <div className="space-y-5">
            <div>
              <span className="text-lcars-purple text-[11px] uppercase tracking-wider block mb-1">Kod Dizini</span>
              <div className="text-foreground text-[15px] font-bold">src/ui/panels/ &amp; src/app/events/</div>
            </div>
            <p className="text-foreground/50 border-l border-border pl-4">
              Ratatui + crossterm tabanlı terminal arayüzü. Klavye/komut işleme <code className="text-lcars-orange">src/app/events/</code> altında, panel render mantığı <code className="text-lcars-orange">src/ui/panels/</code> altında yaşar.
            </p>
            <div>
              <span className="text-foreground/40 text-[11px] uppercase tracking-wider block mb-2">14 Paralel Dashboard Paneli</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-foreground/50">
                {['dashboard_main', 'menu', 'header', 'content', 'tasks', 'agents', 'inbox', 'logs', 'scheduler', 'timeline', 'recent', 'stats', 'rules', 'help'].map(p => (
                  <div key={p} className="bg-foreground/5 border border-border px-2 py-1 flex items-center gap-2 rounded">
                    <span className="text-lcars-green">■</span> {p}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {active === 'kernel' && (
          <div className="space-y-5">
            <div>
              <span className="text-lcars-cyan text-[11px] uppercase tracking-wider block mb-1">Daemon Çekirdeği</span>
              <div className="text-foreground text-[15px] font-bold">src/bin/aiosd.rs &amp; src/daemon/</div>
            </div>
            <p className="text-foreground/50 border-l border-border pl-4">
              Tokio async runtime üzerinde aynı anda 3 bağımsız ağ protokolünü tek bir asenkron döngüde dinler. Tüm protokoller tek bir event bus ve tek bir security kernel paylaşır.
            </p>
            <div className="bg-foreground/5 border border-border p-4 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-[12px]">
              <div className="sm:border-r sm:border-border sm:pr-2">
                <span className="text-lcars-green font-bold">PORT 42069</span>
                <p className="text-foreground/40 text-[11px] mt-1">Daemon TCP: TUI IPC, UUID token auth.</p>
              </div>
              <div className="sm:border-r sm:border-border sm:pr-2">
                <span className="text-lcars-green font-bold">PORT 42070</span>
                <p className="text-foreground/40 text-[11px] mt-1">MCP-over-TCP: politika kapılı ajan çağrıları.</p>
              </div>
              <div>
                <span className="text-lcars-green font-bold">PORT 42071</span>
                <p className="text-foreground/40 text-[11px] mt-1">HTTP/WS: Axum tabanlı REST + canlı akış.</p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
