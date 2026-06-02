# Atm'O - Temperature/Humidity/Atmospheric Pressure

The WATTECO Atm'O sensor measures temperature, relative humidity and atmospheric pressure in outdoor and industrial environments and transmits the data via a public or private LoRaWAN® radio network. Designed for demanding environments, this sensor provides accurate environmental monitoring for agriculture, railway infrastructure, road maintenance, and industrial applications.

## Features

- **Temperature measurement:** -20°C to +55°C with ±0.1°C accuracy
- **Relative humidity measurement:** 0% to 100% rH with ±1.5% rH accuracy
- **Atmospheric pressure measurement:** 90 kPa to 115 kPa with ±1.5% accuracy
- **Battery life:** 5 years minimum with real-time configuration
- **Operating range:** -20°C to +55°C
- **LoRaWAN connectivity:** Compatible with public and private LoRaWAN networks
- **IP68 waterproof housing:** Suitable for outdoor and industrial environments

## Use Cases

- **Agriculture:** Supervision of greenhouses and vineyards
- **Railway infrastructure:** Ice detection alerts on catenaries
- **Road maintenance:** Local weather information, prevention and optimization of road salting in winter
- **Industrial environments:** Air heater regulation and climate monitoring
- **Building management:** Improving living conditions through environmental monitoring

## Thinger.io Integration

The WATTECO Atm'O integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time monitoring of temperature, humidity, and atmospheric pressure data.

## Requirements

A LoRaWAN server is required to communicate the WATTECO Atm'O into Thinger.io, some options are:

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

WATTECO resources can be found at:

- [Product Page](https://www.watteco.com/product/atmo-sensor-lorawan)
- [Thinger docs](https://docs.thinger.io)