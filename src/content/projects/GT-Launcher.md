---
image: "/projects/GT-Launcher.png"
title: "GT-Launcher"
category: "Diğer"
area: "lab"
status: "Active"
github: "https://github.com/alazndy/GT-Launcher"
download: "https://github.com/alazndy/GT-Launcher/releases/latest"
downloads:
  - title: "Tüm sürümler"
    href: "https://github.com/alazndy/GT-Launcher/releases"
    description: "Önceki paketler ve sürüm notlarıyla birlikte tüm GT-Launcher release geçmişi."
    format: "APK"
version: "v4.10.0"
summary: "Star Trek esintili bir estetikte, tamamen modüler kart sistemine sahip bir Android ana ekranı: kapasite tabanlı kart üretici, OmniSearch komuta güvertesi, Slide List uygulama çekmecesi ve OBD-II destekli Drive Mode ile."
techStack: ["Kotlin", "Jetpack Compose", "Room", "OBD-II BLE", "ML Kit OCR", "Gson", "Material3"]
gallery:
  - src: "/projects/GT-Launcher/home.jpg"
    alt: "GT-Launcher ana ekranı, retro-fütüristik modüler kartlarla"
    caption: "Ana ekran — finans, medya, iletişim ve galeri kartları tek bakışta."
  - src: "/projects/GT-Launcher/card-builder-5-tabs.gif"
    alt: "5 Sekmeli Card Builder sihirbazı"
    caption: "Card Builder — Function, Behavior, Appearance, Layout ve Visual sekmeleriyle modüler kart üretimi."
  - src: "/projects/GT-Launcher/visual-style-switch.gif"
    alt: "Görsel stiller arasında canlı geçiş: Flat, Glass, Neo, Clay, Minimal, Neon"
    caption: "6 Görsel Stil — Flat, Glass, Neobrutalism, Claymorphism, Minimal ve Neon."
  - src: "/projects/GT-Launcher/wallpaper-background-photo.gif"
    alt: "Ana ekran arka plan duvar kağıdı seçimi ve kırpma"
    caption: "Duvar Kağıdı — Ana ekran ve ön plan için canlı kırpma ile galeri fotoğrafı yerleşimi."
  - src: "/projects/GT-Launcher/card-background-photo.gif"
    alt: "Kart içine fotoğraf yerleştirme ve canlı galeri önizlemesi"
    caption: "Fotoğraf & Galeri — Kart foreground yüzeyine özel fotoğraf yükleme ve albüm yönetimi."
  - src: "/projects/GT-Launcher/theme-creator-presets.gif"
    alt: "12 LCARS Renk Paleti ve Temalar"
    caption: "LCARS Tema Motoru — 12 klasik Starfleet paleti ve canlı renk çarkı."
  - src: "/projects/GT-Launcher/drive-mode-hud.gif"
    alt: "Drive Mode 'Interceptor' telemetri, OBD-II ve harita HUD kokpiti"
    caption: "Drive Mode — 'Interceptor' telemetri, OBD-II ve harita HUD kokpiti."
---

## 🚀 Sistem Özeti

Android cihazınızı 24. Yüzyıl teknolojisine yükseltin: Star Trek "The Next Generation" estetiğine sadık, "Secure by Design" felsefesiyle geliştirilmiş, tamamen modüler bir ana ekran deneyimi.

