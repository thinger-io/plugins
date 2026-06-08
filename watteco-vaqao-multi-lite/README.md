# Vaqa'O Multi Lite - Temperature, Humidity, Luminosity, Atmospheric Pressure, IAQ, CO2 & motion sensor

The Watteco VAQA'O Multi Lite is a LoRaWAN® device that measures temperature, relative humidity, atmospheric pressure, indoor air quality (IAQ), carbon dioxide (CO2) concentration, luminosity, and detects motion in the ambient air of a room, in a building, an apartment, or a house. The data is transmitted via a public or private LoRaWAN® radio frequency network.

## Features

- **Temperature**: 0°C to 55°C operating range, configurable alarms from 0°C to 50°C
- **Relative Humidity**: 0% to 95% RH (non-condensing), configurable alarms from 0% to 100% RH
- **CO2 Concentration**: 0 to 5000 ppm measurement range, ±100 ppm accuracy
- **VOC Index**: 0 to 500 range, ±5 accuracy for indoor air quality monitoring
- **Atmospheric Pressure**: Built-in pressure sensor
- **Luminosity**: Ambient light detection
- **Motion Detection**: Passive infrared sensor for presence detection
- **LoRaWAN® Class A**: 863–870 MHz frequency band
- **RF Transmission Power**: +14 dBm
- **Measurement Interval**: Configurable from 10 minutes to 24 hours
- **User Interface**: ILS switch and LEDs for network association and IAQ status indication
- **Enclosure**: IP20 protection rating
- **Dimensions**: 85 x 85 x 25 mm
- **Power**: Battery-powered (Lithium AA 3.6V 2600mAh)
- **Certifications**: CE, RoHS compliant

## Use Cases

- Indoor air quality monitoring in establishments open to the public and workplaces
- Energy efficiency management through occupancy detection
- Environmental monitoring in residential buildings
- HVAC system optimization based on CO2 and presence data
- Compliance with indoor air quality regulations

## Thinger.io Integration

The Vaqa'O Multi Lite integrates seamlessly with Thinger.io through LoRaWAN connectivity, enabling real-time monitoring and data visualization of all environmental parameters.

## Requirements

A LoRaWAN server is required to communicate the Watteco Vaqa'O Multi Lite into Thinger.io, some options are:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed a new Product will be created for this device.

### Configuration

The Product is already preconfigured, check that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your desire.

Configure measurement intervals and alarm thresholds according to your monitoring requirements using LoRaWAN downlink commands.

### Usage

Start sending uplinks for autoprovisioning devices and buckets. This product also provides a predefined dashboard and downlinks for configuring measurement intervals and alarm thresholds.

## Additional Resources

Watteco resources can be found at:

- [Watteco Official Website](https://www.watteco.fr/)
- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/watteco/vaqao-multi-lite)
- [Thinger docs](https://docs.thinger.io)