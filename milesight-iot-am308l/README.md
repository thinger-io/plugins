# Milesight AM308L-LoRaWAN Indoor Air Quality Sensor (7 in 1)

The Milesight AM308L is a comprehensive LoRaWAN indoor air quality monitoring sensor that collects various indoor ambience conditions through 7 built-in sensors. The device delivers data via LoRaWAN and supports both battery and DC power supply. It can be easily configured via NFC and features a tri-color LED indicator, anti-theft design, and is widely used in offices, stores, classrooms, hospitals, and other indoor environments.

## Features

- **Multi-sensor monitoring**: Temperature, humidity, CO2, TVOC, barometric pressure, light, and PIR motion detection
- **LoRaWAN connectivity**: Supports CN470/RU864/IN865/EU868/US915/AU915/KR920/AS923-1&2&3&4 frequency bands
- **Flexible power options**: Battery or USB Type-C DC power supply
- **Easy configuration**: NFC for quick setup and configuration
- **Status indication**: Tri-color LED traffic light indicator and buzzer
- **Compact design**: IP30 enclosure, dimensions 100.8 x 22 x 114 mm
- **LoRaWAN Class A**: OTAA/ABP activation modes

## Sensors Specifications

### Temperature
- **Technology**: Digital CMOSens® (MEMS)
- **Range**: -20°C to 60°C
- **Accuracy**: ± 0.2°C
- **Resolution**: 0.1°C

### Humidity
- **Technology**: Digital CMOSens® (MEMS)
- **Range**: 0% to 100% RH
- **Accuracy**: ± 2% RH
- **Resolution**: 0.5% RH

### Carbon Dioxide (CO2)
- **Technology**: Nondispersive Infrared (NDIR)
- **Range**: 400 to 5000 ppm
- **Accuracy**: ± (30 ppm + 3% of reading) at 0°C to 50°C, 0% to 85% RH
- **Resolution**: 1 ppm

### TVOC (Total Volatile Organic Compounds)
- **Technology**: MOX (MEMS)
- **Range**: 1.00 to 5.00 (IAQ Rating)
- **Accuracy**: ± 1
- **Resolution**: 0.01

### Barometric Pressure
- **Technology**: Piezoresistive absolute pressure sensor (MEMS)
- **Range**: 260 to 1260 hPa
- **Accuracy**: ± 0.5 hPa
- **Resolution**: 0.1 hPa

### Light
- **Technology**: Photodiode
- **Range**: 0 to 60000 Lux (reported as 6 levels, 0-5)

### Motion (PIR)
- **Technology**: Passive Infrared (PIR)
- **Detection Range**: 80° horizontal, 55° vertical, 5m
- **Status**: Vacant/Occupied

## LoRaWAN Specifications

- **Frequency bands**: CN470/RU864/IN865/EU868/US915/AU915/KR920/AS923-1&2&3&4
- **Tx Power**: 16 dBm (868 MHz) / 22 dBm (915 MHz) / 19 dBm (470 MHz)
- **Sensitivity**: -137 dBm @ 300 bps
- **Activation**: OTAA/ABP
- **Class**: Class A

## Thinger.io Integration

The Milesight AM308L seamlessly integrates with Thinger.io through LoRaWAN network servers, enabling real-time monitoring of indoor air quality parameters and automated data collection for analysis and visualization.

## Requirements

A LoRaWAN server is required to communicate the Milesight AM308L into Thinger.io, some options are:

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

## Use Cases

- **Office buildings**: Monitor workspace air quality and occupancy
- **Educational facilities**: Ensure healthy learning environments in classrooms
- **Healthcare facilities**: Track environmental conditions in hospitals and clinics
- **Retail spaces**: Monitor customer comfort and store conditions
- **Smart buildings**: Integrate with building management systems for HVAC optimization

## Additional Resources

Milesight resources can be found at:

- [AM300 Series Datasheet](https://resource.milesight.com/milesight/iot/document/am300-series-datasheet-en.pdf)
- [Milesight IoT Official Website](https://www.milesight-iot.com/)
- [Thinger.io Documentation](https://docs.thinger.io)