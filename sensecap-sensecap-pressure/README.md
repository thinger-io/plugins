# Wireless Barometric Pressure Sensor - LoRaWAN®

The Seeed Studio SenseCAP Wireless Barometric Pressure Sensor measures atmospheric pressure, featuring high-precision, stability, and high EMC robustness. It's designed with an air pressure sensor, a custom battery, and an industry-grade enclosure, optimized for outdoor use cases that need reliable data collected over years. The collected data is sent over the LoRaWAN® network for further processing and decision making.

## Features

- **Barometric Pressure Measurement**: Range of 300 hPa to 1100 hPa with 1 Pa resolution
- **LoRaWAN Connectivity**: Based on LoRaWAN v1.0.2 protocol
- **Long Range Communication**: Sensitivity of -137.5 dBm (SF12, BW125kHz)
- **Low Power Consumption**: 5 μA in sleep mode, 120 mA max in active mode
- **LoRa Power Output**: 16 dBm (EIRP)
- **Ultra-Low-Power MCU**: Optimized for long-term battery operation
- **Industry-Grade Enclosure**: Designed for outdoor deployment
- **High EMC Robustness**: Reliable operation in challenging environments

## Use Cases

- Weather monitoring stations
- Environmental monitoring systems
- Agricultural applications
- Smart city infrastructure
- Industrial outdoor installations
- Long-term atmospheric pressure tracking

## Thinger.io Integration

The SenseCAP Wireless Barometric Pressure Sensor can be integrated into Thinger.io through LoRaWAN network servers, enabling real-time monitoring, data visualization, and automated decision-making based on atmospheric pressure measurements.

## Requirements

A LoRaWAN server is required to communicate the SenseCAP Wireless Barometric Pressure Sensor into Thinger.io, some options are:

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

Start sending uplinks for autoprovisioning devices and buckets. This product also provides a predefined dashboard for monitoring atmospheric pressure data.

## Additional Resources

Seeed Studio resources can be found at:

- [SenseCAP Documentation](https://sensecap-docs.seeed.cc/)
- [Product Page](https://solution.seeedstudio.com/product/sensecap-lorawan-barometric-pressure-sensor)
- [Thinger.io Documentation](https://docs.thinger.io)