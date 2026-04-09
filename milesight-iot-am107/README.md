# AM107 - Ambience Monitoring Sensors

The Milesight AM107 is a comprehensive LoRaWAN ambience monitoring sensor designed for Indoor Air Quality (IAQ) monitoring. This all-in-one device integrates seven smart sensors to measure CO2 concentration, temperature, humidity, light, TVOC (Total Volatile Organic Compounds), barometric pressure, and motion detection (PIR). The AM107 displays IAQ data in real-time and is equipped with NFC (Near Field Communication) for easy configuration via smartphone or PC software.

## Features

- **7-in-1 Multi-Sensor Solution**: Temperature, humidity, light intensity, CO2, TVOC, barometric pressure, and motion (PIR) detection
- **LoRaWAN Connectivity**: Long-range wireless communication for reliable data transmission
- **Real-Time Data Display**: Built-in display for instant IAQ data visualization
- **NFC Configuration**: Simple setup and configuration via smartphone or PC
- **Battery or USB Powered**: Dual power options with 2 × 1.5V AA alkaline batteries or Type-C port
- **Compact Design**: Dimensions of 105 × 21.2 × 70.4 mm
- **IP30 Enclosure**: Suitable for indoor environments
- **Wide Temperature Range**: Operating temperature from 0°C to 45°C (sensor range: -20°C to +70°C)

## Use Cases

- Indoor Air Quality (IAQ) monitoring in offices, schools, and commercial buildings
- Smart building automation and environmental control
- Workspace occupancy detection and management
- HVAC system optimization
- Health and safety compliance monitoring

## Thinger.io Integration

The AM107 integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling centralized monitoring and data analysis of all environmental parameters.

## Requirements

A LoRaWAN server is required to communicate the Milesight AM107 into Thinger.io, some options are:

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

- [Product Page](https://www.milesight.com/iot/product/lorawan-sensor/am107)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/milesight-iot/am107/)
- [Thinger docs](https://docs.thinger.io)