# Air Quality Monitor

The IoTsens Air Quality Monitor is a device that consists of a set of environmental sensors for CO, SO2, NO2, O3, NO, H2S, CO2, PM2.5, PM10, temperature, and humidity detection and measurement. The use of this device is recommended for the evaluation of air conditions, being able to monitor the levels of contamination to make the appropriate decisions.

## Features

- Multi-gas detection: CO, SO2, NO2, O3, NO, H2S, CO2
- Particulate matter monitoring: PM1, PM2.5, PM10
- TVOC (Total Volatile Organic Compounds) measurement
- Temperature and humidity sensors
- Multiple connectivity options: LoRaWAN, WiFi, Ethernet, NarrowBand IoT
- Compact design: 200x120x60 mm, 400g
- Barometric pressure monitoring

## Use Cases

- Urban air quality monitoring
- Smart city environmental control
- Industrial emission monitoring
- Indoor air quality assessment
- Pollution level tracking
- Public health and safety applications
- Environmental compliance verification

## Thinger.io Integration

The IoTsens Air Quality Monitor integrates with Thinger.io through LoRaWAN connectivity, enabling real-time monitoring and visualization of air quality parameters.

## Requirements

A LoRaWAN server is required to communicate the IoTsens Air Quality Monitor into Thinger.io, some options are:

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

IoTsens resources can be found at:

- [IoTsens Official Website](https://www.iotsens.com)
- [Device Datasheet](https://www.iotsens.com/wp-content/datasheets/Calidad_del_Aire_IOTSENS_EN.pdf)
- [Thinger.io Documentation](https://docs.thinger.io)