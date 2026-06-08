# Vaqa'O Lite - Temp/Hum/CO2 Sensor

The WATTECO Vaqa'O Lite sensor is a LoRaWAN® device that measures the temperature, relative humidity, and carbon dioxide (CO2) in the ambient air of a room, in a building, an apartment, or a house. It allows Indoor Air Quality (IAQ) monitoring.

## Features

- **Temperature Measurement**: Range 0–55°C with ±0.2°C accuracy
- **Relative Humidity Monitoring**: 0–100% RH
- **CO2 Detection**: Carbon dioxide concentration measurement
- **LoRaWAN Class A**: Low-power wireless communication
- **Battery Powered**: Two 2600 mAh AA lithium batteries
- **Movement Detection**: Continuous monitoring of sensor movement

## Use Cases

- Indoor air quality monitoring in residential buildings
- Office and workplace environmental monitoring
- Smart building management systems
- Apartment and house comfort level tracking
- Room air quality assessment

## Thinger.io Integration

The Vaqa'O Lite integrates with Thinger.io through a LoRaWAN server, enabling real-time monitoring and management of indoor air quality parameters.

## Requirements

A LoRaWAN server is required to communicate the WATTECO Vaqa'O Lite into Thinger.io, some options are:

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

- [WATTECO Support](https://support.watteco.com/vaqaolite)
- [Product Information](https://www.watteco.com/products)
- [Thinger.io Documentation](https://docs.thinger.io)