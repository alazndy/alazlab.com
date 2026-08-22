# Permissions & Privacy

GT-Launcher is built with a **"Secure by Design"** philosophy: zero data collection, no cloud sync, no account. Everything it knows about your device stays on your device.

##  Required Permissions

| Permission | Why do we need it? |
| --- | --- |
| **Location** | GPS speedometer, weather, and Park Assistant's saved location. |
| **Bluetooth** | Connecting to OBD-II adapters and detecting your car's Bluetooth for Drive Mode. |
| **Record Audio** | **Only** the Music Visualizer (FFT spectrum) — audio is analyzed on-device in real time, never recorded or stored. |
| **Contacts** | Contact search and Fast Dial results in Omni-Terminal. |
| **Calendar** | Surfacing upcoming events in Omni-Terminal search results. |
| **Phone Call** | Only when you trigger a call directly from a Fast Dial result. |
| **Notification Access** | Notification badges on GT cards, and controlling media playback from a Media card. |
| **Accessibility Service** | Lets the sidebar's Back and Recents buttons perform real system navigation actions. |
| **Storage/Media** | Setting a custom wallpaper, card background, or sidebar logo from your gallery. |

Every permission's live grant status is visible in **Engineering → ABOUT**, and you can jump to its exact system settings screen from there.

![Permissions catalog — tap any row to jump to its system settings screen](assets/permissions/runtime-grant-flow.gif)

##  Privacy FAQ

### Does the launcher track my location?
No. Location is processed locally for your current speed/street name — it's never uploaded anywhere.

### Why does it need Bluetooth?
Purely for the OBD-II vehicle telemetry system: pairing with ELM327/vLinker BLE adapters, and recognizing your car's Bluetooth to trigger Drive Mode.

### Does it read my SMS or phone state?
No — those permissions aren't part of the app's surface at all.

### Can I use it without granting every permission?
Yes. Deny what you don't want and the corresponding module (navigation, OBD, visualizer, etc.) simply stays disabled — the rest of the launcher works normally. Manage everything from **Engineering → SYSTEM** (quick toggles) or **Engineering → ABOUT** (full catalog).

---
*"Security is a process, not a product."*
