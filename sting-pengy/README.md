# Pengy

The Pengy is a LoRaWAN environmental monitoring device designed for measuring air quality parameters. It monitors air temperature and relative humidity, atmospheric pressure, environmental noise levels, and particulate matter mass concentration (PM2.5 and PM10), providing comprehensive air quality data for indoor and outdoor applications.

## Features

- **Particulate Matter Monitoring**: Measures PM1.0, PM2.5, and PM10 concentrations
- **Environmental Sensors**: Air temperature and relative humidity measurement
- **Atmospheric Pressure**: Barometric pressure sensing
- **Noise Monitoring**: Environmental sound level detection
- **LoRaWAN Connectivity**: Long-range wireless communication
- **Compact Design**: Dimensions of 85 x 85 x 95 mm

## Use Cases

- Urban air quality monitoring
- Smart city environmental networks
- Industrial emission tracking
- Indoor air quality assessment
- Public health and safety monitoring
- Environmental research and compliance

## Thinger.io Integration

The Pengy integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling centralized data collection, visualization, and analysis of air quality metrics.

## Requirements

A LoRaWAN server is required to communicate the Pengy into Thinger.io, some options are:

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
This product also provides a predefined dashboard for monitoring air quality parameters including particulate matter concentrations, temperature, humidity, pressure, and noise levels.

## Additional Resources

- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/sting/pengy/)
- [Thinger.io Documentation](https://docs.thinger.io)