---
image: "/projects/Weave.webp"
title: "Weave"
category: "Hardware & Embedded"
area: "muhendislik"
status: "Active"
summary: "T-Ecosystem için çok sayfalı elektrik şeması ve kablolama tasarım aracı; canvas düzenleme, komponent kütüphanesi, otomatik bağlantı rotalama, BOM ve export akışlarını birleştirir."
techStack: [React 19, TypeScript, Vite, Tailwind CSS 4, Radix UI, Firebase, PDF.js, html2canvas, Electron, Capacitor]
github: https://github.com/alazndy/Weave
manuals:
  - title: "Weave README"
    href: "https://github.com/alazndy/Weave/blob/main/README.md"
    description: "Mimari, temel özellikler, geliştirme komutları ve test akışları."
    format: "Markdown"
gallery:
  - src: "/projects/Weave.webp"
    alt: "Weave şematik tasarım arayüzü"
    caption: "Çok sayfalı teknik çizimler için canvas tabanlı çalışma alanı."
---

## Genel Bakış

Weave, T-Ecosystem içindeki elektrik şeması ve kablolama tasarım aracıdır. Çok sayfalı teknik çizimleri, tekrar kullanılabilir komponent şablonlarını ve proje çıktısını tek çalışma alanında toplar.

## Tasarım Akışı

- **Canvas çalışma alanı:** Komponentleri yerleştirme, bağlantı çizme ve sayfalar arasında çalışma.
- **Komponent kütüphanesi:** Ürün ve blok şablonlarını yeniden kullanma, içe/dışa aktarma.
- **Bağlantı rotalama:** Ortogonal otomatik rotalama ve bağlantı görünümünü düzenleme.
- **Proje çıktıları:** Aktif sayfadan görsel export, UPH export ve BOM üretimi.
- **Entegrasyon:** ENV-I envanter bağlantısı ve Google Drive yedekleme akışları.
- **Geçmiş:** Snapshot tabanlı undo/redo ve proje dosyası işlemleri.

AI analizi, Firebase ve senkronizasyon katmanları kod tabanında bulunan entegrasyonlardır; üretim ortamındaki kullanım için ilgili kimlik bilgileri ve yapılandırma gerekir.

## Teknik Yapı

React 19 ve TypeScript tabanlı arayüz Vite ile geliştirilir. Canvas, layout, kütüphane ve modal katmanları ayrı bileşenlere ayrılmıştır. Masaüstü için Electron, mobil paketleme için Capacitor yapılandırması bulunur. PDF okuma ve görsel dışa aktarma akışlarında `pdfjs-dist` ve `html2canvas` kullanılır.

## Kurulum

Gereksinimler: Node.js 18+ ve npm veya pnpm.

```bash
npm install
npm run dev
```

Üretim derlemesi için:

```bash
npm run build
```

Test komutları ve güncel mimari notları repository README’sinde yer alır. Hazır Windows yükleyicisi bu portföy sayfasında doğrudan dağıtılmıyor; indirme yerine kaynak repository ve kurulum kılavuzu sunuluyor.

## Durum

Aktif geliştirme. Temel canvas, proje dosyası, sayfa, komponent, export ve entegrasyon akışları mevcut; Firebase, AI analizi ve bulut senkronizasyonu için ek production hardening çalışmaları gerekiyor.
