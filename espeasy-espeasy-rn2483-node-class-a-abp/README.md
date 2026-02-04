# RN2483 (Class A ABP)

The ESPEasy RN2483 (Class A ABP) is a LoRaWAN® development board based on the Microchip RN2483 module that supports Activation by Personalization (ABP). It supports over 100 sensors and provides an easy-to-use solution for long-range wireless data transmission in IoT applications.

## Features

- **LoRaWAN Class A ABP**: Supports Activation by Personalization for simplified network joining
- **Microchip RN2483 Module**: Integrated LoRa transceiver with on-board LoRaWAN protocol stack
- **Wide Sensor Support**: Compatible with over 100 different sensor types via ESPEasy firmware
- **Long Range**: Up to 15 km coverage in suburban areas and up to 5 km in urban environments
- **Low Power Operation**: Optimized for battery-powered applications with extended lifetime
- **Frequency Bands**: Operates in 433 MHz and 868 MHz bands
- **High Sensitivity**: Receiver sensitivity down to -146 dBm
- **Adjustable TX Power**: Up to +14 dBm output power
- **ASCII Command Interface**: Simple UART-based communication
- **GPIO and Analog Inputs**: 14 GPIOs for control and status, shared with 13 analog inputs
- **Operating Voltage**: 2.1V to 3.6V (3.3V typical)
- **Temperature Range**: -40°C to +85°C
- **Compact Design**: Suitable for space-constrained deployments

## Thinger.io Integration

This device integrates with Thinger.io through a LoRaWAN network server, enabling seamless data collection, visualization, and device management for sensor-based IoT applications.

## Requirements

A LoRaWAN server is required to communicate the ESPEasy RN2483 (Class A ABP) into Thinger.io, some options are:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed a new Product will be created for this device.

### Configuration

The Product is already preconfigured, check that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your desire.

Since this device uses ABP activation, ensure that the Device Address, Network Session Key, and Application Session Key are properly configured in both the device and the LoRaWAN network server.

### Usage

Start sending uplinks for autoprovisioning devices and buckets. This product also provides a predefined dashboard and downlinks.

## Additional Resources

- [Microchip RN2483 Product Page](https://www.microchip.com/en-us/product/rn2483)
- [RN2483 Datasheet](https://ww1.microchip.com/downloads/en/devicedoc/50002346c.pdf)
- [ESPEasy Documentation](https://espeasy.readthedocs.io/)
- [Thinger.io Documentation](https://docs.thinger.io)