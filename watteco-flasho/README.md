# Flash'O - Smart Metering

The WATTECO LoRaWAN® Flash'O is a meter interface that transmits the accumulated number of LED flashes from any pulse meter including water, gas, electricity, and energy meters. Designed for easy deployment and long-term monitoring, this device features data compression capabilities and is built to withstand various environmental conditions.

## Features

- **LoRaWAN® Class A** communication protocol
- **High-speed pulse detection**: Up to 500 pulses per second
- **Long battery life**: Up to 12 years autonomy with daily transmissions (1 measurement per day)
- **Data compression**: Differential coding for batch reporting
- **Flexible activation**: Supports both OTAA (Over-The-Air Activation) and ABP (Activation by Personalization)
- **Secure communication**: AES128 data encryption
- **Configurable transmission cycles**: From 10 minutes to 24 hours
- **NFC Tag interface**: For easy configuration and device information access
- **LED indicators**: 3 LEDs for configuration and network pairing status
- **Magnetic switch**: For reset and ON/OFF operations
- **Durable enclosure**: IP55 rating for protection against dust and water
- **Replaceable battery**: 3.6V / 3600mAh lithium battery

## Technical Specifications

- **Dimensions**: 92 x 92 x 56 mm
- **Application Layer**: ZCL (ZigBee Cluster Library)
- **Mounting**: Supplied with screws and anchors
- **Compliance**: RED, RoHS

## Use Cases

- Water consumption monitoring
- Gas meter reading
- Electricity usage tracking
- Energy metering applications
- Remote utility monitoring
- Smart building management
- Industrial metering solutions

## Thinger.io Integration

The Flash'O integrates seamlessly with Thinger.io through LoRaWAN connectivity, enabling automated data collection and real-time monitoring of utility consumption.

## Requirements

A LoRaWAN server is required to communicate the WATTECO Flash'O into Thinger.io, some options are:

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

WATTECO resources can be found at:

- [Product Support](https://support.watteco.com/)
- [Thinger docs](https://docs.thinger.io)