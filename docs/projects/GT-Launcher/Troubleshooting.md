# Troubleshooting & FAQ

## 🆘 Common Issues

### 1. Back and Recents buttons don't work!
**Solution:** enable the **GT-Launcher Accessibility Service**.
- Go to **Engineering → SIDEBAR → SYSTEM CONTROLS**.
- Tap **Enable Accessibility Service**.
- Find "GT-Launcher" in your system settings and toggle it ON.

### 2. OBD-II isn't connecting.
**Solution:**
- Confirm your adapter is **BLE (Bluetooth Low Energy)** — classic Bluetooth is not supported.
- Pair the adapter in Android's Bluetooth settings first.
- Grant **Location** permission — Android requires it for Bluetooth scanning.

### 3. Music Visualizer is flat.
**Solution:**
- Grant both **Notification Access** and **Record Audio** permissions.
- Play music through a supported player (Spotify, YouTube Music, etc.).

### 4. Gradle says `JAVA_HOME` is not set or Java can't be found.
**Solution:**
- Install **Java 17**.
- Export `JAVA_HOME` to that installation.
- Ensure `$JAVA_HOME/bin` is on `PATH`.
- Re-run the baseline commands from the repo root:
  `./gradlew assembleDebug`
  `./gradlew testDebugUnitTest`
  `./gradlew lintDebug`

### 5. Release build opens the unauthorized screen.
**Solution:**
- Add `OWNER_SIGNATURE_SHA256_BASE64` to `local.properties`.
- The value must match the **Base64-encoded SHA-256 digest** of the APK's signing certificate.
- If the release keystore changes, update the property before generating release artifacts.
- Debug builds skip this check entirely — this only affects release builds.

## ❓ Frequently Asked Questions

**Q: Can I use my own icon packs?**
A: Yes — go to **Engineering → APPEARANCE → ICON PACK** and pick any pack installed from the Play Store.

**Q: How do I back up my layout?**
A: Go to **Engineering → SYSTEM → LAYOUT PRESETS & PROFILE BACKUP** and use **EXPORT PROFILE** to save everything — layout, theme, and settings — as a single `.json` file.

**Q: Is there a "Pro" version?**
A: GT-Launcher has an optional Premium unlock (Drive Mode, Finance card, capability stacking, extra Visual Styles, the Adaptive layout engine) — the core launcher experience is fully usable without it.

---
*Still stuck? Open an issue on [GitHub](https://github.com/alazndy/GT-Launcher/issues).*
