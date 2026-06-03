# Temp'O - Indoor Temperature

The WATECO Temp'O sensor measures indoor ambient temperature in buildings, apartments, and houses. It transmits data over a public or private LoRaWAN® network. Designed for seamless integration into smart building and environmental monitoring applications, this compact sensor provides reliable temperature data for HVAC optimization, energy management, and comfort monitoring.

## Features

- **Temperature Sensor**: Accurate indoor ambient temperature measurement
- **LoRaWAN Connectivity**: Public or private network support
- **Compact Design**: 74 x 74 x 25 mm dimensions
- **Indoor Rating**: IP30 enclosure protection
- **Operating Range**: 0°C to 55°C

## Use Cases

- Smart building temperature monitoring
- HVAC system optimization
- Energy management in residential and commercial spaces
- Indoor climate control and comfort analysis
- Temperature data logging for compliance and efficiency

## Thinger.io Integration

The Temp'O sensor integrates with Thinger.io through LoRaWAN network servers, enabling automatic device provisioning, real-time data visualization, and remote monitoring capabilities.

## Requirements

A LoRaWAN server is required to communicate the WATECO Temp'O into Thinger.io, some options are:

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

WATECO resources can be found at:

- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/watteco/tempo)
- [Thinger docs](https://docs.thinger.io)