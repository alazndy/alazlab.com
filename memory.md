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
- **İçerik Entegrasyonu**: DevOps klasöründeki README ve memory.md dosyaları taranarak markdown içerikleri zenginleştirildi.
- **Sistem Temizliği**: Crucix ve AG-Manager projeleri tüm metadata ve kod tabanından temizlendi.
  - `src/content/projects/AG-Manager.md` silindi.
  - `public/projects/AG-Manager.png` silindi.
  - `project_inventory.json`, `project_inventory_refined.json` ve `project_paths.json` dosyalarından kaldırıldı.
- **Hata Giderme**: Windows dosya yolu (spaces/ampersand) ve port çakışmaları için `runner.js` optimize edildi.
### Yapacakları
- Final portfolyo UI cilalaması (polishing).
- i18n (TR/EN) geçişlerinin son kontrolü.
### Notlar
- Projelerin %80'inden fazlası artık "Visual Complete" durumunda.

## Plan
### Tamamlananlar
- [x] memory.md oluşturuldu ve güncellendi
- [x] /gtab ve gizlilik sayfaları
- [x] Vercel production deploy (https://alazlab.com)
- [x] 41 projenin metadata ve içerik importu
- [x] Görselleştirme Pipeline'ı (34+ Görsel eklendi)
- [x] TR/EN dil desteği ve Dark Mod
- [x] SEO (Sitemap, Robots, OG tags)
- [x] Crucix ve AG-Manager projelerinin temizlenmesi
- [x] GT-Launcher v4.1.5 Release

### Devam Edenler
- [ ] Dil desteği ince ayarları
- [ ] Proje sayfaları final kontrolleri
- [ ] GT-Launcher: Müzik kartı/medya kontrolü hatası fix

### Sıradakiler
- [ ] Klasör adını manuel olarak alazlab.com yap (VS Code kapalıyken)
- [ ] Vercel DNS ve Search Console doğrulamaları

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
alarının giderilmesi ve yeni build entegrasyonu |
| 2026-05-21 | Gemini | GT-Launcher v4.2.14 Yayınlandı | AppList UI, Tema Senkronizasyonu ve CommsCard Refactor |
