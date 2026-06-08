# S2120 8-in-1 LoRaWAN® Weather Sensor

SenseCAP LoRaWAN® S2120 Weather Station provides you with hyperlocal weather at your fingertips. It supports multi-scenario applications like backyard, garden, agriculture, meteorology, urban environmental monitoring, and so on. It enables low maintenance cost for its ultra-low power consumption, reliable performance, and built-in Bluetooth for OTA configuration and remote device management.

The S2120 is a battery-powered weather sensor that measures air temperature, humidity, wind speed, wind direction, rainfall, light intensity, UV index, and barometric pressure. It is compatible with LoRaWAN® V1.0.3 protocol Class A and can work with any standard LoRaWAN® gateway.

## Features

- **8-in-1 Weather Monitoring**: Air temperature, humidity, barometric pressure, wind speed, wind direction, light intensity, UV index, and rainfall
- **Long-Range Connectivity**: LoRaWAN® communication with 2-10 km range depending on gateway and environment
- **Low Power Consumption**: Up to 2 years battery life with solar panel and 6 AA batteries
- **Outdoor Ready**: IP66 protection grade suitable for outdoor deployment
- **Easy Configuration**: Built-in Bluetooth with app tool for parameter changes
- **Multi-Region Support**: Configurable frequency plans for IN865/EU868/US915/AU915/AS923/KR920/RU864
- **Solar Powered**: 0.5W solar panel with battery backup

## Technical Specifications

### Sensors

| Parameter | Range | Accuracy | Resolution |
|-----------|-------|----------|------------|
| Air Temperature | -40.0 ~ 80.0 °C | ±0.5°C (0~80°C); ±0.6°C (-40~0°C) | 0.1°C |
| Air Humidity | 1~99 %RH | ±3% (1~90%RH); ±4% (90~99%RH) | 1%RH |
| Barometric Pressure | 540 ~ 1100 hPa | ±5hPa (700~1100hPa); ±8hPa (540~699hPa) | 1hPa |
| Wind Speed | 0~50.0 m/s | ±0.5m/s (<5m/s); ±10% (>5m/s) | 0.1 m/s |
| Wind Direction | 0~360° | ±8° | 1° |
| Light Intensity | 0 ~ 200000 lux | ±5% | 1 lux |
| UV Index | 0 ~ 16.0 | - | - |
| Rain Hourly | 0 ~ 450 mm/h | ±7% | 0.254 mm/h |

### LoRaWAN Parameters

- **Protocol**: LoRaWAN® v1.0.3 Class A
- **Microcontroller**: WM-LR1110
- **Frequency Plans**: IN865/EU868/US915/AU915/AS923/KR920/RU864
- **Max Transmitted Power**: 21 dBm
- **LoRa Sensitivity**: -141 dBm @SF12 BW=125KHz
- **Communication Distance**: 2 to 10 km (depending on gateway antenna and environment)

### Power Supply

- **Solar Panel**: 0.5W (priority power source when sunlight available)
- **Battery Type**: AA size, 1.5V (alkaline or non-rechargeable lithium)
- **Battery Options**: 
  - Option 1: Built-in battery box with 3 AA batteries
  - Option 2: External battery box with 6 AA batteries (2m cable, IPX6 rating)
- **Battery Life**: Up to 2 years (solar panel + 6 AA batteries, 1h uplink interval)

### Physical Specifications

- **Dimensions**: 450 x 160 x 345 mm
- **Weight**: 1.5 kg
- **Protection Grade**: IP66
- **Operating Temperature**: -20 to +60°C (alkaline battery); -40 to +60°C (lithium battery)
- **Operating Humidity**: 0~99% RH

### Certifications

- CE / FCC / RoHS

## Thinger.io Integration

The SenseCAP S2120 integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time weather monitoring, data visualization, and remote device management.

## Requirements

A LoRaWAN server is required to communicate the SenseCAP S2120 into Thinger.io, some options are:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

Alongside, the corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed a new Product will be created for this device.

### Configuration

The Product is already preconfigured, check that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your desire.

Use the SenseCAP mobile app via Bluetooth to configure the device parameters such as uplink interval, LoRaWAN frequency plan, and other sensor settings before deployment.

### Usage

Start sending uplinks for autoprovisioning devices and buckets. This product also provides a predefined dashboard and downlinks.

## Use Cases

- **Agriculture**: Monitor microclimatic conditions for precision farming
- **Meteorology**: Professional weather monitoring and forecasting
- **Urban Environmental Monitoring**: Track air quality and weather patterns in cities
- **Smart Gardens**: Optimize irrigation and plant care
- **Transportation**: Provide real-time weather data for traffic management
- **Outdoor Events**: Weather monitoring for event planning and safety

## Additional Resources

SenseCAP resources can be found at:

- [SenseCAP S2120 Documentation](https://wiki.seeedstudio.com/Sensor/SenseCAP/SenseCAP_LoRaWAN_Sensor/SenseCAP_S2120_8-in-1_LoRaWAN_Weather_Sensor/SenseCAP_S2120_8-in-1_LoRaWAN_Weather_Sensor_Introduction)
- [Datasheet](https://media.distrelec.com/Web/Downloads/_t/ds/101990961_eng_tds.pdf)
- [Thinger.io Documentation](https://docs.thinger.io)