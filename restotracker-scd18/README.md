# SCD18 - Tracker

The SCD18 is an ultra-low power consumption LoRaWAN tracker designed for both indoor and outdoor asset tracking applications. It features multi-mode positioning capabilities including BLE, WiFi, and GPS technologies, enabling accurate location tracking across diverse environments while maintaining exceptional battery efficiency.

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the SCD18 Tracker with Thinger.io. Some options are:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed a new Product will be created for this device.

### Configuration

The Product is already preconfigured. Check that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your preference.

### Usage

Start sending uplinks for autoprovisioning devices and buckets.

This product also provides a predefined dashboard and downlinks.

## Key Features

- **Multi-mode Positioning**: GPS for outdoor tracking, BLE and WiFi for indoor positioning
- **Ultra-low Power Consumption**: Extended battery life for long-term deployments
- **LoRaWAN Connectivity**: Long-range wireless communication with low power requirements
- **Indoor & Outdoor Tracking**: Seamless transition between positioning modes

## Typical Applications

- Asset tracking and management
- Fleet and logistics monitoring
- Personnel tracking
- Supply chain visibility
- Equipment location monitoring

## Additional Resources

- [Thinger.io Documentation](https://docs.thinger.io)
