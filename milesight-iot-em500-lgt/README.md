# Milesight EM500-LGT Light Sensor

The Milesight EM500-LGT is an outdoor environment monitoring sensor designed for measuring light in harsh environments. It features a long-lasting battery life of up to 10 years, an IP67 UV-resistant and waterproof enclosure, and can be easily configured via NFC. The EM500-LGT is widely used for outdoor applications like smart agriculture, urban lighting, smart buildings, greenhouse control, and weather monitoring.

## Features

- **Wide Measuring Range**: 0 - 100,000 lux with high precision (±3% accuracy)
- **Long Range Communication**: Ultra-wide-distance transmission up to line of sight of 10 km
- **Extended Battery Life**: Built-in 19,000 mAh replaceable battery with up to 10 years operation
- **Rugged Design**: IP67 waterproof transceiver and IP65 light sensor for harsh environments
- **Easy Configuration**: NFC and USB Type-C for quick setup via mobile app or PC software
- **Data Management**: Local storage of up to 1,000 historical records with retransmission support
- **LoRaWAN Compliance**: Standard LoRaWAN protocol (Class A, OTAA/ABP modes)
- **Advanced Features**: Data retrievability, threshold alarms, and data retransmission

## Technical Specifications

### LoRaWAN Communication
- **Technology**: LoRaWAN®
- **Frequency Bands**: CN470/IN865/RU864/EU868/US915/AU915/KR920/AS923
- **Transmission Power**: 16 dBm (868 MHz) / 20 dBm (915 MHz) / 19 dBm (470 MHz)
- **Sensitivity**: -137 dBm @ 300 bps
- **Activation Mode**: OTAA/ABP
- **Class**: A
- **Antenna**: Internal

### Light Sensor
- **Measurement Range**: 0 - 100,000 lux
- **Accuracy**: ±3%
- **Resolution**: 1 lux

### Power
- **Battery**: 1 × 19,000 mAh ER34615 Li-SOCl₂ Battery (replaceable)
- **Battery Life**: Up to 10 years (at 10-minute reporting interval, 25°C)

### Physical Characteristics
- **Dimensions**: 69.5 × 71 × 105.4 mm
- **Weight**: 333 g (with battery and mounting bracket)
- **Cable Length**: 3 m
- **Operating Temperature**: 
  - Transceiver: -30°C to +70°C
  - Light Sensor: -30°C to +60°C
- **Relative Humidity**: 0% to 100% (non-condensing)
- **Ingress Protection**: 
  - Transceiver: IP67
  - Light Sensor: IP65
- **Housing Material**: 
  - Transceiver: ABS + PC, Grey
  - Light Sensor: Aluminum alloy, White

### Interface
- **LED**: 1 × LED indicator (internal)
- **Button**: 1 × Power/Reset button (internal)
- **USB**: 1 × USB Type-C (internal) for configuration and console
- **Configuration Methods**: Mobile app (via NFC), PC software (via USB Type-C), Downlink

## Use Cases

- **Smart Buildings**: Indoor and outdoor lighting monitoring
- **Urban Lighting**: Street light optimization and energy management
- **Greenhouse Control**: Light level monitoring for optimal plant growth
- **Smart Agriculture**: Crop monitoring and environmental control
- **Weather Monitoring**: Ambient light tracking for meteorological applications

## Thinger.io Integration

The Milesight EM500-LGT can be seamlessly integrated into Thinger.io through LoRaWAN network servers, enabling real-time monitoring, data visualization, and advanced analytics for light measurement applications.

## Requirements

A LoRaWAN server is required to communicate the Milesight EM500-LGT into Thinger.io, some options are:

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

- [Product Datasheet](https://resource.milesight.com/milesight/iot/document/em500-lgt-datasheet-en.pdf)
- [User Guide](https://resource.milesight.com/milesight/iot/document/em500-lgt-user-guide-en.pdf)
- [Milesight IoT Official Website](https://www.milesight-iot.com/)
- [Thinger.io Documentation](https://docs.thinger.io)