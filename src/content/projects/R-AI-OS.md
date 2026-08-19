---
image: "/projects/R-AI-OS.png"
title: "R-AI-OS"
category: "Security"
area: "lab"
status: "Active"
version: "v3.9.0"
summary: "Rust tabanlı, yapay zekâ ajanlarını güvenlik politikaları, denetlenebilir audit ledger, context yönetimi ve çoklu protokol arayüzü altında koordine eden local control plane."
techStack: [Rust, Tokio, Ratatui, Axum, SQLite, MCP, fastembed, WebSocket, TCP]
github: https://github.com/alazndy/R-AI-OS
downloads:
  - title: "GitHub Releases"
    href: "https://github.com/alazndy/r-ai-os/releases"
    description: "Yayınlanmış R-AI-OS sürümleri ve dağıtım varlıkları."
    format: "Release"
manuals:
  - title: "Kurulum ve Setup"
    href: "https://github.com/alazndy/R-AI-OS/blob/master/docs/WIKI/05-Installation-and-Setup.md"
    description: "Rust toolchain, build, kurulum ve ilk bootstrap adımları."
    format: "Markdown"
  - title: "Security Model"
    href: "https://github.com/alazndy/R-AI-OS/blob/master/docs/WIKI/02-Security-Model.md"
    description: "Güvenlik kernel’i, politika kapısı ve daemon iletişim modelinin teknik açıklaması."
    format: "Markdown"
  - title: "CLI Reference"
    href: "https://github.com/alazndy/R-AI-OS/blob/master/docs/WIKI/06-CLI-Commands-Reference.md"
    description: "raios CLI komutları ve kullanım örnekleri."
    format: "Markdown"
gallery:
  - src: "/projects/R-AI-OS.png"
    alt: "R-AI-OS ajan orkestrasyon kernel’i"
    caption: "Ajan swarm’ları için güvenlik ve orkestrasyon control plane’i."
---

## Genel Bakış

R-AI-OS, Claude Code, Codex CLI, OpenCode, Antigravity ve MCP uyumlu ajanları yerel bir control plane üzerinden koordine eden Rust tabanlı kernel projesidir. Amaç; ajanların dosya, ağ ve araç erişimini politika ile sınırlandırmak, işlemleri kaydetmek ve insan onayını akışın parçası tutmaktır.

## Güvenlik Kernel’i

- **Filesystem jail:** Workspace sınırı ve path canonicalization ile kapsam dışı dosya erişimini engelleme.
- **Policy manager:** Araç çağrılarını allow/deny/confirm kurallarıyla değerlendirme.
- **Audit chain:** Kararları SHA-256 hash zincirli SQLite ledger’a yazma.
- **Egress filter:** HTTP/HTTPS alan adlarını allowlist yaklaşımıyla sınırlandırma.
- **Redaction:** Secret ve PII benzeri değerleri log/telemetriye girmeden maskeleme.
- **Session auth:** Yerel HTTP API için Bearer token ve Host doğrulaması.

## Protokoller ve Arayüzler

| Arayüz | Port | Kullanım |
|---|---:|---|
| Daemon TCP | `42069` | CLI ve arka plan daemon IPC |
| MCP over TCP | `42070` | Politika kontrollü ajan araç çağrıları |
| HTTP/WebSocket | `42071` | VS Code extension ve dış entegrasyonlar |

R-AI-OS ayrıca Ratatui tabanlı TUI, `raios` CLI, MCP yüzeyi, VS Code extension ve system tray bileşenleriyle çalışır. Handoff, swarm, trace memory, semantic search ve scheduler akışları repository’de ayrı modüller halinde bulunur.

## Kurulum

Rust stable gereklidir. Temel geliştirme akışı:

```bash
cargo build --release
cargo test --workspace
cargo install --path .
raios bootstrap
raios health
```

Kurulum ve işletim sistemi özel adımlar için repository’nin `docs/WIKI/05-Installation-and-Setup.md` kılavuzu izlenmelidir. Güvenlik özellikleri ürünün kapsamını artırsa da her dağıtımın kendi politika, secret ve ağ yapılandırması ayrıca incelenmelidir.

## Durum

Aktif geliştirme. Repository sürümü v3.9.0 olarak işaretli; security kernel, daemon, CLI, MCP/TUI ve ajan koordinasyon parçaları mevcut, yeni operational hardening çalışmaları devam ediyor.
