# Smart Current Transformer - CT101

The CT101 is a LoRaWAN® Smart Current Transformer designed for monitoring energy and analyzing consumption remotely. It features a self-powered, non-invasive clamp design that enables easy and safe installation without requiring power de-energizing. The device reports RMS current and accumulated current data with high measuring accuracy, utilizing a sampling frequency of up to 3.3 kHz for precise energy monitoring applications.

## Features

- **High Accuracy Measurement**: ±1% accuracy for currents >5A, ±3% for ≤5A with 1 mA resolution
- **Self-Powered**: Induced current power supply eliminates the need for batteries or external wires
- **Real-Time Monitoring**: Sampling rate of up to 1 second for quick alarm response
- **Temperature Monitoring**: Optional NTC temperature sensor connection via USB Type-C port (-20°C to 100°C range, ±1% accuracy)
- **Compact Design**: 86.5 x 31 x 37.4 mm dimensions allow installation in narrow scenarios
- **Flexible Installation**: Detachable design with non-invasive clamp accommodates various environments
- **LED Indicator**: Visual status and alarm notifications
- **Advanced Features**: Threshold alarm, overrange alarm, and FUOTA (Firmware Update Over the Air)
- **LoRaWAN® Class A**: Standard compliant with OTAA/ABP activation modes

## Technical Specifications

| Parameter | Specification |
|-----------|--------------|
| **Electrical Measurement** | |
| Rated Primary Current | 100 Arms |
| Rated Secondary Current | 100 mArms |
| Sampling Frequency | 3.3 kHz |
| Working Frequency | 50-60 Hz |
| Minimum Reporting Current | 1.5 Arms (1 min interval) / 1.4 Arms (10 min interval) |
| **Wireless** | |
| Protocol | LoRaWAN® |
| Frequency Plans | CN470/IN865/RU864/EU868/US915/AU915/KR920/AS923-1&2&3&4 |
| Tx Power | 16 dBm (868 MHz) / 22 dBm (915 MHz) / 19 dBm (470 MHz) |
| Sensitivity | -137 dBm |
| Antenna | 50 Ω SMA connector (center pin: SMA female) |
| **Environmental** | |
| Operating Temperature | -20°C to 70°C |
| Enclosure | IP30 |
| **Power** | |
| Power Supply | Induced current / 5V USB Type-C port |
| Insulation Voltage | 2.5 kVac (r.m.s) (1mA) |

## Use Cases

- Industrial energy consumption monitoring
- Building management systems
- Power distribution analysis
- Remote energy auditing
- Cable temperature monitoring
- Electrical load optimization
- Real-time current threshold alerting

## Thinger.io Integration

The CT101 integrates seamlessly with Thinger.io through LoRaWAN network servers, enabling remote monitoring, data visualization, and alarm management for energy consumption applications.

## Requirements

A LoRaWAN server is required to communicate the Smart Current Transformer - CT101 into Thinger.io. Supported options include:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

The corresponding plugin for the selected LoRaWAN server needs to be installed in your Thinger.io instance.

## Get Started

### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed, a new Product will be created for this device.

### Configuration

The Product is already preconfigured. Check that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or change it to your preference.

### Usage

Start sending uplinks for autoprovisioning devices and buckets. This product also provides predefined dashboards and downlinks for monitoring current consumption, accumulated energy data, and managing threshold alarms.

## Additional Resources

Milesight resources can be found at:

- [CT10x Datasheet](https://resource.milesight.com/milesight/iot/document/ct10x-datasheet-en.pdf)
- [Product Page](https://www.milesight.com/iot/product/lorawan-sensor/ct10x)
- [Device Repository](https://www.thethingsnetwork.org/device-repository/devices/milesight-iot/ct101/)
- [Thinger.io Documentation](https://docs.thinger.io)