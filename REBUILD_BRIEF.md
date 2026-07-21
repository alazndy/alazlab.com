# alazlab.com — Yeniden Yapım Brief'i

**Durum:** Onaylandı (brainstorming süreciyle çıkarıldı, 2026-07-21)
**Bu dosyanın amacı:** Siteyi sıfırdan kuracak agent için tam kapsamlı içerik + bilgi mimarisi spesifikasyonu. Stack seçimi bu agent'a bırakılmıştır — burada karar verilmiş olan şey **ne anlatılacağı** ve **nasıl organize edileceği**, teknik implementasyon detayları değil.

---

## 1. Neden bu yeniden yapım

Mevcut site (bu repo, `alazlab.com` olarak canlı) ağır bir sci-fi/LCARS rol yapımı diliyle yazılmış: "Kernel_Operator: Level_05", uydurma "46 ACTIVE nodes / 99.982% Uptime" istatistikleri, "Architecting The Core" gibi ifadeler (`src/app/about/page.tsx`). Bu içerik gerçek hiçbir şey anlatmıyor — ne Göktuğ'un kim olduğunu, ne projelerin neden var olduğunu.

Yeni sitenin işi: **gerçek bir mühendisin gerçek projelerini, gerçek amaçlarıyla anlatmak.** Görsel dil (koyu tema, LCARS estetiği) korunabilir — sorun estetik değil, içerik.

---

## 2. Kimlik ve konumlandırma

Site **tek kişilik** bir anlatı: Göktuğ Turhan.

**Çekirdek anlatı — ikili kimlik:**
Gündüz ADC Tasarım'da sahada çalışan bir endüstriyel donanım/gömülü sistem mühendisi — kod masada kalmıyor, gerçek araçlara, gerçek madenlere, gerçek sınır kapılarına gidiyor (UniControl'den 60+ birim sahada). Gece ise kendi AI-agent'lı yazılım ekosistemini kuran bağımsız bir geliştirici — R-AI-OS, GT-Launcher, GT-UI gibi projelerle kendi araçlarını, kendi işletim katmanını inşa ediyor.

İkisini bağlayan ortak payda: **sorunu gerçekten çözene kadar uğraşmak** — ister bir CAN-bus radar sistemi olsun, ister bir AI agent'ın güvenlik çekirdeği.

**Hedef kitle (üçü birden, eşit ağırlıkta):**
- İş/müşteri arayan biri gibi okunmalı (freelance/danışmanlık)
- İşe alım/kariyer başvurusu gibi okunmalı (teknik derinlik + profesyonel sunum)
- Kişisel vitrin gibi okunmalı (projeler + düşünce süreci belgeleniyor)

Bu üçü çelişmiyor: gerçekçi + kanıta dayalı + net anlatılmış bir proje, her üç kitleye de çalışır. Kitleye göre ayrı sayfa/mod yapmaya gerek yok.

---

## 3. Ton kuralları (kritik — mevcut sitenin ana hatası burada)

- **Uydurma sayı/istatistik yasak.** "46 ACTIVE nodes", "99.982% Uptime" gibi hiçbir şey. Bir sayı varsa gerçek olmalı (ör. "UniControl'den 60+ birim sahada", "GT-Launcher v4.7.3", "GT-UI npm'de 1.1.2").
- **Rol yapımı unvan/rütbe yasak.** "Kernel_Operator: Level_05", "Access_Granted L5_ARCHITECT_VERIFIED" gibi ifadeler kaldırılacak.
- **Görsel dil (LCARS estetiği, koyu tema, mono fontlar, glow efektleri) kalabilir** — ama metnin altında gerçek bir insan sesi olmalı, sistem logu değil.
- Her proje için **"neden yaptım"** cümlesi birinci ağızdan, gerçek bir motivasyonla yazılmalı — jenerik "building mission-critical ecosystems" gibi soyut ifadeler değil.
- Bir proje bitmemişse ("WIP") bunu gizleme — "geliştiriliyor" / "aktif" gibi dürüst durum rozetleri kullan.

---

## 4. Site haritası

