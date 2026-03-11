# LSN50v2-S31 - Temperature & Humidity Sensor

The Dragino LSN50v2-S31 is a LoRaWAN Temperature and Humidity Sensor for Internet of Things solution. It precisely measures the temperature and relative air humidity in the surrounding environment and uploads this data to an IoT server via the LoRaWAN wireless protocol. The sensor is suitable for home and building automation, industrial monitoring and control, and irrigation systems.

## Features

- **LoRaWAN v1.0.3 Class A** protocol support
- **SHT31 sensor** with fully calibrated, linearized, and temperature compensated digital output from Sensirion
- **Temperature measurement**: -40°C to +80°C range with ±0.2°C accuracy (0-90°C) and 0.01°C resolution
- **Humidity measurement**: 0 to 99.9% RH range with ±2% RH accuracy and 0.01% RH resolution
- **Temperature and humidity alarm** feature for instant notifications
- **Long battery life**: 8500mAh Li-SOCI2 battery designed for up to 10 years of operation
- **High reliability**: Long-term drift <0.03°C/year for temperature and <0.25% RH/year for humidity
- **Outdoor ready**: IP67 rated enclosure with 3m external sensor cable

## Use Cases

- Home and building automation
- Industrial monitoring and control
- Irrigation systems
- Cold chain monitoring
- Environmental monitoring
- Greenhouse climate control
- HVAC system monitoring

## Thinger.io Integration

This device integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time monitoring of temperature and humidity data with automatic device provisioning and data bucket creation.

## Requirements

A LoRaWAN server is required to communicate the Dragino LSN50v2-S31 into Thinger.io, some options are:

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

- [Product Documentation](https://www.dragino.com/products/lora-lorawan-end-node/item/151-lsn50v2.html)
- [Thinger.io Documentation](https://docs.thinger.io)