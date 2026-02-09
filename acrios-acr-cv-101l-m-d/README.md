# M-Bus to LoRaWAN Converter

The M-Bus to LoRaWAN converter is used to retrofit ANY M-Bus meter with LoRaWAN communication. This device enables efficient remote readings of wired M-Bus meters such as electricity meters, water meters, gas meters, and heat meters by integrating them into a LoRaWAN wireless network. The converter reads and transmits energy consumption data, facilitating data collection on consumption in intervals as short as fifteen minutes.

The device supports both primary and secondary M-Bus addressing and is compatible with various meters from different manufacturers, ensuring versatility and easy integration. It features plug-and-play setup, remote configuration capabilities, and quick installation terminals, making it ideal for smart metering applications and district heating industry deployments.

## Features

- Supports up to 10 connected M-Bus meters of different types
- Compatible with wired M-Bus standard (electricity, water, gas, heat meters)
- 2 digital inputs / safety inputs
- 2 digital outputs
- Remote configuration capability
- Plug-and-play setup
- IP65/IP67 enclosure rating
- Operating temperature: -30°C to 60°C
- Dimensions: 90 x 145 x 55 mm
- LoRaWAN connectivity with sensitivity up to -138 dBm
- Radio coverage up to 15 km in line of sight

## Use Cases

- Remote reading of energy meters in district heating systems
- Smart metering for utilities (electricity, water, gas, heat)
- Retrofitting existing M-Bus infrastructure with wireless connectivity
- Energy consumption monitoring in commercial and residential buildings
- Data collection for billing and consumption analysis

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the M-Bus to LoRaWAN converter into Thinger.io, some options are:

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