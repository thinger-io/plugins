# NEON Vibration Sensor

The NEON Vibration Sensor is a LoRaWAN-enabled device designed for monitoring vibration levels in industrial and infrastructure applications. It provides real-time vibration detection and measurement capabilities, enabling predictive maintenance and condition monitoring of rotating machinery, motors, pumps, and other equipment.

## Thinger.io Integration

This device integrates with Thinger.io through LoRaWAN network servers, enabling automatic device provisioning, data storage, and visualization of vibration metrics.

## Requirements

A LoRaWAN server is required to communicate the NEON Vibration Sensor into Thinger.io, some options are:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://ma.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed a new Product will be created for this device.

### Configuration

The Product is already preconfigured, check that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your desire.

### Usage

Start sending uplinks for autoprovisioning devices and buckets.

This product also provides a predefined dashboard and downlinks.

## Additional Resources

- [Thinger.io Documentation](https://docs.thinger.io)