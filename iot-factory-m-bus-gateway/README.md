# M-BUS LORAWAN GATEWAY

The M-BUS LoRaWAN Gateway is a protocol converter that bridges M-Bus metering networks with LoRaWAN infrastructure. Acting as an M-Bus Master, this gateway reads consumption data from connected energy meters and transmits the information via LoRaWAN to cloud-based IoT platforms, enabling remote monitoring and management of utility metering systems.

## Features

- **M-Bus Master Interface**: Manages communication with M-Bus slave devices such as electricity, gas, water, and heat meters
- **LoRaWAN Connectivity**: Enables long-range wireless transmission of metering data to LoRaWAN networks
- **Multi-Device Support**: Capable of managing multiple M-Bus devices on a single bus line
- **Data Rate Support**: Compatible with standard M-Bus data rates up to 38400 bps
- **Network Compatibility**: Operates on both public and private LoRaWAN networks with support for all standard data rates
- **Protocol Conversion**: Seamlessly converts M-Bus protocol data to LoRaWAN packet format

## Use Cases

- Smart metering infrastructure for utilities
- Remote reading of energy consumption meters
- Building energy management systems
- District heating and cooling monitoring
- Multi-tenant utility billing automation
- Smart city utility monitoring applications

## Thinger.io Integration

The M-BUS LoRaWAN Gateway integrates with Thinger.io through a LoRaWAN network server, enabling centralized management, data visualization, and analytics of connected metering devices.

## Requirements

A LoRaWAN server is required to communicate the M-BUS LoRaWAN Gateway into Thinger.io, some options are:

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

Start sending uplinks for autoprovisioning devices and buckets. This product also provides a predefined dashboard and downlinks.

## Additional Resources

- [Thinger docs](https://docs.thinger.io)