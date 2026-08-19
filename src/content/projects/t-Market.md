---
image: "/projects/t-Market.png"
title: "t-Market"
category: "Diğer"
area: "lab"
status: "Pending"
summary: "T-Ecosystem uygulama ve servislerini keşfetme, yönetme ve ekosistem içindeki dağıtım akışlarını merkezileştirmeyi amaçlayan özel marketplace prototipi."
techStack: [Next.js 15, React 19, TypeScript, Firebase, Stripe, Zustand, Zod, Tailwind CSS]
github: https://github.com/alazndy/t-market
manuals:
  - title: "t-Market README"
    href: "https://github.com/alazndy/t-market/blob/main/README.md"
    description: "Marketplace kapsamı, teknoloji yığını ve yerel çalıştırma komutları."
    format: "Markdown"
gallery:
  - src: "/projects/t-Market.png"
    alt: "t-Market uygulama marketplace arayüzü"
    caption: "T-Ecosystem uygulama ve servislerini merkezileştiren marketplace konsepti."
---

## Genel Bakış

t-Market, T-Ecosystem içindeki uygulama ve servisleri keşfetme, yönetme ve dağıtma akışlarını tek bir marketplace deneyiminde toplamayı amaçlar. Proje özel/proprietary olarak işaretlenmiştir.

## Kapsam

- **Uygulama marketplace’i:** Ekosistemdeki modül ve entegrasyonları listeleme.
- **Servis değişimi:** Servislerin ekosistem içinde tahsis edilmesi veya yönetilmesi için temel akış.
- **Ekosistem entegrasyonu:** UPH ve Renderci ile bağlantı kuracak yapı.
- **Güvenli veri girişi:** Zod doğrulama, Firebase tabanlı kimlik/veri katmanı ve Stripe ödeme entegrasyonu için servis uçları.

## Teknik Yapı

Next.js App Router ve React 19 tabanlı arayüz TypeScript ile yazılmıştır. Zustand istemci durumunu, Firebase kimlik/veri akışlarını, Stripe ise ödeme tarafını destekler. Formlar Zod ile doğrulanır; Tailwind CSS ve Radix UI bileşenleri arayüz katmanında kullanılır.

## Kurulum

Gereksinimler: Node.js ve pnpm.

```bash
pnpm install
pnpm dev
```

Ödeme ve Firebase entegrasyonları için yerel ortam değişkenleri gerekir. Bu sayfada herkese açık dağıtım paketi bulunmuyor; kaynak repository kılavuz olarak sunuluyor.

## Durum

Pending aşaması. Marketplace, servis ve ekosistem bağlantısı temelinde ilerleyen özel prototip; üretim dağıtımı ve ticari akışların tamamlandığı iddia edilmiyor.
