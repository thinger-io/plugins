# S2101- LoRaWAN® Air Temperature and Humidity Sensor

The SenseCAP S2101 is a battery-powered industrial-grade LoRaWAN sensor designed for long-distance environmental monitoring. It measures air temperature and humidity with high accuracy across a wide range, from -40°C to 85°C and 0 to 100 %RH respectively. The device features IP66 weatherproof protection, built-in Bluetooth 5.0 for wireless configuration and firmware upgrades, and a replaceable battery designed for up to 10 years of operation. Compatible with multiple LoRaWAN network architectures including Helium, TTN, and others, it supports global frequency bands and simplifies deployment for industrial IoT applications.

## Features

- **Wide Measurement Range**: Temperature from -40°C to 85°C with ±0.2°C accuracy and 0.01°C resolution; Humidity from 0 to 100 %RH with ±1.8 %RH accuracy and 0.01 %RH resolution
- **Long Battery Life**: Up to 10 years operation on a single standard D-size 19Ah SOCl2 battery (non-rechargeable, replaceable)
- **LoRaWAN Connectivity**: Wio-E5 microcontroller with LoRaWAN v1.0.3 Class A support, maximum transmitted power of 19dBm, sensitivity of -136dBm@SF12 BW=125KHz, and communication distance of 2 to 10 km depending on gateway and environment
- **Multi-Frequency Support**: Compatible with IN865/EU868/US915/AU915/AS923/KR920/RU864 frequency bands, configurable via Bluetooth App
- **Bluetooth Configuration**: Built-in Bluetooth 5.0 for easy wireless setup and firmware updates via App Tool
- **Industrial Design**: IP66 weatherproof rating, operating temperature -40°C to 85°C, operating humidity 0 to 100 %RH (non-condensing), lightweight at 280g
- **Easy Deployment**: Simple mounting via brackets, user-friendly setup
- **Multi-Platform Compatibility**: Works with Helium, The Things Network, and other LoRaWAN network servers
- **Long-term Stability**: Temperature drift <0.03°C/year, humidity drift <0.25 %RH/year
- **Certifications**: CE, FCC, RoHS compliant

## Use Cases

- Agricultural monitoring and greenhouse climate control
- Smart building HVAC optimization
- Cold chain logistics and storage monitoring
- Industrial facility environmental tracking
- Outdoor weather station deployments
- Data center temperature and humidity management
- Food storage and warehouse monitoring
- Smart city environmental sensing

## Thinger.io Integration

The SenseCAP S2101 integrates seamlessly with Thinger.io through LoRaWAN network server plugins, enabling automatic device provisioning, real-time data visualization, and remote monitoring capabilities.

## Requirements

A LoRaWAN server is required to communicate the SenseCAP S2101 into Thinger.io, some options are:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed a new Product will be created for this device.

### Configuration

The Product is already preconfigured, check that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your desire.

Configure the device frequency band using the SenseCAP Bluetooth App to match your regional LoRaWAN frequency requirements before deployment.

### Usage

Start sending uplinks for autoprovisioning devices and buckets.
This product also provides a predefined dashboard and downlinks.

## Additional Resources

SenseCAP resources can be found at:

- [Product Page](https://www.seeedstudio.com/SenseCAP-S2101-LoRaWAN-Air-Temperature-and-Humidity-Sensor-p-5354.html)
- [Technical Documentation](https://files.seeedstudio.com/products/114992867/SenseCAP%20S210X%20LoRaWAN%20Sensor%20Catalogue.pdf)
- [TTN Device Repository](https://www.thethingsnetwork.org/device-repository/devices/sensecap/sensecaps2101-temp-humid)
- [Thinger.io Documentation](https://docs.thinger.io)