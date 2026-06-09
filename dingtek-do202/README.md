# DO202 - Parking Occupancy Sensor

The CNDingtek DO202 is a surface-mounted parking occupancy sensor designed for smart parking projects. It combines microwave radar range measurement and magnetic detection to accurately identify whether a parking space is occupied. The device uploads parking status data through LoRaWAN wireless networks to cloud servers via LoRaWAN gateways, enabling real-time parking guidance, operation management, and platform integration.

## Key Features

- **Dual Detection Technology**: Combination of 24GHz microwave radar and magnetic measurement for reliable parking occupancy detection
- **Environmental Sensors**: Built-in temperature and humidity monitoring
- **Temperature Measurement**: -30°C to +85°C (±0.3°C accuracy)
- **Humidity Measurement**: 0-90% RH (±2% RH accuracy)
- **LoRaWAN Connectivity**: Supports multiple frequency bands including CN470, IN865, EU868, US915, AU915, AS923
- **Rugged Design**: IP68 outdoor protection rating for harsh weather conditions
- **Surface Mounting**: Easy installation with expansion screws
- **Long Battery Life**: Powered by 25500 mAh battery (3x ER26500 batteries)
- **Bluetooth Configuration**: Built-in Bluetooth for easy on-site configuration
- **Compact Dimensions**: 183mm diameter x 38mm height

## Use Cases

- Real-time curbside parking occupancy detection
- Roadside parking management and enforcement
- Smart city parking guidance systems
- Parking availability monitoring for municipal parking operations
- Integration with parking management platforms

## Thinger.io Integration

The DO202 parking occupancy sensor transmits data via LoRaWAN protocol, enabling seamless integration with Thinger.io for real-time parking space monitoring and management.

## Requirements

A LoRaWAN server is required to communicate the CNDingtek DO202 into Thinger.io, some options are:

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

- [Product Page](https://www.dingtek.com/smart-parking-occupancy-sensor-do202)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/dingtek/do202)
- [Thinger docs](https://docs.thinger.io)