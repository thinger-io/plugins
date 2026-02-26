# LRS20600 - Contact Sensor

The LRS20600 is a LoRaWAN open/close contact sensor designed to provide efficient monitoring of door openings and asset status. This battery-powered dry contact sensor detects open/close states and reports status changes, offering a simple solution for premises and asset monitoring applications.

## Features

- **Dry Contact Interface**: Logic input detection for open and close states
- **LoRaWAN Connectivity**: Long-range wireless communication via LoRaWAN protocol
- **Low Power Consumption**: Ultra-low standby current (<25µA @3.6V) for extended battery life
- **Battery Powered**: 1 x 3.6V C Size Battery
- **Rugged Design**: IP67 ingress protection rating
- **Wide Operating Temperature**: -20°C to 70°C
- **Compact Dimensions**: 112 x 70 x 39 mm
- **Lightweight**: 166 grams

## Use Cases

- Door and window monitoring
- Cabinet and enclosure access control
- Asset security monitoring
- Premises surveillance
- Smart building automation
- Industrial equipment status monitoring

## Thinger.io Integration

The LRS20600 integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time monitoring and visualization of contact sensor data.

## Requirements

A LoRaWAN server is required to communicate the LRS20600 into Thinger.io, some options are:

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

- [Device Documentation](https://www.senso8.com/senso8-lora)
- [Thinger docs](https://docs.thinger.io)