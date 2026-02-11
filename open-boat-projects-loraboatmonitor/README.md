# LoRa Boat Monitor

The LoRa boat monitor is used to monitor the boat when you are away. Various measured values such as battery voltage, GPS position, humidity, temperature, air pressure, filling levels, bilge and door contact are continuously forwarded to the LoRaWAN and recorded at freely adjustable time intervals via the LoRa radio technology.

## Features

- **GPS Tracking**: Real-time position monitoring
- **Environmental Monitoring**: Temperature, humidity, and air pressure sensors
- **Battery Voltage Monitoring**: Continuous battery level tracking
- **Level Sensors**: Monitoring of filling levels and bilge water
- **Digital Inputs**: Door contact and bilge alarm detection
- **Adjustable Intervals**: Freely configurable data transmission intervals
- **Compact Design**: 115 x 90 x 55 mm dimensions with IP65 enclosure
- **Wide Operating Temperature**: -20°C to 60°C

## Technical Specifications

| Parameter | Value |
|-----------|-------|
| Connectivity | LoRaWAN |
| Enclosure Rating | IP65 |
| Dimensions | 115 x 90 x 55 mm |
| Operating Temperature | -20°C to 60°C |
| Sensors | GPS, Temperature, Pressure, Humidity, Level, Voltage, Digital Input |

## Use Cases

- Remote boat monitoring while moored or anchored
- Security surveillance with door contact detection
- Bilge water level monitoring and alerts
- Battery status monitoring for maintenance planning
- Environmental condition tracking
- GPS position tracking and theft prevention

## Thinger.io Integration

The LoRa Boat Monitor can be seamlessly integrated into Thinger.io through a LoRaWAN network server, enabling real-time monitoring, data visualization, and alerts for all boat parameters.

## Requirements

A LoRaWAN server is required to communicate the LoRa Boat Monitor into Thinger.io, some options are:

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

LoRa Boat Monitor resources can be found at:

- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/open-boat-projects/loraboatmonitor/)
- [GitHub Repository](https://github.com/norbert-walter/LoRa-Boat-Monitor)
- [Open Boat Projects](https://open-boat-projects.org/en/lora-bootsmonitor/)
- [Thinger docs](https://docs.thinger.io)