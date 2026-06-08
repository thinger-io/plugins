# Ventil'O - Pressure & Temperature Sensor

The WATTECO Ventil'O is a LoRaWAN sensor designed for measuring pressure and temperature in vacuums established by outdoor ventilation chambers. This industrial-grade device provides accurate monitoring of air pressure differentials and ambient temperature, making it ideal for HVAC systems and ventilation infrastructure.

## Features

- **Pressure Monitoring**: Air pressure differential measurement for ventilation systems
- **Temperature Sensing**: Ambient temperature measurement with 0.1°C resolution
- **LoRaWAN Connectivity**: Class A LoRaWAN protocol for long-range communication
- **Robust Design**: IP65 enclosure for outdoor and industrial environments
- **Compact Form Factor**: 92 x 92 x 56 mm dimensions
- **Battery Powered**: 3.6V A-type disposable battery
- **Internal Antenna**: Integrated LoRaWAN antenna

## Technical Specifications

- **Protocol**: LoRaWAN Class A
- **Temperature Range**: -20°C to +60°C
- **Temperature Accuracy**: ±2°C between -10°C and +60°C
- **Temperature Resolution**: 0.1°C
- **Enclosure**: IP65
- **Dimensions**: 92 x 92 x 56 mm
- **Operating Temperature**: -20°C to 60°C
- **Power Supply**: 3.6V A-type disposable battery

## Use Cases

- Outdoor ventilation chamber monitoring
- HVAC system performance tracking
- Industrial ventilation control
- Building management systems
- Energy efficiency monitoring

## Thinger.io Integration

The WATTECO Ventil'O integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time monitoring and data visualization of pressure and temperature measurements.

## Requirements

A LoRaWAN server is required to communicate the WATTECO Ventil'O into Thinger.io, some options are:

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

WATTECO resources can be found at:

- [WATTECO Support](https://support.watteco.com/ventilo)
- [Thinger docs](https://docs.thinger.io)