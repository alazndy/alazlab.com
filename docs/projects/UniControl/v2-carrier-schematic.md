# UniControl V2 Carrier Connection Schematic

## Scope and Status

This document is the reviewed R2 connection baseline for the V2 Core carrier
board. The carrier plugs into the Waveshare ESP32-P4-WIFI6 2x20 header and
contains all vehicle-facing circuitry. It is detailed enough to enter into
KiCad, but it is not release-to-fabrication data: the power-transient profile,
exact protected power stage, connector family, output load envelope, creepage,
and mechanical retention must pass the release gates below.

The pin allocation is authoritative in [`v2-pinout.md`](v2-pinout.md). This
document does not reassign any P4 GPIO.

## Sheet and Net Conventions

| Sheet | Responsibility |
|---|---|
| A | Vehicle power entry and regulated rails |
| B | P4 devkit header interconnect |
| C | CAN-1, CAN-2, and CAN FD physical layers |
| D | Isolated trigger inputs |
| E | Relay and PWM low-side outputs |
| F | DNP: ADC, RTC, auxiliary isolated/diagnostic input |

| Net | Meaning |
|---|---|
| `VBAT_RAW` | Vehicle battery input, 9-32 V nominal |
| `VBAT_PROT` | Fused, reverse-polarity-protected vehicle rail |
| `BUCK_5V` | Vehicle-derived 5 V before VSYS reverse-current blocking |
| `P4_5V` | Regulated 5 V rail supplied to the devkit `VSYS` pin |
| `CAN_5V` | 5 V rail for CAN transceiver VCC pins |
| `3V3` | Devkit 3.3 V logic rail; output only from devkit |
| `GND` | Single electrical ground net and continuous PCB reference plane |
| `GND_PWR_RETURN` | Layout region for high-current returns; same electrical net as `GND`, not a split plane |
| `CHASSIS` | Connector shield / enclosure ground; use an intentional RC or net-tie strategy |
| `PWR_FAIL_N` | Open-drain early warning before `P4_5V` falls outside regulation |
| `WDOG_OK` | External watchdog healthy signal; low resets P4 and disables physical outputs |

## Sheet A — Vehicle Power Entry

```text
J_PWR.1  VBAT_RAW (9-32 V)
   │
  F1  Harness fuse near source + carrier secondary fuse
   │
  Q1  Reverse-polarity ideal-diode MOSFET stage
   │──── D1 TVS ──── GND at power entry
   │
VBAT_PROT
   ├── U1 automotive buck ── BUCK_5V ── U_VSYS reverse-blocking switch ── P4_5V ── J_P4.VSYS
   ├── BUCK_5V ── U2 sequenced 5 V load switch/filter ── CAN_5V
   └── F2..F7 individual output fuses ─ relay contacts / PWM load positives

VBAT_PROT ── U_SUP supervisor/comparator ── PWR_FAIL_N ── P4 GPIO20
P4_5V ── C_HOLDUP (sized by measurement) ── GND

J_PWR.2  GND ───────────────────────────────────────── continuous ground plane
```

Rules:

- U1, Q1, and every input capacitor must have an absolute maximum rating above
  the worst-case clamped pulse, including tolerance and temperature margin.
  Do not use an unprotected LM2596/XL4015 module as the vehicle-facing stage.
- The release profile must explicitly cover reverse battery, cranking dropout,
  jump start, interrupted-inductive transients, and the selected 12 V/24 V load
  dump class. "9-32 V nominal" alone is not a protection specification.
- Feed the Waveshare board through the 5 V `VSYS` header rail only. Do not
  drive `VBUS`. `U_VSYS` must prevent reverse current when USB and vehicle
  power are present in any order.
- The carrier must never back-feed the devkit `3V3` pin; `3V3` is used only as
  a logic supply/reference for the carrier.
- Keep TVS, reverse-polarity stage, and bulk input capacitor physically next to
  `J_PWR`, not next to the P4 header.
- `U_SUP` must assert `PWR_FAIL_N` early enough to stop new log writes and sync
  the current record before `P4_5V` collapses. Size `C_HOLDUP` from measured
  shutdown current and allowed voltage droop; do not select it by guesswork.
