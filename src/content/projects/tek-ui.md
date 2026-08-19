---
image: "/projects/tek-ui.png"
title: "tek-ui"
category: "UI Infrastructure"
area: "lab"
status: "Stable"
summary: "T-Ecosystem arayüzleri için GT-UI adıyla geliştirilen; React ve TypeScript tabanlı, native CSS temalı FUI component library ve design system."
techStack: [React 19, TypeScript, Native CSS, Vite, Storybook, Vitest, Framer Motion, Lucide React, pnpm]
date: 2025-08-01
github: https://github.com/alazndy/tek-ui
manuals:
  - title: "GT-UI README"
    href: "https://github.com/alazndy/tek-ui/blob/master/README.md"
    description: "Kurulum, provider kullanımı, tema yapısı ve component kataloğu."
    format: "Markdown"
  - title: "Component Reference"
    href: "https://github.com/alazndy/tek-ui/blob/master/COMPONENTS.md"
    description: "Kütüphanedeki bileşenlerin referans dokümanı."
    format: "Markdown"
gallery:
  - src: "/projects/tek-ui.png"
    alt: "GT-UI retro-industrial component library"
    caption: "FUI temaları, teknik paneller ve yeniden kullanılabilir React bileşenleri."
---

## Genel Bakış

tek-ui, repository içinde **GT-UI: Retro-Industrial Glass OS** adıyla geliştirilen React component library’dir. T-Ecosystem projelerinde tekrar eden arayüz parçalarını; tema, erişilebilirlik ve etkileşim davranışlarıyla birlikte ortak bir pakette toplamayı amaçlar.

## Tasarım Sistemi

- **Temalar:** Default, LCARS, Aperture, TVA, eDEX, Vitruvian, JazzNoir, Archer ve Cyber.
- **Varyantlar:** Solid, outline, ghost, glass ve neon görsel varyantları.
- **Provider katmanı:** `GTProvider` ile tema, ses efektleri ve CRT overlay ayarları.
- **Bileşen grupları:** Layout, form, navigation, feedback, overlay, data display ve chart bileşenleri.
- **Premium FUI:** VitalsMonitor, HexagonGrid, Commlink, ThemeBuilder ve CommandCenter gibi özel bileşenler.

## Kullanım

Paket metadata’sı `@alazndy/gt-ui` adını ve `dist` çıktısını tanımlar. README’deki temel kullanım:

```bash
pnpm add @alazndy/gt-ui
```

```tsx
import "@alazndy/gt-ui/dist/gt-ui.css";
import { GTProvider } from "@alazndy/gt-ui";

<GTProvider defaultTheme="dark" soundEnabled crtOverlay>
  <App />
</GTProvider>
```

## Geliştirme

```bash
pnpm install
pnpm build
pnpm storybook
pnpm test
```

Storybook örnekleri component davranışlarını ve tema kombinasyonlarını incelemek için kullanılır. MIT lisans bilgisi repository package metadata’sında yer alır.

## Durum

Stable. Paket build’i, type declaration üretimi, Storybook ve test komutları repository’de tanımlı; bileşen kapsamı ve entegrasyonlar geliştikçe genişletilmektedir.
