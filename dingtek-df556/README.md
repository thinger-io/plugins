# DF556 - Pressure Tank Level Sensor

The CNDingtek DF556 is a pressure type level sensor for various tanks, which is installed on top of the tank. It provides pressure-based immersed liquid level measurement with high accuracy and wireless LoRaWAN connectivity for remote monitoring applications.

## Features

- **Pressure-based liquid level measurement** with submerged pressure transducer
- **Measurement range**: 2.5m to 15m (standard 2.5m, customizable)
- **High accuracy**: 0.5% FS
- **Resolution**: 1mm
- **Built-in sensors**: Level, GPS, Temperature
- **LoRaWAN wireless connectivity** for long-range data transmission
- **IP67 enclosure** for harsh environments
- **Operating temperature**: -20°C to 70°C
- **Dimensions**: 122 x 96 x 96mm (body), 140 x 30 x 30mm (pressure part)
- **Diameter**: 95mm
- **Cable length**: 2.5m (customizable)
- **Battery-powered** for wireless operation

## Use Cases

- Water tank level monitoring
- Fuel tank level measurement
- Chemical storage tank monitoring
- Industrial liquid level control
- Agricultural water reservoir management
- Municipal water supply systems

## Thinger.io Integration

The DF556 seamlessly integrates with Thinger.io through LoRaWAN connectivity, enabling remote monitoring and management of tank levels with real-time data visualization and alerting capabilities.

## Requirements

A LoRaWAN server is required to communicate the CNDingtek DF556 into Thinger.io, some options are:

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

CNDingtek resources can be found at:

- [DF556 Product Page](https://www.dingtek.com/pressure-liquid-level-sens-df556)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/dingtek/df556)
- [Thinger.io Documentation](https://docs.thinger.io)