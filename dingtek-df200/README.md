# DF200 - Soap Dispenser Level Sensor

The CNDingtek DF200 is a LoRaWAN-enabled soap dispenser level sensor designed to monitor the remaining liquid level in soap, sanitizer, and lotion dispensers. Using capacitive sensing technology, the device detects liquid levels in dispensers and reports the data wirelessly through LoRaWAN connectivity. The DF200 simplifies facility management by providing real-time monitoring of dispenser status, enabling proactive refilling and reducing maintenance costs.

## Features

- **Capacitive Level Sensing**: Non-invasive monitoring of liquid levels without direct contact with the liquid
- **Five-Level Detection**: Reports discrete liquid levels at 0%, 25%, 50%, 75%, and 100%
- **LoRaWAN Connectivity**: Long-range wireless communication with low power consumption
- **Flexible Power Options**: Supports 4 x 1.5V Size C batteries or external 6V DC power supply
- **Multi-Network Support**: Compatible with LoRaWAN, NB-IoT, and Sigfox networks
- **Compact Design**: Dimensions of 158 x 116 x 286 mm with a weight of 750-820 grams
- **Wide Operating Temperature**: Functions in temperatures ranging from -20°C to 70°C
- **Frequency Band Support**: Available for AS923 and AU915-928 frequency plans

## Use Cases

- Smart building facility management
- Healthcare facility hygiene monitoring
- Retail and commercial restroom management
- Educational institution maintenance optimization
- Restaurant and hospitality hygiene compliance
- Industrial facility sanitation monitoring

## Thinger.io Integration

The DF200 integrates with Thinger.io through LoRaWAN network servers, enabling real-time monitoring and management of dispenser levels across multiple locations. The integration provides automated device provisioning, data visualization, and alert capabilities for proactive maintenance scheduling.

## Requirements

A LoRaWAN server is required to communicate the DF200 into Thinger.io, some options are:

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

Start sending uplinks for autoprovisioning devices and buckets. This product also provides a predefined dashboard for monitoring dispenser liquid levels and receiving low-level alerts.

## Additional Resources

Dingtek resources can be found at:

- [Dingtek Official Website](https://www.dingtek.com/dispenser-level-sensor-df200)
- [TTN Device Repository](https://www.thethingsnetwork.org/device-repository/devices/dingtek/df200)
- [Thinger.io Documentation](https://docs.thinger.io)