# LT33222-L - I/O Controller

The Dragino LT33222-L is a LoRaWAN® I/O module that contains different I/O Interfaces such as analog current input, analog voltage input, relay output, digital input, and digital output. The LT series I/O modules are designed to simplify the installation of I/O monitoring.

## Features

- **Digital Interfaces**: 3x Digital Input, 3x Digital Output
- **Relay Output**: 2x Relay Output (5A@250VAC / 30VDC)
- **Analog Inputs**: 2x 0~20mA Analog Input (resolution: 0.01mA), 2x 0~30V Analog Input (resolution: 0.01V)
- **Counting Port**: 1x Counting Input
- **LoRaWAN Protocol**: Class A & Class C
- **Frequency Bands**: CN470/EU433/KR920/US915/EU868/AS923/AU915
- **Configuration**: AT Commands and remote configuration via LoRa Downlink
- **Firmware**: Upgradeable via program port

## Applications

- Smart Buildings & Home Automation
- Logistics and Supply Chain Management
- Smart Metering
- Smart Agriculture
- Smart Cities
- Smart Factory

## Thinger.io Integration

### Requirements

A LoRaWAN server is required to communicate the Dragino LT33222-L into Thinger.io, some options are:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

### Get Started

#### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed a new Product will be created for this device.

#### Configuration

The Product is already preconfigured, check that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your desire.

#### Usage

Start sending uplinks for autoprovisioning devices and buckets. This product also provides a predefined dashboard and downlinks.

## Additional Resources

Dragino resources can be found at:

- [Dragino Download Server](https://www.dragino.com/downloads/index.php?dir=LT_LoRa_IO_Controller/LT33222-L/)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/dragino/lt33222-l/)
- [Thinger.io Documentation](https://docs.thinger.io)