---
title: "UniControl V1–V2 Protokol Desteği ve Otomotiv Uygunluk Raporu"
subtitle: "Desteklenen haberleşme protokolleri, standart uyumluluk analizi ve nesiller arası teknik farklar"
author: "UniControl Engineering Review"
date: "17 Temmuz 2026"
lang: tr-TR
toc: true
toc-title: "İçindekiler"
numbersections: true
---

**Doküman No:** UC-RPT-PROTO-COMP-001

**Revizyon:** 1.0

**İncelenen ürünler:** UniControl V1 / v5.1 ESP32-S3 prototipi ve UniControl V2 Core R2 tasarım tabanı

**Gizlilik:** Proje içi teknik değerlendirme

> **Kritik uygunluk beyanı:** Bu doküman bir tip onayı, homologasyon belgesi,
> ISO sertifikası veya akredite laboratuvar test raporu değildir. “Standarda
> yönelik tasarlanmış”, “uygun bileşen seçilmiş” ve “standardı geçti” ifadeleri
> aynı anlama gelmez. UniControl V1 veya V2 için bu rapor tarihi itibarıyla
> sistem seviyesinde otomotiv sertifikası ya da akredite test sonucu yoktur.

```{=openxml}
<w:p><w:r><w:br w:type="page"/></w:r></w:p>
```

# Yönetici Özeti

UniControl V1, radar ve ultrasonik sensörlerden Klasik CAN mesajı okuyabilen,
Nextion ekran, SD kart, RTC, izole girişler ve araç çıkışları içeren işlevsel bir
ESP32-S3 prototipidir. V1’in araç ortamına yönelik bazı koruma fikirleri vardır;
ancak seçilen geliştirme kartı, SN65HVD230, LM2596 modülü, PC817 ve genel amaçlı
çıkış elemanlarıyla sistem seviyesinde otomotiv uygunluğu gösterilemez. Güç
transientleri, EMC, ESD, mekanik dayanım, güvenli çıkış kapatma ve siber güvenlik
bakımından önemli boşluklar bulunur.

UniControl V2 Core R2, V1’e göre mimari olarak büyük bir sıçramadır:

- İki bağımsız Klasik CAN ve bir CAN FD kanalı sağlar.
- CAN fiziksel katmanında AEC-Q100 sınıfı transceiver/controller ailesi seçer.
- CAN portlarını reset sırasında pasif tutan bağımsız standby kontrolü kullanır.
- Güç kesilmesini önceden algılayan `PWR_FAIL_N`, donanımsal `OUTPUT_ARM` ve
  TPS3430-Q1 pencere-watchdog yapısını tanımlar.
- Röle ve PWM komutlarını iki SN74LVC08A-Q1 üzerinden donanımsal olarak
  kapatılabilir hale getirir.
- Araç gücü ile USB arasında ters beslemeyi engelleyen, transient korumalı bir
  güç mimarisi hedefler.
- MIPI-DSI HMI, SDIO microSD, Wi-Fi 6 ve BLE 5 ile işlemci/arayüz kapasitesini
  belirgin biçimde artırır.

Buna rağmen V2 henüz “otomotiv standardına uygun ürün” değildir. Tasarım
tabanı; otomotiv odaklıdır, fakat kesin buck/TVS/connector/output parçaları,
PCB, muhafaza, 4.3 inç ekran SKU’su ve V2 firmware’i tamamlanmamıştır. ISO
16750, ISO 7637, ISO 10605, CISPR 25, ISO 11452 ve UN R10 testleri yapılmamıştır.
ISO 26262, ISO 21448 ve ISO/SAE 21434 süreç çıktıları da bulunmamaktadır.

## Sonuç kartı

| Alan | V1 durumu | V2 R2 durumu | Nihai değerlendirme |
|---|---|---|---|
| Klasik CAN | Tek kanal, çalışan prototip | İki bağımsız kanal, tasarım hazır | V2 belirgin üstün; sistem testi gerekli |
| CAN FD | Yok | Bir kanal, MCP2518FD + MCP2562FD | Donanım planı hazır; firmware/test yok |
| OBD/DoCAN/UDS | Standart stack yok | Donanım taşıyabilir | Uygulama protokolü henüz desteklenmiyor |
| SAE J1939 | Özel 29-bit mesajlar var | Donanım uygun | J1939 stack ve PGN/SPN katmanı yok |
| LIN / K-Line | Yok | Core dışı | Ayrı varyant/expansion gerekir |
| Araç güç dayanımı | Prototip seviyesi | Koruma mimarisi tanımlı | Parça seçimi ve transient testi P0 |
| Fonksiyonel güvenlik | Yazılım ağırlıklı | Watchdog + hardware gate | ISO 26262 uyumu yok; temel güvenlik ilerledi |
| Siber güvenlik / OTA | Kritik açıklar var | P4 donanımı yetenekli | Güvenli boot/update süreci uygulanmalı |
| EMC / ESD / çevresel | Test yok | Layout/test planı var | Sertifika veya test geçişi yok |

# Kapsam, Yöntem ve Statü Tanımları

## Kapsam

Bu rapor aşağıdaki soruları cevaplar:

1. UniControl V1’de gerçekten çalışan protokoller ve arayüzler nelerdir?
2. UniControl V2 Core R2 hangi protokolleri donanımsal olarak desteklemektedir?
3. CAN, CAN FD, OBD, UDS, J1939, LIN ve K-Line açısından gerçek destek seviyesi nedir?
4. Sistem hangi otomotiv standartlarına yönelik tasarlanmıştır ve hangi
   standartlara karşı henüz kanıt yoktur?
5. V2’nin V1’e göre teknik, güvenlik, performans ve servis edilebilirlik farkları nelerdir?
6. Üretim ve sertifikasyon adayı olabilmek için hangi çalışmalar tamamlanmalıdır?

İnceleme; proje kaynak kodu, V1 teknik dokümanları/BOM bilgileri, V2 R2 pinout
ve carrier dokümanları ile üreticilerin ve standart kuruluşlarının 17 Temmuz
2026 tarihinde erişilebilen birincil kaynaklarına dayanır.

