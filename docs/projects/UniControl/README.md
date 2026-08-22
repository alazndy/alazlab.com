# 🛡️ UniControl Pro v5.1.0

Automotive ADAS (Advanced Driver Assistance System) Controller based on ESP32-S3 and ESP-IDF.

## Repository
- **GitHub:** https://github.com/alazndy/UniControl.git
- **Status:** Active development on the compact v2 hardware/control branch.
- **Description:** ESP32-S3 based vehicle safety controller for radar, HMI, black-box logging, and isolated I/O control.

## 🎯 Projenin Amacı
Bu proje; ağır vasıtalar, iş makineleri ve lüks karavanlar için tasarlanmış bir ADAS beynidir. Kör noktalardaki engelleri tespit eder, sürücüyü uyarır ve olayları SD karta loglar.

## 🛠️ Teknik Özellikler
- **MCU:** ESP32-S3 DevKitC-1 (Dual Core, 240MHz)
- **Framework:** ESP-IDF (Strict C, FreeRTOS)
- **CAN Bus:** SN65HVD230 (Brigade Radar & UDS Sensör Desteği)
- **HMI:** Nextion 4.3" Intelligent Serisi (UART1)
- **Kara Kutu:** MicroSD Kart + DS1307 RTC (SPI2/I2C0)
- **I/O:** 3x Opto-İzole Giriş, 3x High-Side MOSFET (+12V), 3x Sinyal Rölesi

## 📂 Dosya Yapısı
- `src/main.c`: Sistem giriş noktası ve görev başlatıcı.
- `src/hal.c`: Donanım Soyutlama Katmanı (GPIO, CAN, UART, I2C, SPI).
- `src/logic.c`: Radar algoritmaları ve FreeRTOS görevleri.
- `src/web.c`: SoftAP, Web Dashboard ve OTA sunucusu.
- `src/settings.c`: NVS üzerinden kalıcı ayarlar yönetimi.
- `src/defs.h`: Pin tanımları ve veri yapıları.

## V2 Donanım Planı
- Hedef kart: Waveshare ESP32-P4-WIFI6.
- V2 Core: 2× Classical CAN, 1× CAN FD, 4× röle, 2× PWM low-side çıkış ve 2× izole trigger girişi.
- Ayrıntılı, doğrulanmış GPIO/power-domain matrisi: [`docs/v2-pinout.md`](docs/v2-pinout.md).
- Taşıyıcı kart bağlantı şematiği ve konektör netleri: [`docs/v2-carrier-schematic.md`](docs/v2-carrier-schematic.md).
- Derin tasarım/failure-mode incelemesi: [`docs/v2-design-review.md`](docs/v2-design-review.md).
- V1/V2 protokol desteği, otomotiv uygunluk boşlukları ve nesiller arası fark raporu: [`docs/UniControl_V1_V2_Protokol_ve_Otomotiv_Uygunluk_Raporu.docx`](docs/UniControl_V1_V2_Protokol_ve_Otomotiv_Uygunluk_Raporu.docx) ([Markdown kaynağı](docs/UniControl_V1_V2_Protokol_ve_Otomotiv_Uygunluk_Raporu.md)).
- V2 Full planı: Core'a ek olarak 1× LIN, 1× K-Line ve 4× korumalı analog giriş içerir; LIN/K-Line için iki gerçek UART açmak üzere röle komutları TCA9539-Q1 üzerinden hardware-gate edilir. Ayrıntılı rapor: [`docs/UniControl_V2_Full_Protokol_ve_Otomotiv_Uygunluk_Raporu.docx`](docs/UniControl_V2_Full_Protokol_ve_Otomotiv_Uygunluk_Raporu.docx) ([Markdown kaynağı](docs/UniControl_V2_Full_Protokol_ve_Otomotiv_Uygunluk_Raporu.md)).
- GPIO20-22 güç-kesilme, donanımsal output-arm ve pencere-watchdog güvenliğine ayrılmıştır; Core için I/O expander gerekmez.
- ADS1115/RTC DNP seçenekleridir. LIN/K-Line, güvenlik pinlerini kaldırmadan ancak ayrı varyant veya expansion ile eklenebilir.

## 🌐 Web Arayüzü
- **SSID:** `RADAR_SISTEM_PRO`
- **Şifre:** `12345678`
- **IP:** `192.168.4.1`

## 🚀 Kurulum (PlatformIO)
1. PlatformIO Core yüklü olduğundan emin olun.
2. Proje dizininde terminali açın.
3. Derleme için: `pio run`
4. Yükleme için: `pio run --target upload`

## ⚖️ Lisans
Bu proje Göktuğ için özel olarak geliştirilmiştir.
