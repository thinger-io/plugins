# LDDS45 - Distance Sensor

The Dragino LDDS45 is a LoRaWAN Distance Detection Sensor for Internet of Things solutions. This high-precision ultrasonic distance detection sensor utilizes LoRaWAN technology for long-range, low-power communication. The device is designed to measure distances to flat objects ranging from 30 mm to 4500 mm, making it suitable for various industrial and environmental monitoring applications.

The LDDS45 is powered by an 8500mAh Li-SOCI2 battery designed for long-term use up to 10 years. Each device comes pre-loaded with a unique set of keys for LoRaWAN authentication and secure communication.

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the Dragino LDDS45 into Thinger.io, some options are:

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

- [Product Page](https://www.dragino.com/products/distance-level-sensor/item/191-ldds45.html)
- [Thinger docs](https://docs.thinger.io)