<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-12">
  <div class="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all group hover:scale-[1.02]">
    <div class="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 mb-6 group-hover:scale-110 transition-transform">
      <span class="text-3xl">🧩</span>
    </div>
    <h3 class="text-xl font-black text-white uppercase tracking-tight mb-3">Kapasite Tabanlı Kartlar</h3>
    <p class="text-sm text-white/40 leading-relaxed">Her kart, tek bir sabit tipe değil; birleştirilebilir "capability"lere (uygulama başlatma, bildirim, galeri, finans, not, hava durumu...) dayanır. Uyumsuz kombinasyonlar editör içinde engellenir.</p>
  </div>

  <div class="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all group hover:scale-[1.02]">
    <div class="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 mb-6 group-hover:scale-110 transition-transform">
      <span class="text-3xl">🔎</span>
    </div>
    <h3 class="text-xl font-black text-white uppercase tracking-tight mb-3">OmniSearch</h3>
    <p class="text-sm text-white/40 leading-relaxed">Tam ekran komuta güvertesi: web araması, Play Store, kurulu uygulamalar ve uygulama içi kısayollar tek arama kutusundan, tekilleştirilmiş GT Launcher kartları olarak gelir.</p>
  </div>

  <div class="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all group hover:scale-[1.02]">
    <div class="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 mb-6 group-hover:scale-110 transition-transform">
      <span class="text-3xl">🎨</span>
    </div>
    <h3 class="text-xl font-black text-white uppercase tracking-tight mb-3">6 Görsel Stil</h3>
    <p class="text-sm text-white/40 leading-relaxed">Flat, Glass, Neo, Clay, Minimal ve Neon — her biri kendi tasarım sözleşmesine sahip, Theme Creator'da uçtan uca özelleştirilebilir ve profil yedeğiyle birlikte taşınır.</p>
  </div>

  <div class="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all group hover:scale-[1.02]">
    <div class="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20 mb-6 group-hover:scale-110 transition-transform">
      <span class="text-3xl">🏎️</span>
    </div>
    <h3 class="text-xl font-black text-white uppercase tracking-tight mb-3">Drive Mode</h3>
    <p class="text-sm text-white/40 leading-relaxed">OBD-II BLE telemetrisi, GPS hız göstergesi ve OCR destekli yakıt takibiyle sürüş deneyimini bir yıldız gemisi kokpitine dönüştüren yatay mod.</p>
  </div>
</div>

---

## 🧩 Capability Builder — Modüler Kart Mimarisi

GT-Launcher'ın kalbi: kartlar artık tek bir sabit "tip" yerine, birbiriyle birleştirilebilir bağımsız yeteneklerden (**capability**) inşa edilir.

### 🛠️ 5 Sekmeli Card Builder Mimarisi (Kart Ekleme Akışı)
Yeni bir kart oluştururken ya da var olan bir kartı düzenlerken 5 aşamalı taktiksel sihirbaz kullanılır:

1. **`FUNCTION` (İşlev & Modüller):**
   - **Başlangıç Şablonları (Presets):** Kartı hızlıca tohumlamak için 9 hazır şablon (`LAUNCHER`, `SYSTEM_STATS`, `WIDGET`, `COMMS`, `GALLERY`, `CAMERA`, `MEDIA`, `APP_DRAWER`, `NOTIFICATION`, `FINANCE`).
   - **Modül Ekleme & Kaldırma:** Karta dilediğiniz yetenekleri ekleme, sırasını değiştirme ve silme.
   - **Aktif Renk & Bildirim Tetikleyicisi:** Karta bildirim veya uyarı düştüğünde rengin dinamik olarak değişmesi (`activeColorHex`) ve neon puls animasyonu.
2. **`BEHAVIOR` (Davranış & Jestler):**
   - **6 Yönlü Jest Eşleme:** Tek dokunma (`Tap`), Çift dokunma (`Double Tap`), Yukarı (`Swipe Up`), Aşağı (`Swipe Down`), Sola (`Swipe Left`) ve Sağa (`Swipe Right`) eylemleri.
   - **Kamera Başlatma Modları:** Fotoğraf, Video, Selfie, Portre, Panorama veya Gece modlarını doğrudan karta bağlama.
3. **`APPEARANCE` (Görünüm & Kimlik):**
   - **Kimlik:** Özel kart başlığı, alt başlık ve LCARS durum metni.
   - **Görsel Özelleştirme:** Kart vurgu rengi, arka plan dolgu opaklığı ve iç neon parlama (`Inner Glow`) yoğunluğu.
4. **`LAYOUT` (Boyut & Izgara):**
   - **Izgara Konumlandırma:** Sütun genişliği ($W$), satır yüksekliği ($H$), serbest modda piksel ofsetleri ($X, Y$) ve hücre span değerleri.
