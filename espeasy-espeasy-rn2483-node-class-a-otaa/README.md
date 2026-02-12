# RN2483 (Class A OTAA)

The ESPEasy RN2483 (Class A OTAA) is a LoRaWAN® development board based on the Microchip RN2483 transceiver module that supports Over The Air Activation (OTAA). This versatile development platform enables long-range wireless data transmission and supports over 100 sensors, making it ideal for IoT applications requiring low-power communication over distances up to 15 km in suburban areas and 5 km in urban environments.

The RN2483 module features an on-board LoRaWAN™ Class A protocol stack with an ASCII command interface over UART, providing an easy-to-use solution for integrating LoRaWAN connectivity into sensor networks. The module operates in the 433 MHz and 868 MHz frequency bands with adjustable transmit power up to +14 dBm and high receiver sensitivity down to -146 dBm.

## Features

- **LoRaWAN Class A OTAA**: Secure Over The Air Activation for network joining
- **Microchip RN2483 Module**: Fully-certified LoRa transceiver with embedded protocol stack
- **Multi-Sensor Support**: Compatible with over 100 sensor types through ESPEasy firmware
- **Long Range**: Up to 15 km coverage in suburban areas, 5 km in urban environments
- **Low Power Operation**: Optimized for battery-powered applications (2.1V to 3.6V)
- **High Sensitivity**: Receiver sensitivity down to -146 dBm
- **Flexible I/O**: 14 GPIOs for control and status, shared with 13 analog inputs
- **Compact Form Factor**: 17.8 x 26.7 x 3.34 mm module size
- **Wide Temperature Range**: -40°C to +85°C operating temperature
- **UART Interface**: Simple ASCII command interface for configuration and control

## Thinger.io Integration

The RN2483 (Class A OTAA) integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time data streaming, device management, and visualization of sensor data from multiple connected sensors.

## Requirements

A LoRaWAN server is required to communicate the RN2483 (Class A OTAA) into Thinger.io, some options are:

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

Start sending uplinks for autoprovisioning devices and buckets. This product also provides a predefined dashboard and downlinks.

## Additional Resources

- [Microchip RN2483 Datasheet](https://ww1.microchip.com/downloads/en/devicedoc/50002346c.pdf)
- [ESPEasy Documentation](https://espeasy.readthedocs.io/)
- [Thinger.io Documentation](https://docs.thinger.io)