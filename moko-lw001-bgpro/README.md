# LW001-BG PRO - Tracker

The LW001-BG PRO is a wireless smart, ultra-low power consumption LoRaWAN tracker designed for both indoor and outdoor positioning applications. It integrates multiple positioning technologies including GPS positioning, Bluetooth positioning, and WiFi positioning to provide flexible and accurate location tracking capabilities across different environments.

## Features

- **Multi-positioning Technology**: GPS, Bluetooth, and WiFi positioning for comprehensive indoor and outdoor tracking
- **Ultra-low Power Consumption**: Optimized for extended battery life
- **LoRaWAN Connectivity**: Long-range wireless communication with low power requirements
- **Accelerometer**: Built-in motion detection for enhanced tracking capabilities
- **Auxiliary Battery**: Additional power backup for critical applications
- **Light Sensor**: Ambient light detection
- **Time and Vibration Monitoring**: Enhanced tracking features
- **IP67 Enclosure**: Dust-tight and water-resistant protection
- **Compact Design**: 72 x 122 x 33 mm dimensions
- **Wide Operating Temperature**: -40°C to +85°C

## Use Cases

- Asset tracking and management
- Fleet management and vehicle tracking
- Personnel location monitoring
- Supply chain logistics
- Indoor and outdoor navigation
- Cold chain monitoring
- Industrial equipment tracking

## Thinger.io Integration

The LW001-BG PRO integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time location tracking, sensor data monitoring, and device management through the Thinger.io platform.

## Requirements

A LoRaWAN server is required to communicate the LW001-BG PRO into Thinger.io, some options are:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed a new Product will be created for this device.

### Configuration

The Product is already preconfigured, check that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your desire.

The default network access mode is OTAA (Over-The-Air Activation). Add the device to your LoRaWAN server using the device's OTAA credentials.

### Usage

Start sending uplinks for autoprovisioning devices and buckets.
This product also provides a predefined dashboard and downlinks.

## Additional Resources

- [Product Specification](https://market.thingpark.com/media/catalog/product/vendor_tech_docs/l/w/lw001-bg_pro_specification_v1.1-.pdf)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/moko/lw001-bgpro/)
- [Thinger docs](https://docs.thinger.io)