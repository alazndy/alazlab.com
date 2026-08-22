# Drive Mode: The Interceptor HUD (Premium)

**Drive Mode** turns your phone into a dedicated vehicle HUD — telemetry, navigation, and media, all in one landscape screen designed to be read at a glance while parked or mounted.

## 🚦 Triggering Drive Mode

Drive Mode starts automatically, no manual toggle required, when either condition is met (configured in **Engineering → VEHICLE → DRIVE MODE TRIGGERS**):
- **Landscape orientation** — rotate the phone and hold it landscape.
- **Paired car Bluetooth connects** — the moment your configured car's Bluetooth device connects.

Whichever trigger fires, GT-Launcher also auto-connects your configured OBD-II adapter and starts a new trip in the Trip Manager.

![Drive Mode HUD — telemetry sidebar, stardate header, and map view](assets/drive-mode/drive-mode-hud.gif)

## 🏎️ Telemetry & OBD-II Integration

Using a Bluetooth LE adapter, GT-Launcher talks directly to your vehicle's ECU.
- **Live Data:** RPM, GPS+OBD-synced speed, coolant temperature, turbo boost (calculated from MAP and barometric pressure), fuel consumption (L/h and L/100km).
- **DTC Scanner:** Reads "Check Engine" diagnostic trouble codes (Mode 03) directly from the **VEHICLE** tab.
- **Anomaly Overlay:** A full-screen, pulsing **ANOMALY DETECTED** warning appears in red the moment either a trouble code is present or coolant temperature crosses **110°C** — hard to miss even glancing over from the driver's seat.
- **Traffic Alerts:** If a connected navigation app posts a notification mentioning an accident, police, or radar warning, GT-Launcher surfaces it as a **RED ALERT** banner on the map HUD — independent of the OBD anomaly system above.

### 🔌 OBD-II Adapter Setup

| Supported | Notes |
|---|---|
| **vLinker iCar Pro** | Recommended |
| **ELM327 BLE** (v4.0+) | Widely available, budget-friendly |
| Legacy Bluetooth Classic (SPP) adapters | **Not supported** — BLE only |

1. Plug your adapter into the car's OBD-II port.
2. Pair it in Android's Bluetooth settings (device name is usually `ANDROID-VLINK` or `OBDII`).
3. Open **Engineering → VEHICLE** and select your device under **OBD BLUETOOTH DEVICE**.
4. Trigger Drive Mode (rotate to landscape, or drive off with Bluetooth connected). The adapter handshake ("Init ATZ") takes a few seconds — telemetry populates once it completes.

![Configuring OBD adapter and vehicle triggers in Engineering](assets/drive-mode/vehicle-obd-settings.gif)

## 🗺️ Trip Manager & Cost Tracking

Every Drive Mode session is logged as a trip.
- **Distance:** Tracked via GPS.
- **Fuel Cost:** Set your local fuel price in **Engineering → VEHICLE**; GT-Launcher calculates real-time trip cost from distance and consumption.
- **Fuel Receipt OCR:** Scan a paper fuel receipt with your camera — GT-Launcher's OCR pipeline reads the total cost straight into your fill-up log, no manual typing.
- **Mission Logs:** Review trip history, total distance, and total fuel spend from **Engineering → VEHICLE → FUEL TRACKING**.

## 🎶 Visual Experience

- **FFT Audio Visualizer:** A real-time spectrum analyzer on the HUD that reacts to your music (requires `RECORD_AUDIO` permission — audio is analyzed on-device, never recorded or stored).
- **Interactive Media Panel:** Large album art and one-tap playback controls, sized for glancing while safely parked.

## 🛡️ Safety Features

- **Landscape Lock:** Forces the UI into landscape for dashboard mounting.
- **Auto-DND:** Optionally enables Do Not Disturb the moment Drive Mode starts.
- **Brightness Controls:** Triple-tap the screen to reveal a brightness slider for night driving.
- **Park Assistant:** Saves your GPS coordinates automatically when your car's Bluetooth disconnects — find your car later from the **VEHICLE** tab's parking map.

---
*Drive Mode, OBD-II telemetry, and the Fuel/Trip system are Premium features.*
