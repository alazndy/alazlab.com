# App Drawer: Departmentalized Organization

The App Drawer is built to kill "infinite scroll" fatigue by sorting your apps into departments instead of one long alphabetical list.

##  Departmental Logic

Every installed app is auto-assigned to a department. The built-in set:
- **COMM** — messaging, calling, and email apps
- **SOCIAL** — social networks
- **PRODUCTIVITY** — office, notes, and utility tools
- **TOOLS** — system utilities and calculators
- **PHOTO** — camera and gallery apps
- **FINANCE** — banking and finance apps
- **SHOPPING** — retail and marketplace apps
- **GAMING** — games
- **NEWS** — news and reading apps
- **OTHER** — anything that doesn't match a keyword

You can rename, reorder, and create your own departments from **Engineering → APPS**.

![Browsing App Drawer departments](assets/app-drawer/browse-departments.gif)

##  Intelligent Automation (Keyword Sort)

You don't have to manually move apps.
1. Go to **Engineering → APPS**.
2. Tap a department, edit its **Keywords** (e.g. add "bank" to FINANCE, "pubg" to GAMING).
3. The launcher scans every installed app and auto-sorts anything matching those keywords — new installs are classified the same way, automatically.

##  Hidden Apps

- **Soft-Hide:** Long-press any app in the drawer and choose **Hide from Drawer**. The app stays installed, it just stops cluttering your tabs.
- **Managing Hidden Apps:** Go to **Engineering → APPS → HIDDEN APPS** to review and restore anything you've hidden.

##  Browsing Features

- **Fast Scroll:** Use the alphabet rail on the right to jump straight to a letter.
- **Recently Used / Recently Installed:** Quick-access rows surface your most-used and newest apps without hunting through departments.
- **List vs. Grid view:** Switch between a name-first list and an icon-first grid from the drawer's view toggle — pick whichever reads faster for you.
- **Icon Packs:** Apply an installed icon pack across the drawer and your home cards from **Engineering → APPEARANCE → ICON PACK**.

---
##  Technical Note
The drawer loads apps through an asynchronous, reactive data stream, so even a 500+ app library stays scrollable and searchable without a hitch — and it live-updates the moment you install, uninstall, or update anything, no manual refresh needed.
