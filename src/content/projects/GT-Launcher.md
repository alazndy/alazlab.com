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

### 🛠️ 5 Sekmeli Card Builder Mimarisi
Yeni bir kart oluştururken ya da var olan bir kartı düzenlerken 5 aşamalı taktiksel sihirbaz kullanılır:
- **`FUNCTION` (İşlev):** 9 başlangıç şablonu (`LAUNCHER`, `WIDGET`, `GALLERY`, `CAMERA`, `MEDIA`, `APP_DRAWER`, `NOTIFICATION`, `FINANCE`, `SYSTEM_STATS`), modül ekleme/sıralama ve bildirim puls rengi.
- **`BEHAVIOR` (Davranış):** 6 yönlü jest eşleme (`Tap`, `Double Tap`, `Swipe Up/Down/Left/Right`), kamera çekim modu ve albüm seçimi.
- **`APPEARANCE` (Görünüm):** Kart başlığı, alt başlık, LCARS durum kodu, renk vurgusu ve neon iç parlama (`Inner Glow`).
- **`LAYOUT` (Boyut & Izgara):** Sütun genişliği ($W$), satır yüksekliği ($H$) ve span hücre değerleri.
- **`VISUAL` (Görsel Katman):** Özel arka plan/ön plan fotoğrafı ve bağımsız kart görsel stili (`Flat`, `Glass`, `Neon` vb.).

<div class="my-10 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
  <div class="rounded-2xl bg-white/[0.02] border border-white/8 p-4 sm:p-5 flex flex-col items-center justify-between text-center group hover:bg-white/[0.04] transition-all">
    <div class="w-full flex justify-center mb-4">
      <img src="/projects/GT-Launcher/card-builder-5-tabs.gif" alt="5 Sekmeli Card Builder Walkthrough" class="rounded-xl border border-white/10 shadow-2xl max-w-[240px] w-full" />
    </div>
    <div>
      <span class="inline-block px-2.5 py-0.5 rounded-md bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[11px] font-mono uppercase tracking-wider mb-2">5 Sekmeli Card Builder</span>
      <h4 class="text-sm font-bold text-white mb-1">Taktiksel Kart Oluşturma Sihirbazı</h4>
      <p class="text-xs text-white/50 leading-relaxed">FUNCTION, BEHAVIOR, APPEARANCE, LAYOUT ve VISUAL sekmeleriyle kart işlevlerini, jestlerini ve boyutunu anlık önizlemeyle tasarlama akışı.</p>
    </div>
  </div>

  <div class="rounded-2xl bg-white/[0.02] border border-white/8 p-4 sm:p-5 flex flex-col items-center justify-between text-center group hover:bg-white/[0.04] transition-all">
    <div class="w-full flex justify-center mb-4">
      <img src="/projects/GT-Launcher/capability-stacking.gif" alt="Modül Yığınlama ve Hibrit Yetenekler" class="rounded-xl border border-white/10 shadow-2xl max-w-[240px] w-full" />
    </div>
    <div>
      <span class="inline-block px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[11px] font-mono uppercase tracking-wider mb-2">Modül Stackleme</span>
      <h4 class="text-sm font-bold text-white mb-1">Çoklu Yetenek Birleştirme</h4>
      <p class="text-xs text-white/50 leading-relaxed">Saat, canlı bildirim rozeti ve fener gibi birden fazla yeteneğin tek bir kart yüzeyinde çakışma korumasıyla (conflictsWith) birleştirilmesi.</p>
    </div>
  </div>
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

