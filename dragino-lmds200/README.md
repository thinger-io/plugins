# LMDS200 - Microwave Radar Distance Sensor

The Dragino LMDS200 is a LoRaWAN Microwave Radar Distance Detection Sensor that uses 24 GHz microwave radar technology to detect the distance between the sensor and different objects. With a measurement range of 0.5m to 20m and ±10cm accuracy, this sensor is ideal for applications such as smart parking, industrial presence monitoring, level detection, and security systems.

## Features

- **LoRaWAN 1.0.3 Class A** protocol support
- **24 GHz Microwave Radar** technology for accurate distance detection
- **Measurement Range**: 0.5m to 20m
- **Accuracy**: ±10cm
- **Horizontal Angle**: 78°
- **Ultra-low Power Consumption** for extended battery life
- **Multi-Object Detection** capability

## Use Cases

- Smart parking systems
- Industrial presence monitoring
- Level detection and monitoring
- Security and perimeter monitoring
- Warehouse management
- Tank level measurement

## Thinger.io Integration

The LMDS200 integrates with Thinger.io through LoRaWAN network servers, enabling real-time distance monitoring, data visualization, and automated alert systems.

## Requirements

A LoRaWAN server is required to communicate the Dragino LMDS200 into Thinger.io, some options are:

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

- [Product Page](https://www.dragino.com/products/distance-level-sensor/item/197-lmds200.html)
- [Thinger.io Documentation](https://docs.thinger.io)