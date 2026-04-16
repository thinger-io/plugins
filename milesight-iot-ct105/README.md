# Smart Current Transformer - CT105

The CT105 is a LoRaWAN® Smart Current Transformer designed for monitoring energy and analyzing consumption remotely. Part of the Milesight CT10x series, it provides multiple current capacity options to suit different energy monitoring applications and supports sending threshold alarms. The CT105 model features a 500A current capacity, making it suitable for high-power electrical circuit monitoring.

## Thinger.io Integration

This device integrates with Thinger.io through LoRaWAN network servers, enabling remote current monitoring, energy analysis, and alarm notifications for industrial and commercial electrical systems.

## Requirements

A LoRaWAN server is required to communicate the Smart Current Transformer CT105 into Thinger.io, some options are:

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

## Technical Specifications

- **Protocol**: LoRaWAN®
- **Current Capacity**: 500A (CT105 model)
- **Frequency Plans**: AS923, AU915-928, CN470-510, EU863-870, IN865, RU864, US915, KR920
- **Antenna Connector**: 1 × 50Ω SMA Connector (Center PIN: SMA Female)
- **Enclosure**: IP30
- **Dimensions**: 86.5 × 31 × 37.4 mm
- **Operating Temperature**: -20°C to 70°C
- **Transmission Range**: Up to 2 km

## Additional Resources

Milesight resources can be found at:

- [Product Page](https://www.milesight.com/iot/product/lorawan-sensor/ct10x)
- [Datasheet](https://resource.milesight.com/milesight/iot/document/ct10x-datasheet-en.pdf)
- [Thinger docs](https://docs.thinger.io)