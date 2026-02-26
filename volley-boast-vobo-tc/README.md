# VoBo-TC - Thermocouple Endpoint

The VoBo TC is an industrial grade 12 channel thermocouple LoRaWAN® bridge certified for Class 1 Division 2 hazardous areas. It has integrated Cold Joint Temperature compensation and is designed specifically for temperature monitoring using thermocouple sensors in industrial IoT applications. The device supports multiple thermocouple types and can report measurements in °C or mV, making it suitable for demanding industrial environments.

## Features

- 12 selectable thermocouple inputs
- Supports thermocouple types: B, E, J, K, N, S, R, and T
- On-board Cold Joint Temperature compensation
- Reports temperature in °C or mV
- Class 1 Division 2 hazardous area certification
- Operating temperature range: -40°C to +80°C
- Ingress protection: IP66/NEMA 4X
- LoRaWAN® connectivity

## Use Cases

The VoBo TC is ideal for industrial temperature monitoring applications in hazardous environments, including:

- Industrial process monitoring
- Chemical and petrochemical facilities
- Oil and gas operations
- Manufacturing plants
- HVAC systems monitoring
- Equipment temperature surveillance

## Thinger.io Integration

The VoBo TC integrates with Thinger.io through a LoRaWAN server connection, enabling real-time temperature data visualization, analysis, and alerting for industrial IoT deployments.

## Requirements

A LoRaWAN server is required to communicate the VoBo TC into Thinger.io. Some options are:

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

Start sending uplinks for autoprovisioning devices and buckets. This product also provides predefined dashboards and downlinks for managing your thermocouple monitoring endpoints.

## Additional Resources

VolleyBoast resources can be found at:

- [VoBo TC Product Page](https://volleyboast.com/products/vobotc/)
- [VoBo TC Datasheet](https://volleyboast.com/products/Latest/VoBoTC/DCM-TC04-B1-VoBo_TC_Datasheet.pdf)
- [Thinger.io Documentation](https://docs.thinger.io)