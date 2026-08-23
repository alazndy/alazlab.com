---
image: "/projects/GTab.png"
title: GTab
category: Browser Extensions
area: lab
status: Live
version: v4.3.0
summary: "Privacy-first modular new tab workspace for Chrome, integrating Google Tasks, Calendar, and local notes with zero external servers."
techStack: [JavaScript, Chrome Extension API, Google OAuth 2.0, Google Tasks API, Google Calendar API, HTML/CSS]
date: 2026-01-10
github: https://github.com/alazndy/GTab
live: https://chromewebstore.google.com/detail/gtab-ki%C5%9Fiselle%C5%9Ftirilebili/ablekgbicginadinndchdojklkojgbdb
gallery:
  - src: "/projects/GTab.png"
    alt: "GTab Chrome yeni sekme paneli önizlemesi"
    caption: "Modüler widget ızgarası ve kişiselleştirilebilir yeni sekme deneyimi."
---

## Overview

GTab is a high-performance, customizable new tab Chrome extension built under Manifest V3 specifications. It consolidates daily task lists, calendar agendas, weather telemetry, and quick notes into a responsive grid layout.

### Key Capabilities

- **Zero-Server Architecture:** All user data, tokens, and widget states reside entirely within local Chrome storage.
- **Google Services Sync:** Direct OAuth2 integration with Google Tasks and Google Calendar APIs without third-party middleman servers.
- **Offline First:** Instant tab rendering with cached local state, synchronizing changes seamlessly upon reconnect.