## Kullanılan statüler

| Statü | Anlamı |
|---|---|
| **Uygulanmış** | Mevcut repo/kod veya V1 donanımında doğrudan karşılığı var |
| **Donanım hazır** | Fiziksel ve kontrol katmanı planlanmış; uygulama stack’i/testi eksik |
| **Planlı** | Tasarım dokümanında var; parça/PCB/firmware tamamlanmamış |
| **Core dışı** | V2 Core R2 pin/BOM kapsamına alınmamış; varyant gerekir |
| **Doğrulanmış** | Ölçüm veya kontrollü test kanıtı var |
| **Sertifikalı** | Akredite rapor/tip onayı/sertifika mevcut |

Bu değerlendirmede hiçbir sistem seviyesi alan **Sertifikalı** statüsünde değildir.

# Sistem Nesilleri

## V1 / v5.1 ESP32-S3 prototipi

V1’in merkezinde ESP32-S3-DevKitC-1 bulunur. Nextion 4.3 Intelligent ekran UART
üzerinden, SN65HVD230 tek Klasik CAN transceiver olarak, Wemos SD/RTC shield ise
SPI ve I2C üzerinden kullanılır. V1 BOM’unda üç optokuplörlü giriş, üç MOSFET
çıkışı, üç röle çıkışı ve aktif buzzer yer alır.

Mevcut firmware’in doğrulanabilen davranışı şöyledir:

- Platform hedefi `esp32-s3-devkitc-1` ve ESP-IDF’tir.
- Tek TWAI kanalı GPIO5 TX / GPIO4 RX üzerinde 250 kbit/s olarak başlatılır.
- TWAI doğrudan `TWAI_MODE_NORMAL` modunda açılır; başlangıç listen-only değildir.
- 11-bit `0x310` ve `0x320` radar mesajları işlenir.
- 29-bit `0x18FF5B80` / `0x18FF5B81` ultrasonik mesajları işlenir ve
  `0x18FF5A54` keepalive mesajı gönderilebilir.
- Kod içindeki “UDS” kısaltması Brigade **Ultrasonic Detection System**
  bağlamındadır; ISO 14229 Unified Diagnostic Services implementasyonu değildir.
- Nextion UART gerçek kodda 9600 baud açılır; eski dokümanda 115200 baud yazması
  konfigürasyon tutarsızlığıdır.
- SD kart SDSPI ile bağlanır; alarm logu doğrudan dosya aç/yaz/kapat akışıyla tutulur.
- SoftAP, HTTP web paneli ve OTA endpoint’i bulunur.

V1, prototip işlevlerini göstermektedir; ancak kaynakta iki farklı `defs.h` pin
tanımı bulunması, doküman-kod baud farkı ve farklı MOSFET önerileri üretim
konfigürasyonunun tek kaynakta kilitlenmediğini gösterir.

## V2 Core R2 tasarım tabanı

V2, Waveshare ESP32-P4-WIFI6 geliştirme kartı etrafında tasarlanmıştır. ESP32-P4
400 MHz’e kadar çift çekirdek RISC-V HP işlemci, MIPI-DSI/CSI, USB, SD/MMC,
kripto güvenlik birimleri ve üç TWAI controller içerir. Waveshare kartında
ESP32-C6 üzerinden Wi-Fi 6/BLE 5, 32 MB PSRAM, 32 MB flash, microSD ve iki hatlı
MIPI-DSI bulunur [R1, R2].

V2 Core’un aktif araç arayüzleri:

- 2 × Klasik CAN: ESP32-P4 TWAI + TCAN1042HGV-Q1.
- 1 × CAN FD: native SPI2 + MCP2518FD + MCP2562FD.
- 2 × 9–32 V izole tetik girişi.
- 4 × röle komutu.
- 2 × PWM low-side çıkış.
- Güç kesilme erken uyarısı, output-arm ve haricî pencere-watchdog.

V2’de 24 aktif GPIO, bir DNP/AUX GPIO ve USB için ayrılmış iki GPIO ile kartın
27 header GPIO’su tamamen hesaplanmıştır. Core kapsamında I/O expander gerekmez.
LIN ve K-Line, güvenlik GPIO’larını kaldırmadan Core’a eklenemez.

# Desteklenen Protokoller ve Arayüzler

## Araç haberleşme protokolleri

| Protokol / teknoloji | V1 | V2 Core R2 | Gerçek destek seviyesi |
|---|---|---|---|
| Klasik CAN 2.0A/B | Uygulanmış, 1 kanal | Donanım hazır, 2 kanal | V1 özel sensör mesajları çalışıyor; V2 firmware eksik |
| CAN FD | Yok | Donanım hazır, 1 kanal | MCP2518FD stack’i ve stres testi gerekli |
| ISO-TP / DoCAN | Yok | Fiziksel olarak mümkün | ISO 15765-2 transport stack yok |
| OBD-II over CAN | Yok | Fiziksel olarak mümkün | DLC pinleme, ISO 15765-4 init ve servis katmanı yok |
| ISO 14229 UDS | Yok | Fiziksel olarak mümkün | Application/session/security hizmetleri uygulanmamış |
| SAE J1939 | Özel 29-bit mesaj var | Fiziksel olarak mümkün | Address claim, PGN/SPN, TP ve DM katmanı yok |
| Brigade radar protokolü | Uygulanmış, özel ID | Taşınabilir | V2 parser portu gerekli |
| Brigade ultrasonik protokolü | Uygulanmış, özel 29-bit ID | Taşınabilir | “UDS” adı ISO 14229 ile karıştırılmamalı |
| LIN | Yok | Core dışı | ISO 17987 transceiver/stack ve iki GPIO gerekir |
| K-Line / KWP2000 | Yok | Core dışı | ISO 9141/14230 physical/init/stack gerekir |

### Klasik CAN

ESP32-P4’ün üç TWAI controller’ı, üretici veri sayfasına göre CAN Specification
2.0 / ISO 11898-1 uyumlu standart ve genişletilmiş frame, 1 kbit/s–1 Mbit/s,
normal/listen-only/self-test modlarını destekler [R1]. V2 bunların ikisini
Klasik CAN için kullanır.

