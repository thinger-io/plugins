# Move'O Lite - Temperature, Humidity, Occupancy & Luminosity Sensor

The Watteco MOVE'O Lite has 4 sensors. Passive infrared (PIR), temperature T°C, humidity Hr% and luminosity. The data is transmitted via a public or private LoRaWAN® radio frequency network.

The MOVE'O Lite is a LoRaWAN Class A sensor powered by a disposable 3.6V AA-type battery, designed for indoor monitoring applications. It combines environmental sensing with occupancy detection to provide comprehensive room monitoring capabilities.

## Features

- **Multi-Sensor Integration**: PIR motion detector, temperature, humidity, and luminosity sensors
- **LoRaWAN Connectivity**: Class A operation for efficient battery life
- **Compact Design**: 74 x 74 x 35 mm, IP20 enclosure
- **Operating Temperature**: 0°C to 55°C
- **Battery Powered**: 3.6V AA-type disposable battery
- **Tilt Detection**: Pull-out alert function based on angle with vertical (±2 degrees)
- **Intelligent Reporting**: Records significant measurements up to once every 10 minutes, occupancy detection with 30 minutes without movement before "Unoccupied" state, and at least one batch report per hour

## Use Cases

- Office space occupancy monitoring
- Smart building management
- HVAC optimization based on presence and environmental conditions
- Energy efficiency monitoring
- Indoor environmental quality tracking
- Room utilization analytics

## Thinger.io Integration

The Move'O Lite seamlessly integrates with Thinger.io through LoRaWAN network servers, enabling real-time monitoring of temperature, humidity, luminosity, and occupancy data for smart building and IoT applications.

## Requirements

A LoRaWAN server is required to communicate the Watteco Move'O Lite into Thinger.io, some options are:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed a new Product will be created for this device.

### Configuration

The Product is already preconfigured, check that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your desire.

It is important to start the device once fixed to the wall, as the tilt box's pull-out alert function is based on the angle with the vertical.

### Usage

Start sending uplinks for autoprovisioning devices and buckets.
This product also provides a predefined dashboard and downlinks.

## Additional Resources

Watteco resources can be found at:

- [MOVE'O Lite Documentation](https://support.watteco.com/moveo)
- [Watteco Official Website](https://www.watteco.com/)
- [Thinger docs](https://docs.thinger.io)