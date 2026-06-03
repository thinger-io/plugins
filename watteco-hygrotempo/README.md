# Hygro Temp'O - Indoor Temperature/Humidity

The WATECO Hygro Temp'O is a compact LoRaWAN® sensor designed for indoor air monitoring applications. It measures ambient temperature and relative humidity in buildings, apartments, and houses, transmitting data over public or private LoRaWAN® networks.

## Features

- **Temperature Monitoring**: Measures ambient temperature from 0°C to 55°C
- **Humidity Sensing**: Tracks relative humidity levels
- **LoRaWAN® Connectivity**: Operates on public or private LoRaWAN® networks
- **Compact Design**: 74 x 74 x 25 mm dimensions
- **Indoor Rating**: IP30 enclosure for indoor applications
- **Long Battery Life**: Optimized for extended operation

## Use Cases

- Smart building monitoring
- HVAC system optimization
- Energy efficiency projects
- Indoor air quality management
- Residential comfort monitoring
- Commercial facility management

## Thinger.io Integration

The Hygro Temp'O integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time monitoring and data visualization of temperature and humidity measurements.

## Requirements

A LoRaWAN server is required to communicate the WATECO Hygro Temp'O into Thinger.io, some options are:

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

## Specifications

| Parameter | Value |
|-----------|-------|
| Sensors | Temperature, Humidity |
| Temperature Range | 0°C to 55°C |
| Enclosure | IP30 |
| Dimensions | 74 x 74 x 25 mm |
| Connectivity | LoRaWAN® |

## Additional Resources

WATECO resources can be found at:

- [WATECO Official Website](https://www.watteco.com)
- [Product Datasheet](https://www.m2mgermany.de/shop/media/webshop_dl/NKE%20Watteco/8982_WATTECO_DS_50-70-205_232_HYGROTEMPO_v0.6-1.pdf)
- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/watteco/hygrotempo)
- [Thinger.io Documentation](https://docs.thinger.io)