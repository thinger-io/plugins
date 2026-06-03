# Hygro Temp'O remote - Indoor remote Temperature/Humidity

The WATECO Hygro Temp'o remote measures temperature and humidity with a remote probe (IP68/IP67). It transmits data over a public or private LoRaWAN® network. This compact LoRaWAN Class A sensor is designed for indoor air monitoring applications, providing reliable environmental data transmission with a disposable 3.6V AA-type battery.

## Features

- **Remote Probe**: SHT30F temperature and humidity sensor with IP67 rating
- **LoRaWAN Class A**: Compatible with public and private LoRaWAN networks
- **Compact Design**: Dimensions of 92 x 92 x 56 mm with IP67 enclosure
- **Operating Temperature**: 0°C to 55°C
- **Battery Powered**: 3.6V AA-type disposable battery
- **Data Reporting**: Configurable batch transmission (default: measures every 10 minutes, reports hourly)
- **Tilt Detection**: Built-in pull-out alert function based on vertical angle deviation
- **Easy Installation**: Wall-mountable with simple setup

## Use Cases

- Indoor air quality monitoring
- Building management systems
- HVAC optimization
- Smart building applications
- Environmental compliance monitoring
- Climate control in storage facilities

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the WATECO Hygro Temp'O remote into Thinger.io, some options are:

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

WATECO resources can be found at:

- [WATECO Official Website](https://www.watteco.com/product/hygrotempo)
- [WATECO Support](https://support.watteco.com/hygrotempo)
- [Thinger docs](https://docs.thinger.io)