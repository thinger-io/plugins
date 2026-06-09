# DT311 - Temperature & Humidity Sensor

The CNDingtek DT311 is a wireless temperature and humidity sensor designed for indoor use in protected environments. It measures ambient temperature and humidity and transmits data to the cloud through LoRaWAN, NB-IoT, or Sigfox connectivity options. The device is ideal for monitoring conditions in rooms, cabinets, storage spaces, and other protected indoor facilities.

## Features

- **High Accuracy Measurements**: Temperature accuracy of ±0.3°C and humidity accuracy of ±2% RH
- **Multiple Connectivity Options**: LoRaWAN, NB-IoT, or Sigfox wireless protocols
- **Indoor Design**: Optimized for protected ambient environments
- **Cloud Integration**: Direct data transmission to cloud platforms
- **Easy Deployment**: Wireless installation with no wiring required

## Use Cases

- Room climate monitoring
- Cabinet and enclosure environmental control
- Storage space condition tracking
- Protected facility temperature and humidity oversight
- Indoor environmental quality management

## Thinger.io Integration

The DT311 can be integrated into Thinger.io through LoRaWAN connectivity, enabling real-time monitoring, data visualization, and automated control based on environmental conditions.

## Requirements

A LoRaWAN server is required to communicate the CNDingtek DT311 into Thinger.io, some options are:

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

CNDingtek resources can be found at:

- [DT311 Product Page](https://www.dingtek.com/temperature-humitidy-sensor-dt311)
- [Thinger docs](https://docs.thinger.io)