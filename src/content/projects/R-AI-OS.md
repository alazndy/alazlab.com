---
image: "/projects/R-AI-OS.png"
title: "R-AI-OS"
category: "Security"
status: "Active"
summary: "Rust tabanlı, çoklu AI ajan sürülerini (Claude, Codex, OpenCode, Antigravity) tek güvenlik ve orkestrasyon çekirdeği altında toplayan Universal AI Agent Kernel & Terminal Control Center. Kernel v3.6.0 — 26 tamamlanmış roadmap fazı."
techStack: ["Rust", "Tokio", "Ratatui", "Axum", "SQLite", "MCP", "fastembed"]
github: "https://github.com/alazndy/R-AI-OS"
---

## 🧠 Sistem Özeti

Kaos yerine denetimli sürü. Birden fazla AI ajanı paralel çalışmaya başladığında ortaya çıkan riskleri — yanlış dosya silme, gizli anahtarların log'a düşmesi, izinsiz sunuculara istek atılması — tek bir hardened Rust çekirdeğinde toplayıp politikaya bağlayan workspace orchestration engine. **Kernel v3.6.0**, 140+ proje üzerinde çalışıyor ve 26 roadmap fazının tamamı tamamlanmış durumda.

<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-12">
  <div class="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all group hover:scale-[1.02]">
    <div class="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20 mb-6 group-hover:scale-110 transition-transform">
      <span class="text-3xl">🛡️</span>
    </div>
    <h3 class="text-xl font-black text-white uppercase tracking-tight mb-3">Vigils Security</h3>
    <p class="text-sm text-white/40 leading-relaxed">FS Sandbox, politika yöneticisi, SHA-256 hash zincirli denetim günlüğü ve egress filtresinden oluşan 4 katmanlı güvenlik çekirdeği.</p>
  </div>

  <div class="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all group hover:scale-[1.02]">
    <div class="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 mb-6 group-hover:scale-110 transition-transform">
      <span class="text-3xl">🧭</span>
    </div>
    <h3 class="text-xl font-black text-white uppercase tracking-tight mb-3">Resident Cortex</h3>
    <p class="text-sm text-white/40 leading-relaxed">Sigmap imza haritası, gerçek fastembed (all-MiniLM-L6-v2) embedding'leri ve aiosd içinde yaşayan kalıcı worker sayesinde %97 token tasarrufu, ~1s'de semantic search.</p>
  </div>

  <div class="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all group hover:scale-[1.02]">
    <div class="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 mb-6 group-hover:scale-110 transition-transform">
      <span class="text-3xl">🐝</span>
    </div>
    <h3 class="text-xl font-black text-white uppercase tracking-tight mb-3">Swarm Mesh</h3>
    <p class="text-sm text-white/40 leading-relaxed">State machine üzerinde ilerleyen görevler, dosya/görev seviyesinde kilit yönetimi ve atomik ajan devri (handoff).</p>
  </div>

  <div class="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all group hover:scale-[1.02]">
    <div class="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mb-6 group-hover:scale-110 transition-transform">
      <span class="text-3xl">📊</span>
    </div>
    <h3 class="text-xl font-black text-white uppercase tracking-tight mb-3">Portfolio Intelligence</h3>
    <p class="text-sm text-white/40 leading-relaxed">140+ proje üzerinde health scanner, GitHub senkronizasyonu ve auto-discovery ile tüm workspace'in sağlığını tek komutla raporlar.</p>
  </div>
</div>

---

## 🏗️ Mimari — İkili Çekirdek

Derlendiğinde iki bağımsız binary üretir:

- **`raios` binary** — Hem Ratatui tabanlı zengin TUI dashboard'unu başlatır hem de tüm CLI subcommand'lerini yürütür. Argümansız çağrıldığında otomatik TUI moduna geçer, geçerli bir subcommand algılandığında `cli::run()` modülüne devreder.
- **`aiosd` daemon** — Tokio async runtime üzerinde arka planda kesintisiz çalışır. Güvenlik filtreleri, MCP sunucusu ve RPC kanalları bu daemon üzerinden akar; tüm protokoller tek bir `broadcast::Sender<String>` kanalını paylaşır.

```
Sen → [ R-AI-OS ÇEKİRDEĞİ ] → Ajan Sürüsü
              ↓
   ┌──────────────────────────────┐
   │  Güvenlik   │  Cortex  │  Swarm  │
   │  Politika   │  BM25    │  Kilit  │
   │  Audit Log  │  Sigmap  │  Handoff│
   └──────────────────────────────┘
        ↓ TCP :42069  ↓ MCP :42070  ↓ HTTP :42071
```

### Protokol Üçlüsü

- **`:42069` TCP** — CLI ↔ Daemon IPC (UUID token auth)
- **`:42070` MCP-over-TCP** — Ajan araç çağrıları, politika kapılı
- **`:42071` HTTP/WS** — VS Code extension + dış entegrasyonlar

