# S2105-LoRaWAN® Soil Moisture, Temperature and EC Sensor

The SenseCAP S2105 is a LoRaWAN® soil monitoring sensor designed for precision agriculture and industrial applications requiring long-distance data acquisition. It measures soil moisture, temperature, and electrical conductivity (bulk EC) with ranges of 0 ~ 100% (m³/m³), -40 ~ 80℃, and 0 to 23 dS/m respectively. The device features Bluetooth 5.0 for easy configuration and firmware upgrades, a built-in replaceable battery for minimal maintenance, and IP66 protection for harsh outdoor environments. It supports multiple LoRaWAN® network architectures, enabling seamless integration with existing gateways and network servers.

## Thinger.io Integration

The S2105 integrates with Thinger.io through LoRaWAN® network servers, allowing real-time monitoring of soil conditions and automated data processing for precision agriculture applications.

## Requirements

A LoRaWAN server is required to communicate the SenseCAP S2105 into Thinger.io, some options are:

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

SenseCAP resources can be found at:

- [Product Page](https://www.seeed.cc/product/sensecap-s2105-lorawan-soil-moisture-temperature-and-ec-sensor)
- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/sensecap/sensecaps2105-soll-moisture-temp-ec)
- [Thinger docs](https://docs.thinger.io)