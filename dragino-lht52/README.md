# LHT52 - Temperature & Humidity Sensor

The Dragino LHT52 is a Long Range LoRaWAN indoor Temperature & Humidity Sensor designed for environmental monitoring applications. It includes a built-in Temperature & Humidity sensor and features a USB Type-C sensor connector to connect to external sensors such as external temperature probes, enabling versatile deployment options for various monitoring scenarios.

## Features

- Built-in Temperature & Humidity sensor
- USB Type-C port for connecting external sensors (e.g., DS18B20 temperature probe)
- LoRaWAN Class A protocol
- Wall attachable design for easy installation
- AT Commands for parameter configuration
- Remote configuration via LoRaWAN Downlink
- Firmware upgradable via program
- Low power consumption for extended battery life

## Use Cases

- Indoor climate monitoring
- Smart building management
- Cold chain monitoring
- Warehouse environmental control
- HVAC system optimization
- Agricultural storage facilities
- Server room monitoring
- Museum and archive preservation

## Thinger.io Integration

The LHT52 integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time monitoring of temperature and humidity data with automatic device provisioning and data visualization capabilities.

## Requirements

A LoRaWAN server is required to communicate the Dragino LHT52 into Thinger.io, some options are:

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

- [Documentation](https://www.dragino.com/products/lora-lorawan-end-node/item/151-lht52.html)
- [Thinger docs](https://docs.thinger.io)