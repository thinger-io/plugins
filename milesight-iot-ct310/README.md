# Smart Current Transformer - CT310

The CT310 is a LoRaWAN® Smart Current Transformer designed for monitoring energy consumption and analyzing usage remotely. Part of the CT30x series, it provides high-capacity current measurement options to suit energy monitoring applications and supports sending threshold alarms for proactive energy management.

## Features

- **Current Measurement Range**: 0 – 1000 A RMS
- **High Accuracy**: ±1% (typical)
- **High Resolution**: 1 mA
- **Sampling Frequency**: 3.3 kHz
- **Data Reporting**: Real-time RMS (1s interval) and cumulative energy data
- **Temperature Sensor**: Integrated NTC sensor (-20°C to 100°C, ±1%)
- **Working Frequency**: 50–60 Hz
- **Compact Design**: 56.5 x 36 x 68.5 mm
- **Enclosure Rating**: IP30
- **Operating Temperature**: -20°C to 70°C
- **LoRaWAN Class A**: Support for multiple frequency plans (EU868, US915, AS923, AU915, CN470)

## Use Cases

- Industrial energy monitoring
- Commercial building energy management
- Data center power consumption tracking
- Remote energy consumption analysis
- Threshold-based alarm notifications
- Electrical load profiling

## Thinger.io Integration

The CT310 seamlessly integrates with Thinger.io through LoRaWAN connectivity, enabling real-time monitoring of current consumption, cumulative energy data, and temperature readings via customizable dashboards.

## Requirements

A LoRaWAN server is required to communicate the CT310 into Thinger.io. Compatible options include:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

The corresponding plugin for the selected LoRaWAN server must be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed, a new Product will be created for this device.

### Configuration

The Product is already preconfigured. Check that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your preference.

### Usage

Start sending uplinks for autoprovisioning devices and buckets. This product also provides a predefined dashboard and downlinks for configuration and alarm management.

## Additional Resources

Milesight resources can be found at:

- [CT3xx Datasheet](https://resource.milesight.com/milesight/iot/document/ct3xx-datasheet-en.pdf)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/milesight-iot/ct310/)
- [Thinger.io Documentation](https://docs.thinger.io)