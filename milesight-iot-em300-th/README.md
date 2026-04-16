# EM300-TH - Temperature & Humidity Sensor

The Milesight LoRaWAN® EM300-TH consists of a temperature and a humidity sensor monitoring indoor and outdoor environments. It is suitable for applications such as greenhouses, cold chains, food prevention, warehouses, residences, offices, and labs. Embedded with a Sensirion high-precision sensor chip, the device offers ultra-wide-distance transmission up to line of sight of 10km and features IP67 UV-resistant and waterproof enclosure.

## Features

- High-precision temperature and humidity measurements using Sensirion sensor chip
- LoRaWAN® Class A wireless communication
- IP67 waterproof and UV-resistant enclosure
- Ultra-long battery life up to 10 years with 10-minute reporting interval
- Long-range transmission up to 10 km line of sight
- Compact design (88 x 27 x 87 mm)
- Wide operating temperature range: -30°C to +70°C
- Humidity measurement range: 0% to 100% RH (non-condensing)
- 4000 mAh battery capacity

## Use Cases

- Greenhouse environmental monitoring
- Cold chain temperature and humidity tracking
- Food storage and preservation monitoring
- Warehouse climate control
- Office and residential comfort monitoring
- Laboratory environment supervision
- Indoor and outdoor climate monitoring

## Thinger.io Integration

The EM300-TH integrates with Thinger.io through LoRaWAN network servers, enabling real-time monitoring and data visualization of temperature and humidity measurements.

## Requirements

A LoRaWAN server is required to communicate the Milesight EM300-TH into Thinger.io, some options are:

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

Start sending uplinks for autoprovisioning devices and buckets. This product also provides a predefined dashboard and downlinks.

## Additional Resources

Milesight resources can be found at:

- [EM300-TH Datasheet](https://resource.milesight.com/milesight/iot/document/em300-th-datasheet-en.pdf)
- [EM300 Series User Guide](https://resource.milesight.com/milesight/iot/document/em300-series-user-guide-en.pdf)
- [Thinger docs](https://docs.thinger.io)