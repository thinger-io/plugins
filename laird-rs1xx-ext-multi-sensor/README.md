# Sentrius RS1xx Multi Sensor

The Laird Sentrius RS1xx Multi Sensor is a battery-powered, long-range sensor platform leveraging the benefits of LoRaWAN® and Bluetooth Low Energy (BLE) connectivity. Its small, rugged form factor contains superior RF performance and multiple sensor capabilities including Open/Closed detection alongside temperature and humidity sensors, making it a perfect fit for cold chain applications.

## Features

- **Dual Connectivity**: LoRaWAN and Bluetooth Low Energy (BLE) for flexible deployment options
- **Multi-Sensor Platform**: Integrated temperature, humidity, and proximity sensors
- **Rugged Design**: IP65-rated enclosure for harsh environments
- **Long Range**: LoRaWAN connectivity for extended coverage
- **Battery Powered**: Wireless operation for flexible installation
- **Compact Form Factor**: 116 x 91 x 34 mm dimensions
- **Wide Operating Temperature**: -25°C to 50°C
- **Integrated Antennas**: Built-in antennas for both LoRa and BLE
- **Comprehensive Security**: Multi-layer security at each interface
- **Mobile Configuration**: Companion mobile application for device setup and monitoring

## Use Cases

- Cold chain management and food safety
- Agricultural humidity and environmental monitoring
- Industrial heating and cooling
- Asset tracking and proximity detection
- Environmental monitoring in harsh conditions

## Thinger.io Integration

The Sentrius RS1xx Multi Sensor integrates seamlessly with Thinger.io through LoRaWAN connectivity, enabling real-time monitoring and data visualization of temperature, humidity, and proximity events.

## Requirements

A LoRaWAN server is required to communicate the Sentrius RS1xx Multi Sensor into Thinger.io, some options are:

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

Start sending uplinks for autoprovisioning devices and buckets. The device will report temperature, humidity, and proximity data according to the configured read period and aggregate settings.

This product also provides a predefined dashboard and downlinks.

## Additional Resources

Laird Connectivity resources can be found at:

- [Laird Connectivity LoRaWAN Solutions](https://connectivity.lairdtech.com/wireless-modules/lorawan-solutions)
- [Thinger docs](https://docs.thinger.io)