<div class="my-10 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
  <div class="rounded-2xl bg-white/[0.02] border border-white/8 p-4 sm:p-5 flex flex-col items-center justify-between text-center group hover:bg-white/[0.04] transition-all">
    <div class="w-full flex justify-center mb-4">
      <img src="/projects/GT-Launcher/widget-capability-picker.gif" alt="Android Platform Widget Seçici" class="rounded-xl border border-white/10 shadow-2xl max-w-[240px] w-full" />
    </div>
    <div>
      <span class="inline-block px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[11px] font-mono uppercase tracking-wider mb-2">Platform Widget</span>
      <h4 class="text-sm font-bold text-white mb-1">Android Sistem Widget Seçicisi</h4>
      <p class="text-xs text-white/50 leading-relaxed">SELECT WIDGET butonuyla Android'in yerel widget diyaloğunu açıp herhangi bir 3. parti widget'ı kart içine entegre etme süreci.</p>
    </div>
  </div>

  <div class="rounded-2xl bg-white/[0.02] border border-white/8 p-4 sm:p-5 flex flex-col items-center justify-between text-center group hover:bg-white/[0.04] transition-all">
    <div class="w-full flex justify-center mb-4">
      <img src="/projects/GT-Launcher/camera-mode-picker.gif" alt="Kamera Çekim Modu Seçimi" class="rounded-xl border border-white/10 shadow-2xl max-w-[240px] w-full" />
    </div>
    <div>
      <span class="inline-block px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-mono uppercase tracking-wider mb-2">Kamera Modları</span>
      <h4 class="text-sm font-bold text-white mb-1">Doğrudan Çekim Modu Atama</h4>
      <p class="text-xs text-white/50 leading-relaxed">Kamera kartına Photo, Video, Selfie, Portre, Panorama, Slo-Mo, Gece veya Pro modunu bağlayarak tek dokunuşta başlatma.</p>
    </div>
  </div>
</div>

---

## 🖼️ Fotoğraf ve Duvar Kağıdı Entegrasyonu

GT-Launcher hem ana ekran seviyesinde tam ekran duvar kağıdı yönetimini hem de kart seviyesinde bağımsız fotoğraf sergilemeyi destekler:
- **Kalıcı Depolama Güvencesi:** Seçilen tüm görseller uygulamanın korumalı sandbox alanına kopyalanır; Android sağlayıcı izinleri değişse dahi fotoğraflarınız silinmez.
- **GPU UV Kırpması:** Tek bir yüksek çözünürlüklü görsel Canvas seviyesinde işlenerek 60/120 FPS akıcılıkta kalır.

<div class="my-10 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
  <div class="rounded-2xl bg-white/[0.02] border border-white/8 p-4 sm:p-5 flex flex-col items-center justify-between text-center group hover:bg-white/[0.04] transition-all">
    <div class="w-full flex justify-center mb-4">
      <img src="/projects/GT-Launcher/wallpaper-background-photo.gif" alt="Duvar Kağıdı Seçimi ve Kırpma" class="rounded-xl border border-white/10 shadow-2xl max-w-[240px] w-full" />
    </div>
    <div>
      <span class="inline-block px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] font-mono uppercase tracking-wider mb-2">Ana Ekran Duvar Kağıdı</span>
      <h4 class="text-sm font-bold text-white mb-1">Mühendislik Arka Plan Kırpıcısı</h4>
      <p class="text-xs text-white/50 leading-relaxed">Engineering → HOME → BACKGROUND üzerinden galeri fotoğrafı seçimi, canlı pinch-to-crop kırpma ve ızgara arkasına sabitleme.</p>
    </div>
  </div>

  <div class="rounded-2xl bg-white/[0.02] border border-white/8 p-4 sm:p-5 flex flex-col items-center justify-between text-center group hover:bg-white/[0.04] transition-all">
    <div class="w-full flex justify-center mb-4">
      <img src="/projects/GT-Launcher/card-background-photo.gif" alt="Kart Foreground Fotoğraf Seçimi" class="rounded-xl border border-white/10 shadow-2xl max-w-[240px] w-full" />
    </div>
    <div>
      <span class="inline-block px-2.5 py-0.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[11px] font-mono uppercase tracking-wider mb-2">Kart Fotoğrafı & Galeri</span>
      <h4 class="text-sm font-bold text-white mb-1">Kart Yüzeyine Fotoğraf Ekleme</h4>
      <p class="text-xs text-white/50 leading-relaxed">Card Builder → BEHAVIOR sekmesinde cihaz hafızasından fotoğraf seçip kart foreground yüzeyinde canlı albüm kartı oluşturma.</p>
    </div>
  </div>
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

