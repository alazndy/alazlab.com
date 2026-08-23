---
image: "/projects/R-AI-OS.png"
title: "R-AI-OS"
category: "Security"
area: "lab"
status: "Active"
version: "v3.9.0"
summary: "Lightweight local CLI agent runtime and asynchronous task orchestrator written in Rust with Tokio and SQLite state management."
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

## Overview

R-AI-OS is a unified workspace orchestration engine and local execution proxy built with Rust. It provides a single CLI binary (`raios`) covering project health analysis, security audits, build automation, git operations, and local task execution.

### Architectural Pillars

- **Language & Runtime:** Pure Rust with Tokio asynchronous multi-threaded scheduler
- **Memory Store:** Embedded SQLite database with vector indexing for semantic workspace search
- **Security Sandbox:** Least-privilege MCP tool execution, TTL-scoped secret leases, and tamper-evident audit hash chaining
- **CLI & TUI:** Ratatui terminal dashboard and fast sub-millisecond command dispatching
