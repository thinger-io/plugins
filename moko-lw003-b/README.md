# LW003-B - Bluetooth Probe

The Moko Smart LW003-B integrates LoRaWAN® and Bluetooth wireless communication. It can scan BLE Beacon data and send data to the LoRaWAN gateway, and then upload it to the server to realize environmental monitoring and indoor positioning. The device features built-in temperature and humidity sensors and is commonly used in indoor monitoring applications.

## Features

- **Bluetooth BLE Gateway**: Scans and collects BLE Beacon data
- **LoRaWAN Connectivity**: LoRaWAN V1.0.3 protocol support
- **Built-in Sensors**: Temperature and humidity monitoring
- **Compact Design**: 122.7 x 109 x 36 mm dimensions
- **Operating Range**: -20°C to +60°C
- **Lightweight**: 165g net weight
- **USB Powered**: Convenient power supply option
- **Bluetooth v4.2**: Compatible with standard BLE Beacons

## Use Cases

- Indoor environmental monitoring
- Asset tracking and indoor positioning
- Temperature and humidity data logging
- BLE Beacon data aggregation
- Smart building applications
- Cold chain monitoring

## Thinger.io Integration

The LW003-B integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time data visualization, device management, and automated workflows for environmental monitoring and asset tracking applications.

## Requirements

A LoRaWAN server is required to communicate the Moko Smart LW003-B into Thinger.io, some options are:

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

Moko Smart resources can be found at:

- [Product Page](https://www.mokosmart.com/)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/moko/lw003-b/)
- [Thinger docs](https://docs.thinger.io)