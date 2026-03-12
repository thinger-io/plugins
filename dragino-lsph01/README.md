# LSPH01 - Soil pH Sensor

The Dragino LSPH01 is a LoRaWAN Soil pH Sensor designed for smart agriculture applications. It is an IP68 waterproof device engineered to measure soil pH levels and soil temperature to analyze the soil acid or alkaline content. The LSPH01 probe is constructed with solid AgCl sensor technology, providing reliable measurements in agricultural and environmental monitoring scenarios.

## Features

- **LoRaWAN 1.0.3 Class A** protocol support
- **pH Measurement Range**: 3 to 10 pH
- **pH Resolution**: 0.01 pH
- **Accuracy**: ±0.1 pH (±2% under 0~50°C conditions)
- **Temperature Compensation Range**: 0 to 50°C
- **Soil Temperature Monitoring**: Integrated temperature sensor
- **Battery Level Monitoring**: Real-time battery status reporting
- **Ultra-low Power Consumption**: Optimized for long-term deployment
- **IP68 Waterproof Rating**: Suitable for outdoor and soil burial applications
- **Solid AgCl Probe**: Durable sensor construction for reliable long-term measurements

## Use Cases

- Smart agriculture and precision farming
- Soil health monitoring
- Greenhouse and nursery management
- Research and environmental monitoring
- Crop optimization through pH level tracking

## Thinger.io Integration

The LSPH01 integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time data visualization, storage, and analysis of soil pH and temperature measurements.

## Requirements

A LoRaWAN server is required to communicate the Dragino LSPH01 into Thinger.io, some options are:

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

Dragino resources can be found at:

- [Dragino LSPH01 Product Page](https://www.dragino.com/products/lora-lorawan-end-node/item/177-lsph01.html)
- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/dragino/lsph01/)
- [Thinger.io Documentation](https://docs.thinger.io)