# DC410 - Manhole Sensor

The CNDingtek DC410 is a smart manhole sensor that integrates a liquid/solid level sensor and a movement sensor. Suitable for measuring water and sewage levels in wells and manholes. The data is sent to a LoRaWAN network, then the application server for further processing.

## Features

- **Multi-Sensor Integration**: Combines ultrasonic level detection with motion/movement sensing
- **Long Battery Life**: Internal battery provides over 3 years of operation
- **Robust Design**: IP68 waterproof protection for harsh underground environments
- **LoRaWAN Connectivity**: Low-power wireless communication using LoRaWAN protocol
- **GPS Positioning**: Integrated GPS for location tracking
- **Temperature Monitoring**: Built-in temperature sensor for environmental data
- **Smart Reporting**: Reports immediately on status changes; periodic reporting when stable
- **Compact Form Factor**: 115mm diameter, 50mm height

## Technical Specifications

- **Sensors**: Level (ultrasonic), GPS, motion, temperature
- **Enclosure Rating**: IP68
- **Dimensions**: 115mm diameter × 50mm height
- **Operating Temperature**: -20°C to 70°C
- **Detection Interval**: 10 minutes (default)
- **Battery Type**: Non-rechargeable, 3+ year lifespan
- **Protocol**: LoRaWAN

## Use Cases

- Municipal manhole cover monitoring
- Water level detection in drainage wells
- Sewage system monitoring
- Underground infrastructure safety
- Smart city operations
- Electrical well cover detection
- Sewer network management

## Thinger.io Integration

This device integrates with Thinger.io through LoRaWAN network servers, enabling remote monitoring and management of manhole sensors with automated data processing and alerting.

## Requirements

A LoRaWAN server is required to communicate the CNDingtek DC410 into Thinger.io, some options are:

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

CNDingtek resources can be found at:

- [Manufacturer Website](http://www.dingtek.com)
- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/dingtek/dc410)
- [Thinger.io Documentation](https://docs.thinger.io)