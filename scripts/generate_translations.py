import os
import glob
import re

PROJECTS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'src', 'content', 'projects')

TRANSLATIONS = {
    'UniControl': {
        'summary': 'Automotive safety controller based on ESP32-S3 and ESP-IDF, unifying radar telemetry, HMI touchscreens, black-box event logging, and isolated vehicle I/O.',
        'content': """## Overview

UniControl is an industrial automotive safety and vehicle controller engineered for heavy machinery, mining haulers, and commercial vehicle fleets. The system acquires telemetry from radar and ultrasonic sensors, issues acoustic and visual operator warnings, manages on-board HMI displays, and records critical event telemetry into a black-box storage partition.

The platform architecture spans two core hardware generations:

- **V1 (v5.1 ESP32-S3 Base):** Operational hardware baseline featuring single Classic CAN channel, Nextion 4.3\" Intelligent HMI, microSD black box, battery-backed DS1307 RTC, and isolated automotive 24V I/O.
- **V2 Core R2 Platform:** Upgraded multi-channel architecture with dual Classic CAN channels, CAN FD support, hardware output containment, and power-loss alert capacitors.

## V1 Hardware and Firmware Architecture

- **Microcontroller:** ESP32-S3 DevKitC-1 (Dual-core Xtensa LX7 @ 240 MHz)
- **Framework:** Espressif ESP-IDF with native FreeRTOS task scheduling
- **CAN Bus:** Single Classic CAN 2.0B transceiver over SN65HVD230 at 250 kbps
- **HMI Interface:** Nextion 4.3\" Intelligent Touch Panel via UART1
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
"""
    },
    'GT-Launcher': {
        'summary': 'Modular Android home screen launcher inspired by Star Trek LCARS, built with Kotlin and Jetpack Compose featuring customizable widget cards and local app indexing.',
        'content': """## Overview

GT-Launcher is an open-source Android home screen application built entirely with Kotlin and Jetpack Compose. It reimagines the Star Trek LCARS design philosophy into an ergonomic, ultra-fast mobile productivity workspace.

### Core Architecture

- **UI Framework:** 100% Jetpack Compose with reactive state management
- **Theme Engine:** Dynamic LCARS color palette switching with custom contrast curves
- **App Indexer:** Asynchronous local package discovery and category clustering
- **Widget Builder:** Extensible modular card framework for calendar, system telemetry, media controls, and quick shortcuts

### Performance Benchmarks

- **Cold Startup:** < 180 ms on modern Android 14+ devices
- **Memory Footprint:** < 45 MB resident memory in background idle
- **Frame Rate:** Consistent 120 FPS scrolling across app drawers and widget grids
"""
    },
    'R-AI-OS': {
        'summary': 'Lightweight local CLI agent runtime and asynchronous task orchestrator written in Rust with Tokio and SQLite state management.',
        'content': """## Overview

R-AI-OS is a unified workspace orchestration engine and local execution proxy built with Rust. It provides a single CLI binary (`raios`) covering project health analysis, security audits, build automation, git operations, and local task execution.

### Architectural Pillars

- **Language & Runtime:** Pure Rust with Tokio asynchronous multi-threaded scheduler
- **Memory Store:** Embedded SQLite database with vector indexing for semantic workspace search
- **Security Sandbox:** Least-privilege MCP tool execution, TTL-scoped secret leases, and tamper-evident audit hash chaining
- **CLI & TUI:** Ratatui terminal dashboard and fast sub-millisecond command dispatching
"""
    },
    'GTab': {
        'summary': 'Privacy-first modular new tab workspace for Chrome, integrating Google Tasks, Calendar, and local notes with zero external servers.',
        'content': """## Overview

GTab is a high-performance, customizable new tab Chrome extension built under Manifest V3 specifications. It consolidates daily task lists, calendar agendas, weather telemetry, and quick notes into a responsive grid layout.

### Key Capabilities

- **Zero-Server Architecture:** All user data, tokens, and widget states reside entirely within local Chrome storage.
- **Google Services Sync:** Direct OAuth2 integration with Google Tasks and Google Calendar APIs without third-party middleman servers.
- **Offline First:** Instant tab rendering with cached local state, synchronizing changes seamlessly upon reconnect.
"""
    },
    'AI-360-VCT': {
        'summary': 'Vehicle Collision Prevention and 360-Degree Camera Telemetry System engineered for mining haulers and logistics yards.',
        'content': """## Overview

AI-360-VCT is an integrated automotive safety and blind-spot monitoring unit engineered for heavy commercial vehicles and industrial work sites.

### Technical Highlights

- **Multi-Sensor Fusion:** Combines 360-degree surround-view cameras with 77 GHz millimetre-wave radar telemetry.
- **Operator Interface:** Low-latency touch display providing real-time obstacle distance readouts and directional threat vectors.
- **Ruggedized Enclosure:** IP67 sealed aluminium casing designed to withstand mining dust, extreme heat, and severe vehicle vibration.
"""
    },
    'AI_Trader': {
        'summary': 'Algorithmic trading pipeline and quantitative risk analysis engine powered by machine learning models and asynchronous WebSocket feeds.',
        'content': """## Overview

AI Trader is an automated quantitative trading and risk monitoring platform designed for real-time market data evaluation.

### Core Features

- **Signal Engine:** Multi-timeframe order book parsing and quantitative momentum calculations.
- **Risk Management:** Dynamic stop-loss execution, maximum drawdown safeguards, and capital allocation guards.
- **Architecture:** Asynchronous event-driven pipeline capable of sub-millisecond tick ingestion over persistent WebSockets.
"""
    },
    'ADC-Web-Sitesi': {
        'summary': 'Official corporate website and product catalog for ADC Tasarım, engineered with Next.js, TypeScript, and Tailwind CSS.',
        'content': """## Overview

Corporate digital platform for ADC Tasarım showcasing industrial hardware products, vehicle radar systems, and technical documentation.

### Stack & Features

- **Next.js & React:** Server-rendered static generation for optimal search engine indexing.
- **Multi-language Support:** Localized product specifications in Turkish and English.
- **Responsive Catalog:** Interactive product breakdowns and direct PDF datasheet downloads.
"""
    },
    'tek-ui': {
        'summary': 'Design system and accessible React/Tailwind component library engineered for modular web applications and internal tools.',
        'content': """## Overview

tek-ui is an enterprise-grade UI primitive toolkit and design system built with Radix UI and Tailwind CSS.

### Key Capabilities

- **Accessible Primitives:** Fully compliant with WAI-ARIA standards for keyboard navigation and screen readers.
- **Design Tokens:** Unified color palettes, corner radii, and elevation levels supporting Light and Dark modes.
- **Zero-Bloat:** Tree-shakeable exports with optimized CSS bundle overhead.
"""
    },
    'ENV-I': {
        'summary': 'Industrial inventory and stock management platform featuring lot tracking, barcode scanning, and multi-language support.',
        'content': """## Overview

ENV-I is an industrial stock management and inventory tracking module engineered for electronics manufacturing and field repair facilities.

### Capabilities

- **Lot & Batch Control:** Precise component batch tracking and serial number indexing.
- **Barcode Integration:** Instant component lookup and automated stock check-in/check-out via hardware scanners.
- **Localization:** 100% bilingual UI with localized PDF/Excel report exports.
"""
    },
    'UCC-APP': {
        'summary': 'Universal Cabin Controller tablet dashboard interface for heavy machinery and mining vehicle operators.',
        'content': """## Overview

UCC-APP is a ruggedized tablet operator dashboard application designed for mining trucks, excavators, and industrial vehicle cabins.

### Highlights

- **CAN Telemetry Display:** Real-time speed, radar proximity, temperature, and hydraulic pressure gauges.
- **Night / Day High Contrast:** High-visibility UI optimized for glaring direct sunlight and pitch-black mining shafts.
- **Operator Audio Alarms:** Multi-level directional acoustic alerts for immediate obstacle warnings.
"""
    },
    'NEXUS': {
        'summary': 'Cross-platform embedded device controller and Bluetooth Low Energy configuration tool.',
        'content': """## Overview

NEXUS is a mobile and desktop companion tool for configuring, monitoring, and flashing ESP32-based hardware controllers over Bluetooth Low Energy (BLE) and serial interfaces.
"""
    },
    'UPH': {
        'summary': 'Universal Power Hub: Smart power distribution and circuit protection unit for automotive electronics.',
        'content': """## Overview

UPH is an intelligent automotive power distribution unit providing software-configurable solid-state fuse protection, current monitoring, and CAN bus power control for auxiliary vehicle equipment.
"""
    },
    'Weave': {
        'summary': 'Distributed event bus and microservices message broker optimized for low-latency IoT telemetries.',
        'content': """## Overview

Weave is a lightweight messaging infrastructure engineered for interconnecting edge devices, field controllers, and cloud dashboard collectors.
"""
    },
    'localhostmonitor': {
        'summary': 'Developer utility for tracking active localhost ports, active background processes, and memory consumption.',
        'content': """## Overview

A lightweight menu-bar and CLI tool that scans listening TCP ports, identifies zombie development servers, and frees occupied network ports with a single command.
"""
    },
    'Radar-Firmware': {
        'summary': 'Bare-metal C firmware for 24GHz and 77GHz automotive millimeter-wave radar signal processing.',
        'content': """## Overview

Embedded radar DSP firmware responsible for raw chirp processing, FFT distance estimation, and target tracking over CAN-bus interfaces.
"""
    },
    't-Market': {
        'summary': 'E-commerce marketplace architecture with multi-vendor support and real-time inventory synchronization.',
        'content': """## Overview

Modern web platform for catalog browsing, cart checkout, and vendor management built with Next.js and secure payment integrations.
"""
    },
    'cisemogrencitakip': {
        'summary': 'Educational institution student management and attendance tracking platform.',
        'content': """## Overview

Multi-tenant web application for private tutoring centers and schools, managing student records, attendance logs, and exam results.
"""
    },
    'Oyuntd': {
        'summary': 'Browser-based tower defense strategy game engine built with HTML5 Canvas and TypeScript.',
        'content': """## Overview

Fast 2D strategy game featuring custom pathfinding algorithms, projectile physics, and responsive wave management.
"""
    },
    'AkortAPP-Akort': {
        'summary': 'Real-time musical instrument tuner and frequency analyzer application built with Web Audio API.',
        'content': """## Overview

High-precision audio frequency tuner application featuring FFT spectrum visualization and micro-tuning calibration for acoustic and electric instruments.
"""
    },
    'AkortAPP': {
        'summary': 'Cross-platform mobile instrument tuning and metronome utility.',
        'content': """## Overview

Mobile acoustic tuning application providing low-latency pitch detection, strobe tuner visualization, and customizable tuning presets.
"""
    },
    'Arduino-Firmware-Sketches': {
        'summary': 'Collection of production firmware sketches, drivers, and peripheral tests for AVR and SAMD microcontrollers.',
        'content': """## Overview

Curated library of tested embedded C/C++ firmware sketches covering I2C, SPI, UART communication, sensor drivers, and PWM actuator controllers.
"""
    },
    'Bangen': {
        'summary': 'Audio visualizer and procedural graphic generator powered by WebGL shaders and audio spectrum analysis.',
        'content': """## Overview

Interactive WebGL application generating real-time reactive 3D graphics and shader animations synchronized to audio inputs.
"""
    },
    'GT-UI': {
        'summary': 'Modular design system and component package tailored for Android applications using Jetpack Compose.',
        'content': """## Overview

UI component framework providing theme-aware cards, segmented indicators, HUD dials, and animated status meters for Android development.
"""
    },
    'MSNN': {
        'summary': 'Minimalist neural network library written from scratch in pure C for embedded and resource-constrained environments.',
        'content': """## Overview

Zero-dependency feedforward neural network implementation with backpropagation and matrix operations designed for microcontrollers.
"""
    },
    'Mesasge': {
        'summary': 'End-to-end encrypted peer-to-peer messaging prototype using WebRTC and cryptographic signature verification.',
        'content': """## Overview

Decentralized instant messaging proof-of-concept with zero central message storage, direct peer data channels, and local key generation.
"""
    },
    'MuseIQ': {
        'summary': 'Music theory and ear-training interactive web application with dynamic scale and chord progression generation.',
        'content': """## Overview

Educational music tool offering ear training drills, interval recognition tests, and harmonic progression visualizers for musicians.
"""
    },
    'PR-HUB': {
        'summary': 'Automated pull-request management and code review orchestration dashboard for development teams.',
        'content': """## Overview

GitHub workflow automation tool facilitating automated PR categorization, review assignment, and CI/CD status aggregation.
"""
    },
    'Pro-Gect': {
        'summary': 'Agile project tracking and milestone management system tailored for small hardware and software teams.',
        'content': """## Overview

Lightweight issue tracker and project roadmap manager featuring Kanban boards, release milestones, and sprint burndown graphs.
"""
    },
    'Renderci': {
        'summary': 'Distributed 3D rendering cluster coordinator and automated scene asset pipeline.',
        'content': """## Overview

Network job scheduler and task distributor for parallel frame rendering across local compute nodes.
"""
    },
    'Rutn-Krc': {
        'summary': 'Automated daily routine and habit tracking application with gamification and telemetry metrics.',
        'content': """## Overview

Personal habit tracker focusing on streak analytics, daily goal completion, and offline data sync.
"""
    },
    'Soundwave': {
        'summary': 'Digital audio workstation and procedural synthesizer engine built with Web Audio API.',
        'content': """## Overview

In-browser synthesizer and step sequencer featuring multiple oscillator waveforms, envelope filters, and real-time audio effects.
"""
    },
    'T-Launcher': {
        'summary': 'Experimental Android desktop launcher prototype with customizable gesture controls.',
        'content': """## Overview

Prototype home screen launcher exploring fluid touch gesture shortcuts and minimalist app drawer organizations.
"""
    },
    'T-SA': {
        'summary': 'Automated system audit and security configuration benchmarking tool for Linux workstations.',
        'content': """## Overview

CLI security utility checking kernel parameters, open network sockets, file permissions, and vulnerable packages against CIS benchmarks.
"""
    },
    'TEchschem': {
        'summary': 'Interactive electronic schematic and PCB footprint reference visualizer for hardware engineers.',
        'content': """## Overview

Web-based component pinout lookup and electronic schematic viewer supporting popular microcontroller pin maps.
"""
    },
    'Tekel': {
        'summary': 'Point-of-sale and barcode inventory checkout interface designed for retail operations.',
        'content': """## Overview

Fast touchscreen POS checkout system with barcode scanner support, cash drawer triggers, and daily sales receipt reporting.
"""
    },
    'TrAIder': {
        'summary': 'Quantitative finance research notebook and historical backtesting simulator for crypto and equity assets.',
        'content': """## Overview

Backtesting framework with historical price replay, slippage modelling, and performance metrics calculation (Sharpe, Sortino, Max Drawdown).
"""
    },
    'UCPS-Series': {
        'summary': 'Universal Cabin Protection System hardware specification and peripheral telemetry architecture.',
        'content': """## Overview

Industrial automotive safety hardware series designed for heavy vehicle cabin monitoring and proximity radar warnings.
"""
    },
    'WorkFlowEngine': {
        'summary': 'Node-based visual workflow automation and asynchronous pipeline orchestrator.',
        'content': """## Overview

Visual drag-and-drop workflow builder connecting API webhooks, data transformation nodes, and automated notification triggers.
"""
    },
    'adctasarm-com': {
        'summary': 'Legacy corporate web portal and digital archive for ADC Tasarım industrial products.',
        'content': """## Overview

Digital portfolio and hardware catalogue detailing automotive safety controllers, vehicle radars, and custom PCB designs.
"""
    },
    'espremote': {
        'summary': 'ESP32 Wi-Fi and Bluetooth remote control app for operating relays and monitoring sensor telemetry.',
        'content': """## Overview

Mobile utility interfacing with ESP32 microcontrollers to toggle digital outputs, trigger vehicle relays, and read analog sensor voltages.
"""
    },
    'parfm-parfmsite': {
        'summary': 'Luxury fragrance catalog and e-commerce showcase featuring interactive scent notes visualization.',
        'content': """## Overview

E-commerce website featuring fragrance note pyramids, search filtering, and responsive shopping cart checkout.
"""
    }
}

