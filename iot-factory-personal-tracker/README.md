# Personal Tracker

The Personal Tracker is a LoRaWAN-enabled geolocation and activity monitoring device designed for indoor and outdoor tracking applications. This compact tracker combines multiple positioning technologies including GPS/GLONASS satellite positioning, Wi-Fi scanning, and iBeacon capabilities to provide accurate location data in various environments. The device features an integrated accelerometer for activity detection and a button for manual interaction, making it suitable for personal safety, asset tracking, and workforce management applications.

## Features

- **Multi-mode Geolocation**: GPS/GLONASS outdoor positioning, Wi-Fi scanner and iBeacon for indoor positioning
- **Activity Monitoring**: Built-in accelerometer for motion and activity detection
- **Compact Design**: Dimensions of 55 x 35 x 18 mm for easy portability
- **LoRaWAN Connectivity**: LoRaWAN 1.0.3 protocol support for long-range, low-power communication
- **User Interaction**: Integrated button for SOS or manual trigger functions
- **Hybrid Positioning**: Combines multiple geolocation modes based on priorities for optimal location accuracy

## Use Cases

- Personal safety and lone worker monitoring
- Asset and equipment tracking
- Fleet and workforce management
- Elderly care and patient monitoring
- Event attendee tracking
- Logistics and supply chain visibility

## Thinger.io Integration

The Personal Tracker integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time location monitoring, activity alerts, and comprehensive tracking dashboards.

## Requirements

A LoRaWAN server is required to communicate the Personal Tracker into Thinger.io, some options are:

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

- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/iot-factory/personal-tracker/)
- [Thinger docs](https://docs.thinger.io)