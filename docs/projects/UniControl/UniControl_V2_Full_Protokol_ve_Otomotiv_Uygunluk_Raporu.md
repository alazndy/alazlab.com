---
title: "UniControl V2 Full Protokol Desteği ve Otomotiv Uygunluk Raporu"
subtitle: "Full varyant kapsamı, Core farkları, pin mimarisi ve uygunluk yol haritası"
author: "UniControl Engineering Review"
date: "17 Temmuz 2026"
lang: tr-TR
toc: true
toc-title: "İçindekiler"
numbersections: true
---

**Doküman No:** UC-RPT-V2FULL-001

**Revizyon:** 1.0

**İncelenen ürün:** UniControl V2 Full — ESP32-P4-WIFI6 tabanlı planlanan genişletilmiş varyant

**Kapsam dayanağı:** V2 Core R2 + 1 × LIN + 1 × K-Line + 4 kanallı analog ön uç

> **Kritik uygunluk beyanı:** Bu doküman tasarım hedefi ve mühendislik
> değerlendirmesidir; homologasyon, tip onayı, ISO sertifikası veya akredite
> laboratuvar raporu değildir. Full varyant için henüz final şematik, PCB, kesin
> BOM, firmware, çevresel test veya sistem seviyesi sertifika yoktur.

```{=openxml}
<w:p><w:r><w:br w:type="page"/></w:r></w:p>
```

# Yönetici Özeti

UniControl V2 Full, V2 Core R2'nin güvenlik ve güç mimarisini koruyup araç
haberleşme kapsamını genişleten planlanan varyanttır. Kapsamı iki bağımsız
Klasik CAN, bir CAN FD, bir LIN, bir K-Line/KWP2000 fiziksel arayüzü, dört
korumalı analog kanal, dört röle komutu, iki PWM low-side çıkış ve iki izole
tetik girişidir.

Full tasarımının kritik kararı şudur: LIN ve K-Line, UART tabanlı zaman-kritik
haberleşmelerdir. I2C GPIO expander bunların TX/RX sinyallerini güvenilir biçimde
üretemez. Bu nedenle dört röle komutu, güvenlik-kapısı arkasında otomotiv sınıfı
TCA9539-Q1 I2C I/O expander'a taşınır; boşalan GPIO48–GPIO51 iki gerçek ESP32-P4
UART'ı için ayrılır. ESP32-P4'ün beş HP UART'ı GPIO matrix üzerinden seçilen
GPIO'lara yönlendirilebilir [R1].

Bu yaklaşım Full varyantı pin çakışması olmadan mümkün kılar; fakat I2C'yi
touch/audio, ADS1115-Q1 ve expander ile paylaşır. Bu sebeple I2C kolu kısa,
yerel, resetlenebilir ve hata yayılımını sınırlayan bir carrier dalı olmalıdır.
CAN FD SPI, güvenlik GPIO'ları, USB ve strapping pinleri Core ile aynı şekilde
korunur.

Full, daha fazla fiziksel arayüz sağlar; otomatik olarak daha fazla protokol
stack'i veya otomotiv uygunluğu sağlamaz. CAN FD, LIN, K-Line, OBD-II, ISO-TP,
UDS ve J1939 için gerçek destek; ilgili firmware, hata yönetimi, test ve
uyumluluk kanıtı tamamlandığında verilebilir.

## Sonuç kartı

| Alan | V2 Core R2 | V2 Full hedefi | Full statüsü |
|---|---|---|---|
| Klasik CAN | 2 bağımsız port | Aynı | Donanım mimarisi hazır; firmware yok |
| CAN FD | 1 × MCP2518FD + MCP2562FD | Aynı | Donanım mimarisi hazır; firmware/test yok |
| LIN | Core dışı | 1 × UART + LIN transceiver | Planlı, gerçek UART ile uygulanabilir |
| K-Line | Core dışı | 1 × UART + L9637 sınıfı arayüz | Planlı, protokol stack'i yok |
| Analog ölçüm | ADS/RTC DNP | 4 × ADS1115-Q1 kanal | Planlı, sensör AFE'si tanımsız |
| Röle kontrolü | 4 doğrudan P4 GPIO | 4 × TCA9539-Q1 + hardware gate | Planlı, güvenlik tasarımı gerekli |
| PWM / trigger | 2 PWM + 2 izole trigger | Aynı | Core ile aynı tasarım tabanı |
| Sistem sertifikası | Yok | Yok | Test ve safety case şart |

# Kapsam, Varsayımlar ve Statüler

## Full varyantın tanımı

