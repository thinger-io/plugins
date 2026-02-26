# izi-io 4840 - I/O Controller

The izinto izi-io 4840 is a multi-I/O controller with edge computing and LoRaWAN® connection that provides software configurable inputs for connecting digital, analog, and temperature sensors as well as Modbus and other serial devices.

## Features

- Eight individually software-configurable inputs for digital and analog process signals or RTD temperature sensors
- Support for 4-20 mA analog input
- Pulse count and pulse frequency measurement
- Voltage and current measurement capabilities
- Digital input and potentiometer support
- Modbus/RTU interface for connecting serial devices
- LoRaWAN® radio interface for long-range wireless connectivity
- Edge computing capabilities for local data processing
- microSD card slot for recording measurement data

## Use Cases

- Industrial process monitoring
- Temperature and environmental sensing
- Remote I/O control and monitoring
- Power grid monitoring applications
- Energy management systems
- Building automation
- Agricultural monitoring

## Thinger.io Integration

The izi-io 4840 integrates with Thinger.io through LoRaWAN connectivity, enabling remote monitoring and control of connected sensors and actuators.

## Requirements

A LoRaWAN server is required to communicate the izinto izi-io 4840 into Thinger.io, some options are:

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

izinto resources can be found at:

- [izinto Website](https://www.izinto.online/)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/izinto/izi-io-4840/)
- [Thinger docs](https://docs.thinger.io)