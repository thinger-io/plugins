# Wio-E5 STM32WLE5JC Module, embedded SX126X and MCU for LoRaWAN® Network

The Seeed Studio Wio-E5 LoRaWAN® module is designed with ST system-level package chip STM32WLE5JC, ARM Cortex M4 ultra-low-power MCU, and LoRa® SX126X. It supports (G)FSK mode and LoRa®. This low-cost, ultra-low power, ultra-small size module is very suitable for the design of various IoT nodes.

## Features

- **Compact Design**: 12mm x 12mm x 2.5mm SMT package (28-pin)
- **Ultra-Low Power**: 2.1µA sleep current with watchdog timer enabled
- **Integrated Solution**: STM32WLE5JC system-level package chip with embedded SX126X LoRa® transceiver and ARM Cortex M4 MCU
- **LoRaWAN® Support**: Fully compatible with LoRaWAN® protocol
- **Multiple Modulation**: Supports (G)FSK and LoRa® modulation
- **Frequency Bands**: 434MHz and 470MHz support
- **RF Performance**: Output power up to 22dBm max at 470MHz, 10dBm max at 434MHz
- **Power Supply**: 3.3V typical operation
- **Low Operating Current**: 26mA during operation

## Use Cases

The Wio-E5 module is ideal for:

- LoRaWAN® wireless sensor networks
- IoT edge nodes
- Smart agriculture monitoring
- Environmental sensing applications
- Asset tracking solutions
- Smart building and city deployments
- Industrial monitoring systems

## Thinger.io Integration

The Wio-E5 module can be integrated with Thinger.io through LoRaWAN® network servers, enabling efficient data collection and device management for IoT applications.

## Requirements

A LoRaWAN® server is required to communicate the Wio-E5 module into Thinger.io. Some options are:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN® server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed, a new Product will be created for this device.

### Configuration

The Product is already preconfigured. Check that the auto provision prefix matches the one selected in your LoRaWAN® server plugin in Thinger.io, or change it to your desire.

### Usage

Start sending uplinks for autoprovisioning devices and buckets. This product also provides predefined dashboard capabilities and downlinks support.

## Additional Resources

Seeed Studio resources can be found at:

- [Wio-E5 Documentation](https://wiki.seeedstudio.com/LoRa-E5_STM32WLE5JC_Module)
- [Wio-E5 Datasheet](https://files.seeedstudio.com/products/317990687/res/LoRa-E5%20module%20datasheet_V1.1.pdf)
- [Thinger.io Documentation](https://docs.thinger.io)