Bu rapor, kullanıcı tarafından daha önce tanımlanan aşağıdaki genişletilmiş
fonksiyon setini **Full** olarak sabitler:

1. 2 × Klasik CAN portu.
2. 1 × CAN FD portu.
3. 1 × LIN portu.
4. 1 × K-Line/KWP2000 portu.
5. 4 × hassas analog giriş.
6. 4 × röle komutu, 2 × güvenlik-gated PWM low-side çıkış ve 2 × izole trigger.
7. V2 Core'daki power-fail, output-arm, haricî window-watchdog ve donanımsal
   output inhibit zinciri.

Bu bir ürün gereksinimi ve tasarım tabanıdır; üretim BOM'u değildir. LIN/K-Line
port sayısı, analog sensör tipleri, port konektörleri, kablo uzunlukları ve
output yükleri sözleşme öncesinde tekrar dondurulmalıdır.

## Statü sözlüğü

| Statü | Anlamı |
|---|---|
| **Uygulanmış** | Mevcut firmware ve donanımda kanıtı vardır |
| **Donanım mimarisi hazır** | Pin/bağlantı zinciri tanımlıdır; firmware ve DV eksiktir |
| **Planlı** | Full BOM/PCB/firmware'de henüz uygulanmamıştır |
| **Fiziksel olarak mümkün** | MCU/arayüz kapasitesi taşır; protokol uygulaması yoktur |
| **Doğrulanmış** | Kontrollü bench/araç testi kanıtı vardır |
| **Sertifikalı** | Akredite test, homologasyon veya sertifika vardır |

Bu rapordaki hiçbir sistem seviyesi alan **Sertifikalı** değildir.

# Full Mimari ve Core'dan Farkı

## Kritik mimari akış

```text
                         ┌──────────────────────────┐
Vehicle 9–32 V ────────► │ Protected power + PWR_FAIL│
                         └────────────┬─────────────┘
                                      │
                              ┌───────▼────────┐
                              │ ESP32-P4-WIFI6 │
                              └───┬────┬────┬──┘
                                  │    │    │
          TWAI 1/2 ──────────────┘    │    └── SPI2 ─ MCP2518FD ─ MCP2562FD ─ CAN FD
          │                            │
     2 × TCAN1042HGV-Q1 ─ 2 × CAN      ├── UARTx ─ LIN transceiver ─ LIN
                                       ├── UARTy ─ L9637-class PHY ─ K-Line
                                       ├── I2C0 ─ ADS1115-Q1 ─ protected AN1..AN4
                                       └── I2C0 ─ TCA9539-Q1 ─ SAFE_OK gates ─ 4 relay drivers

GPIO21 OUTPUT_ARM + GPIO22 SAFETY_HB + PWR_FAIL_N
                   └──────────► watchdog / SAFE_OK ─► tüm röle ve PWM sürücüleri OFF
```

LIN/K-Line ve ADC için açılan fonksiyonlar, CAN FD SPI veya güvenlik zincirinin
pinlerini yeniden kullanmaz. Full varyantın güvenlik sınırı Core ile aynıdır:
CPU reseti, window-watchdog hatası veya güç kesilmesi fiziksel output'u
donanımda kapatır; CAN transceiver'ları boot'ta standby'da kalır.

## Pin bütçesi ve yeniden atama

| GPIO | Core R2 işlevi | Full işlevi | Gerekçe |
|---:|---|---|---|
| 2 / 3 | CAN1 TX/RX | CAN1 TX/RX | Değişmez |
| 4 / 5 | CAN2 TX/RX | CAN2 TX/RX | Değişmez |
| 7 / 8 | Onboard I2C | Touch/audio + ADS1115-Q1 + TCA9539-Q1 | Yerel, kontrollü I2C kolu |
| 20 | PWR_FAIL_N | PWR_FAIL_N | Güvenlik için ayrılmış |
| 21 | OUTPUT_ARM | OUTPUT_ARM | Güvenlik için ayrılmış |
| 22 | SAFETY_HB | SAFETY_HB | Haricî watchdog için ayrılmış |
| 23 | AUX/DNP | TCA9539-Q1 `INT_N` | Expander hata/değişim bildirimi |
| 26 / 27 | İzole trigger 1/2 | İzole trigger 1/2 | Değişmez |
| 28–32 | CAN FD SPI + INT | CAN FD SPI + INT | Native SPI2 korunur |
| 33 | CAN1_STB | CAN1_STB | Değişmez |
| 46 / 47 | PWM 1/2 | PWM 1/2 | Direct, hardware-gated kalır |
| 48 / 49 | Relay 1/2 | `LIN_TX` / `LIN_RX` | Gerçek UART portu |
| 50 / 51 | Relay 3/4 | `KLINE_TX` / `KLINE_RX` | Gerçek UART portu |
| 52 | CAN2_STB | CAN2_STB | Değişmez |
| 24 / 25 | USB D-/D+ | USB D-/D+ | Araç I/O için kullanılmaz |

