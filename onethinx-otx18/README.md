# OTX-18 LoRaWAN Module

The Onethinx Core LoRaWAN® module integrates Cypress® PSoC® 6 MCU, Semtech® SX126x chipset, dual ARM® Core processor (150MHz / 1MB Flash / 256KB SRAM), compact and highly efficient integrated antenna, and Bluetooth BLE 5.0. It provides faster development of LoRaWAN® products and also reduces development costs.

## Features

- **Processor**: Dual ARM® Cortex® cores (Cortex-M4 at 150MHz and Cortex-M0+)
- **Memory**: 1MB Flash, 256KB SRAM
- **Radio**: Semtech® SX126x LoRaWAN® chipset
- **Connectivity**: LoRaWAN® 1.0.3 and Bluetooth® BLE 5.0
- **Antenna**: Highly efficient integrated antenna
- **Power Consumption**: 4.2 mA active receive current
- **Transmit Power**: Up to +14 dBm
- **Security**: PSA certified (OTX-18P variant)
- **Architecture**: Locked down LoRaWAN™ stack runs isolated from user code

## Use Cases

- Battery-powered IoT applications requiring extended operational life
- Custom LoRaWAN device development
- Secure wireless sensor networks
- Industrial monitoring and control
- Smart city applications
- Asset tracking solutions

## Thinger.io Integration

The OTX-18 LoRaWAN module can be integrated into Thinger.io through a LoRaWAN network server, enabling seamless data transmission and device management for IoT applications.

## Requirements

A LoRaWAN server is required to communicate the Onethinx OTX-18 into Thinger.io, some options are:

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

Onethinx resources can be found at:

- [Official Website](https://www.onethinx.com/)
- [Downloads](https://www.onethinx.com/downloads)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/onethinx/otx18/)
- [Thinger docs](https://docs.thinger.io)