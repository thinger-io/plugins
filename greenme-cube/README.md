# Cube - Environment Sensor

The Cube is a compact indoor environment sensor designed to monitor environmental conditions in real-time. It tracks temperature, humidity, light levels, CO2, TVOC (Total Volatile Organic Compounds), sound, and tilt detection, making it ideal for comprehensive indoor air quality monitoring. The device features an integrated LCD display showing real-time data and communicates via LoRaWAN for long-range wireless connectivity.

## Features

- **Multi-parameter monitoring**: Temperature, humidity, light, CO2, TVOC, sound, and tilt detection
- **Real-time LCD display**: Built-in screen showing current environmental data
- **LoRaWAN connectivity**: Long-range wireless communication for IoT applications
- **Compact design**: 72 x 72 x 74 mm dimensions with IP30 enclosure
- **Battery powered**: Long battery life with CR2450 3V battery
- **Operating range**: 0°C to 40°C temperature range

## Use Cases

- Indoor air quality monitoring
- Smart building management
- Office environment optimization
- HVAC system control
- Workplace comfort monitoring
- Energy efficiency applications

## Thinger.io Integration

The Cube Environment Sensor integrates seamlessly with Thinger.io through LoRaWAN connectivity, enabling real-time monitoring, data visualization, and automated control based on environmental conditions.

## Requirements

A LoRaWAN server is required to communicate the Cube Environment Sensor into Thinger.io, some options are:

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
This product also provides a predefined dashboard for monitoring environmental parameters.

## Additional Resources

- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/greenme/cube/)
- [Thinger docs](https://docs.thinger.io)