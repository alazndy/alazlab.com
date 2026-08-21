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

GT-Launcher'ın kalbi: kartlar artık tek bir sabit "tip" yerine, birleştirilebilir yeteneklerden (capability) inşa edilir.

- **Sekmeli üretici:** Yeni kart oluşturma akışı `FUNCTION` → `BEHAVIOR` → `APPEARANCE` → `LAYOUT` → `VISUAL` aşamalarından geçer.
- **Uyumluluk kontrolü:** Birbiriyle çakışan capability'ler editör içinde daha kayıt anında engellenir, çalışma zamanında hataya düşülmez.
- **Canlı önizleme:** İkon, vurgu rengi, metin rengi ve builder kimliği kaydetmeden önce anında önizlenir.
- **Otomatik geriye dönük yükseltme:** Eski tip kartlar ilk açılışta kapasite tabanlı JSON'a otomatik taşınır — elle müdahale gerekmez.

### Card katalogundaki başlıca yetenekler
`APP_LAUNCH` · `NOTIFICATIONS` · `COMMS` · `MEDIA_CONTROL` · `GALLERY` · `APP_DRAWER` · `CLOCK` · `WEATHER` · `CALENDAR` · `TIMER` · `NOTE` · `FLASHLIGHT` · `STEP_COUNTER` · `FINANCE` · `CAMERA` · `SYSTEM_STATS` · `WIDGET` · `DECK`

<div class="my-10 flex justify-center">
  <img src="/projects/GT-Launcher/card-builder-demo.gif" alt="Card Builder ve yetenek (capability) modülü seçimi" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
</div>

**Finance kartı** hisse, kripto ve döviz varlıklarını canlı fiyat akışıyla takip eder, portföy kâr/zarar toplamını gösterir — hiçbir aracı kurum girişi veya hesap bağlama gerektirmez. **Camera Control kartı** her yöne özel bir kamera modu (Fotoğraf, Video, Selfie, Portre, Pro, Panorama, Slow-Mo, Gece) bağlar.

---

## 🖥️ Ana Ekran ve Kişiselleştirme

- **Dinamik kartlar:** Serbest boyutlandırma, yeniden sıralama ve renklendirme; kart başına özel arka plan fotoğrafı desteği.
- **Radial menü:** Herhangi bir karta uzun basış veya kaydırmayla açılan, kişiye özel kısayol çemberi (kişi arama, fonksiyon tetikleme, rota açma).
- **Sıfır gecikmeli ikon yükleme:** Arka planda `ImageBitmap` ön-dönüşümüyle akıcı medya geçişleri.
- **Sistem teması senkronu:** Android Açık/Koyu ve Sistem varsayılanıyla derin entegrasyon.
- **Güvenilir görsel varlıklar:** Seçilen kart, ana ekran ve ön plan görselleri launcher'a ait depolamaya kopyalanır — sağlayıcı URI izinleri kalıcılığı bozamaz.

<div class="my-10 flex justify-center">
  <img src="/projects/GT-Launcher/sidebar-demo.gif" alt="Kaydırma hareketiyle açılan yan menü demosu" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
</div>

Ana ekranın herhangi bir yerinden sağa kaydırmak, hızlı erişim çubuğunu açar: Ana Ekran, Ayarlar, Dosyalar, Arama, Sürüş Modu ve Finans kısayolları — kartların kendi kaydırma eylemlerini engellemeden, arka planın kendi jest algılayıcısı üzerinden çalışır.

<div class="my-10 flex justify-center">
  <img src="/projects/GT-Launcher/app-drawer-demo.gif" alt="Slide List uygulama çekmecesinde kategori filtreleme demosu" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
</div>

### Slide List Uygulama Çekmecesi
Yukarıdaki demo, çekmecenin canlı kategori filtrelemesini gösteriyor: **ALL / SOCIAL MEDIA / MEDIA / PRODUCTIVITY** sekmeleri arasında anında geçiş, sağda alfabetik hızlı indeks ve üstte gömülü OmniSearch kutusu. Departmanlar anahtar kelimeye göre otomatik sıralanır, kullanıcı istediği zaman elle geçersiz kılabilir.

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

<div class="my-10 flex justify-center">
  <img src="/projects/GT-Launcher/theme-style-demo.gif" alt="Theme Creator'da görsel stiller arasında canlı geçiş" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
</div>

Her stil tokeni Theme Creator'da tek tek düzenlenebilir ve **profil yedekleme/geri yükleme** ile birlikte taşınır. Tema otomasyonu tek bir stratejiyle sınırlıdır (manuel, saatlik, pil ya da hava durumu bazlı) — çakışan otomasyon anahtarları birbirini geçersiz kılmaz; son manuel palet hatırlanır ve son otomasyon değişikliği geri alınabilir.

---

## 🪐 İlk Kurulum ve Etkileşimli Eğitim

- **Bridge Configuration:** Çalışma zamanı izinleri, isteğe bağlı Navigasyon Servisi açıklaması ve ilk kart seçimi — tüm adımlar atlanabilir, tek geçişte tamamlanır.
- **Quick Setup:** Hazır kart preseti listesinden seçip tek ekranda hepsini işaretleme.
- **Guided Setup:** Hiçbir şey önceden doldurulmamış gerçek Card Builder'ı açar; kullanıcı kapasite sistemini kendi kartını inşa ederek öğrenir, "bir tane daha ekle?" istemiyle döngüye girer.
- **Tek Rehberli Tur:** Canlı arayüz üzerinde çalışan tek bir ışıklandırılmış adım dizisi — ayrı bir statik kılavuza ihtiyaç yok. Engineering Panel → `?`'den her zaman erişilebilir; tüm 10 dilde tam çevirili.

<div class="my-10 flex justify-center">
  <img src="/projects/GT-Launcher/engineering-demo.gif" alt="Engineering Panel alt sekmeleri ve canlı ızgara/kart boyutlandırma ayarları" class="rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 max-w-[280px] w-full" />
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
