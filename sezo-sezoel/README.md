# EL - Air Quality Sensor

The EL Air Quality Sensor is an environmental monitoring device designed to measure indoor and outdoor air quality parameters. It provides real-time monitoring of multiple environmental factors to support health, safety, and comfort applications.

## Features

- **Multi-parameter sensing**: Measures temperature, humidity, CO2, PM2.5, PM10, VOC, and other air quality indicators
- **LoRaWAN connectivity**: Low-power wireless communication for long-range data transmission
- **Battery-powered operation**: Extended battery life for autonomous deployment
- **Compact design**: Easy installation in various indoor and outdoor environments
- **Data logging**: Stores measurement history for trend analysis

## Applications

- Indoor air quality monitoring in offices, schools, and public buildings
- Smart building and facility management
- Environmental health and safety compliance
- HVAC system optimization
- Industrial air quality monitoring

## Thinger.io Integration

The EL Air Quality Sensor integrates seamlessly with Thinger.io through LoRaWAN connectivity, enabling real-time data visualization, historical analysis, and automated alerting based on air quality thresholds.

## Requirements

A LoRaWAN server is required to communicate the EL Air Quality Sensor into Thinger.io. Supported options include:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

The corresponding plugin for the selected LoRaWAN server must be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://ma.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed, a new Product will be created for this device.

### Configuration

The Product is already preconfigured. Verify that the auto provision prefix matches the one configured in your LoRaWAN server plugin in Thinger.io, or adjust it as needed.

### Usage

Start sending uplinks to automatically provision devices and data buckets. The product includes predefined dashboards for air quality visualization and monitoring.

## Additional Resources

- [Thinger.io Documentation](https://docs.thinger.io)