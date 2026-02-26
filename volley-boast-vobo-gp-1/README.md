# VoBo-GP-1 - Input Endpoint

The VoBo-GP-1 is a general-purpose universal LoRaWAN bridge designed to convert wired sensors and transmitters into LoRaWAN enabled wireless devices. This battery-powered endpoint provides multiple I/O interfaces for industrial monitoring and control applications, featuring flexible analog and digital inputs with configurable parameters.

## Key Features

- **Analog Inputs**: 3 analog inputs, individually jumper selectable between 4-20 mA, 0-10 Vdc, or 0-5 Vdc
- **Digital Inputs**: 3 discrete digital inputs, jumper configurable between dry contact and voltage sensing
- **Wake-up Input**: 1 dedicated wake-up input for exception-based reporting and event-driven notifications
- **Digital Output**: 1 open drain output (24V, 1A max) for custom applications
- **Serial Interface**: RS-485 port with Master/Slave functionality supporting up to 41 16-bit registers
- **Power Supply**: User-replaceable D-cell lithium thionyl chloride primary battery
- **Radio Range**: Up to 10 miles line of sight
- **Radio Frequency**: 915 MHz (US), with 868 MHz (EU) and AU 915 MHz available by special order
- **Encryption**: AES 128
- **Flash Memory**: 16 MB for data logging and configuration files
- **Antenna**: Internal flexible antenna, 1.4 dBi
- **Microprocessor**: ARM Cortex-M4
- **LoRaWAN Compliance**: LoRaWAN 1.0.4
- **Enclosure**: IP66 rated
- **Temperature Range**: -35°C to 80°C
- **Dimensions**: 193 x 79 x 117 mm

## Use Cases

- Remote sensor monitoring with 4-20 mA transmitters
- Pulse counting and event notification
- High-low level switch monitoring
- Voltage and current measurement
- Industrial automation and SCADA integration
- Environmental monitoring with analog sensors

## Thinger.io Integration

The VoBo-GP-1 seamlessly integrates with Thinger.io through LoRaWAN network servers, enabling remote monitoring, configuration, and data visualization of connected sensors and I/O devices.

## Requirements

A LoRaWAN server is required to communicate the VoBo-GP-1 into Thinger.io, some options are:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed a new Product will be created for this device.

### Configuration

The Product is already preconfigured, check that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your desire.

The device supports over-the-air (OTA) configuration for the following parameters:

- Cycle time (default: 30 minutes)
- Analog sensor voltage (default: 12V, range: 5-24V)
- Sensor settling time (default: 1 second)
- Number of resend attempts
- Resend delay
- Failed transmissions prior to rejoin
- Adaptive Data Rate (default: On)
- Transmission receipt acknowledgment (default: On)

### Usage

Start sending uplinks for autoprovisioning devices and buckets.
This product also provides a predefined dashboard and downlinks.

## Additional Resources

Volley Boast resources can be found at:

- [Product Page](https://volleyboast.com/purchase/vobo-gp1/)
- [Datasheet](https://volleyboast.com/products/latest/vobogp1/datasheet)
- [TTN Device Repository](https://www.thethingsnetwork.org/device-repository/devices/volley-boast/vobo-gp-1/)
- [Thinger docs](https://docs.thinger.io)