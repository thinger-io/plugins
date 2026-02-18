# Sentrius RS1xx Temp-RH Sensor

The Laird Sentrius™ RS1xx Temp/-RH has a temperature sensor, humidity sensor, and an external open/closed detection sensor making it a perfect fit for cold chain applications. It uses LoRaWAN® and Bluetooth Low Energy (BLE) for data communication. The robust IP65 sensor enclosure allows it to be used in harsh environments.

## Features

- **Temperature Sensor**: Monitors ambient temperature for cold-chain applications
- **Humidity Sensor**: Tracks relative humidity levels
- **External Open/Closed Detection**: Integrated sensor for door/access monitoring
- **Dual Connectivity**: LoRaWAN and Bluetooth Low Energy (BLE) communication
- **Data Storage**: Stores sensor data locally when LoRaWAN network is unavailable for later retrieval
- **Rugged Design**: IP65-rated enclosure for harsh industrial environments
- **Integrated Antennas**: Built-in antennas for simplified installation
- **Operating Temperature**: -25°C to 50°C
- **Compact Dimensions**: 116 x 91 x 34 mm

## Use Cases

- Cold chain monitoring and logistics
- Pharmaceutical storage monitoring
- Food transportation and storage
- Warehouse environmental monitoring
- Industrial facility climate control
- Refrigeration unit monitoring

## Thinger.io Integration

The Sentrius RS1xx Temp-RH Sensor integrates with Thinger.io through LoRaWAN network servers, enabling real-time monitoring and data visualization of temperature, humidity, and door/access status.

## Requirements

A LoRaWAN server is required to communicate the Sentrius RS1xx Temp-RH Sensor into Thinger.io, some options are:

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

Laird Connectivity (Ezurio) resources can be found at:

- [Sentrius RS1xx User Guide](http://assets.lairdtech.com/home/brandworld/files/Sentrius%20RS1xx%20User%20Guide%20v1_0.pdf)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/laird/rs1xx-temp-rh-sensor/)
- [Thinger docs](https://docs.thinger.io)