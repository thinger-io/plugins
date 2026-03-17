# LSN50v2-S31 - Temperature & Humidity Sensor

The Dragino LSN50v2-S31 consists of a temperature and humidity sensor for measuring the temperature and humidity in the surrounding environment. The measured data is then uploaded to the IoT server via LoRaWAN® wireless protocol. It can be used with home and building automation, industrial monitoring and control, and irrigation systems.

## Features

- LoRaWAN v1.0.3 Class A protocol support
- SHT31 temperature and humidity sensor with high accuracy and reliability
- Temperature measurement range: -40°C to +80°C with ±0.2°C accuracy (0-90°C range)
- Humidity measurement range: 0 to 99.9% RH with ±2% RH accuracy
- Temperature resolution: 0.01°C
- Humidity resolution: 0.01% RH
- Powered by 8500mAh Li-SOCI2 battery for long-term operation up to 10 years
- Temperature and humidity alarm functionality
- Fully calibrated, linearized, and temperature compensated digital output
- Long-term stability with minimal drift (<0.03°C/yr temperature, <0.25%RH/yr humidity)
- IP67 rated waterproof enclosure for outdoor use
- 3m external sensor cable

## Thinger.io Integration

The LSN50v2-S31 integrates with Thinger.io through LoRaWAN network servers, enabling seamless data visualization, device management, and real-time monitoring of temperature and humidity measurements.

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

## Use Cases

- Home and building automation
- Industrial monitoring and control
- Irrigation systems
- Cold chain logistics
- Greenhouse monitoring
- HVAC system monitoring
- Weather stations
- Data center environmental monitoring

## Additional Resources

Dragino resources can be found at:

- [Product Page](https://www.dragino.com/products/temperature-humidity-sensor/item/181-lsn50v2-s31.html)
- [User Manual](https://www.dragino.com/downloads/index.php?dir=LoRa_End_Node/LSN50v2-S31/)
- [Thinger docs](https://docs.thinger.io)