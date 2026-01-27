# Comfort Sensor

The Adeunis COMFORT is a LoRaWAN IoT sensor designed for monitoring Indoor Air Quality in smart buildings. It measures room temperature and humidity, enabling optimization of ambient comfort and energy savings. The sensor is a 4-in-1 product featuring temperature, humidity, an alarm button, and a dry contact input, with over 15 years of battery autonomy depending on configuration.

## Features

- **Temperature Measurement**: Range -20°C to +50°C with ±0.3°C accuracy (5°C to 50°C range)
- **Humidity Measurement**: Range 0% to 100% RH with ±2% RH accuracy (20% to 80% RH range)
- **Resolution**: 0.1°C and 0.1% RH
- **Alarm Button**: Integrated button for event detection and alert triggering
- **Dry Contact Input**: Digital input to detect state changes
- **Data Transmission**: Periodic and/or event-triggered modes
- **Threshold Alerts**: Configurable high and low threshold monitoring with alarm repetition
- **Configuration**: Local via USB-C or NFC, remote via LoRaWAN downlinks
- **Battery Life**: Over 15 years (SF7, 1 transmission per hour)

## Specifications

| Parameter | Value |
|-----------|-------|
| Dimensions | 111 x 61 x 40 mm |
| Weight | 102g |
| Protection Rating | IP20 (Indoor use) |
| Operating Temperature | -20°C to +60°C |
| Frequency Band | EU863-870 MHz |
| LoRaWAN Class | Class A (OTAA) |
| Transmit Power | +14 dBm |
| Maximum Range | 15 km |

## Use Cases

- Smart building climate monitoring
- Office and commercial building HVAC optimization
- Social and collective housing energy management
- School and university indoor environment monitoring
- Hospital and healthcare facility comfort control
- Hotel room climate management
- Industrial facility environmental monitoring
- Mold prevention through humidity tracking

## Thinger.io Integration

### Requirements

A LoRaWAN server is required to communicate the Comfort Sensor with Thinger.io. Supported options include:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

The corresponding plugin for the selected LoRaWAN server must be installed in your Thinger.io instance.

### Get Started

#### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed, a new Product will be created for this device.

#### Configuration

The Product is already preconfigured. Verify that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or modify it as needed.

#### Usage

Start sending uplinks for automatic provisioning of devices and buckets.

This product also provides a predefined dashboard and downlink capabilities.

## Additional Resources

- [Adeunis COMFORT Product Page](https://www.adeunis.com/en/produit/comfort-temperature-humidity-2-2/)
- [ZENNER IoT Shop - Comfort Sensor](https://iot.zenner.shop/en/LoRa-Room-sensor-T-H-Comfort-ARF8275A/171258)
- [Thinger.io Documentation](https://docs.thinger.io)