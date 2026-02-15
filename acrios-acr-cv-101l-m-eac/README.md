# M-Bus to LoRaWAN Converter, Externally Powered

The M-Bus to LoRaWAN converter is used to retrofit ANY M-Bus meter with LoRaWAN communication. Designed for efficient readings of any wired M-Bus meters—typically electricity meters, water meters and heat meters, especially in the district heating industry. The device allows the integration of traditional M-Bus meters into the LoRaWAN wireless network, facilitating data collection on consumption in intervals as short as fifteen minutes.

The converter supports connection of up to 5 UL (Unit Loads) and communication is based on the M-Bus protocol EN 13757-3, ensuring compatibility with various meters from different manufacturers. This externally powered version operates with an external power source at 10-36 V DC, enabling reliable continuous operation for applications requiring frequent remote readings.

## Features

- M-Bus protocol EN 13757-3 support
- Supports up to 5 UL (Unit Loads)
- External power supply: 10-36 V DC
- Class A LoRaWAN device operation
- Remote configuration capability
- Plug-and-play setup
- WAGO terminals for quick installation
- Compatible with various meter manufacturers
- IP67 enclosure rating
- Operating temperature range: -30°C to 60°C
- Compact dimensions: 90 x 145 x 55 mm
- Suitable for indoor and outdoor use

## Use Cases

- District heating meter readings
- Electricity meter monitoring
- Water consumption tracking
- Heat meter data collection
- Remote metering infrastructure
- Retrofit of existing M-Bus installations
- Building energy management systems
- Smart city utility monitoring

## Thinger.io Integration

The M-Bus to LoRaWAN converter integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling centralized monitoring and management of M-Bus meters in IoT platforms.

## Requirements

A LoRaWAN server is required to communicate the M-Bus to LoRaWAN converter into Thinger.io, some options are:

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

ACRIOS resources can be found at:

- [Product Information](https://acrios.com/converters/wired-m-bus-to-lorawan)
- [Documentation](https://wiki.acrios.com/datasheets/ACR-CV-101L-M-EAC.pdf)
- [Quick Start Guide](https://wiki.acrios.com/quick_start/ACR-CV-101L-M-EAC/)
- [Thinger docs](https://docs.thinger.io)