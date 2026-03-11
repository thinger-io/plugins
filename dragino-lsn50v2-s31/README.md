# LSN50v2-S31 - Temperature & Humidity Sensor

The Dragino LSN50v2-S31 is a LoRaWAN Temperature and Humidity Sensor for Internet of Things solution. It consists of a temperature and humidity sensor for measuring the temperature and humidity in the surrounding environment. The measured data is then uploaded to the IoT server via LoRaWAN wireless protocol. The temperature & humidity sensor used in LSN50v2-S31 is the SHT31, which is fully calibrated, linearized, and temperature compensated with digital output from Sensirion, providing strong reliability. It can be used with home and building automation, industrial monitoring and control, and irrigation systems.

## Features

- LoRaWAN v1.0.3 Class A protocol
- SHT31 temperature and humidity sensor
- Temperature measurement range: -40°C to +80°C
- Fully calibrated, linearized, and temperature compensated digital output
- Powered by 8500mAh Li-SOCI2 battery
- Ultra-low power consumption
- Designed for long-term use up to 10 years
- IP rated enclosure for outdoor use

## Thinger.io Integration

The LSN50v2-S31 integrates with Thinger.io through a LoRaWAN server plugin, enabling automatic device provisioning, data storage, and visualization.

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

Start sending uplinks for autoprovisioning devices and buckets.
This product also provides a predefined dashboard and downlinks.

## Additional Resources

Dragino resources can be found at:

- [Documentation](https://www.dragino.com/products/temperature-humidity-sensor/item/189-lsn50v2-s31b.html)
- [Thinger docs](https://docs.thinger.io)