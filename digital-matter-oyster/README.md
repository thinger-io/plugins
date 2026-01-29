# Oyster - Asset Tracking

The Digital Matter Oyster is an ultra-rugged and long-life battery-powered GPS tracking device for asset tracking and management on LoRaWAN® networks that is packed with a GPS+GLONASS sensor and a 3-axis accelerometer. The IP67 rated housing ensures the device can withstand fine dust, high-pressure spray, submersion for 30 minutes in 1m of water, and extreme temperatures.

## Features

- **Long Battery Life**: Powered by 3 x AA user-replaceable batteries with 10+ years battery life potential
- **High-Precision Location Tracking**: GNSS (GPS+GLONASS) for highly accurate outdoor positioning
- **Ultra-Rugged Design**: IP67/IP68 waterproof and IK07 impact-resistant housing
- **Motion Detection**: Built-in 3-axis accelerometer for movement-based tracking and alerts
- **Wide Regional Support**: Compatible with all 868 MHz and 902-928 MHz LoRaWAN regions in a single SKU
- **Intelligent Power Management**: Optimized battery consumption with configurable update intervals
- **Highly Configurable**: Flexible tracking parameters to balance battery life and location update frequency
- **White-Label Ready**: Easy integration into custom tracking solutions

## Use Cases

- **Logistics**: Track shipping containers, pallets, and cargo across supply chains
- **Equipment Monitoring**: Monitor location and movement of construction equipment and machinery
- **Bins & Containers**: Track waste bins, storage containers, and mobile assets
- **Medical Equipment**: Monitor high-value medical devices and equipment across facilities
- **Agriculture**: Track farm equipment, livestock trailers, and mobile agricultural assets
- **General Asset Management**: Monitor any valuable asset requiring long-term outdoor tracking

## Technical Specifications

- **Connectivity**: LoRaWAN® (868 MHz, 902-928 MHz regions)
- **Location Technology**: GNSS (GPS+GLONASS)
- **Motion Sensor**: 3-axis accelerometer
- **Power Supply**: 3 x AA batteries (user-replaceable)
- **Battery Life**: 
  - 10+ years (1 daily location update)
  - 2+ years (1 hourly location update)
  - 2.5+ years (movement-based tracking)
- **Housing**: IP67 waterproof, IK07 impact-resistant
- **Operating Temperature**: Extreme temperature resistant

## Thinger.io Integration

The Digital Matter Oyster integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling centralized asset tracking, real-time location monitoring, and intelligent fleet management capabilities.

## Requirements

A LoRaWAN server is required to communicate the Digital Matter Oyster into Thinger.io, some options are:

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

- [Digital Matter Official Website](https://www.digitalmatter.com)
- [Oyster3 LoRaWAN Datasheet](https://www.digitalmatter.com/hubfs/Datasheets%20for%20Website/Oyster3%20Lorawan%20Datasheet%20-%20Digital%20Matter.pdf)
- [Thinger.io Documentation](https://docs.thinger.io)