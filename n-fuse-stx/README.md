# Multisensor

The n-fuse Multisensor is a compact LoRaWAN and NFC-enabled IoT sensor device capable of measuring five environmental and physical parameters. It integrates the HDC2080 for temperature and humidity sensing, BMA400 triaxial accelerometer for motion detection, SFH7776 for ambient light measurement, and a magnetic field-sensitive reed switch for magnet sensing. The device features an IP54-rated enclosure and is designed for ultra-low power consumption to enable battery life of 10+ years.

## Thinger.io Integration

This device communicates via LoRaWAN, enabling seamless integration with Thinger.io through a LoRaWAN Network Server. The Multisensor supports threshold-based triggers for temperature, humidity, motion, and ambient light, allowing the device to transmit data only when specific conditions are met.

## Requirements

A LoRaWAN server is required to communicate the n-fuse Multisensor into Thinger.io, some options are:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed a new Product will be created for this device.

### Configuration

The Product is already preconfigured, check that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your desire.

### Usage

Start sending uplinks for autoprovisioning devices and buckets.
This product also provides a predefined dashboard and downlinks.

## Technical Specifications

### Sensors

- **Temperature & Humidity:** HDC2080 (±2% RH accuracy, ±0.2°C accuracy, 14-bit resolution)
- **Accelerometer:** BMA400 (±2g/±4g/±8g/±16g measurement range, 12-bit resolution, ultra-low power)
- **Light Sensor:** SFH7776 (ambient luminance measurement)
- **Magnetic Field:** Reed switch (normally open, magnet sensing)

### Physical Characteristics

- **Dimensions:** 40.9 x 40.9 x 14.4 mm
- **Enclosure Rating:** IP54
- **Mounting:** Residue-free adhesive tape based

### Power

- **Battery Life:** 10+ years (optimized for ultra-low power operation)
- **Battery:** User-replaceable

### Connectivity

- **LoRaWAN:** 868 MHz / 915 MHz (regional variants)
- **RF Output Power:** Up to 14 dBm
- **NFC:** Device configuration, commissioning, and firmware upgrade

### Environmental

- **Operating Temperature:** 0°C to 40°C

## Features

- Configurable threshold-based triggers for temperature, humidity, motion, and ambient light
- Data transmission only when thresholds are exceeded (optimizes battery life)
- Dual wireless interface (LoRaWAN + NFC)
- Firmware upgrade and configuration via NFC
- Android-based mobile app for management
- Open-source firmware and bootloader
- Programmable and customizable

## Use Cases

- Environmental monitoring in buildings and facilities
- Motion detection and activity tracking
- Light level monitoring
- Magnetic field detection and door/window status monitoring
- Smart building and home automation
- Asset tracking and condition monitoring
- Industrial IoT applications

## Additional Resources

n-fuse resources can be found at:

- [Documentation](https://www.n-fuse.co/assets/products/stx/stx-lr-datasheet.pdf)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/n-fuse/stx/)
- [GitHub Firmware](https://github.com/nfhw/stx-firmware)
- [Thinger docs](https://docs.thinger.io)