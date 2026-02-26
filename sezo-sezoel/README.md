# EL - Air Quality Sensor

The EL - Air Quality Sensor is a LoRaWAN environment sensor designed for monitoring indoor air quality parameters. This compact IoT device provides real-time environmental data to help ensure healthy and safe indoor conditions in various applications.

## Thinger.io Integration

This device communicates via LoRaWAN protocol, enabling long-range, low-power wireless connectivity for environmental monitoring applications. Integration with Thinger.io allows centralized data collection, visualization, and analysis of air quality metrics.

## Requirements

A LoRaWAN server is required to communicate the EL - Air Quality Sensor into Thinger.io, some options are:

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

- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/)
- [Thinger docs](https://docs.thinger.io)