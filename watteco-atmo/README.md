# Atm'O - Temperature/Humidity/Atmospheric Pressure

The WATTECO Atm'O has sensors for measuring temperature, relative humidity, and atmospheric pressure in outdoors and industrial environments, and transmits the data over a public or private LoRaWAN® radio network.

## Features

- **LoRaWAN Class A** connectivity for long-range wireless communication
- **Triple sensor configuration** for comprehensive environmental monitoring:
  - Temperature measurement: -20°C to +55°C (±0.1°C accuracy)
  - Relative humidity: 0% to 100% RH (±1.5% accuracy)
  - Atmospheric pressure: 90 kPa to 115 kPa (±1.5% accuracy)
- **Extended battery life**: minimum 5 years with real-time configuration
- **Rugged outdoor design**: IP68 enclosure for harsh environments
- **Tropicalized measuring board** for enhanced reliability
- **Vertical antenna** for optimized signal transmission
- **Magnetic activation** for device control and configuration
- **Power supply monitoring** with battery voltage reporting
- **Operating temperature range**: -20°C to +55°C

## Use Cases

- **Agriculture**: supervision of greenhouses and vineyards
- **Railway infrastructure**: ice detection alerts on catenaries
- **Road management**: local weather monitoring, winter road salting optimization
- **Industrial environments**: air heater regulation and climate control
- **Environmental monitoring**: outdoor weather stations and climate analysis

## Thinger.io Integration

The Atm'O sensor integrates with Thinger.io through LoRaWAN network servers, enabling centralized data collection, visualization, and analysis of environmental parameters.

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

Start sending uplinks for autoprovisioning devices and buckets. The Atm'O reports batches of temperature, humidity, and pressure measurements at configurable intervals (default: every 15 minutes).

To activate the device, place a magnet on the side of the sensor for one second (at the left side of the cable gland). The integrated buzzer provides feedback for user interactions and device status.

This product also provides a predefined dashboard and downlinks.

## Additional Resources

WATTECO resources can be found at:

- [Official Support Documentation](https://support.watteco.com/atmo)
- [Product Datasheet](https://market.thingpark.com/media/datasheet/w/a/watteco_ds_50-70-099_atmo_v2.3.pdf)
- [Thinger.io Documentation](https://docs.thinger.io)