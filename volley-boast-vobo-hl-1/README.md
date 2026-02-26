# VoBo-HL-1 - Input Endpoint

The VoBo HL-1 is an industrial grade, multiple input, universal LoRaWAN bridge endpoint certified for use in Class 1 Division 2 hazardous locations. It converts wired instrumentation into LoRaWAN enabled wireless devices, allowing legacy sensors and transmitters to communicate over LoRaWAN networks.

The device features a rugged enclosure with internal antenna that permits installation in challenging environments, including hazardous areas with flammable gases such as Ethylene, Propane, and Methane (Class I, Division 2, Groups C, D; Class II, Division 2, Groups F, G).

## Features

- Three analog inputs for connecting sensors and transmitters
- Three discrete digital inputs for monitoring status and events
- One wake-up input for triggered events
- One RS-485 input for Modbus RTU devices
- LoRaWAN 1.0 compliant
- US915 (902-928 MHz) channel plan
- Up to 6 miles transmission range (line of sight)
- Battery powered with D-Cell user-replaceable primary battery
- Class 1 Division 2 hazardous location certification
- Industrial grade construction with internal antenna

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the VoBo-HL-1 into Thinger.io, some options are:

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

Volley Boast resources can be found at:

- [VoBo HL-1 Installation Manual](https://volleyboast.com/products/latest/vobohl1/installation-manual)
- [Volley Boast Documentation](https://volleyboast.com/documentation/)
- [Product Information](https://volleyboast.com/purchase/vobo-hl-1/)
- [Thinger docs](https://docs.thinger.io)