<div class="my-10 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
  <div class="rounded-2xl bg-white/[0.02] border border-white/8 p-4 sm:p-5 flex flex-col items-center justify-between text-center group hover:bg-white/[0.04] transition-all">
    <div class="w-full flex justify-center mb-4">
      <img src="/projects/GT-Launcher/visual-style-switch.gif" alt="Görsel Stiller Arasında Canlı Geçiş" class="rounded-xl border border-white/10 shadow-2xl max-w-[240px] w-full" />
    </div>
    <div>
      <span class="inline-block px-2.5 py-0.5 rounded-md bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-[11px] font-mono uppercase tracking-wider mb-2">Görsel Stiller</span>
      <h4 class="text-sm font-bold text-white mb-1">6 Stil Arasında Anında Geçiş</h4>
      <p class="text-xs text-white/50 leading-relaxed">Flat, Glass, Neobrutalism, Claymorphism, Minimal ve Neon sözleşmeleri arasında tek dokunuşla canlı stil değişimi.</p>
    </div>
  </div>

  <div class="rounded-2xl bg-white/[0.02] border border-white/8 p-4 sm:p-5 flex flex-col items-center justify-between text-center group hover:bg-white/[0.04] transition-all">
    <div class="w-full flex justify-center mb-4">
      <img src="/projects/GT-Launcher/theme-creator-presets.gif" alt="12 LCARS Renk Paleti" class="rounded-xl border border-white/10 shadow-2xl max-w-[240px] w-full" />
    </div>
    <div>
      <span class="inline-block px-2.5 py-0.5 rounded-md bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[11px] font-mono uppercase tracking-wider mb-2">Tema Çarkı & Paletler</span>
      <h4 class="text-sm font-bold text-white mb-1">12 Starfleet Renk Paleti</h4>
      <p class="text-xs text-white/50 leading-relaxed">Classic Orange, TOS Gold, Medical Blue, Tactical Red ve Borg Cyan gibi kanonik Starfleet renkleri ve akıllı önayarlar.</p>
    </div>
  </div>
</div>

### Dinamik & Adaptif Tema Otomasyonu
12 statik Starfleet paletinin yanında 3 bağımsız canlı otomasyon stratejisi çalışabilir:
- **Saatlik Otomatik Tema:** Günün saatine göre ton geçişi sağlar.
- **Pil Seviyesi Teması:** %80 üzeri yeşil, azaldıkça sarı ve turuncuya, %15 altında kırmızıya kayar.
- **Hava Durumu Teması:** Yağmurda mavi, güneşte altın, bulutta çelik grisine uyarlanır.

<div class="my-10 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
  <div class="rounded-2xl bg-white/[0.02] border border-white/8 p-4 sm:p-5 flex flex-col items-center justify-between text-center group hover:bg-white/[0.04] transition-all">
    <div class="w-full flex justify-center mb-4">
      <img src="/projects/GT-Launcher/dynamic-theme-toggle.gif" alt="Dinamik Tema Otomasyonu" class="rounded-xl border border-white/10 shadow-2xl max-w-[240px] w-full" />
    </div>
    <div>
      <span class="inline-block px-2.5 py-0.5 rounded-md bg-green-500/10 text-green-400 border border-green-500/20 text-[11px] font-mono uppercase tracking-wider mb-2">Dinamik Temalar</span>
      <h4 class="text-sm font-bold text-white mb-1">Saatlik & Pil Bazlı Otomasyon</h4>
      <p class="text-xs text-white/50 leading-relaxed">Manuel seçim gerektirmeden günün saatine, şarj yüzdesine veya hava şartlarına göre otomatik palet adaptasyonu.</p>
    </div>
  </div>

  <div class="rounded-2xl bg-white/[0.02] border border-white/8 p-4 sm:p-5 flex flex-col items-center justify-between text-center group hover:bg-white/[0.04] transition-all">
    <div class="w-full flex justify-center mb-4">
      <img src="/projects/GT-Launcher/card-color-override.gif" alt="Kart Başına Renk Değişimi" class="rounded-xl border border-white/10 shadow-2xl max-w-[240px] w-full" />
    </div>
    <div>
      <span class="inline-block px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[11px] font-mono uppercase tracking-wider mb-2">Özel Kart Rengi</span>
      <h4 class="text-sm font-bold text-white mb-1">Kart Bazında Bağımsız Renk Atama</h4>
      <p class="text-xs text-white/50 leading-relaxed">Genel temayı bozmadan tek bir karta HSV çarkı ve renk armoni motoru (Triadic, Complementary) ile bağımsız ton tanımlama.</p>
    </div>
  </div>
