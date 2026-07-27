---
image: "/projects/ENV-I.webp"
title: ENV-I
category: Web & Apps
area: lab
status: Active
summary: A cross-platform inventory and stock management module for the T-Ecosystem — with real-time sync, offline support, and a barcode scanning interface.
techStack: [Next.js 16, React 19, TypeScript, Tailwind v4, Zustand, Firebase Firestore, next-intl, Capacitor, Electron]
date: 2025-12-01
github: https://github.com/alazndy/ENV-I
---

## Overview

ENV-I is the inventory and stock tracking module of the T-Ecosystem. It runs as a web app, a desktop app (via Electron), and a mobile app (via Capacitor) — all from a single Next.js codebase. Data is synced in real time via Firebase Firestore, with offline support using local persistence.

## Key Features

- **Barcode scanning** — Camera-based barcode reader on mobile for rapid item check-in/out.
- **Real-time sync** — Firestore listeners push updates across all connected clients instantly.
- **Offline mode** — Local-first architecture with Firestore offline persistence. Changes sync when connectivity is restored.
- **Multi-language** — Fully internationalized with `next-intl`. Currently supports Turkish and English.
- **Role-based access** — Firebase Authentication with custom claims for admin, editor, and viewer roles. Firestore Security Rules enforce permissions at the data layer.

## Architecture

The app is structured as a Next.js monorepo with platform adapters:

- **Web** — Standard Next.js deployment on Vercel.
- **Desktop** — Electron wraps the Next.js dev server in production mode with native file system access.
- **Mobile** — Capacitor bundles the static export with native camera and barcode APIs.

State is managed with Zustand for local UI state, with Firestore acting as the source of truth for persisted data.

## Status

Active development. Web version is production-ready. Mobile and desktop builds in testing.
