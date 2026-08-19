---
image: "/projects/Oyuntd.png"
title: "Oyuntd"
category: "Diğer"
area: "diger"
status: "Pending"
summary: "React, TypeScript ve HTML5 Canvas ile geliştirilen; oyuncunun yolu kurduğu ve kule verimliliğini komşuluk düzeniyle yönettiği hibrit Tower Defense prototipi."
techStack: [React, TypeScript, Vite, HTML5 Canvas, Zustand, Tailwind CSS, Capacitor, Framer Motion]
date: 2026-02-01
github: https://github.com/alazndy/Oyuntd
manuals:
  - title: "Oyuntd README"
    href: "https://github.com/alazndy/Oyuntd/blob/main/README.md"
    description: "Oyunun temel mekaniği, teknoloji yığını ve yerel çalıştırma adımları."
    format: "Markdown"
gallery:
  - src: "/projects/Oyuntd.png"
    alt: "Oyuntd Thermal Grid Maze Master"
    caption: "Neon arayüzlü Tower Defense prototipi ve ısı rezonansı mekaniği."
---

## Genel Bakış

Oyuntd, repository README’sinde **Thermal Grid: Maze Master** adıyla tanımlanan bir Tower Defense prototipidir. Oyuncu yalnızca kule yerleştirmez; düşmanların izleyeceği yolu da kurar.

## Oynanış Mekaniği

- **Maze Building:** Kule ve yapı düzeniyle düşman yolunu oluşturma.
- **Thermal Resonance:** Bir kulenin komşu sayısı verimliliğini etkiler.
- **Cold:** 0–1 komşuda düşük verim.
- **Resonant:** 2–3 komşuda maksimum güç.
- **Overheat:** 4 veya daha fazla komşuda sistem kapanması.

## Teknik Yapı

React arayüzü, TypeScript oyun mantığı ve HTML5 Canvas çizimi birlikte kullanılır. Oyun durumu Zustand ile, animasyonlar Framer Motion ile yönetilir. Proje Vite ile geliştirilir; Capacitor yapılandırması mobil paketleme yönünü destekler.

## Yerel Çalıştırma

```bash
npm install
npm run dev
```

Bu sayfada herkese açık APK veya hazır dağıtım paketi bulunmuyor; indirme bağlantısı yerine kaynak repository ve yerel çalıştırma kılavuzu sunuluyor.

## Durum

Pending/prototip aşaması. Oyun tahtası, kule seçimi, yükseltme paneli, dalga akışı, mobil navigasyon ve oyun sonu akışları kod tabanında yer alıyor; içerik ve dağıtım süreci henüz tamamlanmış değil.
