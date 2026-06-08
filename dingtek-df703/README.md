# DF703 - Ultrasonic Waste Bin Level Sensor

The CNDingtek DF703 is an ultrasonic level waste bin sensor that consists of a level sensor, fire sensor, and accelerometer. The measured data is reported to a LoRaWAN® network that notifies garbage collecting authorities to collect and empty the bins. This smart sensor provides comprehensive bin condition monitoring including fill-level detection, flame risk detection, and tilt/fall status reporting in a single compact device.

## Features

- **Ultrasonic Level Detection**: Monitors waste bin fill level (full/empty status)
- **Fire Detection**: Built-in fire sensor for flame risk monitoring
- **Tilt/Motion Detection**: Integrated accelerometer for tilt and fall status reporting
- **LoRaWAN Connectivity**: Class A device with OTAA activation, MAC 1.03
- **Long Battery Life**: Non-rechargeable Lithium Thionyl Chloride Battery (ER26500, 8500mAh @ 3.6V) providing more than 5 years of operation with 4 daily uploads
- **Optional GPS**: Position tracking for bin location management
- **Optional Bluetooth**: Configuration and maintenance support
- **Rugged Design**: IP68 protection level for outdoor deployment
- **Wide Operating Temperature**: -30°C to 85°C

## Technical Specifications

- **Dimensions**: 115 x 115 x 40 mm (diameter: 115 mm)
- **Weight**: 150g
- **Sensors**: Level, GPS (optional), motion, temperature, fire
- **Temperature Range**: -30°C to 85°C
- **Protection Level**: IP68
- **Battery**: ER26500 Lithium Thionyl Chloride, 8500mAh @ 3.6V
- **Battery Life**: More than 5 years (4 uploads/day, 10min cycle detection time, without GPS)
- **LoRaWAN Class**: Class A
- **Activation**: OTAA
- **MAC Version**: 1.03

## Use Cases

- Smart waste management systems
- Municipal garbage collection optimization
- Commercial waste bin monitoring
- Industrial waste container management
- Collection route planning and optimization
- Fire risk monitoring in waste containers

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the CNDingtek DF703 into Thinger.io, some options are:

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

CNDingtek resources can be found at:

- [Official Product Page](https://www.dingtek.com/waste-bin-sensor-df703)
- [Device Repository for LoRaWAN](https://www.thethingsnetwork.org/device-repository/devices/dingtek/df703)
- [Thinger docs](https://docs.thinger.io)