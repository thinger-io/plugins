# Pulse Sens'O - Smart Meter Interface

The WATTECO Pulse Sens'O consists of a pulse sensor (counter) for remotely reading metering data from three meters - water, gas, electricity, or energy. It turns existing meters into smart meters via a public or private LoRaWAN® network.

## Features

- **Multi-meter compatibility**: Supports water, gas, electricity, and energy meters
- **Pulse counting**: Digital input for pulse/S0 interface metering
- **LoRaWAN connectivity**: Class A device using LoRaWAN® protocol
- **Durable design**: IP55 enclosure for indoor and outdoor installations
- **Compact dimensions**: 92 x 92 x 55.5 mm
- **Operating temperature**: -20°C to 50°C
- **Power supply**: Disposable LS17500 3.6V A-type battery
- **Configuration interface**: Activation switch and 2 LEDs for monitoring configuration and network pairing

## Use Cases

- Remote meter reading for water utilities
- Gas consumption monitoring
- Electricity usage tracking
- Energy management systems
- Building automation and smart city applications
- Retrofit of existing meters to IoT-enabled infrastructure

## Thinger.io Integration

The Pulse Sens'O integrates with Thinger.io through LoRaWAN network servers, enabling real-time monitoring and data visualization of metering data.

## Requirements

A LoRaWAN server is required to communicate the WATTECO Pulse Sens'O into Thinger.io, some options are:

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

WATTECO resources can be found at:

- [WATTECO Official Website](https://www.watteco.com)
- [WATTECO Support](https://support.watteco.com)
- [Thinger docs](https://docs.thinger.io)