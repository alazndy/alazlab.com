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
techStack: ["Kotlin", "Jetpack Compose", "Room", "OBD-II BLE", "ML Kit OCR", "Gson"]
gallery:
  - src: "/projects/GT-Launcher/home.jpg"
    alt: "GT-Launcher ana ekranı, retro-fütüristik modüler kartlarla"
    caption: "Ana ekran — finans, medya, iletişim ve galeri kartları tek bakışta."
  - src: "/projects/GT-Launcher/app-drawer.jpg"
    alt: "Slide List stili uygulama çekmecesi, kategori filtreleri ve alfabetik indeks"
    caption: "Slide List uygulama çekmecesi — kategori sekmeleri, son kullanılanlar ve A-Z indeks."
  - src: "/projects/GT-Launcher/omnisearch.jpg"
    alt: "OmniSearch komuta güvertesi arama sonuçları ekranı"
    caption: "OmniSearch — tek arama kutusundan web, Play Store ve kurulu uygulamalara erişim."
  - src: "/projects/GT-Launcher/theme-creator.jpg"
    alt: "Engineering Panel içindeki Theme Creator ekranı"
    caption: "Theme Creator — Flat/Glass/Neo/Clay/Minimal/Neon stilleri ve saat/pil/hava durumuna göre otomatik tema geçişi."
  - src: "/projects/GT-Launcher/radial-menu.jpg"
    alt: "Bir karta uzun basışla açılan radial kısayol menüsü"
    caption: "Radial menü — herhangi bir karta uzun basışla açılan, kişiye özel kısayol çemberi."
  - src: "/projects/GT-Launcher/drive-mode.jpg"
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
   - **DECK Rotator Ayarları:** Kartta DECK capability'si varsa 3D geçiş tipi (`FLIP_H`, `FLIP_V`, `SLIDE`, `FADE`, `SCALE`) ve Snap kilidi.
   - **Radial Menü Entegrasyonu:** Uzun basışta açılan kısayol halkasının rengi, dilimleri ve eylemleri.
3. **`APPEARANCE` (Görünüm & Kimlik):**
   - **Kimlik:** Özel kart başlığı, alt başlık ve LCARS durum metni.
   - **Görsel Özelleştirme:** Kart vurgu rengi, arka plan dolgu opaklığı ve iç neon parlama (`Inner Glow`) yoğunluğu.
4. **`LAYOUT` (Boyut & Izgara):**
   - **Izgara Konumlandırma:** Sütun genişliği ($W$), satır yüksekliği ($H$), serbest modda piksel ofsetleri ($X, Y$) ve hücre span değerleri.
5. **`VISUAL` (Görsel Katman):**
   - **Özel Arka Plan Görseli:** Kart içine cihaz galerisinden kırpılmış bağımsız fotoğraf yerleştirme.
   - **Parallax Duvar Kağıdı Dilimleme:** Ana ekran duvar kağıdının karta denk gelen UV koordinatını GPU seviyesinde dilimleme.
   - **Stil Geçersiz Kılma:** Genel temadan bağımsız olarak sadece o karta özel görsel stil (`Flat`, `Glass`, `Neon` vb.) atama.

<div class="my-10 flex justify-center">
  <img src="/projects/GT-Launcher/card-builder-demo.gif" alt="Card Builder ve yetenek (capability) modülü seçimi" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
</div>

---

### 📦 18 Modülün Eksiksiz Kataloğu

| Grup | Modül | Tip Kodu | Açıklama & Parametreler |
|---|---|---|---|
| **PRIMARY** | **Uygulama Başlatıcı** | `APP_LAUNCH` | Belirlenen uygulamayı anında açar. İkincil uygulama çift dokunmaya atanabilir (`doubleTapPackage`), özel simge paketleri (Icon Pack) ile simge değiştirilebilir. |
| **PRIMARY** | **Android Platform Widget** | `WIDGET` | Android'in yerel `AppWidgetHost` motorunu karta gömer. Spotify, Google Takvim vb. üçüncü parti widget'ları sorunsuz barındırır. |
| **PRIMARY** | **Fotoğraf Galerisi** | `GALLERY` | Seçilen fotoğrafları karusel formatında canlı kaydırır. Kart içi albüm önizleyicisi sunar. |
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

