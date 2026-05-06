# Milesight UC100 Series IoT Controller

The Milesight UC100 is an IoT controller designed for remote control and data acquisition from Modbus RS485 devices via LoRaWAN® networks. It can read up to 16 Modbus RTU devices and support Modbus transparent transmission between server and RS485 devices as a Modbus to LoRaWAN® converter. The UC100 supports multiple trigger conditions and actions which can work autonomously even when the network is unavailable. Combining with Milesight IoT Cloud solution, it enables monitoring and control of remote assets via web server or mobile app. The device is widely used in indoor applications like smart metering, smart cities, and building automation.

## Features

- **Modbus Connectivity**: Support reading 32 Modbus registers, can connect up to 32 Modbus devices
- **Long Range Transmission**: Ultra-wide-distance transmission up to 15 km line of sight
- **Autonomous Operation**: Multiple triggering conditions and actions for standalone operation
- **Data Reliability**: Store historical data locally (up to 1000 entries) with retransmission support to prevent data loss
- **Device-to-Device**: Support Milesight D2D protocol for ultra-low latency direct control without LoRaWAN® gateway
- **Remote Management**: Quick and easy management with Milesight Development Platform solution
- **FUOTA Support**: Firmware Update Over the Air capability
- **Stability**: Embedded watchdog for device working stability
- **Standard Compliance**: Compatible with standard LoRaWAN® gateways and network servers

## Technical Specifications

### LoRaWAN Parameters
- **Frequency Bands**: CN470/IN865/EU868/RU864/US915/AU915/KR920/AS923-1&2&3&4
- **TX Power**: 16dBm (868 MHz) / 22dBm (915 MHz) / 19dBm (470 MHz)
- **Sensitivity**: -137dBm @300bps
- **Activation**: OTAA/ABP
- **Class**: Class C
- **Antenna**: Internal Antenna or External Antenna (Hardware Optional)
- **External Antenna Connector**: 1 × 50 Ω SMA Connector

### Data Interface
- **Port**: 1 × RS485 (2-pin 3.5 mm Terminal Block)
- **Terminal Resistor**: 1 × 120 Ω Resistor Switch
- **Baud Rate**: 1200~115200 bps
- **Protocol**: Modbus RTU, Passthrough

### Physical Interface
- **USB**: 1 × Type-C for Power Supply, Configuration and Console
- **Reset**: 1 × Reset Button (Internal)
- **LED**: 1 × System Indicator
- **Power Connector**: 1 × 3.5mm 2-pin Terminal Block with Surge-Protection and Reverse Polarity Protection

### Advanced Features
- Threshold Alarm
- Change Alarm
- Data Storage (Up to 1000 entries)
- Data Retrievability and Retransmission
- Milesight D2D Controller and Agent
- IF-THEN Command logic

## Thinger.io Integration

The Milesight UC100 Series integrates with Thinger.io through LoRaWAN network servers, enabling remote monitoring and control of Modbus devices connected to the controller.

## Requirements

A LoRaWAN server is required to communicate the Milesight UC100 into Thinger.io. Supported options include:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

The corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed, a new Product will be created for this device.

### Configuration

The Product is already preconfigured. Verify that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or modify it as needed.

Configuration can be performed via:
- USB Type-C connection
- LoRaWAN downlink commands

### Usage

Start sending uplinks for autoprovisioning devices and buckets. This product also provides predefined dashboards and downlinks for remote control and monitoring of connected Modbus devices.

## Use Cases

- Smart metering and utility monitoring
- Smart cities infrastructure
- Building automation systems
- Industrial data acquisition
- Remote sensor monitoring
- HVAC control systems

## Additional Resources

Milesight resources can be found at:

- [UC100 Datasheet](https://resource.milesight.com/milesight/iot/document/uc100-datasheet-en.pdf)
- [UC100 User Guide](https://resource.milesight.com/milesight/iot/document/uc100-user-guide-en.pdf)
- [Milesight IoT](https://www.milesight-iot.com/)
- [Thinger.io Documentation](https://docs.thinger.io)