# Strips - Multisensor

The Sensative Strips Multisensor is an ultra-thin wireless sensor designed for LoRaWAN networks. With its slim profile of less than 3mm thickness, the Strips sensor family provides versatile monitoring capabilities for both indoor and outdoor applications. The device combines multiple sensing functions including temperature, humidity, light (LUX), and magnetic open/close detection in a compact, blend-in design.

## Key Features

- **Ultra-thin design**: Less than 3mm (0.12 inches) thickness for discreet installation
- **Multiple sensor variants**: Available in different configurations (+Comfort, +Guard, +Drip) to suit various use cases
- **Long battery life**: Up to 10 years of operation
- **Extended range**: Up to 10 km (6 miles) LoRaWAN connectivity
- **Multi-purpose sensing**: Temperature, humidity, ambient light (LUX), and magnetic contact detection
- **Indoor and outdoor use**: Durable design suitable for various environments
- **Easy installation**: No maintenance required during its operational lifetime

## Sensor Capabilities

- **Temperature monitoring**: Accurate temperature measurement for environmental control
- **Humidity sensing**: Relative humidity tracking for comfort and climate management
- **Ambient light detection**: LUX measurement for lighting optimization
- **Magnetic contact sensor**: Open/close detection for doors, windows, and access points
- **Water leak detection**: Available in +Drip variant for leak monitoring

## Thinger.io Integration

The Strips Multisensor integrates with Thinger.io through LoRaWAN network servers, enabling real-time data collection and visualization of sensor measurements. The device automatically provisions buckets for data storage and supports dashboard integration for monitoring environmental conditions.

## Requirements

A LoRaWAN server is required to communicate the Sensative Strips Multisensor into Thinger.io, some options are:

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

Start sending uplinks for autoprovisioning devices and buckets. This product also provides a predefined dashboard for monitoring temperature, humidity, light levels, and door/window status.

## Additional Resources

Sensative resources can be found at:

- [Strips Product Family](https://sensative.com/sensors/strips-sensors-for-lorawan/)
- [Sensative Documentation](https://public.yggio.net/docs/lorawan-sensors/strips-multi-sensor/)
- [Thinger docs](https://docs.thinger.io)