TCAN1042HGV-Q1; AEC-Q100 Grade 1, ±70 V bus-fault koruması, 3.3 V VIO ve 5 Mbit/s
“G” seçeneği sunar. Üretici fiziksel katman uygunluk beyanı ISO 11898-2:2016’ya
referans verir [R3]. Bu, güçlü bir bileşen seçimi kanıtıdır; fakat tüm carrier,
connector, TVS, termination ve harness’in standardı geçtiğini kanıtlamaz.

V2’nin iki CAN portunda ayrı standby GPIO’su vardır. TXD ve STB pull-up’ları
reset sırasında recessive/passive davranış hedefler. İlk firmware bring-up’ı
listen-only yapılmalıdır.

### CAN FD

V2 CAN FD kanalı aşağıdaki zincirdir:

**ESP32-P4 native SPI2 → MCP2518FD controller → MCP2562FD transceiver →
CAN-FD TVS/choke/termination → araç hattı**

MCP2518FD; CAN 2.0B/CAN FD, 2 KB mesaj RAM’i, SPI CRC komutları, hata sayaçları,
interrupt ve transceiver standby kontrolü sağlar; AEC-Q100 nitelikli seçenekleri
vardır [R4]. MCP2562FD; 8 Mbit/s’e kadar, VIO pinli ve AEC-Q100 Grade 0 CAN FD
transceiver’dır [R5].

V2 pinout’unda SPI2 doğal IO_MUX kullanılır:

| GPIO | CAN FD işlevi |
|---:|---|
| 28 | MCP2518FD nCS |
| 29 | MOSI / SDI |
| 30 | SCK |
| 31 | MISO / SDO |
| 32 | Aktif-low INT |

Bu yapı donanım seviyesinde CAN FD’ye hazırdır. Ancak MCP2518FD driver,
interrupt-servis politikası, SPI CRC, queue/overflow yönetimi, bus-off recovery
ve üretim harness’iyle veri hızı testi tamamlanmadan “CAN FD destekli ürün”
yerine “CAN FD donanımı planlanmış” ifadesi kullanılmalıdır.

### OBD-II, DoCAN ve ISO 14229 UDS

CAN transceiver sahibi olmak OBD-II veya UDS desteği anlamına gelmez.

- ISO 15765-2 çok paketli CAN transport davranışını,
- ISO 15765-4 emisyonla ilgili OBD tester/araç bağlantı gereksinimlerini,
- ISO 14229-1:2026 tanı servislerinin uygulama katmanını,
- ISO 14229-2 session katmanı arayüzünü tanımlar [S4, S5].

UniControl’da bu stack’ler, P2/P3 zamanlamaları, diagnostic session, security
access, DTC, request/response timeout veya OBD protokol tespiti uygulanmamıştır.
V2 donanımı bunları geliştirmeye elverişlidir; bugünkü statü **donanımca mümkün,
uygulama olarak desteklenmiyor** şeklindedir.

### SAE J1939

V1 kodu 29-bit extended ID mesajları alıp gönderebilir; bu tek başına J1939
değildir. J1939 için en azından address claiming, priority/PGN/source address
çözümleme, SPN ölçekleme, transport protocol ve gerekiyorsa diagnostic message
sınıfları gerekir. Güncel üst seviye doküman SAE J1939_202603’tür [S6].

V2’nin iki Klasik CAN portu J1939’ın tipik 250/500 kbit/s ve 29-bit frame
gereksinimlerini taşıyabilir. J1939 desteği bir firmware modülü ve uyumluluk
testi olarak ayrıca planlanmalıdır.

### LIN ve K-Line

Güncel LIN ailesinde ISO 17987-2:2025 transport/network hizmetlerini, ISO
17987-7:2025 elektriksel physical-layer conformance testini kapsar [S7].
K-Line/KWP2000 tarafında ISO 14230-1:2012 fiziksel katman, ISO 14230-2:2016 veri
bağlantı katmanını tanımlar; 12/24 V uygulamalar kapsanabilir [S8].

V2 Core R2’de GPIO20–22 güvenlik işlevlerine, GPIO52 ikinci CAN standby’a
ayrılmıştır. Bu nedenle LIN ve K-Line Core’dan çıkarılmıştır. Bu protokoller için
ayrı carrier varyantı, transceiver/koruma ve firmware gerekir. Rapor bunları
“desteklenen” değil, “gelecek varyant adayı” olarak sınıflandırır.

## Dahili ve servis arayüzleri

| Arayüz | V1 | V2 Core | Otomotiv protokolü mü? |
|---|---|---|---|
| UART | Nextion HMI | Servis/opsiyon | Hayır; kart içi/servis seri arayüzü |
| MIPI-DSI | Yok | HMI ekran | Hayır; yüksek hızlı ekran arayüzü |
| SPI | Haricî SD | MCP2518FD | Hayır; PCB içi çevrebirim bus’ı |
| SDIO/SDMMC | Yok | Onboard microSD | Hayır; storage arayüzü |
| I2C | DS1307 RTC | Touch/audio + DNP ADC/RTC | Hayır; PCB içi düşük hızlı bus |
| USB OTG | Programlama | Programlama/servis | Hayır; servis arayüzü |
| Wi-Fi | SoftAP/web/OTA | Wi-Fi 6 via ESP32-C6 | Hayır; kablosuz servis ağı |
| BLE | Yok/aktif değil | BLE 5 via ESP32-C6 | Hayır; servis/konfigürasyon adayı |
| HTTP | Web paneli, log, OTA | Yeniden tasarlanmalı | Otomotiv protokolü değil; siber güvenlik kapsamı |

# Otomotiv Standartları Uygunluk Analizi

## CAN ve diagnostic standartları

