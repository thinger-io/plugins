# Smart Current Transformer - CT103

The CT103 is a LoRaWAN® Smart Current Transformer designed for remote energy monitoring and consumption analysis. Featuring a self-powered, non-invasive clamp-on design, the CT103 enables real-time current measurement with a capacity of up to 250 A. The device reports RMS current and accumulated current data, supporting threshold alarms for proactive energy management. Its compact size and split-core design allow for easy installation in narrow scenarios without requiring power de-energizing.

## Features

- **Self-powered design**: No batteries or external wiring required, powered by the measured conductor
- **High-capacity monitoring**: 250 A rated primary current with 125 mA secondary current
- **Real-time data**: Sampling frequency up to 3.3 kHz with reporting intervals as low as 1 second
- **Non-invasive installation**: Split-core clamp design for safe and easy installation
- **Temperature monitoring**: USB Type-C connector for optional NTC temperature sensor (-20°C to 100°C)
- **Energy consumption tracking**: Reports accumulated energy consumption and RMS current data
- **Threshold alarms**: Configurable current threshold and overrange alarms
- **LED indicator**: Visual status and alarm indication
- **LoRaWAN® compliant**: Standard LoRaWAN® Class A operation with OTAA/ABP support
- **FUOTA support**: Firmware Update Over the Air capability

## Specifications

### Electrical Measurement
- **Detection parameter**: RMS Current
- **Sampling frequency**: 3.3 kHz
- **Working frequency**: 50-60 Hz
- **Rated primary current**: 250 Arms
- **Rated secondary current**: 125 mArms
- **Minimum reporting current**: 3 Arms (1 min interval), 2.8 Arms (10 min interval)*
- **Accuracy**: ±1% (>5 Arms), ±3% (≤5 Arms)
- **Resolution**: 1 mA

*Self-powered operation. For lower currents, USB power supply is required.

### Temperature Sensor (Optional)
- **Sensor type**: NTC
- **Measuring range**: -20°C to 100°C
- **Accuracy**: ±1%

### Wireless Transmission
- **Protocol**: LoRaWAN®
- **Frequency**: CN470/IN865/RU864/EU868/US915/AU915/KR920/AS923-1&2&3&4
- **Antenna connector**: 1 × 50 Ω SMA connector (center pin: SMA female)
- **Tx power**: 16 dBm (868 MHz) / 22 dBm (915 MHz) / 19 dBm (470 MHz)
- **Sensitivity**: -137 dBm
- **Mode**: OTAA/ABP
- **Class**: A

### Interfaces
- **Button**: 1 × Reboot button
- **LED indicator**: 1 × Status/Alarm indicator
- **Port**: 1 × USB Type-C for power supply, configuration, console, or cable temperature sensor connection

### Configuration
- USB Type-C or downlink commands

## Use Cases

- Industrial energy monitoring and management
- Commercial building power consumption analysis
- Data center current monitoring
- HVAC system energy optimization
- Manufacturing equipment current tracking
- Electrical panel monitoring
- Renewable energy system monitoring
- Energy efficiency auditing

## Thinger.io Integration

The CT103 integrates seamlessly with Thinger.io through LoRaWAN® network servers, enabling centralized monitoring, data visualization, and alarm management for energy consumption applications.

## Requirements

A LoRaWAN server is required to communicate the CT103 into Thinger.io, some options are:

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

## Additional Resources

Milesight resources can be found at:

- [Product Page](https://www.milesight.com/iot/product/lorawan-sensor/ct10x)
- [Datasheet](https://resource.milesight.com/milesight/iot/document/ct10x-datasheet-en.pdf)
- [User Guide](https://resource.milesight.com/milesight/iot/document/ct10x-user-guide-en.pdf)
- [Thinger.io Documentation](https://docs.thinger.io)