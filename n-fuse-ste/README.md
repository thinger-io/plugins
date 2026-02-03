# Environment Sensor

The Environment Sensor is a multi-parameter environmental monitoring device equipped with the Bosch Sensortec BME680 sensor. This digital 4-in-1 sensor provides comprehensive air quality and environmental monitoring capabilities, measuring Indoor Air Quality (IAQ), equivalent CO2 (CO2-e), breathable Volatile Organic Compounds equivalent (bVOC-e), atmospheric pressure, temperature, and humidity.

The BME680 gas sensor detects a wide variety of Volatile Organic Compounds (VOC) to monitor indoor air quality, making it suitable for health and comfort monitoring in residential, commercial, and industrial environments.

## Features

- **Multi-parameter measurement**: Temperature, humidity, barometric pressure, and air quality
- **IAQ Index**: Indoor Air Quality scoring for environmental assessment
- **Gas sensing**: Detection of VOCs with CO2-e and bVOC-e equivalent outputs
- **Low power consumption**: Typical 3.7 µA at 1 Hz humidity measurement, 5mA nominal (25mA during VOC measurement)
- **Wide operating voltage**: 3.3V to 5.5V DC
- **Digital interface**: I2C communication (3.3V/5V compatible)

## Use Cases

- Indoor air quality monitoring
- HVAC system control and optimization
- Health and wellness applications
- Smart home and building automation
- Environmental compliance monitoring
- Workplace safety and comfort management

## Thinger.io Integration

This device can be integrated with Thinger.io through LoRaWAN connectivity, enabling remote environmental monitoring and data visualization.

## Requirements

A LoRaWAN server is required to communicate the Environment Sensor into Thinger.io, some options are:

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

- [Bosch Sensortec BME680 Datasheet](https://www.bosch-sensortec.com/media/boschsensortec/downloads/datasheets/bst-bme680-ds001.pdf)
- [Thinger.io Documentation](https://docs.thinger.io)