| Standart | Kapsam | UniControl durumu | Kanıt / eksik |
|---|---|---|---|
| ISO 11898-1:2024 | CAN data link ve physical coding | V1 kısmi; V2 tasarımsal hizalı | Controller özelliği var; sistem conformance testi yok |
| ISO 11898-2:2026 | High-speed CAN physical medium attachment | V2 kısmi | Transceiver beyanı eski 2016 sürümüne referanslı; 2026 değerlendirmesi yok |
| ISO 16845-1:2016 | Klasik CAN/CAN FD conformance test planı | Test edilmedi | Akredite veya kontrollü conformance sonuçları yok |
| ISO 15765-2/-4 | DoCAN transport ve OBD haberleşmesi | Uygulanmadı | Stack, DLC ve tester interoperability testi yok |
| ISO 14229-1:2026 | UDS application layer | Uygulanmadı | Kodda diagnostic service stack yok |
| SAE J1939_202603 | Ağ ve ağır vasıta üst katmanları | Uygulanmadı | Yalnızca genel 29-bit frame kabiliyeti var |
| ISO 17987 serisi | LIN | Core dışı | Transceiver ve stack yok |
| ISO 9141 / ISO 14230 | K-Line/KWP2000 | Core dışı | Physical layer/init/stack yok |

ISO 11898-1:2024 ve ISO 11898-2:2026 güncel sürümlerdir [S1, S2]. Seçilen CAN
bileşenlerinin veri sayfalarında daha eski standarda uygunluk yazması, yeni
sürümün ilgili çalışma modları için otomatik uygunluk sağlamaz. Release öncesi
standardın uygulanabilir maddeleri ve seçilen CAN modu için bir delta analizi
yapılmalıdır.

## Elektriksel yükler ve transient dayanımı

| Standart / test ailesi | Beklenen konu | V1 | V2 R2 |
|---|---|---|---|
| ISO 16750-2:2023 | Besleme gerilimi, crank, jump start, reverse vb. | Uygunluk yok | Mimari planlı, parça/test eksik |
| ISO 7637-2:2011 | 12/24 V besleme hattı transientleri | Uygunluk yok | TVS/koruma planlı, pulse testi yok |
| OEM load-dump profili | Bastırılmış/bastırılmamış load dump | Tanımlı değil | Release blocker |
| Güç kesilme/log koruması | Güvenli shutdown ve storage bütünlüğü | Yok | `PWR_FAIL_N` + hold-up planlı |

V1’de LM2596 modül, 1N5408 ters-polarite diyodu ve sigorta bulunur. Bu elemanlar
tek başına araç güç transient standardını karşılamaz. Özellikle buck’ın absolute
maximum gerilimi ile TVS clamp gerilimi arasındaki margin ve 24 V load-dump
profili tanımlı değildir.

V2’de fuse, ideal-diode reverse protection, TVS, geniş girişli otomotiv buck,
reverse-current-blocking VSYS switch, sequenced CAN_5V ve hold-up mimarisi
tanımlanmıştır. Bu doğru yöndür; fakat exact parçalar ve pulse sınıfları
kilitlenmeden uygunluk iddiası yapılamaz. ISO 16750-2:2023 elektriksel yükleri,
ISO 7637-2:2011 12/24 V conducted transient testlerini kapsar [S9, S10].

## EMC, ESD ve regülasyon

| Standart / regülasyon | Kapsam | Mevcut durum |
|---|---|---|
| ISO 10605:2023 | Araç modülü/araç ESD testleri | TVS/izolasyon planı var; test yok |
| ISO 11452-2:2019 | Narrowband radiated immunity | Test yok |
| CISPR 25:2021 | Araç içi receiver koruması için conducted/radiated emission | Test yok |
| UN Regulation No. 10 | Araç/ESA elektromanyetik uyumluluk tip onayı | Tip onayı yok |

ISO 10605 doğrudan ve dolaylı ESD durumlarını, ISO 11452-2 absorber-lined
chamber immunity yöntemini, CISPR 25 ise 150 kHz–5.925 GHz aralığında araç içi
receiver’ları korumaya yönelik emission ölçümlerini kapsar [S11–S13].

V2’de connector yanında TVS, kısa dönüş yolu, CAN common-mode choke için bypass,
split termination ve tek parça GND düzlemi gibi iyi tasarım kuralları vardır.
Bunlar EMC riskini düşürür; ölçümün yerine geçmez. Ürünün pazarı ve montaj
şekline göre UN R10’un yürürlükteki amendment serisi ve ESA kapsamı homologasyon
uzmanıyla belirlenmelidir [S20].

## Mekanik, iklimsel ve muhafaza

| Standart | Kapsam | Durum |
|---|---|---|
| ISO 16750-3:2023 | Titreşim ve mekanik yükler | Test yok; devkit friction header riskli |
| ISO 16750-4:2023 | Sıcaklık, nem ve iklimsel yükler | Test yok; sıcaklık sınıfı kilitli değil |
| IEC 60529 | IP muhafaza koruma derecesi | Enclosure/IP hedefi tanımlanmamış |

V2 carrier’ın devkit üzerine header ile takılması geliştirme için uygundur; araç
titreşimi için tek başına yeterli kabul edilmemelidir. Standoff, kilitleme,
connector retention ve fretting değerlendirmesi gerekir. ESP32-P4-WIFI6 bir
geliştirme kartıdır; tüm kartın otomotiv sıcaklık/titreşim kalifikasyonu olduğuna
dair üretici beyanı bulunmamaktadır. ISO 16750-3 ve -4 güncel mekanik/iklimsel
test aileleridir [S14].

## AEC bileşen kalifikasyonu

| Bileşen | Üretici beyanı | Sistem etkisi |
|---|---|---|
| TCAN1042HGV-Q1 | AEC-Q100 Grade 1, automotive | Klasik CAN physical layer için güçlü seçim |
| MCP2518FD | AEC-Q100 seçenekleri, functional-safety ready | CAN FD controller riskini azaltır |
| MCP2562FD | AEC-Q100 Grade 0 | CAN FD transceiver için güçlü seçim |
| TPS3430-Q1 | AEC-Q100 automotive window watchdog | Haricî supervision sağlar |
| SN74LVC08A-Q1 | Automotive-qualified logic | Output safety gate’i güçlendirir |
| ESP32-P4-WIFI6 devkit | Geliştirme kartı | ECU seviyesinde AEC kalifikasyonu gösterilmemiş |
| Buck/TVS/MOSFET/relay/opto | Henüz kilitli değil | Üretim uygunluğu belirlenemez |