---

## 🔒 Güvenlik Çekirdeği — 4 Katman

1. **FS Sandbox** — Yalnızca belirlenen dizin sınırları içinde okuma/yazma. Path traversal (`../../`) engellenir; `.ssh`, `AppData` gibi klasörler tamamen kapalıdır.
2. **Politika Yöneticisi** — MCP araç çağrıları `raios-policy.toml` ile denetlenir. `allow`, `deny`, `confirm` kuralları işler; headless modda onaysız işlemler reddedilir.
3. **Denetim Zinciri** — Kararlar SQLite'a SHA-256 hash zinciriyle yazılır. Bir satır silinirse zincir bozulur; `raios verify-chain` ile bütünlük doğrulanır.
4. **Egress Filtresi** — Dış dünyaya yapılan HTTP çağrıları domain allowlist/blocklist ile kısıtlanır; ngrok, RequestBin gibi sızdırma vektörleri engellenir.

> **Redaksiyon Motoru:** Loglar yazılmadan önce 20+ regex ile taranır. AWS anahtarları, Anthropic token'ları, PEM blokları ve GitHub secret'ları otomatik maskelenir.

---

## 🔁 Atomik Ajan Devri (Handoff)

Bir ajan yarım bıraktığı işi başka bir ajana devrettiğinde bu basit bir not bırakmak değil, control plane üzerinde tam bir atomik işlemdir:

```
raios handoff --to codex-kaira --status success --msg "iskelet hazır, auth handler'ları implement et"
```

- Gizli veri (API key, PEM, secret) içeren bir handoff, DB'ye dokunmadan reddedilir.
- `git diff --stat HEAD` otomatik eklenir — alıcı ajan ne değiştiğini görür.
- Aynı ajana bekleyen eski handoff `expired` yapılır, kuyruk şişmez.

---

## 🧬 Yeni Nesil Modüller

Son fazlarda eklenen ve kernel'i sıradan bir CLI'dan gerçek bir işletim katmanına taşıyan modüller:

- **Trace Memory** — `raios trace record/search`, bir hatayı ve onun düzeltmesini yerelde SQLite'a kaydeder; aynı hata tekrar oluşmadan önce hatırlanır. `raios evolve from-traces` başarılı fix'leri instinct adayına çevirir.
- **Autonomous Scheduler** — `raios cron add/list/remove/pause/resume/run`, control-plane'de atomik claim ile çalışan zamanlanmış görevler.
- **Secret Leasing & Rate Limiting** — `raios secret grant/list/revoke <tool> <ENV_VAR>` TTL'li otomatik iptal ile; `raios rate-status` her araç için sabit pencereli sayaç limiti.
- **Tool Pinning & Drift Detection** — Araç manifestosu SHA-256 ile imzalanır; uyuşmazlıkta çağrı reddedilir, `raios pin-status` / `raios pin-reset` ile yönetilir.
- **Layered Memory (L0→L3)** — `mem_nodes`/`mem_lineage` ile gerçek izlenebilirlik; `raios mem history --layer` ile atomik gerçek → günlük sahne → persona hiyerarşisi.

---

## 🖥️ TUI Dashboard & VS Code Extension

`src/app/` ve `src/ui/` altında yaşayan terminal arayüzü, **14 paralel dashboard paneli** barındırır: `dashboard_main`, `menu`, `header`, `content`, `tasks`, `agents`, `inbox`, `logs`, `scheduler`, `timeline`, `recent`, `stats`, `rules`, `help`.

VS Code Extension (**v0.8.0**), sidebar üzerinden tam bir kontrol paneli sunar — Git Status, Plans, Tasks, Swarm (inline Approve) ve Quick Actions kartları. **TokenBridge proxy** sayesinde session token hiçbir zaman Webview'a gitmez (XSS koruması); `DaemonManager` soket dinlemiyorsa `aiosd`'yi otomatik başlatır.

```bash
code --install-extension vscode-extension/raios-0.8.0.vsix --force
```

---

## ⌨️ CLI Referansı

```
raios health                    raios verify-chain              raios secret grant/revoke
raios search "<sorgu>"          raios quarantine list/approve    raios rate-status
raios locate "<pattern>"        raios swarm start/list/approve   raios pin-status / pin-reset
raios new "ProjeAdı"            raios handoff --to <ajan>        raios trace record/search
raios task "<açıklama>"         raios git status/log/commit      raios cron add/list/run
raios usage                     raios bootstrap                 raios run claude/codex/opencode/agy
```

---

*Bu proje Alaz Lab altyapısının kendi kernel'idir — tüm diğer projeler bu çekirdeğin üzerinde koordine edilir. Kernel v3.6.0 · 26/26 roadmap fazı tamamlandı.*
