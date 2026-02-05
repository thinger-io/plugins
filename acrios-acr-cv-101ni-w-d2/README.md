# Wireless M-Bus to LoRaWAN Converter

The Wireless M-Bus to LoRaWAN converter is designed to retrofit ANY Wireless M-Bus meter with LoRaWAN communication. This device enables remote data collection from utility meters equipped with Wireless M-Bus interface by converting and transmitting the data over LoRaWAN networks, allowing seamless integration into modern IoT infrastructure.

## Features

- **Universal Compatibility**: Works with any Wireless M-Bus enabled meter
- **LoRaWAN Connectivity**: Supports LoRaWAN 1.0.3 specification
- **Wide Frequency Support**: Operates in 868 MHz frequency band
- **Rugged Design**: IP67 rated enclosure for outdoor installations
- **Extended Range**: Long-range wireless communication via LoRa technology
- **Battery Powered**: Autonomous operation with replaceable battery
- **Wide Operating Temperature**: Functions from -30°C to +60°C

## Applications

- Utility metering (water, gas, electricity, heat)
- Remote meter reading infrastructure
- Smart city deployments
- Building automation systems
- Industrial monitoring and automation
- Retrofitting legacy metering infrastructure

## Thinger.io Integration

This device seamlessly integrates with Thinger.io through LoRaWAN network servers, enabling remote monitoring, data visualization, and management of Wireless M-Bus meters.

## Requirements

A LoRaWAN server is required to communicate the Wireless M-Bus to LoRaWAN converter into Thinger.io, some options are:

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

- [Thinger docs](https://docs.thinger.io)