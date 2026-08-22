---
image: "/projects/GT-Launcher.png"
title: "GT-Launcher"
category: "Diğer"
area: "lab"
status: "Active"
github: "https://github.com/alazndy/GT-Launcher"
download: "https://github.com/alazndy/GT-Launcher/releases/latest"
downloads:
  - title: "En Güncel Sürüm (v4.10.0 APK)"
    href: "https://github.com/alazndy/GT-Launcher/releases/latest"
    description: "5 sekmeli Card Builder, 19 modül, 6 görsel stil ve OBD-II telemetrisi içeren güncel kararlı sürüm."
    format: "APK"
    version: "v4.10.0"
  - title: "Tüm Sürüm Geçmişi"
    href: "https://github.com/alazndy/GT-Launcher/releases"
    description: "Önceki paketler ve sürüm notlarıyla birlikte tüm GT-Launcher yayınları."
    format: "Releases"
manuals:
  - title: "Kişiselleştirme ve Kart Kılavuzu"
    href: "https://github.com/alazndy/GT-Launcher/blob/master/docs/wiki/Customization.md"
    description: "UCCS modül mimarisi, jest eşleme, renk çarkı ve stil geçersiz kılma rehberi."
    format: "Wiki"
  - title: "Mühendislik Paneli El Kitabı"
    href: "https://github.com/alazndy/GT-Launcher/blob/master/docs/wiki/Engineering-Guide.md"
    description: "9 güverte ayarları, ızgara motoru, header widget'ları ve profil yedekleme."
    format: "Wiki"
  - title: "Sürüş Modu & OBD-II Kurulumu"
    href: "https://github.com/alazndy/GT-Launcher/blob/master/docs/wiki/Drive-Mode.md"
    description: "BLE adaptör eşleme, HUD konfigürasyonu ve hata kodu teşhis kılavuzu."
    format: "Wiki"
  - title: "Sistem ve İzin Güvenlik Kataloğu"
    href: "https://github.com/alazndy/GT-Launcher/blob/master/docs/wiki/Permissions.md"
    description: "Çalışma zamanı izinleri, gizlilik politikası ve depolama mimarisi."
    format: "Wiki"
gallery:
  - src: "/projects/GT-Launcher/home.jpg"
    alt: "GT-Launcher retro-fütüristik ana ekranı"
    caption: "Ana Ekran — Modüler LCARS kartları, finans, medya ve telemetri widget'ları."
  - src: "/projects/GT-Launcher/card-builder-5-tabs.gif"
    alt: "5 Sekmeli Card Builder canlı üretici akışı"
    caption: "Card Builder — İşlev, davranış, görünüm, boyut ve görsel katman sihirbazı."
  - src: "/projects/GT-Launcher/visual-style-switch.gif"
    alt: "6 Görsel stil arasında geçiş"
    caption: "Görsel Stiller — Flat, Glass, Neobrutalism, Claymorphism, Minimal ve Neon."
  - src: "/projects/GT-Launcher/wallpaper-background-photo.gif"
    alt: "Ana ekran duvar kağıdı seçimi ve canlı kırpma"
    caption: "Duvar Kağıdı — Canlı pinch-to-crop ve GPU tabanlı UV dilimleme."
  - src: "/projects/GT-Launcher/drive-mode-hud.gif"
    alt: "Drive Mode Interceptor kokpit HUD"
    caption: "Drive Mode — OBD-II telemetri, GPS hız göstergesi ve harita HUD kokpiti."
  - src: "/projects/GT-Launcher/search-mixed-results.gif"
    alt: "Omni-Terminal karma arama motoru"
    caption: "OmniSearch — Web, Play Store, uygulamalar ve sistem ayarları tek komuta kutusunda."
