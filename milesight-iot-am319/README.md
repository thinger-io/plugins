# Milesight AM319 LoRaWAN Indoor Air Quality Sensor (9 in 1)

The Milesight AM319 is a compact indoor ambience monitoring sensor that collects various indoor air quality conditions through 9 built-in sensors and delivers the data to mobile apps and its 4.2-inch E-ink screen. It measures temperature, humidity, CO2 concentration, TVOC, barometric pressure, light, PIR motion, PM2.5, and PM10. The device supports battery or DC power supply and can be easily configured via NFC. It features a tri-color LED indicator, buzzer for threshold alarms, anti-theft design, and emoticon indication on the display. The AM319 is widely used for offices, stores, classrooms, hospitals, and other commercial buildings.

## Features

- **9-in-1 Sensor**: Temperature, Humidity, CO2, TVOC, Barometric Pressure, Light, PIR Motion, PM2.5, PM10
- **4.2-inch E-ink Display**: Visual data representation with emoticon indicators
- **LoRaWAN Connectivity**: Supports CN470/RU864/IN865/EU868/US915/AU915/KR920/AS923 frequency bands
- **NFC Configuration**: Easy setup via mobile app
- **Traffic Light Indicator & Buzzer**: Visual and audio alerts for air quality thresholds
- **Large Data Storage**: >18,000 records (512 KB total)
- **Flexible Power Options**: Battery or DC power supply
- **LoRaWAN Class A & Class C**: OTAA and ABP activation modes
- **IP30 Enclosure**: Suitable for indoor environments

## Technical Specifications

### LoRaWAN Communication
- **Frequency**: CN470/RU864/IN865/EU868/US915/AU915/KR920/AS923-1/2/3/4
- **TX Power**: 16 dBm (868 MHz) / 22 dBm (915 MHz) / 19 dBm (470 MHz)
- **Sensitivity**: -137 dBm @ 300 bps
- **Activation**: OTAA/ABP
- **Class**: A & C

### Sensor Specifications

**Temperature**
- Range: -40°C to 85°C
- Accuracy: ±1°C
- Resolution: 0.1°C

**Humidity**
- Range: 0% to 100% RH
- Accuracy: ±3%
- Resolution: 0.5% RH

**CO2 (Carbon Dioxide)**
- Range: 400 to 5000 ppm
- Accuracy: ±(30 ppm or 3% of reading) for 400-2000 ppm; ±(50 ppm + 5% of reading) for 2000-5000 ppm
- Resolution: 1 ppm

**TVOC (Total Volatile Organic Compounds)**
- Range: 0 to 500 (IAQ Index)
- Accuracy: ±15%

**Barometric Pressure**
- Range: 300 to 1100 hPa (-40°C to 85°C)
- Accuracy: ±0.6 hPa
- Resolution: 0.1 hPa

**Light**
- Range: 0 to 60,000 Lux (displayed as 6 levels, 0-5)

**PIR (Motion)**
- Detection Area: 80° Horizontal, 55° Vertical
- Detection Distance: 5 m
- Status: Vacant/Occupied

**PM2.5 & PM10 (Particulate Matter)**
- Range: 0 to 1000 μg/m³
- Accuracy: ±10 μg/m³ (0-100 μg/m³); ±10% (100-1000 μg/m³)
- Resolution: 1 μg/m³

**Formaldehyde (HCHO)**
- Range: 0 to 6 mg/m³
- Accuracy: ±10%
- Resolution: 0.01 mg/m³

**Ozone (O3)**
- Range: 0 to 10 ppm
- Accuracy: ±5% FS
- Resolution: 0.01 ppm

### Physical Characteristics
- **Dimensions**: 100.8 x 22 x 114 mm
- **Enclosure**: IP30
- **Operating Temperature**: -20°C to 60°C
- **Display**: 4.2-inch E-ink screen
- **Buttons**: 1× Power Button, 1× Reset Button
- **Indicator**: Tri-color LED (traffic light) + Buzzer

## Use Cases

- Office buildings and meeting rooms
- Retail stores and shopping centers
- Classrooms and educational facilities
- Hospitals and healthcare facilities
- Hotels and hospitality venues
- Museums and galleries
- Data centers and clean rooms
- Indoor parking and underground facilities

## Thinger.io Integration

The Milesight AM319 integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time monitoring, data visualization, and remote management of indoor air quality parameters.

## Requirements

A LoRaWAN server is required to communicate the Milesight AM319 into Thinger.io. Some options are:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed, a new Product will be created for this device.

### Configuration

The Product is already preconfigured. Check that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your preference. Configure the device using NFC via the Milesight ToolBox mobile app for quick LoRaWAN parameter setup.

### Usage

Start sending uplinks for autoprovisioning devices and buckets. This product provides access to all 9 sensor readings including temperature, humidity, CO2, TVOC, barometric pressure, light, motion detection, PM2.5, and PM10. The platform also supports predefined dashboards for comprehensive air quality monitoring and downlinks for device configuration.

## Additional Resources

Milesight resources can be found at:

- [AM319 Datasheet](https://resource.milesight.com/milesight/iot/document/am319-datasheet-en.pdf)
- [Milesight IoT Official Site](https://www.milesight-iot.com/)
- [Thinger.io Documentation](https://docs.thinger.io)