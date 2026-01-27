# EDC Communication Module for Water Meters

The EDC (Electronic Data Capture) communication module is an add-on module manufactured by ZENNER for water meters, enabling secure remote reading and integration into smart metering AMR/AMI systems. The module is designed for non-reactive, electronic pulse detection of ZENNER water meters equipped with a modulator disc.

## Features

- Non-reactive electronic pulse detection via modulator disc technology
- LoRaWAN® radio interface (EU868 MHz band)
- Wireless M-Bus interface option (EN 13757-4)
- Long-life battery with up to 15 years of operation
- Battery status monitoring
- IP68 protection rating
- Operating temperature range: -15°C to +55°C
- Built-in data logger with storage capacity:
  - Annual due date values: max. 16
  - Monthly values: 18 (plus 18 semi-monthly values)
  - Daily values: 96
  - Quarter hour values: 96
- Configuration via infrared interface, ZENNER IrCombiHead, MinoConnect universal interface (USB/Bluetooth), MSS software, or ZENNER Device Manager Basic app
- Compliant with EC directive 2014/32/EU (Measuring Instrument Directive)

## Compatible Water Meters

The EDC module is compatible with ZENNER water meters equipped with AMR/AMI modulator disc, including:

- EKTD/ETWD Single-Jet Meters (cold and hot water)
- MTKD-S Multi-Jet Water Meters
- RTKD Positive Displacement Meters with dry dial and d-register

## Thinger.io Integration

### Requirements

A LoRaWAN server is required to connect the EDC Communication Module to Thinger.io. Supported options include:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

The corresponding plugin for the selected LoRaWAN server must be installed in your Thinger.io instance.

### Get Started

#### Installation

Search for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed, a new Product will be created for this device.

#### Configuration

The Product is preconfigured. Verify that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or adjust it as needed.

#### Usage

Begin sending uplinks to automatically provision devices and data buckets.

This product also provides a predefined dashboard and downlink capabilities.

## Additional Resources

- [ZENNER EDC Product Page](https://zenner.com/products/sys_edc_communication_module-2/)
- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/minol-zenner/edc-communication-module/)
- [Brunata ZENNER EDC Documentation](https://brunata.com/products/network/zenner-edc-communication-module-with-lorawan-radio-interface/)
- [Thinger.io Documentation](https://docs.thinger.io)