---

### 🔀 Modül Stackleme (Module Stacking) ve Çakışma Yönetimi

GT-Launcher'da bir kart tek bir işleve mahkum değildir. Birden fazla yetenek tek bir kart gövdesinde birleştirilebilir (**Stacking**):

- **Hibrit Yetenek Kombinasyonları:**
  - `CLOCK` + `NOTIFICATIONS`: Büyük saat kartının üzerinde canlı bildirim rozetleri ve acil durum uyarıları belirir.
  - `NOTE` + `FLASHLIGHT`: Not kartının sağ üst köşesinde tek dokunuşluk taktik fener anahtarı yer alır.
  - `SYSTEM_STATS` + `APP_LAUNCH`: Sistem bellek kartına dokunulduğunda görev yöneticisi uygulaması tetiklenir.
- **Akıllı Çakışma Matrisi (`conflictsWith`):**
  Aynı render yüzeyini tam kaplayan büyük bileşenlerin (`WIDGET`, `GALLERY`, `CAMERA`, `APP_DRAWER`, `MEDIA_CONTROL`) birbiriyle çakışması `CardCapabilityRegistry` tarafından anında algılanır. Uyumsuz bir modül eklenmek istendiğinde buton kilitlenir ve kullanıcıya nedeni gösterilir (`"Conflicts with GALLERY"`).

---

### 🎲 DECK Rotator — 3D Kart Yığınlama & Yüzey Geçişleri

Bir karta `DECK` capability'si eklendiğinde kart çok yüzlü 3D bir desteye dönüşür:

- **Çoklu Yüzey Mimarisi (`Faces`):** Kartın içine `Face 1: CLOCK`, `Face 2: WEATHER`, `Face 3: FINANCE` gibi dilediğiniz sayıda bağımsız yüzey ekleyebilirsiniz.
- **5 Farklı 3D Geçiş Türü:**
  - `FLIP_H`: Yatay eksende akıcı 3D küp taklası.
  - `FLIP_V`: Dikey eksende 3D takla.
  - `SLIDE`: Kartların yan yana kayması.
  - `FADE`: Şeffaflık erimesiyle geçiş.
  - `SCALE`: Derinlik ölçekleme efekti.
- **Yüzey Yönetimi:** Yüzeyler `Move Up` / `Move Down` butonlarıyla anında yeniden sıralanabilir; `Snap` kilidi ile parmak hareketine göre en yakın yüze yumuşakça kilitlenir.

---

## 🖥️ Ana Ekran ve Kişiselleştirme

- **Dinamik kartlar:** Serbest boyutlandırma, yeniden sıralama ve renklendirme; kart başına özel arka plan fotoğrafı desteği.
- **Sıfır gecikmeli ikon yükleme:** Arka planda `ImageBitmap` ön-dönüşümüyle akıcı medya geçişleri.
- **Sistem teması senkronu:** Android Açık/Koyu ve Sistem varsayılanıyla derin entegrasyon.
- **Güvenilir görsel varlıklar:** Seçilen kart, ana ekran ve ön plan görselleri launcher'a ait depolamaya kopyalanır — sağlayıcı URI izinleri kalıcılığı bozamaz.

<div class="my-10 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
  <img src="/projects/GT-Launcher/sidebar-demo.gif" alt="Kaydırma hareketiyle açılan yan menü demosu" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
  <img src="/projects/GT-Launcher/card-edit-resize-demo.gif" alt="Düzenleme modunda altın köşebent kollarıyla canlı kart boyutlandırma" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
</div>

Ana ekranın herhangi bir yerinden sağa kaydırmak, hızlı erişim çubuğunu açar: Ana Ekran, Ayarlar, Dosyalar, Arama, Sürüş Modu ve Finans kısayolları — kartların kendi kaydırma eylemlerini engellemeden, arka planın kendi jest algılayıcısı üzerinden çalışır.

