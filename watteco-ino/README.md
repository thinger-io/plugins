# In'O - I/O Interface

The WATTECO In'O is a versatile LoRaWAN I/O interface that transforms any type of I/O sensor or actuator into a connected device on public or private LoRaWAN networks. It features 10 optocoupled digital inputs and 4 optocoupled outputs, enabling simultaneous monitoring and control of multiple devices. The In'O operates as either a Class A or Class C device and supports dual power supply configurations: external power from 9V to 24V DC, or internal battery operation.

## Features

- **10 Digital Inputs**: Optocoupled inputs for monitoring levels or counters
- **4 Optocoupled Outputs**: Control outputs with ON/OFF/toggle functionality
- **Dual Power Supply**: External (9-24V DC) or internal battery operation
- **LoRaWAN Class A or Class C**: Flexible communication modes
- **Data Compression**: Efficient data transmission with standard and batch reporting modes
- **Power Supply Monitoring**: Real-time voltage monitoring capability
- **Easy Deployment**: Simple installation and configuration

## Use Cases

- Industrial process monitoring and control
- Building automation and management
- Remote equipment status monitoring
- Energy management systems
- Machine status detection
- Access control systems
- Alarm and notification systems

## Thinger.io Integration

The In'O I/O Interface integrates seamlessly with Thinger.io through LoRaWAN connectivity, enabling centralized monitoring and control of connected sensors and actuators.

## Requirements

A LoRaWAN server is required to communicate the WATTECO In'O into Thinger.io, some options are:

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

WATTECO resources can be found at:

- [Product Page](https://www.watteco.com/product/ino-sensor-lorawan)
- [Technical Support](https://support.watteco.com/ino)
- [Thinger docs](https://docs.thinger.io)