</div>

---

## 🎛️ Izgara Motoru & Başlık (Header Widgets)

- **Akıllı Izgara Yerleşimi (`GridEngine`):** Kart sürüklenirken en yakın hücreleri skorlayan ve çakışan kartları animasyonla aşağı kaydıran (**cascade push**) akıllı önizleme.
- **Üçlü Dokunuşla Düzenleme:** Boş bir hücreye üç kez tıklayarak düzenleme moduna girme ve kart boyutlarını altın kollarla ayarlama.
- **Header Widget Sistemi:** Saat (XS-XL), Tarih, Hava Durumu, Pil ve Stardate widget'ları sol/sağ sütun bazında bağımsız ölçeklenir.
- **İstasyon Şablonları (Layout Presets):** Farklı kart dizilimlerini isim vererek kaydetme ve JSON yedeği olarak dışa aktarma.

<div class="my-10 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
  <div class="rounded-2xl bg-white/[0.02] border border-white/8 p-4 sm:p-5 flex flex-col items-center justify-between text-center group hover:bg-white/[0.04] transition-all">
    <div class="w-full flex justify-center mb-4">
      <img src="/projects/GT-Launcher/enter-edit-mode.gif" alt="Üçlü Dokunuşla Düzenleme Modu" class="rounded-xl border border-white/10 shadow-2xl max-w-[240px] w-full" />
    </div>
    <div>
      <span class="inline-block px-2.5 py-0.5 rounded-md bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[11px] font-mono uppercase tracking-wider mb-2">Düzenleme Modu</span>
      <h4 class="text-sm font-bold text-white mb-1">Üçlü Dokunuş Tetikleyicisi</h4>
      <p class="text-xs text-white/50 leading-relaxed">Ana ekrandaki boş bir hücreye 3 kez dokunarak taktiksel düzenleme moduna girme ve altın tutamaçları aktifleştirme.</p>
    </div>
  </div>

  <div class="rounded-2xl bg-white/[0.02] border border-white/8 p-4 sm:p-5 flex flex-col items-center justify-between text-center group hover:bg-white/[0.04] transition-all">
    <div class="w-full flex justify-center mb-4">
      <img src="/projects/GT-Launcher/grid-drag-resize.gif" alt="Izgara Sürükleme ve Cascade İtme" class="rounded-xl border border-white/10 shadow-2xl max-w-[240px] w-full" />
    </div>
    <div>
      <span class="inline-block px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[11px] font-mono uppercase tracking-wider mb-2">Izgara Snap & Cascade</span>
      <h4 class="text-sm font-bold text-white mb-1">Akıllı Kart Sürükleme ve İtme</h4>
      <p class="text-xs text-white/50 leading-relaxed">Kart taşınırken çakışan öğeleri otomatik aşağı kaydıran (cascade) ve snap noktasına kilitlenen akıllı ızgara motoru.</p>
    </div>
  </div>
</div>

