# LLDS12 - LiDAR Distance Sensor

The Dragino LLDS12 is a LoRaWAN LiDAR ToF (Time of Flight) Distance Sensor designed for Internet of Things applications. It utilizes laser technology for precise distance detection and is capable of measuring distances from 0.1 meters to 12 meters. The device features ultra-low power consumption and is powered by an 8500mAh Li-SOCI2 battery designed for long-term deployment up to 5 years.

## Features

- **LoRaWAN 1.0.3 Class A** compliance for efficient wireless communication
- **LiDAR ToF Technology** for accurate distance measurement
- **Measurement Range:** 0.1m to 12m
- **Accuracy:** ±5cm at 0.1-5m range, ±1% at 5m-12m range
- **Ultra-low power consumption** for extended battery life
- **IP66 waterproof protection** for outdoor installations
- **8500mAh Li-SOCI2 battery** with up to 5 years operational life
- Pre-loaded with unique LoRaWAN keys for secure communication

## Use Cases

- Distance monitoring and level detection
- Parking space management
- Waste bin level monitoring
- Tank and silo level measurement
- Industrial automation and logistics
- Smart city applications

## Thinger.io Integration

The LLDS12 integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time distance monitoring, data visualization, and automated alerts.

## Requirements

A LoRaWAN server is required to communicate the Dragino LLDS12 into Thinger.io, some options are:

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

Dragino resources can be found at:

- [Documentation](https://www.dragino.com/products/distance-level-sensor/item/185-llds12.html)
- [Thinger docs](https://docs.thinger.io)