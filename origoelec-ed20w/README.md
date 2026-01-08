# ED20W - LoRaWAN Smartwatch

The ED20W is a smart IoT wearable device based on LoRaWAN technology. Combined with motion sensors and GPS positioning, it enables indoor and outdoor real-time location tracking. With integrated health monitoring sensors and wearing detection, it collects vital health data including heart rate, body temperature, blood pressure, and step count. All data is transmitted to the cloud platform through LoRaWAN networks, making it suitable for elderly care, remote health monitoring, and workforce safety applications.

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the ED20W into Thinger.io, some options are:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://ma.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed a new Product will be created for this device.

### Configuration

The Product is already preconfigured, check that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your desire.

### Usage

Start sending uplinks for autoprovisioning devices and buckets.

This product also provides a predefined dashboard and downlinks.

## Additional Resources

- [Thinger docs](https://docs.thinger.io)