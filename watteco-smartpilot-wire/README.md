# SmartPilot-Wire

The WATTECO SmartPilot Wire is a Class C LoRaWAN® actuator that monitors and controls up to 6 operating modes for any electric heater as well as any active load (ON/OFF) driven by a relay. This long-range wireless actuator provides high-performance control for heating systems, enabling remote management and optimization of electric heaters through LoRaWAN connectivity.

## Features

- **Class C LoRaWAN® Device**: Continuous listening for low-latency control
- **Multi-mode Control**: Supports up to 6 operating modes for electric heaters
- **Relay Output**: Controls active loads with ON/OFF switching
- **Mains Powered**: Uses line voltage as power source
- **Compact Design**: 41 x 71 x 17 mm dimensions
- **Operating Temperature**: -20°C to 50°C

## Use Cases

- Electric heater control and automation
- Smart building heating management
- Energy consumption optimization
- Remote heating system control
- Multi-zone heating applications
- Pilot wire compatible heating systems

## Thinger.io Integration

The SmartPilot-Wire integrates with Thinger.io through LoRaWAN network servers, enabling remote monitoring and control of heating systems with real-time status updates and command execution.

## Requirements

A LoRaWAN server is required to communicate the WATTECO SmartPilot-Wire into Thinger.io, some options are:

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
This product also provides a predefined dashboard and downlinks for controlling heater operating modes and relay states.

## Additional Resources

WATTECO resources can be found at:

- [WATTECO Official Website](https://www.watteco.fr)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/watteco/smartpilot-wire)
- [Thinger.io Documentation](https://docs.thinger.io)