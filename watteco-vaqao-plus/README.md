# Vaqa'O+Plus - Temp/Hum/VOC/IAQ/CO2/Motion Sensor

The WATTECO Vaqa'O+ has sensors for measuring temperature, relative humidity, atmospheric pressure, IAQ based on concentration of volatile organic compounds (VOC), and carbon dioxide (CO2) in the ambient air of a room in a building, an apartment, or a house. It allows Indoor Air Quality (IAQ) monitoring based on the presence of individuals using luminosity (lighting) and motion (PIR) detection in the room. The data is transmitted via a public or private LoRaWAN® network.

## Features

- Temperature measurement (0°C to 55°C operating range)
- Relative humidity monitoring
- Atmospheric pressure sensing
- VOC concentration detection for air quality assessment
- CO2 concentration measurement
- Indoor Air Quality (IAQ) index calculation based on Static IAQ
- Luminosity sensor for lighting detection
- PIR motion sensor for presence detection
- LoRaWAN Class A communication
- Compact design: 80 x 120 x 25 mm

## Power Supply

The Vaqa'O+ is powered by 3 x 3.6V/2500mAh AA Lithium batteries. With the default configuration (one measurement on all sensors every 10 minutes), the sensor autonomy exceeds 3 years. Alternative external power supply from 3.6V to 24V is supported.

## Use Cases

- Indoor Air Quality monitoring in buildings, apartments, and houses
- Workplace air quality compliance
- Energy efficiency optimization through presence detection
- Educational facilities and establishments receiving minors
- Smart building automation

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the WATTECO Vaqa'O+Plus into Thinger.io, some options are:

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

WATTECO resources can be found at:

- [WATTECO Support - Vaqa'O](https://support.watteco.com/vaqao)
- [Thinger docs](https://docs.thinger.io)