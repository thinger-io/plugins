# DO200 - Parking Occupancy Sensor

The CNDingtek DO200 is a parking occupation sensor with combination of ultrasonic and magnetic detection, fire sensor, and accelerometer. Designed for smart parking applications, this device provides accurate vehicle detection and monitoring capabilities through LoRaWAN connectivity.

## Features

- **Dual Detection Technology**: Combines ultrasonic and magnetic sensors for reliable occupancy detection
- **Fire Detection**: Integrated fire sensor for enhanced safety monitoring
- **Motion Sensing**: Built-in accelerometer for tamper detection and device positioning
- **Robust Design**: IP68 enclosure for outdoor installation
- **Wide Operating Range**: Functions in temperatures from -20°C to 70°C
- **Compact Form Factor**: 115mm diameter, 50mm height
- **Battery Powered**: Non-rechargeable battery for autonomous operation

## Use Cases

- Smart parking lot management
- Real-time parking space monitoring
- Urban parking guidance systems
- Commercial and residential parking facilities
- Street parking occupancy detection
- Parking revenue optimization

## Thinger.io Integration

This device integrates with Thinger.io through LoRaWAN connectivity, enabling real-time monitoring of parking space occupancy status, fire detection alerts, and device tampering notifications.

## Requirements

A LoRaWAN server is required to communicate the CNDingtek DO200 into Thinger.io, some options are:

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

CNDingtek resources can be found at:

- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/dingtek/do200)
- [Thinger docs](https://docs.thinger.io)