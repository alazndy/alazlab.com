'use client';

import {
  Shield,
  Layers,
  Zap,
  Wrench,
  Terminal,
  Cpu,
  Smartphone,
  Globe2,
  CheckCircle2,
  Building,
  MapPin,
} from 'lucide-react';
import { SystemTower } from '@/components/ui/SystemTower';
import { useI18n } from '@/lib/i18n';

export default function HakkimdaPage() {
  const { t, lang } = useI18n();
  const isEn = lang === 'en';

  const principles = isEn ? [
    {
      title: 'End-to-End Ownership',
      desc: 'Taking full responsibility from schematic and PCB routing to firmware implementation, backend services, and user interfaces.',
      icon: Layers,
    },
    {
      title: 'Measured Reliability',
      desc: 'Relying on hardware logic analyzer traces, oscilloscope measurements, and benchmark metrics rather than assumptions.',
      icon: Zap,
    },
    {
      title: 'Zero Unnecessary Complexity',
      desc: 'Building robust, maintainable systems with clean architecture, strict error handling, and concrete purpose.',
      icon: Shield,
    },
  ] : [
    {
      title: 'Uçtan Uca Sorumluluk',
      desc: 'Şematik ve PCB çiziminden gömülü firmware yazımına, backend servislerinden kullanıcı arayüzlerine kadar tüm katmanları sahiplenme.',
      icon: Layers,
    },
    {
      title: 'Ölçülen Güvenilirlik',
      desc: 'Varsayımlar yerine gerçek CAN lojik analizör sinyalleri, osiloskop ölçümleri ve benchmark test sonuçlarına dayanma.',
      icon: Zap,
    },
    {
      title: 'Sıfır Gereksiz Karmaşıklık',
      desc: 'Süs ve yapay gösterişten uzak, sağlam hata yönetimi ve net amaca hizmet eden temiz sistem mimarisi.',
      icon: Shield,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-16 pb-24 px-2 sm:px-4">

      {/* ── HEADER ── */}
      <section className="apple-card p-8 sm:p-12 space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
            Göktuğ Turhan
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground pt-1">
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <Building className="w-4 h-4 text-apple-orange" />
              ADC Tasarım
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-apple-blue" />
              İstanbul, Türkiye
            </span>
            <span>·</span>
            <span className="text-apple-orange font-semibold font-mono text-xs">
              {t('hero.role')}
            </span>
          </div>
        </div>

        <p className="text-base sm:text-lg text-foreground/90 leading-relaxed max-w-4xl font-normal">
          {isEn
            ? 'Hardware and software engineer with over 5 years of experience developing mission-critical embedded electronics, vehicle CAN-bus radar controllers, and independent software applications.'
            : '5 yılı aşkın süredir gerçek sahada çalışan endüstriyel elektronik kartlar, ağır vasıta CAN-bus radar kontrol üniteleri ve bağımsız yazılım sistemleri geliştiren donanım ve yazılım mühendisi.'}
        </p>
      </section>

      {/* ── TWO SIDES OF MY WORK ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Field Engineering */}
        <div className="apple-card p-8 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-apple-orange">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {isEn ? 'Field & Hardware Engineering' : 'Saha ve Donanım Mühendisliği'}
              </h2>
              <div className="text-xs text-muted-foreground">ADC Tasarım</div>
            </div>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {isEn
              ? 'At ADC Design, I design and produce embedded hardware operating under harsh industrial and vehicle conditions. My focus includes ESP32 and STM32 microcontroller integration, 24V vehicle power regulation, isolated digital/analog I/O, and Brigade BS-9000 radar communication over CAN 2.0B / FD bus.'
              : 'ADC Tasarım bünyesinde maden sahalarında, ağır vasıtalarda ve liman tesislerinde doğrudan çalışan gömülü donanımlar tasarlıyorum. ESP32 ve STM32 mikrodenetleyici kartları, 24V araç güç regülasyonu, izole I/O üniteleri ve CAN 2.0B / FD hattı üzerinden Brigade BS-9000 radar entegrasyonu ana uzmanlık alanlarımdır.'}
          </p>

          <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/80 pt-2 border-t border-border">
            {[
              isEn ? 'UniControl V2: ESP32-S3 vehicle radar controller with CAN bus' : 'UniControl V2: CAN-bus destekli ESP32-S3 araç radar kontrol kartı',
              isEn ? 'Guardian Glass Egypt: Forklift fleet collision avoidance deployment' : 'Guardian Glass Mısır: Forklift filosu çarpışma önleme saha kurulumu',
              isEn ? 'RCPS: Industrial remote control and power switching unit' : 'RCPS: Endüstriyel uzaktan kontrol ve güç anahtarlama ünitesi',
              isEn ? 'ISO 16750 environmental and electrical validation testing' : 'ISO 16750 otomotiv çevresel ve elektriksel dayanım testleri',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-apple-orange shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Independent Software */}
        <div className="apple-card p-8 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-apple-blue">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {isEn ? 'Independent Software Architecture' : 'Bağımsız Yazılım Mimarisi'}
              </h2>
              <div className="text-xs text-muted-foreground">Lab & Open Source</div>
            </div>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {isEn
              ? 'Outside of hardware, I develop independent software across mobile, systems, and web layers. I prioritize native performance, type safety, modular component systems, and clean ergonomics.'
              : 'Donanımın dışında mobil, sistem programlama ve modern web katmanlarında bağımsız yazılımlar mimarlıyorum. Yerel performans, tip güvenliği, modüler bileşen sistemleri ve temiz kullanıcı deneyimine odaklanıyorum.'}
          </p>

          <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/80 pt-2 border-t border-border">
            {[
              isEn ? 'GT-Launcher: Kotlin & Jetpack Compose Android launcher with custom widgets' : 'GT-Launcher: Kotlin ve Jetpack Compose ile yazılmış modüler Android başlatıcı',
              isEn ? 'R-AI-OS: Local asynchronous CLI task runner written in Rust' : 'R-AI-OS: Rust ve Tokio ile geliştirilmiş yerel asenkron komut motoru',
              isEn ? 'GTab: Chrome new-tab workspace with offline-first state' : 'GTab: Google servisleriyle senkronize çalışan Chrome yeni sekme uzantısı',
              isEn ? 'tek-ui: Reusable TypeScript and Tailwind CSS component primitives' : 'tek-ui: Yeniden kullanılabilir TypeScript ve Tailwind bileşen paketi',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-apple-blue shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </section>

      {/* ── CORE PRINCIPLES ── */}
      <section className="space-y-6">
        <div className="px-1">
          <h2 className="text-2xl font-bold text-foreground">
            {isEn ? 'Engineering Principles' : 'Mühendislik İlkeleri'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="apple-card p-6 sm:p-8 space-y-4">
                <div className="w-11 h-11 rounded-2xl bg-muted border border-border flex items-center justify-center text-apple-blue">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-foreground">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── SYSTEM ARCHITECTURE TOWER ── */}
      <section className="space-y-6">
        <div className="px-1">
          <h2 className="text-2xl font-bold text-foreground">
            {isEn ? 'System Architecture Hierarchy' : 'Sistem Mimarisi Katmanları'}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {isEn
              ? 'Physical hardware board layer up through operating system firmware, kernel runtimes, and user interfaces.'
              : 'Fiziksel donanım katmanından gömülü firmware, işletim sistemi çekirdeği ve kullanıcı arayüzüne kadar uzanan mimari.'}
          </p>
        </div>

        <SystemTower />
      </section>

    </div>
  );
}
