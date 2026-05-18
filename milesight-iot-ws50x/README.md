# Milesight WS50x Wall Switch

Milesight WS50x is a smart LoRaWAN® wall switch for the local and remote control of lights and electrical appliances. It adopts two standard sizes for most of international wall switch types, which can replace the traditional wall switches directly. Compliant with Milesight LoRaWAN® gateway and Milesight IoT Cloud solution, WS50x can be monitored and controlled via webpage or mobile App remotely and triggered by other Milesight sensors.

## Features

- **Local and Remote Control**: High-reliability relay for switching lights and electrical appliances
- **Energy Monitoring**: Measures current (mA), voltage (VAC), power (W), power factor (%), and electrical consumption
- **Overload Protection**: Built-in protection for safe operation
- **Switch Indicator**: Built-in LED indicator for easy use in dark environments
- **Flexible Scheduling**: Programmable settings to optimize power consumption
- **Standard Compatibility**: Two standard sizes compatible with most international wall switch types
- **Direct Replacement**: Seamlessly replaces traditional wall switches
- **Long Range Communication**: LoRaWAN® connectivity up to 15 km

## Specifications

- **Connectivity**: LoRaWAN®, LoRa D2D
- **Enclosure**: IP30
- **Dimensions**: 40 x 86 x 86 mm
- **Operating Temperature**: -20°C to 60°C
- **Sensors**: Switch control with energy monitoring

## Use Cases

- Smart lighting control in commercial and residential buildings
- Remote appliance management
- Energy consumption monitoring and optimization
- Automated lighting schedules
- Integration with sensor-triggered automation systems

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the Milesight WS50x into Thinger.io, some options are:

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

- [Product Page](https://www.milesight.com/iot/product/lorawan-sensor/ws50x)
- [Documentation](https://www.milesight.com/products/docs/en/ws50x)
- [Thinger docs](https://docs.thinger.io)