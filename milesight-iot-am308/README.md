# Milesight AM308 LoRaWAN Indoor Air Quality Sensor (7 in 1)

The Milesight AM308 is a comprehensive indoor ambience monitoring sensor that collects various indoor air quality parameters through 7 built-in sensors. The device features a 4.2-inch black and white E-ink screen for local data visualization and delivers real-time environmental data via LoRaWAN connectivity. It supports both battery and DC power supply options and can be easily configured via NFC. The AM308 includes a tri-color LED indicator, buzzer, anti-theft design, and emoticon indication for intuitive air quality status display.

## Features

- **7-in-1 Sensor Integration**: Temperature, humidity, CO₂, TVOC, light, barometric pressure, and motion (PIR) detection
- **4.2-inch E-ink Display**: Real-time visualization of environmental parameters
- **LoRaWAN Connectivity**: Long-range wireless communication supporting multiple frequency bands (CN470/RU864/IN865/EU868/US915/AU915/KR920/AS923)
- **Dual Power Options**: Battery-powered or DC power supply
- **NFC Configuration**: Easy setup and commissioning
- **Visual Indicators**: Tri-color LED traffic light status indicator and buzzer for air quality alerts
- **Motion Detection**: PIR sensor with 80° horizontal and 55° vertical detection range up to 5 meters
- **Flexible Activation**: OTAA/ABP activation modes, Class A operation

## Sensor Specifications

| Sensor | Technology | Range | Accuracy | Resolution |
|--------|-----------|-------|----------|------------|
| Temperature | Digital CMOSens® (MEMS) | -20°C to 60°C | ±0.2°C | 0.1°C |
| Humidity | Digital CMOSens® (MEMS) | 0% to 100% RH | ±2% RH | 0.5% RH |
| CO₂ | Nondispersive Infrared (NDIR) | 400 to 5000 ppm | ±(30 ppm + 3% of reading) | 1 ppm |
| TVOC | MOX (MEMS) | 1.00 to 5.00 (IAQ Rating) | ±1 | 0.01 |
| Barometric Pressure | Piezoresistive (MEMS) | 260 to 1260 hPa | ±0.5 hPa | 0.1 hPa |
| Light | Photodiode | 0 to 60000 lux | - | 6 levels (0-5) |
| Motion | Passive Infrared (PIR) | 5m detection, 80° H / 55° V | - | Vacant/Occupied |

## Use Cases

- **Offices**: Monitor workspace air quality and occupancy for improved employee health and productivity
- **Classrooms**: Ensure optimal learning environments with proper ventilation and air quality
- **Hospitals**: Track environmental conditions in patient areas and medical facilities
- **Retail Stores**: Maintain comfortable shopping environments and monitor customer presence
- **Meeting Rooms**: Optimize HVAC systems based on occupancy and air quality metrics
- **Smart Buildings**: Integration into building management systems for energy efficiency

## Thinger.io Integration

The Milesight AM308 integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling cloud-based monitoring, data visualization, and alerting for indoor air quality management.

## Requirements

A LoRaWAN server is required to communicate the Milesight AM308 into Thinger.io. Compatible options include:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

The corresponding plugin for the selected LoRaWAN server must be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed, a new Product will be created for this device.

### Configuration

The Product is already preconfigured. Verify that the auto-provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your preference.

### Usage

Start sending uplinks for autoprovisioning devices and buckets. This product provides predefined dashboards for monitoring temperature, humidity, CO₂, TVOC, barometric pressure, light levels, and motion detection data.

## Additional Resources

Milesight resources can be found at:

- [AM300 Series Datasheet](https://resource.milesight.com/milesight/iot/document/am300-series-datasheet-en.pdf)
- [Milesight IoT](https://www.milesight-iot.com/)
- [Thinger.io Documentation](https://docs.thinger.io)