- Split the display/backlight or other large loads from the hold-up domain when
  practical. Otherwise the capacitor needed to preserve SD writes becomes
  unnecessarily large.

## Sheet B — P4 Devkit Header Interconnect

| Devkit signal | Carrier net | Carrier sheet |
|---|---|---|
| VSYS | `P4_5V` | A |
| GND | `GND` | A-E |
| GPIO2 / GPIO3 | `CAN1_TXD` / `CAN1_RXD` | C |
| GPIO4 / GPIO5 | `CAN2_TXD` / `CAN2_RXD` | C |
| GPIO7 / GPIO8 | `I2C0_SDA` / `I2C0_SCL` | F, shared board bus |
| GPIO20 | `PWR_FAIL_N` | A |
| GPIO21 | `OUTPUT_ARM` | E / hardware output gate |
| GPIO22 | `SAFETY_HB` | E / external window watchdog |
| GPIO23 | `AUX_GPIO_DNP` | F / reserve |
| GPIO26 / GPIO27 | `ISO_TRIG1` / `ISO_TRIG2` | D |
| GPIO28..GPIO32 | `CANFD_CS_N`, `MOSI`, `SCK`, `MISO`, `INT_N` | C |
| GPIO33 | `CAN1_STB` | C |
| GPIO46 / GPIO47 | `PWM_OUT1` / `PWM_OUT2` | E |
| GPIO48..GPIO51 | `RELAY1_EN`..`RELAY4_EN` | E |
| GPIO52 | `CAN2_STB` | C |

`GPIO24/GPIO25` remain USB OTG only. Do not route them to vehicle circuitry.

## Sheet C — Vehicle Network Interfaces

### CAN-1 and CAN-2 (identical circuits)

```text
3V3 ── 10k ──┬─────── U_CAN1.TXD
              └─────── P4 GPIO2
P4 GPIO3 ◄──────────── U_CAN1.RXD
P4 GPIO33 ──────────── U_CAN1.STB       # CAN-2 uses GPIO4/5/52
                          │
                         10k
                          │
                         3V3       # boot default = standby/passive

CAN_5V ─────────────── U_CAN1.VCC     3V3 ── U_CAN1.VIO
           100nF to GND at pin 3         100nF to GND at pin 5
GND ────────────────── U_CAN1.GND
U_CAN1.CANH/CANL ── L_CAN1/DNP bypass ──┬── J_CAN1.1/.2
                                        ├── D_CAN1 dual-line CAN TVS to GND
                                        └── JP_TERM + selectable 120R/split termination
```

`U_CAN1` and `U_CAN2` are TCAN1042HGV-Q1. `JP_CANx_TERM` is open by default;
close it only when the controller is at a physical end of that CAN bus. Use
separate `CAN1_STB` and `CAN2_STB` nets so one defective or unused port can be
placed in standby without disabling the other. The TXD pull-up guarantees a
recessive request while the P4 pin is high impedance.

Provide both a 120 ohm termination footprint and a split-termination option
(two matched approximately 60 ohm resistors with a center capacitor); populate
only the option validated for the harness. The common-mode choke also needs a
0-ohm bypass option because an unsuitable choke can degrade CAN FD edges.

### CAN FD

```text
P4 GPIO28 ─ 22R ─── U_CANFD.nCS        U_CANFD.VDD ── 3V3
P4 GPIO29 ─ 22R ─── U_CANFD.SDI        U_CANFD.VSS ── GND
P4 GPIO30 ─ 22R ─── U_CANFD.SCK        VDD bypass: 100nF + 1uF local
P4 GPIO31 ◄─ 22R ── U_CANFD.SDO        # place SDO resistor at U_CANFD
P4 GPIO32 ◄──────── U_CANFD.INT        (active-low interrupt)

3V3 ── 10k ── U_CANFD.nCS             # deselected during reset
Y_CANFD 40MHz ── U_CANFD.OSC1/OSC2     # AEC-Q200 crystal, calculated Cload

U_CANFD.TXCAN ─── U_PHYFD.TXD          U_PHYFD.VDD ── CAN_5V
U_CANFD.RXCAN ◄── U_PHYFD.RXD          U_PHYFD.VIO ── 3V3
U_CANFD.INT0/XSTBY ── U_PHYFD.STBY     U_PHYFD.GND ── GND
                └──── 10k ── 3V3       # standby until controller owns the pin

U_PHYFD.CANH/CANL ─ L_CANFD/DNP bypass ─┬─ J_CANFD.1/.2
                                        ├─ D_CANFD CAN-FD-rated TVS at connector
                                        └─ JP_CANFD_TERM + 120R/split termination
```

