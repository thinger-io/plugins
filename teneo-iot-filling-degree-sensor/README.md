# Filling Degree Sensor

The Teneo IoT Filling Degree Sensor is a LoRaWAN® waste bin management solution that combines a fillgrade laser sensor that measures the distance to the waste and a GPS receiver to obtain the location of the waste bin. The distance data (from the sensor to the top of the waste) will be sent to the LoRaWAN® network and an online dashboard can be used to display the location of the waste bins.

## Features

- **Distance Measurement**: Laser sensor for accurate fill level detection
- **GPS Location Tracking**: Integrated GPS receiver for waste bin positioning
- **Environmental Sensors**: Temperature and humidity monitoring
- **Compact Design**: 82 x 55 x 32 mm dimensions
- **IP30 Enclosure**: Protected against solid objects greater than 2.5 mm
- **Operating Temperature**: -20°C to 55°C
- **LoRaWAN® Connectivity**: Long-range wireless communication with low power consumption

## Use Cases

- Smart waste management in cities and municipalities
- Container fill level monitoring for waste collection optimization
- Bin location tracking for fleet management
- Predictive waste collection routing
- Landfill and recycling facility monitoring

## Thinger.io Integration

This device integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time monitoring of fill levels, GPS location data, and environmental conditions.

## Requirements

A LoRaWAN server is required to communicate the Teneo IoT Filling Degree Sensor into Thinger.io, some options are:

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
This product also provides a predefined dashboard for monitoring fill levels and GPS locations.

## Additional Resources

Teneo IoT resources can be found at:

- [Teneo IoT Website](https://teneo-iot.com/)
- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/teneo-iot/filling-degree-sensor/)
- [Thinger.io Documentation](https://docs.thinger.io)