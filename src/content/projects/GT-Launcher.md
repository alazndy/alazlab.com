---
image: "/projects/GT-Launcher.png"
title: "GT-Launcher"
category: "Diğer"
area: "lab"
status: "Active"
download: "/GT-Launcher-v4.2.15.apk"
version: "v4.9.4"
summary: "Fully functional, highly customizable Android home screen launcher with Star Trek LCARS aesthetics and OBD-II/OCR integrations."
techStack: ["Kotlin", "Jetpack Compose", "OBD-II BLE", "ML Kit OCR", "Room"]
---

## 🚀 Sistem Özeti

Android cihazınızı 24. Yüzyıl teknolojisine yükseltin: Star Trek "The Next Generation" estetiğine sadık, "Secure by Design" felsefesiyle geliştirilmiş elit bir ana ekran deneyimi.

<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-12">
  <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all group hover:scale-[1.02]">
    <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 mb-6 group-hover:scale-110 transition-transform">
      <span className="text-3xl">🏎️</span>
    </div>
    <h3 className="text-xl font-black text-white uppercase tracking-tight mb-3">Drive Mode</h3>
    <p className="text-sm text-white/40 leading-relaxed">Sürüşe başladığınızda otomatik aktif olan, GPS telemetrisi ve müzik görselleştirici barındıran kokpit arayüzü.</p>
  </div>
  
  <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all group hover:scale-[1.02]">
    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 mb-6 group-hover:scale-110 transition-transform">
      <span className="text-3xl">📡</span>
    </div>
    <h3 className="text-xl font-black text-white uppercase tracking-tight mb-3">OBD-II BLE</h3>
    <p className="text-sm text-white/40 leading-relaxed">vLinker ve ELM327 adaptörlerle tam entegrasyon. RPM, hız ve motor verilerini gerçek zamanlı takip edin.</p>
  </div>

  <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all group hover:scale-[1.02]">
    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 mb-6 group-hover:scale-110 transition-transform">
      <span className="text-3xl">🧩</span>
    </div>
    <h3 className="text-xl font-black text-white uppercase tracking-tight mb-3">Dynamic Drawer</h3>
    <p className="text-sm text-white/40 leading-relaxed">Tamamen özelleştirilebilir uygulama departmanları ve anahtar kelimeye göre otomatik sıralama.</p>
  </div>

  <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all group hover:scale-[1.02]">
    <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20 mb-6 group-hover:scale-110 transition-transform">
      <span className="text-3xl">🔒</span>
    </div>
    <h3 className="text-xl font-black text-white uppercase tracking-tight mb-3">Güvenlik</h3>
    <p className="text-sm text-white/40 leading-relaxed">İmza doğrulamalı özel mülkiyet lisansı ve kişisel Alaz koruma protokolleri.</p>
  </div>
</div>

---

## 🛠️ Teknik Derinlik

### 🏎️ Drive Mode — "Interceptor"
Sürüş deneyiminizi bir yıldız gemisi kokpitine dönüştürün.
- **Landscape Exclusive:** Sürüş için optimize edilmiş yatay arayüz.
- **GPS Telemetry:** Gerçek zamanlı GPS hız göstergesi ve Geocode entegrasyonu.
- **FFT Audio Visualizer:** Müziğinizle gerçek zamanlı etkileşime giren neon ses spektrumu.

### 📡 OBD-II Telemetry
- **Bağlantı:** Bluetooth Low Energy GATT.
- **Canlı Göstergeler:** RPM, Araç Hızı, Soğutma Suyu, Turbo Boost, Motor Yükü.
- **Yakıt Tüketimi:** PID 5E ve MAF bazlı anlık tüketim hesabı.
- **DTC Desteği:** Mode 03 hata kodları okuma ve tanımlama.

### 🗺️ Trip Manager & OCR
- **Otomatik Kayıt:** Her sürüşü mesafe ve maliyet bazlı asenkron olarak kaydeder.
- **Yakıt Fişi OCR:** ML Kit ile yakıt fişlerini tarayarak birim fiyatı otomatik günceller.

---

## 🎨 Tasarım ve Estetik
- **AMOLED Optimizasyonu:** Saf siyah tabanlı enerji tasarruflu arayüz.
- **Dinamik Temalar:** Pil durumuna, hava durumuna ve saate göre değişen adaptif renk paletleri.
- **Sidebar:** Asimetrik köşe yuvarlaklığı ve kaydırma hareketlerine duyarlı butonlar.

---

## 📥 Kurulum Rehberi

> [!TIP]
> En iyi deneyim için Android 10+ bir cihaz ve vLinker iCar Pro adaptörü önerilir.

1. **İndir:** Sayfanın başındaki **DOWNLOAD APK** butonuna tıklayın.
2. **Yükle:** Bilinmeyen kaynaklardan yükleme izni vererek APK'yı kurun.
3. **İzinler:** Medya kontrolü için *Bildirim Erişimi*, navigasyon için *Erişilebilirlik* izinlerini tanımlayın.
4. **Başla:** "Space, the final frontier..." 🖖

---

*Bu proje Alaz Lab altyapısı ile teknik denetimden geçmiştir.*
