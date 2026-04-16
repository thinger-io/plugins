# Smart Current Transformer - CT303

The CT303 is a LoRaWAN® Smart Current Transformer designed for monitoring energy consumption and analyzing usage remotely. This device provides high-accuracy RMS current monitoring with real-time threshold alarms and features a non-invasive installation method. The CT303 is self-powered and offers multiple current options to suit various energy monitoring applications.

## Features

- **High-Accuracy Monitoring**: ±1% accuracy for precise current measurements
- **Primary Current Range**: Up to 300 A
- **Sampling Frequency**: 3.3 kHz for detailed energy analysis
- **Self-Powered**: No external power supply required
- **Non-Invasive Installation**: Easy deployment without system interruption
- **Real-Time Alarms**: Threshold-based notifications for proactive monitoring
- **LoRaWAN® Connectivity**: Long-range wireless communication with low power consumption
- **Three-Phase Support**: Monitor multiple phases simultaneously

## Use Cases

- Industrial energy monitoring
- Commercial building energy management
- Remote electrical consumption analysis
- Power quality monitoring
- Automated threshold-based alerting systems
- Energy efficiency optimization

## Thinger.io Integration

The CT303 integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time data visualization, threshold management, and energy consumption analytics.

## Requirements

A LoRaWAN server is required to communicate the CT303 into Thinger.io, some options are:

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

Milesight resources can be found at:

- [CT3xx Datasheet](https://resource.milesight.com/milesight/iot/document/ct3xx-datasheet-en.pdf)
- [Thinger docs](https://docs.thinger.io)