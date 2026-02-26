# izi-io 4840 /heat - I/O Controller

Specially designed for monitoring building heating systems, the izinto izi-io 4840 /heat is an industry-strength controller with edge computing and LoRaWAN® connection. Up to 8 temperature sensors or other inputs such as sensors and switches may be connected.

## Features

- Eight individually software-configurable inputs for digital and analog process signals or RTD temperature sensors
- Support for 4-20 mA analog input, digital input, voltage, pulse count, pulse frequency, and temperature sensors
- Four digital half-bridge outputs with 250 mA per output and short-circuit protection
- STM32F446 168 MHz ARM Cortex M4 processor with 512 kB Flash and 128 kB RAM
- LoRaWAN 433/868 MHz connectivity, device class A+B
- Serial interfaces: 2x RS-232 or 1x RS-485 or 1x RS-422
- CAN and Modbus bus support
- MicroSD card slot for data logging
- Multi-color LED display
- Industrial-grade design for building automation

## Use Cases

- Building heating system monitoring and control
- Temperature monitoring across multiple zones
- HVAC system integration
- Energy efficiency monitoring
- Remote control of heating equipment
- Retrofit solutions for legacy heating systems

## Thinger.io Integration

The izi-io 4840 /heat integrates with Thinger.io through LoRaWAN network servers, enabling centralized device management, data visualization, and remote control capabilities for heating system monitoring applications.

## Requirements

A LoRaWAN server is required to communicate the izi-io 4840 /heat into Thinger.io, some options are:

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

- [Product Information](https://www.izinto.online/)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/izinto/izi-io-4840-heat/)
- [Thinger docs](https://docs.thinger.io)