GPIO48–51'in yönleri Full varyantta değişir. Röle komutları artık doğrudan P4
GPIO'sundan değil, I2C üzerinden TCA9539-Q1'in dört çıkışından gelir. Bu expander
en fazla 400 kHz I2C'de çalışır, 16 I/O sunar, AEC-Q100 Grade 1 niteliklidir ve
reset/interrupt girişlerine sahiptir [R2]. Röle bobini veya yükü expander'dan
doğrudan sürülmez; expander yalnızca final transistor/smart-driver kontrol
girişini sürer.

## Neden I/O expander UART yerine geçmez?

I/O expander, relay enable, LED, düşük hızlı status input veya servis DIP
switch'i için uygundur. LIN schedule, K-Line 5-baud init, fast-init, UART start
bitleri, parity ve alım zamanlaması için uygun değildir. I2C transaction
gecikmesi ve yazılım jitter'ı UART dalga biçimini bozar.

Bu nedenle Full tasarımında:

- **TCA9539-Q1:** röle enable, düşük hızlı servis I/O ve optional status için;
- **ESP32-P4 UARTx:** LIN transceiver TXD/RXD için;
- **ESP32-P4 UARTy:** K-Line transceiver TX/RX için kullanılır.

ESP32-P4 beş HP UART sunar ve UART0–UART4 sinyallerini GPIO Matrix ile seçilen
GPIO'lara yönlendirebilir [R1]. Bu, mevcut Full atamasını elektriksel olarak
mümkün kılar; ISR/DMA/baud-rate davranışı yine firmware doğrulamasına tabidir.

# Desteklenen Protokoller ve Arayüzler

## Araç haberleşme matrisi

| Protokol / teknoloji | Full donanım yolu | Uygulama seviyesi | Mevcut iddia |
|---|---|---|---|
| Klasik CAN 2.0A/B | 2 × P4 TWAI + TCAN1042HGV-Q1 | V2 firmware yok | Donanım mimarisi hazır |
| CAN FD | SPI2 + MCP2518FD + MCP2562FD | Driver/queue/test yok | Donanım mimarisi hazır |
| ISO-TP / DoCAN | CAN/CAN FD üzerinde mümkün | Stack yok | Desteklenmiyor |
| OBD-II over CAN | DLC/DoCAN katmanı gerekir | Stack yok | Desteklenmiyor |
| ISO 14229 UDS | CAN veya LIN üst katmanı olabilir | Service/session/security yok | Desteklenmiyor |
| SAE J1939 | 29-bit CAN üzerinde mümkün | PGN/SPN/TP yok | Desteklenmiyor |
| LIN | UARTx + LIN transceiver | Schedule/NAD/diagnostic stack yok | Planlı fiziksel arayüz |
| K-Line / KWP2000 | UARTy + L9637 sınıfı PHY | Init/KWP stack yok | Planlı fiziksel arayüz |
| Analog sensor measurement | ADS1115-Q1 + protected AFE | Scaling/diagnostics yok | Planlı ölçüm arayüzü |

## Klasik CAN ve CAN FD

Full varyant, Core'un iki Klasik CAN ve bir CAN FD zincirini değiştirmez. CAN1
ve CAN2, bağımsız TCAN1042HGV-Q1 transceiver ve ayrı standby hatlarıyla çalışır.
CAN FD zinciri ESP32-P4 native SPI2 → MCP2518FD → MCP2562FD şeklindedir.

MCP2518FD'nin 2 KB mesaj RAM'i ve SPI servis bütçesi, Full'de daha da kritiktir:
LIN, K-Line, I2C ADC, HMI, Wi-Fi ve SD iş yükleri CAN FD interrupt servisini
geciktirmemelidir. CAN/CAN FD receive görevi, UI ve storage'dan daha yüksek
öncelikte olmalı; CRC/error counter, overflow ve bus-off olayları kayda
alınmalıdır.

Klasik CAN fiziksel katmanı için TCAN1042HGV-Q1 AEC-Q100 Grade 1 ve ±70 V
bus-fault seçeneği sunar. MCP2562FD ise CAN FD physical layer için AEC-Q100
Grade 0 sınıfı bir seçenektir [R3, R4]. Bu bileşen seviyesindeki nitelik, tüm
Full ECU'nun ISO 11898 veya otomotiv sertifikasyonunu geçtiği anlamına gelmez.

