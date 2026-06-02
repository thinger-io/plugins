# Bob Assistant - Vibration Sensor

The BoB Assistant is a low power LoRaWAN compatible vibration sensor designed for indoor and outdoor predictive maintenance industrial applications. It monitors the vibration signature of industrial equipment such as pumps, ventilation systems, and other machinery to enable remote monitoring and anomaly detection. The device integrates a temperature sensor for environmental condition monitoring, a push button, and an RGB LED for user interface interaction.

## Features

- **Vibration Monitoring**: Dual frequency range analysis
  - 0 to 400 Hz (±3 Hz)
  - 0 to 12.4 kHz (±100 Hz)
- **Temperature Sensor**: Environmental condition monitoring
- **LoRaWAN Connectivity**: Class A operation for low power consumption
- **Autonomous Operation**: Over 4 years battery autonomy
- **Robust Design**: IP68 enclosure rating for harsh environments
- **Compact Form Factor**: 79 x 76 x 23 mm
- **Operating Temperature**: -20°C to 60°C
- **User Interface**: Push button and RGB LED for configuration and status indication

## Use Cases

- Predictive maintenance of rotating equipment
- Industrial pump monitoring
- Ventilation system health tracking
- Motor vibration analysis
- Early fault detection in machinery
- Remote equipment condition monitoring

## Thinger.io Integration

The BoB Assistant integrates with Thinger.io through LoRaWAN network servers, enabling centralized data collection, visualization, and alerting for predictive maintenance applications.

## Requirements

A LoRaWAN server is required to communicate the BoB Assistant into Thinger.io, some options are:

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

BoB Assistant resources can be found at:

- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/nke-watteco/bob-assistant)
- [Thinger docs](https://docs.thinger.io)