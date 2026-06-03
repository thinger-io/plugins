# Smart Plug

The WATTECO Smart Plug is a LoRaWAN Class C smart device that supports remotely managing the operation and consumption of common household electrical appliances such as lamps, televisions, and heating equipment. It monitors and controls plugged equipment while providing real-time reports about power line quality, energy consumption, voltage, and frequency.

## Features

- **Remote Control**: Up to 3500W – 16A switch On/Off capability
- **Energy Monitoring**: Monitors and reports power, energy, voltage, and frequency
- **Power Line Quality**: Reports voltage and frequency of the power line
- **LoRaWAN Class C**: Optimized for low-latency bidirectional communication
- **Multi-Region Support**: EU863-870, US902-928 frequency bands
- **Socket Compatibility**: Available in socket types E, F, and G
- **Differential Data Compression**: Efficient data transmission
- **Operating Voltage**: 100-250V AC (230V nominal)
- **Operating Temperature**: -20°C to 50°C
- **Dimensions**: 114 x 62 x 40 mm
- **Transmit Power**: 14dBm

## Use Cases

- Residential energy monitoring and control
- Remote management of heating equipment
- Smart lighting control
- Television and appliance scheduling
- Power consumption analysis
- Load management

## Thinger.io Integration

This device integrates with Thinger.io through LoRaWAN network servers, enabling remote monitoring and control of connected appliances with real-time energy consumption data.

## Requirements

A LoRaWAN server is required to communicate the WATTECO Smart Plug into Thinger.io, some options are:

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
This product also provides a predefined dashboard and downlinks for remote control of the smart plug relay.

## Additional Resources

WATTECO resources can be found at:

- [WATTECO Documentation](https://www.nke-watteco.com)
- [Thinger docs](https://docs.thinger.io)