AEC-Q100 bir entegre devre kalifikasyonudur; tüm PCB’nin, yazılımın veya ECU’nun
otomotiv sertifikası değildir. AEC-Q101 MOSFET ve AEC-Q200 pasif/clock seçimi de
kesin BOM’da ayrı ayrı doğrulanmalıdır.

## Fonksiyonel güvenlik ve SOTIF

### ISO 26262

V2’de haricî watchdog, output-arm, power-fail, pasif CAN boot ve fiziksel çıkış
gating bulunması güvenlik mimarisini V1’e göre ciddi biçimde iyileştirir. Ancak
ISO 26262 uyumluluğu için yalnızca güvenlik parçaları yeterli değildir. En az:

- Item definition ve safety scope,
- HARA ve ASIL tayini,
- Functional/technical safety concept,
- Hardware safety metrics ve FMEDA,
- Software safety requirements ve freedom-from-interference,
- Verification, confirmation review ve safety case,
- Konfigürasyon/değişiklik yönetimi ve üretim/servis süreçleri

gereklidir. Bu work-product’lar mevcut değildir. Dolayısıyla V2 **ISO 26262
uyumlu değildir**, yalnızca güvenli tasarım ilkelerine doğru ilerlemektedir.
ISO 26262-2:2018, fonksiyonel güvenlik yönetimini tüm safety lifecycle boyunca
ele alır [S15].

### ISO 21448 / SOTIF

UniControl radar/ultrasonik algı verisini sürücüye uyarı olarak sunuyorsa yanlış
pozitif, yanlış negatif, algılama sınırı, kör bölge, gecikme ve öngörülebilir
yanlış kullanım riskleri doğar. Sistem fiziksel aktüatörleri sürüyorsa risk daha
da yükselir. ISO 21448:2022; sensör/algoritma performans yetersizliğinden doğan
unreasonable risk’i ele alır [S16].

Mevcut projede ODD, scenario catalogue, sensor limitation modeli, SOTIF
acceptance criteria veya saha monitoring planı yoktur. “ADAS” ifadesi pazarlama
ve kapsam açısından ancak fonksiyonun advisory mi yoksa intervention mı olduğu
netleştirildikten sonra kullanılmalıdır.

## Siber güvenlik, web ve OTA

Mevcut V1 firmware’de:

- SoftAP parolası kaynakta sabit `12345678` olarak bulunur.
- HTTP `/save`, `/tog`, `/dl` ve `/up` endpoint’lerinde uygulama seviyesinde
  kimlik doğrulama/yetkilendirme görülmez.
- OTA akışı gelen binary’yi `esp_ota_write` ile yazar; uygulama seviyesinde
  imza, sürüm politikası, anti-rollback veya manifest doğrulaması görülmez.
- Secure Boot / Flash Encryption etkinleştirme kanıtı yoktur.
- Fiziksel çıktılar HTTP GET üzerinden tetiklenebilir.

Bu durum ISO/SAE 21434 ve UN R155 beklentileri açısından kritik boşluktur.
ISO/SAE 21434:2021 tüm yaşam döngüsünde cybersecurity risk management ister;
UN R155 CSMS, risk değerlendirmesi, mitigation ve incident monitoring süreçleri
getirir [S17, S19].

ESP32-P4; secure boot, flash encryption, HMAC, AES, SHA, RSA/ECC, digital
signature ve key-management donanımları sağlar [R1, R2]. Bu yetenekler V2’yi
güvenli hale getirme potansiyeli sunar; varsayılan olarak güvenli değildir.

V2 OTA için hedef mimari:

1. Benzersiz cihaz kimliği ve güvenli key provisioning.
2. Secure Boot ve encrypted storage/flash.
3. İmzalı firmware manifesti, donanım/versiyon uyumluluğu ve anti-rollback.
4. Kimlik doğrulamalı, yetkilendirilmiş ve rate-limited yönetim arayüzü.
5. Fiziksel output komutlarının web erişiminden ayrılması ve safety policy.
6. Update başarısızlığında doğrulanmış rollback/recovery.
7. Audit log, incident response ve anahtar rotasyonu.

ISO 24089:2023/Amd 1:2024 software update engineering’i organizasyon ve proje
seviyesinde ele alır; UN R156 ise araç software-update management sistemiyle
ilişkilidir [S18, S19]. Mevcut OTA bunlara uyumlu değildir.

# V1’den V2’ye Ayrıntılı Farklar

## İşlemci, HMI ve storage

| Konu | V1 | V2 Core R2 | Etki |
|---|---|---|---|
| Ana işlemci | ESP32-S3, 240 MHz | ESP32-P4, 400 MHz’e kadar dual-core RISC-V | HMI, logging ve protokol kapasitesi artar |
| Kablosuz | S3 dahili Wi-Fi/BLE | ESP32-C6 ile Wi-Fi 6/BLE 5 | Servis kapasitesi artar; saldırı yüzeyi de büyür |
| Ekran | Nextion 4.3, UART | MIPI-DSI, LVGL | UI kontrolü artar; ekran SKU/driver riski gelir |
| Storage | Haricî Wemos SDSPI | Onboard SDIO microSD | Bant genişliği ve entegrasyon iyileşir |
| Saat | DS1307/RTC shield | RTC DNP; network/monotonic alternatif | Güvenilir timestamp mimarisi yeniden seçilmeli |
| Ses | Aktif buzzer | Onboard codec/speaker + opsiyonel alarm | Daha zengin HMI; ses safety yolu tanımlanmalı |

## Araç haberleşmesi

| Konu | V1 | V2 Core R2 | Fark |
|---|---|---|---|
| Klasik CAN | 1 × SN65HVD230 | 2 × TCAN1042HGV-Q1 | Kanal sayısı, bus-fault ve otomotiv kalifikasyonu artar |
| CAN FD | Yok | 1 × MCP2518FD + MCP2562FD | 64-byte payload ve yüksek data phase mümkün |
| Standby | Donanımsal güvenli default net değil | Port başına ayrı STB + pull-up | Reset/bus fault izolasyonu iyileşir |
| Termination | Tek 120 Ω | Port başına selectable 120 Ω/split | Harness topolojisine uyarlanabilir |
| Koruma | Modül seviyesi | TVS/choke/bypass/layout kuralları | EMC/transient hazırlığı artar |
| Bring-up | Normal/transmit mode | Listen-only zorunlu plan | Araç bus’ına istenmeyen etki riski düşer |

