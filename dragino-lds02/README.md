# LDS02 - Door Sensor

The Dragino LDS02 is a LoRaWAN Door Sensor that detects door open/close status and uploads data to IoT servers via LoRaWAN network. It provides real-time monitoring of door status, open time, and open counts. The LDS02 sends periodic data transmissions every day as well as instant notifications for each door open/close action. The device features an open alarm capability that can be configured to send alerts if a door remains open for a specified duration.

## Features

- LoRaWAN Class A v1.0.3 protocol
- Frequency Bands: CN470/EU433/KR920/US915/EU868/AS923/AU915/IN865/RU864
- SX1262 LoRa Core
- Door open/close detection via magnetometer sensor
- Door open/close statistics tracking
- Open alarm feature for prolonged open door detection
- Powered by 2 x AAA LR03 batteries
- AT Commands for parameter configuration
- Periodic uplink and event-based transmission on open/close actions
- Remote parameter configuration via LoRa downlink
- Firmware upgradable via program port

## Applications

- Smart Buildings & Home Automation
- Logistics and Supply Chain Management
- Smart Metering
- Smart Agriculture
- Smart Cities
- Smart Factory

## Thinger.io Integration

The LDS02 integrates with Thinger.io through a LoRaWAN network server, enabling seamless data collection, visualization, and device management for door monitoring applications.

## Requirements

A LoRaWAN server is required to communicate the Dragino LDS02 into Thinger.io, some options are:

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

Start sending uplinks for autoprovisioning devices and buckets. This product also provides a predefined dashboard and downlinks.

## Additional Resources

Dragino resources can be found at:

- [Product Page](https://www.dragino.com/products/lorawan-nb-iot-door-sensor-water-leak/item/181-lds02.html)
- [User Manual](https://cdn-reichelt.de/documents/datenblatt/E910/DRA_LDS02_MAN-EN.pdf)
- [Thinger.io Documentation](https://docs.thinger.io)