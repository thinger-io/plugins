# Move'O - Temperature, Humidity, Occupancy & Luminosity Sensor

The Watteco MOVE'O is a LoRaWAN Class A sensor equipped with 4 integrated sensors: passive infrared (PIR) for motion detection, temperature, humidity, and luminosity. The device is designed to detect the presence of people and measure environmental conditions in indoor spaces. The data is transmitted via a public or private LoRaWAN® radio frequency network.

## Features

- **Temperature Monitoring**: Measures ambient temperature (T°C)
- **Humidity Sensing**: Monitors relative humidity (Hr%)
- **Occupancy Detection**: Passive infrared (PIR) sensor for presence detection
- **Light Measurement**: Luminosity sensor for brightness monitoring
- **LoRaWAN Connectivity**: Class A device with internal antenna
- **Battery Powered**: 3.6V AA-type disposable battery
- **Compact Design**: 74 x 74 x 35 mm dimensions
- **Indoor Use**: IP20 enclosure rating
- **Operating Temperature**: 0°C to 55°C

## Use Cases

- Smart building management and automation
- Occupancy monitoring and space utilization
- Indoor environmental quality monitoring
- Energy efficiency optimization
- HVAC system control and optimization
- Workplace analytics and desk usage tracking

## Thinger.io Integration

The Watteco MOVE'O integrates with Thinger.io through LoRaWAN network servers, enabling remote monitoring and management of temperature, humidity, occupancy, and light data from your devices.

## Requirements

A LoRaWAN server is required to communicate the Watteco MOVE'O into Thinger.io, some options are:

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

Watteco resources can be found at:

- [Documentation](https://support.watteco.com/moveo)
- [Watteco Website](https://www.watteco.com)
- [Thinger docs](https://docs.thinger.io)