## LIN

LIN portu half-duplex, single-wire bir araç alt-ağıdır. Full'de yol şu şekildedir:

**P4 UARTx TX/RX → LIN transceiver → LIN connector / protected vehicle harness**

NXP TJA1020 eski bir LIN transceiver'dır; üretici sayfası wake-up, dominant
timeout, ISO 7637 ortam transient koruması ve short-circuit koruması belirtir
[R5]. Yeni üretim BOM'unda ise tedarik, sıcaklık sınıfı ve otomotiv
kalifikasyonu doğrulanan güncel bir LIN 2.x / ISO 17987 transceiver seçilmelidir.
MCP2004A ailesi LIN 1.3/2.0/2.1 ve SAE J2602 uyumluluğu belirtse de Microchip
ürün sayfasında **End of Life** statüsündedir; yeni Full tasarımının tek kaynak
parçası yapılmamalıdır [R6].

LIN transceiver eklemek yalnızca physical layer sağlar. Full firmware aşağıdaki
katmanları ayrıca uygulamalıdır:

- commander/responder rolü ve schedule table,
- break/sync/identifier/checksum üretimi ve doğrulaması,
- NAD, node configuration ve diagnostic frame davranışı,
- sleep/wake-up, dominant timeout ve bus fault teşhisi,
- hata sayacı, timeout ve gateway politikasının tanımı.

ISO 17987-2:2025 transport/network katmanını, ISO 17987-3:2025 core protocolü,
ISO 17987-6:2025 controller conformance testini ve ISO 17987-7:2025 elektriksel
physical-layer testini tanımlar [S6]. Bunların hiçbiri henüz Full için
uygulanmış veya test edilmiş değildir.

## K-Line / KWP2000

K-Line portu şu zinciri kullanır:

**P4 UARTy TX/RX → L9637D sınıfı ISO 9141 interface → K-Line connector**

ST L9637 ailesi ISO 9141 uyumlu interface işlevleri ve K-I/O pinine özgü aşırı
sıcaklık kapatması sunar [R7]. Final parça seçimi için L9637D'nin orderable
kod, sıcaklık sınıfı, ESD/transient davranışı, tedarik ömrü ve hedef 12/24 V
araç profili ayrı BOM incelemesinden geçmelidir.

K-Line transceiver, OBD-II/KWP2000 desteği değildir. Firmware'de 5-baud init
veya fast-init, keyword handshake, timing, checksum, session timeout, hata
recovery ve uygulama servisleri gerekir. ISO 14230-2:2016, ISO 14230-1'in
tanımladığı K-Line üzerindeki UART tabanlı sistemler için data-link hizmetlerini
tanımlar [S5]. Bu nedenle Full'ün bugünkü doğru ifadesi **“K-Line fiziksel
arayüzü planlanmış”**tır; “KWP2000/OBD destekli” değildir.

## Analog veri ve ADS1115-Q1

Full, Core'un DNP ADS seçeneğini aktif bir dört kanallı ölçüm bloğuna dönüştürür:

**AN connector → fuse/PTC + TVS + divider/clamp + RC filter → ADS1115-Q1 → I2C0**

ADS1115-Q1 16-bit, dört kanallı, I2C uyumlu, 860 SPS'e kadar çalışan ve
AEC-Q100 Grade 1 otomotiv sınıfı bir ADC'dir [R8]. Dört tek-uçlu veya iki
diferansiyel kanal sunması, her araç sensörünün doğrudan bağlanabileceği anlamına
gelmez.

Full AFE için zorunlu kurallar:

- 0–5 V ratiometric, dirençli, NTC, 4–20 mA ve doğrudan akü gerilimi **ayrı
  ölçüm türleridir**; tek evrensel direnç bölücüsü varsayılmaz.
- ADC pinine 3.3 V beslemede 3.3 V üzeri gerilim uygulanmaz. 12/24 V ölçümü
  için worst-case transient dâhil divider, clamp ve güç hesabı gerekir.
- NTC/rezistif sensör için hassas referans/uyarma, open/short teşhisi ve
  kablo direnci bütçesi gerekir.
- 4–20 mA için shunt, common-mode, güç kaybı ve hata sınırları ayrı tasarlanır.
- TVS, seri direnç ve RC filtresi ADC yanında konumlanır; uzun I2C kablosu
  kullanılmaz.
