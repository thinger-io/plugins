# AT101-FH LoRaWAN Asset Tracker

The Milesight AT101 is an exceptional outdoor LoRaWAN GPS tracker that combines GNSS and Wi-Fi AP MAC Address Scanning technologies to deliver highly accurate positioning data. It is equipped with tilt and temperature sensors, enabling extensive data collection and versatile application in various scenarios. The device features IP67 and IK09 ratings for robust protection in harsh outdoor environments.

## Features

- **Dual Positioning Technology**: GNSS positioning with 5.0m accuracy (CEP) and Wi-Fi AP MAC Address Scanning for indoor/outdoor asset tracking
- **Motion Detection**: Built-in tilt sensor for detecting normal and tilted states
- **Temperature Monitoring**: Wide temperature measurement range from -40°C to +125°C with 0.1°C resolution
- **Multiple Tracking Modes**: Motion tracking, periodic tracking, and timing tracking modes
- **Geofencing**: Support for geofencing to secure assets and designated areas
- **Data Reliability**: Local storage for up to 1000 historical records with retransmission capability to prevent data loss
- **Long Battery Life**: Powered by 4 × 2700 mAh ER14505 Li-SOCl2 replaceable batteries with up to 15+ years of operation (twice daily location updates)
- **Tamper Detection**: Built-in tamper button for security alerts
- **Easy Configuration**: NFC and Bluetooth 5.3 support for simplified setup
- **Rugged Design**: IP67 waterproof and IK09 impact-resistant housing for outdoor deployment

## Thinger.io Integration

The AT101-FH integrates seamlessly with Thinger.io through LoRaWAN connectivity, enabling real-time asset tracking, temperature monitoring, and motion detection for various IoT applications.

## Requirements

A LoRaWAN server is required to communicate the Milesight AT101-FH into Thinger.io, some options are:

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

## Technical Specifications

### LoRaWAN Connectivity
- **Protocol**: LoRaWAN®
- **Frequency**: CN470/IN865/RU864/EU868/US915/AU915/KR920/AS923-1&2&3&4
- **Tx Power**: 16 dBm (868 MHz) / 20 dBm (915 MHz) / 19 dBm (470 MHz)
- **Sensitivity**: -137 dBm @ 300 bps
- **Mode**: OTAA/ABP, Class A
- **Antenna**: Internal

### GNSS Positioning
- **Position Accuracy**: 5.0m (CEP, Direct Line of Sight)
- **Resolution**: Longitude/Latitude: 0.000001
- **Time To First Fix**: Cold Start: 37s / Hot Start: 1s (Average)
- **Sensitivity**: Tracking: -167 dBm / Reacquisition: -160 dBm / Cold Start: -148 dBm / Hot Start: -159 dBm

### Wi-Fi Positioning
- **Technology**: Indoor asset location using Wi-Fi access point scanning (device does not connect to Wi-Fi)
- **Parameters**: BSSID, RSSI
- **Standard**: 802.11b/g/n 2.4GHz

### Sensors
- **Motion**: Normal/Tilt detection
- **Temperature**: -40°C to +125°C range, 0.1°C resolution

### Power
- **Battery**: 4 × 2700 mAh ER14505 Li-SOCl2 replaceable batteries
- **Battery Life** (at 25°C):
  - Twice daily location updates: 15+ years
  - Tenth daily location updates: 8+ years
  - Hourly location updates: 4+ years

### Physical
- **Dimensions**: 110 × 70 × 30 mm (4.33 × 2.76 × 1.18 in)
- **Weight**: 202g (batteries included)
- **Material**: PC, Black
- **Ingress Protection**: IP67
- **Impact Protection**: IK09
- **Operating Temperature**: -30°C to +70°C
- **Relative Humidity**: 0 to 95% (non-condensing)
- **Installation**: Wall mounting

### Additional Features
- **Configuration**: NFC, Bluetooth® 5.3, Downlink
- **Buttons**: 1 × Tamper Button
- **Software Functions**: Power on/off, geofencing, tilt threshold alarm, tamper alarm
- **Data Storage**: 1000 entries with retransmission and retrievability support

## Use Cases

- Outdoor asset tracking and fleet management
- Cold chain monitoring with temperature sensing
- Construction equipment tracking
- Agricultural machinery monitoring
- Container and pallet tracking
- Vehicle and trailer monitoring
- Theft prevention with tamper alerts and geofencing
- Logistics and supply chain visibility

## Additional Resources

Milesight resources can be found at:

- [AT101 Datasheet](https://resource.milesight.com/milesight/iot/document/at101-datasheet-en.pdf)
- [Milesight IoT](https://www.milesight-iot.com/)
- [Thinger.io Documentation](https://docs.thinger.io)