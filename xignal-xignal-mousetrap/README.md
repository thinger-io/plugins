# Mouse Trap

The Xignal Mouse Trap by DimoSystems is an intelligent mechanical mouse trap equipped with advanced sensor technology that monitors pest activity 24/7. The device uses LoRaWAN connectivity to transmit real-time trap status updates, eliminating the need for manual inspection and enabling proactive rodent control management.

## Features

- Real-time trap status monitoring (armed/unarmed/catch detected)
- Temperature sensing and monitoring
- Battery level reporting
- Movement detection capabilities
- LoRaWAN connectivity (868 MHz or 902-928 MHz versions available)
- IP67 rated enclosure for harsh environments
- Operating temperature range: -30°C to 85°C
- Compact dimensions: 97 x 47 x 58 mm
- Daily automated status updates
- Non-toxic mechanical trapping solution

## Use Cases

- Commercial pest control management
- Industrial facility monitoring
- Food processing and storage facilities
- Warehouse and logistics centers
- Healthcare and hospitality environments
- Remote location rodent control
- Compliance monitoring for food safety standards

## Thinger.io Integration

The Xignal Mouse Trap integrates seamlessly with Thinger.io through LoRaWAN, providing centralized monitoring and alerting for pest control operations. Real-time notifications enable immediate response to trap events, optimizing pest management workflows and reducing operational costs.

## Requirements

A LoRaWAN server is required to communicate the Xignal Mouse Trap into Thinger.io, some options are:

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
This product also provides a predefined dashboard for monitoring trap status, temperature readings, and battery levels.

## Additional Resources

Xignal resources can be found at:

- [Official Website](https://xignal.com)
- [Product Specifications](https://www.xignal.com/wp-content/uploads/2020/08/Dimo-Systems-Mousetrap-Specifications.pdf)
- [Thinger docs](https://docs.thinger.io)