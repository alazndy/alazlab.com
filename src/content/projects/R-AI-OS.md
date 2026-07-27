---
image: "/projects/R-AI-OS.png"
title: "R-AI-OS"
category: "Security"
area: "lab"
status: "Active"
version: "v3.7.1"
summary: "Rust tabanlı, çoklu AI ajan sürülerini (Claude, Codex, OpenCode, Antigravity) tek güvenlik ve orkestrasyon çekirdeği altında toplayan Universal AI Agent Kernel & Terminal Control Center. Kernel v3.6.0 — 26 tamamlanmış roadmap fazı."
techStack: ["Rust", "Tokio", "Ratatui", "Axum", "SQLite", "MCP", "fastembed"]
github: "https://github.com/alazndy/R-AI-OS"
---

## 🔁 Atomik Ajan Devri (Handoff)

Bir ajan yarım bıraktığı işi başka bir ajana devrettiğinde bu basit bir not bırakmak değil, control plane üzerinde tam bir atomik işlemdir:

```
raios handoff --to codex-kaira --status success --msg "iskelet hazır, auth handler'ları implement et"
```

- Gizli veri (API key, PEM, secret) içeren bir handoff, DB'ye dokunmadan reddedilir.
- `git diff --stat HEAD` otomatik eklenir — alıcı ajan ne değiştiğini görür.
- Aynı ajana bekleyen eski handoff `expired` yapılır, kuyruk şişmez.

## 🖥️ TUI Dashboard

`src/ui/panels/` altında yaşayan terminal arayüzü, **14 paralel dashboard paneli** barındırır: `dashboard_main`, `menu`, `header`, `content`, `tasks`, `agents`, `inbox`, `logs`, `scheduler`, `timeline`, `recent`, `stats`, `rules`, `help`.

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
