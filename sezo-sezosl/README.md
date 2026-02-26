# SL - Air Quality Sensor

The SL Air Quality Sensor by SEZO is a compact low-power sensor device designed for monitoring environmental parameters in indoor spaces. This LoRaWAN-enabled device provides comprehensive air quality and environmental monitoring through multiple integrated sensors, delivering essential data for building management, indoor air quality assessment, and IoT applications.

## Features

- **Temperature Monitoring**: Ambient temperature measurement
- **Humidity Sensing**: Relative humidity detection
- **Barometric Pressure**: Atmospheric pressure measurement
- **Light Detection**: Ambient light level monitoring
- **Indoor Air Quality (IAQ)**: Comprehensive air quality index calculation
- **PIR Motion Detection**: Passive infrared occupancy/motion sensing
- **LoRaWAN Connectivity**: Long-range wireless communication with low power consumption
- **Compact Design**: Space-efficient form factor for easy installation
- **Low Power Operation**: Battery-powered operation for extended deployment

## Use Cases

- Indoor air quality monitoring in commercial buildings
- Smart building automation and environmental control
- Workspace health and comfort optimization
- HVAC system optimization based on occupancy and environmental conditions
- Energy efficiency management
- Healthy building certification compliance
- Remote facility monitoring

## Thinger.io Integration

The SL Air Quality Sensor integrates seamlessly with Thinger.io through LoRaWAN connectivity, enabling real-time monitoring, data visualization, and automated responses based on environmental conditions.

## Requirements

A LoRaWAN server is required to communicate the SL Air Quality Sensor into Thinger.io, some options are:

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

- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/sezo/sezosl/)
- [Thinger.io Documentation](https://docs.thinger.io)