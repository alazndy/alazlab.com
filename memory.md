# alazlab.com Memory

## Son Durum
- Tarih: 2026-05-11
- Aktif agent: Gemini

## Claude
### Yaptıkları
- Proje adı portfolio-site → alazlab.com olarak güncellendi
- package.json name güncellendi
- gitrepo.md oluşturuldu
- GitHub reposu oluşturuldu: https://github.com/alazndy/alazlab.com
- Tüm değişiklikler commit edilip push edildi
- entities.json güncellendi
- Vercel production deploy yapıldı (https://alazlab.com canlı)
- CyberBackground, marquee bar, Sidebar animasyonları kaldırıldı — tasarım sadeleştirildi
- 7 proje için markdown içerik dosyaları oluşturuldu (src/content/projects/)
- markdown.ts path'i düzeltildi (Portfolio/ → src/content/projects/)
- CategoryGrid merkezi project-config.ts'e taşındı
- Her proje sayfası için dinamik OG/Twitter metadata eklendi
- sitemap.xml ve robots.txt oluşturuldu
- layout.tsx global SEO metadata güncellendi
- GTab Chrome Web Store linki güncellendi
- lucide-react v1.8 ikon uyumsuzlukları (Chrome, Github) düzeltildi
### Yapacakları
- —
### Notlar
- Klasör adı hâlâ portfolio-site (VS Code kilidi nedeniyle). VS Code kapatılıp Windows Explorer'dan alazlab.com olarak yeniden adlandırılmalı.
- Google OAuth Search Console domain doğrulaması yapılıyor (TXT kaydı Squarespace'e eklendi)
- Vercel domain ayarlarında DNS Change Recommended uyarısı var (216.198.79.1 ve yeni CNAME)

## Gemini
### Yaptıkları
- **APK Dağıtım Merkezi:** GT-Launcher projesi için resmi APK dağıtım kanalı v4.2.14 sürümü ile güncellendi.
- `public/GT-Launcher-v4.2.14.apk` eklendi ve `src/content/projects/GT-Launcher.md` üzerinden siteye entegre edildi.
- AppList UI, Tema Senkronizasyonu ve CommsCard Refactor içeren yeni build yayına alındı.
### Yapacakları
- —
### Notlar
- —

## Antigravity
### Yaptıkları
- **Görselleştirme Operasyonu**: 34+ proje için yüksek kaliteli görselleştirme tamamlandı. 
  - `runner.js` ve `deep_hunt.js` araçları geliştirildi.
  - Çalışan projelerden (`Oyuntd`, `cisemogrencitakip`, `t-Market`, `localhostmonitor`) canlı ekran görüntüleri alındı.
  - Firmware (`Radar`, `Arduino`, `UCPS`) ve legacy (`TrAIder`, `AI Trader`, `Pro-Gect`, `Tekel`) projeler için yapay zeka ile 4K kalitesinde premium "Hero" görseller üretildi.
- **GT-Launcher Vitrin & Dokümantasyon Senkronu (2026-08-22):** 22 yüksek çözünürlüklü canlı GIF ve eksiksiz wiki dokümantasyonu portfolyoya entegre edildi (`public/projects/GT-Launcher/`, `docs/projects/GT-Launcher/`). `src/content/projects/GT-Launcher.md` Card Builder (5 tab), modül stackleme, fotoğraf/duvar kağıdı, 6 görsel stil, LCARS tema motoru, grid cascade, sidebar, OmniSearch ve Drive Mode interaktif demolarıyla güncellendi.
- **Kapsamlı URL Tabanlı i18n (`/tr` ve `/en`) Mimarisi (2026-08-22):** Next.js App Router üzerinde dinamik `src/app/[lang]/` katmanı oluşturuldu. Tüm rotalar (`/tr`, `/en`, `/tr/proje/[slug]`, `/en/proje/[slug]`, `/tr/muhendislik`, `/en/engineering`, `/tr/gtab`, `/en/gtab`) çift dilli statik sayfa üretimine (98 SSG rotası) bağlandı. `middleware.ts` yönlendirmeleri, `localizePath` bağlayıcısı ve `Header.tsx` anlık dil anahtarı (`TR / EN`) tamamlandı.
- **Proje Sayfaları Derinlik & İnteraktif Wiki Okuyucusu (2026-08-22):** Proje sayfaları çok sekmeli derinlik mimarisine (`ProjectViewTabs`) kavuşturuldu:
  - **Genel Bakış (Overview):** Ana vitrin anlatımı, özellikler ve mimari tablolar.
  - **Wiki & Dokümantasyon (Wiki Reader):** GT-Launcher (9 kılavuz), UniControl (CAN/protokol raporları) ve R-AI-OS (güvenlik/mimari) için in-page arama özellikli interaktif dokümantasyon okuyucusu.
  - **Medya & Vitrin (Media & Gallery):** Tüm canlı GIF demoları, video ve şemalar.
  - **Kaynaklar (Downloads & Resources):** APK sürümleri, kaynak kod ve resmi dokümanlar.
- **Apple Design & Liquid Glass Mimarisi (2026-08-23):** Site geneli `dickwu/apple-design-skill` prensiplerine (Apple Human Interface Guidelines, Liquid Glass 2025/2026, macOS Tahoe/Sequoia translucent sidebar, App Store Bento grid ve SF-style pill hiyerarşisi) uygun olarak baştan tasarlandı:
  - **Liquid Glass Katmanı:** Yüzen üst çubuk (`apple-liquid-glass`, 28px blur), segmentli dil denetimi (`TR`/`EN`) ve macOS pencere başlıkları.
  - **Apple Kart & Yüzey Sistemi:** `apple-card` geometrisi, continuous squircle kenarlıklar, yumuşak spring mikro etkileşimleri (`active:scale-95`).
  - **Tipografi & Okunabilirlik:** Apple SF Pro / Geist tabanlı, yüksek kontrastlı hiyerarşik tipografi, net metin ölçekleri.
  - **Tam Aydınlık & OLED Karanlık Mod:** Apple Açık Mod (`#f5f5f7` zemin ve beyaz yüzen kartlar) ve Apple Karanlık Mod (`#000000` OLED zemin ve derin cam kartlar) tam uyumlu.
- **GT-Launcher İnteraktif Vitrin ve Flagship Sayfası (2026-08-23):** GT-Launcher için (`/proje/GT-Launcher`) özel interaktif bir ürün deneyim sayfası inşa edildi:
  - **Canlı Cihaz Mockup'ı & 6 Modül Demosu:** 5-Tab Card Builder, LCARS Dinamik Renk Motoru, 2D Izgara Boyutlandırma, Sürüş Modu & OBD Telemetrisi, OmniSearch ve Sistem Turu canlı GIF demoları ve teknik metrikleriyle entegre edildi.
  - **Doğrudan APK İndirme & GitHub Entegrasyonu:** Tek tıkla `GT-Launcher-v4.2.15.apk` (18.2 MB) indirme ve kaynak kod bağlantısı sağlandı.
  - **Xcode DocC / 9 Rehberlik Wiki Okuyucusu:** `ARCHITECTURE.md`, `Customization.md`, `Engineering-Guide.md`, `Drive-Mode.md` dahil 9 dokümantasyon makalesi anlık arama ve sayfa içi okuyucu ile sunuldu.
- **Kapsamlı İngilizce Çeviri Entegrasyonu (.en.md) (2026-08-23):** Sitede yer alan 41 projenin tamamı için (`UniControl`, `GT-Launcher`, `R-AI-OS`, `GTab`, `AI-360-VCT`, `AI_Trader`, `tek-ui`, `ENV-I` vb.) birebir profesyonel İngilizce dokümantasyon dosyaları (`.en.md`) oluşturuldu. `markdown.ts` yükleyicisi, `[lang]` rotasına (`/tr` veya `/en`) göre otomatik olarak ilgili dildeki başlık, özet ve teknik içeriği dinamik yükleyecek şekilde entegre edildi.
- **Aydınlık & Karanlık Mod Tam Uyumluluk Revizyonu (2026-08-23):** Tüm sitedeki sabit karanlık sınıflar (`bg-black`, `bg-[#050505]`, `text-white`, `prose-invert`) temizlendi ve semantik CSS tokenlarına bağlandı.
  - Açık Mod: Saf porselen zemin (`#fbfbfd`), net beyaz kartlar (`#ffffff`), keskin ve okunabilir grafit tipografi (`#111113` / `#55555c`) ile 7:1+ kontrast oranı sağlandı.
  - Karanlık Mod: Derin OLED siyahı (`#050507`), cam kartlar (`#0e0e11`) ve net beyaz metinler (`#f5f5f7`) ile tam uyumlu hale getirildi.
  - `SystemTower`, `RaiosClient`, `ENV-I`, `GTab`, `ProjectViewTabs` ve `.prose` blokları her iki temada da yüksek kontrast ve kusursuz okunabilirlikle çalışıyor.
- **Sıfır Emoji & AI-Slop Temizliği (2026-08-23):** Yapay blur lekeleri, başlık üstü pill etiketleri, em-dash kalıpları ve abartılı buzzword'ler temizlendi; yerlerine doğrudan mühendislik gerçekleri yerleştirildi.
- **İçerik Entegrasyonu**: DevOps klasöründeki README ve memory.md dosyaları taranarak markdown içerikleri zenginleştirildi.
- **Sistem Temizliği**: Crucix ve AG-Manager projeleri tüm metadata ve kod tabanından temizlendi.
  - `src/content/projects/AG-Manager.md` silindi.
  - `public/projects/AG-Manager.png` silindi.
  - `project_inventory.json`, `project_inventory_refined.json` ve `project_paths.json` dosyalarından kaldırıldı.
- **Hata Giderme**: Windows dosya yolu (spaces/ampersand) ve port çakışmaları için `runner.js` optimize edildi.
- **Amiral Gemisi İnteraktif Vitrinleri & Simülatörleri (2026-08-23):**
  - **UniControl (`UniControlClient.tsx`):** Brigade BS-9000 radar tarayıcısı, engel mesafesi (0.5m-15m) ve açı kaydırıcısı, tehlike bölgesi sınıflandırması (Zone 1-4), 24V opto-izole I/O anahtarları ve canlı CAN 2.0B / FD veri akışı simülatörü entegre edildi.
  - **R-AI-OS (`RaiosClient.tsx`):** Rust Tokio çekirdeği için canlı interaktif CLI terminal emülatörü (`raios reflect`, `raios locate`, `raios pre-flight`, `raios ocak overview`) ve alt sistem matrisi eklendi.
  - **GTab (`GTabClient.tsx`):** Tarayıcı içi interaktif yeni sekme çalışma alanı simülatörü (Google Tasks ekleme/tamamlama, yerel IndexedDB not defteri, anlık saat, arama motoru ve tema değiştirici) ve doğrudan Chrome Web Store entegrasyonu tamamlandı.
  - **GT-Launcher:** Waydroid üzerinden canlı Android konteynerinde yatay Drive Mode HUD kaydı alındı ve optimize 317KB GIF olarak yerleştirildi. Google Play Store bağlantısı aktif edildi.
- **Spotlight Hızlı Komut Paleti (`Cmd+K` / `Ctrl+K`) (2026-08-23):** Sitedeki tüm 41 projeyi, sayfa hub'larını ve teknoloji etiketlerini Türkçe ve İngilizce anında listeleyen, klavye yön tuşlarıyla gezilebilen Apple Spotlight tarzı arama motoru (`SpotlightCommandPalette.tsx`) geliştirildi.
- **Dinamik Sosyal Medya Önizlemesi & JSON-LD Yapılandırılmış Veri (2026-08-23):**
  - `@vercel/og` tabanlı dinamik sosyal medya kart üreticisi (`src/app/opengraph-image.tsx`) eklendi.
  - Google arama motoru zengin sonuçları için Schema.org `Person` ve `WebSite` JSON-LD yapılandırılmış verisi `src/app/layout.tsx`'e entegre edildi.
- **Tam SSG Derleme & 99/99 Rota Doğrulaması:** 99 statik sayfanın tamamı 0 hata ile derlendi ve GitHub `main` dalına aktarıldı.
### Yapacakları
- —
### Notlar
- Sitedeki tüm amiral gemisi sayfaları ve arama altyapısı eksiksiz canlıya hazır.

## Plan
### Tamamlananlar
- [x] memory.md oluşturuldu ve güncellendi
- [x] /gtab ve gizlilik sayfaları
- [x] Vercel production deploy (https://alazlab.com)
- [x] 41 projenin metadata ve içerik importu
- [x] Görselleştirme Pipeline'ı (34+ Görsel eklendi)
- [x] TR/EN dil desteği ve Dark Mod
- [x] SEO (Sitemap, Robots, OG tags, Schema JSON-LD)
- [x] Crucix ve AG-Manager projelerinin temizlenmesi
- [x] GT-Launcher v4.1.5 & v4.2.15 Release + Yatay Canlı Drive Mode GIF
- [x] Amiral Gemisi İnteraktif Simülatörleri (UniControl, R-AI-OS, GTab, GT-Launcher)
- [x] Spotlight Cmd+K Evrensel Arama Sistemi


### Devam Edenler
- [ ] Dil desteği ince ayarları
- [ ] Proje sayfaları final kontrolleri
- [ ] Her proje için detaylı açıklama, kılavuz, indirme, galeri ve video içeriklerini gerçek kaynaklarla doldurmak

### Sıradakiler
- [ ] Klasör adını manuel olarak alazlab.com yap (VS Code kapalıyken)
- [ ] Vercel DNS ve Search Console doğrulamaları
- [ ] Öncelikli projelerin içerik kaynaklarını tek tek doğrulayıp detay sayfalarına eklemek

## Karar Günlüğü
| Tarih | Agent | Karar | Neden |
|-------|-------|-------|-------|
| 2026-04-29 | Antigravity | memory.md eklendi | Sistem kuralları gereği |
| 2026-04-29 | Claude | Proje adı alazlab.com yapıldı | Kullanıcı isteği |
| 2026-04-29 | Claude | GitHub repo: alazndy/alazlab.com | Yeni proje adıyla eşleşsin |
| 2026-04-29 | Claude | CyberBackground kaldırıldı | Göz yoruyor, performans düşürüyor |
| 2026-04-29 | Claude | markdown.ts path düzeltildi | Vercel'de dışarıdaki Portfolio/ klasörü erişilemez |
| 2026-04-30 | Claude | sitemap/robots/SEO eklendi | Arama motoru indexleme |
| 2026-04-30 | Antigravity | i18n ve Theme eklendi | Çoklu dil ve Aydınlık/Karanlık mod |
| 2026-04-30 | Antigravity | DevOps README.md Enjeksiyonu | Proje sayfalarının içeriğini gerçek verilerle zenginleştirmek için DevOps dizinini tarayıp içeriği markdown dosyalarına enjekte ettik |
| 2026-05-01 | Antigravity | Crucix & AG-Manager Kaldırıldı | Kullanıcıya ait olmayan projeler sistemden tamamen temizlendi |
| 2026-05-11 | Gemini | GT-Launcher v4.1.5 Yayınlandı | İzin hatalarının giderilmesi ve yeni build entegrasyonu |
| 2026-05-21 | Gemini | GT-Launcher v4.2.14 Yayınlandı | AppList UI, Tema Senkronizasyonu ve CommsCard Refactor |
| 2026-05-22 | Gemini | GT-Launcher v4.2.15 Yayınlandı | Performans optimizasyonu ve ImageBitmap entegrasyonu |
| 2026-08-19 | Codex Kaira | Proje detay kaynakları için ortak içerik şeması eklendi | İndirme, kılavuz, galeri ve video bölümleri yalnızca gerçek kaynak olduğunda görünür olacak |
| 2026-08-19 | Codex Kaira | UCC APP ve UniControl içerikleri kaynak kod/repository dokümanlarıyla düzeltildi | Eski mDNS/API/UDS/maliyet iddiaları kaldırıldı; gerçek endpoint, V1/V2 durumu ve public teknik dokümanlar eklendi |
| 2026-08-19 | Codex Kaira | NEXUS ve Oyuntd sayfaları gerçek README/source bilgileriyle zenginleştirildi | IoT gateway gibi hatalı NEXUS tanımı kaldırıldı; iki projeye kurulum kılavuzu ve mevcut görsel galerisi eklendi |
| 2026-08-19 | Codex Kaira | Weave, UPH, t-Market ve cisem_ogrenci_takip sayfaları kaynak README/modüllerle zenginleştirildi | Her sayfaya gerçek teknoloji, kurulum, public doküman ve mevcut görsel bilgisi eklendi; dağıtım iddiaları sınırlı tutuldu |
| 2026-08-19 | Codex Kaira | AI Trader, tek-ui ve R-AI-OS sayfaları güncel repository durumuna çekildi | AI Trader canlı işlem iddiası kaldırıldı; GT-UI paket adı ve R-AI-OS v3.9.0/kılavuzları eklendi |
| 2026-08-19 | Codex Kaira | ADC Web Sitesi aktif adc-web-sitesi- repository’sine göre düzeltildi | Eski Express/SQLite tanımı yerine Next.js 16, Firebase, SSR/SSG katalog ve SEO/AI crawler altyapısı işlendi |
| 2026-08-20 | Codex Kaira | GT-Launcher proje sayfasına gerçek etkileşim demoları ve radial menü galerisi eklendi | Sidebar, OmniSearch ve Theme Creator GIF’leri ile radial-menu.jpg mevcut proje içeriğine bağlandı; content lint ve canlı route doğrulandı |
| 2026-08-22 | Antigravity | GT-Launcher 22 canlı GIF ve eksiksiz yetenek mimarisi vitrine işlendi | Card Builder, Stacking, Photo/Wallpaper, 6 Style, Theme Creator, Grid cascade, Sidebar, OmniSearch ve Drive Mode canlı demoları bağlandı |
## Instincts
- Dış depodaki yayın notlarını portfolyoda göstermek için sabit allowlist URL ile server-side fetch kullan; response boyutunu sınırla, Markdownı yapılandırılmış metne ayrıştır ve cache ile ziyaretçiyi GitHub bağımlılığından ayır.
- Before a signed commit, verify that a local GPG secret key exists for the configured author email; if absent, preserve staged changes and request key setup instead of creating an unsigned commit.
