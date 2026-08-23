---
title: UniControl
category: Hardware & Embedded
area: muhendislik
status: Active
version: v5.1.0
summary: "Automotive safety controller based on ESP32-S3 and ESP-IDF, unifying radar telemetry, HMI touchscreens, black-box event logging, and isolated vehicle I/O."
techStack: [ESP32-S3, ESP-IDF, FreeRTOS, C, C++, TWAI/CAN, Nextion, microSD, DS1307 RTC, PlatformIO]
date: 2025-10-12
github: https://github.com/alazndy/UniControl
manuals:
  - title: "V2 Design Review"
    href: "https://github.com/alazndy/UniControl/blob/master/docs/v2-design-review.md"
    description: "V2 Core pin planı, güvenlik containment yaklaşımı ve kalan tasarım riskleri."
    format: "Markdown"
  - title: "V2 Pinout"
    href: "https://github.com/alazndy/UniControl/blob/master/docs/v2-pinout.md"
    description: "V2 Core için doğrulanmış GPIO ve çevrebirim eşlemesi."
    format: "Markdown"
---

## Overview

UniControl is an industrial automotive safety and vehicle controller engineered for heavy machinery, mining haulers, and commercial vehicle fleets. The system acquires telemetry from radar and ultrasonic sensors, issues acoustic and visual operator warnings, manages on-board HMI displays, and records critical event telemetry into a black-box storage partition.

The platform architecture spans two core hardware generations:

- **V1 (v5.1 ESP32-S3 Base):** Operational hardware baseline featuring single Classic CAN channel, Nextion 4.3" Intelligent HMI, microSD black box, battery-backed DS1307 RTC, and isolated automotive 24V I/O.
- **V2 Core R2 Platform:** Upgraded multi-channel architecture with dual Classic CAN channels, CAN FD support, hardware output containment, and power-loss alert capacitors.

## V1 Hardware and Firmware Architecture

- **Microcontroller:** ESP32-S3 DevKitC-1 (Dual-core Xtensa LX7 @ 240 MHz)
- **Framework:** Espressif ESP-IDF with native FreeRTOS task scheduling
- **CAN Bus:** Single Classic CAN 2.0B transceiver over SN65HVD230 at 250 kbps
- **HMI Interface:** Nextion 4.3" Intelligent Touch Panel via UART1
- **Event Recorder:** SPI microSD logger with FATFS filesystem and I2C DS1307 RTC
- **Vehicle I/O:** Optocoupled inputs (24V), high-side protected MOSFET drivers, and power relay outputs

### Core Firmware Modules

- `main.c`: System bootstrap, watchdog configuration, and FreeRTOS task initialization.
- `hal.c`: Hardware Abstraction Layer for GPIO, CAN (TWAI), UART, I2C, and SPI peripherals.
- `logic.c`: Radar distance evaluation, threat zone classification, and safety alarm state machine.
- `web.c`: Local SoftAP provisioning, browser telemetry dashboard, and OTA firmware upgrade server.
- `settings.c`: Persistent configuration and calibration parameter storage via Non-Volatile Storage (NVS).

## Radar & Bus Communication Protocol

The firmware natively processes proprietary CAN messages from Brigade BS-9000 radar and ultrasonic obstacle sensors at 250 kbps with sub-millisecond parsing latency. 

The V2 platform extends this capability with:
- Two independent Classic CAN 2.0B channels
- One dedicated CAN FD channel for high-bandwidth telemetry
- Support for future diagnostic stacks (DoCAN, SAE J1939, ISO 14229)
