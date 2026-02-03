# SDI-12-TEK - SDI-12 To LoRaWAN®

The Koidra SDI-12-TEK is an SDI-12 to LoRaWAN® converter. It allows SDI-12 devices to use the LoRaWAN wireless protocol, which simplifies IoT installation and reduces installation and maintaining costs. This converter enables remote monitoring of environmental sensors in agriculture, water management, and other applications where SDI-12 sensors are deployed.

## Features

- **SDI-12 Interface**: Connects with up to 62 uniquely addressed SDI-12 sensors
- **LoRaWAN Connectivity**: Long-range wireless communication capability
- **IP67 Enclosure**: Weather-resistant for outdoor installations
- **Compact Design**: 160 x 100 x 60 mm dimensions
- **Low Power Operation**: Optimized for battery-powered remote deployments

## Applications

- Smart Agriculture
- Environmental Monitoring
- Water Management
- Remote Sensor Networks
- Weather Stations

## Thinger.io Integration

The SDI-12-TEK integrates with Thinger.io through LoRaWAN network servers, enabling seamless data collection and visualization from SDI-12 sensors.

## Requirements

A LoRaWAN server is required to communicate the Koidra SDI-12-TEK into Thinger.io, some options are:

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

Koidra resources can be found at:

- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/koidra/sdi-12-tek/)
- [Thinger docs](https://docs.thinger.io)