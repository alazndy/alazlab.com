---
image: "/projects/AI_Trader.png"
title: "AI Trader"
category: "AI & Finance"
area: "lab"
status: "Active"
summary: "Algorithmic trading pipeline and quantitative risk analysis engine powered by machine learning models and asynchronous WebSocket feeds."
techStack: [Python, FastAPI, pandas, NumPy, scikit-learn, XGBoost, CCXT, yfinance, Firebase, Next.js 16, React 19, TypeScript, Lightweight Charts]
date: 2025-11-20
github: https://github.com/alazndy/AI-Trader
manuals:
  - title: "AI Trader README"
    href: "https://github.com/alazndy/AI-Trader/blob/master/README.md"
    description: "Repository başlangıç ve geliştirme komutları."
    format: "Markdown"
  - title: "Deployment Guide"
    href: "https://github.com/alazndy/AI-Trader/blob/master/DEPLOYMENT.md"
    description: "Backend/frontend dağıtım yapısı ve gerekli ortam değişkenleri için proje notu."
    format: "Markdown"
gallery:
  - src: "/projects/AI_Trader.png"
    alt: "AI Trader piyasa analiz dashboardu"
    caption: "Piyasa verisi, strateji sonuçları ve işlem kayıtları için dashboard konsepti."
---

## Overview

AI Trader is an automated quantitative trading and risk monitoring platform designed for real-time market data evaluation.

### Core Features

- **Signal Engine:** Multi-timeframe order book parsing and quantitative momentum calculations.
- **Risk Management:** Dynamic stop-loss execution, maximum drawdown safeguards, and capital allocation guards.
- **Architecture:** Asynchronous event-driven pipeline capable of sub-millisecond tick ingestion over persistent WebSockets.
