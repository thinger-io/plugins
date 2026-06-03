# Temperature Indoor Sensor

The WATTECO Indoor temperature sensor measures indoor ambient temperature and transmits data over the LoRaWAN® network. This wireless sensor is designed for monitoring temperature in buildings, flats, houses, and other indoor environments, providing reliable temperature data over long distances.

## Features

- **LoRaWAN Class A** wireless sensor
- **Temperature measurement** of indoor ambient conditions
- **Dual reporting modes**: standard and batch reporting
- **Batch mode**: reports temperature measurements every hour with readings taken every 10 minutes
- **Operating frequency**: EU 863-870 MHz
- **Operating temperature range**: 0 to 55°C
- **Protection rating**: IP30
- **Power supply**: Replaceable 3.6V AA-type battery
- **Long range transmission** via public or private LoRaWAN® networks

## Use Cases

- Building management and monitoring
- Residential temperature tracking
- Office and commercial space climate monitoring
- Energy efficiency optimization
- HVAC system performance monitoring
- Indoor comfort assessment

## Thinger.io Integration

This device integrates with Thinger.io through LoRaWAN network servers, enabling seamless data collection, visualization, and management of temperature monitoring applications.

## Requirements

A LoRaWAN server is required to communicate the WATTECO Temperature Indoor Sensor into Thinger.io, some options are:

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

- [WATTECO Support Documentation](https://support.watteco.com/indoor_th)
- [WATTECO Website](https://www.watteco.com)
- [Thinger.io Documentation](https://docs.thinger.io)