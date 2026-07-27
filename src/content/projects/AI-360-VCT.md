---
title: "AI 360 VCT"
category: "AI & Veri"
area: "muhendislik"
status: "Active"
summary: "AI-powered 3D visualization tool for vehicle camera placement and safety analysis. Simulates camera FOVs in a 3D environment to optimize industrial safety."
techStack: ["React", "Three.js", "Google GenAI", "Node.js", "Express", "SQLite"]
---

## Overview

AI-powered 3D visualization tool for vehicle camera placement and safety analysis. Simulates camera FOVs in a 3D environment to optimize industrial safety.

## Proje Detayları (README)



Araç kameralarını yapay zeka destekli 3D görselleştirme ile yöneten Vehicle Camera Tool.

## Proje Hakkında

AI 360 VCT, araçlara monte edilen kameraların açılarını ve konumlarını yönetmek için geliştirilmiş bir araçtır. React Three Fiber ile gerçek zamanlı 3D araç modeli üzerinde kamera yerleşimlerini görselleştirir; Google Genai entegrasyonu ile akıllı analiz ve öneri özellikleri sunar. Veriler yerel olarak Express + SQLite altyapısı üzerinde saklanır.

Kaynak kodu: https://github.com/alazndy/VCT

---

## Özellikler

- **360° Kamera Yönetimi** — Araç üzerindeki tüm kamera açılarını ve konumlarını merkezi olarak düzenle
- **3D Görselleştirme** — Three.js ve React Three Fiber ile interaktif araç modeli üzerinde gerçek zamanlı kamera yerleşim önizlemesi
- **Yapay Zeka Entegrasyonu** — Google Genai ile kamera açısı analizi ve öneriler
- **Yerel REST API** — Express tabanlı backend ile kamera konfigürasyonlarını kaydet ve yönet
- **SQLite Depolama** — Harici bağımlılık gerektirmeyen hafif ve taşınabilir yerel veri tabanı
- **Responsive Arayüz** — Tailwind CSS ile modern ve sezgisel kullanıcı arayüzü

---

## Teknoloji Yığını

### Frontend
- React + Vite
- @react-three/fiber + @react-three/drei (3D render)
- Three.js
- @google/genai (AI entegrasyonu)
- Tailwind CSS

### Backend
- Node.js + Express (REST API)
- better-sqlite3 (yerel veri tabanı)

---

## Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 18+
- pnpm

### Kurulum

```bash
pnpm install
```

### Geliştirme

Frontend'i başlatmak için:

```bash
pnpm dev
```

Backend API sunucusunu başlatmak için (ayrı terminal):

```bash
node server.js
```

### Üretim Derlemesi

```bash
pnpm build
```

Frontend varsayılan olarak `http://localhost:5173`, backend ise `http://localhost:3000` adresinde çalışır.

---

## Proje Yapısı

```
AI 360 VCT/
├── src/              # React frontend kaynak dosyaları
│   ├── components/   # UI ve 3D bileşenler
│   └── ...
├── server.js         # Express API sunucusu
├── database.db       # SQLite veri tabanı (otomatik oluşturulur)
└── vite.config.js
```



*This project was dynamically imported and enriched from the master portfolio database.*
