# EM300-MCS - Contact Sensor

The Milesight LoRaWAN® EM300-MCS magnetic contact switch can be mounted to any door or window to detect an opening or closing event. It adds physical security monitoring to your location by alarming for intrusion or unauthorized entry to your monitored conditions. This compact sensor is designed for detecting open/close status of objects and transmitting alarm events using LoRaWAN® technology with IP67 waterproof protection.

## Features

- **Magnetic Contact Switch**: Detects open/close status of doors, windows, and other objects
- **Long Battery Life**: Up to 10 years with 4000 mAh ER18505 Li-SOCl₂ battery (8000 mAh optional)
- **LoRaWAN® Connectivity**: Low power consumption wireless communication
- **IP67 Waterproof**: Suitable for harsh environments
- **NFC Configuration**: Easy device setup and configuration via NFC
- **Compact Design**: 88 x 27 x 87 mm dimensions
- **Wide Operating Range**: -30°C to 70°C temperature range
- **Integrated Sensors**: Battery monitoring, temperature, and digital input

## Use Cases

- **Physical Security**: Intrusion detection and unauthorized entry monitoring
- **Building Automation**: Door and window status monitoring
- **Access Control**: Entry point monitoring for restricted areas
- **Facility Management**: Equipment cabinet and enclosure monitoring
- **Smart Buildings**: Integration with building management systems

## Thinger.io Integration

The EM300-MCS integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time monitoring of contact sensor events, battery status, and temperature data.

## Requirements

A LoRaWAN server is required to communicate the Milesight EM300-MCS into Thinger.io, some options are:

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

Milesight resources can be found at:

- [Product Page](https://www.milesight-iot.com/lorawan/sensor/em300-series/)
- [Thinger docs](https://docs.thinger.io)