# The Things Uno

The Things Uno is based on the Arduino Leonardo with an added Microchip LoRaWAN® module. It is fully compatible with the Arduino IDE and existing shields. The board integrates a Microchip RN2483 module for LoRa connectivity through an on-board antenna, making it an ideal development platform for creating LoRaWAN-enabled IoT applications.

## Features

- **Microcontroller**: Based on Arduino Leonardo
- **LoRaWAN Module**: Microchip RN2483
- **Connectivity**: LoRaWAN protocol for long-range, low-power communication
- **Compatibility**: Fully compatible with Arduino IDE
- **Shield Support**: Compatible with existing Arduino shields
- **Antenna**: Integrated on-board antenna
- **Development**: Perfect for prototyping and developing LoRaWAN applications

## Use Cases

- IoT application development and prototyping
- Educational projects for learning LoRaWAN technology
- Sensor networks with long-range connectivity
- Low-power remote monitoring solutions
- Arduino-based LoRaWAN integrations

## Thinger.io Integration

The Things Uno can be integrated with Thinger.io through a LoRaWAN network server, enabling remote device management, data visualization, and control capabilities.

## Requirements

A LoRaWAN server is required to communicate the The Things Uno into Thinger.io, some options are:

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

The Things Uno resources can be found at:

- [The Things Network Documentation](https://www.thethingsnetwork.org/docs/devices/uno/)
- [The Things Industries Documentation](https://www.thethingsindustries.com/docs/hardware/devices/models/the-things-uno/)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/the-things-products/the-things-uno/)
- [Thinger docs](https://docs.thinger.io)