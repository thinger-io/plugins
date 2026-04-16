# EM400-TLD - ToF Laser Distance Sensor

The EM400-TLD is a distance sensor based on ToF (Time of Flight) technology, designed for detecting fill level and position status. With a detection range of 2 to 350 cm and minimal blind zone, it is particularly suitable for monitoring waste bins, containers, and various distance measurement applications. The device features dual 9000 mAh replaceable batteries providing up to 10 years of operation, IP67 protection rating, and NFC configuration capabilities.

## Thinger.io Integration

## Requirements

A LoRaWAN server is required to communicate the Milesight EM400-TLD into Thinger.io, some options are:

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

## Features

- **ToF Distance Measurement**: 2-350 cm detection range with 27° field of view
- **High Accuracy**: ±2 cm detection accuracy across -20°C to 70°C
- **Temperature Monitoring**: Built-in sensor with -40°C to 125°C range
- **Position Detection**: Normal/Tilt status monitoring with accelerometer
- **Long Battery Life**: Dual 9000 mAh replaceable batteries, up to 10 years operation
- **NFC Configuration**: One-touch configuration and card emulation mode
- **LoRaWAN Connectivity**: Class A, OTAA/ABP modes
- **Wide Frequency Support**: CN470/IN865/RU864/EU868/US915/AU915/KR920/AS923
- **Rugged Design**: IP67 rated, ABS + PC housing
- **Operating Modes**: Standard mode and Bin mode
- **Advanced Features**: Threshold alarms, cumulative reporting, tilt & distance switch

## Technical Specifications

| Parameter | Specification |
|-----------|---------------|
| **Detection Range** | 2 - 350 cm |
| **Detection Accuracy** | ±2 cm (-20°C ~ 70°C) |
| **Detection Resolution** | 1 mm |
| **Field of View** | 27° |
| **Temperature Range** | -40°C ~ 125°C |
| **Temperature Resolution** | 0.1°C |
| **LoRaWAN Frequency** | CN470/IN865/RU864/EU868/US915/AU915/KR920/AS923-1&2&3&4 |
| **Tx Power** | 16 dBm (868 MHz) / 20 dBm (915 MHz) / 19 dBm (470 MHz) |
| **Sensitivity** | -137 dBm @300 bps |
| **Class** | A |
| **Activation** | OTAA/ABP |
| **Power Supply** | 2 × 9000 mAh ER26500 Li-SOCL2 Batteries |
| **Battery Life** | Up to 10 years (standard mode: 10 min interval, 25°C) |
| **Operating Temperature** | -30°C ~ 70°C |
| **Humidity** | ≤95% (non-condensing) |
| **Ingress Protection** | IP67 |
| **Dimensions** | 118 × 65 × 30 mm |
| **Weight** | 208.3 g |
| **Housing Material** | ABS + PC (UL94 V0) |

## Use Cases

- Waste bin fill level monitoring
- Container level detection
- Parking space occupancy detection
- Position and tilt status monitoring
- Distance measurement applications
- Smart city waste management
- Industrial level monitoring

## Additional Resources

Milesight resources can be found at:

- [Datasheet](https://resource.milesight.com/milesight/iot/document/em400-tld-datasheet-en.pdf)
- [User Guide](https://resource.milesight.com/milesight/iot/document/em400-tld-user-guide-en.pdf)
- [Thinger docs](https://docs.thinger.io)