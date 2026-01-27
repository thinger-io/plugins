# Professional II LoRa - 3 Phase Energy Meter

The EMU Professional II LoRa is a multifunctional 3-phase energy meter that combines precise measurements and LoRaWAN IoT connectivity. Designed for DIN rail mounting, this device features MID B+D approval for billing purposes, making it suitable for commercial and industrial energy management applications. It supports both direct connection up to 100A and indirect connection via CT /5 and /1A. The meter includes an internal clock and offers options for external or internal antenna configurations.

## Features

- **3-phase energy monitoring**: Comprehensive measurement of energy, power, voltage, and current
- **MID B+D approved**: Certified for billing and legal metering purposes
- **Flexible connection**: Direct connection (100A) or indirect via current transformers (CT /5 and /1A)
- **LoRaWAN connectivity**: Built-in LoRa interface for wireless data transmission
- **Class C operation**: Always ready to receive for two-way communication (falls back to Class A on incompatible networks)
- **DIN rail mounting**: Easy installation in electrical panels
- **Configurable S0 pulse output**: For active or reactive energy monitoring
- **Internal clock**: Accurate time-stamping of measurements
- **Antenna options**: Support for internal or external antenna configurations

## Technical Specifications

- **Enclosure**: IP51
- **Dimensions**: 90 x 91 x 72 mm
- **Operating temperature**: -25°C to 70°C
- **LoRaWAN frequency band**: EU 863-870 MHz
- **Device class**: Class C (Class A compatible)
- **Transmission power**: 14 dBm
- **Measured parameters**: Energy, power, voltage, current

## Thinger.io Integration

The Professional II LoRa integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time energy monitoring, data visualization, and remote meter management.

## Requirements

A LoRaWAN server is required to communicate the Professional II LoRa into Thinger.io, some options are:

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

- Commercial and residential energy billing
- Industrial energy management
- Building automation systems
- Energy consumption monitoring and optimization
- Demand response applications
- Sub-metering in multi-tenant buildings
- Renewable energy integration monitoring

## Additional Resources

EMU resources can be found at:

- [EMU Official Website](https://www.emuag.com/power-meter/emu-professional-ii-lora/)
- [Product Information](https://www.emu-metering.com/emu-professional-ii-3-5-lora/P21A000LO)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/emu/emu-prof-ii/)
- [Thinger docs](https://docs.thinger.io)