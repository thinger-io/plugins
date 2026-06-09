# DC500 - People Counter

The CNDingtek DC500 is a PIR-based people counter designed to calculate and monitor the number of people entering and leaving specific areas. Using passive infrared sensor technology, this LoRaWAN-enabled device provides accurate counting capabilities with wireless connectivity for remote monitoring applications.

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the CNDingtek DC500 into Thinger.io, some options are:

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

## Features

- PIR (Passive Infrared) sensor technology for people detection
- LoRaWAN connectivity with up to 3km range in line of sight
- Battery-powered operation with over 1 year battery life (based on 50 uplinks per day)
- Alarm functionality when configured people limit is exceeded
- Compact design: 80 x 78 x 40 mm
- Lightweight: 240 grams
- Operating temperature range: -20°C to 70°C

## Use Cases

- Retail store traffic monitoring
- Building occupancy management
- Event attendance tracking
- Workspace utilization analysis
- Public space capacity control
- Queue management systems

## Additional Resources

CNDingtek resources can be found at:

- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/dingtek/dc500)
- [Thinger docs](https://docs.thinger.io)