# SDI-12-DRA - SDI-12 To LoRaWAN®

The Koidra SDI-12 is an SDI-12 to LoRaWAN® converter. It allows the SDI-12 devices to use LoRaWAN wireless protocol which simplifies the IoT installation and reduces the installation/maintaining cost. This device provides a bridge between SDI-12 intelligent sensors and LoRaWAN networks, enabling remote monitoring of environmental data over long-range, low-power wireless connections.

## Features

- **LoRaWAN 1.0.3 Class A** protocol support
- **SDI-12 Interface** for connecting SDI-12 compatible sensors
- **Ultra-low power consumption** for extended battery life
- **Controllable power output** to external sensors
- **IP67 enclosure** for outdoor deployments
- Long-range wireless communication via LoRaWAN
- Simplified IoT installation with wireless connectivity
- Reduced installation and maintenance costs

## Use Cases

- Environmental monitoring with SDI-12 sensors
- Agricultural soil moisture and temperature measurement
- Weather station data collection
- Hydrology and water quality monitoring
- Remote sensor deployments in harsh environments
- Smart agriculture applications
- Research and scientific data logging

## Thinger.io Integration

The SDI-12-DRA integrates with Thinger.io through LoRaWAN network servers, enabling cloud-based data visualization, storage, and device management for SDI-12 sensor networks.

## Requirements

A LoRaWAN server is required to communicate the Koidra SDI-12-DRA into Thinger.io, some options are:

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

- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/koidra/sdi-12-dra/)
- [Thinger docs](https://docs.thinger.io)