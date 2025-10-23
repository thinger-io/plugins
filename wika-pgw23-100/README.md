# WIKA PGW-23-100


<p align="center">
  <img src="https://www.wika.com/media/Images/Product_700x700/Pressure/pgw23.100_en_co_rs_w410_h410_image.jpg" alt="wika logo" style="max-width: 200px; height: auto;" onerror="this.src='https://www.wika.com/media/Images/Product_700x700/Pressure/pgw23.100_en_co_rs_w410_h410_image.jpg';this.onerror='';">
</p>

The WIKA PGW23-100 is a hybrid IIoT pressure gauge: it combines a mechanical on-site Bourdon tube display with wireless LoRaWAN® communication for remote monitoring. It is designed for process-industry applications where you want both local indication and centralized data collection.

## Thinger.io Integration

This plugin allows you to integrate PGW23-100 devices into Thinger.io via a LoRaWAN Network Server (LNS) and the corresponding Thinger.io LoRaWAN plugin.

## Requirements

A LoRaWAN server is required to communicate the WIKA PGW-23-100 with Thinger.io. Supported options include:

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

Begin sending uplink frames from the PGW-23-100. Devices and data buckets will be auto-provisioned in your Thinger.io account.

This plugin also includes:

- A prebuilt dashboard for data visualization.
- Preconfigured data buckets for storing sensor readings.
- Support for downlink commands to remotely configure the sensor.

## Features Overview

-  **Wireless Protocols**:
    - LoRaWAN® for long-range communication.
    - NFC for easy device commissioning and configuration.

-  **Sensor Capabilities**:
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

## Additional Resources

WIKA official resources and documentation:

- [WIKA PGW-23-100 Product Page](https://www.wika.com/es-es/pgw23_100_pgw26_100.WIKA)
- [WIKA PGW-23-100 Configuration Guide](https://www.wika.com/media/Operating-instructions/Additional-operating-instructions/Non-Ex/ai_lora_mioty_en_de_fr_es.pdf)
