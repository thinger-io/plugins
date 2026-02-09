# Personal Tracker

The Personal Tracker is a LoRaWAN-enabled geolocation and activity monitoring device designed for tracking individuals and assets in both indoor and outdoor environments. This compact tracker combines multiple positioning technologies including GPS, WiFi SSID scanning, and accelerometer-based activity detection to provide reliable location tracking across diverse scenarios.

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the Personal Tracker into Thinger.io, some options are:

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

## Features

- **Multi-mode Geolocation**: Combines GPS, WiFi SSID scanning, and network-based positioning for optimal location accuracy
- **Activity Detection**: Built-in accelerometer for movement and orientation tracking
- **Button Interface**: Manual SOS or event triggering capability
- **Compact Design**: Dimensions of 55 x 35 x 18 mm for portable applications
- **LoRaWAN Connectivity**: Long-range wireless communication with low power consumption

## Use Cases

- Personnel tracking and safety monitoring
- Asset tracking in logistics and supply chain
- Lone worker protection
- Indoor and outdoor navigation applications
- Fleet and mobile workforce management

## Additional Resources

- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/iot-factory/personal-tracker/)
- [Thinger docs](https://docs.thinger.io)