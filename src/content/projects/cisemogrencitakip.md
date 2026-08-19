---
image: "/projects/cisemogrencitakip.png"
title: "cisem_ogrenci_takip"
category: "Diğer"
area: "lab"
status: "Active"
summary: "Dil kursları için öğrenci, kurs, kayıt, yoklama, ödeme ve iletişim süreçlerini kurum izolasyonu ve rol tabanlı erişimle yöneten web uygulaması."
techStack: [Next.js 16, React 19, TypeScript, Firebase Auth, Firestore, Zustand, Zod, Twilio, Resend, React PDF]
github: https://github.com/alazndy/cisem_ogrenci_takip
manuals:
  - title: "Cisem Öğrenci Takip README"
    href: "https://github.com/alazndy/cisem_ogrenci_takip/blob/main/README.md"
    description: "Modüller, güvenlik yaklaşımı, kurulum ve deployment notları."
    format: "Markdown"
  - title: "Ortam Değişkenleri"
    href: "https://github.com/alazndy/cisem_ogrenci_takip/blob/main/docs/ENV_SETUP.md"
    description: "Firebase ve harici mesajlaşma servisleri için ortam yapılandırması."
    format: "Markdown"
gallery:
  - src: "/projects/cisemogrencitakip.png"
    alt: "Cisem öğrenci takip dashboardu"
    caption: "Dil kursu operasyonlarını öğrenci ve finans görünümüyle merkezileştiren dashboard."
---

## Genel Bakış

cisem_ogrenci_takip, dil kursu kurumlarının günlük öğrenci ve operasyon takibini yönetmek için hazırlanmış Next.js uygulamasıdır. Dashboard, öğrenci, kurs, kayıt, yoklama, ödeme, mesaj ve rapor akışlarını tek panelde birleştirir.

## Ana Modüller

- **Öğrenciler:** Öğrenci CRUD işlemleri, arama ve KVKK rıza takibi.
- **Kurslar ve kayıtlar:** A1–C2 seviyeleri, kurs kategorileri, kayıt durumu ve otomatik bitiş hesaplama.
- **Yoklama:** Günlük yoklama kaydı, kurs geçmişi ve istatistik görünümü.
- **Ödemeler:** Bekleyen/gecikmiş ödeme takibi, hatırlatmalar ve PDF raporları.
- **Mesajlar:** SMS, WhatsApp ve e-posta bildirim şablonları için entegrasyon katmanı.
- **Kurum yönetimi:** Multi-tenant veri izolasyonu ve rol tabanlı erişim.

## Güvenlik ve Veri

Firebase Auth ve Firestore temel kimlik/veri katmanını oluşturur. Firestore kuralları kurum izolasyonunu, API katmanı ise kimlik doğrulama, rate limiting ve Zod input validation akışlarını destekler. Uygulamada KVKK bilgilendirme ekranı bulunur; gerçek kurum verisiyle kullanım öncesinde kendi hukuki ve operasyonel kontrolleri yapılmalıdır.

## Kurulum

Gereksinimler: Node.js ve pnpm.

```bash
pnpm install
pnpm dev
```

Firebase, Twilio ve e-posta servisleri için repository’deki `docs/ENV_SETUP.md` kılavuzu takip edilmelidir. Production build ve kalite komutları:

```bash
pnpm build
pnpm lint
```

Öğrenci ve iletişim verileri içerdiği için bu sayfada herkese açık demo hesabı veya dağıtım paketi paylaşılmamaktadır.

## Durum

Aktif geliştirme. Temel dashboard, öğrenci/kurs/kayıt, yoklama, ödeme, mesaj ve rapor sayfaları mevcut; gerçek kurum kullanımı için ortam, erişim ve veri koruma yapılandırmaları ayrıca tamamlanmalıdır.
