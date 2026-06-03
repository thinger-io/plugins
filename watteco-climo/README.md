# Clim'O - Indoor Temperature/Humidity

The WATECO Clim'O sensor measures indoor ambient temperature and humidity in buildings, apartments, and houses. It transmits data over a public or private LoRaWAN® network. This LoRaWAN Class A sensor is designed for precise monitoring of environmental conditions with a measurement accuracy of ±0.2 °C and ±2% RH, making it ideal for smart buildings, energy efficiency projects, and HVAC systems.

## Features

- **Temperature Monitoring**: Measures ambient temperature with ±0.2°C accuracy
- **Humidity Monitoring**: Measures relative humidity with ±2% RH accuracy
- **Operating Range**: 0°C to 55°C
- **Battery Life**: Up to 10 years on disposable 3.6V AA-type battery
- **LoRaWAN Class A**: Compatible with public and private LoRaWAN networks
- **Data Compression**: Efficient reporting with batch data transmission
- **Compact Design**: 80 x 80 x 25 mm, IP30 enclosure
- **Easy Installation**: Simple deployment for indoor environments

## Use Cases

- Smart building monitoring
- Energy efficiency optimization
- HVAC system control and monitoring
- Indoor climate management
- Residential and commercial building monitoring
- Data center environmental monitoring

## Thinger.io Integration

The Clim'O sensor integrates with Thinger.io through LoRaWAN network servers, enabling real-time monitoring and data visualization of temperature and humidity measurements.

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

Start sending uplinks for autoprovisioning devices and buckets. This product also provides a predefined dashboard for monitoring temperature and humidity data.

## Additional Resources

WATECO resources can be found at:

- [WATECO Support Documentation](https://support.watteco.com/indoor_th)
- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/watteco/climo)
- [Thinger docs](https://docs.thinger.io)