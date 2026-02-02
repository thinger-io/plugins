# Pressure Transducer

The Moire Labs Digital pressure transducer P1AP is a telemetry-enabled, battery-powered pressure sensor, which is primarily used to measure pressure in distribution pipes of gasses or liquids and sending the measured data over the wireless network into centralized measurement systems such as SCADA.

## Thinger.io Integration

The P1AP pressure transducer uses LoRaWAN connectivity to transmit pressure measurements to cloud platforms. This device integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling remote monitoring of pipeline pressure in water distribution networks, gas distribution systems, and industrial fluid monitoring applications.

## Requirements

A LoRaWAN server is required to communicate the Moire Labs P1AP into Thinger.io, some options are:

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

Moire Labs resources can be found at:

- [Moire Labs Website](https://iotransducer.com)
- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/moirelabs/p1ap/)
- [Thinger docs](https://docs.thinger.io)