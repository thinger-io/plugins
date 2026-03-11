# LBT1 - Bluetooth Tracker

The Dragino LBT1 is a LoRaWAN® Bluetooth tracker that consists of a motion sensor and an iBeacon scanner. LBT1 scans and finds the nearest i-Beacon info and sends it to an IoT server via LoRaWAN wireless network. This long range, low power consumption tracker is designed for indoor tracking applications and includes a built-in motion sensor that reports walking steps to the server.

## Features

- **iBeacon Scanner**: Scans and identifies nearest iBeacon information
- **Motion Sensor**: Built-in sensor for step counting and movement detection
- **LoRaWAN Connectivity**: Low power, long range wireless communication
- **Dual Power Options**: 5V via USB port or internal 1000mAh battery
- **Wide Operating Temperature**: -40°C to 85°C
- **Compact Design**: Portable form factor suitable for indoor tracking

## Use Cases

- Indoor asset tracking
- Personnel location monitoring
- Proximity-based services
- Warehouse inventory management
- Elderly care monitoring
- Step counting and activity tracking

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the Dragino LBT1 into Thinger.io, some options are:

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

Dragino resources can be found at:

- [Product Page](https://www.dragino.com/products/lora-lorawan-end-node/item/165-lorawan-ble-indoor-tracker-lbt1.html)
- [Documentation](https://www.dragino.com/downloads/index.php?dir=LoRa_End_Node/LBT1/)
- [Thinger docs](https://docs.thinger.io)