```
/                → Ana sayfa: misyon cümlesi + Mühendislik/Lab'a giden 2 büyük kapı + öne çıkan 3-4 proje
/muhendislik     → Saha/donanım projeleri (ADC Tasarım bağlamlı)
/lab             → Kişisel AI-agent'lı yazılım ekosistemi
/hakkimda        → İkili kimlik hikayesi — ikisini birbirine bağlayan sayfa
/proje/[slug]    → Ortak proje detay şablonu (bkz. Bölüm 6)
```

Navigasyon: **Ana Sayfa · Mühendislik · Lab · Hakkımda** (+ istenirse İletişim).

---

## 5. Mühendislik — öne çıkacak projeler

> ADC Tasarım bünyesinde, gerçek donanıma bağlı, sahada çalışan sistemler.

| Proje | Ne yapıyor | Kanıt/durum | Kaynak yol |
|---|---|---|---|
| **UniControl** | ESP32-S3/FreeRTOS otomotiv ADAS kontrolörü — CAN-bus radar + ultrasonik sensör füzyonu, Nextion HMI, SD kara kutu, SoftAP+OTA | **60+ birim sahada üretimde.** Saha hikayeleri: Kışladağ altın madeni (TR), Guardian Glass forklift çarpışma önleme (Mısır), Bahreyn kurulumu | `embedded/UniControl` (saha hikayeleri `core/Vault101`'de belgeli) |
| **RCPS + RCPS-Sim** | ESP32+CAN-bus (TWAI) araç kör nokta radar sistemi, Nextion HMI; RCPS-Sim tarayıcıda çalışan interaktif simülatör (hedef sürükle, alarm eşiği ayarla) | v3.7.0, olgun/tamamlanmış. RCPS-Sim donanımsız canlı demo edilebilir | `embedded/RCPS`, `embedded/RCPS-Sim`, marka görselleri `embedded/RCPS FAcia` |
| **VCT** | Brigade VBV-360-1000-AI kameraları için 3D sanal kalibrasyon istasyonu — fiziksel araç olmadan kamera yerleşimi simülasyonu | Aktif, gerçek müşteri donanımına bağlı | `web/VCT` (kanonik kopya — bkz. Bölüm 8, `archives/Other_Projects/VSD-` alternatifiyle karşılaştırılmalı) |
| **UCC APP** | ESP32 araç radar/yakınlık sensörlerini WiFi üzerinden kontrol eden Flutter uygulaması, mDNS cihaz keşfi, OTA güncelleme | Çalışır durumda | `archives/Other_Projects/Management_Panels/UCC APP` |

---

## 6. Lab — öne çıkacak projeler

> Kişisel zamanda kurulan, AI-agent'larla birlikte geliştirilen yazılım ekosistemi.

| Proje | Ne yapıyor | Kanıt/durum | Kaynak yol |
|---|---|---|---|
| **R-AI-OS** | LLM-native "OS çekirdeği" — Claude/Codex/OpenCode/Antigravity gibi AI ajanlarıyla insan arasına giren, zero-trust güvenlik modeli (dosya sistemi jail, audit ledger, egress allowlist) uygulayan sistem | v3.6.0, public repo, 583 test yeşil, kendi VS Code extension'ı var | `core/R-AI-OS` |
| **GT-Launcher** | Star Trek LCARS temalı Android ana ekran launcher'ı — modüler kart sistemi, sürüş modu (OBD-II telemetri), tema motoru | v4.7.3, Play Store kapalı test aşamasında | `mobile/GT-Launcher` |
| **GT-UI** | Yayınlanmış npm tasarım sistemi — 75+ React/TypeScript bileşen, 8 seçilebilir tema (LCARS, Aperture, TVA, eDEX-UI...) | `@alazndy/gt-ui` npm'de v1.1.2, Storybook dokümantasyonu var | `core/GT-UI` |
| **streamdeck-kaira** | ESP32-S3 dokunmatik makro deck — tarayıcıdan (Web Serial API) doğrudan profil flaşlama, yeniden derleme gerektirmiyor | Olgun, gerçek donanım kısıtlarıyla test edilmiş | `tools/streamdeck-kaira` |
| **ahead-the-curve** | Çoklu kaynaklı (ArXiv/Semantic Scholar/CORE/Crossref) kişisel Ar-Ge takip ajanı, çift-LLM analiz (Gemini + Groq), Telegram/API teslimat | Aktif geliştiriliyor | `ai/ahead-the-curve` |
| **kaira-mix** | JUCE 8 tabanlı native VST3 eklenti — gömülü WebView arayüz + Claude API entegrasyonlu AI mixing/mastering asistanı | Geliştiriliyor (Linux build çalışıyor, Windows/tam AI entegrasyonu beklemede) | `audio/kaira-mix` |
| **museiq** | Sesi analiz edip (Demucs+YAMNet) otomatik 3D video'ya (Blender headless render) dönüştüren pipeline, sosyal medya formatlarına optimize | Çalışan yerel pipeline | `audio/museiq` |
| **crucix** | 27 açık veri kaynağını (uçuş takibi, GDELT, yaptırım listeleri, radyasyon izleme...) tarayan, 3D WebGL küre üzerinde gösteren OSINT paneli | Çalışıyor — **kaynak kodu dağınık, siteye koymadan önce toparlanmalı** (bkz. Bölüm 8) | `core/crucix` + `core/apis` + `core/lib` + `core/docs` (görseller) |
| **ml-model** | Donanım-benchmark verisiyle eğitilmiş küçük ONNX modeli — makinenin CPU/RAM/GPU'suna göre en uygun yerel LLM'i öneriyor | Tamamlanmış, küçük ve net | `ai/ml-model` |
| **gt-fit** | Kotlin Multiplatform sağlık takip uygulaması — native Android + native iOS, şifreli yerel depolama (SQLCipher) | Android çalışıyor, iOS geride — WIP | `mobile/gt-fit` |
| **TEK ekosistemi** | Weave (şematik/kablo tasarım kanvası), UPH (proje yönetim hub'ı), T-SA (AI şartname analizcisi), Renderci (3D render stüdyosu) gibi 6 uygulamayı birbirine bağlayan monorepo | Aktif — alt projeler ayrı sayfa olabilir, ama "nasıl birlikte çalışıyorlar" anlatımı burada | `core/TEK` |
| **gtab** | Chrome yeni sekme üretkenlik paneli — hava durumu, Pomodoro, Spotify, Google Tasks | **Chrome Web Store'da yayında**, v4.3.0 | `web/gtab` |
| **adc-web-sitesi-** | ADC Tasarım kurumsal sitesi — Vite SPA'dan Next.js'e SEO/AI-crawler indeksleme motivasyonlu taşıma, 566 statik sayfa | Aktif geliştiriliyor | `web/adc-web-sitesi-` (worktree kopyası `adc-web-refactor`'ı kullanma) |
| **cisem_ogrenci_takip** | Çoklu kiracılı dil kursu/öğrenci takip SaaS'ı — KVKK uyumlu, SMS/WhatsApp entegrasyonu | Üretime hazır (README iddiası, doğrulanmalı) | `web/cisem_ogrenci_takip` |
| **parfüm (ArdaM Parfümeri)** | Tam kapsamlı e-ticaret — çoklu dil, "koku bulucu" filtreleme, admin panel | Çalışıyor | `web/parfüm` (`archives/Other_Projects/parf-mistan` ile aynı proje olabilir, kanonik kopyayı doğrula) |

---

## 7. Proje detay sayfası şablonu

Her proje sayfası bu alanları içermeli:

1. **Başlık + tek cümlelik özet**
2. **Neden yaptım** — motivasyon/amaç, birinci ağızdan, gerçek (bu bölüm özellikle istendi — sitenin en önemli eksiği burasıydı)
3. **Ne yapıyor** — işlevin açık anlatımı
4. **Durum rozeti** — gerçek: Live / Active / WIP / Prototype (uydurma stat yok)
5. **Teknoloji** — gerçek stack listesi
6. **Kanıt** — varsa: canlı link, ekran görüntüsü/video, GitHub reposu, birim/kullanıcı sayısı
7. **(Sadece Mühendislik projeleri için) Sahada nerede kullanılıyor** — ör. UniControl için Kışladağ/Mısır/Bahreyn saha hikayeleri (`core/Vault101`'den devşirilebilir)

---

## 8. İçerik hazırlarken dikkat edilmesi gerekenler (birleştirme kararları)

Bu projelerin bazılarının diskte birden fazla kopyası var. Sayfa yazmadan önce hangisinin kanonik olduğuna karar verilmeli:

- **VCT vs `archives/Other_Projects/VSD-`**: VSD- ("Brigade Virtual Calibration Engine") daha kapsamlı bir alternatif olabilir — hangisinin daha iyi demo olduğu karşılaştırılmalı.
- **parfüm vs `archives/Other_Projects/parf-mistan`**: repo adı `parf-mistan` — `git log` ile hangi klasörün güncel çalışma kopyası olduğu doğrulanmalı.
- **adc-web-sitesi- vs adc-web-refactor**: aynı reponun git worktree'leri, tek biri kullanılmalı.
- **crucix**: kaynak kodu `core/crucix` + `core/apis` + `core/lib` + `core/docs` arasında dağılmış — sayfaya koymadan önce tek bir yerde (görseller dahil) toparlanmalı.
- **R-AI-OS**: `core/R-AI-OS-echo/-audit/-dart/-vscode` aynı reponun feature-branch worktree'leri, ayrı proje değil — tek R-AI-OS sayfası yeterli, VS Code extension yan ürün olarak bir alt-not şeklinde geçebilir.

---

## 9. Görsel yön

İki makul seçenek var, **kararı yürütecek agent teknik uygunluğa göre verebilir:**

- **Seçenek A — GT-UI kullan:** Göktuğ'un kendi yayınladığı `@alazndy/gt-ui` npm paketini (75+ bileşen, 8 tema dahil LCARS) sitenin temel tasarım sistemi olarak kullan. Avantaj: kendi ürününü canlıda kullanmış olur, iş tekrarı önlenir, site aynı zamanda GT-UI'nin bir vitrini olur.
- **Seçenek B — Bağımsız yeni tasarım sistemi:** Site kendi özgün kimliğini kurar, GT-UI ayrı bir ürün olarak kendi proje sayfasında kalır.

Hangisi seçilirse seçilsin: koyu tema, LCARS/teknik estetik korunabilir, **ama Bölüm 3'teki ton kurallarına uyulmalı** — estetik katmanla içerik katmanı karıştırılmamalı.

---

## 10. Kapsam dışı (bu yeniden yapımda yapılmayacaklar)

- Mevcut sitedeki 40 proje sayfasının **tamamının** yeni yapıya taşınması zorunlu değil — Bölüm 5-6'daki 19 proje önceliklidir. Diğerleri istenirse "Diğer Çalışmalar" gibi küçük bir arşiv listesi olarak eklenebilir, ama ana anlatının parçası değil.
- Sahte kullanıcı yorumları/referanslar üretilmeyecek.
- E-ticaret/blog gibi ek işlevler bu kapsamda değil.
- TR/EN çoklu dil desteği mevcut sitede vardı — korunması iyi olur ama bu yeniden yapımın başarı kriteri değil.

---

## 11. Teslimat / öz-kontrol kriterleri

Yürütecek agent, siteyi tamamladığında şunları kontrol etmeli:

- [ ] Hiçbir sayfada uydurma sayı/istatistik yok
- [ ] Her öne çıkan projede "neden yaptım" cümlesi var ve birinci ağızdan yazılmış
- [ ] Durum rozetleri gerçek (WIP olan projeler WIP olarak işaretli)
- [ ] Mühendislik projelerinde en az birinde somut saha kanıtı var (UniControl → 60+ birim, Kışladağ/Mısır/Bahreyn)
- [ ] Bölüm 8'deki birleştirme kararları çözülmüş (hangi klasör/kopya kanonik, netleşmiş)
- [ ] Hakkımda sayfası ikili kimlik anlatısını (gündüz/gece) taşıyor, rol-yapımı unvan yok
- [ ] GT-UI kullanılmadıysa bile GT-UI kendi proje sayfasında (Lab) hâlâ yer alıyor

---

*Bu brief, `/home/alaz/dev` altındaki ~80 proje dizininin tam taranmasıyla (2026-07-21) çıkarılmıştır. Detaylı ham envanter ve hariç tutulan/birleştirilen projelerin tam listesi için bu konuşmanın oturum geçmişine veya varsa paylaşılan envanter artifact'ine bakılabilir.*
