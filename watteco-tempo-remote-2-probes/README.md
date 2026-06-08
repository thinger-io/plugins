# Temp'O remote 2 probes sensor

The WATTECO Remote Temperature 2 CTN allows connecting 2 temperature sensor probes for measuring temperature in buildings and transmits the data over a public or private LoRaWAN® radio network. Dedicated to temperature measurements in industrial and building applications, this device provides reliable two-point temperature monitoring with extended battery autonomy.

## Features

- **Dual Temperature Probes**: Connect 2 external temperature sensor probes for simultaneous measurements
- **LoRaWAN Class A**: Operates on public or private LoRaWAN® networks
- **Extended Battery Life**: Up to 12 years of autonomy with 1 transmission every 2 hours (3.6V/3600mAh battery)
- **Compact Design**: 92 x 92 x 56 mm enclosure with IP55 protection rating
- **Wide Operating Range**: -20°C to +50°C ambient temperature
- **Lightweight**: 200 grams

## Use Cases

- **Domestic Hot Water (DHW) Monitoring**: Track temperature in water heating systems
- **Industrial Process Control**: Temperature monitoring of equipment and water piping
- **Building Equipment Maintenance**: Supervision of heating installations in residential and tertiary buildings
- **Railway Installations**: Monitor operation of railway infrastructure

## Thinger.io Integration

This device integrates with Thinger.io through LoRaWAN network servers, enabling remote temperature monitoring, data visualization, and automated alerts for your two-probe temperature sensing applications.

## Requirements

A LoRaWAN server is required to communicate the Temp'O remote 2 probes sensor into Thinger.io, some options are:

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

- [Product Page](https://www.watteco.com/product/remote-temperature-2x-probes)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/watteco/tempo-remote-2-probes)
- [Thinger docs](https://docs.thinger.io)