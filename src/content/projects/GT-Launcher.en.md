---
image: "/projects/GT-Launcher.png"
title: "GT-Launcher"
category: "Diğer"
area: "lab"
status: "Active"
github: "https://github.com/alazndy/GT-Launcher"
download: "https://github.com/alazndy/GT-Launcher/releases/latest"
downloads:
  - title: "En Güncel Sürüm (v4.10.0 APK)"
    href: "https://github.com/alazndy/GT-Launcher/releases/latest"
    description: "5 sekmeli Card Builder, 19 modül, 6 görsel stil ve OBD-II telemetrisi içeren güncel kararlı sürüm."
    format: "APK"
    version: "v4.10.0"
  - title: "Tüm Sürüm Geçmişi"
    href: "https://github.com/alazndy/GT-Launcher/releases"
    description: "Önceki paketler ve sürüm notlarıyla birlikte tüm GT-Launcher yayınları."
    format: "Releases"
manuals:
  - title: "Kişiselleştirme ve Kart Kılavuzu"
    href: "https://github.com/alazndy/GT-Launcher/blob/master/docs/wiki/Customization.md"
    description: "UCCS modül mimarisi, jest eşleme, renk çarkı ve stil geçersiz kılma rehberi."
    format: "Wiki"
  - title: "Mühendislik Paneli El Kitabı"
    href: "https://github.com/alazndy/GT-Launcher/blob/master/docs/wiki/Engineering-Guide.md"
    description: "9 güverte ayarları, ızgara motoru, header widget'ları ve profil yedekleme."
    format: "Wiki"
  - title: "Sürüş Modu & OBD-II Kurulumu"
    href: "https://github.com/alazndy/GT-Launcher/blob/master/docs/wiki/Drive-Mode.md"
    description: "BLE adaptör eşleme, HUD konfigürasyonu ve hata kodu teşhis kılavuzu."
    format: "Wiki"
  - title: "Sistem ve İzin Güvenlik Kataloğu"
    href: "https://github.com/alazndy/GT-Launcher/blob/master/docs/wiki/Permissions.md"
    description: "Çalışma zamanı izinleri, gizlilik politikası ve depolama mimarisi."
    format: "Wiki"
gallery:
  - src: "/projects/GT-Launcher/home.jpg"
    alt: "GT-Launcher retro-fütüristik ana ekranı"
    caption: "Ana Ekran — Modüler LCARS kartları, finans, medya ve telemetri widget'ları."
  - src: "/projects/GT-Launcher/card-builder-5-tabs.gif"
    alt: "5 Sekmeli Card Builder canlı üretici akışı"
    caption: "Card Builder — İşlev, davranış, görünüm, boyut ve görsel katman sihirbazı."
  - src: "/projects/GT-Launcher/visual-style-switch.gif"
    alt: "6 Görsel stil arasında geçiş"
    caption: "Görsel Stiller — Flat, Glass, Neobrutalism, Claymorphism, Minimal ve Neon."
  - src: "/projects/GT-Launcher/wallpaper-background-photo.gif"
    alt: "Ana ekran duvar kağıdı seçimi ve canlı kırpma"
    caption: "Duvar Kağıdı — Canlı pinch-to-crop ve GPU tabanlı UV dilimleme."
  - src: "/projects/GT-Launcher/drive-mode-hud.gif"
    alt: "Drive Mode Interceptor kokpit HUD"
    caption: "Drive Mode — OBD-II telemetri, GPS hız göstergesi ve harita HUD kokpiti."
  - src: "/projects/GT-Launcher/search-mixed-results.gif"
    alt: "Omni-Terminal karma arama motoru"
    caption: "OmniSearch — Web, Play Store, uygulamalar ve sistem ayarları tek komuta kutusunda."
version: "v4.10.0"
summary: "Modular Android home screen launcher inspired by Star Trek LCARS, built with Kotlin and Jetpack Compose featuring customizable widget cards and local app indexing."
techStack: ["Kotlin", "Jetpack Compose", "Room", "OBD-II BLE", "ML Kit OCR", "Gson", "Material3"]
---

## Overview

GT-Launcher is an open-source Android home screen application built entirely with Kotlin and Jetpack Compose. It reimagines the Star Trek LCARS design philosophy into an ergonomic, ultra-fast mobile productivity workspace.

### Core Architecture

- **UI Framework:** 100% Jetpack Compose with reactive state management
- **Theme Engine:** Dynamic LCARS color palette switching with custom contrast curves
- **App Indexer:** Asynchronous local package discovery and category clustering
- **Widget Builder:** Extensible modular card framework for calendar, system telemetry, media controls, and quick shortcuts

### Performance Benchmarks

- **Cold Startup:** < 180 ms on modern Android 14+ devices
- **Memory Footprint:** < 45 MB resident memory in background idle
- **Frame Rate:** Consistent 120 FPS scrolling across app drawers and widget grids
