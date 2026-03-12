# TrackerD - GPS Tracker

The Dragino TrackerD consists of a LoRaWAN tracker based on ESP32 MCU and Semtech LoRa Wireless Chip. It features various sensors and functions such as GPS, WiFi, BLE, temperature, humidity, motion detection, alarm button and a buzzer. The LoRa wireless technology allows the device to send data and reach extremely long ranges at low data rates. Each TrackerD has a worldwide unique OTAA key to join the LoRaWAN network.

## Features

- **MCU**: ESP32 PICO D4
- **LoRa Chip**: SX1276/78 Wireless Chip
- **LoRaWAN Protocol**: LoRaWAN 1.0.3 Class A
- **GPS Tracking**: Regular and real-time GPS tracking
- **Wireless Technologies**: WiFi and BLE tracking capabilities
- **Environmental Sensors**: Temperature and humidity monitoring
- **Motion Detection**: 3-axis accelerometer for movement detection
- **Alarm Button**: Emergency or alert functionality
- **Buzzer**: Audio notification capability
- **Power**: 1000mAh Li-ion battery
- **Open Source**: Arduino IDE compatible with open source hardware and software

## Use Cases

- Asset tracking and management
- Fleet and vehicle monitoring
- Personnel tracking and safety
- Cold chain logistics monitoring
- Outdoor equipment tracking
- Real-time location services

## Thinger.io Integration

The TrackerD integrates with Thinger.io through LoRaWAN connectivity, enabling real-time monitoring of GPS location, environmental conditions, and sensor data through the Thinger.io platform.

## Requirements

A LoRaWAN server is required to communicate the Dragino TrackerD into Thinger.io, some options are:

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

- [TrackerD Product Page](https://www.dragino.com/products/tracker/item/234-trackerd.html)
- [Thinger docs](https://docs.thinger.io)