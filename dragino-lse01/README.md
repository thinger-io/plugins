# LSE01 - Soil Moisture & EC Sensor

The Dragino LSE01 is a LoRaWAN Soil Moisture & EC Sensor designed for IoT agriculture applications. It detects soil moisture, soil temperature, and soil conductivity (electrical conductivity). The device is powered by a Li-SOCI2 battery available in 4000mAh or 8500mAh capacities, designed for long-term use up to 10 years. The LSE01 features an IP66 waterproof enclosure, making it suitable for outdoor deployment in smart agriculture environments.

## Features

- **LoRaWAN 1.0.3 Class A** compliance
- **Soil Moisture Monitoring** with high accuracy
- **Soil Temperature Monitoring** for comprehensive soil analysis
- **Soil Conductivity (EC) Monitoring** to assess nutrient levels
- **Ultra-low power consumption** for extended battery life
- **Multi-regional support**: CN470/EU433/KR920/US915/EU868/AS923/AU915/IN865
- **IP66 Waterproof Enclosure** for harsh outdoor conditions
- **AT Commands** for parameter configuration
- **Periodic uplink transmission** with configurable intervals
- **Downlink support** for remote configuration
- **Long battery life**: up to 10 years with 4000mAh or 8500mAh Li-SOCI2 battery

## Thinger.io Integration

The LSE01 integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time monitoring of soil conditions for precision agriculture and environmental monitoring applications.

## Requirements

A LoRaWAN server is required to communicate the Dragino LSE01 into Thinger.io, some options are:

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

- [Product Page](https://www.dragino.com/products/lora-lorawan-end-node/item/159-lse01.html)
- [Documentation](https://www.dragino.com/downloads/index.php?dir=LoRa_End_Node/LSE01/)
- [Thinger docs](https://docs.thinger.io)