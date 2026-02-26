# AL - Air Quality Sensor

The AL Air Quality Sensor is an air monitoring device designed for indoor environmental quality assessment. This sensor enables real-time monitoring of air quality parameters through LoRaWAN connectivity, providing comprehensive environmental data for smart building applications, health monitoring, and indoor air quality management.

## Thinger.io Integration

The AL Air Quality Sensor integrates with Thinger.io through LoRaWAN protocol, enabling cloud-based monitoring and data visualization. The device transmits environmental measurements via LoRaWAN uplinks, which are processed and stored in Thinger.io for real-time analysis and historical tracking.

## Requirements

A LoRaWAN server is required to communicate the AL Air Quality Sensor into Thinger.io, some options are:

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

- [Thinger docs](https://docs.thinger.io)