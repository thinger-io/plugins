# DC413 - Manhole Sensor

The CNDingtek DC413 is a smart manhole sensor that integrates a liquid/solid level sensor and a movement sensor. Suitable for measuring water and sewage levels in wells and manholes. The data is sent to a LoRaWAN network, then the application server for further processing.

## Features

- **Dual Sensing Technology**: Combines manhole cover status detection and ultrasonic water/sewage level monitoring in a single device
- **Cover Movement Detection**: Monitors cover movement and abnormal opening using acceleration detection
- **Ultrasonic Level Monitoring**: Measures water and sewage levels inside manholes and drainage wells
- **IP68 Protection**: Fully waterproof outdoor enclosure for harsh environments
- **LoRaWAN Connectivity**: Long-range wireless transmission for remote monitoring
- **Compact Design**: 119 x 119 x 40 mm dimensions, 450g weight
- **Operating Temperature**: -20°C to 70°C
- **Durable Construction**: ABS material in black color

## Use Cases

- Municipal manhole cover safety monitoring
- Urban drainage system level monitoring
- Sewage overflow prevention and early warning
- Smart city infrastructure management
- Flood risk detection in drainage networks
- Theft and unauthorized access detection

## Thinger.io Integration

The DC413 manhole sensor integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time monitoring of manhole cover status and water levels with automated alerts and historical trend analysis.

## Requirements

A LoRaWAN server is required to communicate the CNDingtek DC413 into Thinger.io, some options are:

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

## Additional Resources

CNDingtek resources can be found at:

- [Product Page](https://www.dingtek.com/manhole-sensor-dc413)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/dingtek/dc413)
- [Thinger docs](https://docs.thinger.io)