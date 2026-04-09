# RN2903 (Class A ABP)

The ESPEasy RN2903 (Class A ABP) is a LoRaWAN® development board based on the Microchip RN2903 module that supports Activation by Personalization (ABP). It supports over 100 sensors and provides an easy-to-use platform for long-range wireless data transmission using LoRaWAN technology.

## Features

- **LoRaWAN Module**: Based on Microchip RN2903 with on-board LoRaWAN Class A protocol stack
- **Activation Method**: ABP (Activation by Personalization)
- **Frequency Band**: 915 MHz ISM band
- **Communication**: ASCII command interface over UART
- **Sensor Support**: Compatible with over 100 different sensor types via ESPEasy firmware
- **Range**: Up to 15 km in suburban areas and 5 km in urban environments
- **Power**: Single operating voltage 2.1V to 3.6V (3.3V typical), low power consumption for battery operation
- **Sensitivity**: High receiver sensitivity down to -146 dBm
- **TX Power**: Adjustable up to +18.5 dBm
- **Data Rate**: Up to 300 kbps with FSK modulation, 12500 bps with LoRa modulation
- **Temperature Range**: -40°C to +85°C
- **GPIO**: 14 general purpose I/O pins for control and status
- **Analog Inputs**: 13 analog input channels
- **Compact Design**: 17.8 x 26.7 x 3.34 mm form factor

## Use Cases

- Environmental monitoring with multiple sensor types
- Agricultural IoT applications
- Smart city infrastructure
- Industrial sensor networks
- Remote data collection in areas requiring long-range connectivity
- Battery-powered wireless sensor nodes

## Thinger.io Integration

This device communicates with Thinger.io through a LoRaWAN network server integration, enabling seamless data transmission and device management.

## Requirements

A LoRaWAN server is required to communicate the RN2903 (Class A ABP) into Thinger.io, some options are:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed a new Product will be created for this device.

### Configuration

The Product is already preconfigured, check that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your desire.

Since this device uses ABP activation, ensure that the device address, network session key, and application session key are properly configured in both the device and your LoRaWAN server.

### Usage

Start sending uplinks for autoprovisioning devices and buckets. This product also provides a predefined dashboard and downlinks.

## Additional Resources

- [Microchip RN2903 Data Sheet](http://ww1.microchip.com/downloads/en/DeviceDoc/RN2903-LoRa-Technology-Transceiver-Module-Data-Sheet-50002390F.pdf)
- [RN2903 Command Reference User's Guide](https://ww1.microchip.com/downloads/en/DeviceDoc/40001811A.pdf)
- [Thinger.io Documentation](https://docs.thinger.io)