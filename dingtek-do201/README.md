# DO201 - Parking Occupancy Sensor

The CNDingtek DO201 is a smart parking occupancy sensor with combination of ultrasonic and magnetic detection, temperature and humidity measurement. Designed for accurate vehicle detection in parking spaces, it provides 99% detection accuracy with IP68/IK10 enclosure rating, making it suitable for harsh outdoor environments.

## Features

- **Dual Detection Technology**: Ultrasonic and magnetic sensors for reliable vehicle presence detection
- **Environmental Monitoring**: Built-in temperature and humidity sensors
- **High Accuracy**: 99% detection precision
- **Robust Design**: IP68 waterproof and IK10 impact-resistant enclosure
- **Long Battery Life**: 25500mAh battery capacity (ER26500×3, 3.6V)
- **Low Power Consumption**: Energy-efficient design for extended operation
- **Compact Form Factor**: 183mm diameter, 38mm height
- **Wide Operating Temperature**: -20°C to 70°C
- **LoRaWAN Connectivity**: Long-range wireless communication

## Use Cases

- Smart parking lot management
- Urban parking space monitoring
- Commercial parking facilities
- Street parking detection
- Real-time parking availability systems

## Thinger.io Integration

The DO201 parking sensor integrates with Thinger.io through LoRaWAN connectivity, enabling real-time monitoring of parking occupancy status, temperature, and humidity data.

## Requirements

A LoRaWAN server is required to communicate the CNDingtek DO201 into Thinger.io, some options are:

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

CNDingtek resources can be found at:

- [Product Page](https://www.dingtek.com/smart-parking-occupancy-sensor-do201)
- [TTN Device Repository](https://www.thethingsnetwork.org/device-repository/devices/dingtek/do201)
- [Thinger docs](https://docs.thinger.io)