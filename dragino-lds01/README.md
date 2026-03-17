# LDS01 - Door Sensor

The Dragino LDS01 consists of a magnetic sensor for detecting the opening and closing of doors, windows, garage doors, vaults, and entryways. The sensor sends a data packet on each open/close event to a LoRaWAN® network server.

## Features

- **LoRaWAN v1.0.3 Class A** compliance
- **Multi-band support**: CN470/EU433/KR920/US915/EU868/AS923/AU915/IN865
- **Compact design**: 64 x 30 x 14 mm dimensions
- **CR2032 coin battery** powered
- **Long battery life**: Up to 12,000 uplink packets (SF7, 14dB) or ~1,300 packets (SF10, 18.5dB) with design goal of 1 year operation
- **Easy battery replacement**: User-replaceable CR2032 battery
- **Dual transmission mode**: Sends data periodically and on each door open/close event
- **Event counting**: Tracks door open times and calculates last door open duration
- **AT Commands** for parameter configuration
- **Pre-loaded unique keys** for LoRaWAN registration

## Use Cases

- Wireless alarm and security systems
- Home and building automation
- Access control monitoring
- Commercial building security
- Warehouse and facility management
- Industrial monitoring and control

## Thinger.io Integration

The LDS01 integrates with Thinger.io through LoRaWAN network servers, enabling remote monitoring and management of door/window status, event counting, and battery levels.

## Requirements

A LoRaWAN server is required to communicate the Dragino LDS01 into Thinger.io, some options are:

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

- [Product Page](https://www.dragino.com/products/lorawan-nb-iot-door-sensor-water-leak/item/157-lds01.html)
- [Thinger docs](https://docs.thinger.io)