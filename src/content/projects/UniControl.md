---
title: UniControl
category: Hardware & Embedded
area: muhendislik
status: Active
version: v5.1.0
summary: ESP32-S3 ve ESP-IDF tabanlı; radar, HMI, kara kutu loglama ve izole araç I/O katmanlarını bir araya getiren otomotiv güvenlik kontrolcüsü.
techStack: [ESP32-S3, ESP-IDF, FreeRTOS, C, C++, TWAI/CAN, Nextion, microSD, DS1307 RTC, PlatformIO]
date: 2025-10-12
github: https://github.com/alazndy/UniControl
manuals:
  - title: "V2 Design Review"
    href: "https://github.com/alazndy/UniControl/blob/master/docs/v2-design-review.md"
    description: "V2 Core pin planı, güvenlik containment yaklaşımı ve kalan tasarım riskleri."
    format: "Markdown"
  - title: "V2 Pinout"
    href: "https://github.com/alazndy/UniControl/blob/master/docs/v2-pinout.md"
    description: "V2 Core için doğrulanmış GPIO ve çevrebirim eşlemesi."
    format: "Markdown"
---

## Genel Bakış

UniControl; ağır vasıtalar, iş makineleri ve lüks karavanlar için tasarlanan bir otomotiv güvenlik kontrolcüsüdür. Sistem radar ve ultrasonik sensörlerden veri alır, sürücüyü uyarır, HMI ekran üzerinden durum gösterir ve olayları kara kutu mantığıyla kaydetmeyi hedefler.

Mevcut çalışma iki nesil üzerinden ilerler:

- **V1 / v5.1 ESP32-S3 prototipi:** Tek Klasik CAN, Nextion HMI, SD kart, RTC ve izole I/O içeren çalışan prototip tabanı.
- **V2 Core R2 tasarım tabanı:** Daha fazla CAN kapasitesi, CAN FD, güç kesilme uyarısı ve donanımsal output containment hedefleyen yeni mimari.

## V1 Donanım ve Firmware

- **MCU:** ESP32-S3 DevKitC-1
- **Framework:** ESP-IDF ve FreeRTOS
- **CAN:** SN65HVD230 üzerinden tek Klasik CAN hattı
- **HMI:** Nextion 4.3" Intelligent ekran, UART1
- **Kara kutu:** microSD ve DS1307 RTC
- **I/O:** izole girişler, high-side MOSFET çıkışları ve röle çıkışları

Firmware’in ana modülleri:

- `main.c`: sistem giriş noktası ve görev başlatma
- `hal.c`: GPIO, CAN, UART, I2C ve SPI donanım soyutlama katmanı
- `logic.c`: radar mantığı ve FreeRTOS görevleri
- `web.c`: SoftAP, web dashboard ve OTA servisleri
- `settings.c`: NVS tabanlı kalıcı ayar yönetimi

## Gerçek Protokol Durumu

V1 tarafında özel radar ve ultrasonik mesajları için Klasik CAN işleme bulunur. Bu, tek başına OBD-II veya ISO 14229 UDS uygulaması anlamına gelmez. Proje dokümantasyonunda kullanılan “UDS” ifadesi Brigade **Ultrasonic Detection System** bağlamında da geçer ve ISO 14229 Unified Diagnostic Services ile karıştırılmamalıdır.

V2 Core R2 için tasarlanan iletişim katmanları:

- iki bağımsız Klasik CAN kanalı
- bir CAN FD kanalı
- radar ve ultrasonik protokollerinin taşınması
- ileride DoCAN, OBD-II, ISO 14229 veya SAE J1939 için geliştirme alanı

Bu üst seviye protokollerin tamamı mevcut sistemde uygulanmış kabul edilmemelidir. V2’nin önemli bölümü hâlâ donanım ve firmware geliştirme aşamasındadır.

## V2 Core Tasarım Hedefleri

V2 mimarisi Waveshare ESP32-P4-WIFI6 kartı etrafında şekillenir. Tasarım incelemesindeki öne çıkan hedefler:

- CAN kanallarını birbirinden bağımsız standby kontrolüyle yönetmek
- native SPI2 üzerinden MCP2518FD + MCP2562FD CAN FD hattı eklemek
- `PWR_FAIL_N` ile güç kesilmesini SD log senkronizasyonundan önce algılamak
- `OUTPUT_ARM` ve harici window watchdog ile röle/PWM çıkışlarını güvenli varsayılanda kapalı tutmak
- araç gücü, transient koruması ve output containment konularını carrier tasarımında çözmek

Bu bölüm bir tasarım hedefini anlatır; üretim kartı, muhafaza, çevresel test ve sistem sertifikasyonu tamamlanmış anlamına gelmez.

## Güvenlik ve Doğrulama Notu

UniControl aktif bir prototip ve tasarım geliştirme projesidir. Mevcut belgelerde sistem seviyesinde otomotiv sertifikası, homologasyon veya akredite laboratuvar test sonucu bulunmadığı açıkça belirtilir. Bu nedenle sayfadaki “otomotiv”, “ADAS” ve “güvenlik” ifadeleri projenin hedef alanını ve mühendislik yaklaşımını belirtir; sertifikasyon iddiası değildir.

## Kurulum

PlatformIO ve ESP-IDF toolchain’i ile temel firmware akışı:

```bash
pio run
pio run --target upload
```

Gerçek araç üzerinde denemeden önce güç, CAN termination, output yükleri, watchdog ve güvenli kapanış davranışları bench ortamında doğrulanmalıdır.

## Public Teknik Dokümanlar

Bu sayfanın üstündeki kılavuz bağlantıları, projenin public GitHub repository’sindeki V2 tasarım dokümanlarına gider. Protokol/uygunluk raporları ise kapsam ve gizlilik durumuna göre ayrıca değerlendirilmelidir.

## Durum

Aktif geliştirme. V1 prototip tabanı çalışır durumda; V2 Core tasarımında donanım, firmware, üretim BOM’u ve doğrulama testleri devam etmektedir.
