import { Box, Cpu, Globe, Layers, Shield, Puzzle, Smartphone, Music, Zap, Code2, type LucideIcon } from 'lucide-react';

export type HeroVariant = 'browser' | 'mobile' | 'hardware' | 'data' | 'design' | 'default';

export interface CategoryConfig {
  icon: LucideIcon;
  accent: string;        // text color
  accentBg: string;      // bg color
  glow: string;          // blur glow color
  badge: string;         // badge classes
  hero: HeroVariant;
  gradient: string;      // hero overlay gradient
}

export const categoryConfig: Record<string, CategoryConfig> = {
  'AI & Finance': {
    icon: Cpu, accent: 'text-purple-600 dark:text-purple-400', accentBg: 'bg-purple-500',
    glow: 'bg-purple-500/20', badge: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
    hero: 'data', gradient: 'from-purple-950/80 via-background/60 to-transparent',
  },
  'Security': {
    icon: Shield, accent: 'text-red-600 dark:text-red-400', accentBg: 'bg-red-500',
    glow: 'bg-red-500/20', badge: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30',
    hero: 'default', gradient: 'from-red-950/80 via-background/60 to-transparent',
  },
  'Hardware & Embedded': {
    icon: Box, accent: 'text-amber-600 dark:text-amber-400', accentBg: 'bg-amber-500',
    glow: 'bg-amber-500/20', badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    hero: 'hardware', gradient: 'from-amber-950/70 via-background/60 to-transparent',
  },
  'Web & Apps': {
    icon: Globe, accent: 'text-sky-600 dark:text-cyan-400', accentBg: 'bg-sky-500',
    glow: 'bg-cyan-500/20', badge: 'bg-cyan-500/10 text-sky-600 dark:text-cyan-400 border-cyan-500/30',
    hero: 'default', gradient: 'from-cyan-950/70 via-background/60 to-transparent',
  },
  'UI Infrastructure': {
    icon: Layers, accent: 'text-orange-600 dark:text-orange-400', accentBg: 'bg-orange-500',
    glow: 'bg-orange-500/20', badge: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30',
    hero: 'design', gradient: 'from-orange-950/70 via-background/60 to-transparent',
  },
  'Browser Extensions': {
    icon: Puzzle, accent: 'text-emerald-600 dark:text-emerald-400', accentBg: 'bg-emerald-500',
    glow: 'bg-emerald-500/20', badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    hero: 'browser', gradient: 'from-emerald-950/70 via-background/60 to-transparent',
  },
  'Mobil & Oyun': {
    icon: Smartphone, accent: 'text-sky-600 dark:text-sky-400', accentBg: 'bg-sky-500',
    glow: 'bg-sky-500/20', badge: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30',
    hero: 'mobile', gradient: 'from-sky-950/70 via-background/60 to-transparent',
  },
  'Kişisel Üretkenlik': {
    icon: Zap, accent: 'text-amber-600 dark:text-yellow-400', accentBg: 'bg-yellow-500',
    glow: 'bg-yellow-500/20', badge: 'bg-yellow-500/10 text-amber-600 dark:text-yellow-400 border-yellow-500/30',
    hero: 'default', gradient: 'from-yellow-950/70 via-background/60 to-transparent',
  },
  'Medya & Ses': {
    icon: Music, accent: 'text-pink-600 dark:text-pink-400', accentBg: 'bg-pink-500',
    glow: 'bg-pink-500/20', badge: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30',
    hero: 'default', gradient: 'from-pink-950/70 via-background/60 to-transparent',
  },
  'UI Altyapısı': {
    icon: Layers, accent: 'text-orange-600 dark:text-orange-400', accentBg: 'bg-orange-500',
    glow: 'bg-orange-500/20', badge: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30',
    hero: 'design', gradient: 'from-orange-950/70 via-background/60 to-transparent',
  },
  'Web Platformları': {
    icon: Globe, accent: 'text-sky-600 dark:text-cyan-400', accentBg: 'bg-cyan-500',
    glow: 'bg-cyan-500/20', badge: 'bg-cyan-500/10 text-sky-600 dark:text-cyan-400 border-cyan-500/30',
    hero: 'default', gradient: 'from-cyan-950/70 via-background/60 to-transparent',
  },
  'Tasarım & Geliştirici Araçları': {
    icon: Code2, accent: 'text-violet-600 dark:text-violet-400', accentBg: 'bg-violet-500',
    glow: 'bg-violet-500/20', badge: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/30',
    hero: 'design', gradient: 'from-violet-950/70 via-background/60 to-transparent',
  },
};

export const defaultConfig: CategoryConfig = {
  icon: Globe, accent: 'text-muted-foreground', accentBg: 'bg-foreground/30',
  glow: 'bg-foreground/5', badge: 'bg-foreground/5 text-muted-foreground border-border',
  hero: 'default', gradient: 'from-background/90 via-background/60 to-transparent',
};

export const statusConfig: Record<string, string> = {
  'Live':    'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  'Active':  'bg-cyan-500/10 text-sky-600 dark:text-cyan-400 border-cyan-500/30',
  'Stable':  'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30',
  'Early':   'bg-foreground/5 text-muted-foreground border-border',
  'Pending': 'bg-foreground/5 text-muted-foreground/70 border-border',
  'Legacy':  'bg-foreground/[0.03] text-muted-foreground/50 border-border/60',
};

export const statusDot: Record<string, string> = {
  'Live':    'bg-emerald-500 animate-pulse',
  'Active':  'bg-cyan-500',
  'Stable':  'bg-orange-500',
  'Early':   'bg-muted-foreground',
  'Pending': 'bg-muted-foreground/60',
  'Legacy':  'bg-muted-foreground/40',
};
