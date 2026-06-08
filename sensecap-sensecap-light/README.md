# Wireless Light Intensity Sensor - LoRaWAN®

The Seeed Studio SenseCAP Wireless Light Intensity Sensor is a LoRaWAN® end device that measures the intensity of light in lux from 0 - 188000 lux. It is designed with battery-powered and IP66 enclosure for outdoor use, optimized for use cases that need reliable data collection over years.

## Features

- **Wide Measurement Range**: 0 to 188000 lux
- **High Accuracy**: ±5% measurement accuracy
- **Resolution**: 1 lux
- **IP66 Enclosure**: Weather-resistant design for outdoor deployment
- **Battery-Powered**: Long-term operation with minimal maintenance
- **LoRaWAN® 1.0.2**: Standard protocol support for compatibility with any LoRaWAN network
- **OTAA Activation**: Over-the-Air Activation for secure network joining

## Use Cases

- Agricultural light monitoring
- Smart city lighting management
- Greenhouse automation
- Solar panel efficiency monitoring
- Environmental research and monitoring
- Indoor/outdoor light quality assessment

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the SenseCAP Wireless Light Intensity Sensor into Thinger.io, some options are:

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

Seeed Studio resources can be found at:

- [Product Page](https://solution.seeedstudio.com/product/sensecap-lorawan-light-intensity-sensor)
- [SenseCAP Documentation](https://sensecap-docs.seeed.cc/)
- [Thinger docs](https://docs.thinger.io)