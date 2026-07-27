---
title: UniControl
category: Hardware & Embedded
area: muhendislik
status: Active
version: v5.1.0
summary: An ESP32-S3 based advanced vehicle safety and control system for Opel Astra J — integrating Brigade radar, Nextion HMI, and OBD-II diagnostics over CAN Bus.
techStack: [ESP32-S3, ESP-IDF, FreeRTOS, C/C++, CAN Bus, UDS, Nextion HMI, Brigade Radar]
date: 2025-10-12
github: https://github.com/alazndy/UniControl
---

## Overview

UniControl is an embedded system installed in an Opel Astra J. It extends the factory ECU with custom safety features, real-time diagnostics, and an aftermarket HMI — all running on a single ESP32-S3 module with FreeRTOS.

## Hardware Stack

- **MCU** — ESP32-S3 (dual-core Xtensa LX7, 240 MHz)
- **CAN Interface** — SN65HVD230 transceiver for OBD-II / UDS communication
- **HMI** — Nextion 5" touch display for status and controls
- **Radar** — Brigade BSD-400 blind-spot detection system
- **Power** — 12V automotive supply with buck converter and reverse polarity protection

## Software Architecture

The firmware follows a strict task-based architecture using FreeRTOS:

1. **CAN_RX_Task** (Priority 5) — Reads raw CAN frames from the hardware FIFO and pushes them to a queue.
2. **UDS_Task** (Priority 4) — Handles OBD-II session management (ISO 14229), reads fault codes, and live data PIDs.
3. **Radar_Task** (Priority 3) — Processes Brigade radar distance packets and triggers alert logic.
4. **HMI_Task** (Priority 2) — Updates the Nextion display with current state over UART.
5. **Log_Task** (Priority 1) — Buffers and writes diagnostic logs to internal flash.

All inter-task communication uses `xQueue` and `xSemaphore`. No blocking calls inside ISRs.

## Safety Rules

- ECU connection is read-only by default. Write operations require explicit confirmation.
- UDS sessions open with `0x10 01` (Default Session) and close cleanly on exit.
- Watchdog timer is always enabled. No `vTaskDelay(0)` busy-wait loops.

## Status

Active. Core CAN reading and radar integration are running on vehicle hardware. HMI module in development.