## Giriş, çıkış ve fail-safe

| Konu | V1 | V2 Core R2 | Fark |
|---|---|---|---|
| İzole giriş | 3 × PC817, 12 V | 2 × 9–32 V bridge/TVS/opto | Polarite ve 24 V kapsamı iyileşir; kanal sayısı azalır |
| Röle | 3 × G6K telecom relay | 4 kanal, gerçek yükle parça seçilecek | Kanal artar; power-relay uygunluğu P0 |
| MOSFET | 3 × IRF9540/IRLZ44 doküman çelişkisi | 2 × protected low-side/PWM hedefi | Kısa devre/termal tasarım daha kontrollü olmalı |
| Watchdog | İç WDT/yazılım | TPS3430-Q1 haricî window watchdog | Stuck/too-fast/late heartbeat algısı |
| Output inhibit | GPIO başlangıç seviyesine bağlı | `OUTPUT_ARM` + `SAFE_OK` hardware gate | Reset ve power-fail’de fiziksel OFF |
| Power fail | Yok | Erken uyarı + hold-up planı | SD corruption penceresi sınırlandırılabilir |

## Güç ve mekanik

| Konu | V1 | V2 Core R2 | Fark |
|---|---|---|---|
| Giriş | 12–14.4 V odaklı | 9–32 V nominal hedef | 12/24 V kullanım hedefi |
| Buck | LM2596 modül | Geniş girişli otomotiv buck, parça bekliyor | Transient margin tasarlanabilir |
| Reverse | 1N5408 | Ideal-diode MOSFET stage | Kayıp ve ters-batarya davranışı iyileşir |
| USB/araç coexistence | Tanımsız | Reverse-blocking VSYS switch | Back-feed riski kontrol edilir |
| Ground | Eski star-ground anlatımı | Tek kesintisiz GND plane + kontrollü return | Yüksek hızlı signal integrity iyileşir |
| Mekanik | Modül/kablo prototipi | Carrier + retention gereksinimi | Üretim için hâlâ vibration doğrulaması gerekir |

## Yazılım mimarisi

V1 firmware’i V2’ye taşınmış değildir. `platformio.ini` ESP32-S3 hedefler;
pinler, Nextion, SDSPI ve tek TWAI HAL’i V1’e aittir. V2 için aşağıdakiler yeni
geliştirme kalemidir:

- ESP32-P4 board target ve tek kaynaklı pin konfigürasyonu.
- İki TWAI instance ve bağımsız listen-only/normal state machine.
- MCP2518FD SPI/interrupt/CRC driver.
- `PWR_FAIL_N`, `OUTPUT_ARM`, TPS3430 heartbeat ve reset-reason yönetimi.
- SDIO logger, RAM ring buffer, sequence/CRC ve bounded power-fail flush.
- LVGL/MIPI-DSI HMI ve exact 4.3 inç panel BSP’si.
- Secure boot, signed OTA, authentication/authorization ve audit log.
- Queue backpressure, drop counter ve priority inversion testleri.

# Darboğazlar ve Risk Kaydı

| Öncelik | Risk | Etki | Kapatma ölçütü |
|---|---|---|---|
| P0 | Exact 4.3 inç ekran SKU’su doğrulanmadı | HMI/connector/akım/driver belirsiz | SKU, schematic ve BSP bench doğrulaması |
| P0 | Araç transient profili ve power parçaları kilitli değil | Reset/yanma/yangın riski | ISO/OEM pulse planı ve margin hesabı |
| P0 | Röle/PWM gerçek yük tablosu yok | MOSFET/relay/fuse yanlış boyutlanabilir | Akım, inrush, L, duty, ambient, fault tablosu |
| P0 | V2 firmware/HAL yok | Donanım işlevsiz veya unsafe boot | P4 build + güvenli state-machine testleri |
| P0 | Web/OTA güvenli değil | Yetkisiz output/firmware erişimi | Signed OTA, authz, secure boot, threat model |
| P1 | SD power-loss süresi ölçülmedi | Log/file-system corruption | Pull-test ile bounded data-loss kanıtı |
| P1 | CAN FD queue/SPI budget doğrulanmadı | Frame kaybı ve bus-off | Max-load stress ve error counter acceptance |
| P1 | Devkit mekanik/thermal kalifikasyonu yok | Sahada intermittent reset/arızalar | Enclosure thermal + vibration testleri |
| P1 | EMC/ESD testi yok | Araçta reset veya interference | CISPR/ISO/UN R10 test raporu |
| P2 | LIN/K-Line/OBD/J1939 beklentisi belirsiz | Scope ve GPIO büyümesi | Ürün varyant/müşteri gereksinimi kararı |

# Uygunluk Yol Haritası

## Faz 0 — Ürün ve regülasyon kapsamını dondurma

1. Ürün rolünü belirle: sadece izleme/uyarı mı, yoksa fiziksel aktüasyon mu?
2. Hedef araçları belirle: 12 V, 24 V, ağır vasıta, iş makinesi, karavan.
3. Hedef pazar ve homologasyon yolunu belirle: aftermarket ESA, OEM/Tier-1
   entegrasyonu veya prototip/kapalı saha.
4. CAN üzerinde listen-only, diagnostic tester veya transmitting ECU rolünü belirle.
5. Exact ekran, connector, muhafaza, IP sınıfı ve montaj konumunu dondur.

## Faz 1 — Tasarım release paketi

- Kesin BOM ve orderable part number.
- AEC qualification/temperature/derating kanıtları.
- Power transient ve thermal hesapları.
- CAN termination/topology ve harness şartnamesi.
- Output load/fuse/connector/short-circuit tasarımı.
- KiCad schematic/ERC, PCB stack-up, placement ve routing review.
- DFMEA, interface control document ve requirement traceability.

