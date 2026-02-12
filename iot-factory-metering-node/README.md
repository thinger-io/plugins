# Metering Node

The Metering Node is an M-BUS Master Gateway and LoRaWAN Converter designed to integrate M-BUS metering devices into LoRaWAN networks. This device enables remote reading and monitoring of utility meters and industrial equipment with M-BUS interface, transmitting accumulated data via LoRaWAN protocol to gateways for centralized management and analysis.

## Features

- **M-BUS Master Interface**: Reads data from devices with M-BUS interface
- **LoRaWAN Connectivity**: Wireless data transmission using LoRaWAN protocol
- **Multiple Input Types**: 
  - 4-20 mA analog input
  - Digital input
  - Pulse counting
- **Compact Design**: 115 x 140 x 40 mm dimensions
- **Data Accumulation**: Collects and stores meter readings before transmission
- **Long Range Communication**: LoRaWAN technology enables wide-area deployment
- **Low Power Operation**: Optimized for battery-powered or external power scenarios

## Use Cases

- Remote utility meter reading (water, gas, heat, electricity)
- Smart metering infrastructure
- Industrial equipment monitoring
- Building management systems
- Energy consumption monitoring
- Multi-utility data collection and centralization

## Thinger.io Integration

The Metering Node integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling remote monitoring, data visualization, and management of M-BUS connected meters within the Thinger.io platform.

## Requirements

A LoRaWAN server is required to communicate the Metering Node into Thinger.io, some options are:

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

- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/iot-factory/metering-node/)
- [Thinger docs](https://docs.thinger.io)