- ADC kalibrasyonu, scaling, out-of-range, open/short plausibility ve timestamp
  firmware gereksinimleridir.

## I2C ve servis arayüzleri

I2C0 GPIO7/GPIO8, Waveshare kartındaki touch ve audio codec ile ortak kalır.
Full carrier aynı hatta ADS1115-Q1 ve TCA9539-Q1 ekler. Bu iki cihaz yerel
olmalı; carrier kendi güçlü pull-up'larını eklememeli ve toplam kapasitans/rise
time hesaplanmalıdır.

Bir carrier I2C arızasının HMI'yi kapatmaması için Full release öncesi aşağıdaki
iki seçenekten biri seçilmelidir:

1. Carrier dalını resetlenebilir/hot-swap I2C buffer veya switch üzerinden
   bağlamak; veya
2. Carrier devrelerini güç/reset kontrolüyle izole edip stuck-SDA/SCL fault
   injection testini geçmek.

I2C expander interrupt'u GPIO23'e bağlanır. `INT_N` bir güvenlik sinyali
değildir; `OUTPUT_ARM`, `SAFETY_HB`, `PWR_FAIL_N` ve `SAFE_OK` zinciri doğrudan
P4 GPIO'larında/donanımda kalır.

# Otomotiv Standartları Uygunluk Analizi

## Haberleşme ve conformance

| Standart | Full ile ilişkisi | Full durumu |
|---|---|---|
| ISO 11898-1:2024 | CAN data link / physical coding | Bileşen ve controller düzeyinde hizalı; sistem testi yok |
| ISO 11898-2:2026 | High-speed CAN physical medium | Transceiver seçimi mevcut; carrier/harness conformance yok |
| ISO 16845-1:2016 | CAN / CAN FD conformance test planı | Test edilmedi |
| ISO 15765-2:2024 / -4:2021 | DoCAN / OBD taşıma ve gereksinimler | Stack yok |
| ISO 14229-1:2026 | UDS uygulama katmanı | Stack yok |
| SAE J1939 | Ağ ve ağır vasıta üst katmanı | Stack yok |
| ISO 17987-2/-3/-6/-7:2025 | LIN network, protocol, controller/PHY conformance | Planlı physical layer; test/stack yok |
| ISO 14230-1/-2 | K-Line/KWP2000 physical/data link | Planlı physical layer; test/stack yok |

Full varyantında birden fazla araç protokolü bulunması, portlar arası gateway
veya diagnostic bridging yetkisi vermez. Örneğin LIN'den CAN'a mesaj aktarmak,
arbitration, rate limiting, authority, fault containment ve cybersecurity
politikası gerektirir. İlk sürümde protokoller arası yazma/gateway kapalı,
portlar listen-only veya uygulama gereksinimine göre açıkça sınırlandırılmış
olmalıdır.

## Güç, transient, EMC ve ESD

Full, Core ile aynı 9–32 V araç giriş mimarisini varsayar: sigorta, ters
batarya/ideal diode, TVS, geniş girişli otomotiv buck, USB-vehicle reverse
blocking, CAN_5V sequencing ve PWR_FAIL hold-up. LIN, K-Line ve analog
konektörleri eklemek EMC/ESD yüzeyini artırır; bu yüzden her dış portta kendi
TVS, return path, connector pinout ve test planı gerekir.

| Test ailesi | Full'e özgü ilave risk | Kanıt durumu |
|---|---|---|
| ISO 16750-2:2023 | 12/24 V analog ve K-Line besleme toleransı | Test yok |
| ISO 7637-2:2011 | LIN/K-Line/analog connector transient coupling | Test yok |
| ISO 10605:2023 | Kullanıcı erişimli ek portlarda ESD | Test yok |
| ISO 11452-2:2019 | Uzun LIN/K-Line/analog harness coupling | Test yok |
| CISPR 25:2021 | UART/LIN/K-Line/relay switching emission | Test yok |
| UN R10 | Pazar/ESA kapsamına göre EMC tip onayı | Tip onayı yok |

Analog filtre, LIN/K-Line surge/ESD ağı, CAN TVS dönüş yolları ve PWM/relay
switch node'ları tek bir layout review içinde incelenmelidir. GND plane
bölünmez; yüksek akım dönüşleri yerleşim ve kısa/kalın akım koridorlarıyla
ayrılır.

## Bileşen nitelikleri

