# WILSEN.sonic.distance

The WILSEN.sonic.distance is a wireless ultrasonic sensor with LoRaWAN interface developed by Pepperl+Fuchs. This device provides accurate distance measurements using ultrasonic technology and transmits data via LoRaWAN networks. Designed for industrial applications, it features IP67-rated enclosure for harsh environments and operates as a LoRaWAN Class A device on 868 MHz frequency.

## Features

- **Ultrasonic Distance Measurement**: Precision distance sensing with 1 mm resolution
- **LoRaWAN Connectivity**: LoRaWAN specification V1.0.3, Class A device
- **Multiple Sensors**: Distance, temperature, GPS positioning, and battery monitoring
- **Rugged Design**: IP67 enclosure for industrial environments
- **Wide Operating Temperature**: -25°C to 70°C
- **Compact Form Factor**: 81 x 182 x 71 mm dimensions
- **868 MHz Frequency**: +8 dBm transmitter radiated power
- **Downlink Support**: Bidirectional communication capability

## Use Cases

- Tank level monitoring
- Bin and silo fill level detection
- Distance measurement in industrial automation
- Waste management systems
- Environmental monitoring applications
- Asset tracking and positioning

## Thinger.io Integration

The WILSEN.sonic.distance integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time distance monitoring, data logging, and remote configuration capabilities.

## Requirements

A LoRaWAN server is required to communicate the WILSEN.sonic.distance into Thinger.io, some options are:

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

Pepperl+Fuchs resources can be found at:

- [Product Datasheet](http://files.pepperl-fuchs.com/webcat/navi/productInfo/pds/70150489_eng.pdf)
- [TTN Device Repository](https://www.thethingsnetwork.org/device-repository/devices/pepperl-fuchs/wilsen-sonic-distance/)
- [Thinger docs](https://docs.thinger.io)