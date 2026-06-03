# Temp'O - Outdoor Temperature Sensor

The WATTECO Temp'O outdoor Temperature sensor measures the outside temperature of buildings and the inside temperature of cold rooms, and transmits the data over a public or private LoRaWAN® radio network.

## Features

- **Outdoor temperature monitoring**: Dedicated sensor for external temperature measurement
- **LoRaWAN connectivity**: Public or private network compatibility
- **Compact design**: 92 x 92 x 56 mm enclosure with IP55 protection
- **Wide temperature range**: Operating from -25°C to 70°C
- **Tamper detection**: Equipped with a switch for activation/deactivation monitoring
- **Status indication**: LED indicators for configuration and network pairing status

## Use Cases

- Supervision of heating, ventilation and air conditioning (HVAC) installations
- Building exterior temperature monitoring
- Cold room temperature control
- Industrial facility climate monitoring
- Energy management systems

## Thinger.io Integration

This device can be integrated into Thinger.io using LoRaWAN network server plugins to enable real-time temperature monitoring, data visualization, and automated alerts.

## Requirements

A LoRaWAN server is required to communicate the WATTECO Temp'O into Thinger.io, some options are:

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

- [Product page](https://www.watteco.com/product/outdoor-temperature-sensor-lorawan)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/watteco/tempo-outdoor)
- [Thinger docs](https://docs.thinger.io)