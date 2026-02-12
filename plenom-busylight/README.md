# kuando Busylight IoT Omega LoRaWAN

The kuando Busylight IoT Omega is a visual indicator device designed for status updates, cues, and notifications in IoT environments. This LoRaWAN Class C device provides 360-degree visibility and can be integrated into a wide variety of use cases through LoRaWAN networks. The device operates on multiple frequency plans including EU863-870, US902-928, AS923, AU915-928, and IN865-867.

## Features

- **360-degree visibility**: Visual indicator viewable from all angles
- **LoRaWAN Class C device**: Supports continuous downlink communication for real-time notifications
- **Multi-region support**: Compatible with EU863-870, US902-928, AS923, AU915-928, and IN865-867 frequency plans
- **Lightweight design**: Weighs only 28 grams
- **Powered operation**: 3-meter power cable for continuous operation
- **Remote control**: Configurable via LoRaWAN downlink messages

## Use Cases

- Office presence and availability indication
- Production line status signaling
- Meeting room occupancy alerts
- Workflow status notifications
- Safety and emergency alerts
- Queue management systems

## Thinger.io Integration

The kuando Busylight IoT Omega can be integrated with Thinger.io through LoRaWAN network servers, enabling remote control and status management of visual indicators across your IoT infrastructure.

## Requirements

A LoRaWAN server is required to communicate the kuando Busylight IoT Omega into Thinger.io, some options are:

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
This product also provides a predefined dashboard and downlinks for controlling the visual indicator status remotely.

## Additional Resources

kuando Busylight resources can be found at:

- [Product Information](https://busylight.com/products/busylight-iot-developers/)
- [Plenom Specifications](https://www.plenom.com/products/kuando-busylight-iot-lorawan/)
- [Thinger docs](https://docs.thinger.io)