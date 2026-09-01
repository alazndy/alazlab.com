'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone,
  Layers,
  Palette,
  Compass,
  Search,
  Gauge,
  Cpu,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shield,
  Sliders,
  ExternalLink,
  Play,
  RotateCcw,
  Image as ImageIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';

interface GTLauncherClientProps {
  version: string;
}

export function GTLauncherClient({ version }: GTLauncherClientProps) {
  const { t, lang } = useI18n();
  const isEn = lang === 'en';

  const interactiveFeatures = [
    {
      id: 'builder',
      title: isEn ? '5-Tab Card Builder' : '5 Sekmeli Kart Üreticisi',
      badge: isEn ? 'Modular UI System' : 'Modüler Arayüz Mimarisi',
      desc: isEn
        ? 'Construct bespoke widget cards step-by-step: configure capabilities (system monitors, crypto tickers, weather, media), behaviors, visual styles, dimensions, and custom image backdrops.'
        : 'Sıfırdan özel kartlar inşa edin: yetenekler (sistem monitörleri, kripto takibi, hava durumu, medya), davranışlar, görsel stiller, boyutlar ve özel görsel katmanları adım adım yapılandırın.',
      gif: '/projects/GT-Launcher/card-builder-demo.gif',
      icon: Layers,
      color: 'text-apple-blue',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      specs: [
        { label: isEn ? 'Card Capabilities' : 'Modül Yetenekleri', val: '19+ UCCS Nodes' },
        { label: isEn ? 'Visual Styles' : 'Görsel Stiller', val: '6 Engine Modes' },
        { label: isEn ? 'Grid Constraints' : 'Izgara Ölçüsü', val: '1x1 to 4x4 Cells' },
      ],
    },
    {
      id: 'themes',
      title: isEn ? 'Dynamic LCARS Theme Engine' : 'Dinamik LCARS Tema Motoru',
      badge: isEn ? 'Real-Time Shader Pipeline' : 'Gerçek Zamanlı Renk Motoru',
      desc: isEn
        ? 'Create and fine-tune dynamic color palettes with contrast curve computation. Features wallpaper pinch-to-crop and GPU-accelerated background blur synthesis.'
        : 'Kontrast eğrisi hesaplamaları ile dinamik renk paletleri oluşturun ve özelleştirin. Canlı duvar kağıdı kırpma ve GPU hızlandırmalı arka plan bulanıklaştırma içerir.',
      gif: '/projects/GT-Launcher/theme-creator-demo.gif',
      icon: Palette,
      color: 'text-apple-orange',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20',
      specs: [
        { label: isEn ? 'Color Channels' : 'Renk Kanalları', val: '7 LCARS Hues' },
        { label: isEn ? 'Wallpaper Slicer' : 'Duvar Kağıdı Dilimleme', val: 'Pinch-to-Crop UV' },
        { label: isEn ? 'Presets' : 'Hazır Temalar', val: '12 Official Presets' },
      ],
    },
    {
      id: 'grid',
      title: isEn ? 'Fluid 2D Grid Drag & Resize' : 'Akıcı 2D Izgara ve Boyutlandırma',
      badge: isEn ? 'SubcomposeLayout Engine' : 'Compose SubcomposeLayout',
      desc: isEn
        ? 'Direct physical drag-and-drop widget arrangement with collision physics, snap-to-grid ergonomics, and real-time live layout re-calculation.'
        : 'Çarpışma fiziği, ızgaraya yapışma ergonomisi ve gerçek zamanlı düzen hesaplaması ile doğrudan fiziksel sürükle-bırak kart yerleşimi.',
      gif: '/projects/GT-Launcher/grid-drag-resize.gif',
      icon: Sliders,
      color: 'text-apple-green',
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
      specs: [
        { label: isEn ? 'Measure Phase' : 'Hesaplama Fazı', val: '< 1.2 ms per frame' },
        { label: isEn ? 'Re-flow' : 'Akış Düzeni', val: 'Non-destructive' },
        { label: isEn ? 'Lock Mode' : 'Kilit Modu', val: 'One-touch Guard' },
      ],
    },
    {
      id: 'drive',
      title: isEn ? 'Drive Mode & OBD Telemetry' : 'Sürüş Modu ve OBD Telemetrisi',
      badge: isEn ? 'Automotive BLE Integration' : 'Otomotiv BLE Entegrasyonu',
      desc: isEn
        ? 'High-contrast automotive cockpit interface reading real-time engine metrics, GPS ground speed, radar distance warnings, and diagnostic trouble codes (DTCs).'
        : 'Gerçek zamanlı motor telemetrisi, GPS yer hızı, radar mesafe uyarıları ve arıza teşhis kodlarını (DTC) okuyan yüksek kontrastlı kokpit arayüzü.',
      gif: '/projects/GT-Launcher/vehicle-obd-settings.gif',
      icon: Gauge,
      color: 'text-apple-purple',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
      specs: [
        { label: isEn ? 'Protocol' : 'Protokol', val: 'ELM327 BLE / CAN' },
        { label: isEn ? 'Refresh Rate' : 'Yenileme Hızı', val: '20 Hz Sensor Loop' },
        { label: isEn ? 'Safety Mode' : 'Güvenlik Modu', val: 'Night HUD Contrast' },
      ],
    },
    {
      id: 'search',
      title: isEn ? 'Omni-Search & App Drawer' : 'OmniSearch ve Uygulama Çekmecesi',
      badge: isEn ? 'Sub-Millisecond Indexer' : 'Hafif İndeksleme Çekirdeği',
      desc: isEn
        ? 'Universal command deck indexing installed packages, Play Store shortcuts, device settings, and web search results in a single unified stroke.'
        : 'Yüklü paketleri, Play Store kısayollarını, cihaz ayarlarını ve web aramalarını tek komuta çubuğunda anlık indeksleyen arama çekirdeği.',
      gif: '/projects/GT-Launcher/omnisearch-demo.gif',
      icon: Search,
      color: 'text-apple-cyan',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
      specs: [
        { label: isEn ? 'Lookup Latency' : 'Arama Gecikmesi', val: '< 0.8 ms instant' },
        { label: isEn ? 'Categories' : 'Kategoriler', val: 'Smart Clustering' },
        { label: isEn ? 'Index Store' : 'Depolama', val: 'In-memory Cache' },
      ],
    },
    {
      id: 'tour',
      title: isEn ? 'Interactive System Tour' : 'İnteraktif Sistem Turu',
      badge: isEn ? 'Zero-Friction Onboarding' : 'Kullanıcı Deneyimi',
      desc: isEn
        ? 'Guided introductory walkthrough demonstrating swipe gestures, drawer reveals, module pinning, and emergency launcher defaults.'
        : 'Kaydırma hareketlerini, çekmece açılışlarını, modül sabitlemeyi ve varsayılan başlatıcı ayarlarını adım adım gösteren rehber.',
      gif: '/projects/GT-Launcher/interactive-tour-demo.gif',
      icon: Compass,
      color: 'text-apple-orange',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20',
      specs: [
        { label: isEn ? 'Gesture Engine' : 'Jest Motoru', val: 'Multi-Directional' },
        { label: isEn ? 'Haptic' : 'Titreşim', val: 'Tactile Feedback' },
        { label: isEn ? 'Profiles' : 'Profiller', val: 'Export & Import JSON' },
      ],
    },
    {
      id: 'card-art',
      title: isEn ? 'Card Art & Color Wheel' : 'Kart İçi Sanat & Renk Çarkı',
      badge: isEn ? 'Per-Card Background & Tint' : 'Kart İçi Görsel & Renk Teorisi',
      desc: isEn
        ? 'Embed bespoke photographs into individual widget cards with opacity tuning, text color overrides, custom icon glyphs, and harmonic 360° color-theory wheel palettes.'
        : 'Her widget kartının içine bağımsız fotoğraf yerleştirin; opaklık katmanları, metin rengi geçersiz kılma, özel ikonlar ve renk teorisi armonileri sunan 360° renk çarkı ile kişiselleştirin.',
      gif: '/projects/GT-Launcher/card-customization-demo.gif',
      icon: ImageIcon,
      color: 'text-pink-400',
      bg: 'bg-pink-500/10',
      border: 'border-pink-500/20',
      specs: [
        { label: isEn ? 'Backdrop Engine' : 'Görsel Katmanı', val: 'Per-Card Surface UV' },
        { label: isEn ? 'Color Theory' : 'Renk Teorisi', val: 'Analogous / Triadic / Hex' },
        { label: isEn ? 'Layer Controls' : 'Katman Ayarları', val: 'Opacity + Tint Filter' },
      ],
    },
    {
      id: 'foreground-slice',
      title: isEn ? 'Foreground Photo Mosaic' : 'Ön Plan Fotoğraf Mozaiği',
      badge: isEn ? 'Multi-Card UV Grid Slicer' : 'Çoklu Kart UV Izgara Dilimleyici',
      desc: isEn
        ? 'Position an overarching photograph over the active launcher layout. The system computes exact cell UV bounds, slicing the image across cards into an interactive dynamic mosaic.'
        : 'Tüm ızgaranın üzerine tek bir fotoğraf konumlandırın; sistem her kartın koordinatını hesaplayarak görseli kartlar arasında etkileşimli bir mozaik gibi dilimler.',
      gif: '/projects/GT-Launcher/foreground-image-slice.gif',
      icon: Sparkles,
      color: 'text-apple-cyan',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
      specs: [
        { label: isEn ? 'Slicing Algorithm' : 'Dilimleme Algoritması', val: 'Global Grid UV Matrix' },
        { label: isEn ? 'Resolution' : 'Önizleme Çözünürlüğü', val: 'Zero-Lag Hardware Cache' },
        { label: isEn ? 'Source Picker' : 'Görsel Kaynağı', val: 'System SAF & Gallery' },
      ],
    },
  ];

  const [activeFeatureId, setActiveFeatureId] = useState(interactiveFeatures[0].id);
  const activeFeature = interactiveFeatures.find((f) => f.id === activeFeatureId) || interactiveFeatures[0];

  const visualStyles = [
    {
      id: 'flat',
      name: 'FLAT',
      desc: isEn ? 'Solid fill, subtle border' : 'Düz dolgu, ince kenarlık',
      photo: '/projects/GT-Launcher/assets/customization/styles/flat.jpg',
    },
    {
      id: 'glass',
      name: 'GLASS',
      desc: isEn ? 'Frosted translucent surface' : 'Buzlu yarı saydam yüzey',
      photo: '/projects/GT-Launcher/assets/customization/styles/glass.jpg',
    },
    {
      id: 'neo',
      name: isEn ? 'NEO (Neobrutalism)' : 'NEO (Neobrütalizm)',
      desc: isEn ? 'Hard shadow offset, retro feel' : 'Sert gölge kayması, retro his',
      photo: '/projects/GT-Launcher/assets/customization/styles/neobrutalism.jpg',
    },
    {
      id: 'clay',
      name: isEn ? 'CLAY (Claymorphism)' : 'CLAY (Kilmorfizm)',
      desc: isEn ? 'Soft pastel blob with elevation' : 'Kabartmalı yumuşak pastel yüzey',
      photo: '/projects/GT-Launcher/assets/customization/styles/claymorphism.jpg',
    },
    {
      id: 'minimal',
      name: 'MINIMAL',
      desc: isEn ? 'Near-invisible, text-only' : 'Neredeyse görünmez, sade metin',
      photo: '/projects/GT-Launcher/assets/customization/styles/minimalism.jpg',
    },
    {
      id: 'neon',
      name: 'NEON',
      desc: isEn ? 'Glowing outline on a dark surface' : 'Koyu yüzeyde parlayan kenarlık',
      photo: '/projects/GT-Launcher/assets/customization/styles/neon.jpg',
    },
  ];

  return (
    <div className="dark bg-background rounded-[2rem] sm:rounded-[2.5rem] border border-border p-3 sm:p-5 space-y-10">

      {/* ── HERO BANNER ── */}
      <section className="apple-card p-8 sm:p-12 md:p-14 space-y-8 relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold bg-blue-500/10 text-apple-blue border border-blue-500/20">
              <Smartphone className="w-3.5 h-3.5" />
              Android 12+ · Jetpack Compose
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-muted text-foreground/80 border border-border">
              {version || 'v4.2.15'} Latest
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono text-apple-green bg-green-500/10 border border-green-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Google Play Verified
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.02]">
            GT-Launcher
          </h1>

          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed font-normal max-w-2xl">
            {isEn
              ? 'Star Trek LCARS-inspired modular Android home screen ecosystem. Features capability-based card builder, sub-millisecond OmniSearch, and OBD-II vehicle HUD telemetry.'
              : 'Star Trek LCARS estetiğinde, tamamen modüler kart sistemine sahip Android ana ekran ekosistemi: 5 sekmeli kart üretici, anlık OmniSearch ve OBD-II araç HUD telemetrisi.'}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="https://play.google.com/store/apps/details?id=com.alazndy.gtlauncher"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-lcars-orange text-black hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-orange-500/25"
          >
            <Smartphone className="w-4 h-4" />
            <span>{isEn ? 'Get on Google Play' : "Google Play'den İndir"}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>

        {/* Hardware & Engineering Performance Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-border text-xs">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-lcars-gold font-mono">&lt; 180 ms</div>
            <div className="text-muted-foreground mt-0.5">{isEn ? 'Cold Startup' : 'Soğuk Başlatma'}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-apple-green font-mono">120 FPS</div>
            <div className="text-muted-foreground mt-0.5">{isEn ? 'Compose Render Loop' : 'Akıcı Yenileme'}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-apple-orange font-mono">&lt; 45 MB</div>
            <div className="text-muted-foreground mt-0.5">{isEn ? 'Idle Memory' : 'Boşta RAM Tüketimi'}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-apple-purple font-mono">100%</div>
            <div className="text-muted-foreground mt-0.5">{isEn ? 'Local & Private' : 'Yerel Depolama'}</div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE WORKSPACE PREVIEW ── */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              {isEn ? 'Interactive Feature Matrix' : 'İnteraktif Modül Vitrini'}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {isEn
                ? 'Select a module below to inspect live recordings, architecture design, and technical parameters.'
                : 'Aşağıdaki modüllerden birini seçerek canlı kayıtları, mimari kararları ve teknik parametreleri inceleyin.'}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-mono text-apple-green bg-green-500/10 px-3 py-1 rounded-md border border-green-500/20 w-fit">
            <span className="w-2 h-2 rounded-full bg-apple-green animate-pulse" />
            {interactiveFeatures.length} Live Demos
          </span>
        </div>

        {/* Feature Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {interactiveFeatures.map((f) => {
            const Icon = f.icon;
            const isSelected = f.id === activeFeatureId;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFeatureId(f.id)}
                className={cn(
                  "p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 cursor-pointer",
                  isSelected
                    ? "apple-card border-lcars-orange ring-2 ring-lcars-orange/20 bg-card shadow-md scale-[1.02]"
                    : "border-border bg-card/60 hover:bg-muted/70 text-muted-foreground hover:text-foreground"
                )}
              >
                <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center border", f.bg, f.border, f.color)}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground line-clamp-1">{f.title.split('&')[0].trim()}</div>
                  <div className="text-[10px] font-mono text-muted-foreground line-clamp-1">{f.badge.split('·')[0].trim()}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Stage */}
        <div className="apple-card p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Device Mockup Displaying the Live GIF */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              className={cn(
                "relative w-full rounded-[2.5rem] overflow-hidden border-4 border-border shadow-2xl bg-black transition-all duration-500",
                activeFeature.id === 'drive' ? "max-w-md sm:max-w-lg aspect-[18/10]" : "max-w-xs sm:max-w-sm aspect-[9/19]"
              )}
            >
              {/* Device Notch / Status Pill */}
              {activeFeature.id !== 'drive' && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-muted/80 backdrop-blur rounded-b-2xl z-20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-border mr-2" />
                  <div className="w-10 h-1 bg-border rounded-full" />
                </div>
              )}

              {/* Dynamic GIF Display */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature.gif}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-full bg-black flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={activeFeature.gif}
                    alt={activeFeature.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Bottom Home Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full z-20" />
            </div>
          </div>

          {/* Right: Technical Breakdown */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold border", activeFeature.bg, activeFeature.border, activeFeature.color)}>
                {activeFeature.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                {activeFeature.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {activeFeature.desc}
              </p>
            </div>

            {/* Spec Matrix */}
            <div className="p-4 rounded-2xl bg-muted/60 border border-border space-y-2.5">
              <div className="text-[11px] font-bold font-mono text-foreground uppercase tracking-wider border-b border-border pb-2">
                {isEn ? 'ENGINEERING METRICS' : 'MÜHENDİSLİK PARAMETRELERİ'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {activeFeature.specs.map((s) => (
                  <div key={s.label} className="space-y-0.5">
                    <div className="text-xs font-bold text-foreground font-mono">{s.val}</div>
                    <div className="text-[10px] text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── VISUAL STYLE GALLERY ── */}
      <section className="space-y-6">
        <div className="px-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            {isEn ? 'Visual Style Gallery' : 'Görsel Stil Galerisi'}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            {isEn
              ? 'The same home screen, rendered through each of the 6 card style engines.'
              : 'Aynı ana ekran, 6 kart görsel stil motorunun her birinden geçirilmiş haliyle.'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {visualStyles.map((s) => (
            <div key={s.id} className="apple-card overflow-hidden group">
              <div className="relative aspect-[9/12] overflow-hidden bg-black">
                <img
                  src={s.photo}
                  alt={`${s.name} — ${s.desc}`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-3.5 space-y-0.5">
                <div className="text-xs font-bold text-foreground font-mono">{s.name}</div>
                <div className="text-[11px] text-muted-foreground leading-snug">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
