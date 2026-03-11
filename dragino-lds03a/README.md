# LDS03A - Door Sensor

The Dragino LDS03A is an outdoor LoRaWAN door sensor designed to detect and monitor door open/close status in real-time. It transmits door status events to IoT servers via LoRaWAN network, making it ideal for outdoor and rugged environments requiring long-range wireless monitoring.

The LDS03A features datalog capabilities to record open/close events with retrievable history, and includes an open alarm feature that can trigger notifications when a door remains open beyond a configured threshold.

## Features

- **Open/Close Detection**: Real-time monitoring of door status
- **Datalog Feature**: Records open/close events with retrievable history via LoRaWAN
- **Open Alarm**: Configurable alert when door remains open for extended periods
- **Long Battery Life**: Powered by 8500 mAh Li-SOCI2 battery with up to 10 years of operation
- **Periodic Reporting**: Sends data every 2 hours plus event-triggered transmissions
- **Ultra-Low Power**: Optimized for long-term deployment
- **Outdoor Rated**: Designed for rugged outdoor environments
- **LoRaWAN Connectivity**: Long-range wireless communication

## Use Cases

- Building access control and security monitoring
- Outdoor facility management
- Asset protection and perimeter security
- Remote site monitoring
- Smart building applications
- Industrial door monitoring

## Thinger.io Integration

The LDS03A integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling centralized monitoring, data visualization, and alarm management for door sensor deployments.

## Requirements

A LoRaWAN server is required to communicate the Dragino LDS03A into Thinger.io, some options are:

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

- [Dragino Official Website](https://www.dragino.com)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/dragino/lds03a/)
- [Thinger docs](https://docs.thinger.io)