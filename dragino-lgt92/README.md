# LGT92 - GPS Location Tracker

The Dragino LGT-92 LoRaWAN® GPS Tracker includes a low-power GPS module for location tracking and a 9-axis accelerometer for motion detection. The captured data is sent to a LoRaWAN network for analysis.

## Features

- **Ultra Low Power MCU**: STM32L072CZT6 with 192KB Flash, 20KB RAM, and 6KB EEPROM
- **LoRa Module**: SX1276/1278 for long-range wireless communication
- **GPS Module**: Low-power L76-L GPS module for accurate location tracking
- **Motion Detection**: 9-axis accelerometer for motion and attitude detection
- **Power Options**: 1000mAh rechargeable Li-ion battery (LGT-92-LI variant)
- **Open Source**: Fully open-source design for customization and integration

## Use Cases

- Asset tracking and logistics
- Vehicle and fleet management
- Personal tracking devices
- Outdoor activity monitoring
- Real-time location tracking applications

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the Dragino LGT-92 into Thinger.io, some options are:

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

Dragino resources can be found at:

- [Product Page](https://www.dragino.com/products/lora-lorawan-end-node/item/142-lgt-92.html)
- [Datasheet](https://www.dragino.com/downloads/downloads/LGT_92/Datasheet_LGT-92.pdf)
- [User Manual](https://www.dragino.com/downloads/downloads/LGT_92/LGT-92_LoRa_GPS_Tracker_UserManual_v1.4.3.pdf)
- [Thinger docs](https://docs.thinger.io)