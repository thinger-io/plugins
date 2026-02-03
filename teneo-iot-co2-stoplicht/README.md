# CO2 stoplicht

The Teneo IoT CO2 stoplicht is equipped with a CO2 sensor, temperature sensor, and humidity sensor that alarms by means of the traffic light function when the measured values exceed the set standards. The CO2 traffic light has digital communication via LoRaWAN® or WiFi, which makes it possible to log in all measured values and view them remotely.

## Features

- CO2 sensor with ±30 ppm accuracy
- Temperature sensor
- Humidity sensor with 0% – 100% RH measuring range and ±3% RH accuracy
- Visual traffic light alarm system for instant air quality indication
- Dual connectivity: LoRaWAN® and WiFi support
- Remote monitoring and data logging capabilities

## Use Cases

- Indoor air quality monitoring in offices and workspaces
- Classroom and educational facility ventilation management
- Meeting room occupancy and air quality control
- Public building health and safety compliance
- Restaurant and hospitality environment monitoring

## Thinger.io Integration

The CO2 stoplicht communicates via LoRaWAN, enabling seamless integration with Thinger.io for real-time monitoring, data visualization, and alerting based on air quality parameters.

## Requirements

A LoRaWAN server is required to communicate the Teneo IoT CO2 stoplicht into Thinger.io, some options are:

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

Teneo IoT resources can be found at:

- [CO2 Stoplicht Manual](https://co2-stoplicht.online/wp-content/uploads/2021/04/User-Manual-LoRaWAN-CO2-Stoplicht-V2.0-EN.pdf)
- [Device Repository - The Things Network](https://www.thethingsnetwork.org/device-repository/devices/teneo-iot/co2-stoplicht/)
- [Thinger docs](https://docs.thinger.io)