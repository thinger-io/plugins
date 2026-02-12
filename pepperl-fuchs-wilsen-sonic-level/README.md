# WILSEN.sonic.level

The WILSEN.sonic.level is a wireless ultrasonic sensor with LoRaWAN interface designed by Pepperl+Fuchs. This device transmits fill-level measurements and GPS location data over LoRaWAN networks, enabling remote monitoring of tank and container levels. The sensor features configurable ultrasonic measurement parameters, including sound beam profiles, resolution settings, and customizable minimum and maximum limits for accurate fill-level determination. The device operates as a LoRa Class A device and includes Bluetooth 5.0 LE connectivity for local configuration and parameterization.

## Features

- Ultrasonic distance/level measurement
- Integrated GPS for location tracking
- LoRaWAN connectivity (Class A)
- Bluetooth 5.0 LE for device configuration
- Configurable measurement parameters (sound beam profiles, resolution, limits)
- Adjustable measurement and transmission frequencies
- Battery-powered operation with status monitoring
- Device temperature monitoring
- Mobile app configuration (WILSEN app)

## Use Cases

- Remote tank and container level monitoring
- Waste management and bin fill-level tracking
- Water level monitoring in reservoirs and wells
- Fuel tank monitoring
- Silo and hopper level measurement
- Asset tracking with GPS positioning
- Smart city infrastructure monitoring

## Thinger.io Integration

The WILSEN.sonic.level integrates with Thinger.io through LoRaWAN network servers, enabling real-time monitoring of ultrasonic measurements, GPS location data, device temperature, and battery status.

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

Configure the device parameters using the WILSEN mobile app via Bluetooth 5.0 LE connection:
- Set ultrasonic measurement parameters (sound beam width, resolution, limits)
- Configure GPS position determination interval
- Adjust LoRaWAN transmission frequency
- Set measurement frequency

### Usage

Start sending uplinks for autoprovisioning devices and buckets.
This product also provides a predefined dashboard for monitoring fill levels, GPS location, device temperature, and battery status.

## Additional Resources

Pepperl+Fuchs WILSEN.sonic.level resources can be found at:

- [Product Documentation](https://files.pepperl-fuchs.com/webcat/navi/productInfo/doct/tdoct6649__eng.pdf)
- [Payload Description](https://files.pepperl-fuchs.com/webcat/navi/productInfo/doct/tdoct7056__eng.pdf)
- [Thinger docs](https://docs.thinger.io)