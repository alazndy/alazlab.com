'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Terminal,
  ShieldCheck,
  Cpu,
  Layers,
  Search,
  CheckCircle2,
  ExternalLink,
  Code2,
  Activity,
  Play,
  RotateCcw,
  Sparkles,
  Lock,
  Boxes,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';

interface Props {
  techStack: string[];
}

interface CommandOutput {
  cmd: string;
  output: string[];
  duration: string;
  badge: string;
}

const COMMANDS: Record<string, CommandOutput> = {
  'raios reflect': {
    cmd: 'raios reflect',
    badge: 'HEALTH SCORE 99/100',
    duration: '24ms',
    output: [
      '⚡ [R-AI-OS] Workspace Reflection Snapshot',
      '├── Active Projects Scanned: 41',
      '├── Clean Git Trees: 40/41 (1 dirty on portfolio-site)',
      '├── Secret Scans: 0 detected (AgentShield hard-enforced)',
      '├── Memory Subsystem: 41/41 synchronized with Cortex HNSW',
      '└── Overall Workspace Quality: 99.2% (Grade: A+)',
    ],
  },
  'raios locate "fn execute"': {
    cmd: 'raios locate "fn execute"',
    badge: 'TRIGRAM SEARCH 12ms',
    duration: '12ms',
    output: [
      '🔍 [Trigram Index] Query: "fn execute" (Scope: current project)',
      'crates/raios-core/src/factory/dispatcher.rs:142:    pub async fn execute(&self, cmd: FactoryCommand) -> Result<()>',
      'crates/raios-runtime/src/policy/evaluator.rs:88:    pub fn execute_with_audit(&self, tool: &str) -> PolicyDecision',
      'crates/raios-daemon/src/worker.rs:215:               pub async fn execute_task(task_id: Uuid) -> TaskResult',
      '✨ 3 exact matches found across 14,820 lines in 12.4ms (zero regex overhead)',
    ],
  },
  'raios pre-flight': {
    cmd: 'raios pre-flight',
    badge: 'GATE APPROVED',
    duration: '148ms',
    output: [
      '🛡️  [Pre-Flight Gate] Validating commit readiness...',
      '  [✓] Staged files verification (0 binary leaks, 0 credentials)',
      '  [✓] OWASP Security Audit (Argon2id, TLS 1.3, parameterized SQL)',
      '  [✓] Dependency CVE Scan (0 high / 0 critical vulnerabilities)',
      '  [✓] SIGMAP.md token context freshly generated',
      '🟢 Pre-flight passed! Safe to commit and push.',
    ],
  },
  'raios ocak overview': {
    cmd: 'raios ocak overview',
    badge: 'PRODUCT FACTORY',
    duration: '38ms',
    output: [
      '🏭 [Product Factory / Ocak] State Snapshot',
      '  Workspace: /home/alaz/dev/ (41 registered products)',
      '  Active Stage: Stage 4 (Execution & Evidence Collection)',
      '  Charter Approval Gate: Hard-Enforced (Non-Bypassable)',
      '  Active Swarm Worktrees: 0 active / 14 archived',
      '  Audit Hash-Chain Ledger: Tamper-free (Hash Verified)',
    ],
  },
};

