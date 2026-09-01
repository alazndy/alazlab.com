'use client';

import { useState, useEffect, useRef, type CSSProperties } from 'react';
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
  MessageSquare,
  Wallet,
  Car,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';

interface GTLauncherClientProps {
  version: string;
}

type StyleRecipeId = 'FLAT' | 'GLASS' | 'NEOBRUTALISM' | 'CLAYMORPHISM' | 'MINIMALISM' | 'NEON';

// Values copied verbatim from the app's ui/theme/StyleLibrary.kt
// (StyleRecipe.BUILTIN) — corner radius in dp, fill/border alpha 0..1.
const STYLE_RECIPES: Record<StyleRecipeId, { corner: number; fillAlpha: number; borderPx: number; borderAlpha: number }> = {
  FLAT: { corner: 14, fillAlpha: 1.00, borderPx: 1, borderAlpha: 0.50 },
  GLASS: { corner: 22, fillAlpha: 0.18, borderPx: 1.5, borderAlpha: 0.90 },
  NEOBRUTALISM: { corner: 4, fillAlpha: 0.92, borderPx: 3, borderAlpha: 0.96 },
  CLAYMORPHISM: { corner: 28, fillAlpha: 0.92, borderPx: 0.6, borderAlpha: 0.20 },
  MINIMALISM: { corner: 8, fillAlpha: 0.10, borderPx: 0.8, borderAlpha: 0.28 },
  NEON: { corner: 14, fillAlpha: 0.08, borderPx: 1.5, borderAlpha: 0.95 },
};