<div class="my-10 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
  <div class="rounded-2xl bg-white/[0.02] border border-white/8 p-4 sm:p-5 flex flex-col items-center justify-between text-center group hover:bg-white/[0.04] transition-all">
    <div class="w-full flex justify-center mb-4">
      <img src="/projects/GT-Launcher/header-widget-editor.gif" alt="Header Widget Editörü" class="rounded-xl border border-white/10 shadow-2xl max-w-[240px] w-full" />
    </div>
    <div>
      <span class="inline-block px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[11px] font-mono uppercase tracking-wider mb-2">Header Widget Sistemi</span>
      <h4 class="text-sm font-bold text-white mb-1">Başlık Widget Yönetimi & Boyutlandırma</h4>
      <p class="text-xs text-white/50 leading-relaxed">Saat, tarih, hava durumu ve stardate widget'larını XS–XL boyutlarında ölçekleyip sol ve sağ sütunlara dizme.</p>
    </div>
  </div>

  <div class="rounded-2xl bg-white/[0.02] border border-white/8 p-4 sm:p-5 flex flex-col items-center justify-between text-center group hover:bg-white/[0.04] transition-all">
    <div class="w-full flex justify-center mb-4">
      <img src="/projects/GT-Launcher/layout-presets.gif" alt="İstasyon Düzen Şablonları" class="rounded-xl border border-white/10 shadow-2xl max-w-[240px] w-full" />
    </div>
    <div>
      <span class="inline-block px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] font-mono uppercase tracking-wider mb-2">Düzen Şablonları</span>
      <h4 class="text-sm font-bold text-white mb-1">İstasyon Profilleri & Yedekleme</h4>
      <p class="text-xs text-white/50 leading-relaxed">Farklı kullanım senaryoları için (günlük, sürüş, minimal) kart yerleşimlerini kaydedip tek dokunuşla geri yükleme.</p>
    </div>
  </div>
</div>

---

## 🛠️ Yan Menü (Sidebar Rail) ve Gezinme

Ana ekranın kenarında konumlanan taktiksel hızlı erişim çubuğu:
- **3 Bağımsız Jest:** Her buton için Dokunma (`Tap`), Yukarı Kaydırma (`Swipe Up`) ve Aşağı Kaydırma (`Swipe Down`) farklı uygulamalara atanabilir.
- **Erişilebilirlik Servisi:** Yan menü üzerinden donanımsal sistem Geri (`Back`) ve Son Uygulamalar (`Recents`) tetiklenebilir.

<div class="my-10 flex justify-center">
  <div class="rounded-2xl bg-white/[0.02] border border-white/8 p-4 sm:p-5 flex flex-col items-center text-center max-w-md w-full group hover:bg-white/[0.04] transition-all">
    <div class="w-full flex justify-center mb-4">
      <img src="/projects/GT-Launcher/sidebar-interaction.gif" alt="Yan Menü Rayı ve Jestler" class="rounded-xl border border-white/10 shadow-2xl max-w-[240px] w-full" />
    </div>
    <div>
      <span class="inline-block px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[11px] font-mono uppercase tracking-wider mb-2">Yan Menü Rayı</span>
      <h4 class="text-sm font-bold text-white mb-1">Çoklu Jestli Hızlı Erişim Çubuğu</h4>
      <p class="text-xs text-white/50 leading-relaxed">Ana ekran, ayarlar, çekmece ve sistem fonksiyonlarına sağa/sola kaydırma ile anında erişim sağlayan LCARS kontrol rayı.</p>
    </div>
  </div>
</div>

---

## 📱 Slide List Çekmece & 🔎 OmniSearch

