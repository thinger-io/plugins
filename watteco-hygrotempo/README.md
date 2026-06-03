# Hygro Temp'O - Indoor Temperature/Humidity

The WATECO Hygro Temp'O is a compact LoRaWAN® temperature and humidity sensor designed for indoor air monitoring applications. It measures ambient temperature and humidity in buildings, apartments, and houses, transmitting data over public or private LoRaWAN® networks for smart building management and environmental monitoring.

## Features

- **Temperature Monitoring**: Accurate indoor temperature measurement
- **Humidity Sensing**: Real-time relative humidity tracking
- **LoRaWAN® Connectivity**: Class A device for low-power, long-range communication
- **Compact Design**: 74 x 74 x 25 mm housing with IP30 enclosure
- **Battery Powered**: Operates on disposable 3.6V AA-type battery
- **Operating Range**: 0°C to 55°C

## Use Cases

- Indoor air quality monitoring in residential buildings
- Smart building climate control
- Environmental monitoring in apartments and houses
- HVAC system optimization
- Occupancy and comfort management

## Thinger.io Integration

The Hygro Temp'O integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time monitoring, data visualization, and analysis of temperature and humidity conditions.

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
This product also provides a predefined dashboard for monitoring temperature and humidity data.

## Additional Resources

WATECO resources can be found at:

- [WATECO Support](https://support.watteco.com/hygrotempo)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/watteco/hygrotempo)
- [Thinger.io Documentation](https://docs.thinger.io)