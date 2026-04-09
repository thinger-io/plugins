# flowIQ®2200 OMS over LoRaWAN

The Kamstrup flowIQ®2200 OMS over LoRaWAN is a static ultrasonic water meter with integrated LoRaWAN connectivity. Configuration number 02K73A****** represents the LoRaWAN-enabled variant featuring advanced water metering capabilities, acoustic leakage detection, and wireless data transmission for smart water management applications.

## Features

- **Ultrasonic measurement technology** for pinpoint accuracy
- **Dynamic range** up to R1600
- **Acoustic leakage detection** in service connections
- **Water temperature measurement** for continuous monitoring
- **IP68 enclosure** designed for operation in submerged environments
- **LoRaWAN connectivity** for long-range wireless communication
- **Up to 20 years battery life** depending on configuration and ambient temperature
- **Intelligent info codes** for operations, asset management, and customer service
- **Nominal flow** from 1.6 m³/h up to 10 m³/h

## Use Cases

- Residential and commercial water metering
- Smart water network management
- Leakage detection and monitoring
- Water consumption analytics
- Billing and revenue management
- Water distribution optimization

## Thinger.io Integration

The flowIQ®2200 integrates with Thinger.io through LoRaWAN network servers, enabling remote water meter monitoring, consumption tracking, and leak detection capabilities.

## Requirements

A LoRaWAN server is required to communicate the Kamstrup flowIQ®2200 OMS over LoRaWAN into Thinger.io, some options are:

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

Kamstrup resources can be found at:

- [Official Product Documentation](https://www.kamstrup.com/en-en/water-solutions/water-meters/flowiq-2200)
- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/kamstrup/flowiq2200-02k73a/)
- [Thinger.io Documentation](https://docs.thinger.io)