# Asset Tracker

The Asset Tracker is a LoRaWAN-enabled geolocation and activity monitoring device designed for real-time tracking of valuable assets, equipment, and personnel. Combining GPS positioning with built-in sensors, it delivers precise location data and activity detection for indoor and outdoor asset management applications.

## Features

- **Dual Positioning Technology**: Outdoor GPS positioning (10-20 meters accuracy) and indoor Bluetooth positioning (3-5 meters accuracy)
- **Built-in Sensors**: GPS module, accelerometer/gyroscope for motion detection, and optional NFC/RFID
- **LoRaWAN Connectivity**: Support for global ISM bands including EU868, US915, AS923, AU915, CN470, IN865, and RU868 MHz
- **Bluetooth 4.0**: Built-in BLE for indoor positioning and beacon functionality
- **SOS Emergency Button**: Quick alert function to send position updates in emergency situations
- **Anti-Tamper Protection**: Built-in tamper detection sensor for enhanced security
- **Motion-Based Power Saving**: Intelligent power management with motion detection to extend battery life
- **Long Battery Life**: Rechargeable 900mAh lithium battery providing 40+ hours (with 5-minute GPS intervals)
- **Compact and Rugged**: IP66 waterproof rating, dimensions 86.5 x 55 x 8 mm
- **LED Indicators**: Three-color LED for status indication
- **Type-C Charging**: Convenient USB Type-C charging port (5V)

## Use Cases

- **Asset Management**: Track enterprise equipment, tools, and valuable assets
- **Fleet Tracking**: Monitor vehicles and mobile property
- **Construction Sites**: Personnel management and safety monitoring
- **Agriculture**: Livestock tracking and monitoring
- **Logistics**: Bulk goods oversight and shared bicycle systems
- **Hazardous Environments**: Worker safety and asset tracking in industrial sites

## Technical Specifications

| Parameter | Specification |
|-----------|---------------|
| Communication | LoRaWAN (EU868, US915, AS923, AU915, CN470, IN865, RU868 MHz) |
| Positioning | GPS (outdoor) + Bluetooth (indoor) |
| Positioning Accuracy | 10-20 meters (outdoor), 3-5 meters (indoor) |
| GPS Time | Cold start: 38s, Hot start: 1s, Recapture: <1s |
| Bluetooth | BLE 4.0 |
| Sensors | Accelerometer/Gyroscope, GPS |
| Battery | 900mAh rechargeable lithium battery |
| Battery Life | 40+ hours (5-minute GPS interval), customizable based on uplink frequency |
| Charging | Type-C, 5V |
| Buttons | SOS button, Power button |
| NFC/RFID | Optional (detection range 1-15 cm) |
| LED Indicator | Three-color LED |
| Dimensions | 86.5 x 55 x 8 mm |
| Ingress Protection | IP66 |
| Operating Temperature | -20°C to +60°C |
| Uplink Frequency | Customizable |
| Time Synchronization | GPS-based |

## Thinger.io Integration

The Asset Tracker seamlessly integrates with Thinger.io through LoRaWAN connectivity, enabling real-time asset monitoring, geolocation visualization, and alert management through the Thinger.io platform.

## Requirements

A LoRaWAN server is required to communicate the Asset Tracker into Thinger.io, some options are:

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

- [Thinger.io Documentation](https://docs.thinger.io)