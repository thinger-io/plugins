# DC520 - People Counter

The CNDingtek DC520 is a microwave radar bidirectional people counter designed for indoor use, which calculates the people number for in/out respectively. It supports entrance and exit flow monitoring to help building operators understand occupancy movement and service demand patterns for smart building and public space operations.

## Features

- **Bidirectional Counting**: Distinguishes entrance and exit flow for accurate occupancy movement analysis
- **Microwave Radar Technology**: Reliable detection for indoor environments
- **Detection Range**: Up to 3 meters
- **Target Speed Detection**: Up to 1.5 m/s
- **Compact Design**: 110 x 109 x 25 mm, 80 grams
- **LoRaWAN Connectivity**: Real-time data transmission to building platforms
- **Wide Operating Temperature**: -20°C to +70°C
- **Low Power Consumption**: 125mA during detection, max 800mA during reporting

## Use Cases

- Smart building occupancy monitoring
- Conference room and meeting space management
- Public space crowd control
- Factory and facility operations
- Hotel and hospitality venue monitoring
- Parks and recreational facility management
- Entrance and exit flow analysis

## Thinger.io Integration

The DC520 integrates with Thinger.io through LoRaWAN connectivity, enabling real-time monitoring and analysis of people counting data for smart building applications.

## Requirements

A LoRaWAN server is required to communicate the CNDingtek DC520 into Thinger.io, some options are:

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

CNDingtek resources can be found at:

- [Product Page](https://www.dingtek.com/dc520-bi-directional-people-counter)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/dingtek/dc520)
- [Thinger docs](https://docs.thinger.io)