### Özelleştirilebilir Başlık (Header Widgets)
Header alanı bağımsız sol ve sağ sütun yığınlarından oluşur: Saat (XS-XL boyut seçenekleri), Stardate/Tarih, Hava Durumu, Pil ve özel metin widget'ları tek tek boyutlandırılıp sıraya dizilebilir.

<div class="my-10 flex justify-center">
  <img src="/projects/GT-Launcher/header-widgets-demo.gif" alt="Header widget yönetimi, dijital saat boyutlandırma ve sütun yerleşimi" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
</div>

### GPU Tabanlı Ön Plan ve Arka Plan Dilimleme (Parallax Grid Slice)
Tek bir yüksek çözünürlüklü duvar kağıdı ya da şeffaf ön plan PNG görseli seçildiğinde sistem her kart için ayrı bir bitmap kopyalamaz. Bunun yerine `Canvas.drawImage(srcOffset, srcSize, dstSize)` seviyesinde GPU UV koordinat kırpması yapılır; bellek tüketimi minimumda tutulurken kaydırma ve yeniden boyutlandırma 60/120 FPS akıcılıkta kalır.

---

## ⭕ Radial Menü — Kişiye Özel Kısayol Çemberi

<div class="my-10 flex justify-center">
  <img src="/projects/GT-Launcher/radial-menu.jpg" alt="Radial kısayol menüsü ile tek dokunuşta arama, arama, uygulama ve fonksiyon tetikleme" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
</div>

Herhangi bir karta uzun basıldığında parmağın etrafında retro-fütüristik bir LCARS halkası açılır:

- **Tek Jest Akışı:** Parmağı kaldırmadan ilgili dilime (wedge) kaydırıp bırakmak eylemi anında tetikler.
- **Dilim Eylem Çeşitliliği:** Uygulama başlatma (`APP`), derin kısayol (`SHORTCUT`), launcher işlevi (`FUNCTION` — Fener, Arama, Çekmece vb.), doğrudan kişi arama/mesajlaşma (`CONTACT_DIAL` / `CONTACT_SMS`), kayıtlı Google Haritalar rotası (`ROUTE`) veya özel URL.
- **Dokunsal Geri Bildirim:** Her dilim geçişinde hassas `HapticFeedback` snap titreşimi üretilir.
- **Jest Çakışma Koruması:** Radial menü oturumu aktifken kartın altındaki kaydırma ve flip jestleri kilitlenir; istemsiz sayfa veya kart kaymaları engellenir.

---

## 📱 Slide List Uygulama Çekmecesi

<div class="my-10 flex justify-center">
  <img src="/projects/GT-Launcher/app-drawer-demo.gif" alt="Slide List uygulama çekmecesinde kategori filtreleme demosu" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
</div>

Çekmece, Niagara tarzı akıcı bir liste ile klasik LCARS departman filtrelemesini birleştirir: **ALL / SOCIAL MEDIA / MEDIA / PRODUCTIVITY** sekmeleri arasında anında geçiş, sağda alfabetik hızlı indeks ve üstte gömülü OmniSearch kutusu. Departmanlar anahtar kelimelere ve kullanım sıklığına göre otomatik sınıflandırılır.

---

## 🔎 OmniSearch — Komuta Güvertesi

<div class="my-10 flex justify-center">
  <img src="/projects/GT-Launcher/omnisearch-demo.gif" alt="OmniSearch'te canlı yazarken sonuçların anında güncellenmesi" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
</div>

Tam ekran arama; sonuçlar duyarlı GT Launcher kartları olarak gruplanır:

- **WEB:** Google, Maps ve Play Store'da arama — tekilleştirilmiş, tek tuşluk eylemler.
- **Uygulama içi arama:** Android'in aranabilir kurulu uygulamaları (Kişiler, Mesajlar, Google Play services vb.) doğrudan sonuç listesinde.
- **Uygulama sağlayıcılı kısayollar:** Uygulamaların kendi arama kısayolları da listeye dahil olur.
- **Ayarlar sonuçları:** Android Ayarlar ve Launcher Ayarları sonuçları kendi simgeleriyle gelir ve tam olarak ilgili hedefe açılır.
- **Klavye entegrasyonu:** Sonuçları sürüklemek, hem Compose hem Android IME yollarında yumuşak klavyeyi otomatik kapatır.
- **Dil duyarlılığı:** Kategoriler, durum metinleri, eylemler ve takvim biçimlendirmesi seçili uygulama diline göre değişir.