| Blok | Önerilen/aday bileşen | Uygunluk değerlendirmesi |
|---|---|---|
| Röle komut expander | TCA9539-Q1 | AEC-Q100 Grade 1; yalnızca logic I/O |
| Analog ADC | ADS1115-Q1 | AEC-Q100 Grade 1; sensör AFE'si ayrıca tasarlanmalı |
| LIN | Güncel ISO 17987/LIN 2.x automotive transceiver | TJA1020 legacy; MCP2004A EOL; final P/N P0 |
| K-Line | L9637D sınıfı interface | Final quality/temperature/supply doğrulaması P0 |
| CAN / CAN FD | TCAN1042HGV-Q1, MCP2518FD, MCP2562FD | Bileşen seçimi güçlü; sistem kanıtı değil |
| MCU/Devkit | ESP32-P4-WIFI6 development board | ECU seviyesinde AEC/çevresel kalifikasyon kanıtı yok |

AEC-Q100 kalifikasyonu bir IC'nin güvenilirlik değerlendirmesidir; PCB,
firmware, devkit, connector veya araç montajının sertifikası değildir.

## Fonksiyonel güvenlik, SOTIF ve siber güvenlik

Full'ün output safety zinciri Core'dan korunmalıdır:

`SAFE_OK = PWR_FAIL_N AND WDOG_OK AND OUTPUT_ARM`

Bu sinyal hem PWM sürücülerini hem de expander kaynaklı röle komutlarını
hardware-gate eder. TCA9539-Q1 reseti de `WDOG_OK`/power-good kaybında güvenli
varsayılan input durumuna dönmelidir; her final driver girişinde ayrıca pull-down
bulunmalıdır. Expander I2C register'ının bir hata sonrası son seviyede kalması,
physical output'u açık tutmamalıdır.

ISO 26262 uyumu için HARA/ASIL, safety concept, FMEDA, hardware metric,
software requirement/verification ve safety case gerekir. ISO 21448, amaçlanan
işlev güvenliği için sensör/algoritma yetersizliği değerlendirmesi ister. Bu
work-product'lar Full için yoktur.

LIN/K-Line veya Wi-Fi üzerinden araç komutu gönderilirse attack surface büyür.
Secure Boot, Flash Encryption, imzalı OTA, anti-rollback, rol tabanlı servis
yetkisi, audit log ve güvenli key provisioning uygulanmadan ISO/SAE 21434 veya
UN R155/R156 uyumu iddia edilemez. Ek protokol portları default olarak açık
gateway/actuator authority olmamalıdır.

# V1, Core ve Full Karşılaştırması

| Konu | V1 / ESP32-S3 | V2 Core R2 | V2 Full |
|---|---|---|---|
| Klasik CAN | 1 × SN65HVD230 | 2 × automotive transceiver | Aynı 2 × CAN |
| CAN FD | Yok | 1 × planlı | Aynı 1 × planlı |
| LIN | Yok | Core dışı | 1 × gerçek UART + PHY |
| K-Line | Yok | Core dışı | 1 × gerçek UART + PHY |
| Analog | Yok / doğrudan GPIO yaklaşımı | DNP ADS option | 4 × protected ADS1115-Q1 |
| Röle GPIO | 3 doğrudan, prototip | 4 doğrudan P4 | 4 × automotive I/O expander + gate |
| PWM | 3 belirsiz MOSFET yaklaşımı | 2 gated low-side | Aynı 2 gated low-side |
| Güvenlik | Yazılım/GPIO ağırlıklı | PWR_FAIL + WDT + gates | Aynı safety core + expander reset containment |
| GPIO boşluğu | Sınırlı/çelişkili | 1 DNP AUX | Tüm header GPIO'ları işlevsel atanmış |
| Firmware | S3, 1 TWAI, Nextion | Yok | Yeni P4 HAL + UART/LIN/K-Line/ADC şart |

Full, Core'un yerine “daha çok GPIO bağlamak” değildir. Çıktı komutlarını
denetimli expander'a taşıyıp gerçek zamanlı haberleşmeyi doğrudan UART üzerinde
tutmak, Full'ün temel mimari farkıdır.

# Darboğazlar ve Risk Kaydı

