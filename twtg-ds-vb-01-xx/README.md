# NEON Vibration Sensor

The NEON Vibration Sensor is a LoRaWAN-enabled industrial vibration monitoring device designed for predictive maintenance and condition monitoring applications. It detects and measures vibration levels in machinery and equipment, enabling early detection of mechanical issues and optimizing maintenance schedules.

## Thinger.io Integration

This device integrates with Thinger.io through LoRaWAN connectivity, enabling real-time monitoring of vibration data, automated alerts, and comprehensive analytics for predictive maintenance workflows.

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

NEON resources can be found at:

- [NEON Website](https://www.neon-product.com/)
- [Thinger docs](https://docs.thinger.io)