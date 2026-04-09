# Milesight AM319L LoRaWAN Indoor Air Quality Sensor (9 in 1)

The Milesight AM319L is a compact indoor ambience monitoring sensor that collects various indoor environmental conditions through 9 built-in sensors and delivers the data to mobile applications and its 4.2-inch E-ink screen. It supports battery or DC power supply and can be easily configured via NFC. The device features a tri-color LED indicator, anti-theft design, and emoticon indication. The AM319L is widely used for offices, stores, classrooms, hospitals, and other indoor environments.

## Features

- **9-in-1 Multi-Sensor Design**: Temperature, Humidity, CO2, TVOC, Barometric Pressure, PIR Motion, Light, PM2.5, and PM10
- **4.2-inch E-Ink Display**: Real-time environmental data visualization
- **LoRaWAN Connectivity**: Supports multiple frequency bands (CN470/RU864/IN865/EU868/US915/AU915/KR920/AS923-1&2&3&4)
- **NFC Configuration**: Simplified device setup
- **Traffic Light Indicator**: Visual status and threshold alarms with buzzer
- **Flexible Power Options**: Battery or Type-C DC power supply
- **Data Storage**: Up to 18,000 records (512 KB total)
- **Class C Operation**: OTAA/ABP activation modes

## Specifications

### LoRaWAN

- **Frequency**: CN470/RU864/IN865/EU868/US915/AU915/KR920/AS923-1&2&3&4
- **Tx Power**: 16 dBm (868 MHz) / 22 dBm (915 MHz) / 19 dBm (470 MHz)
- **Sensitivity**: -137 dBm @ 300 bps
- **Mode**: OTAA/ABP Class C

### Sensors

#### Temperature
- **Range**: -20°C to 60°C
- **Accuracy**: ±0.2°C
- **Resolution**: 0.1°C
- **Technology**: Digital CMOSens® (MEMS)

#### Humidity
- **Range**: 0% to 100% RH
- **Accuracy**: ±2% RH
- **Resolution**: 0.5% RH
- **Technology**: Digital CMOSens® (MEMS)

#### CO2 (Carbon Dioxide)
- **Range**: 400 to 2000 ppm
- **Accuracy**: ±(50 ppm + 5% of reading) at -10°C to 60°C
- **Resolution**: 1 ppm
- **Technology**: Photoacoustic

#### TVOC (Total Volatile Organic Compounds)
- **Range**: 1.00 to 5.00 (IAQ Rating)
- **Accuracy**: ±1
- **Resolution**: 0.01
- **Technology**: MOX (MEMS)

#### Barometric Pressure
- **Range**: 260 to 1260 hPa
- **Accuracy**: ±0.5 hPa
- **Resolution**: 0.1 hPa
- **Technology**: Piezoresistive absolute pressure sensor (MEMS)

#### Motion (PIR)
- **Detection Range**: 80° Horizontal, 55° Vertical, 5 m
- **Status**: Vacant/Occupied
- **Technology**: Passive Infrared

#### Light
- **Range**: 0 to 60,000 Lux (6 levels: 0-5)
- **Technology**: Photodiode

#### PM2.5 & PM10
- **Range**: 0 to 1000 μg/m³
- **Accuracy**: 0-100 (±10 μg/m³), 100-1000 (±10%)
- **Resolution**: 1 μg/m³
- **Technology**: Laser Scattering

#### Formaldehyde (HCHO) - Optional
- **Range**: 0 to 1.25 mg/m³
- **Accuracy**: ±10%
- **Resolution**: 0.01 mg/m³
- **Technology**: Electrochemical
- **Working Life**: 6 years

#### Ozone (O3) - Optional
- **Range**: 0 to 10 ppm
- **Accuracy**: ±5% FS
- **Resolution**: 0.01 ppm
- **Technology**: Electrochemical
- **Working Life**: 2 years

### Physical Characteristics

- **Dimensions**: 100.8 × 22 × 114 mm
- **Enclosure**: IP30
- **Operating Temperature**: -20°C to 60°C
- **Display**: 4.2-inch Black & White E-Ink Screen
- **Buttons**: 1 × Power Button, 1 × Reset Button
- **Indicators**: 1 × Traffic Light Status Indicator + 1 × Buzzer
- **Configuration**: NFC

## Thinger.io Integration

The Milesight AM319L integrates with Thinger.io through LoRaWAN connectivity, enabling real-time monitoring and data visualization of indoor air quality parameters.

## Requirements

A LoRaWAN server is required to communicate the Milesight AM319L into Thinger.io. Some options are:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed, a new Product will be created for this device.

### Configuration

The Product is already preconfigured. Check that the auto-provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your preference.

### Usage

Start sending uplinks for autoprovisioning devices and buckets. This product also provides a predefined dashboard and downlinks.

## Use Cases

- **Offices**: Monitor workspace air quality and occupancy
- **Stores**: Track environmental conditions for customer comfort
- **Classrooms**: Ensure healthy learning environments
- **Hospitals**: Maintain optimal indoor air quality for patient care
- **Smart Buildings**: Comprehensive environmental monitoring

## Additional Resources

Milesight resources can be found at:

- [AM300 Series Datasheet](https://resource.milesight.com/milesight/iot/document/am300-series-datasheet-en.pdf)
- [Milesight IoT Documentation](https://www.milesight-iot.com/support/)
- [Thinger.io Documentation](https://docs.thinger.io)