# Smart Current Transformer - CT305

The CT30x is a LoRaWAN® Smart Current Transformer for monitoring energy consumption and analyzing usage remotely. CT305 provides multiple current options to suit energy monitoring and supports sending threshold alarms. With a 500A current capacity, the CT305 features self-powered operation, eliminating the need for batteries or external wiring, and uses a non-invasive clamp-on design for easy and safe installation.

## Key Features

- **Self-Powered Operation**: Energy harvesting from measured cables, maintenance-free with no batteries or external wires required
- **High Accuracy Monitoring**: RMS current and accumulated current reporting with sampling frequency up to 3.3 kHz
- **500A Current Capacity**: Rated primary current of 500 Arms per CT with 150 mArms rated secondary current
- **Real-Time Monitoring**: Sampling rate up to 1s for fast response and alarm capabilities
- **Non-Invasive Design**: Clamp-on installation without power de-energizing
- **Temperature Monitoring**: Support for external NTC sensor for cable temperature measurement (-20°C to 100°C)
- **Three-Phase Detection**: Simultaneous monitoring of three phases
- **Threshold Alarms**: Configurable threshold and overrange alarm notifications
- **LED Indicator**: Visual indication of working status and alarms
- **FUOTA Support**: Firmware Update Over the Air capability

## Technical Specifications

- **Protocol**: LoRaWAN® (Class A)
- **Frequency**: CN470/IN865/RU864/EU868/US915/AU915/KR920/AS923-1&2&3&4
- **Tx Power**: 16 dBm (868 MHz) / 20 dBm (915 MHz) / 19 dBm (470 MHz)
- **Sensitivity**: -137 dBm
- **Activation**: OTAA/ABP
- **Measurement Accuracy**: ±1%
- **Resolution**: 1 mA
- **Working Frequency**: 50~60 Hz
- **Antenna**: 50Ω SMA Connector
- **Configuration**: USB Type-C or Downlink

## Thinger.io Integration

The CT305 seamlessly integrates with Thinger.io through LoRaWAN network servers, enabling remote energy monitoring, real-time current tracking, and alarm management through cloud-based dashboards.

## Requirements

A LoRaWAN server is required to communicate the CT305 into Thinger.io, some options are:

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

Milesight CT305 resources can be found at:

- [Datasheet](https://resource.milesight.com/milesight/iot/document/ct3xx-datasheet-en.pdf)
- [User Guide](https://resource.milesight.com/milesight/iot/document/ct3xx-user-guide-en.pdf)
- [Thinger docs](https://docs.thinger.io)