<div class="my-10 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
  <div class="rounded-2xl bg-white/[0.02] border border-white/8 p-4 sm:p-5 flex flex-col items-center justify-between text-center group hover:bg-white/[0.04] transition-all">
    <div class="w-full flex justify-center mb-4">
      <img src="/projects/GT-Launcher/browse-departments.gif" alt="Slide List Departman Filtreleri" class="rounded-xl border border-white/10 shadow-2xl max-w-[240px] w-full" />
    </div>
    <div>
      <span class="inline-block px-2.5 py-0.5 rounded-md bg-teal-500/10 text-teal-400 border border-teal-500/20 text-[11px] font-mono uppercase tracking-wider mb-2">Slide List Çekmece</span>
      <h4 class="text-sm font-bold text-white mb-1">Departman Bazlı Uygulama Filtreleme</h4>
      <p class="text-xs text-white/50 leading-relaxed">Uygulamaları COMMAND, ENGINEERING, SCIENCE gibi Starfleet departmanlarına sınıflandıran akıcı Niagara tarzı liste.</p>
    </div>
  </div>

  <div class="rounded-2xl bg-white/[0.02] border border-white/8 p-4 sm:p-5 flex flex-col items-center justify-between text-center group hover:bg-white/[0.04] transition-all">
    <div class="w-full flex justify-center mb-4">
      <img src="/projects/GT-Launcher/search-mixed-results.gif" alt="Omni-Terminal Karma Arama" class="rounded-xl border border-white/10 shadow-2xl max-w-[240px] w-full" />
    </div>
    <div>
      <span class="inline-block px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[11px] font-mono uppercase tracking-wider mb-2">Omni-Terminal</span>
      <h4 class="text-sm font-bold text-white mb-1">Hibrit Komuta Arama Motoru</h4>
      <p class="text-xs text-white/50 leading-relaxed">Tek arama kutusundan web sorguları, cihazdaki uygulamalar, kişiler ve sistem ayarlarını canlı kartlar olarak sunar.</p>
    </div>
  </div>
</div>

---

## 🏎️ Drive Mode "Interceptor" & Telemetri

Yalnızca yatay çalışan ve sürüş güvenliği için optimize edilen kokpit HUD'ı:
- **OBD-II BLE Bağlantısı:** vLinker ve ELM327 BLE adaptörleriyle anlık RPM, GPS hızı, soğutma sıvısı sıcaklığı, turbo boost ve yakıt tüketimi takibi.
- **Kırmızı Alarm & Anomali Uyarısı:** Hararet 110°C'yi geçtiğinde veya arıza kodu algılandığında tam ekran kırmızı puls uyarısı.
- **Yakıt Fişi OCR:** Kamera ile yakıt fişini tarayarak litre maliyetini otomatik hesaplama.

<div class="my-10 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
  <div class="rounded-2xl bg-white/[0.02] border border-white/8 p-4 sm:p-5 flex flex-col items-center justify-between text-center group hover:bg-white/[0.04] transition-all">
    <div class="w-full flex justify-center mb-4">
      <img src="/projects/GT-Launcher/drive-mode-hud.gif" alt="Drive Mode HUD Kokpiti" class="rounded-xl border border-white/10 shadow-2xl max-w-[240px] w-full" />
    </div>
    <div>
      <span class="inline-block px-2.5 py-0.5 rounded-md bg-red-500/10 text-red-400 border border-red-500/20 text-[11px] font-mono uppercase tracking-wider mb-2">Drive Mode Kokpit</span>
      <h4 class="text-sm font-bold text-white mb-1">Interceptor Telemetri HUD</h4>
      <p class="text-xs text-white/50 leading-relaxed">Yatay modda çalışan taktiksel GPS hız göstergesi, ses spektrumu görselleştirici ve harita navigasyon paneli.</p>
    </div>
  </div>

  <div class="rounded-2xl bg-white/[0.02] border border-white/8 p-4 sm:p-5 flex flex-col items-center justify-between text-center group hover:bg-white/[0.04] transition-all">
    <div class="w-full flex justify-center mb-4">
      <img src="/projects/GT-Launcher/vehicle-obd-settings.gif" alt="Araç OBD ve Sürüş Ayarları" class="rounded-xl border border-white/10 shadow-2xl max-w-[240px] w-full" />
    </div>
    <div>
      <span class="inline-block px-2.5 py-0.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[11px] font-mono uppercase tracking-wider mb-2">Araç & OBD Ayarları</span>
      <h4 class="text-sm font-bold text-white mb-1">BLE Adaptör Eşleme & Tetikleyiciler</h4>
      <p class="text-xs text-white/50 leading-relaxed">OBD-II cihaz seçimi, telefon yatay tutulduğunda otomatik Drive Mode'a geçiş ve hararet eşiği konfigürasyonu.</p>
    </div>
  </div>
