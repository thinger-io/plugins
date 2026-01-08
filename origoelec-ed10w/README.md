# ED10W - LoRaWAN Smartwatch

The ED10W is a smart IoT watch based on LoRaWAN technology. Combined with motion sensors, it can achieve indoor and outdoor real-time positioning. With wearing detection capabilities, it enables real-time collection of health data such as heart rate, body temperature, blood pressure, and steps. The data is transmitted to the platform through the LoRaWAN Network.

## Thinger.io Integration

This device integrates with Thinger.io through LoRaWAN connectivity, enabling real-time monitoring of health metrics and location data for IoT healthcare and tracking applications.

## Requirements

A LoRaWAN server is required to communicate the ED10W into Thinger.io, some options are:

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

This product also provides a predefined dashboard for monitoring health metrics and location data.

## Additional Resources

- [Thinger.io Documentation](https://docs.thinger.io)