function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function cardStyleFor(recipeId: StyleRecipeId, hex: string): CSSProperties {
  const r = STYLE_RECIPES[recipeId];
  const { r: rr, g: gg, b: bb } = hexToRgb(hex);
  const rgb = `${rr}, ${gg}, ${bb}`;
  const isSolid = r.fillAlpha >= 0.5;
  const style: CSSProperties = {
    borderRadius: `${r.corner}px`,
    backgroundColor: `rgba(${rgb}, ${r.fillAlpha})`,
    border: `${r.borderPx}px solid rgba(${rgb}, ${r.borderAlpha})`,
    color: isSolid ? '#000000' : hex,
  };
  if (recipeId === 'NEOBRUTALISM') {
    style.boxShadow = `6px 6px 0 0 rgba(0,0,0,0.85)`;
  } else if (recipeId === 'CLAYMORPHISM') {
    style.backgroundImage = `linear-gradient(180deg, rgba(${rgb}, ${r.fillAlpha}), rgba(${rgb}, ${r.fillAlpha * 0.72}))`;
    style.boxShadow = `0 14px 28px -8px rgba(0,0,0,0.32)`;
  } else if (recipeId === 'GLASS') {
    style.backgroundImage = `linear-gradient(135deg, rgba(${rgb}, ${r.fillAlpha}), rgba(${rgb}, ${r.fillAlpha * 0.4}))`;
    style.backdropFilter = 'blur(10px)';
  } else if (recipeId === 'NEON') {
    style.boxShadow = `0 0 16px rgba(${rgb}, 0.80), 0 0 2px rgba(${rgb}, 0.9)`;
  }
  return style;
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
      solid: 'bg-[#FF9900] text-black border border-black/40',
      iconBg: 'bg-black/10',
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
      solid: 'bg-[#FFCC66] text-black border border-black/40',
      iconBg: 'bg-black/10',
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
      solid: 'bg-[#00CC00] text-black border border-black/40',
      iconBg: 'bg-black/10',
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
      solid: 'bg-[#CC6666] text-black border border-black/40',
      iconBg: 'bg-black/10',
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
      solid: 'bg-[#9999CC] text-black border border-black/40',
      iconBg: 'bg-black/10',
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
      solid: 'bg-[#FF7700] text-black border border-black/40',
      iconBg: 'bg-black/10',
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
      solid: 'bg-[#9977AA] text-black border border-black/40',
      iconBg: 'bg-black/10',
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
      solid: 'bg-[#CC99CC] text-black border border-black/40',
      iconBg: 'bg-black/10',
      specs: [
        { label: isEn ? 'Slicing Algorithm' : 'Dilimleme Algoritması', val: 'Global Grid UV Matrix' },
        { label: isEn ? 'Resolution' : 'Önizleme Çözünürlüğü', val: 'Zero-Lag Hardware Cache' },
        { label: isEn ? 'Source Picker' : 'Görsel Kaynağı', val: 'System SAF & Gallery' },
      ],
    },
  ];

  const [activeFeatureId, setActiveFeatureId] = useState(interactiveFeatures[0].id);
  const activeFeature = interactiveFeatures.find((f) => f.id === activeFeatureId) || interactiveFeatures[0];

  // ── SIDEBAR RAIL: scroll-spy across the flagship block's own sections ──
  // Mirrors the real app's rail: a "HOME" flag tab + a tight stack of solid,
  // permanently-colored icon squares (not a uniform nav that only colors on hover).
  const railSections = [
    { id: 'gt-home', icon: Smartphone, label: isEn ? 'Home' : 'Ana Ekran' },
    { id: 'gt-modules', icon: Layers, label: isEn ? 'Modules' : 'Modüller', solid: 'bg-[#FF9900] text-black' },
    { id: 'gt-styles', icon: Palette, label: isEn ? 'Styles' : 'Stiller', solid: 'bg-[#9999CC] text-black' },
  ];
  const [activeRailId, setActiveRailId] = useState(railSections[0].id);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = railSections
      .map((r) => document.getElementById(r.id))
      .filter((el): el is HTMLElement => !!el);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveRailId(visible.target.id);
      },
      { root: null, rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recipe values copied verbatim from the app's own
  // ui/theme/StyleLibrary.kt (StyleRecipe.BUILTIN) — corner radius (dp),
  // fill alpha, border width/alpha. Not eyeballed from screenshots.
  const visualStyles = [
    { id: 'flat', recipeId: 'FLAT' as const, name: 'FLAT', desc: isEn ? 'Solid fill, subtle border' : 'Düz dolgu, ince kenarlık' },
    { id: 'glass', recipeId: 'GLASS' as const, name: 'GLASS', desc: isEn ? 'Frosted translucent surface' : 'Buzlu yarı saydam yüzey' },
    { id: 'neo', recipeId: 'NEOBRUTALISM' as const, name: isEn ? 'NEO (Neobrutalism)' : 'NEO (Neobrütalizm)', desc: isEn ? 'Hard shadow offset, retro feel' : 'Sert gölge kayması, retro his' },
    { id: 'clay', recipeId: 'CLAYMORPHISM' as const, name: isEn ? 'CLAY (Claymorphism)' : 'CLAY (Kilmorfizm)', desc: isEn ? 'Soft pastel blob with elevation' : 'Kabartmalı yumuşak pastel yüzey' },
    { id: 'minimal', recipeId: 'MINIMALISM' as const, name: 'MINIMAL', desc: isEn ? 'Near-invisible, text-only' : 'Neredeyse görünmez, sade metin' },
    { id: 'neon', recipeId: 'NEON' as const, name: 'NEON', desc: isEn ? 'Glowing outline on a dark surface' : 'Koyu yüzeyde parlayan kenarlık' },
  ];
  const [activeStyleId, setActiveStyleId] = useState<StyleRecipeId>('FLAT');

  const demoCards: { label: string; hex: string; icon: typeof Play }[] = [
    { label: 'MEDIA', hex: '#FF9900', icon: Play },
    { label: 'COMM', hex: '#FF7700', icon: MessageSquare },
    { label: 'FINANCE', hex: '#9999CC', icon: Wallet },
    { label: 'NAV', hex: '#FFCC66', icon: Car },
  ];

  return (
    <div ref={rootRef} className="dark bg-background rounded-[2rem] sm:rounded-[2.5rem] border border-border p-3 sm:p-5 flex gap-3 sm:gap-5">

      {/* ── SIDEBAR RAIL (mirrors the app's own icon rail: HOME flag + stacked solid-color squares) ── */}
      <nav className="hidden sm:flex flex-col shrink-0 sticky top-4 self-start w-14 sm:w-16">
        {/* HOME flag tab — light, flat-bottomed, like the app's status flag */}
        <a
          href="#gt-home"
          aria-label={railSections[0].label}
          title={railSections[0].label}
          className={cn(
            "rounded-tl-[4px] rounded-tr-[20px] text-center text-[10px] font-extrabold uppercase tracking-wider py-1.5 bg-[#FFEECC] text-[#553311] transition-opacity",
            activeRailId === 'gt-home' ? "opacity-100" : "opacity-80 hover:opacity-100"
          )}
        >
          {isEn ? 'HOME' : 'ANA'}
        </a>

        {/* Stacked solid-color icon squares */}
        <div className="flex flex-col gap-1.5 mt-1.5">
          {railSections.slice(1).map((r) => {
            const RailIcon = r.icon;
            const isActive = r.id === activeRailId;
            return (
              <a
                key={r.id}
                href={`#${r.id}`}
                aria-label={r.label}
                title={r.label}
                className={cn(
                  "w-14 h-14 sm:w-16 sm:h-16 rounded-[10px] border border-black/40 flex items-center justify-center transition-all",
                  r.solid,
                  isActive ? "ring-2 ring-white/80 scale-105 shadow-lg" : "opacity-85 hover:opacity-100"
                )}
              >
                <RailIcon className="w-6 h-6" />
              </a>
            );
          })}
          <a
            href="https://play.google.com/store/apps/details?id=com.alazndy.gtlauncher"
            target="_blank"
            rel="noreferrer"
            aria-label={isEn ? 'Get on Google Play' : "Google Play'den İndir"}
            title={isEn ? 'Get on Google Play' : "Google Play'den İndir"}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-[10px] border border-black/40 flex items-center justify-center bg-[#AA4444] text-black opacity-85 hover:opacity-100 transition-all"
          >
            <Play className="w-6 h-6" />
          </a>
        </div>
      </nav>

      {/* ── MAIN CONTENT COLUMN ── */}
      <div className="flex-1 min-w-0 space-y-10">

      {/* ── HERO BANNER ── */}
      <section id="gt-home" className="apple-card p-8 sm:p-12 md:p-14 space-y-8 relative overflow-hidden">
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
      <section id="gt-modules" className="space-y-6">
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
                  "p-3.5 rounded-[14px] text-left transition-all flex flex-col justify-between space-y-3 cursor-pointer",
                  f.solid,
                  isSelected ? "ring-2 ring-white/80 shadow-lg scale-[1.03]" : "opacity-75 hover:opacity-100 hover:scale-[1.015]"
                )}
              >
                <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center", f.iconBg)}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold line-clamp-1">{f.title.split('&')[0].trim()}</div>
                  <div className="text-[10px] font-mono opacity-70 line-clamp-1">{f.badge.split('·')[0].trim()}</div>
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

      {/* ── VISUAL STYLE STUDIO — live, driven by the app's own StyleRecipe values ── */}
      <section id="gt-styles" className="space-y-6">
        <div className="px-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            {isEn ? 'Visual Style Studio' : 'Görsel Stil Stüdyosu'}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            {isEn
              ? 'Pick an engine — the demo cards re-render live using the same corner radius, fill and border values as the app.'
              : 'Bir motor seç — demo kartlar, uygulamadaki aynı köşe yarıçapı, dolgu ve kenarlık değerleriyle anında yeniden çizilir.'}
          </p>
        </div>

        {/* Style pill selector */}
        <div className="flex flex-wrap gap-2">
          {visualStyles.map((s) => {
            const isActive = s.recipeId === activeStyleId;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStyleId(s.recipeId)}
                className={cn(
                  "px-3.5 py-2 rounded-full text-xs font-bold font-mono transition-all",
                  isActive
                    ? "bg-lcars-orange text-black"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {s.name}
              </button>
            );
          })}
        </div>

        {/* Live demo panel */}
        <div className="apple-card p-6 sm:p-8 space-y-6">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <div className="text-sm font-bold text-foreground">
                {visualStyles.find((s) => s.recipeId === activeStyleId)?.name}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {visualStyles.find((s) => s.recipeId === activeStyleId)?.desc}
              </div>
            </div>
            <div className="flex gap-4 text-[10px] font-mono text-muted-foreground">
              <span>{isEn ? 'CORNER' : 'KÖŞE'} {STYLE_RECIPES[activeStyleId].corner}dp</span>
              <span>{isEn ? 'FILL' : 'DOLGU'} {Math.round(STYLE_RECIPES[activeStyleId].fillAlpha * 100)}%</span>
              <span>{isEn ? 'BORDER' : 'KENARLIK'} {STYLE_RECIPES[activeStyleId].borderPx}px</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-sm mx-auto">
            {demoCards.map((c) => {
              const CardIcon = c.icon;
              return (
                <div
                  key={c.label}
                  style={cardStyleFor(activeStyleId, c.hex)}
                  className="aspect-square p-4 flex flex-col justify-between transition-[background-color,border-color,box-shadow,border-radius] duration-300"
                >
                  <CardIcon className="w-5 h-5" />
                  <div className="text-sm font-extrabold tracking-wide">{c.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      </div>
      {/* end main content column */}

    </div>
  );
}
