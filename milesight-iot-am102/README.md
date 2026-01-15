# AM102 - Milesight 2-in-1 IAQ Sensor

The Milesight AM102 is a compact indoor ambience monitoring sensor designed for measurement of temperature and humidity. These data are displayed on the E-ink screen in real-time, allowing users to quantify the indoor environment and comfort levels. The device is ideal for building automation, smart offices, and environmental monitoring applications.

## Thinger.io Integration

This product enables automatic device provisioning and data visualization for Milesight AM102 sensors through Thinger.io's IoT platform.

## Requirements

A LoRaWAN server is required to communicate the Milesight AM102 into Thinger.io, some options are:

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

Milesight resources can be found at:

- [Milesight Official Website](https://www.milesight.com/)
- [Thinger docs](https://docs.thinger.io)