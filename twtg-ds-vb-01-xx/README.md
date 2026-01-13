# NEON Vibration Sensor

The NEON Vibration Sensor is a LoRaWAN-enabled device designed for continuous monitoring of vibration levels in industrial equipment, machinery, and infrastructure. It provides real-time detection of abnormal vibration patterns to enable predictive maintenance and prevent equipment failure.

## Features

- LoRaWAN Class A connectivity
- 3-axis accelerometer for comprehensive vibration detection
- Configurable sensitivity thresholds
- Temperature monitoring
- Long battery life with low power consumption
- IP67-rated enclosure for harsh environments
- Magnetic mounting for easy installation

## Use Cases

- Predictive maintenance of rotating machinery
- Industrial equipment health monitoring
- Structural health monitoring of buildings and bridges
- HVAC system monitoring
- Pump and compressor condition monitoring
- Early detection of bearing failures

## Thinger.io Integration

### Requirements

A LoRaWAN server is required to communicate the NEON Vibration Sensor into Thinger.io, some options are:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://ma.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed a new Product will be created for this device.

### Configuration

The Product is already preconfigured, check that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your desire.

### Usage

Start sending uplinks for autoprovisioning devices and buckets.

This product also provides a predefined dashboard for vibration monitoring and temperature tracking.

## Additional Resources

- [Thinger.io Documentation](https://docs.thinger.io)