</div>

---

## 🛠️ Engineering Panel & Güvenlik Merkezi

Tüm launcher ayarlarını tek çatı altında toplayan 9 güverte:
- **Güverteler:** `APPEARANCE`, `HOME`, `SIDEBAR`, `APPS`, `VEHICLE`, `SYSTEM`, `ABOUT`, `ADAPTIVE`, `PREMIUM`.
- **Canlı İzin Kataloğu (ABOUT):** Tüm Android izinlerinin anlık durumunu ve kullanım amacını gösteren şeffaf güvenlik merkezi.

<div class="my-10 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
  <div class="rounded-2xl bg-white/[0.02] border border-white/8 p-4 sm:p-5 flex flex-col items-center justify-between text-center group hover:bg-white/[0.04] transition-all">
    <div class="w-full flex justify-center mb-4">
      <img src="/projects/GT-Launcher/panel-navigation.gif" alt="Engineering Panel Ana Güverte Gezinmesi" class="rounded-xl border border-white/10 shadow-2xl max-w-[240px] w-full" />
    </div>
    <div>
      <span class="inline-block px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] font-mono uppercase tracking-wider mb-2">Mühendislik Paneli</span>
      <h4 class="text-sm font-bold text-white mb-1">Ana Güverte Gezinmesi</h4>
      <p class="text-xs text-white/50 leading-relaxed">9 ana güverte arasında akıcı kaydırma ve panel sırasını sürükleyerek yeniden düzenleme olanağı.</p>
    </div>
  </div>

  <div class="rounded-2xl bg-white/[0.02] border border-white/8 p-4 sm:p-5 flex flex-col items-center justify-between text-center group hover:bg-white/[0.04] transition-all">
    <div class="w-full flex justify-center mb-4">
      <img src="/projects/GT-Launcher/engineering-sections-deep-dive.gif" alt="Mühendislik Alt Güverteleri" class="rounded-xl border border-white/10 shadow-2xl max-w-[240px] w-full" />
    </div>
    <div>
      <span class="inline-block px-2.5 py-0.5 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[11px] font-mono uppercase tracking-wider mb-2">Alt Güverteler</span>
      <h4 class="text-sm font-bold text-white mb-1">Uygulama, Adaptif ve Sistem Detayları</h4>
      <p class="text-xs text-white/50 leading-relaxed">Apps (çekmece ayarları), Adaptive (zaman bazlı kart profilleri) ve System (RAM/depolama telemetrisi) derinlemesine kontrolleri.</p>
    </div>
  </div>
</div>

<div class="my-10 flex justify-center">
  <div class="rounded-2xl bg-white/[0.02] border border-white/8 p-4 sm:p-5 flex flex-col items-center text-center max-w-md w-full group hover:bg-white/[0.04] transition-all">
    <div class="w-full flex justify-center mb-4">
      <img src="/projects/GT-Launcher/runtime-grant-flow.gif" alt="Çalışma Zamanı İzin Kataloğu" class="rounded-xl border border-white/10 shadow-2xl max-w-[240px] w-full" />
    </div>
    <div>
      <span class="inline-block px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-mono uppercase tracking-wider mb-2">İzin Kataloğu</span>
      <h4 class="text-sm font-bold text-white mb-1">Şeffaf İzin Yetkilendirme Akışı</h4>
      <p class="text-xs text-white/50 leading-relaxed">Bildirim, konum, depolama ve Bluetooth izinlerinin durumunu listeleyen ve doğrudan sistem ayarlarına yönlendiren güvenlik merkezi.</p>
    </div>
  </div>
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
