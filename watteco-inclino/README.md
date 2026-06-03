# Inclino - Vertical angle measurement Sensor

The WATTECO Inclino is an autonomous LoRaWAN IoT device that monitors the inclination of equipment using an onboard accelerometer. It detects changes in position and vertical angles ranging from 0 to 180 degrees. The sensor can confirm if installations such as roof windows are properly closed and can be configured to detect light shocks. Designed for long-term deployment, it features easy installation with over 8 years of battery autonomy and IP67 protection.

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the WATTECO Inclino into Thinger.io, some options are:

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

- [Documentation](https://support.watteco.com/inclino-2-2)
- [Thinger docs](https://docs.thinger.io)