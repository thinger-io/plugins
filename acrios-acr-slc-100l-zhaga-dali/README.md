# LoRaWAN Street Light Module (ZHAGA DALI)

The LoRaWAN street light module is a smart street lighting controller designed for modern street lighting infrastructure. Based on the STM32WL microcontroller, this compact 40mm diameter module features a ZHAGA socket interface and is fully compatible with DALI and DALI-2 protocols, enabling seamless integration with existing street lighting systems and intelligent lighting management.

## Features

- **ZHAGA Compliance**: ZHAGA Book 18 compatible socket for standardized installation
- **DALI/DALI-2 Protocol**: Full compatibility with DALI and DALI-2 lighting control standards
- **LoRaWAN Connectivity**: STM32WL-based long-range wireless communication
- **Compact Design**: 40mm diameter enclosure fits standard street lighting fixtures
- **Environmental Sensors**: Integrated light and temperature monitoring
- **Rugged Construction**: IP67 rated enclosure for outdoor deployment
- **Wide Operating Range**: Functions from -30°C to 60°C
- **Flexible Deployment**: Available as hardware-only, complete solution, or backend with API access

## Use Cases

- Smart city street lighting control and monitoring
- Energy management for municipal lighting infrastructure
- Remote dimming and scheduling of street lights
- Predictive maintenance through sensor monitoring
- Environmental monitoring in urban areas
- Integration with smart city platforms

## Thinger.io Integration

This device integrates with Thinger.io through LoRaWAN network servers, enabling cloud-based management, real-time monitoring, and automated control of street lighting infrastructure.

## Requirements

A LoRaWAN server is required to communicate the LoRaWAN Street Light Module into Thinger.io, some options are:

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

- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/acrios/acr-slc-100l-zhaga-dali/)
- [Thinger docs](https://docs.thinger.io)