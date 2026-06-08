# DF701 - Indoor Waste Bin Laser Level Sensor

The CNDingtek DF701 is a laser level sensor designed for monitoring indoor waste bins. The device measures fill levels and reports data to a LoRaWAN® network, enabling garbage collecting authorities to optimize collection schedules and improve waste management efficiency. With a compact design and non-contact laser detection, the DF701 provides reliable full/empty status monitoring for smart city and waste management applications.

## Features

- **Laser Detection Technology**: Non-contact measurement using laser ranging
- **Indoor Optimization**: Specifically designed for indoor waste bin monitoring
- **Maximum Detection Range**: Up to 1.2-1.5 meters
- **Compact Design**: 67mm×59mm×23mm dimensions
- **LoRaWAN Connectivity**: Long-range wireless communication for IoT networks
- **Battery Powered**: Autonomous operation with low power consumption
- **Grey ABS Housing**: Durable construction suitable for waste management environments
- **Blind Area**: 5cm minimum detection distance
- **Height Accuracy**: ±3cm measurement precision

## Use Cases

- Smart waste management systems
- Indoor bin fill level monitoring
- Waste collection route optimization
- Building facility management
- Smart city waste infrastructure
- Commercial and residential waste monitoring

## Thinger.io Integration

The DF701 integrates with Thinger.io through LoRaWAN connectivity, enabling real-time monitoring, data visualization, and automated alerts for waste collection management.

## Requirements

A LoRaWAN server is required to communicate the CNDingtek DF701 into Thinger.io, some options are:

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
This product also provides a predefined dashboard for monitoring waste bin fill levels and optimizing collection routes.

## Additional Resources

CNDingtek resources can be found at:

- [DF701 Product Page](https://www.dingtek.com/waste-bin-sensor-df701)
- [Thinger docs](https://docs.thinger.io)