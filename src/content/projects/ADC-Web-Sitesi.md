---
image: "/projects/ADC-Web-Sitesi.png"
title: "ADC Web Sitesi"
category: "Tasarım & Geliştirici Araçları"
area: "muhendislik"
status: "Active"
summary: "ADC Tasarım için Brigade Electronics Türkiye ürün kataloğu, çözüm ve sektör sayfaları, rehber içerikleri ve SEO/AI crawler görünürlüğünü birleştiren Next.js kurumsal web sitesi."
techStack: [Next.js 16, React 19, TypeScript, Firebase, Tailwind CSS 4, Radix UI, Vitest, Playwright]
date: 2026-02-01
github: https://github.com/alazndy/adc-web-sitesi-
manuals:
  - title: "ADC Web Sitesi README"
    href: "https://github.com/alazndy/adc-web-sitesi-/blob/main/README.md"
    description: "Çalıştırma, staging/live kapısı, SEO yapısı ve ortam değişkenleri."
    format: "Markdown"
  - title: "Canlı İçerik Haritası"
    href: "https://github.com/alazndy/adc-web-sitesi-/blob/main/public/llms-full.txt"
    description: "ADC Tasarım ve Brigade Türkiye çözüm/kategori içeriğinin agent-friendly özeti."
    format: "Text"
gallery:
  - src: "/projects/ADC-Web-Sitesi.png"
    alt: "ADC Tasarım kurumsal web sitesi"
    caption: "Endüstriyel araç güvenlik çözümleri ve ürün kataloğu için kurumsal web deneyimi."
---

## Genel Bakış

ADC Web Sitesi, ADC Tasarım’ın Brigade Electronics Türkiye distribütörlüğü kapsamındaki ürün, çözüm ve sektör iletişimini yöneten kurumsal web uygulamasıdır. Ürün kataloğu, araç/sektör rehberleri, referans çalışmaları ve iletişim akışlarını tek bir Next.js projesinde toplar.

## İçerik ve SEO Yapısı

- **Çözüm sayfaları:** AI yaya algılama, 360° çevresel görüntüleme ve radar engel algılama gibi çözüm aileleri.
- **Sektör sayfaları:** Maden araç güvenliği ve savunma sanayi araç kamera sistemleri gibi kullanım bağlamları.
- **Teknoloji sayfaları:** Çözüm ailelerini ve ZoneSafe RFID yakınlık sistemini ayrı içerik rotalarıyla sunma.
- **Kurumsal akış:** Ürün kataloğu, referanslar, servis/iletişim ve müşteri talep formları.
- **Crawler görünürlüğü:** Ham HTML metadata, structured data, robots, sitemap, hreflang ve `llms.txt` dosyaları.

## Canlı ve Staging Modu

`NEXT_PUBLIC_SITE_LIVE=false` açıkça ayarlandığında bakım kapısı tüm trafiği “Yapım Aşamasında” sayfasına yönlendirir ve arama motorlarına noindex/Disallow sinyali verir. Değişken unset veya `true` olduğunda site canlı ve indekslenebilir çalışır. Preview secret ile staging içeriği önizlenebilir.

## Kurulum

Gereksinimler: Node.js ve pnpm.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Production build ve test komutları:

```bash
pnpm build
pnpm lint
pnpm test
```

Firebase client bilgileri, `PREVIEW_SECRET` ve `NEXT_PUBLIC_SITE_LIVE` ortam değişkenleri için repository README’sindeki tablo kullanılmalıdır.

## Durum

Aktif geliştirme. Site yapısı, içerik rotaları ve SEO/AI görünürlük altyapısı mevcut; katalog içeriği, locale kapsamı ve yayın operasyonları geliştikçe güncellenmektedir.
