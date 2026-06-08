# T2000 Tracker A/B/C

The SenseCAP T2000 A/B/C is an industrial-grade LoRaWAN tracker with GNSS, Bluetooth and Wi-Fi positioning, long battery life and IP67 protection, ideal for reliable asset tracking. It features a built-in 3-axis accelerometer for motion status detection and an anti-tamper button for security alerts. The tracker supports universal frequency plans from 863MHz to 928MHz and includes an offline data buffer to ensure data integrity.

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the SenseCAP T2000 Tracker into Thinger.io, some options are:

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

SenseCAP resources can be found at:

- [SenseCAP T2000 Tracker Documentation](https://wiki.seeedstudio.com/sensecap_t2000_tracker)
- [Get Started Guide](https://wiki.seeedstudio.com/Get_Started_with_SenseCAP_T2000_tracker)
- [Thinger docs](https://docs.thinger.io)