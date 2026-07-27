---
image: "/projects/Weave.webp"
title: "Weave"
category: "Medya & Ses"
area: "lab"
status: "Active"
summary: "AI-enhanced circuit and document design tool. Analyzes PDF schematics and provides a professional workflow for electronics engineering."
techStack: ["React 19", "TypeScript", "Electron", "Capacitor", "PDF.js", "Google GenAI"]
---

## Overview

AI-enhanced circuit and document design tool. Analyzes PDF schematics and provides a professional workflow for electronics engineering.

## Proje Detayları (README)



AI destekli devre ve doküman tasarım aracı; PDF iş akışları, masaüstü ve mobil platform desteğiyle profesyonel şematik çalışma ortamı.

---

## Özellikler

- **AI destekli devre tasarımı** — Google Genai entegrasyonu ile akıllı bileşen önerileri ve tasarım yardımı
- **PDF içe/dışa aktarma** — pdfjs-dist ile PDF okuma, jsPDF + html2canvas ile dışa aktarma
- **Masaüstü uygulaması** — Electron ile paketlenmiş, Windows yükleyici olarak dağıtılıyor (`T-Weave Setup 1.0.0.exe`)
- **Mobil destek** — Capacitor ile Android/iOS platformlarına taşınabilir
- **Otomatik test altyapısı** — Playwright ile uçtan uca test kapsamı
- **Hızlı geliştirme ortamı** — Vite HMR ile anında yenileme
- **Modern bileşen seti** — Radix UI erişilebilir bileşenleri ve Tailwind CSS

## Teknoloji Yığını

| Katman | Teknoloji |
|---|---|
| Ön yüz | React 19, TypeScript, Vite |
| Masaüstü kabuğu | Electron, electron-builder |
| Mobil | Capacitor (Android / iOS) |
| Stil | Tailwind CSS, Radix UI |
| AI | @google/genai (Gemini) |
| PDF işleme | pdfjs-dist, jsPDF, html2canvas |
| Test | Playwright |

## Proje Yapısı

Bu dizin Weave'in üretim çıktısını (derleme + yükleyici) içermektedir. Aktif geliştirme **Weave-main (t-weave)** dalında sürmektedir. GitHub: [alazndy/Weave](https://github.com/alazndy/Weave)

```
Weave/
├── T-Weave Setup 1.0.0.exe   # Windows yükleyici (üretim)
├── win-unpacked/             # Yükleyicisiz çalıştırılabilir
└── builder-debug.yml         # electron-builder yapılandırması
```

## Kurulum ve Geliştirme

Gereksinimler: **Node.js 20+**, **pnpm**

```bash
# Kaynak koda geç (Weave-main / t-weave dalı)
cd weave-main

# Bağımlılıkları kur
pnpm install

# Geliştirme modunda başlat
pnpm dev

# Electron uygulaması olarak derle
pnpm build
```

## Üretim Kurulumu

Windows için hazır yükleyiciyi çalıştır:

```
T-Weave Setup 1.0.0.exe
```

Yükleyici, uygulamayı sistem genelinde kurar ve başlat menüsüne kısayol ekler.



*This project was dynamically imported and enriched from the master portfolio database.*
