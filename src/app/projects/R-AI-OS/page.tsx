import React from 'react';
import Link from 'next/link';
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
} from 'lucide-react';
import { getProjectBySlug } from '@/lib/markdown';
import { marked } from 'marked';

export default async function RAIOSPage() {
  const project = getProjectBySlug('R-AI-OS');
  const contentHtml = await marked.parse(project?.content || '');

  return (
    <div className="min-h-screen pb-24 animate-in fade-in duration-1000 bg-black">

      {/* ── HERO ── */}
      <div className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,59,59,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,59,59,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-lcars-red/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10 space-y-8">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-foreground/50 hover:text-lcars-red transition-colors font-mono tracking-widest uppercase text-xs">
            <ArrowLeft className="w-4 h-4" />
            Back to Hub
          </Link>

          <div className="space-y-6 max-w-3xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-lcars-red/10 border border-lcars-red/30 rounded-full font-mono text-xs uppercase tracking-widest text-lcars-red">
              <ShieldCheck className="w-4 h-4" />
              Universal AI Agent Kernel
            </div>

            {/* Terminal Mockup — native visual, not a screenshot of the marketing site */}
            <div className="relative w-full rounded-[32px] overflow-hidden border border-border mb-12 bg-[#050505] shadow-2xl">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-black/40">
                <span className="w-2.5 h-2.5 rounded-full bg-lcars-red/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-lcars-orange/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-lcars-green/70" />
                <span className="ml-3 text-[10px] uppercase tracking-widest text-foreground/30 font-mono">raios — kernel v3.6.0</span>
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
                  <div><span className="text-foreground/30">$</span> raios search &quot;agent handoff&quot; <span className="text-lcars-cyan">→ 1.0s (resident cortex)</span></div>
                  <div className="text-foreground/25 pt-1">■ aiosd daemon — :42069 :42070 :42071 listening</div>
                </div>
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-foreground drop-shadow-[0_0_15px_rgba(255,59,59,0.2)]">R-AI-OS</h1>
            <p className="text-xl md:text-2xl text-foreground/60 font-light leading-relaxed">
              Birden fazla AI ajanının (Claude, Codex, OpenCode, Antigravity) aynı anda çalıştığı ortamlarda insan ile ajan sürüsü arasına giren hardened Rust çekirdeği. Kaos yerine denetimli sürü.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 space-y-16 relative z-10">

        {/* ── METRICS ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Kernel Sürümü', val: 'v3.6.0', icon: ShieldCheck, color: 'text-lcars-red' },
            { label: 'Roadmap', val: '26 / 26 Faz', icon: GitMerge, color: 'text-lcars-green' },
            { label: 'Protokoller', val: '3 (TCP/MCP/HTTP)', icon: RadioTower, color: 'text-lcars-cyan' },
            { label: 'Portfolio', val: '140+ Proje', icon: Database, color: 'text-lcars-purple' },
          ].map((m, i) => (
            <div key={i} className="glass p-6 rounded-2xl border-border flex flex-col items-center text-center space-y-3">
              <m.icon className={`w-6 h-6 ${m.color}`} />
              <div>
                <div className="text-lg font-black text-foreground tracking-tight">{m.val}</div>
                <div className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest">{m.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── SECURITY KERNEL — 4 LAYERS ── */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight">Security Kernel</h2>
            <p className="text-foreground/40 text-sm font-mono uppercase tracking-widest">Zero-Trust — 4 Katman, Tamamı Test Edilmiş</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FolderLock, title: 'FS Sandbox', desc: 'Path canonicalization ile traversal (../../) engellenir. .ssh, AppData gibi klasörler tamamen kapalı.' },
              { icon: ListChecks, title: 'Policy Manager', desc: 'raios-policy.toml ile allow/deny/confirm kuralları. Headless modda onaysız işlemler fail-closed reddedilir.' },
              { icon: Link2, title: 'Audit Chain', desc: 'SHA-256 hash-chained SQLite ledger. Tek satır silinirse zincir bozulur, raios verify-chain ile doğrulanır.' },
              { icon: Globe2, title: 'Egress Filter', desc: 'Domain allowlist/blocklist ile HTTP/HTTPS çağrıları kısıtlanır. Tanınmayan domain fail-closed reddedilir.' },
            ].map((item, i) => (
              <div key={i} className="glass p-6 rounded-3xl border-border space-y-4 hover:border-lcars-red/30 transition-all">
                <item.icon className="w-7 h-7 text-lcars-red" />
                <h3 className="text-sm font-black text-foreground uppercase tracking-tight">{item.title}</h3>
                <p className="text-xs text-foreground/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── ARCHITECTURE ── */}
        <div className="glass p-8 md:p-12 rounded-[32px] border-border space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">İkili Çekirdek Mimarisi</h2>
            <p className="text-foreground/40 text-sm font-mono uppercase tracking-widest">cargo install --path . — İki Bağımsız Binary</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">
            <div className="w-full md:w-1/3 glass bg-black/40 p-6 rounded-3xl border border-border flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-foreground/5 rounded-2xl flex items-center justify-center border border-border">
                <Cpu className="w-8 h-8 text-lcars-cyan" />
              </div>
              <div>
                <div className="font-black text-foreground">raios binary</div>
                <div className="text-[10px] font-mono text-foreground/50 uppercase mt-1">TUI + CLI Entrypoint</div>
              </div>
              <p className="text-xs text-foreground/40 leading-relaxed">Argümansız çağrıldığında Ratatui TUI&apos;yi başlatır; subcommand algılanırsa cli::run()&apos;a devreder.</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <RadioTower className="w-6 h-6 text-lcars-red animate-pulse" />
              <div className="text-xs font-mono text-lcars-red uppercase tracking-widest">Tri-Protocol Bus</div>
              <div className="h-0.5 w-16 bg-gradient-to-r from-lcars-red to-transparent hidden md:block" />
            </div>

            <div className="w-full md:w-1/3 glass bg-black/40 p-6 rounded-3xl border border-border flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-foreground/5 rounded-2xl flex items-center justify-center border border-border">
                <Server className="w-8 h-8 text-lcars-orange" />
              </div>
              <div>
                <div className="font-black text-foreground">aiosd daemon</div>
                <div className="text-[10px] font-mono text-foreground/50 uppercase mt-1">Tokio Async Runtime</div>
              </div>
              <p className="text-xs text-foreground/40 leading-relaxed">Güvenlik filtreleri, MCP sunucusu ve RPC kanalları bu daemon üzerinden akar; tek broadcast kanalı paylaşılır.</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-4 border-t border-border">
            <span className="px-3 py-1.5 bg-foreground/5 border border-border rounded-lg text-xs font-mono text-foreground/70">:42069 TCP — Daemon IPC</span>
            <span className="px-3 py-1.5 bg-foreground/5 border border-border rounded-lg text-xs font-mono text-foreground/70">:42070 MCP-over-TCP — Ajan Araç Çağrıları</span>
            <span className="px-3 py-1.5 bg-foreground/5 border border-border rounded-lg text-xs font-mono text-foreground/70">:42071 HTTP/WS — VS Code + Entegrasyonlar</span>
          </div>
        </div>

        {/* ── YENİ NESİL MODÜLLER ── */}
        <div className="space-y-8">
          <h2 className="text-3xl font-black text-foreground uppercase tracking-tight text-center">Yeni Nesil Modüller</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-8 rounded-3xl border-border space-y-4 hover:border-lcars-purple/30 transition-all">
              <BrainCircuit className="w-8 h-8 text-lcars-purple" />
              <h3 className="text-lg font-black text-foreground uppercase tracking-tight">Trace Memory</h3>
              <p className="text-foreground/50 text-sm leading-relaxed">
                Hata ve düzeltmesi yerelde SQLite&apos;a kaydedilir; aynı hata tekrar oluşmadan önce hatırlanır. Başarılı fix&apos;ler instinct adayına dönüşür.
              </p>
            </div>
            <div className="glass p-8 rounded-3xl border-border space-y-4 hover:border-lcars-cyan/30 transition-all">
              <Clock className="w-8 h-8 text-lcars-cyan" />
              <h3 className="text-lg font-black text-foreground uppercase tracking-tight">Autonomous Scheduler</h3>
              <p className="text-foreground/50 text-sm leading-relaxed">
                <code className="text-xs">raios cron add/list/pause/resume</code> — control plane üzerinde atomik claim ile çalışan zamanlanmış görevler.
              </p>
            </div>
            <div className="glass p-8 rounded-3xl border-border space-y-4 hover:border-lcars-orange/30 transition-all">
              <KeyRound className="w-8 h-8 text-lcars-orange" />
              <h3 className="text-lg font-black text-foreground uppercase tracking-tight">Secret Leasing</h3>
              <p className="text-foreground/50 text-sm leading-relaxed">
                TTL&apos;li otomatik iptal ile <code className="text-xs">raios secret grant/revoke</code>; her araç için sabit pencereli rate limiting.
              </p>
            </div>
            <div className="glass p-8 rounded-3xl border-border space-y-4 hover:border-lcars-green/30 transition-all">
              <Fingerprint className="w-8 h-8 text-lcars-green" />
              <h3 className="text-lg font-black text-foreground uppercase tracking-tight">Tool Pinning</h3>
              <p className="text-foreground/50 text-sm leading-relaxed">
                Araç manifestosu SHA-256 ile imzalanır; uyuşmazlıkta çağrı reddedilir. Drift anında yakalanır.
              </p>
            </div>
            <div className="glass p-8 rounded-3xl border-border space-y-4 hover:border-lcars-red/30 transition-all">
              <Layers className="w-8 h-8 text-lcars-red" />
              <h3 className="text-lg font-black text-foreground uppercase tracking-tight">Layered Memory</h3>
              <p className="text-foreground/50 text-sm leading-relaxed">
                L0→L3 hiyerarşisi: atomik gerçek → günlük sahne → persona. <code className="text-xs">mem_nodes</code>/<code className="text-xs">mem_lineage</code> ile gerçek izlenebilirlik.
              </p>
            </div>
            <div className="glass p-8 rounded-3xl border-border space-y-4 hover:border-lcars-purple/30 transition-all">
              <RadioTower className="w-8 h-8 text-lcars-purple" />
              <h3 className="text-lg font-black text-foreground uppercase tracking-tight">Resident Cortex</h3>
              <p className="text-foreground/50 text-sm leading-relaxed">
                fastembed (all-MiniLM-L6-v2) gerçek embedding&apos;leri aiosd içinde kalıcı worker olarak yaşar — semantic search ~1s&apos;de.
              </p>
            </div>
          </div>
        </div>

        {/* ── STACK & VS CODE ── */}
        <div className="glass rounded-[32px] border-border p-8 md:p-12 space-y-8 bg-foreground/5">
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
              {(project?.metadata.techStack ?? ['Rust', 'Tokio', 'Ratatui', 'Axum', 'SQLite', 'MCP', 'fastembed']).map(tech => (
                <span key={tech} className="px-4 py-2 bg-black border border-border rounded-lg text-xs font-mono text-foreground/70">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── DYNAMIC PROJECT DETAILS ── */}
        <div className="glass p-8 md:p-12 rounded-[32px] border-border mt-16 max-w-5xl mx-auto px-6 relative z-10 mb-16">
          <div
            className="prose prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight prose-headings:text-foreground prose-p:text-foreground/60 prose-li:text-foreground/60 prose-strong:text-foreground/90 prose-a:text-lcars-red prose-code:text-lcars-orange [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-black/40 [&_pre]:border [&_pre]:border-border [&_pre]:p-4"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </div>
    </div>
  );
}
