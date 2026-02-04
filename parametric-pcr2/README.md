# PCR2 Radar People Counter

The Parametric PCR2 people counter uses radar signals to provide a camera-less solution. Utilising LoRaWAN™ technology, these sensors transmit data at regular intervals. With bi-directional counting, the Parametric PCR2 people counter registers people passing by from left or right.

## Features

- **Radar-based Detection**: 24.125 GHz integrated dual channel radar transmitter for accurate people counting
- **Bi-directional Counting**: Detects and counts people passing from both left and right directions
- **Camera-less Solution**: Privacy-friendly monitoring without visual surveillance
- **Visual Feedback**: 2 LEDs for counting signalization
- **LoRaWAN Connectivity**: Long-range wireless data transmission using LoRaWAN™ V1.0 protocol
- **Compact Design**: Slim line enclosure with hidden fixing points (125 x 100 x 40 mm)
- **Wide Operating Range**: Functions in temperatures from -20°C to 70°C

## Use Cases

- Retail foot traffic monitoring
- Building occupancy management
- Event attendance tracking
- Public space utilization analysis
- Smart building applications
- Workplace density monitoring

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the Parametric PCR2 into Thinger.io, some options are:

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

Parametric resources can be found at:

- [Documentation](https://lora-alliance.org/wp-content/uploads/2019/07/PCR2-IN_Datasheet_en-06.pdf)
- [Thinger docs](https://docs.thinger.io)