## Faz 2 — V2 firmware ve güvenlik temeli

- ESP32-P4 BSP/HAL ve otomatik pin-map kontrolü.
- Listen-only first boot, safe state ve external watchdog.
- Dual CAN + CAN FD driver ve bounded queue.
- Güvenli logging/power-fail recovery.
- Secure Boot, Flash Encryption, signed OTA, anti-rollback.
- Role-based service access; physical output için ayrı safety authority.
- Static analysis, unit/integration test, fuzzing ve fault injection.

## Faz 3 — Design Verification (DV)

1. Power combinations: vehicle-only, USB-only, ikisi birlikte, brownout.
2. ISO 16750-2/OEM electrical load profili.
3. ISO 7637-2 transient pulse planı.
4. ISO 10605 ESD.
5. CISPR 25 emissions ve ISO 11452 immunity.
6. CAN/CAN FD conformance, harness length/load ve bus fault.
7. Hot/cold thermal, humidity, vibration ve connector retention.
8. SD power-pull, filesystem recovery ve log loss window.
9. Output short/open/reverse/inductive clamp ve hot-soak.
10. Security penetration, OTA failure/rollback ve key compromise senaryoları.

## Faz 4 — Üretim doğrulama ve sertifikasyon

- Golden sample, end-of-line test ve serialization.
- Calibration/configuration integrity ve secure provisioning.
- Production Part Approval / supplier quality planı.
- Hedef pazara göre UN R10/ESA tip onayı.
- ISO 26262/SOTIF/cybersecurity work-product ve assessment kapsamı.
- Field update, incident response, vulnerability disclosure ve lifecycle planı.

# Önerilen Kabul Kriterleri

| Test alanı | Asgari kabul kriteri |
|---|---|
| Reset/boot | P4 çıkarılmış, reset veya boot-loop halinde tüm outputs OFF, CAN passive |
| Watchdog | Erken, geç ve kayıp heartbeat fiziksel output’u kapatıp P4’ü resetler |
| Power fail | Outputs hemen OFF; SD kontrollü kapanır; izin verilen log kaybı aşılmaz |
| CAN izolasyonu | Bir port short/fault iken diğer portlar ve MCU çalışmaya devam eder |
| CAN FD yük | Final nominal/data rate’te overflow yok veya bounded/counted drop |
| USB/VSYS | Hiçbir güç kombinasyonunda VBUS/VSYS/3V3 back-feed yok |
| Output fault | Fuse/protection silicon, PCB, connector ve harness limitinden önce davranır |
| ESD/EMC | Tanımlı function performance class korunur; unintended output yok |
| Storage | Tekrarlı maksimum-yazma power pull sonrası filesystem mount edilir |
| Security | Yetkisiz kullanıcı output/ayar/log/OTA erişemez; unsigned image boot etmez |

# Genel Uygunluk Kararı

## V1

V1, işlev gösteren bir laboratuvar/araç prototipidir. Klasik CAN sensör mesajı,
Nextion HMI, GPIO I/O ve logging kabiliyeti vardır. Otomotiv standardına uygunluk
veya yol aracı kullanım sertifikası iddiası için yeterli değildir. En kritik
eksikler; araç transient dayanımı, CAN transceiver/buck/çıkış kalifikasyonu,
haricî fail-safe, EMC/ESD testleri, konfigürasyon tutarlılığı ve web/OTA
güvenliğidir.

## V2 Core R2

V2, otomotiv odaklı bir tasarım tabanıdır ve V1’e göre çok daha doğru güvenlik
katmanları içerir. CAN bileşen kalitesi, kanal sayısı, CAN FD, watchdog,
power-fail, output gating, güç domainleri ve layout kuralları belirgin biçimde
iyidir. Ancak mevcut hali bir tasarım inceleme paketidir; final schematic/PCB,
firmware, exact BOM, enclosure ve laboratuvar testleri tamamlanmamıştır.

Doğru ürün ifadesi:

> **“UniControl V2 Core R2, 12/24 V araç uygulamaları ve güncel CAN/CAN FD
> standartları hedeflenerek tasarlanmış, otomotiv nitelikli arayüz bileşenleri
> kullanan geliştirme aşamasında bir kontrolcü mimarisidir. Sistem seviyesinde
> otomotiv sertifikasyonu ve uygunluk testleri henüz tamamlanmamıştır.”**

Kaçınılması gereken ifade:

> **“UniControl V2 tüm otomotiv standartlarına uygundur/sertifikalıdır.”**

# Ek A — V2 Core R2 Pin Özeti

| GPIO | İşlev | Güvenlik notu |
|---:|---|---|
| 2 / 3 | CAN1 TX/RX | TCAN1042HGV-Q1 |
| 4 / 5 | CAN2 TX/RX | TCAN1042HGV-Q1 |
| 7 / 8 | I2C SDA/SCL | Onboard pull-up; touch/audio ile ortak |
| 20 | PWR_FAIL_N | Open-drain erken uyarı |
| 21 | OUTPUT_ARM | 100k pull-down, güvenli default OFF |
| 22 | SAFETY_HB | TPS3430-Q1 WDI |
| 23 | AUX_GPIO_DNP | Tek kalan DNP/AUX GPIO |
| 26 / 27 | İzole trigger 1/2 | 9–32 V protected input |
| 28–32 | CAN FD SPI/INT | CS, MOSI, SCK, MISO, INT |
| 33 | CAN1_STB | Boot default standby |
| 46 / 47 | PWM 1/2 | Hardware safety gate üzerinden |
| 48–51 | Röle 1–4 | Hardware safety gate üzerinden |
| 52 | CAN2_STB | Boot default standby |
| 24 / 25 | USB D-/D+ | Araç I/O için kullanılmaz |

# Ek B — Terimler ve Yanlış Anlaşılmalar

