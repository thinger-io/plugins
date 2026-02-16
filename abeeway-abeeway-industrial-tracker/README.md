# Industrial Tracker

The Abeeway Industrial Tracker has embedded sensors combining GPS, Low-power GPS, Wi-Fi Sniffer, and LoRaWAN® TDoA geolocation technologies, supporting accurate outdoor and indoor geolocation. In addition to that, it has embedded sensors for measuring temperature, motion, and pressure. This tracker is an ideal solution for industry tracking and asset management needs.

## Features

- **Multi-mode geolocation**: GPS, Low-power GPS, Wi-Fi Sniffer, BLE, and LoRaWAN TDoA
- **Embedded sensors**: Accelerometer, temperature sensor, and pressure sensor
- **Accurate positioning**: Supports both indoor and outdoor geolocation
- **Geofencing capabilities**: Position alerts when entering or leaving defined zones
- **Motion detection**: Alerts at start, duration, and end of motion events
- **Rugged design**: IP65 rated for harsh industrial environments
- **Long battery life**: Designed for extended autonomy in demanding applications
- **Compact form factor**: 145 x 76 x 42 mm
- **Operating temperature**: -15°C to 65°C

## Use Cases

- Heavy-duty asset tracking and management
- Equipment monitoring
- Transportation fleet tracking
- Livestock tracking
- Inventory management
- Industrial facility asset monitoring

## Thinger.io Integration

The Abeeway Industrial Tracker integrates with Thinger.io through LoRaWAN connectivity, enabling real-time asset tracking, sensor monitoring, and geolocation data visualization.

## Requirements

A LoRaWAN server is required to communicate the Abeeway Industrial Tracker into Thinger.io, some options are:

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

## Additional Resources

Abeeway resources can be found at:

- [Abeeway Industrial Tracker Product Page](https://www.abeeway.com/industrial-tracker/)
- [Device Repository for LoRaWAN](https://www.thethingsnetwork.org/device-repository/devices/abeeway/abeeway-industrial-tracker/)
- [Thinger.io Documentation](https://docs.thinger.io)