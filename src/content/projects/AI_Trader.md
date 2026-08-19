---
image: "/projects/AI_Trader.png"
title: "AI Trader"
category: "AI & Finance"
area: "lab"
status: "Active"
summary: "FastAPI tabanlı piyasa veri ve strateji backend’i ile Next.js dashboardlarını birleştiren; gösterge, strateji, backtest ve paper-trading akışlarını deneysel olarak yöneten özel trading platformu."
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

## Genel Bakış

AI Trader, piyasa verisini alıp teknik göstergeler ve stratejiler üzerinden analiz eden deneysel bir full-stack platformdur. Backend FastAPI ile servis edilir; frontend ve dashboard tarafında Next.js uygulamaları bulunur.

## Backend Akışları

- **Piyasa verisi:** CCXT ile Binance ticker ve OHLCV verisi, ayrıca yfinance tabanlı veri yardımcıları.
- **Göstergeler:** RSI hesaplama ve BUY/SELL/NEUTRAL sinyal üretimi için API endpoint’i.
- **Strateji çalıştırma:** Seçilen sembol, zaman aralığı ve parametrelerle strateji analizi.
- **Backtest:** Tarihsel OHLCV verisi üzerinde strateji çalıştırma ve sonuçları Firebase’e kaydetme.
- **Paper trading:** `paper_trader` akışı üzerinden simülasyon/paper-trading döngüsü ve sinyal kayıtları.
- **Dashboard API:** Sinyal ve işlem geçmişini listeleyen endpoint’ler.

## API Özeti

| Method | Path | Amaç |
|---|---|---|
| `GET` | `/` | Backend health kontrolü |
| `POST` | `/api/v1/indicators/rsi` | RSI hesaplama |
| `GET` | `/api/v1/market/ticker/{symbol}` | Ticker verisi |
| `GET` | `/api/v1/market/candles/{symbol}` | Mum verisi |
| `POST` | `/api/v1/strategy/run` | Strateji analizi |
| `POST` | `/api/v1/backtest/run` | Backtest çalıştırma |
| `GET` | `/api/v1/signals` | Son sinyaller |
| `GET` | `/api/v1/trades` | Son işlemler |

## Kurulum

Backend bağımlılıkları `backend/requirements.txt` içinde, dashboard bağımlılıkları ilgili Next.js klasörlerinde tutulur. Deployment notlarına göre Firebase kimlik bilgileri ve market veri servisleri ortam değişkenleriyle sağlanmalıdır.

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Bu portföy sayfası gerçek para ile işlem performansı, kârlılık veya canlı yatırım tavsiyesi iddiasında bulunmaz. Projenin mevcut kaynaklarında paper-trading/simülasyon akışı öne çıkmaktadır; gerçek piyasa kullanımı ayrıca risk, güvenlik ve mevzuat değerlendirmesi gerektirir.

## Durum

Aktif geliştirme. Veri, gösterge, strateji, backtest ve dashboard parçaları mevcut; dağıtım ve işlem otomasyonu yapılandırmaya bağlı özel çalışma durumundadır.
