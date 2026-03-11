# LDDS75 - Distance Sensor

The Dragino LDDS75 consists of an ultrasonic detection sensor for measuring the distance between the sensor and a flat object. It is used to measure the distance between the sensor and a flat object. It uses temperature compensation to improve the reliability of data. The measured distance data are sent to a LoRaWAN® network for further analysis.

## Thinger.io Integration

The LDDS75 integrates with Thinger.io through LoRaWAN connectivity, enabling real-time distance monitoring and data visualization. The device transmits ultrasonic distance measurements wirelessly to the Thinger.io platform for processing, analysis, and remote monitoring applications.

## Requirements

A LoRaWAN server is required to communicate the Dragino LDDS75 into Thinger.io, some options are:

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

- [Product Page](https://www.dragino.com/products/lorawan-nb-iot-door-sensor-water-leak/item/181-ldds75.html)
- [User Manual](https://www.dragino.com/downloads/index.php?dir=LoRa_End_Node/LDDS75/)
- [Thinger docs](https://docs.thinger.io)