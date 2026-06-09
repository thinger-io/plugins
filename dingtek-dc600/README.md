# DC600 - Water Leakage Sensor

The CNDingtek DC600 is a LoRaWAN water leakage sensor with up to 4 channels. It is designed for leak detection in equipment rooms, base stations, tunnels, fire pipes, and critical facility areas requiring fast alarm response. The device provides reliable wireless monitoring for water and liquid detection applications.

## Features

- **Multi-Channel Detection**: Supports up to 4 independent water leak detection channels
- **LoRaWAN Connectivity**: Long-range wireless communication using LoRaWAN protocol
- **Durable Enclosure**: IP66 rated protection against dust and water ingress
- **Wide Operating Temperature**: Functions in environments from -20°C to 70°C
- **Compact Design**: 80 x 78 x 30 mm dimensions for easy installation

## Use Cases

- Equipment room leak monitoring
- Base station water detection
- Tunnel and underground facility monitoring
- Fire protection pipe leak detection
- Critical infrastructure area surveillance
- Industrial and commercial facility protection

## Thinger.io Integration

The DC600 integrates with Thinger.io through LoRaWAN network servers, enabling remote monitoring, alerting, and data visualization of water leak events across multiple channels.

## Requirements

A LoRaWAN server is required to communicate the DC600 into Thinger.io, some options are:

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

Start sending uplinks for autoprovisioning devices and buckets. This product also provides a predefined dashboard for monitoring water leak events and channel status.

## Additional Resources

CNDingtek resources can be found at:

- [Manufacturer Website](https://www.dingtek.com)
- [TTN Device Repository](https://www.thethingsnetwork.org/device-repository/devices/dingtek/dc600)
- [Thinger docs](https://docs.thinger.io)