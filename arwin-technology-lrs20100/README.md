# LRS20100 - Temperature & Humidity Sensor

The LRS20100 is a LoRaWAN ambient temperature and humidity sensor designed to provide a simple and cost-effective solution for environmental monitoring. The device offers reliable 24/7 monitoring of premises and assets with high accuracy measurements in a compact, weatherproof enclosure.

## Features

- **Temperature Monitoring**: Measures ambient temperature from -20°C to +60°C
- **Humidity Monitoring**: Measures relative humidity from 10% to 100% RH
- **Low Power Consumption**: Stand-by current <25µA @ 3.6V for extended battery life
- **Battery Powered**: 1 x 3.6V C-size battery (not supplied)
- **Durable Enclosure**: IP65 rated protection against dust and water ingress
- **Compact Design**: 112 x 70 x 39 mm dimensions
- **LoRaWAN Connectivity**: Long-range wireless communication for IoT applications
- **Operating Temperature**: -20°C to +70°C

## Use Cases

- Indoor climate monitoring
- Warehouse environmental control
- Data center temperature monitoring
- Agricultural storage facilities
- Cold chain logistics
- HVAC system monitoring
- Asset and premises monitoring

## Thinger.io Integration

The LRS20100 integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time temperature and humidity data visualization, alerting, and historical analysis.

## Requirements

A LoRaWAN server is required to communicate the LRS20100 into Thinger.io, some options are:

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
This product also provides a predefined dashboard for monitoring temperature and humidity readings.

## Additional Resources

- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/arwin-technology/lrs20100/)
- [Thinger.io Documentation](https://docs.thinger.io)