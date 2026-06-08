# Vaqa'O - Temp/Hum/VOC/CO2 Sensor

The WATTECO Vaqa'O sensor is a LoRaWAN® device that measures the temperature, relative humidity, and carbon dioxide (CO2) in the ambient air of a room, in a building, an apartment, or a house. It allows Indoor Air Quality (IAQ) monitoring.

## Features

- Temperature measurement
- Relative humidity measurement
- Volatile Organic Compounds (VOC) detection
- Carbon Dioxide (CO2) concentration monitoring
- LoRaWAN® Class A communication
- Dual power supply options: external (3.6V to 24V) or battery
- Indoor Air Quality (IAQ) monitoring capabilities
- Ideal for residential, commercial, and office environments

## Use Cases

- Indoor Air Quality monitoring in buildings and apartments
- Residential environment monitoring
- Office and workplace air quality control
- Educational facility environmental monitoring
- Healthcare facility IAQ compliance
- Commercial building management systems

## Thinger.io Integration

The Vaqa'O sensor integrates with Thinger.io through a LoRaWAN network server, enabling real-time monitoring of temperature, humidity, VOC, and CO2 levels. The integration allows for automated data collection, visualization, and alerting based on air quality parameters.

## Requirements

A LoRaWAN server is required to communicate the WATTECO Vaqa'O into Thinger.io, some options are:

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

- [WATTECO Support](https://support.watteco.com/vaqao)
- [WATTECO Official Website](https://www.watteco.com)
- [Thinger.io Documentation](https://docs.thinger.io)