# M-BUS LORAWAN GATEWAY

The M-BUS LORAWAN GATEWAY is an M-Bus Master Gateway and LoRaWAN Converter designed to bridge M-Bus metering infrastructure with LoRaWAN networks. This device enables remote reading and transmission of energy consumption data from M-Bus meters including gas, electricity, heat, and water meters for Smart City and utility monitoring applications.

## Features

- **M-Bus Master Interface**: Connects to multiple M-Bus meters
- **LoRaWAN Connectivity**: Class A device with EU868 frequency support
- **Multi-Meter Support**: Manages up to 10 connected meters of different types
- **Digital I/O**: 2 digital inputs for safety monitoring and 2 digital outputs
- **Energy Metering**: Collects consumption data from gas, electricity, heat, and water meters
- **Compact Design**: 115mm form factor for easy installation
- **LoRaWAN Protocol**: Supports standard LoRaWAN data rates
- **Network Compatibility**: Works with both public and private LoRaWAN networks

## Thinger.io Integration

The M-BUS LORAWAN GATEWAY integrates with Thinger.io through LoRaWAN network servers, enabling centralized monitoring and management of M-Bus meter data within the Thinger.io platform.

## Requirements

A LoRaWAN server is required to communicate the M-BUS LORAWAN GATEWAY into Thinger.io, some options are:

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

IOT Factory resources can be found at:

- [IOT Factory Product Page](https://iotfactory.eu/products/iot-sensors/m-bus-to-lorawan-converter/)
- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/iot-factory/m-bus-gateway/)
- [Thinger.io Documentation](https://docs.thinger.io)