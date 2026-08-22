# Customization: Deep Dive into the Grid Engine & Card Builder

##  How the Grid Works

The launcher divides your screen into a matrix.
- **Columns (X):** Configurable from 2 to 12 — default **6** (**Engineering → HOME → GRID ENGINE**).
- **Rows (Y):** Not a fixed count. The grid simply grows to fit however many cards you place — there's no rows setting to configure.
- **Cell Height:** Set by **Grid Cell Size**, 32–80dp, default **44dp**.

### The "Snap-to-Grid" Logic
When you drag a card, the engine (`GridEngine.kt`) tracks the nearest free cell live and scores nearby candidate positions by how much they'd disturb your existing layout — that's the ghost-preview you see while dragging. On drop, if the target cell is occupied, GT-Launcher **cascades the blocking card(s) downward** to make room rather than rejecting the move outright. A gravity pass then settles everything so nothing floats over empty rows.

Each card's minimum size is enforced per capability (e.g. a Gallery card can't shrink below the size it needs to show art) — the resize handle simply won't let you go smaller.

---

##  Capability-Based Card Builder (v4.7+)

GT-Launcher uses a **Unified Card Capability System (UCCS)**. Cards are not a fixed type — they're a surface that can host one or more capabilities simultaneously.

### Creating a Card
Triple-tap an empty grid cell to enter **Edit Mode**, then tap **ADD** in the edit toolbar. The builder opens with 5 tabs:

![Card builder walkthrough — FUNCTION, BEHAVIOR, APPEARANCE, LAYOUT, VISUAL](assets/customization/card-builder-5-tabs.gif)

| Tab | What you configure |
|---|---|
| **FUNCTION** | Pick one or more capabilities for this card |
| **BEHAVIOR** | Tap/swipe actions, camera mode, gallery album, notification filter |
| **APPEARANCE** | Palette color, custom accent HEX, text color, live mini-preview |
| **LAYOUT** | Grid position (col/row) and span (width × height) |
| **VISUAL** | Visual style override (inherits the global style by default) |

### All 19 Capabilities

The FUNCTION tab's module picker lists every capability the launcher supports — nothing is hidden, though incompatible combinations are greyed out with an on-screen reason instead of blocked silently.

| Group | Capabilities |
|---|---|
| **PRIMARY** | Widget · Gallery · Media Control · App Drawer · Clock · Weather · Finance |
| **COMMUNICATION** | Notifications · Comms |
| **ACTION** | App Launch · Camera · Flashlight |
| **UTILITY** | System Stats · Spacer · Deck · Calendar · Timer · Note · Step Counter |

**Compatibility rules:** capabilities within the same conflict set can't stack on one card — e.g. two `PRIMARY` capabilities that both claim the card's main surface (Widget + Gallery, say) will grey each other out. Stacking a *second* capability onto any card (e.g. App Launch + Notifications badge) and the **Finance** capability are both Premium features.

![Stacking capabilities onto a single card](assets/customization/capability-stacking.gif)

### Camera Capability Modes
When you add a **Camera** capability you can set its launch mode directly in the builder:
`PHOTO` · `VIDEO` · `SELFIE` · `PORTRAIT` · `PANORAMA` · `SLO-MO` · `NIGHT` · `PRO`

![Picking camera capability launch modes](assets/customization/camera-mode-picker.gif)

### Widget Capability
When a Widget capability is present, the builder's action button becomes **SELECT WIDGET →** and launches the system's Android widget picker directly.

![Launching system widget picker from card builder](assets/customization/widget-capability-picker.gif)

### Gallery & Image Logs Capability
Display custom photos, wallpapers, and albums directly inside cards. In Card Builder or Card Settings, tap **SELECT →** to pick images from your device storage.

![Selecting and displaying photos in a Gallery card](assets/customization/card-background-photo.gif)

### Finance Capability (Premium)
Track stock, crypto, and FX holdings on a single card with live quotes and running profit/loss. GT-Launcher never asks for a brokerage login — it only reads public price feeds. The card's P&L text automatically checks for color clashes against the card's own accent/background: if the profit-green or loss-red would blend into the card's background, it falls back to the normal text color instead of rendering unreadable green-on-green or red-on-red.

---

##  Visual Styles System

Apply a global card rendering style from **Engineering → APPEARANCE → CARD STYLE**. Each style has its own set of adjustable parameters, and every card can override the global style individually.

![Switching Visual Style: Flat → Glass → Neobrutalism → Claymorphism](assets/customization/visual-style-switch.gif)

### Available Styles

| Style | Character | Adjustable Params |
|---|---|---|
| **FLAT** | Solid fill, subtle border | Corner radius, BG alpha, Border alpha |
| **GLASS** | Frosted translucent surface | Corner radius, BG alpha, Border alpha |
| **NEO** (Neobrutalism) | Hard shadow offset, retro feel | Corner radius, BG alpha, Border width, Shadow size, Shadow direction (TL/TR/BL/BR), Shadow color mode |
| **CLAY** (Claymorphism) | Soft pastel blob with elevation | Corner radius, BG alpha, Elevation |
| **MINIMAL** | Near-invisible, text-only | Border weight only |
| **NEON** | Glowing outline on a dark surface | Corner radius, Glow radius, Glow color |

**Shadow Direction** (NEO only): `TL` `TR` `BL` `BR` — picks which corner casts the hard shadow.
**Shadow Color Mode** (NEO only): `CONTRAST_BG` (auto contrast), `ACCENT` (theme color), `DARK`.

