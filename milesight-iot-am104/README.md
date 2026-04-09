# Milesight AM104 - LoRaWAN® Indoor Air Quality Sensor (4 in 1)

The Milesight AM104 is a compact indoor ambience monitoring sensor that supports long-lasting battery life, wall-mounted installation, and visual display via an E-ink screen. It's equipped with NFC and can easily be configured via a smartphone or PC software. Its clean and modern design is ideal for offices, classrooms, libraries, hospitals, and similar indoor environments.

The device measures temperature, humidity, light intensity, and motion detection (PIR), transmitting data in real-time using standard LoRaWAN® protocol. The 2.13-inch E-ink screen provides real-time readings, enabling precise monitoring of indoor environmental conditions and comfort levels.

## Features

- **4-in-1 Environmental Monitoring**: Temperature, humidity, light, and motion detection
- **E-ink Display**: 2.13-inch black and white screen for real-time data visualization
- **LoRaWAN® Connectivity**: Long-range wireless transmission with encrypted communication
- **NFC Configuration**: Easy setup via smartphone or PC software
- **Flexible Power Options**: Type C port power supply
- **Compact Design**: Wall-mounted installation with modern aesthetics
- **Wide Frequency Support**: CN470/IN865/RU864/EU868/US915/AU915/KR920/AS923
- **Standard Compliance**: Compatible with standard LoRaWAN® gateways and network servers

## Technical Specifications

### LoRaWAN®
- **Frequency Plans**: AS923, AU915-928, CN470-510, EU863-870, IN865-867, KR920-923, RU864-870, US902-928
- **Tx Power**: 16dBm (868 MHz) / 20dBm (915 MHz) / 19dBm (470 MHz)
- **Sensitivity**: -137dBm @ 300bps
- **Activation Mode**: OTAA/ABP
- **Class**: Class A

### Sensors

**Temperature**
- Range: -20°C to +70°C
- Accuracy: ±0.3°C (0°C to +70°C), ±0.6°C (-20°C to 0°C)
- Resolution: 0.1°C

**Humidity**
- Range: 0% to 100% RH
- Accuracy: ±3% RH (10% to 90% RH), ±5% RH (below 10% and above 90%)
- Resolution: 0.5% RH

**Light**
- Range: 0 to 60,000 lux (Visible + IR)
- Accuracy: ±30%
- Output Range: 0-65535

**PIR (Motion Detection)**
- Detection Area: 94° Horizontal, 82° Vertical
- Detection Distance: 5m

### Physical Characteristics
- **Dimensions**: 105 x 21.2 x 70.4 mm
- **Operating Temperature**: 0°C to 45°C
- **Display**: 2.13-inch Black & White E-Ink Screen

## Use Cases

- Office buildings and workspaces
- Classrooms and educational facilities
- Libraries and study areas
- Hospitals and healthcare facilities
- Retail stores
- Hotels and hospitality venues
- Smart building management

## Thinger.io Integration

The Milesight AM104 integrates seamlessly with Thinger.io through LoRaWAN® connectivity, enabling cloud-based monitoring and data analysis of indoor environmental conditions.

## Requirements

A LoRaWAN® server is required to communicate the Milesight AM104 into Thinger.io. Recommended options include:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

The corresponding plugin for the selected LoRaWAN® server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed, a new Product will be created for this device.

### Configuration

The Product is already preconfigured. Check that the auto provision prefix matches the one selected in your LoRaWAN® server plugin in Thinger.io, or change it to your preference.

The device can be configured using NFC via smartphone or PC software for quick and easy setup.

### Usage

Start sending uplinks for autoprovisioning devices and buckets. This product also provides predefined dashboards for monitoring temperature, humidity, light levels, and motion detection data.

## Additional Resources

Milesight resources can be found at:

- [Milesight IoT Official Website](https://www.milesight-iot.com/)
- [Product Documentation](https://www.milesight-iot.com/lorawan/sensor/am100-series/)
- [Thinger.io Documentation](https://docs.thinger.io)