---

## 🎨 Theme Engine — 6 Görsel Stil, Tek Sözleşme

Her görsel stil kendi tasarım sözleşmesini takip eder:

| Stil | Karakteristik |
|---|---|
| **Flat** | Kontrollü düz/ton-kaydırmalı yüzeyler |
| **Glass** | Buzlu cam efekti ve shimmer |
| **Neo** | Sert ofset gölgeler (neumorphism) |
| **Clay** | Yumuşak derinlik + highlight kombinasyonu |
| **Minimal** | Düşük vurgulu, ince kenarlıklar |
| **Neon** | Ayarlanabilir parlaklıkta glow-border |

<div class="my-10 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
  <img src="/projects/GT-Launcher/theme-style-demo.gif" alt="Theme Creator'da görsel stiller arasında canlı geçiş" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
  <img src="/projects/GT-Launcher/theme-creator-demo.gif" alt="Theme Creator HSV renk çarkı ve armoni modları canlı önizleme" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
</div>

Her stil tokeni Theme Creator'da tek tek düzenlenebilir ve **profil yedekleme/geri yükleme** ile birlikte taşınır. Tema otomasyonu tek bir stratejiyle sınırlıdır (manuel, saatlik, pil ya da hava durumu bazlı) — çakışan otomasyon anahtarları birbirini geçersiz kılmaz; son manuel palet hatırlanır ve son otomasyon değişikliği geri alınabilir.

---

## 🛠️ Engineering Panel — Canlı Ayar Laboratuvarı

<div class="my-10 flex justify-center">
  <img src="/projects/GT-Launcher/engineering-demo.gif" alt="Engineering Panel alt sekmeleri ve canlı ızgara/kart boyutlandırma ayarları" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
</div>

Launcher'ın tüm derin parametreleri tek bir çatı altında 8 taktiksel alt güverteye ayrılmıştır:

1. **APPEARANCE (Görünüm):** 6 görsel stil seçimi, Theme Creator renk tekeri, neon iç/dış glow yoğunluğu ve tema otomasyonu (Saat/Pil/Hava durumu).
2. **HOME (Ana Ekran):** Grid ve Free-Form modları, sütun sayısı (2-12), hücre yüksekliği (dp), kart aralıkları (gap), kenar boşlukları, başlık widget'ları ve duvar kağıdı / ön plan konumlandırıcı.
3. **SIDEBAR (Yan Menü):** Sol/Sağ yerleşim konumu, çubuk genişliği, sayfa ve buton sıralaması, otomatik gizlenme süresi ve sade mod (Clean Mode).
4. **APPS (Uygulamalar):** Slide List vs Klasik Çekmece modu, kategori sınıflandırıcı, gizli uygulamalar ve arama motoru kaynak öncelikleri.
5. **DRIVE (Sürüş Modu):** OBD-II BLE adaptör eşleme, telefon yatay çevrildiğinde otomatik sürüş modunu başlatma, HUD yazı boyutu ölçekleyici ve ekran açık tutma tercihi.
6. **ADAPTIVE (Adaptif Mod):** Zaman ve kullanım alışkanlıklarına göre kart düzenini otomatik uyarlayan akıllı profil motoru.
7. **SYSTEM (Sistem & Donanım):** Canlı RAM/Depolama/Pil telemetrisi, 10 dilde anında yerelleştirme seçimi, profil dışa/içe aktarma (JSON backup).
8. **ABOUT (Hakkında & İzinler):** Bildirim, erişilebilirlik ve Bluetooth izin denetimleri, rehberli eğitim turunu yeniden başlatma.

---

## 🪐 İlk Kurulum ve Etkileşimli Eğitim

