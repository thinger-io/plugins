# LSN50v2-D20 - Temperature Sensor

The Dragino LSN50v2-D20 consists of a temperature sensor for measuring the temperature of the air, liquid, or any object, and then uploaded to the IoT server via LoRaWAN wireless protocol. It can be used with home and building automation, industrial monitoring and control, and irrigation systems.

## Features

- **LoRaWAN v1.0.3 Class A** protocol support
- **Temperature measurement range:** -55°C to 125°C
- **Accuracy:** ±0.5°C (max ±2.0°C)
- **DS18B20 temperature probe** with silica gel cable
- **Waterproof and moisture-proof** design with double compressed connection
- **Temperature alarm** functionality for instant notifications
- **Ultra-low power consumption:** 20µA in sleeping mode
- **Long battery life:** Powered by 8500mAh Li-SOCI2 battery, designed for up to 10 years operation
- **Multi-band support:** CN470/EU433/EU868/US915/AU915/AS923/KR920/IN865
- **Remote configuration** via AT commands and downlinks
- **Periodic uplink** transmission
- **Pre-loaded LoRaWAN keys** for easy registration

## Thinger.io Integration

The LSN50v2-D20 integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling remote temperature monitoring and data visualization for IoT applications.

## Requirements

A LoRaWAN server is required to communicate the Dragino LSN50v2-D20 into Thinger.io, some options are:

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

## Use Cases

- Wireless alarm and security systems
- Home and building automation
- Industrial monitoring and control
- Long range irrigation systems
- Cold chain monitoring
- HVAC system monitoring
- Environmental temperature tracking

## Additional Resources

Dragino resources can be found at:

- [Product Page](https://www.dragino.com/products/lora-lorawan-end-node/item/168-lsn50v2-d20.html)
- [Datasheet](https://www.dragino.com/downloads/downloads/LoRa_End_Node/LSN50v2-D20/Datasheet_LSN50v2-D2x_LoRaWAN_Temperature_Sensor.pdf)
- [Download Center](https://www.dragino.com/downloads/index.php?dir=LoRa_End_Node/LSN50v2-D20/)
- [Thinger.io Documentation](https://docs.thinger.io)