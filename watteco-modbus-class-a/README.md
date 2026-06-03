# Modbus classe A - Modbus Interface

The ModBus/LoRaWAN® Bridge collects data from any ModBus RTU existing equipment and connects these devices to a public or private LoRaWAN® network. The Bridge has the capability to change the behaviour of the ModBus device by writing into its registers.

## Features

- Acts as a ModBus master device
- Manages ModBus slaves connected on wired bus (RTU mode)
- Read and write capability to ModBus registers
- LoRaWAN® Class A connectivity
- Integrates existing industrial equipment into LoRaWAN® networks
- Remote monitoring and control of ModBus devices
- Energy-efficient operation

## Use Cases

- Industrial automation and monitoring
- Building management systems
- Energy metering and submetering
- Legacy equipment integration
- Remote sensor data collection
- Process control and SCADA applications

## Thinger.io Integration

This device enables seamless integration of ModBus RTU equipment into Thinger.io through LoRaWAN® connectivity, allowing remote monitoring and control of industrial devices.

## Requirements

A LoRaWAN server is required to communicate the Modbus Interface into Thinger.io, some options are:

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

- [Thinger docs](https://docs.thinger.io)