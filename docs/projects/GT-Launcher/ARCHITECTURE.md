# GT-Launcher Architecture

A human-readable engineering deep-dive into how GT-Launcher is built. For a token-optimized, always-current file-by-file map (kept in sync automatically), see [SIGMAP.md](./SIGMAP.md) instead — this document explains *why* the pieces are shaped the way they are; SIGMAP tells you *where* everything is.

## App Shell

GT-Launcher is a **single-Activity app with no Jetpack Navigation-Compose**. `MainActivity` is the only declared Activity (`AndroidManifest.xml`), carrying the `HOME`/`DEFAULT`/`LAUNCHER` intent-filters that let Android use it as a home screen replacement. Screen switching happens entirely through `mutableState` flags (`showAppList`, `showDriveMode`, `showEngineeringPanel`, etc.) branched with `AnimatedContent` directly inside `setContent { }`. There's a fixed render order: an unauthorized-signature gate first, then onboarding, then the Home/App-Drawer `AnimatedContent` swap with Drive Mode and dialog overlays layered on top. A custom intent action (`com.alazndy.gtlauncher.action.OPEN_ENGINEERING`) lets other surfaces deep-link straight into a specific Engineering Panel section.

## The Card / Capability System (UCCS)

The core abstraction is the **Unified Card Capability System**. A `CardItem` (`data/CardItem.kt`) is the single source of truth for one home-screen card: its grid position, size, styling, and — critically — a `capabilities: List<CardCapability>`. `CardCapability` (`data/CardCapability.kt`) is a sealed interface with one data class per capability (App Launch, Notifications, Finance, Note, and so on — 19 in total), so a card isn't "a Finance card" or "a Notes card," it's a surface that *hosts* one or more capabilities at once.

Rendering follows a plugin pattern: `CardRegistry.kt` maps each legacy `CardType` to a `CardDescriptor` (used by the "Add Card" grid), and `CardPlugins.kt` defines one `object XxxPlugin : CardPlugin(...)` per type, each implementing a single `Content(ctx: CardRenderContext)` composable. `DynamicCardRenderer.kt` resolves a card's capability list at render time and dispatches into the right plugin(s) — this is how capability *stacking* (e.g. App Launch + Notifications on one card) actually renders: the primary capability's plugin draws the surface, secondary capabilities layer on top. `CardCapabilityRegistry` enforces which capabilities can legally coexist, grouped by `CapabilityGroup` (PRIMARY/COMMUNICATION/ACTION/UTILITY) with explicit conflict sets.

Adding a new card type is deliberately a two-step change: one `CardDescriptor` in `CardRegistry.kt`, one `when` branch in `DynamicCardRenderer.kt`.

## Grid Engine

`data/GridEngine.kt` is a pure, Android-independent, fully unit-testable object — no Compose, no Context. It owns:
- **Placement** (`resolveMove`) — cascades overlapping cards downward rather than blocking a move outright.
- **Smart drag preview** (`previewSmartMove`) — scores nearby candidate cells by how much they'd disturb the existing layout, producing the live ghost-preview while dragging.
- **Free-slot search** (`findFreeSlot`) — row-major scan for where a newly-added card should land.
- **Gravity/compaction** (`settleCards`) — closes gaps after cards move or get deleted, with pin support so the card being actively dragged doesn't get swept out from under the user's finger.

Column count is user-configurable (2–12, default 6); there is no separate row count — the grid simply grows to fit however many cards exist.

## State Layer

`ui/screens/HomeViewModel.kt` (an `AndroidViewModel`) owns the live, in-memory card list and every interaction that mutates it: drag/drop, resize, free-form (non-grid-snapped) positioning, add/remove, and a 20-entry undo stack. It also owns the **Adaptive layout engine** — a Premium feature that watches tap-heatmap usage data (Room-backed `TapEvent`/`CardUsageStats`) and proposes a resized/repositioned layout, shown as a 10-second countdown preview the user can accept or revert.

## Persistence

There is no single unified persistence layer — storage is split by domain, and that split is itself a piece of the app's history:

