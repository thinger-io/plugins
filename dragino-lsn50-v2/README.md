# LSN50-V2 - Sensor Node

The Dragino LSN50-V2 is a LoRaWAN® end device that allows connecting various external sensors, for example, a temperature sensor probe. It can be used with many applications such as wireless alarm and security systems, home and building automation, automated meter reading, industrial monitoring, and control, and irrigation systems.

## Features

- LoRaWAN v1.0.3 Class A protocol
- STM32L072CZT6 MCU with ARM® Cortex®-M0+ 32-bit RISC core
- Ultra low power consumption
- Powered by 8500mAh Li-SOCI2 battery for long-term use up to 10 years
- IP68 waterproof enclosure for outdoor use
- External sensor support with multiple probe connections
- AT Commands to change parameters
- Downlink configuration support
- Frequency bands: CN470/EU433/KR920/US915/EU868/AS923/AU915/IN865
- Pre-loaded with unique LoRaWAN keys for easy registration

## Thinger.io Integration

The LSN50-V2 integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling remote monitoring and data visualization of connected sensors in IoT applications.

## Requirements

A LoRaWAN server is required to communicate the Dragino LSN50-V2 into Thinger.io, some options are:

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

- [LSN50-V2 Documentation](https://www.dragino.com/downloads/downloads/LSN50-LoRaST/Datasheet_LSN50_v2.pdf)
- [Thinger docs](https://docs.thinger.io)