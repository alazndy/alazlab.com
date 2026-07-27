---
image: "/projects/UCC-APP.png"
title: "UCC APP"
category: "AI & Veri"
area: "muhendislik"
status: "Active"
summary: "Professional mobile interface for managing ESP32-based radar systems via Wi-Fi. Provides real-time tracking and configuration for automotive radar units."
techStack: ["Flutter", "Dart"]
---

## Overview

Professional mobile interface for managing ESP32-based radar systems via Wi-Fi. Provides real-time tracking and configuration for automotive radar units.

## Proje Detayları (README)



Modern Flutter mobile application for controlling ESP32-based vehicle radar systems over Wi-Fi.

## Features

### 🎯 Two Operating Modes

#### User Mode (Default)

- **Simple Interface**: Only essential settings visible
- **Basic Controls**:
  - Warning Zone distance
  - Danger Zone distance
  - Audio Alarm toggle
- **Safe & Secure**: Advanced features hidden from end users

#### Developer Mode

- **Full Access**: All advanced settings and features
- **Product Tier Selection**: Choose between EcoSense, ProView, or FusionGuard
- **Advanced Configuration**: Sensor locations, radar IDs, I/O settings, debug flags
- **OTA Firmware Updates**: Wireless firmware upload with progress tracking
- **Log Management**: Download and view device logs

### 🔍 Device Discovery

- **Automatic mDNS Discovery**: Finds ESP32 devices on local network
- **Manual IP Entry**: Add devices by IP address
- **Connection Status**: Real-time connection monitoring

### ⚙️ Settings Management

- **Dynamic UI**: Interface adapts based on selected product tier
- **Change Tracking**: Visual indication of unsaved changes
- **Validation**: Input validation for all settings
- **Hex/Decimal Support**: Radar IDs displayed in both formats

### 🎨 Modern Design

- **Material Design 3**: Clean, modern interface
- **Dark Mode**: Full dark theme support
- **Smooth Animations**: Polished user experience
- **Responsive Layout**: Works on phones and tablets

## Installation

### Prerequisites

- Flutter SDK 3.0 or higher
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- ESP32 device on the same Wi-Fi network

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd "UCC APP/code"
   ```

2. **Install dependencies**

   ```bash
   flutter pub get
   ```

3. **Run the app**

   ```bash
   # For Android
   flutter run

   # For iOS
   flutter run -d ios
   ```

## Project Structure

```
code/
├── lib/
│   ├── main.dart                 # App entry point
│   ├── models/                   # Data models
│   │   ├── device_info.dart      # ESP32 device information
│   │   ├── settings.dart         # Device settings
│   │   └── tier.dart             # Product tier information
│   ├── services/                 # Service layer
│   │   ├── api_service.dart      # HTTP API communication
│   │   ├── mdns_service.dart     # Device discovery
│   │   └── file_service.dart     # File operations
│   ├── providers/                # State management
│   │   ├── app_provider.dart     # App state (developer mode, theme)
│   │   ├── device_provider.dart  # Device connection state
│   │   └── settings_provider.dart # Settings state
│   ├── screens/                  # UI screens
│   │   ├── discovery_screen.dart # Device discovery
│   │   ├── settings_screen.dart  # Settings management
│   │   ├── ota_update_screen.dart # Firmware updates
│   │   └── log_screen.dart       # Log viewer
│   ├── widgets/                  # Reusable components
│   │   └── device_card.dart      # Device list item
│   └── theme/                    # App theming
│       └── app_theme.dart        # Material Design 3 theme
└── pubspec.yaml                  # Dependencies
```

## API Integration

The app communicates with ESP32 using the following endpoints:

- `GET /api/info` - Device and tier information
- `GET /api/settings` - Read current settings
- `POST /api/settings` - Save settings
- `POST /update` - OTA firmware update
- `GET /dl` - Download log file

For detailed API documentation, see [FLUTTER_APP_GUIDE.md](../reference/FLUTTER_APP_GUIDE.md)

## Usage

### First Time Setup

1. **Launch the app** - It will automatically scan for ESP32 devices
2. **Connect to device** - Tap on discovered device to connect
3. **User Mode** - By default, only basic settings are visible

### Enabling Developer Mode

1. Open **Settings** screen
2. Tap the **code icon** in the app bar
3. Developer mode is now enabled
4. Access to tier selection, OTA updates, and logs

### Updating Firmware (Developer Mode Only)

1. Enable **Developer Mode**
2. Navigate to **OTA Firmware Update**
3. Select `.bin` firmware file
4. Tap **Upload Firmware**
5. Wait for upload to complete
6. Device will restart automatically

### Downloading Logs (Developer Mode Only)

1. Enable **Developer Mode**
2. Navigate to **Download Logs**
3. View logs in the app
4. Tap **Save to Device** to download

## Product Tiers

### Tier 1: EcoSense

- **Technology**: Ultrasonic (Brigade UDS)
- **Sensors**: 4 ultrasonic sensors
- **Range**: Up to 2.5 meters
- **Use Case**: Precise parking assistance

### Tier 2: ProView

- **Technology**: FMCW Radar (BS-9100)
- **Sensors**: 2 x 77GHz radar
- **Range**: Up to 60 meters
- **Use Case**: Blind spot detection and security

### Tier 3: FusionGuard

- **Technology**: Sensor Fusion (Radar + UDS)
- **Sensors**: Hybrid radar and ultrasonic
- **Range**: Full coverage (near and far)
- **Use Case**: Premium complete protection

## Dependencies

- **provider** - State management
- **http** - HTTP requests
- **dio** - File uploads with progress
- **network_service_discovery** - mDNS device discovery
- **file_picker** - Firmware file selection
- **path_provider** - File system access
- **shared_preferences** - Persistent settings
- **google_fonts** - Typography

## Development

### Running Tests

```bash
flutter test
```

### Code Analysis

```bash
flutter analyze
```

### Building Release

```bash
# Android
flutter build apk --release

# iOS
flutter build ios --release
```

## Troubleshooting

### Device Not Found

- Ensure ESP32 is powered on
- Check both devices are on same Wi-Fi network
- Try manual IP entry
- Restart the app

### Connection Failed

- Verify ESP32 IP address
- Check firewall settings
- Ensure ESP32 firmware is up to date

### OTA Update Failed

- Check firmware file is valid `.bin` format
- Ensure stable Wi-Fi connection
- Do not disconnect power during update
- Try smaller firmware file

## License

Copyright © 2024 ADC. All rights reserved.

## Support

For issues and questions, please contact the development team.



*This project was dynamically imported and enriched from the master portfolio database.*