export function RaiosClient({ techStack }: Props) {
  const { lang } = useI18n();
  const isEn = lang === 'en';

  const [activeCmd, setActiveCmd] = useState<string>('raios reflect');
  const [typedLines, setTypedLines] = useState<string[]>(COMMANDS['raios reflect'].output);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const runCommand = (cmdKey: string) => {
    if (isRunning) return;
    setActiveCmd(cmdKey);
    setIsRunning(true);
    setTypedLines(['$ ' + cmdKey, 'Executing...']);

    setTimeout(() => {
      setTypedLines(COMMANDS[cmdKey].output);
      setIsRunning(false);
    }, 450);
  };

  return (
    <section className="space-y-8">

      {/* Flagship Hero Card */}
      <div className="apple-card p-8 sm:p-12 md:p-14 space-y-8 relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold bg-red-500/10 text-apple-red border border-red-500/20">
              <Cpu className="w-3.5 h-3.5" />
              Rust 2024 · Tokio · Ratatui
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-muted text-foreground/80 border border-border">
              v3.7.1 Kernel
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono text-apple-green bg-green-500/10 border border-green-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              OWASP & AgentShield Verified
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.02]">
            R-AI-OS
          </h1>

          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed font-normal max-w-2xl">
            {isEn
              ? 'Local AI workspace orchestration kernel written in pure Rust. Unifies high-speed code search, audit-logged MCP policy gateways, autonomous cron agents, and memory vector stores.'
              : 'Gelişmiş AI orkestrasyon çekirdeği: Trigram kod arama, Cortex vektör hafızası, MCP güvenlik politikası, izole git swarm iş ağaçları ve Ocak ürün yaşam döngüsü.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="https://github.com/alazndy/R-AI-OS"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-foreground text-background hover:opacity-90 active:scale-95 transition-all shadow-md"
          >
            <Code2 className="w-4 h-4" />
            <span>{isEn ? 'GitHub Repository' : 'GitHub Kaynak Kod'}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>

        {/* Architecture Benchmark Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-border text-xs">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-apple-red font-mono">12 ms</div>
            <div className="text-muted-foreground mt-0.5">{isEn ? 'Trigram Search' : 'Hızlı Kod Arama'}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-apple-blue font-mono">0 ms</div>
            <div className="text-muted-foreground mt-0.5">{isEn ? 'Policy Pre-Simulation' : 'Politika Denetimi'}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-apple-purple font-mono">HNSW</div>
            <div className="text-muted-foreground mt-0.5">{isEn ? 'Cortex Vector Store' : 'Vektör Hafızası'}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-apple-green font-mono">SHA-256</div>
            <div className="text-muted-foreground mt-0.5">{isEn ? 'Hash-Chain Ledger' : 'Değişmez Denetim Günlüğü'}</div>
          </div>
        </div>
      </div>

      {/* ── LIVE INTERACTIVE TERMINAL HUD ── */}
      <div className="apple-card p-6 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-apple-red uppercase tracking-wider">
              <Terminal className="w-4 h-4" />
              <span>{isEn ? 'INTERACTIVE RUST CLI RUNNER' : 'İNTERAKTİF RUST TERMİNAL ÇALIŞTIRICI'}</span>
            </div>
            <h3 className="text-2xl font-extrabold text-foreground tracking-tight mt-1">
              {isEn ? 'Test Kernel Subsystems' : 'Çekirdek Komutlarını Canlı Dene'}
            </h3>
          </div>

          {/* Command Buttons */}
          <div className="flex flex-wrap gap-2">
            {Object.keys(COMMANDS).map((cmdKey) => (
              <button
                key={cmdKey}
                onClick={() => runCommand(cmdKey)}
                className={cn(
                  "px-3 py-1.5 rounded-xl font-mono text-xs font-semibold border transition-all flex items-center gap-1.5",
                  activeCmd === cmdKey
                    ? "bg-foreground text-background border-foreground shadow-xs font-bold"
                    : "bg-muted/70 text-muted-foreground hover:text-foreground border-border"
                )}
              >
                <Play className="w-3 h-3" />
                <span>{cmdKey}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Terminal Window */}
        <div className="rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-100 font-mono text-xs sm:text-sm p-5 sm:p-6 shadow-2xl overflow-x-auto space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3 text-zinc-500 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="ml-2 font-mono text-zinc-400">alaz@yoga-c930: ~/dev</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400">
                {COMMANDS[activeCmd]?.badge}
              </span>
              <span className="text-[10px] text-zinc-500">{COMMANDS[activeCmd]?.duration}</span>
            </div>
          </div>

          <div className="pt-2 space-y-1.5">
            <div className="text-zinc-400 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-white font-bold">{activeCmd}</span>
            </div>
            {typedLines.map((line, idx) => (
              <div
                key={idx}
                className={cn(
                  "leading-relaxed",
                  line.startsWith('⚡') || line.startsWith('🔍') || line.startsWith('🛡️') || line.startsWith('🏭')
                    ? "text-amber-300 font-bold"
                    : line.includes('✓') || line.includes('🟢') || line.includes('✨')
                    ? "text-emerald-400 font-semibold"
                    : "text-zinc-300"
                )}
              >
                {line}
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
