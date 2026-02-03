# Action Button

The Action Button is a compact LoRaWAN-enabled IoT button featuring tactile feedback in a very compact form factor. This wireless sensor device is designed to detect and transmit user interactions wirelessly over long-range LoRaWAN networks, enabling remote triggering, alerts, and action-based automation scenarios.

## Thinger.io Integration

The Action Button integrates with Thinger.io through LoRaWAN network servers, allowing automatic device provisioning and data visualization. The device sends uplink messages when button interactions are detected, enabling real-time event-driven applications.

## Requirements

A LoRaWAN server is required to communicate the Action Button into Thinger.io, some options are:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

## Features

- **Compact Form Factor**: Ultra-compact housing designed for easy deployment
- **Tactile Feedback**: Provides tactile confirmation on button press
- **Multiple Gestures**: Supports detection of single press, double press, and long press events
- **Long Range Communication**: LoRaWAN connectivity for extended wireless range
- **Battery Powered**: Ultra-low power design for extended battery life
- **Easy Installation**: Simple mounting options for various applications

## Use Cases

- Emergency alerts and alarm triggering
- Access control and check-in systems
- Call buttons for assistance requests
- Process control triggers in industrial environments
- Event logging and attendance tracking
- Smart building automation controls
- Patient or employee notification systems

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed a new Product will be created for this device.

### Configuration

The Product is already preconfigured, check that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your desire.

### Usage

Start sending uplinks for autoprovisioning devices and buckets.
This product also provides a predefined dashboard and downlinks.

## Additional Resources

- [Thinger.io Documentation](https://docs.thinger.io)