version: "v4.10.0"
summary: "Star Trek esintili bir estetikte, tamamen modüler kart sistemine sahip bir Android ana ekranı: kapasite tabanlı kart üretici, OmniSearch komuta güvertesi, Slide List uygulama çekmecesi ve OBD-II destekli Drive Mode ile."
techStack: ["Kotlin", "Jetpack Compose", "Room", "OBD-II BLE", "ML Kit OCR", "Gson", "Material3"]
---

##  Sistem Özeti

Android cihazınızı 24. Yüzyıl teknolojisine yükseltin: Star Trek "The Next Generation" estetiğine sadık, "Secure by Design" felsefesiyle geliştirilmiş, tamamen modüler bir ana ekran deneyimi.

<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10 not-prose">
  <div class="p-6 rounded-2xl bg-white/[0.025] border border-white/8 hover:bg-white/[0.04] transition-colors">
    <div class="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 mb-4 text-orange-400 font-mono text-lg font-bold">01</div>
    <h3 class="text-base font-bold text-white uppercase tracking-wide mb-2">Kapasite Tabanlı Kartlar</h3>
    <p class="text-xs text-white/50 leading-relaxed">Her kart tek bir sabit tipe değil; birleştirilebilir bağımsız yeteneklere (UCCS) dayanır. Uyumsuz modül kombinasyonları editör içinde çakışma korumasıyla engellenir.</p>
  </div>

  <div class="p-6 rounded-2xl bg-white/[0.025] border border-white/8 hover:bg-white/[0.04] transition-colors">
    <div class="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 mb-4 text-cyan-400 font-mono text-lg font-bold">02</div>
    <h3 class="text-base font-bold text-white uppercase tracking-wide mb-2">OmniSearch Komutası</h3>
    <p class="text-xs text-white/50 leading-relaxed">Web araması, Google Play, kurulu uygulamalar, rehber kişileri ve sistem ayarları tek komuta arama alanından canlı LCARS kartları olarak listelenir.</p>
  </div>

  <div class="p-6 rounded-2xl bg-white/[0.025] border border-white/8 hover:bg-white/[0.04] transition-colors">
    <div class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 mb-4 text-amber-400 font-mono text-lg font-bold">03</div>
    <h3 class="text-base font-bold text-white uppercase tracking-wide mb-2">6 Görsel Stil & Temalar</h3>
    <p class="text-xs text-white/50 leading-relaxed">Flat, Glass, Neo, Clay, Minimal ve Neon sözleşmeleri; 12 Starfleet paleti, HSV renk çarkı ve saat/pil/hava durumuna göre canlı tema otomasyonu.</p>
  </div>

  <div class="p-6 rounded-2xl bg-white/[0.025] border border-white/8 hover:bg-white/[0.04] transition-colors">
    <div class="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20 mb-4 text-red-400 font-mono text-lg font-bold">04</div>
    <h3 class="text-base font-bold text-white uppercase tracking-wide mb-2">Drive Mode Interceptor</h3>
    <p class="text-xs text-white/50 leading-relaxed">OBD-II BLE canlı telemetrisi, GPS hız göstergesi, ses spektrumu ve OCR yakıt fişi taramasıyla sürüşü yıldız gemisi kokpitine çeviren yatay mod.</p>
  </div>
</div>

---

##  1. UCCS — Unified Card Capability Mimarisi

GT-Launcher'da kartlar sabit birer şablon değildir. **Unified Card Capability System (UCCS)** sayesinde her kart bir veya daha fazla yeteneği barındıran akıllı birer yüzeydir.

###  5 Sekmeli Taktiksel Card Builder
Yeni bir kart oluştururken 5 adımlı sihirbaz kullanılır:
- **`FUNCTION`:** 9 hazır şablon, 19 modül kataloğundan yetenek seçimi ve bildirim puls rengi.
- **`BEHAVIOR`:** Tek/çift dokunma ve 4 yönlü kaydırma (`Swipe`) jest eşlemeleri, kamera modu, albüm seçimi.
- **`APPEARANCE`:** Kart başlığı, alt başlık, durum kodu, renk vurgusu ve neon iç parlama (`Inner Glow`).
- **`LAYOUT`:** Izgara sütun genişliği, satır yüksekliği ve hücre yerleşimi.
- **`VISUAL`:** Özel arka plan fotoğrafı ve karta özel bağımsız görsel stil geçersiz kılma.

