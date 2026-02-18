# Sentrius RS1xx Ext Temp 1W Sensor

The Laird Sentrius™ RS1xx Ext Temp 1W Sensor is a battery-powered, long-range sensor platform featuring an external temperature sensor probe. It uses LoRaWAN® and Bluetooth Low Energy (BLE) for data communication, making it ideal for industrial applications requiring remote temperature monitoring. The robust IP65 sensor enclosure allows it to be deployed in harsh environments.

## Features

- **Dual Wireless Connectivity**: LoRaWAN and Bluetooth v4.2 (Central/Peripheral)
- **External Temperature Probe**: 1-Wire temperature sensor with stainless steel probe
- **Integrated Antennas**: Custom Laird antenna for 868, 915, or 923 MHz
- **Rugged Enclosure**: IP65-rated for harsh environment protection
- **Battery Powered**: Long-lasting battery operation for remote deployments
- **Compact Design**: 116 x 91 x 34 mm dimensions
- **Operating Temperature Range**: -25°C to 50°C

## Use Cases

- Cold chain monitoring
- Industrial temperature monitoring
- HVAC systems
- Process control
- Warehouse monitoring
- Agricultural applications

## Thinger.io Integration

This device integrates with Thinger.io through LoRaWAN network servers, enabling real-time temperature data monitoring, visualization, and alerting capabilities.

## Requirements

A LoRaWAN server is required to communicate the Sentrius RS1xx Ext Temp 1W Sensor into Thinger.io, some options are:

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

Laird Connectivity (Ezurio) resources can be found at:

- [Sentrius RS1xx Product Page](https://www.ezurio.com/iot-devices/lorawan-iot-devices/sentrius-rs1xx-lora-enabled-sensors)
- [Thinger docs](https://docs.thinger.io)