| Öncelik | Risk | Sonuç | Kapatma kriteri |
|---|---|---|---|
| P0 | LIN/K-Line P/N ve connector/kablo kapsamı dondurulmadı | Yanlış PHY, transient veya tedarik riski | Final P/N, temperature, harness ve port test planı |
| P0 | Röle expander güvenli state machine'i tanımsız | I2C fault sonrası istenmeyen output | Reset + pull-down + SAFE_OK ile scope kanıtı |
| P0 | Analog sensör türleri belirsiz | Yanlış divider/uyarma/ADC hasarı | Her kanal için interface control document ve corner hesap |
| P0 | V2 firmware yok | Full arayüzleri çalışmaz veya unsafe olur | P4 HAL, safe boot ve driver testleri |
| P0 | V1 web/OTA güvenlik modeli taşınırsa | Yetkisiz erişim/aktüasyon | Signed OTA, authz, secure boot, threat model |
| P1 | Paylaşımlı I2C stuck-low | Touch/audio/ADC/relay servis kaybı | Bus isolation ve fault injection sonucu |
| P1 | CAN FD SPI service budget | Frame overflow / bus-off | Maksimum HMI+SD+network yükünde stress testi |
| P1 | LIN schedule ve K-Line init zamanlaması | Interoperability sorunu | Referans ECU/tester ile conformance senaryosu |
| P1 | Ek connector ESD/EMC | Reset, false input, emission | ISO 10605/CISPR 25/ISO 11452 sonuçları |
| P2 | Full'ün gateway yetkisi belirsiz | Safety/cyber scope büyümesi | Read-only, gateway veya actuator rolü kararı |

# Firmware ve Test Yol Haritası

## Firmware teslimleri

1. ESP32-P4 board target, tek pin kaynağı ve Core/Full varyant seçimi.
2. Boot'ta CAN standby, PWM/relay OFF, expander reset/input, `OUTPUT_ARM=0`.
3. Dual TWAI ve MCP2518FD interrupt/CRC/bus-off recovery sürücüleri.
4. UARTx LIN physical driver + schedule/diagnostic state machine.
5. UARTy K-Line init/timeout/checksum state machine.
6. ADS1115-Q1 driver, calibration/configuration, plausibility ve error flags.
7. TCA9539-Q1 driver: write-readback, reset detection, timeout; heartbeat ancak
   CAN/ADC/I2C health denetimleri geçerse devam eder.
8. Bounded queues: power/safety > CAN/CAN FD > LIN/K-Line > logging > HMI > web.
9. Secure Boot, Flash Encryption, imzalı OTA, RBAC ve audit log.

## Asgari Full kabul kriterleri

| Alan | Kabul kriteri |
|---|---|
| UART | LIN ve K-Line'da scope ile baud/parity/init zamanlaması doğrulanır |
| Expander fault | I2C unplug/stuck/reset durumunda röle komutları fiziksel OFF kalır |
| Analog | Her sensör tipi için over/under/open/short ve ölçüm hata sınırı kanıtlanır |
| CAN FD | Final harness ve eşzamanlı Full yükünde bounded/counted drop dışında overflow yoktur |
| I2C isolation | Carrier dalı arızası onboard touch/audio'yu kalıcı kilitlemez |
| Watchdog | Erken/geç/kayıp heartbeat tüm output'ları kapatıp P4'ü resetler |
| Power fail | Analog/serial portlar kapatma sırasında false output üretmez; SD veri kaybı sınırı ölçülür |
| EMC/ESD | Port bazlı testte unintended output veya kalıcı haberleşme kaybı yoktur |
| Security | Yetkisiz kullanıcı port gateway, ayar, output veya OTA erişimi alamaz |

# Genel Uygunluk Kararı

UniControl V2 Full, kapsam olarak V2 Core'dan belirgin biçimde daha yetenekli
olacaktır: LIN, K-Line ve yüksek doğruluklu analog ölçüm, ağır vasıta/legacy
araç/konfor sistemi entegrasyonunda değerli eklerdir. Ancak bunların her biri
ayrı protokol, EMC, transient, test ve cybersecurity yükü getirir.

Full için kullanılabilecek doğru ürün ifadesi:

> **“UniControl V2 Full, 12/24 V araç uygulamaları için iki Klasik CAN, bir CAN
> FD, bir LIN, bir K-Line ve dört kanallı korumalı analog ölçüm mimarisi
> hedefleyen; otomotiv sınıfı arayüz bileşenleri ve donanımsal output inhibit
> katmanı kullanan geliştirme aşamasındaki bir kontrolcü varyantıdır. Sistem
> seviyesi uygunluk, sertifikasyon ve homologasyon çalışmaları tamamlanmamıştır.”**

Kaçınılması gereken ifadeler:

- “LIN/K-Line transceiver var, dolayısıyla OBD/UDS/KWP2000 destekli.”
- “AEC-Q100 parça kullanıldı, dolayısıyla ECU otomotiv sertifikalı.”
- “I/O expander UART yerine kullanılabilir.”
- “Full varyant tüm araçlara doğrudan bağlanabilir.”

# Proje İçi İzlenebilirlik

