# IOT4-LORA-TH - Temperature & Humidity Sensor

The IOT4-LORA-TH is a LoRaWAN temperature and humidity sensor designed for remote environmental monitoring applications. This compact sensor supports both LoRaWAN and Helium networks, enabling long-range wireless data transmission for IoT deployments. With its robust design and accurate sensing capabilities, the device is suitable for indoor and outdoor monitoring scenarios where environmental conditions need to be tracked reliably.

## Thinger.io Integration

The IOT4-LORA-TH integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling automatic device provisioning, real-time data visualization, and remote monitoring capabilities. The integration allows users to leverage Thinger.io's cloud platform for data storage, analytics, and dashboard creation.

## Requirements

A LoRaWAN server is required to communicate the IOT4-LORA-TH into Thinger.io, some options are:

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

## Technical Specifications

- **Sensors**: Temperature and Humidity
- **Dimensions**: 77 x 34 x 77 mm
- **Operating Temperature**: -30°C to 85°C
- **Connectivity**: LoRaWAN and Helium compatible

## Additional Resources

- [Thinger.io Documentation](https://docs.thinger.io)