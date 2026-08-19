---
image: "/projects/NEXUS.png"
title: NEXUS
category: Hardware & Embedded
area: muhendislik
status: Early
summary: Windows ve Android için local-first çalışan; Markdown notları, diyagramları, bilgi grafiğini ve isteğe bağlı bulut senkronizasyonunu tek Flutter uygulamasında birleştiren dokümantasyon platformu.
techStack: [Flutter, Dart, Provider, SQLite, FTS5, Markdown, Google Drive API, GitHub API]
date: 2026-02-01
github: https://github.com/alazndy/NEXUS
manuals:
  - title: "NEXUS README"
    href: "https://github.com/alazndy/NEXUS/blob/main/README.md"
    description: "Kurulum, platform hedefleri, proje yapısı ve mevcut özelliklerin teknik özeti."
    format: "Markdown"
gallery:
  - src: "/projects/NEXUS.png"
    alt: "NEXUS dokümantasyon ve diyagram platformu"
    caption: "Retro-industrial arayüz diliyle tasarlanan local-first çalışma alanı."
---

## Genel Bakış

NEXUS, Windows ve Android hedefleri olan bir **local-first dokümantasyon ve çizim platformudur**. Markdown notlarını, diyagram dosyalarını ve bilgi bağlantılarını cihaz üzerinde yönetir; bulut senkronizasyonu ise ayrı bir entegrasyon katmanı olarak çalışır.

## Temel Kullanım

- **Çalışma alanı:** Klasör seçerek Markdown ve `.diagram` dosyalarını açma, oluşturma ve kaydetme.
- **Editör:** Bölünmüş Markdown görünümü, canlı önizleme, sekmeler, otomatik kaydetme ve slash komutları.
- **Bilgi ağı:** `[[wiki-link]]` bağlantıları, geri bağlantılar ve notlardan üretilen bilgi grafiği.
- **Diyagram:** Şekiller, bağlantılar, seçim/hizalama araçları, minimap ve PNG/PDF dışa aktarma.
- **Arama:** SQLite FTS5 tabanlı tam metin araması.

## Senkronizasyon ve Gizlilik

Dosyalar önce yerel çalışma alanında tutulur. Kod tabanında Google Drive ve GitHub senkronizasyon servisleri ile çalışma alanını uzaktaki depolara aktaracak akışlar bulunur; bu entegrasyonlar ürünün temel yerel kullanımından ayrıdır.

Çalışma alanı sağlayıcısı, parola verildiğinde dosya okuma/yazma katmanına şifreleme servisini bağlayabilir. AES-256/E2EE ve senkronizasyonun tüm operasyonel ayrıntıları için repository durumunu kontrol etmek gerekir; bu sayfa tamamlanmış bir güvenlik sertifikasyonu iddiasında bulunmaz.

## Kurulum

```bash
flutter pub get
flutter run -d windows
# veya
flutter run -d android
```

Flutter SDK 3.41+ ve Dart 3.11+ gereksinimleri repository README’sinde belirtilmiştir. Proje özel bir çalışma olduğu için bu sayfada herkese açık APK/EXE paketi yayınlanmamaktadır.

## Kod Yapısı

`lib/core` çalışma alanı, depolama, arama, tema ve senkronizasyon servislerini; `lib/features` ise editör, diyagram, grafik, keşif ve platform kabuklarını içerir. Uygulama, ekran genişliğine göre masaüstü üç panelli veya mobil alt navigasyon düzenine geçer.

## Durum

Erken aşama. Temel local-first editör, dosya yönetimi, arama, diyagram ve grafik parçaları mevcut; Google Drive/GitHub senkronizasyonu ve güvenlik katmanları geliştirme durumundadır.