| Kaynak | Bu rapordaki rol |
|---|---|
| `docs/v2-pinout.md` | Core GPIO matrisi, CAN FD SPI ve safety netleri |
| `docs/v2-carrier-schematic.md` | Güç, CAN, output, I2C DNP ve layout kuralları |
| `docs/v2-design-review.md` | Core failure-mode ve scheduler sözleşmesi |
| `docs/UniControl_V1_V2_Protokol_ve_Otomotiv_Uygunluk_Raporu.md` | V1/Core kanıtı, güncel uygunluk çerçevesi |
| `src/hal.c`, `src/logic.c`, `src/web.c` | V1 firmware kapsamı ve V2 firmware boşluğu |
| `platformio.ini` | Mevcut hedefin hâlâ ESP32-S3 olması |

# Kaynakça

## Üretici kaynakları

- **[R1]** Espressif, [ESP32-P4 Series Datasheet](https://documentation.espressif.com/esp32-p4_datasheet_en.html).
- **[R2]** Texas Instruments, [TCA9539-Q1 Automotive 16-bit I2C I/O Expander](https://www.ti.com/product/TCA9539-Q1).
- **[R3]** Texas Instruments, [TCAN1042HGV-Q1 CAN Transceiver](https://www.ti.com/product/TCAN1042HGV-Q1).
- **[R4]** Microchip, [MCP2518FD controller](https://ww1.microchip.com/downloads/en/DeviceDoc/External-CAN-FD-Controller-with-SPI-Interface-DS20006027B.pdf) ve [MCP2562FD transceiver](https://www.microchip.com/en-us/product/mcp2562fd).
- **[R5]** NXP, [TJA1020 LIN Transceiver](https://www.nxp.com/products/interfaces/automotive-lin-solutions/lin-transceiver%3ATJA1020).
- **[R6]** Microchip, [MCP2004A LIN Transceiver](https://www.microchip.com/en-us/product/MCP2004A).
- **[R7]** STMicroelectronics, [L9637 ISO 9141 Interface](https://www.st.com/en/automotive-analog-and-power/l9637.html).
- **[R8]** Texas Instruments, [ADS1115-Q1 Automotive 16-bit ADC](https://www.ti.com/product/ADS1115-Q1).

## Standart ve regülasyon kaynakları

- **[S1]** ISO, [ISO 11898-1:2024](https://www.iso.org/standard/86384.html) ve [ISO 11898-2:2026](https://www.iso.org/standard/90697.html).
- **[S2]** ISO, [ISO 16845-1:2016 CAN conformance test plan](https://www.iso.org/standard/59166.html).
- **[S3]** ISO, [ISO 15765-2:2024 DoCAN](https://www.iso.org/standard/84211.html), [ISO 15765-4:2021](https://www.iso.org/standard/78384.html) ve [ISO 14229-1:2026 UDS](https://www.iso.org/standard/87962.html).
- **[S4]** SAE International, [SAE J1939 top-level document](https://saemobilus.sae.org/standards/j1939_202603-serial-control-communications-heavy-duty-vehicle-network-top-level-document).
- **[S5]** ISO, [ISO 14230-1:2012 — K-Line physical layer](https://www.iso.org/standard/55591.html) ve [ISO 14230-2:2016 — K-Line data link](https://www.iso.org/standard/69115.html).
- **[S6]** ISO, [ISO 17987-2:2025](https://www.iso.org/standard/85126.html), [ISO 17987-3:2025](https://www.iso.org/standard/85127.html), [ISO 17987-6:2025](https://www.iso.org/standard/85129.html) ve [ISO 17987-7:2025](https://www.iso.org/standard/85130.html).
- **[S7]** ISO, [ISO 16750-2:2023 electrical loads](https://www.iso.org/standard/76119.html), [ISO 7637-2:2011 transients](https://www.iso.org/standard/50925.html), [ISO 10605:2023 ESD](https://www.iso.org/standard/79094.html) ve [ISO 11452-2:2019 immunity](https://www.iso.org/standard/68557.html).
- **[S8]** IEC, [CISPR 25:2021](https://webstore.iec.ch/en/publication/64645); UNECE, [UN R10 / R155 / R156 reference documents](https://unece.org/transport/road-transport/reference-documents).
- **[S9]** ISO, [ISO 26262-2:2018](https://www.iso.org/standard/68384.html), [ISO 21448:2022](https://www.iso.org/standard/77490.html), [ISO/SAE 21434:2021](https://www.iso.org/standard/70918.html) ve [ISO 24089:2023](https://www.iso.org/standard/77796.html).

---

**Rapor sonu — Revizyon 1.0**
