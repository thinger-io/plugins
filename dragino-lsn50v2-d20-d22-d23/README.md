# LSN50v2-D20-D22-D23 - Temperature Sensor

The Dragino LSN50v2-D20-D22-D23 is a LoRaWAN Waterproof Outdoor Temperature Sensor designed for Internet of Things applications. It features external DS18B20 temperature probes with waterproof construction, making it suitable for harsh outdoor environments. The device supports LoRaWAN 1.0.3 Class A specification and is designed for ultra-low power consumption, enabling long-term battery operation up to 10 years depending on usage conditions.

The LSN50v2-D20 includes 1 external probe, the LSN50v2-D22 includes 2 external probes, and the LSN50v2-D23 includes 3 external probes, all capable of measuring temperatures from -55°C to 125°C with accuracy of ±0.5°C (maximum ±2.0°C). The sensor supports temperature alarm features with configurable thresholds and includes AT commands for parameter configuration.

## Features

- LoRaWAN v1.0.3 Class A protocol
- 1 to 3 external DS18B20 temperature probes
- Wide temperature measurement range: -55°C ~ 125°C
- High accuracy: ±0.5°C (max ±2.0°C)
- Ultra-low power consumption: 20µA in sleep mode, 125mA @ 20dBm / 44mA @ 14dBm during transmission
- Waterproof and outdoor-rated construction
- Temperature alarm functionality with configurable thresholds
- Battery-powered with up to 10 years operation
- AT commands for parameter configuration
- Configurable uplink intervals and alarm settings
- Multiple frequency bands: CN470/EU433/KR920/US915/EU868/AS923/AU915/IN865

## Use Cases

- Wireless alarm and security systems
- Home and building automation
- Industrial monitoring and control
- Long-range irrigation systems
- Environmental temperature monitoring
- Cold chain logistics
- HVAC system monitoring

## Thinger.io Integration

This device integrates with Thinger.io through LoRaWAN network servers, enabling remote temperature monitoring, data visualization, and alarm management through the Thinger.io platform.

## Requirements

A LoRaWAN server is required to communicate the Dragino LSN50v2-D20-D22-D23 into Thinger.io, some options are:

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

- [Dragino Official Website](https://www.dragino.com)
- [LSN50v2 Product Page](https://www.dragino.com/products/lora-lorawan-end-node/item/155-lsn50v2.html)
- [Thinger.io Documentation](https://docs.thinger.io)