def generate():
    md_files = glob.glob(os.path.join(PROJECTS_DIR, '*.md'))
    md_files = [f for f in md_files if not f.endswith('.en.md') and not f.endswith('.tr.md')]

    for filepath in md_files:
        filename = os.path.basename(filepath)
        slug = filename.replace('.md', '')
        en_filepath = os.path.join(PROJECTS_DIR, f'{slug}.en.md')

        with open(filepath, 'r', encoding='utf-8') as f:
            raw_content = f.read()

        match = re.match(r'^---\s*\n(.*?)\n---\s*\n(.*)$', raw_content, re.DOTALL)
        if not match:
            continue

        frontmatter = match.group(1)
        body = match.group(2)

        data = TRANSLATIONS.get(slug)
        if data:
            new_summary = data['summary']
            new_content = data['content'].strip()
        else:
            # Fallback default translation
            new_summary = f'{slug} project developed by Göktuğ Turhan.'
            new_content = f'## Overview\n\n{slug} technical documentation and project details.'

        # Update summary in frontmatter
        new_fm_lines = []
        for line in frontmatter.split('\n'):
            if line.startswith('summary:'):
                new_fm_lines.append(f'summary: \"{new_summary}\"')
            else:
                new_fm_lines.append(line)

        new_fm = '\n'.join(new_fm_lines)
        en_file_content = f'---\n{new_fm}\n---\n\n{new_content}\n'

        with open(en_filepath, 'w', encoding='utf-8') as f_out:
            f_out.write(en_file_content)
        print(f'Created {slug}.en.md')

if __name__ == '__main__':
    generate()
