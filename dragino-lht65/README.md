# LHT65 - Temperature & Humidity Sensor

The Dragino LHT65 is a LoRaWAN Temperature & Humidity sensor designed for long-range wireless environmental monitoring. It features built-in temperature and humidity sensors with an option to connect an external temperature sensor via a dedicated connector. The device is equipped with a 2400mAh non-rechargeable battery providing over 10 years of operation, making it ideal for remote and outdoor deployment scenarios.

## Features

- **Built-in Temperature Sensor**: ±0.3°C accuracy, measuring range -40°C to +80°C with 0.01°C resolution
- **Built-in Humidity Sensor**: ±3%RH accuracy (10~90%RH range), 0~99.9%RH measurement range with 0.04%RH resolution
- **External Temperature Sensor Support**: Optional external sensor with ±0.5°C accuracy (-10°C to 85°C) and ±2°C accuracy (-55°C to +125°C)
- **Long Battery Life**: Built-in 2400mAh battery for over 10 years of use
- **Data Logging**: 3200 sensor records with timestamp
- **LoRaWAN Class A**: Fully compatible with LoRaWAN v1.0.2 protocol
- **Remote Configuration**: Configure via LoRaWAN downlink commands
- **AT Commands**: Change parameters via AT commands
- **Tri-color LED**: Status indication
- **Wall Mountable**: Easy installation design
- **Firmware Upgradable**: Via program port

## Use Cases

- Environmental monitoring in buildings and outdoor locations
- Cold chain logistics and warehouse monitoring
- Agricultural climate monitoring
- HVAC system monitoring
- Museum and archive preservation monitoring
- Data center environmental control

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the Dragino LHT65 into Thinger.io, some options are:

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

### Environmental Conditions

- **Operation Temperature**: -40°C to +80°C
- **Operation Humidity**: 0~99.9%RH (no dew)
- **Storage Temperature**: -10°C to +45°C

### Sensor Specifications

**Built-in Temperature Sensor:**
- Accuracy: ±0.3°C
- Range: -40°C to +80°C
- Resolution: 0.01°C

**Built-in Humidity Sensor:**
- Accuracy: ±3%RH (10~90%RH)
- Range: 0~99.9%RH
- Resolution: 0.04%RH
- Response Time: <5s

**External Temperature Sensor (Optional):**
- Accuracy: ±0.5°C (-10°C to 85°C)
- Accuracy: ±2°C (-55°C to +125°C)
- Resolution: 0.0625°C
- Operating Range: -55°C to +125°C

### Connectivity

- **Protocol**: LoRaWAN Class A (v1.0.2 compatible)
- **Frequency Bands**: EU433, CN470, EU868, IN865, KR920, AS923, AU915, US915

### Power

- **Battery**: Built-in 2400mAh non-rechargeable lithium battery
- **Battery Life**: Over 10 years

## Additional Resources

Dragino resources can be found at:

- [LHT65 Product Page](https://www.dragino.com/products/temperature-humidity-sensor/item/151-lht65.html)
- [LHT65 Datasheet](https://www.dragino.com/downloads/downloads/LHT65/Datasheet_LHT65_LoRaWAN_Temperature_Humidity_Sensor.pdf)
- [Thinger.io Documentation](https://docs.thinger.io)