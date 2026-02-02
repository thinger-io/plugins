# NUCLEO-WL55JC1

The STMicroelectronics NUCLEO-WL55JC1 is a development board based on the STM32WL55JC microcontroller that comes with a built-in temperature sensor and a light sensor. The NUCLEO-WL55JC1 board supports a wide choice of Integrated Development Environments (IDE) and an expansion connector for Arduino UNO V3. Suitable for rapid prototyping of LoRaWAN® end nodes by adding sensors and actuators.

## Features

- **Microcontroller**: STM32WL55JCI7 dual-core (Arm® Cortex®-M4 and Cortex®-M0+ at 48 MHz)
- **Package**: UFBGA73
- **RF Frequency**: 865 MHz to 928 MHz (High-frequency band)
- **RF Technology**: LoRa® multiprotocol LPWAN
- **User Interface**: 3 user LEDs and 3 user buttons
- **Built-in Sensors**: Temperature sensor and light sensor
- **Expansion**: Arduino UNO V3 compatible connector
- **Development**: Compatible with multiple IDEs for flexible development

## Use Cases

- LoRaWAN® end-node prototyping
- Wireless sensor network development
- Environmental monitoring applications
- Smart city and IoT solution testing
- Low-power wide-area network applications

## Thinger.io Integration

The NUCLEO-WL55JC1 can be integrated with Thinger.io through LoRaWAN connectivity for remote device management, data visualization, and IoT application development.

## Requirements

A LoRaWAN server is required to communicate the NUCLEO-WL55JC1 into Thinger.io, some options are:

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

STMicroelectronics resources can be found at:

- [STM32WL Nucleo-64 User Manual](https://www.st.com/resource/en/user_manual/um2592-stm32wl-nucleo64-board-mb1389-stmicroelectronics.pdf)
- [Product Page](https://www.st.com/en/evaluation-tools/nucleo-wl55jc.html)
- [Thinger.io Documentation](https://docs.thinger.io)