5. **`VISUAL` (Görsel Katman):**
   - **Özel Arka Plan / Ön Plan Görseli:** Kart içine cihaz galerisinden kırpılmış bağımsız fotoğraf yerleştirme.
   - **Stil Geçersiz Kılma:** Genel temadan bağımsız olarak sadece o karta özel görsel stil (`Flat`, `Glass`, `Neon` vb.) atama.

<div class="my-10 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
  <img src="/projects/GT-Launcher/card-builder-5-tabs.gif" alt="5 Sekmeli Card Builder sihirbazı walkthrough" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
  <img src="/projects/GT-Launcher/capability-stacking.gif" alt="Birden fazla yeteneği tek karta stackleme" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
</div>

---

### 📦 19 Modülün Eksiksiz Kataloğu

| Grup | Modül | Tip Kodu | Açıklama & Parametreler |
|---|---|---|---|
| **PRIMARY** | **Uygulama Başlatıcı** | `APP_LAUNCH` | Belirlenen uygulamayı anında açar. İkincil uygulama çift dokunmaya atanabilir (`doubleTapPackage`), özel simge paketleri (Icon Pack) ile simge değiştirilebilir. |
| **PRIMARY** | **Android Platform Widget** | `WIDGET` | Android'in yerel `AppWidgetHost` motorunu karta gömer. Spotify, Google Takvim vb. üçüncü parti widget'ları sorunsuz barındırır. |
| **PRIMARY** | **Fotoğraf Galerisi & Ön Plan** | `GALLERY` | Seçilen fotoğrafları karusel formatında canlı kaydırır veya kart foreground yüzeyinde özel fotoğraf sunar. |
| **PRIMARY** | **Medya Oynatıcı** | `MEDIA_CONTROL` | Sistem `MediaSession` servisine bağlanır; albüm kapağı, parça adı, sanatçı bilgisi, oynat/duraklat ve parça atlama kontrolleri sağlar. |
| **PRIMARY** | **Slide List Çekmece** | `APP_DRAWER` | Niagara tarzı akıcı alfabetik uygulama çekmecesini doğrudan ana ekran kartı yüzeyinde çalıştırır. |
| **PRIMARY** | **Saat & Kronometre** | `CLOCK` | 24s/12s saat biçimi, saniye sayacı ve LCARS Stardate (uzay takvimi) gösterir; dokunulduğunda sistem alarmına geçer. |
| **PRIMARY** | **Hava Durumu** | `WEATHER` | Cihaz konumundan anlık sıcaklık, hava koşulları ve taktiksel atmosfer telemetrisi sunar. |
| **PRIMARY** | **Finans & Canlı Portföy** | `FINANCE` | Kripto (BTC, ETH, SOL...), Hisse ve FX kurlarını canlı fiyat akışıyla izler. Kâr/Zarar durumuna göre dinamik renk değişimi (Yeşil/Kırmızı PnL) uygular. |
| **COMMUNICATION** | **Bildirim Monitörü** | `NOTIFICATIONS` | Belirlenen uygulamaların bildirimlerini kart içine yansıtır; rozet sayacı ve mesaj önizlemesi sunar. |
| **COMMUNICATION** | **İletişim Hub'ı** | `COMMS` | WhatsApp, Telegram ve Telefon gibi kritik haberleşme uygulamalarının bildirimlerini tek yüzeyde toplar. |
| **ACTION** | **Kamera Hızlı Çekim** | `CAMERA` | Tek dokunuş veya jestlerle Fotoğraf, Video, Selfie, Portre, Panorama veya Gece modunu doğrudan başlatır. |
| **ACTION** | **Taktiksel Fener** | `FLASHLIGHT` | Cihazın kamera LED flaşını tek dokunuşla taktiksel fenere dönüştürür. |
| **UTILITY** | **Sistem Telemetrisi** | `SYSTEM_STATS` | Canlı RAM kullanımı, dahili depolama doluluğu, pil yüzdesi ve hızlı sistem eylem butonları (Wi-Fi, Bluetooth, Ayarlar) sunar. |
| **UTILITY** | **Takvim & Ajanda** | `CALENDAR` | Cihaz takvimindeki yaklaşan etkinlikleri gün ve saat bazında listeler. |
| **UTILITY** | **Geri Sayım Sayacı** | `TIMER` | Kart üzerinde anlık çalışan geri sayım sayacı ve kronometre. |
| **UTILITY** | **Taktiksel Not** | `NOTE` | Kart üzerinde saklanan, bağımsız font boyutu ayarlanabilir hızlı not defteri. |
| **UTILITY** | **Adımsayar** | `STEP_COUNTER` | Donanımsal adım sensöründen gelen verilerle günlük adım sayısını ve hedef ilerleme çubuğunu gösterir. |
| **UTILITY** | **Taktiksel Boşluk** | `SPACER` | Grid üzerinde estetik ve hizalama amaçlı boşluk bırakan yer tutucu modül. |
| **UTILITY** | **3D DECK Rotator** | `DECK` | Kartı çok yüzeyli bir yığına dönüştürür; diğer modüller arasında 3D çevirme jesti sağlar. |