- **`LayoutDatabase`** (Room, `lcars_layout.db`, schema v17, 14 hand-written migrations) — the card layout itself. On first load, if the table is empty, it migrates forward from an older raw-SharedPreferences JSON blob, or falls back to a hardcoded default layout.
- **`TripDatabase`** (Room, `lcars_trips.db`) — Drive Mode trips and fuel fill-ups.
- **Five separate Jetpack DataStore files** (theme, sidebar, drawer, adaptive, premium prefs) — each with its own `migrateFromSharedPrefs()` run once at construction to pull forward values from the pre-DataStore era.
- **Raw `SharedPreferences`** (`lcars_prefs`) — still backs settings that haven't been migrated to DataStore yet, including onboarding-seen flags and Gson-serialized Layout Presets.
- **Full profile export/import** (`data/ProfileData.kt`'s `GtProfile`, 150+ fields) — a flat snapshot of nearly every setting plus the card layout, serialized to a user-picked JSON file via the Storage Access Framework. This is the actual "backup my launcher" mechanism, distinct from per-layout Presets.

The `lcars_*` naming throughout the persistence layer is a legacy holdover from the app's earlier branding — internal identifiers only, invisible to users, left as-is because renaming them would mean writing yet another migration for a purely cosmetic win.

## Theming

Two orthogonal systems compose together, deliberately kept separate:

- **`GtTheme.kt`** — *color*. `GtThemeType` resolves to a `GtColorScheme` via a priority chain: hourly-adaptive override → theme-type lookup → `BATTERY` mode (remaps by charge level) → `WEATHER_AUTO` mode (remaps by live weather condition) → `CUSTOM` (three user-picked hex colors). Dark mode swaps only background/surface/text tokens, leaving accents identical between light and dark.
- **`VisualStyle.kt`** — *shape and material*. Six styles (Flat, Glass, Neobrutalism, Claymorphism, Minimalism, Neon), each with its own adjustable parameter set, all funneled through one shared `CardStyleProfile` contract that `GtCardSurface` actually paints from — so every card, regardless of style, renders through the same code path.

A card can override either system independently at the per-card level.

## Feature Modules

| Feature | Entry points |
|---|---|
| **App Drawer** | `ui/screens/AppDrawerScreen.kt`, `data/AppRepository.kt` (live, package-change-reactive), `data/DepartmentClassifier.kt` (keyword-based auto-sort) |
| **Omni-Terminal (search)** | `data/omni/OmniSearchEngine.kt` (multi-source aggregator: calculator, apps, contacts, calendar, web/Maps/Play Store, system settings), `ui/screens/OmniResultsPanel.kt` — lives inside the App Drawer's search bar |
| **Notes** | `ui/components/NoteFormatting.kt` (bold/checkbox/hyperlink parser, deliberately not a single `AnnotatedString` so link taps don't fight the card's gesture detector), `ui/components/NoteCard.kt` |
| **Finance** | `data/FinanceHolding.kt`, `services/FinanceDataProvider.kt` (CoinGecko/Frankfurter/Twelve Data/Yahoo fallback chain), `data/FinancePnl.kt`, `ui/components/FinanceCard.kt` (includes clash-avoidance logic so P&L text never blends into the card's own background) |
| **Drive Mode** | `services/DriveModeManager.kt` (auto-triggers on landscape or paired-car Bluetooth), `ui/screens/drive/*` (map HUD, OBD telemetry, media controls, fuel-receipt OCR) |
| **Onboarding** | `ui/screens/onboarding/OnboardingFlow.kt` — 3-step state machine, Quick vs. Guided card setup |
| **Premium/Billing** | `data/billing/BillingRepository.kt` (Play Billing wrapper), `data/billing/PremiumManager.kt` (entitlement = debug bypass OR grandfathered-legacy-user OR cached purchase) |
| **Engineering Panel (Settings)** | `ui/screens/GtEngineeringPanel.kt` routing to per-tab files under `ui/screens/engineering/` |

## Why Not X

A few internal names don't match the public "GT Launcher" branding — this is intentional debt, not an oversight:
- `lcars_prefs`, `lcars_layout.db`, `lcarsLeftGuideWidth` — survive from the app's earlier LCARS-themed identity. The user-facing brand fully moved to "GT Launcher" (with a deliberately-retained Star Trek voice in copy and flavor text), but renaming these internal keys would require a data migration for zero user-visible benefit.
- Engineering Panel section keys `TERMINAL`, `DATA`, `HARDWARE`, and `INTERFACE` are legacy aliases that route to the current `SYSTEM` and `VISUAL` sections respectively (`EngineeringSectionProvider`) — old saved section-order preferences and deep links using the old keys still resolve correctly.
