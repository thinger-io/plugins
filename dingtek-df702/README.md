# DF702 - Waste Bin Level Sensor

The CNDingtek DF702 is a waste bin sensor that consists of a level sensor, fire sensor, and accelerometer. The measured data is reported to a LoRaWAN® network that notifies garbage collecting authorities to collect and empty the bins. The device monitors bin status remotely, including overflow, tipping, and fire detection, providing comprehensive waste management monitoring capabilities.

## Features

- **Multi-Sensor System**: Ultrasonic level sensor, fire detection, temperature monitoring, and accelerometer
- **GPS Positioning**: Location tracking capability
- **LoRaWAN Connectivity**: Supports EU868, US915, AU915, AS923, CN470, and KR920 frequency bands
- **Long Battery Life**: ER18505M non-rechargeable Lithium Battery 7000mAh @ 3.6V
- **Rugged Design**: IP66 protection level for outdoor deployment
- **Wide Operating Range**: -20°C to +70°C operating temperature
- **Compact Form Factor**: 115mm x 115mm x 50mm dimensions

## Use Cases

- Smart waste management and collection optimization
- Bin overflow prevention and monitoring
- Fire hazard detection in waste containers
- Bin tampering and tipping detection
- Route optimization for waste collection vehicles
- Remote monitoring of waste bin fill levels

## Thinger.io Integration

The DF702 seamlessly integrates with Thinger.io through LoRaWAN network servers, enabling real-time monitoring, data analytics, and automated alerts for waste management operations.

## Requirements

A LoRaWAN server is required to communicate the CNDingtek DF702 into Thinger.io, some options are:

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

## Technical Specifications

- **Power Supply**: Internal ER18505M Lithium Battery 7000mAh @ 3.6V
- **Current Consumption**: <210mA @ 3.6V (uploading), <100mA @ 3.6V (normal operation)
- **Operating Temperature**: -20°C to +70°C
- **Storage Temperature**: -40°C to +85°C
- **Protection Rating**: IP66
- **Dimensions**: 115mm (diameter) x 50mm (height)
- **Sensors**: Ultrasonic level, temperature, GPS, accelerometer, fire detection
- **LoRaWAN Frequency Support**: EU868, US915, AU915, AS923, CN470, KR920

## Additional Resources

CNDingtek resources can be found at:

- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/dingtek/df702)
- [Datasheet](https://fcc.report/FCC-ID/2ATFKDF702-730/4350903.pdf)
- [Thinger docs](https://docs.thinger.io)