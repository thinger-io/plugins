# Milesight AT101

The Milesight AT101 is an exceptional outdoor LoRaWAN GPS tracker that combines GNSS and Wi-Fi AP MAC Address Scanning technologies to deliver highly accurate positioning data. It is equipped with tilt and temperature sensors, enabling extensive data collection and versatile application in various scenarios.

## Features

- **Dual Positioning Technology**: GNSS positioning with 5.0m accuracy (CEP) and Wi-Fi AP MAC address scanning for enhanced indoor location tracking
- **Multiple Tracking Modes**: Motion tracking, periodic tracking, and timing tracking modes
- **Environmental Sensors**: Built-in tilt detection and temperature monitoring (-40°C to 125°C range)
- **Rugged Design**: IP67 water resistance and IK09 impact protection for demanding outdoor environments
- **Long Battery Life**: Up to 15+ years with twice daily location updates (4× 2700 mAh ER14505 replaceable batteries)
- **Advanced Features**: Geofencing, tilt threshold alarm, tamper alarm, data storage (1000 entries), and retransmission capability
- **Easy Configuration**: NFC and Bluetooth 5.3 support for quick setup
- **LoRaWAN Connectivity**: Supports OTAA/ABP activation, Class A, with global frequency bands (CN470/IN865/RU864/EU868/US915/AU915/KR920/AS923)

## Use Cases

- Outdoor asset tracking and management
- Fleet and vehicle monitoring
- Container and cargo tracking
- Equipment and machinery location monitoring
- Theft prevention and recovery
- Cold chain monitoring with temperature sensing
- Geofence-based security applications

## Technical Specifications

### LoRaWAN
- **Protocol**: LoRaWAN®
- **Frequency Bands**: CN470/IN865/RU864/EU868/US915/AU915/KR920/AS923-1&2&3&4
- **Tx Power**: 16 dBm (868 MHz) / 20 dBm (915 MHz) / 19 dBm (470 MHz)
- **Sensitivity**: -137 dBm @300bps
- **Activation**: OTAA/ABP
- **Class**: A
- **Antenna**: Internal

### GNSS Positioning
- **Position Accuracy**: 5.0m CEP (Direct Line of Sight)
- **Resolution**: Longitude/Latitude 0.000001°
- **Time to First Fix**: Cold start 37s / Hot start 1s (average)
- **Sensitivity**: Tracking -167 dBm / Reacquisition -160 dBm / Cold start -148 dBm / Hot start -159 dBm

### Wi-Fi Positioning
- **Technology**: Indoor asset location using Wi-Fi access point scanning (device does not connect to Wi-Fi)
- **Parameters**: BSSID, RSSI
- **Standard**: 802.11b/g/n 2.4GHz

### Sensors
- **Tilt Detection**: Normal/Tilt status
- **Temperature Range**: -40°C to 125°C
- **Temperature Resolution**: 0.1°C

### Physical Characteristics
- **Dimensions**: 110 × 70 × 30 mm (4.33 × 2.76 × 1.18 in)
- **Weight**: 202g (batteries included)
- **Material**: PC, Black
- **Ingress Protection**: IP67
- **Impact Protection**: IK09
- **Operating Temperature**: -30°C to +70°C
- **Relative Humidity**: 0 ~ 95% (Non-condensing)

### Power
- **Battery**: 4 × 2700 mAh ER14505 Li-SOCl2 replaceable batteries
- **Battery Life** (at 25°C):
  - Twice daily location updates: 15+ years
  - Tenth daily location updates: 8+ years
  - Hourly location updates: 4+ years

### Interface & Configuration
- **Buttons**: 1 × Tamper button, Power button (internal)
- **Configuration Methods**: NFC, Bluetooth® 5.3, Downlink
- **Installation**: Wall mounting

## Thinger.io Integration

The Milesight AT101 integrates with Thinger.io through a LoRaWAN network server, enabling real-time tracking, sensor data visualization, and remote device management.

## Requirements

A LoRaWAN server is required to communicate the Milesight AT101 into Thinger.io, some options are:

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

- [AT101 Datasheet](https://resource.milesight.com/milesight/iot/document/at101-datasheet-en.pdf)
- [Milesight IoT](https://www.milesight.com/)
- [Thinger.io Documentation](https://docs.thinger.io)