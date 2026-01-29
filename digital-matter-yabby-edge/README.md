# Yabby Edge - Asset Tracking

The Digital Matter Yabby Edge is a LoRaWAN® indoor/outdoor asset tracker that combines GNSS and WiFi scanning. It is the first industrial asset tracking device to feature Semtech's LoRa Edge™ LR1110 Asset Management platform and advanced cloud-based location calculations, significantly reducing power consumption and extending battery life.

## Features

- **Long Battery Life**: Powered by 2 x AAA user-replaceable batteries with 10+ years battery life
- **Dual Location Technology**: Indoor/Outdoor location based on GNSS and Wi-Fi Access Point scanning data
- **Ultra-Rugged Design**: IP67 waterproof and dustproof enclosure
- **Compact Form Factor**: 85 x 63 x 24 mm dimensions
- **Intelligent Power Management**: Cloud-based location solving optimizes battery consumption
- **Multi-Sensor**: Accelerometer, temperature sensor, battery monitoring, and GPS
- **LoRaWAN Connectivity**: Available in 868 MHz (EU) or 902-928 MHz (US) versions
- **Operating Temperature**: -20°C to 60°C
- **Highly Configurable**: Flexible configuration options for various use cases
- **White-Label Ready**: Integration-ready for custom deployments

## Use Cases

- **Asset Visibility**: Monitor asset location and movement within LoRaWAN Gateway coverage
- **Indoor/Outdoor Tracking**: Track assets across warehouses, yards, and outdoor facilities
- **Long-Term Deployments**: "Deploy once" solution for extended monitoring periods
- **Supply Chain Management**: Track goods and equipment throughout logistics operations
- **Equipment Monitoring**: Monitor location and movement of valuable equipment and tools

## Thinger.io Integration

The Yabby Edge integrates seamlessly with Thinger.io through LoRaWAN connectivity, enabling real-time asset tracking, location monitoring, and sensor data visualization on the platform.

## Requirements

A LoRaWAN server is required to communicate the Digital Matter Yabby Edge into Thinger.io, some options are:

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

Digital Matter resources can be found at:

- [Product Page](https://www.digitalmatter.com/devices/yabby-edge-lorawan/)
- [Datasheet](https://www.digitalmatter.com/hubfs/Datasheets%20for%20Website/Yabby%20Edge%20Lorawan%20Datasheet%20-%20Digital%20Matter.pdf)
- [Thinger docs](https://docs.thinger.io)