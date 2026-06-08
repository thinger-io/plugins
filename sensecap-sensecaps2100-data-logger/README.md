# S2100 LoRaWAN® Data Logger

The SenseCAP S2100 LoRaWAN® Data Logger is an easy-to-deploy, industrial-grade LoRaWAN® sensor hub that can support 100+ industrial sensors including various sensor types such as 0~5V / 4~20mA / RS485. Equipped with a built-in Wio-E5 LoRa module, it provides long-range wireless transmission and supports multiple industrial protocols including RS485 Modbus-RTU, analog voltage, and current inputs.

## Features

- **Multi-Protocol Support**: Compatible with analog voltage (0-5V), analog current (4-20mA), RS485 Modbus-RTU, I2C, UART, and GPIO interfaces
- **Wide Sensor Compatibility**: Supports 100+ industrial sensors for various measurement applications
- **Industrial-Grade Design**: IP66-rated enclosure for harsh environmental conditions
- **Wide Operating Temperature**: -40°C to 85°C operational range
- **Long Battery Life**: Up to 10 years battery life with built-in 19Ah Li-SOCl2 high-capacity battery
- **Built-in LoRa Module**: Wio-E5 microcontroller with LoRaWAN connectivity
- **User-Friendly Configuration**: SenseCAP Mate App for easy setup and configuration
- **Compact Design**: 25 x 9.5 x 9 mm dimensions

## Use Cases

- Industrial process monitoring with 4-20mA sensors
- Environmental monitoring with RS485 sensors
- Level and pulse sensor applications
- Multi-parameter data logging (temperature, humidity, pressure, light intensity)
- Remote facility management
- Smart agriculture monitoring
- Building automation systems

## Thinger.io Integration

The SenseCAP S2100 integrates with Thinger.io through LoRaWAN network servers, enabling seamless data ingestion, device management, and visualization capabilities.

## Requirements

A LoRaWAN server is required to communicate the SenseCAP S2100 into Thinger.io, some options are:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed a new Product will be created for this device.

### Configuration

The Product is already preconfigured, check that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your desire.

Configure the S2100 using the SenseCAP Mate App to:
- Set LoRaWAN parameters (DevEUI, AppEUI, AppKey)
- Configure sensor protocols (analog, RS485, level/pulse)
- Define measurement intervals and data transmission settings

### Usage

Start sending uplinks for autoprovisioning devices and buckets.
This product also provides a predefined dashboard and downlinks.

## Additional Resources

SenseCAP resources can be found at:

- [User Guide](https://files.seeedstudio.com/products/SenseCAP/S2100/SenseCAP%20S2100%20LoRaWAN%20Data%20Logger%20User%20Guide.pdf)
- [Sensor Configuration Template Guide](https://files.seeedstudio.com/products/SenseCAP/S2100/How_to_Configure_the_Template_for_S2100_Data_Logger.pdf)
- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/sensecap/sensecaps2100-data-logger)
- [Thinger.io Documentation](https://docs.thinger.io)