`U_CANFD` is MCP2518FD and `U_PHYFD` is MCP2562FD. Fit the oscillator/crystal
network prescribed by the selected MCP2518FD clock source. The selected crystal
frequency tolerance, temperature drift, ageing, and calculated load capacitors
must satisfy the CAN FD timing budget; do not copy arbitrary capacitor values.

The SPI mapping is intentionally native SPI2: GPIO28=CS, GPIO29=MOSI/SDI,
GPIO30=SCK, GPIO31=MISO/SDO. Keep the controller and all SPI traces on the same
PCB, preferably below 50 mm; place the optional 22-33 ohm damping resistors at
the driving end. Start firmware at a conservative SPI clock and raise it only
after CRC/error testing. Configure MCP2518FD interrupt drive explicitly;
populate its optional pull-up only if open-drain mode is used.

`CAN_5V` must be sequenced or reverse-current-blocked so the CAN physical layers
cannot phantom-power the unpowered 3.3 V domain through TXD/RXD. A load switch
enabled only after `3V3` is valid is the preferred implementation.

Connector recommendation for each CAN port:

| Connector pin | Signal |
|---:|---|
| 1 | CANH |
| 2 | CANL |
| 3 | Signal GND / optional reference |
| Shell | CHASSIS, if shielded connector/cable is used |

## Sheet D — Isolated Trigger Inputs

```text
J_TRIG1.1 ─ PTC1 ─ BR1 bridge input ─ R_IN1A ─┬─ U_OPTO1.A
                                               └─ R_IN1B (parallel sharing)
J_TRIG1.2 ──────── BR1 bridge return ─────────── U_OPTO1.K
       └── D_TRIG1 bidirectional TVS is across the two input wires, not GND

3V3 ── 10k ─────────┬── 100R ── P4 GPIO26 (ISO_TRIG1)
                   └── U_OPTO1.C
GND ─────────────────── U_OPTO1.E
GPIO26 ── C_FILTER1 (DNP/10nF start value) ── GND
```

Repeat for `ISO_TRIG2` on GPIO27. The input-side negative must not be joined to
carrier `GND`; this preserves galvanic isolation. These are event/trigger
inputs, not PWM or frequency-measurement inputs.

For a 9-32 V target, a starting point is two pulse-rated 5.6k resistors in
parallel (2.8k effective). At schematic release, calculate LED current at
minimum voltage/worst diode drops and resistor dissipation at maximum clamp
voltage. The optocoupler's guaranteed minimum CTR after temperature and ageing
must still sink the 3.3 V pull-up current. A generic unbinned PC817 is acceptable
for a bench prototype only; the production BOM needs a qualified CTR group and
temperature range. Preserve the isolation barrier in PCB copper and creepage.

## Sheet E — Outputs

### Hardware safety gate and watchdog

```text
P4 GPIO22 (SAFETY_HB) ── U_WDOG.WDI
U_WDOG.WDO_N ───────────┬── P4 header EN      # timed low pulse = P4 reset
                        └── WDOG_OK ── 10k ── 3V3

PWR_FAIL_N ─┐
             AND (U_SAFE1A) ── POWER_WDOG_OK ─┐
WDOG_OK ────┘                                 AND (U_SAFE1B) ── SAFE_OK
P4 GPIO21 (OUTPUT_ARM) ───────────────────────┘

P4 RELAY1_EN ─┐
               AND (U_SAFE1C) ── RELAY1_SAFE ── final driver
SAFE_OK ──────┘

Repeat the safety gate for RELAY2..4 and PWM_OUT1..2.
```