<div class="my-10 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
  <img src="/projects/GT-Launcher/widget-capability-picker.gif" alt="Android platform widget seçici akışı" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
  <img src="/projects/GT-Launcher/camera-mode-picker.gif" alt="Kamera başlatma modu seçimi" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
</div>

---

## 🖼️ Fotoğraf ve Duvar Kağıdı Entegrasyonu

GT-Launcher hem ana ekran seviyesinde tam ekran duvar kağıdı yönetimini hem de kart seviyesinde özel fotoğraf yükleme desteğini bünyesinde barındırır:

- **Ana Ekran Duvar Kağıdı (`Engineering → HOME → BACKGROUND`):** Sistem dosya seçicisinden istenen fotoğrafı seçme, dokunmatik pinch-to-crop ve serbest konumlandırma ile ızgara arkasına sabitleme.
- **Kart Foreground / Galeri Fotoğrafı:** Card Builder veya Card Settings üzerinden cihaza ait fotoğrafları doğrudan kart yüzeyinde sergileme.
- **Kalıcı Depolama Güvencesi:** Seçilen görseller uygulamanın özel sandbox depolama alanına kopyalanır; Android sağlayıcı URI izinleri kapansa dahi fotoğraflar hiçbir zaman kaybolmaz.

<div class="my-10 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
  <img src="/projects/GT-Launcher/wallpaper-background-photo.gif" alt="Ana ekran arka plan duvar kağıdı seçimi ve kaydetme" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
  <img src="/projects/GT-Launcher/card-background-photo.gif" alt="Kart içine galeri fotoğrafı ekleme akışı" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
</div>

---

## 🎨 Theme Engine — 6 Görsel Stil & LCARS Renk Çarkı

Her görsel stil kendi bağımsız render sözleşmesini takip eder:

| Stil | Karakteristik | Ayarlanabilir Parametreler |
|---|---|---|
| **Flat** | Kontrollü düz ve ton-kaydırmalı yüzeyler | Köşe yuvarlama, Arka plan opaklığı, Kenarlık opaklığı |
| **Glass** | Buzlu cam (frosted glass) ve şeffaf katmanlar | Köşe yuvarlama, Cam opaklığı, Kenarlık parlaklığı |
| **Neo** | Neobrutalism sert ofset gölgeler | Köşe yuvarlama, Gölge mesafesi, Gölge yönü (TL/TR/BL/BR), Gölge rengi |
| **Clay** | Yumuşak pastel derinlik ve kabartma | Köşe yuvarlama, Arka plan opaklığı, Yükseklik derinliği |
| **Minimal** | Düşük vurgulu, metin odaklı yüzey | Kenarlık kalınlığı |
| **Neon** | Ayarlanabilir parlaklıkta dış/iç ışıklandırma | Köşe yuvarlama, Glow yarıçapı, Glow rengi |

