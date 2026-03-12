# LDDS04 - Distance Sensor

The Dragino LDDS04 is a LoRaWAN 4-Channels Distance Detection Sensor designed for long-range wireless communication with ultra-low power consumption. It utilizes ultrasonic technology to measure distances across up to four channels simultaneously, making it ideal for industrial monitoring, smart agriculture, and smart city applications.

## Features

- **LoRaWAN 1.0.3 Class A** protocol support
- **Four simultaneous distance measurements** via ultrasonic sensors
- **Ultra-low power consumption** for extended battery life
- **Ultrasonic detection technology** for accurate distance measurement
- **Long-range wireless communication** via LoRaWAN
- **Industrial-grade design** for robust outdoor and indoor deployment
- **Compact dimensions**: 150 x 120 x 55 mm (L x W x H)

## Use Cases

- **Smart Agriculture**: Monitor distance between crops and ground for optimized irrigation and fertilization
- **Smart City**: Track distance between vehicles and objects such as streetlights or other vehicles for traffic management
- **Industrial Monitoring**: Measure distance between machinery and objects to prevent collisions and improve workplace safety
- **Water Level Monitoring**: Monitor liquid levels in tanks, reservoirs, and other containers

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the Dragino LDDS04 into Thinger.io, some options are:

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

- [Product Page](https://www.dragino.com/products/distance-level-sensor/item/194-ldds04.html)
- [User Manual](http://wiki.dragino.com/xwiki/bin/view/Main/User%20Manual%20for%20LoRaWAN%20End%20Nodes/LDDS04%20-%20LoRaWAN%204-Channels)
- [Thinger docs](https://docs.thinger.io)