# OpenCollar - Wildlife Protection

The OpenCollar is a first-generation collection of advanced open-source tracking devices designed for wildlife protection and conservation monitoring. These tracking collars are mounted on wildlife animals and provide GPS location data and telemetry for environmental and wildlife monitoring projects. The devices utilize LoRaWAN connectivity for long-range, low-power communication, enabling high-frequency tracking with extended battery life measured in years.

## Features

- **GPS/GNSS Tracking**: Global navigation satellite system for accurate animal location tracking
- **LoRaWAN Connectivity**: Long-range wireless communication with low power consumption
- **Multi-Connectivity Options**: Support for LoRaWAN, Iridium satellite, and VHF
- **Extended Battery Life**: Years of operation on a single battery charge
- **Open-Source Design**: Hardware and software designed for collaboration and customization
- **Wildlife Conservation**: Purpose-built for environmental and wildlife monitoring applications
- **Integration Ready**: Compatible with platforms like EarthRanger and Grafana for data visualization

## Use Cases

- Wildlife tracking and monitoring
- Animal behavior research
- Conservation management
- Anti-poaching protection
- Habitat analysis
- Migration pattern studies
- Endangered species monitoring

## Thinger.io Integration

The OpenCollar devices transmit data via LoRaWAN, enabling seamless integration with Thinger.io for real-time wildlife monitoring and analytics.

## Requirements

A LoRaWAN server is required to communicate the OpenCollar device data into Thinger.io, some options are:

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

OpenCollar resources can be found at:

- [Smart Parks - OpenCollar.io](https://www.smartparks.org/opencollar-io/)
- [Smart Parks Wiki](https://wiki.smartparks.org/devices/opencollar/)
- [Thinger docs](https://docs.thinger.io)