# Triphas'O - Energy Consumption Interface

The Triphas'O sensor is used to remotely read the electrical energy consumption of a three-phase installation in a non-intrusive way via the LoRaWAN™ network. It is specially designed to meet the energy management needs of industrial and tertiary buildings that operate with medium / high power, energy intensive equipment.

## Features

- **Non-intrusive monitoring**: Remote reading without physical intervention on electrical installations
- **Three-phase measurement**: Designed for three-phase electrical systems
- **Real-time monitoring**: Provides telemetry and real-time energy consumption data
- **LoRaWAN connectivity**: Class A device operating on EU 863-870 MHz
- **Flexible reporting**: Two types of report modes - standard and batch
- **External RF antenna**: Enhanced signal coverage
- **Configurable parameters**: Adaptable to different monitoring requirements

## Technical Specifications

- **Sensor Type**: Energy consumption
- **Communication Protocol**: LoRaWAN Class A
- **Frequency Band**: EU 863-870 MHz
- **Enclosure Rating**: IP20
- **Operating Temperature**: -20°C to +55°C
- **Dimensions**: 53.5 mm (width)

## Use Cases

- Energy management in industrial facilities
- Monitoring of tertiary buildings
- High-power equipment consumption tracking
- Energy-intensive equipment supervision
- Sub-metering applications
- Energy efficiency optimization

## Thinger.io Integration

The Triphas'O device can be seamlessly integrated into Thinger.io through LoRaWAN network servers, enabling comprehensive energy monitoring and management capabilities.

## Requirements

A LoRaWAN server is required to communicate the Triphas'O into Thinger.io, some options are:

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

Watteco resources can be found at:

- [Watteco Official Product Page](https://www.watteco.com/product/triphaso-sensor-lorawan)
- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/watteco/triphaso)
- [Thinger docs](https://docs.thinger.io)