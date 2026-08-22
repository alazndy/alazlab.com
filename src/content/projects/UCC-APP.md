---
image: "/projects/UCC-APP.png"
title: "UCC APP"
category: "AI & Veri"
area: "muhendislik"
status: "Active"
summary: "Flutter tabanlı UniControl Manager; ESP32 tabanlı otomotiv radar sistemine Wi-Fi SoftAP ve HTTP üzerinden bağlanır, ayar, OTA ve log akışlarını tek mobil arayüzde toplar."
techStack: ["Flutter", "Dart", "Provider", "go_router", "HTTP", "file_picker", "SharedPreferences", "Google Fonts"]
gallery:
  - src: "/projects/UCC-APP.png"
    alt: "UCC APP radar kontrol arayüzü"
    caption: "ESP32 tabanlı radar sistemi için mobil kontrol ve servis arayüzü."
---

## Genel Bakış

UCC APP, ESP32 tabanlı otomotiv radar sistemini telefondan yönetmek için geliştirilmiş Flutter uygulamasıdır. Uygulama cihazın Wi-Fi SoftAP ağına bağlanır ve `192.168.4.1` üzerindeki HTTP servisleriyle haberleşir.

Uygulama bir bulut paneli değildir; cihazla aynı yerel ağa bağlanıp radar kontrolcüsünün ayarlarını ve servis akışlarını yönetir. Bu yaklaşım, araç içindeki bağlantı senaryosunu basit ve doğrudan tutar.

## Ne Sağlıyor?

- ESP32 cihazına bağlantı kontrolü ve bağlantı durumunun gösterimi
- Radar eşiklerinin ve araç boyut parametrelerinin mobil arayüzden düzenlenmesi
- Sensör tipi seçimi ve sistem seçeneklerinin kaydedilmesi
- `.bin` firmware dosyasını seçip OTA endpoint’ine yükleme
- Debug CAN, Nextion ve radar mantığı için ayrı bayraklar
- Cihaz loglarını indirip uygulama içinde görüntüleme

## Uygulama Ekranları

### Bağlantı ekranı

Uygulama açılışta ESP32 cihazının varsayılan SoftAP adresine erişmeyi dener. Bağlantı kurulduğunda ayarlar, OTA güncelleme ve debug/log ekranlarına geçiş açılır.

### Sistem ayarları

Mevcut ayar formu şu grupları içerir:

- **Radar eşikleri:** uyarı ve tehlike bölgeleri
- **Araç profili:** araç genişliği, yan pay ve maksimum algılama genişliği
- **Sistem seçenekleri:** takip edilecek maksimum nesne sayısı, otomatik zoom ve sesli alarm
- **Sensör seçimi:** radar, ultrasonik ve hibrit sensör profilleri

Ayarlar cihaz servisine form verisi olarak gönderilir. Kaydetme başarısız olduğunda uygulama kullanıcıya hata bildirir.

### OTA firmware güncelleme

OTA ekranı yalnızca `.bin` dosyalarını seçer. Seçilen dosya ESP32 üzerindeki `/update` endpoint’ine multipart POST isteğiyle gönderilir. Firmware güncellemesi sırasında cihazın güç bağlantısı kesilmemelidir.

### Debug ve loglar

Debug ekranı CAN Bus, Nextion ve radar mantığı bayraklarını yönetir. `/dl` endpoint’inden alınan log çıktısı uygulama içinde kaydırılabilir metin olarak görüntülenir.

## HTTP Servis Sözleşmesi

Uygulamanın mevcut `ApiService` katmanı aşağıdaki cihaz endpoint’lerini kullanır:

| İstek | Endpoint | Amaç |
|---|---|---|
| `GET` | `/` | Bağlantı kontrolü ve cihaz yanıtı |
| `POST` | `/save` | Sistem ayarlarını kaydetme |
| `POST` | `/update` | `.bin` firmware yükleme |
| `GET` | `/dl` | Debug loglarını indirme |

Base URL uygulama içinde `http://192.168.4.1` olarak tanımlıdır. Cihaz firmware’i farklı bir adres veya endpoint sözleşmesine geçerse mobil API katmanı da birlikte güncellenmelidir.

## Kurulum ve Geliştirme

### Gereksinimler

- Flutter SDK 3.9 veya üzeri
- Android Studio veya Xcode
- USB üzerinden test edilecek ESP32 cihazı

### Başlatma

```bash
flutter pub get
flutter run
```

Android ve iOS hedefleri için proje kendi platform toolchain’leriyle derlenir. Uygulama özel/proprietary bir çalışma olduğu için bu sayfada herkese açık APK veya firmware paketi yayınlanmamaktadır.

## Kod Yapısı

```text
lib/
 api/api_service.dart          # ESP32 HTTP haberleşmesi
 screens/                      # bağlantı, ayar, OTA ve log ekranları
 theme/app_theme.dart          # koyu otomotiv arayüzü
 main.dart                     # router ve Provider kurulumu
```

Durum yönetimi `provider`, sayfa yönlendirmesi `go_router`, firmware dosyası seçimi `file_picker` ile yürütülür.

## Durum

Aktif geliştirme. Mobil uygulamanın temel bağlantı, ayar, OTA ve log akışları mevcut; cihaz firmware’iyle birlikte uçtan uca saha doğrulaması yapılması gereken bir mühendislik aracıdır.
