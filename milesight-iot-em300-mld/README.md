# EM300-MLD - Leak Sensor

The EM300-MLD is an innovative LoRaWAN leak sensor that incorporates a flexible printed membrane for reliable water leakage detection. Featuring a 400 × 400 mm detection membrane, this sensor provides comprehensive monitoring of water leaks, spillage, or floor wetness in both residential and commercial applications. The device detects conductive liquids including water, weak acids, and weak bases, triggering an alarm when soaking liquid length exceeds 1.5 cm.

## Features

- **Wide Detection Area**: 400 × 400 mm printed leakage-detecting film (customizable size)
- **LoRaWAN Connectivity**: Standard LoRaWAN protocol with support for multiple frequency bands (CN470/IN865/RU864/EU868/US915/AU915/KR920/AS923-1&2&3&4)
- **Long Battery Life**: Up to 10 years battery life with 4000 mAh ER18505 Li-SOCL2 battery (8000 mAh version optional)
- **Data Storage**: Stores up to 1,000 historical records with retransmission support to prevent data loss
- **Milesight D2D Protocol**: Enables ultra-low latency and direct control without gateways
- **NFC Configuration**: Easy setup via mobile app
- **IP67 Protection**: Suitable for harsh environments with operating temperature range of -30°C to 70°C
- **Class A Device**: OTAA/ABP activation modes

## Thinger.io Integration

The EM300-MLD integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time monitoring of water leakage events, battery status, and sensor configuration management.

## Requirements

A LoRaWAN server is required to communicate the EM300-MLD into Thinger.io, some options are:

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

## Technical Specifications

- **Wireless Technology**: LoRaWAN, Milesight D2D
- **Antenna**: Internal
- **Tx Power**: 16dBm (868 MHz) / 20dBm (915 MHz) / 19dBm (470 MHz)
- **Sensitivity**: -137dBm @300bps
- **Liquid Detection**: Conductive liquids (water, weak acid, weak base, etc.)
- **Detection Film**: 400 × 400 × 0.25 mm printed membrane
- **Trigger Condition**: Soaking liquid length > 1.5 cm
- **Power Supply**: 1 × 4000 mAh ER18505 Li-SOCL2 Battery (8000 mAh optional)
- **Battery Life**: Around 10 years (SF7, EU868 & US915)
- **Operating Temperature**: -30°C to 70°C
- **Humidity**: 0% to 95% (non-condensing)
- **Ingress Protection**: IP67
- **Dimensions**: 105.6 × 85.3 × 27 mm
- **Weight**: 142g (with 1 battery)
- **Cable Length**: 1000 mm (customizable)

## Use Cases

- Water leak detection in server rooms and data centers
- Floor wetness monitoring in residential and commercial buildings
- Spillage detection in industrial facilities
- Basement and storage area water monitoring
- HVAC system leak detection

## Additional Resources

Milesight resources can be found at:

- [Product Page](https://www.milesight.com/iot/product/lorawan-sensor/em300-mld)
- [Datasheet](https://resource.milesight.com/milesight/iot/document/em300-mld-datasheet-en.pdf)
- [Thinger docs](https://docs.thinger.io)