# The Things Node

The Things Node is based on the SparkFun Pro Micro - 3.3V/8MHz with added Microchip LoRaWAN® module and temperature sensor, NXP's digital accelerometer, a light sensor, button, and RGB LED. All this is packaged in a matchbox-sized waterproof (IP54) casing with 3 AAA batteries to power it for months of usage.

## Features

- **Microchip RN2483/RN2903 LoRaWAN® module** for long-range wireless communication
- **Temperature sensor** for environmental monitoring
- **NXP digital accelerometer** for motion detection and orientation sensing
- **Light sensor** for ambient light measurement
- **User button** for interactive applications
- **RGB LED** for visual feedback and status indication
- **SparkFun Pro Micro 3.3V/8MHz** microcontroller
- **IP54 waterproof casing** for protection against dust and water splashes
- **Battery-powered** with 3 AAA batteries for months of autonomous operation
- **Compact design** in a matchbox-sized form factor

## Use Cases

- Rapid prototyping of LoRaWAN applications
- Environmental monitoring (temperature and light)
- Motion and orientation detection
- Asset tracking
- Smart building applications
- Educational and development projects

## Thinger.io Integration

The Things Node communicates with Thinger.io through a LoRaWAN network server, enabling remote monitoring and control of all onboard sensors and actuators.

## Requirements

A LoRaWAN server is required to communicate The Things Node into Thinger.io, some options are:

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

The Things Node resources can be found at:

- [The Things Industries Documentation](https://www.thethingsindustries.com/docs/hardware/devices/models/the-things-node/)
- [The Things Network Documentation](https://www.thethingsnetwork.org/docs/devices/node/)
- [Thinger.io Documentation](https://docs.thinger.io)