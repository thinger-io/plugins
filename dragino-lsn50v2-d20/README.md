# LSN50v2-D20 - Temperature Sensor

The Dragino LSN50v2-D20 is a LoRaWAN Temperature Sensor designed for measuring the temperature of air, liquid, or any object, and then uploading the data to an IoT server via LoRaWAN wireless protocol. It can be used with home and building automation, industrial monitoring and control, and irrigation systems.

## Features

- LoRaWAN v1.0.3 Class A protocol
- DS18B20 temperature sensor with measurement range: -55°C to 125°C
- Accuracy: ±0.5°C (max ±2.0°C)
- Resolution: 0.01°C
- Temperature alarm feature for instant notifications
- Waterproof and outdoor-rated design
- Silica gel sensor cable with double compressed waterproof connection
- 8500mAh Li-SOCI2 battery for long-term use up to 10 years
- Ultra-low power consumption
- AT Commands for parameter configuration
- Downlink support for remote configuration
- Pre-loaded with unique LoRaWAN keys for easy registration

## Supported Frequency Bands

- EU433
- CN470
- EU868
- IN865
- KR920
- AS923
- AU915
- US915

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the Dragino LSN50v2-D20 into Thinger.io, some options are:

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

- [Product Page](https://www.dragino.com/products/lora-lorawan-end-node/item/168-lsn50v2-d20.html)
- [Datasheet](https://www.dragino.com/downloads/downloads/LoRa_End_Node/LSN50v2-D20/Datasheet_LSN50v2-D2x_LoRaWAN_Temperature_Sensor.pdf)
- [Thinger docs](https://docs.thinger.io)