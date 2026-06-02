# Flash'O - Smart Metering

The WATTECO LoRaWAN® Flash'O is a pulse sensor designed for counting light pulses emitted by any type of electronic meter including water, gas, electricity, and energy meters. This Class A LoRaWAN® device serves as a meter interface that transmits the accumulated number of LED flashes from pulse meters, enabling remote monitoring and smart metering applications.

## Features

- LoRaWAN® Class A protocol
- Reads light pulses from electronic meters (water, gas, electricity, energy)
- IP55 protection rating for indoor and outdoor use
- Battery autonomy up to 12 years
- Supports up to 500 pulses per second
- Data compression for batch reporting
- Easy deployment and installation
- Long range and low power consumption

## Thinger.io Integration

The Flash'O integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling automated device provisioning, real-time data visualization, and remote monitoring of metering data.

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

- [Flash'O Product Page](https://www.watteco.com/product/flasho-sensor-lorawan)
- [WATTECO Support Documentation](https://support.watteco.com/flasho)
- [Thinger docs](https://docs.thinger.io)