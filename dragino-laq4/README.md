# LAQ4 - Air Quality Sensor

The Dragino LAQ4 is a LoRaWAN Air Quality Sensor designed for Internet of Things solutions. It measures surrounding environment parameters including TVOC (Total Volatile Organic Compounds), eCO2 (equivalent CO2), temperature, and relative humidity, making it suitable for indoor air quality monitoring applications.

## Features

- **Air Quality Monitoring**: Measures TVOC and eCO2 levels
- **Environmental Sensing**: Temperature and humidity measurement via SHT sensor
- **LoRaWAN Connectivity**: Long-range wireless communication
- **Battery Powered**: Low power operation for extended deployment
- **Alarm Functionality**: Configurable alarm feature for threshold monitoring
- **Data Logging**: Supports historical data storage and retrieval

## Measurements

- **TVOC**: Total Volatile Organic Compounds
- **eCO2**: Equivalent CO2 concentration (ppm)
- **Temperature**: Ambient temperature (°C)
- **Relative Humidity**: Humidity percentage (%)

## Use Cases

- Indoor air quality monitoring
- Office and workplace environment monitoring
- Smart building applications
- HVAC system optimization
- Health and safety compliance monitoring
- Educational facilities environmental control

## Thinger.io Integration

The LAQ4 integrates with Thinger.io through LoRaWAN network servers, enabling real-time monitoring, data visualization, and alarm management for air quality parameters.

## Requirements

A LoRaWAN server is required to communicate the Dragino LAQ4 into Thinger.io, some options are:

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

Dragino resources can be found at:

- [Product Page](https://www.dragino.com/products/lora-lorawan-end-node/item/174-laq4.html)
- [User Manual](https://www.dragino.com/downloads/downloads/LoRa_End_Node/LAQ4/User_Manual/LAQ4_LoRaWAN_Air_Quality_Manual_v1.1.pdf)
- [Thinger docs](https://docs.thinger.io)