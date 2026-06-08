# Vaqa'O Multi Lite - Temperature, Humidity, Luminosity, CO2 & Motion Sensor

The Watteco VAQA'O Multi Lite is a LoRaWAN® device that measures temperature, relative humidity, carbon dioxide (CO2) concentration, VOC index, brightness, and detects presence in the ambient air of a room, in a building, an apartment, or a house. The data is transmitted via a public or private LoRaWAN® radio frequency network. This sensor monitors indoor air quality (IAQ) and presence to meet energy efficiency goals and regulatory requirements in establishments open to the public, workplaces, and residential environments.

## Features

- **Temperature Measurement**: 0°C to 55°C operating range with configurable alarms (0°C to 50°C in 1°C steps, default: 14°C min / 28°C max)
- **Relative Humidity**: 0% to 95% RH (non-condensing) with configurable alarms (0% to 100% RH in 1% RH steps, default: 20% min / 70% max)
- **CO2 Sensor**: 0-5000 ppm measurement range, ±100 ppm accuracy, configurable min/max alarms
- **VOC Index**: 0 to 500 range, ±5 accuracy, configurable min/max alarms
- **Brightness Sensor**: Ambient light detection
- **Motion Detection**: Presence detection with alert on sensor unclipping or movement
- **Compact Design**: 85 x 85 x 25 mm dimensions, IP20 enclosure
- **LoRaWAN Connectivity**: 863–870 MHz frequency, +14 dBm RF transmission power, Class A device
- **Configurable Measurement Interval**: From 10 minutes to 24 hours
- **Visual Indicators**: LEDs for network association and IAQ status (deactivation via downlink)
- **Battery Powered**: LS14500 Lithium AA 3.6V 2600mAh battery pack

## Use Cases

- Indoor air quality monitoring in public buildings and establishments receiving minors
- Workplace environmental monitoring for health and safety compliance
- Residential air quality management in apartments and houses
- Energy efficiency optimization through presence detection and IAQ monitoring
- HVAC system optimization based on real-time environmental data

## Thinger.io Integration

The VAQA'O Multi Lite seamlessly integrates with Thinger.io through LoRaWAN network servers, enabling real-time monitoring of indoor environmental conditions and automated alerting based on configurable thresholds.

## Requirements

A LoRaWAN server is required to communicate the Watteco VAQA'O Multi Lite into Thinger.io, some options are:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed a new Product will be created for this device.

### Configuration

The Product is already preconfigured, check that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your desire.

Configure the measurement interval and alarm thresholds according to your monitoring requirements using downlink commands.

### Usage

Start sending uplinks for autoprovisioning devices and buckets. This product also provides a predefined dashboard and downlinks for configuring alarm thresholds, measurement intervals, and LED indicator settings.

## Technical Specifications

- **Frequency**: 863–870 MHz
- **RF Transmission Power**: +14 dBm
- **Dimensions**: 85 x 85 x 25 mm
- **Weight**: 185 g
- **Enclosure Rating**: IP20
- **Operating Temperature**: 0°C to +55°C
- **Operating Humidity**: 0% to 95% RH (non-condensing)
- **Storage Conditions**: -10°C to +30°C, 0% to 60% RH
- **Compliance**: CE, RoHS, EN 61000-4-2, EN 300-220-1 V2-4-1, EN 301 489 V1-6-1

## Additional Resources

Watteco resources can be found at:

- [Watteco Official Website](https://www.watteco.fr/)
- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/watteco/vaqao-multi-lite)
- [Thinger.io Documentation](https://docs.thinger.io)