# EM500-CO2 - Air Quality Sensor

The Milesight EM500-CO2 is a LoRaWAN air quality sensor that integrates CO2, temperature, humidity, and barometric pressure sensors for measuring gaseous carbon dioxide concentration in harsh environments. It is useful in applications where knowing CO2 level is important such as greenhouses, wine cellars, building ventilation, and fruit and vegetable storage.

## Features

- **4-in-1 Sensor Integration**: Measures CO2, temperature, humidity, and barometric pressure
- **LoRaWAN Connectivity**: Long-range wireless communication with low power consumption
- **Rugged Design**: IP66 enclosure for harsh environment deployment
- **Extended Battery Life**: Up to 10 years of operation with optimized power management
- **Wide Operating Range**: -30°C to 70°C temperature range
- **Compact Form Factor**: 147.9 x 69.5 x 71 mm dimensions

## Use Cases

- Greenhouse monitoring and climate control
- Wine cellar environmental management
- Building ventilation and HVAC optimization
- Fruit and vegetable storage facilities
- Indoor air quality monitoring
- Agricultural environment control

## Thinger.io Integration

The EM500-CO2 integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time monitoring and data visualization of air quality parameters.

## Requirements

A LoRaWAN server is required to communicate the Milesight EM500-CO2 into Thinger.io, some options are:

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

- [User Guide](https://resource.milesight.com/milesight/iot/document/em500-co2-user-guide-en.pdf)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/milesight-iot/em500-co2/)
- [Thinger.io Documentation](https://docs.thinger.io)