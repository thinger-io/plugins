# Analog - Sensor Interface

The Adeunis Analog has 2 inputs for connecting 0-10 V or 4-20 mA sensors and provides LoRaWAN® connectivity to industrial analog/analog PWM sensors already installed on the production sites. This device simplifies the integration of existing analog sensors into LoRaWAN networks without requiring significant modifications to current installations.

## Features

- 2 analog inputs independently configurable as 0-10 V or 4-20 mA
- 2 digital inputs associated with analog inputs
- IP67 rated enclosure for industrial environments
- LoRaWAN® connectivity for long-range wireless communication
- Compatible with industrial analog and PWM sensors
- Multiple data transmission modes

## Use Cases

- Industrial process monitoring
- Remote sensor data collection
- Retrofitting existing analog sensor installations
- Building automation systems
- Environmental monitoring in industrial settings

## Thinger.io Integration

The Adeunis Analog device integrates with Thinger.io through LoRaWAN network servers, enabling real-time monitoring and management of analog sensor data in industrial environments.

## Requirements

A LoRaWAN server is required to communicate the Adeunis Analog into Thinger.io, some options are:

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

Adeunis resources can be found at:

- [Product Page](https://www.adeunis.com/en/produit/analog-wired-sensor-interface/)
- [Datasheet](https://www.adeunis.com/wp-content/uploads/2019/09/Datasheet_ADEUNIS_ANALOG-en.pdf)
- [Thinger docs](https://docs.thinger.io)