Use two AEC-Q100 quad 2-input AND gates, for example the automotive-qualified
SN74LVC08A family: two gates create `SAFE_OK` and six gates protect the six
outputs. Fit one 100nF bypass at each logic IC. Put a 100k pull-down on
`OUTPUT_ARM`, `SAFETY_HB`, and every P4 command input at the gate side.
`PWR_FAIL_N`, `WDOG_OK`, and `OUTPUT_ARM` must each default so `SAFE_OK=0`.

`U_WDOG` is TPS3430-Q1, an external AEC-Q100 window watchdog with a programmable
reset pulse, not the P4 internal watchdog. Its startup/reset delay must permit
measured boot/self-test; its closed/open windows must reject both a stuck
heartbeat and an incorrectly fast loop. Firmware keeps `OUTPUT_ARM=0`, starts
`SAFETY_HB` after configuration validation, waits for at least one complete
valid watchdog window, confirms outputs are commanded low, and only then sets
`OUTPUT_ARM=1`. A late/early heartbeat pulses `WDOG_OK` low, immediately gates
outputs off and resets the P4; the timed release prevents a permanent reset
deadlock.

### Relay coil drivers (four identical channels)

```text
P4 GPIO48 ─ safety gate ─ R_GATE1 ─ Q_RELAY1.G
                                  │
                                R_PD1
                                  │
                                 GND

RELAY_COIL_1+ (fused VBAT_PROT) ─ K1 coil ─ Q_RELAY1.D
GND ─────────────────────────────────────── Q_RELAY1.S
D_FLY1 is across the coil: cathode at RELAY_COIL_1+, anode at Q_RELAY1.D

K1 contacts ── J_RELAY_OUT: COM / NO / NC
```

GPIO48, GPIO49, GPIO50, and GPIO51 drive K1 through K4 respectively. Relay
contacts are not logic signals: each external load must have its own current
rating, connector rating, and fuse assignment.

The V1 OMRON G6K-2F 1 A telecom relay must not be treated as an automotive power
relay. It is usable only when the final contact load, inrush, inductive derating,
temperature, and life-cycle calculation fit its data sheet. For vehicle loads,
prefer an automotive relay/contact system or protected solid-state switch sized
from the real load. Select a diode-plus-zener/TVS clamp instead of a plain diode
when fast relay release is required and verify the resulting MOSFET voltage.

### PWM low-side outputs (two identical channels)

```text
P4 GPIO46 ─ safety gate ─ R_GATE_PWM1 ─ Q_PWM1.G
                                      │
                                    R_PD_PWM1
                                      │
                                     GND

J_LOAD1.1  F_LOAD1 ─ VBAT_PROT ─ vehicle load ─ J_LOAD1.2 / Q_PWM1.D
GND ────────────────────────────────────────────────────────── Q_PWM1.S
```

GPIO46 drives PWM-1 and GPIO47 drives PWM-2. `Q_PWMx` must have an Rds(on)
specification at 3.3 V gate drive, adequate VDS margin for the vehicle rail,
and a suitable thermal design. Add a flyback diode or TVS at each inductive
load, close to its connector.

IRFZ44N/30N06-class parts without a guaranteed 2.5/3.3 V Rds(on) are not valid
choices. The production part must be AEC-Q101, have avalanche/SOA margin at the
selected clamp voltage, and pass hot short-circuit and thermal tests. For loads
that can short to battery or ground, a protected smart low-side switch with
diagnostics is preferred over a bare MOSFET; a fuse alone may be too slow to
protect the silicon.

## Sheet F — DNP Options

| Circuit | P4 nets | Placement rule |
|---|---|---|
| ADS1115 | I2C0 SDA/SCL | Keep analogue front-end local to carrier; no long I2C cable |
| DS3231 | I2C0 SDA/SCL | DNP RTC header and backup source |
| Third isolated/diagnostic input | GPIO23 | Copy Sheet D input channel or fit test point; DNP |

