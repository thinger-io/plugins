# RCM-H200 Module for GWFCoder

The GWFcoder radio module RCM-H200 from GWF MessSysteme eliminates the need to change meters for the migration of water and gas meters with GWFcoder to an LPWAN network. With simple and quick on-site installation via Plug & Play, no programming is required and is ready for immediate use with a waterproof housing (protection class IP68).

The RCM-H200 is a battery-powered LoRaWAN radio module designed for backwards compatibility, enabling water and gas meters with GWFcoder MP registers to be integrated into Low Power Wide Area Networks without meter replacement. Available in split or compact execution, it supports long-range communication up to 25 miles (line of sight) and provides up to 15 years of battery lifetime with custom-tailored RF modes.

## Features

- **LoRaWAN Connectivity**: Compliant with LoRaWAN 1.0.4 specification with ADR (adaptive data rate) support
- **Long Range Performance**: Communication range up to 25 miles (line of sight)
- **Extended Battery Life**: Up to 15 years battery lifetime with optimized RF modes
- **Waterproof Design**: IP68 protection class for split execution (pit installations), IP67 for compact execution
- **Plug & Play Installation**: Easy on-site installation with automatic start-up after connecting to meter
- **Secure Communication**: AES-128-bit end-to-end encryption over 2 independent security layers
- **NFC Configuration**: Contactless NFC interface for configuration and commissioning
- **Real-time Synchronization**: Clock synchronization with LoRaWAN Network via DeviceTimeReq
- **LoRa Alliance Certified**: Interoperable with different LoRaWAN network providers
- **Robust Operation**: Integrated connectivity monitoring and automatic reconnecting mechanisms

## Technical Specifications

- **Frequency Bands**: 868 MHz (EU863-870), 915 MHz (US902-928)
- **Protocol**: LoRaWAN 1.0.4
- **Meter Interface**: GWFcoder MP register with ECO interface
- **Compatible Meters**: Water and gas meters (domestic and industrial) with GWFcoder MP
- **Transmission Intervals**: 15 minutes, 60 minutes, or daily (configurable)
- **Data Transmission**: Wireless M-Bus protocol
- **Execution Types**: Split-connection (cable to meter for remote installation) or compact (direct mount)
- **Approvals**: FCC, IC

## Use Cases

- Migration of installed water and gas meters with GWFcoder MP registers to smart metering systems via LoRaWAN
- Remote readout of water and gas meters without accessing buildings
- Energy monitoring, energy reporting, and consumption accounting with cloud solutions
- Integration of water and gas meters in smart city projects
- Drive-by or fixed network meter reading configurations

## Transmitted Data

The RCM-H200 transmits the following information from the GWFcoder MP register:

- Absolute meter reading (key date value)
- Monthly key date value
- Configurable warnings (all enabled or all disabled):
  - Continuous flow / leak (water meters only)
  - Backflow
  - Pipe burst (requires meter size configuration)
  - No usage over a period

## Thinger.io Integration

The RCM-H200 integrates with Thinger.io through a LoRaWAN network server, enabling remote monitoring and management of water and gas meter data.

## Requirements

A LoRaWAN server is required to communicate the GWF RCM-H200 into Thinger.io, some options are:

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

GWF resources can be found at:

- [GWF Product Finder](https://productfinder.gwf.ch/)
- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/gwf/rcm-h200/)
- [Thinger.io Documentation](https://docs.thinger.io)