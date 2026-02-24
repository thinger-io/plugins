# Dramco Uno

The Dramco Uno is an educational IoT development board designed to teach soldering, electronics, and programming. Based on the Arduino Uno platform, it is enhanced with an on-board LoRaWAN modem and multiple sensors, enabling users to create wireless IoT sensor applications and collect data over LoRaWAN networks.

## Features

- **Processor**: Arduino Uno compatible (ATmega328 microcontroller)
- **Connectivity**: On-board LoRa modem for LoRaWAN communication
- **Sensors**:
  - Accelerometer
  - Temperature sensor
  - Light sensor
  - Button
- **Dimensions**: 68 x 53 x 15 mm
- **Power**: Battery-powered operation supported
- **Design**: Low power and low cost architecture

## Use Cases

- Educational projects for learning soldering and electronics
- IoT sensor data collection and monitoring
- LoRaWAN network prototyping and testing
- Remote sensing applications
- Wireless sensor development

## Thinger.io Integration

The Dramco Uno can be integrated with Thinger.io through LoRaWAN network servers, enabling remote monitoring and management of sensor data collected by the device.

## Requirements

A LoRaWAN server is required to communicate the Dramco Uno into Thinger.io, some options are:

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

Dramco Uno resources can be found at:

- [Dramco Uno Project Page](https://dramco.be/projects/dramco-uno/)
- [Dramco Uno GitHub Repository](https://github.com/DRAMCO/Dramco-UNO)
- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/kuleuven-dramco/dramco-uno/)
- [Thinger.io Documentation](https://docs.thinger.io)