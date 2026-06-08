# S2102 - LoRaWAN® Light Intensity Sensor

The SenseCAP S2102 is a LoRaWAN® light intensity sensor designed for industrial long-distance data acquisition applications. It measures light intensity across a wide range from 0 to 160,000 lux with ±5% accuracy and 1 lux resolution. The sensor features an IP66-rated weatherproof enclosure, built-in replaceable battery for minimal maintenance, and Bluetooth 5.0 connectivity for easy configuration and firmware upgrades. Supporting LoRaWAN v1.0.3, it integrates seamlessly with existing gateways and network servers to build flexible, high-performance sensor networks for outdoor and industrial monitoring.

## Features

- **Wide Measurement Range**: 0 to 160,000 lux
- **High Accuracy**: ±5% measurement accuracy
- **High Resolution**: 1 lux
- **Wireless Connectivity**: LoRaWAN v1.0.3 protocol
- **Bluetooth 5.0**: For easy configuration and firmware updates
- **Industrial Design**: IP66 weatherproof enclosure
- **Wide Temperature Range**: -40°C to 85°C operating temperature
- **Low Maintenance**: Built-in replaceable battery
- **Compact Form Factor**: 25 x 9.5 x 9 mm dimensions
- **Microcontroller**: Wio-E5 (STM32WLE5JC)

## Use Cases

- Smart agriculture and greenhouse monitoring
- Street lighting management
- Building automation and energy optimization
- Environmental monitoring
- Solar panel efficiency tracking
- Outdoor workspace illumination control
- Industrial facility lighting management

## Thinger.io Integration

The SenseCAP S2102 integrates with Thinger.io through LoRaWAN network servers, enabling real-time light intensity monitoring, data visualization, and automated control workflows.

## Requirements

A LoRaWAN server is required to communicate the SenseCAP S2102 into Thinger.io, some options are:

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

Start sending uplinks for autoprovisioning devices and buckets. This product also provides a predefined dashboard and downlinks.

## Additional Resources

SenseCAP resources can be found at:

- [SenseCAP Documentation](https://wiki.seeedstudio.com/Network/SenseCAP_Network/)
- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/sensecap/sensecaps2102-light)
- [Thinger.io Documentation](https://docs.thinger.io)