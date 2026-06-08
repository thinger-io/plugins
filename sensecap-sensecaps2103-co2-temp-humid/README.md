# S2103- LoRaWAN® CO2, Temperature, and Humidity Sensor

The SenseCAP S2103 is a LoRaWAN®-enabled environmental sensor designed for industrial long-distance data acquisition. It monitors CO2 levels, temperature, and humidity with a wide measurement range of 400 to 10000 ppm for CO2, -40°C to 85°C for temperature, and 0 to 100% RH for humidity. The device features IP66 enclosure protection, Bluetooth 5.0 for easy configuration and firmware upgrades, and a built-in replaceable battery for minimal maintenance. It supports three different LoRaWAN® network architectures, enabling seamless integration with existing gateways and network servers for building flexible and high-performance sensor networks.

## Features

- **CO2 Measurement**: 400 to 10000 ppm range
  - 400 to 5000 ppm: ±(30+3%MV) accuracy
  - 5000 to 10000 ppm: ±10%MV accuracy
- **Temperature Monitoring**: -40°C to 85°C
- **Humidity Detection**: 0 to 100% RH
- **Connectivity**: LoRaWAN® for long-range wireless communication
- **Configuration**: Bluetooth 5.0 for easy setup and firmware updates
- **Enclosure**: IP66 rated for outdoor and indoor applications
- **Power**: Built-in replaceable battery for extended operation
- **Compact Design**: 25 x 9.5 x 9 mm dimensions

## Use Cases

- Indoor and outdoor air quality monitoring
- Carbon emission tracking
- Smart building environmental control
- Industrial facility monitoring
- Agricultural environmental management
- HVAC system optimization
- Workplace safety and compliance monitoring

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the SenseCAP S2103 into Thinger.io, some options are:

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

SenseCAP resources can be found at:

- [SenseCAP Documentation](https://www.seeedstudio.com/sensecap)
- [Thinger docs](https://docs.thinger.io)