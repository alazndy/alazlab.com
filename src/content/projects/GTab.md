---
image: "/projects/GTab.png"
title: GTab
category: Browser Extensions
area: lab
status: Live
version: v4.3.0
summary: A highly customizable new tab page for Chrome with Google Tasks, Calendar, and Weather integration — all in a modular drag-and-drop grid.
techStack: [JavaScript, Chrome Extension API, Google OAuth 2.0, Google Tasks API, Google Calendar API, HTML/CSS]
date: 2026-01-10
github: https://github.com/alazndy/GTab
live: https://chromewebstore.google.com/detail/gtab-ki%C5%9Fiselle%C5%9Ftirilebili/ablekgbicginadinndchdojklkojgbdb
---

## Overview

GTab replaces Chrome's default new tab page with a fully customizable, widget-based dashboard. Every widget is resizable, draggable, and togglable — you build the layout that works for you.

## Key Features

- **Modular Grid Layout** — Freely resize and rearrange widgets using a drag-and-drop interface.
- **Google Tasks Integration** — View and manage your task lists directly from the new tab, with real-time sync via Google Tasks API.
- **Google Calendar** — See today's events and upcoming meetings at a glance.
- **Weather Widget** — Live weather data based on your location.
- **Privacy First** — All data is stored locally or synced directly via Google APIs. No third-party servers, no tracking.

## Technical Details

Built as a standard Chrome Extension (Manifest V3) using vanilla JavaScript and CSS. OAuth 2.0 is handled through Chrome's identity API, ensuring secure token management without exposing credentials. All API calls go directly from the extension to Google's servers.

The layout engine uses CSS Grid with persisted user configurations saved in `chrome.storage.sync`, so settings follow you across devices.

## Status

Live on the Chrome Web Store. Verified by Google for Tasks and Calendar OAuth scopes.
