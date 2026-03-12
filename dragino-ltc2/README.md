# LTC2 - Temperature Transmitter

The LTC2 is an Industrial LoRaWAN Temperature Transmitter designed for precise temperature monitoring in various environments. It supports up to 2 temperature channels using 3-wire PT-100 probes and transmits readings to IoT servers via LoRaWAN protocol. The device features datalog capabilities for recording temperature data and retrieving it via LoRaWAN.

## Features

- LoRaWAN 1.0.3 Class A compliant
- Supports up to 2 monitoring temperature channels
- 3-wire PT-100 probe interface
- Multiple probe options for different environments (Standard, Food Safety, Low Temperature, High Temperature, Custom)
- Temperature measurement range: -50°C to 200°C (depending on probe)
- High accuracy: ±0.5°C (0 to 80°C range)
- Resolution: 0.01°C
- 8500mAh Li-SOCI2 battery for long-term operation
- Ultra-low power consumption (33µA in sleep mode, 20mA sampling)
- Datalog feature with LoRaWAN retrieval
- Battery monitoring and upload
- Temperature alarm functionality
- Wall mountable design
- Configurable via LoRa or UART
- Firmware upgradable via console
- Factory calibration for different resistance ranges
- Multiple frequency band support: EU868, US915, AU915, AS923, EU433, IN865, KR920, KZ865, RU864, CN470

## Thinger.io Integration

The LTC2 Temperature Transmitter integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time temperature monitoring, data logging, and alarm management for industrial applications.

## Requirements

A LoRaWAN server is required to communicate the LTC2 Temperature Transmitter into Thinger.io, some options are:

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

## Use Cases

- Industrial temperature monitoring
- Food safety temperature control
- Cold chain monitoring
- HVAC system monitoring
- Process control applications
- Environmental monitoring
- Laboratory temperature tracking

## Additional Resources

Dragino resources can be found at:

- [Product Documentation](https://www.dragino.com)
- [Thinger docs](https://docs.thinger.io)