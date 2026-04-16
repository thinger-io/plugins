# Radar Distance/Level Sensor - EM410-RDL

The EM410-RDL is a non-contact Radar Distance/Level Sensor that adopts Millimeter Wave Radar technology. By measuring millimeter-wave signals at higher frequencies, it provides more stable performance over longer distances, and is less affected by environmental conditions. The device features an 8° radar beam angle that can be focused on target fluids, enabling accurate measurement of liquid levels without invasive installation.

## Features

- **Millimeter Wave Radar Technology**: Operates at 60GHz frequency for precise measurements
- **Wide Measuring Range**: 0.3m to 12m detection distance with small blind zone
- **High Accuracy**: Up to ±2mm accuracy with 1mm resolution
- **Non-invasive Monitoring**: Can detect hazardous or non-hazardous liquids without contact
- **Environmental Resistance**: Not affected by dust, condensate, temperature, or acoustic noise
- **Built-in 3-Axis Accelerometer**: Monitors device tilt status for optimal positioning
- **Dual Antenna Options**: Available with internal or external antenna versions for various applications
- **Radar-Echo Curve Analysis**: Supports one-click diagnostic to calibrate distance for accurate measurement
- **PVDF Material Construction**: Excellent corrosion resistance, wear resistance, and compressive strength for harsh environments
- **IP68 Waterproof**: Resistant in fresh water to maximum depth of 1m for up to 48 hours
- **Thread Design**: Easy tank installation without extra accessories
- **Local Data Storage**: Stores historical records locally with retransmission support to prevent data loss
- **Easy Configuration**: Via NFC and Bluetooth connectivity
- **OTA Updates**: Remote firmware upgrade capability via Milesight Development Platform

## Technical Specifications

### Measurement
- **Technology**: Millimeter Wave Radar
- **Radar Frequency**: 60GHz
- **Detection Angle**: 8°
- **Detection Distance**: 0.3m ~ 12m
- **Accuracy**: Up to ±2mm
- **Resolution**: 1mm
- **Target**: Liquids or smooth surface solids

### LoRaWAN Connectivity
- **Frequency Bands**: CN470/IN865/EU868/RU864/US915/AU915/KR920/AS923-1&2&3&4
- **Tx Power**: 16 dBm (868 MHz) / 20 dBm (915 MHz) / 19 dBm (470 MHz)
- **Sensitivity**: -137 dBm @ 300bps
- **Mode**: OTAA/ABP
- **Class**: Class A
- **Antenna**: Internal or external antenna options (50 Ω SMB Male Connector for external)

### Sensors
- Distance/Level
- Battery
- Temperature
- 3-axis Accelerometer (tilt detection)

### Physical Characteristics
- **Dimensions**: 87 x 87 x 101 mm
- **Enclosure Rating**: IP68
- **Operating Temperature**: -40°C to 70°C

## Use Cases

- Liquid level monitoring in industrial tanks
- Water level measurement in reservoirs and wells
- Chemical storage tank monitoring
- Wastewater treatment facilities
- Agricultural irrigation systems
- Fuel tank level monitoring
- Hazardous liquid detection and monitoring

## Thinger.io Integration

The EM410-RDL integrates seamlessly with Thinger.io through LoRaWAN connectivity, enabling remote monitoring and management of distance and level measurements.

## Requirements

A LoRaWAN server is required to communicate the EM410-RDL into Thinger.io, some options are:

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

- [Documentation](https://resource.milesight.com/milesight/iot/document/em410-rdl-datasheet-en.pdf)
- [Thinger docs](https://docs.thinger.io)