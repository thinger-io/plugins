# LRS10701 - Indoor Air Quality (IAQ) Sensor

The SENSO8 LRS10701 is a comprehensive LoRaWAN Indoor Air Quality (IAQ) monitoring sensor designed for 24/7 environmental monitoring. This wireless device provides a cost-effective solution for tracking multiple air quality parameters in indoor environments, aligned with WELL v2.2 building standards.

## Features

- **Multi-Parameter Monitoring**: Temperature, humidity, PM1.0, PM2.5, PM10, CO2, TVOC, HCHO
- **Extended Sensor Options**: Available variants include H2S, CO, NO2 monitoring
- **LoRaWAN Connectivity**: Long-range wireless communication for building-wide deployment
- **Compact Design**: 119 x 119 x 37.5 mm form factor
- **Wide Operating Range**: -20°C to 50°C temperature tolerance
- **WELL v2.2 Compliant**: Aligned with international building health standards

## Use Cases

- Office buildings and workspaces
- Educational facilities
- Healthcare environments
- Smart buildings and HVAC optimization
- Indoor environmental quality compliance monitoring
- Occupational health and safety applications

## Thinger.io Integration

The LRS10701 integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time monitoring, data visualization, and automated alerting based on air quality thresholds.

## Requirements

A LoRaWAN server is required to communicate the SENSO8 LRS10701 into Thinger.io, some options are:

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

SENSO8 resources can be found at:

- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/arwin-technology/lrs10701/)
- [Thinger docs](https://docs.thinger.io)