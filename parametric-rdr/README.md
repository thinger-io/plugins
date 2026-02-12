# RDR LORA NFC/RFID READER

The RDR is a compact LoRaWAN NFC/RFID reader that reads NFC tags, stores the content together with a timestamp in an internal data buffer, and transmits the data via a standard LoRaWAN network. The small and stylish device can be mounted on a wall or used as a table top device. The unit is powered by 4x AAA alkaline or NiMH batteries and a USB power supply.

## Features

- NFC/RFID tag reading capability
- Internal data buffer for tag content and timestamps
- LoRaWAN 868 MHz (EU) / 915 MHz (US) connectivity
- Dual power options: 4x AAA batteries or USB power supply
- Compact design: 100 x 100 x 25 mm
- IP65 rated (completely sealed)
- Operating temperature: -30°C to 60°C
- Suitable for indoor and outdoor applications

## Use Cases

- Access control and event logging
- Asset tracking and identification
- Attendance monitoring systems
- RET (Renewable Energy Tag) systems
- RFID-to-LoRa gateway applications

## Thinger.io Integration

The RDR LORA NFC/RFID READER integrates with Thinger.io through LoRaWAN network servers, enabling remote monitoring and management of NFC tag reading events.

## Requirements

A LoRaWAN server is required to communicate the RDR LORA NFC/RFID READER into Thinger.io, some options are:

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

Parametric resources can be found at:

- [Product Documentation](https://dev.parametric.ch/docs/rdr/)
- [User Manual](https://dev.parametric.ch/docs/rdr/manuals/users_manual/)
- [Thinger docs](https://docs.thinger.io)