- **Bridge Configuration:** Çalışma zamanı izinleri, isteğe bağlı Navigasyon Servisi açıklaması ve ilk kart seçimi — tüm adımlar atlanabilir, tek geçişte tamamlanır.
- **Quick Setup:** Hazır kart preseti listesinden seçip tek ekranda hepsini işaretleme.
- **Guided Setup:** Hiçbir şey önceden doldurulmamış gerçek Card Builder'ı açar; kullanıcı kapasite sistemini kendi kartını inşa ederek öğrenir, "bir tane daha ekle?" istemiyle döngüye girer.
- **Tek Rehberli Tur:** Canlı arayüz üzerinde çalışan tek bir ışıklandırılmış adım dizisi — ayrı bir statik kılavuza ihtiyaç yok. Engineering Panel → `?`'den her zaman erişilebilir; tüm 10 dilde tam çevirili.

<div class="my-10 flex justify-center">
  <img src="/projects/GT-Launcher/interactive-tour-demo.gif" alt="Tactical Academy canlı rehberli interaktif eğitim turu" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
</div>

---

## 🚗 Drive Mode — "Interceptor"

<div class="my-10 flex justify-center">
  <img src="/projects/GT-Launcher/drive-mode.jpg" alt="Drive Mode 'Interceptor' telemetri ve harita kokpit arayüzü" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 w-full" />
</div>

Sürüş deneyimini bir yıldız gemisi kokpitine dönüştürün.

- **Yalnızca yatay:** Sürüş için optimize edilmiş arayüz.
- **OBD-II BLE:** vLinker ve ELM327 adaptörleriyle tam entegrasyon — RPM, hız, soğutma suyu, turbo boost, motor yükü canlı göstergeleri; Mode 03 DTC hata kodu okuma.
- **GPS Telemetrisi:** Gerçek zamanlı hız göstergesi ve Google Maps tabanlı navigasyon HUD entegrasyonu.
- **FFT Ses Görselleştirici:** Müzikle gerçek zamanlı etkileşime giren neon ses spektrumu.
- **Trip Manager & Yakıt OCR:** Her sürüşü mesafe ve maliyet bazlı asenkron kaydeder; ML Kit ile yakıt fişlerini tarayarak birim fiyatı otomatik günceller.

---

## 🌍 Yerelleştirme

10 dilde tam çeviri — sadece üst menüler değil, her ekran, diyalog ve Card Builder'ın kendisi de dahil:

Türkçe · English · Deutsch · Español · Français · Português (Brasil) · Bahasa Indonesia · 简体中文 · 日本語 · Italiano

Dil, cihaz dilinden bağımsız olarak uygulama içinden (Engineering Panel → System) seçilir; değişiklik tüm arayüzü canlı olarak yeniden oluşturur — yeniden başlatma gerekmez.

---

## 📥 Kurulum ve İlk Ayar Rehberi

> [!TIP]
> En iyi deneyim için Android 10+ bir cihaz önerilir. Drive Mode için vLinker iCar Pro (veya uyumlu bir ELM327 BLE adaptörü) gerekir.

1. **İndir:** Sayfa başındaki **GitHub Releases** bağlantısından en güncel APK'yı indirin.
2. **Yükle:** Bilinmeyen kaynaklardan yükleme izni vererek APK'yı kurun.
3. **İlk Kurulum:** Bridge Configuration akışında izinleri tanımlayın; Quick Setup'tan hazır bir preset seçin ya da Guided Setup ile ilk kartınızı kendiniz oluşturun.
4. **Ana Ekran Uygulaması Yap:** Android'in "Varsayılan uygulamalar → Ana Ekran" ayarından GT-Launcher'ı seçin.
5. **İzinler:** Medya kontrolü için *Bildirim Erişimi*, navigasyon için isteğe bağlı *Erişilebilirlik* izinlerini Engineering Panel → Sistem'den tanımlayın.
6. **Kişiselleştir:** Engineering Panel → Görünüm'den Theme Creator'ı açıp stilinizi seçin; Sistem → Yedekleme'den profilinizi dışa/içe aktararak cihazlar arasında taşıyın.
7. **Başla:** "Space, the final frontier..." 🖖

---

*Bu proje Alaz Lab altyapısı ile teknik denetimden geçmiştir.*
