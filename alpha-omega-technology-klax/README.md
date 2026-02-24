# KLAX - Electricity Meter Reader

The KLAX is a LoRaWAN® device that has an optohead for recording the infrared interface of modern electricity meters. It is designed to read energy consumption data from smart meters using optical communication protocols, enabling remote monitoring and data collection through LoRaWAN networks.

## Features

- **Optical Reading Interface**: SML optohead for infrared interface communication with modern electricity meters
- **Multiple Meter Protocol Support**: Compatible with SML, IEC 62056-21 Mode B/C, Logarex, eBZ, and Tritschler VC3 meters
- **LoRaWAN Connectivity**: Wireless long-range data transmission
- **Compact Design**: 35 x 96 x 40 mm dimensions
- **Battery Powered**: Built-in battery with charge level monitoring
- **IP21 Enclosure**: Protection against solid objects and dripping water
- **Operating Temperature**: 0°C to 60°C

## Thinger.io Integration

The KLAX integrates with Thinger.io through LoRaWAN network servers, enabling automatic device provisioning, real-time energy monitoring, and data visualization.

## Requirements

A LoRaWAN server is required to communicate the KLAX into Thinger.io, some options are:

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
This product also provides a predefined dashboard for monitoring energy consumption data.

## Additional Resources

KLAX resources can be found at:

- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/alpha-omega-technology/klax/)
- [Thinger docs](https://docs.thinger.io)