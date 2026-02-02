# DigiSilo Radar Sensor

The Beiselen Service GmbH DigiSilo is a compact distance measurement device and presence detector that consists of low power, high precision, pulsed short-range radar sensor and can measure in a distance range from 50 cm to 7 meters. DigiSilo is made for silo monitoring with different mediums like grain, feedstock, flour, or liquids.

## Features

- **Distance Measurement**: 50 cm to 7 meters range
- **Motion Detection**: Built-in presence detector
- **High Precision**: Pulsed short-range radar technology
- **Compact Design**: 280 x 125 x 60 mm
- **Weatherproof**: IP67 enclosure
- **Wide Temperature Range**: -30°C to 60°C
- **Low Power Consumption**: Optimized for long-term battery operation
- **LoRaWAN Connectivity**: Long-range wireless communication

## Use Cases

- Silo level monitoring for grain storage
- Feedstock inventory management
- Flour and powder level detection
- Liquid tank monitoring
- Presence detection in industrial environments
- Agricultural storage management

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the DigiSilo Radar Sensor into Thinger.io, some options are:

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

- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/beiselen/radar/)
- [Thinger.io Documentation](https://docs.thinger.io)