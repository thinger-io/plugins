# Fency boy - Electric Fence Sensor

The Fencyboy is a LoRaWAN-based IoT sensor designed for monitoring electric fences used in agricultural livestock management. The device monitors voltage pulses on electric fences up to 15 kV and is capable of detecting fence failures due to grass contact or power outages. It can be powered by single-use batteries or with a solar panel and rechargeable battery for extended operation.

## Features

- **Voltage Monitoring**: Measures voltage pulses on electric fences up to 15 kV
- **Pulse Counting**: Tracks individual energy impulses on the electric fence
- **Battery Monitoring**: Reports battery level for maintenance planning
- **Solar Radiation Sensor**: Monitors available solar energy for solar-powered configurations
- **Temperature Sensor**: Ambient temperature measurement
- **RSSI Reporting**: Signal strength indication for connectivity assessment
- **LoRaWAN Connectivity**: Long-range wireless communication for remote installations
- **Dual Power Options**: Single-use battery or solar panel with rechargeable battery
- **Weatherproof Design**: IP67-rated enclosure for outdoor installations
- **Operating Temperature**: -20°C to 60°C
- **Compact Dimensions**: 190 x 82 x 55 mm

## Use Cases

- Livestock electric fence monitoring
- Remote pasture management
- Fence failure detection and alerts
- Preventive maintenance scheduling
- Multi-site agricultural operations
- Wildlife exclusion fence monitoring

## Thinger.io Integration

The Fencyboy electric fence sensor integrates with Thinger.io through LoRaWAN network servers, enabling real-time monitoring of fence status, battery levels, and environmental conditions. The integration provides automated device provisioning, data storage, and visualization capabilities.

## Requirements

A LoRaWAN server is required to communicate the Fencyboy sensor to Thinger.io. Compatible options include:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed, a new Product will be created for this device.

### Configuration

The Product is already preconfigured. Check that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your preference.

### Usage

Start sending uplinks for autoprovisioning devices and buckets. This product also provides predefined dashboards for monitoring fence voltage, pulse counts, battery status, and environmental conditions.

## Additional Resources

Fencyboy resources can be found at:

- [Official Website](https://fencyboy.com)
- [Documentation](https://docs.fencyboy.com)
- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/fencyboy/fencyboy/)
- [Thinger.io Documentation](https://docs.thinger.io)