# WILSEN.sonic.level

The WILSEN.sonic.level is a wireless ultrasonic sensor manufactured by Pepperl+Fuchs, designed to remotely monitor fill levels in containers, tanks, silos, and other industrial applications. This LoRaWAN-enabled device provides reliable distance and level measurements with a long battery life, making it ideal for remote monitoring applications.

## Key Features

- **Ultrasonic measurement technology** for accurate distance and level detection
- **Multiple sensing ranges**: 2.5 m, 4 m, or 7 m depending on model variant
- **High resolution**: 1 mm measurement precision
- **Dead band**: 0 to 500 mm
- **Configurable measurement interval**: from 10 minutes to 24 hours
- **Long battery life**: approximately 10 years under typical operating conditions
- **High capacity battery**: 3.6V, 13000 mAh lithium battery
- **LoRaWAN connectivity** for long-range wireless communication
- **Rugged design**: IP67 enclosure rating
- **Wide operating temperature range**: -25°C to 70°C
- **Compact dimensions**: 81 x 182 x 71 mm
- **Integrated sensors**: proximity, distance, GPS, temperature, and battery monitoring

## Typical Applications

- Fill level monitoring in tanks and silos
- Distance measurement in industrial environments
- Level monitoring in rivers and water bodies
- Container and bin monitoring
- Remote asset monitoring

## Thinger.io Integration

The WILSEN.sonic.level integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time data visualization, monitoring, and management of ultrasonic sensor data.

## Requirements

A LoRaWAN server is required to communicate the WILSEN.sonic.level into Thinger.io, some options are:

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

Pepperl+Fuchs resources can be found at:

- [Product Information](https://www.pepperl-fuchs.com/en/products/industrial-sensors/wireless-sensors/wireless-ultrasonic-sensors-gp65414)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/pepperl-fuchs/wilsen-sonic-level/)
- [Thinger docs](https://docs.thinger.io)