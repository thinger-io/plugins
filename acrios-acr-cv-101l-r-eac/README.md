# RS-485 to LoRaWAN Converter, Externally Powered

The RS-485 to LoRaWAN converter is designed to retrofit any RS-485 meter with LoRaWAN communication capability. This externally powered device enables seamless integration of legacy RS-485/Modbus equipment into modern LoRaWAN networks, providing long-range wireless connectivity for industrial monitoring and metering applications.

## Features

- **RS-485/Modbus Interface**: Connects to any RS-485 enabled meter or sensor
- **LoRaWAN Connectivity**: Long-range wireless communication
- **External Power Supply**: DC powered operation for continuous monitoring
- **IP67 Enclosure**: Weather-resistant design for indoor and outdoor installations
- **Wide Operating Temperature**: -30°C to 60°C
- **Compact Design**: 90 x 145 x 55 mm dimensions

## Use Cases

- Retrofit existing RS-485 meters with LoRaWAN connectivity
- Remote metering and monitoring applications
- Industrial sensor networks
- Smart city infrastructure
- Energy management systems
- Water and gas metering

## Thinger.io Integration

This device can be integrated into Thinger.io through LoRaWAN network servers, enabling remote device management, data visualization, and automation capabilities.

## Requirements

A LoRaWAN server is required to communicate the RS-485 to LoRaWAN converter into Thinger.io, some options are:

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

- [ACRIOS Wiki](https://wiki.acrios.com/)
- [Thinger docs](https://docs.thinger.io)