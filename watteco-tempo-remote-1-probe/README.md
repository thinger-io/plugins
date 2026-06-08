# Temp'O remote 1 probe sensor

The WATTECO Remote temperature sensor is dedicated to connecting a temperature sensor probe for measuring temperature in buildings, temperature-controlled rooms, cooling towers. It transmits the data over a public or private LoRaWAN® radio network.

## Features

- **LoRaWAN Class A** connectivity
- **Remote NTC temperature probe** with 2m cable (Ø 6mm)
- **Temperature range**: -20°C to +60°C operating, 0°C to +55°C measurement
- **Measurement accuracy**: ±0.2°C
- **Differential data compression** for optimized transmission
- **12-year battery life** (data compression mode with 1 transmission per 120 minutes)
- **IP55 enclosure** rating (IPx7 for NTC probe)
- **Compact design**: 92 x 92 x 56 mm
- **Easy installation** with supplied screws and anchors
- **NFC tag** for configuration
- **LED indicators** for configuration and network pairing status
- **Magnetic switch** for reset and ON/OFF operations

## Use Cases

- Building temperature monitoring
- Temperature-controlled room supervision
- Cooling tower management
- Remote temperature sensing in industrial environments

## Technical Specifications

### Power Supply
- **Battery**: 3.6V / 3600mAh replaceable lithium battery
- **Autonomy**: >12 years in batch mode with 1 transmission every 120 minutes (at +10°C to +25°C)

### Environmental
- **Operating temperature**: -20°C to +50°C
- **Storage conditions**: +10°C to +30°C, 20%rH to 60%rH
- **Fire resistance**: UL94-V0HB

### Compliance
- Radio Equipment Directive 2014/53/EU
- RoHS compliant

## Thinger.io Integration

This device integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling remote temperature monitoring and data visualization.

## Requirements

A LoRaWAN server is required to communicate the Temp'O remote 1 probe sensor into Thinger.io, some options are:

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

WATTECO resources can be found at:

- [WATTECO Official Website](https://www.watteco.com/)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/watteco/tempo-remote-1-probe)
- [Thinger docs](https://docs.thinger.io)