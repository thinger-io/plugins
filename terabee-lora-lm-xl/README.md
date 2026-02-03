# LoRa Level Monitoring XL

The Terabee LoRa Level Monitoring XL is a wireless IoT device designed to monitor material fill levels inside silos and tanks. Using LED Time-of-Flight technology, the device provides non-intrusive inventory management with measurement capabilities reaching up to 60 meters, making it suitable for applications ranging from small containers to the largest industrial silos.

## Features

- **Long-range measurement**: Up to 60m measurement range using LED Time-of-Flight technology
- **LoRaWAN connectivity**: Wireless data transmission for remote monitoring
- **Self-powered operation**: Years of autonomy with standard Type D battery (3.6V, 19Ah, replaceable)
- **Contactless monitoring**: Non-intrusive level sensing without physical contact with materials
- **IP65 rated enclosure**: Protection against dust and water ingress for industrial environments
- **Easy installation**: Fast, cable-free setup process
- **Configuration software**: Free software for device configuration via USB connection

## Use Cases

- Industrial silo level monitoring
- Tank inventory management
- Grain and agricultural storage monitoring
- Bulk material level tracking
- Remote asset management
- Supply chain optimization

## Technical Specifications

- **Measurement range**: Up to 60 meters
- **Technology**: LED Time-of-Flight
- **Connectivity**: LoRaWAN
- **Power supply**: Type D battery, 3.6V, 19Ah (replaceable)
- **Battery life**: Years of autonomy
- **Enclosure rating**: IP65
- **Configuration interface**: USB 2.0 Micro-B

## Thinger.io Integration

The LoRa Level Monitoring XL integrates with Thinger.io through LoRaWAN network servers, enabling remote monitoring, data visualization, and automated alerts for level management applications.

## Requirements

A LoRaWAN server is required to communicate the LoRa Level Monitoring XL into Thinger.io, some options are:

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

Start sending uplinks for autoprovisioning devices and buckets. This product also provides a predefined dashboard for monitoring level data and visualizing tank or silo fill status.

## Additional Resources

Terabee resources can be found at:

- [Terabee Official Website](https://www.terabee.com/)
- [Product Specification Sheet](https://pdf.agriexpo.online/pdf/terabee/terabee-lora-level-monitoring-xl-specification-sheet/189008-35467.html)
- [LoRaWAN Device Repository](https://www.thethingsnetwork.org/device-repository/devices/terabee/lora-lm-xl/)
- [Thinger.io Documentation](https://docs.thinger.io)