<div class="my-10 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
  <img src="/projects/GT-Launcher/visual-style-switch.gif" alt="Görsel stiller arasında canlı geçiş" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
  <img src="/projects/GT-Launcher/theme-creator-presets.gif" alt="12 LCARS renk paleti seçimi" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
</div>

### Dinamik & Adaptif Tema Otomasyonu
12 statik Starfleet paletinin yanında 3 bağımsız canlı otomasyon stratejisi çalışabilir:
- **Saatlik Otomatik Tema:** Günün saatine göre ton geçişi sağlar.
- **Pil Seviyesi Teması:** %80 üzeri yeşil, azaldıkça sarı ve turuncuya, %15 altında kırmızıya kayar.
- **Hava Durumu Teması:** Yağmurda mavi, güneşte altın, bulutta çelik grisine uyarlanır.

<div class="my-10 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
  <img src="/projects/GT-Launcher/dynamic-theme-toggle.gif" alt="Saatlik ve pil bazlı dinamik tema geçişi" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
  <img src="/projects/GT-Launcher/card-color-override.gif" alt="Kart bazlı bağımsız renk ve armoni tekeri" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
</div>

---

## 🎛️ Izgara Motoru & Başlık (Header Widgets)

- **Akıllı Izgara Yerleşimi (`GridEngine`):** Kart sürüklenirken en yakın hücreleri skorlayan ve çakışan kartları animasyonla aşağı kaydıran (**cascade push**) akıllı önizleme.
- **Header Widget Sistemi:** Saat (XS-XL), Tarih, Hava Durumu, Pil ve Stardate widget'ları sol/sağ sütun bazında bağımsız ölçeklenir ve sıralanır.
- **İstasyon Şablonları (Layout Presets):** Tüm kart yerleşimlerini isim vererek kaydetme ve tek dokunuşla farklı konfigürasyonlara geçiş yapma.

<div class="my-10 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
  <img src="/projects/GT-Launcher/grid-drag-resize.gif" alt="Izgara üzerinde serbest kart taşıma ve cascade itme" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
  <img src="/projects/GT-Launcher/header-widget-editor.gif" alt="Header widget yönetimi ve boyutlandırma" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
</div>

<div class="my-10 flex justify-center">
  <img src="/projects/GT-Launcher/layout-presets.gif" alt="Düzen şablonlarını kaydetme ve profil yedekleme" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
</div>

---

## 🛠️ Yan Menü (Sidebar Rail) ve Gezinme

Ana ekranın sol veya sağ kenarında konumlanan taktiksel kısayol rayı:
- **Üçlü Eylem Yapısı:** Her buton için Dokunma (`Tap`), Yukarı Kaydırma (`Swipe Up`) ve Aşağı Kaydırma (`Swipe Down`) bağımsız işlevlere bağlanabilir.
- **Erişilebilirlik Servisi:** Yan menü üzerinden donanımsal sistem Geri (`Back`) ve Son Uygulamalar (`Recents`) eylemlerini tetikleme.
- **Özelleştirilebilir Görünüm:** Buton genişlikleri, köşe ovallikleri ve LCARS ikon kütüphanesi.

<div class="my-10 flex justify-center">
  <img src="/projects/GT-Launcher/sidebar-interaction.gif" alt="Yan menü rayı, buton ayarları ve mühendislik paneli" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
</div>

---

## 📱 Slide List Çekmece & 🔎 OmniSearch

<div class="my-10 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
  <img src="/projects/GT-Launcher/browse-departments.gif" alt="Slide List uygulama çekmecesi departman sınıflandırması" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
  <img src="/projects/GT-Launcher/search-mixed-results.gif" alt="Omni-Terminal karma arama ve sonuç kartları" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
</div>