| Terim | Bu projedeki doğru anlam |
|---|---|
| TWAI | Espressif’in CAN 2.0 controller çevrebirimi |
| CAN transceiver | MCU logic ile CANH/CANL fiziksel hattı arasındaki katman |
| CAN FD controller | 64-byte frame/data-phase destekleyen protocol controller |
| UDS (ISO 14229) | Unified Diagnostic Services; projede henüz uygulanmadı |
| Brigade UDS | Ultrasonik algılama sistemi; ISO 14229 değildir |
| OBD-II | Connector + initialization + transport + diagnostic service bütünü |
| J1939 | 29-bit CAN üzerinde ağır vasıta application/network katman ailesi |
| AEC-Q100 | Entegre devre qualification; ECU sertifikası değildir |
| ISO 26262 ready/capable | Safety dokümanı olan bileşen; sistem ASIL uyumu değildir |
| DNP | PCB’de seçenek olarak bırakılan fakat populate edilmeyen devre |

# Ek C — Proje İçi İzlenebilirlik

| Kaynak | Raporda kullanılan kanıt |
|---|---|
| `src/hal.c` | V1 TWAI 250 kbit/s normal mode, UART, I2C, SDSPI, logging |
| `src/logic.c` | 11/29-bit özel sensör ID’leri ve keepalive |
| `src/web.c` | SoftAP, HTTP kontrol/log/OTA ve güvenlik boşlukları |
| `src/defs.h` / `include/defs.h` | V1 pin kaynağı çakışması ve sensör adlandırması |
| `platformio.ini` | Firmware’in hâlâ ESP32-S3 hedeflemesi |
| `UniControl 5.1.md` / `UniControl GPIO.md` | V1 mimari ve donanım kararları |
| `docs/v2-pinout.md` | V2 R2 GPIO, CAN ve safety pin planı |
| `docs/v2-carrier-schematic.md` | Güç, CAN, trigger, output ve release gates |
| `docs/v2-design-review.md` | Failure-mode, darboğaz ve firmware geçiş analizi |

# Kaynakça

## Üretici kaynakları

- **[R1]** Espressif, [ESP32-P4 Series Datasheet](https://documentation.espressif.com/esp32-p4_datasheet_en.html).
- **[R2]** Waveshare, [ESP32-P4-WIFI6 ürün ve donanım dokümantasyonu](https://docs.waveshare.com/ESP32-P4-WIFI6).
- **[R3]** Texas Instruments, [TCAN1042HGV-Q1 product/datasheet](https://www.ti.com/product/TCAN1042HGV-Q1).
- **[R4]** Microchip, [MCP2518FD External CAN FD Controller Datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/External-CAN-FD-Controller-with-SPI-Interface-DS20006027B.pdf).
- **[R5]** Microchip, [MCP2562FD CAN FD Transceiver](https://www.microchip.com/en-us/product/mcp2562fd).
- **[R6]** Texas Instruments, [TPS3430-Q1 Window Watchdog](https://www.ti.com/product/TPS3430-Q1).
- **[R7]** Texas Instruments, [SN74LVC08A-Q1 Automotive AND Gate](https://www.ti.com/product/SN74LVC08A-Q1).

## Standart ve regülasyon kaynakları

- **[S1]** ISO, [ISO 11898-1:2024 — CAN data link layer and physical coding sublayer](https://www.iso.org/standard/86384.html).
- **[S2]** ISO, [ISO 11898-2:2026 — High-speed CAN PMA sublayer](https://www.iso.org/standard/90697.html).
- **[S3]** ISO, [ISO 16845-1:2016 — CAN conformance test plan](https://www.iso.org/standard/59166.html).
- **[S4]** ISO, [ISO 14229-1:2026 — Unified Diagnostic Services](https://www.iso.org/standard/87962.html).
- **[S5]** ISO, [ISO 15765-2:2024 — DoCAN transport and network layer](https://www.iso.org/standard/84211.html) ve [ISO 15765-4:2021 — emissions-related systems](https://www.iso.org/standard/78384.html).
- **[S6]** SAE International, [SAE J1939_202603 top-level document](https://saemobilus.sae.org/standards/j1939_202603-serial-control-communications-heavy-duty-vehicle-network-top-level-document).
- **[S7]** ISO, [ISO 17987-2:2025 — LIN transport and network layer](https://www.iso.org/standard/85126.html) ve [ISO 17987-7:2025 — electrical physical-layer conformance](https://www.iso.org/standard/85130.html).
- **[S8]** ISO, [ISO 14230-2:2016 — Diagnostic communication over K-Line](https://www.iso.org/standard/69115.html) ve [ISO 9141-2:1994 — OBD-II digital information interchange](https://www.iso.org/standard/16738.html).
- **[S9]** ISO, [ISO 16750-2:2023 — Electrical loads](https://www.iso.org/standard/76119.html).
- **[S10]** ISO, [ISO 7637-2:2011 — Conducted electrical transients](https://www.iso.org/standard/50925.html).
- **[S11]** ISO, [ISO 10605:2023 — Automotive ESD test methods](https://www.iso.org/standard/79094.html).
- **[S12]** ISO, [ISO 11452-2:2019 — Radiated immunity component test](https://www.iso.org/standard/68557.html).
- **[S13]** IEC, [CISPR 25:2021 — Vehicle radio disturbance limits and methods](https://webstore.iec.ch/en/publication/64645).
- **[S14]** ISO, [ISO 16750-3:2023 mechanical loads](https://www.iso.org/standard/77579.html) ve [ISO 16750-4:2023 climatic loads](https://www.iso.org/standard/77580.html).
- **[S15]** ISO, [ISO 26262-2:2018 — Management of functional safety](https://www.iso.org/standard/68384.html).
- **[S16]** ISO, [ISO 21448:2022 — Safety of the intended functionality](https://www.iso.org/standard/77490.html).
- **[S17]** ISO/SAE, [ISO/SAE 21434:2021 — Cybersecurity engineering](https://www.iso.org/standard/70918.html).
- **[S18]** ISO, [ISO 24089:2023 — Software update engineering](https://www.iso.org/standard/77796.html).
- **[S19]** UNECE, [UN Regulations No. 155 and 156 reference documents](https://unece.org/transport/road-transport/reference-documents).
- **[S20]** UNECE, [Vehicle regulations / UN Regulation No. 10 EMC references](https://unece.org/ev-hev-and-fc).

---

**Rapor sonu — Revizyon 1.0**
