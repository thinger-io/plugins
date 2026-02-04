# CC1 Smart Badge

The CC1 is a compact smart badge featuring a high-resolution 600x400 pixel interactive e-paper display. Designed for versatile identification and information display applications, it combines remote management capabilities with smartphone-like functionality while maintaining efficient power consumption through its e-paper technology. The device enables remote updates and user interaction management through DataView tasks, providing controlled access to device functions without exposing underlying configuration details.

## Thinger.io Integration

The CC1 smart badge integrates with Thinger.io through LoRaWAN connectivity, enabling remote content management, device monitoring, and interactive task execution for digital signage, access control, and personnel identification applications.

## Requirements

A LoRaWAN server is required to communicate the CC1 into Thinger.io, some options are:

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

Start sending uplinks for autoprovisioning devices and buckets. The CC1 supports remote screen updates and DataView task management through downlink messages, enabling dynamic content delivery and user interaction tracking.

## Additional Resources

- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/infrafon/cc1/)
- [Thinger.io Documentation](https://docs.thinger.io)