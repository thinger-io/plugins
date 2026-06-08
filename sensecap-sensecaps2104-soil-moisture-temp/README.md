# S2104 - LoRaWAN® Soil Moisture and Temperature Sensor

The SenseCAP S2104 is a LoRaWAN® soil moisture and temperature sensor designed for industrial long-distance data acquisition. It measures soil moisture in the range of 0 ~ 100% (m³/m³) and soil temperature from -40 ~ 80℃, making it suitable for smart agriculture, environmental monitoring, and soil sensing applications. The sensor features IP66 waterproof enclosure, Bluetooth 5.0 for configuration and firmware upgrades, and a built-in replaceable battery supporting up to 10 years of operation.

## Features

- **Dual Parameter Measurement:** Soil moisture (0-100% m³/m³) and temperature (-40 to 80°C)
- **LoRaWAN® Connectivity:** Compatible with LoRaWAN® V1.0.3 protocol
- **Long Range Transmission:** Up to 2km in urban environments and 10km in line-of-sight scenarios
- **Extended Battery Life:** 19Ah replaceable battery supporting up to 10 years of operation
- **Bluetooth 5.0:** Easy configuration and firmware updates
- **Industrial Grade:** IP66 enclosure, operating temperature range -40°C to 85°C
- **Flexible Network Architecture:** Supports three different LoRaWAN® network architectures
- **Compact Design:** 25 x 9.5 x 9 mm dimensions

## Thinger.io Integration

The SenseCAP S2104 integrates with Thinger.io through LoRaWAN® network servers, enabling real-time monitoring of soil conditions, data visualization, and alerts for agricultural and environmental applications.

## Requirements

A LoRaWAN® server is required to communicate the SenseCAP S2104 into Thinger.io. Compatible options include:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

The corresponding plugin for the selected LoRaWAN® server must be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed, a new Product will be created for this device.

### Configuration

The Product is already preconfigured. Check that the auto provision prefix matches the one selected in your LoRaWAN® server plugin in Thinger.io, or change it to your preference.

### Usage

Start sending uplinks for autoprovisioning devices and buckets. This product provides automated data ingestion for soil moisture and temperature measurements, along with predefined dashboards for monitoring soil conditions.

## Additional Resources

SenseCAP resources can be found at:

- [SenseCAP Documentation](https://www.seeedstudio.com/sensecap)
- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/sensecap/sensecaps2104-soil-moisture-temp)
- [Thinger.io Documentation](https://docs.thinger.io)