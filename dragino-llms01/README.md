# LLMS01 - Leaf Moisture Sensor

The Dragino LLMS01 is a LoRaWAN Leaf Moisture Sensor designed for IoT agriculture applications. It measures leaf moisture and temperature using the FDR (Frequency Domain Reflectometry) method, which senses the dielectric constant caused by liquid over the leaf surface and converts it to leaf moisture values. The sensor features an IP67 waterproof probe with a density of 15 leaf vein lines per centimeter, enabling it to detect small water drops with high accuracy. The device is designed to help optimize irrigation strategies, prevent crop diseases, and improve water efficiency in farming by analyzing leaf status such as watering needs, moisturizing, dew, and frozen conditions.

## Features

- LoRaWAN 1.0.3 Class A protocol
- Leaf moisture and temperature monitoring
- FDR measurement method for accurate detection
- IP67 waterproof probe
- High-density probe design (15 leaf vein lines per centimeter)
- Ultra-low power consumption
- Long-range wireless transmission
- AT Commands for parameter configuration
- Battery-powered for long-term deployment

## Use Cases

- Precision agriculture and smart farming
- Irrigation optimization and water management
- Crop disease prevention through moisture monitoring
- Agricultural research and environmental monitoring
- Greenhouse and indoor farming applications

## Thinger.io Integration

The LLMS01 integrates with Thinger.io through LoRaWAN network servers, enabling remote monitoring of leaf moisture and temperature data for agricultural IoT applications.

## Requirements

A LoRaWAN server is required to communicate the Dragino LLMS01 into Thinger.io, some options are:

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

- [LLMS01 Product Page](https://www.dragino.com/products/agriculture-weather-station/item/183-llms01.html)
- [User Manual](https://airteq.eu/wp-content/uploads/2025/12/LLMS01-LoRaWAN-Leaf-Moisture-Sensor-User-Manual.pdf)
- [Thinger.io Documentation](https://docs.thinger.io)