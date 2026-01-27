# Office Occupancy Counter

The Office Occupancy Counter is an infrared-based LoRaWAN sensor designed for measuring room and building occupancy. Manufactured by IMBUILDINGS B.V., this battery-powered device uses active infrared technology to accurately count people entering and exiting a space without capturing personal data or images, ensuring GDPR compliance.

## Features

- **Active Infrared Technology**: Consists of an IR transmitter and receiver for accurate bidirectional counting
- **Privacy-Friendly**: No camera or personal data collection
- **LoRaWAN Connectivity**: Class A LoRaWAN communication for long-range, low-power operation
- **Battery Powered**: Flexible installation without fixed power requirements
- **NFC Configuration**: Easy setup and configuration via NFC
- **Event-Based Transmission**: Data sent based on registered count values
- **Bidirectional Counting**: Determines direction of travel to provide separate in/out counts

## Specifications

| Parameter | Value |
|-----------|-------|
| Detection Distance | Up to 2 meters |
| Field of View | 27 degrees |
| Dimensions | 150 x 50 x 22 mm |
| Material | ABS |
| Frequency Bands | EU868, US915, AS923, AU915 |
| LoRaWAN Class | Class A |
| Certification | CE, FCC |
| Warranty | 2 years |

## Use Cases

- Office space utilization monitoring
- Building traffic analysis
- Energy management optimization
- Workspace availability tracking
- Air quality and HVAC optimization based on occupancy
- Libraries, universities, and public spaces

## Thinger.io Integration

### Requirements

A LoRaWAN server is required to connect the Office Occupancy Counter to Thinger.io. Supported options include:

- [The Things Stack](https://www.thethingsindustries.com/stack/)
- [LORIOT](https://loriot.io/)
- [ChirpStack](https://www.chirpstack.io/)

The corresponding plugin for the selected LoRaWAN server must be installed in your Thinger.io instance.

### Get Started

#### Installation

Look for the plugin in the [Thinger.io Plugin Store](https://marketplace.thinger.io/) and install it in your Thinger.io instance. Once the plugin is installed, a new Product will be created for this device.

#### Configuration

The Product is already preconfigured. Verify that the auto provision prefix matches the one selected in your LoRaWAN server plugin in Thinger.io, or modify it according to your requirements.

#### Usage

Start sending uplinks for autoprovisioning devices and buckets.

This product also provides a predefined dashboard and downlinks.

## Additional Resources

- [IMBUILDINGS Official Product Page](https://imbuildings.com/products/office-occupancy-counter-lorawan/)
- [LoRa Alliance Marketplace](https://lora-alliance.org/marketplace/imbuildings-b-v/door-people-counter/)
- [The Things Network Device Repository](https://www.thethingsnetwork.org/device-repository/devices/imbuildings/imbuildings-office-occupancy-counter/)
- [Thinger.io Documentation](https://docs.thinger.io)