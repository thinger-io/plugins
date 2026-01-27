# TLM LoRaWAN EndNode Modem

The TLM LoRaWAN EndNode Modem is a versatile industrial gateway designed to read field Modbus devices and transmit data to LoRaWAN networks. It enables seamless integration of legacy Modbus/TCP/RTU devices into LoRaWAN infrastructure, providing long-range wireless connectivity for industrial IoT applications.

## Features

- **Modbus Protocol Support**: Reads data from field devices via Modbus TCP and Modbus RTU protocols
- **LoRaWAN Connectivity**: Transmits collected data to LoRaWAN Server
- **Wide Operating Temperature**: -40°C to 85°C for industrial environments
- **Flexible Power Input**: 5-48V DC (max. 60V) or 100-240V AC (120-370V DC), 50-60 Hz
- **Compact Design**: 124 x 43 x 95 mm dimensions with IP52 enclosure
- **Dual Connectivity Options**: Supports TCP/IP and RS232/RS485 interfaces

## Use Cases

- Industrial automation and monitoring
- Remote sensor data collection
- SCADA system integration
- Energy monitoring and management
- Building automation systems
- Smart agriculture and environmental monitoring

## Thinger.io Integration

The TLM LoRaWAN EndNode Modem integrates with Thinger.io through LoRaWAN network servers, enabling remote monitoring and management of Modbus devices through the Thinger.io platform.

## Requirements

A LoRaWAN server is required to communicate the TLM LoRaWAN EndNode Modem into Thinger.io, some options are:

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

TLM resources can be found at:

- [Product Information](https://redz-sc.com/en/product/tlm-series-lora-modems-and-lorawan-endnode-modems)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/redz/tlm-lw/)
- [Thinger docs](https://docs.thinger.io)