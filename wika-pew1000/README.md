# WIKA PEW‑1000

The WIKA PEW‑1000 is a compact, wireless pressure sensor designed for remote monitoring of gases and liquids. It features LoRaWAN® wireless connectivity and Bluetooth® for local configuration. Built for industrial use, it offers long battery life, robust environmental protection, and high-accuracy pressure readings.

## Thinger.io Integration

To integrate the WIKA PEW‑1000 with Thinger.io, you will need a LoRaWAN Network Server (LNS) with it's corresponding Thinger.io plugin.

## Requirements

A LoRaWAN server is required to communicate the WIKA PEW‑1000 with Thinger.io. Supported options include:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Additionally, the corresponding Thinger.io plugin for the selected LoRaWAN server must be installed.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://plugins.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed a new Product will be created for this device.

### Configuration

The Product is preconfigured to support auto-provisioning. Make sure the provisioning prefix matches the configuration used in your LoRaWAN server plugin. You may change this prefix if needed.

If using Bluetooth® for local setup, ensure the device is configured to use LoRaWAN and the appropriate AppEUI/AppKey are set correctly.

## Usage

Begin sending uplink frames from the PEW‑1000. Devices and data buckets will be auto-provisioned in your Thinger.io account.

This plugin also includes:

- A prebuilt dashboard for data visualization.
- Support for downlink commands to remotely configure the sensor.

## Features Overview

- **Wireless Protocols**:
  - LoRaWAN® for long-range communication.
  - Bluetooth® for local configuration.

- **Sensor Capabilities**:
  - High-accuracy pressure and temperature measurement.
  - Battery status and technical diagnostics.
  - Smart alarm triggering based on threshold or slope.

- **Remote Configuration** via Downlinks:
  - Sampling and transmission interval.
  - Alarm thresholds and hysteresis.
  - Reset to factory defaults.
  - Battery indicator reset.

- **Power**:
  - Replaceable battery with up to 10 years of lifetime (depending on transmission interval and environment).

- **Rugged Design**:
  - IP65-rated enclosure for outdoor and industrial use.

## Additional Resources

WIKA official resources and documentation:

- [PEW‑1000 Product Page](https://www.wika.com/en-us/pew_1000.WIKA)
- [PEW‑1000 Operating Manual (PDF)](https://www.wika.com/media/Operating-instructions/Operating-instructions/Pressure/Pressure-sensors/sd_pew_1000_en_co.pdf)
- [PEW‑1000 + PEW‑1200 Bluetooth® Configuration Guide](https://www.wika.nl/upload/SD_PEW_1000_PEW_1200_en_113765.pdf)