Per-card style override is available in **Card Settings → VISUAL**.

---

##  Theme Engine & Color System

### Theme Hierarchy
1. **Global Preset:** 12 named color palettes — `ORANGE` (Classic TNG Style) · `BLUE` (Calm & Professional) · `GREEN` (Fresh & Natural) · `PURPLE` (Mysterious & Royal) · `RED` (Bold & Alert) · `TEAL` (Calm & Scientific) · `NAVY` (Deep & Elegant) · `MAGENTA` (High-Tech & Bold) · `ROSE` (Warm & Elegant, TOS Pink) · `CYAN` (Sharp & Electric, Borg/Tactical) · `YELLOW` (Bright & Optimistic) · `AMBER` (Warm & Timeless, TOS Gold). The parenthetical is flavor-text shown right under each preset's name in the picker, not a separate name.
2. **Smart Presets:** `GLASS` (premium glassmorphism gradients) and `PORTAL` (Aperture Science — orange & blue), both browsable alongside the 12 standard presets.
3. **Adaptive Themes (optional, opt-in):** three live-updating automation strategies — Hourly, Battery Level, and Weather Based — see below. Only one can be active at a time, and switching back to manual restores your last hand-picked palette.

![Browsing theme presets](assets/customization/theme-creator-presets.gif)

### Adaptive (Dynamic) Themes
Beyond the 12 static presets, three strategies keep the palette live instead of fixed:

| Strategy | Behavior |
|---|---|
| **Hourly Auto Theme** | Shifts hue across the day on its own schedule — no manual switching needed. |
| **Battery Level** | Recolors the whole UI by charge: green above 80%, sliding through teal, yellow, and orange down to red at 15% or below. Purely a passive color choice — it does not raise any alert or popup. |
| **Weather Based** | Recolors based on the live weather condition (e.g. a blue tint for rain). |

Only one strategy runs at a time — enabling one automatically disables the others.

![Toggling Hourly and Battery adaptive themes live](assets/customization/dynamic-theme-toggle.gif)

### Theme Creator (v4.4+)
Access via **Engineering → APPEARANCE → THEME CREATOR**.
- **HSV Color Wheel:** Outer ring = hue (0–360°), inner square = saturation/value. Canvas-based, drag or tap.
- **Color Harmony Engine:** 5 auto-palette suggestions from your chosen color: Complementary, Analogous, Triadic, Split, Tetradic.
- **Live Preview:** Simulated header + card grid with your Primary/Secondary/Tertiary colors.
- **14 Presets:** Horizontal chip row; tapping jumps the wheel to that color.
- **Hex Entry + Brightness Slider:** Direct `#RRGGBB` input.

Non-default Visual Styles inside the Theme Creator are a Premium feature.

### Per-Card Color Override (v4.4+)
Every card can carry its own independent accent color.
- Open **Card Settings → CARD COLOR**.
- Enter a `#RRGGBB` hex or pick from the 9 quick-chips.
- Tap `` to revert to the global theme rotation.
- `null` = theme-following (default).

![Overriding individual card color with HSV wheel & harmonies](assets/customization/card-color-override.gif)

Custom accents automatically pick black or white text for contrast, the same clash-avoidance logic the Finance card uses for its P&L numbers.

---

##  Header Widget System (v4.4+)

Configure the top header area in **Engineering → HOME → HEADER WIDGETS** (or tap ** HEADER** while in edit mode on the home screen).

![Configuring header widgets, sizing and visibility](assets/customization/header-widget-editor.gif)

### Widget Types
`TITLE` · `CLOCK` · `DATE` · `DATE_SHORT` · `WEATHER` · `BATTERY` · `STARDATE`

### Per-Widget Controls
- **Size:** XS / S / M / L / XL
- **Visibility toggle:** show/hide individually
- **↑↓ Reorder** within the column
- **Left / Right column** configured independently

The header height auto-adjusts to widget content — there's no fixed height.
- Tap the **Clock** widget → opens Alarm.
- Tap the **Date** widget → opens Calendar.

---

##  Layout Profiles (Presets)

Save the whole card arrangement as a named "Station" in **Engineering → SYSTEM → LAYOUT PRESETS**, and switch between them any time — one tap loads a completely different card set, colors, and positions. Useful for keeping, say, a dense daily-driver layout and a stripped-down minimal one side by side.

![Saving and switching layout presets & profile backups](assets/customization/layout-presets.gif)

---

##  Wallpaper & Background Images

Set a full launcher wallpaper or custom background overlay behind your card grid:
- Navigate to **Engineering → HOME → BACKGROUND**.
- Tap **SELECT BACKGROUND** (or **FOREGROUND IMAGE**).
- Tap **SELECT IMAGE** to open the system file picker and choose any photo.
- Pinch and drag to align the crop in the live preview, then tap **SAVE BACKGROUND**.

![Selecting and applying a custom wallpaper background](assets/customization/wallpaper-background-photo.gif)

---

##  Performance Tip

On older devices, a larger cell size or fewer columns means fewer Compose nodes on screen and smoother animations — try dropping to 4-5 columns or bumping the cell size before reaching for a lower-end theme. GT-Launcher also auto-requests the device's highest supported refresh rate (90/120/144 Hz) via `preferredDisplayModeId`.
