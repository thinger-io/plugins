# DC510 - People Counter

The CNDingtek DC510 is a PIR-based people counter designed for indoor use to calculate the number of people entering or passing through a monitored area. This wireless sensor provides single-direction people flow counting without capturing images or video, ensuring privacy compliance while delivering accurate occupancy data for building management and crowd control applications.

## Features

- **PIR Sensor Technology**: Passive infrared detection for reliable people counting
- **Single-Direction Counting**: Monitors unidirectional people flow
- **Privacy-Focused Design**: No image or video capture
- **LoRaWAN Connectivity**: Low-power wireless communication for long-range data transmission
- **Multi-Protocol Support**: Available with LoRaWAN, NB-IoT, or Sigfox connectivity options
- **IP65 Enclosure**: Dust-tight and water-resistant housing
- **Compact Design**: 110 x 109 x 25 mm dimensions
- **Wide Operating Temperature**: -20°C to 70°C
- **Battery Powered**: Long-lasting operation (up to 1 year typical battery life)

## Use Cases

- Conference rooms and meeting spaces
- Hotels and hospitality venues
- Parks and public spaces
- Factories and industrial facilities
- Retail stores and shopping centers
- Building occupancy monitoring
- Crowd control and flow management
- Capacity limit monitoring and alerts

## Thinger.io Integration

The DC510 people counter can be integrated with Thinger.io through a LoRaWAN network server, enabling real-time monitoring of occupancy data, historical trend analysis, and automated alerting based on people count thresholds.

## Requirements

A LoRaWAN server is required to communicate the CNDingtek DC510 into Thinger.io, some options are:

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

CNDingtek resources can be found at:

- [Product Page](https://www.dingtek.com/people-counter-dc510)
- [Device Repository - The Things Network](https://www.thethingsnetwork.org/device-repository/devices/dingtek/dc510)
- [Thinger docs](https://docs.thinger.io)