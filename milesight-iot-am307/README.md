# Milesight AM307 - LoRaWAN Indoor Air Quality Sensor (7 in 1)

The Milesight AM307 is a comprehensive indoor ambience monitoring sensor that collects various environmental conditions through 7 built-in sensors. It features a 4.2-inch E-ink screen for local display and delivers data via LoRaWAN connectivity. The device supports battery or DC power supply and can be easily configured via NFC. It includes a tri-color LED indicator, anti-theft design, and emoticon indication for user-friendly operation. The AM307 is widely used for offices, stores, classrooms, hospitals, and other indoor environments requiring air quality monitoring.

## Features

- **7-in-1 Multi-Sensor Monitoring**: Temperature, Humidity, CO₂, TVOC, Barometric Pressure, Light, and Motion (PIR)
- **4.2-inch E-Ink Display**: Clear black and white screen for local data visualization
- **LoRaWAN Connectivity**: Long-range wireless transmission with support for multiple frequency bands
- **Dual Power Options**: Battery-powered or DC power supply via USB Type-C
- **NFC Configuration**: Easy setup and provisioning
- **Traffic Light LED Indicator**: Visual status indication with tri-color LED
- **Built-in Buzzer**: Acoustic alarm for threshold alerts
- **Large Data Storage**: Up to 18,000 records (512 KB total)
- **Anti-Theft Design**: Secure mounting for public spaces
- **Wide Operating Range**: -40°C to 85°C temperature tolerance

## Specifications

### LoRaWAN Communication

- **Frequency Bands**: CN470/RU864/IN865/EU868/US915/AU915/KR920/AS923-1&2&3&4
- **Tx Power**: 16 dBm (868 MHz) / 22 dBm (915 MHz) / 19 dBm (470 MHz)
- **Sensitivity**: -137 dBm @ 300 bps
- **Activation**: OTAA/ABP
- **Class**: Class A / Class C

### Sensor Specifications

#### Temperature
- **Range**: -40°C to 85°C
- **Accuracy**: ±1°C
- **Resolution**: 0.1°C

#### Humidity
- **Range**: 0% to 100% RH
- **Accuracy**: ±3% (±2% RH @ 25°C)
- **Resolution**: 0.5% RH

#### Motion (PIR)
- **Technology**: Passive Infrared
- **Detection Area**: 80° Horizontal, 55° Vertical
- **Detection Distance**: 5m
- **Status**: Vacant/Occupied

#### Light
- **Technology**: Photodiode
- **Range**: 0 to 60,000 Lux
- **Report Mode**: Illuminance value or 6 levels (0-5)
- **Accuracy**: ±30% of reading
- **Resolution**: 1 Lux

#### Carbon Dioxide (CO₂)
- **Technology**: Nondispersive Infrared (NDIR)
- **Range**: 400 to 5,000 ppm
- **Accuracy**: ±(30 ppm + 3% of reading) at 0°C to 50°C
- **Resolution**: 1 ppm

#### TVOC (Total Volatile Organic Compounds)
- **Technology**: MOX (MEMS)
- **Range**: 1.00 to 5.00 (IAQ Rating/Index)
- **Accuracy**: ±1 (±15%)
- **Resolution**: 0.01

#### Barometric Pressure
- **Technology**: Piezoresistive absolute pressure sensor (MEMS)
- **Range**: 260 to 1,260 hPa (300 to 1,100 hPa at -40°C to 85°C)
- **Accuracy**: ±0.5 hPa (±0.6 hPa)
- **Resolution**: 0.1 hPa

### Interfaces

- **Display**: 4.2-inch Black & White E-Ink Screen
- **Buttons**: 1 × Power Button + 1 × Reset Button
- **LED**: 1 × Traffic Light Status Indicator (Tri-color)
- **Buzzer**: 1 × Buzzer for alarms
- **USB**: 1 × Type-C Port for power supply and configuration/console

## Use Cases

- **Smart Buildings**: Comprehensive indoor environmental monitoring
- **Offices**: Employee comfort and productivity optimization
- **Classrooms**: Learning environment quality management
- **Hospitals**: Patient care area air quality monitoring
- **Retail Stores**: Customer comfort and HVAC optimization
- **Indoor Air Quality Management**: Real-time IAQ monitoring and alerting
- **HVAC Control**: Data-driven climate control decisions

## Thinger.io Integration

The Milesight AM307 integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling cloud-based data management, visualization, and control.

## Requirements

A LoRaWAN server is required to communicate the Milesight AM307 into Thinger.io, some options are:

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

Start sending uplinks for autoprovisioning devices and buckets. This product also provides a predefined dashboard and downlinks.

## Additional Resources

Milesight resources can be found at:

- [Official AM307 Product Page](https://www.milesight.com/iot/product/lorawan-sensor/am307)
- [Milesight IoT Documentation](https://resource.milesight.com/)
- [Thinger.io Documentation](https://docs.thinger.io)