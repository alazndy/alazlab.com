---
image: "/projects/UPH.webp"
title: "UPH"
category: "Diğer"
area: "muhendislik"
status: "Pending"
summary: "T-Ecosystem için proje, görev, risk, mühendislik değişikliği, bütçe ve ekip akışlarını tek dashboard altında birleştiren Unified Project Hub."
techStack: [Next.js 16, TypeScript, React, Zustand, Firebase Auth, Firestore, Firebase Storage, Recharts, Gantt Task React, Electron, Capacitor]
github: https://github.com/alazndy/UPH
manuals:
  - title: "UPH README"
    href: "https://github.com/alazndy/UPH/blob/main/README.md"
    description: "Kurulum, proje yönetimi kapsamı ve temel çalışma komutları."
    format: "Markdown"
  - title: "EVM Risk Notları"
    href: "https://github.com/alazndy/UPH/blob/main/wiki/RISK_EVM.md"
    description: "RAID ve Earned Value Management yaklaşımı için repository wiki notu."
    format: "Markdown"
gallery:
  - src: "/projects/UPH.webp"
    alt: "UPH proje yönetimi dashboardu"
    caption: "T-Ecosystem projelerini ve operasyonel akışları tek merkezde izleme arayüzü."
---

## Genel Bakış

UPH (Unified Project Hub), T-Ecosystem içindeki proje yönetimi ve dashboard katmanıdır. Proje durumlarını, görevleri, riskleri, mühendislik değişikliklerini ve operasyonel kayıtları merkezi bir arayüzde toplamayı amaçlar.

## Ana Modüller

- **Proje ve görev yönetimi:** Proje durumları, görevler, alt görevler, yorumlar ve tarih takibi.
- **RAID kayıtları:** Risk, varsayım, konu ve bağımlılık kayıtlarının proje bazlı takibi.
- **ECR/ECO:** Mühendislik değişiklik talebi ve değişiklik emri akışları.
- **Performans:** EVM metrikleri, grafikler ve proje sağlık görünümü.
- **Finans:** Bütçe, harcama, fatura ve PDF rapor akışları.
- **Zaman ve ekip:** Proje bazlı zaman girişi ve ekip koordinasyonu.
- **Ekosistem bağlantıları:** GitHub, Google Drive, ENV-I, Weave ve T-SA entegrasyon katmanları.

## Teknik Yapı

Next.js App Router ve TypeScript tabanlı uygulama; Zustand store’larıyla istemci durumunu, Firebase Auth/Firestore/Storage ile kimlik ve veri katmanlarını yönetir. Recharts ve Gantt bileşenleri dashboard görselleştirmelerinde kullanılır. Electron ve Capacitor yapılandırmaları masaüstü ve mobil paketleme yönünü destekler.

## Kurulum

Gereksinimler: Node.js 18+ ve pnpm.

```bash
pnpm install
pnpm dev
```

Firebase ve Gemini gibi entegrasyonlar için repository’deki ortam değişkenleri şablonu kullanılmalıdır. Production build ve test komutları:

```bash
pnpm build
pnpm lint
pnpm test
```

Proje özel/proprietary olarak işaretlendiği için bu sayfada herkese açık uygulama paketi yayınlanmamaktadır.

## Durum

Pending aşaması. Proje, görev, RAID, ECR/ECO, finans, zaman ve entegrasyon katmanları kod tabanında bulunuyor; genel ürünleştirme ve dağıtım hazırlıkları tamamlanmış değil.
