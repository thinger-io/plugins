# VOLC2180 LoRa Outdoor Street Light Controller

The VOLC2180 is a LoRa-based outdoor street light controller designed for smart city and intelligent lighting applications. This device enables remote monitoring, control, and alarm notifications for street lighting infrastructure. The controller is suitable for pole mounting and integrates seamlessly with existing street light systems using NEMA interface compatibility.

## Features

- **LoRaWAN Connectivity**: Long-range wireless communication for smart lighting networks
- **Remote Control**: Supports multiple control modes including manual, scheduled ON/OFF/DIM operations
- **Dimming Controls**: 0-10V/PWM dimming capabilities for energy optimization
- **NEMA Interface**: Easy installation with existing street lights using standard NEMA receptacle
- **Power Measurement**: Monitoring of electrical parameters for maintenance optimization
- **Smart City Ready**: Designed for integration into smart city infrastructure and IoT platforms
- **Outdoor Rated**: Weather-resistant design suitable for pole mounting in outdoor environments
- **Two-way Communication**: Bidirectional data exchange for control commands and status reporting

## Applications

- Smart Street Lighting
- Smart City Infrastructure
- Public Lighting Management
- Energy Management Systems
- Remote Lighting Monitoring and Control
- Municipal Lighting Networks

## Thinger.io Integration

The VOLC2180 integrates with Thinger.io through LoRaWAN network servers, enabling centralized device management, real-time monitoring, and automated control of street lighting assets.

## Requirements

A LoRaWAN server is required to communicate the VOLC2180 into Thinger.io, some options are:

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
This product also provides a predefined dashboard and downlinks for remote control of lighting parameters, dimming levels, and scheduling operations.

## Additional Resources

Additional resources can be found at:

- [Thinger.io Documentation](https://docs.thinger.io)
- [LoRaWAN Specification](https://lora-alliance.org/resource_hub/lorawan-specification-v1-0-3/)