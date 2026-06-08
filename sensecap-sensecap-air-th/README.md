# Wireless Air Temperature and Humidity Sensor - LoRaWAN®

The Seeed Studio SenseCAP Wireless Air Temperature and Humidity Sensor measures temperature and humidity in the atmosphere. It's designed with a 2-in-1 sensor, a custom battery, and an IP66 enclosure, optimized for outdoor use cases that need reliable data collected over years. The collected data is sent over the LoRaWAN® network for further processing and decision making.

## Features

- **Wide Temperature Range**: Measures from -40℃ to +85℃ with ±0.2℃ accuracy and 0.1℃ resolution
- **Full Humidity Range**: Measures from 0 to 100% RH (non-condensing)
- **Long Battery Life**: Replaceable battery supporting up to 10 years of usage (19Ah high-capacity battery)
- **Rugged Design**: IP66-rated enclosure for outdoor deployment
- **Low Power Consumption**: Optimized for long-term field deployment
- **LoRaWAN® Connectivity**: Long-range, low-power wireless communication
- **Built-in Bluetooth**: Configuration and management via mobile APP
- **Wide Operating Temperature**: -40℃ to +85℃

## Use Cases

- Environmental monitoring
- Agriculture and greenhouse monitoring
- Smart buildings and HVAC systems
- Weather stations
- Cold chain logistics
- Industrial facilities monitoring

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the SenseCAP Wireless Air Temperature and Humidity Sensor into Thinger.io, some options are:

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

SenseCAP resources can be found at:

- [Product Page](https://www.seeedstudio.com/SenseCAP-S2101-LoRaWAN-Air-Temperature-and-Humidity-Sensor-p-5354.html)
- [Thinger docs](https://docs.thinger.io)