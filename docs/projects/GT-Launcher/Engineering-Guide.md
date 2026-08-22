# Engineering Panel Manual

The **Engineering Panel** is GT-Launcher's settings hub. Open it via the gear icon on the home screen, or from the sidebar's configured shortcut.

##  Navigation

The panel opens to a reorderable master deck of section tiles. Default sections, in order:

`APPEARANCE` · `HOME` · `SIDEBAR` · `APPS` · `VEHICLE` · `SYSTEM` · `ABOUT` · `ADAPTIVE` (Premium) · `PREMIUM`

Drag tiles to reorder them, or use the section search to jump straight to a setting by name.

![Touring the Engineering Panel: HOME → SIDEBAR → VEHICLE](assets/engineering/panel-navigation.gif)

---

### 1. APPEARANCE

Everything that affects how the launcher looks.

#### CARD STYLE
Select the global visual style: **FLAT**, **GLASS**, **NEO**, **CLAY**, **MINIMAL**, or **NEON**.
Each style exposes its own sliders — see [Customization → Visual Styles](Customization.md#-visual-styles-system).

#### THEME & COLORS
- **12 named color presets** (Orange, Blue, Green, Purple, Red, Teal, Navy, Magenta, Rose, Cyan, Yellow, Amber) plus **2 smart presets** (Glass, Portal) browsable in the same picker.
- **Adaptive automation:** Hourly, Battery Level, or Weather Based — one live-updating strategy can run at a time instead of a fixed preset.
- **Theme Creator:** full HSV color wheel with harmony presets — see [Customization → Theme Creator](Customization.md#theme-creator-v44).
- **Clean Mode:** strips card backgrounds down to a minimal, text-only surface.

#### TYPOGRAPHY & BRANDING
- **Header Title:** large text at the top of the home screen (default: `HERMES`).
- **Subtitle:** secondary text below the title.
- **Font Scaling:** independent scale factors for terminal text, card labels, and drive telemetry.

#### ICON PACK
Select an installed icon pack to replace default icons across both the drawer and the home cards.

---

### 2. HOME

Controls for the home screen grid and header.

#### HEADER WIDGETS
Configure which widgets appear in the left and right header columns.
Widget types: `TITLE` · `CLOCK` · `DATE` · `DATE_SHORT` · `WEATHER` · `BATTERY` · `STARDATE`
Each widget: size (XS–XL), visibility toggle, drag to reorder.

![Configuring header widgets in Engineering Home](assets/customization/header-widget-editor.gif)

*Shortcut:* while in edit mode, tap ** HEADER** to jump here directly.

#### GRID ENGINE
- **Columns:** 2 to 12, default **6**.
- **Cell Size:** 32–80dp, default **44dp** — this is what actually controls how "dense" the grid feels; there's no separate row-count setting, the grid simply grows to fit your cards.

#### BACKGROUND & WALLPAPERS
Set a custom image wallpaper or foreground overlay from **Engineering → HOME → BACKGROUND**. Features pinch-to-crop and drag-to-align previews.

![Selecting and applying a custom wallpaper background](assets/customization/wallpaper-background-photo.gif)

---

### 3. SIDEBAR

Controls for the collapsible side rail.

#### SIDEBAR ITEMS
Each button is a fully configurable `SidebarItem`:
- **Tap action:** app launch, OmniSearch, system shortcut, URL, and more.
- **Swipe Up / Swipe Down:** independent secondary actions per button.

Tap any item to open the **Sidebar Item Editor**.

#### POSITION & BEHAVIOR
- Position: Left / Right.
- Mode: Fixed / Collapsible (drag toward the rail's edge from anywhere on screen to peek or lock it open).
- Width, icon size, corner radius, and NEO shadow settings.

#### SEARCH BUTTON
- Default: opens in-app OmniSearch.
- Optional: launch a specific app instead.

#### SYSTEM CONTROLS
This is also where you toggle the **GT-Launcher Accessibility Service** — required for the sidebar's Back and Recents buttons to work.

---

### 4. APPS

![Deep-dive into Engineering sections: APPS, ABOUT, ADAPTIVE](assets/engineering/engineering-sections-deep-dive.gif)

#### DEPARTMENT MANAGEMENT
Create, rename, and reorder App Drawer departments.

#### KEYWORD AUTO-SORT
Map keywords (e.g. `mail`, `chat`, `photo`) to departments — matching apps get auto-sorted on install.

#### HIDDEN APPS
Manage apps hidden from the drawer, without uninstalling them.

---

### 5. VEHICLE

#### OBD DEVICE
Pair and select your Bluetooth LE OBD-II adapter.

#### DRIVE MODE TRIGGERS
- Bluetooth device connection (pick the device).
- Landscape orientation lock.

#### FUEL TRACKING
Fill-up history, fuel type, and monthly cost reports.

#### PARK ASSISTANT
View where GT-Launcher last saved your parking location.

---

### 6. SYSTEM

#### PERMISSIONS
Quick toggles for the most safety-critical permissions (Location, Bluetooth, Contacts, Calendar, Microphone) — for the full permission catalog with explanations, see **ABOUT** below.

#### WIDGET MANAGER
Enable or disable optional launcher modules (weather provider, OBD polling, notification listener).

#### LAYOUT PRESETS & PROFILE BACKUP
Save the current card arrangement as a named preset, or load one you saved earlier. Full profile export/import (every setting, not just the layout) as a `.json` file lives here too.

![Layout presets and profile backup](assets/customization/layout-presets.gif)

---

### 7. ABOUT

#### PERMISSIONS CATALOG
The complete, real-time status of every Android permission GT-Launcher can use, with a plain-language reason for each — tap any row to jump straight to its system settings screen.

#### VERSION & ABOUT
Build number, version code, developer credit, and a link to the changelog.

---

### 8. ADAPTIVE (Premium)

An opt-in engine that watches how you actually tap your cards over time and proposes a resized/repositioned layout to match — you get a 10-second live preview before anything changes, and can accept or revert instantly.

---

### 9. PREMIUM

Manage your subscription or lifetime unlock, or restore a previous purchase.

---

##  Grid Property Reference

| Property | Description |
|---|---|
| `gridCol` | X start position (0-based) |
| `gridRow` | Y start position (0-based) |
| `widthSpan` | Width in columns |
| `heightSpan` | Height in rows |

Drag handles snap automatically. Fine-tune exact coordinates in **Card Settings → LAYOUT**.
