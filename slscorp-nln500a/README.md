# NLN500A NebuLink Node

The NebuLink Node NLN500A is the first and smallest STM32WL-based LoRa module. It is built on the STM32WL SoC which has an embedded LoRaWAN transceiver for a wide range of smart applications. It offers long-range, low-power, and secure data transmission for M2M and IoT applications. This module is designed to be extremely low-power and is based on the high-performance STM32WLE5JC Arm® Cortex®-M4 32-bit RISC core operating at a frequency of up to 48 MHz. This core implements a full set of DSP instructions and an independent memory protection unit (MPU) that enhances the application security.

## Features

- First and smallest STM32WL-based LoRa module
- Integrated LoRaWAN transceiver
- STM32WLE5JC Arm® Cortex®-M4 32-bit RISC core up to 48 MHz
- Full DSP instruction set
- Memory protection unit (MPU) for enhanced security
- Ultra-low-power design
- Multiple digital and analog interfaces
- Long-range wireless communication
- Compact form factor

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the NLN500A into Thinger.io, some options are:

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

NebuLink resources can be found at:

- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/slscorp/nln500a/)
- [System Level Solutions](https://www.slscorp.com/)
- [STM32WL Series](https://www.st.com/en/microcontrollers-microprocessors/stm32wl-series.html)
- [Thinger docs](https://docs.thinger.io)