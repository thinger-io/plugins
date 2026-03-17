# LSNPK01 - Soil NPK Sensor

The Dragino LSNPK01 is a LoRaWAN Soil NPK Sensor designed for precision agriculture and environmental monitoring. It detects soil Nitrogen, Phosphorus, and Potassium using TDR (Time Domain Reflectometry) method and transmits data wirelessly to LoRaWAN IoT servers. The sensor features an IP68 waterproof probe that can be buried into soil for long-term use and an IP66 waterproof enclosure for the electronics. Powered by an 8500mAh Li-SOCI2 battery, the LSNPK01 is designed for autonomous operation up to 5 years with ultra-low power consumption.

## Features

- **LoRaWAN v1.0.3 Class A** protocol support
- **Soil Nutrient Monitoring**: Measures Nitrogen, Phosphorus, and Potassium levels
- **TDR Technology**: Time Domain Reflectometry method for accurate measurements
- **Long Range Connectivity**: LoRa wireless technology for extended coverage
- **Ultra-Low Power Consumption**: Optimized for battery-powered deployment
- **Long Battery Life**: 8500mAh Li-SOCI2 battery supports up to 5 years operation
- **IP68 Sensor Probe**: Waterproof probe suitable for burial in soil
- **IP66 Enclosure**: Weather-resistant housing for electronics
- **Battery Monitoring**: Reports battery level status
- **AT Commands**: Configurable parameters via AT commands
- **Downlink Support**: Remote configuration capabilities
- **Multi-Region Support**: Available for CN470/EU433/KR920/US915/EU868/AS923/AU915/IN865 frequency bands

## Applications

- Smart Agriculture
- Precision Farming
- Smart Cities
- Smart Buildings & Home Automation
- Logistics and Supply Chain Management
- Smart Metering
- Smart Factory
- Environmental Monitoring

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the Dragino LSNPK01 into Thinger.io, some options are:

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

Dragino resources can be found at:

- [Datasheet](https://www.dragino.com/downloads/downloads/LoRa_End_Node/LSNPK01/Datasheet_LSNPK01-LoRaWAN%20Soil%20NPK.pdf)
- [User Manual](https://www.dragino.com/downloads/downloads/LoRa_End_Node/LSNPK01/LoRaWAN_Soil_NPK_Sensor_UserManual_v1.0.pdf)
- [Dragino Downloads](https://www.dragino.com/downloads/index.php?dir=LoRa_End_Node/LSNPK01/)
- [Thinger docs](https://docs.thinger.io)