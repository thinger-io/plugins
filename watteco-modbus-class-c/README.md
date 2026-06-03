# Modbus classe C - Modbus Interface

The ModBus/LoRaWAN® Bridge collects data from any ModBus RTU existing equipment and connects these devices to a public or private LoRaWAN® network. The Bridge has the capability to change the behaviour of the ModBus device by writing into its registers.

## Features

- Acts as a ModBus master managing ModBus slaves connected on a wired bus (RTU mode)
- Supports management of all variables (read and write) of ModBus (or JBus) RTU slave equipment from a remote server via LoRaWAN®
- Remote control capabilities for PLC devices to control motors, valves, and other equipment
- Class C LoRaWAN device for bidirectional communication
- Enables wireless connectivity for legacy ModBus equipment

## Use Cases

- Remote monitoring and control of ModBus-enabled industrial equipment
- Integration of existing ModBus RTU devices into LoRaWAN networks
- Railway installation monitoring
- Industrial automation and remote PLC control
- Data collection from distributed ModBus sensors

## Thinger.io Integration

This device integrates with Thinger.io through LoRaWAN connectivity, enabling remote monitoring and control of connected ModBus equipment.

## Requirements

A LoRaWAN server is required to communicate the Modbus classe C device into Thinger.io, some options are:

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

Start sending uplinks for autoprovisioning devices and buckets. This product also provides a predefined dashboard and downlinks for remote configuration and control of connected ModBus equipment.

## Additional Resources

- [Thinger docs](https://docs.thinger.io)