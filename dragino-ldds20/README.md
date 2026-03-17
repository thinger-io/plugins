# LDDS20 - Liquid Level Sensor

The Dragino LDDS20 consists of an ultrasonic liquid level sensor for measuring liquid levels. It uses a non-contact method to measure the height of liquid in a container without opening the container. The measured liquid levels are sent to a LoRaWAN® network for further analysis.

## Features

- Ultrasonic non-contact liquid level measurement
- Valid measurement range: 20 mm - 2000 mm
- High accuracy: ±(5mm + S × 0.5%) where S is the measured value
- LoRaWAN connectivity for long-range wireless transmission
- Ultra-low power consumption
- Suitable for pure liquid without irregular deposition
- Compatible with non-metal materials less than 10 mm

## Use Cases

- Water tank level monitoring
- Industrial liquid storage management
- Agricultural irrigation systems
- Wastewater treatment monitoring
- Chemical storage tank monitoring
- Remote liquid inventory management

## Thinger.io Integration

The LDDS20 integrates with Thinger.io through a LoRaWAN network server, enabling real-time monitoring and data analysis of liquid level measurements.

## Requirements

A LoRaWAN server is required to communicate the Dragino LDDS20 into Thinger.io, some options are:

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

Dragino resources can be found at:

- [LDDS20 Documentation](https://www.dragino.com/products/lorawan-nb-iot-door-sensor-water-leak/item/181-ldds20.html)
- [Thinger docs](https://docs.thinger.io)