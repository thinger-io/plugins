# CL - Air Quality Sensor

The CL Air Quality Sensor is a compact low-power sensor device designed for environmental monitoring applications. This device measures key indoor air quality parameters to provide comprehensive environmental data for building management, HVAC control, and occupant health monitoring systems.

## Features

- **Environmental Monitoring**: Measures temperature, humidity, and air quality parameters
- **Compact Design**: Low-power operation suitable for battery-powered deployments
- **Multi-Parameter Sensing**: Monitors multiple environmental conditions simultaneously
- **Long Battery Life**: Optimized for extended operation in remote monitoring applications
- **Indoor Air Quality Assessment**: Provides essential data for healthy building environments

## Applications

- Indoor air quality monitoring in commercial buildings
- HVAC system optimization and control
- Smart building and home automation systems
- Workplace health and safety compliance
- Environmental condition tracking in offices and public spaces

## Thinger.io Integration

The CL Air Quality Sensor integrates with Thinger.io to provide real-time environmental monitoring and data visualization capabilities for IoT applications.

## Requirements

A LoRaWAN server is required to communicate the CL Air Quality Sensor into Thinger.io, some options are:

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

- [Thinger.io Documentation](https://docs.thinger.io)