- **Departman Yönetimi:** Uygulamaları Starfleet departmanlarına (`COMMAND`, `ENGINEERING`, `SCIENCE`, `OPERATIONS` vb.) otomatik sınıflandırma.
- **Omni-Terminal Hibrit Arama:** Tek giriş alanından kurulu uygulamalar, rehber kişileri, sistem ayarları ve web aramalarına tek dokunuşta erişim.

---

## 🏎️ Drive Mode "Interceptor" & Telemetri

Yalnızca yatay çalışan ve sürüş güvenliği için optimize edilen kokpit HUD'ı:
- **OBD-II BLE Bağlantısı:** vLinker iCar Pro ve ELM327 BLE adaptörleriyle anlık RPM, GPS hızı, soğutma sıvısı sıcaklığı, turbo boost ve yakıt tüketimi takibi.
- **DTC Arıza Kodu Okuyucu:** Check Engine arıza kodlarını doğrudan ekranda listeleme.
- **Kırmızı Alarm & Anomali Uyarısı:** Hararet 110°C'yi geçtiğinde veya arıza kodu algılandığında tam ekran kırmızı puls uyarısı.
- **Trafik & Radar İkazı:** Bağlı navigasyon bildirimlerinden kaza veya radar uyarılarını HUD üstüne yansıtma.
- **Yakıt Fişi OCR:** Kamera ile yakıt fişini tarayarak litre maliyetini otomatik hesaplama.

<div class="my-10 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
  <img src="/projects/GT-Launcher/drive-mode-hud.gif" alt="Drive Mode Interceptor telemetri HUD" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
  <img src="/projects/GT-Launcher/vehicle-obd-settings.gif" alt="Araç OBD ve sürüş tetikleyici ayarları" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
</div>

---

## 🛠️ Engineering Panel & İzin Kataloğu

Tüm launcher ayarlarını tek çatı altında toplayan reorderable 9 güverte:
- **Güverteler:** `APPEARANCE`, `HOME`, `SIDEBAR`, `APPS`, `VEHICLE`, `SYSTEM`, `ABOUT`, `ADAPTIVE`, `PREMIUM`.
- **Canlı İzin Kataloğu (ABOUT):** Tüm Android izinlerinin anlık durumunu, neden istendiğini gösteren ve tek tıkla sistem ayarlarına yönlendiren şeffaf güvenlik merkezi.

<div class="my-10 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
  <img src="/projects/GT-Launcher/engineering-sections-deep-dive.gif" alt="Engineering alt güverteleri (Apps, About, Adaptive)" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
  <img src="/projects/GT-Launcher/runtime-grant-flow.gif" alt="Çalışma zamanı izin kataloğu ve yetkilendirme akışı" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
</div>

---

## 📥 Kurulum ve İlk Ayar Rehberi

> [!TIP]
> En iyi deneyim için Android 10+ bir cihaz önerilir. Drive Mode için vLinker iCar Pro (veya uyumlu bir ELM327 BLE adaptörü) tavsiye edilir.

1. **İndir:** Sayfa başındaki **GitHub Releases** bağlantısından en güncel APK'yı indirin.
2. **Yükle:** Bilinmeyen kaynaklardan yükleme izni vererek APK'yı kurun.
3. **İlk Kurulum:** Bridge Configuration akışında izinleri tanımlayın; Quick Setup'tan hazır bir preset seçin ya da Guided Setup ile ilk kartınızı kendiniz oluşturun.
4. **Ana Ekran Uygulaması Yap:** Android'in "Varsayılan uygulamalar → Ana Ekran" ayarından GT-Launcher'ı seçin.
5. **İzinler:** Medya kontrolü için *Bildirim Erişimi*, navigasyon için isteğe bağlı *Erişilebilirlik* izinlerini Engineering Panel → Sistem'den tanımlayın.
6. **Kişiselleştir:** Engineering Panel → Görünüm'den Theme Creator'ı açıp stilinizi seçin; Sistem → Yedekleme'den profilinizi dışa/içe aktararak cihazlar arasında taşıyın.
7. **Başla:** "Space, the final frontier..." 🖖

---

*Bu proje Alaz Lab altyapısı ile teknik denetimden geçmiştir.*
