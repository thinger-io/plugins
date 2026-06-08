# Dry Contact - I/O Interface

The Adeunis Dry Contact is a LoRaWAN-enabled I/O interface featuring 4 configurable digital inputs/outputs designed for remote monitoring and control of on-off digital data. It enables connection of various sensors such as contact sensors, double level sensors, water leak detectors, or water leak cables, and reports 0-1 states while controlling relays and equipment.

## Features

- **4 Configurable I/O**: Digital inputs/outputs adaptable to various sensor types
- **LoRaWAN Connectivity**: Class A and Class C support (with external power supply)
- **Flexible Transmission**: Periodic and/or event-based data reporting
- **Event Alerts**: Fault feedback, event detection, access control, and water presence detection
- **Time Tracking**: Count time spent in specific states
- **Remote Control**: Activate or restart equipment remotely or following an event
- **Advanced Management**: Hardware error detection, configuration inconsistency alerts, and low battery notifications
- **Network Quality Test**: At start-up for LoRaWAN connectivity
- **Frame Timestamp**: LoRaWAN timestamping support

## Use Cases

- Contact sensor monitoring
- Water leak detection with spot sensors or cables
- Double level sensor integration
- Relay and equipment control
- Machine operating time measurement
- Access control systems
- Fault feedback and event alerting
- Remote equipment activation and restart

## Technical Specifications

- **Enclosure**: IP67 / IP68 protection rating
- **Dimensions**: 105 x 50 x 27 mm
- **Operating Temperature**: -25°C to 70°C
- **Network Protocol**: LoRaWAN (Class A and Class C)
- **Inputs/Outputs**: 4 configurable digital I/O
- **Transmission Modes**: Periodic and event-based
- **Power**: Battery-powered (low battery alert included) or external power supply for Class C operation

## Thinger.io Integration

This device integrates with Thinger.io through LoRaWAN network server plugins, enabling automatic device provisioning, real-time monitoring of input/output states, and remote relay control.

## Requirements

A LoRaWAN server is required to communicate the Adeunis Dry Contact into Thinger.io, some options are:

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
This product also provides a predefined dashboard and downlinks for remote relay control and configuration.

## Additional Resources

Adeunis resources can be found at:

- [Product Page](https://www.adeunis.com/en/produit/dry-contacts-ip68-iot-sensor)
- [Datasheet](https://lora-alliance.org/wp-content/uploads/2019/07/Datasheet_Dry-Conatcts_IP68_en.pdf)
- [Thinger docs](https://docs.thinger.io)