# Milesight EM500-PP Pipe Pressure Sensor

The Milesight EM500-PP is a LoRaWAN pipe pressure sensor designed for outdoor environment monitoring in harsh conditions. Featuring high precision measurement, corrosion resistance, and IP67 waterproof enclosure, the EM500-PP provides reliable pressure monitoring with ultra-wide-distance transmission up to 10 km line of sight. With a built-in 19000 mAh replaceable battery, the device offers up to 10 years of battery life, making it ideal for long-term deployments in pipes, tanks, oil & gas systems, water leak detection, and pump monitoring applications.

## Key Features

- **LoRaWAN Connectivity**: Standard LoRaWAN protocol with support for multiple frequency bands (CN470/IN865/RU864/EU868/US915/AU915/KR920/AS923)
- **High Precision**: ±0.5% FS accuracy with 1 kPa resolution
- **Wide Measurement Range**: 0 - 1600 kPa (16 Bar) vented gauge pressure
- **Long Battery Life**: Up to 10 years operation with 19000 mAh ER34615 Li-SOCL2 battery (10 min interval at 25°C)
- **Rugged Design**: IP67 waterproof transceiver and IP65 pressure sensor with stainless steel 316L construction
- **Temperature Compensation**: High accuracy across operating range
- **Data Storage**: Local storage for 1,000 entries with retransmission capability
- **Easy Configuration**: NFC mobile app and USB Type-C configuration options
- **Wide Temperature Range**: Transceiver -30°C to +70°C, Sensor -10°C to +70°C
- **Advanced Features**: Threshold alarms, data retrievability, Milesight D2D Controller support

## Technical Specifications

### LoRaWAN Parameters
- **Technology**: LoRaWAN Class A
- **Activation**: OTAA/ABP
- **Frequency**: CN470/IN865/RU864/EU868/US915/AU915/KR920/AS923-1&2&3&4
- **Tx Power**: 16 dBm (868 MHz) / 20 dBm (915 MHz) / 19 dBm (470 MHz)
- **Sensitivity**: -137 dBm @ 300 bps
- **Antenna**: Internal

### Measurement
- **Pressure Type**: Vented Gauge
- **Range**: 0 - 1600 kPa (16 Bar)
- **Accuracy**: ±0.5% FS
- **Resolution**: 1 kPa (0.01 Bar)
- **Overload**: 150% FS
- **Long-term Stability**: ±0.3% FS/year
- **Process Connection**: G 1/2" Male

### Physical Characteristics
- **Transceiver Dimensions**: 105.4 × 71 × 69.5 mm (4.1 × 2.8 × 2.7 in)
- **Transceiver Weight**: 328 g (with battery and mounting bracket)
- **Pressure Sensor Weight**: 187 g (with cable)
- **Cable Length**: 1.5 m
- **Housing**: Transceiver - ABS + PC (Grey), Sensor - Stainless Steel 316L (Silver)
- **Ingress Protection**: Transceiver IP67, Sensor IP65
- **Humidity**: 0% to 100% (non-condensing)

## Use Cases

- Smart buildings infrastructure monitoring
- Pipes and tanks pressure monitoring
- Oil & Gas pipeline systems
- Water leak detection systems
- Pump monitoring and control
- Industrial process monitoring

## Thinger.io Integration

The Milesight EM500-PP integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling real-time pressure monitoring, historical data analysis, and alarm management within the Thinger.io platform.

## Requirements

A LoRaWAN server is required to communicate the Milesight EM500-PP into Thinger.io, some options are:

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

- [Official Documentation](https://resource.milesight.com/milesight/iot/document/em500-pp-datasheet-en.pdf)
- [Thinger docs](https://docs.thinger.io)