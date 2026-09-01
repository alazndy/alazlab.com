---
image: "/projects/GT-Launcher.png"
title: "GT-Launcher"
category: "Diğer"
area: "lab"
status: "Active"
download: "https://play.google.com/store/apps/details?id=com.alazndy.gtlauncher"
downloads:
  - title: "Google Play Store"
    href: "https://play.google.com/store/apps/details?id=com.alazndy.gtlauncher"
    description: "Google Play Store üzerinden doğrudan kurulum ve otomatik güncellemeler."
    format: "Play Store"
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
  - src: "/projects/GT-Launcher/card-customization-demo.gif"
    alt: "Kart İçi Görsel Katmanı ve Renk Teorisi Çarkı"
    caption: "Kart İçi Sanat — Bağımsız fotoğraf katmanı, boyutlandırma, opaklık ve 360° renk teorisi çarkı."
  - src: "/projects/GT-Launcher/foreground-image-slice.gif"
    alt: "Ön Plan Fotoğraf Mozaik Dilimleme"
    caption: "Ön Plan Mozaik — Tüm ızgaraya yayılan görselin kartlar arasında UV dilimlenmesi."
  - src: "/projects/GT-Launcher/search-mixed-results.gif"
    alt: "Omni-Terminal karma arama motoru"
    caption: "OmniSearch — Web, Play Store, uygulamalar ve sistem ayarları tek komuta kutusunda."
version: "v4.13.0"
summary: "Star Trek esintili bir estetikte, tamamen modüler kart sistemine sahip bir Android ana ekranı: kapasite tabanlı kart üretici, OmniSearch komuta güvertesi, Slide List uygulama çekmecesi ve OBD-II destekli Drive Mode ile."
techStack: ["Kotlin", "Jetpack Compose", "Room", "OBD-II BLE", "ML Kit OCR", "Gson", "Material3"]
---

##  Sistem Özeti

Android cihazınızı 24. Yüzyıl teknolojisine yükseltin: Star Trek "The Next Generation" estetiğine sadık, "Secure by Design" felsefesiyle geliştirilmiş, tamamen modüler bir ana ekran deneyimi.

<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10 not-prose">
  <div class="p-6 rounded-2xl bg-white/[0.025] border border-white/8 hover:bg-white/[0.04] transition-colors">
    <div class="inline-flex px-2.5 py-1 rounded-full bg-orange-500/10 items-center justify-center border border-orange-500/20 mb-4 text-orange-400 font-mono text-[11px] font-bold tracking-widest">UCCS</div>
    <h3 class="text-base font-bold text-white uppercase tracking-wide mb-2">Kapasite Tabanlı Kartlar</h3>
    <p class="text-xs text-white/50 leading-relaxed">Her kart tek bir sabit tipe değil; birleştirilebilir bağımsız yeteneklere (UCCS) dayanır. Uyumsuz modül kombinasyonları editör içinde çakışma korumasıyla engellenir.</p>
  </div>

  <div class="p-6 rounded-2xl bg-white/[0.025] border border-white/8 hover:bg-white/[0.04] transition-colors">
    <div class="inline-flex px-2.5 py-1 rounded-full bg-cyan-500/10 items-center justify-center border border-cyan-500/20 mb-4 text-cyan-400 font-mono text-[11px] font-bold tracking-widest">OMNI</div>
    <h3 class="text-base font-bold text-white uppercase tracking-wide mb-2">OmniSearch Komutası</h3>
    <p class="text-xs text-white/50 leading-relaxed">Web araması, Google Play, kurulu uygulamalar, rehber kişileri ve sistem ayarları tek komuta arama alanından canlı LCARS kartları olarak listelenir.</p>
  </div>

  <div class="p-6 rounded-2xl bg-white/[0.025] border border-white/8 hover:bg-white/[0.04] transition-colors">
    <div class="inline-flex px-2.5 py-1 rounded-full bg-amber-500/10 items-center justify-center border border-amber-500/20 mb-4 text-amber-400 font-mono text-[11px] font-bold tracking-widest">SKIN</div>
    <h3 class="text-base font-bold text-white uppercase tracking-wide mb-2">6 Görsel Stil & Temalar</h3>
    <p class="text-xs text-white/50 leading-relaxed">Flat, Glass, Neo, Clay, Minimal ve Neon sözleşmeleri; 12 Starfleet paleti, HSV renk çarkı ve saat/pil/hava durumuna göre canlı tema otomasyonu.</p>
  </div>

  <div class="p-6 rounded-2xl bg-white/[0.025] border border-white/8 hover:bg-white/[0.04] transition-colors">
    <div class="inline-flex px-2.5 py-1 rounded-full bg-red-500/10 items-center justify-center border border-red-500/20 mb-4 text-red-400 font-mono text-[11px] font-bold tracking-widest">DRV</div>
    <h3 class="text-base font-bold text-white uppercase tracking-wide mb-2">Drive Mode Interceptor</h3>
    <p class="text-xs text-white/50 leading-relaxed">OBD-II BLE canlı telemetrisi, GPS hız göstergesi, ses spektrumu ve OCR yakıt fişi taramasıyla sürüşü yıldız gemisi kokpitine çeviren yatay mod.</p>
  </div>
</div>

---

##  Teknik Derinlik

UCCS kart mimarisi, 6 görsel stil motoru, dinamik ızgara, OmniSearch komuta güvertesi, Drive Mode telemetrisi ve Engineering Panel güvenlik mimarisinin tam teknik dökümü — canlı GIF kayıtları ve parametre tablolarıyla — **Wiki & Kılavuzlar** sekmesinde, 9 ayrı kılavuz halinde:

- `ARCHITECTURE` — UCCS kart sistemi, 5 sekmeli Card Builder ve 19 modüllük yetenek havuzu
- `CUSTOMIZATION` — 6 görsel stil, 12 LCARS renk paleti ve dinamik tema otomasyonu
- `OMNI-TERMINAL` — Hibrit arama ve Slide List departman çekmecesi
- `DRIVE-MODE` — OBD-II telemetri, DTC arıza teşhisi ve kokpit HUD'ı
- `ENGINEERING-GUIDE` — 9 güverte, izin kataloğu ve profil yedekleme

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
