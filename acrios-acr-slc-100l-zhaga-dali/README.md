# LoRaWAN Street Light Module (ZHAGA DALI)

The LoRaWAN street light module is a smart street lighting controller with ZHAGA socket compatibility based on the STM32WL platform. Designed with a compact 40mm diameter enclosure, this module is fully compatible with DALI and DALI-2 protocols, enabling advanced lighting control and energy management for smart city deployments. The device provides wireless connectivity through LoRaWAN technology for remote monitoring and control of street lighting infrastructure.

## Features

- **ZHAGA Socket Compatibility**: Standard ZHAGA interface for easy installation and integration
- **DALI/DALI-2 Protocol Support**: Full compatibility with DALI and DALI-2 lighting control standards
- **STM32WL Platform**: Based on STM32WL system-on-chip for reliable LoRaWAN connectivity
- **Compact Design**: 40mm diameter enclosure for minimal footprint
- **IP67 Protection**: Weather-resistant enclosure suitable for outdoor installations
- **Operating Temperature Range**: -30°C to 60°C for reliable operation in various climates
- **Integrated Sensors**: Light and temperature monitoring capabilities
- **Long Range Communication**: LoRaWAN connectivity with transmission distances up to 1500m

## Use Cases

- Smart street lighting control and monitoring
- Municipal lighting infrastructure management
- Parking lot lighting automation
- Industrial outdoor lighting control
- Smart city and IoT integration projects
- Energy efficiency monitoring for public lighting
- Adaptive lighting based on ambient conditions

## Thinger.io Integration

This device integrates with Thinger.io through LoRaWAN network servers, enabling centralized management, real-time monitoring, and remote control of street lighting infrastructure. The integration supports automated provisioning, data visualization, and scheduling capabilities.

## Requirements

A LoRaWAN server is required to communicate the LoRaWAN Street Light Module (ZHAGA DALI) into Thinger.io, some options are:

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

Start sending uplinks for autoprovisioning devices and buckets. This product also provides a predefined dashboard and downlinks for remote lighting control, including dimming levels, scheduling, and energy monitoring.

## Additional Resources

- [Thinger.io Documentation](https://docs.thinger.io)
- [LoRaWAN Specification](https://lora-alliance.org/lorawan-for-developers)
- [DALI Alliance](https://www.dali-alliance.org/)