# Simple Actuator

The Simple Actuator is a relay-based control device designed to manage one or two relay outputs. This compact actuator provides remote switching capabilities for various automation and control applications, enabling simple on/off control of connected electrical loads.

## Thinger.io Integration

The Simple Actuator integrates with Thinger.io through LoRaWAN connectivity, enabling remote monitoring and control of relay states. The device can be configured to operate in single or dual relay mode depending on application requirements.

## Requirements

A LoRaWAN server is required to communicate the Simple Actuator into Thinger.io, some options are:

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
This product also provides a predefined dashboard and downlinks for relay control operations.

## Features

- Control of 1 or 2 relay outputs
- Remote switching capabilities via LoRaWAN
- Suitable for automation and on/off control applications
- Compact and simple installation

## Additional Resources

- [Thinger.io documentation](https://docs.thinger.io)