The base board already has 2.2k pull-ups on the shared GPIO7/GPIO8 I2C bus, so
all carrier pull-ups are DNP by default. LIN, K-Line, or more than one additional
input require a separate carrier variant or expansion hardware; GPIO20-GPIO22
and GPIO52 are not available as casual spares in the Core safety plan.

## Layout and Review Gates

1. Use one unbroken `GND` reference plane. Do not split logic and power ground
   beneath SPI, I2C, CAN logic, or the P4 header. Route relay/PWM current in a
   compact physical return corridor directly to power entry so it does not
   share narrow copper with P4 and transceiver returns.
2. Place each CAN TVS immediately at its connector, with the shortest/widest
   return into the ground/chassis strategy. Keep CANH/CANL coupled and symmetric;
   add choke and split-termination footprints without creating stubs.
3. Put the CAN FD controller, crystal, and transceiver together. Keep the crystal
   loop tiny, surround it with quiet ground, and never route PWM or switching
   nodes under it. Do not run MCP2518FD SPI through a cable or Dupont leads.
4. Keep buck switch nodes, relay drain nodes, and PWM drains away from the P4,
   oscillator, CAN RXD, trigger outputs, and I2C. Give every IC a local bypass
   with a direct ground via.
5. Mechanically retain the devkit with standoffs and a locking connector scheme.
   Friction headers alone are not an automotive vibration solution.

## Release Blockers

The following are P0 decisions. A production schematic cannot be called
"ironclad" until all are recorded with part numbers and limits:

1. Exact Waveshare 4.3-inch display/devkit SKU and mating connector drawing.
2. Vehicle transient standard/profile, operating/crank/jump-start range, and the
   resulting TVS clamp versus Q1/U1/capacitor absolute-maximum margin.
3. Per-output table: nominal current, inrush, inductance, PWM frequency, fault
   mode, duty cycle, wire gauge, fuse, connector pin rating, and ambient limit.
4. Relay coil/contact voltage and load category; the old 1 A telecom relay is
   not automatically acceptable.
5. Exact oscillator, CAN TVS/choke, protected buck, TPS3430-Q1 timing/orderable
   option, trigger optocoupler, MOSFET/smart-switch, connector, and enclosure parts.
6. Measured P4/display peak and shutdown current, SD sync duration, and calculated
   hold-up capacitance.
7. ESP32-P4 V2 HAL/build target, single pin-definition source, listen-only CAN
   boot, watchdog/arm state machine, and tested power-fail log path. The current
   ESP32-S3 firmware is not electrically compatible with this carrier.

## Bring-up and Fault-Injection Acceptance

1. With the P4 removed, held in reset, boot-looping, or watchdog-starved, all
   relay/PWM terminals remain OFF and all three CAN ports remain passive.
2. Power each legal combination (vehicle only, USB only, both, brownout) and
   verify no `VBUS`, `VSYS`, `3V3`, TXD/RXD, or CAN-rail back-feed.
3. Bring up every CAN interface in listen-only mode. Verify recessive level,
   switchable termination, 11/29-bit frames, bus-off recovery, and one-port fault
   isolation before enabling transmission.
4. Validate CAN FD at the final nominal/data rate with the production harness,
   both temperature limits, maximum bus load, and SPI CRC/error counters enabled.
5. Pull vehicle power repeatedly during maximum SD write activity. The file
   system must mount cleanly and lose no more than the explicitly allowed log
   window.
6. Short/open/reverse every external input and output permitted by the fault
   model; verify fuses/protection act before silicon, connector, or harness limits.
7. Run hot-soak current, thermal imaging, conducted/radiated emissions, immunity,
   ESD, transient, and vibration tests on the assembled enclosure and harness.
8. Do not enable normal bus transmission or physical outputs until the above
   tests pass and firmware configuration CRC/version checks succeed.

## Source References

- `docs/v2-pinout.md`
- `docs/v2-design-review.md`
- Waveshare ESP32-P4-WIFI6 schematic
- Espressif ESP32-P4 hardware design guidelines
- MCP2518FD, MCP2562FD, and TCAN1042HGV-Q1 datasheets
