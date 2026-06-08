# Wireless Soil Moisture and Temperature Sensor - LoRaWAN®

The Seeed Studio SenseCAP Wireless Soil Moisture and Temperature Sensor measures soil volumetric water content (VWC) and temperature. It is designed with a 2-in-1 sensor probe that integrates soil temperature and soil moisture measurement, a custom battery, and an IP66 enclosure, optimized for outdoor use cases that need reliable data collection over years. With its high-quality soil moisture and temperature probe, this sensor features high precision and sensitivity regardless of soil variability, making it widely applicable in industrial IoT (IIoT) scenarios such as water-saving irrigation, outdoor fields, greenhouses, and more. To minimize power consumption, the device wakes up, transmits the collected soil moisture and temperature data to the gateway, and then goes back to sleep.

## Key Features

- **Soil Moisture Measurement**: 0 to 100% (m³/m³) volumetric water content
- **Temperature Measurement**: -40°C to +80°C with ±0.3°C accuracy and 0.1°C resolution
- **LoRaWAN Connectivity**: Based on LoRaWAN v1.0.2 protocol
- **Long Range**: 2 to 10 km communication distance (depending on antenna and environment)
- **Extended Battery Life**: ≥ 3 years (with data upload once per hour)
- **Robust Design**: IP66 rated enclosure, IP65 rated sensor probe
- **Wide Operating Range**: -40°C to +85°C operating temperature
- **Multi-Regional Support**: EU868, US915, AU915, AS923 frequency bands
- **Low Power Consumption**: 5 μA in sleep mode
- **Durable Construction**: UV-resistant enclosure material (PC) with anti-aging properties

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the SenseCAP Wireless Soil Moisture and Temperature Sensor into Thinger.io, some options are:

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

SenseCAP resources can be found at:

- [Product Information](https://solution.seeedstudio.com/product/sensecap-wireless-soil-moisture-and-temperature-sensor-lorawan)
- [SenseCAP Documentation](https://sensecap-docs.seeed.cc/)
- [User Manual](https://files.seeedstudio.com/products/SenseCAP/102991155/SenseCAP%20LoRaWAN%20Sensor%20User%20Manual-V1.1.pdf)
- [Thinger docs](https://docs.thinger.io)