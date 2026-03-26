# Milesight AM307L - LoRaWAN Indoor Air Quality Sensor (7 in 1)

The Milesight AM307L is a LoRaWAN indoor ambience monitoring sensor that collects various indoor environmental conditions through 7 built-in sensors and delivers the data to mobile applications and its 4.2-inch E-ink screen. It supports batteries or DC power supply and can be easily configured via NFC. The device features a tri-color LED indicator, anti-theft design, and emoticon indication for quick status visualization. The AM307L is widely used for offices, stores, classrooms, hospitals, and other indoor environments requiring comprehensive air quality monitoring.

## Features

- **7-in-1 Multi-Sensor Platform**: Temperature, Humidity, Light, Motion (PIR), CO2, Barometric Pressure, and TVOC monitoring
- **LoRaWAN Connectivity**: Long-range wireless communication with support for multiple frequency bands (CN470/RU864/IN865/EU868/US915/AU915/KR920/AS923-1&2&3&4)
- **4.2-inch E-Ink Display**: Real-time data visualization with black and white screen
- **Flexible Power Options**: Battery-powered or DC supply via USB Type-C port
- **NFC Configuration**: Simple and quick device setup
- **Tri-Color LED Indicator**: Visual status feedback
- **Class A LoRaWAN**: OTAA/ABP activation modes
- **Anti-Theft Design**: Enhanced security for public installations

## Sensors & Specifications

### Temperature Sensor
- **Technology**: Digital CMOSens® (MEMS)
- **Range**: -20°C to 60°C
- **Accuracy**: ± 0.2°C
- **Resolution**: 0.1°C

### Humidity Sensor
- **Technology**: Digital CMOSens® (MEMS)
- **Range**: 0% to 100% RH
- **Accuracy**: ± 2% RH
- **Resolution**: 0.5% RH

### Motion Sensor
- **Technology**: Passive Infrared (PIR)
- **Detection Range**: 80° Horizontal, 55° Vertical, 5m
- **Status**: Vacant/Occupied

### Light Sensor
- **Technology**: Photodiode
- **Range**: 0-60,000 Lux (6 levels, 0-5)

### TVOC Sensor
- **Technology**: MOX (MEMS)
- **Range**: 1.00 to 5.00 (IAQ Rating)
- **Accuracy**: ± 1
- **Resolution**: 0.01

### CO2 Sensor
- **Technology**: Nondispersive Infrared (NDIR)
- **Range**: 400 to 5,000 ppm
- **Accuracy**: ± (30 ppm + 3% of reading) at 0°C to 50°C, 0% to 85% RH
- **Resolution**: 1 ppm

### Barometric Pressure Sensor
- **Technology**: Piezoresistive absolute pressure sensor (MEMS)
- **Range**: 260 to 1,260 hPa
- **Accuracy**: ± 0.5 hPa
- **Resolution**: 0.1 hPa

## LoRaWAN Specifications

- **Frequency Bands**: CN470, RU864, IN865, EU868, US915, AU915, KR920, AS923-1/2/3/4
- **TX Power**: 16 dBm (868 MHz) / 22 dBm (915 MHz) / 19 dBm (470 MHz)
- **Sensitivity**: -137 dBm @ 300 bps
- **Activation**: OTAA/ABP
- **Class**: Class A

## Use Cases

- **Office Buildings**: Monitor air quality for employee comfort and productivity
- **Retail Stores**: Ensure optimal shopping environment
- **Classrooms**: Track CO2 levels and air quality for student health
- **Hospitals**: Maintain safe and comfortable patient environments
- **Meeting Rooms**: Occupancy detection and environmental monitoring
- **Smart Buildings**: Comprehensive environmental data collection

## Thinger.io Integration

The Milesight AM307L integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time monitoring, data storage, and visualization of all sensor parameters.

## Requirements

A LoRaWAN server is required to communicate the Milesight AM307L into Thinger.io, some options are:

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

Start sending uplinks for autoprovisioning devices and buckets. This product also provides a predefined dashboard and downlinks.

## Additional Resources

Milesight resources can be found at:

- [AM300 Series Datasheet](https://resource.milesight.com/milesight/iot/document/am300-series-datasheet-en.pdf)
- [Milesight IoT Official Website](https://www.milesight-iot.com/)
- [Thinger.io Documentation](https://docs.thinger.io)