<figure class="my-8 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-center not-prose">
  <div class="flex justify-center mb-3">
    <img src="/projects/GT-Launcher/card-builder-5-tabs.gif" alt="5 Sekmeli Card Builder" class="rounded-xl border border-white/10 shadow-2xl max-w-[240px] w-full" />
  </div>
  <figcaption class="text-xs text-white/50 max-w-lg mx-auto leading-relaxed">
    <strong class="text-white/80 block font-semibold mb-1">Card Builder İş Akışı</strong>
    İşlev, jest davranışı, LCARS tipografisi, ızgara span değerleri ve görsel stil katmanının canlı önizleme eşliğinde yapılandırılması.
  </figcaption>
</figure>

###  19 Modüllük Zengin Yetenek Havuzu
- **Primary:** `APP_LAUNCH` (Uygulama Başlatıcı), `WIDGET` (Android Yerel Widget Host), `GALLERY` (Fotoğraf Karuseli & Ön Plan), `MEDIA_CONTROL` (MediaSession Kontrolü), `APP_DRAWER` (Slide List Çekmece), `CLOCK` (Dijital Saat & Stardate), `WEATHER` (Atmosfer Telemetrisi), `FINANCE` (Canlı Kripto/Hisse & PnL).
- **Communication:** `NOTIFICATIONS` (Bildirim Yansıtıcı & Rozet), `COMMS` (Haberleşme Hub'ı).
- **Action:** `CAMERA` (8 Hızlı Çekim Modu), `FLASHLIGHT` (Taktiksel Fener).
- **Utility:** `SYSTEM_STATS` (RAM, Depolama, Pil), `CALENDAR` (Ajanda & Etkinlikler), `TIMER` (Geri Sayım), `NOTE` (Taktiksel Notluk), `STEP_COUNTER` (Donanımsal Adımsayar), `SPACER` (Yer Tutucu Boşluk), `DECK` (3D Yığın Çevirici).

<div class="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
  <figure class="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-center">
    <div class="flex justify-center mb-3">
      <img src="/projects/GT-Launcher/capability-stacking.gif" alt="Modül Yığınlama" class="rounded-xl border border-white/10 shadow-2xl max-w-[200px] w-full" />
    </div>
    <figcaption class="text-xs text-white/50 leading-relaxed">
      <strong class="text-white/80 block font-semibold mb-0.5">Modül Stackleme</strong>
      Saat + Bildirim Rozeti + Fener gibi birden fazla yeteneğin tek kartta çakışma korumasıyla birleştirilmesi.
    </figcaption>
  </figure>

  <figure class="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-center">
    <div class="flex justify-center mb-3">
      <img src="/projects/GT-Launcher/widget-capability-picker.gif" alt="Platform Widget Seçici" class="rounded-xl border border-white/10 shadow-2xl max-w-[200px] w-full" />
    </div>
    <figcaption class="text-xs text-white/50 leading-relaxed">
      <strong class="text-white/80 block font-semibold mb-0.5">Platform Widget Entegrasyonu</strong>
      Android'in yerel AppWidgetHost motoruyla üçüncü parti widget'ları kart içine yerleştirme.
    </figcaption>
  </figure>
</div>

---

##  2. 6 Görsel Stil & LCARS Tema Motoru

GT-Launcher, her biri bağımsız Compose render sözleşmesine sahip 6 görsel stil sunar:

| Stil | Karakteristik | Parametreler |
|---|---|---|
| **FLAT** | Kontrollü düz ve ton-kaydırmalı yüzeyler | Köşe yuvarlama, Arka plan opaklığı, Kenarlık opaklığı |
| **GLASS** | Buzlu cam (frosted glass) ve şeffaf katmanlar | Köşe yuvarlama, Cam opaklığı, Kenarlık parlaklığı |
| **NEO** | Neobrutalism sert ofset gölgeler | Köşe yuvarlama, Gölge mesafesi, Yön (TL/TR/BL/BR), Gölge rengi |
| **CLAY** | Yumuşak pastel derinlik ve kabartma | Köşe yuvarlama, Arka plan opaklığı, Yükseklik derinliği |
| **MINIMAL** | Düşük vurgulu, metin odaklı yüzey | Kenarlık kalınlığı |
| **NEON** | Ayarlanabilir parlaklıkta dış/iç ışıklandırma | Köşe yuvarlama, Glow yarıçapı, Glow rengi |

<div class="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
  <figure class="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-center">
    <div class="flex justify-center mb-3">
      <img src="/projects/GT-Launcher/visual-style-switch.gif" alt="Görsel Stiller" class="rounded-xl border border-white/10 shadow-2xl max-w-[200px] w-full" />
    </div>
    <figcaption class="text-xs text-white/50 leading-relaxed">
      <strong class="text-white/80 block font-semibold mb-0.5">6 Görsel Stil</strong>
      Flat, Glass, Neo, Clay, Minimal ve Neon stilleri arasında tek dokunuşla canlı geçiş.
    </figcaption>
  </figure>

  <figure class="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-center">
    <div class="flex justify-center mb-3">
      <img src="/projects/GT-Launcher/theme-creator-presets.gif" alt="Tema Paletleri" class="rounded-xl border border-white/10 shadow-2xl max-w-[200px] w-full" />
    </div>
    <figcaption class="text-xs text-white/50 leading-relaxed">
      <strong class="text-white/80 block font-semibold mb-0.5">12 LCARS Renk Paleti</strong>
      Classic Orange, TOS Gold, Medical Blue, Tactical Red ve Borg Cyan kanonik Starfleet renkleri.
    </figcaption>
  </figure>
</div>

### Dinamik Tema Otomasyonu & Kart Renk Vurguları
- **Saatlik Otomasyon:** Günün saatine göre otomatik ton geçişi.
- **Pil Seviyesi Teması:** %80 üzeri yeşil, azaldıkça sarı ve turuncuya, %15 altında kırmızıya dinamik kayma.
- **Kart Başına Bağımsız Renk:** Genel temayı bozmadan tek bir karta HSV renk çarkı ile bağımsız vurgu tanımlama.

---

##  3. Dinamik Izgara, Duvar Kağıdı ve Header

- **Akıllı Izgara Motoru (`GridEngine`):** Kart taşınırken komşu hücreleri skorlar; çakışan kartları animasyonla aşağı kaydırır (**cascade push**) ve snap noktasına kilitler.
- **Pinch-to-Crop Duvar Kağıdı:** Fotoğraf galerisinden seçilen görseli canlı kırpma ile ızgara arkasına sabitleme.
- **Kalıcı Depolama:** Seçilen kart ve duvar kağıdı görselleri uygulamanın güvenli sandbox depolamasına kopyalanır — sağlayıcı URI izinleri kapansa dahi görseller korunur.
- **Header Widget Sistemi:** Saat (XS–XL), Tarih, Hava Durumu, Pil ve Stardate widget'ları bağımsız ölçeklenir ve sıralanır.

<div class="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
  <figure class="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-center">
    <div class="flex justify-center mb-3">
      <img src="/projects/GT-Launcher/grid-drag-resize.gif" alt="Izgara Hareketi" class="rounded-xl border border-white/10 shadow-2xl max-w-[200px] w-full" />
    </div>
    <figcaption class="text-xs text-white/50 leading-relaxed">
      <strong class="text-white/80 block font-semibold mb-0.5">Izgara Snap & Cascade</strong>
      Kart sürükleme, cascade itme ve altın köşebent tutamaçlarıyla serbest boyutlandırma.
    </figcaption>
  </figure>

  <figure class="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-center">
    <div class="flex justify-center mb-3">
      <img src="/projects/GT-Launcher/wallpaper-background-photo.gif" alt="Duvar Kağıdı Kırpma" class="rounded-xl border border-white/10 shadow-2xl max-w-[200px] w-full" />
    </div>
    <figcaption class="text-xs text-white/50 leading-relaxed">
      <strong class="text-white/80 block font-semibold mb-0.5">Duvar Kağıdı Kırpma</strong>
      Mühendislik paneli üzerinden galeri fotoğrafı seçimi, canlı pinch-to-crop ve sabitleme.
    </figcaption>
  </figure>
</div>

---

##  4. Komuta Güvertesi: OmniSearch & Slide List

- **Omni-Terminal Hibrit Arama:** Web araması (Google, Maps, Play Store), kurulu uygulamalar, rehber kişileri ve sistem ayarları tek komuta arama alanından filtrelenir.
- **Slide List Çekmece:** Niagara tarzı akıcı alfabetik liste ile klasik LCARS departman filtrelemesini (`COMMAND`, `ENGINEERING`, `SCIENCE`, `OPERATIONS`) birleştirir.
- **Taktiksel Yan Menü (Sidebar Rail):** Tek dokunuş (`Tap`), yukarı kaydırma (`Swipe Up`) ve aşağı kaydırma (`Swipe Down`) jestleriyle sistem eylemlerine (Geri, Son Uygulamalar) ve favori araçlara erişim.

<div class="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
  <figure class="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-center">
    <div class="flex justify-center mb-3">
      <img src="/projects/GT-Launcher/search-mixed-results.gif" alt="OmniSearch Arama" class="rounded-xl border border-white/10 shadow-2xl max-w-[200px] w-full" />
    </div>
    <figcaption class="text-xs text-white/50 leading-relaxed">
      <strong class="text-white/80 block font-semibold mb-0.5">OmniSearch Komutası</strong>
      Tek arama alanından web, uygulama, rehber ve sistem ayarlarını canlı kartlar halinde getirme.
    </figcaption>
  </figure>

  <figure class="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-center">
    <div class="flex justify-center mb-3">
      <img src="/projects/GT-Launcher/browse-departments.gif" alt="Slide List Çekmece" class="rounded-xl border border-white/10 shadow-2xl max-w-[200px] w-full" />
    </div>
    <figcaption class="text-xs text-white/50 leading-relaxed">
      <strong class="text-white/80 block font-semibold mb-0.5">Slide List Çekmece</strong>
      Starfleet departman sekmeleri, son kullanılanlar ve akıcı alfabetik hızlı indeks.
    </figcaption>
  </figure>
</div>

---

##  5. Drive Mode "Interceptor" & Telemetri

Yalnızca yatay çalışan ve sürüş güvenliği için optimize edilen kokpit HUD'ı:
- **OBD-II BLE Entegrasyonu:** vLinker iCar Pro ve ELM327 BLE adaptörleriyle anlık RPM, GPS hızı, soğutma sıvısı sıcaklığı, turbo boost ve motor yükü telemetrisi.
- **DTC Arıza Teşhisi & Hararet Kırmızı Alarmı:** 110°C üzeri hararet veya motor arıza kodu algılandığında tam ekran kırmızı puls uyarısı.
- **Yakıt Fişi OCR:** Kamera ile yakıt fişini tarayarak litre maliyetini ve sürüş tüketimini otomatik hesaplama.

<div class="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
  <figure class="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-center">
    <div class="flex justify-center mb-3">
      <img src="/projects/GT-Launcher/drive-mode-hud.gif" alt="Drive Mode HUD" class="rounded-xl border border-white/10 shadow-2xl max-w-[200px] w-full" />
    </div>
    <figcaption class="text-xs text-white/50 leading-relaxed">
      <strong class="text-white/80 block font-semibold mb-0.5">Drive Mode Kokpit</strong>
      Yatay modda taktiksel GPS hız göstergesi, ses spektrumu görselleştirici ve harita HUD paneli.
    </figcaption>
  </figure>

  <figure class="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-center">
    <div class="flex justify-center mb-3">
      <img src="/projects/GT-Launcher/vehicle-obd-settings.gif" alt="OBD Ayarları" class="rounded-xl border border-white/10 shadow-2xl max-w-[200px] w-full" />
    </div>
    <figcaption class="text-xs text-white/50 leading-relaxed">
      <strong class="text-white/80 block font-semibold mb-0.5">Araç & OBD-II Ayarları</strong>
      BLE adaptör eşleme, otomatik yatay algılama ve hararet ikaz eşik ayarları.
    </figcaption>
  </figure>
</div>

---

##  6. Engineering Panel & Güvenlik Mimarisi

Tüm launcher ayarlarını tek çatı altında toplayan 9 güverte:
- **Güverteler:** `APPEARANCE`, `HOME`, `SIDEBAR`, `APPS`, `VEHICLE`, `SYSTEM`, `ABOUT`, `ADAPTIVE`, `PREMIUM`.
- **Canlı İzin Kataloğu (ABOUT):** Tüm Android izinlerinin durumunu listeleyen ve doğrudan sistem ayarlarına yönlendiren şeffaf güvenlik merkezi.
- **Profil Yedekleme (Full Backup):** DataStore ve UCCS kart yerleşimlerini tek bir JSON dosyası olarak dışa/içe aktarma.

<div class="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
  <figure class="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-center">
    <div class="flex justify-center mb-3">
      <img src="/projects/GT-Launcher/panel-navigation.gif" alt="Engineering Panel" class="rounded-xl border border-white/10 shadow-2xl max-w-[200px] w-full" />
    </div>
    <figcaption class="text-xs text-white/50 leading-relaxed">
      <strong class="text-white/80 block font-semibold mb-0.5">Mühendislik Paneli</strong>
      9 ana güverte arasında akıcı kaydırma ve panel sırasını sürükleyerek yeniden düzenleme.
    </figcaption>
  </figure>

  <figure class="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-center">
    <div class="flex justify-center mb-3">
      <img src="/projects/GT-Launcher/runtime-grant-flow.gif" alt="İzin Kataloğu" class="rounded-xl border border-white/10 shadow-2xl max-w-[200px] w-full" />
    </div>
    <figcaption class="text-xs text-white/50 leading-relaxed">
      <strong class="text-white/80 block font-semibold mb-0.5">Şeffaf İzin Kataloğu</strong>
      Bildirim, konum, depolama ve Bluetooth izinlerinin şeffaf yetkilendirme akışı.
    </figcaption>
  </figure>
</div>

---

##  Kurulum ve İlk Ayar Rehberi

> [!TIP]
> En iyi deneyim için Android 10+ bir cihaz önerilir. Drive Mode için vLinker iCar Pro (veya uyumlu bir ELM327 BLE adaptörü) tavsiye edilir.

1. **İndir:** Sayfa başındaki veya aşağıdaki **İndirmeler** bölümünden en güncel APK'yı indirin.
2. **Yükle:** Bilinmeyen kaynaklardan yükleme izni vererek APK kurulumunu tamamlayın.
3. **İlk Kurulum:** Bridge Configuration akışında izinleri tanımlayın; hazır bir preset seçin ya da Guided Setup ile ilk kartınızı oluşturun.
4. **Ana Ekran Uygulaması Yap:** Android'in "Varsayılan uygulamalar → Ana Ekran" ayarından GT-Launcher'ı seçin.
5. **Kişiselleştir:** Engineering Panel → Görünüm'den görsel stilinizi ve renginizi belirleyin; Sistem → Yedekleme'den profilinizi güvene alın.
6. **Başla:** "Space, the final frontier..."

---

*Bu proje Alaz Lab altyapısı ile teknik denetimden geçmiştir.*
