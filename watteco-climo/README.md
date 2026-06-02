# Clim'O - Indoor Temperature/Humidity

The WATECO Clim'O sensor measures indoor ambient temperature and humidity in buildings, apartments, and houses. It transmits data over a public or private LoRaWAN® network. This LoRaWAN Class A device provides accurate environmental monitoring with measurement precision of ±0.2°C and ±2% RH, making it ideal for applications in smart buildings and energy efficiency management.

## Features

- **Temperature Monitoring**: Measurement range from 0°C to 55°C with ±0.2°C accuracy
- **Humidity Monitoring**: Relative humidity measurement with ±2% RH accuracy
- **LoRaWAN Connectivity**: Class A device compatible with public and private LoRaWAN networks
- **Compact Design**: 80 x 80 x 25 mm dimensions with IP30 enclosure
- **Battery Powered**: 3.6V AA-type disposable battery
- **Indoor Use**: Operating temperature range of 0°C to 55°C

## Use Cases

- Smart building environmental monitoring
- Energy efficiency management
- HVAC system optimization
- Indoor air quality assessment
- Residential comfort monitoring
- Office and workspace climate control

## Thinger.io Integration

The Clim'O sensor integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time monitoring and data visualization of temperature and humidity measurements.

## Requirements

A LoRaWAN server is required to communicate the WATECO Clim'O into Thinger.io, some options are:

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
This product also provides a predefined dashboard for visualizing temperature and humidity data.

## Additional Resources

WATECO resources can be found at:

- [WATECO Support Documentation](https://support.watteco.com/indoor_th)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/watteco/climo)
- [Thinger.io Documentation](https://docs.thinger.io)