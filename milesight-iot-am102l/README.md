# Milesight 2-in-1 IAQ Sensor - AM102L

The Milesight AM102L is a compact indoor ambience monitoring sensor designed for measurement of temperature and humidity. These data are displayed on the E-ink screen in real-time, allowing users to quantify the indoor environment and comfort levels. The device features low-power LoRaWAN connectivity and can operate for more than 7 years on 2 replaceable batteries.

## Features

- **Temperature Monitoring**: Measures ambient temperature with real-time display
- **Humidity Monitoring**: Tracks relative humidity levels
- **E-ink Display**: Shows sensor data and network status in real-time
- **Long Battery Life**: More than 7 years operation on 2 replaceable batteries
- **Compact Design**: 68 x 20.5 x 65 mm dimensions
- **LoRaWAN Connectivity**: Wireless long-range communication
- **Operating Temperature**: -20°C to 60°C
- **Screen Smart Mode**: Updates data every 2 minutes with periodic full-screen refresh to remove ghosting

## Use Cases

- Indoor air quality monitoring
- Office environment monitoring
- Building management systems
- Smart home applications
- Warehouse environmental monitoring
- Healthcare facility monitoring
- School and educational facility monitoring

## Thinger.io Integration

The Milesight AM102L integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling remote monitoring, data visualization, and automated alerts for temperature and humidity measurements.

## Requirements

A LoRaWAN server is required to communicate the Milesight AM102L into Thinger.io, some options are:

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

- [AM102L Datasheet](https://resource.milesight.com/milesight/iot/document/am102-and-am102l-datasheet-en.pdf)
- [User Guide](https://resource.milesight.com/milesight/iot/document/am102(l)-and-am103(l)-user-guide-en.pdf)
- [Milesight IoT](https://www.milesight.com/)
- [Thinger docs](https://docs.thinger.io)